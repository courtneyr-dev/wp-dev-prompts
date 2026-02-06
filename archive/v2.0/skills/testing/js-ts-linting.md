# JavaScript/TypeScript Linting

> **Type**: Skill
> **Domain**: Testing
> **Focus**: ESLint configuration for WordPress JavaScript and TypeScript projects

<skill>
<summary>
Setting up ESLint for WordPress block development with @wordpress/eslint-plugin and TypeScript support.
</summary>

<knowledge>
## WordPress ESLint Setup

### Install

```bash
npm install --save-dev eslint @wordpress/eslint-plugin
```

### Configuration (.eslintrc.js)

```javascript
module.exports = {
    extends: ['plugin:@wordpress/eslint-plugin/recommended'],
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        // Customize as needed
    },
};
```

### With TypeScript

```bash
npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

**.eslintrc.js:**
```javascript
module.exports = {
    extends: [
        'plugin:@wordpress/eslint-plugin/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        // TypeScript handles these
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',

        // Allow WordPress coding style
        '@typescript-eslint/no-explicit-any': 'warn',
    },
};
```

## Rule Categories

### WordPress Specific Rules

```javascript
{
    // i18n rules
    '@wordpress/i18n-text-domain': ['error', {
        allowedTextDomain: 'my-plugin',
    }],
    '@wordpress/i18n-translator-comments': 'error',
    '@wordpress/i18n-no-variables': 'error',

    // React rules for blocks
    '@wordpress/no-unused-vars-before-return': 'error',
    '@wordpress/dependency-group': 'error',

    // Security
    '@wordpress/no-unsafe-wp-apis': 'error',
}
```

### Code Quality Rules

```javascript
{
    // Complexity
    'complexity': ['warn', { max: 10 }],
    'max-depth': ['warn', { max: 4 }],
    'max-lines-per-function': ['warn', { max: 50 }],

    // Best practices
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'error',
    'eqeqeq': 'error',
    'curly': 'error',

    // ES6+
    'prefer-const': 'error',
    'prefer-template': 'warn',
    'no-var': 'error',
}
```

### React/JSX Rules

```javascript
{
    // JSX
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-key': 'error',

    // Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // React 17+ (no need to import React)
    'react/react-in-jsx-scope': 'off',
}
```

## TypeScript Configuration

### tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "node",
        "jsx": "react-jsx",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./build",
        "rootDir": "./src",
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "types": ["@types/wordpress__*"]
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "build"]
}
```

### WordPress Types

```bash
npm install --save-dev @types/wordpress__block-editor @types/wordpress__blocks @types/wordpress__components
```

## Common Patterns

### Block Registration (TypeScript)

```typescript
import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

const blockConfig: BlockConfiguration = {
    ...metadata,
    edit: Edit,
    save,
};

registerBlockType(metadata.name, blockConfig);
```

### Component with Hooks

```typescript
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import type { Attributes } from './types';

export default function Edit({ attributes, setAttributes }: BlockEditProps<Attributes>) {
    const [isLoading, setIsLoading] = useState(false);
    const blockProps = useBlockProps();

    useEffect(() => {
        // Effect logic
    }, [attributes.someValue]);

    return (
        <div {...blockProps}>
            {/* Block content */}
        </div>
    );
}
```

## CI/CD Integration

### GitHub Actions

```yaml
name: JavaScript Lint

on: [push, pull_request]

jobs:
  eslint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: ESLint
        run: npx eslint src/ --ext .js,.jsx,.ts,.tsx

      - name: TypeScript Check
        run: npx tsc --noEmit

  eslint-report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: ESLint with SARIF output
        run: |
          npx eslint src/ \
            --ext .js,.jsx,.ts,.tsx \
            --format @microsoft/eslint-formatter-sarif \
            --output-file eslint-results.sarif
        continue-on-error: true

      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: eslint-results.sarif
```

### Pre-commit Hook

**package.json:**
```json
{
    "scripts": {
        "lint": "eslint src/ --ext .js,.jsx,.ts,.tsx",
        "lint:fix": "eslint src/ --ext .js,.jsx,.ts,.tsx --fix",
        "typecheck": "tsc --noEmit"
    },
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
            "eslint --fix"
        ]
    }
}
```

**.husky/pre-commit:**
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

## Ignore Patterns

### .eslintignore

```
node_modules/
build/
dist/
vendor/
*.min.js
```

### Inline Ignores

```javascript
// eslint-disable-next-line no-console
console.log('Debug info');

/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { __experimentalBlock } from '@wordpress/blocks';
/* eslint-enable @wordpress/no-unsafe-wp-apis */
```

## Common Errors and Fixes

### Missing Dependencies in useEffect

```javascript
// Warning: React Hook useEffect has missing dependency
useEffect(() => {
    fetchData(id);
}, []); // Missing 'id' and 'fetchData'

// Fix: Add dependencies
useEffect(() => {
    fetchData(id);
}, [id, fetchData]);
```

### Unsafe Experimental APIs

```javascript
// Error: Usage of __experimental API
import { __experimentalFoo } from '@wordpress/components';

// Fix: Use stable alternative or add ignore with justification
/* eslint-disable-next-line @wordpress/no-unsafe-wp-apis -- No stable alternative */
import { __experimentalFoo } from '@wordpress/components';
```

### Missing i18n Text Domain

```javascript
// Error: Missing text domain
__('Hello');

// Fix
__('Hello', 'my-plugin');
```
</knowledge>

<best_practices>
- Use @wordpress/eslint-plugin for blocks
- Enable TypeScript for type safety
- Configure i18n text domain rule
- Run linting in CI on every PR
- Use lint-staged for pre-commit checks
- Keep ESLint rules in sync with PHPCS
</best_practices>

<commands>
```bash
# Run ESLint
npx eslint src/ --ext .js,.jsx,.ts,.tsx

# Fix auto-fixable issues
npx eslint src/ --ext .js,.jsx,.ts,.tsx --fix

# Check TypeScript
npx tsc --noEmit

# Run specific rule
npx eslint src/ --rule '@wordpress/i18n-text-domain: error'
```
</commands>
</skill>
