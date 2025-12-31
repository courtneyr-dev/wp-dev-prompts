# UI/UX Tests

Playwright test suites for comprehensive UI/UX validation based on established usability principles, Nielsen's heuristics, and WCAG accessibility guidelines.

## Test Suites

| File | Category | Description |
|------|----------|-------------|
| `visual-hierarchy.spec.ts` | Visual Design | CTA prominence, typography scale, color contrast, content grouping |
| `navigation.spec.ts` | Information Architecture | Navigation consistency, breadcrumbs, back/forward, skip links |
| `responsive.spec.ts` | Responsive Design | Breakpoint behavior, touch targets, content reflow, mobile inputs |
| `feedback-affordance.spec.ts` | Interaction Design | Hover/focus/active states, loading indicators, error messages |
| `accessibility.spec.ts` | Accessibility | Keyboard navigation, focus visibility, form labels, ARIA |
| `heuristic-evaluation.spec.ts` | Usability | Nielsen's 10 usability heuristics |

## Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all UI/UX tests
npx playwright test tests/ui-ux/

# Run specific test suite
npx playwright test tests/ui-ux/responsive.spec.ts
```

## Running Tests

### By Category

```bash
# Visual hierarchy tests
npx playwright test tests/ui-ux/visual-hierarchy.spec.ts

# Navigation tests
npx playwright test tests/ui-ux/navigation.spec.ts

# Responsive design tests
npx playwright test tests/ui-ux/responsive.spec.ts

# Feedback and affordance tests
npx playwright test tests/ui-ux/feedback-affordance.spec.ts

# Accessibility tests
npx playwright test tests/ui-ux/accessibility.spec.ts

# Heuristic evaluation tests
npx playwright test tests/ui-ux/heuristic-evaluation.spec.ts
```

### With Visual Regression

```bash
# Update baseline screenshots
npx playwright test tests/ui-ux/ --update-snapshots

# Compare against baselines
npx playwright test tests/ui-ux/
```

### Generate Report

```bash
npx playwright test tests/ui-ux/ --reporter=html
npx playwright show-report
```

## Test Categories Explained

### Visual Hierarchy (`visual-hierarchy.spec.ts`)

Tests visual prominence and readability:

- **CTA Prominence**: Primary buttons have stronger visual weight
- **Typography Scale**: Heading hierarchy maintains proper ratios
- **Color Contrast**: Text meets WCAG AA contrast requirements (4.5:1)
- **Content Grouping**: Related content is visually grouped

### Navigation (`navigation.spec.ts`)

Tests information architecture and wayfinding:

- **Consistency**: Navigation appears identically across pages
- **Breadcrumbs**: Accurate path representation
- **Back/Forward**: Browser history works correctly
- **Skip Links**: Keyboard users can skip to main content
- **Landmarks**: Proper landmark regions (`<nav>`, `<main>`, etc.)

### Responsive (`responsive.spec.ts`)

Tests behavior across viewport sizes:

- **Breakpoints**: Layout stability at 320px to 2560px
- **Touch Targets**: Minimum 44×44px on mobile
- **Content Reflow**: No horizontal scroll
- **Mobile Inputs**: Appropriate input types and autocomplete

WordPress breakpoints tested:
- 600px (small)
- 782px (medium/admin)
- 960px (large)
- 1280px (wide)

### Feedback & Affordance (`feedback-affordance.spec.ts`)

Tests interaction feedback:

- **States**: Hover, focus, active, disabled visuals
- **Loading**: Indicators for async operations
- **Errors**: Clear, specific error messages
- **Success**: Confirmation of completed actions
- **Affordance**: Clickable elements look clickable

### Accessibility (`accessibility.spec.ts`)

Tests WCAG compliance:

- **Keyboard Navigation**: All functions accessible via keyboard
- **Focus Visibility**: Clear focus indicators (3:1 contrast)
- **Tab Order**: Logical focus sequence
- **Form Labels**: Inputs have associated labels
- **Alt Text**: Images have descriptive alternatives
- **ARIA**: Proper ARIA attributes on dynamic content

### Heuristic Evaluation (`heuristic-evaluation.spec.ts`)

Tests against Nielsen's 10 usability heuristics:

| # | Heuristic | What's Tested |
|---|-----------|---------------|
| H1 | Visibility of System Status | Loading states, progress, feedback |
| H2 | Match with Real World | Language, metaphors, conventions |
| H3 | User Control and Freedom | Undo, cancel, exit options |
| H4 | Consistency and Standards | Visual and behavioral patterns |
| H5 | Error Prevention | Confirmation dialogs, constraints |
| H6 | Recognition over Recall | Visible options, suggestions |
| H7 | Flexibility and Efficiency | Keyboard shortcuts, power features |
| H8 | Aesthetic and Minimalist | Content density, visual noise |
| H9 | Error Recovery | Error message clarity, solutions |
| H10 | Help and Documentation | Help availability, discoverability |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_URL` | Site URL to test | `http://localhost:3000` |
| `VIEWPORT_WIDTH` | Test viewport width | (varies by test) |
| `VIEWPORT_HEIGHT` | Test viewport height | (varies by test) |

## CI Integration

These tests run automatically via `.github/workflows/ui-ux-audit.yml`:

- Triggered on PRs modifying frontend code
- Generates HTML report artifact
- Captures responsive screenshots
- Posts summary to PR comments

## Related Resources

- **Checklist**: `data/ui-ux-audit-checklist.yaml`
- **Prompts**: `prompts/testing/ui-ux-audit.md`
- **Documentation**: `docs/ui-ux-audit.md`
- **Guidelines**: `docs/ui-ux-guidelines.md`
- **Storybook**: `ui/storybook/stories/ui-ux/`

## Adding New Tests

```typescript
// tests/ui-ux/my-test.spec.ts
import { test, expect } from '@playwright/test';

test.describe('My UI/UX Tests', () => {
  test('should verify something', async ({ page }) => {
    await page.goto('/');

    // Your assertions here
    await expect(page.locator('.primary-cta')).toBeVisible();
  });
});
```

Follow these guidelines:
- Use semantic selectors (role, label) when possible
- Test across multiple viewport sizes
- Include both positive and negative test cases
- Add descriptive assertion messages
