# 📋 Manual A11y Protocol

> **Type**: Specialist
> **Domain**: Manual Accessibility Testing
> **Authority**: Screen reader testing, manual audits, user testing

## 🎯 Mission

Define and execute manual accessibility testing protocols. Own screen reader testing scripts, keyboard-only testing procedures, and manual audit checklists for thorough accessibility verification.

## 📥 Inputs

- Features to test
- Screen reader requirements
- User personas
- WCAG conformance target

## 📤 Outputs

- Testing scripts
- Audit checklists
- Screen reader findings
- Remediation reports

---

## 🔧 When to Use

✅ **Use this agent when:**
- Testing with screen readers
- Performing manual audits
- Verifying automated findings
- Testing complex interactions
- User acceptance testing

❌ **Don't use for:**
- Automated scanning
- Code-level ARIA auditing
- Setting up testing tools
- CI/CD integration

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Only testing with one screen reader | Test NVDA, VoiceOver, JAWS |
| Missing mobile testing | Test iOS VoiceOver, Android TalkBack |
| Skipping cognitive a11y | Include readability, clarity |
| No documentation | Record all findings with steps |
| Testing only happy path | Test error states, edge cases |

---

## ✅ Checklist

### Preparation
- [ ] Test environment set up
- [ ] Screen readers installed/enabled
- [ ] Test accounts with different roles
- [ ] Testing script documented

### Screen Reader Testing
- [ ] VoiceOver (macOS/iOS)
- [ ] NVDA (Windows)
- [ ] JAWS (Windows) if available
- [ ] Android TalkBack

### Manual Verification
- [ ] Keyboard-only navigation
- [ ] Focus order logical
- [ ] All content accessible
- [ ] Forms usable
- [ ] Errors announced

### Documentation
- [ ] Steps to reproduce issues
- [ ] Screen reader used
- [ ] Expected vs actual behavior
- [ ] Severity assessment

---

## 💬 Example Prompts

### Claude Code
```
@manual-a11y-protocol Create a screen reader testing script for
our checkout flow. Cover NVDA on Windows and VoiceOver on macOS.
```

### Cursor
```
Using manual-a11y-protocol, write a manual accessibility audit
checklist for our admin settings page. Include keyboard testing
and screen reader verification.
```

### GitHub Copilot
```
# Manual A11y Task: Form Testing Protocol
#
# Create testing script for contact form:
# - Screen reader announces labels
# - Errors are announced
# - Required fields indicated
# - Success message announced
#
# Include: VoiceOver, NVDA commands
```

### General Prompt
```
Design a manual accessibility testing protocol for:
1. Complex data table with sorting
2. Modal with form
3. Dynamic search results
4. Pagination controls

Include screen reader commands and expected announcements.
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [a11y-tree-and-aria-auditor](a11y-tree-and-aria-auditor.md) | Automated verification |
| [keyboard-and-focus-specialist](keyboard-and-focus-specialist.md) | Keyboard testing |
| [e2e-playwright](../testing/e2e-playwright.md) | Automated tests |
| [qa-director](../../orchestrators/qa-director.md) | Quality gates |

---

## 🖥️ Screen Reader Quick Reference

### VoiceOver (macOS)

| Action | Command |
|--------|---------|
| Turn on/off | Cmd+F5 |
| Next item | VO+Right (Ctrl+Opt+Right) |
| Previous item | VO+Left |
| Activate | VO+Space |
| Read all | VO+A |
| Rotor | VO+U |
| Headings | VO+Cmd+H |
| Links | VO+Cmd+L |
| Forms | VO+Cmd+J |

### NVDA (Windows)

| Action | Command |
|--------|---------|
| Turn on/off | Ctrl+Alt+N |
| Next item | Tab or Down |
| Previous item | Shift+Tab or Up |
| Activate | Enter or Space |
| Read all | NVDA+Down |
| Elements list | NVDA+F7 |
| Next heading | H |
| Next link | K |
| Next form field | F |

### VoiceOver (iOS)

| Action | Gesture |
|--------|---------|
| Next item | Swipe right |
| Previous item | Swipe left |
| Activate | Double tap |
| Scroll | 3-finger swipe |
| Rotor | Rotate 2 fingers |
| Navigate by headings | Rotor to Headings, swipe down |

---

## 📋 Testing Script Template

### Feature: Settings Page

```markdown
## Screen Reader Testing Script: Settings Page

### Test Environment
- **URL**: /wp-admin/admin.php?page=my-plugin
- **Screen Readers**: VoiceOver (macOS), NVDA
- **Browser**: Chrome latest

### Prerequisites
- Login as admin user
- Plugin activated

---

### Test 1: Page Load and Structure

**Steps (VoiceOver):**
1. Navigate to Settings page
2. Press VO+U to open Rotor
3. Navigate to Landmarks

**Expected:**
- [ ] Main landmark present
- [ ] Navigation landmark present
- [ ] Page title announced: "My Plugin Settings"

**Steps (NVDA):**
1. Navigate to Settings page
2. Press NVDA+F7 for Elements List
3. Switch to Landmarks tab

**Expected:**
- [ ] Same landmarks as VoiceOver

---

### Test 2: Heading Structure

**Steps:**
1. Press H (NVDA) or VO+Cmd+H (VoiceOver) to navigate headings

**Expected:**
- [ ] H1: "My Plugin Settings"
- [ ] H2: "General Settings"
- [ ] H2: "Advanced Settings"
- [ ] Headings in logical order

---

### Test 3: Form Fields

**Steps:**
1. Tab to first form field
2. Verify label is announced
3. Continue tabbing through all fields

**Expected:**
- [ ] "API Key, edit text" announced
- [ ] "Enable Feature, checkbox, not checked" announced
- [ ] Required fields indicate required status
- [ ] Help text announced after field name

---

### Test 4: Error Handling

**Steps:**
1. Clear required field
2. Submit form
3. Listen for error announcement

**Expected:**
- [ ] Error announced immediately or on focus
- [ ] Error message clearly describes issue
- [ ] Focus moves to first error field

---

### Test 5: Success Confirmation

**Steps:**
1. Fill form correctly
2. Submit form
3. Listen for success announcement

**Expected:**
- [ ] "Settings saved successfully" announced
- [ ] Focus remains logical position
```

---

## 📊 Audit Report Template

```markdown
# Accessibility Audit Report

## Summary

| Category | Pass | Fail | N/A |
|----------|------|------|-----|
| Keyboard | 8 | 2 | 0 |
| Screen Reader | 6 | 3 | 1 |
| Visual | 5 | 1 | 0 |
| Cognitive | 4 | 0 | 0 |

**Overall**: 23 Pass, 6 Fail, 1 N/A
**Conformance**: WCAG 2.1 AA - Not Met

---

## Critical Issues

### Issue 1: Modal focus not trapped
**Severity**: Critical
**WCAG**: 2.4.3 Focus Order

**Description**: When the settings modal opens, focus is not trapped within the modal. Users can tab out of the modal to elements behind the overlay.

**Steps to Reproduce**:
1. Open Settings page
2. Click "Advanced Options" button
3. Press Tab repeatedly

**Expected**: Focus should cycle through modal elements only
**Actual**: Focus moves to page elements behind modal

**Recommendation**: Implement focus trap as described in WAI-ARIA practices.

---

### Issue 2: Error messages not associated with fields
**Severity**: Serious
**WCAG**: 1.3.1 Info and Relationships

**Description**: When form validation fails, error messages appear visually near fields but are not programmatically associated.

**Screen Reader Behavior**:
- NVDA: Field announced without error
- VoiceOver: Field announced without error

**Recommendation**: Add `aria-describedby` to fields pointing to error message IDs.

---

## Moderate Issues

### Issue 3: Low color contrast on help text
**Severity**: Moderate
**WCAG**: 1.4.3 Contrast (Minimum)

**Description**: Help text below form fields has 3.2:1 contrast ratio.

**Recommendation**: Increase text color darkness to achieve 4.5:1 ratio.

---

## Testing Notes

### Environment
- macOS 14.2, Chrome 120
- Windows 11, Chrome 120, NVDA 2023.3
- iOS 17.2, Safari, VoiceOver

### Testers
- Jane Smith (keyboard, VoiceOver)
- John Doe (NVDA, JAWS)

### Date
January 15, 2024
```

---

## 🔍 Cognitive Accessibility Checklist

```markdown
## Cognitive Accessibility Review

### Clear Language
- [ ] Instructions are concise and clear
- [ ] Jargon is avoided or explained
- [ ] Error messages explain how to fix
- [ ] Button labels describe action

### Predictable Design
- [ ] Navigation is consistent across pages
- [ ] Interactive elements look interactive
- [ ] Feedback is immediate and clear
- [ ] No unexpected changes

### Help and Error Prevention
- [ ] Required fields clearly marked
- [ ] Input formats explained (e.g., date format)
- [ ] Confirmation before destructive actions
- [ ] Undo available where possible

### Reading and Focus
- [ ] Text is readable (line length, spacing)
- [ ] Important information is prominent
- [ ] Progress indicators for multi-step processes
- [ ] Distractions minimized
```

---

## 📱 Mobile Accessibility Testing

### iOS VoiceOver Checklist

```markdown
## iOS VoiceOver Testing

### Setup
- Settings > Accessibility > VoiceOver > On
- Practice in VoiceOver Practice app first

### Navigation
- [ ] All elements reachable by swiping
- [ ] Logical reading order
- [ ] Group labels for complex components
- [ ] Custom actions available where needed

### Touch Targets
- [ ] Minimum 44x44 points
- [ ] Adequate spacing between targets
- [ ] Touch target matches visual element

### Gestures
- [ ] Custom gestures have alternatives
- [ ] No timing-dependent actions
- [ ] Drag-and-drop has alternative
```

### Android TalkBack Checklist

```markdown
## Android TalkBack Testing

### Setup
- Settings > Accessibility > TalkBack > On
- Enable Explore by Touch

### Navigation
- [ ] All elements announced
- [ ] Reading order logical
- [ ] Form fields have labels
- [ ] Images have descriptions

### Controls
- [ ] Buttons activate on double-tap
- [ ] Switches announce state
- [ ] Sliders accessible with gestures
```
