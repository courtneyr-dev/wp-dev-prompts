# Git Worktrees for WordPress

> **Type**: Skill
> **Domain**: engineering/workflow
> **Source**: [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — Adapted for WordPress

<skill>
<summary>
Parallel WordPress development using Git worktrees for isolated feature work and code review.
</summary>

<knowledge>
## Why Worktrees for WordPress?

WordPress development often requires:
- Testing features in isolation
- Reviewing PRs without stashing work
- Running multiple WordPress versions simultaneously
- Comparing behavior between branches

Worktrees let you have multiple checked-out branches at once, each in its own directory.

## Setup

### Directory Structure

```
wordpress-projects/
├── my-plugin/                    # Main working directory
│   ├── .git/                     # Git repository
│   ├── .worktrees/              # Worktree root (gitignored)
│   │   ├── feature-auth/        # Feature branch worktree
│   │   └── pr-review-123/       # PR review worktree
│   ├── includes/
│   ├── src/
│   └── ...
```

### Initial Configuration

```bash
# Add .worktrees to gitignore
echo ".worktrees/" >> .gitignore

# Create worktrees directory
mkdir -p .worktrees
```

## Worktree Commands

### Create Worktree

```bash
# Create worktree for new feature branch
git worktree add .worktrees/feature-auth -b feature/user-auth main

# Create worktree for existing branch
git worktree add .worktrees/fix-bug fix/issue-123

# Create worktree for PR review
git fetch origin pull/123/head:pr-123
git worktree add .worktrees/pr-123 pr-123
```

### List Worktrees

```bash
git worktree list

# Output:
# /path/to/my-plugin           abc1234 [main]
# /path/to/my-plugin/.worktrees/feature-auth  def5678 [feature/user-auth]
# /path/to/my-plugin/.worktrees/pr-123        ghi9012 [pr-123]
```

### Switch to Worktree

```bash
cd .worktrees/feature-auth
```

### Remove Worktree

```bash
# Remove worktree (keeps branch)
git worktree remove .worktrees/feature-auth

# Force remove if there are changes
git worktree remove --force .worktrees/feature-auth

# Prune stale worktree data
git worktree prune
```

## WordPress-Specific Setup

### Environment Files

Each worktree needs its own environment:

```bash
#!/bin/bash
# copy-env.sh - Run after creating worktree

WORKTREE_PATH=$1

# Copy environment files
cp .env "$WORKTREE_PATH/.env" 2>/dev/null || true
cp .env.local "$WORKTREE_PATH/.env.local" 2>/dev/null || true
cp .env.testing "$WORKTREE_PATH/.env.testing" 2>/dev/null || true

# Copy local WordPress config if exists
cp wp-config-local.php "$WORKTREE_PATH/wp-config-local.php" 2>/dev/null || true

echo "Environment files copied to $WORKTREE_PATH"
```

### Database Per Worktree

For isolated testing, use separate databases:

```php
// wp-config.php - Dynamic database based on directory
$worktree_name = basename(dirname(__FILE__));
if (strpos(__DIR__, '.worktrees') !== false) {
    define('DB_NAME', 'wp_' . sanitize_key($worktree_name));
} else {
    define('DB_NAME', 'wp_main');
}
```

Or use WP-CLI to export/import:

```bash
# In main directory
wp db export main-db.sql

# In worktree
wp db create
wp db import ../../../main-db.sql
```

### wp-env Integration

If using `@wordpress/env`:

```bash
# Each worktree gets its own wp-env
cd .worktrees/feature-auth
wp-env start  # Uses local .wp-env.json

# Different port to avoid conflicts
# .wp-env.json in worktree:
{
    "port": 8889,
    "testsPort": 8890
}
```

### Composer Dependencies

```bash
# Install dependencies in worktree
cd .worktrees/feature-auth
composer install
npm install
npm run build
```

## Workflow: Feature Development

```bash
# 1. Create worktree for feature
git worktree add .worktrees/auth -b feature/user-auth main

# 2. Setup environment
./copy-env.sh .worktrees/auth
cd .worktrees/auth
composer install
npm install

# 3. Develop feature
# ... make changes ...

# 4. Commit and push
git add .
git commit -m "feat: Add user authentication"
git push -u origin feature/user-auth

# 5. Create PR, then cleanup
cd ../..
git worktree remove .worktrees/auth
```

## Workflow: PR Review

```bash
# 1. Fetch PR
git fetch origin pull/123/head:pr-123

# 2. Create worktree
git worktree add .worktrees/pr-123 pr-123

# 3. Setup and test
cd .worktrees/pr-123
composer install
npm install && npm run build
npm run test

# 4. Review in IDE (separate window)
code .

# 5. After review, cleanup
cd ../..
git worktree remove .worktrees/pr-123
git branch -D pr-123
```

## Workflow: Hotfix While in Feature

```bash
# You're working on feature-auth, urgent bug reported

# 1. Create hotfix worktree from main
git worktree add .worktrees/hotfix -b hotfix/critical-bug main

# 2. Fix in hotfix worktree (feature work untouched)
cd .worktrees/hotfix
# ... fix bug ...
git commit -m "fix: Critical security issue"
git push -u origin hotfix/critical-bug

# 3. Return to feature work
cd ../..
cd .worktrees/feature-auth  # or main directory

# 4. After hotfix merged, cleanup
git worktree remove .worktrees/hotfix
```

## Worktree Manager Script

```bash
#!/bin/bash
# worktree-manager.sh

WORKTREES_DIR=".worktrees"

case "$1" in
    create)
        BRANCH_NAME=$2
        FROM_BRANCH=${3:-main}
        git worktree add "$WORKTREES_DIR/$BRANCH_NAME" -b "$BRANCH_NAME" "$FROM_BRANCH"
        ./copy-env.sh "$WORKTREES_DIR/$BRANCH_NAME"
        echo "Created worktree: $WORKTREES_DIR/$BRANCH_NAME"
        ;;
    review)
        PR_NUMBER=$2
        git fetch origin "pull/$PR_NUMBER/head:pr-$PR_NUMBER"
        git worktree add "$WORKTREES_DIR/pr-$PR_NUMBER" "pr-$PR_NUMBER"
        ./copy-env.sh "$WORKTREES_DIR/pr-$PR_NUMBER"
        echo "Created review worktree: $WORKTREES_DIR/pr-$PR_NUMBER"
        ;;
    list)
        git worktree list
        ;;
    remove)
        WORKTREE_NAME=$2
        git worktree remove "$WORKTREES_DIR/$WORKTREE_NAME"
        echo "Removed worktree: $WORKTREE_NAME"
        ;;
    cleanup)
        git worktree prune
        echo "Pruned stale worktrees"
        ;;
    *)
        echo "Usage: $0 {create|review|list|remove|cleanup} [args]"
        ;;
esac
```

Usage:
```bash
./worktree-manager.sh create feature/new-block
./worktree-manager.sh review 123
./worktree-manager.sh list
./worktree-manager.sh remove feature/new-block
```
</knowledge>

<best_practices>
- Always gitignore the worktrees directory
- Copy environment files to each worktree
- Use separate databases for isolation when needed
- Remove worktrees after merging to keep things clean
- Never commit from the wrong worktree — check `git worktree list`
</best_practices>

<references>
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)
- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)
</references>
</skill>
