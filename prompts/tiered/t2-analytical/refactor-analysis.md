# Refactor Analysis

> **Tier**: T2
> **Tool**: Cursor or ChatGPT
> **Time**: 30-60 min
> **Files**: 3-5

## When to Use

- Identifying code that needs refactoring
- Planning a refactoring approach
- Evaluating technical debt
- Preparing for a larger refactoring effort (T3)

## Prompt

```
Analyze this code for refactoring opportunities:

[PASTE CODE]

Evaluate:

1. **Single Responsibility Violations**
   - Classes/functions doing too many things
   - Mixed concerns (data, logic, presentation)

2. **Code Duplication**
   - Repeated patterns that could be abstracted
   - Copy-paste code across methods

3. **Complexity Issues**
   - Deep nesting (>3 levels)
   - Long methods (>50 lines)
   - Complex conditionals

4. **WordPress-Specific Patterns**
   - Opportunities for hooks/filters
   - Better use of WordPress APIs
   - Plugin architecture improvements

5. **Testability**
   - Hard-coded dependencies
   - Global state usage
   - Side effects in constructors

For each opportunity:
- Current state (what's wrong)
- Proposed change (what to do)
- Impact: High/Medium/Low
- Effort: High/Medium/Low
- Risk: High/Medium/Low

Prioritize by Impact/Effort ratio.
```

## Customization

| Variable | Description |
|----------|-------------|
| `[PASTE CODE]` | Code to analyze |

## Example Analysis Session

### Turn 1: Initial Analysis

```
Analyze this class for refactoring:

[paste class code]

Focus on reducing complexity and improving testability.
```

### Turn 2: Specific Pattern

```
You identified repeated API call patterns. Here are the other methods that do similar things:

[paste additional code]

What abstraction would work for all of these?
```

### Turn 3: Trade-off Discussion

```
I'm considering two approaches for the refactoring:
A) Extract a service class
B) Use WordPress hooks

Current constraints:
- Need to maintain backward compatibility
- Limited time for testing
- Other plugins depend on this class

Which approach has better trade-offs?
```

## Analysis Frameworks

### SOLID Principles Check

```
Analyze against SOLID principles:
- Single Responsibility: Does each class have one reason to change?
- Open/Closed: Can behavior be extended without modification?
- Liskov Substitution: Are subclasses truly substitutable?
- Interface Segregation: Are interfaces focused?
- Dependency Inversion: Do we depend on abstractions?
```

### Code Smell Detection

```
Check for these code smells:
- Long Method
- Large Class
- Feature Envy
- Data Clumps
- Primitive Obsession
- Switch Statements
- Parallel Inheritance
- Lazy Class
- Speculative Generality
- Message Chains
```

### WordPress-Specific Analysis

```
Analyze WordPress integration:
- Are hooks in the right places?
- Could filters make this more extensible?
- Is this following plugin architecture best practices?
- Are we reinventing WordPress functionality?
```

## Output Template

Request this format:

```
## Summary
[One paragraph overview]

## Refactoring Opportunities

### High Priority
| Issue | Change | Impact | Effort | Risk |
|-------|--------|--------|--------|------|
| [Description] | [Proposed fix] | High | Low | Low |

### Medium Priority
[Same table format]

### Low Priority
[Same table format]

## Recommended Approach
[Suggested order of operations]

## Dependencies
[What needs to happen first]

## Testing Strategy
[How to verify refactoring success]
```

## When to Escalate

Escalate to T3 when:

- Refactoring affects 6+ files
- Architecture changes are needed
- Analysis reveals security issues requiring fixes
- Implementation complexity is high

## Related

- [T2 Guide](../../../workflows/tiered-agents/tier-2-analytical.md)
- [Escalation Guide](../../../workflows/tiered-agents/escalation-guide.md)
