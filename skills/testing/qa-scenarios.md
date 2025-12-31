# QA Test Scenarios

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Comprehensive QA test scenarios for WordPress plugins and themes

<skill>
<summary>
Structured QA test scenarios covering installation, activation, configuration, usage, and upgrade flows for WordPress projects.
</summary>

<knowledge>
## Core Test Flows

### 1. Installation → Activation → Configuration → Use → Deactivation → Uninstall

```yaml
# qa/scenarios/lifecycle.yml
name: Plugin Lifecycle
priority: critical
roles: [administrator, network_admin]
locales: [en_US, ar]

steps:
  - name: Fresh Installation
    actions:
      - Upload plugin via wp-admin/plugin-install.php
      - Verify appears in plugin list
      - Verify no errors in debug.log
    expected:
      - Plugin shows in inactive state
      - Version matches expected
      - No PHP errors

  - name: Activation
    actions:
      - Click Activate
      - Observe any admin notices
    expected:
      - Success notice displayed
      - Any activation redirects work
      - Database tables created (if applicable)
      - Default options set

  - name: Initial Configuration
    actions:
      - Navigate to settings page
      - Set required options
      - Save settings
    expected:
      - Settings page loads without error
      - All form controls render correctly
      - Save shows success message
      - Settings persist on reload

  - name: Core Functionality
    actions:
      - Use primary plugin feature
      - Verify output on frontend
      - Test with different user roles
    expected:
      - Feature works as documented
      - Output renders correctly
      - Permissions enforced

  - name: Deactivation
    actions:
      - Deactivate plugin
      - Verify frontend behavior
    expected:
      - Plugin deactivates cleanly
      - No fatal errors on frontend
      - Data preserved (not deleted)

  - name: Reactivation
    actions:
      - Reactivate plugin
      - Check settings preserved
    expected:
      - Previous settings restored
      - No migration re-run

  - name: Uninstall
    actions:
      - Deactivate and delete plugin
    expected:
      - All plugin data cleaned up
      - Database tables removed
      - Options deleted
      - No orphaned data
```

### 2. Upgrade Scenarios

```yaml
# qa/scenarios/upgrade.yml
name: Version Upgrade
priority: critical

scenarios:
  - name: N-1 to N Upgrade
    setup:
      - Install previous stable version
      - Configure with typical settings
      - Create sample content
    actions:
      - Upload new version
      - Activate (triggering migration)
    expected:
      - Migration runs successfully
      - All data preserved
      - New features available
      - Deprecated features gracefully handled

  - name: Major Version Upgrade
    setup:
      - Install version 1.x
      - Heavy configuration and content
    actions:
      - Upgrade to 2.x
    expected:
      - Clear upgrade notice
      - Migration status visible
      - Rollback instructions provided
      - Data transformation correct

  - name: Skip Version Upgrade
    setup:
      - Install version 1.0
      - Skip 1.1 and 1.2
      - Upgrade directly to 1.3
    expected:
      - All migrations run in order
      - Final state correct
      - No data loss
```

### 3. Role-Based Testing

```yaml
# qa/scenarios/roles.yml
name: Role Permissions
priority: high

roles:
  super_admin:
    context: multisite
    capabilities:
      - manage_network_plugins
      - edit_network_options
    tests:
      - Can access network settings
      - Can activate network-wide
      - Can view all sites' data

  administrator:
    capabilities:
      - manage_options
      - edit_plugins
    tests:
      - Can access all plugin settings
      - Can configure all options
      - Can view all plugin data

  editor:
    capabilities:
      - publish_posts
      - edit_others_posts
    tests:
      - Can use content features
      - Cannot access settings
      - Limited to editorial functions

  author:
    capabilities:
      - publish_posts
      - edit_posts
    tests:
      - Can use own content features
      - Cannot edit others' content
      - No settings access

  contributor:
    capabilities:
      - edit_posts
    tests:
      - Limited feature access
      - Cannot publish directly
      - No plugin settings

  subscriber:
    capabilities:
      - read
    tests:
      - Can view public output
      - No backend access
      - No plugin features

  logged_out:
    capabilities: []
    tests:
      - Can view public output only
      - Cannot access wp-admin
      - Proper redirects
```

### 4. REST API Scenarios

```yaml
# qa/scenarios/rest-api.yml
name: REST API CRUD
priority: high
roles: [administrator, editor, subscriber, anonymous]

endpoints:
  - path: /my-plugin/v1/items
    methods:
      GET:
        roles:
          administrator: 200
          editor: 200
          subscriber: 403
          anonymous: 401
        tests:
          - Returns correct item count
          - Pagination works
          - Filtering works

      POST:
        roles:
          administrator: 201
          editor: 201
          subscriber: 403
          anonymous: 401
        tests:
          - Creates new item
          - Returns created item
          - Validates required fields
          - Sanitizes input

  - path: /my-plugin/v1/items/{id}
    methods:
      GET:
        tests:
          - Returns correct item
          - 404 for non-existent
          - Respects visibility

      PUT:
        tests:
          - Updates item
          - Validates input
          - Returns updated item

      DELETE:
        tests:
          - Deletes item
          - Returns 204
          - Item not retrievable after
```

### 5. Block Editor Scenarios

```yaml
# qa/scenarios/block-editor.yml
name: Block Editor Integration
priority: high
locales: [en_US, ar]

blocks:
  - name: my-plugin/my-block
    tests:
      insertion:
        - Can insert via inserter
        - Appears in correct category
        - Preview renders

      editing:
        - Toolbar controls work
        - Sidebar controls work
        - Content is editable
        - Changes persist

      frontend:
        - Renders correctly
        - Styles applied
        - Interactive features work
        - RTL layout correct

      accessibility:
        - Keyboard navigable
        - Screen reader friendly
        - Focus management correct

      validation:
        - Validates on save
        - Shows deprecation notice if applicable
        - Transforms work
```

## PHPUnit Scenario Tests

```php
<?php
/**
 * Scenario-based tests.
 */
class Lifecycle_Scenario_Test extends WP_UnitTestCase {

    /**
     * Test complete plugin lifecycle.
     */
    public function test_complete_lifecycle() {
        // Activation
        do_action( 'activate_my-plugin/my-plugin.php' );

        $this->assertTrue( get_option( 'my_plugin_activated' ) );
        $this->assertNotEmpty( get_option( 'my_plugin_version' ) );

        // Configuration
        update_option( 'my_plugin_setting', 'test_value' );
        $this->assertEquals( 'test_value', get_option( 'my_plugin_setting' ) );

        // Usage
        $result = my_plugin_do_something();
        $this->assertTrue( $result );

        // Deactivation
        do_action( 'deactivate_my-plugin/my-plugin.php' );

        // Settings should persist
        $this->assertEquals( 'test_value', get_option( 'my_plugin_setting' ) );

        // Uninstall
        my_plugin_uninstall();

        // Data should be cleaned
        $this->assertFalse( get_option( 'my_plugin_setting' ) );
        $this->assertFalse( get_option( 'my_plugin_activated' ) );
    }

    /**
     * Test upgrade scenario.
     */
    public function test_upgrade_from_previous_version() {
        // Simulate previous version state
        update_option( 'my_plugin_version', '1.0.0' );
        update_option( 'my_plugin_old_format', 'legacy_data' );

        // Trigger upgrade
        do_action( 'plugins_loaded' );

        // Verify migration
        $this->assertEquals( MY_PLUGIN_VERSION, get_option( 'my_plugin_version' ) );
        $this->assertFalse( get_option( 'my_plugin_old_format' ) );

        $new_data = get_option( 'my_plugin_new_format' );
        $this->assertArrayHasKey( 'migrated', $new_data );
    }
}
```

## Playwright Scenario Tests

```typescript
// tests/e2e/scenarios/lifecycle.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Plugin Lifecycle', () => {
    test('complete lifecycle scenario', async ({ page }) => {
        // 1. Install
        await page.goto('/wp-admin/plugin-install.php?tab=upload');
        await page.setInputFiles('input[type="file"]', './dist/my-plugin.zip');
        await page.click('#install-plugin-submit');

        await expect(page.locator('.wrap')).toContainText('successfully installed');

        // 2. Activate
        await page.click('a:has-text("Activate Plugin")');

        await expect(page.locator('.notice-success')).toBeVisible();

        // 3. Configure
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        await page.fill('#my-plugin-title', 'Test Configuration');
        await page.click('#submit');

        await expect(page.locator('.notice-success')).toBeVisible();

        // Verify persists
        await page.reload();
        await expect(page.locator('#my-plugin-title')).toHaveValue('Test Configuration');

        // 4. Use
        await page.goto('/wp-admin/post-new.php');
        await page.click('[aria-label="Toggle block inserter"]');
        await page.fill('[placeholder="Search"]', 'my-plugin');
        await page.click('[aria-label="My Plugin Block"]');

        await expect(page.locator('.wp-block-my-plugin-block')).toBeVisible();

        // 5. Deactivate
        await page.goto('/wp-admin/plugins.php');
        await page.click('a[href*="action=deactivate"][href*="my-plugin"]');

        // Frontend should not break
        await page.goto('/');
        await expect(page).not.toHaveURL(/wp-die/);

        // 6. Reactivate and verify settings
        await page.goto('/wp-admin/plugins.php');
        await page.click('a[href*="action=activate"][href*="my-plugin"]');

        await page.goto('/wp-admin/options-general.php?page=my-plugin');
        await expect(page.locator('#my-plugin-title')).toHaveValue('Test Configuration');
    });
});

// tests/e2e/scenarios/roles.spec.ts
test.describe('Role-Based Access', () => {
    const roles = [
        { role: 'administrator', canAccessSettings: true },
        { role: 'editor', canAccessSettings: false },
        { role: 'subscriber', canAccessSettings: false },
    ];

    for (const { role, canAccessSettings } of roles) {
        test(`${role} ${canAccessSettings ? 'can' : 'cannot'} access settings`, async ({ page }) => {
            // Login as role
            await page.goto('/wp-login.php');
            await page.fill('#user_login', `test_${role}`);
            await page.fill('#user_pass', 'password');
            await page.click('#wp-submit');

            // Try to access settings
            await page.goto('/wp-admin/options-general.php?page=my-plugin');

            if (canAccessSettings) {
                await expect(page.locator('h1')).toContainText('My Plugin Settings');
            } else {
                await expect(page.locator('body')).toContainText(/denied|permission/i);
            }
        });
    }
});
```

## Multisite Scenarios

```yaml
# qa/scenarios/multisite.yml
name: Multisite Scenarios
priority: critical
context: multisite

scenarios:
  - name: Network Activation
    roles: [super_admin]
    steps:
      - Activate plugin network-wide
      - Verify active on all sites
      - Create new site
      - Verify plugin active on new site

  - name: Per-Site Activation
    roles: [super_admin, site_admin]
    steps:
      - Activate on Site 1 only
      - Verify inactive on Site 2
      - Verify Site 2 admin cannot activate (if network-only)

  - name: Network vs Site Settings
    steps:
      - Set network-wide default
      - Override on specific site
      - Verify isolation

  - name: Super Admin vs Site Admin
    steps:
      - Login as site admin
      - Verify no network settings access
      - Login as super admin
      - Verify full access
```

## QA Checklists

```markdown
# qa/RELEASE_CHECKLIST.md

## Pre-Release QA Checklist

### Version Consistency
- [ ] Plugin header version matches
- [ ] readme.txt Stable tag matches
- [ ] Constant/define version matches
- [ ] package.json version matches
- [ ] Changelog entry exists

### Automated Tests
- [ ] PHPUnit tests pass
- [ ] Playwright tests pass
- [ ] PHPCS clean
- [ ] PHPStan clean
- [ ] No security issues

### Manual Testing
- [ ] Fresh install works
- [ ] Upgrade from N-1 works
- [ ] All documented features work
- [ ] Settings save and persist
- [ ] Frontend output correct

### Cross-Environment
- [ ] Works on PHP 7.4
- [ ] Works on PHP 8.2
- [ ] Works on WP latest
- [ ] Works on WP previous major
- [ ] Works on multisite

### Localization
- [ ] RTL layout correct
- [ ] No hardcoded strings
- [ ] POT file current
- [ ] Date/number formatting works

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] axe-core clean
- [ ] Color contrast OK

### Performance
- [ ] Lighthouse score acceptable
- [ ] No unoptimized images
- [ ] Assets minified

### Security
- [ ] No secrets in code
- [ ] Nonces verified
- [ ] Capabilities checked
- [ ] Input sanitized
- [ ] Output escaped

### Package
- [ ] No dev files included
- [ ] All required files present
- [ ] ZIP size reasonable
```

## CI Integration

```yaml
name: QA Scenarios

on: [push, pull_request]

jobs:
  lifecycle-scenarios:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npx playwright install --with-deps chromium

      - name: Start WordPress
        run: npx wp-env start

      - name: Run lifecycle scenarios
        run: npx playwright test tests/e2e/scenarios/lifecycle.spec.ts

  role-scenarios:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npx playwright install --with-deps chromium

      - name: Start WordPress
        run: npx wp-env start

      - name: Create test users
        run: |
          npx wp-env run cli wp user create test_editor editor@test.com --role=editor --user_pass=password
          npx wp-env run cli wp user create test_subscriber sub@test.com --role=subscriber --user_pass=password

      - name: Run role scenarios
        run: npx playwright test tests/e2e/scenarios/roles.spec.ts

  upgrade-scenarios:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get previous version
        run: |
          PREV_TAG=$(git describe --tags --abbrev=0 HEAD^)
          echo "PREV_VERSION=$PREV_TAG" >> $GITHUB_ENV

      - name: Test upgrade
        run: |
          # Install previous version
          # Upgrade to current
          # Validate
```
</knowledge>

<best_practices>
- Define scenarios in structured YAML
- Test all user roles
- Test multisite separately
- Include upgrade scenarios
- Automate what can be automated
- Document manual test steps
</best_practices>

<commands>
```bash
# Run lifecycle scenarios
npx playwright test tests/e2e/scenarios/lifecycle.spec.ts

# Run role-based scenarios
npx playwright test tests/e2e/scenarios/roles.spec.ts

# Run upgrade scenario
./scripts/test-upgrade.sh

# Run full QA smoke
make qa-smoke
```
</commands>
</skill>
