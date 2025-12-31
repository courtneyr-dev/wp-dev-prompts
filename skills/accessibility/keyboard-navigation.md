# Keyboard Navigation

> **Type**: Skill
> **Domain**: Accessibility
> **Focus**: Implementing keyboard-accessible WordPress components

<skill>
<summary>
Building keyboard-accessible interfaces for WordPress plugins and blocks following WCAG guidelines.
</summary>

<knowledge>
## Core Requirements

### All Functionality via Keyboard

```javascript
// Every interactive element must be keyboard accessible
// Click handlers need keyboard equivalents

// BAD: Only click handler
element.addEventListener('click', handler);

// GOOD: Click + keyboard handlers
element.addEventListener('click', handler);
element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler(e);
    }
});
```

### Focus Management

```javascript
// Ensure focus is visible
:focus {
    outline: 2px solid #005fcc;
    outline-offset: 2px;
}

// Don't remove focus outline
:focus {
    outline: none; /* NEVER do this without alternative */
}

// Proper focus visible styling
:focus-visible {
    outline: 2px solid #005fcc;
    outline-offset: 2px;
}

:focus:not(:focus-visible) {
    outline: none; /* OK - hide for mouse, show for keyboard */
}
```

## Tab Order

### Natural Tab Order

```html
<!-- Good: Natural DOM order follows visual order -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>

<!-- Bad: DOM order doesn't match visual order -->
<footer>...</footer>
<main>...</main>
<header>...</header>
```

### Skip Links

```php
// Add skip link for repeated navigation
add_action( 'wp_body_open', function() {
    ?>
    <a class="skip-link screen-reader-text" href="#main-content">
        <?php esc_html_e( 'Skip to content', 'my-plugin' ); ?>
    </a>
    <?php
} );
```

```css
.skip-link {
    position: absolute;
    left: -9999px;
    z-index: 999999;
    padding: 1rem;
    background: #fff;
    color: #000;
}

.skip-link:focus {
    left: 0;
    top: 0;
}
```

### tabindex Usage

```html
<!-- tabindex="0" - Add to tab order -->
<div role="button" tabindex="0">Custom button</div>

<!-- tabindex="-1" - Programmatically focusable only -->
<div id="modal" tabindex="-1">Modal content</div>

<!-- AVOID: tabindex > 0 disrupts natural order -->
<button tabindex="5">Don't do this</button>
```

## Interactive Components

### Custom Buttons

```jsx
// WordPress component approach
import { Button } from '@wordpress/components';

function MyButton({ onClick }) {
    return (
        <Button onClick={onClick} variant="primary">
            Click me
        </Button>
    );
}

// Custom implementation if needed
function CustomButton({ onClick, children }) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e);
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className="custom-button"
        >
            {children}
        </div>
    );
}
```

### Dropdown Menus

```jsx
import { useState, useRef, useEffect } from '@wordpress/element';

function AccessibleDropdown({ options, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setActiveIndex(0);
                } else {
                    setActiveIndex((prev) =>
                        prev < options.length - 1 ? prev + 1 : prev
                    );
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
                break;

            case 'Enter':
            case ' ':
                e.preventDefault();
                if (isOpen && activeIndex >= 0) {
                    onSelect(options[activeIndex]);
                    setIsOpen(false);
                    buttonRef.current?.focus();
                } else {
                    setIsOpen(true);
                }
                break;

            case 'Escape':
                setIsOpen(false);
                buttonRef.current?.focus();
                break;
        }
    };

    return (
        <div onKeyDown={handleKeyDown}>
            <button
                ref={buttonRef}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                Select option
            </button>

            {isOpen && (
                <ul role="listbox" ref={menuRef}>
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            role="option"
                            aria-selected={index === activeIndex}
                            className={index === activeIndex ? 'active' : ''}
                            onClick={() => {
                                onSelect(option);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
```

### Modal Dialogs

```jsx
import { useEffect, useRef } from '@wordpress/element';
import { Modal } from '@wordpress/components';

function AccessibleModal({ isOpen, onClose, children }) {
    const previousFocus = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Store current focus
            previousFocus.current = document.activeElement;
        } else {
            // Restore focus when closing
            previousFocus.current?.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Modal
            title="Dialog Title"
            onRequestClose={onClose}
            // WordPress Modal handles focus trap automatically
        >
            {children}
        </Modal>
    );
}

// Or custom implementation with focus trap
function CustomModal({ isOpen, onClose, children }) {
    const modalRef = useRef(null);
    const firstFocusable = useRef(null);
    const lastFocusable = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements?.length) {
            firstFocusable.current = focusableElements[0];
            lastFocusable.current = focusableElements[focusableElements.length - 1];
            firstFocusable.current.focus();
        }
    }, [isOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
            return;
        }

        if (e.key !== 'Tab') return;

        // Trap focus within modal
        if (e.shiftKey && document.activeElement === firstFocusable.current) {
            e.preventDefault();
            lastFocusable.current?.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable.current) {
            e.preventDefault();
            firstFocusable.current?.focus();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={modalRef}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <h2 id="modal-title">Dialog Title</h2>
            {children}
            <button onClick={onClose}>Close</button>
        </div>
    );
}
```

## Block Editor Accessibility

### Block Controls

```jsx
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

function MyBlockEdit({ attributes, setAttributes }) {
    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="editor-bold"
                        label="Bold" // Screen reader label
                        isPressed={attributes.isBold}
                        onClick={() => setAttributes({ isBold: !attributes.isBold })}
                    />
                </ToolbarGroup>
            </BlockControls>
            {/* Block content */}
        </>
    );
}
```

### Custom Block Interactions

```jsx
// Make custom block content keyboard accessible
function EditableBlock({ content, onChange }) {
    const handleKeyDown = (e) => {
        // Handle keyboard shortcuts
        if (e.key === 'Delete' && e.shiftKey) {
            e.preventDefault();
            // Delete item
        }
    };

    return (
        <div
            role="region"
            aria-label="Editable content"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {content.map((item, index) => (
                <div
                    key={item.id}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`Item ${index + 1}: ${item.title}`}
                >
                    {item.title}
                </div>
            ))}
        </div>
    );
}
```

## Testing Keyboard Navigation

### Manual Testing

```
1. Tab through entire page
2. Verify all interactive elements receive focus
3. Check focus order matches visual order
4. Test Enter/Space activates buttons and links
5. Test Escape closes modals/dropdowns
6. Verify no keyboard traps
```

### Automated Testing

```javascript
import { test, expect } from '@playwright/test';

test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');

    // Tab to first interactive element
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.tagName);
    expect(focused).not.toBe('BODY');

    // Skip link should be first
    await expect(page.locator(':focus')).toHaveClass(/skip-link/);

    // Can activate with Enter
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
});

test('modal traps focus', async ({ page }) => {
    await page.goto('/page-with-modal');

    // Open modal
    await page.click('button[aria-haspopup="dialog"]');

    // Tab should stay within modal
    for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        const focused = await page.$eval(':focus', (el) =>
            el.closest('[role="dialog"]') !== null
        );
        expect(focused).toBe(true);
    }

    // Escape closes modal
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
});
```
</knowledge>

<best_practices>
- All functionality must work with keyboard
- Focus must be visible at all times
- Tab order must match visual order
- Modals must trap focus
- Escape should close overlays
- Focus should return to trigger element
</best_practices>

<commands>
```bash
# Run keyboard tests
npx playwright test --grep keyboard

# Check tab order
# Manual: Tab through page in browser

# Lighthouse accessibility
npx lighthouse http://localhost:8888 --only-categories=accessibility
```
</commands>
</skill>
