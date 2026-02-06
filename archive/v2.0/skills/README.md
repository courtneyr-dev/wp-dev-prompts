# Skills

Reusable knowledge modules that teach AI assistants WordPress best practices. 76 skills across 10 categories.

## Categories

| Category | Skills | Description |
|----------|--------|-------------|
| [wordpress/](wordpress/) | 16 | Plugin architecture, blocks, REST API, Interactivity API, WP-CLI, Playground |
| [security/](security/) | 5 | Input sanitization, output escaping, nonces, database queries, pentesting |
| [testing/](testing/) | 29 | PHPUnit, PHPCS, PHPStan, Playwright, Jest, visual regression |
| [performance/](performance/) | 6 | Core Web Vitals, profiling, caching, asset optimization |
| [accessibility/](accessibility/) | 6 | WCAG checklist, ARIA patterns, keyboard navigation, screen readers |
| [design/](design/) | 2 | Motion design, WordPress Design System (WPDS) |
| [social-media/](social-media/) | 1 | X/Twitter content creation with anti-patterns |
| [product-management/](product-management/) | 6 | JTBD, user stories, positioning, personas, problem framing |
| [engineering/](engineering/) | 4 | Planning, code review, documentation, git worktrees |
| [technical-writing/](technical-writing/) | 1 | Blog post drafting with WordPress style guide |

## Skill Format

```markdown
# [Skill Name]

> **Topic**: [category/skill-name]
> **Platforms**: All
> **Source**: [attribution]

<skill>
<summary>[One-line description]</summary>
<knowledge>
## Core Concepts
[Essential knowledge]

## Best Practices
1. [Practice with explanation]

## Common Patterns
[Code examples]

## Anti-Patterns (Avoid)
- ❌ [What NOT to do]

## Verification Checklist
- [ ] [How to verify]
</knowledge>
<references>[Links]</references>
</skill>
```

## Using Skills

### In Claude Code

Reference in CLAUDE.md or conversation:
```markdown
When working on security, apply:
- skills/security/input-sanitization.md
- skills/security/output-escaping.md
```

### In Cursor

Reference in .cursorrules:
```markdown
For WordPress security, follow patterns from skills/security/
```

### In Prompts

Link to skills for context:
```markdown
<references>
- [Security: Input Sanitization](../../skills/security/input-sanitization.md)
</references>
```

## Sources

- **[WordPress/agent-skills](https://github.com/WordPress/agent-skills)** — WordPress development patterns (MIT)
- **[richtabor/agent-skills](https://github.com/richtabor/agent-skills)** — Accessibility, motion design, X writing
- **[deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts)** — Product management (MIT)
- **[EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)** — Engineering workflows (MIT)
- **[skills.sh](https://skills.sh)** — Community WordPress skills
- **[WordPress Documentation Style Guide](https://make.wordpress.org/docs/style-guide/)** — Official standards (GPLv2+)
