# Security Scanning (SAST) for WordPress

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Static Application Security Testing for WordPress code

<skill>
<summary>
Running static security analysis tools to identify vulnerabilities in WordPress plugins and themes.
</summary>

<knowledge>
## What Is SAST?

Static Application Security Testing analyzes source code without executing it:
- **Pattern matching** - Identifies known vulnerability patterns
- **Data flow analysis** - Tracks tainted input through code
- **Early detection** - Catches issues before deployment
- **No runtime needed** - Analyzes code directly

## WordPress-Specific Security Checks

### PHPCS Security Sniffs

**Configure strict security rules:**
```xml
<?xml version="1.0"?>
<ruleset name="Security">
    <!-- Security sniffs as errors -->
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
    <rule ref="WordPress.DB.PreparedSQLPlaceholders">
        <type>error</type>
    </rule>
    <rule ref="WordPress.WP.GlobalVariablesOverride">
        <type>error</type>
    </rule>
</ruleset>
```

### PHPStan Security Rules

**Install security extensions:**
```bash
composer require --dev phpstan/phpstan
composer require --dev szepeviktor/phpstan-wordpress
```

**phpstan.neon:**
```neon
parameters:
    level: 6
    paths:
        - includes/
    scanDirectories:
        - vendor/wordpress/stubs/

    ignoreErrors:
        # Only add specific, justified ignores
```

### Psalm Security Analysis

**Install:**
```bash
composer require --dev vimeo/psalm
composer require --dev humanmade/psalm-plugin-wordpress
```

**psalm.xml:**
```xml
<?xml version="1.0"?>
<psalm
    errorLevel="3"
    xmlns="https://getpsalm.org/schema/config"
>
    <projectFiles>
        <directory name="includes"/>
    </projectFiles>

    <plugins>
        <pluginClass class="Humanmade\Psalm\Plugin\WordPress"/>
    </plugins>

    <issueHandlers>
        <TaintedHtml errorLevel="error"/>
        <TaintedSql errorLevel="error"/>
        <TaintedShell errorLevel="error"/>
        <TaintedFile errorLevel="error"/>
        <TaintedInclude errorLevel="error"/>
    </issueHandlers>
</psalm>
```

## Vulnerability Patterns to Detect

### SQL Injection

```php
// VULNERABLE
$wpdb->query( "SELECT * FROM {$wpdb->posts} WHERE ID = " . $_GET['id'] );

// SECURE
$wpdb->get_row( $wpdb->prepare(
    "SELECT * FROM {$wpdb->posts} WHERE ID = %d",
    absint( $_GET['id'] )
) );
```

### Cross-Site Scripting (XSS)

```php
// VULNERABLE
echo $_GET['message'];
echo $user_input;

// SECURE
echo esc_html( sanitize_text_field( $_GET['message'] ) );
echo wp_kses_post( $user_input );
```

### Cross-Site Request Forgery (CSRF)

```php
// VULNERABLE
if ( isset( $_POST['action'] ) ) {
    update_option( 'setting', $_POST['value'] );
}

// SECURE
if ( isset( $_POST['action'] ) &&
     wp_verify_nonce( $_POST['_wpnonce'], 'my_action' ) &&
     current_user_can( 'manage_options' )
) {
    update_option( 'setting', sanitize_text_field( $_POST['value'] ) );
}
```

### Path Traversal

```php
// VULNERABLE
include $_GET['template'] . '.php';

// SECURE
$allowed = [ 'header', 'footer', 'sidebar' ];
$template = sanitize_file_name( $_GET['template'] );
if ( in_array( $template, $allowed, true ) ) {
    include plugin_dir_path( __FILE__ ) . $template . '.php';
}
```

### Object Injection

```php
// VULNERABLE
$data = unserialize( $_POST['data'] );

// SECURE
$data = json_decode( wp_unslash( $_POST['data'] ), true );
// Or use maybe_unserialize() for trusted data only
```

## CI/CD Integration

**GitHub Actions workflow:**
```yaml
name: Security Scan

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          tools: composer

      - run: composer install

      - name: PHPCS Security
        run: ./vendor/bin/phpcs --standard=.phpcs-security.xml

      - name: PHPStan
        run: ./vendor/bin/phpstan analyse

      - name: Psalm
        run: ./vendor/bin/psalm --taint-analysis
```

## Automated Scanning Tools

### WPScan (for deployed sites)

```bash
# Scan for vulnerabilities
wpscan --url https://example.com --api-token YOUR_TOKEN

# Check specific plugin
wpscan --url https://example.com -e p --plugins-detection aggressive
```

### Semgrep Rules

```yaml
# .semgrep.yml
rules:
  - id: wordpress-sql-injection
    patterns:
      - pattern: $wpdb->query($X)
      - pattern-not: $wpdb->query($wpdb->prepare(...))
    message: Use $wpdb->prepare() for SQL queries
    severity: ERROR
    languages: [php]
```
</knowledge>

<best_practices>
- Run security scans on every PR
- Make security issues block merging
- Use multiple tools for coverage
- Enable taint analysis in Psalm
- Review and update rulesets regularly
- Document any security rule exceptions
</best_practices>

<commands>
```bash
# Run PHPCS security checks
./vendor/bin/phpcs --standard=WordPress-Security

# Run PHPStan analysis
./vendor/bin/phpstan analyse --level=6

# Run Psalm with taint analysis
./vendor/bin/psalm --taint-analysis

# Run Semgrep
semgrep --config=.semgrep.yml .
```
</commands>
</skill>
