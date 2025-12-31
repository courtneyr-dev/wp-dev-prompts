# Navigation Flow Test Prompt

> **Type**: Extended
> **Platforms**: Claude Code, Cursor, Cline
> **References**: `tests/ui-ux/navigation.spec.ts`

<prompt>
<role>
You are a UX engineer specializing in navigation patterns, information architecture, and user flow optimization. You create comprehensive test plans that validate navigation works correctly across all user journeys.
</role>

<context>
I need to create or review navigation tests for [TARGET]. The tests should verify that users can efficiently find content, understand their location, and complete tasks without getting lost.

Reference the patterns in `tests/ui-ux/navigation.spec.ts` for implementation guidance.
</context>

<task>
Create a navigation test plan covering:

## 1. Navigation Consistency
- Main navigation appears on all pages
- Menu items maintain same order and labels
- Active states correctly indicate current page
- Subnavigation behavior is predictable

## 2. Wayfinding
- Breadcrumbs show accurate path
- Page titles match navigation labels
- Users can identify their location immediately
- Back button behavior is intuitive

## 3. Information Scent
- Link text clearly indicates destination
- Users can predict what they'll find
- Related content is discoverable
- Search results are relevant

## 4. Task Flows
- Critical paths have minimal steps
- Progress is visible in multi-step processes
- Users can save progress and return
- Escape routes are available

## 5. Mobile Navigation
- Hamburger menu is discoverable
- Touch targets meet 44px minimum
- Swipe gestures work as expected
- Back gesture doesn't conflict with app navigation

## 6. Accessibility Navigation
- Skip links work correctly
- Landmark regions are present
- Focus order is logical
- Keyboard users can reach all destinations
</task>

<constraints>
- Tests should be deterministic and not flaky
- Use semantic selectors when possible (role, label)
- Test across at least 3 viewport sizes
- Include both happy path and edge cases
- Consider users arriving from external links
- Test with JavaScript disabled where applicable
</constraints>

<output_format>
## Navigation Test Plan for [TARGET]

### Site Map Summary
```
[ASCII tree of navigation structure]
```

### Test Suites

#### 1. Global Navigation Tests
```typescript
test.describe('Global Navigation', () => {
  test('[TEST_ID] [Test description]', async ({ page }) => {
    // Test implementation
  });
});
```

#### 2. Breadcrumb Tests
```typescript
// Implementation
```

#### 3. Task Flow Tests
```typescript
// Implementation
```

#### 4. Mobile Navigation Tests
```typescript
// Implementation
```

#### 5. Accessibility Navigation Tests
```typescript
// Implementation
```

### Edge Cases to Cover
- [ ] Deep linking to interior pages
- [ ] Browser back/forward after form submission
- [ ] Navigation after session timeout
- [ ] Broken link handling

### Test Data Requirements
[Any fixtures or test data needed]

### Known Limitations
[What these tests cannot catch]
</output_format>
</prompt>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `[TARGET]` | Site, app, or component to test | `WordPress theme`, `e-commerce checkout`, `dashboard` |

## Expected Output

- Complete Playwright test suite
- Site map visualization
- Edge case checklist
- Test data requirements

## Usage Examples

### WordPress Site Navigation
```
Create navigation flow tests for a WordPress theme with:
- Header mega menu
- Footer navigation
- Sidebar categories
- Breadcrumbs on posts
- Search functionality
```

### Multi-Step Form Flow
```
Create navigation tests for a 5-step checkout flow, ensuring users can:
- Move forward and backward
- See progress indication
- Resume abandoned carts
- Access help at each step
```

### Dashboard Navigation
```
Create tests for a dashboard application with:
- Sidebar navigation with collapsible sections
- Tab navigation within pages
- Keyboard shortcuts for power users
- Recent items quick access
```

## Test Patterns

### Testing Navigation Consistency
```typescript
test('Navigation is consistent across pages', async ({ page }) => {
  const pages = ['/', '/about', '/products', '/contact'];
  let baseNavStructure: string[] = [];

  for (const path of pages) {
    await page.goto(path);
    const navItems = await page.locator('nav.main-nav a').allTextContents();

    if (baseNavStructure.length === 0) {
      baseNavStructure = navItems;
    } else {
      expect(navItems).toEqual(baseNavStructure);
    }
  }
});
```

### Testing Breadcrumbs
```typescript
test('Breadcrumbs reflect navigation path', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Products');
  await page.click('text=Category A');
  await page.click('text=Product 1');

  const breadcrumbs = await page.locator('.breadcrumb a').allTextContents();
  expect(breadcrumbs).toEqual(['Home', 'Products', 'Category A']);

  // Verify breadcrumb links work
  await page.click('.breadcrumb >> text=Products');
  await expect(page).toHaveURL(/\/products\/?$/);
});
```

### Testing Mobile Menu
```typescript
test('Mobile menu opens and closes correctly', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  // Menu should be hidden initially
  await expect(page.locator('nav.main-nav')).not.toBeVisible();

  // Open menu
  await page.click('[aria-label="Open menu"]');
  await expect(page.locator('nav.main-nav')).toBeVisible();

  // Close with X button
  await page.click('[aria-label="Close menu"]');
  await expect(page.locator('nav.main-nav')).not.toBeVisible();

  // Close by clicking outside
  await page.click('[aria-label="Open menu"]');
  await page.click('body', { position: { x: 10, y: 10 } });
  await expect(page.locator('nav.main-nav')).not.toBeVisible();

  // Close with Escape key
  await page.click('[aria-label="Open menu"]');
  await page.keyboard.press('Escape');
  await expect(page.locator('nav.main-nav')).not.toBeVisible();
});
```

## Related Resources

- **Tests**: `tests/ui-ux/navigation.spec.ts`
- **Full Audit**: `prompts/testing/ui-ux-audit.md`
- **Accessibility**: `tests/ui-ux/accessibility.spec.ts`
