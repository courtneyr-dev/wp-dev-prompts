# Upstream Dependencies

This repository integrates content from external sources. This document tracks those dependencies and provides guidance for monitoring updates.

---

## Tracked Repositories

### 1. WordPress/agent-skills

**Repository**: [github.com/WordPress/agent-skills](https://github.com/WordPress/agent-skills)
**Previous Location**: WordPress/agent-skills (migrated to WordPress org)
**License**: MIT
**Last Synced**: 2026-02-02

**What we use:**
- WordPress router and project triage skills
- Block development and block themes skills
- REST API and Abilities API skills
- Interactivity API skill
- WP-CLI and ops skill
- WordPress Playground skill
- Performance profiling skill
- PHPStan configuration skill
- WordPress Design System (WPDS) skill
- Plugin development architecture and security patterns

**Skills (13 total):**
- wordpress-router
- wp-project-triage (NEW)
- wp-block-development
- wp-block-themes
- wp-plugin-development
- wp-rest-api (NEW)
- wp-interactivity-api
- wp-abilities-api (NEW)
- wp-wpcli-and-ops
- wp-performance
- wp-phpstan
- wp-playground
- wpds (NEW)

**Files affected:**
- `skills/wordpress-dev/*.md`
- `skills/wordpress-security/*.md`
- `skills/wordpress-performance/*.md`
- `skills/ui-ux-audit/wpds.md`

**Sync command:**
```bash
# Check for updates
gh api repos/WordPress/agent-skills/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
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
- `skills/prompt-engineering/SKILL.md`
- `skills/prompt-engineering/references/anti-patterns.md`
- `skills/prompt-engineering/references/style-guide.md`
- `skills/prompt-engineering/references/wordpress-publishing.md`
- `skills/prompt-engineering/scripts/publish-to-wordpress.py`

**Sync command:**
```bash
# Check for updates
gh api repos/richtabor/skills/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 2b. richtabor/agent-skills

**Repository**: [github.com/richtabor/agent-skills](https://github.com/richtabor/agent-skills)
**License**: Check repository
**Last Synced**: 2026-01-21

**What we use:**
- Accessibility review skill (WCAG 2.1/2.2 Level AA)
- Motion design skill (easing, duration tokens)
- X writing skill (Twitter content creation)

**Files affected:**
- `skills/wordpress-accessibility/accessibility-review.md`
- `skills/ui-ux-audit/motion-design.md`
- `skills/ui-ux-audit/references/decision-tree.md`
- `skills/ui-ux-audit/references/easing-tokens.md`
- `skills/prompt-engineering/x-writing.md`
- `skills/prompt-engineering/references/x-strategy.md`
- `skills/prompt-engineering/references/style-guide.md`
- `skills/prompt-engineering/references/anti-patterns.md`

**Sync command:**
```bash
# Check for updates
gh api repos/richtabor/agent-skills/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
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
- `skills/prompt-engineering/references/wordpress-docs-style-guide.md`

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
- `skills/wordpress-dev/wp-plugins-cli.md`
- `workflows/plugin-maintenance/`

**Sync command:**
```bash
# Check for updates
npm view @felixarntz/wp-plugins-cli version
gh api repos/felixarntz/packages/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 6. deanpeters/product-manager-prompts

**Repository**: [github.com/deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts)
**License**: MIT
**Last Synced**: 2026-01-21

**What we use:**
- Jobs to Be Done framework (adapted for WordPress)
- User story templates (adapted for WordPress personas)
- Positioning statement framework
- Proto-persona templates
- Problem framing canvas
- Feature hypothesis methodology

**Files affected:**
- `skills/product-management/jobs-to-be-done.md`
- `skills/product-management/user-story-wordpress.md`
- `skills/product-management/plugin-positioning.md`
- `skills/product-management/plugin-persona.md`
- `skills/product-management/problem-framing.md`
- `skills/product-management/feature-hypothesis.md`

**Sync command:**
```bash
# Check for updates
gh api repos/deanpeters/product-manager-prompts/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 7. EveryInc/compound-engineering-plugin

**Repository**: [github.com/EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)
**License**: MIT
**Last Synced**: 2026-01-21

**What we use:**
- Compound planning workflow (adapted for WordPress)
- Multi-dimensional code review process
- Solution documentation patterns
- Git worktree workflow

**Files affected:**
- `skills/engineering/compound-planning.md`
- `skills/engineering/compound-review.md`
- `skills/engineering/compound-docs.md`
- `skills/engineering/git-worktree-wordpress.md`

**Sync command:**
```bash
# Check for updates
gh api repos/EveryInc/compound-engineering-plugin/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 9. jonathanbossenger/wp-openrouter-provider

**Repository**: [github.com/jonathanbossenger/wp-openrouter-provider](https://github.com/jonathanbossenger/wp-openrouter-provider)
**License**: Check repository
**Last Synced**: 2026-02-09

**What we use:**
- WordPress AI Client provider registration pattern
- OpenRouter multi-model gateway integration
- OpenAI-compatible API wrapper for WordPress
- Settings API with Select2 searchable dropdowns
- Custom filter and public API patterns

**Files affected:**
- `skills/wordpress-dev/wp-openrouter-provider.md`

**Sync command:**
```bash
# Check for updates
gh api repos/jonathanbossenger/wp-openrouter-provider/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 10. laxmariappan/abilities-scout

**Repository**: [github.com/laxmariappan/abilities-scout](https://github.com/laxmariappan/abilities-scout)
**License**: GPL v2 or later
**Last Synced**: 2026-02-16

**What we use:**
- Static analysis scanner using `token_get_all()` for WordPress plugins
- Point-based scoring engine for ability classification
- Verb-based tool/resource classification (TOOL_VERBS, RESOURCE_VERBS)
- Infrastructure suffix filtering patterns
- Abilities API registration patterns (`wp_register_ability()`, `wp_register_ability_category()`)
- MCP tools integration for WordPress abilities

**Files affected:**
- `skills/wordpress-dev/abilities-scout.md`

**Sync command:**
```bash
# Check for updates
gh api repos/laxmariappan/abilities-scout/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 11. pluginslab/wp-devdocs-mcp

**Repository**: [github.com/pluginslab/wp-devdocs-mcp](https://github.com/pluginslab/wp-devdocs-mcp)
**License**: MIT
**Last Synced**: 2026-02-24

**What we use:**
- Local MCP server that indexes WordPress hooks, filters, blocks, and JS APIs from source code
- SQLite-backed full-text search for validated hook names and parameters
- Tools: `search_hooks`, `validate_hook`, `get_hook_context`, `search_block_apis`
- Eliminates AI hallucination of hook names by validating against actual source

**Files affected:**
- `platforms/claude-code/mcp-servers.md`
- `platforms/claude-code/README.md`

**Sync command:**
```bash
# Check for updates
gh api repos/pluginslab/wp-devdocs-mcp/commits --jq '.[0] | "\(.sha[0:7]) - \(.commit.message | split("\n")[0]) (\(.commit.author.date[0:10]))"'
```

---

### 8. skills.sh WordPress Skills

**Source**: [skills.sh](https://skills.sh)
**License**: Various (check individual repositories)
**Last Synced**: 2026-01-21

**What we use:**
- WordPress penetration testing methodology
- WordPress performance best practices (34 rules)
- WordPress plugin development core patterns
- WordPress REST API publishing
- WordPress project routing
- WordPress pro development patterns
- SEO WordPress manager (Yoast batch updates)

**Files affected:**
- `skills/wordpress-security/penetration-testing.md`
- `skills/wordpress-performance/performance-rules.md`
- `skills/wordpress-dev/plugin-core.md`
- `skills/wordpress-dev/wordpress-publisher.md`
- `skills/wordpress-dev/wordpress-router.md`
- `skills/wordpress-dev/wordpress-pro.md`
- `skills/wordpress-dev/seo-wordpress-manager.md`

**Individual sources:**

| Skill | Repository | Author |
|-------|------------|--------|
| penetration-testing | [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | sickn33 |
| performance-rules | [wordpress-performance-best-practises](https://github.com/bartekmis/wordpress-performance-best-practises) | bartekmis |
| plugin-core | [claude-skills](https://github.com/jezweb/claude-skills) | jezweb |
| wordpress-publisher | [claude-skills-library](https://github.com/aviz85/claude-skills-library) | aviz85 |
| wordpress-router | [agent-skills](https://github.com/WordPress/agent-skills) | WordPress |
| wordpress-pro | [claude-skills](https://github.com/jeffallan/claude-skills) | jeffallan |
| seo-wordpress-manager | [claude-content-skills](https://github.com/dragosroua/claude-content-skills) | dragosroua |

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
echo "=== WordPress/agent-skills ===" && \
gh api repos/WordPress/agent-skills/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== richtabor/skills ===" && \
gh api repos/richtabor/skills/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== WordPress/WordPress-Documentation-Style-Guide ===" && \
gh api repos/WordPress/WordPress-Documentation-Style-Guide/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== Jameswlepage/trac-mcp ===" && \
gh api repos/Jameswlepage/trac-mcp/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== felixarntz/packages ===" && \
gh api repos/felixarntz/packages/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== jonathanbossenger/wp-openrouter-provider ===" && \
gh api repos/jonathanbossenger/wp-openrouter-provider/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== laxmariappan/abilities-scout ===" && \
gh api repos/laxmariappan/abilities-scout/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"' && \
echo "\n=== pluginslab/wp-devdocs-mcp ===" && \
gh api repos/pluginslab/wp-devdocs-mcp/commits?per_page=3 --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"'
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
