# Simple Bugfix

> **Tier**: T1
> **Tool**: Copilot
> **Time**: <15 min
> **Files**: 1

## When to Use

- Fixing obvious bugs with clear patterns
- Adding missing null checks
- Correcting typos in code
- Fixing off-by-one errors
- Adding missing escaping or sanitization

## Prompt

Place cursor at the bug location and type:

```php
// Fix: [DESCRIPTION_OF_FIX]
```

Or use Copilot Chat:

```
Fix bug: [DESCRIPTION]

Current behavior: [WHAT_HAPPENS]
Expected behavior: [WHAT_SHOULD_HAPPEN]
```

## Customization

| Variable | Description |
|----------|-------------|
| `[DESCRIPTION_OF_FIX]` | What needs to be fixed |
| `[WHAT_HAPPENS]` | Current incorrect behavior |
| `[WHAT_SHOULD_HAPPEN]` | Correct behavior |

## Examples

### Missing Null Check

```php
// Fix: add null check before accessing property
$name = $user->display_name;
```

Becomes:

```php
$name = $user ? $user->display_name : '';
```

### Missing Escaping

```php
// Fix: escape output for HTML context
echo $title;
```

Becomes:

```php
echo esc_html( $title );
```

### Typo in Variable

```php
// Fix: typo in variable name (should be $post_id)
$reaction = get_reaction( $postt_id );
```

### Off-by-One Error

```php
// Fix: should start at 0, not 1
for ( $i = 1; $i < count( $items ); $i++ ) {
```

### Missing Sanitization

```php
// Fix: sanitize user input
$search = $_GET['search'];
```

Becomes:

```php
$search = isset( $_GET['search'] ) ? sanitize_text_field( wp_unslash( $_GET['search'] ) ) : '';
```

## Verification

After fixing:

1. **Test the fix** — Verify the bug is resolved
2. **Check for regressions** — Run existing tests
3. **Review the change** — Make sure fix doesn't introduce new issues

```bash
# Run tests for the affected area
./vendor/bin/phpunit --filter TestClassName

# Check for syntax errors
php -l path/to/file.php
```

## When to Escalate

Escalate to T2 if:

- Bug fix affects multiple files
- You're not sure why the bug exists
- Fix requires understanding broader context
- Copilot suggestions fail twice

## Tips

### Be Specific

```php
// Bad: Fix the bug
// Good: Fix: add isset() check for optional array key
```

### Show Context

When using Copilot Chat, include the surrounding code:

```
Fix the null pointer issue in this code:

[paste relevant code block]

The $user variable might be null when called from the API endpoint.
```

### One Fix at a Time

Don't combine multiple fixes. Fix one issue, verify, then move to the next.

## Related

- [T1 Guide](../../../workflows/tiered-agents/tier-1-routine.md)
- [Escalation Guide](../../../workflows/tiered-agents/escalation-guide.md)
