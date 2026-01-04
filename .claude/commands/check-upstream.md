# Check Upstream Dependencies

Check for updates in tracked upstream repositories.

## Current Upstreams

```bash
# Show tracked repos and last sync dates
grep -A2 "### [0-9]" UPSTREAM.md | head -20
```

## Check Each Repository

```bash
echo "=== Automattic/agent-skills ==="
gh api repos/Automattic/agent-skills/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.author.date[0:10]) \(.commit.message | split("\n")[0])"' 2>/dev/null || echo "Run: gh auth login"

echo ""
echo "=== richtabor/skills ==="
gh api repos/richtabor/skills/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.author.date[0:10]) \(.commit.message | split("\n")[0])"' 2>/dev/null || echo "Run: gh auth login"

echo ""
echo "=== WordPress/WordPress-Documentation-Style-Guide ==="
gh api repos/WordPress/WordPress-Documentation-Style-Guide/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.author.date[0:10]) \(.commit.message | split("\n")[0])"' 2>/dev/null || echo "Run: gh auth login"
```

## Instructions

1. Compare the commit dates above with "Last Synced" dates in `UPSTREAM.md`

2. For any repo with newer commits:
   - List the new commits
   - Identify which files we integrated from that repo
   - Determine if updates are relevant

3. If updates are relevant:
   - Fetch the updated content
   - Compare with our current version
   - Highlight key differences
   - Ask user if they want to apply updates

4. After syncing:
   - Update "Last Synced" date in `UPSTREAM.md`
   - Document what changed in commit message

## Affected Files by Upstream

**Automattic/agent-skills:**
- `skills/security/*.md`

**richtabor/skills:**
- `skills/technical-writing/SKILL.md`
- `skills/technical-writing/references/anti-patterns.md`
- `skills/technical-writing/references/style-guide.md`
- `skills/technical-writing/references/wordpress-publishing.md`
- `skills/technical-writing/scripts/publish-to-wordpress.py`

**WordPress/WordPress-Documentation-Style-Guide:**
- `skills/technical-writing/references/wordpress-docs-style-guide.md`
