# Accessibility Presets Prompt

> Generate comprehensive accessibility specifications for UI components.

## System Context

You are an accessibility engineer with deep knowledge of:
- WCAG 2.1/2.2 success criteria
- ARIA Authoring Practices Guide (APG)
- Screen reader behavior (NVDA, JAWS, VoiceOver)
- Keyboard interaction patterns
- Assistive technology compatibility

---

## Prompt Template

```text
You are an accessibility engineer with deep knowledge of WCAG 2.1/2.2.

Generate the accessibility rules for this UI component:
<insert component description here>

Include:

1. **Semantic Structure**
   - Appropriate HTML elements
   - Heading hierarchy considerations
   - Landmark roles if applicable

2. **ARIA Implementation**
   - Required roles
   - Required states and properties
   - Live region needs

3. **Keyboard Interactions**
   - Key mappings
   - Focus management
   - Tab order considerations

4. **Screen Reader Compatibility**
   - Announcements needed
   - Hidden/visible text requirements
   - Name/role/value compliance

5. **Visual Accessibility**
   - Color contrast requirements
   - Focus indication
   - Text scaling support

6. **Motion and Animation**
   - Reduced motion support
   - Animation pause controls

7. **Testing Commands**
   - axe-core rules to check
   - Manual testing steps
   - Playwright assertions

Output as structured markdown with code examples.
```

---

## ARIA Patterns Reference

### Common Widget Patterns

| Pattern | Role | Key ARIA | Keyboard |
|---------|------|----------|----------|
| Button | `button` | `aria-pressed`, `aria-expanded` | Space, Enter |
| Link | `link` | — | Enter |
| Checkbox | `checkbox` | `aria-checked` | Space |
| Radio | `radio` | `aria-checked` | Arrow keys |
| Switch | `switch` | `aria-checked` | Space |
| Slider | `slider` | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` | Arrows |
| Tab | `tab`, `tablist`, `tabpanel` | `aria-selected`, `aria-controls` | Arrow keys |
| Menu | `menu`, `menuitem` | `aria-expanded`, `aria-haspopup` | Arrow keys, Enter |
| Dialog | `dialog` | `aria-modal`, `aria-labelledby` | Escape, Tab trap |
| Alert | `alert` | Live region (implicit) | — |
| Tooltip | `tooltip` | `aria-describedby` | Escape |

---

## Example: Modal Dialog

**Input:**
```text
A modal dialog for confirming destructive actions (delete, etc.)
```

**Output:**

### 1. Semantic Structure

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
  class="modal"
>
  <div class="modal__content">
    <h2 id="dialog-title" class="modal__title">
      Delete Item?
    </h2>
    <p id="dialog-description" class="modal__description">
      This action cannot be undone. The item will be permanently removed.
    </p>
    <div class="modal__actions">
      <button type="button" class="modal__button modal__button--cancel">
        Cancel
      </button>
      <button type="button" class="modal__button modal__button--destructive">
        Delete
      </button>
    </div>
    <button
      type="button"
      class="modal__close"
      aria-label="Close dialog"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</div>

<!-- Backdrop -->
<div class="modal__backdrop" aria-hidden="true"></div>
```

### 2. ARIA Implementation

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `role="dialog"` | Container | Identifies as dialog |
| `aria-modal="true"` | Container | Indicates modal behavior |
| `aria-labelledby` | Container | Points to title |
| `aria-describedby` | Container | Points to description |
| `aria-label` | Close button | Accessible name |
| `aria-hidden="true"` | Backdrop, × icon | Hidden from AT |

**Implementation Notes:**
- `aria-modal="true"` tells AT that content outside is inert
- Both `aria-labelledby` and `aria-describedby` should be present
- Close icon is decorative, button has `aria-label`

### 3. Keyboard Interactions

| Key | Action |
|-----|--------|
| `Tab` | Move focus between dialog controls |
| `Shift+Tab` | Move focus backwards |
| `Escape` | Close the dialog |
| `Enter` | Activate focused button |
| `Space` | Activate focused button |

**Focus Management:**

```javascript
class AccessibleModal {
  constructor(dialog) {
    this.dialog = dialog;
    this.focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    this.previouslyFocused = null;
  }

  open() {
    // Store currently focused element
    this.previouslyFocused = document.activeElement;

    // Show dialog
    this.dialog.hidden = false;
    this.dialog.setAttribute('aria-hidden', 'false');

    // Make rest of page inert
    document.querySelector('main').inert = true;

    // Focus first element (or close button for destructive actions)
    this.dialog.querySelector('.modal__button--cancel')?.focus()
      || this.firstFocusable?.focus();

    // Add event listeners
    this.dialog.addEventListener('keydown', this.handleKeydown);
    document.body.classList.add('modal-open');
  }

  close() {
    // Hide dialog
    this.dialog.hidden = true;
    this.dialog.setAttribute('aria-hidden', 'true');

    // Remove inert
    document.querySelector('main').inert = false;

    // Restore focus
    this.previouslyFocused?.focus();

    // Cleanup
    this.dialog.removeEventListener('keydown', this.handleKeydown);
    document.body.classList.remove('modal-open');
  }

  handleKeydown = (e) => {
    // Escape to close
    if (e.key === 'Escape') {
      this.close();
      return;
    }

    // Tab trap
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === this.firstFocusable) {
        e.preventDefault();
        this.lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === this.lastFocusable) {
        e.preventDefault();
        this.firstFocusable.focus();
      }
    }
  };
}
```

### 4. Screen Reader Compatibility

**Announcements:**

| Event | Announcement |
|-------|--------------|
| Dialog opens | "Delete Item? dialog. This action cannot be undone..." |
| Focus on Cancel | "Cancel, button" |
| Focus on Delete | "Delete, button" |
| Dialog closes | Returns to trigger, no announcement |

**Hidden Text Patterns:**

```html
<!-- Visible to screen readers, hidden visually -->
<span class="screen-reader-text">
  Warning: This is a destructive action.
</span>

<!-- Hidden from screen readers -->
<span aria-hidden="true">&times;</span>

<!-- Screen reader text utility -->
<style>
.screen-reader-text {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
}
</style>
```

### 5. Visual Accessibility

**Color Contrast:**

| Element | Foreground | Background | Ratio Required |
|---------|------------|------------|----------------|
| Title | #1e1e1e | #ffffff | 4.5:1 (AA) |
| Description | #666666 | #ffffff | 4.5:1 (AA) |
| Cancel button | #1e1e1e | #f0f0f0 | 4.5:1 (AA) |
| Delete button | #ffffff | #cc1818 | 4.5:1 (AA) |

**Focus Indication:**

```css
/* Focus ring */
.modal__button:focus {
  outline: 2px solid var(--wp--preset--color--primary, #0073aa);
  outline-offset: 2px;
}

/* Focus visible (keyboard only) */
.modal__button:focus:not(:focus-visible) {
  outline: none;
}

.modal__button:focus-visible {
  outline: 2px solid var(--wp--preset--color--primary, #0073aa);
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .modal__button:focus {
    outline: 3px solid currentColor;
    outline-offset: 3px;
  }

  .modal__button--destructive {
    border: 2px solid currentColor;
  }
}
```

**Text Scaling:**

```css
/* Support up to 200% zoom */
.modal__content {
  max-width: min(90vw, 500px);
  max-height: 90vh;
  overflow-y: auto;
}

.modal__title {
  font-size: clamp(1.25rem, 4vw, 1.5rem);
}

.modal__description {
  font-size: clamp(0.875rem, 3vw, 1rem);
}
```

### 6. Motion and Animation

```css
/* Default animations */
.modal {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 200ms ease, transform 200ms ease;
}

.modal[aria-hidden="false"] {
  opacity: 1;
  transform: scale(1);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .modal {
    transition: none;
  }

  .modal__backdrop {
    transition: none;
  }
}
```

### 7. Testing Commands

**axe-core Rules:**

```javascript
// Playwright with axe-core
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('modal accessibility', async ({ page }) => {
  await page.goto('/page-with-modal');

  // Open modal
  await page.click('[data-open-modal]');
  await page.waitForSelector('[role="dialog"]');

  // Run axe
  const accessibilityScanResults = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test('modal focus management', async ({ page }) => {
  await page.goto('/page-with-modal');

  const trigger = page.locator('[data-open-modal]');
  const modal = page.locator('[role="dialog"]');
  const cancelButton = modal.locator('.modal__button--cancel');

  // Open modal
  await trigger.click();

  // Focus should be in modal
  await expect(cancelButton).toBeFocused();

  // Tab should cycle within modal
  await page.keyboard.press('Tab');
  await expect(modal.locator('.modal__button--destructive')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(modal.locator('.modal__close')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(cancelButton).toBeFocused(); // Cycles back

  // Escape closes and returns focus
  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('modal ARIA attributes', async ({ page }) => {
  await page.goto('/page-with-modal');
  await page.click('[data-open-modal]');

  const modal = page.locator('[role="dialog"]');

  await expect(modal).toHaveAttribute('aria-modal', 'true');
  await expect(modal).toHaveAttribute('aria-labelledby');
  await expect(modal).toHaveAttribute('aria-describedby');

  const labelledBy = await modal.getAttribute('aria-labelledby');
  const describedBy = await modal.getAttribute('aria-describedby');

  await expect(page.locator(`#${labelledBy}`)).toBeVisible();
  await expect(page.locator(`#${describedBy}`)).toBeVisible();
});
```

**Manual Testing Steps:**

1. [ ] Open modal and verify focus moves into it
2. [ ] Tab through all controls - focus should be trapped
3. [ ] Shift+Tab should cycle backwards
4. [ ] Escape should close and return focus to trigger
5. [ ] Screen reader should announce dialog title and description
6. [ ] All buttons should announce their labels
7. [ ] Background content should be inaccessible
8. [ ] With 200% zoom, all content should be visible
9. [ ] With high contrast mode, all controls should be visible
10. [ ] With reduced motion, no animations should occur

---

## WCAG Success Criteria Checklist

| Criterion | Level | Status |
|-----------|-------|--------|
| 1.3.1 Info and Relationships | A | ✅ role="dialog", aria-labelledby |
| 1.4.3 Contrast (Minimum) | AA | ✅ 4.5:1 for all text |
| 1.4.11 Non-text Contrast | AA | ✅ Focus indicator visible |
| 2.1.1 Keyboard | A | ✅ All controls accessible |
| 2.1.2 No Keyboard Trap | A | ✅ Escape closes dialog |
| 2.4.3 Focus Order | A | ✅ Logical tab order |
| 2.4.6 Headings and Labels | AA | ✅ Dialog has title |
| 2.4.7 Focus Visible | AA | ✅ Clear focus indication |
| 4.1.2 Name, Role, Value | A | ✅ All controls labeled |
