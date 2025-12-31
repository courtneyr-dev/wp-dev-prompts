# UI/UX Audit Guide

A comprehensive guide to conducting UI/UX audits using this repository's tools, checklists, and automated tests.

## Overview

This audit framework combines:
- **Structured checklists** for systematic evaluation
- **Automated tests** for repeatable validation
- **AI prompts** for analysis and recommendations
- **Heuristic frameworks** grounded in UX research

## Getting Started

### Prerequisites

```bash
# Install Playwright for automated tests
npm install -D @playwright/test

# Install Playwright browsers
npx playwright install
```

### Quick Audit Workflow

1. **Run automated tests** to catch obvious issues:
   ```bash
   npx playwright test tests/ui-ux/
   ```

2. **Use AI prompts** for deeper analysis:
   - Open `prompts/testing/ui-ux-audit.md`
   - Replace `[TARGET]` with your URL/component
   - Run through your AI assistant

3. **Review against checklist**:
   - Reference `data/ui-ux-audit-checklist.yaml`
   - Check off items as you verify

4. **Document findings** using the output format from prompts

## Audit Categories

### Visual Hierarchy

**What it covers:**
- CTA prominence and visual weight
- Typography scale and readability
- Color contrast ratios (WCAG AA: 4.5:1 for text)
- Content grouping and whitespace
- Scanning pattern support (F-pattern, Z-pattern)

**Automated tests:** `tests/ui-ux/visual-hierarchy.spec.ts`

**Key questions:**
- Is the primary CTA immediately obvious?
- Can users scan the page quickly?
- Does the typography create clear hierarchy?

### Navigation

**What it covers:**
- Menu consistency across pages
- Breadcrumb accuracy
- Back/forward behavior
- Skip links and landmarks
- Task flow efficiency

**Automated tests:** `tests/ui-ux/navigation.spec.ts`

**Key questions:**
- Can users always tell where they are?
- Is navigation predictable?
- Can keyboard users navigate efficiently?

### Responsive Design

**What it covers:**
- Behavior across breakpoints (320px to 2560px)
- Touch target sizing (44px minimum)
- Content reflow without horizontal scroll
- Mobile input optimization
- Image responsiveness

**Automated tests:** `tests/ui-ux/responsive.spec.ts`

**WordPress breakpoints:**
| Name | Width | Usage |
|------|-------|-------|
| Small | 600px | Mobile to tablet |
| Medium | 782px | Admin breakpoint |
| Large | 960px | Tablet to desktop |
| Wide | 1280px | Standard desktop |
| Huge | 1440px | Large desktop |

**Key questions:**
- Does the layout work at every breakpoint?
- Are touch targets adequate on mobile?
- Do images scale appropriately?

### Feedback & Affordance

**What it covers:**
- Interactive element states (hover, focus, active, disabled)
- Loading and progress indicators
- Error message clarity
- Success confirmations
- Clickability signals

**Automated tests:** `tests/ui-ux/feedback-affordance.spec.ts`

**Key questions:**
- Do users know when something is happening?
- Are interactive elements obviously clickable?
- Are errors clear and actionable?

### Accessibility

**What it covers:**
- Keyboard navigation
- Focus visibility
- Form label associations
- Alt text quality
- ARIA implementation
- Color-independent information

**Automated tests:** `tests/ui-ux/accessibility.spec.ts`

**WCAG levels:**
| Level | Requirement | Target |
|-------|------------|--------|
| A | Minimum | Required |
| AA | Standard | Recommended |
| AAA | Enhanced | Aspirational |

**Key questions:**
- Can keyboard users complete all tasks?
- Is focus always visible?
- Do screen readers get meaningful information?

### Nielsen's Heuristics

**The 10 Heuristics:**

1. **Visibility of system status** - Users know what's happening
2. **Match with real world** - Familiar language and concepts
3. **User control and freedom** - Easy undo and exit
4. **Consistency and standards** - Follows conventions
5. **Error prevention** - Design prevents mistakes
6. **Recognition over recall** - Information visible when needed
7. **Flexibility and efficiency** - Experts can work faster
8. **Aesthetic and minimalist** - Only essential information
9. **Error recovery** - Clear error messages with solutions
10. **Help and documentation** - Assistance when needed

**Automated tests:** `tests/ui-ux/heuristic-evaluation.spec.ts`

## Running Tests

### All UI/UX Tests

```bash
npx playwright test tests/ui-ux/
```

### Specific Category

```bash
# Visual hierarchy only
npx playwright test tests/ui-ux/visual-hierarchy.spec.ts

# Accessibility only
npx playwright test tests/ui-ux/accessibility.spec.ts
```

### With Visual Comparison

```bash
# Update baseline screenshots
npx playwright test --update-snapshots

# Compare against baseline
npx playwright test
```

### Generate Report

```bash
npx playwright test --reporter=html
npx playwright show-report
```

## Interpreting Results

### Severity Levels

| Severity | Description | Action |
|----------|-------------|--------|
| Critical | Prevents task completion | Must fix immediately |
| High | Significant user impact | Fix before launch |
| Medium | User can work around | Fix soon |
| Low | Minor annoyance | Fix if time permits |

### Prioritization Matrix

```
          High Impact    Low Impact
Easy Fix     Do First     Quick Wins
Hard Fix     Plan Next    Backlog
```

### Common Patterns

**Pattern: Low contrast text**
- Usually appears in placeholders, captions, disabled states
- Fix: Ensure 4.5:1 ratio for text, 3:1 for large text

**Pattern: Missing focus states**
- Often found in custom components
- Fix: Add `:focus-visible` styles matching hover states

**Pattern: Touch targets too small**
- Common in icon buttons, links in text
- Fix: Add padding to reach 44x44px minimum

## Integration with CI

See `.github/workflows/ui-ux-audit.yml` for automated testing on pull requests.

```yaml
# Trigger on PRs affecting frontend code
on:
  pull_request:
    paths:
      - 'src/**'
      - 'styles/**'
      - 'components/**'
```

## Related Resources

### Data
- `data/ui-ux-audit-checklist.yaml` - Full checklist

### Tests
- `tests/ui-ux/` - Playwright test suites

### Prompts
- `prompts/testing/ui-ux-audit.md`
- `prompts/testing/navigation-flow-tests.md`
- `prompts/testing/responsive-tests.md`
- `prompts/testing/heuristic-evaluation.md`

### External Resources
- [Nielsen Norman Group](https://www.nngroup.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
