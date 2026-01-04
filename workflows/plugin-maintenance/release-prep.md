# Release Prep

> **Workflow**: plugin-maintenance
> **Previous**: [WordPress Update](./wordpress-update.md)
> **Next**: [Multi-Plugin](./multi-plugin.md)

## Goal

Prepare a plugin for release: verify versions, update @since tags, generate changelog.

## When to Use

- You're ready to tag a new release
- You need to finalize version numbers before publishing
- You want to automate changelog generation

## Prerequisites

- [ ] All features complete and tested
- [ ] Git commits use descriptive messages (for changelog)
- [ ] wp-plugins-cli installed

## Instructions

### Step 1: Verify Version Consistency

Check that versions match across files:

```bash
wp-plugins verify-versions .
```

This checks:
- Main plugin file header (`Version:`)
- readme.txt (`Stable tag:`)
- package.json (`version` field, if present)

Fix any mismatches before continuing.

### Step 2: Update @since Tags

During development, use `n.e.x.t` in PHPDoc @since tags:

```php
/**
 * New feature added in this release.
 *
 * @since n.e.x.t
 */
function my_new_feature() {}
```

Replace with actual version at release:

```bash
wp-plugins update-since . --version 1.2.0
```

### Step 3: Generate Changelog

Create changelog from commits since last tag:

```bash
wp-plugins generate-changelog . --tag 1.2.0
```

Review and edit the output before adding to readme.txt.

### Step 4: Final Commit and Tag

```bash
git add -A
git commit -m "Prepare release 1.2.0"
git tag 1.2.0
git push origin main --tags
```

## Complete Release Script

```bash
#!/bin/bash
VERSION="1.2.0"

# Verify versions match
wp-plugins verify-versions . || exit 1

# Update @since tags
wp-plugins update-since . --version $VERSION

# Generate changelog
wp-plugins generate-changelog . --tag $VERSION

# Commit and tag
git add -A
git commit -m "Release $VERSION"
git tag $VERSION
git push origin main --tags
```

## Verification

- [ ] `verify-versions` passes with no errors
- [ ] No `n.e.x.t` strings remain in codebase
- [ ] Changelog reflects all changes since last release
- [ ] Git tag created for new version

## Troubleshooting

### "@since n.e.x.t still found"

Check for files not tracked by git or in ignored directories.

```bash
grep -r "n.e.x.t" --include="*.php" .
```

### Changelog missing commits

Ensure you have the previous version tag. The tool uses git tags to determine commit range.

```bash
git tag -l
```

### Version mismatch errors

Update all locations to match:
- Main plugin file: `Version: 1.2.0`
- readme.txt: `Stable tag: 1.2.0`
- package.json: `"version": "1.2.0"`

## Best Practices

1. **Use conventional commits** - Makes changelog more useful
2. **Tag immediately after release commit** - Keeps git history clean
3. **Run verify-versions in CI** - Catch mismatches early
4. **Script the process** - Reduces human error

## Next Step

→ [Multi-Plugin](./multi-plugin.md)
