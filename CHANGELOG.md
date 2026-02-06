# Changelog

All notable changes to this project are documented in this file.

## [3.0.0] - 2026-02-06

### Added

- **Core prompts** (`prompts/core/`) — 6 portable, self-contained prompts under 2000 tokens each: plugin-setup, block-dev, testing-setup, security-review, accessibility-check, documentation
- **Claude Code structure** (`.claude/`) — CLAUDE.md, 5 slash commands, 5 subagents, hooks, settings
- **Prompt validation CI** (`.github/workflows/validate-prompts.yml`) — checks AI indicators, token limits, prompt structure, broken links
- **WordPress Playground skill** — browser-based testing and demos
- **PHP badge** in README

### Changed

- **Skills consolidated** — 76 flat files reorganized into 10 focused directory-based skills with YAML frontmatter (`SKILL.md`)
- **Version targets** — WordPress minimum raised to 6.9+, PHP minimum raised to 8.2+
- **CI matrix** — PHP 8.2-8.4, WordPress 6.7-6.9, dropped Node 18
- **Platform templates** — all updated to WP 6.9+ / PHP 8.2+ with Security Trinity structure
- **Capability matrix** — updated context windows (Gemini 2M, Copilot 128K)
- **README** — rewritten for v3 with core prompts table, directory tree, Claude Code quick start
- **Hooks** — expanded with PHPCS auto-fix, YAML frontmatter verification, ABSPATH checks
- **Skill paths** — updated across 48 files from old flat paths to new directory paths

### Archived

- Old 76-file skill structure preserved in `archive/v2.0/skills/`

### Removed

- Empty placeholder directories in `prompts/core/` (blocks/, documentation/, marketing/, security/, testing/)
- "Coming in v2.1" references

## [2.0.0] - 2025-01-04

- Tiered agent system (T1-T3)
- Product-market fit research prompt
- n8n platform integration
- WordPress Trac MCP server integration
- 20 new skills across testing, security, performance
- Marketing templates and community files

## [1.0.0] - 2024-12-30

- Initial release with extended prompts, agents, skills, and platform configs
