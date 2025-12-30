# PHPUnit for WordPress

> **Type**: Skill
> **Domain**: Testing
> **Source**: wp-dev-prompts TESTING-AUTOMATION-PROMPTS.md

<skill>
<summary>
Setting up and writing PHPUnit tests for WordPress plugins and themes.
</summary>

<knowledge>
## Setup

**Install Dependencies:**
```bash
composer require --dev phpunit/phpunit yoast/phpunit-polyfills
```

**Install WordPress Test Suite:**
```bash
bash bin/install-wp-tests.sh wordpress_test root password localhost latest
```

## Test Types

**Unit Tests:**
- Test isolated classes/functions
- Use WP_Mock for WordPress function mocking
- No database required
- Fast execution

**Integration Tests:**
- Test against actual WordPress
- Extend WP_UnitTestCase
- Database operations included
- Slower but more comprehensive

## phpunit.xml Configuration

```xml
<?xml version="1.0"?>
<phpunit
    bootstrap="tests/bootstrap.php"
    colors="true"
    testdox="true"
>
    <testsuites>
        <testsuite name="unit">
            <directory>tests/unit</directory>
        </testsuite>
        <testsuite name="integration">
            <directory>tests/integration</directory>
        </testsuite>
    </testsuites>
    <coverage>
        <include>
            <directory suffix=".php">src</directory>
            <directory suffix=".php">includes</directory>
        </include>
    </coverage>
</phpunit>
```

## Bootstrap File

**tests/bootstrap.php:**
```php
<?php
// Load Composer autoloader
require_once dirname( __DIR__ ) . '/vendor/autoload.php';

// Load WordPress test suite
$_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $_tests_dir ) {
    $_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

require_once $_tests_dir . '/includes/functions.php';

// Load plugin
tests_add_filter( 'muplugins_loaded', function() {
    require dirname( __DIR__ ) . '/my-plugin.php';
} );

// Start WordPress
require $_tests_dir . '/includes/bootstrap.php';
```

## Writing Tests

**Unit Test Example:**
```php
<?php
namespace MyPlugin\Tests\Unit;

use PHPUnit\Framework\TestCase;

class HelperTest extends TestCase {
    public function test_format_price_adds_currency_symbol() {
        $result = format_price( 99.99 );
        $this->assertEquals( '$99.99', $result );
    }

    public function test_format_price_handles_zero() {
        $result = format_price( 0 );
        $this->assertEquals( '$0.00', $result );
    }
}
```

**Integration Test Example:**
```php
<?php
namespace MyPlugin\Tests\Integration;

class SettingsTest extends \WP_UnitTestCase {
    public function set_up() {
        parent::set_up();
        // Setup code
    }

    public function tear_down() {
        // Cleanup
        parent::tear_down();
    }

    public function test_default_settings_are_created_on_activation() {
        do_action( 'activate_my-plugin/my-plugin.php' );

        $option = get_option( 'my_plugin_settings' );
        $this->assertIsArray( $option );
        $this->assertArrayHasKey( 'enabled', $option );
    }

    public function test_settings_are_saved_correctly() {
        $settings = array( 'enabled' => true, 'limit' => 10 );
        update_option( 'my_plugin_settings', $settings );

        $saved = get_option( 'my_plugin_settings' );
        $this->assertEquals( $settings, $saved );
    }
}
```

## Test Naming

**Descriptive Method Names:**
```php
// Format: test_[method]_[condition]_[expectation]
public function test_save_throws_exception_when_invalid_data() {}
public function test_get_returns_null_when_not_found() {}
public function test_create_adds_item_to_database() {}
```

## Assertions

**Common Assertions:**
```php
$this->assertTrue( $value );
$this->assertFalse( $value );
$this->assertEquals( $expected, $actual );
$this->assertSame( $expected, $actual ); // Type-safe
$this->assertNull( $value );
$this->assertNotNull( $value );
$this->assertInstanceOf( MyClass::class, $object );
$this->assertCount( 3, $array );
$this->assertContains( 'item', $array );
$this->assertArrayHasKey( 'key', $array );
$this->expectException( \Exception::class );
```
</knowledge>

<best_practices>
- Separate unit and integration tests
- Use descriptive test method names
- One assertion focus per test
- Clean up in tear_down()
- Use data providers for similar tests
- Target 80%+ code coverage
</best_practices>

<references>
- [WP Test Suite](https://make.wordpress.org/cli/handbook/plugin-unit-tests/)
- [PHPUnit Documentation](https://docs.phpunit.de/)
</references>
</skill>
