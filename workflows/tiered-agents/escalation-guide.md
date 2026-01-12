# Escalation Guide

> When and how to move between tiers.

## The Core Principle

**Start low, escalate when blocked.** Begin at the lowest tier that might work. Move up only when you hit a clear signal that the current tier isn't sufficient.

## Escalation Signals

### T1 → T2 Escalation

Move from Copilot to Cursor/ChatGPT when:

| Signal | Example |
|--------|---------|
| **Failed twice** | Copilot keeps suggesting wrong patterns |
| **Unclear requirements** | You're not sure what the fix should look like |
| **Need context** | Change requires understanding another file |
| **Need reasoning** | You need to understand *why*, not just *what* |
| **Review needed** | Want analysis before implementing |

#### T1 → T2 Examples

**Before (T1 attempt):**
```
Task: Fix the API response format
Copilot suggestion: Wrong, doesn't match expected schema
Copilot retry: Still wrong
```

**After (escalate to T2):**
```
Task: Analyze the API response format
- What format does the client expect?
- What are we currently returning?
- What's the gap?

Then come back to T1 for the fix.
```

### T2 → T3 Escalation

Move from Cursor/ChatGPT to Claude Code when:

| Signal | Example |
|--------|---------|
| **Architecture decisions** | "We should restructure how this works" |
| **Security implications** | "This needs careful security review and fix" |
| **Scope expansion** | Analysis reveals more work than expected |
| **Need exploration** | Can't analyze without reading more code |
| **Implementation required** | Analysis is done, need complex execution |
| **6+ files** | Changes touch multiple systems |

#### T2 → T3 Examples

**Before (T2 attempt):**
```
Task: Review security of REST endpoints
Finding: 5 endpoints have vulnerabilities
Finding: Fixes require changing auth middleware
Finding: Auth middleware is used by 12 other files
```

**After (escalate to T3):**
```
Task: Fix REST endpoint security vulnerabilities

Context from T2 review:
- 5 vulnerable endpoints identified
- Auth middleware needs refactoring
- 12 dependent files

Need: Explore dependencies, design fix, implement safely
```

## De-escalation Patterns

Sometimes you've over-estimated. That's fine—drop down a tier.

### T3 → T2 De-escalation

Claude Code reveals the task is simpler than expected:

```
Started: "Implement new caching layer"
Found: WordPress transients work fine, just need configuration
Action: Drop to T2 for analysis of optimal cache times
```

### T2 → T1 De-escalation

Analysis shows the fix is trivial:

```
Started: "Analyze why API calls fail"
Found: Missing trailing slash in URL constant
Action: Drop to T1 to fix the one-line change
```

## Escalation Workflow

### Step 1: Recognize the Signal

Stop and ask yourself:
- Have I failed more than once?
- Am I guessing instead of knowing?
- Do I need to understand more context?
- Is scope growing beyond my original estimate?

### Step 2: Document What You Know

Before escalating, capture:
- What you tried
- What failed
- What you learned
- Specific questions for the next tier

### Step 3: Switch Tools with Context

Don't start fresh. Carry forward:

**T1 → T2 handoff:**
```
I tried to [task] with Copilot.
It failed because [reason].
I need help understanding [specific question].

Here's the relevant code:
[paste code]
```

**T2 → T3 handoff:**
```
I analyzed [area] and found:
- [finding 1]
- [finding 2]

This needs implementation that's beyond analytical review.
The approach should be [recommendation from analysis].

Start by exploring [specific areas] to validate this approach.
```

### Step 4: Complete at New Tier

Finish the task at the escalated tier. Don't bounce back and forth mid-task.

## Escalation Anti-Patterns

### Premature Escalation

❌ "This looks complex, I'll use Claude Code"
✅ "Let me try Copilot first, escalate if it fails"

Starting at T3 when T1 would work wastes time and context.

### Escalation Avoidance

❌ "Copilot keeps failing but I'll try once more"
✅ "Two failures, time to escalate to T2"

Stubbornly staying in the wrong tier wastes more time.

### Tier Skipping

❌ T1 failed → Jump to T3
✅ T1 failed → Try T2 → Only then T3 if needed

You might miss the sweet spot. T2 might be exactly right.

### Context Loss

❌ Start fresh at each tier
✅ Carry forward findings and attempts

Each tier should benefit from previous work.

## Escalation Decision Tree

```
Is Copilot working?
├── Yes → Stay T1
└── No
    ├── Failed once → Try again with better prompt
    └── Failed twice
        ├── Is it a clarity/requirements issue?
        │   └── Yes → Escalate to T2
        └── No
            ├── Is it a context issue?
            │   └── Yes → Escalate to T2
            └── No → Check if architecture issue → T3
```

## Real-World Escalation Scenarios

### Scenario 1: The Simple Fix That Wasn't

**Start (T1):**
"Add validation to user input field"

**First attempt:**
Copilot adds `sanitize_text_field()`. ✓

**Testing reveals:**
It should also validate email format for some fields.

**Escalation (T2):**
"Which fields need email validation? Review form handling to map field types to validation rules."

**Result:**
T2 analysis creates validation mapping. Back to T1 to implement each validator.

### Scenario 2: The Security Review

**Start (T2):**
"Review REST API security"

**Analysis finds:**
- Missing nonces on 3 endpoints
- SQL injection risk in search
- Authentication bypass possible via parameter manipulation

**Escalation (T3):**
"Fix security issues found in T2 review:
1. Add nonce verification to [endpoints]
2. Fix SQL injection in search (use $wpdb->prepare)
3. Fix auth bypass in [endpoint]

Need careful implementation with tests for each fix."

### Scenario 3: Over-Estimated Complexity

**Start (T3):**
"Build user preference storage system"

**Claude Code explores:**
- WordPress user meta already exists
- Existing pattern in codebase uses `update_user_meta()`
- No new infrastructure needed

**De-escalation (T1):**
"Add preference storage using update_user_meta(), following existing pattern in class-user-settings.php"

## Quick Reference

### Escalate T1 → T2 When:
- Failed twice
- Need to understand why
- Requirements unclear
- Need multi-file context

### Escalate T2 → T3 When:
- Architecture decisions needed
- Security-critical implementation
- Scope expanded significantly
- 6+ files affected

### De-escalate When:
- Task is simpler than expected
- Clear solution emerged from analysis
- Single-file change identified

## Tracking Escalations

Keep a simple log to improve your tier estimation:

```
| Date | Task | Started | Ended | Why Escalated |
|------|------|---------|-------|---------------|
| 1/10 | API fix | T1 | T1 | - |
| 1/10 | Auth review | T2 | T3 | Found architecture issue |
| 1/11 | Add PHPDoc | T1 | T1 | - |
| 1/11 | Cache system | T3 | T1 | Just config, not code |
```

Review monthly. Look for patterns:
- Which task types do you mis-estimate?
- Are you escalating too much or too little?
- What signals do you miss?

## Related

- [TIER_SYSTEM.md](./TIER_SYSTEM.md) — Full framework
- [T1 Guide](./tier-1-routine.md) — Copilot patterns
- [T2 Guide](./tier-2-analytical.md) — Cursor/ChatGPT patterns
- [T3 Guide](./tier-3-complex.md) — Claude Code patterns
