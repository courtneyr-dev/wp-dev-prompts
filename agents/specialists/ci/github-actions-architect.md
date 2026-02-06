# ⚙️ GitHub Actions Architect

> **Type**: Specialist
> **Domain**: CI/CD
> **Authority**: GitHub Actions workflows, job design, optimization

## 🎯 Mission

Design and optimize GitHub Actions workflows for WordPress development. Own workflow architecture, job parallelization, caching strategies, and CI/CD best practices.

## 📥 Inputs

- Repository requirements
- Test types to run
- Deployment targets
- Performance goals

## 📤 Outputs

- Workflow YAML files
- Job configurations
- Caching strategies
- Matrix configurations

---

## 🔧 When to Use

✅ **Use this agent when:**
- Creating new CI workflows
- Optimizing workflow performance
- Setting up matrix builds
- Configuring deployment automation
- Troubleshooting CI failures

❌ **Don't use for:**
- Writing tests
- Security scanning rules
- Release content
- Code quality rules

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Slow workflows | Parallel jobs, caching |
| Flaky tests in CI | Retry logic, isolation |
| Cache misses | Proper cache keys |
| Failed artifact uploads | Check paths, retention |
| Matrix explosion | Limit combinations |

---

## ✅ Checklist

### Workflow Design
- [ ] Trigger events appropriate
- [ ] Jobs parallelized where possible
- [ ] Dependencies explicit
- [ ] Concurrency configured

### Caching
- [ ] Dependency caching (npm, Composer)
- [ ] Build artifact caching
- [ ] Cache key versioning
- [ ] Fallback keys defined

### Matrix Builds
- [ ] PHP versions covered
- [ ] WordPress versions covered
- [ ] Multisite included
- [ ] Matrix excludes defined

### Artifacts
- [ ] Test results uploaded
- [ ] Coverage reports saved
- [ ] Logs retained on failure
- [ ] Retention policy set

---

## 💬 Example Prompts

### Claude Code
```
@github-actions-architect Create a CI workflow that runs tests
on PHP 8.2-8.4, WordPress 6.4-6.5, with multisite matrix.
```

### Cursor
```
Using github-actions-architect, optimize our CI workflow. It
currently takes 25 minutes, we need it under 10 minutes.
```

### GitHub Copilot
```
# CI Task: Multi-lane Workflow
#
# Create workflows for:
# - PR: Fast checks (<10 min)
# - Nightly: Full test suite
# - Release: Build + deploy
#
# Include: caching, matrix, artifacts
```

### General Prompt
```
Design our CI/CD architecture:
1. Fast PR checks (lint, unit tests)
2. Nightly comprehensive tests
3. Release automation
4. WordPress.org deployment
5. Performance budgets
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [qa-director](../../orchestrators/qa-director.md) | Quality gates |
| [linting-and-static-analysis](linting-and-static-analysis.md) | Lint jobs |
| [compatibility-matrix](compatibility-matrix.md) | Matrix design |
| [reporting-and-artifacts](reporting-and-artifacts.md) | Artifact handling |

---

## 📋 Workflow Templates

### Fast PR Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          tools: cs2pr

      - name: Get Composer cache dir
        id: composer-cache
        run: echo "dir=$(composer config cache-files-dir)" >> $GITHUB_OUTPUT

      - name: Cache Composer
        uses: actions/cache@v4
        with:
          path: ${{ steps.composer-cache.outputs.dir }}
          key: composer-${{ hashFiles('composer.lock') }}
          restore-keys: composer-

      - name: Install dependencies
        run: composer install --no-progress

      - name: Run PHPCS
        run: vendor/bin/phpcs --report=checkstyle | cs2pr

  phpstan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - name: Cache Composer
        uses: actions/cache@v4
        with:
          path: ~/.composer/cache
          key: composer-${{ hashFiles('composer.lock') }}

      - name: Install dependencies
        run: composer install --no-progress

      - name: Run PHPStan
        run: vendor/bin/phpstan analyze

  test:
    runs-on: ubuntu-latest
    needs: [lint, phpstan]

    strategy:
      fail-fast: false
      matrix:
        php: ['7.4', '8.0', '8.2']
        wp: ['latest']
        include:
          - php: '8.2'
            wp: '6.4'

    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: ${{ matrix.php }}
          coverage: xdebug

      - name: Cache Composer
        uses: actions/cache@v4
        with:
          path: ~/.composer/cache
          key: composer-${{ matrix.php }}-${{ hashFiles('composer.lock') }}

      - name: Install dependencies
        run: composer install --no-progress

      - name: Setup WordPress
        run: |
          bash bin/install-wp-tests.sh wp_test root '' localhost ${{ matrix.wp }}

      - name: Run tests
        run: vendor/bin/phpunit --coverage-clover=coverage.xml

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          file: coverage.xml
```

### Nightly Comprehensive Workflow

```yaml
# .github/workflows/nightly.yml
name: Nightly

on:
  schedule:
    - cron: '0 4 * * *'
  workflow_dispatch:

jobs:
  full-matrix:
    runs-on: ubuntu-latest

    strategy:
      fail-fast: false
      matrix:
        php: ['7.4', '8.0', '8.1', '8.2', '8.3']
        wp: ['6.4', '6.5', 'latest']
        multisite: [false, true]
        exclude:
          - php: '7.4'
            wp: 'latest'

    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: ${{ matrix.php }}

      - name: Install dependencies
        run: composer install --no-progress

      - name: Setup WordPress
        run: |
          bash bin/install-wp-tests.sh wp_test root '' localhost ${{ matrix.wp }}

      - name: Run tests
        run: vendor/bin/phpunit
        env:
          WP_MULTISITE: ${{ matrix.multisite && '1' || '' }}

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Start WordPress
        run: npx wp-env start

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload traces
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-traces
          path: test-results/
          retention-days: 7

  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx wp-env start
      - run: npx playwright test tests/visual/

      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: visual-diffs
          path: tests/visual/snapshots/
```

---

## 🚀 Caching Strategies

### Composer Cache

```yaml
- name: Get Composer cache dir
  id: composer-cache
  run: echo "dir=$(composer config cache-files-dir)" >> $GITHUB_OUTPUT

- name: Cache Composer dependencies
  uses: actions/cache@v4
  with:
    path: ${{ steps.composer-cache.outputs.dir }}
    key: composer-${{ runner.os }}-${{ matrix.php }}-${{ hashFiles('composer.lock') }}
    restore-keys: |
      composer-${{ runner.os }}-${{ matrix.php }}-
      composer-${{ runner.os }}-
```

### npm Cache

```yaml
- name: Setup Node with cache
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

### Build Cache

```yaml
- name: Cache build
  uses: actions/cache@v4
  with:
    path: build
    key: build-${{ hashFiles('src/**', 'webpack.config.js') }}
```

---

## 📊 Matrix Configuration

### Full Matrix Example

```yaml
strategy:
  fail-fast: false
  matrix:
    php: ['7.4', '8.0', '8.1', '8.2', '8.3']
    wp: ['6.4', '6.5', 'latest']
    multisite: [false, true]
    locale: ['en_US', 'ar']

    include:
      # Add specific combination
      - php: '8.4'
        wp: 'latest'
        multisite: true
        locale: 'he_IL'
```

### Reduced Matrix for PRs

```yaml
strategy:
  matrix:
    include:
      - php: '7.4'
        wp: '6.4'
      - php: '8.2'
        wp: 'latest'
      - php: '8.3'
        wp: 'latest'
        multisite: true
```

---

## 📦 Artifact Handling

```yaml
- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: test-results-${{ matrix.php }}-${{ matrix.wp }}
    path: |
      coverage.xml
      junit.xml
    retention-days: 14

- name: Upload on failure only
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: debug-logs
    path: |
      /tmp/wordpress/wp-content/debug.log
      tests/e2e/traces/
    retention-days: 7
```

---

## ⚡ Performance Tips

### Parallel Jobs

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    # Fast, run first
  phpstan:
    runs-on: ubuntu-latest
    # Fast, run in parallel with lint
  test-unit:
    needs: [lint, phpstan]
    # Run after lint/phpstan pass
  test-integration:
    needs: [lint, phpstan]
    # Run in parallel with unit tests
  e2e:
    needs: [test-unit, test-integration]
    # Run after other tests
```

### Reusable Workflows

```yaml
# .github/workflows/reusable-test.yml
name: Reusable Test

on:
  workflow_call:
    inputs:
      php-version:
        required: true
        type: string
      wp-version:
        required: true
        type: string

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # ... test steps

# Usage in main workflow
jobs:
  test-php74:
    uses: ./.github/workflows/reusable-test.yml
    with:
      php-version: '7.4'
      wp-version: '6.4'
```
