# 🔍 Linting and Static Analysis

> **Type**: Specialist
> **Domain**: Code Quality
> **Authority**: PHPCS, PHPStan, ESLint, stylelint configuration

## 🎯 Mission

Configure and maintain static analysis tools for WordPress development. Own PHPCS/WPCS configuration, PHPStan levels, ESLint rules, and stylelint for consistent code quality.

## 📥 Inputs

- Codebase standards
- WordPress coding standards version
- Error tolerance levels
- Framework requirements

## 📤 Outputs

- Tool configurations
- Custom rules
- Baseline files
- CI integration

---

## 🔧 When to Use

✅ **Use this agent when:**
- Setting up new projects
- Upgrading coding standards
- Adding custom rules
- Configuring PHPStan levels
- Creating baselines

❌ **Don't use for:**
- Security scanning
- Test configuration
- CI workflow design
- Code review

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Too strict initially | Start with baseline, improve |
| Ignoring too much | Review ignores regularly |
| Conflicting rules | Unified config strategy |
| Slow analysis | Incremental analysis |
| Stale baseline | Regenerate periodically |

---

## ✅ Checklist

### PHP Analysis
- [ ] PHPCS with WPCS installed
- [ ] Ruleset customized for project
- [ ] PHPStan configured
- [ ] Baseline created
- [ ] Auto-fix where possible

### JavaScript Analysis
- [ ] ESLint with WP config
- [ ] Prettier integration
- [ ] Import/export rules
- [ ] React/JSX rules (if applicable)

### CSS Analysis
- [ ] stylelint configured
- [ ] WP coding standards
- [ ] Property ordering
- [ ] Browser compatibility

### CI Integration
- [ ] All tools in CI
- [ ] Fail on errors
- [ ] Annotations working
- [ ] Cache configured

---

## 💬 Example Prompts

### Claude Code
```
@linting-and-static-analysis Set up PHPStan level 6 for our plugin
with WordPress stubs. Create a baseline for existing errors.
```

### Cursor
```
Using linting-and-static-analysis, upgrade our PHPCS to WPCS 3.0.
Update the ruleset and fix any new violations.
```

### GitHub Copilot
```
# Linting Task: JavaScript Standards
#
# Configure ESLint for:
# - WordPress/Gutenberg standards
# - React JSX
# - Import sorting
# - Prettier integration
#
# Include: config file, CI integration
```

### General Prompt
```
Set up complete static analysis:
1. PHPCS with WPCS 3.0
2. PHPStan level 6
3. ESLint with WordPress config
4. stylelint for CSS
5. Pre-commit hooks
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [github-actions-architect](github-actions-architect.md) | CI integration |
| [reporting-and-artifacts](reporting-and-artifacts.md) | Report formats |
| [wp-security-patterns](../security/wp-security-patterns.md) | Security rules |
| [contributing-and-pr-gates](../dx/contributing-and-pr-gates.md) | PR requirements |

---

## 📋 PHPCS Configuration

### WordPress Coding Standards

```xml
<?xml version="1.0"?>
<ruleset name="My Plugin">
    <description>Custom ruleset for My Plugin</description>

    <!-- What to scan -->
    <file>.</file>
    <exclude-pattern>/vendor/</exclude-pattern>
    <exclude-pattern>/node_modules/</exclude-pattern>
    <exclude-pattern>/build/</exclude-pattern>
    <exclude-pattern>/tests/bootstrap.php</exclude-pattern>

    <!-- How to scan -->
    <arg value="sp"/>
    <arg name="basepath" value="."/>
    <arg name="colors"/>
    <arg name="extensions" value="php"/>
    <arg name="parallel" value="8"/>

    <!-- Rules -->
    <rule ref="WordPress">
        <!-- Allow short array syntax -->
        <exclude name="Generic.Arrays.DisallowShortArraySyntax"/>
    </rule>

    <!-- Use WordPress-Extra for plugins -->
    <rule ref="WordPress-Extra"/>

    <!-- Use WordPress-Docs for documentation standards -->
    <rule ref="WordPress-Docs"/>

    <!-- Text domain -->
    <rule ref="WordPress.WP.I18n">
        <properties>
            <property name="text_domain" type="array">
                <element value="my-plugin"/>
            </property>
        </properties>
    </rule>

    <!-- Prefixes -->
    <rule ref="WordPress.NamingConventions.PrefixAllGlobals">
        <properties>
            <property name="prefixes" type="array">
                <element value="my_plugin"/>
                <element value="My_Plugin"/>
            </property>
        </properties>
    </rule>

    <!-- Minimum WP version -->
    <rule ref="WordPress.WP.DeprecatedFunctions">
        <properties>
            <property name="minimum_wp_version" value="6.0"/>
        </properties>
    </rule>

    <!-- Allow specific violations -->
    <rule ref="WordPress.Files.FileName">
        <properties>
            <property name="strict_class_file_names" value="false"/>
        </properties>
    </rule>
</ruleset>
```

### Composer Setup

```json
{
    "require-dev": {
        "wp-coding-standards/wpcs": "^3.0",
        "phpcsstandards/phpcsutils": "^1.0",
        "phpcsstandards/phpcsextra": "^1.0",
        "dealerdirect/phpcodesniffer-composer-installer": "^1.0"
    },
    "scripts": {
        "lint": "phpcs",
        "lint:fix": "phpcbf"
    }
}
```

---

## 🔬 PHPStan Configuration

### phpstan.neon.dist

```neon
includes:
    - vendor/phpstan/phpstan/conf/bleedingEdge.neon
    - vendor/szepeviktor/phpstan-wordpress/extension.neon

parameters:
    level: 6

    paths:
        - my-plugin.php
        - includes/

    excludePaths:
        - vendor/
        - node_modules/
        - build/

    scanDirectories:
        - vendor/

    bootstrapFiles:
        - tests/phpstan-bootstrap.php

    ignoreErrors:
        # Known issues to ignore
        - '#Call to an undefined method WP_Error::#'

    # WordPress specific
    dynamicConstantNames:
        - ABSPATH
        - WP_DEBUG

    # Treat deprecations as errors
    treatPhpDocTypesAsCertain: false
```

### WordPress Stubs Bootstrap

```php
// tests/phpstan-bootstrap.php
<?php

define( 'ABSPATH', '/tmp/wordpress/' );
define( 'WP_DEBUG', true );
define( 'MY_PLUGIN_VERSION', '1.0.0' );
```

### PHPStan Baseline

```bash
# Generate baseline
vendor/bin/phpstan analyze --generate-baseline

# Use baseline
# Add to phpstan.neon:
# includes:
#     - phpstan-baseline.neon
```

---

## 📜 ESLint Configuration

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
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        // Customize rules
        'no-console': ['error', { allow: ['warn', 'error'] }],
        '@wordpress/no-unsafe-wp-apis': 'warn',
    },
    overrides: [
        {
            files: ['**/*.test.js', '**/*.spec.js'],
            env: {
                jest: true,
            },
        },
    ],
};
```

### Package.json Scripts

```json
{
    "scripts": {
        "lint:js": "eslint src/",
        "lint:js:fix": "eslint src/ --fix",
        "lint:css": "stylelint 'src/**/*.css'",
        "lint:css:fix": "stylelint 'src/**/*.css' --fix",
        "lint": "npm run lint:js && npm run lint:css",
        "lint:fix": "npm run lint:js:fix && npm run lint:css:fix"
    },
    "devDependencies": {
        "@wordpress/eslint-plugin": "^17.0.0",
        "eslint": "^8.0.0",
        "stylelint": "^16.0.0",
        "stylelint-config-wordpress": "^0.16.0"
    }
}
```

---

## 🎨 stylelint Configuration

### .stylelintrc.json

```json
{
    "extends": [
        "@wordpress/stylelint-config/scss"
    ],
    "rules": {
        "selector-class-pattern": null,
        "no-descending-specificity": null,
        "font-family-no-missing-generic-family-keyword": null
    },
    "ignoreFiles": [
        "build/**",
        "node_modules/**",
        "vendor/**"
    ]
}
```

---

## ⚙️ CI Integration

```yaml
# .github/workflows/lint.yml
name: Lint

on:
  push:
    branches: [main]
  pull_request:

jobs:
  php:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          tools: cs2pr

      - name: Cache Composer
        uses: actions/cache@v4
        with:
          path: ~/.composer/cache
          key: composer-${{ hashFiles('composer.lock') }}

      - name: Install dependencies
        run: composer install --no-progress

      - name: Run PHPCS
        run: vendor/bin/phpcs --report=checkstyle | cs2pr

      - name: Run PHPStan
        run: vendor/bin/phpstan analyze --error-format=github

  js:
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

      - name: Run ESLint
        run: npx eslint src/ --format=stylish

      - name: Run stylelint
        run: npx stylelint 'src/**/*.css'
```

---

## 🪝 Pre-commit Hooks

### Using lint-staged

```json
// package.json
{
    "lint-staged": {
        "*.php": [
            "vendor/bin/phpcs --report=summary"
        ],
        "*.{js,jsx}": [
            "eslint --fix",
            "prettier --write"
        ],
        "*.css": [
            "stylelint --fix"
        ]
    },
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    }
}
```

### Using pre-commit

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: phpcs
        name: PHPCS
        entry: vendor/bin/phpcs
        language: system
        types: [php]
        pass_filenames: true

      - id: phpstan
        name: PHPStan
        entry: vendor/bin/phpstan analyze --no-progress
        language: system
        types: [php]
        pass_filenames: false

  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v8.56.0
    hooks:
      - id: eslint
        files: \.(js|jsx)$
        additional_dependencies:
          - "@wordpress/eslint-plugin"
```
