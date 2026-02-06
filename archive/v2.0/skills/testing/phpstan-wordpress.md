# PHPStan for WordPress

> **Type**: Skill
> **Domain**: Testing
> **Source**: wp-dev-prompts TESTING-AUTOMATION-PROMPTS.md

<skill>
<summary>
Configuring PHPStan for static analysis of WordPress plugins and themes.
</summary>

<knowledge>
## Setup

**Install Dependencies:**
```bash
composer require --dev phpstan/phpstan
composer require --dev szepeviktor/phpstan-wordpress
```

## phpstan.neon Configuration

```neon
includes:
    - vendor/szepeviktor/phpstan-wordpress/extension.neon

parameters:
    level: 5
    paths:
        - my-plugin.php
        - includes/
        - src/
    excludePaths:
        - vendor/
        - node_modules/
        - build/
        - tests/

    # WordPress compatibility
    checkMissingIterableValueType: false
    reportUnmatchedIgnoredErrors: true

    # Parallel processing
    parallel:
        maximumNumberOfProcesses: 8
```

## PHPStan Levels

| Level | Checks |
|-------|--------|
| 0 | Basic checks, unknown classes/functions |
| 1 | Possibly undefined variables |
| 2 | Unknown methods on $this |
| 3 | Return types |
| 4 | Basic dead code |
| 5 | Argument types (**recommended start**) |
| 6 | Report missing typehints |
| 7 | Union types |
| 8 | No mixed type |
| 9 | Very strict |

## Running PHPStan

**Basic Commands:**
```bash
# Analyze code
./vendor/bin/phpstan analyse

# Specific paths
./vendor/bin/phpstan analyse includes/ src/

# Generate baseline (ignore existing errors)
./vendor/bin/phpstan analyse --generate-baseline

# Use baseline
./vendor/bin/phpstan analyse --baseline=phpstan-baseline.neon
```

## WordPress Stubs

**The extension provides stubs for:**
- WordPress functions
- WordPress classes
- WordPress hooks
- Global variables ($wpdb, $wp_query, etc.)

## Common Errors and Fixes

**Undefined Function:**
```php
// Error: Function my_custom_function not found
// Fix: Add to phpstan.neon
parameters:
    stubFiles:
        - stubs/my-functions.stub
```

**Return Type Mismatch:**
```php
// Error: Method should return int but returns string
function get_count(): int {
    return get_option( 'count', 0 ); // Returns mixed
}

// Fix: Cast or validate
function get_count(): int {
    return (int) get_option( 'count', 0 );
}
```

**Parameter Type Mismatch:**
```php
// Error: Parameter #1 expects int, string given
update_post_meta( $post_id, 'key', 'value' );

// Fix: Ensure $post_id is int
$post_id = (int) $post_id;
update_post_meta( $post_id, 'key', 'value' );
```

## Ignoring Errors

**Inline:**
```php
/** @phpstan-ignore-next-line */
$result = some_function_phpstan_doesnt_understand();
```

**In Configuration:**
```neon
parameters:
    ignoreErrors:
        - '#Call to an undefined method WP_Error::get_error_message\(\)#'
        -
            message: '#Access to undefined constant#'
            path: includes/legacy.php
```

## Using Baseline

**Generate Baseline for Legacy Code:**
```bash
./vendor/bin/phpstan analyse --generate-baseline
```

**phpstan-baseline.neon:**
```neon
parameters:
    ignoreErrors:
        - message: '#...'
          count: 5
          path: includes/old-class.php
```

**Include Baseline:**
```neon
includes:
    - phpstan-baseline.neon
    - vendor/szepeviktor/phpstan-wordpress/extension.neon
```
</knowledge>

<best_practices>
- Start at level 5, increase gradually
- Use WordPress extension for proper stubs
- Generate baseline for legacy code
- Fix errors incrementally
- Target level 8-9 for new code
</best_practices>

<references>
- [PHPStan WordPress](https://github.com/szepeviktor/phpstan-wordpress)
- [PHPStan Documentation](https://phpstan.org/user-guide/getting-started)
</references>
</skill>
