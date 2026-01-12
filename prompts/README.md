# Prompts

AI prompts for WordPress development, organized by type and token size for cross-platform compatibility.

## Directory Structure

```
prompts/
├── README.md                    # This file
│
├── core/                        # Portable prompts (<2000 tokens)
│   ├── testing/                # Testing setup prompts
│   ├── blocks/                 # Block development prompts
│   ├── security/               # Security-focused prompts
│   ├── documentation/          # Documentation generation
│   └── marketing/              # Marketing content prompts
│
├── extended/                    # Full-featured prompts (no limit)
│   ├── PRODUCT-MARKET-FIT-RESEARCH.md
│   ├── PROJECT-KICKSTART-PROMPT.md
│   ├── TESTING-AUTOMATION-PROMPTS.md
│   ├── BLOCK-DEVELOPMENT-PROMPTS.md
│   ├── COMMUNITY-FILES-PROMPTS.md
│   ├── PLUGIN-MARKETING-PROMPTS.md
│   └── site-review/
│       └── DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md
│
├── tiered/                      # Tier-specific prompts
│   ├── README.md               # Tier system overview
│   ├── t1-constrained/         # Copilot-optimized (<500 tokens)
│   ├── t2-analytical/          # Cursor/ChatGPT prompts
│   └── t3-collaborative/       # Claude Code prompts
│
├── blocks/                      # Block-specific prompts (Extended)
│   ├── core-blocks-assistant.md
│   ├── block-pattern-recommender.md
│   └── icon-assistant.md
│
├── frontend-design/             # UI/UX design prompts (Extended)
│   ├── component-design.md
│   ├── style-language.md
│   ├── theme-vs-plugin-styles.md
│   ├── responsive-behavior.md
│   └── accessibility-presets.md
│
├── audit/                       # Audit & testing prompts (Extended)
│   └── graphql-audit.md
│
├── testing/                     # UI/UX testing prompts (Extended)
│   ├── ui-ux-audit.md
│   ├── navigation-flow-tests.md
│   ├── responsive-tests.md
│   └── heuristic-evaluation.md
│
└── legacy/                      # Backward compatibility symlinks
    └── [symlinks to extended/]
```

## Core vs Extended

### Core Prompts (`core/`)

> **Status**: Coming in v2.1 - See `core/README.md`

**Portable, self-contained prompts under 2000 tokens.**

- Work on **all platforms** (ChatGPT, Gemini, Claude, Copilot, etc.)
- **No external references** - everything needed is in the prompt
- **Single task focus** - one specific action per prompt
- Perfect for **quick tasks** and **context-limited platforms**

### Extended Prompts (`extended/`)

**Full-featured prompts with no token limit.**

- Optimized for **Claude Code, Cursor, Cline**
- Can **reference other files** (skills, guides, templates)
- **Multi-phase workflows** with comprehensive guidance
- Best for **complex tasks** requiring full context

**Use extended prompts when:**
- Using Claude Code, Cursor, or Cline
- Working on complex, multi-step tasks
- Need the full development workflow
- Have access to the full repository

### Tiered Prompts (`tiered/`)

**Tool-specific prompts optimized for each AI platform tier.**

| Tier | Tool | Token Limit | Use Case |
|------|------|-------------|----------|
| T1 | Copilot | <500 | Single-file, constrained scope |
| T2 | Cursor/ChatGPT | <2000 | Multi-file review, refactoring |
| T3 | Claude Code | Unlimited | Architecture, full-context decisions |

**Use tiered prompts when:**
- You want prompts optimized for a specific tool
- Task complexity matches the tier
- You're using the [tiered agent workflow](../workflows/tiered-agents/)

See [tiered/README.md](tiered/README.md) for the complete tier system guide.

## Quick Start

### Find the Right Prompt

| Task | Prompt |
|------|--------|
| Validate product idea | `extended/PRODUCT-MARKET-FIT-RESEARCH.md` |
| Full project setup | `extended/PROJECT-KICKSTART-PROMPT.md` |
| Set up testing | `extended/TESTING-AUTOMATION-PROMPTS.md` |
| Create blocks | `extended/BLOCK-DEVELOPMENT-PROMPTS.md` |
| Community files | `extended/COMMUNITY-FILES-PROMPTS.md` |
| Marketing content | `extended/PLUGIN-MARKETING-PROMPTS.md` |
| Choose blocks for UI | `blocks/core-blocks-assistant.md` |
| Create block patterns | `blocks/block-pattern-recommender.md` |
| Find WordPress icons | `blocks/icon-assistant.md` |
| Design UI components | `frontend-design/component-design.md` |
| Define style language | `frontend-design/style-language.md` |
| Audit GraphQL API | `audit/graphql-audit.md` |
| Full UI/UX audit | `testing/ui-ux-audit.md` |
| Navigation testing | `testing/navigation-flow-tests.md` |
| Responsive testing | `testing/responsive-tests.md` |
| Heuristic evaluation | `testing/heuristic-evaluation.md` |
| Security patterns | See `skills/security/` |

### Using Extended Prompts

1. Open the prompt file
2. Copy the entire prompt section
3. Replace `[PLACEHOLDERS]` with your values
4. Use in Claude Code, Cursor, or Cline
5. AI will reference additional files as needed

## Prompt Format

All prompts use the [Universal Prompt Specification](../platforms/universal/prompt-specification.md):

```markdown
# [Prompt Title]

> **Type**: Core (<2000 tokens) | Extended
> **Platforms**: All | Claude Code, Cursor, Cline

<prompt>
<role>
[Who the AI should act as]
</role>

<context>
[Background and current situation]
</context>

<task>
[Clear instructions]
</task>

<constraints>
[Rules to follow]
</constraints>

<output_format>
[Expected output structure]
</output_format>
</prompt>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|

## Expected Output

[What the AI will produce]
```

## Prompts by Project Stage

| Stage | Prompts to Use |
|-------|----------------|
| **Validation** | `extended/PRODUCT-MARKET-FIT-RESEARCH.md` |
| **Brainstorming** | `extended/PROJECT-KICKSTART-PROMPT.md` (Phase 1) |
| **Planning** | User Story templates, Architecture prompts |
| **Setup** | `extended/TESTING-AUTOMATION-PROMPTS.md` |
| **Development** | `extended/BLOCK-DEVELOPMENT-PROMPTS.md`, `skills/security/*` |
| **Testing** | `extended/TESTING-AUTOMATION-PROMPTS.md`, `testing/*` |
| **UI/UX Audit** | `testing/ui-ux-audit.md` |
| **Documentation** | `extended/COMMUNITY-FILES-PROMPTS.md` |
| **Pre-Launch** | QA checklists, Performance prompts |
| **Launch** | `extended/PLUGIN-MARKETING-PROMPTS.md` |
| **Maintenance** | Site review agents, `workflows/plugin-maintenance/` |

## Legacy Compatibility

The `legacy/` directory contains copies of the original v1.x prompts for backward compatibility. See `legacy/README.md` for details.

## Creating New Prompts

### Checklist for Core Prompts

- [ ] Under 2000 tokens
- [ ] Self-contained (no external references)
- [ ] Uses XML-style tags
- [ ] Includes Variables table
- [ ] Includes Expected Output
- [ ] Tested on at least one platform

### Checklist for Extended Prompts

- [ ] Uses XML-style tags
- [ ] Links to related skills/guides
- [ ] Includes Variables table
- [ ] Includes Expected Output
- [ ] Includes Platform-Specific Notes
- [ ] Tested in Claude Code

### Where to Put New Prompts

| Prompt Type | Location | Token Limit |
|-------------|----------|-------------|
| Quick, focused task | `core/[category]/` | <2000 |
| Comprehensive workflow | `extended/` | No limit |
| Multi-step process | Consider `workflows/` instead | N/A |

## Related Resources

- **Skills**: [../skills/](../skills/) - Reusable knowledge modules
- **Agents**: [../agents/](../agents/) - Specialized AI personas
- **Templates**: [../templates/](../templates/) - Ready-to-use files
- **Guides**: [../guides/](../guides/) - Comprehensive documentation
- **Platforms**: [../platforms/](../platforms/) - Platform-specific configs
