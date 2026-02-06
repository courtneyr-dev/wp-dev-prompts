# WordPress Design System (WPDS)

> **Type**: Skill
> **Domain**: WordPress Design
> **Source**: WordPress/agent-skills wpds

<skill>
<summary>
Guidelines for building UIs using the WordPress Design System components, tokens, and patterns.
</summary>

<knowledge>
## Overview

Use this skill when building or reviewing UI in WordPress-related contexts (Gutenberg, WooCommerce, WordPress.com, Jetpack, etc.).

**Prerequisites:**
- WPDS MCP server (recommended for canonical documentation)
- WordPress 6.9+ (PHP 7.2.24+)

**Synonyms:**
- "WordPress" and "WP"
- "Design System" and "DS"
- "WordPress Design System" and "WPDS"

## When to Use

- Building/reviewing any UI in WordPress contexts
- Working with WordPress Design System, WPDS
- Using UI components, design tokens, color primitives
- Working with spacing scales, typography variables
- Using component packages (`@wordpress/components`, `@wordpress/ui`)

## MCP Server Resources

If the WPDS MCP server is available:

- Reference site: `wpds://pages`
- Component list: `wpds://components`
- Specific component: `wpds://components/:name`
- Token list: `wpds://design-tokens`

## Core Component Packages

**@wordpress/components:**
- Button, TextControl, SelectControl
- Modal, Panel, Notice
- Card, Flex, Grid
- Many more UI primitives

**@wordpress/ui (newer):**
- Modern component implementations
- Enhanced accessibility
- Better TypeScript support

## Design Tokens

**Colors:**
- Use semantic color tokens, not raw values
- Respect theme variations (light/dark)
- Follow contrast requirements

**Spacing:**
- Use spacing scale variables
- Maintain consistent rhythm
- Apply grid alignment

**Typography:**
- Use typography presets
- Follow hierarchy guidelines
- Ensure readability

## Tech Stack

Default assumptions (unless context differs):
- TypeScript
- React
- CSS (CSS-in-JS or CSS Modules)

## Implementation Guidelines

**Component Selection:**
```jsx
import { Button, TextControl } from '@wordpress/components';

function MyFeature() {
    return (
        <div>
            <TextControl
                label="Name"
                value={name}
                onChange={setName}
            />
            <Button variant="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
}
```

**Token Usage:**
```css
.my-component {
    padding: var(--wp-admin-spacing-4);
    color: var(--wp-admin-theme-color);
    font-size: var(--wp-admin-font-size-base);
}
```

## Boundaries

Focus on:
- UI that adheres to WPDS best practices
- Most fitting WPDS components/tokens/patterns

Skip:
- Data fetching from stores
- String localization
- Non-UI related aspects

## Validation

Use lint scripts when available to validate:
- Component usage
- Token compliance
- Accessibility requirements
</knowledge>

<best_practices>
- Use WPDS components over custom implementations
- Apply design tokens for consistency
- Follow accessibility guidelines
- Test across theme variations
- Keep UI logic separate from data logic
</best_practices>

<references>
- [WordPress/agent-skills wpds](https://github.com/WordPress/agent-skills/tree/trunk/skills/wpds)
- [WordPress Components](https://wordpress.github.io/gutenberg/?path=/docs/docs-introduction--page)
</references>
</skill>
