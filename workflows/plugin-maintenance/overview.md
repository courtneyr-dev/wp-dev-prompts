# Plugin Maintenance Workflow

> **Workflow**: plugin-maintenance
> **Platforms**: All (CLI tools require Node.js)
> **Tools**: [@felixarntz/wp-plugins-cli](https://www.npmjs.com/package/@felixarntz/wp-plugins-cli)

## Overview

This workflow covers routine WordPress plugin maintenance tasks:

- Keeping "Tested up to" version current
- Preparing releases (version verification, changelog, @since tags)
- Managing multiple plugins efficiently

## Prerequisites

- Node.js 18+ installed
- Git repository with version tags
- Plugin follows WordPress standards (readme.txt, main file with version header)

## Install wp-plugins-cli

```bash
npm install -g @felixarntz/wp-plugins-cli
```

Or use via npx:

```bash
npx @felixarntz/wp-plugins-cli <command>
```

## Phases

| Phase | Purpose | Frequency |
|-------|---------|-----------|
| [WordPress Update](./wordpress-update.md) | Bump tested version | After WP releases |
| [Release Prep](./release-prep.md) | Prepare a new release | Each release |
| [Multi-Plugin](./multi-plugin.md) | Manage multiple plugins | As needed |
| [CI Integration](./ci-integration.md) | Automate in pipelines | Initial setup |

## Quick Reference

### After WordPress Release

```bash
wp-plugins bump-tested-wp . --version 6.7
git push
```

### Before Plugin Release

```bash
wp-plugins verify-versions .
wp-plugins update-since . --version 1.2.0
wp-plugins generate-changelog . --tag 1.2.0
```

### Multi-Plugin Operations

```bash
wp-plugins get-plugins ./plugins --vendor myname | \
  xargs -I {} wp-plugins bump-tested-wp {} --version 6.7
```

## Related Skills

- [wp-plugins-cli](../../skills/wordpress/wp-plugins-cli.md) - Full command reference
- [wp-cli](../../skills/wordpress/wp-cli.md) - WordPress CLI operations
- [plugin-architecture](../../skills/wordpress/plugin-architecture.md) - Plugin structure

## Next Steps

→ [WordPress Update](./wordpress-update.md) - Start with the most common task
