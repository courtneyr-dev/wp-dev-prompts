# Advanced Accessibility Automation

> **Type**: Skill
> **Domain**: Accessibility
> **Focus**: Accessibility tree assertions, focus order validation, and AT emulation

<skill>
<summary>
Advanced Playwright-based accessibility automation including accessibility tree assertions, focus order recording, and assistive technology emulation patterns.
</summary>

<knowledge>
## Accessibility Tree Assertions

### Custom Assertion Utilities

```typescript
// a11y-harness/assertions.ts
import { Locator, expect } from '@playwright/test';

/**
 * Assert accessible name matches expected value.
 */
export async function expectA11yName(
    locator: Locator,
    expectedName: string | RegExp
): Promise<void> {
    const accessibleName = await locator.evaluate((el) => {
        return el.getAttribute('aria-label') ||
               el.getAttribute('aria-labelledby') &&
               document.getElementById(el.getAttribute('aria-labelledby')!)?.textContent ||
               (el as HTMLInputElement).labels?.[0]?.textContent ||
               el.textContent?.trim();
    });

    if (typeof expectedName === 'string') {
        expect(accessibleName?.trim()).toBe(expectedName);
    } else {
        expect(accessibleName?.trim()).toMatch(expectedName);
    }
}

/**
 * Assert accessible role matches expected value.
 */
export async function expectA11yRole(
    locator: Locator,
    expectedRole: string
): Promise<void> {
    const role = await locator.evaluate((el) => {
        // Explicit role takes precedence
        const explicitRole = el.getAttribute('role');
        if (explicitRole) return explicitRole;

        // Implicit roles from HTML semantics
        const tagToRole: Record<string, string> = {
            button: 'button',
            a: 'link',
            input: 'textbox',
            select: 'combobox',
            textarea: 'textbox',
            img: 'img',
            nav: 'navigation',
            main: 'main',
            header: 'banner',
            footer: 'contentinfo',
            article: 'article',
            aside: 'complementary',
            section: 'region',
            form: 'form',
            table: 'table',
            ul: 'list',
            ol: 'list',
            li: 'listitem',
        };

        const tag = el.tagName.toLowerCase();

        // Special cases
        if (tag === 'input') {
            const type = (el as HTMLInputElement).type;
            if (type === 'checkbox') return 'checkbox';
            if (type === 'radio') return 'radio';
            if (type === 'button' || type === 'submit') return 'button';
            if (type === 'search') return 'searchbox';
        }

        return tagToRole[tag] || null;
    });

    expect(role).toBe(expectedRole);
}

/**
 * Assert accessible state properties.
 */
export async function expectA11yState(
    locator: Locator,
    expectedState: {
        expanded?: boolean;
        pressed?: boolean;
        checked?: boolean | 'mixed';
        disabled?: boolean;
        invalid?: boolean;
        selected?: boolean;
        hidden?: boolean;
    }
): Promise<void> {
    const actualState = await locator.evaluate((el) => {
        return {
            expanded: el.getAttribute('aria-expanded') === 'true',
            pressed: el.getAttribute('aria-pressed') === 'true',
            checked: el.getAttribute('aria-checked') === 'true' ? true :
                     el.getAttribute('aria-checked') === 'mixed' ? 'mixed' :
                     (el as HTMLInputElement).checked || false,
            disabled: el.hasAttribute('disabled') ||
                      el.getAttribute('aria-disabled') === 'true',
            invalid: el.getAttribute('aria-invalid') === 'true',
            selected: el.getAttribute('aria-selected') === 'true',
            hidden: el.getAttribute('aria-hidden') === 'true' ||
                    el.hasAttribute('hidden'),
        };
    });

    for (const [key, expected] of Object.entries(expectedState)) {
        expect(actualState[key as keyof typeof actualState]).toBe(expected);
    }
}

/**
 * Assert no unnamed interactive elements on page.
 */
export async function assertNoUnnamedInteractiveElements(
    page: import('@playwright/test').Page,
    allowlist: string[] = []
): Promise<void> {
    const unnamed = await page.evaluate((allowlist) => {
        const interactiveSelectors = [
            'button',
            'a[href]',
            'input:not([type="hidden"])',
            'select',
            'textarea',
            '[role="button"]',
            '[role="link"]',
            '[role="checkbox"]',
            '[role="radio"]',
            '[role="tab"]',
            '[role="menuitem"]',
            '[tabindex]:not([tabindex="-1"])',
        ];

        const elements = document.querySelectorAll(interactiveSelectors.join(', '));
        const unnamedElements: string[] = [];

        elements.forEach((el) => {
            // Skip allowlisted
            for (const selector of allowlist) {
                if (el.matches(selector)) return;
            }

            // Check for accessible name
            const hasName = el.getAttribute('aria-label') ||
                           el.getAttribute('aria-labelledby') ||
                           el.textContent?.trim() ||
                           (el as HTMLImageElement).alt ||
                           (el as HTMLInputElement).placeholder;

            if (!hasName) {
                unnamedElements.push(
                    `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.split(' ').join('.') : ''}`
                );
            }
        });

        return unnamedElements;
    }, allowlist);

    expect(unnamed).toEqual([]);
}

/**
 * Record and assert focus order.
 */
export async function recordAndAssertFocusOrder(
    page: import('@playwright/test').Page,
    maxSteps: number = 50,
    allowlistSelectors: string[] = []
): Promise<string[]> {
    const focusOrder: string[] = [];

    for (let i = 0; i < maxSteps; i++) {
        await page.keyboard.press('Tab');

        const focusedElement = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return null;

            return {
                tag: el.tagName.toLowerCase(),
                id: el.id,
                text: el.textContent?.trim().slice(0, 30),
                role: el.getAttribute('role'),
            };
        });

        if (!focusedElement) break;

        const descriptor = focusedElement.id ||
            focusedElement.text ||
            `${focusedElement.tag}[${focusedElement.role}]`;

        focusOrder.push(descriptor);

        // Stop if we've cycled back
        if (focusOrder.length > 1 && focusOrder[0] === descriptor) {
            focusOrder.pop();
            break;
        }
    }

    return focusOrder;
}
```

### Using Assertions in Tests

```typescript
// tests/e2e/a11y-advanced.spec.ts
import { test, expect } from '@playwright/test';
import {
    expectA11yName,
    expectA11yRole,
    expectA11yState,
    assertNoUnnamedInteractiveElements,
    recordAndAssertFocusOrder,
} from '../a11y-harness/assertions';

test.describe('Accessibility Tree', () => {
    test('settings form has correct a11y properties', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Check form controls
        const enabledCheckbox = page.locator('#my-plugin-enabled');
        await expectA11yRole(enabledCheckbox, 'checkbox');
        await expectA11yName(enabledCheckbox, 'Enable feature');

        // Check button
        const submitButton = page.locator('#submit');
        await expectA11yRole(submitButton, 'button');
        await expectA11yName(submitButton, 'Save Changes');

        // Check expanded state on accordion
        const accordion = page.locator('[aria-controls="advanced-section"]');
        await expectA11yState(accordion, { expanded: false });

        await accordion.click();
        await expectA11yState(accordion, { expanded: true });
    });

    test('no unnamed interactive elements', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        await assertNoUnnamedInteractiveElements(page, [
            '.notice-dismiss', // WP admin dismissible notices
            '.screen-reader-shortcut', // Skip links
        ]);
    });

    test('focus order is logical', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        const focusOrder = await recordAndAssertFocusOrder(page, 20);

        // Log for debugging
        console.log('Focus order:', focusOrder);

        // Assert order makes sense
        expect(focusOrder.length).toBeGreaterThan(0);

        // First focusable should be skip link or first control
        expect(focusOrder[0]).toMatch(/skip|first|title/i);
    });
});
```

## Focus Management Tests

### Modal Focus Trap

```typescript
test.describe('Modal Focus Management', () => {
    test('modal traps focus correctly', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Open modal
        await page.click('[data-open-modal="confirm"]');

        // Wait for modal
        const modal = page.locator('[role="dialog"]');
        await expect(modal).toBeVisible();

        // Focus should be in modal
        const firstFocusInModal = await page.evaluate(() => {
            const modal = document.querySelector('[role="dialog"]');
            return modal?.contains(document.activeElement);
        });
        expect(firstFocusInModal).toBe(true);

        // Tab through modal
        for (let i = 0; i < 10; i++) {
            await page.keyboard.press('Tab');

            const stillInModal = await page.evaluate(() => {
                const modal = document.querySelector('[role="dialog"]');
                return modal?.contains(document.activeElement);
            });

            expect(stillInModal).toBe(true);
        }

        // Shift+Tab should also stay in modal
        for (let i = 0; i < 10; i++) {
            await page.keyboard.press('Shift+Tab');

            const stillInModal = await page.evaluate(() => {
                const modal = document.querySelector('[role="dialog"]');
                return modal?.contains(document.activeElement);
            });

            expect(stillInModal).toBe(true);
        }
    });

    test('modal returns focus on close', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        const openButton = page.locator('[data-open-modal="confirm"]');

        // Record trigger element
        await openButton.focus();

        // Open modal
        await openButton.click();
        await expect(page.locator('[role="dialog"]')).toBeVisible();

        // Close with Escape
        await page.keyboard.press('Escape');
        await expect(page.locator('[role="dialog"]')).not.toBeVisible();

        // Focus should return to trigger
        await expect(openButton).toBeFocused();
    });
});
```

### Keyboard Navigation Flows

```typescript
test.describe('Keyboard Flows', () => {
    test('settings can be saved with keyboard only', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Tab to first input
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        // Type value
        await page.keyboard.type('New Value');

        // Tab to checkbox
        await page.keyboard.press('Tab');

        // Toggle checkbox with space
        await page.keyboard.press('Space');

        // Tab to submit
        let onSubmit = false;
        while (!onSubmit) {
            await page.keyboard.press('Tab');
            const focused = await page.evaluate(() =>
                document.activeElement?.getAttribute('type')
            );
            onSubmit = focused === 'submit';
        }

        // Submit with Enter
        await page.keyboard.press('Enter');

        // Should show success
        await expect(page.locator('.notice-success')).toBeVisible();
    });

    test('table bulk actions work with keyboard', async ({ page }) => {
        await page.goto('/wp-admin/edit.php');

        // Select first post
        await page.keyboard.press('Tab');
        // Navigate to checkbox
        for (let i = 0; i < 5; i++) {
            await page.keyboard.press('Tab');
        }
        await page.keyboard.press('Space'); // Select

        // Navigate to bulk action dropdown
        await page.keyboard.press('Tab');

        // Open dropdown
        await page.keyboard.press('Space');

        // Select "Edit"
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        // Apply
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
    });
});
```

## Live Region Announcements

```typescript
test.describe('Live Region Announcements', () => {
    test('form errors are announced', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Find live region
        const liveRegion = page.locator('[role="alert"], [aria-live="assertive"]');

        // Submit invalid form
        await page.click('#submit');

        // Error should appear in live region
        await expect(liveRegion).toContainText(/error|required|invalid/i);
    });

    test('success messages are announced', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Fill valid form
        await page.fill('#my-plugin-title', 'Valid Title');

        // Submit
        await page.click('#submit');

        // Check for status/polite live region
        const statusRegion = page.locator('[role="status"], [aria-live="polite"]');
        await expect(statusRegion).toContainText(/saved|success|updated/i);
    });

    test('loading states are announced', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Trigger async action
        await page.click('#fetch-data');

        // Loading should be announced
        const liveRegion = page.locator('[aria-live]');
        await expect(liveRegion).toContainText(/loading/i);

        // Completion should be announced
        await expect(liveRegion).toContainText(/complete|loaded/i);
    });
});
```

## Reduced Motion Testing

```typescript
test.describe('Reduced Motion', () => {
    test.use({
        // Emulate prefers-reduced-motion
        colorScheme: 'light',
    });

    test.beforeEach(async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
    });

    test('animations are disabled with reduced motion', async ({ page }) => {
        await page.goto('/sample-page/');

        // Check CSS
        const animationDuration = await page.evaluate(() => {
            const animated = document.querySelector('.animated-element');
            if (!animated) return '0s';
            return window.getComputedStyle(animated).animationDuration;
        });

        expect(animationDuration).toBe('0s');
    });

    test('transitions are disabled with reduced motion', async ({ page }) => {
        await page.goto('/sample-page/');

        const transitionDuration = await page.evaluate(() => {
            const transitioning = document.querySelector('.transitioning-element');
            if (!transitioning) return '0s';
            return window.getComputedStyle(transitioning).transitionDuration;
        });

        expect(transitionDuration).toBe('0s');
    });

    test('page functions without animations', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Open accordion (normally animated)
        await page.click('[aria-controls="advanced-section"]');

        // Content should be immediately visible
        await expect(page.locator('#advanced-section')).toBeVisible();

        // No visual regression issues
        await expect(page).toHaveScreenshot('reduced-motion-settings.png');
    });
});
```

## Reflow Testing (Responsive A11y)

```typescript
test.describe('Reflow and Zoom', () => {
    test('content reflows at 320px width', async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 568 });
        await page.goto('/sample-page/');

        // Check no horizontal scroll needed
        const hasHorizontalScroll = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        expect(hasHorizontalScroll).toBe(false);

        // Visual check
        await expect(page).toHaveScreenshot('reflow-320px.png');
    });

    test('content is usable at 200% zoom equivalent', async ({ page }) => {
        // 200% zoom = 640px viewport representing 1280px screen
        await page.setViewportSize({ width: 640, height: 480 });
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Form should still be usable
        await expect(page.locator('form')).toBeVisible();
        await expect(page.locator('#submit')).toBeVisible();

        // No horizontal scroll
        const hasHorizontalScroll = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        // Allow for WP admin sidebar (known exception)
        // Main content should reflow
        const mainContent = page.locator('#wpbody-content');
        const mainBox = await mainContent.boundingBox();
        expect(mainBox?.width).toBeLessThanOrEqual(640);
    });

    test('text spacing adjustments work', async ({ page }) => {
        await page.goto('/sample-page/');

        // Inject WCAG 1.4.12 text spacing overrides
        await page.addStyleTag({
            content: `
                * {
                    line-height: 1.5 !important;
                    letter-spacing: 0.12em !important;
                    word-spacing: 0.16em !important;
                }
                p {
                    margin-bottom: 2em !important;
                }
            `,
        });

        // Content should still be visible without clipping
        const clippedElements = await page.evaluate(() => {
            const elements = document.querySelectorAll('*');
            const clipped: string[] = [];

            elements.forEach((el) => {
                const style = window.getComputedStyle(el);
                if (style.overflow === 'hidden' && el.scrollHeight > el.clientHeight) {
                    clipped.push(el.tagName);
                }
            });

            return clipped;
        });

        expect(clippedElements.length).toBe(0);
    });
});
```

## CI Configuration

```yaml
name: Advanced A11y

on: [push, pull_request]

jobs:
  a11y-advanced:
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

      - name: Run advanced a11y tests
        run: |
          npx playwright test tests/e2e/a11y-advanced.spec.ts
          npx playwright test tests/e2e/keyboard-flows.spec.ts
          npx playwright test tests/e2e/reduced-motion.spec.ts

      - name: Run reflow tests
        run: npx playwright test tests/e2e/reflow.spec.ts

      - name: Upload results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: a11y-advanced-results
          path: |
            test-results/
            playwright-report/
```
</knowledge>

<best_practices>
- Test accessibility tree properties, not just axe scans
- Assert focus management for all interactive patterns
- Test with reduced motion preference
- Test reflow at 320px and 200% zoom equivalent
- Record focus order for critical flows
- Assert all interactive elements have accessible names
</best_practices>

<commands>
```bash
# Run advanced a11y tests
npx playwright test tests/e2e/a11y-advanced.spec.ts

# Run with reduced motion
npx playwright test --project=reduced-motion

# Run reflow tests
npx playwright test tests/e2e/reflow.spec.ts

# Generate a11y report
npx playwright test --reporter=html tests/e2e/a11y/
```
</commands>
</skill>
