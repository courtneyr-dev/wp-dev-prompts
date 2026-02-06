# WordPress Testing Infrastructure Setup Guide

Complete step-by-step guide to set up automated testing for WordPress plugins and themes. This guide will take you from zero to a production-ready testing pipeline.

**Time to complete**: 2-4 hours for initial setup
**Prerequisites**: Node.js 20+, PHP 8.2+, Composer 2+, Git

---

## Table of Contents

1. [Quick Start (TL;DR)](#quick-start-tldr)
2. [Step 1: Project Initialization](#step-1-project-initialization)
3. [Step 2: PHP Testing Setup](#step-2-php-testing-setup)
4. [Step 3: JavaScript Testing Setup](#step-3-javascript-testing-setup)
5. [Step 4: Local Development Environment](#step-4-local-development-environment)
6. [Step 5: Pre-commit Hooks](#step-5-pre-commit-hooks)
7. [Step 6: GitHub Actions CI](#step-6-github-actions-ci)
8. [Step 7: Dependabot Configuration](#step-7-dependabot-configuration)
9. [Configuration File Templates](#configuration-file-templates)
10. [Troubleshooting](#troubleshooting)

---

## Quick Start (TL;DR)

```bash
# 1. Install dependencies
composer require --dev \
  phpunit/phpunit:^9.6 \
  yoast/phpunit-polyfills:^2.0 \
  squizlabs/php_codesniffer:^3.9 \
  wp-coding-standards/wpcs:^3.0 \
  phpstan/phpstan:^2.0 \
  szepeviktor/phpstan-wordpress:^2.0

npm install --save-dev \
  @wordpress/scripts@latest \
  @wordpress/env@latest

# 2. Copy configuration files (see templates below)
# - composer.json
# - phpunit.xml.dist
# - .phpcs.xml.dist
# - phpstan.neon
# - package.json
# - .wp-env.json

# 3. Initialize test suite
bash bin/install-wp-tests.sh wordpress_test root root localhost latest

# 4. Set up pre-commit hooks
npm install --save-dev husky lint-staged
npx husky init

# 5. Copy GitHub Actions workflows
# - .github/workflows/ci.yml
# - .github/dependabot.yml

# 6. Run tests
composer test
npm test
```

---

## Step 1: Project Initialization

### 1.1 Verify Prerequisites

```bash
# Check versions
php --version    # Should be 8.0+
node --version   # Should be 20+
composer --version  # Should be 2+
git --version
```

### 1.2 Initialize Composer (if not already done)

```bash
composer init

# Or create basic composer.json manually
```

### 1.3 Initialize npm (if not already done)

```bash
npm init -y
```

### 1.4 Create .gitignore

```bash
cat > .gitignore << 'EOF'
# WordPress
wp-config.php
wp-content/uploads/
wp-content/cache/
wp-content/backups/

# Dependencies
/vendor/
/node_modules/

# Build files
/build/
/dist/

# Testing
/tmp/
/tests/tmp/
/coverage/
/.phpunit.result.cache
/.phpcs.cache
/phpstan.neon.baseline

# Environment
.env
.env.local
.wp-env.json.local
.wp-env.override.json

# IDEs
.vscode/
.idea/
*.sublime-project
*.sublime-workspace
.DS_Store

# Logs
*.log
npm-debug.log*
error_log
debug.log
EOF
```

---

## Step 2: PHP Testing Setup

### 2.1 Install PHP Dependencies

```bash
# Testing framework
composer require --dev phpunit/phpunit:^9.6
composer require --dev yoast/phpunit-polyfills:^2.0
composer require --dev wp-phpunit/wp-phpunit:^6.7

# Mocking libraries (choose one or both)
composer require --dev 10up/wp_mock:^1.1
composer require --dev brain/monkey:^2.6

# Code standards
composer require --dev squizlabs/php_codesniffer:^3.9
composer require --dev wp-coding-standards/wpcs:^3.0
composer require --dev phpcompatibility/phpcompatibility-wp:^3.0@dev
composer require --dev dealerdirect/phpcodesniffer-composer-installer:^1.0

# Static analysis
composer require --dev phpstan/phpstan:^2.0
composer require --dev szepeviktor/phpstan-wordpress:^2.0
composer require --dev phpstan/phpstan-deprecation-rules:^2.0

# Optional: Psalm for additional security analysis
composer require --dev vimeo/psalm:^5.0
composer require --dev humanmade/psalm-plugin-wordpress:^3.1

# Security
composer require --dev roave/security-advisories:dev-latest
```

### 2.2 Create phpunit.xml.dist

See [Configuration File Templates](#phpunitxmldist) below.

### 2.3 Create .phpcs.xml.dist

See [Configuration File Templates](#phpcsxmldist) below.

### 2.4 Create phpstan.neon

See [Configuration File Templates](#phpstanneon) below.

### 2.5 Create tests/bootstrap.php

```bash
mkdir -p tests/unit tests/integration

cat > tests/bootstrap.php << 'EOF'
<?php
/**
 * PHPUnit bootstrap file.
 */

// Composer autoloader
require_once dirname(__DIR__) . '/vendor/autoload.php';

// WordPress tests directory
$_tests_dir = getenv('WP_TESTS_DIR');
if (!$_tests_dir) {
    $_tests_dir = rtrim(sys_get_temp_dir(), '/\\') . '/wordpress-tests-lib';
}

// Polyfills path for PHPUnit compatibility
if (file_exists(dirname(__DIR__) . '/vendor/yoast/phpunit-polyfills/phpunitpolyfills-autoload.php')) {
    define('WP_TESTS_PHPUNIT_POLYFILLS_PATH', dirname(__DIR__) . '/vendor/yoast/phpunit-polyfills/');
}

// Give access to tests_add_filter() function
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
    // Update this path to your main plugin file
    require dirname(__DIR__) . '/your-plugin.php';
}

tests_add_filter('muplugins_loaded', '_manually_load_plugin');

// Start up the WP testing environment
require $_tests_dir . '/includes/bootstrap.php';
EOF
```

### 2.6 Install WordPress Test Suite

```bash
# Create installation script
mkdir -p bin

curl -o bin/install-wp-tests.sh \
  https://raw.githubusercontent.com/wp-cli/scaffold-command/master/templates/install-wp-tests.sh

chmod +x bin/install-wp-tests.sh

# Install test suite (adjust database credentials as needed)
bash bin/install-wp-tests.sh wordpress_test root root localhost latest
```

### 2.7 Create Your First Test

```bash
cat > tests/unit/ExampleTest.php << 'EOF'
<?php
/**
 * Example test case.
 */

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase {
    public function test_wordpress_is_loaded() {
        $this->assertTrue(function_exists('add_action'));
    }

    public function test_plugin_is_loaded() {
        // Update this to test your plugin is loaded
        $this->assertTrue(function_exists('your_plugin_init'));
    }
}
EOF
```

### 2.8 Add Composer Scripts

Add to `composer.json`:

```json
{
  "scripts": {
    "test": "phpunit",
    "test:unit": "phpunit --testsuite=unit",
    "test:integration": "phpunit --testsuite=integration",
    "lint": "phpcs",
    "lint:fix": "phpcbf",
    "analyze": "phpstan analyse",
    "analyze:baseline": "phpstan analyse --generate-baseline",
    "security": "composer audit",
    "full-check": [
      "@lint",
      "@analyze",
      "@test",
      "@security"
    ]
  }
}
```

### 2.9 Test PHP Setup

```bash
# Run linting
composer lint

# Run static analysis
composer analyze

# Run tests
composer test

# Run everything
composer full-check
```

---

## Step 3: JavaScript Testing Setup

### 3.1 Install npm Dependencies

```bash
# WordPress scripts (includes webpack, babel, eslint, jest, etc.)
npm install --save-dev @wordpress/scripts@latest

# WordPress environment
npm install --save-dev @wordpress/env@latest

# Testing utilities
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event

# E2E testing
npm install --save-dev @playwright/test
npm install --save-dev @axe-core/playwright

# Accessibility testing
npm install --save-dev @lhci/cli

# Pre-commit hooks
npm install --save-dev husky lint-staged prettier
```

### 3.2 Create .eslintrc.js

See [Configuration File Templates](#eslintrcjs) below.

### 3.3 Create .stylelintrc.json

See [Configuration File Templates](#stylelintrcjson) below.

### 3.4 Create jest.config.js (if custom config needed)

```javascript
module.exports = {
    preset: '@wordpress/jest-preset-default',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/js/setup.js'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.test.{js,jsx,ts,tsx}',
        '!src/**/test/**',
    ],
    coverageThresholds: {
        global: {
            branches: 60,
            functions: 60,
            lines: 60,
            statements: 60,
        },
    },
};
```

### 3.5 Create Playwright Configuration

```bash
npx playwright install

cat > playwright.config.js << 'EOF'
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        baseURL: 'http://localhost:8888',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

    webServer: {
        command: 'npm run env:start',
        url: 'http://localhost:8888',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
EOF
```

### 3.6 Add npm Scripts

Update `package.json`:

```json
{
  "scripts": {
    "build": "wp-scripts build",
    "build:prod": "wp-scripts build --mode=production",
    "start": "wp-scripts start",

    "lint": "npm run lint:js && npm run lint:css && npm run lint:pkg-json",
    "lint:js": "wp-scripts lint-js src/",
    "lint:js:fix": "wp-scripts lint-js src/ --fix",
    "lint:css": "wp-scripts lint-style 'src/**/*.{css,scss}'",
    "lint:css:fix": "wp-scripts lint-style 'src/**/*.{css,scss}' --fix",
    "lint:pkg-json": "wp-scripts lint-pkg-json",

    "format": "wp-scripts format",
    "typecheck": "tsc --noEmit",

    "test": "npm run test:unit",
    "test:unit": "wp-scripts test-unit-js",
    "test:unit:watch": "wp-scripts test-unit-js --watch",
    "test:unit:coverage": "wp-scripts test-unit-js --coverage",

    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",

    "test:visual": "playwright test tests/visual/ --update-snapshots",
    "test:a11y": "playwright test tests/accessibility/",

    "env:start": "wp-env start",
    "env:stop": "wp-env stop",
    "env:clean": "wp-env clean",
    "env:cli": "wp-env run cli wp",
    "env:logs": "wp-env logs",

    "packages-update": "wp-scripts packages-update",
    "plugin-zip": "wp-scripts plugin-zip",

    "prepare": "husky"
  }
}
```

### 3.7 Test JavaScript Setup

```bash
# Lint JavaScript
npm run lint:js

# Lint CSS
npm run lint:css

# Run unit tests
npm run test:unit

# Build
npm run build
```

---

## Step 4: Local Development Environment

### 4.1 Create .wp-env.json

See [Configuration File Templates](#wp-envjson) below.

### 4.2 Start WordPress Environment

```bash
# Start environment
npm run env:start

# Wait for it to be ready
# Access: http://localhost:8888
# Admin: http://localhost:8888/wp-admin
# Username: admin
# Password: password

# Activate your plugin
npm run env:cli -- plugin activate your-plugin-slug

# Import test data (optional)
npm run env:cli -- plugin install wordpress-importer --activate
npm run env:cli -- import tests/data/test-content.xml --authors=create
```

### 4.3 Verify Environment

```bash
# Check WordPress version
npm run env:cli -- core version

# Check active plugins
npm run env:cli -- plugin list

# View logs
npm run env:logs
```

---

## Step 5: Pre-commit Hooks

### 5.1 Initialize Husky

```bash
npx husky init
```

### 5.2 Create Pre-commit Hook

```bash
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# PHP linting on staged files
STAGED_PHP=$(git diff --cached --name-only --diff-filter=ACM | grep '\.php$')
if [ -n "$STAGED_PHP" ]; then
    echo "📝 Checking PHP files with PHPCS..."
    ./vendor/bin/phpcs --standard=WordPress $STAGED_PHP
    if [ $? -ne 0 ]; then
        echo "❌ PHPCS found issues. Run 'composer lint:fix' to auto-fix."
        exit 1
    fi
fi

# Run lint-staged for JS/CSS
echo "📝 Checking JavaScript and CSS files..."
npx lint-staged

echo "✅ Pre-commit checks passed!"
EOF

chmod +x .husky/pre-commit
```

### 5.3 Create .lintstagedrc.json

See [Configuration File Templates](#lintstagedrcjson) below.

### 5.4 Test Pre-commit Hook

```bash
# Make a change
echo "// test" >> src/test.js

# Stage it
git add src/test.js

# Try to commit (hooks will run)
git commit -m "test commit"
```

---

## Step 6: GitHub Actions CI

### 6.1 Create Workflow Directory

```bash
mkdir -p .github/workflows
```

### 6.2 Copy Workflow Files

Copy the following workflow files from the `github-workflows/` directory:

1. **wordpress-plugin-ci.yml** - Main CI/CD workflow
2. **visual-regression-testing.yml** - Visual regression tests
3. **dependabot-auto-merge.yml** - Auto-merge safe Dependabot PRs

```bash
cp github-workflows/wordpress-plugin-ci.yml .github/workflows/ci.yml
cp github-workflows/visual-regression-testing.yml .github/workflows/visual-regression.yml
cp github-workflows/dependabot-auto-merge.yml .github/workflows/dependabot-auto-merge.yml
```

### 6.3 Customize Workflows

Edit `.github/workflows/ci.yml` and update:

1. **PHP versions**: Adjust the matrix to your supported versions
2. **WordPress versions**: Test against your minimum supported version
3. **Plugin name**: Update references to your plugin slug
4. **Text domain**: Update i18n checks
5. **Paths**: Adjust source paths if different from defaults

### 6.4 Set Up GitHub Secrets

Add these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

**Required for deployment:**
- `SVN_USERNAME` - WordPress.org SVN username
- `SVN_PASSWORD` - WordPress.org SVN password
- `PLUGIN_SLUG` - Your plugin slug on WordPress.org

**Optional:**
- `CODECOV_TOKEN` - Codecov token for coverage reporting
- `SLACK_WEBHOOK_URL` - Slack webhook for notifications
- `LHCI_GITHUB_APP_TOKEN` - Lighthouse CI token

### 6.5 Test Workflow

```bash
# Create a test branch
git checkout -b test-ci

# Make a small change
echo "# Test" >> README.md

# Commit and push
git add README.md
git commit -m "test: CI workflow"
git push origin test-ci

# Create a PR on GitHub and watch the workflows run
```

---

## Step 7: Dependabot Configuration

### 7.1 Copy Dependabot Configuration

```bash
mkdir -p .github

cp .github/dependabot.yml .github/dependabot.yml
```

### 7.2 Customize Configuration

Edit `.github/dependabot.yml` and adjust:

1. **Update schedule**: Change day/time if needed
2. **Ignore rules**: Add packages to ignore if they cause issues
3. **Grouping**: Adjust package grouping strategies
4. **Reviewers**: Add GitHub usernames for review assignments

### 7.3 Enable Dependabot

1. Go to repository Settings → Security → Code security and analysis
2. Enable "Dependabot security updates"
3. Enable "Dependabot alerts"
4. Dependabot will start creating PRs for updates

### 7.4 Configure Auto-merge (Optional)

The `dependabot-auto-merge.yml` workflow will automatically merge:
- All patch updates (after CI passes)
- Minor updates to dev dependencies (after CI passes)

Major updates and production dependency minor updates require manual review.

---

## Configuration File Templates

### phpunit.xml.dist

```xml
<?xml version="1.0"?>
<phpunit
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/9.6/phpunit.xsd"
    bootstrap="tests/bootstrap.php"
    backupGlobals="false"
    colors="true"
    convertErrorsToExceptions="true"
    convertNoticesToExceptions="true"
    convertWarningsToExceptions="true"
    beStrictAboutTestsThatDoNotTestAnything="true"
    beStrictAboutOutputDuringTests="true"
>
    <testsuites>
        <testsuite name="unit">
            <directory suffix="Test.php">./tests/unit</directory>
        </testsuite>
        <testsuite name="integration">
            <directory suffix="Test.php">./tests/integration</directory>
        </testsuite>
    </testsuites>

    <coverage includeUncoveredFiles="true" processUncoveredFiles="true">
        <include>
            <directory suffix=".php">./src</directory>
            <directory suffix=".php">./includes</directory>
        </include>
        <exclude>
            <directory>./vendor</directory>
            <directory>./tests</directory>
            <directory>./node_modules</directory>
        </exclude>
        <report>
            <clover outputFile="coverage.xml"/>
            <html outputDirectory="coverage/html"/>
            <text outputFile="php://stdout" showUncoveredFiles="false"/>
        </report>
    </coverage>

    <php>
        <ini name="pcov.enabled" value="1"/>
        <ini name="pcov.directory" value="."/>
        <ini name="memory_limit" value="512M"/>
        <const name="WP_TESTS_PHPUNIT_POLYFILLS_PATH" value="./vendor/yoast/phpunit-polyfills/"/>
    </php>
</phpunit>
```

### .phpcs.xml.dist

```xml
<?xml version="1.0"?>
<ruleset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="WordPress Plugin Coding Standards" xsi:noNamespaceSchemaLocation="https://raw.githubusercontent.com/squizlabs/PHP_CodeSniffer/master/phpcs.xsd">

    <description>WordPress Coding Standards for Plugin</description>

    <!-- What to scan -->
    <file>./src</file>
    <file>./includes</file>
    <file>./your-plugin.php</file>

    <!-- Exclude patterns -->
    <exclude-pattern>*/vendor/*</exclude-pattern>
    <exclude-pattern>*/node_modules/*</exclude-pattern>
    <exclude-pattern>*/build/*</exclude-pattern>
    <exclude-pattern>*/tests/*</exclude-pattern>
    <exclude-pattern>*.asset.php</exclude-pattern>
    <exclude-pattern>*.min.js</exclude-pattern>

    <!-- Arguments -->
    <arg name="extensions" value="php"/>
    <arg name="colors"/>
    <arg value="sp"/> <!-- Show sniff codes and progress -->
    <arg name="parallel" value="8"/> <!-- Parallel processing -->
    <arg name="cache" value=".phpcs.cache"/> <!-- Cache for faster subsequent runs -->

    <!-- Rules -->
    <rule ref="WordPress-Extra">
        <!-- Allow array short syntax -->
        <exclude name="Generic.Arrays.DisallowShortArraySyntax"/>
        <exclude name="Universal.Arrays.DisallowShortArraySyntax"/>
    </rule>

    <rule ref="WordPress-Docs"/>

    <!-- Minimum WordPress version -->
    <config name="minimum_supported_wp_version" value="6.5"/>

    <!-- PHP version compatibility -->
    <config name="testVersion" value="8.0-"/>
    <rule ref="PHPCompatibilityWP"/>

    <!-- Internationalization -->
    <rule ref="WordPress.WP.I18n">
        <properties>
            <property name="text_domain" type="array">
                <element value="your-plugin-textdomain"/>
            </property>
        </properties>
    </rule>

    <!-- Prefix all globals -->
    <rule ref="WordPress.NamingConventions.PrefixAllGlobals">
        <properties>
            <property name="prefixes" type="array">
                <element value="your_plugin"/>
                <element value="YOUR_PLUGIN"/>
            </property>
        </properties>
    </rule>

    <!-- Security sniffs (enforce as errors) -->
    <rule ref="WordPress.Security.EscapeOutput"/>
    <rule ref="WordPress.Security.ValidatedSanitizedInput"/>
    <rule ref="WordPress.Security.NonceVerification"/>
    <rule ref="WordPress.DB.PreparedSQL"/>
    <rule ref="WordPress.DB.PreparedSQLPlaceholders"/>

    <!-- Allow short ternary -->
    <rule ref="WordPress.PHP.DisallowShortTernary">
        <severity>0</severity>
    </rule>

</ruleset>
```

### phpstan.neon

```yaml
includes:
    - vendor/szepeviktor/phpstan-wordpress/extension.neon

parameters:
    level: 5

    paths:
        - src/
        - includes/
        - your-plugin.php

    excludePaths:
        - vendor/
        - node_modules/
        - tests/
        - build/

    parallel:
        maximumNumberOfProcesses: 8

    # WordPress-specific
    checkMissingIterableValueType: false
    reportUnmatchedIgnoredErrors: true

    # Ignore common WordPress dynamic patterns
    ignoreErrors:
        - '#Call to an undefined method WP_[a-zA-Z_]+::[a-zA-Z_]+\(\)#'
        - '#Function apply_filters invoked with#'
        - '#Function do_action invoked with#'
```

### .eslintrc.js

```javascript
module.exports = {
    root: true,
    extends: [
        'plugin:@wordpress/eslint-plugin/recommended',
    ],
    env: {
        browser: true,
        es2021: true,
    },
    globals: {
        wp: 'readonly',
        jQuery: 'readonly',
        ajaxurl: 'readonly',
    },
    rules: {
        '@wordpress/i18n-text-domain': [
            'error',
            {
                allowedTextDomain: 'your-plugin-textdomain',
            },
        ],
        '@wordpress/no-unsafe-wp-apis': 'error',
        '@wordpress/dependency-group': 'error',
    },
    overrides: [
        {
            files: ['**/*.test.js', '**/*.spec.js'],
            extends: ['plugin:@wordpress/eslint-plugin/test-unit'],
            env: {
                jest: true,
            },
        },
        {
            files: ['tests/e2e/**/*.js'],
            extends: ['plugin:@wordpress/eslint-plugin/test-e2e'],
            env: {
                node: true,
            },
        },
    ],
};
```

### .stylelintrc.json

```json
{
    "extends": ["@wordpress/stylelint-config/scss"],
    "rules": {
        "indentation": "tab",
        "selector-class-pattern": [
            "^[a-z][a-z0-9]*(-[a-z0-9]+)*$|^wp-block-[a-z][a-z0-9]*(-[a-z0-9]+)*$",
            {
                "message": "Expected class selector to be kebab-case or wp-block-* pattern"
            }
        ],
        "no-descending-specificity": null,
        "font-weight-notation": null
    },
    "ignoreFiles": [
        "build/**",
        "node_modules/**",
        "**/*.min.css"
    ]
}
```

### .wp-env.json

```json
{
    "core": "WordPress/WordPress#6.7",
    "phpVersion": "8.2",
    "plugins": [
        ".",
        "https://downloads.wordpress.org/plugin/query-monitor.zip"
    ],
    "themes": [
        "https://downloads.wordpress.org/theme/twentytwentyfive.zip"
    ],
    "port": 8888,
    "testsPort": 8889,
    "config": {
        "WP_DEBUG": true,
        "WP_DEBUG_LOG": true,
        "WP_DEBUG_DISPLAY": false,
        "SCRIPT_DEBUG": true,
        "WP_ENVIRONMENT_TYPE": "development",
        "WP_PHP_BINARY": "php",
        "WP_TESTS_EMAIL": "admin@example.org",
        "WP_TESTS_TITLE": "Test Site",
        "WP_TESTS_DOMAIN": "localhost"
    },
    "env": {
        "development": {
            "themes": [
                "https://downloads.wordpress.org/theme/twentytwentyfive.zip"
            ]
        },
        "tests": {
            "phpVersion": "8.1",
            "config": {
                "WP_DEBUG": false
            }
        }
    },
    "mappings": {
        "wp-content/uploads": "./tests/uploads"
    }
}
```

### .lintstagedrc.json

```json
{
    "*.{js,jsx,ts,tsx}": [
        "wp-scripts lint-js --fix",
        "prettier --write"
    ],
    "*.{css,scss}": [
        "wp-scripts lint-style --fix"
    ],
    "*.php": [
        "./vendor/bin/phpcbf --standard=WordPress"
    ],
    "*.md": [
        "prettier --write"
    ]
}
```

---

## Troubleshooting

### Issue: "WordPress test suite not found"

**Solution:**
```bash
# Reinstall test suite
rm -rf /tmp/wordpress-tests-lib /tmp/wordpress
bash bin/install-wp-tests.sh wordpress_test root root localhost latest
```

### Issue: "PHPCS: ERROR: Referenced sniff WordPress does not exist"

**Solution:**
```bash
# Reinstall PHPCS and WPCS
composer remove squizlabs/php_codesniffer wp-coding-standards/wpcs
composer require --dev squizlabs/php_codesniffer:^3.9 wp-coding-standards/wpcs:^3.0
```

### Issue: "wp-env: Port 8888 already in use"

**Solution:**
```bash
# Stop existing wp-env
npm run env:stop

# Or change ports in .wp-env.json
{
    "port": 8890,
    "testsPort": 8891
}
```

### Issue: "PHPUnit: Class WP_UnitTestCase not found"

**Solution:**
```bash
# Ensure WP_TESTS_DIR is set
export WP_TESTS_DIR=/tmp/wordpress-tests-lib

# Or add to tests/bootstrap.php:
$_tests_dir = getenv('WP_TESTS_DIR') ?: '/tmp/wordpress-tests-lib';
```

### Issue: "GitHub Actions: Tests timing out"

**Solution:**
```yaml
# Increase timeout in workflow
jobs:
  phpunit:
    timeout-minutes: 30  # Default is 360
```

### Issue: "Memory exhausted" during tests

**Solution:**
```xml
<!-- Add to phpunit.xml.dist -->
<php>
    <ini name="memory_limit" value="512M"/>
</php>
```

### Issue: "Dependabot PRs not auto-merging"

**Solution:**
1. Check that CI passes on the PR
2. Verify the workflow has correct permissions:
```yaml
permissions:
  contents: write
  pull-requests: write
```
3. Enable auto-merge in repository settings

---

## Next Steps

Once your testing infrastructure is set up:

1. **Write tests for existing code**
   - Start with critical functionality
   - Aim for 60%+ code coverage
   - Add tests for all new features

2. **Increase PHPStan level gradually**
   - Start at level 5
   - Fix issues incrementally
   - Work towards level 8-9

3. **Set up Codecov**
   - Create account at codecov.io
   - Add CODECOV_TOKEN to GitHub secrets
   - Monitor coverage trends

4. **Add accessibility tests**
   - Write Playwright tests with axe-core
   - Test keyboard navigation manually
   - Aim for WCAG 2.1 AA compliance

5. **Add performance monitoring**
   - Set up Lighthouse CI
   - Define performance budgets
   - Monitor bundle sizes

6. **Document your testing process**
   - Create CONTRIBUTING.md with testing requirements
   - Document how to run tests locally
   - Add testing guidelines for contributors

---

## Additional Resources

- [WordPress Plugin Handbook - Testing](https://developer.wordpress.org/plugins/testing/)
- [WP-CLI Testing Framework](https://make.wordpress.org/cli/handbook/plugin-unit-tests/)
- [@wordpress/scripts Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- [PHPUnit Documentation](https://phpunit.de/documentation.html)
- [PHPStan Rules](https://phpstan.org/rules)
- [Playwright Documentation](https://playwright.dev/)

---

**Need help?** Check the [TESTING-AUTOMATION-PROMPTS.md](./TESTING-AUTOMATION-PROMPTS.md) for AI prompts to help with specific testing scenarios.
