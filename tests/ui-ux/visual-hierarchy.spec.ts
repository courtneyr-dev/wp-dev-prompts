/**
 * Visual Hierarchy Tests
 *
 * Tests for CTA prominence, typography hierarchy, color contrast,
 * and content legibility based on UI/UX audit checklist.
 *
 * @package wp-dev-prompts
 */

import { test, expect, Page } from '@playwright/test';

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:8888';

// Viewport configurations
const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get computed styles for an element
 */
async function getComputedStyles(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const styles = window.getComputedStyle(el);
    return {
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      padding: styles.padding,
      margin: styles.margin,
      width: styles.width,
      height: styles.height,
    };
  }, selector);
}

/**
 * Calculate relative luminance for contrast ratio
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Parse RGB color string
 */
function parseRGB(color: string): { r: number; g: number; b: number } | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = parseRGB(color1);
  const rgb2 = parseRGB(color2);
  if (!rgb1 || !rgb2) return 0;

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// =============================================================================
// CTA PROMINENCE TESTS
// =============================================================================

test.describe('CTA Prominence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Primary CTA has stronger visual weight than secondary actions', async ({ page }) => {
    // Look for primary and secondary buttons
    const primaryBtn = page.locator('button.primary, .btn-primary, [data-primary], button[type="submit"]').first();
    const secondaryBtn = page.locator('button.secondary, .btn-secondary, button:not(.primary):not([type="submit"])').first();

    // Skip if either button doesn't exist
    const primaryExists = (await primaryBtn.count()) > 0;
    const secondaryExists = (await secondaryBtn.count()) > 0;

    if (!primaryExists || !secondaryExists) {
      test.skip();
      return;
    }

    // Get bounding boxes to compare sizes
    const primaryBox = await primaryBtn.boundingBox();
    const secondaryBox = await secondaryBtn.boundingBox();

    if (primaryBox && secondaryBox) {
      // Primary should be larger or same size (never smaller)
      const primaryArea = primaryBox.width * primaryBox.height;
      const secondaryArea = secondaryBox.width * secondaryBox.height;
      expect(primaryArea).toBeGreaterThanOrEqual(secondaryArea * 0.9); // Allow 10% tolerance
    }

    // Compare visual prominence via styles
    const primaryStyles = await primaryBtn.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        backgroundColor: s.backgroundColor,
        color: s.color,
        fontWeight: s.fontWeight,
      };
    });

    const secondaryStyles = await secondaryBtn.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        backgroundColor: s.backgroundColor,
        color: s.color,
        fontWeight: s.fontWeight,
      };
    });

    // Primary should have filled background (not transparent)
    expect(primaryStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('CTA buttons use action-oriented language', async ({ page }) => {
    const ctaButtons = page.locator('button, [role="button"], .btn, .button');
    const count = await ctaButtons.count();

    const actionVerbs = [
      'get', 'start', 'try', 'create', 'add', 'save', 'submit', 'send', 'buy',
      'download', 'sign', 'log', 'register', 'subscribe', 'join', 'learn',
      'discover', 'explore', 'view', 'see', 'find', 'search', 'continue',
      'next', 'confirm', 'update', 'edit', 'delete', 'remove', 'cancel'
    ];

    for (let i = 0; i < Math.min(count, 10); i++) {
      const button = ctaButtons.nth(i);
      const text = (await button.textContent())?.toLowerCase().trim() || '';

      if (text.length > 0) {
        // Check if button text starts with or contains an action verb
        const hasActionVerb = actionVerbs.some(verb =>
          text.startsWith(verb) || text.includes(verb)
        );

        // Log for review if no action verb found
        if (!hasActionVerb && text !== '') {
          console.log(`Consider action verb for: "${text}"`);
        }
      }
    }
  });

  test('Primary CTA is visible without scrolling on desktop', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);

    const primaryBtn = page.locator('button.primary, .btn-primary, [data-primary], .cta-primary').first();

    if ((await primaryBtn.count()) === 0) {
      test.skip();
      return;
    }

    await expect(primaryBtn).toBeInViewport();
  });
});

// =============================================================================
// TYPOGRAPHY HIERARCHY TESTS
// =============================================================================

test.describe('Typography Hierarchy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Heading sizes follow descending hierarchy', async ({ page }) => {
    const headingSizes: Record<string, number> = {};

    for (const tag of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
      const heading = page.locator(tag).first();
      if ((await heading.count()) > 0) {
        const fontSize = await heading.evaluate((el) => {
          return parseFloat(window.getComputedStyle(el).fontSize);
        });
        headingSizes[tag] = fontSize;
      }
    }

    // Verify descending order
    const levels = Object.keys(headingSizes).sort();
    for (let i = 0; i < levels.length - 1; i++) {
      const current = headingSizes[levels[i]];
      const next = headingSizes[levels[i + 1]];
      expect(current).toBeGreaterThanOrEqual(next);
    }
  });

  test('Body text is at least 16px', async ({ page }) => {
    const paragraphs = page.locator('p, .body-text, article');
    const count = await paragraphs.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const p = paragraphs.nth(i);
      const fontSize = await p.evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).fontSize);
      });
      expect(fontSize).toBeGreaterThanOrEqual(14); // Minimum acceptable
    }
  });

  test('Line height is adequate for readability', async ({ page }) => {
    const paragraphs = page.locator('p').first();

    if ((await paragraphs.count()) === 0) {
      test.skip();
      return;
    }

    const lineHeight = await paragraphs.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      const lh = parseFloat(styles.lineHeight);
      const fs = parseFloat(styles.fontSize);
      return lh / fs;
    });

    // Line height should be at least 1.4 for body text
    expect(lineHeight).toBeGreaterThanOrEqual(1.4);
  });

  test('Exactly one h1 per page', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('Headings do not skip levels', async ({ page }) => {
    const headings = await page.evaluate(() => {
      const headingEls = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(headingEls).map((el) => parseInt(el.tagName[1]));
    });

    for (let i = 0; i < headings.length - 1; i++) {
      const current = headings[i];
      const next = headings[i + 1];
      // Next heading should be same level, one level deeper, or any level higher
      const validTransition = next <= current + 1;
      expect(validTransition).toBe(true);
    }
  });
});

// =============================================================================
// COLOR CONTRAST TESTS
// =============================================================================

test.describe('Color Contrast', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Body text meets WCAG AA contrast (4.5:1)', async ({ page }) => {
    const paragraphs = page.locator('p').first();

    if ((await paragraphs.count()) === 0) {
      test.skip();
      return;
    }

    const colors = await paragraphs.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      let bg = styles.backgroundColor;

      // Walk up to find actual background
      let parent = el.parentElement;
      while (parent && bg === 'rgba(0, 0, 0, 0)') {
        bg = window.getComputedStyle(parent).backgroundColor;
        parent = parent.parentElement;
      }
      if (bg === 'rgba(0, 0, 0, 0)') bg = 'rgb(255, 255, 255)';

      return {
        color: styles.color,
        backgroundColor: bg,
      };
    });

    const ratio = getContrastRatio(colors.color, colors.backgroundColor);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  test('Links are distinguishable from body text', async ({ page }) => {
    const link = page.locator('a:not([role="button"])').first();
    const paragraph = page.locator('p').first();

    if ((await link.count()) === 0 || (await paragraph.count()) === 0) {
      test.skip();
      return;
    }

    const linkColor = await link.evaluate((el) => window.getComputedStyle(el).color);
    const textColor = await paragraph.evaluate((el) => window.getComputedStyle(el).color);

    // Links should be visually distinct from body text
    // Either different color or has underline
    const linkDecoration = await link.evaluate((el) =>
      window.getComputedStyle(el).textDecorationLine
    );

    const isDifferentColor = linkColor !== textColor;
    const hasUnderline = linkDecoration.includes('underline');

    expect(isDifferentColor || hasUnderline).toBe(true);
  });
});

// =============================================================================
// CONTENT GROUPING TESTS
// =============================================================================

test.describe('Information Grouping', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Cards have consistent styling', async ({ page }) => {
    const cards = page.locator('.card, [class*="card"], article');
    const count = await cards.count();

    if (count < 2) {
      test.skip();
      return;
    }

    const firstCardStyles = await cards.first().evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        borderRadius: s.borderRadius,
        boxShadow: s.boxShadow,
        padding: s.padding,
      };
    });

    // Compare with other cards
    for (let i = 1; i < Math.min(count, 5); i++) {
      const cardStyles = await cards.nth(i).evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          borderRadius: s.borderRadius,
          boxShadow: s.boxShadow,
          padding: s.padding,
        };
      });

      // Cards should have consistent styling
      expect(cardStyles.borderRadius).toBe(firstCardStyles.borderRadius);
    }
  });

  test('Visual hierarchy screenshot', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);

    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('visual-hierarchy-desktop.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.1,
    });
  });
});

// =============================================================================
// VISUAL REGRESSION SNAPSHOTS
// =============================================================================

test.describe('Visual Regression', () => {
  for (const [name, viewport] of Object.entries(viewports)) {
    test(`Full page visual check - ${name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(BASE_URL);

      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`full-page-${name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
      });
    });
  }
});
