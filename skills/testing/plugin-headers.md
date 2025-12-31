# Plugin Header Validation

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Validating WordPress plugin file headers

<skill>
<summary>
Automated validation of WordPress plugin headers for correct format and required fields.
</summary>

<knowledge>
## Plugin Header Requirements

WordPress reads plugin metadata from the main plugin file header comment.

### Required Fields

```php
<?php
/**
 * Plugin Name: My Plugin
 * Version: 1.0.0
 */
```

### Recommended Fields

```php
<?php
/**
 * Plugin Name:       My Awesome Plugin
 * Plugin URI:        https://example.com/my-plugin
 * Description:       A concise description of what this plugin does.
 * Version:           1.0.0
 * Requires at least: 6.5
 * Requires PHP:      8.0
 * Author:            Your Name
 * Author URI:        https://example.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       my-plugin
 * Domain Path:       /languages
 * Network:           true
 * Update URI:        https://example.com/updates
 */
```

## Header Fields Reference

| Field | Required | Description |
|-------|----------|-------------|
| Plugin Name | Yes | Display name |
| Version | Yes | Semantic version |
| Description | Recommended | Brief description |
| Author | Recommended | Developer name |
| License | Recommended | GPL-2.0-or-later |
| Text Domain | Recommended | i18n domain |
| Requires at least | Recommended | Min WP version |
| Requires PHP | Recommended | Min PHP version |

## Validation Script

### PHP Validator

```php
<?php
/**
 * Validates WordPress plugin headers.
 */
function validate_plugin_headers( string $file_path ): array {
    $errors = [];
    $warnings = [];

    if ( ! file_exists( $file_path ) ) {
        return [ 'errors' => [ 'File not found' ], 'warnings' => [] ];
    }

    // Get first 8KB of file
    $file_data = file_get_contents( $file_path, false, null, 0, 8192 );

    // Required headers
    $required = [
        'Plugin Name' => '/Plugin Name:\s*(.+)/i',
        'Version'     => '/Version:\s*([0-9.]+)/i',
    ];

    foreach ( $required as $name => $pattern ) {
        if ( ! preg_match( $pattern, $file_data, $matches ) ) {
            $errors[] = "Missing required header: {$name}";
        }
    }

    // Recommended headers
    $recommended = [
        'Description'       => '/Description:\s*(.+)/i',
        'Author'            => '/Author:\s*(.+)/i',
        'License'           => '/License:\s*(.+)/i',
        'Text Domain'       => '/Text Domain:\s*([a-z0-9-]+)/i',
        'Requires at least' => '/Requires at least:\s*([0-9.]+)/i',
        'Requires PHP'      => '/Requires PHP:\s*([0-9.]+)/i',
    ];

    foreach ( $recommended as $name => $pattern ) {
        if ( ! preg_match( $pattern, $file_data, $matches ) ) {
            $warnings[] = "Missing recommended header: {$name}";
        }
    }

    // Validate version format (semver)
    if ( preg_match( '/Version:\s*(.+)/i', $file_data, $matches ) ) {
        $version = trim( $matches[1] );
        if ( ! preg_match( '/^\d+\.\d+(\.\d+)?(-[a-zA-Z0-9]+)?$/', $version ) ) {
            $errors[] = "Invalid version format: {$version}";
        }
    }

    // Validate text domain matches slug
    if ( preg_match( '/Text Domain:\s*([a-z0-9-]+)/i', $file_data, $matches ) ) {
        $text_domain = trim( $matches[1] );
        $expected_slug = basename( dirname( $file_path ) );

        if ( $text_domain !== $expected_slug ) {
            $warnings[] = "Text domain '{$text_domain}' doesn't match directory '{$expected_slug}'";
        }
    }

    // Check license
    if ( preg_match( '/License:\s*(.+)/i', $file_data, $matches ) ) {
        $license = trim( $matches[1] );
        $valid_licenses = [
            'GPL-2.0-or-later',
            'GPL-2.0+',
            'GPLv2 or later',
            'GPL-3.0-or-later',
            'GPL-3.0+',
            'GPLv3 or later',
        ];

        if ( ! in_array( $license, $valid_licenses, true ) ) {
            $warnings[] = "Consider using a standard GPL license format";
        }
    }

    return [
        'errors'   => $errors,
        'warnings' => $warnings,
    ];
}
```

### Bash Validation

```bash
#!/bin/bash
# validate-plugin-header.sh

FILE=$1

if [ ! -f "$FILE" ]; then
    echo "Error: File not found: $FILE"
    exit 1
fi

ERRORS=0

# Check Plugin Name
if ! grep -q "Plugin Name:" "$FILE"; then
    echo "Error: Missing 'Plugin Name:' header"
    ERRORS=$((ERRORS + 1))
fi

# Check Version
if ! grep -q "Version:" "$FILE"; then
    echo "Error: Missing 'Version:' header"
    ERRORS=$((ERRORS + 1))
fi

# Check Description
if ! grep -q "Description:" "$FILE"; then
    echo "Warning: Missing 'Description:' header"
fi

# Check Text Domain
if ! grep -q "Text Domain:" "$FILE"; then
    echo "Warning: Missing 'Text Domain:' header"
fi

# Check Requires at least
if ! grep -q "Requires at least:" "$FILE"; then
    echo "Warning: Missing 'Requires at least:' header"
fi

# Check Requires PHP
if ! grep -q "Requires PHP:" "$FILE"; then
    echo "Warning: Missing 'Requires PHP:' header"
fi

if [ $ERRORS -gt 0 ]; then
    echo "Validation failed with $ERRORS error(s)"
    exit 1
fi

echo "Plugin header validation passed"
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Plugin Headers

on: [push, pull_request]

jobs:
  validate-headers:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Find main plugin file
        id: find-plugin
        run: |
          PLUGIN_FILE=$(ls *.php | head -1)
          echo "file=$PLUGIN_FILE" >> $GITHUB_OUTPUT

      - name: Validate required headers
        run: |
          FILE="${{ steps.find-plugin.outputs.file }}"
          ERRORS=0

          # Required headers
          if ! grep -q "Plugin Name:" "$FILE"; then
            echo "::error::Missing required 'Plugin Name:' header"
            ERRORS=$((ERRORS + 1))
          fi

          if ! grep -q "Version:" "$FILE"; then
            echo "::error::Missing required 'Version:' header"
            ERRORS=$((ERRORS + 1))
          fi

          # Recommended headers (warnings)
          for header in "Description" "Author" "Text Domain" "Requires at least" "Requires PHP" "License"; do
            if ! grep -q "${header}:" "$FILE"; then
              echo "::warning::Missing recommended '${header}:' header"
            fi
          done

          if [ $ERRORS -gt 0 ]; then
            exit 1
          fi

      - name: Check version consistency
        run: |
          FILE="${{ steps.find-plugin.outputs.file }}"

          # Get version from plugin header
          PLUGIN_VERSION=$(grep "Version:" "$FILE" | head -1 | sed 's/.*Version:\s*//' | tr -d ' ')

          # Get version from readme.txt
          if [ -f readme.txt ]; then
            README_VERSION=$(grep "Stable tag:" readme.txt | sed 's/Stable tag:\s*//' | tr -d ' ')

            if [ "$PLUGIN_VERSION" != "$README_VERSION" ]; then
              echo "::error::Version mismatch: plugin=$PLUGIN_VERSION, readme=$README_VERSION"
              exit 1
            fi
          fi

          echo "Version: $PLUGIN_VERSION"
```

### WordPress Plugin Check

```bash
# Install Plugin Check
wp plugin install plugin-check --activate

# Run header checks
wp plugin check my-plugin --checks=plugin_header_text_domain,plugin_readme_header
```

## Common Issues

### Missing Required Headers

```php
// Wrong: No Version
/**
 * Plugin Name: My Plugin
 */

// Correct
/**
 * Plugin Name: My Plugin
 * Version: 1.0.0
 */
```

### Version Format

```php
// Avoid
Version: v1.0
Version: 1.0.0.0

// Preferred
Version: 1.0.0
Version: 1.2.3-beta1
```

### Text Domain Mismatch

```php
// Plugin in: /wp-content/plugins/my-awesome-plugin/

// Wrong
Text Domain: my-plugin

// Correct (matches directory)
Text Domain: my-awesome-plugin
```

### Minimum Version Strings

```php
// Use actual version numbers
Requires at least: 6.5
Requires PHP: 8.0

// Not relative terms
Requires at least: latest  // Wrong
```

## Theme Header (for reference)

```php
/*
Theme Name:        My Theme
Theme URI:         https://example.com/my-theme
Author:            Your Name
Author URI:        https://example.com
Description:       A custom WordPress theme.
Version:           1.0.0
Requires at least: 6.5
Tested up to:      6.7
Requires PHP:      8.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:       my-theme
Tags:              blog, custom-colors, custom-logo
*/
```
</knowledge>

<best_practices>
- Include all recommended headers
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Match text domain to plugin/theme slug
- Keep versions synchronized across files
- Use GPL-compatible licenses
- Include minimum WP and PHP versions
</best_practices>

<commands>
```bash
# Check plugin headers with WP-CLI
wp plugin check my-plugin --checks=plugin_header_text_domain

# Validate manually
grep -E "^(Plugin Name|Version|Text Domain|Requires):" my-plugin.php

# Check version consistency
grep "Version:" my-plugin.php
grep "Stable tag:" readme.txt
```
</commands>
</skill>
