# WordPress Abilities API

> **Type**: Skill
> **Domain**: WordPress Development
> **Source**: WordPress/agent-skills wp-abilities-api

<skill>
<summary>
Guidelines for registering abilities, exposing them via REST, and consuming them in JavaScript for WordPress 6.9+.
</summary>

<knowledge>
## Overview

The Abilities API provides a standardized way to register, expose, and consume capabilities in WordPress. Use this skill when:

- Registering abilities or ability categories in PHP
- Exposing abilities to clients via REST (`wp-abilities/v1`)
- Consuming abilities in JavaScript

**Requirements:**
- WordPress 6.9+
- PHP 7.2.24+

## Setup Steps

1. Confirm version compatibility (WP 6.9+, PHP 7.2.24+)
2. Determine if modifying core or a plugin/theme
3. Search repo for existing ability hooks (`wp_register_ability(`)
4. Check for existing REST patterns

## Registering Categories

Register categories early if logical grouping is needed:

```php
add_action('init', function() {
    wp_register_ability_category('my-plugin', [
        'label'       => __('My Plugin Abilities', 'my-plugin'),
        'description' => __('Abilities provided by My Plugin', 'my-plugin'),
    ]);
});
```

## Registering Abilities

```php
add_action('init', function() {
    wp_register_ability('my-plugin/feature-x', [
        'label'       => __('Feature X', 'my-plugin'),
        'description' => __('Enables Feature X functionality', 'my-plugin'),
        'category'    => 'my-plugin',
        'meta'        => [
            'show_in_rest' => true,
            'version'      => '1.0.0',
        ],
    ]);
});
```

**Key Parameters:**
- Stable IDs (namespaced format recommended)
- Clear labels and descriptions
- Category assignment for grouping
- `show_in_rest: true` for client visibility

## REST Endpoints

The Abilities API exposes endpoints at `wp-abilities/v1`:

**List Abilities:**
```
GET /wp-json/wp-abilities/v1/abilities
```

**List Categories:**
```
GET /wp-json/wp-abilities/v1/categories
```

## JavaScript Consumption

```javascript
import { getAbilities, hasAbility } from '@wordpress/abilities';

// Check for specific ability
if (hasAbility('my-plugin/feature-x')) {
    // Enable feature
}

// Get all abilities
const abilities = getAbilities();
```

## Verification

After implementing abilities:

1. Confirm `signals.usesAbilitiesApi: true` in project triage
2. Test REST endpoints return expected results
3. Verify JavaScript consumption works
4. Add test coverage for registration and consumption

## Troubleshooting

**Abilities Don't Appear:**
- Verify registration code executes (check hook timing)
- Confirm `meta.show_in_rest` is `true`
- Check category/ID for typos

**REST Shows Ability, JavaScript Doesn't:**
- Verify REST namespace correctness
- Check JavaScript bundling includes `@wordpress/abilities`
- Clear object cache
</knowledge>

<best_practices>
- Use namespaced IDs (plugin-slug/ability-name)
- Always set show_in_rest for client-visible abilities
- Group related abilities in categories
- Include version metadata for tracking
- Test both PHP and JavaScript consumption
</best_practices>

<references>
- [WordPress/agent-skills wp-abilities-api](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-abilities-api)
</references>
</skill>
