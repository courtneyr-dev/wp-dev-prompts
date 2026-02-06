# v3.0 Audit & Inventory

Comprehensive audit of the wp-dev-prompts repository, prepared for the v2.0 to v3.0 modernization.

**Audit Date**: 2026-02-06
**Current Version**: 2.0.0 (last updated December 30, 2024)
**Target Version**: 3.0.0

---

## File Inventory

### Root Files

| File | Purpose | Status |
|------|---------|--------|
| `CLAUDE.md` | Claude Code project instructions | Needs update for v3 structure |
| `README.md` | Main project documentation | Outdated badges (WP 6.5+), needs v3 rewrite |
| `CONTRIBUTING.md` | Contribution guidelines | Uses emojis, outdated directory tree, needs update |
| `CODE_OF_CONDUCT.md` | Community standards | OK |
| `LICENSE` | CC0-1.0 license | OK |
| `SUPPORT.md` | Support channels | OK |
| `UPSTREAM.md` | Upstream dependency tracking | Well-maintained, last synced Feb 2026 |

### `.claude/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `commands/add-skill.md` | Scaffold a new skill | Functional |
| `commands/add-to-claude-md.md` | Record learnings | Functional |
| `commands/check-upstream.md` | Check upstream repos | Functional |
| `commands/commit-push-pr.md` | Git workflow | Functional |
| `commands/draft-post.md` | Blog post drafting | Functional |
| `commands/verify-content.md` | Content quality check | Functional |
| `commands/verify-repo.md` | Repo health check | Functional |
| `hooks.json` | PostToolUse (prettier), PreCommit (AI word check) | Functional but limited |
| `settings.json` | Permission allowlist | Functional |
| `settings.local.json` | Local overrides | OK |

**Missing from `.claude/`:**
- No `agents/` directory (subagents not in proper format)
- No audit-prompt, new-prompt, validate-repo, kickstart, or wp-check commands
- No settings.json template for other users

### `.github/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `dependabot.yml` | Dependency updates | OK |
| `workflows/audit.yml` | WordPress audit | OK |
| `workflows/ci-fast.yml` | PR checks (lint, test, validate) | Uses actions/checkout@v4, OK |
| `workflows/ci-nightly.yml` | Nightly comprehensive tests | OK |
| `workflows/dependabot-auto-merge.yml` | Auto-merge dependabot PRs | OK |
| `workflows/graphql-audit.yml` | GraphQL API audit | OK |
| `workflows/release-candidate.yml` | RC workflow | OK |
| `workflows/ui-ux-audit.yml` | UI/UX testing | OK |
| `workflows/upstream-check.yml` | Weekly upstream monitoring | OK |

**Issues:**
- No workflow for prompt token count validation
- No workflow for dead link checking
- PHP matrix should include 8.4
- WordPress matrix should target 6.7, 6.8, 6.9, trunk

### `agents/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `AGENT_INDEX.md` | Agent catalog | OK |
| `README.md` | Agents overview | OK |
| **compositions/** | | |
| `content-review.md` | Multi-agent content review | Prompt doc, not Claude Code subagent |
| `experience-review.md` | UX review composition | Prompt doc, not Claude Code subagent |
| `full-site-assessment.md` | Complete site review | Prompt doc, not Claude Code subagent |
| `launch-readiness.md` | Launch checklist composition | Prompt doc, not Claude Code subagent |
| `security-review.md` | Security review composition | Prompt doc, not Claude Code subagent |
| **orchestrators/** | | |
| `qa-director.md` | QA workflow orchestrator | References PHP 7.4-8.3, WP 6.4-6.7 (outdated) |
| `repo-template-architect.md` | Repository scaffolding | Prompt doc |
| `risk-manager.md` | Risk assessment | Prompt doc |
| `site-review-orchestrator.md` | Site review coordinator | Prompt doc |
| `test-architecture.md` | Test infrastructure planner | Prompt doc |
| **specialists/** | | |
| `accessibility.md` | Accessibility specialist | Prompt doc, not Claude Code subagent |
| `analytics.md` | Analytics specialist | Prompt doc |
| `brand-consistency.md` | Brand review | Prompt doc |
| `competitive-intel.md` | Competitive analysis | Prompt doc |
| `content-strategy.md` | Content strategy | Prompt doc |
| `localization.md` | i18n/l10n specialist | Prompt doc |
| `performance.md` | Performance analyst | Prompt doc |
| `security-advisory.md` | Security advisor | Prompt doc |
| `seo-strategy.md` | SEO specialist | Prompt doc |
| `user-research.md` | User research | Prompt doc |
| **specialists/accessibility/** | 4 specialized a11y agents | Prompt docs |
| **specialists/ci/** | 4 CI/CD agents | Prompt docs |
| **specialists/dx/** | 3 developer experience agents | Prompt docs |
| **specialists/extras/** | 4 misc agents (docs, chaos, flaky, legal) | Prompt docs |
| **specialists/release/** | 4 release management agents | Prompt docs |
| **specialists/security/** | 4 security agents | Prompt docs |
| **specialists/testing/** | 7 testing agents | Prompt docs |
| **specialists/wordpress/** | 5 WordPress-specific agents | Prompt docs |

**Key Finding:** None of the 45+ agent files are actual Claude Code subagents. They all use a custom `<agent>` XML format that doesn't match the `.claude/agents/` format Claude Code expects. They're prompt documents posing as agent configs.

### `archive/` Directory

| Path | Purpose | Status |
|------|---------|--------|
| `v1.3-original/` | Full v1.3 snapshot | Preserve as-is |

No changes needed here.

### `data/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `README.md` | Data directory overview | OK |
| `core-blocks.json` | WordPress core block list (7KB) | May need WP 6.9 update |
| `core-icons.json` | WordPress icon set (5.3KB) | OK |
| `graphql-audit-checklist.yaml` | GraphQL audit checklist (13KB) | OK |
| `ui-ux-audit-checklist.yaml` | UI/UX audit checklist (36KB) | OK |
| `wpaudit-checklist.json` | WordPress audit checklist (15KB) | OK |

### `docs/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `README.md` | Docs overview | OK |
| `CROSS-PLATFORM-IMPLEMENTATION-PLAN.md` | Platform implementation details | References WP 6.9, some sections OK |
| `SETUP-COMPLETE.md` | Setup verification | References PHP 8.0-8.3, WP 6.5 (outdated) |
| `audit.md` | Audit documentation | OK |
| `audit/graphql-audit.md` | GraphQL audit guide | OK |
| `core-blocks-reference.md` | Block reference guide | OK |
| `design-style-guide.md` | Design guidelines | OK |
| `icons.md` | Icon usage guide | OK |
| `product-research.md` | Product research methodology | References PHP 7.4 (outdated) |
| `ui-ux-audit.md` | UI/UX audit guide | OK |
| `ui-ux-guidelines.md` | UI/UX standards | OK |
| `wordcamp-asia-2026/` | 9 WordCamp presentation files | OK, conference prep |

### `github-workflows/` Directory (Template Workflows)

| File | Purpose | Status |
|------|---------|--------|
| `visual-regression-testing.yml` | VRT workflow template | OK |
| `wordpress-plugin-ci.yml` | Plugin CI template | Needs PHP/WP version updates |

### `guides/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `README.md` | Guides overview | OK |
| `DEVELOPMENT-LIFECYCLE.md` | Full dev lifecycle | References WP 6.5 (outdated) |
| `DOCUMENTATION-WORKFLOW.md` | Documentation process | References WP 6.5 (outdated) |
| `PLUGIN-DEVELOPMENT-WORKFLOW.md` | Plugin dev workflow (3900+ lines) | References WP 6.8 (mostly current) |
| `PLUGIN-MARKETING-STRATEGY.md` | Marketing strategy guide | OK |
| `SCREENSHOT-DOCUMENTATION-GUIDE.md` | Screenshot guide | OK |
| `testing/` | 4 testing guides | References PHP 8.0-8.3, WP 6.5 |

### `platforms/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `README.md` | Platform overview | OK |
| **chatgpt/** | | |
| `custom-gpt-config.md` | ChatGPT config | References PHP 7.4+, WP 6.0+ (very outdated) |
| **claude-code/** | | |
| `CLAUDE.md.template` | Project CLAUDE.md template | Functional but long |
| `README.md` | Claude Code setup guide | OK |
| `mcp-servers.md` | MCP server configurations | OK |
| **cline/** | | |
| `README.md` | Cline setup | OK |
| `clinerules.template` | Cline rules template | OK |
| **copilot/** | | |
| `README.md` | Copilot setup | OK |
| `copilot-instructions.template` | Copilot instructions | OK |
| **cursor/** | | |
| `README.md` | Cursor setup | OK |
| `cursorrules.template` | Cursor rules template | Needs update for current Cursor |
| **gemini/** | | |
| `system-instructions.md` | Gemini system prompt | References PHP 7.4+, WP 6.0+ (very outdated) |
| **n8n/** | | |
| `README.md` | n8n overview | OK |
| `getting-started.md` | n8n setup guide | OK |
| **universal/** | | |
| `README.md` | Universal docs overview | OK |
| `capability-matrix.md` | Platform capabilities | Missing: Skills, Subagent, Hook, Plugin, MCP columns |
| `prompt-specification.md` | Prompt format spec | OK |

### `prompts/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `README.md` | Prompts overview | OK |
| **Root-level duplicates** | | |
| `BLOCK-DEVELOPMENT-PROMPTS.md` | Block dev prompts | Duplicate of extended/ version |
| `COMMUNITY-FILES-PROMPTS.md` | Community file generation | Duplicate of extended/ version |
| `PLUGIN-MARKETING-PROMPTS.md` | Marketing prompts | Duplicate of extended/ version |
| `PROJECT-KICKSTART-PROMPT.md` | Project kickstart | Duplicate of extended/ version |
| `TESTING-AUTOMATION-PROMPTS.md` | Testing setup | Duplicate of extended/ version |
| **audit/** | | |
| `README.md` | Audit prompts overview | OK |
| `graphql-audit.md` | GraphQL audit prompt | OK |
| **blocks/** | | |
| `README.md` | Block prompts overview | OK |
| `block-pattern-recommender.md` | Block pattern helper | OK |
| `core-blocks-assistant.md` | Core blocks helper | OK |
| `icon-assistant.md` | Icon assistant | OK |
| **core/** | | |
| `README.md` | "Coming in v2.1" placeholder | **NEVER DELIVERED** |
| **extended/** | | |
| 6 prompt files + README | Full-featured prompts | Functional |
| **frontend-design/** | | |
| 5 prompt files + README | Frontend design prompts | OK |
| **legacy/** | | |
| `README.md` | Legacy prompt redirect | OK |
| **site-review/** | | |
| `DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md` | Full site review | OK |
| `README.md` | Site review overview | OK |
| **testing/** | | |
| 4 prompt files + README | Testing prompts | OK |
| **tiered/** | | |
| 12 prompt files across 3 tiers + README | Tiered agent prompts | OK |

**Key Issues:**
- 5 root-level prompts are exact duplicates of files in `extended/`
- `prompts/core/` is still a placeholder ("Coming in v2.1") - never delivered
- Root-level prompts should redirect to extended/ or be removed

### `scripts/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `fetch-wphelpers-data.js` | Fetch WP helper data | OK |
| `setup-testing.sh` | Test infrastructure setup | OK |

### `skills/` Directory

76 skills across 10 categories:

| Category | Files | Status |
|----------|-------|--------|
| **accessibility/** | 6 skills + README | Knowledge docs, not proper SKILL.md format |
| **design/** | 2 skills + README + 2 references | Knowledge docs except motion-design references |
| **engineering/** | 4 skills + README | Knowledge docs, references WP 6.4 (outdated) |
| **performance/** | 6 skills + README | Knowledge docs, mostly current |
| **product-management/** | 6 skills + README | Knowledge docs |
| **security/** | 5 skills + README | Knowledge docs |
| **social-media/** | 1 skill + README + 3 references | Knowledge docs |
| **technical-writing/** | 1 SKILL.md + 4 references + script + .env | **Only properly formatted skill** |
| **testing/** | 29 skills + README | Knowledge docs |
| **wordpress/** | 16 skills + README | Knowledge docs, some reference WP 6.5 |

**Key Finding:** Only `skills/technical-writing/SKILL.md` follows the actual SKILL.md format with `<skill>`, `<summary>`, `<knowledge>`, and `<references>` tags. The other 75 skills use similar XML tags but aren't structured as proper Claude Code Skills with YAML frontmatter and trigger descriptions. None have the directory-based structure (`skills/category/SKILL.md`) that Claude Code expects.

### `templates/` Directory

| Category | Files | Status |
|----------|-------|--------|
| **checklists/** | 1 QA checklist + README | OK |
| **community/** | 3 templates + README | OK |
| **github/** | 4 issue/PR templates + README | OK |
| **marketing/** | 6 templates + README + style references | OK |
| **n8n/** | 3 workflow templates + README | OK |
| **workflows/** | 4 templates + README | References WP 6.8 |

### `tests/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `README.md` | Test overview | OK |
| `audit/graphql.spec.ts` | GraphQL audit tests | OK |
| `ui-ux/*.spec.ts` | 6 UI/UX Playwright tests | OK |

### `ui/storybook/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `.storybook/main.js` | Storybook config | OK |
| `.storybook/preview.js` | Storybook preview | OK |
| `README.md` | Storybook overview | OK |
| `stories/*.stories.*` | 3 story files | OK |
| `stories/ui-ux/*.stories.tsx` | 3 UI/UX stories | OK |
| `styles/*.css` | 2 style files | OK |

### `workflows/` Directory

| File | Purpose | Status |
|------|---------|--------|
| `README.md` | Workflows overview | OK |
| **plugin-maintenance/** | 5 workflow files | OK |
| **tiered-agents/** | 7 tiered agent docs | OK |

---

## Outdated Version References

### WordPress Versions Below 6.7

| File | Reference | Needs Update |
|------|-----------|--------------|
| `README.md` | Badge: WordPress-6.5+ | Update to 6.9+ |
| `skills/engineering/compound-docs.md` | WordPress 6.4 (x2) | Update to 6.9+ |
| `skills/engineering/compound-planning.md` | WordPress 6.4+ | Update to 6.9+ |
| `skills/testing/plugin-headers.md` | Requires at least: 6.5 | Update to 6.9 |
| `skills/testing/readme-validation.md` | Requires at least: 6.5 (x2) | Update to 6.9 |
| `skills/wordpress/plugin-architecture.md` | Requires at least: 6.5 | Update to 6.9 |
| `skills/wordpress/wordpress-router.md` | WordPress 6.5+ required | Update to 6.9+ |
| `skills/wordpress/wordpress-pro.md` | WordPress 6.4+ | Update to 6.9+ |
| `guides/DEVELOPMENT-LIFECYCLE.md` | Requires at least: 6.5 (x2) | Update to 6.9 |
| `guides/DOCUMENTATION-WORKFLOW.md` | WordPress 6.5 or higher | Update to 6.9 |
| `docs/SETUP-COMPLETE.md` | WordPress 6.5-trunk | Update to 6.7-trunk |
| `platforms/chatgpt/custom-gpt-config.md` | WordPress 6.0+ | Update to 6.9+ |
| `platforms/gemini/system-instructions.md` | WordPress 6.0+, 6.5+ | Update to 6.9+ |
| `agents/orchestrators/qa-director.md` | WP 6.4-6.7 | Update to 6.7-6.9 |
| `agents/specialists/ci/compatibility-matrix.md` | WP 6.2+ | Update to 6.7+ |
| `agents/specialists/ci/github-actions-architect.md` | WP 6.4-6.5 | Update to 6.7-6.9 |
| `agents/specialists/release/*.md` | WP 6.0 references | Update to 6.9 |
| `docs/wordcamp-asia-2026/SHIPPABLE-PLUGIN-CHECKLIST.md` | Requires at least: 6.0 | Update to 6.9 |
| `prompts/extended/PROJECT-KICKSTART-PROMPT.md` | Compatible: WP 6.5+ | Update to 6.9+ |

### PHP References Below 8.2

| File | Reference | Needs Update |
|------|-----------|--------------|
| `skills/engineering/compound-planning.md` | PHP 8.0+ | Update to 8.2+ |
| `prompts/BLOCK-DEVELOPMENT-PROMPTS.md` | PHP 8.0+ | Update to 8.2+ |
| `prompts/TESTING-AUTOMATION-PROMPTS.md` | PHP 8.0+ | Update to 8.2+ |
| `prompts/extended/*.md` | PHP 8.0+ | Update to 8.2+ |
| `agents/orchestrators/qa-director.md` | PHP 7.4-8.3 | Update to 8.2-8.4 |
| `agents/specialists/ci/compatibility-matrix.md` | PHP 7.4-8.3 | Update to 8.2-8.4 |
| `agents/specialists/ci/github-actions-architect.md` | PHP 7.4-8.3 | Update to 8.2-8.4 |
| `agents/specialists/release/release-manager.md` | PHP 7.4+ | Update to 8.2+ |
| `platforms/chatgpt/custom-gpt-config.md` | PHP 7.4+ | Update to 8.2+ |
| `platforms/gemini/system-instructions.md` | PHP 7.4+ | Update to 8.2+ |
| `docs/SETUP-COMPLETE.md` | PHP 8.0-8.3 | Update to 8.2-8.4 |
| `docs/product-research.md` | PHP 7.4, 8.0 | Update to 8.2+ |
| `skills/wordpress/plugin-architecture.md` | Requires PHP: 8.0 | Update to 8.2 |
| `skills/wordpress/project-triage.md` | PHP 7.2.24+ | Update to 8.2+ |
| `skills/testing/php-compatibility.md` | testVersion 7.4-8.3 | Update to 8.2-8.4 |

---

## Skills Format Assessment

### Current State

Only 1 of 76 skills follows a proper SKILL.md format: `skills/technical-writing/SKILL.md`

All other skills use a `<skill>` XML wrapper with `<summary>`, `<knowledge>`, and `<references>` sections, but lack:

1. **YAML frontmatter** with `name`, `description`, `triggers`
2. **Directory-based structure** (each skill as a directory with SKILL.md)
3. **Trigger descriptions** for auto-invocation
4. **Bundled scripts or reference data** in the skill directory

### What They Are

The current skills are **knowledge documents** formatted as markdown with XML semantic tags. They work well when manually referenced but can't be auto-invoked by Claude Code.

### Conversion Needed

Convert to directory-based structure:
```
skills/wordpress-plugin-dev/
├── SKILL.md          # YAML frontmatter + instructions
└── checklist.yaml    # Optional bundled data
```

---

## Agent Format Assessment

### Current State

None of the 45+ agent files are actual Claude Code subagents. They use a custom format:

```xml
<agent type="specialist">
<role>You are a...</role>
<analyzes>...</analyzes>
<delivers>...</delivers>
<methodology>...</methodology>
</agent>
```

### What They Should Be

Claude Code subagents in `.claude/agents/` with:
- YAML frontmatter specifying allowed tools
- Focused system prompt
- Clear scope boundaries

---

## Dead Links & Missing Content

### "Coming Soon" Content

| Location | Promise | Status |
|----------|---------|--------|
| `prompts/core/README.md` | "Coming in v2.1" | **Never delivered** |
| `prompts/extended/README.md` | Core Prompts "(coming soon)" link | Points to empty placeholder |

### Duplicate Files

The following prompts exist at root level AND in `extended/`:

| Root File | Extended File | Action |
|-----------|--------------|--------|
| `prompts/BLOCK-DEVELOPMENT-PROMPTS.md` | `prompts/extended/BLOCK-DEVELOPMENT-PROMPTS.md` | Remove root duplicate |
| `prompts/COMMUNITY-FILES-PROMPTS.md` | `prompts/extended/COMMUNITY-FILES-PROMPTS.md` | Remove root duplicate |
| `prompts/PLUGIN-MARKETING-PROMPTS.md` | `prompts/extended/PLUGIN-MARKETING-PROMPTS.md` | Remove root duplicate |
| `prompts/PROJECT-KICKSTART-PROMPT.md` | `prompts/extended/PROJECT-KICKSTART-PROMPT.md` | Remove root duplicate |
| `prompts/TESTING-AUTOMATION-PROMPTS.md` | `prompts/extended/TESTING-AUTOMATION-PROMPTS.md` | Remove root duplicate |

### Broken/Missing Internal Links

- CONTRIBUTING.md directory tree doesn't match actual structure (missing skills/, agents/, etc.)
- `prompts/extended/README.md` links to `../core/` which is just a placeholder
- Several README files reference structures that have since changed

---

## Summary of Required Changes

### Critical (Must Fix)

1. Deliver `prompts/core/` (promised in v2.1, never delivered)
2. Convert skills to proper Claude Code SKILL.md format with YAML frontmatter
3. Create `.claude/agents/` with proper subagent format
4. Update all WordPress version references to 6.9+
5. Update all PHP version references to 8.2+
6. Remove duplicate root-level prompts

### Important (Should Fix)

7. Add new slash commands (audit-prompt, new-prompt, validate-repo, kickstart, wp-check)
8. Modernize platform configs (ChatGPT, Gemini especially outdated)
9. Update capability matrix with 2025/2026 features
10. Update CI/CD workflows for PHP 8.2-8.4, WP 6.7-6.9+trunk
11. Add prompt validation workflow (token count, dead links)
12. Modernize README.md with v3.0 structure

### Nice to Have

13. Add hooks for WordPress-specific file editing
14. Update CONTRIBUTING.md directory tree
15. Add Claude Code plugin installation instructions
16. Create CHANGELOG.md entry for v3.0.0

---

## File Count Summary

| Category | Count |
|----------|-------|
| Total files (excluding .git, archive) | ~180 |
| Markdown files | ~160 |
| Skills | 76 |
| Agents | 45+ |
| Prompts | ~30 |
| Templates | ~20 |
| Workflows | 12 |
| Data files | 5 |
| Test files | 7 |
| Scripts | 2 |
| GitHub workflows | 9 |
| Platform configs | ~15 |
