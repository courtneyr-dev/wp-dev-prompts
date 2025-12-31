# Accessibility Linting

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Automated accessibility testing with axe-core and related tools

<skill>
<summary>
Running automated accessibility checks using axe-core, eslint-plugin-jsx-a11y, and Playwright for WordPress projects.
</summary>

<knowledge>
## Why Automated A11y Testing?

Automated tools catch 20-50% of accessibility issues:
- **Fast feedback** - Immediate results in CI
- **Consistency** - Same checks every time
- **Baseline** - Catches obvious violations
- **Regression prevention** - Detects new issues

Note: Manual testing and user testing remain essential.

## axe-core Integration

### With Playwright

**Install:**
```bash
npm install --save-dev @axe-core/playwright
```

**Test file:**
```javascript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
    test('homepage has no critical violations', async ({ page }) => {
        await page.goto('/');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('admin settings page is accessible', async ({ page }) => {
        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        const results = await new AxeBuilder({ page })
            .include('#wpbody-content')
            .exclude('.notice')  // Exclude transient notices
            .analyze();

        expect(results.violations).toEqual([]);
    });
});
```

### With Jest and Testing Library

**Install:**
```bash
npm install --save-dev jest-axe @testing-library/react
```

**Test file:**
```javascript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import MyComponent from './MyComponent';

expect.extend(toHaveNoViolations);

test('MyComponent is accessible', async () => {
    const { container } = render(<MyComponent />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
});
```

## ESLint JSX A11y

**Install:**
```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

**.eslintrc.js:**
```javascript
module.exports = {
    extends: [
        'plugin:jsx-a11y/recommended',
        // or 'plugin:jsx-a11y/strict' for stricter checks
    ],
    plugins: ['jsx-a11y'],
    rules: {
        // Customize as needed
        'jsx-a11y/no-autofocus': 'warn',
        'jsx-a11y/anchor-is-valid': ['error', {
            components: ['Link'],
            specialLink: ['to'],
        }],
    },
};
```

**Common rules:**
```javascript
{
    // Images must have alt text
    'jsx-a11y/alt-text': 'error',

    // Anchors must have content
    'jsx-a11y/anchor-has-content': 'error',

    // ARIA roles must be valid
    'jsx-a11y/aria-role': 'error',

    // Form controls must have labels
    'jsx-a11y/label-has-associated-control': 'error',

    // Interactive elements must be focusable
    'jsx-a11y/interactive-supports-focus': 'error',

    // Click handlers need keyboard handlers
    'jsx-a11y/click-events-have-key-events': 'error',
}
```

## HTML Validation

### pa11y

**Install:**
```bash
npm install --save-dev pa11y pa11y-ci
```

**Configuration (.pa11yci.json):**
```json
{
    "defaults": {
        "timeout": 10000,
        "wait": 500,
        "standard": "WCAG2AA",
        "runners": ["axe", "htmlcs"]
    },
    "urls": [
        "http://localhost:8080/",
        "http://localhost:8080/sample-page/",
        {
            "url": "http://localhost:8080/wp-admin/",
            "actions": [
                "set field #user_login to admin",
                "set field #user_pass to password",
                "click element #wp-submit",
                "wait for url to not be http://localhost:8080/wp-login.php"
            ]
        }
    ]
}
```

**Run:**
```bash
npx pa11y-ci
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Accessibility

on: [push, pull_request]

jobs:
  a11y-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci

      - name: ESLint A11y
        run: npx eslint --ext .jsx,.tsx src/ --rule 'jsx-a11y/*: error'

  a11y-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Start server
        run: npm run start &

      - name: Wait for server
        run: npx wait-on http://localhost:8080

      - name: Run axe tests
        run: npx playwright test --grep @a11y
```

## WordPress-Specific Checks

### Block Editor Accessibility

```javascript
import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Block inserter is accessible', async ({ page }) => {
    await page.goto('/wp-admin/post-new.php');

    // Open block inserter
    await page.click('[aria-label="Toggle block inserter"]');
    await page.waitForSelector('.block-editor-inserter__content');

    const results = await new AxeBuilder({ page })
        .include('.block-editor-inserter__content')
        .analyze();

    expect(results.violations).toEqual([]);
});
```

### Admin Screen Checks

```javascript
const adminPages = [
    '/wp-admin/',
    '/wp-admin/edit.php',
    '/wp-admin/plugins.php',
    '/wp-admin/options-general.php?page=my-plugin',
];

for (const url of adminPages) {
    test(`${url} is accessible`, async ({ page }) => {
        await page.goto(url);
        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations).toEqual([]);
    });
}
```

## Common Violations and Fixes

### Missing Alt Text

```jsx
// Violation
<img src="photo.jpg" />

// Fix: Add alt text
<img src="photo.jpg" alt="Team photo from 2024 retreat" />

// Fix: Decorative image
<img src="decorative.jpg" alt="" role="presentation" />
```

### Color Contrast

```css
/* Violation: 2.5:1 contrast */
.text { color: #777; background: #fff; }

/* Fix: 4.5:1 contrast for normal text */
.text { color: #595959; background: #fff; }
```

### Missing Form Labels

```jsx
// Violation
<input type="email" placeholder="Email" />

// Fix
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### Interactive Elements Without Keyboard Access

```jsx
// Violation
<div onClick={handleClick}>Click me</div>

// Fix
<button onClick={handleClick}>Click me</button>

// Or if div is required
<div
    role="button"
    tabIndex={0}
    onClick={handleClick}
    onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
    Click me
</div>
```
</knowledge>

<best_practices>
- Run axe-core in CI on every PR
- Test with keyboard navigation
- Check color contrast automatically
- Use strict ESLint a11y rules
- Test with actual screen readers
- Don't rely solely on automated tools
</best_practices>

<commands>
```bash
# ESLint accessibility check
npx eslint --ext .jsx,.tsx src/ --rule 'jsx-a11y/*: error'

# Run axe with Playwright
npx playwright test --grep @a11y

# Run pa11y-ci
npx pa11y-ci

# Single page check
npx pa11y http://localhost:8080/
```
</commands>
</skill>
