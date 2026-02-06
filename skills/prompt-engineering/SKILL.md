---
name: Prompt Engineering & Technical Writing
description: Craft effective AI prompts and technical blog posts. Covers prompt structure, cross-platform compatibility, token optimization, anti-patterns, and WordPress publishing workflows.
triggers:
  - prompt engineering
  - write prompt
  - blog post
  - technical writing
  - anti-patterns
  - style guide
  - content writing
  - draft post
---

# Prompt Engineering & Technical Writing

Create effective AI prompts and technical content. Covers prompt structure, anti-patterns, cross-platform compatibility, and WordPress publishing.

## Prompt Structure

### Core Prompts (< 2000 tokens)

Self-contained, portable across all platforms:

```markdown
# [Prompt Name]

> **Category**: [category]
> **Platforms**: All

[Prompt content — complete instructions in a single block]

## Usage
[How to use]

## Variables
- [VARIABLE]: [description]
```

### Extended Prompts

Unlimited length, may reference skills or tools:

```markdown
# [Prompt Name]

> **Category**: [category]
> **Platforms**: Claude Code | Cursor

<prompt>
[Full prompt content with tool references]
</prompt>

## Usage
[Platform-specific instructions]

## Customization
[What can be modified]
```

## Writing Rules

### Anti-Patterns (Never Use)

**Banned words**: delve, tapestry, myriad, leverage, utilize, seamless, robust, paradigm, synergy, cutting-edge, game-changer

**Banned transitions**: furthermore, moreover, additionally, subsequently, consequently

**Banned openings**: "In today's...", "Have you ever...", "Let's dive into..."

### Good Practices

- Use active voice and present tense
- Use second person ("you")
- Use contractions (it's, don't, won't)
- Vary sentence and paragraph lengths
- Be direct — state things without hedging
- No unnecessary qualifiers (very, quite, rather)

### Technical Blog Posts

When drafting from a codebase:

1. **Research**: Read recent commits, review changed files, note design decisions
2. **Plan**: Opening hook, overview, problem/value, technical details, challenges, future
3. **Write**: 500-1200 words, code snippets 5-15 lines, save to `.blog/YYYY-MM-DD-slug.md`
4. **Publish** (optional): Create WordPress draft via REST API

## Prompt Quality Dimensions

Score each 1-5:

| Dimension | What to Check |
|---|---|
| Structure | Title, metadata, proper tags, usage section |
| Clarity | Unambiguous instructions, documented variables |
| Effectiveness | Enough context, specific constraints, defined output |
| Compatibility | Works without tools, under 2000 tokens (core), no hard-coded paths |
| Style | No AI indicator words, active voice, current WP version |

## Cross-Platform Tips

- **ChatGPT/Gemini**: No tool access — prompts must be self-contained
- **Claude Code**: Can reference files, use skills, run commands
- **Cursor**: Can read project files, uses rules files
- Core prompts must work on the lowest common denominator

## Token Optimization

For core prompts under 2000 tokens:

- Use concise instructions, not verbose explanations
- Prefer lists over paragraphs
- Include only essential code examples
- Reference skills instead of duplicating knowledge
- Remove redundant phrasing

## References

- [WordPress Documentation Style Guide](https://make.wordpress.org/docs/style-guide/)
- [richtabor/skills](https://github.com/richtabor/skills)
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)
