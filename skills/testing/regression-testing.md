# Regression Testing

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Automated regression testing to prevent reintroduction of bugs

<skill>
<summary>
Setting up regression test suites to catch bugs that reappear after code changes in WordPress projects.
</summary>

<knowledge>
## What Is Regression Testing?

Regression testing ensures:
- **Fixed bugs stay fixed** - Previous issues don't reappear
- **New code doesn't break old** - Existing functionality preserved
- **Edge cases remain covered** - Boundary conditions still work
- **Integration points work** - Components still communicate correctly

## Test Organization

### Regression Test Structure

```
tests/
├── regression/
│   ├── issues/           # Tests for specific bug fixes
│   │   ├── Issue123Test.php
│   │   └── Issue456Test.php
│   ├── features/         # Feature regression tests
│   │   ├── SettingsTest.php
│   │   └── BlocksTest.php
│   └── integration/      # Integration regression
│       └── APITest.php
```

### Bug-to-Test Pattern

```php
<?php
/**
 * Regression tests for GitHub Issue #123.
 *
 * Issue: Settings not saved when special characters used.
 * Fixed in: commit abc1234
 *
 * @link https://github.com/org/repo/issues/123
 */
class Issue123Test extends WP_UnitTestCase {

    /**
     * Test that special characters are saved correctly.
     *
     * @ticket 123
     */
    public function test_settings_save_with_special_characters() {
        $value = "Test with 'quotes' and \"double quotes\"";

        update_option( 'my_plugin_setting', $value );

        $this->assertEquals( $value, get_option( 'my_plugin_setting' ) );
    }

    /**
     * Test unicode characters in settings.
     *
     * @ticket 123
     */
    public function test_settings_save_with_unicode() {
        $value = 'Test with émojis 🎉 and ñ characters';

        update_option( 'my_plugin_setting', $value );

        $this->assertEquals( $value, get_option( 'my_plugin_setting' ) );
    }
}
```

## PHPUnit Regression Groups

### Configuration (phpunit.xml)

```xml
<?xml version="1.0"?>
<phpunit>
    <testsuites>
        <testsuite name="regression">
            <directory>tests/regression</directory>
        </testsuite>
        <testsuite name="regression-critical">
            <directory>tests/regression/issues</directory>
        </testsuite>
    </testsuites>

    <groups>
        <include>
            <group>regression</group>
        </include>
    </groups>
</phpunit>
```

### Test with Groups

```php
/**
 * @group regression
 * @group security
 */
class SecurityRegressionTest extends WP_UnitTestCase {

    /**
     * @ticket 456
     * @group regression
     * @group xss
     */
    public function test_output_is_escaped() {
        $malicious = '<script>alert("xss")</script>';

        ob_start();
        my_plugin_display_value( $malicious );
        $output = ob_get_clean();

        $this->assertStringNotContainsString( '<script>', $output );
    }
}
```

## Playwright Regression Tests

### Structure

```javascript
// tests/regression/issue-123.spec.ts
import { test, expect } from '@playwright/test';

/**
 * Regression: Form submission failed with special chars
 * Issue: #123
 * Fixed: v1.2.3
 */
test.describe('Issue #123 - Special characters in forms', () => {
    test('form accepts special characters', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        await page.fill('#setting-field', "Test with 'quotes'");
        await page.click('#submit');

        await expect(page.locator('.notice-success')).toBeVisible();

        // Verify saved correctly
        await page.reload();
        await expect(page.locator('#setting-field')).toHaveValue("Test with 'quotes'");
    });

    test('form accepts unicode characters', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        await page.fill('#setting-field', 'Test with émojis 🎉');
        await page.click('#submit');

        await expect(page.locator('.notice-success')).toBeVisible();
    });
});
```

### Run Regression Suite

```bash
# All regression tests
npx playwright test tests/regression/

# Specific issue
npx playwright test tests/regression/issue-123.spec.ts
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Regression Tests

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  php-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: Start WordPress
        run: npx wp-env start

      - name: Run regression tests
        run: |
          ./vendor/bin/phpunit \
            --testsuite=regression \
            --log-junit=regression-results.xml

      - name: Upload results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: regression-results
          path: regression-results.xml

  e2e-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Start WordPress
        run: npx wp-env start

      - name: Run E2E regression tests
        run: npx playwright test tests/regression/

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### On Merge to Main

```yaml
on:
  push:
    branches: [main]

jobs:
  full-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Run complete regression suite
      - name: Full regression suite
        run: |
          ./vendor/bin/phpunit --testsuite=regression
          npx playwright test tests/regression/
```

## Best Practices

### Test Documentation

```php
/**
 * Regression test for issue #789.
 *
 * Background:
 * Users reported that bulk actions failed when more than
 * 100 items were selected. The issue was in the SQL query
 * that used an IN clause with too many parameters.
 *
 * Fix:
 * Chunked the query into batches of 50 items.
 *
 * @ticket 789
 * @link https://github.com/org/repo/issues/789
 * @since 2.1.0
 */
public function test_bulk_action_with_many_items() {
    // Create 150 test items
    $post_ids = $this->factory()->post->create_many( 150 );

    // Attempt bulk action
    $result = my_plugin_bulk_delete( $post_ids );

    // All items should be processed
    $this->assertTrue( $result );
    $this->assertCount( 0, get_posts( [ 'post__in' => $post_ids ] ) );
}
```

### Minimal Reproduction

```php
/**
 * Tests the exact scenario that caused the bug.
 */
public function test_exact_failure_scenario() {
    // Setup exact conditions from bug report
    $user = $this->factory()->user->create( [ 'role' => 'subscriber' ] );
    wp_set_current_user( $user );

    // The specific action that failed
    $result = my_plugin_user_action();

    // What should have happened
    $this->assertTrue( $result );
}
```

### Before/After Pattern

```php
/**
 * Verifies the fix by testing what used to fail.
 */
public function test_previously_failing_scenario() {
    // This used to throw an exception
    $this->expectNotToPerformAssertions();

    // Or this used to return wrong value
    $result = problematic_function();
    $this->assertEquals( 'correct', $result );
}
```

## Tracking Regressions

### Issue Template

```markdown
## Regression Report

**Version where bug reappeared**: 2.3.0
**Version where it was fixed**: 2.1.0

**Original issue**: #123

**Steps to reproduce**:
1. Go to settings
2. Enter special characters
3. Save

**Expected**: Settings saved
**Actual**: Error displayed

**Regression test added**: tests/regression/issues/Issue123RegressedTest.php
```

### Changelog Entry

```markdown
= 2.3.1 =
* Fixed: Regression in settings save with special characters (issue #123)
* Added: Regression test to prevent reoccurrence
```
</knowledge>

<best_practices>
- Write test when fixing any bug
- Link test to original issue
- Document why the test exists
- Group regression tests separately
- Run regression suite on every PR
- Run full suite before releases
</best_practices>

<commands>
```bash
# Run PHP regression tests
./vendor/bin/phpunit --testsuite=regression

# Run specific issue test
./vendor/bin/phpunit --filter=Issue123

# Run with group
./vendor/bin/phpunit --group=regression

# Run Playwright regression tests
npx playwright test tests/regression/
```
</commands>
</skill>
