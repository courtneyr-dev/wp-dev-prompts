---
name: WordPress Accessibility
description: WCAG 2.1/2.2 Level AA compliance for WordPress themes, plugins, and blocks. Covers automated audits, keyboard navigation, screen reader testing, ARIA patterns, and color contrast.
triggers:
  - accessibility
  - a11y
  - WCAG
  - screen reader
  - keyboard navigation
  - ARIA
  - color contrast
  - focus indicator
  - alt text
  - accessible
---

# WordPress Accessibility

WCAG 2.1/2.2 Level AA compliance for WordPress development. Practical, actionable findings for themes, plugins, and block-based content.

## Review Process

### Step 1: Automated Scan

Check HTML output for common violations:

- Missing or empty alt text on images
- Missing form labels and ARIA attributes
- Heading hierarchy violations (skipped levels)
- Color contrast failures (< 4.5:1 for text, < 3:1 for large text)
- Missing `lang` attribute on `<html>`
- Missing skip navigation links

### Step 2: Keyboard Testing

All interactive elements must be:

- **Focusable** with Tab/Shift+Tab
- **Operable** with Enter/Space
- **Visible** with clear focus indicators
- **Logical** in tab order (follows DOM order)

### Step 3: Screen Reader Compatibility

- Proper ARIA roles and landmarks
- Live regions for dynamic content (`aria-live="polite"`)
- Meaningful link text (no "click here" or bare "read more")
- Table headers (`<th>`) and captions

### Step 4: WordPress-Specific Checks

- Block editor output produces accessible markup
- Admin customizations maintain a11y
- Custom widgets/shortcodes produce accessible HTML
- Theme template parts include proper landmarks

## ARIA Patterns

### Disclosure (Toggle)

```html
<button
    aria-expanded="false"
    aria-controls="panel-1"
>
    Toggle Panel
</button>
<div id="panel-1" hidden>
    Panel content
</div>
```

### Dialog (Modal)

```html
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
    <h2 id="dialog-title">Dialog Title</h2>
    <p>Content here.</p>
    <button>Close</button>
</div>
```

### Navigation Landmark

```html
<nav aria-label="Primary">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about" aria-current="page">About</a></li>
    </ul>
</nav>
```

### Live Region

```html
<div aria-live="polite" aria-atomic="true">
    <!-- Dynamic content updates announced by screen readers -->
</div>
```

## Color Contrast

| Context | Minimum Ratio |
|---|---|
| Normal text (< 18pt) | 4.5:1 |
| Large text (>= 18pt or 14pt bold) | 3:1 |
| UI components & graphics | 3:1 |
| Non-text contrast (borders, icons) | 3:1 |

## WordPress Block Accessibility

### Block Output

```php
// In render.php
<div <?php echo get_block_wrapper_attributes(); ?>>
    <h2><?php echo esc_html( $attributes['title'] ); ?></h2>
    <p><?php echo esc_html( $attributes['description'] ); ?></p>
</div>
```

### Editor Accessibility

```javascript
// Use labels for all controls
<TextControl
    label={ __( 'Title', 'my-plugin' ) }
    value={ title }
    onChange={ setTitle }
/>

// Group related controls
<PanelBody title={ __( 'Settings', 'my-plugin' ) }>
    <ToggleControl
        label={ __( 'Show icon', 'my-plugin' ) }
        checked={ showIcon }
        onChange={ setShowIcon }
    />
</PanelBody>
```

## Severity Levels

**Critical** — blocks core functionality:
- Missing alt text on functional images
- Non-keyboard accessible elements
- Insufficient contrast below 4.5:1
- Unlabeled form inputs

**Major** — significant barrier:
- Missing skip navigation
- No visible focus indicators
- Missing heading hierarchy
- Auto-playing media without controls

**Minor** — usability issue:
- Redundant ARIA attributes
- Missing `aria-current` on active nav items
- Generic link text with context available

## Automated Testing

```bash
# axe-core via Playwright
npx playwright test --grep a11y

# pa11y CLI
npx pa11y https://localhost:8888
```

```javascript
// Playwright a11y test
import AxeBuilder from '@axe-core/playwright';

test( 'homepage is accessible', async ( { page } ) => {
    await page.goto( '/' );
    const results = await new AxeBuilder( { page } ).analyze();
    expect( results.violations ).toHaveLength( 0 );
} );
```

## References

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WordPress Accessibility Handbook](https://make.wordpress.org/accessibility/handbook/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [richtabor/agent-skills](https://github.com/richtabor/agent-skills)
