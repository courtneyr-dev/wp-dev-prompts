# Unit Testing for WordPress

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Isolated unit tests with mocked WordPress functions

<skill>
<summary>
Writing isolated unit tests for WordPress plugins/themes using PHPUnit and WP_Mock.
</summary>

<knowledge>
## What Are Unit Tests?

Unit tests verify individual functions/methods in isolation:
- **No database** - Mock all database calls
- **No WordPress** - Mock WordPress functions
- **Fast execution** - Milliseconds per test
- **Single responsibility** - Test one thing per test

## Setup with WP_Mock

**Install:**
```bash
composer require --dev 10up/wp_mock
```

**Bootstrap (tests/bootstrap-unit.php):**
```php
<?php
require_once dirname( __DIR__ ) . '/vendor/autoload.php';

WP_Mock::bootstrap();
```

**phpunit.xml:**
```xml
<testsuite name="unit">
    <directory>tests/unit</directory>
</testsuite>
```

## Writing Unit Tests

**Test Class Structure:**
```php
<?php
namespace MyPlugin\Tests\Unit;

use WP_Mock;
use WP_Mock\Tools\TestCase;

class MyClassTest extends TestCase {

    public function set_up(): void {
        parent::set_up();
        // Setup code
    }

    public function tear_down(): void {
        // Cleanup
        parent::tear_down();
    }

    public function test_method_returns_expected_value() {
        // Arrange
        $instance = new MyClass();

        // Act
        $result = $instance->my_method( 'input' );

        // Assert
        $this->assertEquals( 'expected', $result );
    }
}
```

## Mocking WordPress Functions

**Mock function calls:**
```php
WP_Mock::userFunction( 'get_option' )
    ->once()
    ->with( 'my_option' )
    ->andReturn( 'my_value' );
```

**Mock function with any args:**
```php
WP_Mock::userFunction( 'esc_html' )
    ->andReturnArg( 0 ); // Return first argument
```

**Mock to return different values:**
```php
WP_Mock::userFunction( 'get_post' )
    ->andReturnUsing( function( $id ) {
        return (object) [ 'ID' => $id, 'post_title' => 'Test' ];
    } );
```

## Mocking Hooks

**Expect action to be added:**
```php
WP_Mock::expectActionAdded( 'init', [ $instance, 'init_callback' ] );
```

**Expect filter to be added:**
```php
WP_Mock::expectFilterAdded( 'the_content', [ $instance, 'filter_content' ] );
```

**Assert hooks were registered:**
```php
$instance->register_hooks();
$this->assertHooksAdded();
```

## Test Patterns

**Testing return values:**
```php
public function test_format_price_adds_currency() {
    $result = format_price( 99.99 );
    $this->assertEquals( '$99.99', $result );
}
```

**Testing exceptions:**
```php
public function test_throws_on_invalid_input() {
    $this->expectException( \InvalidArgumentException::class );
    $this->expectExceptionMessage( 'Invalid ID' );

    process_item( -1 );
}
```

**Testing with data providers:**
```php
/**
 * @dataProvider price_provider
 */
public function test_format_price( $input, $expected ) {
    $this->assertEquals( $expected, format_price( $input ) );
}

public function price_provider(): array {
    return [
        [ 99.99, '$99.99' ],
        [ 0, '$0.00' ],
        [ 1000, '$1,000.00' ],
    ];
}
```

## What to Unit Test

**Good candidates:**
- Utility functions (formatting, calculations)
- Data transformation logic
- Validation functions
- Business logic with clear inputs/outputs

**Not for unit tests:**
- Database operations (use integration tests)
- Hook execution order (use integration tests)
- Full request/response cycles (use E2E tests)
</knowledge>

<best_practices>
- One assertion focus per test
- Use descriptive test names: test_method_condition_expectation
- Arrange-Act-Assert pattern
- Mock external dependencies
- Keep tests fast (<100ms each)
- Don't test WordPress core functions
</best_practices>

<commands>
```bash
# Run unit tests only
./vendor/bin/phpunit --testsuite=unit

# Run with coverage
./vendor/bin/phpunit --testsuite=unit --coverage-html coverage/

# Run specific test
./vendor/bin/phpunit --filter=test_format_price
```
</commands>
</skill>
