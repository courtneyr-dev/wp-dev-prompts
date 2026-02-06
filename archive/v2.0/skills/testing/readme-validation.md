# WordPress Readme Validation

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Validating readme.txt for WordPress.org standards

<skill>
<summary>
Automated validation of readme.txt files for WordPress.org plugin and theme directory compliance.
</summary>

<knowledge>
## Why Validate readme.txt?

The readme.txt file is critical for WordPress.org:
- **Directory display** - Shows plugin/theme info
- **Search ranking** - Keywords and descriptions
- **Version info** - Required for updates
- **Compatibility** - WordPress version requirements

## Required Fields

### Minimum Fields

```
=== Plugin Name ===
Contributors: username1, username2
Tags: tag1, tag2, tag3
Requires at least: 6.5
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Short description (150 characters max).

== Description ==

Long description.

== Installation ==

1. Installation step.

== Changelog ==

= 1.0.0 =
* Initial release.
```

## Validation Tools

### WordPress Plugin Check

```bash
# Install via WP-CLI
wp plugin install plugin-check --activate

# Run checks
wp plugin check my-plugin

# Specific categories
wp plugin check my-plugin --categories=plugin_repo
```

### readme.txt Validator

**Online:**
https://wordpress.org/plugins/developers/readme-validator/

**WP-CLI:**
```bash
# Validate readme
wp plugin check my-plugin --format=json | jq '.[] | select(.code | startswith("readme"))'
```

### Custom Validation Script

```php
<?php
/**
 * Validates readme.txt structure.
 */
function validate_readme( string $path ): array {
    $errors = [];
    $content = file_get_contents( $path );

    // Required headers
    $required_headers = [
        'Contributors',
        'Tags',
        'Requires at least',
        'Tested up to',
        'Stable tag',
        'License',
    ];

    foreach ( $required_headers as $header ) {
        if ( ! preg_match( "/^{$header}:/m", $content ) ) {
            $errors[] = "Missing required header: {$header}";
        }
    }

    // Required sections
    $required_sections = [
        'Description',
        'Installation',
        'Changelog',
    ];

    foreach ( $required_sections as $section ) {
        if ( strpos( $content, "== {$section} ==" ) === false ) {
            $errors[] = "Missing required section: {$section}";
        }
    }

    // Validate Stable tag
    if ( preg_match( '/^Stable tag:\s*(.+)$/m', $content, $matches ) ) {
        $stable = trim( $matches[1] );
        if ( $stable === 'trunk' ) {
            $errors[] = "Stable tag 'trunk' is not recommended";
        }
    }

    // Validate Tags count (max 5)
    if ( preg_match( '/^Tags:\s*(.+)$/m', $content, $matches ) ) {
        $tags = explode( ',', $matches[1] );
        if ( count( $tags ) > 5 ) {
            $errors[] = 'Maximum 5 tags allowed';
        }
    }

    // Check short description length
    if ( preg_match( '/License URI:.*?\n\n(.+?)\n\n/s', $content, $matches ) ) {
        $short = trim( $matches[1] );
        if ( strlen( $short ) > 150 ) {
            $errors[] = 'Short description exceeds 150 characters';
        }
    }

    return $errors;
}
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Readme Validation

on: [push, pull_request]

jobs:
  validate-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate readme.txt structure
        run: |
          # Check file exists
          if [ ! -f readme.txt ]; then
            echo "Error: readme.txt not found"
            exit 1
          fi

          # Check required headers
          for header in "Contributors" "Tags" "Requires at least" "Tested up to" "Stable tag" "License"; do
            if ! grep -q "^${header}:" readme.txt; then
              echo "Error: Missing header '${header}'"
              exit 1
            fi
          done

          # Check required sections
          for section in "Description" "Installation" "Changelog"; do
            if ! grep -q "== ${section} ==" readme.txt; then
              echo "Error: Missing section '${section}'"
              exit 1
            fi
          done

          echo "readme.txt validation passed"

      - name: Check version consistency
        run: |
          # Get stable tag from readme
          README_VERSION=$(grep "^Stable tag:" readme.txt | cut -d: -f2 | tr -d ' ')

          # Get version from main plugin file
          PLUGIN_VERSION=$(grep "Version:" *.php | head -1 | cut -d: -f2 | tr -d ' ')

          if [ "$README_VERSION" != "$PLUGIN_VERSION" ]; then
            echo "Error: Version mismatch"
            echo "readme.txt: $README_VERSION"
            echo "plugin file: $PLUGIN_VERSION"
            exit 1
          fi

          echo "Version consistency check passed"
```

### WordPress Plugin Check Action

```yaml
- name: WordPress Plugin Check
  uses: developer-developer/wp-plugin-check-action@v1
  with:
    plugin-slug: my-plugin
    categories: plugin_repo
```

## Common Issues

### Stable Tag = trunk

```
# Wrong
Stable tag: trunk

# Correct
Stable tag: 1.2.3
```

### Too Many Tags

```
# Wrong (more than 5)
Tags: seo, marketing, analytics, reports, dashboard, optimization, performance

# Correct (max 5)
Tags: seo, marketing, analytics, reports, dashboard
```

### Version Mismatch

```
# readme.txt
Stable tag: 1.2.3

# my-plugin.php must match
Version: 1.2.3
```

### Missing Changelog Entry

```
# Each version needs an entry
== Changelog ==

= 1.2.3 =
* Fixed: Bug in settings page
* Added: New filter hook

= 1.2.2 =
* Fixed: Previous release issues
```

## Full readme.txt Template

```
=== My Plugin ===
Contributors: username
Donate link: https://example.com/donate
Tags: functionality, feature, tool
Requires at least: 6.5
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A concise description of what the plugin does (max 150 chars).

== Description ==

A longer description of the plugin. You can use markdown:

**Features:**

* Feature one
* Feature two
* Feature three

== Installation ==

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate via the 'Plugins' menu in WordPress
3. Configure via Settings > My Plugin

== Frequently Asked Questions ==

= How do I configure the plugin? =

Go to Settings > My Plugin to configure options.

= Does this work with multisite? =

Yes, the plugin is multisite compatible.

== Screenshots ==

1. Settings page
2. Frontend display
3. Admin dashboard widget

== Changelog ==

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 1.0.0 =
Initial release.
```
</knowledge>

<best_practices>
- Keep short description under 150 characters
- Use maximum 5 relevant tags
- Match Stable tag with plugin Version header
- Update Tested up to with each WP release
- Document every version in Changelog
- Include clear installation instructions
</best_practices>

<commands>
```bash
# Validate via WP-CLI Plugin Check
wp plugin check my-plugin --categories=plugin_repo

# Online validator
# https://wordpress.org/plugins/developers/readme-validator/

# Check version consistency
grep "Stable tag:" readme.txt
grep "Version:" my-plugin.php
```
</commands>
</skill>
