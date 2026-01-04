# Upstream Dependencies

This repository integrates content from external sources. This document tracks those dependencies and provides guidance for monitoring updates.

---

## Tracked Repositories

### 1. Automattic/agent-skills

**Repository**: [github.com/Automattic/agent-skills](https://github.com/Automattic/agent-skills)
**License**: MIT
**Last Synced**: 2025-01-01

**What we use:**
- WordPress security skills (input sanitization, output escaping, nonces, database queries)
- Patterns and anti-patterns for secure WordPress development

**Files affected:**
- `skills/security/*.md`

**Sync command:**
```bash
# Check for updates
gh api repos/Automattic/agent-skills/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 2. richtabor/skills

**Repository**: [github.com/richtabor/skills](https://github.com/richtabor/skills)
**License**: Check repository
**Last Synced**: 2025-01-02

**What we use:**
- Technical writing skill for drafting blog posts from repositories
- Anti-patterns guide to avoid AI-sounding prose
- Style guide for voice consistency
- WordPress REST API publishing script

**Files affected:**
- `skills/technical-writing/SKILL.md`
- `skills/technical-writing/references/anti-patterns.md`
- `skills/technical-writing/references/style-guide.md`
- `skills/technical-writing/references/wordpress-publishing.md`
- `skills/technical-writing/scripts/publish-to-wordpress.py`

**Sync command:**
```bash
# Check for updates
gh api repos/richtabor/skills/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 3. WordPress/WordPress-Documentation-Style-Guide

**Repository**: [github.com/WordPress/WordPress-Documentation-Style-Guide](https://github.com/WordPress/WordPress-Documentation-Style-Guide)
**Official Guide**: [make.wordpress.org/docs/style-guide](https://make.wordpress.org/docs/style-guide/)
**License**: GPLv2+
**Last Synced**: 2025-01-02

**What we use:**
- Voice and tone guidelines
- Language standards (American English, word choice)
- Accessibility requirements
- Inclusivity guidelines
- Formatting standards

**Files affected:**
- `skills/technical-writing/references/wordpress-docs-style-guide.md`

**Sync command:**
```bash
# Check for updates
gh api repos/WordPress/WordPress-Documentation-Style-Guide/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 4. Jameswlepage/trac-mcp

**Repository**: [github.com/Jameswlepage/trac-mcp](https://github.com/Jameswlepage/trac-mcp)
**License**: GPLv2+
**Last Synced**: 2025-01-04

**What we use:**
- MCP server configuration for WordPress.org Trac access
- Tool documentation and usage examples

**Files affected:**
- `platforms/claude-code/mcp-servers.md`
- `platforms/claude-code/README.md`

**Sync command:**
```bash
# Check for updates
gh api repos/Jameswlepage/trac-mcp/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 5. felixarntz/packages (wp-plugins-cli)

**Repository**: [github.com/felixarntz/packages](https://github.com/felixarntz/packages)
**NPM Package**: [@felixarntz/wp-plugins-cli](https://www.npmjs.com/package/@felixarntz/wp-plugins-cli)
**License**: MIT
**Last Synced**: 2025-01-04

**What we use:**
- CLI tool documentation for plugin maintenance
- Workflow integration for version management

**Files affected:**
- `skills/wordpress/wp-plugins-cli.md`
- `workflows/plugin-maintenance/`

**Sync command:**
```bash
# Check for updates
npm view @felixarntz/wp-plugins-cli version
gh api repos/felixarntz/packages/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

## Monitoring Strategy

### Automated (GitHub Actions)

The workflow at `.github/workflows/upstream-check.yml` runs weekly to:
1. Check each upstream repository for new commits
2. Create an issue if updates are detected
3. Include diff summary and affected files

### Manual Check

Run this command to check all upstreams at once:

```bash
# Check all upstream repos for recent activity
echo "=== Automattic/agent-skills ===" && \
gh api repos/Automattic/agent-skills/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== richtabor/skills ===" && \
gh api repos/richtabor/skills/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== WordPress/WordPress-Documentation-Style-Guide ===" && \
gh api repos/WordPress/WordPress-Documentation-Style-Guide/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== Jameswlepage/trac-mcp ===" && \
gh api repos/Jameswlepage/trac-mcp/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== felixarntz/packages ===" && \
gh api repos/felixarntz/packages/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"'
```

---

## Update Process

When upstream changes are detected:

### 1. Review Changes

```bash
# View recent changes in upstream repo
gh repo view <owner>/<repo> --web
# Or check the commits tab directly
```

### 2. Evaluate Relevance

Not all upstream changes need syncing. Consider:
- Does it affect files we've integrated?
- Does it fix bugs or add valuable features?
- Does it change APIs we depend on?

### 3. Apply Updates

For each affected file:
1. Compare our version with upstream
2. Merge relevant changes manually
3. Preserve any local customizations
4. Update "Last Synced" date in this file

### 4. Document Changes

Update the changelog or commit message to note:
- Which upstream changed
- What was synced
- Any local modifications preserved

---

## Attribution

All integrated content maintains proper attribution:
- Source links in file headers
- Credits in `skills/README.md`
- License compliance in this document

When referencing upstream content:
- Link to the original repository
- Include the source in `<references>` tags
- Preserve original author credits
