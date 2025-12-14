# Live Demo Plan

> 8–10 minute demo segment for "From 'It Runs' to 'It Ships'"
>
> **Goal:** Show a realistic "vibe-coded" plugin snippet, run automated checks, interpret output, fix issues, and end with green checks.

---

## Demo Overview

| Aspect | Details |
|--------|---------|
| **Duration** | 8 minutes (scripted), 2 minutes buffer |
| **Internet Required** | No—all tools run locally |
| **Code Editor** | VS Code (large font, high contrast theme) |
| **Terminal** | Visible, large font, minimal prompt |
| **Backup Plan** | Pre-recorded video of same demo if technical issues |

---

## The "Intentionally Bad" Plugin: Cat Counter

A tiny plugin with 5 common review problems that we'll fix live.

### File: `cat-counter.php`

```php
<?php
/**
 * Plugin Name: Cat Counter
 * Description: Count your cats!
 * Version: 1.0.0
 * Author: Vibe Coder
 * License: GPL-2.0-or-later
 */

// Problem 1: No direct access prevention

class CatCounter {

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_menu' ) );
        add_action( 'admin_init', array( $this, 'save_settings' ) );
    }

    public function add_menu() {
        add_options_page(
            'Cat Counter',
            'Cat Counter',
            'manage_options',
            'cat-counter',
            array( $this, 'render_page' )
        );
    }

    public function render_page() {
        $cat_count = get_option( 'cat_count', 0 );
        $cat_name = get_option( 'cat_name', '' );
        ?>
        <div class="wrap">
            <h1>Cat Counter</h1>
            <form method="post">
                <table class="form-table">
                    <tr>
                        <th><label for="cat_count">Number of Cats</label></th>
                        <!-- Problem 2: Not escaped on output -->
                        <td><input type="number" name="cat_count" value="<?php echo $cat_count; ?>"></td>
                    </tr>
                    <tr>
                        <th><label for="cat_name">Favorite Cat's Name</label></th>
                        <!-- Problem 3: Not escaped on output -->
                        <td><input type="text" name="cat_name" value="<?php echo $cat_name; ?>"></td>
                    </tr>
                </table>
                <?php submit_button( 'Save Cat Data' ); ?>
            </form>
            <!-- Problem 4: Outputting without escaping -->
            <p>You have <?php echo $cat_count; ?> cats. Your favorite is <?php echo $cat_name; ?>!</p>
        </div>
        <?php
    }

    public function save_settings() {
        // Problem 5: No nonce check, no capability check, no sanitization
        if ( isset( $_POST['cat_count'] ) ) {
            update_option( 'cat_count', $_POST['cat_count'] );
            update_option( 'cat_name', $_POST['cat_name'] );
        }
    }
}

new CatCounter();
```

### Problems Summary (for speaker notes)

| # | Problem | Reviewer Concern |
|---|---------|------------------|
| 1 | No `ABSPATH` check | Direct file access vulnerability |
| 2–4 | No escaping on output | XSS vulnerability |
| 5a | No nonce verification | CSRF vulnerability |
| 5b | No capability check | Authorization bypass |
| 5c | No sanitization | Data integrity, potential injection |

---

## Demo Script

### Setup (Before Going Live)

1. Have VS Code open with `cat-counter.php`
2. Terminal ready in plugin directory
3. Plugin Check plugin installed and working
4. PHPCS with WordPress standards installed
5. Font size: 24pt in editor, 20pt in terminal
6. Theme: Light mode with high contrast

---

### Minute 0:00–1:00: Introduction

**Courtney (on screen, showing the plugin):**

> "Here's a plugin I asked an AI to generate. 'Make me a WordPress settings page that counts cats.' It works! I can save, reload, see my data. But let's see what the tools think."

**Show:** Quick demo of plugin working—save some data, reload page.

---

### Minute 1:00–3:00: Run Plugin Check

**Courtney:**

> "First, we run Plugin Check—the official WordPress plugin for pre-submission testing."

**Terminal:**
```bash
wp plugin check cat-counter
```

**Expected Output (summarized on screen):**

```
ERROR: Direct file access to plugin files is not prevented.
  File: cat-counter.php (line 1)

ERROR: All output should be run through an escaping function.
  File: cat-counter.php (line 35, 39, 49)

WARNING: Nonce verification is recommended for form processing.
  File: cat-counter.php (line 52)
```

**Evan (narrating):**

> "So we're seeing three categories here. The first one—direct file access—is about preventing someone from loading this PHP file directly in their browser. Easy fix: one line at the top.
>
> The escaping errors—that's our biggest concern. Right now, if someone saved a cat name like `<script>alert('hacked')</script>`, that would run on the page. Classic XSS.
>
> The nonce warning is about CSRF—making sure this form submission actually came from our admin page, not a malicious link."

---

### Minute 3:00–4:30: Run PHPCS

**Courtney:**

> "Let's get more detail with PHPCS—PHP_CodeSniffer with WordPress Coding Standards."

**Terminal:**
```bash
./vendor/bin/phpcs --standard=WordPress cat-counter.php
```

**Expected Output (key lines):**

```
FILE: cat-counter.php
----------------------------------------------------------------------
FOUND 8 ERRORS AND 3 WARNINGS
----------------------------------------------------------------------
  1 | ERROR | No 'if ( ! defined( 'ABSPATH' ) ) exit;' found
 35 | ERROR | Expected a sanitized and escaped variable
 39 | ERROR | Expected a sanitized and escaped variable
 49 | ERROR | echo statements must contain escaped values
 52 | ERROR | Processing form data without nonce verification
 53 | ERROR | Detected usage of a non-sanitized input variable: $_POST['cat_count']
 54 | ERROR | Detected usage of a non-sanitized input variable: $_POST['cat_name']
```

**Evan:**

> "PHPCS gives us line numbers and specific issues. See how it caught that we're using `$_POST` directly without sanitizing? And it's flagging every `echo` that isn't wrapped in an escape function. These are the exact patterns reviewers look for."

---

### Minute 4:30–7:30: Fix the Issues (Live Coding)

**Courtney:**

> "Let's fix these one at a time."

#### Fix 1: Direct Access Prevention (30 seconds)

Add at line 10 (after opening PHP tag):

```php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
```

**Courtney:** "One line. Prevents direct access."

#### Fix 2: Escape Output in Form Fields (1 minute)

Change line 35:
```php
<td><input type="number" name="cat_count" value="<?php echo esc_attr( $cat_count ); ?>"></td>
```

Change line 39:
```php
<td><input type="text" name="cat_name" value="<?php echo esc_attr( $cat_name ); ?>"></td>
```

**Evan:** "We use `esc_attr()` because this is inside an HTML attribute. If it were text content, we'd use `esc_html()`."

#### Fix 3: Escape Output in Display (30 seconds)

Change line 49:
```php
<p>You have <?php echo esc_html( $cat_count ); ?> cats. Your favorite is <?php echo esc_html( $cat_name ); ?>!</p>
```

#### Fix 4: Add Nonce, Capability Check, Sanitization (1.5 minutes)

Add nonce field in form (after submit button):
```php
<?php wp_nonce_field( 'cat_counter_save', 'cat_counter_nonce' ); ?>
<?php submit_button( 'Save Cat Data' ); ?>
```

Replace save_settings function:
```php
public function save_settings() {
    // Capability check first
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    // Check if our form was submitted
    if ( ! isset( $_POST['cat_counter_nonce'] ) ) {
        return;
    }

    // Verify nonce
    $nonce = sanitize_text_field( wp_unslash( $_POST['cat_counter_nonce'] ) );
    if ( ! wp_verify_nonce( $nonce, 'cat_counter_save' ) ) {
        return;
    }

    // Sanitize and save
    if ( isset( $_POST['cat_count'] ) ) {
        $cat_count = absint( $_POST['cat_count'] );
        update_option( 'cat_count', $cat_count );
    }

    if ( isset( $_POST['cat_name'] ) ) {
        $cat_name = sanitize_text_field( wp_unslash( $_POST['cat_name'] ) );
        update_option( 'cat_name', $cat_name );
    }
}
```

**Evan:** "Notice the order: capability check, then nonce check, then sanitize and save. We fail fast if the user shouldn't be here."

---

### Minute 7:30–8:00: Green Checks Moment

**Courtney:**

> "Let's run the checks again."

**Terminal:**
```bash
wp plugin check cat-counter
```

**Output:**
```
Success: All checks passed!
```

```bash
./vendor/bin/phpcs --standard=WordPress cat-counter.php
```

**Output:**
```
FILE: cat-counter.php
----------------------------------------------------------------------
FOUND 0 ERRORS AND 0 WARNINGS
----------------------------------------------------------------------
```

**Courtney:**

> "Green checks. Ready for review."

**Evan:**

> "And this is what reviewers want to see. Not perfect code—just code that handles security basics. We're not rejecting you to be difficult. We want your plugin to succeed and your users to be safe."

---

## The Fixed Plugin (For Reference/Backup)

```php
<?php
/**
 * Plugin Name: Cat Counter
 * Description: Count your cats!
 * Version: 1.0.0
 * Author: Vibe Coder
 * License: GPL-2.0-or-later
 * Text Domain: cat-counter
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class CatCounter {

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_menu' ) );
        add_action( 'admin_init', array( $this, 'save_settings' ) );
    }

    public function add_menu() {
        add_options_page(
            'Cat Counter',
            'Cat Counter',
            'manage_options',
            'cat-counter',
            array( $this, 'render_page' )
        );
    }

    public function render_page() {
        $cat_count = get_option( 'cat_count', 0 );
        $cat_name  = get_option( 'cat_name', '' );
        ?>
        <div class="wrap">
            <h1><?php esc_html_e( 'Cat Counter', 'cat-counter' ); ?></h1>
            <form method="post">
                <?php wp_nonce_field( 'cat_counter_save', 'cat_counter_nonce' ); ?>
                <table class="form-table">
                    <tr>
                        <th><label for="cat_count"><?php esc_html_e( 'Number of Cats', 'cat-counter' ); ?></label></th>
                        <td><input type="number" id="cat_count" name="cat_count" value="<?php echo esc_attr( $cat_count ); ?>"></td>
                    </tr>
                    <tr>
                        <th><label for="cat_name"><?php esc_html_e( "Favorite Cat's Name", 'cat-counter' ); ?></label></th>
                        <td><input type="text" id="cat_name" name="cat_name" value="<?php echo esc_attr( $cat_name ); ?>"></td>
                    </tr>
                </table>
                <?php submit_button( __( 'Save Cat Data', 'cat-counter' ) ); ?>
            </form>
            <p>
                <?php
                printf(
                    /* translators: 1: number of cats, 2: cat name */
                    esc_html__( 'You have %1$d cats. Your favorite is %2$s!', 'cat-counter' ),
                    absint( $cat_count ),
                    esc_html( $cat_name )
                );
                ?>
            </p>
        </div>
        <?php
    }

    public function save_settings() {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        if ( ! isset( $_POST['cat_counter_nonce'] ) ) {
            return;
        }

        $nonce = sanitize_text_field( wp_unslash( $_POST['cat_counter_nonce'] ) );
        if ( ! wp_verify_nonce( $nonce, 'cat_counter_save' ) ) {
            return;
        }

        if ( isset( $_POST['cat_count'] ) ) {
            $cat_count = absint( $_POST['cat_count'] );
            update_option( 'cat_count', $cat_count );
        }

        if ( isset( $_POST['cat_name'] ) ) {
            $cat_name = sanitize_text_field( wp_unslash( $_POST['cat_name'] ) );
            update_option( 'cat_name', $cat_name );
        }
    }
}

new CatCounter();
```

---

## Backup Plan

If live coding fails:

1. **Pre-recorded video:** 8-minute screencast of exact same demo, tested and working
2. **Code diffs on slides:** Show before/after for each fix as static slides
3. **Live explanation only:** Walk through the code without running tools, explain what each tool would catch

---

## Equipment Checklist

- [ ] VS Code with large font theme saved
- [ ] Terminal with large font configured
- [ ] Plugin Check installed and tested
- [ ] PHPCS with WordPress standards installed and tested
- [ ] Both broken and fixed versions of plugin saved
- [ ] Backup video on USB drive and cloud
- [ ] Slide with before/after code diffs as final backup

---

## Speaker Notes

**Courtney's role:** Drive the demo, type the code, maintain pace, manage transitions.

**Evan's role:** Provide "reviewer perspective" narration. Courtney cues him with:
- "Evan, what do reviewers see when this comes through?"
- "Why does this matter to the review team?"
- "Is this something you see often?"

**Pacing:** Each fix should feel deliberate but not rushed. Audience needs to see the keystrokes.

**If ahead of time:** Slow down the final "green checks" moment; let it land.

**If behind:** Skip i18n fixes (they're polish, not security-critical) and jump to final verification.
