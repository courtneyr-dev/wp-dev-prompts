# WordPress Multisite Testing

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Testing plugins and themes in WordPress Multisite environments

<skill>
<summary>
Comprehensive testing strategies for WordPress Multisite including network admin, site admin, and cross-site functionality.
</summary>

<knowledge>
## Multisite Test Dimensions

### Network Modes

| Mode | URL Pattern | Use Case |
|------|-------------|----------|
| Subdirectory | `example.com/site1/` | Shared domain, simpler setup |
| Subdomain | `site1.example.com` | Separate domains, requires DNS |

### Test Environments

```bash
# wp-env: Enable multisite subdirectory
npx wp-env start --xdebug
npx wp-env run cli wp core multisite-install \
    --title="Test Network" \
    --admin_user=admin \
    --admin_password=password \
    --admin_email=admin@example.com \
    --subdomains=false

# Create test sites
npx wp-env run cli wp site create --slug=site2 --title="Site 2"
npx wp-env run cli wp site create --slug=site3 --title="Site 3"
```

## PHPUnit Multisite Tests

### Bootstrap Configuration

**tests/bootstrap-multisite.php:**
```php
<?php
/**
 * Multisite test bootstrap.
 */

// Enable multisite before loading WordPress
define( 'WP_TESTS_MULTISITE', true );

// Load standard bootstrap
require_once dirname( __FILE__ ) . '/bootstrap.php';
```

**phpunit-multisite.xml.dist:**
```xml
<?xml version="1.0"?>
<phpunit
    bootstrap="tests/bootstrap-multisite.php"
    colors="true"
>
    <testsuites>
        <testsuite name="multisite">
            <directory>tests/multisite</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

### Network Admin vs Site Admin Tests

```php
<?php
/**
 * Tests for network admin functionality.
 */
class Network_Admin_Test extends WP_UnitTestCase {

    /**
     * @group multisite
     */
    public function test_super_admin_has_network_capabilities() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Create super admin
        $super_admin_id = $this->factory()->user->create( [ 'role' => 'administrator' ] );
        grant_super_admin( $super_admin_id );
        wp_set_current_user( $super_admin_id );

        // Verify network capabilities
        $this->assertTrue( current_user_can( 'manage_network' ) );
        $this->assertTrue( current_user_can( 'manage_network_plugins' ) );
        $this->assertTrue( current_user_can( 'manage_network_themes' ) );
        $this->assertTrue( current_user_can( 'manage_sites' ) );
        $this->assertTrue( is_super_admin() );
    }

    /**
     * @group multisite
     */
    public function test_site_admin_cannot_access_network_settings() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Create site admin (not super admin)
        $site_admin_id = $this->factory()->user->create( [ 'role' => 'administrator' ] );
        wp_set_current_user( $site_admin_id );

        // Verify no network capabilities
        $this->assertFalse( current_user_can( 'manage_network' ) );
        $this->assertFalse( current_user_can( 'manage_network_plugins' ) );
        $this->assertFalse( is_super_admin() );
    }

    /**
     * @group multisite
     */
    public function test_super_admin_boundaries() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Create super admin
        $super_admin_id = $this->factory()->user->create( [ 'role' => 'administrator' ] );
        grant_super_admin( $super_admin_id );

        // Create second site
        $site_id = $this->factory()->blog->create();

        // Switch to second site
        switch_to_blog( $site_id );

        wp_set_current_user( $super_admin_id );

        // Super admin can manage all sites
        $this->assertTrue( current_user_can( 'manage_options' ) );
        $this->assertTrue( current_user_can( 'edit_posts' ) );

        restore_current_blog();
    }
}
```

### Site-Scoped vs Network Options

```php
<?php
/**
 * Tests for option scoping.
 */
class Option_Scoping_Test extends WP_UnitTestCase {

    /**
     * @group multisite
     */
    public function test_site_option_is_site_specific() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Set option on main site
        update_option( 'my_plugin_setting', 'main_value' );

        // Create and switch to second site
        $site_id = $this->factory()->blog->create();
        switch_to_blog( $site_id );

        // Option should not exist on new site
        $this->assertFalse( get_option( 'my_plugin_setting' ) );

        // Set different value on second site
        update_option( 'my_plugin_setting', 'site2_value' );

        // Verify isolation
        $this->assertEquals( 'site2_value', get_option( 'my_plugin_setting' ) );

        restore_current_blog();

        // Main site still has original value
        $this->assertEquals( 'main_value', get_option( 'my_plugin_setting' ) );
    }

    /**
     * @group multisite
     */
    public function test_network_option_is_network_wide() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Set network option
        update_site_option( 'my_plugin_network_setting', 'network_value' );

        // Create and switch to second site
        $site_id = $this->factory()->blog->create();
        switch_to_blog( $site_id );

        // Network option should be accessible from any site
        $this->assertEquals( 'network_value', get_site_option( 'my_plugin_network_setting' ) );

        restore_current_blog();
    }

    /**
     * @group multisite
     */
    public function test_option_vs_site_option_confusion() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Common mistake: using get_option for network-wide setting
        update_site_option( 'network_setting', 'correct_value' );

        // This is WRONG for network settings:
        $wrong = get_option( 'network_setting' );

        // This is CORRECT:
        $correct = get_site_option( 'network_setting' );

        $this->assertNotEquals( $wrong, $correct );
        $this->assertEquals( 'correct_value', $correct );
    }
}
```

### Activation/Deactivation Tests

```php
<?php
/**
 * Tests for network activation.
 */
class Network_Activation_Test extends WP_UnitTestCase {

    /**
     * @group multisite
     */
    public function test_network_activation_runs_on_all_sites() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Create multiple sites
        $site_ids = [];
        for ( $i = 0; $i < 3; $i++ ) {
            $site_ids[] = $this->factory()->blog->create();
        }

        // Simulate network activation
        foreach ( get_sites() as $site ) {
            switch_to_blog( $site->blog_id );

            // Run activation logic
            my_plugin_activate();

            // Verify setup on each site
            $this->assertTrue(
                get_option( 'my_plugin_activated' ),
                "Plugin not activated on site {$site->blog_id}"
            );

            restore_current_blog();
        }
    }

    /**
     * @group multisite
     */
    public function test_new_site_activation_hook() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Verify hook is registered
        $this->assertNotFalse(
            has_action( 'wp_initialize_site', 'my_plugin_new_site_activation' )
        );

        // Create new site (should trigger hook)
        $site_id = $this->factory()->blog->create();

        switch_to_blog( $site_id );

        // Verify plugin was set up on new site
        $this->assertTrue( get_option( 'my_plugin_activated' ) );

        restore_current_blog();
    }

    /**
     * @group multisite
     */
    public function test_uninstall_cleans_all_sites() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Create sites and activate plugin
        $site_ids = [];
        for ( $i = 0; $i < 3; $i++ ) {
            $site_id    = $this->factory()->blog->create();
            $site_ids[] = $site_id;

            switch_to_blog( $site_id );
            update_option( 'my_plugin_data', 'test_data' );
            restore_current_blog();
        }

        // Run uninstall
        my_plugin_uninstall();

        // Verify cleanup on all sites
        foreach ( $site_ids as $site_id ) {
            switch_to_blog( $site_id );
            $this->assertFalse( get_option( 'my_plugin_data' ) );
            restore_current_blog();
        }

        // Verify network options cleaned
        $this->assertFalse( get_site_option( 'my_plugin_network_data' ) );
    }
}
```

### REST API Multisite Tests

```php
<?php
/**
 * Tests for REST API in multisite context.
 */
class REST_Multisite_Test extends WP_Test_REST_TestCase {

    /**
     * @group multisite
     */
    public function test_rest_api_respects_site_context() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Create content on main site
        $main_post_id = $this->factory()->post->create( [
            'post_title' => 'Main Site Post',
        ] );

        // Create second site with content
        $site_id      = $this->factory()->blog->create();
        switch_to_blog( $site_id );

        $site2_post_id = $this->factory()->post->create( [
            'post_title' => 'Site 2 Post',
        ] );

        restore_current_blog();

        // Request from main site should only return main site posts
        $request  = new WP_REST_Request( 'GET', '/wp/v2/posts' );
        $response = rest_do_request( $request );

        $titles = wp_list_pluck( $response->get_data(), 'title' );
        $titles = array_map( function( $t ) {
            return $t['rendered'];
        }, $titles );

        $this->assertContains( 'Main Site Post', $titles );
        $this->assertNotContains( 'Site 2 Post', $titles );
    }

    /**
     * @group multisite
     */
    public function test_network_rest_endpoint() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Create super admin
        $super_admin_id = $this->factory()->user->create( [ 'role' => 'administrator' ] );
        grant_super_admin( $super_admin_id );
        wp_set_current_user( $super_admin_id );

        // Request network-wide endpoint (custom)
        $request  = new WP_REST_Request( 'GET', '/my-plugin/v1/network/stats' );
        $response = rest_do_request( $request );

        $this->assertEquals( 200, $response->get_status() );
    }
}
```

## Playwright Multisite Tests

### Test Setup

```typescript
// tests/e2e/multisite.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Multisite Admin', () => {
    test.beforeEach(async ({ page }) => {
        // Login as super admin
        await page.goto('/wp-login.php');
        await page.fill('#user_login', 'admin');
        await page.fill('#user_pass', 'password');
        await page.click('#wp-submit');
    });

    test('can access network admin', async ({ page }) => {
        await page.goto('/wp-admin/network/');

        await expect(page.locator('#wpadminbar .network-admin')).toBeVisible();
        await expect(page.locator('h1')).toContainText('Network Admin');
    });

    test('can switch between sites', async ({ page }) => {
        await page.goto('/wp-admin/');

        // Open My Sites menu
        await page.hover('#wp-admin-bar-my-sites');

        // Should see multiple sites
        await expect(page.locator('#wp-admin-bar-my-sites-list li')).toHaveCount(
            await page.locator('#wp-admin-bar-my-sites-list li').count()
        );

        // Click second site
        await page.click('#wp-admin-bar-my-sites-list li:nth-child(2) a');

        // Verify switched
        const url = page.url();
        expect(url).not.toBe('/wp-admin/');
    });

    test('network settings are separate from site settings', async ({ page }) => {
        // Go to network settings
        await page.goto('/wp-admin/network/settings.php');

        await expect(page.locator('h1')).toContainText('Network Settings');

        // Go to site settings
        await page.goto('/wp-admin/options-general.php');

        await expect(page.locator('h1')).toContainText('General Settings');
    });
});
```

### Site Admin vs Network Admin

```typescript
test.describe('Permission Boundaries', () => {
    test('site admin cannot access network admin', async ({ page }) => {
        // Login as site admin (not super admin)
        await page.goto('/wp-login.php');
        await page.fill('#user_login', 'siteadmin');
        await page.fill('#user_pass', 'password');
        await page.click('#wp-submit');

        // Try to access network admin
        await page.goto('/wp-admin/network/');

        // Should be denied or redirected
        await expect(page.locator('body')).not.toContainText('Network Admin');
    });

    test('super admin can manage all sites', async ({ page }) => {
        // Login as super admin
        await page.goto('/wp-login.php');
        await page.fill('#user_login', 'admin');
        await page.fill('#user_pass', 'password');
        await page.click('#wp-submit');

        // Navigate to Sites management
        await page.goto('/wp-admin/network/sites.php');

        // Should see all sites
        const siteCount = await page.locator('table.sites tbody tr').count();
        expect(siteCount).toBeGreaterThanOrEqual(2);
    });
});
```

## Lint Checks for Multisite Anti-Patterns

### PHPCS Custom Sniffs

```xml
<!-- phpcs.xml.dist multisite rules -->
<rule ref="WordPress.WP.GlobalVariablesOverride"/>

<!-- Custom multisite checks -->
<rule ref="MyPlugin.Multisite.OptionUsage"/>
<rule ref="MyPlugin.Multisite.TablePrefix"/>
<rule ref="MyPlugin.Multisite.HardcodedBlogId"/>
<rule ref="MyPlugin.Multisite.HardcodedUrls"/>
```

### Common Anti-Patterns

```php
<?php
/**
 * ANTI-PATTERNS TO DETECT
 */

// ❌ WRONG: Hardcoded blog_id
$posts = get_posts( [ 'blog_id' => 1 ] ); // Assumes main site

// ✅ CORRECT: Use current context or parameter
$posts = get_posts(); // Uses current site
// Or
$posts = get_posts( [ 'blog_id' => get_current_blog_id() ] );

// ❌ WRONG: Hardcoded table name
$wpdb->query( "SELECT * FROM wp_posts" );

// ✅ CORRECT: Use prefixes
$wpdb->query( "SELECT * FROM {$wpdb->posts}" );
// For cross-site:
$wpdb->query( $wpdb->prepare(
    "SELECT * FROM {$wpdb->base_prefix}2_posts WHERE ID = %d",
    $id
) );

// ❌ WRONG: Using get_option for network setting
$network_setting = get_option( 'network_wide_setting' );

// ✅ CORRECT: Use get_site_option
$network_setting = get_site_option( 'network_wide_setting' );

// ❌ WRONG: Hardcoded site URL
$url = 'https://example.com/wp-admin/';

// ✅ CORRECT: Use functions
$url = admin_url();
// Or for network admin:
$url = network_admin_url();

// ❌ WRONG: Assuming single site in switch_to_blog
switch_to_blog( 1 ); // Always main site

// ✅ CORRECT: Use get_main_site_id() or parameter
switch_to_blog( get_main_site_id() );
```

## CI Configuration

### GitHub Actions Multisite Job

```yaml
name: Multisite Tests

on: [push, pull_request]

jobs:
  multisite:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        mode: [subdirectory, subdomain]

    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: Setup WordPress Multisite
        run: |
          npx wp-env start
          npx wp-env run cli wp core multisite-install \
            --title="Test Network" \
            --admin_user=admin \
            --admin_password=password \
            --admin_email=admin@test.com \
            ${{ matrix.mode == 'subdomain' && '--subdomains' || '' }}

      - name: Create test sites
        run: |
          npx wp-env run cli wp site create --slug=site2 --title="Site 2"
          npx wp-env run cli wp site create --slug=site3 --title="Site 3"

      - name: Run multisite unit tests
        run: ./vendor/bin/phpunit -c phpunit-multisite.xml.dist

      - name: Run multisite E2E tests
        run: npx playwright test tests/e2e/multisite/
```
</knowledge>

<best_practices>
- Always test in both single-site and multisite modes
- Use get_site_option() for network-wide settings
- Use $wpdb->prefix and $wpdb->base_prefix correctly
- Test super admin vs site admin permission boundaries
- Handle wp_initialize_site for new site creation
- Clean up all sites on uninstall
</best_practices>

<commands>
```bash
# Run multisite PHPUnit tests
./vendor/bin/phpunit -c phpunit-multisite.xml.dist

# Setup multisite with wp-env
npx wp-env run cli wp core multisite-install --title="Test" --subdomains=false

# Create test sites
npx wp-env run cli wp site create --slug=site2

# List all sites
npx wp-env run cli wp site list

# Run tests on specific site
npx wp-env run cli wp --url=http://localhost:8888/site2 option get blogname
```
</commands>
</skill>
