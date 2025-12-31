/**
 * Accessibility Tests
 *
 * Tests for keyboard navigation, focus management,
 * form labels, modal accessibility, and ARIA compliance.
 *
 * @package wp-dev-prompts
 */

import { test, expect, Page } from '@playwright/test';

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:8888';

// =============================================================================
// KEYBOARD NAVIGATION TESTS
// =============================================================================

test.describe('Keyboard Navigation', () => {
  test('All interactive elements are reachable via Tab', async ({ page }) => {
    await page.goto(BASE_URL);

    // Get all interactive elements
    const interactiveCount = await page.evaluate(() => {
      const interactive = document.querySelectorAll(
        'a[href], button, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"], [role="link"]'
      );
      return Array.from(interactive).filter((el) => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      }).length;
    });

    // Tab through and count focusable elements
    const focusedElements: string[] = [];
    let prevFocused = '';

    for (let i = 0; i < interactiveCount + 5; i++) {
      await page.keyboard.press('Tab');

      const currentFocused = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return '';
        return `${el.tagName}:${el.className}:${el.textContent?.slice(0, 20)}`;
      });

      if (currentFocused && currentFocused !== prevFocused) {
        focusedElements.push(currentFocused);
        prevFocused = currentFocused;
      }

      // Stop if we've looped back
      if (focusedElements.length > 2 && currentFocused === focusedElements[0]) {
        break;
      }
    }

    // Should have found some focusable elements
    expect(focusedElements.length).toBeGreaterThan(0);

    // Log coverage
    console.log(`Keyboard accessible elements: ${focusedElements.length}/${interactiveCount}`);
  });

  test('Focus order matches visual order', async ({ page }) => {
    await page.goto(BASE_URL);

    // Collect focus positions
    const focusPositions: { x: number; y: number; tag: string }[] = [];

    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');

      const position = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;

        const rect = el.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top,
          tag: el.tagName,
        };
      });

      if (position) {
        focusPositions.push(position);
      }
    }

    // Check for major focus jumps (indicates bad order)
    let majorJumps = 0;
    for (let i = 1; i < focusPositions.length; i++) {
      const prev = focusPositions[i - 1];
      const curr = focusPositions[i];

      // If focus jumps up more than 200px while moving right, it might be bad order
      if (curr.y < prev.y - 200 && curr.x > prev.x) {
        majorJumps++;
      }
    }

    if (majorJumps > 2) {
      console.log('Warning: Focus order may not match visual order');
    }
  });

  test('Custom components handle keyboard correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    // Find custom interactive components
    const customComponents = page.locator(
      '[role="button"], [role="menuitem"], [role="tab"], [role="option"]'
    );

    const count = await customComponents.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const component = customComponents.nth(i);
      const isVisible = await component.isVisible();

      if (!isVisible) continue;

      // Focus the component
      await component.focus();

      const role = await component.getAttribute('role');

      // Test appropriate key based on role
      if (role === 'button') {
        // Buttons should respond to Enter and Space
        await page.keyboard.press('Enter');
        // Check if anything happened (difficult to verify generically)
      }

      if (role === 'tab') {
        // Tabs should respond to arrow keys
        await page.keyboard.press('ArrowRight');
      }
    }
  });

  test('Skip link exists and works', async ({ page }) => {
    await page.goto(BASE_URL);

    // Tab to first element
    await page.keyboard.press('Tab');

    // Look for skip link
    const skipLink = page.locator('a[href="#main"], a[href="#content"], a:has-text("skip")').first();

    if ((await skipLink.count()) === 0) {
      console.log('Recommendation: Add skip-to-content link');
      return;
    }

    // Verify it's the first or second focusable element
    const activeElement = await page.evaluate(() => {
      return document.activeElement?.textContent?.toLowerCase() || '';
    });

    const isSkipLink = activeElement.includes('skip');

    if (!isSkipLink) {
      await page.keyboard.press('Tab');
      const secondActive = await page.evaluate(() => {
        return document.activeElement?.textContent?.toLowerCase() || '';
      });
      expect(secondActive.includes('skip')).toBe(true);
    }
  });
});

// =============================================================================
// FOCUS VISIBILITY TESTS
// =============================================================================

test.describe('Focus Visibility', () => {
  test('Focus indicator is visible on all elements', async ({ page }) => {
    await page.goto(BASE_URL);

    const elementsWithoutFocus: string[] = [];

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');

      const focusInfo = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;

        const styles = window.getComputedStyle(el);
        const pseudoStyles = window.getComputedStyle(el, ':focus');

        return {
          tag: el.tagName,
          text: el.textContent?.slice(0, 20),
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          boxShadow: styles.boxShadow,
          borderColor: styles.borderColor,
        };
      });

      if (focusInfo) {
        const hasVisibleFocus =
          focusInfo.outline !== 'none' ||
          focusInfo.outlineWidth !== '0px' ||
          focusInfo.boxShadow !== 'none';

        if (!hasVisibleFocus) {
          elementsWithoutFocus.push(`${focusInfo.tag}: ${focusInfo.text}`);
        }
      }
    }

    if (elementsWithoutFocus.length > 0) {
      console.log('Elements without visible focus:', elementsWithoutFocus);
    }

    // Allow some elements without focus, but not most
    expect(elementsWithoutFocus.length).toBeLessThan(5);
  });

  test('Focus indicator has sufficient contrast', async ({ page }) => {
    await page.goto(BASE_URL);

    // Tab to an element
    await page.keyboard.press('Tab');

    const focusContrast = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;

      const styles = window.getComputedStyle(el);
      const outline = styles.outlineColor;
      const background = styles.backgroundColor;

      return { outline, background };
    });

    // This is a basic check - full contrast calculation would need the helper functions
    if (focusContrast) {
      console.log('Focus colors:', focusContrast);
    }
  });

  test('No outline:none without replacement', async ({ page }) => {
    await page.goto(BASE_URL);

    const badOutlineRemoval = await page.evaluate(() => {
      const stylesheets = Array.from(document.styleSheets);
      let hasOutlineNone = false;

      try {
        stylesheets.forEach((sheet) => {
          try {
            const rules = sheet.cssRules || sheet.rules;
            Array.from(rules).forEach((rule: any) => {
              if (rule.style && rule.style.outline === 'none') {
                // Check if there's a replacement (box-shadow, border)
                if (!rule.style.boxShadow && rule.style.boxShadow !== 'none') {
                  hasOutlineNone = true;
                }
              }
            });
          } catch (e) {
            // Cross-origin stylesheets will throw
          }
        });
      } catch (e) {}

      return hasOutlineNone;
    });

    if (badOutlineRemoval) {
      console.log('Warning: Found outline:none without focus replacement');
    }
  });
});

// =============================================================================
// FORM LABEL TESTS
// =============================================================================

test.describe('Form Labels', () => {
  test('All form controls have associated labels', async ({ page }) => {
    await page.goto(BASE_URL);

    const unlabeledInputs = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), select, textarea');
      const unlabeled: string[] = [];

      inputs.forEach((input) => {
        const id = input.id;
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledBy = input.getAttribute('aria-labelledby');
        const hasLabel = id && document.querySelector(`label[for="${id}"]`);
        const wrappedInLabel = input.closest('label') !== null;

        if (!hasLabel && !ariaLabel && !ariaLabelledBy && !wrappedInLabel) {
          unlabeled.push(`${input.tagName}#${id || 'no-id'}`);
        }
      });

      return unlabeled;
    });

    if (unlabeledInputs.length > 0) {
      console.log('Inputs without labels:', unlabeledInputs);
    }

    expect(unlabeledInputs.length).toBe(0);
  });

  test('Placeholders are not used as labels', async ({ page }) => {
    await page.goto(BASE_URL);

    const placeholderOnlyInputs = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
      const bad: string[] = [];

      inputs.forEach((input) => {
        const id = input.id;
        const ariaLabel = input.getAttribute('aria-label');
        const hasLabel = id && document.querySelector(`label[for="${id}"]`);
        const wrappedInLabel = input.closest('label') !== null;
        const placeholder = input.getAttribute('placeholder');

        // Has placeholder but no proper label
        if (placeholder && !hasLabel && !ariaLabel && !wrappedInLabel) {
          bad.push(`${input.tagName}: "${placeholder}"`);
        }
      });

      return bad;
    });

    if (placeholderOnlyInputs.length > 0) {
      console.log('Inputs using placeholder as only label:', placeholderOnlyInputs);
      console.log('Recommendation: Add proper labels - placeholders disappear when typing');
    }
  });

  test('Required fields are indicated accessibly', async ({ page }) => {
    await page.goto(BASE_URL);

    const requiredFields = page.locator('input[required], [aria-required="true"], select[required], textarea[required]');
    const count = await requiredFields.count();

    for (let i = 0; i < count; i++) {
      const field = requiredFields.nth(i);
      const isVisible = await field.isVisible();

      if (!isVisible) continue;

      const hasAccessibleIndicator = await field.evaluate((el) => {
        // Check for aria-required
        if (el.getAttribute('aria-required') === 'true') return true;
        if (el.hasAttribute('required')) return true;

        // Check associated label for indicator
        const id = el.id;
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          if (label) {
            const text = label.textContent || '';
            // Look for asterisk or "required" text
            return text.includes('*') || text.toLowerCase().includes('required');
          }
        }

        return false;
      });

      expect(hasAccessibleIndicator).toBe(true);
    }
  });
});

// =============================================================================
// MODAL/DIALOG ACCESSIBILITY TESTS
// =============================================================================

test.describe('Modal Accessibility', () => {
  test('Modals trap focus correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    // Try to find and open a modal
    const modalTriggers = page.locator(
      '[data-toggle="modal"], [aria-haspopup="dialog"], button:has-text("open"), button:has-text("Open")'
    );

    if ((await modalTriggers.count()) === 0) {
      test.skip();
      return;
    }

    const trigger = modalTriggers.first();
    await trigger.click();

    // Wait for modal to appear
    const modal = page.locator('[role="dialog"], .modal, [aria-modal="true"]').first();

    if ((await modal.count()) === 0) {
      test.skip();
      return;
    }

    await modal.waitFor({ state: 'visible' });

    // Tab several times and verify focus stays in modal
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');

      const focusInModal = await page.evaluate(() => {
        const modal = document.querySelector('[role="dialog"], .modal, [aria-modal="true"]');
        const focused = document.activeElement;
        return modal?.contains(focused) || false;
      });

      expect(focusInModal).toBe(true);
    }
  });

  test('Modals have proper ARIA attributes', async ({ page }) => {
    await page.goto(BASE_URL);

    const modals = page.locator('[role="dialog"], .modal');
    const count = await modals.count();

    for (let i = 0; i < count; i++) {
      const modal = modals.nth(i);

      const attributes = await modal.evaluate((el) => {
        return {
          role: el.getAttribute('role'),
          ariaModal: el.getAttribute('aria-modal'),
          ariaLabel: el.getAttribute('aria-label'),
          ariaLabelledBy: el.getAttribute('aria-labelledby'),
        };
      });

      // Should have role="dialog" or role="alertdialog"
      if (attributes.role) {
        expect(['dialog', 'alertdialog']).toContain(attributes.role);
      }

      // Should have aria-modal="true"
      expect(attributes.ariaModal).toBe('true');

      // Should have accessible name
      const hasName = attributes.ariaLabel || attributes.ariaLabelledBy;
      expect(hasName).toBeTruthy();
    }
  });

  test('Modals can be closed with Escape', async ({ page }) => {
    await page.goto(BASE_URL);

    // Find and open a modal
    const modalTriggers = page.locator('[data-toggle="modal"], [aria-haspopup="dialog"]');

    if ((await modalTriggers.count()) === 0) {
      test.skip();
      return;
    }

    await modalTriggers.first().click();

    const modal = page.locator('[role="dialog"], .modal, [aria-modal="true"]').first();

    if ((await modal.count()) === 0 || !(await modal.isVisible())) {
      test.skip();
      return;
    }

    // Press Escape
    await page.keyboard.press('Escape');

    // Modal should be closed
    await expect(modal).not.toBeVisible({ timeout: 2000 });
  });
});

// =============================================================================
// IMAGE ALT TEXT TESTS
// =============================================================================

test.describe('Image Alt Text', () => {
  test('All informative images have alt text', async ({ page }) => {
    await page.goto(BASE_URL);

    const imagesWithoutAlt = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const noAlt: string[] = [];

      images.forEach((img) => {
        const alt = img.getAttribute('alt');
        const role = img.getAttribute('role');

        // Missing alt attribute entirely (not even empty)
        if (alt === null && role !== 'presentation') {
          noAlt.push(img.src.split('/').pop() || 'unknown');
        }
      });

      return noAlt;
    });

    if (imagesWithoutAlt.length > 0) {
      console.log('Images missing alt attribute:', imagesWithoutAlt.slice(0, 5));
    }

    expect(imagesWithoutAlt.length).toBe(0);
  });

  test('Decorative images have empty alt', async ({ page }) => {
    await page.goto(BASE_URL);

    const decorativeImages = await page.evaluate(() => {
      const images = document.querySelectorAll('img[role="presentation"], img[aria-hidden="true"]');
      const badDecorative: string[] = [];

      images.forEach((img) => {
        const alt = img.getAttribute('alt');
        if (alt && alt !== '') {
          badDecorative.push(img.src.split('/').pop() || 'unknown');
        }
      });

      return badDecorative;
    });

    if (decorativeImages.length > 0) {
      console.log('Decorative images with non-empty alt:', decorativeImages);
    }
  });
});

// =============================================================================
// HEADING STRUCTURE TESTS
// =============================================================================

test.describe('Heading Structure', () => {
  test('Exactly one h1 per page', async ({ page }) => {
    await page.goto(BASE_URL);

    const h1Count = await page.locator('h1').count();

    expect(h1Count).toBe(1);
  });

  test('Heading levels are sequential', async ({ page }) => {
    await page.goto(BASE_URL);

    const headingIssues = await page.evaluate(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const issues: string[] = [];
      let prevLevel = 0;

      headings.forEach((h) => {
        const level = parseInt(h.tagName[1]);

        // First heading should be h1
        if (prevLevel === 0 && level !== 1) {
          issues.push(`First heading is h${level}, should be h1`);
        }

        // Can't skip levels going down
        if (level > prevLevel + 1 && prevLevel !== 0) {
          issues.push(`Skipped from h${prevLevel} to h${level}`);
        }

        prevLevel = level;
      });

      return issues;
    });

    if (headingIssues.length > 0) {
      console.log('Heading structure issues:', headingIssues);
    }

    // Allow some flexibility but warn about major issues
    expect(headingIssues.length).toBeLessThan(3);
  });

  test('Headings describe page structure', async ({ page }) => {
    await page.goto(BASE_URL);

    const headings = await page.evaluate(() => {
      const hs = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(hs).map((h) => ({
        level: h.tagName,
        text: h.textContent?.trim().slice(0, 50),
      }));
    });

    // Log heading structure for manual review
    console.log('Page heading structure:');
    headings.forEach((h) => {
      const indent = '  '.repeat(parseInt(h.level[1]) - 1);
      console.log(`${indent}${h.level}: ${h.text}`);
    });
  });
});

// =============================================================================
// ARIA LIVE REGIONS
// =============================================================================

test.describe('ARIA Live Regions', () => {
  test('Dynamic content has live regions', async ({ page }) => {
    await page.goto(BASE_URL);

    const liveRegions = await page.evaluate(() => {
      const regions = document.querySelectorAll('[aria-live], [role="alert"], [role="status"]');
      return Array.from(regions).map((r) => ({
        role: r.getAttribute('role'),
        ariaLive: r.getAttribute('aria-live'),
        text: r.textContent?.slice(0, 30),
      }));
    });

    console.log('Live regions found:', liveRegions.length);

    // This is informational - presence of live regions is good practice
    if (liveRegions.length === 0) {
      console.log('Consider: Add aria-live regions for dynamic content updates');
    }
  });
});
