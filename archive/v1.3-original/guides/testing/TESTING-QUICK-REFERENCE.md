# WordPress Testing Quick Reference

One-page cheat sheet for WordPress plugin/theme testing. Keep this handy during development.

---

## Quick Setup

```bash
# 1. Run setup script
bash setup-testing.sh --plugin-name="My Plugin" --text-domain="my-plugin"

# 2. Install WordPress test suite
bash bin/install-wp-tests.sh wordpress_test root root localhost latest

# 3. Start development environment
npm run env:start
```

---

## Daily Commands

### PHP Testing

```bash
# Run all tests
composer test

# Run only unit tests
composer test -- --testsuite=unit

# Run specific test
./vendor/bin/phpunit --filter=TestClassName

# Run with coverage
./vendor/bin/phpunit --coverage-html coverage/
```

### PHP Linting

```bash
# Check code standards
composer lint
./vendor/bin/phpcs

# Auto-fix issues
composer lint:fix
./vendor/bin/phpcbf

# Check single file
./vendor/bin/phpcs path/to/file.php

# Ignore specific sniff
./vendor/bin/phpcs --exclude=WordPress.Files.FileName
```

### Static Analysis

```bash
# Run PHPStan
composer analyze
./vendor/bin/phpstan analyse

# Create baseline (ignore existing issues)
./vendor/bin/phpstan analyse --generate-baseline

# Run at different level
./vendor/bin/phpstan analyse --level=8
```

### JavaScript Testing

```bash
# Lint JavaScript
npm run lint:js

# Auto-fix JavaScript
npm run lint:js -- --fix

# Lint CSS
npm run lint:css

# Run unit tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run E2E tests
npm run test:e2e
```

### Build

```bash
# Development build
npm run build
npm start  # Watch mode

# Production build
npm run build:prod
```

---

## Local Development Environment

### wp-env Commands

```bash
# Start environment
npm run env:start

# Stop environment
npm run env:stop

# Restart
npm run env:stop && npm run env:start

# Clean (delete all data)
npm run env:clean

# View logs
npm run env:logs

# Run WP-CLI command
npm run env:cli -- [command]

# Examples
npm run env:cli -- plugin list
npm run env:cli -- user list
npm run env:cli -- db export backup.sql
```

### Access URLs

- **Frontend**: http://localhost:8888
- **Admin**: http://localhost:8888/wp-admin
  - Username: `admin`
  - Password: `password`
- **Test Environment**: http://localhost:8889

---

## Pre-commit Checks

```bash
# Manual pre-commit check
./vendor/bin/phpcs $(git diff --cached --name-only --diff-filter=ACM | grep '\.php$')
npx lint-staged

# Bypass hooks (emergency only!)
git commit --no-verify -m "message"
```

---

## Common File Locations

### Configuration Files

| File | Purpose |
|------|---------|
| `phpunit.xml.dist` | PHPUnit configuration |
| `.phpcs.xml.dist` | PHPCS rules |
| `phpstan.neon` | PHPStan config |
| `.eslintrc.js` | ESLint rules |
| `.stylelintrc.json` | Stylelint rules |
| `.wp-env.json` | wp-env settings |
| `jest.config.js` | Jest configuration |
| `playwright.config.js` | Playwright config |

### Test Directories

| Directory | Contents |
|-----------|----------|
| `tests/unit/` | PHP unit tests |
| `tests/integration/` | PHP integration tests |
| `tests/e2e/` | End-to-end tests |
| `tests/visual/` | Visual regression tests |
| `tests/accessibility/` | Accessibility tests |
| `tests/bootstrap.php` | PHPUnit bootstrap |

---

## Debugging Tests

### PHPUnit Debugging

```bash
# Verbose output
./vendor/bin/phpunit --verbose

# Stop on failure
./vendor/bin/phpunit --stop-on-failure

# Print output (even when tests pass)
./vendor/bin/phpunit --debug

# Run specific method
./vendor/bin/phpunit --filter=test_method_name

# List all tests without running
./vendor/bin/phpunit --list-tests
```

### Jest Debugging

```bash
# Verbose output
npm run test:unit -- --verbose

# Run specific test file
npm run test:unit -- path/to/test.js

# Update snapshots
npm run test:unit -- -u

# Debug with Node debugger
node --inspect-brk ./node_modules/.bin/wp-scripts test-unit-js --runInBand
```

### Playwright Debugging

```bash
# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Debug mode (pause on failures)
npm run test:e2e -- --debug

# Run specific test
npm run test:e2e -- tests/e2e/example.spec.js

# Run with specific browser
npm run test:e2e -- --project=chromium
```

---

## Fixing Common Issues

### PHPCS Errors

| Error | Fix |
|-------|-----|
| `EscapeOutput` | Add `esc_html()`, `esc_attr()`, or `esc_url()` |
| `NonceVerification` | Add `wp_verify_nonce()` check |
| `ValidatedSanitizedInput` | Use `sanitize_text_field()` or similar |
| `PreparedSQL` | Use `$wpdb->prepare()` with placeholders |
| `I18n` | Wrap strings with `__()` or `_e()` |

### PHPStan Errors

| Error | Fix |
|-------|-----|
| `Undefined property` | Add `@property` docblock or type hint |
| `Undefined method` | Check method exists or add `@method` docblock |
| `Parameter $x of function foo() expects int, string given` | Fix type or cast |
| `Dead code` | Remove unreachable code |

### ESLint Errors

| Error | Fix |
|-------|-----|
| `@wordpress/i18n-text-domain` | Use correct text domain in `__()` |
| `@wordpress/no-unsafe-wp-apis` | Use stable API alternative |
| `no-unused-vars` | Remove or prefix with `_` |
| `prefer-const` | Change `let` to `const` |

---

## Test Writing Quick Tips

### PHP Unit Test Structure

```php
<?php
use PHPUnit\Framework\TestCase;

class MyFeatureTest extends TestCase {
    // Runs before each test
    protected function setUp(): void {
        parent::setUp();
        // Setup code
    }

    // Test method (must start with "test")
    public function test_feature_does_something() {
        // Arrange
        $input = 'test';

        // Act
        $result = my_function($input);

        // Assert
        $this->assertEquals('expected', $result);
    }

    // Runs after each test
    protected function tearDown(): void {
        // Cleanup code
        parent::tearDown();
    }
}
```

### Common PHPUnit Assertions

```php
$this->assertTrue($value);
$this->assertFalse($value);
$this->assertEquals($expected, $actual);
$this->assertSame($expected, $actual); // Strict comparison
$this->assertEmpty($value);
$this->assertNotEmpty($value);
$this->assertNull($value);
$this->assertInstanceOf(ClassName::class, $object);
$this->assertArrayHasKey('key', $array);
$this->assertStringContainsString('needle', $haystack);
$this->assertCount(3, $array);
$this->expectException(Exception::class);
```

### JavaScript Test Structure

```javascript
describe('MyComponent', () => {
    // Setup before each test
    beforeEach(() => {
        // Setup code
    });

    // Test case
    it('renders correctly', () => {
        // Arrange
        const props = { title: 'Test' };

        // Act
        const { getByText } = render(<MyComponent {...props} />);

        // Assert
        expect(getByText('Test')).toBeInTheDocument();
    });

    // Cleanup after each test
    afterEach(() => {
        // Cleanup code
    });
});
```

### Common Jest Assertions

```javascript
expect(value).toBe(expected); // Strict equality
expect(value).toEqual(expected); // Deep equality
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeDefined();
expect(value).toBeUndefined();
expect(array).toContain(item);
expect(string).toMatch(/pattern/);
expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledWith(arg1, arg2);
expect(fn).toThrow();
```

---

## CI/CD Quick Reference

### GitHub Actions Status

Check workflow runs:
- Repository → Actions tab
- Click on workflow run to see details
- Download artifacts from completed runs

### Common CI Failures

| Failure | Likely Cause | Fix |
|---------|-------------|-----|
| PHPCS fails | Coding standards violation | Run `composer lint:fix` locally |
| PHPStan fails | Type errors | Run `composer analyze` locally and fix |
| PHPUnit fails | Broken test | Run `composer test` locally |
| Build fails | JavaScript error | Run `npm run build` locally |
| Plugin Check fails | Missing readme/headers | Update plugin metadata |

### Secrets Required

Add these in: Settings → Secrets and variables → Actions

| Secret | Purpose | Required For |
|--------|---------|--------------|
| `SVN_USERNAME` | WordPress.org username | Deployment |
| `SVN_PASSWORD` | WordPress.org password | Deployment |
| `CODECOV_TOKEN` | Codecov.io token | Coverage reports |
| `SLACK_WEBHOOK_URL` | Slack notifications | Notifications |

---

## Performance Quick Checks

```bash
# Check bundle sizes
npm run build:prod
ls -lh build/*.js build/*.css

# Check PHP memory usage
./vendor/bin/phpunit --log-memory-usage

# Profile database queries
npm run env:cli -- plugin activate query-monitor
# Visit site, click "Queries" in toolbar

# Check for N+1 queries
# Look for repeated similar queries in Query Monitor
```

---

## Security Quick Checks

```bash
# Audit Composer dependencies
composer audit

# Audit npm dependencies
npm audit
npm audit --audit-level=moderate

# Check for known vulnerabilities
composer require --dev roave/security-advisories:dev-latest

# Grep for common security issues
grep -r "eval(" src/
grep -r "\$_GET\|\$_POST" src/
grep -r "echo \$" src/
grep -r "print \$" src/
```

---

## Helpful Snippets

### Temporarily Disable PHPCS Rule

```php
// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo $safe_html; // I know this is safe

// Disable for entire file
<?php
// phpcs:disable WordPress.Files.FileName.InvalidClassFileName
```

### Mock WordPress Function (WP_Mock)

```php
use WP_Mock;

WP_Mock::userFunction('get_option')
    ->once()
    ->with('my_option')
    ->andReturn('value');
```

### Mock WordPress Hook

```php
WP_Mock::expectActionAdded('init', 'my_callback', 10, 1);
WP_Mock::expectFilterAdded('the_content', 'my_filter', 10, 1);
```

### Skip Test Conditionally

```php
// PHPUnit
if (!function_exists('some_function')) {
    $this->markTestSkipped('Function not available');
}

// Jest
it.skip('should do something', () => {
    // Test code
});
```

---

## Emergency Fixes

### Clear All Caches

```bash
rm -rf .phpcs.cache .phpunit.result.cache
rm -rf node_modules/.cache
npm run env:stop
npm run env:clean
composer clear-cache
npm cache clean --force
```

### Reset wp-env Completely

```bash
npm run env:destroy
rm -rf ~/.wp-env
npm run env:start
```

### Force Reinstall Dependencies

```bash
rm -rf vendor/ composer.lock
composer install

rm -rf node_modules/ package-lock.json
npm install
```

---

## Useful Links

### Documentation
- [WordPress Plugin Handbook - Testing](https://developer.wordpress.org/plugins/testing/)
- [PHPUnit Documentation](https://phpunit.de/documentation.html)
- [PHPStan Rules](https://phpstan.org/rules)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/)

### Tools
- [PHPCS Fixer](https://github.com/squizlabs/PHP_CodeSniffer)
- [PHPStan Playground](https://phpstan.org/try)
- [Regex101](https://regex101.com/) - Test regex patterns
- [JSON Formatter](https://jsonformatter.org/) - Format JSON

### Community
- [WordPress Stack Exchange](https://wordpress.stackexchange.com/)
- [WordPress Slack](https://make.wordpress.org/chat/)
- [PHPUnit Users Group](https://github.com/sebastianbergmann/phpunit/discussions)

---

## Cheat Sheet Summary

| Task | Command |
|------|---------|
| Run all PHP tests | `composer test` |
| Check code standards | `composer lint` |
| Fix code standards | `composer lint:fix` |
| Run static analysis | `composer analyze` |
| Run JS tests | `npm run test:unit` |
| Lint JavaScript | `npm run lint:js` |
| Build assets | `npm run build` |
| Start WordPress | `npm run env:start` |
| Run WP-CLI | `npm run env:cli -- [cmd]` |
| E2E tests | `npm run test:e2e` |
| Check security | `composer audit && npm audit` |

---

**Pro Tip**: Add this alias to your shell config (`.bashrc`, `.zshrc`):

```bash
alias wptest='composer lint && composer analyze && composer test && npm run lint && npm run test:unit'
```

Then run everything with: `wptest`

---

**Keep this reference handy!** Print it out or bookmark it for quick access during development.

For detailed guides, see:
- [TESTING-AUTOMATION-PROMPTS.md](./TESTING-AUTOMATION-PROMPTS.md) - AI prompts for testing
- [TESTING-SETUP-GUIDE.md](./TESTING-SETUP-GUIDE.md) - Step-by-step setup
- [QA-TESTING-CHECKLIST.md](./QA-TESTING-CHECKLIST.md) - Manual QA checklist
