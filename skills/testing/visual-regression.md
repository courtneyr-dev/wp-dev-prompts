# Visual Regression Testing

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Detecting unintended visual changes with screenshot comparison

<skill>
<summary>
Setting up visual regression testing with Playwright to catch CSS and layout changes in WordPress projects.
</summary>

<knowledge>
## What Is Visual Regression Testing?

Visual regression testing compares screenshots:
- **Baseline capture** - Reference screenshots of expected appearance
- **Current capture** - Screenshots of current state
- **Diff detection** - Pixel-by-pixel comparison
- **Threshold tolerance** - Allow minor acceptable differences

## Playwright Visual Testing

### Setup

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Configuration (playwright.config.ts)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/visual',
    snapshotDir: './tests/visual/__snapshots__',
    snapshotPathTemplate: '{snapshotDir}/{testFilePath}/{arg}{ext}',

    expect: {
        toHaveScreenshot: {
            // Allow 0.2% pixel difference
            maxDiffPixelRatio: 0.002,
            // Or maximum different pixels
            maxDiffPixels: 100,
            // Animation stability
            animations: 'disabled',
        },
    },

    use: {
        baseURL: 'http://localhost:8888',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'Desktop Chrome',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Desktop Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 13'] },
        },
    ],
});
```

### Basic Visual Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
    test('homepage matches snapshot', async ({ page }) => {
        await page.goto('/');

        // Wait for content to load
        await page.waitForLoadState('networkidle');

        // Take full page screenshot
        await expect(page).toHaveScreenshot('homepage.png', {
            fullPage: true,
        });
    });

    test('settings page matches snapshot', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Capture specific element
        const settings = page.locator('.my-plugin-settings');
        await expect(settings).toHaveScreenshot('settings-panel.png');
    });
});
```

## WordPress Block Testing

### Block Editor Screenshots

```typescript
import { test, expect } from '@playwright/test';

test.describe('Block Visual Regression', () => {
    test.beforeEach(async ({ page }) => {
        // Login to WordPress
        await page.goto('/wp-login.php');
        await page.fill('#user_login', 'admin');
        await page.fill('#user_pass', 'password');
        await page.click('#wp-submit');
    });

    test('block renders correctly in editor', async ({ page }) => {
        await page.goto('/wp-admin/post-new.php');

        // Wait for editor to load
        await page.waitForSelector('.block-editor-writing-flow');

        // Insert block
        await page.click('[aria-label="Toggle block inserter"]');
        await page.fill('[placeholder="Search"]', 'my-block');
        await page.click('[aria-label="My Custom Block"]');

        // Wait for block to render
        await page.waitForSelector('.wp-block-my-plugin-my-block');

        // Screenshot the block
        const block = page.locator('.wp-block-my-plugin-my-block');
        await expect(block).toHaveScreenshot('my-block-editor.png');
    });

    test('block renders correctly on frontend', async ({ page }) => {
        // Navigate to page with block
        await page.goto('/sample-page/');

        const block = page.locator('.wp-block-my-plugin-my-block');
        await expect(block).toHaveScreenshot('my-block-frontend.png');
    });
});
```

### Multiple Block States

```typescript
test.describe('Block States', () => {
    test('block with different attributes', async ({ page }) => {
        await page.goto('/sample-page/');

        const blocks = page.locator('.wp-block-my-plugin-my-block');
        const count = await blocks.count();

        for (let i = 0; i < count; i++) {
            await expect(blocks.nth(i)).toHaveScreenshot(`block-variant-${i}.png`);
        }
    });

    test('block hover state', async ({ page }) => {
        await page.goto('/sample-page/');

        const block = page.locator('.wp-block-my-plugin-my-block');

        // Capture hover state
        await block.hover();
        await expect(block).toHaveScreenshot('block-hover.png');
    });

    test('block focus state', async ({ page }) => {
        await page.goto('/sample-page/');

        const button = page.locator('.wp-block-my-plugin-my-block button');

        // Capture focus state
        await button.focus();
        await expect(button).toHaveScreenshot('block-button-focus.png');
    });
});
```

## Handling Dynamic Content

### Mask Dynamic Elements

```typescript
test('page with dynamic content', async ({ page }) => {
    await page.goto('/dashboard/');

    await expect(page).toHaveScreenshot('dashboard.png', {
        mask: [
            page.locator('.timestamp'),
            page.locator('.user-avatar'),
            page.locator('.dynamic-counter'),
        ],
    });
});
```

### Consistent Animations

```typescript
test('animated component', async ({ page }) => {
    await page.goto('/animated-page/');

    // Disable animations
    await page.addStyleTag({
        content: `
            *, *::before, *::after {
                animation-duration: 0s !important;
                transition-duration: 0s !important;
            }
        `,
    });

    await expect(page).toHaveScreenshot('no-animation.png');
});
```

### Wait for Fonts

```typescript
test('page with web fonts', async ({ page }) => {
    await page.goto('/');

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    await expect(page).toHaveScreenshot('with-fonts.png');
});
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Visual Regression

on: [push, pull_request]

jobs:
  visual-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Start WordPress
        run: npx wp-env start

      - name: Run visual tests
        run: npx playwright test tests/visual/

      - name: Upload diff images
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: visual-diff
          path: |
            tests/visual/__snapshots__/
            test-results/

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Update Snapshots

```yaml
# Workflow to update snapshots
name: Update Visual Snapshots

on:
  workflow_dispatch:

jobs:
  update-snapshots:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx wp-env start

      - name: Update snapshots
        run: npx playwright test tests/visual/ --update-snapshots

      - name: Commit updated snapshots
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'chore: update visual regression snapshots'
          file_pattern: 'tests/visual/__snapshots__/*.png'
```

## Best Practices

### Snapshot Management

```typescript
// Organize by feature
test.describe('Feature A', () => {
    test('component renders correctly', async ({ page }) => {
        // Snapshot will be: tests/visual/__snapshots__/feature-a/component.png
        await expect(page.locator('.component')).toHaveScreenshot();
    });
});
```

### Threshold Configuration

```typescript
// Strict for critical UI
test('logo must be exact', async ({ page }) => {
    await expect(page.locator('.logo')).toHaveScreenshot('logo.png', {
        maxDiffPixels: 0,
    });
});

// Relaxed for complex content
test('blog post layout', async ({ page }) => {
    await expect(page).toHaveScreenshot('post.png', {
        maxDiffPixelRatio: 0.01,  // 1% tolerance
    });
});
```

### Responsive Testing

```typescript
const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1440, height: 900, name: 'desktop' },
];

for (const viewport of viewports) {
    test(`homepage at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({
            width: viewport.width,
            height: viewport.height,
        });
        await page.goto('/');

        await expect(page).toHaveScreenshot(`homepage-${viewport.name}.png`);
    });
}
```

## Reviewing Differences

### Local Review

```bash
# Run tests and view report
npx playwright test tests/visual/
npx playwright show-report
```

### Updating Baselines

```bash
# Update all snapshots
npx playwright test tests/visual/ --update-snapshots

# Update specific test
npx playwright test tests/visual/homepage.spec.ts --update-snapshots
```
</knowledge>

<best_practices>
- Disable animations in tests
- Mask dynamic content (dates, avatars)
- Wait for fonts and images
- Use appropriate thresholds
- Test multiple viewports
- Review diffs carefully before updating
</best_practices>

<commands>
```bash
# Run visual tests
npx playwright test tests/visual/

# Update snapshots
npx playwright test tests/visual/ --update-snapshots

# View report
npx playwright show-report

# Run specific viewport
npx playwright test tests/visual/ --project="Desktop Chrome"
```
</commands>
</skill>
