# Security Review

> **Category**: core/security
> **Platforms**: All

<prompt>
Review this WordPress plugin code for security vulnerabilities. Check every file against the Security Trinity and OWASP patterns.

**Code to review**: [PASTE CODE OR DESCRIBE FILES]

## Security Trinity — check all three on every data path

### 1. Sanitize Input
Every value from `$_GET`, `$_POST`, `$_REQUEST`, `$_SERVER`, or user-submitted data must be sanitized:
- Strings: `sanitize_text_field()`, `sanitize_textarea_field()`
- HTML: `wp_kses_post()` or `wp_kses()` with allowed tags
- Integers: `absint()` or `intval()`
- URLs: `esc_url_raw()` for database, `esc_url()` for output
- Filenames: `sanitize_file_name()`
- Email: `sanitize_email()`

### 2. Validate Data
After sanitization, confirm the data is what you expect:
- Type checking and range validation
- Whitelist allowed values with `in_array($val, $allowed, true)`
- Nonce verification: `wp_verify_nonce()` or `check_admin_referer()`
- Capability checks: `current_user_can('manage_options')`

### 3. Escape Output
Every variable rendered in HTML must be escaped at the point of output:
- HTML content: `esc_html()`
- Attributes: `esc_attr()`
- URLs: `esc_url()`
- JavaScript: `wp_json_encode()` with `wp_add_inline_script()`
- SQL: `$wpdb->prepare()` with `%s`, `%d`, `%f` placeholders

## Vulnerability checklist

- [ ] **SQL Injection**: All `$wpdb` queries with variables use `->prepare()`
- [ ] **XSS (Stored)**: All output from database is escaped
- [ ] **XSS (Reflected)**: All URL parameters are sanitized and escaped
- [ ] **CSRF**: All forms have nonces, all AJAX handlers verify nonces
- [ ] **Privilege Escalation**: Capability checks on every protected action
- [ ] **Path Traversal**: File paths validated, no user input in `include/require`
- [ ] **Object Injection**: No `unserialize()` on user data (use `maybe_unserialize()`)
- [ ] **Open Redirect**: Redirect URLs validated with `wp_safe_redirect()`
- [ ] **Information Disclosure**: No `var_dump`, debug output, or exposed error details
- [ ] **Direct File Access**: All PHP files check `defined('ABSPATH')` at top

## Output format

For each vulnerability found:
1. **File and line**: Where the issue is
2. **Severity**: Critical / High / Medium / Low
3. **Issue**: What's wrong
4. **Fix**: Exact code to fix it
5. **Pattern**: Which Security Trinity step was missed

End with a summary table of all findings sorted by severity.
</prompt>

## Usage

Paste your plugin code after the prompt, or describe the file structure for the AI to review.
