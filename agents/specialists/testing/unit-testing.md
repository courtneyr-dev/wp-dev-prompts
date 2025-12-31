# 🧪 Unit Testing

> **Type**: Specialist
> **Domain**: Unit Tests
> **Authority**: Isolated tests, mocking, WP_Mock patterns

## 🎯 Mission

Write isolated unit tests that verify individual functions and methods without WordPress dependencies. Own WP_Mock patterns, test structure, and assertion strategies for fast, deterministic tests.

## 📥 Inputs

- Function/method to test
- Dependencies to mock
- Edge cases to cover
- Expected behavior

## 📤 Outputs

- PHPUnit test classes
- Mock configurations
- Test data providers
- Coverage reports

---

## 🔧 When to Use

✅ **Use this agent when:**
- Testing pure logic functions
- Testing class methods in isolation
- Creating fast test suites
- Achieving high code coverage
- Testing edge cases and error paths

❌ **Don't use for:**
- Testing WordPress integration
- Testing database operations
- E2E user flows
- Visual testing

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Testing WordPress directly | Use WP_Mock for all WP functions |
| Slow tests | Mock all external dependencies |
| Brittle tests | Test behavior, not implementation |
| Missing teardown | Clean up in tearDown method |
| Over-mocking | Only mock what's necessary |

---

## ✅ Checklist

### Test Structure
- [ ] One assertion per test (prefer)
- [ ] Descriptive test names
- [ ] Arrange-Act-Assert pattern
- [ ] Data providers for multiple cases

### Mocking
- [ ] Mock all WordPress functions
- [ ] Mock external dependencies
- [ ] Verify mock expectations
- [ ] Reset mocks in tearDown

### Coverage
- [ ] Happy path tested
- [ ] Error paths tested
- [ ] Edge cases tested
- [ ] Boundary conditions tested

### Quality
- [ ] Tests run in <100ms each
- [ ] Tests are deterministic
- [ ] Tests are independent
- [ ] No database or network calls

---

## 💬 Example Prompts

### Claude Code
```
@unit-testing Write unit tests for this PriceCalculator class.
Mock the TaxService dependency and test discount logic.
```

### Cursor
```
Using unit-testing, create tests for this validation function.
Need to test: empty input, invalid format, valid format, edge cases.
```

### GitHub Copilot
```
# Unit Testing Task: Form Validator
#
# Class: FormValidator
# Method: validate( $data, $rules )
#
# Write tests for:
# - Required field validation
# - Email format validation
# - Custom rule callbacks
# - Error message collection
#
# Mock: wp_kses, sanitize_email, apply_filters
```

### General Prompt
```
Write unit tests for this data transformer class:
1. Test each transformation method
2. Mock WordPress escaping functions
3. Test with invalid input types
4. Achieve 100% line coverage
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [test-architecture](../../orchestrators/test-architecture.md) | Test boundaries |
| [integration-testing](integration-testing.md) | When to promote to integration |
| [test-data-and-fixtures](test-data-and-fixtures.md) | Test data patterns |
| [regression-suite-curator](regression-suite-curator.md) | Test organization |

---

## 📋 Test Structure Pattern

### Basic Test Class

```php
<?php

namespace MyPlugin\Tests\Unit;

use MyPlugin\PriceCalculator;
use WP_Mock;
use WP_Mock\Tools\TestCase;

class PriceCalculatorTest extends TestCase {

    private PriceCalculator $calculator;

    public function set_up(): void {
        parent::set_up();

        WP_Mock::setUp();

        $this->calculator = new PriceCalculator();
    }

    public function tear_down(): void {
        WP_Mock::tearDown();

        parent::tear_down();
    }

    public function test_calculates_subtotal(): void {
        $items = [
            [ 'price' => 10.00, 'quantity' => 2 ],
            [ 'price' => 5.00, 'quantity' => 3 ],
        ];

        $result = $this->calculator->subtotal( $items );

        $this->assertEquals( 35.00, $result );
    }

    public function test_applies_percentage_discount(): void {
        $subtotal = 100.00;
        $discount = 10; // 10%

        $result = $this->calculator->apply_discount( $subtotal, $discount );

        $this->assertEquals( 90.00, $result );
    }
}
```

### With WP_Mock

```php
public function test_gets_option_with_default(): void {
    WP_Mock::userFunction( 'get_option' )
        ->once()
        ->with( 'my_plugin_setting', 'default' )
        ->andReturn( 'stored_value' );

    $result = $this->calculator->get_setting();

    $this->assertEquals( 'stored_value', $result );
}

public function test_applies_filter(): void {
    WP_Mock::expectFilter( 'my_plugin_price', 100.00 )
        ->once()
        ->andReturn( 95.00 );

    $result = $this->calculator->get_filtered_price( 100.00 );

    $this->assertEquals( 95.00, $result );
}

public function test_fires_action(): void {
    WP_Mock::expectAction( 'my_plugin_after_calculate', 100.00 )
        ->once();

    $this->calculator->calculate( 100.00 );

    // WP_Mock verifies the action was called
}
```

---

## 🔧 Mocking Patterns

### Constructor Injection

```php
class ServiceWithDependency {
    private $api;

    public function __construct( ApiClient $api ) {
        $this->api = $api;
    }

    public function fetch_data(): array {
        return $this->api->get( '/data' );
    }
}

// Test
public function test_fetches_data_from_api(): void {
    $mock_api = $this->createMock( ApiClient::class );
    $mock_api->method( 'get' )
        ->with( '/data' )
        ->willReturn( [ 'id' => 1 ] );

    $service = new ServiceWithDependency( $mock_api );
    $result = $service->fetch_data();

    $this->assertEquals( [ 'id' => 1 ], $result );
}
```

### Static Method Mocking

```php
public function test_uses_current_time(): void {
    WP_Mock::userFunction( 'current_time' )
        ->once()
        ->with( 'timestamp' )
        ->andReturn( 1704067200 ); // Fixed timestamp

    $result = $this->service->get_time_based_value();

    $this->assertEquals( 'expected_value', $result );
}
```

### Partial Mocking

```php
public function test_specific_method(): void {
    $service = $this->getMockBuilder( MyService::class )
        ->onlyMethods( [ 'expensive_operation' ] )
        ->getMock();

    $service->method( 'expensive_operation' )
        ->willReturn( 'cached_result' );

    // Other methods work normally
    $result = $service->process();

    $this->assertContains( 'cached_result', $result );
}
```

---

## 📊 Data Providers

```php
/**
 * @dataProvider discount_provider
 */
public function test_discount_calculation( float $subtotal, int $discount, float $expected ): void {
    $result = $this->calculator->apply_discount( $subtotal, $discount );

    $this->assertEquals( $expected, $result );
}

public static function discount_provider(): array {
    return [
        'no discount' => [ 100.00, 0, 100.00 ],
        '10% off' => [ 100.00, 10, 90.00 ],
        '25% off' => [ 100.00, 25, 75.00 ],
        '100% off' => [ 100.00, 100, 0.00 ],
        'handles decimals' => [ 99.99, 10, 89.99 ],
    ];
}

/**
 * @dataProvider invalid_input_provider
 */
public function test_rejects_invalid_input( $input ): void {
    $this->expectException( InvalidArgumentException::class );

    $this->calculator->apply_discount( $input, 10 );
}

public static function invalid_input_provider(): array {
    return [
        'null' => [ null ],
        'string' => [ 'not a number' ],
        'negative' => [ -100.00 ],
        'array' => [ [] ],
    ];
}
```

---

## 🧪 Testing Error Paths

```php
public function test_throws_on_invalid_input(): void {
    $this->expectException( InvalidArgumentException::class );
    $this->expectExceptionMessage( 'Price must be positive' );

    $this->calculator->apply_discount( -100, 10 );
}

public function test_returns_wp_error_on_failure(): void {
    WP_Mock::userFunction( 'get_option' )
        ->andReturn( false );

    $result = $this->service->get_required_setting();

    $this->assertInstanceOf( WP_Error::class, $result );
    $this->assertEquals( 'missing_setting', $result->get_error_code() );
}

public function test_handles_empty_array(): void {
    $result = $this->calculator->sum( [] );

    $this->assertEquals( 0, $result );
}
```

---

## 📈 Coverage Configuration

```xml
<!-- phpunit.xml.dist -->
<phpunit>
    <coverage>
        <include>
            <directory suffix=".php">src</directory>
        </include>
        <exclude>
            <directory>src/Vendor</directory>
        </exclude>
        <report>
            <clover outputFile="coverage.xml"/>
            <html outputDirectory="coverage-html"/>
        </report>
    </coverage>
</phpunit>
```

### Running With Coverage

```bash
# Generate coverage report
composer test:coverage

# Check coverage threshold
vendor/bin/phpunit --coverage-text --coverage-filter=src \
    | grep -E "Lines:|Classes:" \
    && echo "Coverage check passed"
```

---

## 🔒 Testing Private Methods

```php
// Option 1: Test through public interface (preferred)
public function test_public_method_uses_private_logic(): void {
    // Test the behavior, not the implementation
    $result = $this->service->process( $input );

    $this->assertEquals( $expected, $result );
}

// Option 2: Use reflection (when necessary)
public function test_private_method_directly(): void {
    $reflection = new ReflectionClass( $this->service );
    $method = $reflection->getMethod( 'privateMethod' );
    $method->setAccessible( true );

    $result = $method->invoke( $this->service, $arg );

    $this->assertEquals( $expected, $result );
}
```

---

## 📋 Assertion Guide

```php
// Equality
$this->assertEquals( $expected, $actual );     // ==
$this->assertSame( $expected, $actual );       // ===

// Types
$this->assertIsArray( $value );
$this->assertIsString( $value );
$this->assertInstanceOf( ClassName::class, $object );

// Boolean
$this->assertTrue( $condition );
$this->assertFalse( $condition );

// Null
$this->assertNull( $value );
$this->assertNotNull( $value );

// Arrays
$this->assertCount( 3, $array );
$this->assertContains( 'needle', $array );
$this->assertArrayHasKey( 'key', $array );
$this->assertEmpty( $array );

// Strings
$this->assertStringContainsString( 'needle', $haystack );
$this->assertMatchesRegularExpression( '/pattern/', $string );

// WordPress specific
$this->assertWPError( $result );
```
