import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * Interactive States Stories
 *
 * These stories demonstrate interactive element states:
 * - Hover, focus, active, disabled states
 * - Loading indicators
 * - Error and success states
 * - Affordance patterns
 *
 * Use for visual regression and interaction testing.
 */

// Button with all states
const ButtonStates = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <h3 style={{ marginBottom: '1rem' }}>Button States</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <button
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 500,
          backgroundColor: '#0073aa',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Default
      </button>

      <button
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 500,
          backgroundColor: '#005a87',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Hover
      </button>

      <button
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 500,
          backgroundColor: '#0073aa',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          outline: '3px solid #68b8e0',
          outlineOffset: '2px',
        }}
      >
        Focus
      </button>

      <button
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 500,
          backgroundColor: '#004466',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transform: 'scale(0.98)',
        }}
      >
        Active
      </button>

      <button
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 500,
          backgroundColor: '#ccc',
          color: '#666',
          border: 'none',
          borderRadius: '4px',
          cursor: 'not-allowed',
          opacity: 0.6,
        }}
        disabled
      >
        Disabled
      </button>

      <button
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 500,
          backgroundColor: '#0073aa',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'wait',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        Loading
      </button>
    </div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Input field states
const InputStates = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <h3 style={{ marginBottom: '1rem' }}>Input States</h3>
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '400px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Default
        </label>
        <input
          type="text"
          placeholder="Enter text..."
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
          Focused
        </label>
        <input
          type="text"
          placeholder="Focused input"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #0073aa',
            borderRadius: '4px',
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#c00' }}>
          Error
        </label>
        <input
          type="text"
          value="Invalid value"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #c00',
            borderRadius: '4px',
            boxSizing: 'border-box',
            backgroundColor: '#fff5f5',
          }}
          readOnly
        />
        <p style={{ margin: '0.5rem 0 0', color: '#c00', fontSize: '14px' }}>
          This field is required
        </p>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#2e7d32' }}>
          Success
        </label>
        <input
          type="text"
          value="Valid value"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #2e7d32',
            borderRadius: '4px',
            boxSizing: 'border-box',
            backgroundColor: '#f5fff5',
          }}
          readOnly
        />
        <p style={{ margin: '0.5rem 0 0', color: '#2e7d32', fontSize: '14px' }}>
          ✓ Looks good!
        </p>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#666' }}>
          Disabled
        </label>
        <input
          type="text"
          value="Cannot edit"
          disabled
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            color: '#999',
            cursor: 'not-allowed',
          }}
        />
      </div>
    </div>
  </div>
);

// Loading indicators
const LoadingIndicators = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <h3 style={{ marginBottom: '1rem' }}>Loading Indicators</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
      {/* Spinner */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #0073aa',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 8px',
          }}
        />
        <span style={{ fontSize: '14px', color: '#666' }}>Spinner</span>
      </div>

      {/* Dots */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '8px' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#0073aa',
                borderRadius: '50%',
                animation: `bounce 0.6s ${i * 0.1}s infinite alternate`,
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: '14px', color: '#666' }}>Dots</span>
      </div>

      {/* Progress bar */}
      <div style={{ width: '200px', textAlign: 'center' }}>
        <div
          style={{
            height: '8px',
            backgroundColor: '#f3f3f3',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              width: '60%',
              height: '100%',
              backgroundColor: '#0073aa',
              borderRadius: '4px',
              animation: 'progress 2s ease-in-out infinite',
            }}
          />
        </div>
        <span style={{ fontSize: '14px', color: '#666' }}>Progress Bar (60%)</span>
      </div>

      {/* Skeleton */}
      <div style={{ width: '200px', textAlign: 'center' }}>
        <div
          style={{
            height: '20px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            marginBottom: '8px',
            animation: 'shimmer 1.5s infinite',
            background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
            backgroundSize: '200% 100%',
          }}
        />
        <span style={{ fontSize: '14px', color: '#666' }}>Skeleton</span>
      </div>
    </div>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes bounce { to { transform: translateY(-10px); } }
      @keyframes progress { 0%, 100% { width: 20%; } 50% { width: 80%; } }
      @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    `}</style>
  </div>
);

// Feedback messages
const FeedbackMessages = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <h3 style={{ marginBottom: '1rem' }}>Feedback Messages</h3>
    <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px' }}>
      <div
        style={{
          padding: '16px',
          backgroundColor: '#e8f5e9',
          border: '1px solid #a5d6a7',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <span style={{ color: '#2e7d32', fontSize: '20px' }}>✓</span>
        <div>
          <strong style={{ color: '#2e7d32' }}>Success!</strong>
          <p style={{ margin: '4px 0 0', color: '#333' }}>Your changes have been saved.</p>
        </div>
      </div>

      <div
        style={{
          padding: '16px',
          backgroundColor: '#ffebee',
          border: '1px solid #ef9a9a',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <span style={{ color: '#c62828', fontSize: '20px' }}>✕</span>
        <div>
          <strong style={{ color: '#c62828' }}>Error</strong>
          <p style={{ margin: '4px 0 0', color: '#333' }}>Unable to save. Please try again.</p>
        </div>
      </div>

      <div
        style={{
          padding: '16px',
          backgroundColor: '#fff3e0',
          border: '1px solid #ffcc80',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <span style={{ color: '#e65100', fontSize: '20px' }}>⚠</span>
        <div>
          <strong style={{ color: '#e65100' }}>Warning</strong>
          <p style={{ margin: '4px 0 0', color: '#333' }}>This action cannot be undone.</p>
        </div>
      </div>

      <div
        style={{
          padding: '16px',
          backgroundColor: '#e3f2fd',
          border: '1px solid #90caf9',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <span style={{ color: '#1565c0', fontSize: '20px' }}>ℹ</span>
        <div>
          <strong style={{ color: '#1565c0' }}>Info</strong>
          <p style={{ margin: '4px 0 0', color: '#333' }}>A new version is available.</p>
        </div>
      </div>
    </div>
  </div>
);

// Focus ring demonstration
const FocusRings = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <h3 style={{ marginBottom: '1rem' }}>Focus Ring Visibility</h3>
    <p style={{ marginBottom: '1rem', color: '#666' }}>
      Tab through these elements to test focus visibility (shown statically below):
    </p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <button
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#0073aa',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          outline: '3px solid #68b8e0',
          outlineOffset: '2px',
        }}
      >
        Button Focus
      </button>

      <a
        href="#"
        style={{
          padding: '12px 24px',
          color: '#0073aa',
          textDecoration: 'underline',
          outline: '3px solid #68b8e0',
          outlineOffset: '2px',
          borderRadius: '2px',
        }}
      >
        Link Focus
      </a>

      <input
        type="text"
        value="Input Focus"
        readOnly
        style={{
          padding: '12px',
          fontSize: '16px',
          border: '2px solid #0073aa',
          borderRadius: '4px',
          outline: '2px solid #68b8e0',
          outlineOffset: '2px',
        }}
      />
    </div>
  </div>
);

// Meta configuration
const meta: Meta = {
  title: 'UI-UX/Interactive States',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Interactive element states for testing feedback and affordance.',
      },
    },
  },
};

export default meta;

// Stories
export const Buttons: StoryObj = {
  render: () => <ButtonStates />,
  parameters: {
    docs: {
      description: {
        story: 'Buttons should have distinct visual states for hover, focus, active, disabled, and loading.',
      },
    },
  },
};

export const Inputs: StoryObj = {
  render: () => <InputStates />,
  parameters: {
    docs: {
      description: {
        story: 'Input fields should clearly indicate focus, error, success, and disabled states.',
      },
    },
  },
};

export const Loading: StoryObj = {
  render: () => <LoadingIndicators />,
  parameters: {
    docs: {
      description: {
        story: 'Loading indicators provide visibility of system status during asynchronous operations.',
      },
    },
  },
};

export const Feedback: StoryObj = {
  render: () => <FeedbackMessages />,
  parameters: {
    docs: {
      description: {
        story: 'Feedback messages should be clear, contextual, and use appropriate colors/icons.',
      },
    },
  },
};

export const FocusVisibility: StoryObj = {
  render: () => <FocusRings />,
  parameters: {
    docs: {
      description: {
        story: 'Focus indicators must be clearly visible with sufficient contrast for keyboard navigation.',
      },
    },
  },
};

// Combined view for visual regression
export const AllStates: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: '3rem' }}>
      <ButtonStates />
      <InputStates />
      <LoadingIndicators />
      <FeedbackMessages />
      <FocusRings />
    </div>
  ),
};
