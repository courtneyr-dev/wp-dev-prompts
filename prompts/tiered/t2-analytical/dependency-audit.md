# Dependency Audit

> **Tier**: T2
> **Tool**: Cursor or ChatGPT
> **Time**: 30-45 min
> **Files**: 1-2 (composer.json, package.json)

## When to Use

- Reviewing project dependencies for issues
- Checking for security vulnerabilities
- Evaluating dependency health
- Planning upgrades

## Prompt

```
Audit these project dependencies:

[PASTE composer.json or package.json]

Check for:

1. **Security Vulnerabilities**
   - Known CVEs in current versions
   - Packages with security advisories
   - Packages that handle sensitive data

2. **Maintenance Status**
   - Abandoned or unmaintained packages
   - Packages with no recent updates (>2 years)
   - Packages with declining community

3. **Version Analysis**
   - Outdated packages with available updates
   - Major version gaps
   - Packages pinned to old versions

4. **License Compatibility**
   - GPL compatibility for WordPress
   - License conflicts
   - Commercial license requirements

5. **Necessity Check**
   - Packages that might be unnecessary
   - Packages with overlapping functionality
   - Large packages used for small features

For each concern:
- Package name and version
- Issue description
- Severity (Critical/High/Medium/Low)
- Recommended action
```

## Customization

| Variable | Description |
|----------|-------------|
| `[PASTE composer.json or package.json]` | Dependency file contents |

## Example Audit Session

### Turn 1: Initial Audit

```
Audit this composer.json for a WordPress plugin:

{
  "require": {
    "php": ">=7.4",
    "guzzlehttp/guzzle": "^6.5",
    "monolog/monolog": "^2.0"
  },
  "require-dev": {
    "phpunit/phpunit": "^9.0",
    "squizlabs/php_codesniffer": "^3.6"
  }
}

This plugin will be distributed on WordPress.org.
```

### Turn 2: Specific Package

```
You flagged Guzzle 6.5 as outdated. Here's how we use it:

[paste code using Guzzle]

What would upgrading to Guzzle 7 require?
```

### Turn 3: Alternatives

```
Is Guzzle necessary, or could we use WordPress HTTP API instead?

Current usage:
- Making REST API calls to external service
- Need timeout configuration
- Need retry logic
```

## Audit Types

### Security-Focused Audit

```
Focus on security:
- Check each package against security advisories
- Identify packages that handle auth/crypto/user data
- Flag any packages with history of vulnerabilities
- Check transitive dependencies too
```

### Upgrade Planning Audit

```
Focus on upgrades:
- List all packages with available updates
- Categorize by: patch, minor, major
- Identify breaking changes in major updates
- Suggest upgrade order based on dependencies
```

### License Compliance Audit

```
Focus on licensing for WordPress.org distribution:
- Verify all packages are GPL-compatible
- Flag any proprietary or restrictive licenses
- Check if attribution is required
- Identify any commercial packages
```

### Optimization Audit

```
Focus on reducing dependencies:
- Identify packages used for single features
- Find packages that duplicate WordPress functionality
- Calculate total dependency weight
- Suggest removals or alternatives
```

## Output Template

```
## Dependency Audit Summary

**Total packages**: X
**Issues found**: Y

## Critical Issues
[Must address before release]

| Package | Issue | Action |
|---------|-------|--------|
| [name] | [description] | [fix] |

## Warnings
[Should address soon]

## Recommendations
[Nice to have improvements]

## Update Plan
[Suggested order for updates]

## Verification Commands
[Commands to run after changes]
```

## Verification

After addressing audit findings:

```bash
# PHP dependencies
composer audit
composer outdated

# Node dependencies
npm audit
npm outdated
```

## When to Escalate

Escalate to T3 if:

- Major version upgrades require code changes
- Security vulnerabilities need immediate patching
- Dependency removal requires refactoring
- License issues require architectural changes

## Related

- [T2 Guide](../../../workflows/tiered-agents/tier-2-analytical.md)
- [Composer Documentation](https://getcomposer.org/doc/)
- [npm Security](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities)
