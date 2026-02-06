# Compound Review for WordPress

> **Type**: Skill
> **Domain**: engineering/workflow
> **Source**: [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — Adapted for WordPress

<skill>
<summary>
Multi-dimensional code review for WordPress plugins covering security, performance, standards, and architecture.
</summary>

<knowledge>
## Review Philosophy

Thorough reviews compound knowledge:
- Each review teaches patterns to avoid
- Documented findings become team knowledge
- Catch issues early when fixes are cheap

## Review Dimensions

### 1. Security Review 🔒

**Check for:**
- [ ] Input sanitization with appropriate functions
- [ ] Output escaping in correct context
- [ ] Nonce verification on forms and AJAX
- [ ] Capability checks before actions
- [ ] Prepared statements for database queries
- [ ] No direct file operations on user input
- [ ] Safe redirect usage (`wp_safe_redirect`)
- [ ] No sensitive data in logs or errors

**WordPress Security Functions:**
```php
// Input sanitization
sanitize_text_field()
sanitize_email()
absint()
wp_kses_post()

// Output escaping
esc_html()
esc_attr()
esc_url()
esc_js()
wp_kses_post()

// Verification
wp_verify_nonce()
current_user_can()
check_admin_referer()
```

### 2. Performance Review ⚡

**Check for:**
- [ ] No queries in loops
- [ ] Proper use of transients/object cache
- [ ] Limited `posts_per_page` (never -1 in production)
- [ ] `no_found_rows` when pagination not needed
- [ ] Conditional asset loading
- [ ] No blocking external requests
- [ ] Database indexes for custom tables
- [ ] Autoloaded options kept minimal

**Performance Anti-Patterns:**
```php
// Bad: Query in loop
foreach ($ids as $id) {
    $post = get_post($id);  // N+1 queries
}

// Good: Prime cache first
_prime_post_caches($ids);
foreach ($ids as $id) {
    $post = get_post($id);  // From cache
}
```

### 3. Standards Review 📋

**Check for:**
- [ ] WordPress Coding Standards compliance
- [ ] Proper text domain for translations
- [ ] DocBlocks on functions and classes
- [ ] Consistent naming conventions
- [ ] No PHP warnings/notices
- [ ] Proper use of WordPress APIs (not reinventing)

**Run automated checks:**
```bash
# PHPCS with WordPress standards
composer phpcs

# PHPStan static analysis
composer phpstan

# JavaScript linting
npm run lint:js
```

### 4. Architecture Review 🏗️

**Check for:**
- [ ] Single responsibility in classes/functions
- [ ] Appropriate use of hooks for extensibility
- [ ] No tight coupling to specific implementations
- [ ] Proper separation of concerns
- [ ] Consistent patterns with rest of codebase
- [ ] No breaking changes to public APIs

**Questions to ask:**
- Could another developer extend this via hooks?
- Is this testable in isolation?
- Does this follow existing patterns in the codebase?
- Will this scale with more users/data?

### 5. Block Editor Review 🧱

**If modifying Gutenberg blocks:**
- [ ] Uses Block Supports API appropriately
- [ ] Server-side rendering matches editor preview
- [ ] Accessible keyboard navigation
- [ ] Works with Full Site Editing themes
- [ ] No deprecated components used
- [ ] Block validates without errors

### 6. REST API Review 🔌

**If modifying REST endpoints:**
- [ ] Permission callback is never `__return_true` for write operations
- [ ] Schema defined for request/response
- [ ] Proper HTTP status codes returned
- [ ] Rate limiting consideration for expensive operations
- [ ] Consistent with WordPress REST conventions

### 7. Database Review 💾

**If modifying database:**
- [ ] Uses `$wpdb->prepare()` for all dynamic values
- [ ] Custom tables use `dbDelta()` for creation
- [ ] Migrations handle existing data
- [ ] Uninstall cleans up properly
- [ ] Indexes on frequently queried columns

## Severity Levels

| Level | Label | Meaning | Action |
|-------|-------|---------|--------|
| P1 | 🔴 CRITICAL | Security vulnerability, data loss risk | Must fix before merge |
| P2 | 🟡 IMPORTANT | Bug, performance issue, standard violation | Should fix before merge |
| P3 | 🔵 SUGGESTION | Improvement, style preference | Consider for this or future PR |

## Review Output Format

```markdown
## Code Review: [PR/Branch Name]

### Summary
[1-2 sentence overview of findings]

### 🔴 Critical (P1)
None found / List items

### 🟡 Important (P2)
1. **[Category]**: [Issue description]
   - File: `path/to/file.php:123`
   - Problem: [What's wrong]
   - Fix: [Suggested solution]

### 🔵 Suggestions (P3)
1. **[Category]**: [Suggestion]
   - File: `path/to/file.php:456`
   - Suggestion: [Improvement idea]

### Positive Notes
- [Good patterns observed]
- [Well-implemented features]

### Testing Checklist
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing (if frontend)
- [ ] Accessibility testing (if UI changes)

### Recommendation
- [ ] Approve
- [ ] Approve with suggestions
- [ ] Request changes (P2 items)
- [ ] Block (P1 items)
```

## Review Checklist by Change Type

### New Feature
- [ ] All security checks in place
- [ ] Performance acceptable
- [ ] Hooks for extensibility
- [ ] Tests included
- [ ] Documentation updated

### Bug Fix
- [ ] Root cause identified
- [ ] Fix doesn't introduce new issues
- [ ] Test proves bug is fixed
- [ ] Similar patterns checked elsewhere

### Refactor
- [ ] Behavior unchanged
- [ ] Tests still pass
- [ ] No breaking changes to public API
- [ ] Performance not degraded
</knowledge>

<best_practices>
- Review with fresh eyes (take a break between writing and reviewing)
- Focus on the code, not the author
- Explain why, not just what
- Praise good patterns, not just critique bad ones
- Document findings for team knowledge base
</best_practices>

<references>
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)
- [WordPress Plugin Security](https://developer.wordpress.org/plugins/security/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
</references>
</skill>
