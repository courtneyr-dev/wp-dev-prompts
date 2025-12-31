import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * Visual Hierarchy Stories
 *
 * These stories demonstrate and test visual hierarchy principles:
 * - CTA prominence and visual weight
 * - Typography scale
 * - Color contrast
 * - Content grouping
 *
 * Use for visual regression testing at different viewports.
 */

// Example components for hierarchy testing
const CTASection = ({ primary, secondary }: { primary: string; secondary: string }) => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <button
      style={{
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 600,
        backgroundColor: '#0073aa',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {primary}
    </button>
    <button
      style={{
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: 400,
        backgroundColor: 'transparent',
        color: '#0073aa',
        border: '1px solid #0073aa',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {secondary}
    </button>
  </div>
);

const TypographyScale = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Heading 1</h1>
    <h2 style={{ fontSize: '2rem', fontWeight: 600, margin: '0 0 0.5rem' }}>Heading 2</h2>
    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.5rem' }}>Heading 3</h3>
    <h4 style={{ fontSize: '1.25rem', fontWeight: 500, margin: '0 0 0.5rem' }}>Heading 4</h4>
    <p style={{ fontSize: '1rem', lineHeight: 1.6, margin: '0 0 0.5rem' }}>
      Body text at 16px with comfortable line height for readability.
    </p>
    <p style={{ fontSize: '0.875rem', color: '#666', margin: '0' }}>
      Small text for captions and metadata.
    </p>
  </div>
);

const ContentGroups = () => (
  <div style={{ display: 'grid', gap: '2rem', fontFamily: 'system-ui, sans-serif' }}>
    <section style={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 1rem', fontSize: '1.25rem' }}>Group 1: Features</h3>
      <p style={{ margin: 0, color: '#333' }}>Related content is visually grouped together.</p>
    </section>
    <section style={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 1rem', fontSize: '1.25rem' }}>Group 2: Benefits</h3>
      <p style={{ margin: 0, color: '#333' }}>Whitespace separates distinct content areas.</p>
    </section>
  </div>
);

const ContrastTest = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <div style={{ marginBottom: '1rem' }}>
      <span style={{ backgroundColor: '#000', color: '#fff', padding: '4px 8px' }}>
        21:1 - Maximum contrast
      </span>
    </div>
    <div style={{ marginBottom: '1rem' }}>
      <span style={{ backgroundColor: '#fff', color: '#333', padding: '4px 8px', border: '1px solid #ddd' }}>
        12.6:1 - High contrast
      </span>
    </div>
    <div style={{ marginBottom: '1rem' }}>
      <span style={{ backgroundColor: '#fff', color: '#767676', padding: '4px 8px', border: '1px solid #ddd' }}>
        4.5:1 - WCAG AA minimum
      </span>
    </div>
    <div style={{ marginBottom: '1rem' }}>
      <span style={{ backgroundColor: '#fff', color: '#959595', padding: '4px 8px', border: '1px solid #ddd' }}>
        3:1 - Large text minimum (FAIL for body)
      </span>
    </div>
  </div>
);

// Meta configuration
const meta: Meta = {
  title: 'UI-UX/Visual Hierarchy',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Visual hierarchy patterns for testing prominence, scale, and contrast.',
      },
    },
  },
};

export default meta;

// Stories
export const CTAProminence: StoryObj = {
  render: () => <CTASection primary="Get Started" secondary="Learn More" />,
  parameters: {
    docs: {
      description: {
        story: 'Primary CTA should have significantly more visual weight than secondary actions.',
      },
    },
  },
};

export const Typography: StoryObj = {
  render: () => <TypographyScale />,
  parameters: {
    docs: {
      description: {
        story: 'Typography scale should create clear visual hierarchy from headings to body text.',
      },
    },
  },
};

export const ContentGrouping: StoryObj = {
  render: () => <ContentGroups />,
  parameters: {
    docs: {
      description: {
        story: 'Related content should be visually grouped with consistent spacing and backgrounds.',
      },
    },
  },
};

export const ColorContrast: StoryObj = {
  render: () => <ContrastTest />,
  parameters: {
    docs: {
      description: {
        story: 'Text must meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text).',
      },
    },
  },
};

// Viewport-specific stories for visual regression
export const MobileView: StoryObj = {
  render: () => (
    <div>
      <TypographyScale />
      <div style={{ marginTop: '2rem' }}>
        <CTASection primary="Get Started" secondary="Learn More" />
      </div>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const TabletView: StoryObj = {
  render: () => (
    <div>
      <TypographyScale />
      <div style={{ marginTop: '2rem' }}>
        <CTASection primary="Get Started" secondary="Learn More" />
      </div>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
};

export const DesktopView: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <TypographyScale />
      <div style={{ marginTop: '2rem' }}>
        <CTASection primary="Get Started" secondary="Learn More" />
      </div>
      <div style={{ marginTop: '2rem' }}>
        <ContentGroups />
      </div>
    </div>
  ),
};
