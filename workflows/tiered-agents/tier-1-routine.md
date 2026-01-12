# T1: Routine Tasks — Copilot Guide

> **Tool**: GitHub Copilot
> **Time**: <30 minutes
> **Risk**: Low
> **Files**: 1–2

## When to Use T1

Use Copilot for routine tasks that:

- Touch only 1–2 files
- Follow existing patterns in the codebase
- Have clear, specific requirements
- Don't require understanding broader context
- Have low risk of breaking other functionality

## Ideal T1 Tasks

### Documentation

- Add PHPDoc blocks to methods
- Add inline comments to complex logic
- Update existing docblocks with missing params
- Add `@since` and `@deprecated` tags

### Testing

- Write unit test for a single method
- Add test case for edge condition
- Add assertions to existing test
- Create test fixture for specific scenario

### Code Quality

- Fix PHPCS violations
- Fix PHPStan errors
- Add type hints to parameters
- Add return type declarations

### Simple Fixes

- Fix typos in strings
- Update hardcoded values
- Add missing escaping
- Fix obvious null checks

## Prompt Patterns for Copilot

### Pattern 1: Single-Line Comment Prompt

Place cursor above the code, type a comment:

```php
// Add PHPDoc with @param and @return
public function get_reactions( $post_id ) {
```

Copilot generates the docblock.

### Pattern 2: Test File Context

Open test file alongside source file:

```php
/**
 * Test get_reactions returns empty array for invalid post
 */
public function test_get_reactions_invalid_post() {
    // Copilot completes based on visible context
}
```

### Pattern 3: Fix-in-Place

Highlight code, use Copilot Chat:

```
Fix PHPCS: add space after opening parenthesis
```

### Pattern 4: Pattern Completion

Write one example, Copilot generates similar:

```php
// Sanitize string input
$title = sanitize_text_field( $input['title'] );
// Copilot suggests similar lines for other fields
```

## T1 Checklist

Before starting a T1 task, verify:

- [ ] Task is truly single-file
- [ ] Similar pattern exists in codebase
- [ ] Requirements are unambiguous
- [ ] No architecture decisions needed
- [ ] Tests exist for the area (if code change)

## Common T1 Mistakes

### Starting Too Complex

❌ "Refactor this class to use dependency injection"
✅ "Add type hint to this parameter"

### Unclear Scope

❌ "Fix the validation"
✅ "Add `is_numeric()` check before line 45"

### Context-Dependent

❌ "Make this work with the new API"
✅ "Change `api/v1` to `api/v2` on line 23"

## When to Escalate to T2

Escalate if:

- Copilot suggestions are wrong twice
- You need to check another file to understand
- The fix requires changing multiple files
- You're unsure about the side effects

## Sample T1 Prompts

### Add PHPDoc

```
Add PHPDoc to get_user_reactions() documenting:
- $user_id parameter (int)
- $post_id parameter (int)
- Return value (array of reaction objects)
```

### Write Simple Test

```
Write PHPUnit test for sanitize_reaction_type():
- Test valid type returns sanitized string
- Test invalid type returns empty string
```

### Fix Linting Error

```
Fix "Missing space after opening parenthesis" on line 42
```

### Add Type Hint

```
Add int type hint to $post_id parameter
```

## T1 Workflow

1. **Identify**: Confirm task is T1 (single file, clear pattern)
2. **Position**: Open file, place cursor at target location
3. **Prompt**: Write comment or use Copilot Chat
4. **Accept**: Review suggestion, accept or regenerate
5. **Verify**: Run linter/tests to confirm
6. **Commit**: Small, focused commit

## Related

- [TIER_SYSTEM.md](./TIER_SYSTEM.md) — Full framework
- [T1 Prompts](../../prompts/tiered/t1-constrained/) — Ready-to-use prompts
- [Escalation Guide](./escalation-guide.md) — When to move to T2
