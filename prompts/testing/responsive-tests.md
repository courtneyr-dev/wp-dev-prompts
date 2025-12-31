# Responsive Design Test Prompt

> **Type**: Extended
> **Platforms**: Claude Code, Cursor, Cline
> **References**: `tests/ui-ux/responsive.spec.ts`

<prompt>
<role>
You are a frontend engineer specializing in responsive design, mobile-first development, and cross-device testing. You ensure interfaces work beautifully from 320px phones to 4K monitors.
</role>

<context>
I need to create or review responsive design tests for [TARGET]. The tests should verify that layouts adapt correctly, touch targets are adequate, and content remains accessible across all viewport sizes.

Reference the breakpoints and patterns in `tests/ui-ux/responsive.spec.ts`.
</context>

<task>
Create a responsive test plan covering:

## 1. Viewport Coverage
Test at these critical breakpoints:
- **320px**: Small phones (iPhone SE)
- **375px**: Standard phones (iPhone 12/13/14)
- **414px**: Large phones (iPhone Plus/Max)
- **600px**: WordPress small breakpoint
- **768px**: Tablets portrait
- **782px**: WordPress admin breakpoint
- **960px**: WordPress large breakpoint
- **1024px**: Tablets landscape / small laptops
- **1280px**: WordPress wide breakpoint / standard desktops
- **1440px**: Large desktops
- **1920px**: Full HD monitors
- **2560px**: 4K and ultrawide

## 2. Layout Stability
- No horizontal scroll at any viewport
- Content doesn't overflow containers
- Images scale proportionally
- Flexbox/Grid items wrap correctly
- No layout shifts during resize

## 3. Touch Target Adequacy
- Minimum 44x44px touch targets
- Adequate spacing between targets (8px+)
- Hover-only interactions have touch alternatives
- Links have sufficient padding

## 4. Typography Scaling
- Text remains readable at all sizes
- Line lengths stay within 45-75 characters
- Font sizes adjust appropriately
- Headings maintain hierarchy

## 5. Mobile Optimization
- Input types appropriate for content
- Autocomplete attributes present
- Keyboard doesn't obscure inputs
- Pinch-zoom not disabled
- Meta viewport configured correctly

## 6. Image Handling
- srcset/sizes for responsive images
- Art direction with picture element
- Lazy loading for below-fold images
- Aspect ratios maintained
</task>

<constraints>
- Test at exact pixel widths, not ranges
- Include both portrait and landscape orientations
- Test with touch simulation on desktop
- Verify with slow network conditions
- Consider notched/dynamic island devices
- Test content-heavy pages, not just homepage
</constraints>

<output_format>
## Responsive Test Plan for [TARGET]

### Breakpoint Matrix

| Breakpoint | Width | Primary Test Focus |
|------------|-------|-------------------|
| Mobile S | 320px | Minimum viable layout |
| Mobile M | 375px | Standard phone experience |
| Mobile L | 414px | Large phone optimization |
| Tablet | 768px | Layout transition |
| Desktop | 1280px | Full desktop experience |
| Wide | 1920px | Content max-width handling |

### Test Suites

#### 1. Layout Stability Tests
```typescript
test.describe('Layout Stability', () => {
  const viewports = [
    { name: 'mobileS', width: 320, height: 568 },
    { name: 'mobileM', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 },
  ];

  for (const vp of viewports) {
    test(`No horizontal overflow at ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasOverflow).toBe(false);
    });
  }
});
```

#### 2. Touch Target Tests
```typescript
test.describe('Touch Targets', () => {
  test('[TEST_ID] [Test description]', async ({ page }) => {
    // Implementation
  });
});
```

#### 3. Typography Tests
```typescript
// Implementation
```

#### 4. Image Responsive Tests
```typescript
// Implementation
```

#### 5. Mobile Input Tests
```typescript
// Implementation
```

### Visual Regression Snapshots
- [ ] Homepage at all breakpoints
- [ ] Key pages at mobile and desktop
- [ ] Navigation states at each breakpoint
- [ ] Form layouts at mobile

### Manual Testing Checklist
- [ ] Orientation change handling
- [ ] Pinch-zoom functionality
- [ ] Virtual keyboard interaction
- [ ] Device-specific issues (notch, etc.)
</output_format>
</prompt>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `[TARGET]` | Site, page, or component to test | `homepage`, `product grid`, `checkout form` |

## Expected Output

- Complete Playwright test suite
- Breakpoint coverage matrix
- Visual regression snapshot list
- Manual testing checklist

## Usage Examples

### E-commerce Product Grid
```
Create responsive tests for a product grid ensuring:
- 1 column on mobile (< 600px)
- 2 columns on tablet (600-1024px)
- 3-4 columns on desktop (> 1024px)
- Product cards maintain aspect ratio
- "Add to cart" buttons meet touch target requirements
```

### WordPress Block Editor Content
```
Create responsive tests for Gutenberg block content including:
- Column blocks that stack on mobile
- Cover blocks with responsive background images
- Media & Text blocks with proper stacking order
- Gallery blocks with appropriate grid adjustments
```

### Form Layout
```
Create responsive tests for a multi-field form ensuring:
- Full-width inputs on mobile
- Side-by-side fields on desktop where appropriate
- Labels remain visible when keyboard opens
- Submit button is always reachable
```

## Test Patterns

### Testing Touch Target Size
```typescript
test('All interactive elements meet 44px minimum', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  const interactiveElements = await page.locator('a, button, input, select, textarea, [role="button"]').all();

  for (const element of interactiveElements) {
    const box = await element.boundingBox();
    if (box) {
      const meetsMinimum = box.width >= 44 && box.height >= 44;
      if (!meetsMinimum) {
        const text = await element.textContent();
        console.warn(`Small touch target: "${text?.slice(0, 30)}" is ${box.width}x${box.height}px`);
      }
      expect(meetsMinimum, `Element should be at least 44x44px`).toBe(true);
    }
  }
});
```

### Testing Line Length
```typescript
test('Body text line length is within readable range', async ({ page }) => {
  const viewports = [
    { width: 1280, height: 800 },
    { width: 1920, height: 1080 },
  ];

  for (const vp of viewports) {
    await page.setViewportSize(vp);
    await page.goto('/blog/sample-post');

    const lineLength = await page.evaluate(() => {
      const paragraph = document.querySelector('article p');
      if (!paragraph) return 0;

      const style = window.getComputedStyle(paragraph);
      const width = paragraph.clientWidth;
      const fontSize = parseFloat(style.fontSize);

      // Approximate characters per line
      return Math.round(width / (fontSize * 0.5));
    });

    expect(lineLength).toBeGreaterThanOrEqual(45);
    expect(lineLength).toBeLessThanOrEqual(75);
  }
});
```

### Testing Image srcset
```typescript
test('Images have responsive srcset', async ({ page }) => {
  await page.goto('/');

  const images = await page.locator('img:not([src^="data:"])').all();

  for (const img of images) {
    const srcset = await img.getAttribute('srcset');
    const sizes = await img.getAttribute('sizes');
    const isDecorativeOrIcon = await img.evaluate((el) => {
      const width = el.naturalWidth;
      return width < 100 || el.getAttribute('role') === 'presentation';
    });

    if (!isDecorativeOrIcon) {
      expect(srcset, 'Large images should have srcset').toBeTruthy();
      expect(sizes, 'Images with srcset should have sizes').toBeTruthy();
    }
  }
});
```

## WordPress-Specific Breakpoints

```typescript
const wordpressBreakpoints = {
  small: 600,    // $break-small
  medium: 782,   // $break-medium (admin)
  large: 960,    // $break-large
  wide: 1280,    // $break-wide
  huge: 1440,    // $break-huge
};
```

## Related Resources

- **Tests**: `tests/ui-ux/responsive.spec.ts`
- **Full Audit**: `prompts/testing/ui-ux-audit.md`
- **Visual Hierarchy**: `tests/ui-ux/visual-hierarchy.spec.ts`
