# Compound Documentation for WordPress

> **Type**: Skill
> **Domain**: engineering/workflow
> **Source**: [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — Adapted for WordPress

<skill>
<summary>
Document solved WordPress problems to build team knowledge that compounds over time.
</summary>

<knowledge>
## Core Philosophy

**"Every solved problem is documentation waiting to be written."**

Initial problem-solving requires research and experimentation. Documentation transforms that effort into instant lookups for future occurrences.

## When to Document

Trigger documentation when:
- "That worked!" after debugging
- Solving a problem that took > 30 minutes
- Finding a non-obvious WordPress behavior
- Discovering a plugin conflict resolution
- Creating a reusable pattern

## Solution Document Structure

```markdown
---
title: [Descriptive title]
category: [Category]
tags: [tag1, tag2]
wp_version: [WordPress version]
php_version: [PHP version]
date_solved: YYYY-MM-DD
---

# [Problem Title]

## Symptoms
[What the user/developer observed]

## Environment
- WordPress: [version]
- PHP: [version]
- Theme: [name/version]
- Relevant plugins: [list]

## Investigation
[Steps taken to diagnose]

## Root Cause
[Why this happened]

## Solution
[How to fix it]

### Code Example
```php
// Working solution
```

## Prevention
[How to avoid this in the future]

## Related
- [Link to related docs]
- [Link to WordPress Trac if relevant]
```

## WordPress Documentation Categories

### Build Errors
- Composer/npm dependency conflicts
- PHP version incompatibilities
- Missing WordPress functions
- Block build failures

### Runtime Errors
- White screen of death
- Fatal errors
- Memory exhaustion
- Database connection issues

### Test Failures
- PHPUnit configuration
- Mock/stub issues
- Test database setup
- Block testing with Jest

### Performance Issues
- Slow queries identified
- Cache invalidation problems
- Asset loading optimization
- External API bottlenecks

### Plugin Conflicts
- Hook priority issues
- JavaScript conflicts
- REST API interference
- Block editor conflicts

### Database Issues
- Migration failures
- Query optimization
- Character encoding
- Table prefix problems

### Security Issues
- Vulnerability fixes
- Authentication problems
- Permission escalation
- Input validation gaps

### Block Editor Issues
- Block validation errors
- Deprecation handling
- InnerBlocks problems
- Server-side rendering

## Example Documentation

### Block Validation Error

```markdown
---
title: Block validation fails after adding new attribute
category: block-editor
tags: [gutenberg, blocks, validation]
wp_version: 6.4
date_solved: 2024-01-15
---

# Block Validation Fails After Adding New Attribute

## Symptoms
- Console error: "Block validation failed"
- Block shows "Attempt Block Recovery" message
- Only affects existing posts, new posts work fine

## Environment
- WordPress 6.4
- Custom block plugin
- Issue appears after adding `backgroundColor` attribute

## Investigation
1. Checked browser console — validation mismatch
2. Compared saved content with expected output
3. Found saved content missing new attribute
4. Realized existing posts saved without the attribute

## Root Cause
When adding a new attribute to a block, existing saved content doesn't
have that attribute. The save function outputs markup expecting the
attribute, causing validation mismatch.

## Solution
Add a `default` value for the new attribute:

```javascript
attributes: {
    backgroundColor: {
        type: 'string',
        default: '#ffffff'  // Prevents validation failure
    }
}
```

Or handle missing attribute in save function:

```javascript
save: ({ attributes }) => {
    const { backgroundColor = '#ffffff' } = attributes;
    return <div style={{ backgroundColor }}>...</div>;
}
```

## Prevention
- Always add default values to new attributes
- Test changes against existing content, not just new posts
- Consider using block deprecation for significant changes

## Related
- [Block Deprecation Guide](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/)
- [Block Attributes](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/)
```

### Plugin Conflict Resolution

```markdown
---
title: REST API 401 errors with security plugin
category: plugin-conflicts
tags: [rest-api, security, authentication]
wp_version: 6.4
date_solved: 2024-01-20
---

# REST API Returns 401 Despite Correct Authentication

## Symptoms
- Custom REST endpoint returns 401 Unauthorized
- Application password is correct
- Works when security plugin is deactivated

## Environment
- WordPress 6.4
- Wordfence 7.x active
- Custom plugin with REST API

## Investigation
1. Verified application password works with core endpoints
2. Deactivated plugins one by one
3. Identified Wordfence as the cause
4. Found Wordfence blocking non-standard REST routes

## Root Cause
Wordfence's "Block unauthorized REST API access" setting was blocking
our custom namespace because it wasn't in the allowed list.

## Solution
Option 1: Whitelist the namespace in Wordfence:
Wordfence > All Options > REST API > Allowlist

Option 2: Filter the blocked namespaces:
```php
add_filter('wordfence_ls_require_auth_for_rest_api', function($blocked, $namespace) {
    if ($namespace === 'myplugin/v1') {
        return false;  // Don't block our namespace
    }
    return $blocked;
}, 10, 2);
```

## Prevention
- Document security plugin compatibility
- Test with popular security plugins before release
- Provide configuration guidance in plugin docs

## Related
- [Wordfence REST API Settings](https://www.wordfence.com/help/firewall/rest-api/)
```

## Directory Structure

```
docs/solutions/
├── block-editor/
│   ├── validation-new-attribute.md
│   └── innerblocks-template.md
├── plugin-conflicts/
│   ├── wordfence-rest-api.md
│   └── caching-plugin-ajax.md
├── performance/
│   ├── slow-meta-query.md
│   └── autoload-options.md
├── database/
│   └── charset-collation-mismatch.md
└── security/
    └── nonce-expiration-ajax.md
```

## Integration with Development Workflow

1. **During debugging**: Take notes as you investigate
2. **After solving**: Convert notes to documentation
3. **During PR review**: Link to relevant solutions
4. **During onboarding**: Point new team members here
5. **During support**: Reference when answering questions
</knowledge>

<best_practices>
- Document while the solution is fresh
- Include the investigation journey, not just the answer
- Link to official WordPress documentation
- Tag appropriately for searchability
- Update when WordPress changes invalidate solutions
</best_practices>

<references>
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)
- [WordPress Developer Resources](https://developer.wordpress.org/)
- [WordPress Trac](https://core.trac.wordpress.org/)
</references>
</skill>
