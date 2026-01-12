# Add PHPDoc

> **Tier**: T1
> **Tool**: Copilot
> **Time**: <5 min
> **Files**: 1

## When to Use

- Adding documentation to undocumented methods
- Updating existing PHPDoc with missing parameters
- Adding `@since`, `@deprecated`, or other tags

## Prompt

Place cursor above the method and type:

```php
// Add PHPDoc with @param types, @return type, and brief description
```

Or use Copilot Chat:

```
Add PHPDoc to [METHOD_NAME] documenting:
- Each parameter with type and description
- Return value with type and description
- @since [VERSION] tag
```

## Customization

| Variable | Description |
|----------|-------------|
| `[METHOD_NAME]` | Target method name |
| `[VERSION]` | Plugin version for @since tag |

## Examples

### Basic Method

```php
// Add PHPDoc with @param and @return
public function get_reactions( $post_id ) {
    // Copilot generates:
}

/**
 * Get reactions for a post.
 *
 * @param int $post_id The post ID.
 * @return array Array of reaction objects.
 */
```

### Method with Multiple Parameters

```php
// Add PHPDoc documenting all parameters and return value
public function add_reaction( $post_id, $user_id, $type ) {
```

### With Version Tag

```
Add PHPDoc to save_settings() with @since 1.2.0
```

## Verification

After generation, verify:

- [ ] All parameters documented
- [ ] Types are accurate
- [ ] Description is meaningful (not just repeating method name)
- [ ] Follows WordPress documentation standards

## Related

- [T1 Guide](../../../workflows/tiered-agents/tier-1-routine.md)
- [WordPress PHP Documentation Standards](https://developer.wordpress.org/coding-standards/inline-documentation-standards/php/)
