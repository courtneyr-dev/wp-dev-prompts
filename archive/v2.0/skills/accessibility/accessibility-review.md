# Accessibility Review

> **Type**: Skill
> **Domain**: accessibility
> **Source**: [richtabor/agent-skills](https://github.com/richtabor/agent-skills/tree/main/skills/accessibility-review)

<skill>
<summary>
Manual accessibility reviews against WCAG 2.1/2.2 Level AA standards with prioritized, stepped findings.
</summary>

<knowledge>
## When to Use

Activate this skill when users ask:
- "Is this accessible?"
- "Check accessibility"
- "Review contrast/a11y"

## Review Process

### Step 1: Identify the Target

Determine what needs reviewing: component, page, code, or mockup.

### Step 2: Conduct Manual Review

Assess against the four WCAG principles:

**Perceivable**
- Contrast ratios (4.5:1 normal text, 3:1 large text)
- Alt text for images
- Proper heading structure

**Operable**
- Keyboard navigation
- Focus indicators
- Interactive element accessibility

**Understandable**
- Form labels
- Error messages
- Consistent patterns

**Robust**
- Valid HTML
- Proper ARIA usage
- Cross-browser compatibility

### Step 3: Prioritize Findings

**Critical** — Blocks core functionality:
- Missing alt text on functional images
- Non-keyboard accessible elements
- Insufficient contrast (below 4.5:1 normal, 3:1 large)
- Unlabeled form inputs
- Missing focus indicators
- Inaccessible modals/dialogs
- Auto-playing media without controls

**Warning** — Creates friction:
- Skipped heading levels
- Missing ARIA landmarks
- Unclear link text ("click here")
- Touch targets under 44x44px
- Missing skip links
- Non-descriptive error messages

### Step 4: Stepped Review

Present issues one at a time:
1. Describe the problem
2. Reference location
3. Explain user impact
4. Recommend fix
5. Wait for user decision: Fix, Ignore (with reason), or Clarify

### Step 5: Final Summary

Document:
- Issues fixed
- Issues ignored (with reasons)
- Remaining concerns

## Output Format

For each issue:

```
**[Critical/Warning] [Issue Type]**
Location: [where in code/UI]
Impact: [who is affected and how]
Fix: [specific recommendation]

Ready to fix this? (yes/no/skip)
```

## Common Patterns

### React/JSX Accessibility

```jsx
// Good: Accessible button
<button
  onClick={handleClick}
  aria-label="Close dialog"
>
  <CloseIcon aria-hidden="true" />
</button>

// Bad: Inaccessible div as button
<div onClick={handleClick}>
  <CloseIcon />
</div>
```

### Form Accessibility

```html
<!-- Good: Properly labeled -->
<label for="email">Email address</label>
<input type="email" id="email" required aria-describedby="email-hint">
<span id="email-hint">We'll never share your email</span>

<!-- Bad: Missing label -->
<input type="email" placeholder="Email">
```
</knowledge>

<best_practices>
- Present issues one at a time to avoid overwhelming users
- Always explain the "why" — who is impacted and how
- Prioritize by severity: fix blockers before friction issues
- Be pragmatic, not pedantic — focus on real user impact
</best_practices>

<references>
- [richtabor/agent-skills](https://github.com/richtabor/agent-skills/tree/main/skills/accessibility-review)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
</references>
</skill>
