# Theme vs Plugin Styles Prompt

> Determine style ownership between themes and plugins for WordPress components.

## System Context

You are a WordPress front-end expert and design systems engineer who understands:
- The separation of concerns between themes and plugins
- CSS specificity and override patterns
- WordPress theme.json and global styles
- Plugin portability across themes

---

## Prompt Template

```text
You are a WordPress front-end expert and design systems engineer.

I need you to decide which styles should live in:
1. The theme's global style system (typography, color tokens)
2. The plugin/block style (component-specific styles)

For this component/feature:
<insert component description here>

Provide:
- A rationale for the decision
- A list of style tokens that should be defined by the theme
- A list of styles that should be in the plugin
- CSS variable names and usage examples
- Guidelines for how a theme can override plugin styles

Consider:
- Design consistency across the site
- Avoiding style collisions
- Accessibility (contrast, spacing)
- Responsive behavior
- Plugin portability

Respond with a structured spec including examples.
```

---

## Decision Framework

### Theme Responsibility (Global)

Themes should define:

| Category | Examples | Why Theme |
|----------|----------|-----------|
| **Brand Colors** | Primary, secondary, accent | Site-wide identity |
| **Typography** | Font families, base sizes, scale | Consistent reading experience |
| **Spacing Scale** | 8px grid units | Rhythm and consistency |
| **Border Radius** | sm, md, lg values | Visual style cohesion |
| **Shadows** | elevation levels | Depth consistency |
| **Layout Widths** | content, wide, full | Site structure |
| **Focus Styles** | outline color, style | Accessibility baseline |

### Plugin Responsibility (Component)

Plugins should define:

| Category | Examples | Why Plugin |
|----------|----------|------------|
| **Component Structure** | Layout, positioning | Functional necessity |
| **Interactive States** | Hover, active, disabled | Component behavior |
| **Component Spacing** | Internal padding, gaps | Component integrity |
| **Icons & Graphics** | Plugin-specific icons | Bundled assets |
| **Animations** | Component transitions | Feature behavior |
| **Fallback Values** | Default colors if no theme | Portability |

---

## Example: Data Table Component

**Input:**
```text
A data table component for a plugin that displays sortable, filterable data with pagination.
```

**Output:**

### Style Ownership Analysis

#### Theme-Owned (via CSS Variables)

```css
/* These should come from theme.json / global styles */

/* Typography */
--wp--preset--font-family--body
--wp--preset--font-size--small
--wp--preset--font-size--medium

/* Colors */
--wp--preset--color--primary        /* Sort indicator, links */
--wp--preset--color--secondary      /* Headers, borders */
--wp--preset--color--background     /* Table background */
--wp--preset--color--foreground     /* Text color */
--wp--preset--color--surface        /* Alternate row */

/* Spacing */
--wp--preset--spacing--20           /* Cell padding */
--wp--preset--spacing--30           /* Section gaps */

/* Borders */
--wp--custom--border-radius--small  /* Rounded corners */
```

#### Plugin-Owned (Component-Specific)

```css
/* These are plugin-defined with theme fallbacks */

.my-plugin-table {
  /* Structure - plugin owns */
  display: grid;
  grid-template-rows: auto 1fr auto; /* header, body, footer */
  min-height: 300px;
  overflow: auto;

  /* Colors - use theme with fallbacks */
  --table-bg: var(--wp--preset--color--background, #ffffff);
  --table-text: var(--wp--preset--color--foreground, #1e1e1e);
  --table-border: var(--wp--preset--color--secondary, #e0e0e0);
  --table-stripe: var(--wp--preset--color--surface, #f5f5f5);
  --table-hover: color-mix(in srgb, var(--wp--preset--color--primary, #0073aa) 10%, transparent);
  --table-selected: color-mix(in srgb, var(--wp--preset--color--primary, #0073aa) 20%, transparent);

  /* Spacing - use theme with fallbacks */
  --table-cell-padding: var(--wp--preset--spacing--20, 0.75rem);
  --table-gap: var(--wp--preset--spacing--10, 0.5rem);

  /* Plugin-specific */
  --table-header-weight: 600;
  --table-sort-icon-size: 12px;
  --table-row-min-height: 48px;
  --table-transition: 150ms ease;
}
```

### Complete CSS Implementation

```css
/**
 * Data Table Styles
 *
 * Theme Integration:
 * - Uses CSS custom properties from theme.json
 * - Provides fallback values for theme independence
 * - Respects theme color scheme
 *
 * Override in theme:
 * .my-plugin-table { --table-bg: #your-color; }
 */

/* Container */
.my-plugin-table {
  /* Theme tokens with fallbacks */
  --table-bg: var(--wp--preset--color--background, #ffffff);
  --table-text: var(--wp--preset--color--foreground, #1e1e1e);
  --table-border: var(--wp--preset--color--secondary, #e0e0e0);
  --table-stripe: var(--wp--preset--color--surface, #f9f9f9);
  --table-accent: var(--wp--preset--color--primary, #0073aa);

  --table-font: var(--wp--preset--font-family--body, system-ui, sans-serif);
  --table-font-size: var(--wp--preset--font-size--small, 0.875rem);

  --table-cell-padding: var(--wp--preset--spacing--20, 0.75rem);
  --table-radius: var(--wp--custom--border-radius--small, 4px);

  /* Plugin-specific (not overridable) */
  font-family: var(--table-font);
  font-size: var(--table-font-size);
  color: var(--table-text);
  background: var(--table-bg);
  border: 1px solid var(--table-border);
  border-radius: var(--table-radius);
  overflow: hidden;
}

/* Header */
.my-plugin-table__header {
  display: contents; /* For CSS Grid */
}

.my-plugin-table__header-cell {
  padding: var(--table-cell-padding);
  font-weight: 600;
  text-align: left;
  background: var(--table-stripe);
  border-bottom: 2px solid var(--table-border);
  white-space: nowrap;
  user-select: none;
}

/* Sortable header */
.my-plugin-table__header-cell--sortable {
  cursor: pointer;
}

.my-plugin-table__header-cell--sortable:hover {
  background: color-mix(in srgb, var(--table-accent) 10%, var(--table-stripe));
}

.my-plugin-table__sort-icon {
  width: 12px;
  height: 12px;
  margin-left: 4px;
  opacity: 0.5;
  transition: opacity 150ms, transform 150ms;
}

.my-plugin-table__header-cell--sorted .my-plugin-table__sort-icon {
  opacity: 1;
  color: var(--table-accent);
}

.my-plugin-table__header-cell--sorted-desc .my-plugin-table__sort-icon {
  transform: rotate(180deg);
}

/* Body rows */
.my-plugin-table__row {
  display: contents;
}

.my-plugin-table__cell {
  padding: var(--table-cell-padding);
  border-bottom: 1px solid var(--table-border);
  vertical-align: middle;
}

/* Striping */
.my-plugin-table__row:nth-child(even) .my-plugin-table__cell {
  background: var(--table-stripe);
}

/* Hover */
.my-plugin-table__row:hover .my-plugin-table__cell {
  background: color-mix(in srgb, var(--table-accent) 8%, transparent);
}

/* Selected */
.my-plugin-table__row--selected .my-plugin-table__cell {
  background: color-mix(in srgb, var(--table-accent) 15%, transparent);
}

/* Pagination */
.my-plugin-table__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--table-cell-padding);
  border-top: 1px solid var(--table-border);
  background: var(--table-stripe);
}

.my-plugin-table__pagination-button {
  padding: 6px 12px;
  font-size: var(--table-font-size);
  color: var(--table-accent);
  background: transparent;
  border: 1px solid var(--table-accent);
  border-radius: var(--table-radius);
  cursor: pointer;
  transition: background 150ms, color 150ms;
}

.my-plugin-table__pagination-button:hover {
  background: var(--table-accent);
  color: white;
}

.my-plugin-table__pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus states - CRITICAL for accessibility */
.my-plugin-table__header-cell--sortable:focus,
.my-plugin-table__pagination-button:focus {
  outline: 2px solid var(--table-accent);
  outline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .my-plugin-table {
    font-size: calc(var(--table-font-size) * 0.9);
  }

  .my-plugin-table__cell {
    padding: calc(var(--table-cell-padding) * 0.75);
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .my-plugin-table {
    --table-border: currentColor;
  }

  .my-plugin-table__row:hover .my-plugin-table__cell {
    outline: 2px solid currentColor;
    outline-offset: -2px;
  }
}
```

### Theme Override Examples

```css
/* In theme's style.css or additional CSS */

/* Change table accent color */
.my-plugin-table {
  --table-accent: var(--wp--preset--color--secondary);
}

/* Remove striping */
.my-plugin-table__row:nth-child(even) .my-plugin-table__cell {
  background: transparent;
}

/* Dark theme */
.is-dark-theme .my-plugin-table {
  --table-bg: #1e1e1e;
  --table-text: #f0f0f0;
  --table-border: #404040;
  --table-stripe: #2d2d2d;
}
```

### PHP: Registering Styles

```php
<?php
/**
 * Register table block styles.
 */
function my_plugin_register_table_styles() {
    wp_register_style(
        'my-plugin-table',
        plugins_url( 'assets/css/table.css', __FILE__ ),
        [], // No dependencies
        filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/table.css' )
    );
}
add_action( 'init', 'my_plugin_register_table_styles' );

/**
 * Add editor styles.
 */
function my_plugin_add_editor_styles() {
    add_editor_style( plugins_url( 'assets/css/table.css', __FILE__ ) );
}
add_action( 'after_setup_theme', 'my_plugin_add_editor_styles' );
```

---

## Best Practices Summary

1. **Use CSS Custom Properties** - Always expose customizable values as variables
2. **Provide Fallbacks** - Plugin should work without theme support
3. **Namespace Variables** - Use plugin prefix for custom properties
4. **Document Overrides** - Comment which variables themes can customize
5. **Respect Theme Colors** - Reference `--wp--preset--color--*` first
6. **Test Portability** - Verify plugin looks acceptable in multiple themes
7. **Focus States** - Always include visible focus for accessibility
8. **Reduced Motion** - Respect `prefers-reduced-motion`
