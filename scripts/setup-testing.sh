#!/bin/bash

###############################################################################
# WordPress Plugin/Theme Testing Infrastructure Setup Script
#
# This script sets up a complete testing infrastructure for WordPress
# plugins and themes, including:
# - PHP testing (PHPUnit, PHPCS, PHPStan)
# - JavaScript testing (ESLint, Jest, Stylelint)
# - Local development environment (wp-env)
# - Pre-commit hooks (Husky)
# - GitHub Actions workflows
# - Dependabot configuration
#
# Usage: bash setup-testing.sh [options]
#
# Options:
#   --plugin-name=NAME     Name of your plugin/theme
#   --text-domain=DOMAIN   Text domain for i18n
#   --prefix=PREFIX        Function/variable prefix
#   --min-wp=VERSION       Minimum WordPress version (default: 6.5)
#   --min-php=VERSION      Minimum PHP version (default: 8.0)
#   --skip-composer        Skip Composer dependency installation
#   --skip-npm             Skip npm dependency installation
#   --skip-workflows       Skip GitHub Actions setup
#   --interactive          Interactive mode (asks questions)
#   --help                 Show this help message
#
# Example:
#   bash setup-testing.sh --plugin-name="My Plugin" --text-domain="my-plugin"
#
###############################################################################

set -euo pipefail  # Exit on error, undefined vars, and pipe failures

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
PLUGIN_NAME=""
TEXT_DOMAIN=""
PREFIX=""
MIN_WP_VERSION="6.5"
MIN_PHP_VERSION="8.0"
SKIP_COMPOSER=false
SKIP_NPM=false
SKIP_WORKFLOWS=false
INTERACTIVE=false

# Helper functions
print_header() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Parse command line arguments
for arg in "$@"; do
    case $arg in
        --plugin-name=*)
            PLUGIN_NAME="${arg#*=}"
            shift
            ;;
        --text-domain=*)
            TEXT_DOMAIN="${arg#*=}"
            shift
            ;;
        --prefix=*)
            PREFIX="${arg#*=}"
            shift
            ;;
        --min-wp=*)
            MIN_WP_VERSION="${arg#*=}"
            shift
            ;;
        --min-php=*)
            MIN_PHP_VERSION="${arg#*=}"
            shift
            ;;
        --skip-composer)
            SKIP_COMPOSER=true
            shift
            ;;
        --skip-npm)
            SKIP_NPM=true
            shift
            ;;
        --skip-workflows)
            SKIP_WORKFLOWS=true
            shift
            ;;
        --interactive)
            INTERACTIVE=true
            shift
            ;;
        --help)
            head -n 40 "$0" | tail -n 35
            exit 0
            ;;
        *)
            print_error "Unknown argument: $arg"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Interactive mode
if [ "$INTERACTIVE" = true ]; then
    print_header "Interactive Setup"

    read -p "Plugin/Theme name: " PLUGIN_NAME
    read -p "Text domain (default: ${PLUGIN_NAME,,}): " TEXT_DOMAIN
    TEXT_DOMAIN=${TEXT_DOMAIN:-${PLUGIN_NAME,,}}
    read -p "Function prefix (default: ${TEXT_DOMAIN//-/_}): " PREFIX
    PREFIX=${PREFIX:-${TEXT_DOMAIN//-/_}}
    read -p "Minimum WordPress version (default: 6.5): " input_wp
    MIN_WP_VERSION=${input_wp:-6.5}
    read -p "Minimum PHP version (default: 8.0): " input_php
    MIN_PHP_VERSION=${input_php:-8.0}
fi

# Validate required inputs
if [ -z "$PLUGIN_NAME" ]; then
    print_error "Plugin/Theme name is required"
    echo "Use --plugin-name=NAME or --interactive"
    exit 1
fi

# Set defaults from plugin name
TEXT_DOMAIN=${TEXT_DOMAIN:-${PLUGIN_NAME,,}}
TEXT_DOMAIN=${TEXT_DOMAIN// /-}  # Replace spaces with hyphens
PREFIX=${PREFIX:-${TEXT_DOMAIN//-/_}}

print_header "WordPress Testing Infrastructure Setup"
print_info "Plugin/Theme: $PLUGIN_NAME"
print_info "Text Domain: $TEXT_DOMAIN"
print_info "Prefix: $PREFIX"
print_info "Min WordPress: $MIN_WP_VERSION"
print_info "Min PHP: $MIN_PHP_VERSION"

# Check prerequisites
print_header "Checking Prerequisites"

command -v php >/dev/null 2>&1 || { print_error "PHP is not installed. Please install PHP 8.0+"; exit 1; }
command -v composer >/dev/null 2>&1 || { print_error "Composer is not installed. Please install Composer"; exit 1; }
command -v node >/dev/null 2>&1 || { print_error "Node.js is not installed. Please install Node.js 20+"; exit 1; }
command -v npm >/dev/null 2>&1 || { print_error "npm is not installed. Please install npm"; exit 1; }
command -v git >/dev/null 2>&1 || { print_error "Git is not installed. Please install Git"; exit 1; }

PHP_VERSION=$(php -r "echo PHP_VERSION;")
NODE_VERSION=$(node -v | cut -d 'v' -f 2)

print_success "PHP $PHP_VERSION"
print_success "Composer $(composer -V | cut -d ' ' -f 3)"
print_success "Node.js $NODE_VERSION"
print_success "npm $(npm -v)"

# Create directory structure
print_header "Creating Directory Structure"

mkdir -p tests/unit
mkdir -p tests/integration
mkdir -p tests/e2e
mkdir -p tests/visual
mkdir -p tests/accessibility
mkdir -p tests/data
mkdir -p bin
mkdir -p .github/workflows

print_success "Created test directories"

# Install Composer dependencies
if [ "$SKIP_COMPOSER" = false ]; then
    print_header "Installing PHP Dependencies"

    print_info "This may take a few minutes..."

    # Check if composer.json exists
    if [ ! -f "composer.json" ]; then
        print_info "Creating composer.json..."
        composer init --no-interaction --name="${TEXT_DOMAIN}/${TEXT_DOMAIN}" 2>/dev/null || true
    fi

    print_info "Installing testing framework..."
    composer require --dev phpunit/phpunit:^9.6 yoast/phpunit-polyfills:^2.0 wp-phpunit/wp-phpunit:^6.7 --no-interaction --quiet

    print_info "Installing code standards..."
    composer require --dev squizlabs/php_codesniffer:^3.9 wp-coding-standards/wpcs:^3.0 dealerdirect/phpcodesniffer-composer-installer:^1.0 --no-interaction --quiet

    print_info "Installing static analysis..."
    composer require --dev phpstan/phpstan:^2.0 szepeviktor/phpstan-wordpress:^2.0 --no-interaction --quiet

    print_info "Installing security advisories..."
    composer require --dev roave/security-advisories:dev-latest --no-interaction --quiet

    print_success "Composer dependencies installed"
else
    print_warning "Skipped Composer installation"
fi

# Install npm dependencies
if [ "$SKIP_NPM" = false ]; then
    print_header "Installing npm Dependencies"

    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_info "Creating package.json..."
        npm init -y >/dev/null 2>&1
    fi

    print_info "Installing WordPress scripts..."
    npm install --save-dev --silent @wordpress/scripts@latest @wordpress/env@latest

    print_info "Installing testing tools..."
    npm install --save-dev --silent @playwright/test @axe-core/playwright

    print_info "Installing pre-commit tools..."
    npm install --save-dev --silent husky lint-staged prettier

    print_success "npm dependencies installed"
else
    print_warning "Skipped npm installation"
fi

# Create configuration files
print_header "Creating Configuration Files"

# phpunit.xml.dist
if [ ! -f "phpunit.xml.dist" ]; then
    cat > phpunit.xml.dist << 'PHPUNIT_XML'
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
>
    <testsuites>
        <testsuite name="unit">
            <directory suffix="Test.php">./tests/unit</directory>
        </testsuite>
        <testsuite name="integration">
            <directory suffix="Test.php">./tests/integration</directory>
        </testsuite>
    </testsuites>
    <coverage includeUncoveredFiles="true">
        <include>
            <directory suffix=".php">./src</directory>
            <directory suffix=".php">./includes</directory>
        </include>
        <exclude>
            <directory>./vendor</directory>
            <directory>./tests</directory>
        </exclude>
    </coverage>
</phpunit>
PHPUNIT_XML
    print_success "Created phpunit.xml.dist"
else
    print_warning "phpunit.xml.dist already exists, skipping"
fi

# .phpcs.xml.dist
if [ ! -f ".phpcs.xml.dist" ]; then
    cat > .phpcs.xml.dist << PHPCS_XML
<?xml version="1.0"?>
<ruleset name="WordPress Plugin Standards">
    <description>WordPress Coding Standards</description>

    <file>./src</file>
    <file>./includes</file>

    <exclude-pattern>*/vendor/*</exclude-pattern>
    <exclude-pattern>*/node_modules/*</exclude-pattern>
    <exclude-pattern>*/build/*</exclude-pattern>
    <exclude-pattern>*/tests/*</exclude-pattern>

    <arg name="extensions" value="php"/>
    <arg name="colors"/>
    <arg value="sp"/>
    <arg name="parallel" value="8"/>
    <arg name="cache" value=".phpcs.cache"/>

    <rule ref="WordPress-Extra"/>
    <rule ref="WordPress-Docs"/>

    <config name="minimum_supported_wp_version" value="$MIN_WP_VERSION"/>
    <config name="testVersion" value="$MIN_PHP_VERSION-"/>
    <rule ref="PHPCompatibilityWP"/>

    <rule ref="WordPress.WP.I18n">
        <properties>
            <property name="text_domain" type="array">
                <element value="$TEXT_DOMAIN"/>
            </property>
        </properties>
    </rule>

    <rule ref="WordPress.NamingConventions.PrefixAllGlobals">
        <properties>
            <property name="prefixes" type="array">
                <element value="$PREFIX"/>
                <element value="${PREFIX^^}"/>
            </property>
        </properties>
    </rule>
</ruleset>
PHPCS_XML
    print_success "Created .phpcs.xml.dist"
else
    print_warning ".phpcs.xml.dist already exists, skipping"
fi

# phpstan.neon
if [ ! -f "phpstan.neon" ]; then
    cat > phpstan.neon << 'PHPSTAN_NEON'
includes:
    - vendor/szepeviktor/phpstan-wordpress/extension.neon

parameters:
    level: 5
    paths:
        - src/
        - includes/
    excludePaths:
        - vendor/
        - node_modules/
        - tests/
    parallel:
        maximumNumberOfProcesses: 8
    checkMissingIterableValueType: false
PHPSTAN_NEON
    print_success "Created phpstan.neon"
else
    print_warning "phpstan.neon already exists, skipping"
fi

# tests/bootstrap.php
if [ ! -f "tests/bootstrap.php" ]; then
    cat > tests/bootstrap.php << 'BOOTSTRAP_PHP'
<?php
/**
 * PHPUnit bootstrap file.
 */

require_once dirname(__DIR__) . '/vendor/autoload.php';

$_tests_dir = getenv('WP_TESTS_DIR') ?: '/tmp/wordpress-tests-lib';

if (file_exists(dirname(__DIR__) . '/vendor/yoast/phpunit-polyfills/phpunitpolyfills-autoload.php')) {
    define('WP_TESTS_PHPUNIT_POLYFILLS_PATH', dirname(__DIR__) . '/vendor/yoast/phpunit-polyfills/');
}

require_once $_tests_dir . '/includes/functions.php';

tests_add_filter('muplugins_loaded', function() {
    // Load your plugin here
    // require dirname(__DIR__) . '/your-plugin.php';
});

require $_tests_dir . '/includes/bootstrap.php';
BOOTSTRAP_PHP
    print_success "Created tests/bootstrap.php"
else
    print_warning "tests/bootstrap.php already exists, skipping"
fi

# .eslintrc.js
if [ ! -f ".eslintrc.js" ]; then
    cat > .eslintrc.js << ESLINTRC_JS
module.exports = {
    root: true,
    extends: ['plugin:@wordpress/eslint-plugin/recommended'],
    globals: {
        wp: 'readonly',
        jQuery: 'readonly',
    },
    rules: {
        '@wordpress/i18n-text-domain': [
            'error',
            { allowedTextDomain: '$TEXT_DOMAIN' }
        ],
    },
};
ESLINTRC_JS
    print_success "Created .eslintrc.js"
else
    print_warning ".eslintrc.js already exists, skipping"
fi

# .wp-env.json
if [ ! -f ".wp-env.json" ]; then
    cat > .wp-env.json << 'WPENV_JSON'
{
    "core": "WordPress/WordPress#6.7",
    "phpVersion": "8.2",
    "plugins": ["."],
    "port": 8888,
    "testsPort": 8889,
    "config": {
        "WP_DEBUG": true,
        "WP_DEBUG_LOG": true,
        "SCRIPT_DEBUG": true
    }
}
WPENV_JSON
    print_success "Created .wp-env.json"
else
    print_warning ".wp-env.json already exists, skipping"
fi

# Download WordPress test installation script
if [ ! -f "bin/install-wp-tests.sh" ]; then
    print_info "Downloading WordPress test installation script..."
    curl -s https://raw.githubusercontent.com/wp-cli/scaffold-command/master/templates/install-wp-tests.sh \
        -o bin/install-wp-tests.sh
    chmod +x bin/install-wp-tests.sh
    print_success "Downloaded bin/install-wp-tests.sh"
fi

# Set up Husky
if [ "$SKIP_NPM" = false ] && [ -d "node_modules" ]; then
    print_header "Setting Up Pre-commit Hooks"

    npx husky init >/dev/null 2>&1

    # Create pre-commit hook
    cat > .husky/pre-commit << 'PRECOMMIT'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# PHP files
STAGED_PHP=$(git diff --cached --name-only --diff-filter=ACM | grep '\.php$')
if [ -n "$STAGED_PHP" ]; then
    echo "📝 Checking PHP files..."
    ./vendor/bin/phpcs --standard=WordPress $STAGED_PHP || exit 1
fi

# JS/CSS files
npx lint-staged

echo "✅ Pre-commit checks passed!"
PRECOMMIT

    chmod +x .husky/pre-commit

    # Create .lintstagedrc.json
    cat > .lintstagedrc.json << 'LINTSTAGED'
{
    "*.{js,jsx,ts,tsx}": ["wp-scripts lint-js --fix"],
    "*.{css,scss}": ["wp-scripts lint-style --fix"]
}
LINTSTAGED

    print_success "Pre-commit hooks configured"
fi

# Copy GitHub Actions workflows
if [ "$SKIP_WORKFLOWS" = false ]; then
    print_header "Setting Up GitHub Actions"

    # Check if workflow templates exist in the repo
    WORKFLOW_DIR="templates/github-workflows"
    if [ -d "$WORKFLOW_DIR" ]; then
        cp "$WORKFLOW_DIR/wordpress-plugin-ci.yml" .github/workflows/ci.yml 2>/dev/null || print_warning "CI workflow template not found"
        cp "$WORKFLOW_DIR/visual-regression-testing.yml" .github/workflows/visual-regression.yml 2>/dev/null || print_warning "Visual regression workflow template not found"
        print_success "GitHub Actions workflows copied"
    else
        print_warning "Workflow templates not found. Please copy manually from templates/github-workflows/ directory"
    fi

    # Copy Dependabot config
    if [ -f ".github/dependabot.yml.template" ]; then
        cp .github/dependabot.yml.template .github/dependabot.yml
        print_success "Dependabot configuration copied"
    else
        print_warning "Dependabot template not found. Please create .github/dependabot.yml manually"
    fi
else
    print_warning "Skipped GitHub Actions setup"
fi

# Create .gitignore additions
print_header "Updating .gitignore"

cat >> .gitignore << 'GITIGNORE'

# Testing
/vendor/
/node_modules/
/.phpunit.result.cache
/.phpcs.cache
/coverage/
/tests/tmp/
/playwright-report/
/test-results/

# Environment
.wp-env.json.local
.wp-env.override.json
GITIGNORE

print_success "Updated .gitignore"

# Add npm scripts
print_header "Adding npm Scripts"

if command -v jq >/dev/null 2>&1; then
    # Use jq if available
    TMP_FILE=$(mktemp)
    jq '.scripts += {
        "lint:js": "wp-scripts lint-js",
        "lint:css": "wp-scripts lint-style",
        "test:unit": "wp-scripts test-unit-js",
        "test:e2e": "playwright test",
        "env:start": "wp-env start",
        "env:stop": "wp-env stop",
        "build": "wp-scripts build"
    }' package.json > "$TMP_FILE" && mv "$TMP_FILE" package.json
    print_success "npm scripts added"
else
    print_warning "jq not installed. Please add npm scripts manually"
fi

# Add composer scripts
if command -v jq >/dev/null 2>&1; then
    TMP_FILE=$(mktemp)
    jq '.scripts += {
        "test": "phpunit",
        "lint": "phpcs",
        "lint:fix": "phpcbf",
        "analyze": "phpstan analyse"
    }' composer.json > "$TMP_FILE" && mv "$TMP_FILE" composer.json
    print_success "Composer scripts added"
else
    print_warning "jq not installed. Please add Composer scripts manually"
fi

# Final summary
print_header "Setup Complete!"

echo -e "${GREEN}✓ Testing infrastructure has been set up${NC}\n"

print_info "Next steps:"
echo "  1. Install WordPress test suite:"
echo "     bash bin/install-wp-tests.sh wordpress_test root root localhost latest"
echo ""
echo "  2. Run tests:"
echo "     composer test          # PHPUnit tests"
echo "     composer lint          # PHPCS"
echo "     composer analyze       # PHPStan"
echo "     npm run test:unit      # Jest tests"
echo ""
echo "  3. Start development environment:"
echo "     npm run env:start"
echo "     # Access at http://localhost:8888"
echo ""
echo "  4. Review and customize:"
echo "     - tests/bootstrap.php (load your plugin)"
echo "     - .github/workflows/ci.yml (customize for your project)"
echo "     - phpunit.xml.dist (adjust paths)"
echo ""
echo "  5. Create your first test:"
echo "     tests/unit/ExampleTest.php"
echo ""

print_warning "Don't forget to:"
echo "  - Update tests/bootstrap.php to load your plugin"
echo "  - Customize GitHub Actions workflows"
echo "  - Set up GitHub secrets for deployment"
echo "  - Review all configuration files"
echo ""

print_success "Happy testing! 🎉"
