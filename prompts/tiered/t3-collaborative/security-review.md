# Security Review and Remediation

> **Tier**: T3
> **Tool**: Claude Code
> **Time**: 2-4 hours
> **Files**: Variable (often 10+)

## When to Use

- Comprehensive security audit with fixes
- Implementing security fixes across multiple files
- Setting up security infrastructure
- Hardening an entire plugin

## Prompt

```
Conduct a security review and implement fixes for this WordPress plugin:

**Scope:**
- [SPECIFIC_AREAS or "entire plugin"]

**Focus Areas:**
1. Authentication and Authorization
2. Input Validation and Sanitization
3. Output Escaping
4. SQL Injection Prevention
5. Cross-Site Scripting (XSS) Prevention
6. Cross-Site Request Forgery (CSRF) Protection
7. File Upload Security (if applicable)
8. Information Disclosure

**Process:**
1. Explore the codebase to identify security-sensitive areas
2. Document all vulnerabilities found
3. Prioritize by severity
4. Implement fixes with tests
5. Verify fixes are effective

**Deliverables:**
- Security findings report
- Implemented fixes
- Tests for each fix
- Recommendations for ongoing security
```

## Customization

| Variable | Description |
|----------|-------------|
| `[SPECIFIC_AREAS]` | Limit scope if needed (e.g., "REST API only") |

## Example Security Session

### Turn 1: Initial Request

```
Security review of my WordPress plugin's REST API:

The plugin:
- Has 12 REST endpoints
- Handles user-submitted content
- Integrates with external APIs
- Stores sensitive settings

Start by exploring the REST API code and identifying
all security-sensitive patterns.
```

### Turn 2: Findings Review

```
You found 8 issues. Before implementing fixes:

1. For issue #3 (SQL injection), show me the vulnerable code
2. For issue #5 (missing nonce), is this actually needed for
   public GET endpoints?
3. Let's prioritize: which 3 are most critical?
```

### Turn 3: Fix Implementation

```
Implement fixes in this order:
1. SQL injection (#3) — Critical
2. Authorization bypass (#1) — Critical
3. Missing sanitization (#4, #6, #7) — High

For each fix:
- Show the change
- Explain why it works
- Add a test that would catch the vulnerability
```

### Turn 4: Verification

```
Fixes look good. Now:
1. Run all existing tests to check for regressions
2. Manually test each endpoint
3. Run PHPCS to ensure code style is maintained
4. Document the changes for changelog
```

## Security Check Categories

### Authentication

```
Check authentication:
- Are all state-changing endpoints authenticated?
- Is authentication checked early in request lifecycle?
- Are tokens/cookies handled securely?
- Is there protection against brute force?
```

### Authorization

```
Check authorization:
- Are capability checks in place?
- Are they using correct capabilities?
- Is there object-level authorization (user can edit this specific item)?
- Are admin-only features properly protected?
```

### Input Handling

```
Check input handling:
- Is all user input sanitized?
- Are appropriate WordPress functions used?
- Is validation done before processing?
- Are file uploads restricted properly?
```

### Output Handling

```
Check output handling:
- Is all output escaped?
- Is context-appropriate escaping used?
- Are dynamic URLs properly escaped?
- Is JSON output safe?
```

### Database Security

```
Check database interactions:
- Is $wpdb->prepare() used for all queries with variables?
- Are table names properly prefixed?
- Is direct SQL avoided when possible?
- Are results properly typed?
```

### CSRF Protection

```
Check CSRF protection:
- Do all state-changing requests verify nonces?
- Are nonces scoped appropriately?
- Is nonce verification early in the handler?
- Are AJAX requests protected?
```

## Severity Classification

```
Classify findings by severity:

**Critical** — Immediate fix required
- SQL injection
- Authentication bypass
- Remote code execution
- Privilege escalation

**High** — Fix before release
- Stored XSS
- CSRF on sensitive actions
- Missing authorization checks
- Information disclosure (sensitive data)

**Medium** — Fix soon
- Reflected XSS
- Missing input validation
- CSRF on non-sensitive actions
- Verbose error messages

**Low** — Fix when convenient
- Missing nonces on idempotent operations
- Minor information disclosure
- Security headers missing
```

## Fix Documentation

For each fix, document:

```markdown
## [Vulnerability Name]

**Severity**: Critical/High/Medium/Low
**Location**: path/to/file.php:line
**Type**: SQL Injection / XSS / CSRF / etc.

### Description
[What the vulnerability is and how it could be exploited]

### Fix
[What was changed]

### Before
[Code before fix]

### After
[Code after fix]

### Test
[How to verify the fix works]
```

## Verification Checklist

After fixes:

- [ ] All identified vulnerabilities addressed
- [ ] Tests added for each vulnerability
- [ ] Existing tests still pass
- [ ] Manual testing completed
- [ ] PHPCS clean
- [ ] No new security issues introduced
- [ ] Changelog entry added
- [ ] Consider security advisory if public disclosure needed

## Ongoing Security

Recommend ongoing practices:

```
Establish ongoing security practices:
- Pre-commit security linting
- Regular dependency updates
- Periodic security reviews
- Security-focused code review checklist
- Bug bounty program (for larger projects)
```

## Related

- [T3 Guide](../../../workflows/tiered-agents/tier-3-complex.md)
- [Code Review Checklist](../t2-analytical/code-review-checklist.md) — For T2 review
- [WordPress Security Best Practices](https://developer.wordpress.org/plugins/security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
