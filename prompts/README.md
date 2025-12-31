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
│   ├── PROJECT-KICKSTART-PROMPT.md
│   ├── TESTING-AUTOMATION-PROMPTS.md
│   ├── BLOCK-DEVELOPMENT-PROMPTS.md
│   ├── COMMUNITY-FILES-PROMPTS.md
│   ├── PLUGIN-MARKETING-PROMPTS.md
│   └── site-review/
│       └── DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md
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

**Portable, self-contained prompts under 2000 tokens.**

- Work on **all platforms** (ChatGPT, Gemini, Claude, Copilot, etc.)
- **No external references** - everything needed is in the prompt
- **Single task focus** - one specific action per prompt
- Perfect for **quick tasks** and **context-limited platforms**

**Use core prompts when:**
- Using ChatGPT, Gemini, or other web AI
- Need a quick, focused task done
- Working with limited context windows
- Sharing prompts with others

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

## Quick Start

### Find the Right Prompt

| Task | Core Prompt | Extended Prompt |
|------|-------------|-----------------|
| Set up PHPUnit | `core/testing/phpunit-setup.md` | `extended/TESTING-AUTOMATION-PROMPTS.md` |
| Create a block | `core/blocks/static-block.md` | `extended/BLOCK-DEVELOPMENT-PROMPTS.md` |
| Security review | `core/security/input-validation.md` | See skills/security/ |
| Write README | `core/documentation/readme-github.md` | `extended/COMMUNITY-FILES-PROMPTS.md` |
| Full project setup | N/A | `extended/PROJECT-KICKSTART-PROMPT.md` |
| Choose blocks for UI | N/A | `blocks/core-blocks-assistant.md` |
| Create block patterns | N/A | `blocks/block-pattern-recommender.md` |
| Find WordPress icons | N/A | `blocks/icon-assistant.md` |
| Design UI components | N/A | `frontend-design/component-design.md` |
| Define style language | N/A | `frontend-design/style-language.md` |
| Audit GraphQL API | N/A | `audit/graphql-audit.md` |
| Full UI/UX audit | N/A | `testing/ui-ux-audit.md` |
| Navigation testing | N/A | `testing/navigation-flow-tests.md` |
| Responsive testing | N/A | `testing/responsive-tests.md` |
| Heuristic evaluation | N/A | `testing/heuristic-evaluation.md` |

### Using Core Prompts

1. Open the prompt file
2. Copy the content inside `<prompt>` tags
3. Replace `[PLACEHOLDERS]` with your values
4. Paste into any AI assistant

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
| **Brainstorming** | `extended/PROJECT-KICKSTART-PROMPT.md` (Phase 1) |
| **Planning** | User Story templates, Architecture prompts |
| **Setup** | `core/testing/*` or `extended/TESTING-AUTOMATION-PROMPTS.md` |
| **Development** | `core/blocks/*`, `core/security/*` |
| **Testing** | `extended/TESTING-AUTOMATION-PROMPTS.md`, `testing/*` |
| **UI/UX Audit** | `testing/ui-ux-audit.md` |
| **Documentation** | `core/documentation/*` or `extended/COMMUNITY-FILES-PROMPTS.md` |
| **Pre-Launch** | QA checklists, Performance prompts |
| **Launch** | `core/marketing/*` or `extended/PLUGIN-MARKETING-PROMPTS.md` |
| **Maintenance** | Site review agents |

## Legacy Compatibility

The `legacy/` directory contains symlinks to maintain backward compatibility:

```
legacy/PROJECT-KICKSTART-PROMPT.md → ../extended/PROJECT-KICKSTART-PROMPT.md
```

**Old paths still work** - if you have bookmarks or scripts referencing the old structure, they'll redirect to the new locations.

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
