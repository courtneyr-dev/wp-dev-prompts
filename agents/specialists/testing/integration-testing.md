# 🔗 Integration Testing

> **Type**: Specialist
> **Domain**: Integration Tests
> **Authority**: WP_UnitTestCase, real WordPress tests, database testing

## 🎯 Mission

Write integration tests that verify components work together with real WordPress. Own WP_UnitTestCase patterns, database isolation, and factory usage for thorough integration testing.

## 📥 Inputs

- Components to test together
- WordPress integration points
- Database operations
- Hook interactions

## 📤 Outputs

- Integration test classes
- Factory usage patterns
- Database test fixtures
- Hook verification

---

## 🔧 When to Use

✅ **Use this agent when:**
- Testing WordPress hook integration
- Testing database operations
- Testing REST API endpoints
- Testing component interactions
- Verifying WordPress filters work

❌ **Don't use for:**
- Pure logic testing (use unit-testing)
- Browser testing (use e2e-playwright)
- Visual testing (use visual-regression)
- Performance testing

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Tests affect each other | Use transaction rollback |
| Slow test suite | Minimize database operations |
| Missing cleanup | Use tear_down properly |
| Hard-coded IDs | Use factories for entities |
| Plugin load order issues | Set up dependencies in bootstrap |

---

## ✅ Checklist

### Test Setup
- [ ] Extend WP_UnitTestCase
- [ ] Use factories for posts, users, terms
- [ ] Verify database isolation
- [ ] Set up required plugins/themes

### Hook Testing
- [ ] Test actions fire correctly
- [ ] Test filters modify data
- [ ] Test hook priority
- [ ] Test hook removal

### Database Testing
- [ ] Test CRUD operations
- [ ] Test queries return expected data
- [ ] Test multisite table prefixes
- [ ] Transaction rollback working

### Quality
- [ ] Tests run in <5s each
- [ ] Tests are isolated
- [ ] No external service calls
- [ ] Clear failure messages

---

## 💬 Example Prompts

### Claude Code
```
@integration-testing Write integration tests for this custom post type
registration. Test that posts can be created, queried, and the
REST API returns them correctly.
```

### Cursor
```
Using integration-testing, create tests for this REST endpoint that
creates and updates user meta. Need to test authentication,
validation, and data persistence.
```

### GitHub Copilot
```
# Integration Testing Task: Hook Integration
#
# Plugin hooks into: save_post, the_content, wp_enqueue_scripts
#
# Write tests verifying:
# - save_post callback stores meta correctly
# - the_content filter modifies output
# - Scripts are enqueued on correct pages
```

### General Prompt
```
Write integration tests for this settings page:
1. Test options are saved correctly
2. Test capability checks work
3. Test settings API integration
4. Test admin notices display
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [test-architecture](../../orchestrators/test-architecture.md) | Test boundaries |
| [unit-testing](unit-testing.md) | When to use unit instead |
| [e2e-playwright](e2e-playwright.md) | When to promote to E2E |
| [test-data-and-fixtures](test-data-and-fixtures.md) | Factory patterns |

---

## 📋 Test Structure Pattern

### Basic Integration Test

```php
<?php

namespace MyPlugin\Tests\Integration;

use WP_UnitTestCase;

class PostHandlerTest extends WP_UnitTestCase {

    private $handler;

    public function set_up(): void {
        parent::set_up();

        // Create instance of class under test
        $this->handler = new \MyPlugin\PostHandler();
    }

    public function tear_down(): void {
        // Cleanup runs after each test
        parent::tear_down();
    }

    public function test_creates_post_with_meta(): void {
        $post_id = $this->handler->create_post( [
            'title' => 'Test Post',
            'content' => 'Test content',
            'meta' => [ 'custom_field' => 'value' ],
        ] );

        $this->assertIsInt( $post_id );
        $this->assertEquals( 'Test Post', get_the_title( $post_id ) );
        $this->assertEquals( 'value', get_post_meta( $post_id, 'custom_field', true ) );
    }
}
```

### Using Factories

```php
public function test_queries_published_posts(): void {
    // Create test posts using factory
    $published = $this->factory->post->create( [
        'post_status' => 'publish',
        'post_type' => 'my_custom_type',
    ] );

    $draft = $this->factory->post->create( [
        'post_status' => 'draft',
        'post_type' => 'my_custom_type',
    ] );

    $results = $this->handler->get_published_posts();

    $this->assertCount( 1, $results );
    $this->assertEquals( $published, $results[0]->ID );
}

public function test_user_permissions(): void {
    // Create user with specific role
    $editor = $this->factory->user->create( [ 'role' => 'editor' ] );
    $subscriber = $this->factory->user->create( [ 'role' => 'subscriber' ] );

    // Test as editor
    wp_set_current_user( $editor );
    $this->assertTrue( $this->handler->can_edit() );

    // Test as subscriber
    wp_set_current_user( $subscriber );
    $this->assertFalse( $this->handler->can_edit() );
}
```

---

## 🔧 Hook Testing

### Action Testing

```php
public function test_action_fires_on_save(): void {
    $fired = false;
    $received_data = null;

    add_action( 'my_plugin_after_save', function( $data ) use ( &$fired, &$received_data ) {
        $fired = true;
        $received_data = $data;
    } );

    $this->handler->save( [ 'id' => 1, 'name' => 'Test' ] );

    $this->assertTrue( $fired, 'Action should have fired' );
    $this->assertEquals( 'Test', $received_data['name'] );
}

public function test_action_receives_correct_parameters(): void {
    $callback = $this->getMockBuilder( stdClass::class )
        ->addMethods( [ 'handle' ] )
        ->getMock();

    $callback->expects( $this->once() )
        ->method( 'handle' )
        ->with(
            $this->isType( 'int' ),
            $this->isInstanceOf( WP_Post::class )
        );

    add_action( 'my_plugin_post_saved', [ $callback, 'handle' ], 10, 2 );

    $post_id = $this->factory->post->create();
    do_action( 'save_post', $post_id, get_post( $post_id ), true );
}
```

### Filter Testing

```php
public function test_filter_modifies_content(): void {
    $post_id = $this->factory->post->create( [
        'post_content' => 'Original content',
    ] );

    // Go to post to set up query
    $this->go_to( get_permalink( $post_id ) );

    // Apply the_content filter
    $content = apply_filters( 'the_content', 'Original content' );

    $this->assertStringContainsString(
        'Modified by plugin',
        $content
    );
}

public function test_filter_can_be_disabled(): void {
    // Remove the filter
    remove_filter( 'the_content', [ $this->handler, 'modify_content' ] );

    $content = apply_filters( 'the_content', 'Original content' );

    $this->assertStringNotContainsString( 'Modified by plugin', $content );
}
```

---

## 🗄️ Database Testing

### Custom Table Testing

```php
public function test_creates_table_on_activation(): void {
    global $wpdb;

    // Run activation
    \MyPlugin\Installer::activate();

    // Verify table exists
    $table_name = $wpdb->prefix . 'my_plugin_data';
    $table_exists = $wpdb->get_var(
        $wpdb->prepare(
            "SHOW TABLES LIKE %s",
            $table_name
        )
    );

    $this->assertEquals( $table_name, $table_exists );
}

public function test_inserts_and_retrieves_data(): void {
    global $wpdb;
    $table = $wpdb->prefix . 'my_plugin_data';

    // Insert
    $wpdb->insert( $table, [
        'name' => 'Test Item',
        'value' => 100,
    ] );

    $id = $wpdb->insert_id;

    // Retrieve
    $row = $wpdb->get_row(
        $wpdb->prepare( "SELECT * FROM {$table} WHERE id = %d", $id )
    );

    $this->assertEquals( 'Test Item', $row->name );
    $this->assertEquals( 100, $row->value );
}
```

### Transaction Rollback

```php
// WP_UnitTestCase automatically handles this via:
// - Starts transaction in set_up()
// - Rolls back in tear_down()

public function test_data_isolation(): void {
    // This insert will be rolled back after the test
    $this->factory->post->create( [ 'post_title' => 'Test Post' ] );

    $posts = get_posts( [ 'title' => 'Test Post' ] );
    $this->assertCount( 1, $posts );
}

// Next test starts with clean database
public function test_starts_clean(): void {
    $posts = get_posts( [ 'title' => 'Test Post' ] );
    $this->assertCount( 0, $posts );
}
```

---

## 🌐 REST API Testing

```php
class REST_API_Test extends WP_UnitTestCase {

    private $server;

    public function set_up(): void {
        parent::set_up();

        // Set up REST server
        global $wp_rest_server;
        $this->server = $wp_rest_server = new \WP_REST_Server();
        do_action( 'rest_api_init' );
    }

    public function test_get_items_returns_data(): void {
        // Create test data
        $this->factory->post->create_many( 3, [
            'post_type' => 'my_custom_type',
            'post_status' => 'publish',
        ] );

        // Make request
        $request = new \WP_REST_Request( 'GET', '/my-plugin/v1/items' );
        $response = $this->server->dispatch( $request );

        $this->assertEquals( 200, $response->get_status() );
        $this->assertCount( 3, $response->get_data() );
    }

    public function test_create_item_requires_auth(): void {
        $request = new \WP_REST_Request( 'POST', '/my-plugin/v1/items' );
        $request->set_body_params( [ 'name' => 'Test' ] );

        $response = $this->server->dispatch( $request );

        $this->assertEquals( 401, $response->get_status() );
    }

    public function test_create_item_with_auth(): void {
        // Create and set admin user
        $admin = $this->factory->user->create( [ 'role' => 'administrator' ] );
        wp_set_current_user( $admin );

        $request = new \WP_REST_Request( 'POST', '/my-plugin/v1/items' );
        $request->set_body_params( [ 'name' => 'Test' ] );

        $response = $this->server->dispatch( $request );

        $this->assertEquals( 201, $response->get_status() );
    }

    public function test_validates_input(): void {
        $admin = $this->factory->user->create( [ 'role' => 'administrator' ] );
        wp_set_current_user( $admin );

        $request = new \WP_REST_Request( 'POST', '/my-plugin/v1/items' );
        $request->set_body_params( [ 'name' => '' ] ); // Invalid

        $response = $this->server->dispatch( $request );

        $this->assertEquals( 400, $response->get_status() );
    }
}
```

---

## 🧩 Multisite Testing

```php
/**
 * @group multisite
 */
class Multisite_Test extends WP_UnitTestCase {

    public function test_data_isolated_per_site(): void {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only' );
        }

        // Create second site
        $blog_id = $this->factory->blog->create();

        // Create post on main site
        $main_post = $this->factory->post->create( [
            'post_title' => 'Main Site Post',
        ] );

        // Switch to second site
        switch_to_blog( $blog_id );

        // Post should not exist on second site
        $posts = get_posts( [ 'post_title' => 'Main Site Post' ] );
        $this->assertCount( 0, $posts );

        restore_current_blog();
    }

    public function test_network_options(): void {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only' );
        }

        update_site_option( 'my_network_option', 'network_value' );

        // Should be same across sites
        $blog_id = $this->factory->blog->create();
        switch_to_blog( $blog_id );

        $this->assertEquals(
            'network_value',
            get_site_option( 'my_network_option' )
        );

        restore_current_blog();
    }
}
```

---

## 📋 Bootstrap Configuration

```php
// tests/bootstrap.php
<?php

$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
    $_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

// Load WordPress test functions
require_once $_tests_dir . '/includes/functions.php';

/**
 * Load plugin before tests.
 */
tests_add_filter( 'muplugins_loaded', function() {
    require dirname( __DIR__ ) . '/my-plugin.php';
} );

// Load WordPress
require $_tests_dir . '/includes/bootstrap.php';

// Load test factories/helpers
require __DIR__ . '/factories/class-my-factory.php';
```
