# Component Design Prompt

> Generate accessible, responsive UI components for WordPress with design rationale.

## System Context

You are an expert UI/UX and WordPress front-end engineer specializing in:
- Accessible component design (WCAG 2.1 AA)
- Responsive, mobile-first development
- WordPress block editor integration
- Theme-aware styling with CSS custom properties

---

## Prompt Template

```text
You are an expert UI/UX and WordPress front-end engineer.

I need you to generate a UI component for WordPress that:
1. Is accessible (WCAG 2.1 AA compliant)
2. Works responsively across mobile, tablet, desktop
3. Has a clear visual hierarchy
4. Includes both markup and CSS (or styles for a block)
5. Integrates with WordPress theme global styles

The component should include:
- HTML or JSX/React (if block)
- CSS variables or classes
- ARIA roles & labels
- Mobile/tablet/desktop responsive rules

Also provide:
- A short explanation of the design decisions (layout, spacing, font sizes)
- How it adapts across breakpoints
- Accessibility considerations

Use design systems principles: clarity, consistency, and hierarchy.

Now generate a component for this description:
<insert component description here>
```

---

## Example: Card Component

**Input:**
```text
Create a feature card with icon, heading, description, and link.
```

**Output:**

### Design Decisions

**Layout:** Vertical stack with consistent spacing. Icon provides visual anchor, heading establishes hierarchy, description gives context, link provides action.

**Spacing:** Using 8px base unit (WordPress default). Card padding: 24px (3 units). Element gap: 16px (2 units).

**Typography:**
- Heading: 1.25rem, 600 weight
- Description: 1rem, 400 weight, muted color
- Link: 1rem, 600 weight, accent color

### HTML Markup

```html
<article class="wp-block-my-plugin-feature-card">
  <div class="feature-card__icon" aria-hidden="true">
    <svg><!-- Icon SVG --></svg>
  </div>
  <h3 class="feature-card__heading">Feature Title</h3>
  <p class="feature-card__description">
    Brief description of this feature and its benefits to users.
  </p>
  <a href="#" class="feature-card__link">
    Learn more
    <span class="screen-reader-text">about Feature Title</span>
  </a>
</article>
```

### React/JSX (Block)

```jsx
import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';

export default function FeatureCard({ attributes, setAttributes }) {
  const blockProps = useBlockProps({
    className: 'wp-block-my-plugin-feature-card',
  });

  return (
    <article {...blockProps}>
      <div className="feature-card__icon" aria-hidden="true">
        <Icon icon={attributes.icon} size={48} />
      </div>
      <RichText
        tagName="h3"
        className="feature-card__heading"
        value={attributes.heading}
        onChange={(heading) => setAttributes({ heading })}
        placeholder="Feature title..."
      />
      <RichText
        tagName="p"
        className="feature-card__description"
        value={attributes.description}
        onChange={(description) => setAttributes({ description })}
        placeholder="Feature description..."
      />
      <RichText
        tagName="a"
        className="feature-card__link"
        value={attributes.linkText}
        onChange={(linkText) => setAttributes({ linkText })}
        placeholder="Learn more"
      />
    </article>
  );
}
```

### CSS Styles

```css
.wp-block-my-plugin-feature-card {
  /* Use theme CSS variables */
  --card-padding: var(--wp--preset--spacing--40, 1.5rem);
  --card-gap: var(--wp--preset--spacing--20, 1rem);
  --card-bg: var(--wp--preset--color--surface, #ffffff);
  --card-border: var(--wp--preset--color--border, #e0e0e0);
  --card-radius: var(--wp--custom--border-radius--medium, 8px);
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  gap: var(--card-gap);
  padding: var(--card-padding);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

/* Hover state */
.wp-block-my-plugin-feature-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* Focus within for keyboard navigation */
.wp-block-my-plugin-feature-card:focus-within {
  outline: 2px solid var(--wp--preset--color--primary, #0073aa);
  outline-offset: 2px;
}

/* Icon */
.feature-card__icon {
  width: 48px;
  height: 48px;
  color: var(--wp--preset--color--primary, #0073aa);
}

.feature-card__icon svg {
  width: 100%;
  height: 100%;
}

/* Heading */
.feature-card__heading {
  margin: 0;
  font-size: var(--wp--preset--font-size--medium, 1.25rem);
  font-weight: 600;
  line-height: 1.3;
  color: var(--wp--preset--color--contrast, #1e1e1e);
}

/* Description */
.feature-card__description {
  margin: 0;
  font-size: var(--wp--preset--font-size--small, 1rem);
  line-height: 1.6;
  color: var(--wp--preset--color--secondary, #666666);
}

/* Link */
.feature-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  font-size: var(--wp--preset--font-size--small, 1rem);
  font-weight: 600;
  color: var(--wp--preset--color--primary, #0073aa);
  text-decoration: none;
}

.feature-card__link:hover {
  text-decoration: underline;
}

.feature-card__link:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Screen reader text */
.screen-reader-text {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}

/* Responsive: Mobile */
@media (max-width: 599px) {
  .wp-block-my-plugin-feature-card {
    --card-padding: var(--wp--preset--spacing--30, 1rem);
  }

  .feature-card__icon {
    width: 40px;
    height: 40px;
  }
}

/* Responsive: Tablet and up */
@media (min-width: 600px) {
  /* Cards in grid context */
  .wp-block-columns .wp-block-my-plugin-feature-card {
    height: 100%;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .wp-block-my-plugin-feature-card {
    border-width: 2px;
  }

  .feature-card__link {
    text-decoration: underline;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .wp-block-my-plugin-feature-card {
    transition: none;
  }

  .wp-block-my-plugin-feature-card:hover {
    transform: none;
  }
}
```

### Accessibility Considerations

1. **Semantic HTML:** Using `<article>` for self-contained content
2. **Heading hierarchy:** `<h3>` assumes cards are within a section with `<h2>`
3. **Decorative icon:** `aria-hidden="true"` hides icon from screen readers
4. **Link context:** Screen reader text provides full context ("Learn more about Feature Title")
5. **Focus indication:** Visible focus states for keyboard navigation
6. **Color contrast:** Using theme variables that should meet 4.5:1 ratio

### Breakpoint Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<600px) | Reduced padding, smaller icon |
| Tablet (600-1024px) | Default sizing, works in columns |
| Desktop (>1024px) | Full sizing, enhanced hover effects |

---

## Usage Notes

- Always test components with theme variations
- Use WordPress preset CSS variables for consistency
- Test with keyboard navigation and screen readers
- Verify color contrast in all themes
