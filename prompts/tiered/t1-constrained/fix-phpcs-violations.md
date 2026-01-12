# Fix PHPCS Violations

> **Tier**: T1
> **Tool**: Copilot
> **Time**: <10 min
> **Files**: 1

## When to Use

- Fixing code style violations flagged by PHPCS
- Applying WordPress Coding Standards
- Cleaning up whitespace and formatting issues

## Prompt

Highlight the violating code and use Copilot Chat:

```
Fix PHPCS: [VIOLATION_DESCRIPTION]
```

Or place cursor on the line and type a comment:

```php
// Fix: add space after opening parenthesis
```

## Customization

| Variable | Description |
|----------|-------------|
| `[VIOLATION_DESCRIPTION]` | The PHPCS error message or description |

## Common Violations

### Spacing Issues

```
Fix PHPCS: add space after opening parenthesis
```

Before:
```php
if($condition) {
```

After:
```php
if ( $condition ) {
```

### Yoda Conditions

```
Fix PHPCS: use Yoda condition
```

Before:
```php
if ( $type === 'like' ) {
```

After:
```php
if ( 'like' === $type ) {
```

### Array Syntax

```
Fix PHPCS: use short array syntax
```

Before:
```php
$items = array( 'one', 'two' );
```

After:
```php
$items = [ 'one', 'two' ];
```

### Operator Spacing

```
Fix PHPCS: add spaces around concatenation operator
```

Before:
```php
$message = 'Hello '.$name;
```

After:
```php
$message = 'Hello ' . $name;
```

## Batch Fixing

For multiple violations of the same type:

```
Fix all "Missing space after opening parenthesis" violations in this function
```

## Verification

After fixing, run PHPCS:

```bash
./vendor/bin/phpcs --standard=WordPress path/to/file.php
```

Or for specific sniff:

```bash
./vendor/bin/phpcs --sniffs=WordPress.WhiteSpace.ControlStructureSpacing path/to/file.php
```

## Tips

### Use PHPCBF First

Many violations can be auto-fixed:

```bash
./vendor/bin/phpcbf --standard=WordPress path/to/file.php
```

Use Copilot for violations PHPCBF can't fix automatically.

### Fix by Category

Group similar violations:
1. Run PHPCS to get full report
2. Fix all spacing issues
3. Fix all Yoda conditions
4. Fix remaining issues

### IDE Integration

Most IDEs show PHPCS violations inline. Fix them as you see them rather than batching.

## Related

- [T1 Guide](../../../workflows/tiered-agents/tier-1-routine.md)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
