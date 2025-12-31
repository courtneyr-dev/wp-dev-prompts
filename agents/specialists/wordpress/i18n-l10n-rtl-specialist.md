# 🌍 i18n/L10n/RTL Specialist

> **Type**: Specialist
> **Domain**: Internationalization
> **Authority**: Translations, localization, RTL layout, locale handling

## 🎯 Mission

Own all internationalization concerns including string translation, locale handling, RTL layout support, and localization patterns. Ensure plugins work correctly across languages and writing directions.

## 📥 Inputs

- Strings requiring translation
- Locale requirements
- RTL support needs
- Date/time/currency format requirements
- Pluralization rules

## 📤 Outputs

- Properly wrapped strings
- POT file generation
- RTL CSS adjustments
- Locale-aware formatting
- Translation workflow setup

---

## 🔧 When to Use

✅ **Use this agent when:**
- Adding user-facing strings
- Setting up translation workflow
- Supporting RTL languages
- Handling dates/currencies/numbers
- Creating POT files
- Testing locale switching

❌ **Don't use for:**
- Internal debug messages
- Developer-only strings
- Database content translation
- Performance optimization

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Concatenated strings | Use sprintf() with placeholders |
| Missing text domain | Always specify text domain |
| Hardcoded date formats | Use date_i18n() and wp_date() |
| Ignoring RTL | Test with AR or HE locale |
| Pluralization bugs | Use _n() correctly |

---

## ✅ Checklist

### String Preparation
- [ ] All user-facing strings use translation functions
- [ ] Text domain matches plugin slug
- [ ] Strings are developer-friendly for translators
- [ ] No string concatenation (use placeholders)
- [ ] Proper context with _x() where needed

### POT File
- [ ] POT file generated and current
- [ ] Includes all translatable strings
- [ ] Located in languages/ directory
- [ ] Comments provide context

### RTL Support
- [ ] CSS handles RTL via logical properties or [dir="rtl"]
- [ ] Icons/arrows flip correctly
- [ ] Forms lay out correctly
- [ ] No hardcoded left/right values

### Locale Handling
- [ ] Dates use wp_date() or date_i18n()
- [ ] Numbers use number_format_i18n()
- [ ] Currency respects locale conventions
- [ ] Time zones handled correctly

### Testing
- [ ] Test with non-English locale
- [ ] Test with RTL locale (ar, he_IL)
- [ ] Test pluralization with 0, 1, 2, 5
- [ ] Verify POT file is complete

---

## 💬 Example Prompts

### Claude Code
```
@i18n-l10n-rtl-specialist Review this component for i18n issues.
Check string wrapping, RTL support, and date formatting.
```

### Cursor
```
Using i18n-l10n-rtl-specialist, set up the translation workflow
for this plugin including POT generation, language directory,
and textdomain loading.
```

### GitHub Copilot
```
# i18n Task: RTL Layout Fix
#
# This admin panel has layout issues in Arabic:
# - Sidebar on wrong side
# - Icons don't flip
# - Dates in wrong format
#
# Fix CSS and PHP for proper RTL support
```

### General Prompt
```
Prepare this plugin for translation:
1. Wrap all strings properly
2. Set up POT file generation
3. Add RTL stylesheet support
4. Handle date/time formatting
5. Support plural forms correctly

Current locale support needed: English, Spanish, Arabic, Hebrew
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [multisite-specialist](multisite-specialist.md) | Per-site locales |
| [visual-regression](../testing/visual-regression.md) | RTL screenshots |
| [a11y-tree-and-aria-auditor](../accessibility/a11y-tree-and-aria-auditor.md) | Locale + a11y |
| [packaging-and-dist-builder](../release/packaging-and-dist-builder.md) | Language files in dist |

---

## 📋 Translation Functions

### Basic Translation

```php
// Simple string
__( 'Hello World', 'my-plugin' );

// Escaped for HTML output
esc_html__( 'Hello World', 'my-plugin' );

// Escaped for attributes
esc_attr__( 'Button label', 'my-plugin' );

// Echo version
esc_html_e( 'Hello World', 'my-plugin' );
```

### With Context

```php
// Same string, different meaning
_x( 'Post', 'noun: a blog post', 'my-plugin' );
_x( 'Post', 'verb: to publish', 'my-plugin' );

// Escaped versions
esc_html_x( 'Read', 'past tense', 'my-plugin' );
esc_html_x( 'Read', 'imperative', 'my-plugin' );
```

### Pluralization

```php
// Correct pluralization
$count = 5;
$message = sprintf(
    /* translators: %d: number of items */
    _n(
        '%d item found',
        '%d items found',
        $count,
        'my-plugin'
    ),
    $count
);

// With context
_nx(
    '%d result',
    '%d results',
    $count,
    'search results',
    'my-plugin'
);
```

### With Placeholders

```php
// Named placeholders for translator clarity
sprintf(
    /* translators: 1: user name, 2: post title */
    esc_html__( '%1$s commented on "%2$s"', 'my-plugin' ),
    $user_name,
    $post_title
);

// Don't do this - hard for translators
__( 'Posted by ' . $name, 'my-plugin' ); // BAD
sprintf( __( 'Posted by %s', 'my-plugin' ), $name ); // GOOD
```

---

## 🔧 Text Domain Setup

### Loading Translations

```php
// In main plugin file
add_action( 'init', function() {
    load_plugin_textdomain(
        'my-plugin',
        false,
        dirname( plugin_basename( __FILE__ ) ) . '/languages'
    );
} );

// For themes
add_action( 'after_setup_theme', function() {
    load_theme_textdomain( 'my-theme', get_template_directory() . '/languages' );
} );
```

### POT File Generation

```json
// package.json
{
    "scripts": {
        "make-pot": "wp i18n make-pot . languages/my-plugin.pot --domain=my-plugin"
    }
}
```

```makefile
# Makefile
.PHONY: pot
pot:
	wp i18n make-pot . languages/my-plugin.pot \
		--domain=my-plugin \
		--exclude=node_modules,vendor,tests
```

---

## 🔄 RTL Support

### CSS Logical Properties (Preferred)

```css
/* Use logical properties instead of physical */
.my-component {
    /* Instead of: margin-left: 1rem; */
    margin-inline-start: 1rem;

    /* Instead of: padding-right: 2rem; */
    padding-inline-end: 2rem;

    /* Instead of: text-align: left; */
    text-align: start;

    /* Instead of: float: left; */
    float: inline-start;

    /* Instead of: border-left: 1px solid; */
    border-inline-start: 1px solid;
}
```

### RTL Stylesheet

```css
/* style-rtl.css */
[dir="rtl"] .my-component {
    /* Override specific properties */
    margin-left: 0;
    margin-right: 1rem;
}

[dir="rtl"] .arrow-icon {
    transform: scaleX(-1);
}

[dir="rtl"] .progress-bar {
    direction: rtl;
}
```

### Loading RTL Styles

```php
// Automatically load RTL version
wp_enqueue_style(
    'my-plugin-style',
    plugins_url( 'assets/css/style.css', __FILE__ ),
    [],
    MY_PLUGIN_VERSION
);

wp_style_add_data( 'my-plugin-style', 'rtl', 'replace' );
// WordPress will load style-rtl.css for RTL locales
```

### Generating RTL CSS

```json
// package.json
{
    "scripts": {
        "build:rtl": "rtlcss assets/css/style.css assets/css/style-rtl.css"
    }
}
```

---

## 📅 Date/Time/Number Formatting

### Dates

```php
// Use WordPress functions, not PHP date()
$formatted = wp_date( 'F j, Y', $timestamp );

// Or date_i18n for backwards compatibility
$formatted = date_i18n( get_option( 'date_format' ), $timestamp );

// Human readable
$diff = human_time_diff( $past_timestamp, current_time( 'timestamp' ) );
// Returns: "3 hours" (localized)
```

### Numbers

```php
// Format with locale separators
$formatted = number_format_i18n( 1234567.89, 2 );
// Returns: "1,234,567.89" or "1.234.567,89" depending on locale

// File sizes
$formatted = size_format( $bytes );
// Returns: "1.5 MB" (localized)
```

### Currency

```php
// No built-in WordPress function; use custom
function my_plugin_format_currency( $amount, $currency = 'USD' ) {
    $locale = get_locale();

    $formatter = new NumberFormatter( $locale, NumberFormatter::CURRENCY );
    return $formatter->formatCurrency( $amount, $currency );
}
```

---

## 🧪 Testing i18n/RTL

### PHPUnit Tests

```php
class I18n_Test extends WP_UnitTestCase {

    public function test_strings_are_translatable(): void {
        // Switch to test locale
        switch_to_locale( 'de_DE' );

        // Your function should return translated string
        // (if translations exist)
        $result = my_plugin_get_greeting();

        // Restore
        restore_previous_locale();
    }

    public function test_rtl_locale_detected(): void {
        switch_to_locale( 'ar' );

        $this->assertTrue( is_rtl() );

        restore_previous_locale();
    }

    public function test_pluralization(): void {
        $this->assertStringContainsString(
            'item',
            my_plugin_count_message( 1 )
        );
        $this->assertStringContainsString(
            'items',
            my_plugin_count_message( 5 )
        );
    }
}
```

### E2E RTL Test

```typescript
// tests/e2e/rtl.spec.ts
import { test, expect } from '@playwright/test';

test.describe('RTL Support', () => {

    test.beforeEach(async ({ page }) => {
        // Switch to Arabic
        await page.goto('/wp-admin/options-general.php');
        await page.selectOption('#WPLANG', 'ar');
        await page.click('#submit');
    });

    test('layout is mirrored in RTL', async ({ page }) => {
        await page.goto('/wp-admin/admin.php?page=my-plugin');

        // Check direction
        const html = await page.locator('html');
        await expect(html).toHaveAttribute('dir', 'rtl');

        // Visual regression for RTL
        await expect(page).toHaveScreenshot('admin-page-rtl.png');
    });

    test('forms are right-aligned in RTL', async ({ page }) => {
        await page.goto('/wp-admin/admin.php?page=my-plugin');

        const form = page.locator('.my-plugin-form');
        const textAlign = await form.evaluate(el =>
            getComputedStyle(el).textAlign
        );

        expect(textAlign).toBe('right');
    });
});
```

---

## 📋 Translator Notes

```php
// Good: Provides context for translators
sprintf(
    /* translators: %s: User display name */
    esc_html__( 'Welcome back, %s!', 'my-plugin' ),
    $user->display_name
);

// Good: Explains placeholder order
sprintf(
    /* translators: 1: Start date, 2: End date */
    esc_html__( 'Event runs from %1$s to %2$s', 'my-plugin' ),
    $start_date,
    $end_date
);

// Good: Notes about HTML in string
printf(
    /* translators: %s: Link to documentation. */
    wp_kses(
        __( 'See <a href="%s">documentation</a> for details.', 'my-plugin' ),
        [ 'a' => [ 'href' => [] ] ]
    ),
    esc_url( $docs_url )
);
```

---

## 📦 Language File Structure

```
my-plugin/
├── languages/
│   ├── my-plugin.pot          # Template
│   ├── my-plugin-es_ES.po     # Spanish translation
│   ├── my-plugin-es_ES.mo     # Compiled Spanish
│   ├── my-plugin-ar.po        # Arabic translation
│   ├── my-plugin-ar.mo        # Compiled Arabic
│   └── my-plugin-he_IL.po     # Hebrew translation
```

### CI Check for POT File

```yaml
# .github/workflows/i18n.yml
name: i18n
on: [pull_request]

jobs:
  pot-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generate POT
        run: |
          npm install
          npm run make-pot

      - name: Check for changes
        run: |
          if git diff --exit-code languages/my-plugin.pot; then
            echo "POT file is up to date"
          else
            echo "POT file needs updating"
            exit 1
          fi
```
