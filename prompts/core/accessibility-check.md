# Accessibility Check

> **Category**: core/accessibility
> **Platforms**: All

<prompt>
Audit this WordPress plugin or theme for accessibility compliance. Target WCAG 2.2 Level AA.

**Code or URL to review**: [PASTE CODE OR DESCRIBE]

## Audit categories

### 1. Perceivable

**Images and media**
- [ ] All `<img>` tags have meaningful `alt` attributes (empty `alt=""` only for decorative images)
- [ ] Complex images have long descriptions
- [ ] Videos have captions and audio descriptions
- [ ] Color is not the only means of conveying information

**Text and contrast**
- [ ] Text meets 4.5:1 contrast ratio (3:1 for large text 18px+ bold or 24px+)
- [ ] UI components meet 3:1 contrast against adjacent colors
- [ ] Text can be resized to 200% without loss of content
- [ ] No images of text (use real text instead)

### 2. Operable

**Keyboard access**
- [ ] All functionality is keyboard accessible
- [ ] Focus order is logical and follows visual layout
- [ ] Focus is visible on all interactive elements (never `outline: none` without replacement)
- [ ] No keyboard traps (user can always tab away)
- [ ] Skip links present for repeated navigation

**Interactive elements**
- [ ] Buttons use `<button>`, not styled `<div>` or `<span>`
- [ ] Links use `<a href>`, not `<span onclick>`
- [ ] Touch targets are at least 44x44px
- [ ] Hover content is also accessible via focus
- [ ] Animations respect `prefers-reduced-motion`

### 3. Understandable

**Forms**
- [ ] Every input has a visible `<label>` (not just placeholder text)
- [ ] Required fields are indicated (not by color alone)
- [ ] Error messages identify the field and describe the problem
- [ ] Form instructions appear before the form, not just after
- [ ] Autocomplete attributes on common fields (name, email, address)

**Content**
- [ ] Language attribute set on `<html>` element
- [ ] Abbreviations are expanded on first use
- [ ] Heading hierarchy is logical (`h1` → `h2` → `h3`, no skipping)

### 4. Robust

**ARIA usage**
- [ ] ARIA roles match element purpose
- [ ] `aria-label` or `aria-labelledby` on custom widgets
- [ ] `aria-live` regions for dynamic content updates
- [ ] `aria-expanded` on disclosure widgets (accordions, dropdowns)
- [ ] No redundant ARIA (don't add `role="button"` to `<button>`)

**WordPress patterns**
- [ ] Admin notices use `role="alert"` or `aria-live="polite"`
- [ ] Custom settings pages work with screen readers
- [ ] Block editor sidebar controls are labeled
- [ ] Modals trap focus and return focus on close

## Output format

For each issue found:
1. **Element**: What and where
2. **WCAG Criterion**: Specific success criterion (e.g., 1.4.3 Contrast)
3. **Level**: A, AA, or AAA
4. **Impact**: Critical / Serious / Moderate / Minor
5. **Fix**: Specific code or markup change

End with a summary: total issues by impact level, top 3 priorities to fix first.
</prompt>

## Usage

Paste your HTML/PHP code, component code, or describe the UI to audit.
