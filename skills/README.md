# Skills

Reusable knowledge modules that teach AI assistants WordPress best practices. Each skill focuses on one specific topic for maximum reusability.

## What Are Skills?

Skills are concise knowledge files that:
- Teach AI assistants **how** to do something correctly
- Focus on **one topic** per file
- Can be **referenced** by prompts and agents
- Work across **all platforms** (Claude Code, Cursor, Cline, etc.)

## Directory Structure

```
skills/
├── wordpress/           # Core WordPress development
│   ├── plugin-architecture.md
│   ├── theme-architecture.md
│   ├── block-development.md
│   ├── interactivity-api.md
│   ├── rest-api.md
│   └── wp-cli.md
│
├── security/            # Security best practices
│   ├── input-sanitization.md
│   ├── output-escaping.md
│   ├── nonces-csrf.md
│   ├── capabilities.md
│   └── sql-injection.md
│
├── testing/             # Testing setup and patterns
│   ├── phpunit.md
│   ├── phpcs-wpcs.md
│   ├── phpstan.md
│   ├── eslint.md
│   ├── jest.md
│   └── playwright.md
│
├── performance/         # Performance optimization
│   ├── profiling.md
│   ├── caching.md
│   ├── database-optimization.md
│   └── asset-loading.md
│
└── accessibility/       # Accessibility compliance
    ├── wcag-basics.md
    ├── aria-patterns.md
    └── testing-tools.md
```

## Skill Format

Every skill follows this structure:

```markdown
# [Skill Name]

> **Topic**: [category/skill-name]
> **Platforms**: All
> **Source**: [Automattic/agent-skills](URL) | wp-dev-prompts

<skill>
<summary>
[One-line description of what this skill teaches]
</summary>

<knowledge>
## Core Concepts

[Essential knowledge the AI needs]

## Best Practices

1. [Practice 1 with explanation]
2. [Practice 2 with explanation]
3. [Practice 3 with explanation]

## Common Patterns

```[language]
[Correct code pattern example]
```

## Anti-Patterns (Avoid)

- ❌ [What NOT to do and why]
- ❌ [Another thing to avoid]

## Verification Checklist

- [ ] [How to verify correct implementation]
- [ ] [Another verification step]
</knowledge>

<references>
- [Official WordPress Docs](URL)
- [Automattic/agent-skills](URL)
</references>
</skill>

## Platform Integration

### Claude Code / Cursor / Cline
[How to use this skill with file access]

### ChatGPT / Gemini
[How to reference this knowledge without file access]
```

## Using Skills

### In Claude Code

Reference skills in CLAUDE.md or in conversation:

```markdown
When working on security, apply the knowledge from:
- skills/security/input-sanitization.md
- skills/security/output-escaping.md
```

### In Cursor

Reference skills in .cursorrules:

```markdown
For WordPress security, follow patterns from:
- Input: sanitize_text_field(), absint(), etc.
- Output: esc_html(), esc_attr(), esc_url(), etc.
```

### In Prompts

Link to skills for additional context:

```markdown
<references>
- [Security: Input Sanitization](../../skills/security/input-sanitization.md)
</references>
```

## Creating New Skills

### Guidelines

1. **One topic per skill** - Don't combine multiple concepts
2. **Keep it concise** - Target 500-800 tokens (max 1000)
3. **Be practical** - Include code examples
4. **Show anti-patterns** - What to avoid and why
5. **Include verification** - How to check correctness

### Checklist

- [ ] Skill focuses on single topic
- [ ] Uses standard skill format
- [ ] Includes code examples
- [ ] Includes anti-patterns
- [ ] Includes verification checklist
- [ ] Under 1000 tokens
- [ ] Tested in at least one platform

## Skill Categories

### WordPress (`skills/wordpress/`)

Core WordPress development patterns:
- Plugin/theme architecture
- Block development (Gutenberg)
- Interactivity API
- REST API
- WP-CLI operations

### Security (`skills/security/`)

Security best practices from [Automattic/agent-skills](https://github.com/Automattic/agent-skills):
- Input sanitization
- Output escaping
- Nonces and CSRF
- Capability checks
- SQL injection prevention

### Testing (`skills/testing/`)

Testing setup and patterns:
- PHPUnit configuration
- WordPress Coding Standards (PHPCS)
- Static analysis (PHPStan)
- JavaScript linting (ESLint)
- Unit testing (Jest)
- E2E testing (Playwright)

### Performance (`skills/performance/`)

Performance optimization techniques:
- WP-CLI profiling
- Caching strategies
- Database optimization
- Asset loading

### Accessibility (`skills/accessibility/`)

Accessibility compliance:
- WCAG 2.1 basics
- ARIA patterns
- Testing tools

## Sources

Skills are extracted from:

1. **[Automattic/agent-skills](https://github.com/Automattic/agent-skills)** - WordPress Agent Skills (MIT License)
2. **wp-dev-prompts** existing prompts and guides
3. **WordPress Developer Documentation**
