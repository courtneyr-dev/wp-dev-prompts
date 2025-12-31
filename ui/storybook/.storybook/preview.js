/**
 * Storybook Preview Configuration
 *
 * Includes aesthetic style language themes and accessibility presets.
 *
 * @package wp-dev-prompts
 */

import { withThemeByClassName } from '@storybook/addon-themes';

// Import style language CSS
import '../styles/style-languages.css';
import '../styles/wordpress-compat.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Accessibility addon configuration
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
        ],
      },
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      },
    },
    // Viewport presets (WordPress breakpoints)
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        mobileLandscape: {
          name: 'Mobile Landscape',
          styles: { width: '667px', height: '375px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
        wide: {
          name: 'Wide Desktop',
          styles: { width: '1600px', height: '900px' },
        },
      },
    },
    // Background presets
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'light-gray', value: '#f5f5f5' },
        { name: 'dark', value: '#1e1e1e' },
        { name: 'wp-admin', value: '#f1f1f1' },
        { name: 'art-deco', value: '#1a1a2e' },
        { name: 'brutalist', value: '#ffffff' },
        { name: 'nordic', value: '#fafafa' },
      ],
    },
    // Layout options
    layout: 'padded',
  },
  // Global decorators
  decorators: [
    // Theme decorator
    withThemeByClassName({
      themes: {
        // Base themes
        light: 'theme-light',
        dark: 'theme-dark',
        // Aesthetic style languages
        artDeco: 'style-art-deco',
        artNouveau: 'style-art-nouveau',
        brutalist: 'style-brutalist',
        minimalist: 'style-minimalist',
        bauhaus: 'style-bauhaus',
        cyberpunk: 'style-cyberpunk',
        memphis: 'style-memphis',
        nordic: 'style-nordic',
        neumorphism: 'style-neumorphism',
        material: 'style-material',
      },
      defaultTheme: 'light',
    }),
    // RTL decorator
    (Story, context) => {
      const dir = context.globals.direction || 'ltr';
      return (
        <div dir={dir} className={dir === 'rtl' ? 'is-rtl' : ''}>
          <Story />
        </div>
      );
    },
    // Reduced motion decorator
    (Story, context) => {
      const reducedMotion = context.globals.reducedMotion;
      return (
        <div className={reducedMotion ? 'reduced-motion' : ''}>
          <Story />
        </div>
      );
    },
  ],
  // Global types for toolbar
  globalTypes: {
    direction: {
      name: 'Direction',
      description: 'Text direction',
      defaultValue: 'ltr',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ltr', title: 'LTR', right: '→' },
          { value: 'rtl', title: 'RTL', right: '←' },
        ],
        showName: true,
      },
    },
    reducedMotion: {
      name: 'Reduced Motion',
      description: 'Simulate prefers-reduced-motion',
      defaultValue: false,
      toolbar: {
        icon: 'lightning',
        items: [
          { value: false, title: 'Motion enabled' },
          { value: true, title: 'Reduced motion' },
        ],
      },
    },
    locale: {
      name: 'Locale',
      description: 'Testing locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ar', title: 'Arabic (RTL)' },
          { value: 'he', title: 'Hebrew (RTL)' },
          { value: 'ja', title: 'Japanese' },
          { value: 'de', title: 'German' },
        ],
      },
    },
  },
};

export default preview;
