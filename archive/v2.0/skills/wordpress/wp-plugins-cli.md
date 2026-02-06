# wp-plugins-cli

> **Topic**: wordpress/wp-plugins-cli
> **Platforms**: All
> **Source**: [@felixarntz/wp-plugins-cli](https://www.npmjs.com/package/@felixarntz/wp-plugins-cli)

<skill>
<summary>
Node.js CLI for WordPress plugin maintenance tasks: version bumping, changelog generation, and release preparation.
</summary>

<knowledge>
## Overview

`@felixarntz/wp-plugins-cli` is a Node.js CLI that streamlines repetitive plugin maintenance tasks. It's useful for managing one or many plugins.

## Installation

```bash
npm install -g @felixarntz/wp-plugins-cli
```

The CLI command is `wp-plugins`.

## Available Commands

### bump-tested-wp

Updates the "Tested up to" version in readme.txt and commits the change.

```bash
wp-plugins bump-tested-wp /path/to/plugin --version 6.7
```

Use after each WordPress release to keep your plugin current.

### generate-changelog

Creates a changelog from commit history since the last tag.

```bash
wp-plugins generate-changelog /path/to/plugin --tag 1.2.3
```

Automates release notes from your commit messages.

### get-plugins

Lists plugin directories within a path, with optional vendor filtering.

```bash
# List all plugins
wp-plugins get-plugins /path/to/plugins

# Filter by vendor
wp-plugins get-plugins /path/to/plugins --vendor felixarntz
```

Output works with `xargs` for bulk operations.

### update-since

Replaces `n.e.x.t` placeholders in PHPDoc `@since` tags with the actual version.

```bash
wp-plugins update-since /path/to/plugin --version 1.2.0
```

Use during release preparation to finalize version numbers.

### verify-versions

Checks that version numbers are consistent across plugin files (main file, readme.txt, package.json).

```bash
wp-plugins verify-versions /path/to/plugin
```

Run before releasing to catch version mismatches.

## Bulk Operations

Combine `get-plugins` with `xargs` to process multiple plugins:

```bash
# Bump tested version for all plugins by a vendor
wp-plugins get-plugins ./plugins --vendor myvendor | \
  xargs -I {} wp-plugins bump-tested-wp {} --version 6.7

# Verify all plugins
wp-plugins get-plugins ./plugins | \
  xargs -I {} wp-plugins verify-versions {}
```

## Release Workflow

Typical release preparation:

```bash
# 1. Verify versions match
wp-plugins verify-versions .

# 2. Update @since n.e.x.t tags
wp-plugins update-since . --version 1.2.0

# 3. Generate changelog
wp-plugins generate-changelog . --tag 1.2.0
```

## CI Integration

Add to GitHub Actions for automated checks:

```yaml
- name: Verify plugin versions
  run: npx @felixarntz/wp-plugins-cli verify-versions .

- name: Update tested WordPress version
  run: |
    npx @felixarntz/wp-plugins-cli bump-tested-wp . --version ${{ inputs.wp_version }}
```
</knowledge>

<best_practices>
- Run `verify-versions` before every release
- Use `n.e.x.t` in `@since` tags during development, replace with `update-since` at release
- Automate `bump-tested-wp` after WordPress major releases
- Combine with `xargs` for multi-plugin repositories
</best_practices>

<references>
- [npm: @felixarntz/wp-plugins-cli](https://www.npmjs.com/package/@felixarntz/wp-plugins-cli)
- [GitHub: felixarntz/packages](https://github.com/felixarntz/packages/tree/main/packages/wp-plugins-cli)
</references>
</skill>

## Platform Integration

### Claude Code / Cursor / Cline

Reference this skill when preparing releases or maintaining plugins:

```markdown
For plugin releases, follow the workflow in:
skills/wordpress/wp-plugins-cli.md
```

### ChatGPT / Gemini

Describe the commands directly:

```
Use wp-plugins-cli commands:
- verify-versions: Check version consistency
- update-since: Replace n.e.x.t with version
- generate-changelog: Create changelog from commits
- bump-tested-wp: Update tested WordPress version
```
