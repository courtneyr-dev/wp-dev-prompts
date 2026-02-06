# Testing Setup

> **Category**: core/testing
> **Platforms**: All

<prompt>
Set up a complete testing environment for a WordPress plugin.

**Plugin slug**: [PLUGIN_SLUG]
**Plugin path**: [PLUGIN_PATH]

## Test stack

### PHP Testing
- PHPUnit 10+ with `yoast/phpunit-polyfills`
- `wp-phpunit` for integration tests
- `Brain\Monkey` for unit tests (mock WordPress functions)

### Code Quality
- PHPCS with `WordPress-Extra` ruleset
- PHPStan level 6 with `szepeviktor/phpstan-wordpress`

### JavaScript Testing (if plugin has JS)
- Jest for unit tests
- `@wordpress/scripts` for build and test commands

### E2E Testing (if plugin has UI)
- Playwright with `@wordpress/e2e-test-utils-playwright`

## Configuration files to generate

1. `phpunit.xml.dist` — PHPUnit config with testsuite for unit and integration
2. `tests/bootstrap.php` — WordPress test bootstrap
3. `tests/Unit/SampleTest.php` — Example unit test with Brain\Monkey
4. `tests/Integration/SampleTest.php` — Example integration test
5. `.phpcs.xml.dist` — PHPCS config targeting `src/` and `includes/`
6. `phpstan.neon` — PHPStan config at level 6
7. `composer.json` — Dev dependencies only (phpunit, phpcs, phpstan, brain/monkey)

## CI workflow (.github/workflows/tests.yml)

```yaml
matrix:
  php: ['8.2', '8.3', '8.4']
  wp: ['6.7', '6.9', 'latest']
```

Jobs: phpunit, phpcs, phpstan — running on ubuntu-latest.

## Test patterns

Unit tests mock WordPress with Brain\Monkey:
```php
Filters\expectApplied('my_plugin_filter')->once()->andReturn('value');
Functions\expect('sanitize_text_field')->once()->andReturn('clean');
```

Integration tests use WordPress test framework:
```php
class My_Integration_Test extends WP_UnitTestCase {
    public function test_option_saved(): void {
        update_option('my_plugin_setting', 'value');
        $this->assertSame('value', get_option('my_plugin_setting'));
    }
}
```

Generate all files ready to use. Include a Makefile with targets: `test`, `lint`, `stan`, `ci`.
</prompt>

## Usage

Replace `[PLUGIN_SLUG]` and `[PLUGIN_PATH]` then paste into any AI assistant.
