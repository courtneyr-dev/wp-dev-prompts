# Easing and Duration Tokens

> **Source**: [richtabor/agent-skills](https://github.com/richtabor/agent-skills/tree/main/skills/motion-design/references)

## Easing Curves

### Ease-Out Family

For elements appearing or entering. Fast initial acceleration creates responsiveness.

```css
--ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);        /* Default for enter/exit */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

### Ease-In-Out Family

For repositioning or morphing elements already visible on screen.

```css
--ease-in-out-quad: cubic-bezier(0.45, 0, 0.55, 1);
--ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);    /* Default for layout */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
```

### Ease-In Family

Rarely used. Reserved for permanent exits or anticipatory motion.

```css
--ease-in-quad: cubic-bezier(0.55, 0.08, 0.68, 0.53);
--ease-in-cubic: cubic-bezier(0.32, 0, 0.67, 0);
```

### Special Purpose

```css
--ease-linear: linear;           /* Progress bars, time-based */
--ease-default: ease;            /* Hover states, subtle feedback */
```

## Duration Tokens

### Standard Scale

```css
--dur-instant: 0ms;       /* Keyboard navigation */
--dur-1: 120ms;           /* Micro feedback, toggles */
--dur-2: 180ms;           /* Standard enter/exit */
--dur-3: 240ms;           /* Layout changes, morphs */
--dur-4: 300ms;           /* Larger elements */
--dur-5: 400ms;           /* Complex transitions (rare) */
```

### Context-Specific

```css
--dur-hover: 150ms;       /* Hover state transitions */
--dur-tooltip-delay: 300ms; /* Initial tooltip delay */
--dur-tooltip-delay-subsequent: 0ms; /* Subsequent tooltips */
--dur-illustrative: 700ms;  /* Marketing, onboarding */
```

## Quick Reference Table

| Scenario | Easing | Duration |
|----------|--------|----------|
| Button press feedback | `ease-out-quart` | 120ms |
| Dropdown open | `ease-out-quart` | 180ms |
| Dropdown close | `ease-out-quart` | 150ms |
| Modal enter | `ease-out-quart` | 240ms |
| Modal exit | `ease-out-quart` | 180ms |
| Tab switch | `ease-in-out-cubic` | 180ms |
| Accordion expand | `ease-in-out-cubic` | 240ms |
| Hover state | `ease` | 150ms |
| Focus ring | `ease-out-quad` | 120ms |
| Tooltip appear | `ease-out-quad` | 150ms |
| Progress bar | `linear` | varies |
| Skeleton pulse | `ease-in-out-quad` | 1500ms |

## CSS Custom Properties

Copy these to your stylesheet:

```css
:root {
  /* Easing */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);

  /* Durations */
  --dur-1: 120ms;
  --dur-2: 180ms;
  --dur-3: 240ms;
  --dur-4: 300ms;
  --dur-hover: 150ms;
}
```

## Performance Guidelines

### Safe to Animate

These properties are GPU-accelerated:
- `transform` (translate, scale, rotate)
- `opacity`

### Avoid Animating

These trigger layout recalculation:
- `width`, `height`
- `margin`, `padding`
- `top`, `left`, `right`, `bottom`
- `font-size`

### Use Sparingly

- `backdrop-filter: blur()` — Keep under 20px
- `box-shadow` — Prefer opacity transitions
- `will-change` — Only when needed, remove after

## Reduced Motion

Always respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
