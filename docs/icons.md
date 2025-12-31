# WordPress Core Icons Reference

> A comprehensive guide to the WordPress icon library from `@wordpress/icons`.

## Overview

The WordPress icons library provides 400+ SVG icons used throughout the block editor and WordPress admin. Icons are optimized for 24x24 display and inherit `currentColor` for easy theming.

## Installation

```bash
npm install @wordpress/icons
```

## Basic Usage

### React/JSX

```jsx
import { Icon, plus, settings, image } from '@wordpress/icons';

// Basic usage
<Icon icon={plus} />

// With custom size
<Icon icon={settings} size={32} />

// With custom styling
<Icon
  icon={image}
  style={{ color: '#0073aa' }}
/>
```

### PHP (Block Registration)

```php
register_block_type('my-plugin/block', [
    'icon' => 'admin-users', // Dashicon slug
    // or SVG string for custom icon
    'icon' => '<svg>...</svg>',
]);
```

## Icon Categories

### Alignment & Layout

| Icon Name | Usage | Accessibility Label |
|-----------|-------|---------------------|
| `alignCenter` | Center alignment | "Align center" |
| `alignLeft` | Left alignment | "Align left" |
| `alignRight` | Right alignment | "Align right" |
| `alignNone` | No alignment | "No alignment" |
| `justifyCenter` | Justify center | "Justify center" |
| `justifyLeft` | Justify left | "Justify left" |
| `justifyRight` | Justify right | "Justify right" |
| `justifySpaceBetween` | Space between | "Space between" |
| `stretchFullWidth` | Full width | "Full width" |
| `stretchWide` | Wide width | "Wide width" |

### Arrows & Navigation

| Icon Name | Usage | Accessibility Label |
|-----------|-------|---------------------|
| `arrowDown` | Down arrow | "Move down" |
| `arrowUp` | Up arrow | "Move up" |
| `arrowLeft` | Left arrow | "Move left" |
| `arrowRight` | Right arrow | "Move right" |
| `chevronDown` | Expand/dropdown | "Expand" |
| `chevronUp` | Collapse | "Collapse" |
| `chevronLeft` | Previous | "Previous" |
| `chevronRight` | Next | "Next" |
| `navigation` | Navigation menu | "Navigation" |
| `menu` | Hamburger menu | "Menu" |

### Text Formatting

| Icon Name | Usage | Accessibility Label |
|-----------|-------|---------------------|
| `formatBold` | Bold text | "Bold" |
| `formatItalic` | Italic text | "Italic" |
| `formatUnderline` | Underlined text | "Underline" |
| `formatStrikethrough` | Strikethrough | "Strikethrough" |
| `formatListBullets` | Bullet list | "Bulleted list" |
| `formatListNumbered` | Numbered list | "Numbered list" |
| `formatIndent` | Increase indent | "Indent" |
| `formatOutdent` | Decrease indent | "Outdent" |
| `textColor` | Text color | "Text color" |

### Media

| Icon Name | Usage | Accessibility Label |
|-----------|-------|---------------------|
| `image` | Image | "Image" |
| `gallery` | Image gallery | "Gallery" |
| `video` | Video | "Video" |
| `audio` | Audio | "Audio" |
| `file` | File | "File" |
| `media` | Media library | "Media" |
| `upload` | Upload | "Upload" |
| `cloudUpload` | Cloud upload | "Upload to cloud" |
| `download` | Download | "Download" |
| `crop` | Crop image | "Crop" |

### Block Types

| Icon Name | Usage | Accessibility Label |
|-----------|-------|---------------------|
| `paragraph` | Paragraph block | "Paragraph" |
| `heading` | Heading block | "Heading" |
| `quote` | Quote block | "Quote" |
| `list` | List block | "List" |
| `table` | Table block | "Table" |
| `button` | Button block | "Button" |
| `columns` | Columns block | "Columns" |
| `group` | Group block | "Group" |
| `separator` | Separator block | "Separator" |
| `spacer` | Spacer block | "Spacer" |
| `code` | Code block | "Code" |
| `html` | HTML block | "HTML" |

### Actions

| Icon Name | Usage | Accessibility Label |
|-----------|-------|---------------------|
| `plus` | Add new | "Add" |
| `plusCircle` | Add new (circle) | "Add" |
| `minus` | Remove | "Remove" |
| `close` | Close/dismiss | "Close" |
| `check` | Confirm/done | "Done" |
| `edit` | Edit | "Edit" |
| `trash` | Delete | "Delete" |
| `undo` | Undo | "Undo" |
| `redo` | Redo | "Redo" |
| `copy` | Copy | "Copy" |
| `search` | Search | "Search" |
| `link` | Add link | "Link" |
| `linkOff` | Remove link | "Unlink" |

### Status & Indicators

| Icon Name | Usage | Accessibility Label |
|-----------|-------|---------------------|
| `info` | Information | "Information" |
| `warning` | Warning | "Warning" |
| `help` | Help | "Help" |
| `lock` | Locked | "Locked" |
| `unlock` | Unlocked | "Unlocked" |
| `published` | Published | "Published" |
| `pending` | Pending | "Pending review" |
| `scheduled` | Scheduled | "Scheduled" |
| `draft` | Draft | "Draft" |
| `star` | Star/favorite | "Favorite" |

### UI Controls

| Icon Name | Usage | Accessibility Label |
|-----------|-------|---------------------|
| `settings` | Settings | "Settings" |
| `cog` | Configuration | "Configuration" |
| `moreHorizontal` | More options | "More options" |
| `moreVertical` | More options | "More options" |
| `fullscreen` | Fullscreen | "Fullscreen" |
| `styles` | Styles panel | "Styles" |
| `sidebar` | Toggle sidebar | "Sidebar" |
| `desktop` | Desktop view | "Desktop" |
| `mobile` | Mobile view | "Mobile" |
| `tablet` | Tablet view | "Tablet" |

## Accessibility Best Practices

### Always Provide Labels

```jsx
// For interactive elements
<Button icon={<Icon icon={plus} />} label="Add new item" />

// For standalone icons
<Icon icon={warning} aria-label="Warning: This action cannot be undone" />
```

### Use Descriptive Labels

```jsx
// Bad - too vague
<Icon icon={plus} aria-label="Plus" />

// Good - describes the action
<Icon icon={plus} aria-label="Add new post" />
```

### Hide Decorative Icons

```jsx
// Decorative icons should be hidden from screen readers
<span aria-hidden="true">
  <Icon icon={star} />
</span>
<span>Favorite</span>
```

## CSS Variables Integration

### Color Inheritance

Icons inherit `currentColor` by default:

```css
.my-button {
  color: var(--wp--preset--color--primary);
}

.my-button svg {
  /* Automatically uses primary color */
}
```

### Custom Sizing

```css
.icon-small svg {
  width: 16px;
  height: 16px;
}

.icon-large svg {
  width: 48px;
  height: 48px;
}
```

## Block Editor Integration

### Toolbar Icons

```jsx
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { alignLeft, alignCenter, alignRight } from '@wordpress/icons';

<BlockControls>
  <ToolbarGroup>
    <ToolbarButton
      icon={alignLeft}
      label="Align left"
      onClick={() => setAlign('left')}
      isActive={align === 'left'}
    />
    <ToolbarButton
      icon={alignCenter}
      label="Align center"
      onClick={() => setAlign('center')}
      isActive={align === 'center'}
    />
    <ToolbarButton
      icon={alignRight}
      label="Align right"
      onClick={() => setAlign('right')}
      isActive={align === 'right'}
    />
  </ToolbarGroup>
</BlockControls>
```

### Inspector Icons

```jsx
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { settings } from '@wordpress/icons';

<InspectorControls>
  <PanelBody
    title="Block Settings"
    icon={settings}
    initialOpen={true}
  >
    {/* Panel content */}
  </PanelBody>
</InspectorControls>
```

## Creating Custom Icons

### SVG Format

```jsx
const customIcon = (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 12h3v9h6v-6h2v6h6v-9h3L12 2z" />
  </svg>
);

// Use like any other icon
<Icon icon={customIcon} />
```

### Registering for Blocks

```php
register_block_type('my-plugin/custom-block', [
    'icon' => [
        'src' => '<svg viewBox="0 0 24 24"><path d="..."/></svg>',
        'foreground' => '#0073aa',
        'background' => '#ffffff',
    ],
]);
```

## Related Resources

- [WordPress Icons Package](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/)
- [Dashicons Reference](https://developer.wordpress.org/resource/dashicons/)
- [WPHelpers Icon Explorer](https://wphelpers.dev/icons)
- [Icon Accessibility Guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/)
