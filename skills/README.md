# Skills

Reusable knowledge modules for AI-assisted WordPress development. Each skill is a directory containing a `SKILL.md` with YAML frontmatter and optional bundled resources.

## Available Skills

| Skill | Description |
|---|---|
| [wordpress-dev](wordpress-dev/) | Plugin, block, and theme development for WordPress 6.9+ |
| [wordpress-security](wordpress-security/) | Security Trinity — sanitize, validate, escape |
| [wordpress-testing](wordpress-testing/) | PHPUnit, PHPCS, PHPStan, Playwright, CI/CD |
| [wordpress-playground](wordpress-playground/) | Browser-based WordPress via WebAssembly |
| [wordpress-accessibility](wordpress-accessibility/) | WCAG 2.1/2.2 Level AA compliance |
| [wordpress-performance](wordpress-performance/) | Core Web Vitals and server optimization |
| [prompt-engineering](prompt-engineering/) | Prompt structure, anti-patterns, technical writing |
| [ui-ux-audit](ui-ux-audit/) | UI/UX review and motion design specifications |
| [engineering](engineering/) | Planning, code review, git workflows |
| [product-management](product-management/) | Personas, JTBD, positioning, user stories |

## Skill Format

Each skill directory contains:

```
skill-name/
├── SKILL.md              # Main skill file with YAML frontmatter
├── references/           # Optional reference docs
├── checklist.yaml        # Optional structured checklist
└── setup.sh              # Optional setup scripts
```

### SKILL.md Structure

```yaml
---
name: Skill Name
description: One-line description of what this skill covers.
triggers:
  - keyword that activates this skill
  - another trigger phrase
---
```

The body contains actionable knowledge with code examples.

## Usage

### In Claude Code

Reference skills in conversation or CLAUDE.md:

```markdown
Apply the wordpress-security skill when reviewing this plugin code.
```

Or load directly:

```markdown
Read skills/wordpress-security/SKILL.md and review my code for vulnerabilities.
```

### In Cursor / Cline

Add to your rules file:

```markdown
For WordPress security reviews, follow the guidelines in:
skills/wordpress-security/SKILL.md
```

## Sources

Skills are consolidated from:

- [WordPress/agent-skills](https://github.com/WordPress/agent-skills) — WordPress core development skills
- [richtabor/agent-skills](https://github.com/richtabor/agent-skills) — Accessibility, motion design, writing
- [skills.sh](https://skills.sh) — Community WordPress skills
- [WordPress Documentation Style Guide](https://make.wordpress.org/docs/style-guide/) — Official standards
- wp-dev-prompts original content

Previous v2.0 skills (76 individual files) are archived in `archive/v2.0/skills/`.
