# T2: Analytical Tasks — Cursor/ChatGPT Guide

> **Tool**: Cursor or ChatGPT
> **Time**: 30 min–2 hr
> **Risk**: Medium
> **Files**: 3–5

## When to Use T2

Use Cursor or ChatGPT for analytical tasks that:

- Require understanding across multiple files
- Need reasoning about trade-offs
- Involve code review or auditing
- Don't require actual code execution
- Benefit from interactive Q&A

## Ideal T2 Tasks

### Code Review

- Security review of REST endpoints
- Review authentication flows
- Audit data handling patterns
- Check for OWASP vulnerabilities

### Analysis

- Identify refactoring opportunities
- Analyze dependency relationships
- Find test coverage gaps
- Evaluate architecture decisions

### Documentation Review

- Verify accuracy of existing docs
- Identify documentation gaps
- Review API documentation
- Check changelog completeness

### Planning

- Design test strategy
- Plan migration approach
- Outline refactoring steps
- Scope feature requirements

## Tool Comparison

| Aspect | Cursor | ChatGPT |
|--------|--------|---------|
| **File access** | Direct codebase access | Paste code snippets |
| **Context window** | Large, automatic | Manual management |
| **Iteration** | Fast, inline | Copy/paste workflow |
| **Best for** | Multi-file analysis | Detailed reasoning |

### When to Use Cursor

- Analyzing relationships between files
- Reviewing entire modules
- When you need to jump between files
- Understanding existing patterns

### When to Use ChatGPT

- Deep reasoning about a specific problem
- When you want detailed explanations
- Comparing architectural approaches
- When Cursor context is insufficient

## Prompt Patterns for T2

### Pattern 1: Security Audit

```
Review these REST API endpoints for security issues:

[Paste relevant code]

Check for:
1. Nonce verification on all state-changing requests
2. Capability checks before sensitive operations
3. Input sanitization using WordPress functions
4. Output escaping before rendering
5. SQL injection vulnerabilities

For each issue found, explain:
- What the vulnerability is
- How it could be exploited
- The recommended fix
```

### Pattern 2: Refactoring Analysis

```
Analyze this code for refactoring opportunities:

[Paste code]

Consider:
1. Single Responsibility violations
2. Repeated patterns that could be abstracted
3. Complex conditionals that could be simplified
4. Opportunities for WordPress hooks/filters
5. Testability improvements

Prioritize suggestions by:
- Impact (High/Medium/Low)
- Effort (High/Medium/Low)
- Risk (High/Medium/Low)
```

### Pattern 3: Test Coverage Gap Analysis

```
Given this implementation:

[Paste source code]

And these existing tests:

[Paste test code or describe coverage]

Identify:
1. Untested public methods
2. Edge cases not covered
3. Error conditions not tested
4. Integration points needing tests
5. Critical paths without coverage

For each gap, suggest a test approach.
```

### Pattern 4: Dependency Audit

```
Review these dependencies for:

[Paste composer.json or package.json]

Check:
1. Security vulnerabilities (known CVEs)
2. Outdated packages with available updates
3. Abandoned or unmaintained packages
4. License compatibility issues
5. Unnecessary dependencies

Recommend actions for each concern.
```

### Pattern 5: Code Explanation

```
Explain what this code does and why:

[Paste complex code section]

Include:
1. Overall purpose
2. Step-by-step logic flow
3. WordPress-specific patterns used
4. Potential issues or concerns
5. Suggestions for improvement
```

## T2 Checklist

Before starting a T2 task, verify:

- [ ] Task requires analysis, not just implementation
- [ ] Multiple files need to be understood together
- [ ] You need reasoning about trade-offs
- [ ] Task doesn't require running code
- [ ] Expected output is insights, not code changes

## T2 Workflow

1. **Gather**: Collect relevant code sections
2. **Context**: Provide background on the codebase
3. **Question**: Ask specific, analytical questions
4. **Iterate**: Follow up on interesting findings
5. **Document**: Record insights and recommendations
6. **Decide**: Determine if implementation is T1 or T3

## Interactive Analysis Patterns

### Multi-Turn Security Review

**Turn 1:**
```
I need to review the security of my WordPress REST API.
Here's the main endpoint registration:

[Paste code]

What should I check first?
```

**Turn 2:**
```
Good points. Here's the permission callback:

[Paste code]

Is this implementation secure?
```

**Turn 3:**
```
Here's how the endpoint handles user input:

[Paste code]

Are there any sanitization issues?
```

### Architecture Discussion

**Turn 1:**
```
I'm considering two approaches for storing reaction data:
A) Custom table with direct queries
B) Post meta with caching layer

Current scale: ~1000 reactions/day
Expected: 10,000/day in 6 months

What factors should I consider?
```

**Turn 2:**
```
Good points about query performance.
Here's my current schema thinking:

[Describe approach]

What are the trade-offs?
```

## Common T2 Mistakes

### Too Vague

❌ "Is this code good?"
✅ "Review this code for SQL injection vulnerabilities in the WHERE clause construction"

### Missing Context

❌ "Why doesn't this work?"
✅ "This function should return user reactions but returns empty. Here's the function and how it's called:"

### Expecting Implementation

❌ "Rewrite this to be better"
✅ "What refactoring opportunities exist here? I'll implement separately."

### Skipping Iteration

❌ One massive prompt with everything
✅ Start focused, expand based on findings

## When to Escalate to T3

Escalate to Claude Code if:

- Analysis reveals architecture changes needed
- Security issues require careful, tested fixes
- Refactoring spans more than 5 files
- Implementation requires exploring the codebase
- You need code execution to verify assumptions

## Sample T2 Prompts

### REST API Security Review

```
Review this WordPress REST API endpoint for security:

[Paste endpoint code]

Verify:
- Permission callback validates capabilities
- Nonce verification for authenticated requests
- All user input is sanitized
- Output is properly escaped
- No information disclosure in errors
```

### Database Query Analysis

```
Analyze this WordPress database interaction:

[Paste code with queries]

Check for:
- Proper use of $wpdb->prepare()
- Efficient query patterns
- Appropriate caching usage
- Transaction handling if needed
- Multisite compatibility
```

### Hook Architecture Review

```
Review how this plugin uses WordPress hooks:

Actions registered:
[List actions]

Filters registered:
[List filters]

Evaluate:
- Hook priority appropriateness
- Potential conflicts with other plugins
- Performance implications
- Unhook-ability for extensibility
```

### Test Strategy Design

```
Design a test strategy for this feature:

[Describe feature]

Current state:
- No existing tests
- Uses REST API, database, external API

Recommend:
- What to unit test vs integration test
- Critical paths requiring E2E tests
- Mock/stub approach for external API
- Fixture data requirements
```

## Related

- [TIER_SYSTEM.md](./TIER_SYSTEM.md) — Full framework
- [T2 Prompts](../../prompts/tiered/t2-analytical/) — Ready-to-use prompts
- [Escalation Guide](./escalation-guide.md) — When to move to T3
