#!/bin/bash
# scripts/sync-upstream.sh
# Check, fetch, diff, and update upstream dependencies tracked in UPSTREAM.md.
#
# Usage:
#   sync-upstream.sh [--check]               Check all upstreams for updates
#   sync-upstream.sh --fetch <owner/repo>    Shallow-clone upstream for review
#   sync-upstream.sh --diff <owner/repo>     Diff fetched upstream vs local files
#   sync-upstream.sh --update <owner/repo>   Set last-sync date to today

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
UPSTREAM_MD="$REPO_ROOT/UPSTREAM.md"
TMP_DIR="$REPO_ROOT/tmp/upstream"

# ── Colors ───────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

# ── Helpers ──────────────────────────────────────────────────────────────────

die()  { echo -e "${RED}Error: $*${NC}" >&2; exit 1; }
info() { echo -e "${CYAN}$*${NC}"; }
warn() { echo -e "${YELLOW}$*${NC}"; }

usage() {
  cat <<'EOF'
sync-upstream.sh — Upstream dependency checker for wp-dev-prompts

Usage:
  sync-upstream.sh [--check]               Check all upstreams for updates
  sync-upstream.sh --fetch <owner/repo>    Shallow-clone upstream for review
  sync-upstream.sh --diff  <owner/repo>    Diff fetched upstream vs local files
  sync-upstream.sh --update <owner/repo>   Set "Last Synced" date to today

Examples:
  sync-upstream.sh --check
  sync-upstream.sh --fetch WordPress/agent-skills
  sync-upstream.sh --diff  richtabor/skills
  sync-upstream.sh --update WordPress/agent-skills
EOF
  exit 0
}

check_gh() {
  command -v gh &>/dev/null || die "gh CLI not found. Install from https://cli.github.com"
  if ! gh auth status &>/dev/null 2>&1; then
    warn "gh CLI not authenticated — API calls are rate-limited to 60/hour."
    warn "Run: gh auth login"
  fi
}

slug() {
  # WordPress/agent-skills → wordpress-agent-skills
  echo "$1" | tr '/' '-' | tr '[:upper:]' '[:lower:]'
}

# ── Parse UPSTREAM.md ────────────────────────────────────────────────────────
# Returns lines of: owner/repo|last_sync|label
# Section 8 sub-repos are returned individually.

parse_upstreams() {
  local current_repo="" current_sync="" current_label="" in_table=0

  while IFS= read -r line; do
    # Main section headers: ### 1. WordPress/agent-skills
    if [[ "$line" =~ ^###\ [0-9]+[a-z]?\.\ (.+) ]]; then
      # Emit previous entry if we have one
      if [[ -n "$current_repo" && -n "$current_sync" ]]; then
        echo "${current_repo}|${current_sync}|${current_label}"
      fi
      current_label="${BASH_REMATCH[1]}"
      current_repo=""
      current_sync=""
      in_table=0
    fi

    # Repository URL line: **Repository**: [github.com/owner/repo](https://...)
    local re_repo='\*\*Repository\*\*:.*github\.com/([^/]+/[^/)"]+)'
    if [[ "$line" =~ $re_repo ]]; then
      current_repo="${BASH_REMATCH[1]}"
    fi

    # Last Synced line
    local re_sync='\*\*Last Synced\*\*: ([0-9]{4}-[0-9]{2}-[0-9]{2})'
    if [[ "$line" =~ $re_sync ]]; then
      current_sync="${BASH_REMATCH[1]}"
    fi

    # Section 8 individual source table rows
    # | penetration-testing | [repo-name](https://github.com/owner/repo) | author |
    local re_table='^\| ([a-z-]+) \|.*github\.com/([^/)"]+/[^/)"]+)\) \| ([^ |]+)'
    if [[ "$line" =~ $re_table ]]; then
      local skill_name="${BASH_REMATCH[1]}"
      local skill_repo="${BASH_REMATCH[2]}"
      local skill_author="${BASH_REMATCH[3]}"
      echo "${skill_repo}|${current_sync}|skills.sh: ${skill_name} (${skill_author})"
    fi

  done < "$UPSTREAM_MD"

  # Emit last entry
  if [[ -n "$current_repo" && -n "$current_sync" ]]; then
    echo "${current_repo}|${current_sync}|${current_label}"
  fi
}

# ── Parse affected files for a specific repo ─────────────────────────────────

parse_affected_files() {
  local target_repo="$1"
  local found=0

  while IFS= read -r line; do
    # Match the section containing our repo
    if [[ "$line" =~ github\.com/${target_repo}[^a-zA-Z0-9] ]]; then
      found=1
      continue
    fi

    # Once found, look for "Files affected:" block
    if [[ $found -eq 1 && "$line" == *"**Files affected:**"* ]]; then
      found=2
      continue
    fi

    # Read bullet items in the files block
    if [[ $found -eq 2 ]]; then
      if [[ "$line" =~ ^-\ \`([^\`]+)\` ]]; then
        echo "${BASH_REMATCH[1]}"
      elif [[ -z "$line" || "$line" =~ ^[#*] ]]; then
        # End of bullet list
        return
      fi
    fi

    # Reset if we hit a new section
    if [[ $found -ge 1 && "$line" =~ ^---$ ]]; then
      found=0
    fi
  done < "$UPSTREAM_MD"
}

# ── CHECK ────────────────────────────────────────────────────────────────────

cmd_check() {
  check_gh

  local today
  today=$(date +%Y-%m-%d)
  local has_updates=0
  local rows=()

  echo ""
  echo -e "${BOLD}Upstream Dependency Check ($today)${NC}"
  echo "======================================"
  echo ""
  printf "  %-44s %-12s %8s  %s\n" "Repository" "Last Sync" "Commits" "Latest"
  printf "  %-44s %-12s %8s  %s\n" "$(printf '%0.s─' {1..44})" "$(printf '%0.s─' {1..12})" "$(printf '%0.s─' {1..8})" "$(printf '%0.s─' {1..24})"

  # Deduplicate repos (section 8 parent has same sync date as children)
  local seen_repos=()

  while IFS='|' read -r repo sync_date label; do
    # Skip duplicates (wordpress-router appears in both section 1 and section 8)
    local dominated=0
    for seen in "${seen_repos[@]+"${seen_repos[@]}"}"; do
      if [[ "$seen" == "$repo" ]]; then
        dominated=1
        break
      fi
    done
    [[ $dominated -eq 1 ]] && continue
    seen_repos+=("$repo")

    # Truncate label for display
    local display_label="$label"
    if [[ ${#display_label} -gt 44 ]]; then
      display_label="${display_label:0:41}..."
    fi

    # Query GitHub
    local count=0 latest_info="(current)"
    local api_result
    api_result=$(gh api "repos/$repo/commits?since=${sync_date}T00:00:00Z&per_page=100" 2>/dev/null) || {
      printf "  %-44s %-12s %8s  %s\n" "$display_label" "$sync_date" "?" "${RED}API error${NC}"
      continue
    }

    count=$(echo "$api_result" | jq 'length')

    if [[ "$count" -gt 0 ]]; then
      has_updates=1
      local sha date_str
      sha=$(echo "$api_result" | jq -r '.[0].sha[0:7]')
      date_str=$(echo "$api_result" | jq -r '.[0].commit.author.date[0:10]')
      latest_info="${sha} ${date_str}"
      printf "  ${YELLOW}%-44s${NC} %-12s ${YELLOW}%8s${NC}  %s\n" "$display_label" "$sync_date" "$count" "$latest_info"
    else
      printf "  %-44s %-12s %8s  ${DIM}%s${NC}\n" "$display_label" "$sync_date" "0" "$latest_info"
    fi

  done < <(parse_upstreams)

  echo ""
  if [[ $has_updates -eq 1 ]]; then
    echo -e "${YELLOW}Some sources have updates.${NC} Run ${BOLD}--fetch <owner/repo>${NC} to download."
    exit 1  # Signal updates available (for CI)
  else
    echo -e "${GREEN}All upstream sources are current.${NC}"
    exit 0
  fi
}

# ── FETCH ────────────────────────────────────────────────────────────────────

cmd_fetch() {
  local repo="$1"
  check_gh

  local dest="$TMP_DIR/$(slug "$repo")"

  # Clean previous fetch
  if [[ -d "$dest" ]]; then
    info "Removing previous fetch at $dest"
    rm -rf "$dest"
  fi

  mkdir -p "$TMP_DIR"

  info "Shallow-cloning $repo into $dest ..."
  git clone --depth 1 --single-branch "https://github.com/$repo.git" "$dest" 2>&1 | tail -1

  # Show what we got
  echo ""
  echo -e "${BOLD}Fetched: $repo${NC}"
  echo -e "Location: ${DIM}$dest${NC}"
  echo ""

  # List affected local files for context
  local affected
  affected=$(parse_affected_files "$repo")
  if [[ -n "$affected" ]]; then
    echo "Affected local files (from UPSTREAM.md):"
    while IFS= read -r f; do
      echo "  $f"
    done <<< "$affected"
    echo ""
    echo -e "Run ${BOLD}--diff $repo${NC} to compare upstream vs local."
  else
    echo "No file mapping found in UPSTREAM.md for $repo."
    echo "Browse the clone at: $dest"
  fi
}

# ── DIFF ─────────────────────────────────────────────────────────────────────

# Try to find the best upstream match for a local file.
# Strategy: match unique filenames first, fall back to parent-dir heuristic.
find_upstream_match() {
  local dest="$1"
  local local_file="$2"
  local fname
  fname=$(basename "$local_file")

  # Find all upstream candidates with the same filename
  local candidates
  candidates=$(find "$dest" -name "$fname" -not -path "*/.git/*" 2>/dev/null)
  local count
  count=$(echo "$candidates" | grep -c . 2>/dev/null || echo 0)

  if [[ "$count" -eq 0 ]]; then
    return 1
  elif [[ "$count" -eq 1 ]]; then
    echo "$candidates"
    return 0
  fi

  # Multiple matches — use the parent directory name to disambiguate.
  # e.g. local skills/wordpress-dev/SKILL.md → parent "wordpress-dev"
  #      upstream might have skills/wp-plugin-development/SKILL.md
  # For non-SKILL.md files this usually resolves to 1 match.
  local parent_dir
  parent_dir=$(basename "$(dirname "$REPO_ROOT/$local_file")")

  # Try exact parent dir match first
  local match
  match=$(echo "$candidates" | grep "/$parent_dir/" | head -1)
  if [[ -n "$match" ]]; then
    echo "$match"
    return 0
  fi

  # No clear match — return all candidates so caller can list them
  echo "$candidates"
  return 2  # multiple matches
}

cmd_diff() {
  local repo="$1"
  local dest="$TMP_DIR/$(slug "$repo")"

  [[ -d "$dest" ]] || die "No fetched data for $repo. Run --fetch $repo first."

  local affected
  affected=$(parse_affected_files "$repo")

  echo ""
  echo -e "${BOLD}Diff: $repo vs local${NC}"
  echo "================================"

  if [[ -z "$affected" ]]; then
    echo "No file mapping in UPSTREAM.md. Showing upstream structure:"
    echo ""
    find "$dest" -name "*.md" -not -path "*/.git/*" | sed "s|$dest/|  |" | sort
    echo ""
    echo "Compare manually with local files."
    return
  fi

  local diff_count=0 skip_count=0

  while IFS= read -r local_pattern; do
    # Expand glob pattern
    local local_files
    local_files=$(cd "$REPO_ROOT" && ls -1 $local_pattern 2>/dev/null || true)
    [[ -z "$local_files" ]] && continue

    while IFS= read -r local_file; do
      local upstream_file
      local match_status=0
      upstream_file=$(find_upstream_match "$dest" "$local_file") || match_status=$?

      if [[ $match_status -eq 1 ]]; then
        echo -e "\n${DIM}$local_file — no upstream match${NC}"
        skip_count=$((skip_count + 1))
        continue
      fi

      if [[ $match_status -eq 2 ]]; then
        # Multiple matches — show them and skip auto-diff
        echo -e "\n${YELLOW}$local_file — multiple upstream candidates:${NC}"
        echo "$upstream_file" | sed "s|$dest/|  |"
        echo -e "${DIM}  Compare manually: diff <upstream> $local_file${NC}"
        skip_count=$((skip_count + 1))
        continue
      fi

      # Single match — run diff
      local diff_output
      diff_output=$(diff -u "$upstream_file" "$REPO_ROOT/$local_file" 2>/dev/null || true)

      if [[ -z "$diff_output" ]]; then
        echo -e "\n${GREEN}$local_file — identical${NC}"
      else
        diff_count=$((diff_count + 1))
        echo ""
        echo -e "${YELLOW}$local_file${NC}"
        echo -e "${DIM}  upstream: ${upstream_file#$dest/}${NC}"
        echo "$diff_output" | head -60
        local total_lines
        total_lines=$(echo "$diff_output" | wc -l | tr -d ' ')
        if [[ "$total_lines" -gt 60 ]]; then
          echo -e "${DIM}  ... ($total_lines total diff lines, showing first 60)${NC}"
        fi
      fi
    done <<< "$local_files"
  done <<< "$affected"

  echo ""
  if [[ $diff_count -eq 0 && $skip_count -eq 0 ]]; then
    echo -e "${GREEN}No differences found.${NC}"
  else
    [[ $diff_count -gt 0 ]] && echo -e "${YELLOW}$diff_count file(s) differ.${NC}"
    [[ $skip_count -gt 0 ]] && echo -e "${DIM}$skip_count file(s) need manual comparison.${NC}"
    echo -e "After applying changes, run ${BOLD}--update $repo${NC} to record the sync."
  fi
}

# ── UPDATE ───────────────────────────────────────────────────────────────────

cmd_update() {
  local repo="$1"
  local new_date
  new_date=$(date +%Y-%m-%d)

  # Find the repo's section in UPSTREAM.md and update Last Synced date.
  # We match the repo URL then find the next "Last Synced" line.
  local repo_escaped
  repo_escaped=$(echo "$repo" | sed 's/[\/&]/\\&/g')

  if ! grep -q "github.com/$repo" "$UPSTREAM_MD"; then
    die "Repository $repo not found in UPSTREAM.md"
  fi

  # Use awk to find the section and update the date
  local tmp_file="$UPSTREAM_MD.tmp"
  awk -v repo="$repo" -v new_date="$new_date" '
    /github\.com\// {
      if (index($0, repo) > 0) { found = 1 }
    }
    found && /\*\*Last Synced\*\*:/ {
      sub(/[0-9]{4}-[0-9]{2}-[0-9]{2}/, new_date)
      found = 0
    }
    { print }
  ' "$UPSTREAM_MD" > "$tmp_file"

  mv "$tmp_file" "$UPSTREAM_MD"

  echo -e "${GREEN}Updated${NC} $repo last sync to ${BOLD}$new_date${NC} in UPSTREAM.md"
}

# ── MAIN ─────────────────────────────────────────────────────────────────────

main() {
  cd "$REPO_ROOT"

  [[ -f "$UPSTREAM_MD" ]] || die "UPSTREAM.md not found at $UPSTREAM_MD"

  case "${1:---check}" in
    --check)  cmd_check ;;
    --fetch)  [[ -n "${2:-}" ]] || die "--fetch requires <owner/repo>"; cmd_fetch "$2" ;;
    --diff)   [[ -n "${2:-}" ]] || die "--diff requires <owner/repo>"; cmd_diff "$2" ;;
    --update) [[ -n "${2:-}" ]] || die "--update requires <owner/repo>"; cmd_update "$2" ;;
    -h|--help) usage ;;
    *) die "Unknown command: $1. Run with --help for usage." ;;
  esac
}

main "$@"
