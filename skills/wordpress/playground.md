# WordPress Playground

> **Type**: Skill
> **Domain**: WordPress Development
> **Source**: WordPress/agent-skills wp-playground

<skill>
<summary>
Guidelines for using WordPress Playground for development, testing, and demonstrations.
</summary>

<knowledge>
## Overview

WordPress Playground runs WordPress entirely in the browser using WebAssembly. Key characteristics:
- Ephemeral instances (data doesn't persist by default)
- SQLite-backed (not MySQL)
- Sandboxed environment
- Perfect for demos and testing

## Local Development

**Start Local Server:**
```bash
npx @wp-playground/cli@latest server --auto-mount
```

This will:
- Start a local Playground instance
- Auto-mount your plugin/theme for development
- Provide hot reload for changes

## Blueprint Files

**blueprint.json Structure:**
```json
{
    "$schema": "https://playground.wordpress.net/blueprint-schema.json",
    "landingPage": "/wp-admin/",
    "preferredVersions": {
        "php": "8.2",
        "wp": "latest"
    },
    "steps": [
        {
            "step": "installPlugin",
            "pluginZipFile": {
                "resource": "wordpress.org/plugins",
                "slug": "query-monitor"
            }
        },
        {
            "step": "installTheme",
            "themeZipFile": {
                "resource": "wordpress.org/themes",
                "slug": "twentytwentyfive"
            }
        },
        {
            "step": "login",
            "username": "admin",
            "password": "password"
        }
    ]
}
```

## Common Blueprint Steps

**Install Plugin from WordPress.org:**
```json
{
    "step": "installPlugin",
    "pluginZipFile": {
        "resource": "wordpress.org/plugins",
        "slug": "plugin-name"
    }
}
```

**Install Plugin from GitHub:**
```json
{
    "step": "installPlugin",
    "pluginZipFile": {
        "resource": "url",
        "url": "https://github.com/user/repo/archive/refs/heads/main.zip"
    }
}
```

**Import Content:**
```json
{
    "step": "importWxr",
    "file": {
        "resource": "url",
        "url": "https://example.com/demo-content.xml"
    }
}
```

**Set Site Options:**
```json
{
    "step": "setSiteOptions",
    "options": {
        "blogname": "My Demo Site",
        "blogdescription": "A demo of my plugin"
    }
}
```

**Run WP-CLI:**
```json
{
    "step": "wp-cli",
    "command": "wp option update show_on_front page"
}
```

## Testing Across Versions

**Test Multiple PHP Versions:**
```json
{
    "preferredVersions": {
        "php": "8.0",
        "wp": "latest"
    }
}
```

**Test Multiple WordPress Versions:**
```json
{
    "preferredVersions": {
        "php": "8.2",
        "wp": "6.5"
    }
}
```

## Important Limitations

**Ephemeral:**
- Instances are temporary
- Data resets on page refresh
- Never point at production data

**SQLite:**
- Uses SQLite, not MySQL
- Some MySQL-specific features may differ
- Test critical features on real MySQL

**Network:**
- Limited network access
- External API calls may not work
- CORS restrictions apply
</knowledge>

<best_practices>
- Use for demos and testing only
- Never connect to production data
- Test across different PHP/WP versions
- Include sample content for realistic demos
- Document blueprint.json in repository
</best_practices>

<references>
- [WordPress/agent-skills wp-playground](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-playground)
- [WordPress Playground](https://wordpress.org/playground/)
- [Blueprint Reference](https://wordpress.github.io/wordpress-playground/blueprints/)
</references>
</skill>
