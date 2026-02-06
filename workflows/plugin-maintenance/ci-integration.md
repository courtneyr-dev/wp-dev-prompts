# CI Integration

> **Workflow**: plugin-maintenance
> **Previous**: [Multi-Plugin](./multi-plugin.md)
> **Next**: [Overview](./overview.md)

## Goal

Automate plugin maintenance tasks in CI/CD pipelines.

## When to Use

- You want automated version verification on PRs
- You want scheduled WordPress version updates
- You want release automation

## Prerequisites

- [ ] GitHub repository (examples use GitHub Actions)
- [ ] Node.js available in CI environment
- [ ] Git permissions for automated commits

## Workflows

### 1. Version Verification (PR Check)

Catch version mismatches before merging:

```yaml
# .github/workflows/verify-versions.yml
name: Verify Plugin Versions

on:
  pull_request:
    paths:
      - '**.php'
      - 'readme.txt'
      - 'package.json'

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Verify versions
        run: npx @felixarntz/wp-plugins-cli verify-versions .
```

### 2. Bump Tested WordPress Version (Manual Trigger)

Run after each WordPress release:

```yaml
# .github/workflows/bump-wp-version.yml
name: Bump Tested WordPress Version

on:
  workflow_dispatch:
    inputs:
      wp_version:
        description: 'WordPress version (e.g., 6.7)'
        required: true
        type: string

jobs:
  bump:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Bump tested version
        run: npx @felixarntz/wp-plugins-cli bump-tested-wp . --version ${{ inputs.wp_version }}

      - name: Commit and push
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "Tested up to WordPress ${{ inputs.wp_version }}"
          branch: main
```

### 3. Release Preparation (Tag Trigger)

Automate release prep when pushing a tag:

```yaml
# .github/workflows/prepare-release.yml
name: Prepare Release

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  prepare:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for changelog

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Extract version
        id: version
        run: echo "VERSION=${GITHUB_REF#refs/tags/v}" >> $GITHUB_OUTPUT

      - name: Verify versions
        run: npx @felixarntz/wp-plugins-cli verify-versions .

      - name: Generate changelog
        run: |
          npx @felixarntz/wp-plugins-cli generate-changelog . --tag ${{ steps.version.outputs.VERSION }} > RELEASE_NOTES.md

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          body_path: RELEASE_NOTES.md
          draft: true
```

### 4. Check for n.e.x.t Tags (PR Check)

Ensure @since tags are updated before release:

```yaml
# .github/workflows/check-since-tags.yml
name: Check @since Tags

on:
  pull_request:
    branches:
      - main
      - release/*

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check for n.e.x.t tags
        run: |
          if grep -r "n\.e\.x\.t" --include="*.php" .; then
            echo "::warning::Found n.e.x.t tags - update before release"
          fi
```

## Reusable Workflow

Create a reusable workflow for multiple plugins:

```yaml
# .github/workflows/plugin-maintenance.yml
name: Plugin Maintenance

on:
  workflow_call:
    inputs:
      command:
        required: true
        type: string
      plugin_path:
        required: false
        type: string
        default: '.'

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npx @felixarntz/wp-plugins-cli ${{ inputs.command }} ${{ inputs.plugin_path }}
```

## Verification

- [ ] PR checks run on relevant file changes
- [ ] Manual workflows accessible in Actions tab
- [ ] Automated commits have correct permissions
- [ ] Release workflow creates drafts correctly

## Security Notes

- Use `permissions: contents: write` only where needed
- Consider branch protection for automated commits
- Review auto-commit actions for security

## Related Skills

- [wp-plugins-cli](../../skills/wordpress-dev/wp-plugins-cli.md) - Command reference
- GitHub Actions documentation

## Workflow Complete

Return to [Overview](./overview.md) for the full workflow summary.
