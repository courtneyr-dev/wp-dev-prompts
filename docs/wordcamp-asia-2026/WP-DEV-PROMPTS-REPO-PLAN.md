# wp-dev-prompts Repository Plan

> New prompts and upgrades to support "From 'It Runs' to 'It Ships'"
>
> These prompts map directly to Plugin Review Team concerns and pre-deploy checks.

---

## Overview

Based on the session content and official WordPress.org reviewer guidelines, we propose 8 new prompts (or prompt upgrades) for the wp-dev-prompts repository. Each prompt includes:

- **Purpose:** What problem it solves
- **Inputs:** What context the user provides
- **Expected Output Format:** What the AI should produce
- **Reviewer Risk Reduced:** Which common issues this prevents

---

## New Prompts

### 1. Review-Ready Code Generator

**Purpose:** Generate new WordPress plugin code that passes Plugin Check and PHPCS from the start—with security patterns baked in.

**File Location:** `prompts/REVIEW-READY-CODE-PROMPTS.md`

**Inputs:**
- Feature description
- Plugin slug/text domain
- Target WordPress version
- Target PHP version

**Expected Output Format:**
```php
<?php
/**
 * [Complete plugin header with all required fields]
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Code with:
// - All output escaped with context-appropriate functions
// - All input sanitized immediately
// - Nonce verification on all form handlers
// - Capability checks before all actions
// - WordPress Coding Standards formatting
// - Internationalization for all user-facing strings
```

**Reviewer Risks Reduced:**
- Missing direct access prevention
- Unescaped output (XSS)
- Unsanitized input
- Missing nonce verification (CSRF)
- Missing capability checks
- Non-prefixed function names

**Prompt:**

```markdown
## Review-Ready WordPress Code Generator

### Context
Generate WordPress plugin code that will pass Plugin Check and PHPCS WordPress Coding Standards on first run. This code should be ready for WordPress.org directory submission without security-related revisions.

### Prompt

I need you to generate WordPress plugin code for the following feature:

**Feature:** [FEATURE_DESCRIPTION]
**Plugin Slug:** [PLUGIN_SLUG]
**Text Domain:** [PLUGIN_SLUG]
**Minimum WordPress:** [WP_VERSION]
**Minimum PHP:** [PHP_VERSION]

Generate code that follows these mandatory patterns:

1. **File Header:**
   - Complete plugin header with all required fields
   - ABSPATH check immediately after opening PHP tag

2. **Security - Output:**
   - ALL echoed variables must use escaping functions
   - Use `esc_html()` for text content
   - Use `esc_attr()` for HTML attributes
   - Use `esc_url()` for URLs
   - Use `wp_kses_post()` for HTML content with allowed tags
   - Escape at echo time, never during variable assignment

3. **Security - Input:**
   - Sanitize ALL `$_POST`, `$_GET`, `$_REQUEST` values immediately
   - Use `sanitize_text_field()` for strings
   - Use `absint()` for integers
   - Use `sanitize_email()` for emails
   - Use `wp_unslash()` before sanitization
   - Never process entire superglobal arrays

4. **Security - Forms:**
   - Add `wp_nonce_field()` to all forms
   - Verify nonces with `wp_verify_nonce()` in handlers
   - Sanitize nonce value before verification
   - Check capabilities with `current_user_can()` before processing
   - Order: capability check → nonce check → process

5. **Naming:**
   - All function names prefixed with `[PLUGIN_SLUG]_`
   - All class names prefixed appropriately
   - No generic names like `Plugin` or `Admin`

6. **Internationalization:**
   - All user-facing strings in translation functions
   - Use text domain `[PLUGIN_SLUG]` consistently
   - Never use variable text domains

7. **WordPress Standards:**
   - Use WordPress Coding Standards formatting
   - Use Yoda conditions
   - Use strict comparisons where appropriate
   - Add proper inline documentation

Provide the complete, production-ready code.

### Variables to Customize
- `[FEATURE_DESCRIPTION]` - What the code should do
- `[PLUGIN_SLUG]` - Plugin slug (e.g., cat-counter)
- `[WP_VERSION]` - Minimum WordPress version (e.g., 6.0)
- `[PHP_VERSION]` - Minimum PHP version (e.g., 8.0)

### Expected Output
Complete PHP file(s) that pass:
- `wp plugin check [plugin-slug]` with no errors
- `phpcs --standard=WordPress` with no errors

### Notes
- This prompt forces security patterns that prevent the most common review rejections
- The code may not be optimal for all use cases but will be secure by default
- Developers should review and adapt the generated code to their specific needs
```

---

### 2. Security Audit Prompt

**Purpose:** Review existing code for the specific security issues the Plugin Review Team flags.

**File Location:** `prompts/REVIEW-READY-CODE-PROMPTS.md`

**Inputs:**
- Existing plugin code (one or more files)

**Expected Output Format:**
```markdown
## Security Audit Report

### Critical Issues (Must Fix)
1. **Line X:** [Issue description] → [Fix]

### Warnings (Should Fix)
1. **Line X:** [Issue description] → [Fix]

### Recommendations (Nice to Have)
1. [Suggestion]

### Summary
- X critical issues found
- X warnings found
- Estimated review risk: HIGH/MEDIUM/LOW
```

**Reviewer Risks Reduced:**
- All security issues in the common-issues handbook
- Patterns reviewers manually check for

**Prompt:**

```markdown
## Plugin Security Audit (Review Team Perspective)

### Context
Audit WordPress plugin code for security issues that the Plugin Review Team commonly flags. This audit should catch issues before submission to avoid revision cycles.

### Prompt

Audit the following WordPress plugin code for security issues that would cause WordPress.org Plugin Review Team rejection:

```php
[PASTE_CODE_HERE]
```

Check for these specific issues (from the Plugin Review Team's documented common issues):

**Critical (will be rejected):**
1. Missing `if ( ! defined( 'ABSPATH' ) ) exit;` in PHP files
2. Output not escaped (`echo $var` instead of `echo esc_html( $var )`)
3. Escaping too early (during assignment instead of at output)
4. Wrong escaping function for context (e.g., `esc_html()` for HTML content)
5. Input not sanitized (`$_POST['x']` used directly)
6. Processing entire `$_POST`/`$_GET`/`$_REQUEST` arrays
7. Missing nonce verification on form handlers
8. Missing capability checks before actions
9. SQL queries without `$wpdb->prepare()`
10. File uploads not using `wp_handle_upload()`
11. HEREDOC/NOWDOC syntax used
12. Non-prefixed function/class names that could conflict

**Warnings (may be flagged):**
1. Sanitization function doesn't match data type
2. Nonce not sanitized before verification
3. Deprecated functions used
4. Direct remote calls instead of WordPress HTTP API
5. Hardcoded capability checks without filters

For each issue found, provide:
- File and line number
- The problematic code
- Why it's a problem (reviewer perspective)
- The corrected code

### Variables to Customize
- `[PASTE_CODE_HERE]` - The plugin code to audit

### Expected Output
A structured audit report with:
1. Critical issues (must fix before submission)
2. Warnings (should fix)
3. Recommendations
4. Overall review risk assessment

### Notes
- This audit focuses specifically on what Plugin Review Team checks
- It does not cover code quality, performance, or architecture
- A clean audit doesn't guarantee approval but reduces rejection likelihood
```

---

### 3. readme.txt Generator

**Purpose:** Generate a correctly formatted readme.txt that passes the WordPress.org validator.

**File Location:** `prompts/REVIEW-READY-CODE-PROMPTS.md`

**Inputs:**
- Plugin name
- Plugin slug
- Short description (under 150 chars)
- Long description
- Features list
- Installation steps
- FAQs
- Changelog entries
- Version info (stable tag, tested up to, requires)

**Expected Output Format:**
A complete readme.txt file matching WordPress.org format specifications.

**Reviewer Risks Reduced:**
- Invalid readme.txt format
- Mismatched stable tag
- Missing required sections
- Formatting errors

**Prompt:**

```markdown
## WordPress.org readme.txt Generator

### Context
Generate a properly formatted readme.txt file for WordPress.org plugin directory submission. The file must pass the official readme validator.

### Prompt

Generate a WordPress.org readme.txt file with the following information:

**Plugin Details:**
- Plugin Name: [PLUGIN_NAME]
- Plugin Slug: [PLUGIN_SLUG]
- Contributors: [WP_USERNAMES]
- Tags: [COMMA_SEPARATED_TAGS]
- Requires at least: [MIN_WP_VERSION]
- Tested up to: [TESTED_WP_VERSION]
- Requires PHP: [MIN_PHP_VERSION]
- Stable tag: [VERSION]
- License: GPL-2.0-or-later
- License URI: https://www.gnu.org/licenses/gpl-2.0.html

**Short Description (under 150 characters):**
[SHORT_DESCRIPTION]

**Long Description:**
[LONG_DESCRIPTION]

**Features:**
[FEATURES_LIST]

**Installation Steps:**
[INSTALLATION_STEPS]

**FAQs:**
[FAQ_PAIRS]

**Changelog:**
[CHANGELOG_ENTRIES]

**Upgrade Notice (optional):**
[UPGRADE_NOTICES]

Generate the complete readme.txt following these rules:
1. Use exact WordPress.org readme format with `===` headers
2. Short description must be one line, under 150 characters
3. Tags limited to 5, relevant to plugin function
4. Include at least 3 FAQ entries
5. Changelog must include current version entry
6. Use proper markdown for lists and formatting
7. No HTML in description (WordPress.org converts markdown)

### Variables to Customize
All bracketed items above

### Expected Output
Complete readme.txt content ready to save and submit

### Notes
- Validate output at: https://wordpress.org/plugins/developers/readme-validator/
- Stable tag MUST match plugin header version
- Contributors must be valid WordPress.org usernames
```

---

### 4. Pre-Submission Checklist Validator

**Purpose:** Systematically verify a plugin is ready for submission by checking against all common rejection reasons.

**File Location:** `prompts/REVIEW-READY-CODE-PROMPTS.md`

**Inputs:**
- Plugin directory contents list
- Plugin header content
- readme.txt content

**Expected Output Format:**
```markdown
## Pre-Submission Validation Report

### ✅ Passed Checks
- [Check name]: [Details]

### ❌ Failed Checks (Must Fix)
- [Check name]: [Issue] → [How to fix]

### ⚠️ Warnings (Review Recommended)
- [Check name]: [Concern]

### Submission Readiness: READY / NOT READY
```

**Reviewer Risks Reduced:**
- Packaging errors (node_modules included, etc.)
- Version mismatches
- Missing required files
- Development files in submission

**Prompt:**

```markdown
## Plugin Pre-Submission Validator

### Context
Validate that a WordPress plugin is ready for WordPress.org directory submission. Check for common packaging and metadata issues that cause rejection.

### Prompt

Validate this plugin for WordPress.org submission readiness:

**Plugin Directory Contents:**
```
[LIST_OF_FILES_AND_FOLDERS]
```

**Plugin Header (from main file):**
```php
[PLUGIN_HEADER]
```

**readme.txt Content:**
```
[README_CONTENT]
```

Check against these criteria:

**Required Files:**
- [ ] Main plugin file exists with proper header
- [ ] readme.txt exists at root
- [ ] LICENSE or license.txt exists

**Version Consistency:**
- [ ] Plugin header Version matches readme.txt Stable tag
- [ ] Tested up to is a valid WordPress version
- [ ] Requires at least is reasonable (not ancient)

**Packaging:**
- [ ] No node_modules directory
- [ ] No vendor directory (unless runtime-required)
- [ ] No .git directory
- [ ] No test files or directories
- [ ] No build configuration files (webpack, gulp, etc.)
- [ ] No .env or credential files
- [ ] No editor directories (.vscode, .idea)
- [ ] No CI/CD directories (.github, .gitlab)

**readme.txt Format:**
- [ ] Valid format per WordPress.org spec
- [ ] Short description under 150 characters
- [ ] At least one FAQ entry
- [ ] Changelog includes current version
- [ ] Tags are 5 or fewer

**Plugin Header:**
- [ ] All required fields present
- [ ] Text Domain matches plugin slug
- [ ] License is GPL-compatible

**File Size:**
- [ ] Total size under 10MB

For each failed check, explain what's wrong and how to fix it.

### Variables to Customize
- `[LIST_OF_FILES_AND_FOLDERS]` - Output of `ls -R` or similar
- `[PLUGIN_HEADER]` - The plugin file header comment
- `[README_CONTENT]` - Full readme.txt content

### Expected Output
Structured validation report with pass/fail status for each check and overall submission readiness assessment.
```

---

### 5. AJAX Handler Security Template

**Purpose:** Generate secure WordPress AJAX handlers with all required security patterns.

**File Location:** `prompts/REVIEW-READY-CODE-PROMPTS.md`

**Inputs:**
- Action name
- Required capability
- Whether available to logged-out users
- Input parameters and their types
- What the handler should do

**Expected Output Format:**
Complete AJAX handler code with nonce generation, verification, capability checks, sanitization, and proper response handling.

**Reviewer Risks Reduced:**
- AJAX handlers without nonce verification
- AJAX handlers without capability checks
- Unsanitized AJAX input
- Improper AJAX response handling

**Prompt:**

```markdown
## Secure AJAX Handler Generator

### Context
AJAX handlers are a common source of security vulnerabilities in WordPress plugins. Generate handlers with all required security patterns baked in.

### Prompt

Generate a secure WordPress AJAX handler with these specifications:

**Handler Details:**
- Action Name: [ACTION_NAME]
- Plugin Prefix: [PLUGIN_PREFIX]
- Required Capability: [CAPABILITY]
- Available to logged-out users: [YES/NO]

**Input Parameters:**
[LIST_OF_PARAMETERS_WITH_TYPES]
Example:
- post_id (integer, required)
- title (string, optional)
- categories (array of integers, optional)

**Handler Purpose:**
[WHAT_THE_HANDLER_SHOULD_DO]

Generate complete code including:

1. **Nonce Setup:**
   - JavaScript nonce localization
   - PHP nonce field generation for any forms

2. **Handler Registration:**
   - `wp_ajax_{action}` hook
   - `wp_ajax_nopriv_{action}` if needed

3. **Security Checks (in order):**
   - Nonce verification (sanitize then verify)
   - Capability check
   - Fail early with `wp_send_json_error()`

4. **Input Handling:**
   - Each parameter sanitized with appropriate function
   - Required parameters validated
   - Type casting where appropriate

5. **Response:**
   - Use `wp_send_json_success()` / `wp_send_json_error()`
   - Include meaningful error messages
   - Proper exit after response

6. **JavaScript Caller:**
   - Example fetch/jQuery.ajax call
   - Nonce included in request
   - Error handling

### Variables to Customize
- `[ACTION_NAME]` - AJAX action name (e.g., save_cat_data)
- `[PLUGIN_PREFIX]` - Plugin prefix (e.g., cat_counter)
- `[CAPABILITY]` - Required capability (e.g., edit_posts)
- `[YES/NO]` - Whether nopriv handler needed
- `[LIST_OF_PARAMETERS_WITH_TYPES]` - Input specs
- `[WHAT_THE_HANDLER_SHOULD_DO]` - Handler logic

### Expected Output
Complete PHP and JavaScript code ready to use.

### Notes
- This template prevents the most common AJAX security issues
- The nopriv handler, if included, still requires nonce verification
- Customize the capability check for your specific use case
```

---

### 6. Settings Page Security Template

**Purpose:** Generate a complete WordPress settings page with proper security patterns.

**File Location:** `prompts/REVIEW-READY-CODE-PROMPTS.md`

**Inputs:**
- Settings page title
- Menu location (Settings, Tools, or top-level)
- Required capability
- Settings fields (name, type, default, validation rules)
- Plugin prefix

**Expected Output Format:**
Complete settings page code using the Settings API with all security patterns.

**Reviewer Risks Reduced:**
- Settings pages without proper nonces
- Settings without capability checks
- Settings not using Settings API (harder to secure)
- Unescaped option output
- Unsanitized option input

**Prompt:**

```markdown
## Secure Settings Page Generator

### Context
Settings pages are frequently flagged by reviewers for security issues. Generate a complete settings page using the WordPress Settings API with all required security patterns.

### Prompt

Generate a secure WordPress settings page with these specifications:

**Page Details:**
- Page Title: [PAGE_TITLE]
- Menu Title: [MENU_TITLE]
- Menu Location: [MENU_LOCATION] (settings/tools/toplevel)
- Required Capability: [CAPABILITY]
- Plugin Prefix: [PLUGIN_PREFIX]
- Plugin Slug: [PLUGIN_SLUG]
- Text Domain: [PLUGIN_SLUG]

**Settings Fields:**
[LIST_OF_FIELDS]
Example:
- api_key (text, required, no default)
- enable_feature (checkbox, default: false)
- items_per_page (number, default: 10, min: 1, max: 100)
- notification_email (email, optional)
- allowed_html (textarea with HTML, optional)

Generate complete code including:

1. **Menu Registration:**
   - Appropriate add_*_page() function for location
   - Capability check built into registration

2. **Settings API Integration:**
   - register_setting() with sanitize callback
   - add_settings_section()
   - add_settings_field() for each field

3. **Sanitization Callback:**
   - Each field sanitized by type
   - Validation for required fields
   - Range validation for numbers
   - add_settings_error() for validation failures

4. **Rendering:**
   - settings_fields() for nonce
   - do_settings_sections() for fields
   - submit_button() for save
   - All output properly escaped

5. **Field Callbacks:**
   - Each field type rendered correctly
   - Current values escaped with esc_attr() or appropriate function
   - Proper labels and descriptions

### Variables to Customize
- All bracketed items above
- `[LIST_OF_FIELDS]` - Settings specifications

### Expected Output
Complete PHP code for a settings page that:
- Passes PHPCS WordPress standards
- Has no unescaped output
- Has no unsanitized input
- Uses Settings API correctly

### Notes
- Settings API handles nonces automatically via settings_fields()
- The sanitize_callback is critical—it's where input is cleaned
- Never store unsanitized options
```

---

### 7. SVN Release Checklist Prompt

**Purpose:** Generate a step-by-step SVN release checklist specific to the user's plugin.

**File Location:** `prompts/REVIEW-READY-CODE-PROMPTS.md`

**Inputs:**
- Plugin slug
- New version number
- Previous version (if applicable)
- Whether assets need updating

**Expected Output Format:**
Numbered checklist of exact commands to run for releasing a new version.

**Reviewer Risks Reduced:**
- Stable tag not updated
- Tag not created
- Assets not updated
- Version mismatch between files

**Prompt:**

```markdown
## SVN Release Checklist Generator

### Context
Generate a step-by-step SVN release checklist for publishing a WordPress.org plugin update. Reduces the chance of forgetting a step that causes version confusion.

### Prompt

Generate an SVN release checklist for:

**Plugin Details:**
- Plugin Slug: [PLUGIN_SLUG]
- New Version: [NEW_VERSION]
- Previous Version: [PREVIOUS_VERSION]
- Update Assets: [YES/NO]

Generate a numbered checklist with exact commands including:

1. **Pre-Release Verification:**
   - Plugin header version is [NEW_VERSION]
   - readme.txt stable tag is [NEW_VERSION]
   - Changelog includes [NEW_VERSION] entry
   - All tests pass
   - Plugin Check passes

2. **SVN Commands:**
   - cd to local SVN checkout
   - svn update
   - Copy updated files to trunk
   - svn status to review changes
   - svn add for new files
   - svn delete for removed files
   - svn commit trunk with message

3. **Tagging:**
   - svn copy trunk to tags/[NEW_VERSION]
   - svn commit tag with message

4. **Assets (if updating):**
   - Update files in assets/
   - svn add/commit assets

5. **Post-Release:**
   - Verify on wordpress.org/plugins/[PLUGIN_SLUG]/
   - Check version displays correctly
   - Test download and activation

Include exact commands like:
```bash
svn copy https://plugins.svn.wordpress.org/[PLUGIN_SLUG]/trunk \
         https://plugins.svn.wordpress.org/[PLUGIN_SLUG]/tags/[NEW_VERSION] \
         -m "Tagging version [NEW_VERSION]"
```

### Variables to Customize
- `[PLUGIN_SLUG]` - Plugin directory slug
- `[NEW_VERSION]` - Version being released (e.g., 1.2.0)
- `[PREVIOUS_VERSION]` - Previous version (e.g., 1.1.0)
- `[YES/NO]` - Whether to include asset update steps

### Expected Output
Complete numbered checklist with copy-paste-ready commands.
```

---

### 8. Code Review Preparation Prompt

**Purpose:** Prepare a summary of a plugin for Plugin Review Team review, highlighting security measures taken.

**File Location:** `prompts/REVIEW-READY-CODE-PROMPTS.md`

**Inputs:**
- Plugin code or summary of files
- Any non-standard patterns used

**Expected Output Format:**
A structured overview document showing security measures, potential reviewer questions, and explanations.

**Reviewer Risks Reduced:**
- Review delays from unclear code intent
- Back-and-forth emails on edge cases
- Misunderstanding of intentional patterns

**Prompt:**

```markdown
## Plugin Review Preparation Document

### Context
Prepare a structured overview of a plugin's security measures to speed up the review process. This doesn't get submitted but helps you anticipate reviewer questions.

### Prompt

Analyze this plugin and create a review preparation document:

```php
[PLUGIN_CODE_OR_SUMMARY]
```

Generate a document covering:

1. **Security Measures Summary:**
   - How input sanitization is handled (list functions used)
   - How output escaping is handled (list functions used)
   - How nonces are implemented
   - How capability checks are structured
   - Any database queries and how they're secured

2. **Potential Reviewer Questions:**
   - Any patterns that might look unusual but are intentional
   - Any external API calls and why they're necessary
   - Any file operations and how they're secured
   - Any use of eval, create_function, or dynamic code

3. **Non-Standard Patterns Explained:**
   - If you're doing something that might look suspicious but is valid
   - Include: what it does, why it's needed, why it's safe

4. **Compliance Checklist:**
   - Direct access prevention: [location]
   - Escaping functions used: [list]
   - Sanitization functions used: [list]
   - Nonce implementation: [locations]
   - Capability checks: [locations]
   - Prepared statements: [if applicable]

This document is for your reference during review, not for submission.

### Variables to Customize
- `[PLUGIN_CODE_OR_SUMMARY]` - Plugin code or file descriptions

### Expected Output
Structured document you can reference if reviewers ask questions.
```

---

## Summary: Prompt-to-Risk Mapping

| Prompt | Primary Risk Reduced | Secondary Risks |
|--------|---------------------|-----------------|
| Review-Ready Code Generator | XSS, CSRF, Authorization | Coding standards, i18n |
| Security Audit Prompt | All security issues | Pre-submission blockers |
| readme.txt Generator | Metadata errors | Formatting issues |
| Pre-Submission Validator | Packaging errors | Version mismatches |
| AJAX Handler Template | AJAX security holes | Response handling |
| Settings Page Template | Settings security | Settings API misuse |
| SVN Release Checklist | Release errors | Version confusion |
| Code Review Preparation | Review delays | Miscommunication |

---

## Implementation Priority

1. **Immediate (before session):**
   - Review-Ready Code Generator
   - Security Audit Prompt
   - Pre-Submission Validator

2. **Before Session Materials Posted:**
   - readme.txt Generator
   - AJAX Handler Template
   - Settings Page Template

3. **After Session (ongoing):**
   - SVN Release Checklist
   - Code Review Preparation

---

## File Organization

Proposed new file structure:

```
prompts/
├── PROJECT-KICKSTART-PROMPT.md
├── TESTING-AUTOMATION-PROMPTS.md
├── COMMUNITY-FILES-PROMPTS.md
├── PLUGIN-MARKETING-PROMPTS.md
├── REVIEW-READY-CODE-PROMPTS.md       ← NEW (all 8 prompts)
└── site-review/
    └── DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md
```

This keeps all review-readiness prompts in one file for easy reference, matching the existing organization pattern.
