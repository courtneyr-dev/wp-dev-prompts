# UI/UX Design Guidelines

Practical design principles for building usable, accessible interfaces.

## Core Principles

### 1. Clarity Over Cleverness

Users should never wonder what to do. Every interface element should have an obvious purpose.

**Do:**
- Use clear, action-oriented labels ("Save Changes" not "Submit")
- Make primary actions visually distinct
- Show one thing at a time

**Don't:**
- Hide essential functions in menus
- Use ambiguous icons without labels
- Rely on hover to reveal important information

### 2. Consistency Reduces Cognitive Load

Every inconsistency forces users to relearn your interface.

**Do:**
- Use the same patterns throughout
- Follow platform conventions (WordPress, iOS, Material)
- Keep terminology consistent

**Don't:**
- Invent new patterns when standards exist
- Mix interaction models
- Use different words for the same action

### 3. Feedback Builds Confidence

Users need to know their actions had an effect.

**Do:**
- Show loading states for any action > 300ms
- Confirm successful actions
- Provide clear error messages with solutions

**Don't:**
- Leave users wondering if a click registered
- Show generic "Something went wrong" errors
- Silently fail

### 4. Accessibility Is Usability

Accessible interfaces are better for everyone.

**Do:**
- Support keyboard navigation completely
- Maintain 4.5:1 contrast ratio
- Provide text alternatives for images

**Don't:**
- Rely solely on color to convey meaning
- Trap keyboard focus
- Remove focus indicators

## Visual Hierarchy

### Typography Scale

Use a consistent modular scale:

```css
/* Example: 1.25 ratio */
--text-xs: 0.64rem;   /* 10.24px */
--text-sm: 0.8rem;    /* 12.8px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.25rem;   /* 20px */
--text-xl: 1.563rem;  /* 25px */
--text-2xl: 1.953rem; /* 31.25px */
--text-3xl: 2.441rem; /* 39px */
```

### Spacing Scale

Use consistent spacing based on a base unit:

```css
/* Base: 4px */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

### Color Contrast

| Element Type | Minimum Contrast |
|-------------|------------------|
| Body text | 4.5:1 |
| Large text (18px+) | 3:1 |
| UI components | 3:1 |
| Focus indicators | 3:1 |

### Visual Weight

Guide attention through visual weight:

1. **Size** - Larger = more important
2. **Color** - Saturated/contrasting = more attention
3. **Position** - Top-left (LTR) or center = first seen
4. **Whitespace** - Isolated elements draw focus
5. **Typography** - Bold/different font = emphasis

## Interactive Elements

### Button Hierarchy

```
Primary   → Main action, one per section
Secondary → Supporting actions
Tertiary  → Less important actions
Ghost     → Minimal visual weight
```

### States

Every interactive element needs these states:

| State | Visual Treatment |
|-------|-----------------|
| Default | Base appearance |
| Hover | Subtle highlight (cursor change) |
| Focus | Visible ring (keyboard users) |
| Active/Pressed | Pressed appearance |
| Disabled | Reduced opacity + not-allowed cursor |
| Loading | Spinner or skeleton |

### Touch Targets

- **Minimum size:** 44×44px
- **Spacing between targets:** 8px+
- **Hit area:** Can be larger than visual element

## Responsive Design

### Breakpoint Strategy

```css
/* Mobile-first approach */
.element { /* Mobile styles */ }

@media (min-width: 600px) { /* Tablet */ }
@media (min-width: 960px) { /* Desktop */ }
@media (min-width: 1280px) { /* Wide */ }
```

### Layout Principles

**Mobile (< 600px):**
- Single column layouts
- Full-width elements
- Stacked navigation
- Larger touch targets

**Tablet (600-960px):**
- 2-column where beneficial
- Sidebar navigation optional
- Balanced content width

**Desktop (> 960px):**
- Multi-column layouts
- Persistent navigation
- Optimal line length (45-75 characters)

### Content Adaptation

| Element | Mobile | Desktop |
|---------|--------|---------|
| Navigation | Hamburger menu | Visible nav bar |
| Images | Single, stacked | Grid or carousel |
| Forms | Full-width inputs | Inline labels |
| Tables | Card view | Full table |

## Forms

### Labels

- **Always visible** (not just placeholder text)
- **Associated with input** (using `for`/`id`)
- **Clear and concise**

### Validation

**Do:**
- Validate on blur, not on every keystroke
- Show inline errors near the field
- Explain what's wrong and how to fix it
- Maintain error state until fixed

**Don't:**
- Wait until form submission to show errors
- Use only color to indicate errors
- Show generic "Invalid input" messages

### Input Types

Use appropriate input types for mobile optimization:

| Content | Input Type | Keyboard |
|---------|-----------|----------|
| Email | `type="email"` | @ symbol visible |
| Phone | `type="tel"` | Number pad |
| Numbers | `type="number"` | Number pad |
| URL | `type="url"` | .com shortcut |
| Search | `type="search"` | Search button |

## Navigation

### Information Scent

Users should be able to predict what they'll find:
- Link text should describe the destination
- Group related items together
- Use progressive disclosure for complex content

### Wayfinding

Users should always know:
- Where they are (current page indicator)
- Where they've been (visited links)
- Where they can go (visible navigation)

### Common Patterns

**Header Navigation:**
- Logo links to home
- Primary nav items visible
- Search easily accessible
- Account/settings on right

**Footer Navigation:**
- Sitemap-style links
- Legal/policy links
- Contact information
- Social links

## Loading States

### Duration Guidelines

| Duration | User Perception | Treatment |
|----------|----------------|-----------|
| < 100ms | Instant | No indicator needed |
| 100-300ms | Slight delay | Optional subtle feedback |
| 300ms-1s | Noticeable | Loading indicator |
| 1-10s | Waiting | Progress bar if possible |
| > 10s | Long wait | Progress + estimated time |

### Skeleton Screens

Better than spinners for content loading:
- Show the page structure immediately
- Replace skeletons with content as it loads
- Avoid "flashing" for fast loads

## Error Handling

### Error Message Anatomy

```
[Icon] [Title]
[Description of what went wrong]
[How to fix it]
[Action button if applicable]
```

**Example:**
```
⚠️ Unable to save changes
Your session has expired due to inactivity.
Please refresh the page and try again.
[Refresh Page]
```

### Error Prevention

- Confirm destructive actions
- Use input constraints (maxlength, pattern)
- Disable invalid actions
- Provide smart defaults

## Performance Perception

### Optimistic UI

Update the UI immediately, sync with server in background:
- Like buttons
- Toggle switches
- Adding items to lists

### Progressive Loading

Load critical content first:
1. Page shell/structure
2. Above-fold content
3. Below-fold content
4. Non-essential assets

### Perceived Performance

- Start transitions immediately on click
- Use skeleton screens instead of spinners
- Provide instant feedback for all interactions
- Animate content in, don't flash

## Accessibility Checklist

### Keyboard

- [ ] All functionality accessible via keyboard
- [ ] Visible focus indicator on all interactive elements
- [ ] Logical tab order
- [ ] No keyboard traps
- [ ] Skip links for main content

### Screen Readers

- [ ] Meaningful page titles
- [ ] Heading hierarchy (h1 → h2 → h3)
- [ ] Alt text for images
- [ ] ARIA labels where needed
- [ ] Live regions for dynamic content

### Visual

- [ ] Text contrast ≥ 4.5:1
- [ ] UI contrast ≥ 3:1
- [ ] Information not conveyed by color alone
- [ ] Text resizable to 200%
- [ ] No horizontal scroll at 320px

### Motor

- [ ] Touch targets ≥ 44×44px
- [ ] Adequate spacing between targets
- [ ] No time limits (or adjustable)
- [ ] No precision requirements

## Testing Your Design

1. **Squint test** - Can you identify the primary action?
2. **5-second test** - What do new users understand immediately?
3. **Keyboard-only test** - Complete all tasks without a mouse
4. **Mobile-first test** - Does it work on a 320px screen?
5. **Slow connection test** - How does it feel on 3G?

## Related Resources

- `docs/ui-ux-audit.md` - Audit methodology
- `data/ui-ux-audit-checklist.yaml` - Checklist
- `prompts/testing/` - AI prompts
- `tests/ui-ux/` - Automated tests
- `docs/design-style-guide.md` - Visual style options
