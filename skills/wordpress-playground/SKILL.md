---
name: WordPress Playground
description: WordPress Playground for browser-based development, testing, and demos using WebAssembly with blueprint files and local server setup.
triggers:
  - wordpress playground
  - playground blueprint
  - wp-playground
  - browser wordpress
  - playground server
  - blueprint.json
---

# WordPress Playground

Run WordPress entirely in the browser using WebAssembly. Ephemeral instances with SQLite, perfect for demos, testing, and quick prototyping.

## Quick Start

### Local Development Server

```bash
npx @wp-playground/cli@latest server --auto-mount
```

This starts a local Playground instance, auto-mounts your plugin/theme, and provides hot reload.

### Browser-Based

Visit [playground.wordpress.net](https://playground.wordpress.net/) for instant WordPress.

## Blueprint Files

Blueprints automate Playground setup — install plugins, themes, configure settings.

### Basic Blueprint

```json
{
    "$schema": "https://playground.wordpress.net/blueprint-schema.json",
    "landingPage": "/wp-admin/",
    "preferredVersions": {
        "php": "8.2",
        "wp": "6.9"
    },
    "steps": [
        {
            "step": "installPlugin",
            "pluginData": {
                "resource": "wordpress.org/plugins",
                "slug": "gutenberg"
            }
        },
        {
            "step": "installTheme",
            "themeData": {
                "resource": "wordpress.org/themes",
                "slug": "twentytwentyfive"
            }
        }
    ]
}
```

### Mount Local Plugin

```json
{
    "steps": [
        {
            "step": "mountPaths",
            "paths": {
                "/wordpress/wp-content/plugins/my-plugin": "./my-plugin"
            }
        },
        {
            "step": "activatePlugin",
            "pluginPath": "my-plugin/my-plugin.php"
        }
    ]
}
```

### Import Content

```json
{
    "steps": [
        {
            "step": "importWxr",
            "file": {
                "resource": "url",
                "url": "https://example.com/test-content.xml"
            }
        }
    ]
}
```

## Use Cases

### Plugin Development

```bash
npx @wp-playground/cli@latest server \
    --auto-mount \
    --php 8.2 \
    --wp 6.9
```

### Demo Links

Share instant demo environments:

```
https://playground.wordpress.net/#{"steps":[{"step":"installPlugin","pluginData":{"resource":"wordpress.org/plugins","slug":"your-plugin"}}]}
```

### Testing Matrix

Test across PHP/WP versions without local infrastructure:

```json
{
    "preferredVersions": {
        "php": "8.3",
        "wp": "trunk"
    }
}
```

## Key Characteristics

- **Ephemeral** — data doesn't persist by default
- **SQLite-backed** — not MySQL (some queries may differ)
- **Sandboxed** — safe for experimentation
- **No external network** — HTTP requests are limited

## References

- [WordPress Playground Documentation](https://wordpress.github.io/wordpress-playground/)
- [Blueprint API Reference](https://wordpress.github.io/wordpress-playground/blueprints-api/)
- [WordPress/agent-skills](https://github.com/WordPress/agent-skills)
