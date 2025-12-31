/**
 * Button Component Stories
 *
 * Demonstrates button styling across all aesthetic languages.
 *
 * @package wp-dev-prompts
 */

import React from 'react';

// Simple Button component for demonstration
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  ...props
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-family-sans, inherit)',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'var(--transition-fast, 150ms ease)',
    border: 'none',
    borderRadius: 'var(--radius-md, 4px)',
  };

  const sizeStyles = {
    small: { padding: '8px 16px', fontSize: '0.875rem' },
    medium: { padding: '12px 24px', fontSize: '1rem' },
    large: { padding: '16px 32px', fontSize: '1.125rem' },
  };

  const variantStyles = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-text-inverse, white)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-primary)',
    },
    destructive: {
      background: 'var(--color-error, #dc3232)',
      color: 'white',
    },
  };

  return (
    <button
      style={{ ...baseStyles, ...sizeStyles[size], ...variantStyles[variant] }}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="spinner" aria-hidden="true">⏳</span>
      )}
      {children}
    </button>
  );
};

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive'],
      description: 'Button visual style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component that adapts to the active style language.',
      },
    },
  },
};

// Default story
export const Primary = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Destructive = {
  args: {
    children: 'Delete Item',
    variant: 'destructive',
  },
};

// Size variants
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

// States
export const States = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

// With icon
export const WithIcon = {
  args: {
    children: (
      <>
        <span aria-hidden="true">+</span>
        Add Item
      </>
    ),
  },
};

// Accessibility test story
export const AccessibilityTest = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>Keyboard Navigation Test</h3>
      <p>Tab through these buttons to test focus states:</p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button>First Button</Button>
        <Button variant="secondary">Second Button</Button>
        <Button variant="destructive">Third Button</Button>
      </div>

      <h3>Screen Reader Test</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button aria-label="Add new item">
          <span aria-hidden="true">+</span>
        </Button>
        <Button aria-expanded="false" aria-haspopup="menu">
          Menu
        </Button>
      </div>
    </div>
  ),
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'color-contrast', enabled: true },
          { id: 'focus-visible', enabled: true },
        ],
      },
    },
  },
};

// RTL test
export const RTLSupport = {
  render: () => (
    <div dir="rtl" style={{ textAlign: 'right' }}>
      <h3>RTL Layout Test</h3>
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'row-reverse' }}>
        <Button>
          <span aria-hidden="true">→</span>
          הבא
        </Button>
        <Button variant="secondary">
          <span aria-hidden="true">←</span>
          קודם
        </Button>
      </div>
    </div>
  ),
};

// Long text test
export const LongText = {
  args: {
    children: 'This is a button with very long text that might wrap on smaller screens',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};
