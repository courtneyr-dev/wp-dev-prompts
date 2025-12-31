# 📖 Storybook A11y Specialist

> **Type**: Specialist
> **Domain**: Component Accessibility
> **Authority**: Storybook a11y addon, component-level testing

## 🎯 Mission

Ensure component-level accessibility in Storybook. Own a11y addon configuration, component story patterns for testing states, and accessibility documentation in stories.

## 📥 Inputs

- React/Vue/Gutenberg components
- Component variants and states
- A11y requirements per component
- Design system tokens

## 📤 Outputs

- Accessible component stories
- A11y addon configuration
- Component a11y documentation
- Automated a11y checks per story

---

## 🔧 When to Use

✅ **Use this agent when:**
- Setting up Storybook a11y addon
- Creating accessible component stories
- Testing component states for a11y
- Documenting component a11y

❌ **Don't use for:**
- Full page accessibility
- Integration testing
- Screen reader testing
- E2E accessibility testing

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Missing interactive states | Story for each interaction state |
| No keyboard demos | Stories with keyboard interaction |
| Ignoring a11y panel | Configure and check regularly |
| Context-dependent a11y | Provide proper story decorators |
| RTL not tested | RTL story variant |

---

## ✅ Checklist

### Addon Setup
- [ ] @storybook/addon-a11y installed
- [ ] Addon configured in main.js
- [ ] Rules customized if needed
- [ ] CI integration for a11y checks

### Story Patterns
- [ ] Default/rest state
- [ ] Hover/focus states
- [ ] Active/selected states
- [ ] Disabled states
- [ ] Error/validation states
- [ ] Loading states

### Documentation
- [ ] ARIA usage documented
- [ ] Keyboard interaction documented
- [ ] Required context documented
- [ ] Known issues documented

### Testing
- [ ] All stories pass a11y checks
- [ ] Keyboard navigation works
- [ ] Focus visible on all states
- [ ] Color contrast passes

---

## 💬 Example Prompts

### Claude Code
```
@storybook-a11y-specialist Create stories for this Button component
that demonstrate all accessibility states: default, hover, focus,
active, disabled, loading.
```

### Cursor
```
Using storybook-a11y-specialist, configure the a11y addon for our
Storybook with WordPress-appropriate rules and document our Modal
component's keyboard requirements.
```

### GitHub Copilot
```
# Storybook A11y Task: Form Field Stories
#
# Create accessible stories for TextInput:
# - Default
# - With label
# - Required
# - With error
# - Disabled
# - With help text
#
# Include a11y documentation for each
```

### General Prompt
```
Set up Storybook accessibility for our component library:
1. Configure a11y addon
2. Create story template for accessibility
3. Add keyboard interaction stories
4. Document a11y requirements per component
5. Add RTL variant stories
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [a11y-tree-and-aria-auditor](a11y-tree-and-aria-auditor.md) | ARIA implementation |
| [keyboard-and-focus-specialist](keyboard-and-focus-specialist.md) | Keyboard stories |
| [visual-regression](../testing/visual-regression.md) | Story screenshots |
| [i18n-l10n-rtl-specialist](../wordpress/i18n-l10n-rtl-specialist.md) | RTL stories |

---

## 📋 Storybook A11y Setup

### Installation

```bash
npm install @storybook/addon-a11y --save-dev
```

### Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
    ],
};

export default config;
```

### Global A11y Parameters

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react';

const preview: Preview = {
    parameters: {
        a11y: {
            // axe-core configuration
            config: {
                rules: [
                    // Disable color-contrast for WordPress admin styles
                    { id: 'color-contrast', enabled: false },
                ],
            },
            // Run on all stories
            manual: false,
        },
    },
};

export default preview;
```

---

## 🧱 Component Story Patterns

### Button Component

```typescript
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
## Accessibility

### Keyboard Interaction
- **Enter/Space**: Activates the button
- **Tab**: Moves focus to the button

### ARIA
- Uses native \`<button>\` element
- \`aria-disabled\` for disabled state (keeps focus)
- \`aria-busy\` for loading state

### Focus
- Visible focus indicator on keyboard focus
- Focus ring meets 3:1 contrast ratio
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Click me',
    },
};

export const Focused: Story = {
    args: {
        children: 'Focused button',
    },
    parameters: {
        pseudo: { focus: true },
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled button',
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled buttons use `aria-disabled` to maintain focusability for screen readers.',
            },
        },
    },
};

export const Loading: Story = {
    args: {
        children: 'Loading...',
        isLoading: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Loading state sets `aria-busy="true"` and prevents activation.',
            },
        },
    },
};

export const WithIcon: Story = {
    args: {
        children: 'Download',
        icon: 'download',
    },
    parameters: {
        docs: {
            description: {
                story: 'Icons are decorative and hidden from screen readers with `aria-hidden`.',
            },
        },
    },
};

export const IconOnly: Story = {
    args: {
        icon: 'close',
        'aria-label': 'Close dialog',
    },
    parameters: {
        docs: {
            description: {
                story: 'Icon-only buttons require `aria-label` for accessible name.',
            },
        },
    },
};
```

### Form Input Component

```typescript
// src/components/TextInput/TextInput.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
    title: 'Components/TextInput',
    component: TextInput,
    parameters: {
        docs: {
            description: {
                component: `
## Accessibility

### Required Properties
- Always provide a \`label\` prop or \`aria-label\`
- Use \`id\` to associate label

### Error States
- Errors are associated via \`aria-describedby\`
- Invalid inputs have \`aria-invalid="true"\`

### Help Text
- Help text is associated via \`aria-describedby\`
- Combines with error text when both present
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
    args: {
        label: 'Email address',
        type: 'email',
        id: 'email',
    },
};

export const Required: Story = {
    args: {
        label: 'Full name',
        required: true,
        id: 'name',
    },
    parameters: {
        docs: {
            description: {
                story: 'Required fields have visual indicator and `aria-required="true"`.',
            },
        },
    },
};

export const WithHelpText: Story = {
    args: {
        label: 'Password',
        type: 'password',
        helpText: 'Must be at least 8 characters',
        id: 'password',
    },
};

export const WithError: Story = {
    args: {
        label: 'Email',
        type: 'email',
        error: 'Please enter a valid email address',
        id: 'email-error',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled field',
        disabled: true,
        value: 'Cannot edit',
        id: 'disabled',
    },
};
```

---

## 🔧 A11y Addon Configuration

### Per-Story Configuration

```typescript
export const ContrastException: Story = {
    parameters: {
        a11y: {
            config: {
                rules: [
                    // This story intentionally shows low contrast
                    { id: 'color-contrast', enabled: false },
                ],
            },
        },
    },
};

export const CustomContext: Story = {
    parameters: {
        a11y: {
            element: '#storybook-root', // Specific element to scan
        },
    },
};
```

### Disabling for Specific Stories

```typescript
export const KnownIssue: Story = {
    parameters: {
        a11y: {
            disable: true,
        },
    },
};
```

---

## 🌍 RTL Stories

```typescript
// Decorator for RTL
const RTLDecorator = (Story) => (
    <div dir="rtl" lang="ar">
        <Story />
    </div>
);

export const RTL: Story = {
    decorators: [RTLDecorator],
    parameters: {
        docs: {
            description: {
                story: 'Component in right-to-left layout.',
            },
        },
    },
};
```

---

## ⌨️ Keyboard Interaction Stories

```typescript
// Interactive keyboard demo
export const KeyboardDemo: Story = {
    render: () => {
        const [focused, setFocused] = useState(false);
        const [active, setActive] = useState(false);

        return (
            <div>
                <p>Try navigating with keyboard:</p>
                <Button
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setActive(true)}
                    onKeyUp={() => setActive(false)}
                >
                    {active ? 'Activated!' : focused ? 'Focused' : 'Tab to focus'}
                </Button>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo showing keyboard focus and activation.',
            },
        },
    },
};
```

---

## 📊 CI Integration

### Test Runner

```bash
npm install @storybook/test-runner --save-dev
```

```json
// package.json
{
    "scripts": {
        "test:storybook": "test-storybook",
        "test:storybook:a11y": "test-storybook --url http://localhost:6006 --ci"
    }
}
```

### GitHub Actions

```yaml
# .github/workflows/storybook-a11y.yml
name: Storybook A11y

on: [pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run build-storybook

      - name: Serve Storybook
        run: npx http-server storybook-static --port 6006 &

      - name: Wait for Storybook
        run: npx wait-on http://localhost:6006

      - name: Run a11y tests
        run: npm run test:storybook:a11y
```

---

## 📝 Documentation Template

```mdx
{/* src/components/Modal/Modal.mdx */}
import { Canvas, Meta, Story } from '@storybook/blocks';
import * as ModalStories from './Modal.stories';

<Meta of={ModalStories} />

# Modal

A dialog that appears on top of the main content.

## Accessibility Features

### Keyboard Interaction

| Key | Action |
|-----|--------|
| Tab | Move focus within modal |
| Shift+Tab | Move focus backwards |
| Escape | Close the modal |

### Focus Management

- Focus moves to modal when opened
- Focus is trapped within modal
- Focus returns to trigger on close

### ARIA

- `role="dialog"` on container
- `aria-modal="true"` to indicate modal nature
- `aria-labelledby` pointing to title
- `aria-describedby` for description (optional)

## Stories

<Canvas of={ModalStories.Default} />
<Canvas of={ModalStories.WithForm} />
<Canvas of={ModalStories.Confirmation} />
```
