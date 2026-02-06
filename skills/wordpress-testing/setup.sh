#!/bin/bash
# WordPress Plugin Test Suite Setup
# Usage: bash skills/wordpress-testing/setup.sh [db-name] [db-user] [db-pass] [db-host] [wp-version]

set -euo pipefail

DB_NAME=${1:-wordpress_test}
DB_USER=${2:-root}
DB_PASS=${3:-}
DB_HOST=${4:-localhost}
WP_VERSION=${5:-latest}

echo "Setting up WordPress test suite..."
echo "  DB: $DB_NAME"
echo "  WP: $WP_VERSION"
echo "  PHP: $(php -r 'echo PHP_VERSION;')"

# Install composer dependencies
if [ -f composer.json ]; then
    composer install --no-progress --prefer-dist
fi

# Install WordPress test suite
if [ -f bin/install-wp-tests.sh ]; then
    bash bin/install-wp-tests.sh "$DB_NAME" "$DB_USER" "$DB_PASS" "$DB_HOST" "$WP_VERSION"
else
    echo "Warning: bin/install-wp-tests.sh not found."
    echo "Create it with: wp scaffold plugin-tests my-plugin"
fi

# Verify setup
echo ""
echo "Setup complete. Run tests with:"
echo "  vendor/bin/phpunit"
echo "  vendor/bin/phpunit --testsuite unit"
echo "  vendor/bin/phpunit --testsuite integration"
