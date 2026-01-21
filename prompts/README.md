# Prompts

AI prompts for WordPress development, organized by type and platform compatibility.

## Quick Reference

| Task | Prompt |
|------|--------|
| Start new project | [PROJECT-KICKSTART-PROMPT.md](extended/PROJECT-KICKSTART-PROMPT.md) |
| Validate idea | [PRODUCT-MARKET-FIT-RESEARCH.md](extended/PRODUCT-MARKET-FIT-RESEARCH.md) |
| Set up testing | [TESTING-AUTOMATION-PROMPTS.md](extended/TESTING-AUTOMATION-PROMPTS.md) |
| Create blocks | [BLOCK-DEVELOPMENT-PROMPTS.md](extended/BLOCK-DEVELOPMENT-PROMPTS.md) |
| Community files | [COMMUNITY-FILES-PROMPTS.md](extended/COMMUNITY-FILES-PROMPTS.md) |
| Marketing content | [PLUGIN-MARKETING-PROMPTS.md](extended/PLUGIN-MARKETING-PROMPTS.md) |
| Choose blocks | [core-blocks-assistant.md](blocks/core-blocks-assistant.md) |
| Design UI | [component-design.md](frontend-design/component-design.md) |
| Audit GraphQL | [graphql-audit.md](audit/graphql-audit.md) |
| UI/UX audit | [ui-ux-audit.md](testing/ui-ux-audit.md) |

## Directory Structure

```
prompts/
├── extended/           # Full-featured prompts (Claude Code, Cursor, Cline)
├── core/               # Portable prompts <2000 tokens (coming v2.1)
├── tiered/             # Tool-specific (T1 Copilot, T2 Cursor, T3 Claude)
├── blocks/             # Block development
├── frontend-design/    # UI/UX design
├── testing/            # UI/UX testing
├── audit/              # Security auditing
└── legacy/             # Backward compatibility
```

## Prompt Types

### Extended Prompts (`extended/`)

Full-featured prompts for IDE platforms with file access.
- Multi-phase workflows
- Can reference other files (skills, guides)
- Best for complex tasks

### Core Prompts (`core/`)

Portable prompts under 2000 tokens.
- Work on all platforms (ChatGPT, Gemini, Claude web)
- Self-contained, no external references
- Single task focus

### Tiered Prompts (`tiered/`)

Optimized for specific AI tools:

| Tier | Tool | Best For |
|------|------|----------|
| T1 | Copilot | Single-file, constrained tasks |
| T2 | Cursor/ChatGPT | Multi-file review, refactoring |
| T3 | Claude Code | Architecture, full-context decisions |

## Using Prompts

1. Open the prompt file
2. Copy the prompt section
3. Replace `[PLACEHOLDERS]` with your values
4. Paste into your AI tool

## Related

- [Skills](../skills/) — Knowledge modules
- [Agents](../agents/) — Specialized AI personas
- [Workflows](../workflows/) — Multi-step guides
