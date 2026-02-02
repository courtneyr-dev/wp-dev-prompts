# WordPress Development Prompts

AI-powered toolkit for WordPress plugin and theme development. Works with Claude Code, Cursor, Cline, Copilot, ChatGPT, Gemini, and more.

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![WordPress](https://img.shields.io/badge/WordPress-6.5+-blue.svg)](https://wordpress.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## Quick Start

### Starting a new project?

**[PROJECT-KICKSTART-PROMPT.md](prompts/extended/PROJECT-KICKSTART-PROMPT.md)** — One prompt that guides you through planning, setup, testing, documentation, and launch.

### Validating an idea first?

**[PRODUCT-MARKET-FIT-RESEARCH.md](prompts/extended/PRODUCT-MARKET-FIT-RESEARCH.md)** — Research prompt to validate your plugin idea before building.

### Adding testing to existing code?

```bash
bash scripts/setup-testing.sh --plugin-name="My Plugin"
```

This sets up PHPUnit, PHPCS, PHPStan, ESLint, Jest, Playwright, and GitHub Actions.

---

## What's Here

| Directory | What It Contains | Start Here |
|-----------|------------------|------------|
| [prompts/](prompts/) | AI prompts for development tasks | [Prompts README](prompts/README.md) |
| [skills/](skills/) | Reusable knowledge modules (76 skills) | [Skills README](skills/README.md) |
| [agents/](agents/) | Specialized AI personas for site review | [Agents README](agents/README.md) |
| [workflows/](workflows/) | Step-by-step guides for complex tasks | [Workflows README](workflows/README.md) |
| [templates/](templates/) | Ready-to-use files (community, marketing, GitHub) | [Templates README](templates/README.md) |
| [platforms/](platforms/) | Config files for Claude Code, Cursor, Cline, Copilot | [Platforms README](platforms/README.md) |
| [guides/](guides/) | Documentation and setup guides | [Testing Guide](guides/testing/TESTING-SETUP-GUIDE.md) |
| [data/](data/) | Reference data (blocks, icons, audit checklists) | Core blocks, icons JSON |

---

## Choose Your Path

### I'm building a plugin or theme

1. [PROJECT-KICKSTART-PROMPT.md](prompts/extended/PROJECT-KICKSTART-PROMPT.md) — Full guided workflow
2. [skills/wordpress/](skills/wordpress/) — Plugin architecture, blocks, security patterns
3. [skills/testing/](skills/testing/) — PHPUnit, PHPCS, Playwright setup

### I want to review a website

1. [agents/compositions/full-site-assessment.md](agents/compositions/full-site-assessment.md) — All 10 specialists
2. [agents/specialists/](agents/specialists/) — Individual domain experts (SEO, performance, accessibility)

### I need testing for my project

1. [scripts/setup-testing.sh](scripts/setup-testing.sh) — Automated setup
2. [guides/testing/](guides/testing/) — Manual configuration guides
3. [skills/testing/](skills/testing/) — 29 testing skills

### I want marketing help

1. [prompts/extended/PLUGIN-MARKETING-PROMPTS.md](prompts/extended/PLUGIN-MARKETING-PROMPTS.md) — 32 marketing prompts
2. [templates/marketing/](templates/marketing/) — Blog posts, emails, social media, press releases

### I want product management tools

1. [skills/product-management/](skills/product-management/) — Jobs to Be Done, user stories, positioning, personas
2. [skills/engineering/](skills/engineering/) — Planning, code review, documentation workflows

### I'm designing UI components

1. [prompts/frontend-design/](prompts/frontend-design/) — Component design, style languages
2. [ui/storybook/](ui/storybook/) — 10 aesthetic themes with accessibility testing

---

## Platform Setup

Copy the appropriate config to your project:

| Platform | Config File | Copy From |
|----------|-------------|-----------|
| Claude Code | `CLAUDE.md` | [platforms/claude-code/](platforms/claude-code/) |
| Cursor | `.cursorrules` | [platforms/cursor/](platforms/cursor/) |
| Cline | `.clinerules` | [platforms/cline/](platforms/cline/) |
| Copilot | `copilot-instructions.md` | [platforms/copilot/](platforms/copilot/) |
| n8n | Workflow JSON | [platforms/n8n/](platforms/n8n/) |

---

## Skills Overview

76 skills across 10 categories:

| Category | Skills | Highlights |
|----------|--------|------------|
| [wordpress/](skills/wordpress/) | 16 | Plugin architecture, blocks, REST API, Interactivity API, WP-CLI |
| [security/](skills/security/) | 5 | Input sanitization, output escaping, nonces, SQL injection |
| [testing/](skills/testing/) | 29 | PHPUnit, PHPCS, PHPStan, Playwright, Jest |
| [performance/](skills/performance/) | 6 | Core Web Vitals, profiling, caching, 34 performance rules |
| [accessibility/](skills/accessibility/) | 6 | WCAG checklist, ARIA patterns, screen reader testing |
| [design/](skills/design/) | 2 | Motion design, WordPress Design System (WPDS) |
| [social-media/](skills/social-media/) | 1 | X/Twitter content creation |
| [product-management/](skills/product-management/) | 6 | JTBD, user stories, positioning, personas |
| [engineering/](skills/engineering/) | 4 | Planning, code review, documentation, git worktrees |
| [technical-writing/](skills/technical-writing/) | 1 | Blog post drafting with anti-patterns |

---

## Sources

This toolkit incorporates best practices from:

- **[WordPress/agent-skills](https://github.com/WordPress/agent-skills)** — WordPress development patterns (MIT)
- **[richtabor/agent-skills](https://github.com/richtabor/agent-skills)** — Accessibility, motion design, X writing
- **[deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts)** — Product management frameworks (MIT)
- **[EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)** — Engineering workflows (MIT)
- **[skills.sh](https://skills.sh)** — Community WordPress skills
- **[@felixarntz/wp-plugins-cli](https://www.npmjs.com/package/@felixarntz/wp-plugins-cli)** — Plugin maintenance CLI
- **[Jameswlepage/trac-mcp](https://github.com/Jameswlepage/trac-mcp)** — WordPress Trac access

See [UPSTREAM.md](UPSTREAM.md) for sync status.

---

## Contributing

Contributions welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[CC0 1.0 Universal (Public Domain)](LICENSE) — Use freely, no attribution required.

---

**Ready to start?** → [PROJECT-KICKSTART-PROMPT.md](prompts/extended/PROJECT-KICKSTART-PROMPT.md)
