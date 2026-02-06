# Test Infrastructure Setup

> **Tier**: T3
> **Tool**: Claude Code
> **Time**: 2-4 hours
> **Files**: 10+

## When to Use

- Setting up testing for a new plugin
- Adding test infrastructure to existing plugin
- Configuring CI/CD for testing
- Establishing quality gates

## Prompt

```
Set up complete testing infrastructure for this WordPress plugin:

**Current State:**
- [DESCRIBE_CURRENT_STATE]
- Composer for PHP dependencies: [YES/NO]
- npm for JS dependencies: [YES/NO]
- Existing tests: [YES/NO/PARTIAL]

**Requirements:**

1. **PHPUnit Setup**
   - WordPress test framework integration
   - Unit tests with isolation (WP_Mock or Brain Monkey)
   - Integration tests against real WordPress

2. **Quality Tools**
   - PHPCS with WordPress coding standards
   - PHPStan static analysis (level 5)

3. **CI/CD**
   - GitHub Actions workflow
   - Run on pull requests
   - Multiple PHP version testing

4. **Code Coverage**
   - Coverage reporting
   - Minimum threshold enforcement

**Process:**
1. Explore current project structure
2. Propose implementation plan
3. Implement incrementally with verification
```

## Customization

| Variable | Description |
|----------|-------------|
| `[DESCRIBE_CURRENT_STATE]` | Current project setup |

## Example Setup Session

### Turn 1: Initial Request

```
Set up testing for my WordPress plugin:

Current state:
- No existing tests
- Using Composer for autoloading
- npm for block builds
- PHP 8.2+ required
- Plugin distributed on WordPress.org

Requirements:
- PHPUnit with WordPress integration
- Unit tests that don't need WordPress
- Integration tests against WordPress
- GitHub Actions CI
- PHPCS and PHPStan

Explore the codebase first to understand the structure.
```

### Turn 2: Plan Review

```
The plan looks good. Questions:

1. For unit tests, should we use WP_Mock or Brain Monkey?
2. For CI, should we test PHP 8.2, 8.3, 8.4?
3. Should coverage reports go to Codecov or just local?

Also, let's start with the simplest setup that works
and iterate from there.
```

### Turn 3: Implementation Start

```
Proceed with:
- WP_Mock for unit tests
- PHP 8.2 + 8.4 in CI (skip middle versions)
- Local coverage only initially

Start with PHPUnit setup. Create one passing test
before moving to CI.
```

### Turn 4: Verification

```
Tests run locally. Before CI:
- Add one integration test using WP test framework
- Verify both test types can coexist
- Then set up GitHub Actions
```

## Infrastructure Components

### PHPUnit Configuration

```
Set up PHPUnit with:
- phpunit.xml.dist in root
- tests/ directory structure:
  - tests/unit/ (isolated tests)
  - tests/integration/ (WordPress tests)
  - tests/bootstrap.php
- Separate bootstrap for unit vs integration
```

### WordPress Test Framework

```
Set up WP test framework:
- Install via Composer or install-wp-tests.sh
- Configure database for tests
- Create base test case class
- Set up fixtures for common scenarios
```

### Quality Tools

```
Configure quality tools:
- phpcs.xml.dist with WordPress rules
- phpstan.neon with WordPress stubs
- Composer scripts for running tools
- Pre-commit hook integration (optional)
```

### GitHub Actions

```
Set up CI workflow:
- Trigger on push/PR to main
- PHP version matrix
- WordPress version testing (optional)
- Run tests, PHPCS, PHPStan
- Upload coverage (optional)
```

## File Structure

Expected outcome:

```
plugin-root/
├── composer.json (updated)
├── phpunit.xml.dist
├── phpcs.xml.dist
├── phpstan.neon
├── tests/
│   ├── bootstrap.php
│   ├── unit/
│   │   └── ExampleUnitTest.php
│   └── integration/
│       └── ExampleIntegrationTest.php
├── .github/
│   └── workflows/
│       └── tests.yml
└── bin/
    └── install-wp-tests.sh (if using)
```

## Composer Scripts

```json
{
  "scripts": {
    "test": "phpunit",
    "test:unit": "phpunit --testsuite unit",
    "test:integration": "phpunit --testsuite integration",
    "phpcs": "phpcs",
    "phpstan": "phpstan analyse",
    "check": ["@phpcs", "@phpstan", "@test"]
  }
}
```

## Verification Steps

After setup, verify:

```bash
# Unit tests run
composer test:unit

# Integration tests run (requires WP test database)
composer test:integration

# PHPCS works
composer phpcs

# PHPStan works
composer phpstan

# CI workflow valid
act -j test (if using act locally)
```

## Incremental Approach

Set up in order:

1. **PHPUnit basic** — Can run any test
2. **First unit test** — One passing test
3. **First integration test** — One WP test passing
4. **PHPCS** — Standards checking works
5. **PHPStan** — Static analysis works
6. **GitHub Actions** — CI runs all above
7. **Coverage** — Reports generated

Don't proceed to next step until current step is verified.

## Common Issues

### WP Test Framework Issues

```
If WP tests fail to bootstrap:
- Check database credentials in wp-tests-config.php
- Verify WordPress test files are installed
- Check PHP version compatibility
```

### PHPStan WordPress Issues

```
If PHPStan fails on WordPress functions:
- Ensure szepeviktor/phpstan-wordpress is installed
- Check phpstan.neon includes WordPress stubs
- Add plugin-specific stubs if needed
```

### CI Database Issues

```
For CI database:
- Use MySQL service in GitHub Actions
- Or use SQLite (with wordpress-sqlite-integration)
- Set up test database in CI workflow
```

## Related

- [T3 Guide](../../../workflows/tiered-agents/tier-3-complex.md)
- [Test Coverage Gaps](../t2-analytical/test-coverage-gaps.md) — For analysis
- [Add PHPUnit Test](../t1-constrained/add-phpunit-test.md) — For individual tests
