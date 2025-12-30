# WordPress Block Themes

> **Type**: Skill
> **Domain**: WordPress Development
> **Source**: Automattic/agent-skills wp-block-themes

<skill>
<summary>
Best practices for creating and debugging WordPress block themes using theme.json and the Site Editor.
</summary>

<knowledge>
## Theme Structure

**Required Files:**
```
my-theme/
├── style.css              # Theme header (required)
├── theme.json             # Theme configuration
├── templates/             # Block templates
│   ├── index.html         # Fallback template (required)
│   ├── single.html
│   ├── page.html
│   └── archive.html
├── parts/                 # Template parts
│   ├── header.html
│   └── footer.html
├── patterns/              # Block patterns
└── assets/                # Static assets
```

**Important:**
- Templates go in `templates/` (not nested subdirectories)
- Parts go in `parts/` (not nested subdirectories)
- No subdirectory nesting within these folders

## theme.json

**Structure:**
```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "settings": {
        // UI controls and presets
    },
    "styles": {
        // Default appearance
    },
    "templateParts": [
        {
            "name": "header",
            "title": "Header",
            "area": "header"
        }
    ]
}
```

**Settings vs Styles:**
- `settings`: Control UI options/presets available to users
- `styles`: Define default appearance applied to site

**Settings Example:**
```json
{
    "settings": {
        "color": {
            "palette": [
                { "slug": "primary", "color": "#0073aa", "name": "Primary" }
            ]
        },
        "typography": {
            "fontSizes": [
                { "slug": "small", "size": "14px", "name": "Small" }
            ]
        }
    }
}
```

**Styles Example:**
```json
{
    "styles": {
        "color": {
            "background": "var(--wp--preset--color--white)",
            "text": "var(--wp--preset--color--black)"
        },
        "typography": {
            "fontSize": "var(--wp--preset--font-size--medium)"
        }
    }
}
```

## Style Hierarchy

WordPress applies styles in this order:
1. Core defaults
2. theme.json
3. Child theme theme.json
4. User customizations (Site Editor)

**Debugging Tip:**
User Site Editor customizations can mask theme edits. Check this first when styles don't apply.

## Template Parts

**Registering Parts:**
```json
{
    "templateParts": [
        {
            "name": "header",
            "title": "Header",
            "area": "header"
        },
        {
            "name": "footer",
            "title": "Footer",
            "area": "footer"
        },
        {
            "name": "sidebar",
            "title": "Sidebar",
            "area": "uncategorized"
        }
    ]
}
```

**Using in Templates:**
```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main"} -->
<!-- wp:post-content /-->
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

## Child Themes

**Child theme.json:**
- Inherits from parent theme.json
- Can override or extend settings/styles
- Uses same structure as parent

**Proper Identification:**
- Verify theme root correctly identified
- Check for multiple themes present
- Ensure child theme properly extends parent
</knowledge>

<best_practices>
- Use theme.json version 3 for latest features
- Keep templates and parts in correct directories (no nesting)
- Distinguish between settings (UI controls) and styles (defaults)
- Check for user customizations when debugging
- Test with Site Editor to verify behavior
</best_practices>

<references>
- [Automattic/agent-skills wp-block-themes](https://github.com/Automattic/agent-skills/tree/trunk/skills/wp-block-themes)
- [Theme JSON Reference](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/)
</references>
</skill>
