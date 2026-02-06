# Block Prompts

AI prompts for WordPress block development, pattern recommendations, and icon selection.

## Prompts

| Prompt | Description | Use Case |
|--------|-------------|----------|
| `core-blocks-assistant.md` | Suggests optimal WordPress core blocks | Building layouts, choosing blocks for content |
| `block-pattern-recommender.md` | Recommends block patterns and compositions | Creating reusable patterns, complex layouts |
| `icon-assistant.md` | Finds and implements WordPress icons | UI development, accessible iconography |

## Quick Start

### Core Blocks Assistant

Use when you need to choose the right blocks for a UI requirement:

```markdown
Based on the block data, what blocks should I use for:
- A testimonial section with author photo, quote, and attribution
- A pricing table with 3 tiers
- A FAQ section with expandable answers
```

### Block Pattern Recommender

Use when composing multiple blocks into reusable patterns:

```markdown
Create a block pattern for a "Team Member" card that includes:
- Circular headshot image
- Name (heading)
- Job title
- Short bio
- Social media links
```

### Icon Assistant

Use when selecting icons for UI elements:

```markdown
What icon should I use for:
- A "settings" menu item
- A "collapse sidebar" button
- A "download" action
```

## Data Sources

These prompts reference structured data files:

- `data/core-blocks.json` - Block metadata from WPHelpers
- `data/core-icons.json` - Icon library with 400+ icons

## Related Resources

- **Extended Prompts**: [../extended/BLOCK-DEVELOPMENT-PROMPTS.md](../extended/BLOCK-DEVELOPMENT-PROMPTS.md) - Comprehensive block development
- **Skills**: [../../skills/wordpress-dev/block-development.md](../../skills/wordpress-dev/block-development.md) - Block development knowledge
- **Core Prompts**: [../core/blocks/](../core/blocks/) - Portable block prompts
- **Data**: [../../data/](../../data/) - Reference data files
- **Docs**: [../../docs/core-blocks-reference.md](../../docs/core-blocks-reference.md) - Block documentation
- **Docs**: [../../docs/icons.md](../../docs/icons.md) - Icon usage guide

## Prompt Format

All prompts follow the [Universal Prompt Specification](../../platforms/universal/prompt-specification.md):

```markdown
# [Prompt Title]

> **Type**: Extended
> **Platforms**: Claude Code, Cursor, Cline

<prompt>
<role>WordPress block development specialist</role>
<context>Reference data from data/*.json</context>
<task>Recommend blocks/patterns/icons</task>
<constraints>Use only core blocks, ensure accessibility</constraints>
<output_format>Structured recommendations with code examples</output_format>
</prompt>
```
