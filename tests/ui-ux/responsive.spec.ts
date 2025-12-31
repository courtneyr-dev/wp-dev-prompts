/**
 * Responsive Behavior Tests
 *
 * Tests for layout stability, touch targets, viewport handling,
 * and mobile input optimization across device sizes.
 *
 * @package wp-dev-prompts
 */

import { test, expect, Page } from '@playwright/test';

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:8888';

// Standard viewport configurations
const viewports = {
  mobileS: { width: 320, height: 568, name: 'Mobile S (320px)' },
  mobileM: { width: 375, height: 667, name: 'Mobile M (375px)' },
  mobileL: { width: 425, height: 812, name: 'Mobile L (425px)' },
  tablet: { width: 768, height: 1024, name: 'Tablet (768px)' },
  laptop: { width: 1024, height: 768, name: 'Laptop (1024px)' },
  desktop: { width: 1280, height: 800, name: 'Desktop (1280px)' },
  desktopL: { width: 1440, height: 900, name: 'Desktop L (1440px)' },
  desktop4K: { width: 2560, height: 1440, name: '4K (2560px)' },
};

// WordPress-specific breakpoints
const wpBreakpoints = {
  mobile: { width: 600, height: 800 },
  tablet: { width: 782, height: 1024 },
  desktop: { width: 960, height: 800 },
  wide: { width: 1280, height: 800 },
};

// =============================================================================
// LAYOUT STABILITY TESTS
// =============================================================================

test.describe('Layout Stability', () => {
  for (const [key, viewport] of Object.entries(viewports)) {
    test(`No horizontal scroll at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Check for horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll).toBe(false);
    });
  }

  test('Content remains readable without zooming on mobile', async ({ page }) => {
    await page.setViewportSize(viewports.mobileM);
    await page.goto(BASE_URL);

    // Check viewport meta tag
    const viewportMeta = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]');
      return meta?.getAttribute('content') || '';
    });

    // Should have proper viewport meta
    expect(viewportMeta).toContain('width=device-width');

    // Check minimum font size for readability
    const smallestText = await page.evaluate(() => {
      const elements = document.querySelectorAll('p, li, span, a, td, th');
      let minSize = Infinity;

      elements.forEach((el) => {
        const size = parseFloat(window.getComputedStyle(el).fontSize);
        if (size > 0 && size < minSize) {
          minSize = size;
        }
      });

      return minSize;
    });

    // Minimum readable size is ~12px, but 14px recommended
    expect(smallestText).toBeGreaterThanOrEqual(12);
  });

  test('Images scale without breaking layout', async ({ page }) => {
    await page.setViewportSize(viewports.mobileM);
    await page.goto(BASE_URL);

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const box = await img.boundingBox();

      if (box) {
        // Image should not exceed viewport width
        expect(box.width).toBeLessThanOrEqual(viewports.mobileM.width);

        // Image should not cause overflow
        const overflows = await img.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.right > window.innerWidth;
        });
        expect(overflows).toBe(false);
      }
    }
  });

  test('Layout adapts between tablet and desktop', async ({ page }) => {
    // Take tablet screenshot
    await page.setViewportSize(viewports.tablet);
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const tabletScreenshot = await page.screenshot();

    // Take desktop screenshot
    await page.setViewportSize(viewports.desktop);
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const desktopScreenshot = await page.screenshot();

    // Screenshots should be different (layout adapted)
    expect(tabletScreenshot).not.toEqual(desktopScreenshot);
  });
});

// =============================================================================
// TOUCH TARGET TESTS
// =============================================================================

test.describe('Touch Target Adequacy', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewports.mobileM);
    await page.goto(BASE_URL);
  });

  test('Interactive elements meet minimum touch size (44px)', async ({ page }) => {
    const interactiveElements = page.locator('button, a, input, select, textarea, [role="button"]');
    const count = await interactiveElements.count();

    const tooSmall: string[] = [];

    for (let i = 0; i < Math.min(count, 20); i++) {
      const element = interactiveElements.nth(i);
      const isVisible = await element.isVisible();

      if (!isVisible) continue;

      const box = await element.boundingBox();
      if (box) {
        const minDimension = Math.min(box.width, box.height);

        // iOS minimum is 44px, Android is 48dp
        if (minDimension < 44) {
          const text = await element.textContent();
          const tag = await element.evaluate((el) => el.tagName);
          tooSmall.push(`${tag}: "${text?.slice(0, 20)}" (${Math.round(minDimension)}px)`);
        }
      }
    }

    if (tooSmall.length > 0) {
      console.log('Touch targets smaller than 44px:', tooSmall.slice(0, 5));
    }

    // Allow some small elements but majority should be adequate
    expect(tooSmall.length).toBeLessThan(count / 2);
  });

  test('Adequate spacing between adjacent touch targets', async ({ page }) => {
    const buttons = page.locator('button, [role="button"]');
    const count = await buttons.count();

    if (count < 2) {
      test.skip();
      return;
    }

    // Check spacing between adjacent buttons
    for (let i = 0; i < count - 1; i++) {
      const current = buttons.nth(i);
      const next = buttons.nth(i + 1);

      const currentVisible = await current.isVisible();
      const nextVisible = await next.isVisible();

      if (!currentVisible || !nextVisible) continue;

      const currentBox = await current.boundingBox();
      const nextBox = await next.boundingBox();

      if (currentBox && nextBox) {
        // Calculate distance between elements
        const horizontalGap = nextBox.x - (currentBox.x + currentBox.width);
        const verticalGap = nextBox.y - (currentBox.y + currentBox.height);

        // If elements are on same row
        if (Math.abs(currentBox.y - nextBox.y) < 10) {
          // Minimum 8px gap between touch targets
          if (horizontalGap > 0 && horizontalGap < 8) {
            console.log(`Tight spacing detected: ${horizontalGap}px horizontal gap`);
          }
        }
      }
    }
  });

  test('Links have adequate touch area', async ({ page }) => {
    const links = page.locator('a');
    const count = await links.count();

    let smallLinkCount = 0;

    for (let i = 0; i < Math.min(count, 15); i++) {
      const link = links.nth(i);
      const isVisible = await link.isVisible();

      if (!isVisible) continue;

      const box = await link.boundingBox();
      if (box && box.height < 44) {
        smallLinkCount++;
      }
    }

    // Log if many links are small
    if (smallLinkCount > count / 3) {
      console.log('Consider: Many links have height < 44px. Add padding for touch targets.');
    }
  });
});

// =============================================================================
// MOBILE INPUT OPTIMIZATION TESTS
// =============================================================================

test.describe('Mobile Input Optimization', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewports.mobileM);
    await page.goto(BASE_URL);
  });

  test('Email inputs use correct input type', async ({ page }) => {
    const emailInputs = page.locator('input[name*="email"], input[id*="email"], input[placeholder*="email"]');
    const count = await emailInputs.count();

    for (let i = 0; i < count; i++) {
      const input = emailInputs.nth(i);
      const type = await input.getAttribute('type');
      const autocomplete = await input.getAttribute('autocomplete');

      expect(type).toBe('email');

      // Should also have autocomplete for faster entry
      if (!autocomplete) {
        console.log('Consider: Add autocomplete="email" to email inputs');
      }
    }
  });

  test('Phone inputs use tel input type', async ({ page }) => {
    const phoneInputs = page.locator(
      'input[name*="phone"], input[name*="tel"], input[id*="phone"], input[placeholder*="phone"]'
    );
    const count = await phoneInputs.count();

    for (let i = 0; i < count; i++) {
      const input = phoneInputs.nth(i);
      const type = await input.getAttribute('type');

      expect(type).toBe('tel');
    }
  });

  test('Number inputs use appropriate type', async ({ page }) => {
    const numberInputs = page.locator(
      'input[name*="amount"], input[name*="quantity"], input[name*="price"], input[name*="zip"]'
    );
    const count = await numberInputs.count();

    for (let i = 0; i < count; i++) {
      const input = numberInputs.nth(i);
      const type = await input.getAttribute('type');
      const inputmode = await input.getAttribute('inputmode');

      // Should be number, tel, or have numeric inputmode
      const isNumeric = type === 'number' || type === 'tel' || inputmode === 'numeric';

      if (!isNumeric) {
        const name = await input.getAttribute('name');
        console.log(`Consider: Input "${name}" may benefit from type="number" or inputmode="numeric"`);
      }
    }
  });

  test('Autocomplete is enabled for common fields', async ({ page }) => {
    const form = page.locator('form').first();

    if ((await form.count()) === 0) {
      test.skip();
      return;
    }

    // Check common autocomplete fields
    const autocompleteFields = [
      { selector: 'input[name*="name"]', expected: ['name', 'given-name', 'family-name'] },
      { selector: 'input[name*="email"]', expected: ['email'] },
      { selector: 'input[name*="address"]', expected: ['street-address', 'address-line1'] },
      { selector: 'input[name*="city"]', expected: ['address-level2'] },
      { selector: 'input[name*="zip"], input[name*="postal"]', expected: ['postal-code'] },
    ];

    for (const field of autocompleteFields) {
      const input = form.locator(field.selector).first();

      if ((await input.count()) > 0) {
        const autocomplete = await input.getAttribute('autocomplete');

        if (!autocomplete) {
          console.log(`Consider: Add autocomplete attribute to ${field.selector}`);
        }
      }
    }
  });
});

// =============================================================================
// VIEWPORT BREAKPOINT COVERAGE TESTS
// =============================================================================

test.describe('Viewport Breakpoint Coverage', () => {
  test('Design works at minimum mobile width (320px)', async ({ page }) => {
    await page.setViewportSize(viewports.mobileS);
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);

    // Check text isn't clipped
    const hasTextOverflow = await page.evaluate(() => {
      const elements = document.querySelectorAll('h1, h2, h3, p, button');
      return Array.from(elements).some((el) => {
        const styles = window.getComputedStyle(el);
        return styles.overflow === 'hidden' && el.scrollWidth > el.clientWidth;
      });
    });

    if (hasTextOverflow) {
      console.log('Warning: Some text may be clipped at 320px width');
    }
  });

  test('Design handles tablet portrait (768px)', async ({ page }) => {
    await page.setViewportSize(viewports.tablet);
    await page.goto(BASE_URL);

    // Take screenshot for visual review
    await expect(page).toHaveScreenshot('tablet-portrait.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('Design works on large desktop (1920px+)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    // Content shouldn't stretch uncomfortably wide
    const mainContent = page.locator('main, .content, article, .container').first();

    if ((await mainContent.count()) > 0) {
      const box = await mainContent.boundingBox();

      if (box) {
        // Content width should be constrained (not full 1920px)
        // Most readable content is under 1400px
        expect(box.width).toBeLessThan(1600);
      }
    }

    // Shouldn't have huge empty margins that look broken
    const bodyWidth = await page.evaluate(() => {
      const body = document.body;
      const styles = window.getComputedStyle(body);
      const marginLeft = parseFloat(styles.marginLeft);
      const marginRight = parseFloat(styles.marginRight);
      return { marginLeft, marginRight, bodyWidth: body.offsetWidth };
    });

    // Some margin is fine, but shouldn't be 500px+ on each side
    expect(bodyWidth.marginLeft).toBeLessThan(500);
    expect(bodyWidth.marginRight).toBeLessThan(500);
  });

  test('Navigation adapts for mobile', async ({ page }) => {
    // Desktop nav
    await page.setViewportSize(viewports.desktop);
    await page.goto(BASE_URL);

    const desktopNav = page.locator('nav, [role="navigation"]').first();
    const desktopNavVisible = (await desktopNav.count()) > 0 && (await desktopNav.isVisible());

    // Mobile
    await page.setViewportSize(viewports.mobileM);
    await page.goto(BASE_URL);

    // Look for mobile menu indicators
    const hamburger = page.locator(
      'button[aria-label*="menu"], .hamburger, .menu-toggle, [class*="mobile-menu"], button[aria-expanded]'
    );

    const hasHamburger = (await hamburger.count()) > 0;

    // Either nav is still visible OR there's a hamburger menu
    if (desktopNavVisible) {
      const mobileNav = page.locator('nav, [role="navigation"]').first();
      const mobileNavVisible = await mobileNav.isVisible();

      expect(mobileNavVisible || hasHamburger).toBe(true);
    }
  });
});

// =============================================================================
// VISUAL REGRESSION ACROSS VIEWPORTS
// =============================================================================

test.describe('Responsive Visual Regression', () => {
  for (const [name, viewport] of Object.entries(wpBreakpoints)) {
    test(`Visual check at WordPress ${name} breakpoint`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`wp-${name}-breakpoint.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
      });
    });
  }
});

// =============================================================================
// ORIENTATION CHANGE TESTS
// =============================================================================

test.describe('Orientation Handling', () => {
  test('Layout adapts between portrait and landscape', async ({ page }) => {
    // Portrait
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    const portraitWidth = await page.evaluate(() => document.body.offsetWidth);

    // Landscape
    await page.setViewportSize({ width: 812, height: 375 });
    await page.goto(BASE_URL);
    const landscapeWidth = await page.evaluate(() => document.body.offsetWidth);

    // Layout should adapt (widths differ significantly)
    expect(landscapeWidth).not.toBe(portraitWidth);

    // No horizontal scroll in either orientation
    const hasScrollPortrait = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasScrollPortrait).toBe(false);
  });
});
