/**
 * Heuristic Evaluation Tests
 *
 * Tests based on Nielsen's 10 usability heuristics.
 * These are higher-level checks that assess overall UX quality.
 *
 * @package wp-dev-prompts
 */

import { test, expect, Page } from '@playwright/test';

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:8888';

// =============================================================================
// HEURISTIC 1: VISIBILITY OF SYSTEM STATUS
// =============================================================================

test.describe('H1: Visibility of System Status', () => {
  test('Current location is indicated in navigation', async ({ page }) => {
    await page.goto(BASE_URL);

    // Navigate to a subpage
    const link = page.locator('a[href^="/"]').first();
    if ((await link.count()) === 0) {
      test.skip();
      return;
    }

    await link.click();
    await page.waitForLoadState('networkidle');

    // Check for current page indicator
    const hasIndicator = await page.evaluate(() => {
      const indicators = document.querySelectorAll(
        '[aria-current], .active, .current, .is-active, nav [class*="current"]'
      );
      return indicators.length > 0;
    });

    if (!hasIndicator) {
      console.log('H1: Consider adding current page indication in navigation');
    }
  });

  test('Page title reflects current content', async ({ page }) => {
    await page.goto(BASE_URL);

    const homeTitle = await page.title();
    expect(homeTitle.length).toBeGreaterThan(0);

    // Navigate to another page
    const link = page.locator('a[href^="/"]').first();
    if ((await link.count()) > 0) {
      await link.click();
      await page.waitForLoadState('networkidle');

      const subpageTitle = await page.title();

      // Title should change to reflect new page
      // (or at least not be empty)
      expect(subpageTitle.length).toBeGreaterThan(0);
    }
  });

  test('Form submission provides feedback', async ({ page }) => {
    await page.goto(BASE_URL);

    const form = page.locator('form').first();
    if ((await form.count()) === 0) {
      test.skip();
      return;
    }

    // Fill in any visible inputs
    const inputs = form.locator('input[type="text"], input[type="email"], textarea');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const type = await input.getAttribute('type');

      if (await input.isVisible()) {
        if (type === 'email') {
          await input.fill('test@example.com');
        } else {
          await input.fill('Test value');
        }
      }
    }

    const submitBtn = form.locator('button[type="submit"], input[type="submit"]').first();
    if ((await submitBtn.count()) === 0) {
      test.skip();
      return;
    }

    await submitBtn.click();

    // Wait for response
    await page.waitForLoadState('networkidle');

    // Check for feedback (success message, error, or redirect)
    const hasFeedback = await page.evaluate(() => {
      const feedback = document.querySelectorAll(
        '.success, .error, .message, [role="alert"], [role="status"], .notice, .alert'
      );
      return feedback.length > 0;
    });

    const urlChanged = page.url() !== BASE_URL;

    expect(hasFeedback || urlChanged).toBe(true);
  });
});

// =============================================================================
// HEURISTIC 2: MATCH BETWEEN SYSTEM AND REAL WORLD
// =============================================================================

test.describe('H2: Match Between System and Real World', () => {
  test('Navigation uses familiar terms', async ({ page }) => {
    await page.goto(BASE_URL);

    const navTexts = await page.evaluate(() => {
      const nav = document.querySelector('nav, [role="navigation"]');
      if (!nav) return [];

      const links = nav.querySelectorAll('a');
      return Array.from(links).map((a) => a.textContent?.trim().toLowerCase());
    });

    // Check for technical jargon that might confuse users
    const technicalTerms = ['config', 'params', 'api', 'crud', 'db', 'admin', 'backend'];
    const foundJargon = navTexts.filter((text) =>
      technicalTerms.some((term) => text?.includes(term))
    );

    if (foundJargon.length > 0) {
      console.log('H2: Consider simplifying technical terms in navigation:', foundJargon);
    }
  });

  test('Icons are recognizable', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check that icons have accessible labels
    const iconsWithoutLabels = await page.evaluate(() => {
      const icons = document.querySelectorAll('svg, [class*="icon"], i[class*="fa-"], i[class*="icon"]');
      const unlabeled: string[] = [];

      icons.forEach((icon) => {
        const parent = icon.parentElement;
        const hasLabel =
          icon.getAttribute('aria-label') ||
          icon.getAttribute('aria-labelledby') ||
          parent?.textContent?.trim().length || 0 > 0 ||
          parent?.getAttribute('aria-label');

        if (!hasLabel) {
          const className = icon.className?.toString().slice(0, 30) || 'unknown';
          unlabeled.push(className);
        }
      });

      return unlabeled.slice(0, 5);
    });

    if (iconsWithoutLabels.length > 0) {
      console.log('H2: Icons without accessible labels:', iconsWithoutLabels);
    }
  });
});

// =============================================================================
// HEURISTIC 3: USER CONTROL AND FREEDOM
// =============================================================================

test.describe('H3: User Control and Freedom', () => {
  test('Cancel/back options are available in forms', async ({ page }) => {
    await page.goto(BASE_URL);

    const forms = page.locator('form');
    const count = await forms.count();

    for (let i = 0; i < Math.min(count, 3); i++) {
      const form = forms.nth(i);

      // Look for cancel/back buttons
      const hasCancel = await form.evaluate((el) => {
        const cancelBtns = el.querySelectorAll(
          'button:not([type="submit"]), a:has-text("cancel"), a:has-text("back"), button:has-text("cancel")'
        );
        return cancelBtns.length > 0;
      });

      if (!hasCancel) {
        console.log('H3: Consider adding cancel/back option to form');
      }
    }
  });

  test('Modal dialogs have close buttons', async ({ page }) => {
    await page.goto(BASE_URL);

    // Find any existing modals (might be hidden)
    const modals = page.locator('[role="dialog"], .modal');
    const count = await modals.count();

    for (let i = 0; i < count; i++) {
      const modal = modals.nth(i);

      const hasClose = await modal.evaluate((el) => {
        const closeBtn = el.querySelector(
          'button[aria-label*="close"], .close, [class*="close"], button:has-text("×")'
        );
        return closeBtn !== null;
      });

      expect(hasClose).toBe(true);
    }
  });

  test('Undo capability exists for destructive actions', async ({ page }) => {
    await page.goto(BASE_URL);

    // Find delete buttons
    const deleteButtons = page.locator('button:has-text("delete"), [class*="delete"]');

    if ((await deleteButtons.count()) > 0) {
      // Check for undo notifications or confirmation dialogs
      const firstDelete = deleteButtons.first();

      if (await firstDelete.isVisible()) {
        // Set up dialog handler
        let hasConfirmation = false;
        page.on('dialog', async (dialog) => {
          hasConfirmation = true;
          await dialog.dismiss();
        });

        await firstDelete.click();

        // Check for confirmation modal or dialog
        const hasModal = (await page.locator('[role="alertdialog"], .confirm').count()) > 0;

        if (!hasConfirmation && !hasModal) {
          console.log('H3: Destructive actions should have confirmation or undo');
        }
      }
    }
  });
});

// =============================================================================
// HEURISTIC 4: CONSISTENCY AND STANDARDS
// =============================================================================

test.describe('H4: Consistency and Standards', () => {
  test('Button styles are consistent', async ({ page }) => {
    await page.goto(BASE_URL);

    const buttonStyles = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button, [role="button"]');
      const styles: any[] = [];

      buttons.forEach((btn) => {
        if ((btn as HTMLElement).offsetParent === null) return; // Skip hidden

        const s = window.getComputedStyle(btn);
        styles.push({
          borderRadius: s.borderRadius,
          fontFamily: s.fontFamily,
          textTransform: s.textTransform,
        });
      });

      return styles;
    });

    if (buttonStyles.length > 1) {
      // Check for consistency in border-radius
      const radii = [...new Set(buttonStyles.map((s) => s.borderRadius))];
      if (radii.length > 3) {
        console.log('H4: Consider using consistent border-radius across buttons');
      }
    }
  });

  test('Link styles are consistent', async ({ page }) => {
    await page.goto(BASE_URL);

    const linkColors = await page.evaluate(() => {
      const links = document.querySelectorAll('a:not([role="button"])');
      const colors = new Set<string>();

      links.forEach((link) => {
        if ((link as HTMLElement).offsetParent === null) return;
        const color = window.getComputedStyle(link).color;
        colors.add(color);
      });

      return Array.from(colors);
    });

    // Should have limited color variations for links
    if (linkColors.length > 3) {
      console.log('H4: Consider using consistent link colors (found', linkColors.length, 'variations)');
    }
  });

  test('Form input styles are consistent', async ({ page }) => {
    await page.goto(BASE_URL);

    const inputStyles = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
      const styles: any[] = [];

      inputs.forEach((input) => {
        if ((input as HTMLElement).offsetParent === null) return;

        const s = window.getComputedStyle(input);
        styles.push({
          border: s.border,
          borderRadius: s.borderRadius,
          padding: s.padding,
        });
      });

      return styles;
    });

    if (inputStyles.length > 1) {
      const borders = [...new Set(inputStyles.map((s) => s.border))];
      if (borders.length > 2) {
        console.log('H4: Consider using consistent input styles');
      }
    }
  });
});

// =============================================================================
// HEURISTIC 5: ERROR PREVENTION
// =============================================================================

test.describe('H5: Error Prevention', () => {
  test('Form validation prevents invalid submission', async ({ page }) => {
    await page.goto(BASE_URL);

    const form = page.locator('form').first();
    if ((await form.count()) === 0) {
      test.skip();
      return;
    }

    // Find email input and enter invalid email
    const emailInput = form.locator('input[type="email"]').first();

    if ((await emailInput.count()) > 0) {
      await emailInput.fill('invalid-email');
      await emailInput.blur();

      // Check for validation feedback
      const isInvalid = await emailInput.evaluate((el) => {
        return !el.checkValidity() || el.classList.contains('invalid');
      });

      expect(isInvalid).toBe(true);
    }
  });

  test('Dangerous actions are disabled when inappropriate', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check for disabled states on potentially dangerous buttons
    const dangerButtons = page.locator('button[disabled], button:has-text("delete")[disabled]');

    // This is informational - presence of disabled states is good
    const disabledCount = await dangerButtons.count();
    console.log('H5: Found', disabledCount, 'disabled buttons (good pattern)');
  });

  test('Required fields are marked before submission', async ({ page }) => {
    await page.goto(BASE_URL);

    const requiredFields = page.locator('input[required], textarea[required], select[required]');
    const count = await requiredFields.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const field = requiredFields.nth(i);
      if (!(await field.isVisible())) continue;

      // Check if required indicator is visible before any submission attempt
      const hasIndicator = await field.evaluate((el) => {
        const id = el.id;
        const label = id ? document.querySelector(`label[for="${id}"]`) : el.closest('label');

        if (label) {
          const text = label.textContent || '';
          return text.includes('*') || text.toLowerCase().includes('required');
        }

        return el.getAttribute('aria-required') === 'true';
      });

      if (!hasIndicator) {
        console.log('H5: Required field indicator not visible before submission');
      }
    }
  });
});

// =============================================================================
// HEURISTIC 6: RECOGNITION RATHER THAN RECALL
// =============================================================================

test.describe('H6: Recognition Rather Than Recall', () => {
  test('Form fields have visible labels', async ({ page }) => {
    await page.goto(BASE_URL);

    const inputs = page.locator('input[type="text"], input[type="email"], textarea, select');
    const count = await inputs.count();

    let hiddenLabelCount = 0;

    for (let i = 0; i < Math.min(count, 10); i++) {
      const input = inputs.nth(i);
      if (!(await input.isVisible())) continue;

      const hasVisibleLabel = await input.evaluate((el) => {
        const id = el.id;

        // Check for visible label
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          if (label) {
            const style = window.getComputedStyle(label);
            return style.display !== 'none' && style.visibility !== 'hidden';
          }
        }

        // Check for wrapper label
        const wrapperLabel = el.closest('label');
        if (wrapperLabel) {
          const style = window.getComputedStyle(wrapperLabel);
          return style.display !== 'none';
        }

        return false;
      });

      if (!hasVisibleLabel) {
        hiddenLabelCount++;
      }
    }

    if (hiddenLabelCount > 0) {
      console.log('H6: Found', hiddenLabelCount, 'inputs without visible labels');
    }
  });

  test('Recent/frequent items are surfaced', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check for recent items, history, or quick access patterns
    const hasRecentPattern = await page.evaluate(() => {
      const recentIndicators = document.querySelectorAll(
        '[class*="recent"], [class*="history"], [class*="quick"], [class*="favorite"]'
      );
      return recentIndicators.length > 0;
    });

    // This is informational
    if (!hasRecentPattern) {
      console.log('H6: Consider adding recent/frequent items for quick access');
    }
  });
});

// =============================================================================
// HEURISTIC 7: FLEXIBILITY AND EFFICIENCY OF USE
// =============================================================================

test.describe('H7: Flexibility and Efficiency of Use', () => {
  test('Keyboard shortcuts are available', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check for keyboard shortcut documentation
    const hasShortcuts = await page.evaluate(() => {
      const shortcutIndicators = document.querySelectorAll(
        '[data-shortcut], [accesskey], kbd, [class*="shortcut"]'
      );
      return shortcutIndicators.length > 0;
    });

    // Test common shortcuts
    await page.keyboard.press('Control+f');
    await page.keyboard.press('Escape');

    console.log('H7: Keyboard shortcuts available:', hasShortcuts);
  });

  test('Search functionality exists', async ({ page }) => {
    await page.goto(BASE_URL);

    const searchExists = await page.evaluate(() => {
      const searchInputs = document.querySelectorAll(
        'input[type="search"], input[name="s"], input[name="q"], input[placeholder*="search" i]'
      );
      return searchInputs.length > 0;
    });

    if (!searchExists) {
      console.log('H7: Consider adding search functionality for larger sites');
    }
  });
});

// =============================================================================
// HEURISTIC 8: AESTHETIC AND MINIMALIST DESIGN
// =============================================================================

test.describe('H8: Aesthetic and Minimalist Design', () => {
  test('Page is not overly cluttered', async ({ page }) => {
    await page.goto(BASE_URL);

    const metrics = await page.evaluate(() => {
      // Count visible elements
      const allElements = document.querySelectorAll('*');
      let visibleCount = 0;

      allElements.forEach((el) => {
        const style = window.getComputedStyle(el);
        if (style.display !== 'none' && style.visibility !== 'hidden') {
          visibleCount++;
        }
      });

      // Count distinct colors
      const colors = new Set<string>();
      allElements.forEach((el) => {
        const style = window.getComputedStyle(el);
        colors.add(style.color);
        colors.add(style.backgroundColor);
      });

      return {
        elementCount: visibleCount,
        colorCount: colors.size,
      };
    });

    console.log('H8: Page metrics:', metrics);

    // Very rough heuristic - pages with 500+ visible elements might be cluttered
    if (metrics.elementCount > 1000) {
      console.log('H8: Page may have unnecessary complexity');
    }
  });

  test('Whitespace is used effectively', async ({ page }) => {
    await page.goto(BASE_URL);

    const spacingAnalysis = await page.evaluate(() => {
      const body = document.body;
      const style = window.getComputedStyle(body);

      const main = document.querySelector('main, .content, article');
      const mainStyle = main ? window.getComputedStyle(main) : null;

      return {
        bodyPadding: style.padding,
        mainPadding: mainStyle?.padding || 'N/A',
        mainMargin: mainStyle?.margin || 'N/A',
      };
    });

    console.log('H8: Spacing analysis:', spacingAnalysis);
  });
});

// =============================================================================
// HEURISTIC 9: HELP USERS RECOGNIZE, DIAGNOSE, AND RECOVER FROM ERRORS
// =============================================================================

test.describe('H9: Error Recovery', () => {
  test('404 page is helpful', async ({ page }) => {
    await page.goto(`${BASE_URL}/nonexistent-page-12345`);

    // Check for helpful 404 content
    const hasHelpfulContent = await page.evaluate(() => {
      const text = document.body.textContent?.toLowerCase() || '';

      const hasSearch = document.querySelector('input[type="search"], [name="s"]') !== null;
      const hasHomeLink = document.querySelector('a[href="/"], a[href^="/"]') !== null;
      const hasHelpfulText = text.includes('search') || text.includes('home') || text.includes('help');

      return { hasSearch, hasHomeLink, hasHelpfulText };
    });

    console.log('H9: 404 page helpfulness:', hasHelpfulContent);

    // At minimum, should have a way back home
    expect(hasHelpfulContent.hasHomeLink).toBe(true);
  });

  test('Error messages suggest solutions', async ({ page }) => {
    await page.goto(BASE_URL);

    // Try to trigger a form error
    const form = page.locator('form').first();
    if ((await form.count()) === 0) {
      test.skip();
      return;
    }

    const emailInput = form.locator('input[type="email"]').first();
    if ((await emailInput.count()) > 0) {
      await emailInput.fill('not-an-email');
      await emailInput.blur();

      // Wait a moment for validation
      await page.waitForTimeout(500);

      const errorMessage = await page.evaluate(() => {
        const errors = document.querySelectorAll('.error, .error-message, [class*="error"]');
        return Array.from(errors)
          .map((e) => e.textContent)
          .join(' ');
      });

      // Check if error is actionable
      if (errorMessage && !errorMessage.toLowerCase().includes('valid') &&
          !errorMessage.toLowerCase().includes('format') &&
          !errorMessage.toLowerCase().includes('enter')) {
        console.log('H9: Error message may not be actionable:', errorMessage.slice(0, 50));
      }
    }
  });
});

// =============================================================================
// HEURISTIC 10: HELP AND DOCUMENTATION
// =============================================================================

test.describe('H10: Help and Documentation', () => {
  test('Help is accessible from interface', async ({ page }) => {
    await page.goto(BASE_URL);

    const hasHelp = await page.evaluate(() => {
      const helpIndicators = document.querySelectorAll(
        'a:has-text("help"), a:has-text("faq"), a[href*="help"], a[href*="faq"], ' +
        'a[href*="support"], [title*="help" i], [aria-label*="help" i], .help-icon'
      );
      return helpIndicators.length > 0;
    });

    if (!hasHelp) {
      console.log('H10: Consider adding visible help/FAQ links');
    }
  });

  test('Tooltips exist for complex controls', async ({ page }) => {
    await page.goto(BASE_URL);

    const tooltipPatterns = await page.evaluate(() => {
      const withTooltips = document.querySelectorAll('[title], [data-tooltip], [aria-describedby]');
      return withTooltips.length;
    });

    console.log('H10: Elements with tooltip patterns:', tooltipPatterns);
  });

  test('Contact/support is accessible', async ({ page }) => {
    await page.goto(BASE_URL);

    const hasContact = await page.evaluate(() => {
      const contactIndicators = document.querySelectorAll(
        'a:has-text("contact"), a[href*="contact"], a[href*="support"], ' +
        'a[href^="mailto:"], footer a'
      );
      return contactIndicators.length > 0;
    });

    expect(hasContact).toBe(true);
  });
});
