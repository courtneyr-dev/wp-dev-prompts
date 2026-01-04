# WordPress Update

> **Workflow**: plugin-maintenance
> **Previous**: [Overview](./overview.md)
> **Next**: [Release Prep](./release-prep.md)

## Goal

Update your plugin's "Tested up to" version after a new WordPress release.

## When to Use

- WordPress releases a new major version (6.6 → 6.7)
- You've tested your plugin on the new version
- You want to show users your plugin is maintained

## Prerequisites

- [ ] Plugin tested on new WordPress version
- [ ] wp-plugins-cli installed (`npm install -g @felixarntz/wp-plugins-cli`)

## Instructions

### Single Plugin

```bash
# Navigate to plugin directory
cd /path/to/your-plugin

# Bump the tested version
wp-plugins bump-tested-wp . --version 6.7

# Push the commit
git push origin main
```

The command:
1. Updates `Tested up to:` in readme.txt
2. Creates a commit with the change

### Multiple Plugins

```bash
# From parent directory containing plugins
wp-plugins get-plugins ./plugins --vendor yourname | \
  xargs -I {} wp-plugins bump-tested-wp {} --version 6.7

# Push all changes
for dir in ./plugins/*/; do
  (cd "$dir" && git push origin main)
done
```

## Verification

- [ ] readme.txt shows new WordPress version
- [ ] Commit was created with the change
- [ ] Changes pushed to repository
- [ ] WordPress.org shows updated "Tested up to" (after SVN sync)

## Troubleshooting

### "readme.txt not found"

Ensure you're in the plugin root directory containing readme.txt.

### Version not updating on WordPress.org

WordPress.org reads from the readme.txt in your SVN trunk or latest tag. Push to SVN after the Git commit.

## Automation

Add to GitHub Actions to run on WordPress release schedule:

```yaml
name: Bump Tested WordPress Version
on:
  workflow_dispatch:
    inputs:
      wp_version:
        description: 'WordPress version'
        required: true

jobs:
  bump:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npx @felixarntz/wp-plugins-cli bump-tested-wp . --version ${{ inputs.wp_version }}
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "Tested up to WordPress ${{ inputs.wp_version }}"
```

## Next Step

→ [Release Prep](./release-prep.md)
