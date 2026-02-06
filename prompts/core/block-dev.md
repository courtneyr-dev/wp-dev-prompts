# Block Development

> **Category**: core/blocks
> **Platforms**: All

<prompt>
Create a custom WordPress block with these specifications:

**Block name**: [NAMESPACE]/[BLOCK_NAME]
**Description**: [DESCRIPTION]
**Category**: [widgets|text|media|design|theme|embed]

## Requirements

- WordPress 6.9+, PHP 8.2+
- Block API version 3 (`apiVersion: 3`)
- Use `@wordpress/scripts` for build tooling
- Register with `register_block_type()` pointing to `build/` directory

## File structure

```
src/blocks/[block-name]/
├── block.json         # Block metadata (source of truth)
├── edit.js            # Editor component
├── save.js            # Frontend save (or null for dynamic)
├── index.js           # Block registration
├── style.scss         # Frontend + editor styles
├── editor.scss        # Editor-only styles
└── render.php         # Server-side render (dynamic blocks only)
```

## block.json requirements

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "[namespace]/[block-name]",
  "version": "1.0.0",
  "title": "[Block Title]",
  "category": "[category]",
  "icon": "[dashicon]",
  "description": "[description]",
  "supports": {
    "html": false,
    "color": { "background": true, "text": true },
    "typography": { "fontSize": true },
    "spacing": { "margin": true, "padding": true }
  },
  "attributes": {},
  "textdomain": "[plugin-slug]",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css"
}
```

## Edit component patterns

Use `@wordpress/block-editor` components:
- `useBlockProps()` — required for wrapper element
- `RichText` for editable text
- `InspectorControls` for sidebar settings
- `InnerBlocks` for nested block areas
- `MediaUpload` / `MediaUploadCheck` for images

## Dynamic blocks (server-rendered)

If the block needs PHP data or complex logic:
- Set `save.js` to return `null`
- Add `"render": "file:./render.php"` in block.json
- In render.php, use `$attributes` and `$content` variables
- Escape all output: `esc_html()`, `esc_attr()`, `esc_url()`

## Interactivity API (for interactive frontend)

For blocks needing client-side interactivity without React:
- Add `"viewScriptModule": "file:./view.js"` to block.json
- Use `@wordpress/interactivity` with `store()` and directives
- Directives: `data-wp-interactive`, `data-wp-bind`, `data-wp-on--click`, `data-wp-context`

Generate the complete block code with all files.
</prompt>

## Usage

Replace bracketed variables and paste into any AI assistant.

## Variables

- `[NAMESPACE]`: Plugin namespace (e.g., "my-plugin")
- `[BLOCK_NAME]`: Block slug (e.g., "testimonial")
- `[DESCRIPTION]`: What the block does
