# 📸 Visual Regression

> **Type**: Specialist
> **Domain**: Visual Testing
> **Authority**: Screenshot comparison, visual diffs, baseline management

## 🎯 Mission

Detect unintended visual changes through screenshot comparison. Own baseline management, diff thresholds, and visual testing strategies for WordPress admin and frontend components.

## 📥 Inputs

- Components/pages to capture
- Viewport configurations
- Baseline images
- Diff thresholds

## 📤 Outputs

- Screenshot baselines
- Visual diff reports
- Threshold configurations
- Responsive snapshots

---

## 🔧 When to Use

✅ **Use this agent when:**
- Detecting CSS regressions
- Verifying responsive layouts
- Testing theme changes
- Comparing RTL layouts
- Validating design implementations

❌ **Don't use for:**
- Functional testing
- Dynamic content testing
- Performance testing
- Accessibility testing

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Flaky dynamic content | Hide or freeze timestamps/avatars |
| Font rendering differences | Use consistent CI environment |
| Animation timing | Disable or wait for animations |
| Baseline maintenance burden | Only capture critical views |
| Too strict thresholds | Allow 0.1-1% variance |

---

## ✅ Checklist

### Test Selection
- [ ] Identify critical visual elements
- [ ] Select key breakpoints
- [ ] Include light/dark modes
- [ ] Include RTL layouts

### Stability
- [ ] Freeze dynamic content
- [ ] Disable animations
- [ ] Use consistent fonts
- [ ] Mock external images

### Baseline Management
- [ ] Store baselines in git
- [ ] Document update process
- [ ] Review baseline changes in PRs
- [ ] Separate by platform if needed

### Thresholds
- [ ] Set appropriate diff percentages
- [ ] Use region-specific thresholds
- [ ] Allow anti-aliasing variance
- [ ] Document threshold decisions

---

## 💬 Example Prompts

### Claude Code
```
@visual-regression Set up visual regression testing for our admin
settings pages. Need to capture responsive breakpoints and RTL.
```

### Cursor
```
Using visual-regression, create tests for our block library.
Each block needs captured in the editor and frontend views.
```

### GitHub Copilot
```
# Visual Regression Task: Theme Components
#
# Capture screenshots for:
# - Header (mobile, tablet, desktop)
# - Navigation menu (open, closed)
# - Footer
# - Sidebar widgets
#
# Requirements: Light/dark mode, RTL support
```

### General Prompt
```
Set up visual regression for our plugin's UI:
1. Settings pages in admin
2. Custom blocks in editor
3. Frontend widget display
4. RTL layout validation

Need baseline management and CI integration.
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [e2e-playwright](e2e-playwright.md) | Screenshot assertions |
| [i18n-l10n-rtl-specialist](../wordpress/i18n-l10n-rtl-specialist.md) | RTL snapshots |
| [storybook-a11y-specialist](../accessibility/storybook-a11y-specialist.md) | Component snapshots |
| [regression-suite-curator](regression-suite-curator.md) | Test organization |

---

## 📋 Playwright Visual Testing

### Basic Screenshot Test

```typescript
// tests/visual/settings.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
    test('settings page matches baseline', async ({ page }) => {
        // Navigate and wait for full load
        await page.goto('/wp-admin/admin.php?page=my-plugin');
        await page.waitForLoadState('networkidle');

        // Hide dynamic elements
        await page.evaluate(() => {
            // Hide timestamps
            document.querySelectorAll('.timestamp').forEach(el => {
                (el as HTMLElement).style.visibility = 'hidden';
            });
            // Freeze avatar
            document.querySelectorAll('.avatar').forEach(el => {
                (el as HTMLImageElement).src = '/test-avatar.png';
            });
        });

        // Full page screenshot
        await expect(page).toHaveScreenshot('settings-page.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.01,
        });
    });
});
```

### Responsive Screenshots

```typescript
const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 },
];

for (const viewport of viewports) {
    test(`matches at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/my-page');

        await expect(page).toHaveScreenshot(`page-${viewport.name}.png`);
    });
}
```

### RTL Screenshots

```typescript
test.describe('RTL Visual Regression', () => {
    test.beforeEach(async ({ page }) => {
        // Switch to Arabic
        await page.goto('/wp-admin/options-general.php');
        await page.selectOption('#WPLANG', 'ar');
        await page.click('#submit');
    });

    test('layout mirrors correctly in RTL', async ({ page }) => {
        await page.goto('/wp-admin/admin.php?page=my-plugin');

        await expect(page).toHaveScreenshot('settings-rtl.png');
    });
});
```

---

## 🔧 Configuration

### Playwright Config

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    snapshotDir: './tests/visual/snapshots',
    snapshotPathTemplate: '{snapshotDir}/{testFilePath}/{arg}{-projectName}{ext}',

    expect: {
        toHaveScreenshot: {
            maxDiffPixelRatio: 0.01,
            threshold: 0.2,
            animations: 'disabled',
        },
    },

    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                // Consistent rendering
                deviceScaleFactor: 1,
            },
        },
    ],
});
```

### Update Baselines

```bash
# Update all baselines
npx playwright test --update-snapshots

# Update specific test
npx playwright test settings.spec.ts --update-snapshots

# Update only failed
npx playwright test --update-snapshots --only-failures
```

---

## 📸 Component Screenshots

### Block Screenshots

```typescript
// tests/visual/blocks.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Block Visual Regression', () => {
    const blocks = [
        { name: 'testimonial', selector: '.wp-block-my-plugin-testimonial' },
        { name: 'pricing-table', selector: '.wp-block-my-plugin-pricing' },
        { name: 'hero-section', selector: '.wp-block-my-plugin-hero' },
    ];

    for (const block of blocks) {
        test(`${block.name} block matches baseline`, async ({ page }) => {
            await page.goto(`/block-preview/${block.name}`);

            const element = page.locator(block.selector);
            await expect(element).toHaveScreenshot(`${block.name}.png`);
        });
    }
});
```

### Storybook Integration

```typescript
// tests/visual/storybook.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Storybook Visual Regression', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:6006');
    });

    test('Button component states', async ({ page }) => {
        // Navigate to Button story
        await page.click('text=Components');
        await page.click('text=Button');

        // Capture all variants
        const stories = ['primary', 'secondary', 'disabled', 'loading'];

        for (const story of stories) {
            await page.click(`text=${story}`);
            const iframe = page.frameLocator('#storybook-preview-iframe');
            await expect(iframe.locator('#root')).toHaveScreenshot(`button-${story}.png`);
        }
    });
});
```

---

## 🎨 Handling Dynamic Content

### Masking Regions

```typescript
await expect(page).toHaveScreenshot('page.png', {
    mask: [
        page.locator('.timestamp'),
        page.locator('.random-avatar'),
        page.locator('.ad-banner'),
    ],
});
```

### Freezing Content

```typescript
test('page with frozen content', async ({ page }) => {
    await page.goto('/my-page');

    // Freeze dates
    await page.evaluate(() => {
        const originalDate = Date;
        (window as any).Date = class extends originalDate {
            constructor() {
                super('2024-01-15T12:00:00Z');
            }
        };
    });

    // Replace avatars with placeholder
    await page.addStyleTag({
        content: `
            .avatar {
                background: #ccc !important;
                color: transparent !important;
            }
            .avatar img { display: none !important; }
        `
    });

    await expect(page).toHaveScreenshot();
});
```

### Disabling Animations

```typescript
await page.addStyleTag({
    content: `
        *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
        }
    `
});
```

---

## 📊 CI Integration

### GitHub Actions

```yaml
# .github/workflows/visual.yml
name: Visual Regression

on: [pull_request]

jobs:
  visual-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Start WordPress
        run: npx wp-env start

      - name: Run visual tests
        run: npx playwright test tests/visual/

      - name: Upload diff artifacts
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: visual-diffs
          path: |
            tests/visual/snapshots/**/*-diff.png
            tests/visual/snapshots/**/*-actual.png
```

### Percy Integration

```typescript
// tests/visual/percy.spec.ts
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('settings page', async ({ page }) => {
    await page.goto('/wp-admin/admin.php?page=my-plugin');
    await page.waitForLoadState('networkidle');

    await percySnapshot(page, 'Settings Page', {
        widths: [375, 768, 1280],
    });
});
```

---

## 📁 Baseline Organization

```
tests/visual/
├── snapshots/
│   ├── settings.spec.ts/
│   │   ├── settings-page-chromium.png
│   │   ├── settings-page-rtl-chromium.png
│   │   └── settings-mobile-chromium.png
│   ├── blocks.spec.ts/
│   │   ├── testimonial-chromium.png
│   │   ├── pricing-table-chromium.png
│   │   └── hero-section-chromium.png
│   └── frontend.spec.ts/
│       ├── homepage-chromium.png
│       └── archive-chromium.png
├── settings.spec.ts
├── blocks.spec.ts
└── frontend.spec.ts
```

### .gitattributes

```
# Treat screenshots as binary
tests/visual/snapshots/**/*.png binary
```
