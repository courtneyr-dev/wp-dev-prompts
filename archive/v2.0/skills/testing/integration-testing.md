# Integration Testing for WordPress

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Tests that run against real WordPress installation

<skill>
<summary>
Writing integration tests that verify WordPress interactions using the WordPress test suite.
</summary>

<knowledge>
## What Are Integration Tests?

Integration tests verify code works with real WordPress:
- **Real database** - Uses test database
- **Real WordPress** - Full WordPress loaded
- **Hook execution** - Actual hooks fire
- **Slower** - Database operations take time

## Setup

**Install WordPress test suite:**
```bash
bash bin/install-wp-tests.sh wordpress_test root password localhost latest
```

**Bootstrap (tests/bootstrap.php):**
```php
<?php
$_tests_dir = getenv( 'WP_TESTS_DIR' ) ?: '/tmp/wordpress-tests-lib';

require_once $_tests_dir . '/includes/functions.php';

tests_add_filter( 'muplugins_loaded', function() {
    require dirname( __DIR__ ) . '/my-plugin.php';
} );

require $_tests_dir . '/includes/bootstrap.php';
```

**phpunit.xml:**
```xml
<testsuite name="integration">
    <directory>tests/integration</directory>
</testsuite>
```

## Writing Integration Tests

**Test Class Structure:**
```php
<?php
namespace MyPlugin\Tests\Integration;

class SettingsTest extends \WP_UnitTestCase {

    public function set_up(): void {
        parent::set_up();
        // Runs before each test
    }

    public function tear_down(): void {
        // Runs after each test
        parent::tear_down();
    }

    public function test_option_is_saved() {
        update_option( 'my_option', 'test_value' );

        $this->assertEquals( 'test_value', get_option( 'my_option' ) );
    }
}
```

## Testing Posts and Content

**Create test posts:**
```php
public function test_custom_post_type_query() {
    // Create test posts
    $post_id = $this->factory()->post->create( [
        'post_type'  => 'my_cpt',
        'post_title' => 'Test Post',
    ] );

    // Query posts
    $query = new \WP_Query( [ 'post_type' => 'my_cpt' ] );

    $this->assertEquals( 1, $query->found_posts );
    $this->assertEquals( 'Test Post', $query->posts[0]->post_title );
}
```

**Create multiple posts:**
```php
$post_ids = $this->factory()->post->create_many( 5, [
    'post_type' => 'my_cpt',
] );
```

## Testing Users

**Create test users:**
```php
public function test_capability_check() {
    $admin_id = $this->factory()->user->create( [
        'role' => 'administrator',
    ] );

    wp_set_current_user( $admin_id );

    $this->assertTrue( current_user_can( 'manage_options' ) );
}
```

## Testing Hooks

**Verify hook is registered:**
```php
public function test_init_hook_is_registered() {
    $this->assertNotFalse(
        has_action( 'init', [ $this->instance, 'register_post_type' ] )
    );
}
```

**Verify filter modifies output:**
```php
public function test_content_filter_adds_wrapper() {
    $result = apply_filters( 'the_content', 'Test content' );

    $this->assertStringContainsString( '<div class="wrapper">', $result );
}
```

## Testing Database Operations

**Test custom table operations:**
```php
public function test_custom_table_insert() {
    global $wpdb;

    $table = $wpdb->prefix . 'my_table';

    $wpdb->insert( $table, [
        'name'  => 'Test',
        'value' => 'Data',
    ] );

    $result = $wpdb->get_var( "SELECT name FROM $table WHERE value = 'Data'" );

    $this->assertEquals( 'Test', $result );
}
```

## Testing AJAX Handlers

```php
public function test_ajax_handler_returns_success() {
    // Set up user
    $user_id = $this->factory()->user->create( [ 'role' => 'administrator' ] );
    wp_set_current_user( $user_id );

    // Set up request
    $_POST['action'] = 'my_ajax_action';
    $_POST['nonce'] = wp_create_nonce( 'my_nonce' );
    $_POST['data'] = 'test';

    // Capture output
    try {
        $this->_handleAjax( 'my_ajax_action' );
    } catch ( \WPAjaxDieContinueException $e ) {
        // Expected
    }

    $response = json_decode( $this->_last_response );

    $this->assertTrue( $response->success );
}
```

## Testing REST API

```php
public function test_rest_endpoint_returns_data() {
    $request = new \WP_REST_Request( 'GET', '/my-plugin/v1/items' );

    $response = rest_do_request( $request );

    $this->assertEquals( 200, $response->get_status() );
    $this->assertIsArray( $response->get_data() );
}
```

## What to Integration Test

**Good candidates:**
- Custom post types and taxonomies
- Meta box save/load operations
- Settings page functionality
- Hook interactions
- Database operations
- REST API endpoints
- AJAX handlers
</knowledge>

<best_practices>
- Use factory methods for test data
- Clean up in tear_down() when needed
- Test actual WordPress behavior
- Don't mock WordPress in integration tests
- Group related assertions
- Use setUp for repeated setup code
</best_practices>

<commands>
```bash
# Run integration tests only
./vendor/bin/phpunit --testsuite=integration

# Run with verbose output
./vendor/bin/phpunit --testsuite=integration --verbose

# Run specific test class
./vendor/bin/phpunit tests/integration/SettingsTest.php
```
</commands>
</skill>
