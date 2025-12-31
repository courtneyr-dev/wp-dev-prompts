# 🌐 Multisite Specialist

> **Type**: Specialist
> **Domain**: WordPress Multisite
> **Authority**: Network architecture, site switching, super-admin patterns

## 🎯 Mission

Own all multisite-specific logic including network activation, site-scoped data, super-admin capabilities, and cross-site operations. Ensure plugins work correctly across single-site, subdomain, and subdirectory installations.

## 📥 Inputs

- Plugin/theme feature requirements
- Network topology (subdomain vs subdirectory)
- Data scope (site vs network)
- Capability requirements

## 📤 Outputs

- Network activation hooks
- Site-scoped data patterns
- Super-admin capability checks
- Cross-site operation logic
- Multisite test scenarios

---

## 🔧 When to Use

✅ **Use this agent when:**
- Adding network activation support
- Storing data that spans sites
- Implementing super-admin features
- Handling site switching
- Testing multisite compatibility
- Managing network-wide settings

❌ **Don't use for:**
- Single-site only features
- Standard WordPress hooks (use wp-hooks-architecture)
- General data storage (use data-model-and-migrations)

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Using `get_option` for network data | Use `get_site_option` for network-wide data |
| Hardcoding blog IDs | Use `get_current_blog_id()` and `switch_to_blog()` |
| Missing `restore_current_blog()` | Always restore after `switch_to_blog()` |
| Super-admin vs site admin confusion | Check `is_super_admin()` for network operations |
| Activation hooks not network-aware | Use `register_activation_hook` with network check |

---

## ✅ Checklist

### Network Awareness
- [ ] Check `is_multisite()` before multisite-specific code
- [ ] Use correct option functions (`get_site_option` vs `get_option`)
- [ ] Handle network activation vs single-site activation
- [ ] Support both subdomain and subdirectory installations

### Data Scoping
- [ ] Identify which data is site-specific vs network-wide
- [ ] Use `$wpdb->prefix` for site tables
- [ ] Use `$wpdb->base_prefix` for network tables
- [ ] Handle `blog_id` in all cross-site queries

### Site Switching
- [ ] Always call `restore_current_blog()` after `switch_to_blog()`
- [ ] Use try/finally pattern for cleanup
- [ ] Cache switched data to avoid repeated switches
- [ ] Handle switch failures gracefully

### Capabilities
- [ ] Use `manage_network_options` for super-admin features
- [ ] Check site-level caps for site features
- [ ] Don't assume super-admin has all caps
- [ ] Test with non-super-admin network users

### Testing
- [ ] Test on single-site installation
- [ ] Test on multisite subdirectory
- [ ] Test on multisite subdomain
- [ ] Test network activation/deactivation
- [ ] Test per-site activation/deactivation

---

## 💬 Example Prompts

### Claude Code
```
@multisite-specialist Add network-wide settings that super-admins can
configure, while allowing site admins to override specific options.
```

### Cursor
```
Using multisite-specialist, implement a feature that aggregates data
across all sites in the network and displays it in network admin.
```

### GitHub Copilot
```
# Multisite Specialist Task: Site Switching Pattern
#
# Implement a function that:
# - Iterates through all sites in the network
# - Performs an operation on each site
# - Collects results
# - Properly restores context
#
# Must handle: large networks, switch failures, memory
```

### General Prompt
```
Help me make this plugin multisite-compatible:
1. Store settings per-site with network defaults
2. Add a network admin page for super-admins
3. Handle network activation correctly
4. Ensure data is properly scoped per site
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [data-model-and-migrations](data-model-and-migrations.md) | Site-scoped table design |
| [wp-hooks-architecture](wp-hooks-architecture.md) | Network-specific hooks |
| [wp-security-patterns](../security/wp-security-patterns.md) | Super-admin capabilities |
| [integration-testing](../testing/integration-testing.md) | Multisite test setup |

---

## 🌐 Multisite Architecture

### Option Storage

```php
// Site-specific option (stored in wp_X_options)
get_option( 'my_plugin_setting' );
update_option( 'my_plugin_setting', $value );

// Network-wide option (stored in wp_sitemeta)
get_site_option( 'my_plugin_network_setting' );
update_site_option( 'my_plugin_network_setting', $value );

// Pattern: Network default with site override
function my_plugin_get_setting( $key ) {
    $site_value = get_option( "my_plugin_{$key}" );
    if ( $site_value !== false ) {
        return $site_value;
    }
    return get_site_option( "my_plugin_{$key}_default" );
}
```

### Site Switching Pattern

```php
// Safe site switching with cleanup
function my_plugin_process_all_sites( callable $callback ) {
    $sites = get_sites( [ 'fields' => 'ids' ] );
    $results = [];

    foreach ( $sites as $site_id ) {
        switch_to_blog( $site_id );
        try {
            $results[ $site_id ] = $callback( $site_id );
        } finally {
            restore_current_blog();
        }
    }

    return $results;
}

// Usage
$post_counts = my_plugin_process_all_sites( function( $site_id ) {
    return wp_count_posts()->publish;
});
```

### Network Activation

```php
// Main plugin file
register_activation_hook( __FILE__, 'my_plugin_activate' );

function my_plugin_activate( $network_wide ) {
    if ( is_multisite() && $network_wide ) {
        // Network activation
        my_plugin_network_activate();
    } else {
        // Single site activation
        my_plugin_site_activate();
    }
}

function my_plugin_network_activate() {
    // Set network-level options
    add_site_option( 'my_plugin_version', MY_PLUGIN_VERSION );

    // Activate on each existing site
    $sites = get_sites( [ 'fields' => 'ids' ] );
    foreach ( $sites as $site_id ) {
        switch_to_blog( $site_id );
        my_plugin_site_activate();
        restore_current_blog();
    }
}

// Handle new sites created after network activation
add_action( 'wp_initialize_site', function( $new_site ) {
    if ( is_plugin_active_for_network( plugin_basename( __FILE__ ) ) ) {
        switch_to_blog( $new_site->blog_id );
        my_plugin_site_activate();
        restore_current_blog();
    }
});
```

---

## 🔒 Capability Patterns

### Super-Admin Check

```php
// Network admin menu
add_action( 'network_admin_menu', function() {
    add_menu_page(
        __( 'My Plugin Network', 'my-plugin' ),
        __( 'My Plugin', 'my-plugin' ),
        'manage_network_options', // Super-admin only
        'my-plugin-network',
        'my_plugin_network_page'
    );
});

// Site admin menu
add_action( 'admin_menu', function() {
    add_menu_page(
        __( 'My Plugin', 'my-plugin' ),
        __( 'My Plugin', 'my-plugin' ),
        'manage_options', // Site admin
        'my-plugin',
        'my_plugin_site_page'
    );
});
```

### Capability Hierarchy

```php
// Check for network vs site operation
function my_plugin_can_manage( $scope = 'site' ) {
    if ( $scope === 'network' ) {
        return current_user_can( 'manage_network_options' );
    }
    return current_user_can( 'manage_options' );
}
```

---

## 🧪 Testing Patterns

### PHPUnit Multisite Tests

```php
/**
 * @group multisite
 */
class My_Plugin_Multisite_Test extends WP_UnitTestCase {

    public function test_network_option_storage() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only' );
        }

        update_site_option( 'my_plugin_test', 'network_value' );

        $this->assertEquals( 'network_value', get_site_option( 'my_plugin_test' ) );
    }

    public function test_site_switching() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only' );
        }

        // Create a second site
        $site_id = $this->factory->blog->create();

        // Store different values per site
        update_option( 'my_plugin_test', 'main_site' );

        switch_to_blog( $site_id );
        update_option( 'my_plugin_test', 'second_site' );
        restore_current_blog();

        // Verify isolation
        $this->assertEquals( 'main_site', get_option( 'my_plugin_test' ) );

        switch_to_blog( $site_id );
        $this->assertEquals( 'second_site', get_option( 'my_plugin_test' ) );
        restore_current_blog();
    }
}
```

### E2E Multisite Test

```typescript
// tests/e2e/multisite.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Multisite Support', () => {
    test('network admin can access network settings', async ({ page }) => {
        // Login as super admin
        await page.goto('/wp-login.php');
        await page.fill('#user_login', 'admin');
        await page.fill('#user_pass', 'password');
        await page.click('#wp-submit');

        // Navigate to network admin
        await page.goto('/wp-admin/network/');
        await page.click('text=My Plugin');

        await expect(page.locator('h1')).toContainText('Network Settings');
    });

    test('site admin sees site-specific settings', async ({ page }) => {
        // Login as site admin (not super admin)
        await page.goto('/site2/wp-login.php');
        await page.fill('#user_login', 'site_admin');
        await page.fill('#user_pass', 'password');
        await page.click('#wp-submit');

        await page.goto('/site2/wp-admin/admin.php?page=my-plugin');

        await expect(page.locator('h1')).toContainText('Site Settings');
        // Should not see network options
        await expect(page.locator('text=Network Settings')).not.toBeVisible();
    });
});
```

---

## 📋 Database Table Patterns

### Site-Scoped Table

```php
// Uses $wpdb->prefix (includes blog_id in multisite)
global $wpdb;
$table_name = $wpdb->prefix . 'my_plugin_data';

$wpdb->query( "
    CREATE TABLE IF NOT EXISTS {$table_name} (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        data longtext NOT NULL,
        PRIMARY KEY (id)
    ) {$wpdb->get_charset_collate()}
" );
```

### Network-Wide Table

```php
// Uses $wpdb->base_prefix (no blog_id)
global $wpdb;
$table_name = $wpdb->base_prefix . 'my_plugin_network_data';

// Include blog_id column for cross-site queries
$wpdb->query( "
    CREATE TABLE IF NOT EXISTS {$table_name} (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        blog_id bigint(20) NOT NULL,
        data longtext NOT NULL,
        PRIMARY KEY (id),
        KEY blog_id (blog_id)
    ) {$wpdb->get_charset_collate()}
" );
```
