# Encoding and Unicode Edge Cases

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Testing Unicode, emoji, and encoding edge cases in WordPress

<skill>
<summary>
Testing strategies for Unicode handling including emoji, combining marks, RTL mixed content, and encoding edge cases.
</summary>

<knowledge>
## Unicode Test Cases

### Character Categories

| Category | Example | Test Purpose |
|----------|---------|--------------|
| Basic Latin | Hello World | Baseline |
| Extended Latin | café, naïve, résumé | Accented characters |
| Combining Marks | e + ́ = é | Composed vs decomposed |
| Emoji | 😅 🎉 👨‍👩‍👧‍👦 | Modern Unicode |
| RTL + Numbers | العربية 123 | Bidirectional |
| CJK | 日本語 中文 | Multi-byte |
| Zero-width | U+200B, U+FEFF | Invisible characters |
| Long strings | 1000+ chars | Overflow/truncation |

## PHPUnit Unicode Tests

### Storage and Retrieval

```php
<?php
/**
 * Tests for Unicode content handling.
 */
class Unicode_Storage_Test extends WP_UnitTestCase {

    /**
     * Test emoji storage and retrieval.
     */
    public function test_emoji_storage() {
        $emoji_content = 'Test with emoji 😅 🎉 🚀 👨‍👩‍👧‍👦';

        $post_id = $this->factory()->post->create( [
            'post_content' => $emoji_content,
            'post_title'   => 'Emoji Post 🎯',
        ] );

        $post = get_post( $post_id );

        $this->assertEquals( $emoji_content, $post->post_content );
        $this->assertEquals( 'Emoji Post 🎯', $post->post_title );
    }

    /**
     * Test combining marks (composed vs decomposed).
     */
    public function test_combining_marks() {
        // Composed form: é (single character)
        $composed = 'café';

        // Decomposed form: e + combining acute accent (two characters)
        $decomposed = "cafe\xCC\x81";

        $post_id = $this->factory()->post->create( [
            'post_content' => $composed,
        ] );

        $post = get_post( $post_id );

        // Should store as-is
        $this->assertEquals( $composed, $post->post_content );

        // Test with decomposed
        update_post_meta( $post_id, 'decomposed', $decomposed );
        $retrieved = get_post_meta( $post_id, 'decomposed', true );

        $this->assertEquals( $decomposed, $retrieved );
    }

    /**
     * Test RTL content with embedded LTR (numbers, URLs).
     */
    public function test_rtl_mixed_content() {
        $mixed_content = [
            'Arabic with numbers: العربية 123',
            'Hebrew with URL: עברית https://example.com',
            'Arabic with date: التاريخ 2024-12-25',
            'Hebrew with email: דוא"ל test@example.com',
        ];

        foreach ( $mixed_content as $content ) {
            $post_id = $this->factory()->post->create( [
                'post_content' => $content,
            ] );

            $post = get_post( $post_id );

            $this->assertEquals(
                $content,
                $post->post_content,
                "Failed to store mixed RTL/LTR: {$content}"
            );
        }
    }

    /**
     * Test CJK content.
     */
    public function test_cjk_content() {
        $cjk_content = [
            'Japanese: 日本語テスト',
            'Chinese: 中文测试内容',
            'Korean: 한국어 테스트',
            'Mixed: 日本語 meets English',
        ];

        foreach ( $cjk_content as $content ) {
            update_option( 'cjk_test', $content );
            $retrieved = get_option( 'cjk_test' );

            $this->assertEquals( $content, $retrieved );
        }
    }

    /**
     * Test zero-width characters.
     */
    public function test_zero_width_characters() {
        // Zero-width space
        $zws = "Hello\u{200B}World";

        // Zero-width non-joiner
        $zwnj = "Test\u{200C}Content";

        // BOM
        $bom = "\u{FEFF}Content with BOM";

        $test_cases = [ $zws, $zwnj, $bom ];

        foreach ( $test_cases as $content ) {
            update_option( 'zw_test', $content );
            $retrieved = get_option( 'zw_test' );

            // Should preserve or handle consistently
            $this->assertNotEmpty( $retrieved );
        }
    }

    /**
     * Test long strings (overflow scenarios).
     */
    public function test_long_strings() {
        // 1000 character string
        $long_latin = str_repeat( 'a', 1000 );

        // 1000 emoji (each is 4 bytes)
        $long_emoji = str_repeat( '😅', 1000 );

        // 1000 CJK characters (each is 3 bytes)
        $long_cjk = str_repeat( '日', 1000 );

        $test_cases = [
            'long_latin' => $long_latin,
            'long_emoji' => $long_emoji,
            'long_cjk'   => $long_cjk,
        ];

        foreach ( $test_cases as $key => $content ) {
            update_option( $key, $content );
            $retrieved = get_option( $key );

            $this->assertEquals( $content, $retrieved, "Failed for {$key}" );
        }
    }
}
```

### Sanitization with Unicode

```php
<?php
/**
 * Tests for sanitization preserving Unicode.
 */
class Unicode_Sanitization_Test extends WP_UnitTestCase {

    public function test_sanitize_text_field_preserves_unicode() {
        $inputs = [
            'café résumé',
            '日本語テスト',
            'العربية',
            'Test 😅 emoji',
        ];

        foreach ( $inputs as $input ) {
            $sanitized = sanitize_text_field( $input );

            // Should preserve Unicode text
            $this->assertEquals( $input, $sanitized );
        }
    }

    public function test_wp_kses_post_preserves_unicode() {
        $content = '<p>Hello 日本語 with <strong>emoji 😅</strong></p>';

        $sanitized = wp_kses_post( $content );

        $this->assertStringContainsString( '日本語', $sanitized );
        $this->assertStringContainsString( '😅', $sanitized );
    }

    public function test_esc_html_preserves_unicode() {
        $inputs = [
            'café & résumé',
            '日本語 > テスト',
            'العربية < العربية',
        ];

        foreach ( $inputs as $input ) {
            $escaped = esc_html( $input );

            // HTML entities for special chars, but Unicode preserved
            $this->assertStringNotContainsString( '<', $escaped );
            $this->assertStringNotContainsString( '>', $escaped );
        }
    }

    public function test_sanitize_file_name_with_unicode() {
        $filenames = [
            'café.jpg'       => 'cafe.jpg', // Accents stripped
            '日本語.png'     => '日本語.png', // May be preserved or sanitized
            'test 😅.gif'    => 'test-.gif', // Emoji stripped
        ];

        foreach ( $filenames as $input => $expectation ) {
            $sanitized = sanitize_file_name( $input );

            // Should be safe for filesystem
            $this->assertNotEmpty( $sanitized );
            $this->assertMatchesRegularExpression( '/^[\w\-\.]+$/', $sanitized );
        }
    }
}
```

### Database Encoding

```php
<?php
/**
 * Tests for database encoding.
 */
class Database_Encoding_Test extends WP_UnitTestCase {

    public function test_database_uses_utf8mb4() {
        global $wpdb;

        $charset = $wpdb->get_var(
            "SELECT @@character_set_database"
        );

        $this->assertEquals( 'utf8mb4', $charset );
    }

    public function test_direct_query_with_unicode() {
        global $wpdb;

        $content = 'Test content with emoji 😅 and Japanese 日本語';

        $wpdb->insert(
            $wpdb->postmeta,
            [
                'post_id'    => 1,
                'meta_key'   => 'unicode_test',
                'meta_value' => $content,
            ],
            [ '%d', '%s', '%s' ]
        );

        $retrieved = $wpdb->get_var( $wpdb->prepare(
            "SELECT meta_value FROM {$wpdb->postmeta}
             WHERE meta_key = %s",
            'unicode_test'
        ) );

        $this->assertEquals( $content, $retrieved );
    }

    public function test_json_encoding_with_unicode() {
        $data = [
            'title'   => 'Test 日本語',
            'content' => 'Content with emoji 😅',
            'rtl'     => 'العربية 123',
        ];

        $json = wp_json_encode( $data );

        // Should not escape Unicode
        $this->assertStringContainsString( '日本語', $json );
        $this->assertStringContainsString( '😅', $json );

        // Should decode correctly
        $decoded = json_decode( $json, true );
        $this->assertEquals( $data, $decoded );
    }
}
```

## Playwright Unicode Tests

### UI Display Tests

```typescript
// tests/e2e/unicode.spec.ts
import { test, expect } from '@playwright/test';

const unicodeTestCases = [
    { name: 'emoji', value: 'Test with emoji 😅 🎉 🚀', display: '😅' },
    { name: 'japanese', value: '日本語テスト', display: '日本語' },
    { name: 'arabic', value: 'العربية مع رقم 123', display: 'العربية' },
    { name: 'combining', value: 'café résumé naïve', display: 'café' },
    { name: 'mixed', value: 'English 日本語 العربية 😅', display: 'English' },
];

test.describe('Unicode Display', () => {
    for (const tc of unicodeTestCases) {
        test(`displays ${tc.name} correctly`, async ({ page }) => {
            await page.goto('/wp-admin/post-new.php');

            // Enter Unicode title
            await page.fill('[aria-label="Add title"]', tc.value);

            // Save post
            await page.click('button:has-text("Publish")');
            await page.click('button:has-text("Publish"):not([aria-disabled])');

            // Verify saved
            await page.goto('/wp-admin/edit.php');

            const titleCell = page.locator('.row-title').first();
            await expect(titleCell).toContainText(tc.display);

            // Visual snapshot
            await expect(titleCell).toHaveScreenshot(`title-${tc.name}.png`);
        });
    }
});

test.describe('Long String Handling', () => {
    test('handles long titles without breaking layout', async ({ page }) => {
        const longTitle = 'A'.repeat(200);

        await page.goto('/wp-admin/post-new.php');
        await page.fill('[aria-label="Add title"]', longTitle);

        // Check for overflow
        const titleInput = page.locator('[aria-label="Add title"]');
        const box = await titleInput.boundingBox();

        // Should not exceed expected width
        expect(box?.width).toBeLessThan(1000);

        // Visual check
        await expect(page).toHaveScreenshot('long-title-editor.png');
    });

    test('handles long CJK content', async ({ page }) => {
        const longCJK = '日'.repeat(500);

        await page.goto('/wp-admin/post-new.php');
        await page.fill('[aria-label="Add title"]', 'CJK Test');

        // Add content in editor
        await page.click('.block-editor-writing-flow');
        await page.keyboard.type(longCJK);

        // Should not break
        await expect(page.locator('.block-editor-writing-flow')).toBeVisible();
    });

    test('handles long emoji content', async ({ page }) => {
        const longEmoji = '😅'.repeat(100);

        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        const input = page.locator('input[type="text"]').first();
        await input.fill(longEmoji);

        // Check no overflow
        await expect(input).toBeVisible();
        await expect(page).toHaveScreenshot('long-emoji-input.png');
    });
});
```

### Form Input Tests

```typescript
test.describe('Unicode in Forms', () => {
    test('settings save and display Unicode correctly', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Test various Unicode inputs
        const inputs = {
            title: 'タイトル 😅',
            description: 'Description avec des accents: café, résumé',
            arabic: 'النص العربي',
        };

        for (const [field, value] of Object.entries(inputs)) {
            await page.fill(`#my-plugin-${field}`, value);
        }

        // Save
        await page.click('#submit');

        // Verify on reload
        await page.reload();

        for (const [field, value] of Object.entries(inputs)) {
            await expect(page.locator(`#my-plugin-${field}`)).toHaveValue(value);
        }
    });

    test('search works with Unicode', async ({ page }) => {
        // Create post with Japanese title
        await page.goto('/wp-admin/post-new.php');
        await page.fill('[aria-label="Add title"]', '日本語テスト記事');
        await page.click('button:has-text("Publish")');
        await page.click('button:has-text("Publish"):not([aria-disabled])');

        // Search for it
        await page.goto('/wp-admin/edit.php');
        await page.fill('#post-search-input', '日本語');
        await page.click('#search-submit');

        // Should find post
        await expect(page.locator('.row-title')).toContainText('日本語');
    });
});
```

### Visual Regression with Unicode

```typescript
test.describe('Unicode Visual Regression', () => {
    const snapshotPages = [
        { url: '/sample-page/', name: 'frontend' },
        { url: '/wp-admin/', name: 'admin' },
        { url: '/wp-admin/options-general.php?page=my-plugin', name: 'settings' },
    ];

    test.beforeEach(async ({ page }) => {
        // Set up content with Unicode
        await page.goto('/wp-admin/post.php?post=2&action=edit');

        // Add Unicode content
        await page.fill('[aria-label="Add title"]', 'Test 日本語 😅 العربية');
        await page.click('button:has-text("Update")');
    });

    for (const p of snapshotPages) {
        test(`${p.name} renders Unicode correctly`, async ({ page }) => {
            await page.goto(p.url);

            await expect(page).toHaveScreenshot(`unicode-${p.name}.png`, {
                fullPage: true,
            });
        });
    }
});
```

## Database Migration Edge Cases

```php
<?php
/**
 * Tests for encoding during migration/upgrade.
 */
class Encoding_Migration_Test extends WP_UnitTestCase {

    public function test_migration_preserves_unicode() {
        // Simulate old data
        global $wpdb;

        $old_data = [
            'emoji_content' => 'Old content with emoji 😅',
            'cjk_content'   => '古い日本語コンテンツ',
        ];

        foreach ( $old_data as $key => $value ) {
            update_option( "old_{$key}", $value );
        }

        // Run migration
        my_plugin_run_migration();

        // Verify data preserved
        foreach ( $old_data as $key => $value ) {
            $migrated = get_option( "new_{$key}" );
            $this->assertEquals( $value, $migrated, "Migration lost encoding for {$key}" );
        }
    }

    public function test_charset_conversion() {
        // Simulate latin1 to utf8mb4 conversion
        global $wpdb;

        // Data that might have been stored in latin1
        $problematic = [
            'Smart quotes: "test"',
            'Em dash: —',
            'Euro: €',
        ];

        foreach ( $problematic as $content ) {
            // Store and retrieve
            $post_id   = $this->factory()->post->create( [
                'post_content' => $content,
            ] );
            $retrieved = get_post( $post_id )->post_content;

            // Should not be mojibake
            $this->assertStringNotContainsString( 'â€', $retrieved );
            $this->assertStringNotContainsString( 'Ã', $retrieved );
        }
    }
}
```

## CI Configuration

```yaml
name: Unicode Tests

on: [push, pull_request]

jobs:
  unicode-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: Start WordPress
        run: npx wp-env start

      - name: Verify utf8mb4
        run: |
          npx wp-env run cli wp db query "SELECT @@character_set_database"

      - name: Run encoding tests
        run: ./vendor/bin/phpunit --group encoding

      - name: Run Playwright Unicode tests
        run: npx playwright test tests/e2e/unicode.spec.ts

      - name: Upload screenshots
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: unicode-screenshots
          path: test-results/
```
</knowledge>

<best_practices>
- Always use utf8mb4 database charset
- Test with emoji, CJK, and RTL content
- Test combining marks (composed vs decomposed)
- Test long strings for overflow
- Use wp_json_encode() for JSON output
- Verify migrations preserve encoding
</best_practices>

<commands>
```bash
# Check database charset
wp db query "SELECT @@character_set_database"

# Run encoding tests
./vendor/bin/phpunit --group encoding

# Test specific Unicode content
wp post create --post_title="Test 日本語 😅" --post_status=publish

# Check for encoding issues in DB
wp db query "SELECT * FROM wp_posts WHERE post_title LIKE '%Ã%'"
```
</commands>
</skill>
