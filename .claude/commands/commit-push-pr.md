# Commit, Push, and Create PR

Create a well-formatted commit and optionally push/create a PR.

## Context

```bash
# Current branch and status
git branch --show-current
git status --short

# Recent commits for style reference
git log --oneline -5

# Staged and unstaged changes
git diff --cached --stat
git diff --stat
```

## Instructions

1. Review the changes shown above
2. Stage any unstaged files that should be included (ask if unclear)
3. Write a commit message that:
   - Uses conventional commit format when appropriate (feat:, fix:, docs:, chore:)
   - Summarizes the "why" not just the "what"
   - Keeps first line under 72 characters
   - Adds body with details if changes are complex

4. Commit with this format:
```bash
git commit -m "$(cat <<'EOF'
<type>: <summary>

<body if needed>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

5. Ask user if they want to:
   - Push to remote (default: yes if branch has upstream)
   - Create a PR (ask for target branch if yes)

6. If creating PR, use:
```bash
gh pr create --title "<commit summary>" --body "$(cat <<'EOF'
## Summary
<bullet points of changes>

## Changes
<list of modified files with brief descriptions>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
