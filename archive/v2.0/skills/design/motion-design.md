# Motion Design

> **Type**: Skill
> **Domain**: design/motion
> **Source**: [richtabor/agent-skills](https://github.com/richtabor/agent-skills/tree/main/skills/motion-design)

<skill>
<summary>
Motion specifications (easing, duration) for product UI interactions, grounded in purpose and context.
</summary>

<knowledge>
## Core Philosophy

Every animation needs a job. If it has no job, don't animate.

## Process

### Phase 1: Load References

Before making recommendations, consult:
- `references/decision-tree.md` — Easing selection flowchart
- `references/easing-tokens.md` — Curves and timing values

### Phase 2: Evaluate Animation

Assess across three dimensions:

**Purpose**
- Responsiveness — Acknowledge user input
- Spatial continuity — Show where things go
- Understanding — Reveal structure/hierarchy
- Delight — Intentional moments of joy (use sparingly)

**Frequency**
- High — Instant or near-instant (under 100ms)
- Medium — 120-240ms
- Low — Up to 300ms (rarely exceed)

**Pattern Type**
- Enter/Exit — Elements appearing/disappearing
- Morph — On-screen transformations
- Time-based — Progress indicators
- Hover — Subtle state changes
- Keyboard — Direct manipulation feel

### Phase 3: Deliver Recommendation

Use standardized output format:

```
Component: [name]
Trigger: [user action]
Purpose: [responsiveness/continuity/understanding/delight]
Frequency: [high/medium/low]

Easing: [token name]
Duration: [token name]
CSS: [implementation]

Notes: [context-specific considerations]
```

## Animation Categories

### A) Entry/Exit Animations
- Easing: `ease-out` family
- Duration: ~180ms
- Scale: Start at 0.97-0.98, not 0

### B) On-Screen Movement
- Easing: `ease-in-out`
- Duration: ~240ms
- Use for layout changes, morphing

### C) Progress/Time
- Easing: `linear`
- For anything representing actual time

### D) Subtle State Changes
- Easing: `ease` (built-in)
- Duration: ~150ms
- For hover, focus transitions

### E) Keyboard Navigation
- Duration: 0ms
- No animation — preserve direct manipulation

### F) Gesture-Driven
- Use spring animations
- Maintain velocity through interruptions

## Common Tokens

```css
/* Easing */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);

/* Durations */
--dur-1: 120ms;  /* micro feedback */
--dur-2: 180ms;  /* standard enter/exit */
--dur-3: 240ms;  /* layout changes */
--dur-4: 300ms;  /* larger elements */
```

## Performance Guidelines

- Animate only `transform` and `opacity`
- Avoid `backdrop-filter: blur()` over ~20px
- Use `will-change` sparingly
- Respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
</knowledge>

<best_practices>
- Ask about trigger, framework, and app context before recommending
- High-frequency interactions should be instant or near-instant
- Exit animations are faster than enters (users want things gone)
- Match transform-origin to trigger position
</best_practices>

<references>
- [richtabor/agent-skills](https://github.com/richtabor/agent-skills/tree/main/skills/motion-design)
- [references/decision-tree.md](references/decision-tree.md)
- [references/easing-tokens.md](references/easing-tokens.md)
</references>
</skill>
