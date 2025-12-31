import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * Responsive Check Stories
 *
 * These stories verify responsive behavior across viewports:
 * - Layout stability at breakpoints
 * - Touch target sizing
 * - Content reflow
 * - Mobile optimizations
 *
 * Use for visual regression testing at WordPress breakpoints.
 */

// Touch target demonstration
const TouchTargets = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <h3 style={{ marginBottom: '1rem' }}>Touch Target Sizes</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid green',
            backgroundColor: '#e8f5e9',
            borderRadius: '4px',
          }}
        >
          ✓
        </button>
        <span>44x44px - Minimum (PASS)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          style={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid green',
            backgroundColor: '#e8f5e9',
            borderRadius: '4px',
          }}
        >
          ✓
        </button>
        <span>48x48px - Recommended (PASS)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid red',
            backgroundColor: '#ffebee',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          ✗
        </button>
        <span style={{ color: 'red' }}>32x32px - Too small (FAIL)</span>
      </div>
    </div>
  </div>
);

// Responsive grid demonstration
const ResponsiveGrid = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <h3 style={{ marginBottom: '1rem' }}>Responsive Grid</h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            padding: '1.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          Card {i}
        </div>
      ))}
    </div>
  </div>
);

// Navigation pattern
const ResponsiveNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <div style={{ fontWeight: 600 }}>Logo</div>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
          }}
          className="desktop-nav"
        >
          <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Home</a>
          <a href="#" style={{ color: '#333', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Services</a>
          <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Contact</a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            width: '44px',
            height: '44px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontSize: '24px',
          }}
          className="mobile-menu-btn"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1rem',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginTop: '0.5rem',
          }}
          className="mobile-menu"
        >
          <a href="#" style={{ padding: '12px', color: '#333', textDecoration: 'none' }}>Home</a>
          <a href="#" style={{ padding: '12px', color: '#333', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ padding: '12px', color: '#333', textDecoration: 'none' }}>Services</a>
          <a href="#" style={{ padding: '12px', color: '#333', textDecoration: 'none' }}>Contact</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

// Form layout
const ResponsiveForm = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <h3 style={{ marginBottom: '1rem' }}>Responsive Form</h3>
    <form
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
      }}
    >
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          First Name
        </label>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Last Name
        </label>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Email
        </label>
        <input
          type="email"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: 600,
            backgroundColor: '#0073aa',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </div>
    </form>
  </div>
);

// Breakpoint indicator
const BreakpointIndicator = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: '1rem' }}>
    <div className="breakpoint-label">
      <style>{`
        .breakpoint-label::after {
          content: 'Mobile (< 600px)';
          display: block;
          padding: 8px 16px;
          background: #e3f2fd;
          border-radius: 4px;
          font-weight: 500;
        }
        @media (min-width: 600px) {
          .breakpoint-label::after { content: 'Small Tablet (600-782px)'; background: #e8f5e9; }
        }
        @media (min-width: 782px) {
          .breakpoint-label::after { content: 'Large Tablet (782-960px)'; background: #fff3e0; }
        }
        @media (min-width: 960px) {
          .breakpoint-label::after { content: 'Desktop (960-1280px)'; background: #fce4ec; }
        }
        @media (min-width: 1280px) {
          .breakpoint-label::after { content: 'Wide (1280px+)'; background: #f3e5f5; }
        }
      `}</style>
    </div>
  </div>
);

// Meta configuration
const meta: Meta = {
  title: 'UI-UX/Responsive Check',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Responsive design patterns for testing across viewports.',
      },
    },
  },
};

export default meta;

// Stories
export const TouchTargetSizes: StoryObj = {
  render: () => <TouchTargets />,
  parameters: {
    docs: {
      description: {
        story: 'Touch targets must be at least 44x44px for adequate touch accessibility.',
      },
    },
  },
};

export const GridLayout: StoryObj = {
  render: () => <ResponsiveGrid />,
  parameters: {
    docs: {
      description: {
        story: 'Grid should adapt from 1 column on mobile to 4 columns on wide screens.',
      },
    },
  },
};

export const Navigation: StoryObj = {
  render: () => <ResponsiveNav />,
  parameters: {
    docs: {
      description: {
        story: 'Navigation should collapse to hamburger menu on mobile devices.',
      },
    },
  },
};

export const FormLayout: StoryObj = {
  render: () => <ResponsiveForm />,
  parameters: {
    docs: {
      description: {
        story: 'Forms should stack on mobile and use multi-column layout on desktop.',
      },
    },
  },
};

export const BreakpointDisplay: StoryObj = {
  render: () => <BreakpointIndicator />,
  parameters: {
    docs: {
      description: {
        story: 'Shows current WordPress breakpoint based on viewport width.',
      },
    },
  },
};

// Viewport-specific stories
export const Mobile320: StoryObj = {
  render: () => (
    <div>
      <BreakpointIndicator />
      <ResponsiveNav />
      <div style={{ marginTop: '2rem' }}><ResponsiveGrid /></div>
      <div style={{ marginTop: '2rem' }}><TouchTargets /></div>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: { description: { story: 'Layout at 320px (small mobile)' } },
  },
};

export const Mobile375: StoryObj = {
  render: () => (
    <div>
      <BreakpointIndicator />
      <ResponsiveNav />
      <div style={{ marginTop: '2rem' }}><ResponsiveGrid /></div>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
    docs: { description: { story: 'Layout at 375px (standard mobile)' } },
  },
};

export const Tablet768: StoryObj = {
  render: () => (
    <div>
      <BreakpointIndicator />
      <ResponsiveNav />
      <div style={{ marginTop: '2rem' }}><ResponsiveGrid /></div>
      <div style={{ marginTop: '2rem' }}><ResponsiveForm /></div>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'tablet' },
    docs: { description: { story: 'Layout at 768px (tablet)' } },
  },
};

export const Desktop1280: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <BreakpointIndicator />
      <ResponsiveNav />
      <div style={{ marginTop: '2rem' }}><ResponsiveGrid /></div>
      <div style={{ marginTop: '2rem' }}><ResponsiveForm /></div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Layout at 1280px (desktop)' } },
  },
};
