/**
 * Navigation & Flow Tests
 *
 * Tests for consistent navigation, task flow completion,
 * breadcrumbs, back/forward behavior, and deep linking.
 *
 * @package wp-dev-prompts
 */

import { test, expect, Page } from '@playwright/test';

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:8888';

// =============================================================================
// NAVIGATION CONSISTENCY TESTS
// =============================================================================

test.describe('Navigation Consistency', () => {
  test('Main navigation is consistent across pages', async ({ page }) => {
    // Visit homepage and capture nav structure
    await page.goto(BASE_URL);

    const getNavStructure = async () => {
      return page.evaluate(() => {
        const nav = document.querySelector('nav, [role="navigation"], .navigation, .main-nav, #main-nav');
        if (!nav) return null;

        const links = nav.querySelectorAll('a');
        return Array.from(links).map((a) => ({
          text: a.textContent?.trim(),
          href: a.getAttribute('href'),
        }));
      });
    };

    const homeNavStructure = await getNavStructure();

    if (!homeNavStructure || homeNavStructure.length === 0) {
      test.skip();
      return;
    }

    // Navigate to first internal link
    const firstLink = homeNavStructure.find((link) =>
      link.href && !link.href.startsWith('http') && link.href !== '/'
    );

    if (!firstLink?.href) {
      test.skip();
      return;
    }

    await page.goto(`${BASE_URL}${firstLink.href}`);
    const secondPageNav = await getNavStructure();

    // Compare navigation structures
    expect(secondPageNav).toEqual(homeNavStructure);
  });

  test('Current page is indicated in navigation', async ({ page }) => {
    await page.goto(BASE_URL);

    // Look for active/current state indicators
    const activeIndicators = await page.evaluate(() => {
      const nav = document.querySelector('nav, [role="navigation"]');
      if (!nav) return { hasActive: false, methods: [] };

      const methods: string[] = [];

      // Check for aria-current
      const ariaCurrent = nav.querySelector('[aria-current]');
      if (ariaCurrent) methods.push('aria-current');

      // Check for active class
      const activeClass = nav.querySelector('.active, .current, .is-active, .selected');
      if (activeClass) methods.push('active-class');

      // Check for visual distinction (bold, color)
      const links = nav.querySelectorAll('a');
      links.forEach((link) => {
        const styles = window.getComputedStyle(link);
        if (parseInt(styles.fontWeight) >= 600) {
          methods.push('bold-weight');
        }
      });

      return {
        hasActive: methods.length > 0,
        methods: [...new Set(methods)],
      };
    });

    // At minimum, there should be some current page indication
    // This is an informational check - doesn't fail but logs recommendation
    if (!activeIndicators.hasActive) {
      console.log('Recommendation: Add current page indication to navigation');
    }
  });

  test('Navigation labels are clear and jargon-free', async ({ page }) => {
    await page.goto(BASE_URL);

    const navLabels = await page.evaluate(() => {
      const nav = document.querySelector('nav, [role="navigation"]');
      if (!nav) return [];

      const links = nav.querySelectorAll('a');
      return Array.from(links)
        .map((a) => a.textContent?.trim())
        .filter(Boolean);
    });

    // Check for potentially unclear labels
    const jargonTerms = ['misc', 'n/a', 'tbd', 'etc', 'admin', 'config', 'params'];
    const unclearLabels = navLabels.filter((label) =>
      jargonTerms.some((term) => label?.toLowerCase().includes(term))
    );

    if (unclearLabels.length > 0) {
      console.log('Navigation labels that may need clarification:', unclearLabels);
    }

    // Labels should be reasonably short
    const longLabels = navLabels.filter((label) => label && label.length > 25);
    expect(longLabels.length).toBeLessThan(navLabels.length / 2);
  });
});

// =============================================================================
// BACK/FORWARD BEHAVIOR TESTS
// =============================================================================

test.describe('Back/Forward Behavior', () => {
  test('Back button returns to previous page', async ({ page }) => {
    await page.goto(BASE_URL);
    const initialUrl = page.url();

    // Find and click an internal link
    const internalLink = page.locator('a[href^="/"], a[href^="./"]').first();

    if ((await internalLink.count()) === 0) {
      test.skip();
      return;
    }

    await internalLink.click();
    await page.waitForLoadState('networkidle');

    const secondUrl = page.url();
    expect(secondUrl).not.toBe(initialUrl);

    // Go back
    await page.goBack();
    await page.waitForLoadState('networkidle');

    // Should be back at initial URL
    expect(page.url()).toBe(initialUrl);
  });

  test('Forward button works after going back', async ({ page }) => {
    await page.goto(BASE_URL);

    const internalLink = page.locator('a[href^="/"], a[href^="./"]').first();

    if ((await internalLink.count()) === 0) {
      test.skip();
      return;
    }

    await internalLink.click();
    await page.waitForLoadState('networkidle');
    const targetUrl = page.url();

    await page.goBack();
    await page.waitForLoadState('networkidle');

    await page.goForward();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toBe(targetUrl);
  });

  test('Deep links are shareable', async ({ page }) => {
    await page.goto(BASE_URL);

    // Navigate to a subpage
    const internalLink = page.locator('a[href^="/"], a[href^="./"]').first();

    if ((await internalLink.count()) === 0) {
      test.skip();
      return;
    }

    await internalLink.click();
    await page.waitForLoadState('networkidle');

    const deepUrl = page.url();

    // Open same URL in new context (simulates sharing)
    const newPage = await page.context().newPage();
    await newPage.goto(deepUrl);
    await newPage.waitForLoadState('networkidle');

    // Should show same content (basic check - URL matches)
    expect(newPage.url()).toBe(deepUrl);

    // Page should not redirect to home or show error
    const pageTitle = await newPage.title();
    expect(pageTitle).not.toContain('404');
    expect(pageTitle).not.toContain('Error');

    await newPage.close();
  });
});

// =============================================================================
// BREADCRUMB TESTS
// =============================================================================

test.describe('Breadcrumbs', () => {
  test('Breadcrumbs are present on nested pages', async ({ page }) => {
    // Navigate to a nested page
    await page.goto(BASE_URL);

    const nestedLink = page.locator('a[href*="/"][href*="/"]').first();

    if ((await nestedLink.count()) === 0) {
      // Try going two levels deep manually
      const firstLink = page.locator('a[href^="/"]').first();
      if ((await firstLink.count()) === 0) {
        test.skip();
        return;
      }

      await firstLink.click();
      await page.waitForLoadState('networkidle');

      const secondLink = page.locator('a[href^="/"]').first();
      if ((await secondLink.count()) > 0) {
        await secondLink.click();
        await page.waitForLoadState('networkidle');
      }
    } else {
      await nestedLink.click();
      await page.waitForLoadState('networkidle');
    }

    // Check for breadcrumbs
    const breadcrumbs = page.locator(
      'nav[aria-label*="breadcrumb"], .breadcrumb, .breadcrumbs, [class*="breadcrumb"]'
    );

    const hasBreadcrumbs = (await breadcrumbs.count()) > 0;

    if (!hasBreadcrumbs) {
      console.log('Recommendation: Add breadcrumbs for nested navigation paths');
    }
  });

  test('Breadcrumb links work correctly', async ({ page }) => {
    await page.goto(BASE_URL);

    const breadcrumbs = page.locator(
      'nav[aria-label*="breadcrumb"] a, .breadcrumb a, .breadcrumbs a'
    );

    if ((await breadcrumbs.count()) === 0) {
      test.skip();
      return;
    }

    // Test each breadcrumb link
    const count = await breadcrumbs.count();
    for (let i = 0; i < count - 1; i++) {
      // Last item should not be a link
      const link = breadcrumbs.nth(i);
      const href = await link.getAttribute('href');

      if (href) {
        // Verify link is clickable and leads somewhere
        const isClickable = await link.isEnabled();
        expect(isClickable).toBe(true);
      }
    }
  });

  test('Current page is not a link in breadcrumbs', async ({ page }) => {
    await page.goto(BASE_URL);

    const breadcrumbContainer = page.locator(
      'nav[aria-label*="breadcrumb"], .breadcrumb, .breadcrumbs'
    ).first();

    if ((await breadcrumbContainer.count()) === 0) {
      test.skip();
      return;
    }

    const lastItem = breadcrumbContainer.locator('li:last-child, span:last-child').first();

    if ((await lastItem.count()) === 0) {
      test.skip();
      return;
    }

    // Last item should not be a clickable link
    const isLink = await lastItem.evaluate((el) => {
      const link = el.querySelector('a');
      if (!link) return false;
      return link.getAttribute('href') !== null && link.getAttribute('href') !== '#';
    });

    expect(isLink).toBe(false);
  });
});

// =============================================================================
// TASK FLOW TESTS
// =============================================================================

test.describe('Task Flow Completion', () => {
  test('Search flow can be completed', async ({ page }) => {
    await page.goto(BASE_URL);

    // Find search functionality
    const searchInput = page.locator(
      'input[type="search"], input[name="s"], input[name="search"], [role="searchbox"]'
    ).first();

    if ((await searchInput.count()) === 0) {
      test.skip();
      return;
    }

    // Enter search query
    await searchInput.fill('test query');
    await searchInput.press('Enter');

    // Wait for results
    await page.waitForLoadState('networkidle');

    // Check that search was processed (URL or results visible)
    const hasSearchInUrl = page.url().includes('search') || page.url().includes('s=');
    const hasResults = (await page.locator('.search-results, [class*="result"]').count()) > 0;
    const hasNoResultsMessage = (await page.locator(':text("no results"), :text("not found")').count()) > 0;

    expect(hasSearchInUrl || hasResults || hasNoResultsMessage).toBe(true);
  });

  test('Multi-step forms show progress', async ({ page }) => {
    await page.goto(BASE_URL);

    // Look for multi-step forms
    const stepIndicators = page.locator(
      '.step-indicator, .progress-steps, [class*="wizard"], [class*="stepper"]'
    );

    if ((await stepIndicators.count()) === 0) {
      // No multi-step forms detected - this is fine
      test.skip();
      return;
    }

    // Check for progress indication
    const hasStepNumbers = (await page.locator(':text("Step"), :text("step")').count()) > 0;
    const hasProgressBar = (await page.locator('[role="progressbar"], progress').count()) > 0;
    const hasStepList = (await page.locator('ol li, .steps li').count()) > 1;

    expect(hasStepNumbers || hasProgressBar || hasStepList).toBe(true);
  });

  test('Forms preserve data on back navigation', async ({ page }) => {
    await page.goto(BASE_URL);

    // Find a form with multiple fields
    const form = page.locator('form').first();

    if ((await form.count()) === 0) {
      test.skip();
      return;
    }

    const textInput = form.locator('input[type="text"], textarea').first();

    if ((await textInput.count()) === 0) {
      test.skip();
      return;
    }

    // Fill in the form
    const testValue = 'Test preservation value';
    await textInput.fill(testValue);

    // Navigate away
    const link = page.locator('a[href^="/"]').first();
    if ((await link.count()) === 0) {
      test.skip();
      return;
    }

    await link.click();
    await page.waitForLoadState('networkidle');

    // Go back
    await page.goBack();
    await page.waitForLoadState('networkidle');

    // Check if value is preserved (browser feature, but good to verify)
    const preservedValue = await textInput.inputValue();

    // Log recommendation if not preserved
    if (preservedValue !== testValue) {
      console.log('Consider: Add form state preservation for better UX');
    }
  });
});

// =============================================================================
// SKIP LINKS & ACCESSIBILITY NAVIGATION
// =============================================================================

test.describe('Accessibility Navigation', () => {
  test('Skip link is present and functional', async ({ page }) => {
    await page.goto(BASE_URL);

    // Focus on first element to trigger skip link visibility
    await page.keyboard.press('Tab');

    // Look for skip link
    const skipLink = page.locator(
      'a[href="#main"], a[href="#content"], a:has-text("skip"), [class*="skip"]'
    ).first();

    if ((await skipLink.count()) === 0) {
      console.log('Recommendation: Add a skip-to-content link for keyboard users');
      return;
    }

    // Check if skip link is visible when focused
    await skipLink.focus();
    const isVisible = await skipLink.isVisible();

    expect(isVisible).toBe(true);

    // Verify the target exists
    const href = await skipLink.getAttribute('href');
    if (href?.startsWith('#')) {
      const target = page.locator(href);
      expect(await target.count()).toBeGreaterThan(0);
    }
  });

  test('Page has landmark regions', async ({ page }) => {
    await page.goto(BASE_URL);

    const landmarks = await page.evaluate(() => {
      return {
        header: document.querySelectorAll('header, [role="banner"]').length,
        nav: document.querySelectorAll('nav, [role="navigation"]').length,
        main: document.querySelectorAll('main, [role="main"]').length,
        footer: document.querySelectorAll('footer, [role="contentinfo"]').length,
      };
    });

    // Should have at least main and one navigation
    expect(landmarks.main).toBeGreaterThanOrEqual(1);

    if (landmarks.nav === 0) {
      console.log('Recommendation: Add navigation landmark');
    }
  });
});
