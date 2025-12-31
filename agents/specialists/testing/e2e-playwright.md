# 🎭 E2E Playwright

> **Type**: Specialist
> **Domain**: End-to-End Testing
> **Authority**: Browser automation, user flows, Playwright patterns

## 🎯 Mission

Write end-to-end tests using Playwright that verify complete user flows in real browsers. Own page object patterns, test isolation, and cross-browser testing for WordPress admin and frontend.

## 📥 Inputs

- User journeys to test
- Browser requirements
- Authentication flows
- Performance budgets

## 📤 Outputs

- Playwright test suites
- Page object models
- Test fixtures
- Trace files and screenshots

---

## 🔧 When to Use

✅ **Use this agent when:**
- Testing complete user flows
- Verifying UI interactions
- Testing cross-browser compatibility
- Catching visual regressions
- Testing authenticated user flows

❌ **Don't use for:**
- Unit testing logic
- API-only testing
- Fast feedback loops
- High-coverage testing

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Flaky selectors | Use data-testid or role selectors |
| Timing issues | Use explicit waits, not sleep |
| Shared state | Reset between tests |
| Slow tests | Parallelize, reuse auth state |
| Hard to debug | Save traces on failure |

---

## ✅ Checklist

### Test Structure
- [ ] Page object model for reusable selectors
- [ ] Fixtures for common setup
- [ ] Isolated test state
- [ ] Descriptive test names

### Selectors
- [ ] Use data-testid attributes
- [ ] Use ARIA roles where possible
- [ ] Avoid fragile CSS selectors
- [ ] Document selector strategy

### Reliability
- [ ] Explicit waits for elements
- [ ] Retry flaky network requests
- [ ] Handle loading states
- [ ] Save traces on failure

### Performance
- [ ] Reuse authentication state
- [ ] Parallelize independent tests
- [ ] Keep tests focused
- [ ] <30s per test target

---

## 💬 Example Prompts

### Claude Code
```
@e2e-playwright Write E2E tests for the plugin settings page.
Test saving settings, validation errors, and success notifications.
```

### Cursor
```
Using e2e-playwright, create a page object model for the WooCommerce
checkout flow. Need to test guest and logged-in purchases.
```

### GitHub Copilot
```
# E2E Playwright Task: Form Submission Flow
#
# Test the contact form:
# 1. Navigate to contact page
# 2. Fill form fields
# 3. Submit and verify success
# 4. Check email notification (mock)
#
# Handle: validation, AJAX submission, success message
```

### General Prompt
```
Write E2E tests for the WordPress block editor:
1. Create a new post
2. Add custom blocks from our plugin
3. Configure block options
4. Publish and verify frontend output

Include page objects and proper selectors.
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [test-architecture](../../orchestrators/test-architecture.md) | E2E boundaries |
| [visual-regression](visual-regression.md) | Screenshot comparisons |
| [a11y-tree-and-aria-auditor](../accessibility/a11y-tree-and-aria-auditor.md) | A11y in E2E |
| [flaky-test-tamer](../extras/flaky-test-tamer.md) | Stability patterns |

---

## 📋 Test Structure

### Basic Test

```typescript
// tests/e2e/settings.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Plugin Settings', () => {
    test.beforeEach(async ({ page }) => {
        // Login as admin
        await page.goto('/wp-login.php');
        await page.fill('#user_login', 'admin');
        await page.fill('#user_pass', 'password');
        await page.click('#wp-submit');
        await page.waitForURL('**/wp-admin/**');
    });

    test('can save settings', async ({ page }) => {
        await page.goto('/wp-admin/admin.php?page=my-plugin');

        // Fill settings
        await page.fill('[data-testid="api-key"]', 'test-key-123');
        await page.check('[data-testid="enable-feature"]');

        // Save
        await page.click('[data-testid="save-settings"]');

        // Verify success
        await expect(page.locator('.notice-success')).toBeVisible();
        await expect(page.locator('[data-testid="api-key"]')).toHaveValue('test-key-123');
    });

    test('shows validation errors', async ({ page }) => {
        await page.goto('/wp-admin/admin.php?page=my-plugin');

        // Submit empty required field
        await page.fill('[data-testid="api-key"]', '');
        await page.click('[data-testid="save-settings"]');

        // Verify error
        await expect(page.locator('.notice-error')).toBeVisible();
        await expect(page.locator('.notice-error')).toContainText('API key is required');
    });
});
```

### With Page Objects

```typescript
// tests/e2e/pages/settings-page.ts
import { Page, Locator } from '@playwright/test';

export class SettingsPage {
    readonly page: Page;
    readonly apiKeyInput: Locator;
    readonly enableFeatureCheckbox: Locator;
    readonly saveButton: Locator;
    readonly successNotice: Locator;
    readonly errorNotice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.apiKeyInput = page.locator('[data-testid="api-key"]');
        this.enableFeatureCheckbox = page.locator('[data-testid="enable-feature"]');
        this.saveButton = page.locator('[data-testid="save-settings"]');
        this.successNotice = page.locator('.notice-success');
        this.errorNotice = page.locator('.notice-error');
    }

    async goto() {
        await this.page.goto('/wp-admin/admin.php?page=my-plugin');
    }

    async setApiKey(key: string) {
        await this.apiKeyInput.fill(key);
    }

    async enableFeature(enable: boolean = true) {
        if (enable) {
            await this.enableFeatureCheckbox.check();
        } else {
            await this.enableFeatureCheckbox.uncheck();
        }
    }

    async save() {
        await this.saveButton.click();
    }
}

// tests/e2e/settings.spec.ts
import { test, expect } from '@playwright/test';
import { SettingsPage } from './pages/settings-page';

test('can save settings', async ({ page }) => {
    const settings = new SettingsPage(page);

    await settings.goto();
    await settings.setApiKey('test-key-123');
    await settings.enableFeature();
    await settings.save();

    await expect(settings.successNotice).toBeVisible();
});
```

---

## 🔐 Authentication Fixtures

### Reusable Auth State

```typescript
// tests/e2e/fixtures/auth.ts
import { test as base, Page } from '@playwright/test';

// Define admin fixture
type AuthFixtures = {
    adminPage: Page;
    editorPage: Page;
};

export const test = base.extend<AuthFixtures>({
    adminPage: async ({ browser }, use) => {
        // Load saved auth state
        const context = await browser.newContext({
            storageState: 'tests/e2e/.auth/admin.json'
        });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },

    editorPage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: 'tests/e2e/.auth/editor.json'
        });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
});

// Setup: Generate auth states
// playwright.config.ts
export default defineConfig({
    projects: [
        {
            name: 'setup',
            testMatch: /global.setup\.ts/,
        },
        {
            name: 'tests',
            dependencies: ['setup'],
        },
    ],
});

// tests/e2e/global.setup.ts
import { chromium } from '@playwright/test';

async function globalSetup() {
    const browser = await chromium.launch();

    // Admin login
    const adminPage = await browser.newPage();
    await adminPage.goto('/wp-login.php');
    await adminPage.fill('#user_login', 'admin');
    await adminPage.fill('#user_pass', 'password');
    await adminPage.click('#wp-submit');
    await adminPage.waitForURL('**/wp-admin/**');
    await adminPage.context().storageState({ path: 'tests/e2e/.auth/admin.json' });

    // Editor login
    const editorPage = await browser.newPage();
    await editorPage.goto('/wp-login.php');
    await editorPage.fill('#user_login', 'editor');
    await editorPage.fill('#user_pass', 'password');
    await editorPage.click('#wp-submit');
    await editorPage.context().storageState({ path: 'tests/e2e/.auth/editor.json' });

    await browser.close();
}

export default globalSetup;
```

---

## 🎯 Selector Strategy

### Recommended Selectors

```typescript
// Best: data-testid (add to your code)
await page.click('[data-testid="submit-button"]');

// Good: Role-based (accessible)
await page.click('button[role="submit"]');
await page.getByRole('button', { name: 'Submit' });

// Good: Label-based (accessible)
await page.getByLabel('Email address');

// Okay: WordPress admin IDs (stable)
await page.click('#submit');
await page.click('#post-title-0');

// Avoid: CSS classes (fragile)
await page.click('.btn-primary'); // Bad - style may change
await page.click('.wp-block-button'); // Okay - WP core classes
```

### Adding Test IDs

```php
// PHP: Add data-testid attributes
<input type="text"
       name="api_key"
       data-testid="api-key"
       value="<?php echo esc_attr( $value ); ?>">

<button type="submit"
        class="button button-primary"
        data-testid="save-settings">
    <?php esc_html_e( 'Save Settings', 'my-plugin' ); ?>
</button>
```

```tsx
// React: Add data-testid
<TextControl
    data-testid="api-key"
    label="API Key"
    value={apiKey}
    onChange={setApiKey}
/>
```

---

## ⏱️ Waiting Strategies

```typescript
// Wait for element
await page.waitForSelector('[data-testid="results"]');

// Wait for network
await page.waitForResponse('**/api/items');

// Wait for navigation
await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="/next-page"]'),
]);

// Wait for condition
await page.waitForFunction(() => {
    return document.querySelectorAll('.item').length > 5;
});

// Explicit assertion wait (preferred)
await expect(page.locator('.results')).toBeVisible();
await expect(page.locator('.item')).toHaveCount(5);

// AVOID: sleep
await page.waitForTimeout(1000); // Bad - use explicit waits
```

---

## 📸 Traces and Screenshots

### Configuration

```typescript
// playwright.config.ts
export default defineConfig({
    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
});
```

### Manual Traces

```typescript
test('complex flow', async ({ page, context }) => {
    await context.tracing.start({ screenshots: true, snapshots: true });

    // Test steps...

    await context.tracing.stop({ path: 'trace.zip' });
});
```

### Screenshot Assertions

```typescript
test('visual check', async ({ page }) => {
    await page.goto('/wp-admin/admin.php?page=my-plugin');

    // Full page screenshot comparison
    await expect(page).toHaveScreenshot('settings-page.png');

    // Element screenshot
    await expect(page.locator('.settings-form')).toHaveScreenshot('settings-form.png');
});
```

---

## 🔄 Test Isolation

```typescript
// Reset database between tests
test.beforeEach(async () => {
    // Using wp-env
    await exec('npx wp-env run cli wp db reset --yes');
    await exec('npx wp-env run cli wp db import tests/fixtures/base.sql');
});

// Or use API to clean up
test.beforeEach(async ({ request }) => {
    await request.delete('/wp-json/my-plugin/v1/test-cleanup');
});
```

---

## ⚙️ Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    timeout: 30000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    use: {
        baseURL: process.env.WP_BASE_URL || 'http://localhost:8888',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

    webServer: {
        command: 'npx wp-env start',
        url: 'http://localhost:8888',
        reuseExistingServer: !process.env.CI,
    },
});
```
