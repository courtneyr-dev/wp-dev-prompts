# WordPress Check

Validate WordPress coding standards compliance in PHP files.

## Arguments

$ARGUMENTS

Expected: path to a PHP file or directory (e.g., `includes/` or `my-plugin.php`)

If no argument provided, check all PHP files in the current directory.

## Instructions

1. **Find PHP files** in the specified path

2. **Security Review** (check each file for):
   - Unsanitized `$_GET`, `$_POST`, `$_REQUEST`, `$_SERVER` usage
   - Missing `wp_verify_nonce()` in form handlers
   - Missing capability checks (`current_user_can()`)
   - Unescaped output (missing `esc_html()`, `esc_attr()`, `esc_url()`)
   - Direct database queries without `$wpdb->prepare()`
   - Use of `eval()`, `extract()`, or `serialize()`/`unserialize()`

3. **Coding Standards** (check for):
   - Function prefix consistency (should use plugin-specific prefix)
   - WordPress naming conventions (snake_case for functions)
   - Proper hook naming (prefixed with plugin slug)
   - i18n: user-facing strings wrapped in `__()`, `_e()`, `esc_html__()`, etc.
   - Text domain consistency

4. **Architecture** (check for):
   - Direct code execution at file load (should use hooks)
   - Plugin header completeness (Version, Requires at least, Requires PHP)
   - Proper use of `plugins_loaded`, `init`, `admin_init` hooks
   - Autoloader or proper file inclusion patterns

5. **Version Compatibility**:
   - `Requires at least` should be 6.9 or higher
   - `Requires PHP` should be 8.2 or higher
   - Check for deprecated WordPress function usage

6. **Report Format**:
   - List issues by severity (Error, Warning, Info)
   - Include file path and line number
   - Provide fix suggestions for each issue
   - Summary count: X errors, Y warnings, Z info

7. **If PHPCS is available**, also run:
```bash
./vendor/bin/phpcs --standard=WordPress --extensions=php [path]
```
