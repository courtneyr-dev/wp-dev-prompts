# Code Review Checklist

> **Tier**: T2
> **Tool**: Cursor or ChatGPT
> **Time**: 30-60 min
> **Files**: 3-5

## When to Use

- Reviewing code before merge
- Security auditing REST endpoints
- Checking for WordPress best practices
- Evaluating code quality

## Prompt

```
Review this code for quality and security issues:

[PASTE CODE]

Check for:

**Security**
- Nonce verification on state-changing requests
- Capability checks before sensitive operations
- Input sanitization using WordPress functions
- Output escaping before rendering
- SQL injection vulnerabilities

**WordPress Patterns**
- Proper hook usage (actions/filters)
- Appropriate use of WordPress APIs
- Internationalization (i18n) for user-facing strings
- Following WordPress coding standards

**Code Quality**
- Single responsibility principle
- Clear naming conventions
- Appropriate error handling
- Testability

For each issue found:
1. Location (line number or function)
2. Severity (High/Medium/Low)
3. Description of the problem
4. Recommended fix
```

## Customization

| Variable | Description |
|----------|-------------|
| `[PASTE CODE]` | The code to review |

Add or remove checklist items based on context:
- For REST APIs: emphasize authentication and authorization
- For admin pages: emphasize CSRF and capability checks
- For frontend: emphasize escaping and XSS prevention

## Example Review Session

### Turn 1: Initial Review

```
Review this WordPress REST API endpoint for security:

[paste endpoint code]
```

### Turn 2: Deep Dive

```
You mentioned the permission callback. Here's that function:

[paste permission callback]

Is this secure for public API access?
```

### Turn 3: Input Handling

```
Here's how user input is processed:

[paste input handling code]

Are there any sanitization gaps?
```

## Review Categories

### Security Review Focus

```
Focus on security vulnerabilities:
- Authentication bypass possibilities
- Authorization gaps
- Injection vulnerabilities (SQL, XSS, command)
- Data exposure risks
- CSRF protection
```

### Performance Review Focus

```
Focus on performance issues:
- N+1 query patterns
- Missing caching opportunities
- Expensive operations in loops
- Unnecessary database calls
- Large data set handling
```

### Maintainability Review Focus

```
Focus on maintainability:
- Code duplication
- Complex conditionals
- Deep nesting
- Missing documentation
- Tight coupling
```

## Output Format

Request structured output:

```
Provide findings in this format:

## Critical Issues
[Issues that must be fixed before merge]

## Warnings
[Issues that should be addressed]

## Suggestions
[Improvements that would be nice]

## Positive Notes
[Things done well]
```

## Verification

After review:

- [ ] All critical issues addressed
- [ ] Security concerns resolved
- [ ] Tests added for any fixes
- [ ] Re-review if significant changes made

## When to Escalate

Escalate to T3 if:

- Review reveals architectural problems
- Security fixes require multi-file changes
- Refactoring is needed before issues can be fixed
- Implementation of fixes is complex

## Related

- [T2 Guide](../../../workflows/tiered-agents/tier-2-analytical.md)
- [Security Review Prompt](./security-review.md) (T3 for implementation)
- [WordPress Security Best Practices](https://developer.wordpress.org/plugins/security/)
