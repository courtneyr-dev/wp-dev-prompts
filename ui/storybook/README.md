# Storybook

Component development environment with support for 10 aesthetic style languages, accessibility testing, and WordPress compatibility.

## Quick Start

```bash
cd ui/storybook

# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build static Storybook
npm run build-storybook
```

## Directory Structure

```
ui/storybook/
├── README.md               # This file
├── .storybook/
│   ├── main.js            # Storybook configuration
│   └── preview.js         # Theme and decorator setup
├── stories/
│   ├── Introduction.mdx   # Welcome documentation
│   ├── Button.stories.jsx # Button component examples
│   ├── Icons.stories.jsx  # WordPress icon gallery
│   └── ui-ux/             # UI/UX testing stories
│       ├── VisualHierarchy.stories.tsx
│       ├── ResponsiveCheck.stories.tsx
│       └── InteractiveStates.stories.tsx
└── styles/
    ├── style-languages.css    # 10 aesthetic themes
    └── wordpress-compat.css   # WordPress custom property mapping
```

## Features

### Style Language Themes

Switch between 10 aesthetic styles in the Storybook toolbar:

| Theme | Description |
|-------|-------------|
| Art Deco | Geometric patterns, gold accents, luxury |
| Brutalist | Raw, bold, high-contrast |
| Nordic | Minimal, light, functional |
| Neo-Classical | Elegant, symmetrical, refined |
| Biophilic | Nature-inspired, organic |
| Maximalist | Bold, layered, expressive |
| Zen | Simple, balanced, intentional |
| Cyberpunk | Neon, dark, futuristic |
| Bauhaus | Functional, geometric |
| Retro-Futurism | Vintage sci-fi, optimistic |

### Accessibility Testing

Built-in accessibility addon with:

- Automated a11y rule checking
- Color contrast validation
- ARIA role verification
- Keyboard navigation testing

### Responsive Testing

Viewport addon with WordPress breakpoints:

- Mobile: 360px
- Mobile Large: 480px
- Tablet: 782px
- Desktop: 1024px
- Wide: 1280px

### RTL Support

Toggle RTL mode to test right-to-left layouts:

- Available in toolbar
- Applies `dir="rtl"` to preview
- Tests bidirectional text handling

### Reduced Motion

Test reduced motion preferences:

- Toggle in toolbar
- Applies `prefers-reduced-motion: reduce`
- Verifies animation alternatives

## Configuration

### main.js

```javascript
module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    'storybook-addon-pseudo-states',
  ],
  framework: '@storybook/react-webpack5',
};
```

### preview.js

Configures themes, decorators, and global parameters:

```javascript
export const globalTypes = {
  theme: {
    name: 'Style Language',
    defaultValue: 'art-deco',
    toolbar: {
      items: ['art-deco', 'brutalist', 'nordic', ...],
    },
  },
  rtl: { ... },
  reducedMotion: { ... },
};
```

## WordPress Integration

### CSS Custom Properties

Style languages use CSS custom properties compatible with WordPress:

```css
/* Storybook token */
--color-primary: #D4AF37;

/* WordPress preset equivalent */
--wp--preset--color--primary: #D4AF37;
```

### theme.json Mapping

Export styles to WordPress theme.json format:

```json
{
  "settings": {
    "color": {
      "palette": [
        { "slug": "primary", "color": "var(--color-primary)" }
      ]
    }
  }
}
```

See `styles/wordpress-compat.css` for the full mapping.

## Creating Stories

### Basic Story

```jsx
// stories/MyComponent.stories.jsx
import { MyComponent } from './MyComponent';

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    a11y: { /* accessibility config */ },
  },
};

export const Default = {
  args: {
    label: 'Click me',
  },
};
```

### With Accessibility Tests

```jsx
export const Accessible = {
  args: { label: 'Button' },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
  },
};
```

### With Theme Variations

```jsx
export const AllThemes = {
  render: (args) => (
    <>
      {themes.map(theme => (
        <div key={theme} data-theme={theme}>
          <MyComponent {...args} />
        </div>
      ))}
    </>
  ),
};
```

## Testing

### Accessibility Testing

```bash
# Run Storybook accessibility tests
npm run test-storybook

# With specific browsers
npm run test-storybook -- --browsers chromium
```

### Visual Regression

```bash
# Capture snapshots
npm run test:visual

# Update snapshots
npm run test:visual -- --update-snapshots
```

## Related Resources

- **Prompts**: [../../prompts/frontend-design/](../../prompts/frontend-design/) - Component design prompts
- **Prompts**: [../../prompts/frontend-design/style-language.md](../../prompts/frontend-design/style-language.md) - Style language definitions
- **Prompts**: [../../prompts/testing/](../../prompts/testing/) - UI/UX testing prompts
- **Tests**: [../../tests/ui-ux/](../../tests/ui-ux/) - Playwright UI/UX tests
- **Docs**: [../../docs/ui-ux-audit.md](../../docs/ui-ux-audit.md) - UI/UX audit guide
- **Docs**: [../../docs/ui-ux-guidelines.md](../../docs/ui-ux-guidelines.md) - Design principles
- **Skills**: [../../skills/accessibility/](../../skills/accessibility/) - Accessibility knowledge
- **Agents**: [../../agents/specialists/accessibility.md](../../agents/specialists/accessibility.md) - A11y specialist
- **CI**: [../../.github/workflows/ci-nightly.yml](../../.github/workflows/ci-nightly.yml) - Visual regression tests
- **CI**: [../../.github/workflows/ui-ux-audit.yml](../../.github/workflows/ui-ux-audit.yml) - UI/UX audit workflow

## Adding New Themes

1. Add CSS in `styles/style-languages.css`:

```css
[data-theme="my-theme"] {
  --color-primary: #abc123;
  --color-secondary: #def456;
  /* ... */
}
```

2. Register in `preview.js`:

```javascript
items: [..., { value: 'my-theme', title: 'My Theme' }]
```

3. Update `wordpress-compat.css` if needed
