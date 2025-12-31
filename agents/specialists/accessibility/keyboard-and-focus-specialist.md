# ⌨️ Keyboard and Focus Specialist

> **Type**: Specialist
> **Domain**: Keyboard Accessibility
> **Authority**: Focus management, keyboard navigation, focus traps

## 🎯 Mission

Ensure complete keyboard accessibility for all interactive elements. Own focus management, keyboard navigation patterns, focus traps for modals, and skip links.

## 📥 Inputs

- Interactive components
- Navigation patterns
- Modal/dialog requirements
- Focus order requirements

## 📤 Outputs

- Keyboard navigation specs
- Focus management code
- Focus trap implementations
- Skip link patterns

---

## 🔧 When to Use

✅ **Use this agent when:**
- Implementing keyboard navigation
- Creating modal focus traps
- Managing focus on dynamic content
- Adding skip links
- Testing keyboard-only access

❌ **Don't use for:**
- Screen reader testing
- ARIA attribute auditing
- Visual testing
- Automated a11y scanning

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Focus lost on dynamic updates | Manage focus programmatically |
| No visible focus indicator | Ensure focus styles visible |
| Trapped focus in modals | Proper focus trap with escape |
| Tab order doesn't match visual | Use DOM order, not tabindex |
| Custom components not keyboard accessible | Implement full keyboard support |

---

## ✅ Checklist

### Basic Navigation
- [ ] All interactive elements focusable
- [ ] Tab order matches visual flow
- [ ] Focus visible on all elements
- [ ] Skip link to main content

### Custom Components
- [ ] Arrow keys for lists/menus
- [ ] Enter/Space for activation
- [ ] Escape for dismissal
- [ ] Home/End for boundaries

### Focus Management
- [ ] Focus moves to new content
- [ ] Focus restored on close
- [ ] Focus trapped in modals
- [ ] Focus visible after JS updates

### Testing
- [ ] Complete keyboard-only navigation
- [ ] No keyboard traps (except modals)
- [ ] Works without JavaScript
- [ ] Tested with screen reader

---

## 💬 Example Prompts

### Claude Code
```
@keyboard-and-focus-specialist Implement keyboard navigation for
this dropdown menu. Need arrow keys for navigation, Enter to select,
Escape to close.
```

### Cursor
```
Using keyboard-and-focus-specialist, add a focus trap to this
modal. Focus should loop through interactive elements and
Escape should close.
```

### GitHub Copilot
```
# Keyboard Task: Tab Panel Navigation
#
# Create keyboard navigation for tabs:
# - Arrow Left/Right between tabs
# - Home/End for first/last
# - Tab moves to panel content
# - Focus visible on all elements
```

### General Prompt
```
Make this custom autocomplete component keyboard accessible:
1. Arrow keys navigate suggestions
2. Enter selects current suggestion
3. Escape closes suggestions
4. Type-ahead filters options
5. Focus management when opening/closing
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [a11y-tree-and-aria-auditor](a11y-tree-and-aria-auditor.md) | ARIA for keyboard |
| [manual-a11y-protocol](manual-a11y-protocol.md) | Keyboard testing |
| [e2e-playwright](../testing/e2e-playwright.md) | Keyboard tests |
| [storybook-a11y-specialist](storybook-a11y-specialist.md) | Component keyboard |

---

## 📋 Focus Management Patterns

### Focus Trap for Modal

```typescript
// Focus trap implementation
class FocusTrap {
    private container: HTMLElement;
    private previouslyFocused: Element | null = null;
    private focusableElements: HTMLElement[] = [];

    constructor(container: HTMLElement) {
        this.container = container;
    }

    activate(): void {
        // Store current focus
        this.previouslyFocused = document.activeElement;

        // Get focusable elements
        this.focusableElements = Array.from(
            this.container.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ).filter(el => !el.hasAttribute('disabled'));

        // Focus first element
        if (this.focusableElements.length > 0) {
            this.focusableElements[0].focus();
        }

        // Add event listeners
        this.container.addEventListener('keydown', this.handleKeydown);
    }

    deactivate(): void {
        this.container.removeEventListener('keydown', this.handleKeydown);

        // Restore focus
        if (this.previouslyFocused instanceof HTMLElement) {
            this.previouslyFocused.focus();
        }
    }

    private handleKeydown = (event: KeyboardEvent): void => {
        if (event.key !== 'Tab') return;

        const first = this.focusableElements[0];
        const last = this.focusableElements[this.focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    };
}

// Usage
const modal = document.querySelector('.modal');
const trap = new FocusTrap(modal);

function openModal() {
    modal.removeAttribute('hidden');
    trap.activate();
}

function closeModal() {
    modal.setAttribute('hidden', '');
    trap.deactivate();
}
```

### React Focus Trap Hook

```tsx
import { useEffect, useRef } from 'react';

function useFocusTrap(isActive: boolean) {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<Element | null>(null);

    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        // Store previous focus
        previousFocusRef.current = document.activeElement;

        // Get focusable elements
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        // Focus first element
        if (focusable.length > 0) {
            focusable[0].focus();
        }

        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);

            // Restore focus
            if (previousFocusRef.current instanceof HTMLElement) {
                previousFocusRef.current.focus();
            }
        };
    }, [isActive]);

    return containerRef;
}

// Usage
function Modal({ isOpen, onClose, children }) {
    const containerRef = useFocusTrap(isOpen);

    if (!isOpen) return null;

    return (
        <div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
        >
            {children}
        </div>
    );
}
```

---

## ⌨️ Keyboard Navigation Patterns

### Menu Navigation

```typescript
class MenuKeyboardNav {
    private items: HTMLElement[];
    private currentIndex: number = 0;

    constructor(container: HTMLElement) {
        this.items = Array.from(container.querySelectorAll('[role="menuitem"]'));
        container.addEventListener('keydown', this.handleKeydown);
    }

    private handleKeydown = (event: KeyboardEvent): void => {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.focusNext();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.focusPrevious();
                break;
            case 'Home':
                event.preventDefault();
                this.focusFirst();
                break;
            case 'End':
                event.preventDefault();
                this.focusLast();
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                this.activateCurrent();
                break;
            case 'Escape':
                event.preventDefault();
                this.close();
                break;
        }
    };

    private focusNext(): void {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.items[this.currentIndex].focus();
    }

    private focusPrevious(): void {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.items[this.currentIndex].focus();
    }

    private focusFirst(): void {
        this.currentIndex = 0;
        this.items[0].focus();
    }

    private focusLast(): void {
        this.currentIndex = this.items.length - 1;
        this.items[this.currentIndex].focus();
    }

    private activateCurrent(): void {
        this.items[this.currentIndex].click();
    }

    private close(): void {
        // Emit close event
        this.items[0].closest('[role="menu"]')?.dispatchEvent(
            new CustomEvent('close', { bubbles: true })
        );
    }
}
```

### Tab Panel Navigation

```typescript
class TabPanelKeyboard {
    private tabs: HTMLElement[];
    private panels: HTMLElement[];
    private currentIndex: number = 0;

    constructor(tablist: HTMLElement) {
        this.tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
        this.panels = this.tabs.map(tab =>
            document.getElementById(tab.getAttribute('aria-controls')!)!
        );

        tablist.addEventListener('keydown', this.handleKeydown);
    }

    private handleKeydown = (event: KeyboardEvent): void => {
        switch (event.key) {
            case 'ArrowRight':
                event.preventDefault();
                this.selectNext();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.selectPrevious();
                break;
            case 'Home':
                event.preventDefault();
                this.selectFirst();
                break;
            case 'End':
                event.preventDefault();
                this.selectLast();
                break;
        }
    };

    private select(index: number): void {
        // Update ARIA
        this.tabs.forEach((tab, i) => {
            tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
            tab.setAttribute('tabindex', i === index ? '0' : '-1');
        });

        // Update panels
        this.panels.forEach((panel, i) => {
            panel.hidden = i !== index;
        });

        // Focus new tab
        this.tabs[index].focus();
        this.currentIndex = index;
    }

    private selectNext(): void {
        this.select((this.currentIndex + 1) % this.tabs.length);
    }

    private selectPrevious(): void {
        this.select((this.currentIndex - 1 + this.tabs.length) % this.tabs.length);
    }

    private selectFirst(): void {
        this.select(0);
    }

    private selectLast(): void {
        this.select(this.tabs.length - 1);
    }
}
```

---

## 🔍 Testing Keyboard Navigation

### Playwright Tests

```typescript
// tests/e2e/keyboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation', () => {
    test('can navigate menu with arrow keys', async ({ page }) => {
        await page.goto('/menu-demo');

        // Open menu
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        // Navigate with arrows
        await page.keyboard.press('ArrowDown');
        await expect(page.locator('[role="menuitem"]:nth-child(2)')).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(page.locator('[role="menuitem"]:nth-child(3)')).toBeFocused();

        // Home/End
        await page.keyboard.press('Home');
        await expect(page.locator('[role="menuitem"]:first-child')).toBeFocused();

        await page.keyboard.press('End');
        await expect(page.locator('[role="menuitem"]:last-child')).toBeFocused();

        // Close with Escape
        await page.keyboard.press('Escape');
        await expect(page.locator('[role="menu"]')).toBeHidden();
    });

    test('modal traps focus', async ({ page }) => {
        await page.goto('/modal-demo');

        // Open modal
        await page.click('[data-testid="open-modal"]');

        // Tab through all elements
        const focusableCount = await page.locator('.modal button, .modal input').count();

        for (let i = 0; i < focusableCount + 1; i++) {
            await page.keyboard.press('Tab');
        }

        // Should loop back to first element
        await expect(page.locator('.modal button:first-of-type')).toBeFocused();
    });

    test('focus returns after modal close', async ({ page }) => {
        await page.goto('/modal-demo');

        const trigger = page.getByTestId('open-modal');
        await trigger.click();

        // Close modal
        await page.keyboard.press('Escape');

        // Focus should return to trigger
        await expect(trigger).toBeFocused();
    });
});
```

### Focus Visible Testing

```typescript
test('focus indicator is visible', async ({ page }) => {
    await page.goto('/form');

    // Tab to first input
    await page.keyboard.press('Tab');

    const input = page.locator('input:first-of-type');
    await expect(input).toBeFocused();

    // Check focus style is applied
    const outline = await input.evaluate(el =>
        getComputedStyle(el).outlineWidth
    );
    expect(outline).not.toBe('0px');
});
```

---

## 🎨 Focus Styles

```css
/* Base focus style */
:focus-visible {
    outline: 2px solid #0073aa;
    outline-offset: 2px;
}

/* Remove default outline when using focus-visible */
:focus:not(:focus-visible) {
    outline: none;
}

/* High contrast focus for buttons */
button:focus-visible {
    outline: 2px solid #0073aa;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 115, 170, 0.3);
}

/* Skip link */
.skip-link {
    position: absolute;
    left: -9999px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

.skip-link:focus {
    position: fixed;
    top: 10px;
    left: 10px;
    width: auto;
    height: auto;
    padding: 1rem;
    background: #fff;
    z-index: 9999;
}
```

---

## 📋 Skip Link Pattern

```html
<body>
    <a href="#main-content" class="skip-link">
        Skip to main content
    </a>

    <header><!-- Navigation --></header>

    <main id="main-content" tabindex="-1">
        <!-- Main content -->
    </main>
</body>
```

```css
#main-content:focus {
    outline: none; /* Focus managed programmatically */
}
```
