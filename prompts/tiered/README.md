# Tiered Prompts

> Prompts optimized for each complexity tier.

## Overview

These prompts are designed to work best with their assigned AI tool:

| Directory | Tier | Tool | Characteristics |
|-----------|------|------|-----------------|
| `t1-constrained/` | T1 | Copilot | Short, specific, single-file focus |
| `t2-analytical/` | T2 | Cursor/ChatGPT | Analysis-oriented, multi-file aware |
| `t3-collaborative/` | T3 | Claude Code | Exploratory, iterative, full-context |

## Using These Prompts

### T1 Prompts (Copilot)

Best used as:
- Inline comments above code
- Copilot Chat single-turn queries
- Quick completions

```php
// Add PHPDoc with @param and @return
public function get_reactions( $post_id ) {
```

### T2 Prompts (Cursor/ChatGPT)

Best used as:
- Cursor Composer queries
- ChatGPT conversations with pasted code
- Multi-turn analysis sessions

### T3 Prompts (Claude Code)

Best used as:
- Full prompts in Claude Code
- Starting points for collaborative sessions
- Complex task specifications

## Prompt Format

Each prompt follows this structure:

```markdown
# [Prompt Name]

> **Tier**: T1/T2/T3
> **Tool**: Copilot/Cursor/ChatGPT/Claude Code
> **Time**: Estimated duration
> **Files**: Expected file count

## When to Use
[Situations where this prompt applies]

## Prompt
[The actual prompt text]

## Customization
[Variables to modify]

## Examples
[Sample usage]
```

## Choosing the Right Tier

Before selecting a prompt, classify your task:

| Signal | T1 | T2 | T3 |
|--------|----|----|-----|
| Files touched | 1-2 | 3-5 | 6+ |
| Clear pattern exists | Yes | Partial | No |
| Tests exist | Yes | Partial | No |
| Architecture change | No | Minor | Yes |

See [Tier System](../../workflows/tiered-agents/TIER_SYSTEM.md) for full classification guide.

## Directory Contents

### t1-constrained/
- `add-phpdoc.md` — Add documentation blocks
- `add-phpunit-test.md` — Write single unit test
- `fix-phpcs-violations.md` — Fix code style issues
- `simple-bugfix.md` — Fix obvious bugs

### t2-analytical/
- `code-review-checklist.md` — Security and quality review
- `refactor-analysis.md` — Identify refactoring opportunities
- `dependency-audit.md` — Check dependencies for issues
- `test-coverage-gaps.md` — Find untested code paths

### t3-collaborative/
- `feature-implementation.md` — Build new features
- `architecture-design.md` — Design system structure
- `test-infrastructure.md` — Set up testing framework
- `security-review.md` — Comprehensive security audit

## Related

- [Tier System](../../workflows/tiered-agents/TIER_SYSTEM.md) — Framework documentation
- [Escalation Guide](../../workflows/tiered-agents/escalation-guide.md) — When to change tiers
