# Screen Reader Testing

> **Type**: Skill
> **Domain**: Accessibility
> **Focus**: Manual testing WordPress content with screen readers

<skill>
<summary>
Guidelines for testing WordPress plugins and blocks with screen readers to ensure accessibility.
</summary>

<knowledge>
## Why Manual Screen Reader Testing?

Automated tools catch ~30% of issues. Screen reader testing catches:
- **Reading order issues** - Content announced in wrong sequence
- **Missing context** - Links without destination clarity
- **Confusing interactions** - Actions that don't behave as expected
- **Live region problems** - Dynamic content not announced
- **Focus management** - Focus not moved appropriately

## Screen Readers

### By Platform

| Platform | Screen Reader | Cost |
|----------|---------------|------|
| Windows | NVDA | Free |
| Windows | JAWS | Paid |
| macOS | VoiceOver | Built-in |
| iOS | VoiceOver | Built-in |
| Android | TalkBack | Built-in |
| Linux | Orca | Free |

### Browser Pairings

- **Windows + NVDA**: Firefox or Chrome
- **Windows + JAWS**: Chrome
- **macOS + VoiceOver**: Safari
- **iOS + VoiceOver**: Safari
- **Android + TalkBack**: Chrome

## NVDA Basics (Windows)

### Getting Started

```
# Download from nvaccess.org

# Start/Stop
Insert + Q (or Caps Lock + Q in laptop mode)

# Stop speaking
Ctrl

# Read current line
Insert + UpArrow

# Read all from current point
Insert + DownArrow
```

### Navigation

```
# Next/Previous element
Tab / Shift+Tab

# Headings list
Insert + F7

# Next heading
H

# Next heading level 1-6
1-6

# Next link
K

# Next button
B

# Next form field
F

# Next landmark
D
```

### Forms

```
# Enter forms mode
Enter or Space on form field

# Exit forms mode
Escape

# Toggle between browse/focus mode
Insert + Space
```

## VoiceOver Basics (macOS)

### Getting Started

```
# Enable VoiceOver
Cmd + F5

# VoiceOver key (VO)
Ctrl + Option

# Stop speaking
Ctrl

# Read current item
VO + A

# Read from top
VO + A + A
```

### Navigation

```
# Next/Previous item
VO + RightArrow / VO + LeftArrow

# Open rotor (navigation wheel)
VO + U

# Navigate by heading
VO + Cmd + H

# Navigate by link
VO + Cmd + L

# Navigate by form control
VO + Cmd + J
```

### Interacting

```
# Interact with group
VO + Shift + DownArrow

# Stop interacting
VO + Shift + UpArrow

# Click
VO + Space
```

## Testing Checklist

### Page Structure

```markdown
- [ ] Page title is descriptive
- [ ] Headings create logical outline
- [ ] Landmarks are present (main, nav, footer)
- [ ] Skip link works and is first focusable element
- [ ] Reading order matches visual order
```

### Navigation

```markdown
- [ ] All links have descriptive text (no "click here")
- [ ] All buttons describe their action
- [ ] Menus are navigable with keyboard
- [ ] Current page/state is announced
- [ ] Breadcrumbs are properly structured
```

### Images

```markdown
- [ ] Informative images have descriptive alt text
- [ ] Decorative images have empty alt=""
- [ ] Complex images have extended descriptions
- [ ] Image buttons have text alternatives
```

### Forms

```markdown
- [ ] All inputs have visible labels
- [ ] Labels are programmatically associated
- [ ] Required fields are announced
- [ ] Error messages are announced
- [ ] Error messages identify the field
- [ ] Form submit success/failure is announced
```

### Dynamic Content

```markdown
- [ ] Loading states are announced
- [ ] Added content is announced (live regions)
- [ ] Removed content doesn't break navigation
- [ ] Modal focus is trapped and managed
- [ ] Popups announce their presence
```

## Testing Scenarios

### WordPress Admin

```markdown
1. Navigate to Plugins page
   - Verify plugin list is readable
   - Verify Activate/Deactivate is clear
   - Test with keyboard only

2. Navigate to plugin settings
   - Verify all settings are labeled
   - Test form submission
   - Verify success/error messages

3. Test block editor
   - Navigate block toolbar
   - Insert a block
   - Configure block settings
```

### Block Testing

```markdown
1. Insert block using keyboard
   - Tab to inserter
   - Search for block
   - Activate block

2. Configure block
   - Navigate to toolbar
   - Change settings in sidebar
   - Verify changes announced

3. Navigate saved block
   - Read block content
   - Verify order makes sense
   - Test any interactive elements
```

### Frontend Testing

```markdown
1. Navigate page structure
   - Skip link to content
   - Navigate by headings
   - Navigate by landmarks

2. Test plugin features
   - All buttons/links accessible
   - Forms work correctly
   - Dynamic content announced

3. Test mobile
   - VoiceOver on iOS
   - TalkBack on Android
```

## Recording Issues

### Issue Template

```markdown
## Screen Reader Accessibility Issue

**Screen Reader**: NVDA 2024.1
**Browser**: Firefox 120
**Page/Component**: Settings page checkbox

### Issue
When navigating to the "Enable feature" checkbox, the label
is not announced. Only "checkbox unchecked" is spoken.

### Expected
"Enable feature, checkbox, unchecked" should be announced.

### Steps to Reproduce
1. Navigate to Settings > My Plugin
2. Tab to first checkbox
3. Notice label is not announced

### Root Cause
The label element is not associated with the input:
```html
<label>Enable feature</label>
<input type="checkbox" id="enable-feature">
```

### Fix
Add for attribute to label:
```html
<label for="enable-feature">Enable feature</label>
<input type="checkbox" id="enable-feature">
```
```

## Automated Pre-checks

### Before Manual Testing

```bash
# Run axe-core
npx playwright test --grep accessibility

# Check ARIA
npx eslint src/ --rule 'jsx-a11y/*: error'

# Validate HTML
npx html-validate dist/*.html
```

### Continuous Integration

```yaml
name: Accessibility

on: [push, pull_request]

jobs:
  automated:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright test --grep accessibility

  # Schedule manual testing reminder
  manual-testing-reminder:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '## Accessibility Testing Reminder\n\nPlease test with screen reader before merging.'
            })
```
</knowledge>

<best_practices>
- Test with at least one screen reader
- Test on both Windows (NVDA) and Mac (VoiceOver)
- Test mobile (VoiceOver/TalkBack)
- Document issues with specific steps
- Include screen reader version in bug reports
- Test early and often
</best_practices>

<commands>
```bash
# Start VoiceOver (Mac)
# Cmd + F5

# Start NVDA (Windows)
# Download from nvaccess.org and install

# Install axe DevTools browser extension
# Available for Chrome and Firefox

# Run automated checks first
npx playwright test --grep accessibility
```
</commands>
</skill>
