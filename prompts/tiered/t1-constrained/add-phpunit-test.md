# Add PHPUnit Test

> **Tier**: T1
> **Tool**: Copilot
> **Time**: <15 min
> **Files**: 1-2

## When to Use

- Writing a test for a single method
- Adding a test case for an edge condition
- Expanding test coverage for existing tests

## Prompt

In your test file, type:

```php
/**
 * Test [METHOD_NAME] [BEHAVIOR_DESCRIPTION]
 */
public function test_[method]_[scenario]() {
    // Copilot completes based on context
}
```

Or use Copilot Chat:

```
Write PHPUnit test for [METHOD_NAME] that:
- Tests [HAPPY_PATH]
- Tests [EDGE_CASE]
- Uses existing fixtures from this file
```

## Customization

| Variable | Description |
|----------|-------------|
| `[METHOD_NAME]` | Method being tested |
| `[BEHAVIOR_DESCRIPTION]` | What behavior to test |
| `[HAPPY_PATH]` | Normal expected behavior |
| `[EDGE_CASE]` | Edge condition to verify |

## Examples

### Basic Test

```php
/**
 * Test get_reactions returns array for valid post
 */
public function test_get_reactions_valid_post() {
    // Copilot generates test body
}
```

### Edge Case Test

```php
/**
 * Test get_reactions returns empty array for invalid post ID
 */
public function test_get_reactions_invalid_post_returns_empty() {
```

### Copilot Chat Example

```
Write PHPUnit test for sanitize_reaction_type() that:
- Tests valid type returns sanitized string
- Tests invalid type returns empty string
- Tests empty input returns empty string
```

## Verification

After generation, verify:

- [ ] Test method name follows `test_[method]_[scenario]` pattern
- [ ] Assertions are appropriate for the behavior
- [ ] Test is isolated (no side effects)
- [ ] Run the test to confirm it passes

```bash
./vendor/bin/phpunit --filter test_get_reactions_valid_post
```

## Tips

### Open Source File Alongside

Copilot generates better tests when it can see the implementation:
1. Open the source file in a split pane
2. Open the test file
3. Copilot uses both for context

### Use Existing Test Patterns

Start your test similar to existing tests in the file. Copilot will follow the established pattern.

### Be Specific in Comments

```php
// Bad: Test the function
// Good: Test get_reactions returns empty array when post has no reactions
```

## Related

- [T1 Guide](../../../workflows/tiered-agents/tier-1-routine.md)
- [PHPUnit Documentation](https://docs.phpunit.de/)
- [WordPress Testing Guide](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/)
