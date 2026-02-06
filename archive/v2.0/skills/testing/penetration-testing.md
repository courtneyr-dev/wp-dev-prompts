# Penetration Testing for WordPress

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Security testing methodologies for WordPress plugins and themes

<skill>
<summary>
Conducting authorized security assessments of WordPress projects to identify vulnerabilities before attackers do.
</summary>

<knowledge>
## What Is Penetration Testing?

Penetration testing (pentesting) simulates attacks:
- **Authorized testing** - With explicit permission
- **Real-world scenarios** - Attacker mindset
- **Vulnerability discovery** - Find before attackers do
- **Risk assessment** - Prioritize fixes

## OWASP Top 10 for WordPress

### 1. Injection (SQL, Command)

**Test for SQL injection:**
```bash
# In URL parameters
/wp-admin/admin.php?id=1' OR '1'='1

# In POST data
action=my_action&id=1; DROP TABLE wp_posts;--
```

**Automated testing:**
```bash
# sqlmap for SQL injection
sqlmap -u "http://localhost:8888/wp-admin/admin.php?page=my-plugin&id=1" --cookie="wordpress_logged_in_xxx=..."

# Check for command injection
; ls -la
| cat /etc/passwd
`whoami`
```

### 2. Broken Authentication

**Test points:**
```
- Password reset flow
- Session management
- Remember me functionality
- Admin bypass attempts
```

**Checks:**
```bash
# Weak password test
wp user update admin --user_pass=password123

# Session fixation test
- Get session token
- Change password
- Test if old session still works
```

### 3. Cross-Site Scripting (XSS)

**Test payloads:**
```html
<!-- Reflected XSS -->
<script>alert('XSS')</script>
"><script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>

<!-- Stored XSS (in settings/content) -->
<svg onload=alert('XSS')>
javascript:alert('XSS')

<!-- DOM-based XSS -->
#<img src=x onerror=alert('XSS')>
```

**Test locations:**
```
- URL parameters
- Form inputs
- Settings fields
- Post content
- Custom fields
- File names
```

### 4. Insecure Direct Object References

**Test access controls:**
```bash
# Access other users' data
/wp-json/my-plugin/v1/users/2  # When logged in as user 1

# Access private content
/wp-json/wp/v2/posts/123  # Private post

# File access
/wp-content/uploads/private/secret.pdf
```

### 5. Security Misconfiguration

**Check for:**
```bash
# Debug mode enabled
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_DISPLAY', true );

# Directory listing
/wp-content/uploads/
/wp-includes/

# Sensitive files accessible
/wp-config.php.bak
/.htaccess
/debug.log
```

### 6. Cross-Site Request Forgery (CSRF)

**Test without nonce:**
```html
<!-- Malicious page -->
<form action="http://target.com/wp-admin/admin-post.php" method="POST">
    <input type="hidden" name="action" value="my_plugin_delete_all">
    <input type="submit" value="Click me">
</form>
```

**Verify protection:**
```php
// Missing nonce check?
if ( isset( $_POST['action'] ) ) {
    // Vulnerable!
}
```

## Testing Tools

### WPScan

```bash
# Basic scan
wpscan --url http://localhost:8888

# With API token for vulnerability data
wpscan --url http://localhost:8888 --api-token YOUR_TOKEN

# Enumerate plugins
wpscan --url http://localhost:8888 -e p

# Enumerate users
wpscan --url http://localhost:8888 -e u

# Password bruteforce (authorized only!)
wpscan --url http://localhost:8888 -U admin -P wordlist.txt
```

### Nuclei

```bash
# Install
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest

# Run WordPress templates
nuclei -u http://localhost:8888 -t wordpress/

# Custom templates for your plugin
nuclei -u http://localhost:8888 -t ./security-tests/
```

### Burp Suite

For manual testing:
1. Configure browser to proxy through Burp
2. Intercept and modify requests
3. Test CSRF, auth bypass, injection
4. Use Repeater for iteration

## Automated Security Testing

### GitHub Actions Integration

```yaml
name: Security Scan

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # Weekly

jobs:
  wpscan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Start WordPress
        run: npx wp-env start

      - name: Install WPScan
        run: |
          sudo apt-get install -y ruby ruby-dev
          sudo gem install wpscan

      - name: Run WPScan
        run: |
          wpscan --url http://localhost:8888 \
            --api-token ${{ secrets.WPSCAN_TOKEN }} \
            --format json \
            --output wpscan-report.json
        continue-on-error: true

      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: wpscan-report
          path: wpscan-report.json

  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: p/wordpress
```

### Custom Security Test Suite

```php
<?php
/**
 * Security test suite.
 */
class SecurityTest extends WP_UnitTestCase {

    /**
     * Test that admin actions require nonce.
     */
    public function test_admin_action_requires_nonce() {
        wp_set_current_user( 1 );

        // Without nonce
        $_POST['action'] = 'my_plugin_save';
        $_POST['value'] = 'test';

        $result = my_plugin_handle_save();

        $this->assertWPError( $result );
        $this->assertEquals( 'invalid_nonce', $result->get_error_code() );
    }

    /**
     * Test that admin actions require capability.
     */
    public function test_admin_action_requires_capability() {
        // Create subscriber (no admin caps)
        $user_id = $this->factory()->user->create( [ 'role' => 'subscriber' ] );
        wp_set_current_user( $user_id );

        // With valid nonce but wrong capability
        $_POST['_wpnonce'] = wp_create_nonce( 'my_plugin_action' );
        $_POST['action'] = 'my_plugin_save';

        $result = my_plugin_handle_save();

        $this->assertWPError( $result );
        $this->assertEquals( 'insufficient_permissions', $result->get_error_code() );
    }

    /**
     * Test SQL injection prevention.
     */
    public function test_sql_injection_prevented() {
        $malicious_id = "1'; DROP TABLE wp_posts;--";

        $result = my_plugin_get_item( $malicious_id );

        // Should not execute injection, just fail gracefully
        $this->assertNull( $result );

        // Verify posts table still exists
        global $wpdb;
        $this->assertNotEmpty( $wpdb->get_var( "SHOW TABLES LIKE '{$wpdb->posts}'" ) );
    }

    /**
     * Test XSS prevention in output.
     */
    public function test_xss_prevention() {
        $malicious = '<script>alert("XSS")</script>';

        update_option( 'my_plugin_setting', $malicious );

        ob_start();
        my_plugin_display_setting();
        $output = ob_get_clean();

        $this->assertStringNotContainsString( '<script>', $output );
        $this->assertStringContainsString( '&lt;script&gt;', $output );
    }
}
```

## Reporting

### Vulnerability Report Template

```markdown
# Security Vulnerability Report

## Summary
- **Vulnerability Type**: SQL Injection
- **Severity**: Critical (CVSS 9.8)
- **Affected Version**: 1.0.0 - 1.2.3
- **Fixed Version**: 1.2.4

## Description
A SQL injection vulnerability exists in the `get_item()` function
where user input is directly concatenated into a SQL query.

## Steps to Reproduce
1. Navigate to /wp-admin/admin.php?page=my-plugin
2. Enter `1' OR '1'='1` in the ID field
3. Observe all records returned

## Proof of Concept
```
GET /wp-admin/admin.php?page=my-plugin&id=1'+OR+'1'='1 HTTP/1.1
```

## Impact
Attackers can read, modify, or delete database contents.

## Remediation
Use `$wpdb->prepare()` for all database queries.

## Timeline
- Discovered: 2024-01-15
- Reported: 2024-01-15
- Fixed: 2024-01-17
- Disclosed: 2024-02-15
```

## Responsible Disclosure

When vulnerabilities are found:
1. **Don't disclose publicly** before fix
2. **Report to maintainer** with details
3. **Allow reasonable time** for fix (90 days typical)
4. **Coordinate disclosure** date
5. **Credit appropriately** after disclosure
</knowledge>

<best_practices>
- Only test with authorization
- Start with automated scans
- Follow OWASP testing guide
- Document all findings
- Verify fixes work
- Retest after patches
</best_practices>

<commands>
```bash
# WPScan basic
wpscan --url http://localhost:8888

# WPScan with vuln database
wpscan --url http://localhost:8888 --api-token YOUR_TOKEN

# Nuclei WordPress templates
nuclei -u http://localhost:8888 -t wordpress/

# Custom security tests
./vendor/bin/phpunit tests/security/
```
</commands>
</skill>
