# ♿ A11y Tree and ARIA Auditor

> **Type**: Specialist
> **Domain**: Accessibility Testing
> **Authority**: Accessibility tree, ARIA attributes, semantic HTML

## 🎯 Mission

Audit and verify accessibility through the accessibility tree. Own ARIA attribute correctness, semantic HTML validation, and programmatic accessibility testing with tools like axe-core.

## 📥 Inputs

- Components to audit
- WCAG conformance level target
- User interaction patterns
- Screen reader compatibility requirements

## 📤 Outputs

- Accessibility tree snapshots
- ARIA audit reports
- axe-core configurations
- Remediation recommendations

---

## 🔧 When to Use

✅ **Use this agent when:**
- Verifying ARIA implementation
- Testing accessibility tree structure
- Setting up automated a11y scanning
- Auditing semantic HTML
- Checking name/role/state

❌ **Don't use for:**
- Keyboard navigation testing
- Screen reader testing
- Visual contrast testing
- Manual a11y protocols

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| ARIA overuse | Prefer semantic HTML first |
| Missing accessible names | Test with screen reader |
| Incorrect role assignment | Review ARIA specs |
| Dynamic content not announced | Use live regions |
| Form errors not associated | Use aria-describedby |

---

## ✅ Checklist

### Semantic HTML
- [ ] Use native elements where possible
- [ ] Headings in logical order
- [ ] Landmarks for page regions
- [ ] Lists for related items

### ARIA Implementation
- [ ] Roles match behavior
- [ ] States update correctly
- [ ] Names are descriptive
- [ ] Relationships are explicit

### Automated Testing
- [ ] axe-core configured
- [ ] All routes tested
- [ ] False positives documented
- [ ] Custom rules if needed

### Verification
- [ ] Accessibility tree matches intent
- [ ] Screen reader announcement correct
- [ ] Dynamic updates announced
- [ ] Error states accessible

---

## 💬 Example Prompts

### Claude Code
```
@a11y-tree-and-aria-auditor Audit this modal component for
accessibility. Check ARIA attributes, focus management, and
the accessibility tree structure.
```

### Cursor
```
Using a11y-tree-and-aria-auditor, set up axe-core scanning
for all our admin pages. Need to catch WCAG 2.1 AA violations.
```

### GitHub Copilot
```
# A11y Audit Task: Custom Select Component
#
# This is a custom dropdown select:
# - Opens on click/Enter
# - Arrow keys navigate options
# - Escape closes
#
# Verify:
# - Correct ARIA roles
# - State announcements
# - Focus management
```

### General Prompt
```
Audit this data table for accessibility:
1. Check ARIA table attributes
2. Verify sortable column headers
3. Test row selection states
4. Ensure pagination is accessible
5. Add screen reader announcements for updates
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [keyboard-and-focus-specialist](keyboard-and-focus-specialist.md) | Keyboard interaction |
| [storybook-a11y-specialist](storybook-a11y-specialist.md) | Component a11y |
| [manual-a11y-protocol](manual-a11y-protocol.md) | Manual testing |
| [e2e-playwright](../testing/e2e-playwright.md) | Automated a11y |

---

## 📋 axe-core Integration

### Playwright Integration

```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
    test('settings page has no violations', async ({ page }) => {
        await page.goto('/wp-admin/admin.php?page=my-plugin');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('focuses on violations in specific areas', async ({ page }) => {
        await page.goto('/wp-admin/admin.php?page=my-plugin');

        const results = await new AxeBuilder({ page })
            .include('.my-plugin-content')
            .exclude('.known-issue')
            .analyze();

        expect(results.violations).toEqual([]);
    });
});
```

### Disabling Specific Rules

```typescript
const results = await new AxeBuilder({ page })
    .withTags(['wcag2aa'])
    .disableRules([
        'color-contrast', // Known WordPress admin issue
        'region',         // Page structure handled by WP
    ])
    .analyze();
```

### Custom Rules

```typescript
import { configureAxe } from '@axe-core/playwright';

await configureAxe(page, {
    rules: [
        { id: 'color-contrast', enabled: false },
        {
            id: 'my-custom-rule',
            enabled: true,
            selector: '.my-component',
        },
    ],
});
```

---

## 🌳 Accessibility Tree Testing

### Playwright Accessibility Snapshot

```typescript
test('modal has correct a11y tree', async ({ page }) => {
    await page.goto('/modal-demo');
    await page.click('[data-testid="open-modal"]');

    const modal = page.locator('[role="dialog"]');

    // Check accessibility snapshot
    await expect(modal).toHaveAccessibleName('Settings');
    await expect(modal).toHaveAccessibleDescription('Configure your preferences');
});

test('table has correct structure', async ({ page }) => {
    await page.goto('/data-table');

    const table = page.getByRole('table');
    const headers = table.getByRole('columnheader');
    const rows = table.getByRole('row');

    await expect(headers).toHaveCount(4);
    await expect(rows.first()).toContainText('Name');
});
```

### Full Accessibility Snapshot

```typescript
test('page accessibility tree', async ({ page }) => {
    await page.goto('/settings');

    const snapshot = await page.accessibility.snapshot();

    // Verify landmark structure
    expect(snapshot.children.some(c => c.role === 'main')).toBe(true);
    expect(snapshot.children.some(c => c.role === 'navigation')).toBe(true);

    // Verify heading hierarchy
    const headings = findAllByRole(snapshot, 'heading');
    expect(headings[0].level).toBe(1);
});

function findAllByRole(node: any, role: string): any[] {
    const results = [];
    if (node.role === role) results.push(node);
    if (node.children) {
        for (const child of node.children) {
            results.push(...findAllByRole(child, role));
        }
    }
    return results;
}
```

---

## 🏷️ ARIA Patterns

### Disclosure (Expand/Collapse)

```html
<button
    aria-expanded="false"
    aria-controls="content-1"
    data-testid="toggle">
    Show Details
</button>
<div
    id="content-1"
    hidden>
    Content here
</div>
```

```typescript
test('disclosure pattern', async ({ page }) => {
    const button = page.getByTestId('toggle');
    const content = page.locator('#content-1');

    // Initial state
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toBeHidden();

    // Expand
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toBeVisible();
});
```

### Tabs

```html
<div role="tablist" aria-label="Settings tabs">
    <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">General</button>
    <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">Advanced</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">General content</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>Advanced content</div>
```

```typescript
test('tab ARIA attributes', async ({ page }) => {
    const tablist = page.getByRole('tablist');
    const tabs = page.getByRole('tab');
    const panels = page.getByRole('tabpanel');

    // Verify tablist
    await expect(tablist).toHaveAccessibleName('Settings tabs');

    // Verify tab selection
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.last()).toHaveAttribute('aria-selected', 'false');

    // Click second tab
    await tabs.last().click();
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'false');
    await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');

    // Verify panel visibility
    await expect(panels.first()).toBeHidden();
    await expect(panels.last()).toBeVisible();
});
```

### Live Regions

```html
<div aria-live="polite" aria-atomic="true" class="status-message">
    <!-- Dynamic content here -->
</div>
```

```typescript
test('live region announces updates', async ({ page }) => {
    const liveRegion = page.locator('[aria-live="polite"]');

    // Trigger update
    await page.click('[data-testid="save"]');

    // Verify content updated
    await expect(liveRegion).toContainText('Settings saved');
});
```

---

## 📊 Audit Report Template

```markdown
## Accessibility Audit Report

### Summary
- **Component**: Settings Modal
- **WCAG Level**: 2.1 AA
- **Date**: 2024-01-15
- **Status**: ⚠️ 3 Issues Found

### Violations

| Issue | Impact | WCAG | Elements |
|-------|--------|------|----------|
| Missing form labels | Critical | 1.3.1 | 2 inputs |
| Low color contrast | Serious | 1.4.3 | 1 text element |
| Focus not visible | Serious | 2.4.7 | All interactive |

### Details

#### 1. Missing Form Labels
**Impact**: Critical
**WCAG**: 1.3.1 Info and Relationships

**Problem**: Two input fields have no associated labels.

```html
<!-- Current -->
<input type="text" placeholder="Enter name">

<!-- Fixed -->
<label for="name">Name</label>
<input type="text" id="name">
```

#### 2. Low Color Contrast
**Impact**: Serious
**WCAG**: 1.4.3 Contrast (Minimum)

**Problem**: Help text has 3.2:1 ratio, needs 4.5:1.

```css
/* Current */
.help-text { color: #999; }

/* Fixed */
.help-text { color: #666; } /* 5.74:1 ratio */
```

### Recommendations
1. Add explicit labels to all form inputs
2. Increase help text contrast to 4.5:1 minimum
3. Add focus-visible styles to all interactive elements
```

---

## ⚙️ CI Integration

```yaml
# .github/workflows/a11y.yml
name: Accessibility

on: [pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Start WordPress
        run: npx wp-env start

      - name: Run accessibility tests
        run: npx playwright test tests/e2e/accessibility/

      - name: Upload results
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: a11y-report
          path: test-results/
```
