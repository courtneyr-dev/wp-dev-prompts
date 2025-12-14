# Shippable Plugin Checklist

> A practical checklist for getting your WordPress plugin from "it runs" to "ready for directory submission."
>
> **Companion resource for:** "From 'It Runs' to 'It Ships': Plugin Review Readiness for AI-Era Devs"
> **WordCamp Asia 2026** | Courtney Robertson & Evan Herman

---

## Quick Reference: Key Terms

| Term | Definition |
|------|------------|
| **Sanitization** | Cleaning input data to remove unwanted characters/code. Done when data *enters* your plugin. |
| **Validation** | Checking that data matches expected format/type/range. Done before using data. |
| **Escaping** | Preparing data for safe output in a specific context (HTML, attributes, URLs, SQL). Done *late*—right when echoing. |
| **Nonce** | "Number used once"—a security token that verifies a request came from your site and is intentional. |
| **Capability check** | Verifying the current user has permission to perform an action (e.g., `current_user_can('edit_posts')`). |
| **PHPCS** | PHP_CodeSniffer—a tool that checks code against defined standards (we use WordPress Coding Standards). |

---

## 1. Security Basics (What Reviewers Flag First)

### 1.1 Sanitization & Validation

**Rule: Sanitize early, validate always.**

- [ ] All `$_POST`, `$_GET`, `$_REQUEST` values are sanitized immediately upon use
- [ ] Use appropriate sanitization functions:
  - `sanitize_text_field()` for simple strings
  - `sanitize_email()` for email addresses
  - `sanitize_url()` / `esc_url_raw()` for URLs stored in database
  - `absint()` or `intval()` for integers
  - `sanitize_textarea_field()` for multi-line text
  - `sanitize_file_name()` for file names
  - `wp_kses()` or `wp_kses_post()` for HTML (with allowed tags)
- [ ] Data is validated against expected format before processing
- [ ] Never process entire superglobal arrays—access individual keys only

```php
// BAD: Processing entire array, no sanitization
foreach ( $_POST as $key => $value ) {
    update_option( $key, $value );
}

// GOOD: Individual keys, sanitized
$cat_name = isset( $_POST['cat_name'] )
    ? sanitize_text_field( wp_unslash( $_POST['cat_name'] ) )
    : '';
```

### 1.2 Escaping Output (Escape Late!)

**Rule: Escape late—right when echoing, not when building variables.**

- [ ] All output is escaped using context-appropriate functions
- [ ] Escaping happens at echo time, not during variable assignment
- [ ] Escape functions match the output context:
  - `esc_html()` for text content
  - `esc_attr()` for HTML attributes
  - `esc_url()` for URLs in href/src
  - `esc_js()` for inline JavaScript strings
  - `wp_kses_post()` for HTML that should allow some tags
  - `esc_html__()` / `esc_attr__()` for translated strings
- [ ] Never use `esc_html()` for HTML content—use `wp_kses_post()` or `wp_kses()`

```php
// BAD: Escaping during assignment (too early)
$title = esc_html( $raw_title );
// ... later ...
echo $title;

// GOOD: Escaping at output time (late)
$title = $raw_title;
// ... later ...
echo esc_html( $title );

// BAD: Wrong function for HTML content
echo esc_html( $html_content ); // Strips all HTML!

// GOOD: Appropriate function for HTML
echo wp_kses_post( $html_content );
```

### 1.3 Nonce Verification

**Rule: Verify nonces to confirm intentional actions from your site.**

- [ ] All form submissions include a nonce field
- [ ] All AJAX handlers verify nonces
- [ ] Nonce input is sanitized before verification
- [ ] Verification fails gracefully (not with raw errors)

```php
// In your form:
wp_nonce_field( 'cat_settings_save', 'cat_settings_nonce' );

// When processing:
if ( ! isset( $_POST['cat_settings_nonce'] ) ) {
    return;
}

$nonce = sanitize_text_field( wp_unslash( $_POST['cat_settings_nonce'] ) );

if ( ! wp_verify_nonce( $nonce, 'cat_settings_save' ) ) {
    wp_die( esc_html__( 'Security check failed.', 'my-cat-plugin' ) );
}
```

### 1.4 Capability Checks

**Rule: Always verify the user has permission before performing actions.**

- [ ] All administrative actions check capabilities before processing
- [ ] Capabilities are checked *before* nonce verification (fail fast)
- [ ] Use specific capabilities, not just `manage_options`

```php
// BAD: No capability check
function save_cat_settings() {
    // Anyone could call this!
    update_option( 'cat_color', $_POST['cat_color'] );
}

// GOOD: Check before processing
function save_cat_settings() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    // Nonce check here...

    $cat_color = sanitize_hex_color( wp_unslash( $_POST['cat_color'] ?? '' ) );
    update_option( 'cat_color', $cat_color );
}
```

### 1.5 Other Security Must-Haves

- [ ] All PHP files have direct access prevention:
  ```php
  if ( ! defined( 'ABSPATH' ) ) {
      exit;
  }
  ```
- [ ] SQL queries use `$wpdb->prepare()` with placeholders
- [ ] File uploads use `wp_handle_upload()`, not `move_uploaded_file()`
- [ ] Never use `ALLOW_UNFILTERED_UPLOADS`
- [ ] No HEREDOC/NOWDOC syntax (breaks security scanners)

---

## 2. QA Checks (Before You Submit)

### 2.1 Debug Mode Testing

- [ ] Tested with `WP_DEBUG` set to `true`
- [ ] Tested with `WP_DEBUG_LOG` enabled
- [ ] No PHP notices, warnings, or errors in debug.log
- [ ] No JavaScript console errors
- [ ] All development logging removed (`error_log()`, `console.log()`)

```php
// In wp-config.php for testing:
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );
```

### 2.2 Compatibility Checks

- [ ] Tested on the minimum WordPress version you claim to support
- [ ] Tested on the minimum PHP version you claim to support
- [ ] No deprecated function usage (check debug.log)
- [ ] Works with current WordPress version
- [ ] No conflicts with popular plugins (test with at least 2–3)

### 2.3 Internationalization (i18n)

- [ ] All user-facing strings wrapped in translation functions
- [ ] Text domain matches plugin slug
- [ ] Text domain is loaded correctly
- [ ] No variable text domains: `__( 'text', $variable )` is wrong

```php
// GOOD
__( 'Welcome to Cat Plugin', 'cat-plugin' );
esc_html__( 'Settings saved.', 'cat-plugin' );
printf( esc_html__( 'You have %d cats.', 'cat-plugin' ), $count );

// BAD: Variable text domain
__( 'Hello', $this->textdomain );
```

---

## 3. Automated Checks (Run These Tools)

### 3.1 Plugin Check Plugin (Required)

The official tool for pre-submission validation.

```bash
# Install via WP-CLI
wp plugin install plugin-check --activate

# Run checks
wp plugin check your-plugin-slug
```

- [ ] All errors resolved
- [ ] All warnings reviewed (some may be acceptable with explanation)
- [ ] Security checks pass
- [ ] Performance checks pass

### 3.2 PHPCS with WordPress Coding Standards (Required)

```bash
# Install WordPress Coding Standards
composer require --dev wp-coding-standards/wpcs dealerdirect/phpcodesniffer-composer-installer

# Run PHPCS
./vendor/bin/phpcs --standard=WordPress your-plugin-directory/
```

- [ ] No errors remaining
- [ ] Warnings reviewed and addressed where appropriate
- [ ] Code formatting consistent

### 3.3 Optional (Recommended) Tools

**PHPStan (Static Analysis):**
```bash
composer require --dev phpstan/phpstan phpstan/extension-installer szepeviktor/phpstan-wordpress
./vendor/bin/phpstan analyse your-plugin-directory/ --level=5
```
- [ ] Level 5+ passes (or document why exceptions exist)

**Security-Focused PHPCS:**
```bash
./vendor/bin/phpcs --standard=WordPress-Extra your-plugin-directory/
```

**npm audit (if using JavaScript dependencies):**
```bash
npm audit
```
- [ ] No high/critical vulnerabilities

---

## 4. Packaging (What Goes in the Zip)

### 4.1 Exclude Development Files

Your submitted zip should NOT contain:

- [ ] `node_modules/` directory
- [ ] `vendor/` directory (unless required at runtime AND dependencies are vetted)
- [ ] `.git/` directory
- [ ] Test files (`tests/`, `phpunit.xml`, etc.)
- [ ] Build configuration (`.babelrc`, `webpack.config.js`, `gulpfile.js`)
- [ ] Editor configs (`.vscode/`, `.idea/`)
- [ ] CI/CD files (`.github/`, `.gitlab-ci.yml`)
- [ ] Documentation source files (unless essential)
- [ ] `.env` files or any credentials

**Tip:** Use a `.distignore` file and build script:

```text
# .distignore
.git
.github
node_modules
tests
*.config.js
package.json
package-lock.json
composer.json
composer.lock
phpunit.xml
.distignore
```

### 4.2 readme.txt Essentials

- [ ] File exists at plugin root: `readme.txt`
- [ ] "Stable tag" matches current version in plugin header
- [ ] "Tested up to" reflects actual tested WordPress version
- [ ] "Requires at least" is accurate
- [ ] "Requires PHP" is accurate
- [ ] Short description is under 150 characters
- [ ] At least one FAQ entry
- [ ] Changelog has entry for current version
- [ ] No markdown formatting errors (use the [readme validator](https://wordpress.org/plugins/developers/readme-validator/))

```text
=== Cat Counter ===
Contributors: yourusername
Tags: cats, counter, pets
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Count your cats with style. A simple cat counting plugin for WordPress.

== Description ==
[Full description here...]

== Installation ==
1. Upload the plugin files to `/wp-content/plugins/cat-counter/`
2. Activate through the 'Plugins' menu
3. Go to Settings > Cat Counter to configure

== Frequently Asked Questions ==
= How many cats can I count? =
As many as you have!

== Changelog ==
= 1.0.0 =
* Initial release
```

### 4.3 Plugin Header Requirements

- [ ] Plugin Name present
- [ ] Description present (matches readme.txt short description)
- [ ] Version matches readme.txt stable tag
- [ ] Author present
- [ ] License: GPL-2.0-or-later (or compatible)
- [ ] Text Domain matches slug

```php
/**
 * Plugin Name: Cat Counter
 * Plugin URI: https://example.com/cat-counter
 * Description: Count your cats with style.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: cat-counter
 * Domain Path: /languages
 */
```

### 4.4 Licensing

- [ ] License is GPL-2.0-or-later (or GPL-compatible)
- [ ] All bundled libraries are GPL-compatible
- [ ] `LICENSE` or `license.txt` file included
- [ ] Third-party code properly attributed

---

## 5. Deployment (SVN Workflow)

### 5.1 Initial Submission

- [ ] Submit zip file at https://wordpress.org/plugins/developers/add/
- [ ] Wait for review email (typically 14+ days for straightforward plugins)
- [ ] Respond to any revision requests via email (don't resubmit)

### 5.2 After Approval: SVN Setup

```bash
# Check out your plugin's SVN repository
svn checkout https://plugins.svn.wordpress.org/your-plugin-slug/

# Structure:
# your-plugin-slug/
#   assets/        ← Banner images, icons, screenshots
#   branches/      ← Optional feature branches
#   tags/          ← Release versions (1.0.0, 1.0.1, etc.)
#   trunk/         ← Current development code
```

### 5.3 Release Workflow

```bash
# 1. Update trunk with new code
cd your-plugin-slug/trunk
# ... copy in your updated plugin files ...
svn add --force .
svn commit -m "Update to version 1.0.1"

# 2. Create a tag for the release
cd ..
svn copy trunk tags/1.0.1
svn commit -m "Tagging version 1.0.1"

# 3. Update assets if needed
cd assets
# ... add/update banner-772x250.png, icon-256x256.png, etc. ...
svn add --force .
svn commit -m "Update assets for 1.0.1"
```

### 5.4 Stable Tag Sanity

**Common mistake:** Updating code but forgetting to update the stable tag.

- [ ] `readme.txt` stable tag matches the version you want users to get
- [ ] That version exists in the `tags/` directory
- [ ] Plugin header version in trunk matches if trunk is stable

---

## 6. Maintenance (After Launch)

### 6.1 Support Forum

- [ ] Monitor your plugin's support forum
- [ ] Respond to issues within a reasonable timeframe
- [ ] Be patient and respectful—many users are not developers
- [ ] Mark threads as resolved when fixed
- [ ] Don't ask users to contact you privately for free support

### 6.2 Security Disclosure Handling

If someone reports a vulnerability:

- [ ] Acknowledge receipt promptly (within 48 hours)
- [ ] Don't dismiss reports without investigation
- [ ] Fix promptly and release an update
- [ ] Credit the reporter (if they want credit)
- [ ] Consider coordinated disclosure timeline
- [ ] Update changelog to note security fix (without exploit details)

### 6.3 Update Cadence

- [ ] Test with new WordPress releases (betas if possible)
- [ ] Update "Tested up to" in readme.txt regularly
- [ ] Release security fixes immediately
- [ ] Bundle non-urgent fixes into periodic releases
- [ ] Communicate breaking changes clearly in changelog

### 6.4 Regression Prevention

- [ ] Set up automated testing (PHPUnit, Playwright, etc.)
- [ ] Use CI/CD to run tests on every commit
- [ ] Review code changes before releasing
- [ ] Keep a staging environment for testing updates
- [ ] Consider visual regression testing for UI-heavy plugins

---

## Quick Pre-Submission Checklist

Before you hit "Submit," verify:

```text
[ ] Plugin Check passes (no errors)
[ ] PHPCS WordPress standard passes (no errors)
[ ] WP_DEBUG testing complete (no notices/warnings)
[ ] readme.txt validates
[ ] Stable tag matches plugin version
[ ] No node_modules or vendor in zip
[ ] All output escaped
[ ] All input sanitized
[ ] Nonces on all forms/AJAX
[ ] Capability checks on all actions
[ ] Direct file access prevented
[ ] No development logging
[ ] GPL-compatible license
```

---

## Resources

- **Plugin Handbook:** developer.wordpress.org/plugins/
- **Common Issues:** developer.wordpress.org/plugins/wordpress-org/common-issues/
- **Plugin Developer FAQ:** developer.wordpress.org/plugins/wordpress-org/plugin-developer-faq/
- **Readme Validator:** wordpress.org/plugins/developers/readme-validator/
- **Plugin Check Plugin:** wordpress.org/plugins/plugin-check/
- **wp-dev-prompts Repository:** github.com/courtneyr-dev/wp-dev-prompts

---

*This checklist is licensed under CC0 1.0 (Public Domain). Use, share, and adapt freely.*

*Created for WordCamp Asia 2026 by Courtney Robertson & Evan Herman*
