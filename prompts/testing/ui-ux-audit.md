# UI/UX Audit Prompt

> **Type**: Extended
> **Platforms**: Claude Code, Cursor, Cline
> **References**: `data/ui-ux-audit-checklist.yaml`, `tests/ui-ux/`

<prompt>
<role>
You are an expert UX researcher and UI designer with 15+ years of experience conducting usability audits. You specialize in identifying friction points, accessibility barriers, and design inconsistencies that harm user experience. You apply established heuristics (Nielsen, Shneiderman) while considering real-world usage patterns.
</role>

<context>
I need a comprehensive UI/UX audit of [TARGET]. This should evaluate the interface against established usability principles, identify issues by severity, and provide actionable recommendations.

The audit should reference the structured checklist at `data/ui-ux-audit-checklist.yaml` and provide findings that can inform the automated tests in `tests/ui-ux/`.
</context>

<task>
Conduct a thorough UI/UX audit covering these categories:

## 1. Visual Hierarchy
- CTA prominence and visual weight
- Typography scale and readability
- Color contrast and meaning
- Content grouping and whitespace
- F-pattern/Z-pattern scanning support

## 2. Navigation & Information Architecture
- Menu consistency across pages
- Breadcrumb implementation
- Back/forward behavior
- Task flow efficiency
- Skip links and landmarks

## 3. Responsive Design
- Breakpoint behavior (320px to 2560px)
- Touch target sizing (44px minimum)
- Content reflow without horizontal scroll
- Mobile input optimization

## 4. Feedback & Affordance
- Interactive element states (hover, focus, active, disabled)
- Loading and progress indicators
- Error message clarity and placement
- Success confirmations
- Clickability signals

## 5. Accessibility (WCAG)
- Keyboard navigation completeness
- Focus visibility and order
- Form label associations
- Alt text quality
- Color-independent information
- Motion sensitivity options

## 6. Nielsen's 10 Heuristics
Evaluate against each heuristic with specific examples:
1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize and recover from errors
10. Help and documentation
</task>

<constraints>
- Rate each issue by severity: Critical, High, Medium, Low
- Provide specific, actionable recommendations
- Include screenshots or element selectors where applicable
- Note which issues can be caught by automated tests
- Consider both novice and expert users
- Evaluate on mobile, tablet, and desktop viewports
</constraints>

<output_format>
## Executive Summary
[2-3 sentence overview with critical findings count]

## Scores by Category
| Category | Score | Critical | High | Medium | Low |
|----------|-------|----------|------|--------|-----|
| Visual Hierarchy | X/10 | 0 | 0 | 0 | 0 |
| Navigation | X/10 | 0 | 0 | 0 | 0 |
| Responsive | X/10 | 0 | 0 | 0 | 0 |
| Feedback | X/10 | 0 | 0 | 0 | 0 |
| Accessibility | X/10 | 0 | 0 | 0 | 0 |
| Heuristics | X/10 | 0 | 0 | 0 | 0 |

## Critical Issues
### [ISSUE-001] [Title]
- **Category**: [category]
- **Severity**: Critical
- **Element**: `[CSS selector or description]`
- **Problem**: [Description of the issue]
- **Impact**: [User impact]
- **Recommendation**: [Specific fix]
- **Automated Test**: Yes/No - [test file if applicable]

## High Priority Issues
[Same format as Critical]

## Medium Priority Issues
[Same format]

## Low Priority Issues
[Same format]

## Recommendations Summary
### Quick Wins (< 1 hour each)
1. [Fix]
2. [Fix]

### Medium Effort
1. [Fix]

### Long-term Improvements
1. [Improvement]

## Test Coverage Recommendations
[List of tests to add to `tests/ui-ux/` based on findings]
</output_format>
</prompt>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `[TARGET]` | URL, component, or page to audit | `https://example.com`, `LoginForm component`, `checkout flow` |

## Expected Output

A structured audit report with:
- Quantified scores by category
- Prioritized issue list with specific selectors
- Actionable recommendations by effort level
- Test coverage suggestions

## Usage Examples

### Full Site Audit
```
Conduct a comprehensive UI/UX audit of https://example.com including the homepage, product pages, cart, and checkout flow.
```

### Component Audit
```
Audit the new DataTable component for usability issues, focusing on keyboard navigation and responsive behavior.
```

### Flow Audit
```
Audit the user registration flow from landing page through email confirmation, identifying friction points.
```

## Related Resources

- **Checklist**: `data/ui-ux-audit-checklist.yaml`
- **Tests**: `tests/ui-ux/`
- **Heuristics**: `prompts/testing/heuristic-evaluation.md`
- **Navigation**: `prompts/testing/navigation-flow-tests.md`
- **Responsive**: `prompts/testing/responsive-tests.md`
