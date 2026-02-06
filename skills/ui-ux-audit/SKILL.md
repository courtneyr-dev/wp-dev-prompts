---
name: UI/UX Audit & Motion Design
description: UI/UX review with motion design specifications. Covers animation principles, easing tokens, duration guidelines, WordPress Design System (WPDS) patterns, and interaction audit methodology.
triggers:
  - UI audit
  - UX review
  - motion design
  - animation
  - easing
  - transition
  - interaction design
  - design system
  - WPDS
---

# UI/UX Audit & Motion Design

UI/UX evaluation with motion design specifications for product interfaces. Covers animation principles, easing tokens, and the WordPress Design System.

## Motion Design Principles

Every animation needs a job. If it has no job, don't animate.

### Purpose Categories

- **Responsiveness** — acknowledge user input (< 100ms)
- **Spatial continuity** — show where things go (120-200ms)
- **Understanding** — reveal structure/hierarchy (200-300ms)
- **Delight** — intentional moments of joy (use sparingly)

### Duration Guidelines

| Frequency | Duration | Example |
|---|---|---|
| High (repeated) | < 100ms | Button press, checkbox toggle |
| Medium | 120-240ms | Dropdown open, panel slide |
| Low (rare) | 200-300ms | Modal entrance, page transition |

Never exceed 300ms for UI animations. Users perceive anything longer as sluggish.

### Easing Selection

| Pattern | Easing | When |
|---|---|---|
| Enter | ease-out | Elements appearing |
| Exit | ease-in | Elements leaving |
| Move | ease-in-out | Elements changing position |
| Micro | linear or ease-out | Tiny feedback (hover, press) |

### CSS Implementation

```css
/* Standard tokens */
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1.0);
--ease-in: cubic-bezier(0.4, 0.0, 1.0, 1.0);
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1.0);
--duration-fast: 100ms;
--duration-normal: 200ms;
--duration-slow: 300ms;

/* Usage */
.panel {
    transition: transform var(--duration-normal) var(--ease-out);
}
```

## UI Audit Checklist

### Visual Consistency

- [ ] Typography scale follows design system
- [ ] Color usage matches brand tokens
- [ ] Spacing follows 4px/8px grid
- [ ] Icons are consistent style and size
- [ ] Border radius follows design tokens

### Interaction Patterns

- [ ] Interactive elements have hover/focus/active states
- [ ] Loading states are present for async operations
- [ ] Error states provide clear guidance
- [ ] Empty states are designed (not just blank)
- [ ] Destructive actions require confirmation

### Responsive Behavior

- [ ] Layout adapts to mobile, tablet, desktop
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Text remains readable at all breakpoints
- [ ] Images scale appropriately

### WordPress Admin Consistency

- [ ] Uses WordPress admin color scheme variables
- [ ] Matches WordPress admin UI patterns
- [ ] Admin notices use proper classes (`notice-success`, `notice-error`)
- [ ] Settings pages follow WordPress Settings API layout

## WordPress Design System (WPDS)

### Component Usage

Use `@wordpress/components` for admin interfaces:

```javascript
import {
    Button,
    TextControl,
    ToggleControl,
    PanelBody,
    Notice,
} from '@wordpress/components';
```

### Admin Color Variables

```css
/* Use WordPress admin CSS variables */
.my-admin-panel {
    color: var(--wp-admin-theme-color);
    background: #f0f0f1;
}
```

## References

- [WordPress Design System](https://make.wordpress.org/design/)
- [richtabor/agent-skills](https://github.com/richtabor/agent-skills)
- [Material Design Motion](https://m3.material.io/styles/motion/overview)
