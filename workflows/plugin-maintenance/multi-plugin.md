# Multi-Plugin Operations

> **Workflow**: plugin-maintenance
> **Previous**: [Release Prep](./release-prep.md)
> **Next**: [CI Integration](./ci-integration.md)

## Goal

Manage multiple WordPress plugins efficiently using batch operations.

## When to Use

- You maintain multiple plugins
- WordPress releases a new version (bulk update "Tested up to")
- You need to verify all plugins before releases
- You want consistent maintenance across a portfolio

## Prerequisites

- [ ] Plugins organized in a common directory
- [ ] Each plugin in its own subdirectory with git
- [ ] wp-plugins-cli installed

## Directory Structure

```
plugins/
├── plugin-one/
│   ├── plugin-one.php
│   ├── readme.txt
│   └── .git/
├── plugin-two/
│   ├── plugin-two.php
│   ├── readme.txt
│   └── .git/
└── plugin-three/
    ├── plugin-three.php
    ├── readme.txt
    └── .git/
```

## Instructions

### List All Plugins

```bash
wp-plugins get-plugins ./plugins
```

Output:
```
./plugins/plugin-one
./plugins/plugin-two
./plugins/plugin-three
```

### Filter by Vendor

If plugins have vendor prefixes (e.g., `myname-plugin-one`):

```bash
wp-plugins get-plugins ./plugins --vendor myname
```

### Bulk WordPress Version Update

```bash
wp-plugins get-plugins ./plugins | \
  xargs -I {} wp-plugins bump-tested-wp {} --version 6.7
```

### Bulk Version Verification

```bash
wp-plugins get-plugins ./plugins | \
  xargs -I {} sh -c 'echo "Checking {}..." && wp-plugins verify-versions {}'
```

### Push All Changes

```bash
wp-plugins get-plugins ./plugins | \
  xargs -I {} sh -c 'cd {} && git push origin main'
```

## Complete Maintenance Script

```bash
#!/bin/bash
# bulk-update.sh - Update all plugins after WordPress release

WP_VERSION="${1:-6.7}"
PLUGINS_DIR="./plugins"
VENDOR="myname"

echo "Updating plugins to WordPress $WP_VERSION"

# Get filtered plugin list
PLUGINS=$(wp-plugins get-plugins "$PLUGINS_DIR" --vendor "$VENDOR")

for plugin in $PLUGINS; do
  echo "Processing $plugin..."

  # Bump tested version
  wp-plugins bump-tested-wp "$plugin" --version "$WP_VERSION"

  # Push changes
  (cd "$plugin" && git push origin main)
done

echo "Done!"
```

Usage:

```bash
./bulk-update.sh 6.7
```

## Verification

- [ ] All plugins updated with correct version
- [ ] All commits created successfully
- [ ] All changes pushed to remotes

## Advanced: Parallel Processing

For many plugins, use GNU parallel:

```bash
# Install parallel if needed
# brew install parallel (macOS)
# apt install parallel (Ubuntu)

wp-plugins get-plugins ./plugins | \
  parallel -j4 'wp-plugins bump-tested-wp {} --version 6.7'
```

## Integration with Monorepos

If plugins share a single git repository:

```bash
# Update all, single commit
wp-plugins get-plugins ./plugins | \
  xargs -I {} wp-plugins bump-tested-wp {} --version 6.7 --no-commit

git add -A
git commit -m "Bump tested WordPress version to 6.7"
git push origin main
```

Note: Check if `--no-commit` is supported; otherwise, squash commits manually.

## Next Step

→ [CI Integration](./ci-integration.md)
