# WordPress Core Blocks Reference

> A comprehensive guide to WordPress core blocks, their capabilities, and usage patterns.

## Overview

WordPress core blocks are the building blocks of the block editor (Gutenberg). This reference documents block categories, supported features, and common usage patterns derived from the official `@wordpress/block-library` package.

## Block Categories

### Text Blocks

| Block | Description | Key Supports |
|-------|-------------|--------------|
| `core/paragraph` | Standard text content | color, typography, spacing, dropCap |
| `core/heading` | Section headings (h1-h6) | color, typography, spacing, anchor |
| `core/list` | Bulleted/numbered lists | color, typography, spacing |
| `core/code` | Code snippets | typography, spacing, border |
| `core/quote` | Blockquotes | color, typography, spacing, border |
| `core/preformatted` | Preformatted text | color, typography, spacing |
| `core/pullquote` | Pull quotes | color, typography, border |
| `core/verse` | Poetry/verse | color, typography, spacing |
| `core/details` | Expandable details | color, typography, spacing |

### Media Blocks

| Block | Description | Key Supports |
|-------|-------------|--------------|
| `core/image` | Single images | color, border, shadow, lightbox |
| `core/gallery` | Image galleries | color, spacing, columns |
| `core/audio` | Audio player | spacing |
| `core/video` | Video player | spacing, caption |
| `core/cover` | Cover with overlay | color, typography, dimensions, parallax |
| `core/file` | File download | color |
| `core/media-text` | Media with text | color, spacing, alignment |

### Design Blocks

| Block | Description | Key Supports |
|-------|-------------|--------------|
| `core/buttons` | Button container | typography, layout |
| `core/button` | Individual button | color, typography, border, shadow |
| `core/columns` | Column layout | color, spacing, layout |
| `core/group` | Content container | color, typography, spacing, border, layout |
| `core/row` | Horizontal layout | color, spacing, layout |
| `core/stack` | Vertical layout | color, spacing, layout |
| `core/spacer` | Vertical spacing | dimensions |
| `core/separator` | Horizontal rule | color |

### Widget Blocks

| Block | Description | Key Supports |
|-------|-------------|--------------|
| `core/archives` | Archive links | typography, spacing |
| `core/calendar` | Calendar widget | typography, color |
| `core/categories` | Category list | typography, spacing |
| `core/latest-posts` | Recent posts | typography, spacing, columns |
| `core/latest-comments` | Recent comments | typography, spacing |
| `core/search` | Search form | color, typography, border |
| `core/social-links` | Social media icons | color, spacing |

### Theme Blocks

| Block | Description | Key Supports |
|-------|-------------|--------------|
| `core/navigation` | Site navigation | color, typography, layout |
| `core/site-logo` | Site logo | color, border |
| `core/site-title` | Site title | color, typography |
| `core/query` | Query loop | layout, interactivity |
| `core/post-title` | Post title | color, typography |
| `core/post-content` | Post content | layout |
| `core/post-featured-image` | Featured image | border, shadow |
| `core/post-excerpt` | Post excerpt | color, typography |
| `core/comments` | Comments section | color, typography |

## Block Supports

### Color Support

```json
{
  "color": {
    "background": true,
    "text": true,
    "link": true,
    "gradients": true,
    "heading": true,
    "button": true,
    "caption": true
  }
}
```

**CSS Variables Generated:**
- `--wp--preset--color--{slug}`
- `--wp--preset--gradient--{slug}`

### Typography Support

```json
{
  "typography": {
    "fontSize": true,
    "fontFamily": true,
    "fontWeight": true,
    "fontStyle": true,
    "textTransform": true,
    "textDecoration": true,
    "letterSpacing": true,
    "lineHeight": true,
    "writingMode": true,
    "textColumns": true
  }
}
```

**CSS Variables Generated:**
- `--wp--preset--font-size--{slug}`
- `--wp--preset--font-family--{slug}`

### Spacing Support

```json
{
  "spacing": {
    "margin": true,
    "padding": true,
    "blockGap": true
  }
}
```

**CSS Variables Generated:**
- `--wp--preset--spacing--{slug}`

### Border Support

```json
{
  "border": {
    "color": true,
    "radius": true,
    "style": true,
    "width": true
  }
}
```

### Alignment Support

```json
{
  "align": ["none", "left", "center", "right", "wide", "full"]
}
```

## Usage Patterns

### Content Composition

```html
<!-- Hero Section -->
<!-- wp:cover {"dimRatio":50,"minHeight":500} -->
<div class="wp-block-cover">
  <!-- wp:heading {"level":1} -->
  <h1>Welcome</h1>
  <!-- /wp:heading -->
  <!-- wp:paragraph -->
  <p>Introduction text</p>
  <!-- /wp:paragraph -->
  <!-- wp:buttons -->
  <div class="wp-block-buttons">
    <!-- wp:button -->
    <div class="wp-block-button"><a class="wp-block-button__link">Get Started</a></div>
    <!-- /wp:button -->
  </div>
  <!-- /wp:buttons -->
</div>
<!-- /wp:cover -->
```

### Multi-Column Layout

```html
<!-- wp:columns -->
<div class="wp-block-columns">
  <!-- wp:column {"width":"33.33%"} -->
  <div class="wp-block-column">
    <!-- Content -->
  </div>
  <!-- /wp:column -->
  <!-- wp:column {"width":"66.66%"} -->
  <div class="wp-block-column">
    <!-- Content -->
  </div>
  <!-- /wp:column -->
</div>
<!-- /wp:columns -->
```

### Query Loop

```html
<!-- wp:query {"queryId":1,"query":{"perPage":3,"postType":"post"}} -->
<div class="wp-block-query">
  <!-- wp:post-template -->
    <!-- wp:post-featured-image /-->
    <!-- wp:post-title /-->
    <!-- wp:post-excerpt /-->
  <!-- /wp:post-template -->
  <!-- wp:query-pagination /-->
</div>
<!-- /wp:query -->
```

## Accessibility Considerations

### Required Attributes

| Block | Required | Purpose |
|-------|----------|---------|
| `core/image` | `alt` | Screen reader description |
| `core/button` | Link text | Accessible name |
| `core/navigation` | `ariaLabel` | Navigation landmark |
| `core/search` | `label` | Form label |

### Focus Management

- Navigation blocks manage focus for keyboard users
- Modal/overlay blocks trap focus appropriately
- Skip links supported in theme blocks

### ARIA Roles

| Block | ARIA Role |
|-------|-----------|
| `core/navigation` | `navigation` |
| `core/search` | `search` |
| `core/separator` | `separator` |
| `core/group` (with heading) | `region` |

## Block Attributes

### Common Attribute Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text value | `"Hello World"` |
| `boolean` | True/false | `true` |
| `number` | Numeric | `16` |
| `array` | List of values | `["item1", "item2"]` |
| `object` | Key-value pairs | `{"key": "value"}` |
| `rich-text` | Formatted content | HTML with formatting |

### Attribute Sources

| Source | Description |
|--------|-------------|
| `attribute` | HTML attribute value |
| `text` | Inner text content |
| `html` | Inner HTML content |
| `query` | Multiple elements via selector |
| `meta` | Post meta field |

## Theme Integration

### Global Styles

Blocks integrate with theme.json for consistent styling:

```json
{
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        {"slug": "primary", "color": "#0073aa", "name": "Primary"}
      ]
    },
    "typography": {
      "fontSizes": [
        {"slug": "small", "size": "14px", "name": "Small"}
      ]
    },
    "spacing": {
      "spacingSizes": [
        {"slug": "20", "size": "20px", "name": "Small"}
      ]
    }
  }
}
```

### Block Styles

Register custom block styles:

```php
register_block_style('core/button', [
    'name' => 'outline',
    'label' => __('Outline', 'theme'),
]);
```

## Related Resources

- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block Library Source](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library)
- [theme.json Reference](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)
- [WPHelpers Block Explorer](https://wphelpers.dev/blocks)
