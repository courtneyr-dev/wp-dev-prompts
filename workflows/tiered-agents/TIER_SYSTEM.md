# Tiered AI Agent System

> **Purpose**: Route tasks to the right AI tool based on complexity, reducing context overhead and improving efficiency.

## The Core Idea

Not every task needs the full power of Claude Code. Simple bugfixes and documentation don't require extensive context—they need fast, constrained execution. Complex features need collaborative exploration. This system matches task complexity to tool capability.

## Tier Overview

| Tier | Name | Tool | Character |
|------|------|------|-----------|
| **T1** | Routine | GitHub Copilot | Fast, constrained, single-file focus |
| **T2** | Analytical | Cursor / ChatGPT | Review-oriented, multi-file awareness |
| **T3** | Complex | Claude Code | Collaborative, full-context, architectural |

## Classification Matrix

Use these signals to determine the right tier:

| Factor | T1 (Routine) | T2 (Analytical) | T3 (Complex) |
|--------|--------------|-----------------|--------------|
| **Files touched** | 1–2 | 3–5 | 6+ |
| **Risk level** | Low | Medium | High |
| **Time estimate** | <30 min | 30 min–2 hr | 2+ hr |
| **Dependencies** | None | Some | Many |
| **Tests exist** | Yes | Partial | No |
| **Architecture change** | No | Minor | Yes |
| **Requires context** | Minimal | Moderate | Extensive |

### Quick Decision Tree

```
Is this a single-file change with existing patterns?
├── Yes → T1 (Copilot)
└── No
    ├── Does it need analysis or review of multiple files?
    │   ├── Yes → T2 (Cursor/ChatGPT)
    │   └── No
    │       └── Does it involve architecture, security, or new infrastructure?
    │           ├── Yes → T3 (Claude Code)
    │           └── No → T2 (Cursor/ChatGPT)
```

## Tool Assignment

### T1: GitHub Copilot

**Best for:**
- Adding PHPDoc to existing methods
- Writing tests for well-defined functions
- Fixing PHPCS/linting violations
- Simple bugfixes with clear patterns
- Repetitive code generation

**Characteristics:**
- Inline suggestions, minimal context switching
- Works within IDE, fast iteration
- Constrained to visible code
- Predictable, pattern-based output

**Prompt style:** Short, specific, single-task

### T2: Cursor / ChatGPT

**Best for:**
- Code review and security audits
- Refactoring analysis
- Dependency audits
- Test coverage gap analysis
- Explaining complex code sections

**Characteristics:**
- Multi-file awareness
- Good for analysis over generation
- Can reason about trade-offs
- Interactive Q&A workflow

**Prompt style:** Analytical, checklist-driven

### T3: Claude Code

**Best for:**
- New feature implementation
- Test infrastructure setup
- Architecture design
- Security-critical changes
- Multi-system integrations
- Anything requiring exploration

**Characteristics:**
- Full codebase context
- Can explore, plan, and execute
- Collaborative problem-solving
- Handles ambiguity well

**Prompt style:** Collaborative, context-rich

## Escalation Rules

### When to Escalate

**T1 → T2:**
- Task fails twice with Copilot
- Requirements are unclear
- Multiple files need coordinated changes
- Need to understand "why" not just "what"

**T2 → T3:**
- Architecture decisions required
- Security implications unclear
- Need to explore codebase first
- Task scope keeps expanding
- Integration with multiple systems

### Escalation Signals

Watch for these signs that you're in the wrong tier:

| Signal | Meaning |
|--------|---------|
| "I don't have enough context" | Escalate to higher tier |
| Repeated failures | Escalate one tier |
| "This depends on..." | Probably T2 or T3 |
| "We need to design..." | Definitely T3 |
| "Just add this line" | Could be T1 |

## Integration with AGENT_INDEX.md

This tier system adds "Step 0" to the existing [Agent Index routing algorithm](../../agents/AGENT_INDEX.md#-routing-algorithm):

```
Step 0: Determine Complexity Tier
    ↓
Step 1: Identify Request Type (from AGENT_INDEX.md)
    ↓
Step 2: Determine Risk Level
    ↓
Step 3: Choose Agents
    ↓
Step 4: Run Phases
```

The tier determines which tool executes the work. The AGENT_INDEX determines which agent prompts guide the work.

## Workflow Examples

### Example 1: Add PHPDoc (T1)

```
Task: Add documentation to get_user_reactions() method
Tier: T1 (single file, low risk, pattern exists)
Tool: Copilot

Prompt: "Add PHPDoc to this method documenting params and return"
```

### Example 2: Security Review (T2)

```
Task: Review REST API endpoints for security issues
Tier: T2 (multi-file, analytical, medium risk)
Tool: Cursor or ChatGPT

Prompt: "Review these endpoints for: nonce verification,
capability checks, input sanitization, output escaping"
```

### Example 3: Test Infrastructure (T3)

```
Task: Set up PHPUnit with WordPress test framework
Tier: T3 (new infrastructure, high complexity, no existing tests)
Tool: Claude Code

Prompt: "Set up complete testing infrastructure including
PHPUnit, WordPress test framework, GitHub Actions CI,
and quality gates. Start with the most critical paths."
```

## Measuring Success

Track these metrics to refine tier boundaries:

| Metric | Target |
|--------|--------|
| T1 completion rate | >90% on first attempt |
| T1 → T2 escalation | <15% of T1 tasks |
| T2 → T3 escalation | <20% of T2 tasks |
| Task-tier match accuracy | >85% correct initial assignment |

## Related Resources

- [Overview](./overview.md) — Quick reference card
- [T1 Guide](./tier-1-routine.md) — Copilot usage patterns
- [T2 Guide](./tier-2-analytical.md) — Cursor/ChatGPT patterns
- [T3 Guide](./tier-3-complex.md) — Claude Code patterns
- [Escalation Guide](./escalation-guide.md) — When and how to escalate
- [Agent Index](../../agents/AGENT_INDEX.md) — Full agent routing system
