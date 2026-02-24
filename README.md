# WordPress Development Prompts

AI-powered toolkit for WordPress plugin, block, and theme development. Works with Claude Code, Cursor, Cline, Copilot, ChatGPT, Gemini, and more.

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![WordPress](https://img.shields.io/badge/WordPress-6.9+-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-8.2+-purple.svg)](https://www.php.net/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## Quick Start

### Any platform — paste and go

Open a [core prompt](prompts/core/) in ChatGPT, Gemini, Claude, or any AI assistant. No setup required.

| Prompt | What It Does |
|--------|-------------|
| [plugin-setup](prompts/core/plugin-setup.md) | Scaffold a new WordPress plugin |
| [block-dev](prompts/core/block-dev.md) | Create a custom block (apiVersion 3) |
| [testing-setup](prompts/core/testing-setup.md) | Set up PHPUnit, PHPCS, PHPStan, CI |
| [security-review](prompts/core/security-review.md) | Audit code with the Security Trinity |
| [accessibility-check](prompts/core/accessibility-check.md) | WCAG 2.2 Level AA audit |
| [documentation](prompts/core/documentation.md) | Generate readme.txt + docs |

### Claude Code — full workflow

```bash
# Add project instructions
cp platforms/claude-code/CLAUDE.md.template CLAUDE.md
# Edit CLAUDE.md with your plugin details, then:
claude
```

### Full project kickstart

**[PROJECT-KICKSTART-PROMPT.md](prompts/extended/PROJECT-KICKSTART-PROMPT.md)** — guides you through planning, setup, testing, documentation, and launch.

---

## What's Here

```
wp-dev-prompts/
├── prompts/
│   ├── core/           # 6 portable prompts (<2000 tokens, any platform)
│   └── extended/       # Full-featured prompts (Claude Code, Cursor)
├── skills/             # 10 knowledge modules with YAML frontmatter
├── agents/             # Specialist AI personas for site review
├── workflows/          # Step-by-step guides for complex tasks
├── templates/          # Ready-to-use files (community, marketing, GitHub)
├── platforms/          # Config templates for Claude Code, Cursor, Cline, Copilot
├── guides/             # Documentation and setup guides
├── data/               # Reference data (blocks, icons, checklists)
└── .claude/            # Claude Code commands and agents
```

---

## Skills

10 focused skills, each a directory with `SKILL.md` (YAML frontmatter) and optional bundled files:

| Skill | What It Covers |
|-------|---------------|
| [wordpress-dev](skills/wordpress-dev/) | Plugin architecture, blocks (apiVersion 3), themes, REST API, Interactivity API |
| [wordpress-security](skills/wordpress-security/) | Security Trinity, OWASP patterns, nonces, capabilities |
| [wordpress-testing](skills/wordpress-testing/) | PHPUnit, PHPCS, PHPStan, Playwright, Jest, CI setup |
| [wordpress-playground](skills/wordpress-playground/) | WordPress Playground for demos and testing |
| [wordpress-accessibility](skills/wordpress-accessibility/) | WCAG 2.2 Level AA, ARIA patterns, screen reader testing |
| [wordpress-performance](skills/wordpress-performance/) | Core Web Vitals, caching, database optimization |
| [prompt-engineering](skills/prompt-engineering/) | Prompt structure, writing anti-patterns, token optimization |
| [ui-ux-audit](skills/ui-ux-audit/) | Motion design, easing tokens, WPDS patterns |
| [engineering](skills/engineering/) | Planning, code review, git worktrees |
| [product-management](skills/product-management/) | JTBD, personas, positioning, user stories |

---

## Choose Your Path

### Building a plugin or theme

1. [plugin-setup prompt](prompts/core/plugin-setup.md) — scaffold with security patterns
2. [wordpress-dev skill](skills/wordpress-dev/) — architecture, blocks, REST API
3. [PROJECT-KICKSTART-PROMPT.md](prompts/extended/PROJECT-KICKSTART-PROMPT.md) — full guided workflow

### Adding testing

1. [testing-setup prompt](prompts/core/testing-setup.md) — PHPUnit + PHPCS + CI
2. [setup-testing.sh](scripts/setup-testing.sh) — automated setup script
3. [wordpress-testing skill](skills/wordpress-testing/) — patterns and configuration

### Reviewing security

1. [security-review prompt](prompts/core/security-review.md) — Security Trinity audit
2. [wordpress-security skill](skills/wordpress-security/) — sanitize, validate, escape

### Reviewing a website

1. [Full site assessment](agents/compositions/full-site-assessment.md) — all 10 specialists
2. [Individual specialists](agents/specialists/) — SEO, performance, accessibility

### Marketing your plugin

1. [PLUGIN-MARKETING-PROMPTS.md](prompts/extended/PLUGIN-MARKETING-PROMPTS.md) — 32 prompts
2. [Marketing templates](templates/marketing/) — blog posts, emails, social media

---

## Platform Setup

Copy a template to your project root and customize:

| Platform | Template | Copy To |
|----------|----------|---------|
| Claude Code | [CLAUDE.md.template](platforms/claude-code/CLAUDE.md.template) | `CLAUDE.md` |
| Cursor | [cursorrules.template](platforms/cursor/cursorrules.template) | `.cursorrules` |
| Cline | [clinerules.template](platforms/cline/clinerules.template) | `.clinerules` |
| Copilot | [copilot-instructions.template](platforms/copilot/copilot-instructions.template) | `.github/copilot-instructions.md` |
| ChatGPT | [custom-gpt-config.md](platforms/chatgpt/custom-gpt-config.md) | Custom GPT instructions |
| Gemini | [system-instructions.md](platforms/gemini/system-instructions.md) | System instructions |

See [Platform Capability Matrix](platforms/universal/capability-matrix.md) for a full comparison.

---

## Sources

This toolkit builds on:

- **[WordPress/agent-skills](https://github.com/WordPress/agent-skills)** — WordPress development patterns (MIT)
- **[richtabor/skills](https://github.com/richtabor/skills)** — Technical writing and style guides
- **[richtabor/agent-skills](https://github.com/richtabor/agent-skills)** — Accessibility, motion design, X writing
- **[WordPress/WordPress-Documentation-Style-Guide](https://github.com/WordPress/WordPress-Documentation-Style-Guide)** — Official WordPress docs style guide (GPLv2+)
- **[deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts)** — Product management frameworks (MIT)
- **[EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)** — Engineering workflows (MIT)
- **[skills.sh](https://skills.sh)** — Community WordPress skills
- **[@felixarntz/wp-plugins-cli](https://www.npmjs.com/package/@felixarntz/wp-plugins-cli)** — Plugin maintenance CLI
- **[Jameswlepage/trac-mcp](https://github.com/Jameswlepage/trac-mcp)** — WordPress Trac access
- **[pluginslab/wp-devdocs-mcp](https://github.com/pluginslab/wp-devdocs-mcp)** — Hook/filter/block database from source code
- **[jonathanbossenger/wp-openrouter-provider](https://github.com/jonathanbossenger/wp-openrouter-provider)** — WordPress AI Client + OpenRouter
- **[laxmariappan/abilities-scout](https://github.com/laxmariappan/abilities-scout)** — Abilities API static analysis

See [UPSTREAM.md](UPSTREAM.md) for sync status.

---

## Contributing

Contributions welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[CC0 1.0 Universal (Public Domain)](LICENSE) — use freely, no attribution required.
