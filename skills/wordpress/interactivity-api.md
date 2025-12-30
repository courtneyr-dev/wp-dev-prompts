# WordPress Interactivity API

> **Type**: Skill
> **Domain**: WordPress Development
> **Source**: Automattic/agent-skills wp-interactivity-api

<skill>
<summary>
Guidelines for using the WordPress Interactivity API for client-side interactivity with server-rendered HTML.
</summary>

<knowledge>
## Overview

The Interactivity API provides a standardized way to add client-side interactivity to WordPress blocks using directives in HTML.

**Key Concepts:**
- Server-rendered markup + client hydration
- Directive-based reactivity
- Shared store for state management
- No build step required (optional)

## Getting Started

**Use the Interactive Template:**
```bash
npx @wordpress/create-block@latest my-block --template @wordpress/create-block-interactive-template
```

## Core Directives

**data-wp-interactive:**
```html
<div data-wp-interactive="myNamespace">
    <!-- Interactive region -->
</div>
```

**data-wp-context:**
```html
<div data-wp-context='{ "isOpen": false }'>
    <!-- Local state -->
</div>
```

**data-wp-bind:**
```html
<button data-wp-bind--aria-expanded="context.isOpen">
    Toggle
</button>
```

**data-wp-on:**
```html
<button data-wp-on--click="actions.toggle">
    Toggle
</button>
```

**data-wp-class:**
```html
<div data-wp-class--is-active="context.isOpen">
    Content
</div>
```

**data-wp-text:**
```html
<span data-wp-text="state.count"></span>
```

## Store Definition

**JavaScript Store:**
```javascript
import { store, getContext } from '@wordpress/interactivity';

store('myNamespace', {
    state: {
        count: 0,
    },
    actions: {
        increment() {
            const context = getContext();
            context.count++;
        },
        toggle() {
            const context = getContext();
            context.isOpen = !context.isOpen;
        },
    },
    callbacks: {
        logCount() {
            const { count } = getContext();
            console.log(`Count is: ${count}`);
        },
    },
});
```

## WordPress 6.9 Changes

**Deprecated:**
- `data-wp-ignore` is deprecated in WP 6.9
- Use alternative patterns for excluding regions

**Important Notes:**
- Server state resets between page transitions
- Ensure scoped and minimal directives
- Verify no JavaScript errors block hydration

## Server-Side Integration

**PHP State Initialization:**
```php
wp_interactivity_state('myNamespace', [
    'count' => 0,
]);
```

**Render Markup:**
```php
<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="myNamespace"
    data-wp-context='<?php echo wp_json_encode(['isOpen' => false]); ?>'
>
    <button data-wp-on--click="actions.toggle">
        Toggle
    </button>
</div>
```
</knowledge>

<best_practices>
- Keep directives scoped and minimal
- Ensure server-rendered markup + client hydration align
- Validate store namespace matches directive references
- Test for JavaScript console errors that block hydration
- Use the interactive template for new blocks
</best_practices>

<references>
- [Automattic/agent-skills wp-interactivity-api](https://github.com/Automattic/agent-skills/tree/trunk/skills/wp-interactivity-api)
- [Interactivity API Docs](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/)
</references>
</skill>
