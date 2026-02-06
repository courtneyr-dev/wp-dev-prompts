# WCAG Accessibility Checklist

> **Type**: Skill
> **Domain**: Accessibility
> **Source**: wp-dev-prompts agents/specialists/accessibility

<skill>
<summary>
Key WCAG 2.1 Level AA requirements for WordPress development.
</summary>

<knowledge>
## Perceivable

### Images
- [ ] All `<img>` elements have `alt` attributes
- [ ] Decorative images have empty `alt=""`
- [ ] Complex images have extended descriptions
- [ ] Image text alternatives describe purpose, not just content

### Color
- [ ] Color is not the only means of conveying information
- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text, 18pt+)
- [ ] UI component contrast ratio ≥ 3:1

### Text
- [ ] Text can be resized up to 200% without loss of content
- [ ] No horizontal scrolling at 320px viewport width
- [ ] Text spacing can be adjusted without breaking

### Media
- [ ] Videos have captions
- [ ] Audio-only content has transcripts
- [ ] No content flashes more than 3 times per second

## Operable

### Keyboard
- [ ] All functionality available via keyboard
- [ ] No keyboard traps
- [ ] Focus order is logical and intuitive
- [ ] Focus indicator is visible

### Navigation
- [ ] Skip links present for repeated content
- [ ] Page titles are descriptive
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Links have descriptive text (avoid "click here")

### Timing
- [ ] Users can pause, stop, or hide moving content
- [ ] Users can extend time limits
- [ ] No content changes on focus

### Input
- [ ] Touch targets are at least 44x44 pixels
- [ ] Pointer gestures have alternatives
- [ ] Motion-based inputs have alternatives

## Understandable

### Language
- [ ] Page language is set (`lang` attribute)
- [ ] Language changes are identified

### Predictable
- [ ] Navigation is consistent across pages
- [ ] Components behave consistently
- [ ] No unexpected context changes

### Forms
- [ ] All inputs have visible labels
- [ ] Error messages are descriptive
- [ ] Required fields are indicated
- [ ] Error prevention for legal/financial data

## Robust

### Compatibility
- [ ] HTML validates without significant errors
- [ ] ARIA is used correctly
- [ ] Custom components have proper roles
- [ ] Status messages are announced

## WordPress-Specific Checks

### Blocks
- [ ] Block output uses semantic HTML
- [ ] Block controls are keyboard accessible
- [ ] Block previews are accessible

### Forms
- [ ] Form plugin output is accessible
- [ ] Error messages are programmatically associated
- [ ] Success/error states are announced

### Navigation
- [ ] Menu items are properly structured
- [ ] Submenus are keyboard accessible
- [ ] Mobile menu toggle is accessible

### Admin
- [ ] Custom admin pages are accessible
- [ ] Settings use WordPress UI patterns
- [ ] Admin notices are programmatically associated

## Testing Commands

**Automated (catches ~30% of issues):**
```bash
# Playwright with axe-core
npx playwright test --grep accessibility

# Lighthouse
npx lighthouse https://example.com --only-categories=accessibility
```

**Manual (required for full coverage):**
- Tab through entire page
- Use with screen reader (NVDA, VoiceOver)
- Test at 200% zoom
- Test with Windows High Contrast Mode
</knowledge>

<best_practices>
- Automated testing catches ~30% of issues
- Manual testing is essential
- Test with actual assistive technology users
- Fix critical issues before warnings
- Document known issues and timeline
</best_practices>

<references>
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [WordPress Accessibility Handbook](https://make.wordpress.org/accessibility/handbook/)
</references>
</skill>
