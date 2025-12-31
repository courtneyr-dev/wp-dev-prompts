/**
 * WordPress Icons Gallery
 *
 * Visual reference for all WordPress core icons.
 *
 * @package wp-dev-prompts
 */

import React from 'react';

// Icon component (simplified version)
const Icon = ({ name, label, size = 24 }) => {
  // SVG paths for common icons (subset for demo)
  const icons = {
    plus: 'M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z',
    close: 'M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z',
    check: 'M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z',
    settings: 'M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
    edit: 'M4 16.5V20h3.5l11.5-11.5-3.5-3.5L4 16.5zm15.7-9.2c.4-.4.4-1 0-1.4l-2.1-2.1c-.4-.4-1-.4-1.4 0l-1.7 1.7 3.5 3.5 1.7-1.7z',
    trash: 'M12 4.5C9.2 4.5 6.8 6.1 6 8.5H4v2h1.2l1 9c.1 1 1 1.5 2 1.5h7.6c1 0 1.8-.6 2-1.5l1-9H19v-2h-2c-.8-2.4-3.2-4-6-4zm0 2c1.6 0 3 .9 3.6 2H8.4c.7-1.1 2-2 3.6-2zM8 19l-1-9h10l-1 9H8z',
    arrowRight: 'M13.3 16.3L17.6 12 13.3 7.7l-1.4 1.4 2.6 2.6H6v2h8.5l-2.6 2.6 1.4 1.7z',
    arrowLeft: 'M10.7 7.7L6.4 12l4.3 4.3 1.4-1.4-2.6-2.6H18v-2H9.5l2.6-2.6-1.4-1.7z',
    menu: 'M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z',
    search: 'M13.3 8.4c0 2.7-2.2 4.9-4.9 4.9S3.5 11.1 3.5 8.4s2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9zm-1.4 4.7l5.7 5.7 1.1-1.1-5.7-5.7c1.1-1.4 1.8-3.1 1.8-5 0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.9 0 3.6-.7 5-1.8z',
    image: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.7L9 13l-3 4h12l-4-5z',
    video: 'M18.7 8.5L21 6v12l-2.3-2.5V18H3V6h15.7v2.5zM5 8v8h12V8H5z',
    paragraph: 'M15 3H6v2h3v14h2V5h2v14h2V3z',
    heading: 'M6 3v8H3v2h6v-2H6V3H4v18h2V13h6V3H6zm12 8h-4v2h1v6h2v-6h1v-2z',
    list: 'M4 7h16v2H4V7zm0 4h16v2H4v-2zm0 4h16v2H4v-2z',
    quote: 'M8.5 12.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2v1c0 2.8 2.2 5 5 5v-2c-1.7 0-3-1.3-3-3v-1zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2v1c0 2.8 2.2 5 5 5v-2c-1.7 0-3-1.3-3-3v-1z',
    columns: 'M4 4h6v16H4V4zm10 0h6v16h-6V4z',
    group: 'M4 4h16v16H4V4zm2 2v12h12V6H6z',
    button: 'M4 8h16v8H4V8zm2 2v4h12v-4H6z',
    lock: 'M17 10V7c0-2.8-2.2-5-5-5S7 4.2 7 7v3H5v10h14V10h-2zm-7-3c0-1.7 1.3-3 3-3s3 1.3 3 3v3h-6V7z',
    unlock: 'M17 7c0-2.8-2.2-5-5-5S7 4.2 7 7v3H5v10h14V10h-2V7zM9 7c0-1.7 1.3-3 3-3s3 1.3 3 3v3H9V7z',
    info: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-5h2v-4h-2v4zm0-6h2V7h-2v2z',
    warning: 'M12 2L1 21h22L12 2zm0 4l7.5 13h-15L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z',
    star: 'M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z',
  };

  const path = icons[name] || icons.plus;

  return (
    <span
      role="img"
      aria-label={label}
      style={{ display: 'inline-block', width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </span>
  );
};

// Icon card for gallery
const IconCard = ({ name, label }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      border: '1px solid var(--color-border, #ddd)',
      borderRadius: 'var(--radius-md, 4px)',
      gap: '8px',
    }}
  >
    <Icon name={name} label={label} size={24} />
    <code style={{ fontSize: '12px', color: 'var(--color-text-muted, #666)' }}>
      {name}
    </code>
  </div>
);

export default {
  title: 'Resources/Icons',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'WordPress core icons from @wordpress/icons package.',
      },
    },
  },
};

// All icons gallery
export const Gallery = {
  render: () => (
    <div>
      <h2>Action Icons</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <IconCard name="plus" label="Add" />
        <IconCard name="close" label="Close" />
        <IconCard name="check" label="Check" />
        <IconCard name="edit" label="Edit" />
        <IconCard name="trash" label="Delete" />
        <IconCard name="search" label="Search" />
      </div>

      <h2>Navigation Icons</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <IconCard name="arrowRight" label="Arrow Right" />
        <IconCard name="arrowLeft" label="Arrow Left" />
        <IconCard name="menu" label="Menu" />
      </div>

      <h2>Block Icons</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <IconCard name="paragraph" label="Paragraph" />
        <IconCard name="heading" label="Heading" />
        <IconCard name="list" label="List" />
        <IconCard name="quote" label="Quote" />
        <IconCard name="columns" label="Columns" />
        <IconCard name="group" label="Group" />
        <IconCard name="button" label="Button" />
      </div>

      <h2>Media Icons</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <IconCard name="image" label="Image" />
        <IconCard name="video" label="Video" />
      </div>

      <h2>Status Icons</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <IconCard name="lock" label="Lock" />
        <IconCard name="unlock" label="Unlock" />
        <IconCard name="info" label="Info" />
        <IconCard name="warning" label="Warning" />
        <IconCard name="star" label="Star" />
        <IconCard name="settings" label="Settings" />
      </div>
    </div>
  ),
};

// Size variants
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon name="settings" label="16px" size={16} />
        <p style={{ fontSize: '12px' }}>16px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="settings" label="24px" size={24} />
        <p style={{ fontSize: '12px' }}>24px (default)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="settings" label="32px" size={32} />
        <p style={{ fontSize: '12px' }}>32px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="settings" label="48px" size={48} />
        <p style={{ fontSize: '12px' }}>48px</p>
      </div>
    </div>
  ),
};

// Color variants
export const Colors = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ color: 'var(--color-text, #1e1e1e)' }}>
        <Icon name="star" label="Default" />
      </div>
      <div style={{ color: 'var(--color-primary, #0073aa)' }}>
        <Icon name="star" label="Primary" />
      </div>
      <div style={{ color: 'var(--color-success, #46b450)' }}>
        <Icon name="check" label="Success" />
      </div>
      <div style={{ color: 'var(--color-warning, #ffb900)' }}>
        <Icon name="warning" label="Warning" />
      </div>
      <div style={{ color: 'var(--color-error, #dc3232)' }}>
        <Icon name="close" label="Error" />
      </div>
    </div>
  ),
};

// Accessibility test
export const AccessibilityTest = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Icon with Button (Accessible)</h3>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
          aria-label="Add new item"
        >
          <Icon name="plus" label="" size={20} />
          Add Item
        </button>
      </div>

      <div>
        <h3>Icon-only Button (with aria-label)</h3>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
          }}
          aria-label="Settings"
        >
          <Icon name="settings" label="" size={24} />
        </button>
      </div>

      <div>
        <h3>Decorative Icon (hidden from AT)</h3>
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span aria-hidden="true">
            <Icon name="info" label="" size={20} />
          </span>
          This icon is decorative
        </p>
      </div>
    </div>
  ),
};
