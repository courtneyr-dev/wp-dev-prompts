# PHP_CodeSniffer for WordPress

> **Type**: Skill
> **Domain**: Testing
> **Source**: wp-dev-prompts TESTING-AUTOMATION-PROMPTS.md

<skill>
<summary>
Configuring PHP_CodeSniffer with WordPress Coding Standards.
</summary>

<knowledge>
## Setup

**Install Dependencies:**
```bash
composer require --dev squizlabs/php_codesniffer
composer require --dev wp-coding-standards/wpcs
composer require --dev phpcompatibility/phpcompatibility-wp
```

## .phpcs.xml.dist Configuration

```xml
<?xml version="1.0"?>
<ruleset name="My Plugin">
    <description>PHPCS configuration for My Plugin</description>

    <!-- Scan these files -->
    <file>.</file>

    <!-- Exclude directories -->
    <exclude-pattern>/vendor/*</exclude-pattern>
    <exclude-pattern>/node_modules/*</exclude-pattern>
    <exclude-pattern>/build/*</exclude-pattern>
    <exclude-pattern>/tests/*</exclude-pattern>

    <!-- Use WordPress standards -->
    <rule ref="WordPress-Extra"/>
    <rule ref="WordPress-Docs"/>

    <!-- PHP Compatibility -->
    <rule ref="PHPCompatibilityWP"/>
    <config name="testVersion" value="8.0-"/>

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
                <element value="MY_PLUGIN"/>
            </property>
        </properties>
    </rule>

    <!-- Minimum WordPress version -->
    <config name="minimum_wp_version" value="6.5"/>

    <!-- Performance -->
    <arg name="parallel" value="8"/>
    <arg name="cache" value=".phpcs.cache"/>
</ruleset>
```

## Security Sniffs

**Enable Security Rules (Errors, Not Warnings):**
```xml
<!-- Make security sniffs errors -->
<rule ref="WordPress.Security.EscapeOutput">
    <type>error</type>
</rule>
<rule ref="WordPress.Security.ValidatedSanitizedInput">
    <type>error</type>
</rule>
<rule ref="WordPress.Security.NonceVerification">
    <type>error</type>
</rule>
<rule ref="WordPress.DB.PreparedSQL">
    <type>error</type>
</rule>
```

## Running PHPCS

**Basic Commands:**
```bash
# Check all files
./vendor/bin/phpcs

# Check specific file
./vendor/bin/phpcs includes/class-main.php

# Check with specific standard
./vendor/bin/phpcs --standard=WordPress

# Show sniff codes
./vendor/bin/phpcs -s

# Fix auto-fixable issues
./vendor/bin/phpcbf
```

## Ignoring Rules

**Inline Comments:**
```php
// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Output is escaped in template
echo $already_escaped;

// phpcs:disable WordPress.Files.FileName.InvalidClassFileName
// ... multiple lines ...
// phpcs:enable
```

**In Configuration:**
```xml
<rule ref="WordPress.Files.FileName">
    <exclude-pattern>my-plugin.php</exclude-pattern>
</rule>

<rule ref="WordPress.PHP.DisallowShortTernary">
    <exclude name="WordPress.PHP.DisallowShortTernary"/>
</rule>
```

## Common Errors and Fixes

**Escaping Output:**
```php
// Error: Output not escaped
echo $variable;

// Fix
echo esc_html( $variable );
```

**Sanitizing Input:**
```php
// Error: Input not sanitized
$value = $_POST['field'];

// Fix
$value = isset( $_POST['field'] )
    ? sanitize_text_field( wp_unslash( $_POST['field'] ) )
    : '';
```

**Nonce Verification:**
```php
// Error: Nonce not verified
if ( isset( $_POST['action'] ) ) { ... }

// Fix
if ( isset( $_POST['my_nonce'] ) &&
     wp_verify_nonce( $_POST['my_nonce'], 'my_action' ) ) { ... }
```
</knowledge>

<best_practices>
- Use WordPress-Extra for comprehensive checks
- Make security sniffs errors (not warnings)
- Configure text domain and prefixes
- Use cache for faster runs
- Run PHPCBF to auto-fix issues
- Add inline ignores sparingly with justification
</best_practices>

<references>
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [WPCS Package](https://github.com/WordPress/WordPress-Coding-Standards)
</references>
</skill>
