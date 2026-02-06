---
name: WordPress Plugin, Block & Theme Development
description: Security-first WordPress development for 6.9+. Covers plugin architecture, block development (apiVersion 3, Interactivity API), block themes with theme.json, REST API, Abilities API, and the Security Trinity.
triggers:
  - wordpress plugin
  - plugin development
  - block development
  - gutenberg block
  - theme development
  - block theme
  - theme.json
  - interactivity api
  - register_post_type
  - add_action
  - add_filter
  - REST API
  - Abilities API
  - Settings API
  - full site editing
  - apiVersion 3
  - data-wp-interactive
  - viewScriptModule
  - create-block
---

# WordPress Plugin, Block & Theme Development

Build secure WordPress plugins, custom blocks, and block themes for WordPress 6.9+ and PHP 8.2+.

## Plugin Architecture

### Bootstrap

Single entry point. Register hooks at top level. Defer heavy operations.

```php
<?php
/**
 * Plugin Name: My Plugin
 * Version: 1.0.0
 * Requires at least: 6.9
 * Requires PHP: 8.2
 * Author: Your Name
 * License: GPL v2 or later
 * Text Domain: my-plugin
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

register_activation_hook( __FILE__, 'myplugin_activate' );
register_deactivation_hook( __FILE__, 'myplugin_deactivate' );
add_action( 'plugins_loaded', 'myplugin_init' );
```

### File Organization

```
my-plugin/
├── my-plugin.php           # Bootstrap (minimal)
├── includes/               # PHP classes
├── src/blocks/             # Block editor source
├── build/                  # Compiled assets
├── assets/                 # Static assets (css/, js/, images/)
├── languages/              # Translation files
├── templates/              # Template files
└── tests/                  # Test files
```

### Hook-Based Loading

Never execute code at file load time. Use hooks:

- `plugins_loaded` — after all plugins load
- `init` — after WordPress core loads
- `admin_init` — admin-specific initialization
- `rest_api_init` — REST API route registration
- `enqueue_block_editor_assets` — block editor scripts

### OOP Pattern

```php
class MyPlugin {
    private static ?self $instance = null;

    public static function get_instance(): self {
        return self::$instance ??= new self();
    }

    private function __construct() {
        add_action( 'init', [ $this, 'register_blocks' ] );
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }
}
```

## Security Trinity

**Sanitize input. Validate data. Escape output.**

### Input Sanitization

```php
$text  = sanitize_text_field( $_POST['title'] );
$email = sanitize_email( $_POST['email'] );
$int   = absint( $_POST['count'] );
$html  = wp_kses_post( $_POST['content'] );
$url   = sanitize_url( $_POST['url'] );
```

### Output Escaping

```php
echo esc_html( $text );        // HTML content
echo esc_attr( $value );       // HTML attributes
echo esc_url( $url );          // URLs
echo wp_kses_post( $content ); // Rich HTML
```

### Nonces + Capabilities

```php
if ( ! wp_verify_nonce( $_POST['_wpnonce'], 'my_action' ) ) {
    wp_die( 'Security check failed.' );
}
if ( ! current_user_can( 'manage_options' ) ) {
    wp_die( 'Unauthorized.' );
}
```

### Database Queries

```php
$results = $wpdb->get_results( $wpdb->prepare(
    "SELECT * FROM {$wpdb->posts} WHERE post_author = %d",
    $user_id
) );
```

## Block Development

### Getting Started

```bash
# Standard block
npx @wordpress/create-block@latest my-block

# Interactive block
npx @wordpress/create-block@latest my-block \
  --template @wordpress/create-block-interactive-template
```

### Block Types

- **Static** — content saved in post_content, use `save` function
- **Dynamic** — server-rendered via `render_callback` or `render.php`
- **Interactive** — Interactivity API with `viewScriptModule`

### API Version 3

Required for iframed editor. WordPress 7.0 will iframe the post editor regardless.

```javascript
registerBlockType( 'my-plugin/my-block', {
    apiVersion: 3,
    title: 'My Block',
    edit: Edit,
    save: Save,
} );
```

### block.json

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "my-plugin/my-block",
    "title": "My Block",
    "category": "widgets",
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css",
    "render": "file:./render.php",
    "viewScriptModule": "file:./view.js",
    "supports": {
        "html": false,
        "color": { "background": true, "text": true }
    }
}
```

### Interactivity API

Directive-based reactivity without jQuery.

```html
<div
    data-wp-interactive="myNamespace"
    data-wp-context='{ "isOpen": false }'
>
    <button
        data-wp-on--click="actions.toggle"
        data-wp-bind--aria-expanded="context.isOpen"
    >
        Toggle
    </button>
</div>
```

```javascript
import { store, getContext } from '@wordpress/interactivity';

store( 'myNamespace', {
    actions: {
        toggle() {
            const context = getContext();
            context.isOpen = ! context.isOpen;
        },
    },
} );
```

**Server-side state:**

```php
wp_interactivity_state( 'myNamespace', [ 'count' => 0 ] );
```

## Block Themes + theme.json

### theme.json (Version 3)

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "settings": {
        "color": {
            "palette": [
                { "slug": "primary", "color": "#0073aa", "name": "Primary" }
            ]
        }
    }
}
```

### Block Theme Structure

```
my-theme/
├── style.css
├── theme.json
├── templates/          # Full page templates (index.html, single.html)
├── parts/              # Reusable parts (header.html, footer.html)
└── patterns/           # Block patterns (hero.php)
```

## REST API

```php
add_action( 'rest_api_init', function() {
    register_rest_route( 'myplugin/v1', '/items', [
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'myplugin_get_items',
        'permission_callback' => function() {
            return current_user_can( 'edit_posts' );
        },
        'args' => [
            'per_page' => [
                'type'              => 'integer',
                'default'           => 10,
                'sanitize_callback' => 'absint',
            ],
        ],
    ] );
} );
```

## Abilities API (6.9+)

```php
add_action( 'init', function() {
    wp_register_ability( 'myplugin/feature-x', [
        'label'    => __( 'Feature X', 'my-plugin' ),
        'category' => 'my-plugin',
        'meta'     => [ 'show_in_rest' => true ],
    ] );
} );
```

## Build Tools

```bash
npx wp-scripts start   # Development (watch)
npx wp-scripts build   # Production
npx wp-scripts lint-js  # Lint JavaScript
```

## WordPress 6.9 Changes

- `data-wp-ignore` deprecated in Interactivity API
- On-demand CSS loading for classic themes
- Block-level asset loading
- Abilities API for permission-based features
- Server state resets between page transitions

## References

- [Plugin Handbook](https://developer.wordpress.org/plugins/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Interactivity API](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/)
- [theme.json Reference](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/)
- [REST API Handbook](https://developer.wordpress.org/rest-api/)
- [WordPress/agent-skills](https://github.com/WordPress/agent-skills)
