# Workflows

Multi-step guides for common WordPress development tasks, broken into discrete phases.

## What Are Workflows?

Workflows are step-by-step guides that:
- Break complex tasks into **manageable phases**
- Work across **all AI platforms**
- Can be completed **incrementally**
- Reference appropriate **prompts and skills** for each step

## Available Workflows

### New Plugin (`new-plugin/`)

Complete workflow for creating a new WordPress plugin from scratch.

**Phases**:
1. Planning - Define scope, features, architecture
2. Setup - Create project structure, initialize Git
3. Testing - Set up PHPUnit, PHPCS, ESLint
4. Development - Build features with TDD
5. Documentation - README, user guide, screenshots
6. Launch - WordPress.org submission, marketing

### Add Testing (`add-testing/`)

Add comprehensive testing to an existing WordPress project.

**Phases**:
1. PHP Testing - PHPUnit, PHPCS, PHPStan
2. JavaScript Testing - ESLint, Jest, Playwright
3. CI Setup - GitHub Actions, pre-commit hooks

### Site Review (`site-review/`)

Comprehensive website assessment using specialist agents.

**Phases**:
1. Quick Audit - Rapid assessment of key areas
2. Full Assessment - All specialist agents

### Block Creation (`block-creation/`)

Create new Gutenberg blocks step by step.

**Phases**:
1. Static Block - Basic block saved to post_content
2. Dynamic Block - Server-rendered block
3. Interactive Block - Interactivity API integration

### Plugin Maintenance (`plugin-maintenance/`)

Routine maintenance tasks using [@felixarntz/wp-plugins-cli](https://www.npmjs.com/package/@felixarntz/wp-plugins-cli).

**Phases**:
1. WordPress Update - Bump "Tested up to" version
2. Release Prep - Verify versions, update @since tags, generate changelog
3. Multi-Plugin - Batch operations across plugin portfolios
4. CI Integration - Automate in GitHub Actions

## Directory Structure

```
workflows/
├── README.md                    # This file
│
├── new-plugin/
│   ├── overview.md             # Workflow summary
│   ├── step-1-planning.md
│   ├── step-2-setup.md
│   ├── step-3-testing.md
│   ├── step-4-development.md
│   ├── step-5-documentation.md
│   └── step-6-launch.md
│
├── add-testing/
│   ├── overview.md
│   ├── php-testing.md
│   ├── js-testing.md
│   └── ci-setup.md
│
├── site-review/
│   ├── overview.md
│   ├── quick-audit.md
│   └── full-assessment.md
│
├── block-creation/
│   ├── overview.md
│   ├── static-block.md
│   ├── dynamic-block.md
│   └── interactive-block.md
│
└── plugin-maintenance/
    ├── overview.md
    ├── wordpress-update.md
    ├── release-prep.md
    ├── multi-plugin.md
    └── ci-integration.md
```

## Using Workflows

### Option 1: Complete Workflow

Follow all steps in order:

```
1. Read overview.md for the workflow
2. Complete step-1-*.md
3. Continue through each step
4. Each step references appropriate prompts/skills
```

### Option 2: Jump to Specific Step

Start at any phase:

```
# Already have a plugin, need to add testing?
→ Start at add-testing/php-testing.md

# Need to create a block?
→ Start at block-creation/static-block.md
```

### Option 3: Use with Extended Prompts

Workflows complement extended prompts:

```
# For guided step-by-step:
→ Use workflows/

# For comprehensive single prompt:
→ Use prompts/extended/
```

## Workflow Step Format

Each step follows this structure:

```markdown
# Step N: [Step Name]

> **Workflow**: [workflow-name]
> **Previous**: [previous-step.md]
> **Next**: [next-step.md]

## Goal

[What this step accomplishes]

## Prerequisites

- [ ] [What should be done before this step]

## Instructions

### For All Platforms

[Universal instructions]

### For Claude Code / Cursor / Cline

[Platform-specific with file access]

## Prompts to Use

- [prompt-name.md](../prompts/core/category/prompt.md) - For X
- [prompt-name.md](../prompts/extended/PROMPT.md) - For Y

## Skills to Reference

- [skill-name.md](../skills/category/skill.md) - For Z

## Verification

- [ ] [How to verify this step is complete]

## Troubleshooting

### Common Issue 1
[Solution]

### Common Issue 2
[Solution]

## Next Step

→ [step-N+1.md](step-N+1.md)
```

## Creating New Workflows

### Guidelines

1. **Break into clear phases** - Each step should be completable in one session
2. **Link to resources** - Reference prompts, skills, and templates
3. **Include verification** - How to know each step is done
4. **Add troubleshooting** - Common issues and solutions
5. **Support all platforms** - Universal instructions + platform-specific

### Checklist

- [ ] Has overview.md with summary
- [ ] Each step is self-contained
- [ ] Links to appropriate prompts/skills
- [ ] Includes verification checklist
- [ ] Has troubleshooting section
- [ ] Previous/Next navigation
- [ ] Tested end-to-end

## Workflows vs Prompts

| Aspect | Workflows | Prompts |
|--------|-----------|---------|
| Structure | Multi-file, phased | Single file |
| Completion | Incremental | One session |
| Best for | Complex projects | Focused tasks |
| Platform | All | Core: All, Extended: IDE |

Use **workflows** for:
- New projects
- Major additions (testing, blocks)
- Learning a process

Use **prompts** for:
- Specific tasks
- Quick actions
- Experienced users

## Related Resources

- **Prompts**: [../prompts/](../prompts/) - Single-task AI prompts
- **Skills**: [../skills/](../skills/) - Knowledge modules
- **Agents**: [../agents/](../agents/) - Specialist AI personas
- **Guides**: [../guides/](../guides/) - Reference documentation
