/**
 * Feedback & Affordance Tests
 *
 * Tests for interaction feedback, error messaging,
 * loading states, and success confirmations.
 *
 * @package wp-dev-prompts
 */

import { test, expect, Page } from '@playwright/test';

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:8888';

// =============================================================================
// INTERACTION FEEDBACK TESTS
// =============================================================================

test.describe('Interaction Feedback', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Buttons have distinct hover state', async ({ page }) => {
    const buttons = page.locator('button, [role="button"], .btn, .button');
    const count = await buttons.count();

    if (count === 0) {
      test.skip();
      return;
    }

    for (let i = 0; i < Math.min(count, 5); i++) {
      const button = buttons.nth(i);
      const isVisible = await button.isVisible();

      if (!isVisible) continue;

      // Get initial styles
      const initialStyles = await button.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          backgroundColor: s.backgroundColor,
          color: s.color,
          transform: s.transform,
          boxShadow: s.boxShadow,
          borderColor: s.borderColor,
        };
      });

      // Hover over button
      await button.hover();

      // Get hover styles
      const hoverStyles = await button.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          backgroundColor: s.backgroundColor,
          color: s.color,
          transform: s.transform,
          boxShadow: s.boxShadow,
          borderColor: s.borderColor,
        };
      });

      // At least one property should change on hover
      const hasHoverChange =
        initialStyles.backgroundColor !== hoverStyles.backgroundColor ||
        initialStyles.color !== hoverStyles.color ||
        initialStyles.transform !== hoverStyles.transform ||
        initialStyles.boxShadow !== hoverStyles.boxShadow ||
        initialStyles.borderColor !== hoverStyles.borderColor;

      if (!hasHoverChange) {
        const text = await button.textContent();
        console.log(`Consider: Button "${text?.slice(0, 20)}" has no hover state change`);
      }
    }
  });

  test('Buttons have visible focus state', async ({ page }) => {
    const buttons = page.locator('button, [role="button"], .btn, .button');
    const count = await buttons.count();

    if (count === 0) {
      test.skip();
      return;
    }

    for (let i = 0; i < Math.min(count, 5); i++) {
      const button = buttons.nth(i);
      const isVisible = await button.isVisible();

      if (!isVisible) continue;

      // Get initial styles
      const initialStyles = await button.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          outline: s.outline,
          outlineOffset: s.outlineOffset,
          boxShadow: s.boxShadow,
          borderColor: s.borderColor,
        };
      });

      // Focus the button
      await button.focus();

      // Get focused styles
      const focusStyles = await button.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          outline: s.outline,
          outlineOffset: s.outlineOffset,
          boxShadow: s.boxShadow,
          borderColor: s.borderColor,
        };
      });

      // Focus should be visible (outline, shadow, or border change)
      const hasFocusIndicator =
        focusStyles.outline !== 'none' ||
        focusStyles.boxShadow !== initialStyles.boxShadow ||
        focusStyles.borderColor !== initialStyles.borderColor;

      expect(hasFocusIndicator).toBe(true);
    }
  });

  test('Links have hover and focus states', async ({ page }) => {
    const links = page.locator('a').first();

    if ((await links.count()) === 0) {
      test.skip();
      return;
    }

    // Get initial state
    const initialStyles = await links.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        color: s.color,
        textDecoration: s.textDecorationLine,
      };
    });

    // Hover
    await links.hover();
    const hoverStyles = await links.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        color: s.color,
        textDecoration: s.textDecorationLine,
      };
    });

    // Focus
    await links.focus();
    const focusStyles = await links.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        outline: s.outline,
        outlineWidth: s.outlineWidth,
      };
    });

    // Should have some hover change
    const hasHoverChange =
      initialStyles.color !== hoverStyles.color ||
      initialStyles.textDecoration !== hoverStyles.textDecoration;

    // Should have focus indicator
    const hasFocusIndicator = focusStyles.outline !== 'none';

    if (!hasHoverChange) {
      console.log('Consider: Links should have visible hover state');
    }

    expect(hasFocusIndicator).toBe(true);
  });

  test('Form inputs show focus state', async ({ page }) => {
    const inputs = page.locator('input, textarea, select');
    const count = await inputs.count();

    if (count === 0) {
      test.skip();
      return;
    }

    for (let i = 0; i < Math.min(count, 5); i++) {
      const input = inputs.nth(i);
      const isVisible = await input.isVisible();
      const isDisabled = await input.isDisabled();

      if (!isVisible || isDisabled) continue;

      // Get initial border/outline
      const initialStyles = await input.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          borderColor: s.borderColor,
          outline: s.outline,
          boxShadow: s.boxShadow,
        };
      });

      // Focus the input
      await input.focus();

      const focusStyles = await input.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          borderColor: s.borderColor,
          outline: s.outline,
          boxShadow: s.boxShadow,
        };
      });

      // Should have visible focus change
      const hasFocusChange =
        focusStyles.outline !== 'none' ||
        focusStyles.borderColor !== initialStyles.borderColor ||
        focusStyles.boxShadow !== initialStyles.boxShadow;

      expect(hasFocusChange).toBe(true);
    }
  });

  test('Disabled elements look disabled', async ({ page }) => {
    const disabledElements = page.locator('[disabled], [aria-disabled="true"]');
    const count = await disabledElements.count();

    if (count === 0) {
      // No disabled elements - that's fine
      test.skip();
      return;
    }

    for (let i = 0; i < count; i++) {
      const element = disabledElements.nth(i);
      const isVisible = await element.isVisible();

      if (!isVisible) continue;

      const styles = await element.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          opacity: parseFloat(s.opacity),
          cursor: s.cursor,
          pointerEvents: s.pointerEvents,
        };
      });

      // Disabled elements should look different
      // Common patterns: reduced opacity, not-allowed cursor
      const looksDisabled =
        styles.opacity < 1 ||
        styles.cursor === 'not-allowed' ||
        styles.pointerEvents === 'none';

      expect(looksDisabled).toBe(true);
    }
  });
});

// =============================================================================
// ERROR STATE TESTS
// =============================================================================

test.describe('Error Messaging', () => {
  test('Required field shows error when submitted empty', async ({ page }) => {
    await page.goto(BASE_URL);

    const form = page.locator('form').first();

    if ((await form.count()) === 0) {
      test.skip();
      return;
    }

    // Find a required field
    const requiredInput = form.locator('input[required], [aria-required="true"]').first();

    if ((await requiredInput.count()) === 0) {
      test.skip();
      return;
    }

    // Clear the input and try to submit
    await requiredInput.fill('');

    const submitBtn = form.locator('button[type="submit"], input[type="submit"]').first();

    if ((await submitBtn.count()) > 0) {
      await submitBtn.click();

      // Check for error indication
      const hasError = await page.evaluate(() => {
        // Look for common error indicators
        const errorMessages = document.querySelectorAll(
          '.error, .error-message, [class*="error"], [role="alert"], .invalid-feedback'
        );
        const invalidInputs = document.querySelectorAll(':invalid, [aria-invalid="true"]');

        return errorMessages.length > 0 || invalidInputs.length > 0;
      });

      expect(hasError).toBe(true);
    }
  });

  test('Error messages are near relevant fields', async ({ page }) => {
    await page.goto(BASE_URL);

    // Look for existing error messages
    const errorMessages = page.locator('.error-message, .field-error, [class*="error"], .invalid-feedback');
    const count = await errorMessages.count();

    if (count === 0) {
      // Try to trigger an error
      const form = page.locator('form').first();
      if ((await form.count()) > 0) {
        const submitBtn = form.locator('button[type="submit"]').first();
        if ((await submitBtn.count()) > 0) {
          await submitBtn.click();
        }
      }
    }

    // Re-check for error messages
    const errors = await page.locator('.error-message, .field-error, [class*="error"]').all();

    for (const error of errors) {
      const isVisible = await error.isVisible();
      if (!isVisible) continue;

      // Error should be positioned near a form element
      const nearInput = await error.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const inputs = document.querySelectorAll('input, select, textarea');

        for (const input of inputs) {
          const inputRect = input.getBoundingClientRect();
          const distance = Math.abs(rect.top - inputRect.bottom);

          // Within 50px vertically of an input
          if (distance < 50) return true;
        }
        return false;
      });

      if (!nearInput) {
        console.log('Consider: Position error messages closer to relevant fields');
      }
    }
  });

  test('Error messages use color plus icon/text', async ({ page }) => {
    await page.goto(BASE_URL);

    const errorElements = page.locator('.error, [class*="error"], [role="alert"]');
    const count = await errorElements.count();

    if (count === 0) {
      test.skip();
      return;
    }

    for (let i = 0; i < Math.min(count, 3); i++) {
      const error = errorElements.nth(i);
      const isVisible = await error.isVisible();

      if (!isVisible) continue;

      const hasAccessibleIndicator = await error.evaluate((el) => {
        // Check for icon (svg, img, or icon font)
        const hasIcon = el.querySelector('svg, img, [class*="icon"]') !== null;

        // Check for meaningful text content
        const text = el.textContent?.trim() || '';
        const hasText = text.length > 0;

        // Check for aria role
        const hasRole = el.getAttribute('role') === 'alert';

        return hasIcon || hasText || hasRole;
      });

      // Error should have more than just color
      expect(hasAccessibleIndicator).toBe(true);
    }
  });
});

// =============================================================================
// LOADING STATE TESTS
// =============================================================================

test.describe('Loading & Progress Indicators', () => {
  test('Loading states exist for async operations', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check for loading indicator elements in the DOM
    const loadingIndicators = await page.evaluate(() => {
      const selectors = [
        '.loading',
        '.spinner',
        '.loader',
        '[class*="loading"]',
        '[class*="spinner"]',
        '.skeleton',
        '[aria-busy="true"]',
        '[role="progressbar"]',
        'progress',
      ];

      let found = 0;
      selectors.forEach((sel) => {
        found += document.querySelectorAll(sel).length;
      });

      return found;
    });

    // This is informational - we can't always trigger loading states
    console.log(`Found ${loadingIndicators} potential loading indicator elements`);
  });

  test('Progress bars have accessible attributes', async ({ page }) => {
    await page.goto(BASE_URL);

    const progressBars = page.locator('[role="progressbar"], progress');
    const count = await progressBars.count();

    if (count === 0) {
      test.skip();
      return;
    }

    for (let i = 0; i < count; i++) {
      const progress = progressBars.nth(i);

      const attributes = await progress.evaluate((el) => {
        return {
          role: el.getAttribute('role'),
          ariaValueNow: el.getAttribute('aria-valuenow'),
          ariaValueMin: el.getAttribute('aria-valuemin'),
          ariaValueMax: el.getAttribute('aria-valuemax'),
          ariaLabel: el.getAttribute('aria-label'),
          ariaLabelledBy: el.getAttribute('aria-labelledby'),
        };
      });

      // Progress bars should have value attributes
      if (attributes.role === 'progressbar') {
        expect(attributes.ariaValueNow).not.toBeNull();
        expect(attributes.ariaValueMin).not.toBeNull();
        expect(attributes.ariaValueMax).not.toBeNull();
      }
    }
  });

  test('Skeleton screens or spinners during content load', async ({ page }) => {
    // Throttle network to see loading states
    await page.route('**/*', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.continue();
    });

    await page.goto(BASE_URL);

    // Check if any loading UI appears before content
    const hasLoadingUI = await page.evaluate(() => {
      const indicators = document.querySelectorAll(
        '.skeleton, .loading, .spinner, [class*="skeleton"], [class*="loading"]'
      );
      return indicators.length > 0;
    });

    // Log recommendation
    if (!hasLoadingUI) {
      console.log('Consider: Add skeleton screens or loading indicators for better perceived performance');
    }
  });
});

// =============================================================================
// SUCCESS CONFIRMATION TESTS
// =============================================================================

test.describe('Success Confirmation', () => {
  test('Success states are visually distinct', async ({ page }) => {
    await page.goto(BASE_URL);

    // Look for success indicators in the DOM
    const successElements = page.locator('.success, [class*="success"], .alert-success');
    const count = await successElements.count();

    if (count === 0) {
      // Try to find form and submit successfully
      const form = page.locator('form').first();
      if ((await form.count()) > 0) {
        // Fill required fields
        const inputs = form.locator('input[required]');
        const inputCount = await inputs.count();

        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i);
          const type = await input.getAttribute('type');

          if (type === 'email') {
            await input.fill('test@example.com');
          } else {
            await input.fill('Test value');
          }
        }

        const submitBtn = form.locator('button[type="submit"]').first();
        if ((await submitBtn.count()) > 0) {
          await submitBtn.click();
          await page.waitForLoadState('networkidle');
        }
      }
    }

    // Re-check for success elements
    const successAfter = page.locator('.success, [class*="success"], .alert-success').first();

    if ((await successAfter.count()) > 0 && (await successAfter.isVisible())) {
      const styles = await successAfter.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          backgroundColor: s.backgroundColor,
          color: s.color,
          borderColor: s.borderColor,
        };
      });

      // Success should have green-ish coloring typically
      console.log('Success element styles:', styles);
    }
  });

  test('Destructive actions require confirmation', async ({ page }) => {
    await page.goto(BASE_URL);

    // Find delete/remove buttons
    const destructiveButtons = page.locator(
      'button:has-text("delete"), button:has-text("remove"), button:has-text("Delete"), button:has-text("Remove"), [class*="delete"], [class*="remove"]'
    );

    const count = await destructiveButtons.count();

    if (count === 0) {
      test.skip();
      return;
    }

    // Click a destructive button and check for confirmation
    const firstDestructive = destructiveButtons.first();

    if (await firstDestructive.isVisible()) {
      // Set up dialog handler
      let confirmDialogShown = false;
      page.on('dialog', async (dialog) => {
        confirmDialogShown = true;
        await dialog.dismiss();
      });

      await firstDestructive.click();

      // Check for custom confirmation modal
      const confirmModal = page.locator('[role="alertdialog"], .confirm-modal, .confirmation');

      const hasConfirmation = confirmDialogShown || (await confirmModal.count()) > 0;

      if (!hasConfirmation) {
        console.log('Consider: Destructive actions should require confirmation');
      }
    }
  });
});

// =============================================================================
// AFFORDANCE TESTS
// =============================================================================

test.describe('Affordance', () => {
  test('Clickable elements look clickable', async ({ page }) => {
    await page.goto(BASE_URL);

    const clickables = page.locator('button, a, [role="button"], [onclick]');
    const count = await clickables.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const element = clickables.nth(i);
      const isVisible = await element.isVisible();

      if (!isVisible) continue;

      const cursor = await element.evaluate((el) => {
        return window.getComputedStyle(el).cursor;
      });

      // Clickable elements should have pointer cursor
      expect(cursor).toBe('pointer');
    }
  });

  test('Form controls are distinguishable from text', async ({ page }) => {
    await page.goto(BASE_URL);

    const inputs = page.locator('input, select, textarea');
    const count = await inputs.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const input = inputs.nth(i);
      const isVisible = await input.isVisible();
      const type = await input.getAttribute('type');

      // Skip hidden inputs
      if (!isVisible || type === 'hidden') continue;

      const styles = await input.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          border: s.border,
          borderWidth: s.borderWidth,
          backgroundColor: s.backgroundColor,
          boxShadow: s.boxShadow,
        };
      });

      // Inputs should have visible boundaries
      const hasVisibleBoundary =
        styles.borderWidth !== '0px' ||
        styles.boxShadow !== 'none' ||
        styles.backgroundColor !== 'rgba(0, 0, 0, 0)';

      expect(hasVisibleBoundary).toBe(true);
    }
  });

  test('Expandable sections indicate expandability', async ({ page }) => {
    await page.goto(BASE_URL);

    // Find accordion/expandable elements
    const expandables = page.locator(
      '[aria-expanded], details, .accordion, .collapsible, [class*="expand"], [class*="collapse"]'
    );

    const count = await expandables.count();

    if (count === 0) {
      test.skip();
      return;
    }

    for (let i = 0; i < Math.min(count, 3); i++) {
      const element = expandables.nth(i);
      const isVisible = await element.isVisible();

      if (!isVisible) continue;

      // Check for expand/collapse indicators
      const hasIndicator = await element.evaluate((el) => {
        // Look for chevron, plus/minus, or aria-expanded
        const hasAriaExpanded = el.hasAttribute('aria-expanded');
        const hasIcon = el.querySelector('svg, [class*="icon"], [class*="arrow"], [class*="chevron"]') !== null;
        const isDetails = el.tagName === 'DETAILS';

        return hasAriaExpanded || hasIcon || isDetails;
      });

      expect(hasIndicator).toBe(true);
    }
  });
});
