# CSS Linting

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Stylelint configuration for WordPress CSS and SCSS projects

<skill>
<summary>
Setting up Stylelint for WordPress development with @wordpress/stylelint-config.
</summary>

<knowledge>
## WordPress Stylelint Setup

### Install

```bash
npm install --save-dev stylelint @wordpress/stylelint-config
```

### Configuration (.stylelintrc.json)

```json
{
    "extends": "@wordpress/stylelint-config",
    "rules": {
        "selector-class-pattern": null
    }
}
```

### For SCSS

```bash
npm install --save-dev @wordpress/stylelint-config-scss
```

**.stylelintrc.json:**
```json
{
    "extends": "@wordpress/stylelint-config-scss",
    "rules": {
        "selector-class-pattern": null,
        "scss/at-import-partial-extension": null
    }
}
```

## Rule Categories

### Formatting Rules

```json
{
    "rules": {
        "indentation": "tab",
        "string-quotes": "double",
        "declaration-colon-space-after": "always",
        "declaration-colon-space-before": "never",
        "block-opening-brace-space-before": "always",
        "declaration-block-trailing-semicolon": "always"
    }
}
```

### Error Prevention

```json
{
    "rules": {
        "color-no-invalid-hex": true,
        "font-family-no-duplicate-names": true,
        "function-calc-no-unspaced-operator": true,
        "property-no-unknown": true,
        "declaration-block-no-duplicate-properties": true,
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-element-no-unknown": true,
        "no-duplicate-selectors": true
    }
}
```

### Best Practices

```json
{
    "rules": {
        "declaration-no-important": true,
        "selector-max-id": 0,
        "max-nesting-depth": 3,
        "selector-max-compound-selectors": 4,
        "no-descending-specificity": true,
        "shorthand-property-no-redundant-values": true
    }
}
```

## WordPress Block Styles

### Block Editor Patterns

```scss
// Block wrapper styles
.wp-block-my-plugin-my-block {
    // Use CSS logical properties
    padding-inline: 1rem;
    margin-block: 1rem;

    // Theme spacing
    gap: var(--wp--preset--spacing--20);

    // Theme colors
    background-color: var(--wp--preset--color--background);
    color: var(--wp--preset--color--foreground);
}

// Editor-only styles
.editor-styles-wrapper {
    .wp-block-my-plugin-my-block {
        outline: 1px dashed currentColor;
    }
}
```

### theme.json Integration

```scss
// Use CSS custom properties from theme.json
.my-component {
    // Spacing
    padding: var(--wp--preset--spacing--40);

    // Colors
    background: var(--wp--preset--color--primary);

    // Typography
    font-family: var(--wp--preset--font-family--heading);
    font-size: var(--wp--preset--font-size--large);
}
```

## CI/CD Integration

### GitHub Actions

```yaml
name: CSS Lint

on: [push, pull_request]

jobs:
  stylelint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Stylelint
        run: npx stylelint "src/**/*.{css,scss}"

  stylelint-report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Stylelint with annotations
        run: |
          npx stylelint "src/**/*.{css,scss}" \
            --formatter github
```

### Pre-commit Hook

**package.json:**
```json
{
    "scripts": {
        "lint:css": "stylelint 'src/**/*.{css,scss}'",
        "lint:css:fix": "stylelint 'src/**/*.{css,scss}' --fix"
    },
    "lint-staged": {
        "*.{css,scss}": [
            "stylelint --fix"
        ]
    }
}
```

## Ignore Patterns

### .stylelintignore

```
node_modules/
build/
dist/
vendor/
*.min.css
```

### Inline Ignores

```css
/* stylelint-disable-next-line declaration-no-important */
color: red !important;

/* stylelint-disable selector-max-id */
#legacy-container {
    /* Legacy code */
}
/* stylelint-enable selector-max-id */
```

## Common Issues and Fixes

### No !important

```css
/* Error */
.my-class {
    color: red !important;
}

/* Fix: Increase specificity */
.my-plugin .my-class {
    color: red;
}

/* Or use CSS custom properties */
.my-class {
    color: var(--my-plugin-color, red);
}
```

### Max Nesting Depth

```scss
/* Error: 4 levels of nesting */
.block {
    .inner {
        .content {
            .text {
                color: red;
            }
        }
    }
}

/* Fix: Flatten with BEM or utility classes */
.block__text {
    color: red;
}
```

### Selector Specificity

```css
/* Error: ID selector */
#my-form {
    padding: 1rem;
}

/* Fix: Use class */
.my-form {
    padding: 1rem;
}
```

### Duplicate Selectors

```css
/* Error: Duplicate selector */
.button { color: blue; }
/* ... later in file ... */
.button { background: white; }

/* Fix: Combine */
.button {
    color: blue;
    background: white;
}
```

## Extended Configuration

### With Prettier

```bash
npm install --save-dev stylelint-config-prettier-scss
```

**.stylelintrc.json:**
```json
{
    "extends": [
        "@wordpress/stylelint-config-scss",
        "stylelint-config-prettier-scss"
    ]
}
```

### Custom Property Pattern

```json
{
    "rules": {
        "custom-property-pattern": "^(wp|my-plugin)--",
        "selector-class-pattern": "^(wp-block-|my-plugin-|is-|has-)"
    }
}
```

### Order Rules

```bash
npm install --save-dev stylelint-order
```

**.stylelintrc.json:**
```json
{
    "extends": "@wordpress/stylelint-config",
    "plugins": ["stylelint-order"],
    "rules": {
        "order/properties-alphabetical-order": true
    }
}
```
</knowledge>

<best_practices>
- Use @wordpress/stylelint-config for blocks
- Avoid !important declarations
- Use CSS custom properties for theming
- Keep nesting depth under 3 levels
- Use class selectors, not IDs
- Follow BEM or similar naming convention
</best_practices>

<commands>
```bash
# Run Stylelint
npx stylelint "src/**/*.{css,scss}"

# Fix auto-fixable issues
npx stylelint "src/**/*.{css,scss}" --fix

# Check specific file
npx stylelint src/blocks/my-block/style.scss

# Output in different format
npx stylelint "src/**/*.css" --formatter json
```
</commands>
</skill>
