---
name: WordPress Testing & QA
description: Comprehensive WordPress testing with PHPUnit integration tests, WP_Mock unit tests, PHPCS coding standards, Playwright E2E, and CI/CD workflows for WordPress 6.9+ and PHP 8.2+.
triggers:
  - phpunit
  - wp_mock
  - testing
  - phpcs
  - phpstan
  - playwright
  - code quality
  - linting
  - CI/CD
  - test setup
  - integration test
  - unit test
---

# WordPress Testing & QA

Testing strategies for WordPress plugins and themes covering unit tests, integration tests, E2E tests, static analysis, and CI/CD pipelines.

## Test Types

### Unit Tests (WP_Mock)

Test isolated classes/functions without WordPress loaded. Fast execution, no database.

```php
use WP_Mock\Tools\TestCase;

class MyPluginTest extends TestCase {
    public function test_format_output() {
        WP_Mock::userFunction( 'esc_html' )
            ->once()
            ->with( 'test' )
            ->andReturn( 'test' );

        $result = my_format_function( 'test' );
        $this->assertEquals( 'test', $result );
    }
}
```

### Integration Tests (WP_UnitTestCase)

Test against actual WordPress with database. Slower but comprehensive.

```bash
# Install test suite
composer require --dev phpunit/phpunit yoast/phpunit-polyfills
bash bin/install-wp-tests.sh wordpress_test root password localhost latest
```

```php
class MyPlugin_Integration_Test extends WP_UnitTestCase {
    public function test_post_creation() {
        $post_id = $this->factory->post->create( [
            'post_title' => 'Test Post',
        ] );

        $this->assertGreaterThan( 0, $post_id );
    }

    public function test_rest_endpoint() {
        $request = new WP_REST_Request( 'GET', '/myplugin/v1/items' );
        $response = rest_get_server()->dispatch( $request );

        $this->assertEquals( 200, $response->get_status() );
    }
}
```

### E2E Tests (Playwright)

```javascript
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test( 'block renders in editor', async ( { admin, editor } ) => {
    await admin.createNewPost();
    await editor.insertBlock( { name: 'my-plugin/my-block' } );
    await expect( editor.canvas.locator( '.wp-block-my-block' ) ).toBeVisible();
} );
```

## phpunit.xml

```xml
<?xml version="1.0"?>
<phpunit
    bootstrap="tests/bootstrap.php"
    backupGlobals="false"
    colors="true"
>
    <testsuites>
        <testsuite name="unit">
            <directory suffix="Test.php">tests/unit</directory>
        </testsuite>
        <testsuite name="integration">
            <directory suffix="Test.php">tests/integration</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

## Static Analysis

### PHPCS (WordPress Coding Standards)

```json
{
    "require-dev": {
        "wp-coding-standards/wpcs": "^3.0",
        "phpcompatibility/phpcompatibility-wp": "*",
        "dealerdirect/phpcodesniffer-composer-installer": "^1.0"
    }
}
```

```xml
<!-- phpcs.xml -->
<ruleset name="My Plugin">
    <rule ref="WordPress"/>
    <rule ref="WordPress-Extra"/>
    <rule ref="WordPress-Docs"/>
    <rule ref="PHPCompatibilityWP"/>
    <config name="testVersion" value="8.2-"/>
    <config name="minimum_wp_version" value="6.9"/>
    <file>./includes</file>
    <file>./my-plugin.php</file>
</ruleset>
```

### PHPStan

```neon
# phpstan.neon
includes:
    - vendor/szepeviktor/phpstan-wordpress/extension.neon
parameters:
    level: 6
    paths:
        - includes/
        - my-plugin.php
```

## CI/CD Workflow

```yaml
# .github/workflows/ci.yml
jobs:
  test:
    strategy:
      matrix:
        php: ['8.2', '8.3', '8.4']
        wp: ['6.7', '6.8', '6.9', 'trunk']
    steps:
      - uses: shivammathur/setup-php@v2
        with:
          php-version: ${{ matrix.php }}
      - run: composer install --no-progress
      - run: bash bin/install-wp-tests.sh wordpress_test root '' 127.0.0.1 ${{ matrix.wp }}
      - run: vendor/bin/phpunit

  lint:
    steps:
      - run: vendor/bin/phpcs
      - run: vendor/bin/phpstan analyse
```

## Test Checklist

- [ ] Unit tests for business logic (WP_Mock)
- [ ] Integration tests for WordPress interactions (WP_UnitTestCase)
- [ ] PHPCS with WordPress-Extra ruleset
- [ ] PHPStan level 6+
- [ ] PHP compatibility check (8.2+)
- [ ] E2E tests for blocks (Playwright)
- [ ] Multisite compatibility test
- [ ] i18n validation (missing text domains)
- [ ] Accessibility linting (axe-core)

## References

- [Plugin Unit Tests Handbook](https://developer.wordpress.org/plugins/testing/)
- [WordPress E2E Test Utils](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/)
- [WPCS Documentation](https://github.com/WordPress/WordPress-Coding-Standards)
