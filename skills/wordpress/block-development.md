# WordPress Block Development

> **Type**: Skill
> **Domain**: WordPress Development
> **Source**: Automattic/agent-skills wp-block-development

<skill>
<summary>
Best practices for creating Gutenberg blocks with proper API versions, deprecations, and block types.
</summary>

<knowledge>
## Block Types

**Static Blocks:**
- Content saved directly in post_content
- No server-side rendering needed
- Best for simple, content-only blocks
- Use `save` function to define markup

**Dynamic Blocks:**
- Server-rendered using `render_callback` or render.php
- Content generated at runtime
- Use for data-dependent blocks
- Can access current context (user, time, etc.)

**Interactive Blocks:**
- Use Interactivity API
- `viewScriptModule` for client-side behavior
- Server-rendered initial state + client hydration
- See: skills/wordpress/interactivity-api.md

## API Versions

**apiVersion: 3 (Recommended for WP 6.9+):**
- Required for iframed editor support
- WordPress 7.0 will run post editor in iframe regardless
- Upgrade existing blocks proactively

```javascript
registerBlockType('my-plugin/my-block', {
    apiVersion: 3,
    // ...
});
```

## Block Registration

**block.json Pattern:**
```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "my-plugin/my-block",
    "title": "My Block",
    "category": "widgets",
    "textdomain": "my-plugin",
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css",
    "render": "file:./render.php"
}
```

## Deprecations

**Critical Rules:**
- NEVER change block names (breaks compatibility)
- NEVER modify saved markup without deprecations
- ALWAYS add migration paths when changing structure

**Deprecation Pattern:**
```javascript
const deprecated = [
    {
        attributes: { /* old attributes */ },
        save: function({ attributes }) {
            // Old save output
        },
        migrate: function(attributes) {
            // Transform to new format
            return { ...attributes, newAttr: 'default' };
        },
    },
];

registerBlockType('my-plugin/my-block', {
    // Current version
    deprecated,
});
```

**Keep Fixtures:**
- Maintain example content for each deprecated version
- Test migrations in CI
- Document breaking changes

## Block Supports

**Common Supports:**
```json
{
    "supports": {
        "color": {
            "background": true,
            "text": true
        },
        "typography": {
            "fontSize": true
        },
        "spacing": {
            "margin": true,
            "padding": true
        },
        "align": ["wide", "full"]
    }
}
```
</knowledge>

<best_practices>
- Use apiVersion: 3 for new blocks
- Prefer block.json for registration
- Always include deprecations for changes
- Test save/reload cycles
- Verify "Invalid block" never appears
</best_practices>

<references>
- [Automattic/agent-skills wp-block-development](https://github.com/Automattic/agent-skills/tree/trunk/skills/wp-block-development)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
</references>
</skill>
