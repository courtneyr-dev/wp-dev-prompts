# Locale and RTL Testing

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Testing WordPress in multiple locales including RTL languages

<skill>
<summary>
Comprehensive testing strategies for WordPress localization including LTR, RTL, and CJK language support.
</summary>

<knowledge>
## Locale Test Matrix

### Recommended Test Locales

| Locale | Direction | Script | Purpose |
|--------|-----------|--------|---------|
| en_US | LTR | Latin | Default baseline |
| es_ES | LTR | Latin | Spanish accents, ñ |
| fr_FR | LTR | Latin | French accents, «» |
| de_DE | LTR | Latin | German umlauts, ß |
| ar | RTL | Arabic | Full RTL, different numerals |
| he_IL | RTL | Hebrew | RTL with LTR numbers |
| ja | LTR | CJK | Japanese multi-byte |
| zh_CN | LTR | CJK | Chinese simplified |
| ko_KR | LTR | CJK | Korean Hangul |

## Environment Setup

### Install Language Packs

```bash
# WP-CLI: Install language packs
wp language core install ar es_ES fr_FR he_IL ja de_DE zh_CN

# Activate a locale site-wide
wp site switch-language ar

# Per-user locale
wp user meta update 1 locale ar

# Multisite: Per-site locale
wp --url=http://localhost:8888/site2 site switch-language ar
```

### Docker Environment

```yaml
# docker-compose.yml
services:
  wordpress:
    environment:
      - WORDPRESS_LOCALE=ar
      # Or pass via entrypoint script

  # Script to set up locales
  locale-setup:
    image: wordpress:cli
    command: |
      wp language core install ar es_ES fr_FR he_IL ja
      wp site switch-language ar
```

## PHPUnit Locale Tests

### Date and Number Formatting

```php
<?php
/**
 * Tests for locale-specific formatting.
 */
class Locale_Formatting_Test extends WP_UnitTestCase {

    /**
     * Test locales to iterate.
     */
    private array $test_locales = [
        'en_US',
        'es_ES',
        'fr_FR',
        'de_DE',
        'ar',
        'ja',
    ];

    /**
     * @dataProvider locale_provider
     */
    public function test_date_formatting( string $locale ) {
        switch_to_locale( $locale );

        $timestamp = strtotime( '2024-12-25 14:30:00' );

        // Use WordPress i18n functions
        $formatted = wp_date( get_option( 'date_format' ), $timestamp );

        // Should not throw error
        $this->assertNotEmpty( $formatted );

        // Should contain expected components
        $this->assertStringContainsString( '2024', $formatted );

        restore_previous_locale();
    }

    /**
     * @dataProvider locale_provider
     */
    public function test_number_formatting( string $locale ) {
        switch_to_locale( $locale );

        $number = 1234567.89;

        $formatted = number_format_i18n( $number, 2 );

        // Should not throw error
        $this->assertNotEmpty( $formatted );

        // Parse back should be close to original
        // (allowing for locale differences)
        $this->assertNotNull( $formatted );

        restore_previous_locale();
    }

    /**
     * @dataProvider locale_provider
     */
    public function test_currency_display( string $locale ) {
        switch_to_locale( $locale );

        $amount = 1234.56;

        // Your plugin's currency formatting
        $formatted = my_plugin_format_currency( $amount );

        $this->assertNotEmpty( $formatted );

        restore_previous_locale();
    }

    public function locale_provider(): array {
        return array_map( fn( $l ) => [ $l ], $this->test_locales );
    }
}
```

### RTL-Specific Tests

```php
<?php
/**
 * Tests for RTL layout and content.
 */
class RTL_Test extends WP_UnitTestCase {

    private array $rtl_locales = [ 'ar', 'he_IL', 'fa_IR' ];

    /**
     * @dataProvider rtl_locale_provider
     */
    public function test_is_rtl_detection( string $locale ) {
        switch_to_locale( $locale );

        $this->assertTrue( is_rtl(), "is_rtl() should return true for {$locale}" );

        restore_previous_locale();
    }

    public function test_rtl_css_class_added() {
        switch_to_locale( 'ar' );

        // Simulate body class
        $classes = get_body_class();

        $this->assertContains( 'rtl', $classes );

        restore_previous_locale();
    }

    /**
     * Test mixed RTL/LTR content (e.g., Arabic with numbers).
     */
    public function test_mixed_direction_content() {
        switch_to_locale( 'ar' );

        $mixed = 'السعر: 123.45 دولار';

        // Store and retrieve
        $post_id = $this->factory()->post->create( [
            'post_content' => $mixed,
        ] );

        $retrieved = get_post( $post_id )->post_content;

        $this->assertEquals( $mixed, $retrieved );

        restore_previous_locale();
    }

    public function rtl_locale_provider(): array {
        return array_map( fn( $l ) => [ $l ], $this->rtl_locales );
    }
}
```

### Text Domain Tests

```php
<?php
/**
 * Tests for translation text domain.
 */
class Text_Domain_Test extends WP_UnitTestCase {

    public function test_text_domain_is_loaded() {
        // Verify text domain is loaded
        global $l10n;

        // Trigger plugin load
        do_action( 'plugins_loaded' );

        $this->assertArrayHasKey( 'my-plugin', $l10n );
    }

    public function test_load_timing_is_correct() {
        // Text domain should load on init or plugins_loaded
        $this->assertNotFalse(
            has_action( 'init', 'my_plugin_load_textdomain' )
        );
    }

    /**
     * @dataProvider translation_function_provider
     */
    public function test_translation_functions_work( string $function, array $args ) {
        switch_to_locale( 'es_ES' );

        // Call translation function
        $result = call_user_func_array( $function, $args );

        // Should return string
        $this->assertIsString( $result );

        // Should not be empty
        $this->assertNotEmpty( $result );

        restore_previous_locale();
    }

    public function translation_function_provider(): array {
        return [
            [ '__', [ 'Hello', 'my-plugin' ] ],
            [ 'esc_html__', [ 'Hello', 'my-plugin' ] ],
            [ 'esc_attr__', [ 'Hello', 'my-plugin' ] ],
            [ '_x', [ 'Post', 'noun', 'my-plugin' ] ],
            [ '_n', [ '%d item', '%d items', 1, 'my-plugin' ] ],
        ];
    }
}
```

## Playwright Locale Tests

### Visual Regression with RTL

```typescript
// tests/e2e/rtl.spec.ts
import { test, expect } from '@playwright/test';

const locales = [
    { code: 'en_US', dir: 'ltr', name: 'English' },
    { code: 'ar', dir: 'rtl', name: 'Arabic' },
    { code: 'he_IL', dir: 'rtl', name: 'Hebrew' },
];

for (const locale of locales) {
    test.describe(`Locale: ${locale.name} (${locale.dir.toUpperCase()})`, () => {
        test.beforeEach(async ({ page }) => {
            // Switch WordPress locale
            // This requires a helper endpoint or WP-CLI
            await page.goto(`/wp-admin/admin-ajax.php?action=switch_locale&locale=${locale.code}`);
        });

        test(`settings page renders correctly in ${locale.dir}`, async ({ page }) => {
            await page.goto('/wp-admin/options-general.php?page=my-plugin');

            // Check direction
            const htmlDir = await page.getAttribute('html', 'dir');
            if (locale.dir === 'rtl') {
                expect(htmlDir).toBe('rtl');
            }

            // Visual snapshot
            await expect(page).toHaveScreenshot(`settings-${locale.code}.png`, {
                fullPage: true,
            });
        });

        test(`frontend block renders correctly in ${locale.dir}`, async ({ page }) => {
            await page.goto('/sample-page/');

            const block = page.locator('.wp-block-my-plugin-my-block');

            await expect(block).toHaveScreenshot(`block-${locale.code}.png`);
        });

        test(`admin notices render correctly in ${locale.dir}`, async ({ page }) => {
            await page.goto('/wp-admin/plugins.php');

            // Trigger a notice
            await page.click('text=Activate');

            const notice = page.locator('.notice');
            await expect(notice).toHaveScreenshot(`notice-${locale.code}.png`);
        });
    });
}
```

### Date/Number Display Tests

```typescript
test.describe('Locale Formatting', () => {
    test('dates display correctly in different locales', async ({ page }) => {
        const testDate = '2024-12-25';

        for (const locale of ['en_US', 'fr_FR', 'de_DE', 'ja']) {
            // Switch locale
            await page.goto(`/wp-admin/admin-ajax.php?action=switch_locale&locale=${locale}`);

            // Go to page with dates
            await page.goto('/wp-admin/edit.php');

            // Verify dates are formatted
            const dateCell = page.locator('.column-date').first();
            await expect(dateCell).not.toBeEmpty();

            // Screenshot for manual review
            await expect(dateCell).toHaveScreenshot(`date-${locale}.png`);
        }
    });

    test('numbers display correctly in different locales', async ({ page }) => {
        for (const locale of ['en_US', 'de_DE', 'fr_FR']) {
            await page.goto(`/wp-admin/admin-ajax.php?action=switch_locale&locale=${locale}`);

            await page.goto('/wp-admin/options-general.php?page=my-plugin');

            // Check number inputs
            const numberDisplay = page.locator('.my-plugin-number-display');
            await expect(numberDisplay).toHaveScreenshot(`number-${locale}.png`);
        }
    });
});
```

### RTL Layout Validation

```typescript
test.describe('RTL Layout', () => {
    test.beforeEach(async ({ page }) => {
        // Switch to Arabic
        await page.goto('/wp-admin/admin-ajax.php?action=switch_locale&locale=ar');
    });

    test('sidebar is on the right in RTL', async ({ page }) => {
        await page.goto('/wp-admin/');

        const sidebar = page.locator('#adminmenuwrap');
        const box = await sidebar.boundingBox();

        // In RTL, sidebar should be on the right
        const viewportWidth = page.viewportSize()?.width || 1280;
        expect(box?.x).toBeGreaterThan(viewportWidth / 2);
    });

    test('text alignment is correct in RTL', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        const label = page.locator('label').first();
        const textAlign = await label.evaluate((el) => {
            return window.getComputedStyle(el).textAlign;
        });

        expect(['right', 'start']).toContain(textAlign);
    });

    test('form layout mirrors correctly', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Labels should be on the right
        const labelBox = await page.locator('label').first().boundingBox();
        const inputBox = await page.locator('input[type="text"]').first().boundingBox();

        // In RTL, label x should be greater than input x
        if (labelBox && inputBox) {
            expect(labelBox.x).toBeGreaterThan(inputBox.x);
        }
    });

    test('icons and arrows point correctly', async ({ page }) => {
        await page.goto('/wp-admin/');

        // Check that arrow icons are mirrored
        await expect(page).toHaveScreenshot('admin-rtl-full.png', {
            fullPage: true,
        });
    });
});
```

## CSS RTL Testing

### Automated RTL CSS Checks

```javascript
// rtl-css-check.js
const rtlcss = require('rtlcss');
const fs = require('fs');

// Read original CSS
const css = fs.readFileSync('dist/style.css', 'utf8');

// Generate RTL version
const rtlCss = rtlcss.process(css);

// Save RTL version
fs.writeFileSync('dist/style-rtl.css', rtlCss);

// Verify logical properties are used (better than physical)
const physicalProps = [
    'margin-left',
    'margin-right',
    'padding-left',
    'padding-right',
    'text-align: left',
    'text-align: right',
    'float: left',
    'float: right',
];

let warnings = [];
physicalProps.forEach(prop => {
    if (css.includes(prop)) {
        warnings.push(`Warning: Found physical property "${prop}" - consider using logical properties`);
    }
});

if (warnings.length > 0) {
    console.log('RTL CSS Warnings:');
    warnings.forEach(w => console.log(w));
}
```

### Logical Properties

```css
/* ❌ Physical properties (need RTL override) */
.component {
    margin-left: 1rem;
    padding-right: 2rem;
    text-align: left;
    float: right;
}

/* ✅ Logical properties (auto-RTL) */
.component {
    margin-inline-start: 1rem;
    padding-inline-end: 2rem;
    text-align: start;
    float: inline-end;
}
```

## CI Configuration

### Multi-Locale Test Matrix

```yaml
name: Locale Tests

on: [push, pull_request]

jobs:
  locale-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        locale: [en_US, es_ES, ar, he_IL, ja]

    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: Start WordPress
        run: npx wp-env start

      - name: Install locale
        run: |
          npx wp-env run cli wp language core install ${{ matrix.locale }}
          npx wp-env run cli wp site switch-language ${{ matrix.locale }}

      - name: Run locale-specific tests
        run: ./vendor/bin/phpunit --group locale

      - name: Run Playwright RTL tests
        if: matrix.locale == 'ar' || matrix.locale == 'he_IL'
        run: npx playwright test tests/e2e/rtl.spec.ts

  rtl-visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npx playwright install --with-deps chromium

      - name: Start WordPress
        run: npx wp-env start

      - name: Set up RTL locale
        run: |
          npx wp-env run cli wp language core install ar
          npx wp-env run cli wp site switch-language ar

      - name: Run visual regression
        run: npx playwright test tests/e2e/rtl-visual.spec.ts

      - name: Upload screenshots
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: rtl-screenshots
          path: test-results/
```

## POT File Validation

```bash
# Generate POT file
wp i18n make-pot . languages/my-plugin.pot \
    --domain=my-plugin \
    --exclude=vendor,node_modules,tests

# Validate POT file
msgfmt --check languages/my-plugin.pot

# Check for missing translator comments
grep -B1 '%s\|%d\|%1\$s' languages/my-plugin.pot | grep -v 'translators:'
```
</knowledge>

<best_practices>
- Test in at least one RTL locale (ar or he_IL)
- Use logical CSS properties for auto-RTL
- Use wp_date() instead of date() for i18n
- Use number_format_i18n() for numbers
- Include translator comments for placeholders
- Run visual regression in both LTR and RTL
</best_practices>

<commands>
```bash
# Install language packs
wp language core install ar es_ES fr_FR ja

# Switch site locale
wp site switch-language ar

# Generate POT file
wp i18n make-pot . languages/my-plugin.pot

# Run Playwright RTL tests
npx playwright test tests/e2e/rtl.spec.ts

# Generate RTL CSS
npx rtlcss style.css style-rtl.css
```
</commands>
</skill>
