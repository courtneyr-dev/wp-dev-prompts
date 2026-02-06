# Animation Decision Tree

> **Source**: [richtabor/agent-skills](https://github.com/richtabor/agent-skills/tree/main/skills/motion-design/references)

## Quick Reference Flowchart

```
Is the element entering or exiting?
├── YES → Use ease-out, ~180ms
│         Scale from 0.97-0.98 (not 0)
│
└── NO → Is it moving on screen?
         ├── YES → Use ease-in-out, ~240ms
         │
         └── NO → Is it showing progress/time?
                  ├── YES → Use linear
                  │
                  └── NO → Is it a hover/focus state?
                           ├── YES → Use ease, ~150ms
                           │
                           └── NO → Is it keyboard navigation?
                                    ├── YES → No animation (0ms)
                                    │
                                    └── NO → Is it gesture-driven?
                                             ├── YES → Use spring
                                             │
                                             └── NO → Re-evaluate purpose
```

## Category Details

### A) Entry/Exit Animations

**Use Case**: Elements appearing or disappearing (modals, dropdowns, tooltips)

**Specification**:
- Easing: `--ease-out-quart` or `--ease-out-cubic`
- Duration: 180ms default
- Scale: 0.97 for small, 0.98 for medium, 0.95 for large

**Why**: Fast initial movement creates responsiveness, then gentle landing.

### B) On-Screen Movement

**Use Case**: Repositioning, layout changes, morphing

**Specification**:
- Easing: `--ease-in-out-cubic`
- Duration: 240ms default

**Why**: Natural acceleration and deceleration.

### C) Progress Visualization

**Use Case**: Progress bars, loading indicators, timers

**Specification**:
- Easing: `linear`
- Duration: Matches actual time

**Why**: Consistent speed represents real time passage.

### D) Subtle State Changes

**Use Case**: Hover effects, focus states, toggle switches

**Specification**:
- Easing: `ease` (CSS default)
- Duration: 150ms

**Why**: Quick but smooth, unobtrusive.

### E) Keyboard Navigation

**Use Case**: Tab focus, arrow key selection

**Specification**:
- Duration: 0ms (instant)

**Why**: Keyboard users expect immediate response.

### F) Gesture-Driven Motion

**Use Case**: Drag, swipe, pinch interactions

**Specification**:
- Use spring physics
- Maintain velocity through interruptions
- Reserve bounce for intentional playfulness

**Why**: Follows finger naturally, handles interruption gracefully.

## Transform Origin Guidelines

Match the origin to the trigger source:

| Trigger Location | Transform Origin |
|-----------------|-----------------|
| Button below | `center top` |
| Button above | `center bottom` |
| Button left | `left center` |
| Button right | `right center` |
| Center screen | `center center` |

## Frequency Modifiers

Adjust duration based on how often interaction occurs:

| Frequency | Modifier | Example |
|-----------|----------|---------|
| High (constant) | 0.5x or none | Keyboard input, scroll |
| Medium (regular) | 1x | Menu open, tab switch |
| Low (occasional) | 1.25x | Modal, first-run |

## Context Modifiers

Adjust based on application type:

| Context | Adjustment |
|---------|------------|
| Productivity app | Shorter, snappier |
| Marketing site | Can be more expressive |
| Mobile | Slightly faster |
| Desktop | Standard timings |
