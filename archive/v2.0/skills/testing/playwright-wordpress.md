# Playwright for WordPress

> **Type**: Skill
> **Domain**: Testing
> **Source**: wp-dev-prompts TESTING-AUTOMATION-PROMPTS.md

<skill>
<summary>
Writing E2E tests for WordPress using Playwright with wp-env.
</summary>

<knowledge>
## Setup

**Install Dependencies:**
```bash
npm install --save-dev @playwright/test @wordpress/e2e-test-utils-playwright
```

**playwright.config.ts:**
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:8888',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
    webServer: {
        command: 'npm run env:start',
        url: 'http://localhost:8888',
        reuseExistingServer: !process.env.CI,
    },
});
```

## WordPress E2E Utilities

**Authentication:**
```typescript
import { test } from '@wordpress/e2e-test-utils-playwright';

test('admin can access dashboard', async ({ admin, page }) => {
    await admin.visitAdminPage('/');
    await expect(page.locator('#wpbody')).toBeVisible();
});
```

**Editor Operations:**
```typescript
test('can create post with block', async ({ admin, editor, page }) => {
    await admin.createNewPost();
    await editor.insertBlock({ name: 'core/paragraph' });
    await page.keyboard.type('Hello, World!');
    await editor.publishPost();
});
```

## Writing Tests

**Basic Navigation:**
```typescript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/My Site/);
    await expect(page.locator('.site-header')).toBeVisible();
});
```

**Form Interactions:**
```typescript
test('contact form submits successfully', async ({ page }) => {
    await page.goto('/contact/');

    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#message', 'Test message');

    await page.click('button[type="submit"]');

    await expect(page.locator('.success-message')).toBeVisible();
});
```

**Admin Settings:**
```typescript
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test('can save plugin settings', async ({ admin, page }) => {
    await admin.visitAdminPage('options-general.php', 'page=my-plugin');

    await page.fill('#my-option', 'test value');
    await page.click('#submit');

    await expect(page.locator('.notice-success')).toBeVisible();
    await expect(page.locator('#my-option')).toHaveValue('test value');
});
```

## Accessibility Testing

**With axe-core:**
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('page is accessible', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
        .exclude('#wpadminbar') // Exclude WordPress admin bar
        .analyze();

    expect(results.violations).toEqual([]);
});
```

## Screenshot Testing

**Visual Regression:**
```typescript
test('homepage matches snapshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage.png');
});
```

**Generate Screenshots:**
```typescript
test('generate documentation screenshots', async ({ admin, page }) => {
    await admin.visitAdminPage('options-general.php', 'page=my-plugin');

    await page.screenshot({
        path: 'docs/images/settings-page.png',
        fullPage: true,
    });
});
```

## Running Tests

**Commands:**
```bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test tests/e2e/settings.spec.ts

# Run with UI
npx playwright test --ui

# Update snapshots
npx playwright test --update-snapshots

# Debug mode
npx playwright test --debug
```
</knowledge>

<best_practices>
- Use WordPress e2e utilities for authentication
- Exclude #wpadminbar from accessibility tests
- Use test fixtures for reusable setup
- Take screenshots on failure
- Run tests against wp-env
</best_practices>

<references>
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [WordPress E2E Utils](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/)
</references>
</skill>
