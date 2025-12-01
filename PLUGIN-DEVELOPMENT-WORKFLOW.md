# WordPress Plugin Development: Complete Start-to-Finish Guide

This comprehensive workflow documents the complete process of developing and publishing a WordPress plugin to WordPress.org, from initial planning through final submission and maintenance.

**Based on**: Post Formats for Block Themes development project (WordPress 6.8+)

---

## Table of Contents

1. [Phase 1: Planning & Requirements](#phase-1-planning--requirements)
2. [Phase 2: Project Setup](#phase-2-project-setup)
3. [Phase 3: Development](#phase-3-development)
4. [Phase 4: Testing Infrastructure](#phase-4-testing-infrastructure)
5. [Phase 5: Documentation](#phase-5-documentation)
6. [Phase 6: WordPress.org Asset Creation](#phase-6-wordpressorg-asset-creation)
7. [Phase 7: Pre-Submission Checklist](#phase-7-pre-submission-checklist)
8. [Phase 8: WordPress.org Submission](#phase-8-wordpressorg-submission)
9. [Phase 9: Maintenance & Updates](#phase-9-maintenance--updates)
10. [Lessons Learned](#lessons-learned)

---

## Phase 1: Planning & Requirements

### 1.1 Define Plugin Purpose

**Questions to Answer:**
- What problem does this plugin solve?
- Who is the target audience (developers, site builders, end users)?
- What is the minimum viable feature set?
- What are the "nice to have" features for future versions?

**Example (Post Formats for Block Themes):**
```
Problem: Block themes don't support classic WordPress post formats
Target Audience: WordPress developers and site builders using block themes
Core Features:
  - Visual format selection modal
  - 10 classic post formats (Standard, Aside, Status, Link, Gallery, Image, Quote, Video, Audio, Chat)
  - Auto-detection based on content
  - Format-specific block patterns
  - Custom Chat Log block
  - Format repair tool
  - Full Site Editor support
```

### 1.2 Research Existing Solutions

**Tasks:**
- Search WordPress.org for similar plugins
- Identify gaps in existing solutions
- Research WordPress core functionality
- Review Block Editor (Gutenberg) capabilities
- Check WordPress developer documentation

**Resources:**
- [WordPress Developer Resources](https://developer.wordpress.org/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Plugin Handbook](https://developer.wordpress.org/plugins/)

### 1.3 Architecture Decisions

**Key Decisions to Make:**

**PHP Architecture:**
- Single file vs class-based structure
- Namespacing strategy
- Hook system design (filters, actions)
- Extensibility approach

**JavaScript Architecture:**
- Vanilla JS, React, or WordPress components
- Build system (webpack, wp-scripts)
- State management approach

**CSS Architecture:**
- Methodology (BEM, utility classes)
- Preprocessor usage (Sass, PostCSS)
- Theme compatibility strategy

**Example Decisions:**
```
✅ PHP: Class-based with single entry point
✅ Namespacing: PostFormatsForBlockThemes\
✅ Hooks: Extensive filter system for extensibility (pfbt_ prefix)
✅ JavaScript: React with @wordpress/scripts
✅ State: WordPress data stores and hooks
✅ CSS: BEM methodology with editor-first approach
```

### 1.4 Feature Specification

**Create Detailed Feature Specs:**

**Format Selection Modal:**
- Visual card-based interface
- 10 format cards with icons, names, descriptions
- Keyboard navigation support
- Dismissible with ESC key

**Auto-Detection System:**
- Content analysis on save
- Format suggestions based on blocks
- Confidence scoring
- Manual override capability

**Chat Log Block:**
- Multi-platform support (Slack, Discord, Teams, WhatsApp, etc.)
- Text parsing (not file upload)
- Format auto-detection
- Customizable rendering

**Block Patterns:**
- One pattern per format
- Registered via theme.json
- Proper block structure
- Example content included

### 1.5 Technology Stack

**Choose Your Stack:**

**Required:**
- WordPress version requirement (e.g., 6.8+)
- PHP version requirement (e.g., 7.4+)
- MySQL version requirement

**Build Tools:**
- Node.js and npm
- @wordpress/scripts for bundling
- Webpack configuration (if custom)

**Development Tools:**
- PHP CodeSniffer (WordPress Coding Standards)
- ESLint (WordPress rules)
- Stylelint
- Playwright (E2E testing)
- PHPUnit (unit testing)

**Example package.json:**
```json
{
  "devDependencies": {
    "@playwright/test": "^1.47.0",
    "@wordpress/scripts": "^26.19.0",
    "axe-playwright": "^2.0.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

---

## Phase 2: Project Setup

### 2.1 Directory Structure

**Standard WordPress Plugin Structure:**
```
plugin-name/
├── plugin-name.php          # Main plugin file
├── README.md                # GitHub documentation
├── readme.txt               # WordPress.org documentation
├── CHANGELOG.md             # Version history
├── LICENSE                  # GPL v2 or later
├── .gitignore              # Git exclusions
├── .distignore             # Distribution exclusions
├── package.json            # Node dependencies
├── composer.json           # PHP dependencies
├── phpunit.xml.dist        # PHPUnit configuration
├── playwright.config.js    # E2E test configuration
│
├── includes/               # PHP classes and functions
│   ├── class-plugin.php
│   ├── class-format-manager.php
│   ├── class-pattern-registry.php
│   └── ...
│
├── src/                    # JavaScript source (React)
│   ├── editor/
│   │   ├── format-modal/
│   │   ├── format-switcher/
│   │   └── index.js
│   └── blocks/
│       └── chatlog/
│
├── blocks/                 # Block registration (PHP)
│   └── chatlog/
│       ├── chatlog-block.php
│       ├── index.js        # JS entry point
│       ├── edit.js
│       ├── save.js
│       └── style.scss
│
├── assets/                 # Static assets
│   ├── css/
│   ├── js/
│   └── images/
│
├── patterns/               # Block patterns
│   ├── quote-format.php
│   ├── gallery-format.php
│   └── ...
│
├── templates/              # Block templates
│   └── single-post-formats.php
│
├── tests/                  # Test files
│   ├── php/               # PHPUnit tests
│   ├── e2e/               # Playwright tests
│   └── accessibility/     # A11y tests
│
├── .wordpress-org/        # WordPress.org assets
│   ├── icon-256x256.png
│   ├── banner-772x250.png
│   ├── banner-1544x500.png
│   ├── screenshot-1.png
│   └── ...
│
└── bin/                   # Build scripts
    └── rename-plugin.sh
```

### 2.2 Initialize Version Control

**Git Setup:**
```bash
cd /path/to/plugin
git init
git add .
git commit -m "Initial commit"
```

**Create .gitignore:**
```
# Dependencies
node_modules/
vendor/

# Build artifacts
build/
dist/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Testing
coverage/
.phpunit.result.cache

# Deployment
*.zip
test-dist/

# Note: .wordpress-org/ is tracked in git (for assets)
# but excluded from plugin ZIP via .distignore
```

**Create .distignore:**
```
# Development files
/.git
/.github
/node_modules
/vendor
/tests
/bin
/.wordpress-org
/.gitignore
/.distignore
/package.json
/package-lock.json
/composer.json
/composer.lock
/phpunit.xml.dist
/playwright.config.js
/README.md
/CHANGELOG.md
/QA-TEST-PLAN.md

# Build source files
/src
/blocks/*/src
```

### 2.3 Main Plugin File

**plugin-name.php Template:**
```php
<?php
/**
 * Plugin Name:       Your Plugin Name
 * Plugin URI:        https://github.com/yourusername/plugin-name
 * Description:       Brief description of what your plugin does.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Your Name
 * Author URI:        https://yourwebsite.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       plugin-text-domain
 * Domain Path:       /languages
 *
 * @package YourPluginNamespace
 */

namespace YourPluginNamespace;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define plugin constants.
define( 'YOUR_PLUGIN_VERSION', '1.0.0' );
define( 'YOUR_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'YOUR_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'YOUR_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

// Autoload classes.
require_once YOUR_PLUGIN_PATH . 'includes/class-plugin.php';

// Initialize plugin.
function init() {
    Plugin::get_instance();
}
add_action( 'plugins_loaded', __NAMESPACE__ . '\\init' );

// Activation hook.
register_activation_hook( __FILE__, __NAMESPACE__ . '\\activate' );

function activate() {
    // Set default options
    // Create database tables if needed
    // Flush rewrite rules if needed
}

// Deactivation hook.
register_deactivation_hook( __FILE__, __NAMESPACE__ . '\\deactivate' );

function deactivate() {
    // Clean up temporary data
    // Flush rewrite rules if needed
}
```

### 2.4 Package Management

**package.json Setup:**
```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "WordPress plugin description",
  "scripts": {
    "build": "wp-scripts build",
    "start": "wp-scripts start",
    "lint:js": "wp-scripts lint-js",
    "lint:css": "wp-scripts lint-style",
    "format": "wp-scripts format",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test tests/accessibility",
    "test:all": "npm run test:e2e && npm run test:a11y"
  },
  "devDependencies": {
    "@playwright/test": "^1.47.0",
    "@wordpress/scripts": "^26.19.0",
    "axe-playwright": "^2.0.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

**composer.json Setup:**
```json
{
  "name": "yourusername/plugin-name",
  "description": "WordPress plugin description",
  "type": "wordpress-plugin",
  "license": "GPL-2.0-or-later",
  "require": {
    "php": ">=7.4"
  },
  "require-dev": {
    "phpunit/phpunit": "^9.0",
    "wp-coding-standards/wpcs": "^3.0",
    "phpcompatibility/phpcompatibility-wp": "*"
  },
  "scripts": {
    "phpcs": "phpcs",
    "phpcbf": "phpcbf",
    "phpunit": "phpunit",
    "test": [
      "@phpcs",
      "@phpunit"
    ]
  }
}
```

### 2.5 Coding Standards Configuration

**phpcs.xml.dist:**
```xml
<?xml version="1.0"?>
<ruleset name="Plugin Coding Standards">
    <description>WordPress Coding Standards</description>

    <file>.</file>

    <exclude-pattern>*/node_modules/*</exclude-pattern>
    <exclude-pattern>*/vendor/*</exclude-pattern>
    <exclude-pattern>*/build/*</exclude-pattern>

    <rule ref="WordPress">
        <exclude name="WordPress.Files.FileName"/>
    </rule>

    <config name="minimum_supported_wp_version" value="6.8"/>
    <config name="testVersion" value="7.4-"/>
</ruleset>
```

**.eslintrc.json:**
```json
{
  "extends": [
    "plugin:@wordpress/eslint-plugin/recommended"
  ],
  "rules": {
    "no-console": "warn"
  }
}
```

**.stylelintrc.json:**
```json
{
  "extends": [
    "@wordpress/stylelint-config"
  ]
}
```

### 2.6 Install Dependencies

**Installation Commands:**
```bash
# Node.js dependencies
npm install

# PHP dependencies (optional, for testing)
composer install

# WordPress Coding Standards
composer require --dev wp-coding-standards/wpcs
composer require --dev phpcompatibility/phpcompatibility-wp

# Configure PHP CodeSniffer
./vendor/bin/phpcs --config-set installed_paths vendor/wp-coding-standards/wpcs
```

---

## Phase 3: Development

### 3.1 WordPress Plugin Architecture

**Main Plugin Class (includes/class-plugin.php):**
```php
<?php
namespace YourPluginNamespace;

class Plugin {
    private static $instance = null;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->load_dependencies();
        $this->register_hooks();
    }

    private function load_dependencies() {
        require_once YOUR_PLUGIN_PATH . 'includes/class-format-manager.php';
        require_once YOUR_PLUGIN_PATH . 'includes/class-pattern-registry.php';
        // Load other classes...
    }

    private function register_hooks() {
        // Editor assets
        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );

        // Frontend assets
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_assets' ] );

        // Block registration
        add_action( 'init', [ $this, 'register_blocks' ] );

        // Pattern registration
        add_action( 'init', [ $this, 'register_patterns' ] );
    }

    public function enqueue_editor_assets() {
        // Enqueue editor JavaScript
        wp_enqueue_script(
            'plugin-editor',
            YOUR_PLUGIN_URL . 'build/editor.js',
            [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ],
            YOUR_PLUGIN_VERSION,
            true
        );

        // Enqueue editor CSS
        wp_enqueue_style(
            'plugin-editor',
            YOUR_PLUGIN_URL . 'build/editor.css',
            [ 'wp-edit-blocks' ],
            YOUR_PLUGIN_VERSION
        );
    }

    public function register_blocks() {
        // Register custom blocks
        register_block_type( YOUR_PLUGIN_PATH . 'blocks/chatlog' );
    }
}
```

### 3.2 Hook System Design

**Design Extensible Filters and Actions:**

**Key Principles:**
- Use consistent prefix (e.g., `pfbt_` for Post Formats for Block Themes)
- Provide filters for all user-facing content
- Allow developers to modify behavior
- Document all hooks in code

**Example Hook Implementation:**
```php
// Allow developers to modify registered formats
$formats = apply_filters( 'pfbt_registered_formats', [
    'standard' => [
        'name'         => __( 'Standard', 'post-formats' ),
        'description'  => __( 'Default blog post', 'post-formats' ),
        'icon'         => 'format-standard',
        'pattern_slug' => 'post-formats/standard',
    ],
    'aside' => [
        'name'         => __( 'Aside', 'post-formats' ),
        'description'  => __( 'Brief note or side comment', 'post-formats' ),
        'icon'         => 'format-aside',
        'pattern_slug' => 'post-formats/aside',
    ],
    // More formats...
] );

// Allow developers to hook into format selection
do_action( 'pfbt_format_selected', $post_id, $format, $previous_format );

// Allow modification of auto-detection results
$detected_format = apply_filters( 'pfbt_auto_detect_format', $format, $post_content, $blocks );

// Allow customization of modal behavior
$modal_config = apply_filters( 'pfbt_modal_config', [
    'show_descriptions' => true,
    'enable_preview'    => false,
    'auto_open'         => false,
] );
```

**Document Hooks in README:**
```markdown
## Developer Hooks

### Filters

**`pfbt_registered_formats`** - Modify or add post formats
```php
add_filter( 'pfbt_registered_formats', function( $formats ) {
    $formats['review'] = [
        'name'         => __( 'Review', 'my-theme' ),
        'description'  => __( 'Product review', 'my-theme' ),
        'icon'         => 'star-filled',
        'pattern_slug' => 'my-theme/review-pattern',
    ];
    return $formats;
} );
```

### Actions

**`pfbt_format_selected`** - Fires when format is changed
```php
add_action( 'pfbt_format_selected', function( $post_id, $new_format, $old_format ) {
    // Log format changes
    error_log( "Post $post_id changed from $old_format to $new_format" );
}, 10, 3 );
```
```

### 3.3 Block Development

**Block Registration (blocks/chatlog/chatlog-block.php):**
```php
<?php
function register_chatlog_block() {
    register_block_type(
        __DIR__,
        [
            'render_callback' => 'render_chatlog_block',
            'attributes'      => [
                'transcript' => [
                    'type'    => 'string',
                    'default' => '',
                ],
                'source' => [
                    'type'    => 'string',
                    'default' => 'auto',
                ],
                'detectPlatform' => [
                    'type'    => 'string',
                    'default' => '',
                ],
            ],
        ]
    );
}
add_action( 'init', 'register_chatlog_block' );

function render_chatlog_block( $attributes ) {
    $transcript = $attributes['transcript'] ?? '';
    $source     = $attributes['source'] ?? 'auto';

    if ( empty( $transcript ) ) {
        return '';
    }

    // Parse transcript
    $messages = parse_chat_transcript( $transcript, $source );

    if ( empty( $messages ) ) {
        return '<div class="chatlog-error">Could not parse transcript.</div>';
    }

    // Render messages
    ob_start();
    ?>
    <div class="wp-block-chatlog <?php echo esc_attr( "source-{$source}" ); ?>">
        <?php foreach ( $messages as $message ) : ?>
            <div class="chatlog-message">
                <div class="chatlog-meta">
                    <span class="chatlog-user"><?php echo esc_html( $message['user'] ); ?></span>
                    <span class="chatlog-time"><?php echo esc_html( $message['time'] ); ?></span>
                </div>
                <div class="chatlog-content">
                    <?php echo wp_kses_post( wpautop( $message['content'] ) ); ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
}
```

**Block Edit Component (blocks/chatlog/edit.js):**
```javascript
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
    const { transcript, source } = attributes;
    const [ detectedPlatform, setDetectedPlatform ] = useState( '' );
    const [ confidence, setConfidence ] = useState( 0 );

    useEffect( () => {
        if ( transcript && source === 'auto' ) {
            detectPlatform( transcript );
        }
    }, [ transcript, source ] );

    const detectPlatform = ( text ) => {
        // WhatsApp format: [DD/MM/YYYY, HH:MM:SS] Name: Message
        if ( /^\[[\d\/]+,\s*[\d:]+\]/.test( text ) ) {
            setDetectedPlatform( 'WhatsApp' );
            setConfidence( 90 );
            return;
        }

        // VTT format: WEBVTT header
        if ( /^WEBVTT/m.test( text ) || text.includes( '<v ' ) ) {
            setDetectedPlatform( 'VTT Captions' );
            setConfidence( 95 );
            return;
        }

        // Generic chat format
        if ( /\d{1,2}:\d{2}\s*[AP]M/i.test( text ) ) {
            setDetectedPlatform( 'Slack/Teams/Telegram/Signal' );
            setConfidence( 60 );
            return;
        }

        setDetectedPlatform( 'Unknown' );
        setConfidence( 30 );
    };

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Chat Settings', 'plugin' ) }>
                    <SelectControl
                        label={ __( 'Platform', 'plugin' ) }
                        value={ source }
                        options={ [
                            { label: 'Auto-detect', value: 'auto' },
                            { label: 'Slack', value: 'slack' },
                            { label: 'Discord', value: 'discord' },
                            { label: 'Teams', value: 'teams' },
                            { label: 'WhatsApp', value: 'whatsapp' },
                        ] }
                        onChange={ ( value ) => setAttributes( { source: value } ) }
                    />
                    { source === 'auto' && detectedPlatform && (
                        <p>
                            { __( 'Detected:', 'plugin' ) } { detectedPlatform }
                            { ' ' }({ confidence }% { __( 'confidence', 'plugin' ) })
                        </p>
                    ) }
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <TextareaControl
                    label={ __( 'Paste chat transcript', 'plugin' ) }
                    value={ transcript }
                    onChange={ ( value ) => setAttributes( { transcript: value } ) }
                    rows={ 10 }
                    help={ __( 'Paste exported chat text from Slack, Discord, Teams, etc.', 'plugin' ) }
                />
            </div>
        </>
    );
}
```

**block.json:**
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "plugin/chatlog",
  "version": "1.0.0",
  "title": "Chat Log",
  "category": "text",
  "icon": "format-chat",
  "description": "Display chat transcripts from various platforms.",
  "keywords": [ "chat", "conversation", "transcript", "slack", "discord" ],
  "textdomain": "plugin",
  "attributes": {
    "transcript": {
      "type": "string",
      "default": ""
    },
    "source": {
      "type": "string",
      "default": "auto"
    }
  },
  "supports": {
    "html": false,
    "align": true
  },
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css"
}
```

### 3.4 Pattern Registration

**Register Block Patterns (patterns/quote-format.php):**
```php
<?php
register_block_pattern(
    'plugin/quote-format',
    [
        'title'       => __( 'Quote Format', 'plugin' ),
        'description' => __( 'A beautifully styled quote with attribution', 'plugin' ),
        'categories'  => [ 'post-formats' ],
        'keywords'    => [ 'quote', 'citation', 'blockquote' ],
        'content'     => '<!-- wp:quote {"className":"is-style-large"} -->
<blockquote class="wp-block-quote is-style-large">
    <p>This is a sample quote. Replace this with the quote text you want to feature.</p>
    <cite>Author Name</cite>
</blockquote>
<!-- /wp:quote -->',
    ]
);
```

### 3.5 Build Process

**Build JavaScript and CSS:**
```bash
# Development build with watch
npm run start

# Production build (minified)
npm run build
```

**Build Output:**
```
build/
├── editor.js       # Editor JavaScript
├── editor.css      # Editor styles
├── style.css       # Frontend styles
└── ...
```

**Webpack Entry Points (if customizing):**
```javascript
// webpack.config.js
module.exports = {
    entry: {
        editor: './src/editor/index.js',
        chatlog: './blocks/chatlog/index.js',
    },
    // ... other config
};
```

---

## Phase 4: Testing Infrastructure

### 4.1 PHPUnit Tests

**Setup PHPUnit (phpunit.xml.dist):**
```xml
<?xml version="1.0"?>
<phpunit
    bootstrap="tests/php/bootstrap.php"
    colors="true"
    beStrictAboutTestsThatDoNotTestAnything="true"
>
    <testsuites>
        <testsuite name="Plugin Test Suite">
            <directory>tests/php/</directory>
        </testsuite>
    </testsuites>
    <filter>
        <whitelist processUncoveredFilesFromWhitelist="true">
            <directory suffix=".php">includes/</directory>
        </whitelist>
    </filter>
</phpunit>
```

**Example Test (tests/php/test-format-manager.php):**
```php
<?php
namespace YourPluginNamespace\Tests;

use PHPUnit\Framework\TestCase;
use YourPluginNamespace\FormatManager;

class Test_Format_Manager extends TestCase {

    public function test_get_registered_formats() {
        $manager = new FormatManager();
        $formats = $manager->get_registered_formats();

        $this->assertIsArray( $formats );
        $this->assertArrayHasKey( 'standard', $formats );
        $this->assertArrayHasKey( 'aside', $formats );
    }

    public function test_detect_format_from_content() {
        $manager = new FormatManager();

        // Test quote detection
        $quote_content = '<blockquote>This is a quote</blockquote>';
        $detected = $manager->detect_format( $quote_content );
        $this->assertEquals( 'quote', $detected );

        // Test gallery detection
        $gallery_content = '<!-- wp:gallery -->...<!-- /wp:gallery -->';
        $detected = $manager->detect_format( $gallery_content );
        $this->assertEquals( 'gallery', $detected );
    }
}
```

**Run Tests:**
```bash
# Run all PHP tests
composer phpunit

# Run specific test
./vendor/bin/phpunit tests/php/test-format-manager.php
```

### 4.2 Playwright E2E Tests

**Setup Playwright (playwright.config.js):**
```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        baseURL: process.env.WP_BASE_URL || 'http://localhost:8889',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
```

**Example E2E Test (tests/e2e/format-selection.spec.js):**
```javascript
import { test, expect } from '@playwright/test';

test.describe( 'Format Selection Modal', () => {
    test.beforeEach( async ( { page } ) => {
        // Login to WordPress
        await page.goto( '/wp-admin' );
        await page.fill( '#user_login', 'admin' );
        await page.fill( '#user_pass', 'password' );
        await page.click( '#wp-submit' );

        // Create new post
        await page.goto( '/wp-admin/post-new.php' );
        await page.waitForSelector( '.editor-canvas' );
    } );

    test( 'opens format selection modal', async ( { page } ) => {
        // Click format selector button
        await page.click( '[aria-label="Select Post Format"]' );

        // Verify modal is visible
        const modal = page.locator( '.format-selection-modal' );
        await expect( modal ).toBeVisible();

        // Verify all formats are present
        const formats = [ 'Standard', 'Aside', 'Status', 'Link', 'Gallery',
                         'Image', 'Quote', 'Video', 'Audio', 'Chat' ];

        for ( const format of formats ) {
            await expect( page.locator( `text=${format}` ) ).toBeVisible();
        }
    } );

    test( 'selects quote format', async ( { page } ) => {
        // Open modal
        await page.click( '[aria-label="Select Post Format"]' );

        // Click Quote format card
        await page.click( '[data-format="quote"]' );

        // Verify format is selected
        await expect( page.locator( '.format-indicator' ) ).toContainText( 'Quote' );
    } );

    test( 'keyboard navigation works', async ( { page } ) => {
        // Open modal
        await page.click( '[aria-label="Select Post Format"]' );

        // Press Tab to navigate
        await page.keyboard.press( 'Tab' );
        await page.keyboard.press( 'Tab' );

        // Press Enter to select
        await page.keyboard.press( 'Enter' );

        // Modal should close
        await expect( page.locator( '.format-selection-modal' ) ).not.toBeVisible();
    } );
} );
```

**Run E2E Tests:**
```bash
# Run all E2E tests
npm run test:e2e

# Run specific test
npx playwright test tests/e2e/format-selection.spec.js

# Run with UI
npx playwright test --ui
```

### 4.3 Accessibility Tests

**Accessibility Test with axe-core (tests/accessibility/a11y.spec.js):**
```javascript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe( 'Accessibility Tests', () => {
    test( 'format selection modal is accessible', async ( { page } ) => {
        // Login and navigate
        await page.goto( '/wp-admin/post-new.php' );
        await page.waitForSelector( '.editor-canvas' );

        // Open format modal
        await page.click( '[aria-label="Select Post Format"]' );

        // Run accessibility scan
        const accessibilityScanResults = await new AxeBuilder( { page } )
            .include( '.format-selection-modal' )
            .analyze();

        // Assert no violations
        expect( accessibilityScanResults.violations ).toEqual( [] );
    } );

    test( 'chat log block is accessible', async ( { page } ) => {
        // Create post with chat log block
        await page.goto( '/wp-admin/post-new.php' );
        await page.click( '[aria-label="Add block"]' );
        await page.fill( '[placeholder="Search"]', 'Chat Log' );
        await page.click( 'button:has-text("Chat Log")' );

        // Add sample transcript
        await page.fill( 'textarea', 'John  2:30 PM\nHello world' );

        // Scan for violations
        const results = await new AxeBuilder( { page } ).analyze();
        expect( results.violations ).toEqual( [] );
    } );
} );
```

**Run Accessibility Tests:**
```bash
npm run test:a11y
```

### 4.4 QA Test Plan

**Create Comprehensive Test Plan (QA-TEST-PLAN.md):**
```markdown
# QA Test Plan

## Test Environment

- WordPress Version: 6.8+
- PHP Version: 7.4+
- Test Theme: Twenty Twenty-Four
- Browser: Chrome, Firefox, Safari

## Test Cases

### TC-001: Format Selection Modal

**Objective:** Verify format selection modal opens and displays all formats

**Steps:**
1. Log in to WordPress admin
2. Create a new post
3. Click "Select Post Format" button
4. Observe modal appearance

**Expected Results:**
- Modal opens with smooth animation
- All 10 formats display with icons
- Each format shows name and description
- Modal is keyboard accessible (Tab, Enter, ESC)

### TC-002: Auto-Detection

**Objective:** Verify auto-detection suggests appropriate format

**Steps:**
1. Create new post
2. Add Quote block with content
3. Save draft
4. Observe auto-detection suggestion

**Expected Results:**
- System suggests "Quote" format
- Confidence score is displayed (e.g., 85%)
- User can accept or dismiss suggestion

### TC-003: Chat Log Block - Slack Format

**Objective:** Verify Slack transcript parsing

**Test Data:**
```
susan  2:23 PM
I posted this in Slack

john  2:25 PM
Thanks for sharing!
```

**Steps:**
1. Add Chat Log block
2. Paste test data
3. Select "Slack" or "Auto-detect"
4. Preview rendering

**Expected Results:**
- Transcript parses correctly
- Usernames display
- Timestamps display
- Messages preserve formatting
- Auto-detection identifies "Slack" (or similar platforms)

### TC-004: Chat Log Block - WhatsApp Format

**Test Data:**
```
[15/03/2024, 14:30:15] Susan: Hello
[15/03/2024, 14:32:48] John: Hi there!
```

**Expected Results:**
- WhatsApp format detected at 90% confidence
- Date and time parse correctly
- Usernames and messages display properly

## Common Issues Checklist

**Chat Log Parsing Failures:**
- ✅ Username and timestamp have 2 spaces between them (not 1)
- ✅ No @ symbols before usernames
- ✅ Message on separate line from timestamp
- ✅ WhatsApp format uses brackets: [date, time]

**Format Detection Issues:**
- ✅ Platforms using identical formats show multiple options
- ✅ Confidence scores reflect detection accuracy
- ✅ Manual override option always available
```

**CRITICAL: Test Data Must Match Parser Requirements**

**❌ Wrong Format (Will Fail):**
```
@sarah [9:30 AM]: Hey team!
```

**✅ Correct Format (Will Parse):**
```
sarah  9:30 AM
Hey team!
```

**Key Requirements:**
- 2 SPACES between username and timestamp (not 1)
- No @ symbols in username
- Message on separate line

**Why This Matters:**
- If demo formats in QA plan don't match parser regex patterns, all tests will fail
- Parser regex: `/^(.+?)(?:\s{2,}|\s*\[|\s+)(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))\]?/`
- The `\s{2,}` requires 2 or more spaces

### 4.5 Visual Regression Testing

**Screenshot Comparison Test:**
```javascript
import { test, expect } from '@playwright/test';

test( 'format modal visual regression', async ( { page } ) => {
    await page.goto( '/wp-admin/post-new.php' );
    await page.click( '[aria-label="Select Post Format"]' );

    // Take screenshot
    await expect( page.locator( '.format-selection-modal' ) ).toHaveScreenshot( 'format-modal.png' );
} );
```

### 4.6 Testing with Query Monitor and Debug Bar

**CRITICAL:** Always test your plugin with Query Monitor and Debug Bar during development. These tools catch issues that WordPress.org reviewers will flag.

**Install Testing Plugins:**
```bash
# Via WP-CLI
wp plugin install query-monitor --activate
wp plugin install debug-bar --activate

# Or manually from WordPress.org
# https://wordpress.org/plugins/query-monitor/
# https://wordpress.org/plugins/debug-bar/
```

#### Query Monitor - Essential for Development

**What Query Monitor Detects:**
- ❌ PHP errors, warnings, and notices
- ❌ Database queries (slow queries, duplicate queries)
- ❌ HTTP API requests
- ❌ Hooks and actions firing
- ❌ Template file usage
- ❌ JavaScript errors
- ❌ Deprecated function usage
- ❌ "Doing it Wrong" warnings from WordPress core

**Example Issues Caught by Query Monitor:**

**Issue 1: Block Type Registration**
```
Doing it Wrong:
Function WP_Block_Type_Registry::register was called incorrectly.
Block type names must not contain uppercase characters.
```

**Root Cause:** Missing `block.json` in build directory or incorrect path in `register_block_type()`

**Solution:**
```php
// ❌ Wrong: Missing block.json in build directory
register_block_type( PLUGIN_DIR . 'build/block.json' );

// ✅ Correct: Ensure block.json exists at specified path
register_block_type( PLUGIN_DIR . 'blocks/chatlog/build/block.json' );
```

**Issue 2: Undefined Array Keys**
```
Warning: Undefined array key 'single-format-aside'
in wp-includes/block-template.php on line 234
```

**Root Cause:** Custom template types not registered early enough

**Solution:**
```php
// Register template types on init priority 1 (very early)
add_filter( 'default_template_types', 'plugin_register_template_types', 1 );
```

**Issue 3: Enqueue Issues**
```
Notice: wp_enqueue_style was called incorrectly.
Scripts and styles should not be registered or enqueued until
the wp_enqueue_scripts, admin_enqueue_scripts, or login_enqueue_scripts hooks.
```

**Root Cause:** Enqueueing scripts outside proper hooks

**Solution:**
```php
// ❌ Wrong: Direct call
wp_enqueue_style( 'plugin-style', PLUGIN_URL . 'style.css' );

// ✅ Correct: Use proper hook
add_action( 'admin_enqueue_scripts', function( $hook_suffix ) {
    if ( 'tools_page_plugin-tool' === $hook_suffix ) {
        wp_add_inline_style( 'wp-admin', $custom_css );
    }
} );
```

#### Debug Bar - Additional Diagnostics

**What Debug Bar Shows:**
- Object cache statistics
- WP Query details
- Request information
- Rewrite rules
- Conditional tags
- Environment variables

**How to Use:**
1. Install and activate Debug Bar
2. Look for new toolbar item at top of admin pages
3. Click to expand debug panels
4. Check each panel for warnings or issues
5. Pay special attention to "Queries" and "PHP Warnings" panels

#### Testing Workflow with Query Monitor

**Development Testing Checklist:**

1. **Install Query Monitor and Debug Bar**
2. **Enable WordPress Debug Mode** (wp-config.php):
```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );
```

3. **Test Every Page/Feature:**
   - Plugin activation
   - Plugin settings pages
   - Post editor with plugin features
   - Frontend display
   - AJAX operations
   - Admin tools/utilities

4. **Check Query Monitor After Each Action:**
   - Look for red error indicators
   - Check "Queries" tab for slow/duplicate queries
   - Review "Deprecated" tab for old functions
   - Scan "Hooks & Actions" for proper hook usage
   - Verify "HTTP" tab for external requests
   - Check "Scripts & Styles" for enqueue issues

5. **Fix Issues Immediately:**
   - Don't accumulate technical debt
   - WordPress.org reviewers WILL catch these
   - Users with debug mode enabled will report them

#### Common Issues Detected by Query Monitor

**Issue: Inline Styles**
```
Query Monitor Warning: Styles enqueued directly in template
```

**Fix:**
```php
// ❌ Wrong: Inline style in template
<style>
    .my-element { color: red; }
</style>

// ✅ Correct: Use wp_add_inline_style()
function plugin_enqueue_styles( $hook_suffix ) {
    if ( 'tools_page_plugin-tool' === $hook_suffix ) {
        wp_add_inline_style( 'wp-admin', '
            .my-element { color: red; }
        ' );
    }
}
add_action( 'admin_enqueue_scripts', 'plugin_enqueue_styles' );
```

**Issue: Missing Nonce Verification**
```
Security: Form submission without nonce verification
```

**Fix:**
```php
// ❌ Wrong: No nonce check
if ( isset( $_POST['action'] ) ) {
    // Process form
}

// ✅ Correct: Verify nonce
if ( isset( $_POST['action'] ) &&
     isset( $_POST['_wpnonce'] ) &&
     wp_verify_nonce( $_POST['_wpnonce'], 'plugin_action' ) ) {
    // Process form
}
```

**Issue: Unsanitized Input**
```
Security Warning: Unsanitized user input detected
```

**Fix:**
```php
// ❌ Wrong: Direct use of $_POST
$value = $_POST['user_input'];

// ✅ Correct: Sanitize input
$value = sanitize_text_field( wp_unslash( $_POST['user_input'] ) );
```

**Issue: Unescaped Output**
```
Security Warning: Unescaped output detected
```

**Fix:**
```php
// ❌ Wrong: Direct echo
echo $user_provided_text;

// ✅ Correct: Escape output
echo esc_html( $user_provided_text );
```

#### Testing Strategy: Before WordPress.org Submission

**Final Testing Checklist with Query Monitor:**

1. **Clean WordPress Install:**
   - Fresh WordPress 6.8+ installation
   - Default theme (Twenty Twenty-Four)
   - Only your plugin activated
   - Query Monitor + Debug Bar active

2. **Enable All Debug Modes:**
   - WP_DEBUG = true
   - WP_DEBUG_LOG = true
   - SCRIPT_DEBUG = true
   - Check debug.log for errors

3. **Test All Plugin Features:**
   - Activation/deactivation
   - Every admin page
   - Every frontend feature
   - Every AJAX operation
   - Every form submission
   - Every block/shortcode

4. **Check Query Monitor After Each Test:**
   - Zero PHP errors
   - Zero warnings
   - Zero "Doing it Wrong" notices
   - Zero deprecated function calls
   - Zero security warnings

5. **Test with Other Plugins:**
   - Popular plugins (Yoast SEO, WooCommerce, Jetpack)
   - Check for conflicts
   - Verify Query Monitor shows no issues

6. **Test Theme Compatibility:**
   - Twenty Twenty-Four (default block theme)
   - Popular block themes (Blocksy, Kadence)
   - Popular classic themes (GeneratePress, Astra)

**If Query Monitor Shows ANY Issues:**
- ❌ DO NOT submit to WordPress.org
- Fix all issues first
- Retest until Query Monitor is clean
- WordPress.org reviewers use similar tools

#### Real-World Example: Post Formats for Block Themes

**Issue Found:**
Query Monitor showed "Doing it Wrong" warning about block registration.

**Investigation:**
- Read error message carefully
- Checked block registration code
- Found `block.json` was missing from build directory
- PHP was trying to register block without required metadata

**Solution:**
1. Copied `block.json` to `blocks/chatlog/build/` directory
2. Updated textdomain to match plugin
3. Verified `register_block_type()` path was correct
4. Retested - warning disappeared

**Key Takeaway:**
Query Monitor catches issues that would have been caught by WordPress.org reviewers. Fix them during development, not during review.

#### Query Monitor Pro Tips

1. **Check Admin Bar:** Red badge = errors exist
2. **Use Filters:** Filter by component (plugin, theme, core)
3. **Export Debug Info:** Query Monitor can export debug data for support
4. **Monitor AJAX:** See AJAX requests in real-time
5. **Check Hooks:** Verify your hooks are firing at correct priority

**Resources:**
- [Query Monitor Plugin](https://wordpress.org/plugins/query-monitor/)
- [Query Monitor Documentation](https://querymonitor.com/docs/)
- [Debug Bar Plugin](https://wordpress.org/plugins/debug-bar/)
- [WordPress Debugging](https://wordpress.org/documentation/article/debugging-in-wordpress/)

---

## Phase 5: Documentation

### 5.1 README.md (GitHub Documentation)

**Target Audience:** Developers and contributors

**Structure:**
```markdown
# Plugin Name

Brief tagline describing the plugin's purpose.

[![WordPress](https://img.shields.io/badge/WordPress-6.8%2B-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple.svg)](https://php.net/)
[![License](https://img.shields.io/badge/license-GPL--2.0%2B-red.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

## Overview

Comprehensive description of what the plugin does, why it exists, and who it's for.

## Features

- ✅ Feature 1 with details
- ✅ Feature 2 with details
- ✅ Feature 3 with details

## Requirements

- WordPress 6.8 or higher
- PHP 7.4 or higher
- Block theme (FSE theme)

## Installation

### From WordPress.org (After Approval)

1. Go to Plugins > Add New
2. Search for "Plugin Name"
3. Click Install, then Activate

### Manual Installation

1. Download the plugin
2. Upload to `/wp-content/plugins/`
3. Activate via Plugins menu

### Development Installation

```bash
git clone https://github.com/yourusername/plugin-name.git
cd plugin-name
npm install
composer install
npm run build
```

## Usage

### Basic Usage

Explain most common use case with screenshots.

### Advanced Usage

Developer examples with code.

## Developer Hooks

### Filters

**`prefix_filter_name`** - Description
```php
// Example code
add_filter( 'prefix_filter_name', function( $value ) {
    // Modify $value
    return $value;
} );
```

### Actions

**`prefix_action_name`** - Description
```php
// Example code
add_action( 'prefix_action_name', function( $param1, $param2 ) {
    // Do something
}, 10, 2 );
```

## Testing

```bash
# Run PHP tests
composer test

# Run E2E tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y

# Run all tests
npm run test:all
```

## Architecture

Brief explanation of plugin architecture, design decisions, and patterns used.

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## Changelog

See [CHANGELOG.md](CHANGELOG.md)

## License

GPL v2 or later

## Credits

- Author information
- Contributors
- Third-party libraries
```

### 5.2 readme.txt (WordPress.org Documentation)

**Target Audience:** WordPress users (non-developers)

**Structure:**
```
=== Plugin Name ===
Contributors: yourusername
Donate link: https://github.com/sponsors/yourusername
Tags: tag1, tag2, tag3, tag4, tag5
Requires at least: 6.8
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Brief description (150 characters max) displayed in search results.

== Description ==

Comprehensive description of what the plugin does for end users.

= Features =

* Feature 1 - User-friendly explanation
* Feature 2 - User-friendly explanation
* Feature 3 - User-friendly explanation

= Use Cases =

**For Bloggers:**
Explain specific use case.

**For Publishers:**
Explain specific use case.

**For Developers:**
Explain specific use case.

= Documentation =

Full documentation available at [plugin website](https://example.com/docs).

= Support =

* Documentation: [Link]
* Support Forum: [Link]
* GitHub Issues: [Link]

== Installation ==

= Automatic Installation =

1. Go to Plugins > Add New
2. Search for "Plugin Name"
3. Click Install Now
4. Activate the plugin

= Manual Installation =

1. Download the plugin ZIP file
2. Go to Plugins > Add New > Upload Plugin
3. Choose the ZIP file and click Install Now
4. Activate the plugin

= After Activation =

Step-by-step guide for first-time setup.

== Frequently Asked Questions ==

= Question 1? =

Answer with helpful details.

= Question 2? =

Answer with helpful details.

= Does this work with [specific theme/plugin]? =

Yes/No with explanation.

= Is this plugin accessible? =

Yes, tested with screen readers and keyboard navigation.

== Screenshots ==

1. Screenshot 1 caption
2. Screenshot 2 caption
3. Screenshot 3 caption

== Changelog ==

= 1.0.0 =
* Initial release
* Feature 1
* Feature 2
* Feature 3

== Upgrade Notice ==

= 1.0.0 =
Initial release.
```

**Key readme.txt Requirements:**
- **Contributors:** Must match WordPress.org usernames
- **Tags:** Maximum 5 tags, lowercase, hyphens for multi-word
- **Tested up to:** Must be current WordPress version
- **Description:** Clear, user-friendly language
- **Screenshots:** Numbered list with captions

### 5.3 CHANGELOG.md

**Keep Semantic Versioning:**
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Feature in development

## [1.0.0] - 2024-03-15

### Added
- Initial release
- Format selection modal with 10 classic post formats
- Auto-detection based on post content
- Chat Log block with multi-platform support
- Format-specific block patterns
- Full Site Editor support
- Repair tool for legacy post formats

### Changed
- N/A (initial release)

### Fixed
- N/A (initial release)

### Security
- N/A (initial release)

## Version Number Guidelines

- **Major (X.0.0):** Breaking changes
- **Minor (1.X.0):** New features, backwards compatible
- **Patch (1.0.X):** Bug fixes, backwards compatible

## Types of Changes

- **Added:** New features
- **Changed:** Changes to existing functionality
- **Deprecated:** Soon-to-be removed features
- **Removed:** Removed features
- **Fixed:** Bug fixes
- **Security:** Security fixes
```

### 5.4 Inline Code Documentation

**PHPDoc Standards:**
```php
/**
 * Parse chat transcript into structured message array.
 *
 * Supports multiple chat platforms including Slack, Discord, Microsoft Teams,
 * WhatsApp, Telegram, and Signal. Also supports SRT subtitle and VTT caption formats.
 *
 * @since 1.0.0
 *
 * @param string $raw_transcript The raw transcript text to parse.
 * @param string $source         Platform identifier or 'auto' for auto-detection.
 *                               Accepts: 'auto', 'slack', 'discord', 'teams', 'whatsapp',
 *                               'telegram', 'signal', 'srt', 'vtt', 'generic'.
 *
 * @return array Array of parsed messages. Each message contains:
 *               - user (string): Username or speaker name.
 *               - time (string): Timestamp of the message.
 *               - content (string): Message content.
 *               Returns empty array if parsing fails.
 */
function parse_chat_transcript( $raw_transcript, $source = 'auto' ) {
    // Implementation...
}
```

**JSDoc Standards:**
```javascript
/**
 * Detect chat platform from transcript text.
 *
 * Analyzes transcript format and returns the most likely platform
 * with a confidence score. Returns 'Unknown' if no pattern matches.
 *
 * @since 1.0.0
 *
 * @param {string} transcript - Raw transcript text to analyze.
 * @return {Object} Detection result object.
 * @return {string} return.platform - Detected platform name.
 * @return {number} return.confidence - Confidence score (0-100).
 */
function detectPlatform( transcript ) {
    // Implementation...
}
```

---

## Phase 6: WordPress.org Asset Creation

### 6.1 Asset Requirements

**Required Assets:**

| Asset | Dimensions | Format | Background | Max Size |
|-------|-----------|--------|------------|----------|
| Icon | 256×256px | PNG | Transparent | 1MB |
| Banner | 772×250px | PNG/JPG | Opaque | 1MB |
| Banner 2x | 1544×500px | PNG/JPG | Opaque | 1MB |
| Screenshots | 1390×864px | PNG/JPG | Any | 1MB each |

**Asset Directory Structure:**
```
.wordpress-org/
├── icon-256x256.png
├── banner-772x250.png
├── banner-1544x500.png
├── screenshot-1.png
├── screenshot-2.png
├── screenshot-3.png
├── ...
├── README.md              # Asset specifications
├── ASSETS-CHECKLIST.md    # Creation guide
└── DESIGN-PROMPT.md       # Design specifications
```

**Git Configuration:**
- ✅ Track `.wordpress-org/` in Git (for version control)
- ✅ Exclude from plugin ZIP via `.distignore`

### 6.2 Design Specifications

**Brand Guidelines:**

**Color Palette:**
- WordPress Blue: `#0073AA`, `#2271B1`
- Accent colors: Purple `#8B5CF6`, Teal `#14B8A6`, Green `#10B981`
- Neutrals: White, Light Gray `#F3F4F6`, Dark Gray `#1F2937`

**Typography:**
- Sans-serif fonts: Inter, Poppins, -apple-system, BlinkMacSystemFont
- Bold weights for headings (700-800)
- Regular weights for body (400-500)

**Icon Design:**
- Simple, bold, recognizable at small sizes (32×32px)
- High contrast for light and dark backgrounds
- 10-15% padding from edges
- 2-3 colors maximum

**Banner Design:**
- Plugin name prominently displayed
- Tagline clearly visible
- Visual elements representing plugin purpose
- WordPress-friendly color scheme
- Professional, modern aesthetic
- Readable text at actual size

### 6.3 Using Official WordPress Dashicons

**IMPORTANT:** Always use official WordPress Dashicons for consistency.

**Dashicons for Post Formats:**
1. **Quote** → `dashicons-format-quote`
2. **Gallery** → `dashicons-format-gallery`
3. **Video** → `dashicons-format-video`
4. **Audio** → `dashicons-format-audio`
5. **Chat** → `dashicons-format-chat`
6. **Link** → `dashicons-admin-links`
7. **Image** → `dashicons-format-image`
8. **Status** → `dashicons-format-status`
9. **Aside** → `dashicons-format-aside`
10. **Standard** → `dashicons-format-standard`

**Resources:**
- [Official Dashicons](https://developer.wordpress.org/resource/dashicons/)
- [Dashicons GitHub](https://github.com/WordPress/dashicons)
- Figma plugin: "WordPress Icons" or "Dashicons"

**Design Tool Workflow:**
1. Install Dashicons in your design software (Figma, Sketch, Illustrator)
2. Use exact Dashicon names listed above
3. DO NOT create custom icons or use generic icon sets
4. Export at required dimensions

### 6.4 Screenshot Creation Guide

**Screenshot Specifications:**
- **Dimensions:** 1390×864px (recommended)
- **Format:** PNG or JPG
- **Max size:** 1MB each
- **Naming:** `screenshot-1.png`, `screenshot-2.png`, etc.

**Recommended Screenshots (8 total):**

**Screenshot 1: Format Selection Modal**
- **Caption:** "Choose from 10 classic post formats with visual cards"
- **What to capture:** Format selection modal open, showing all format cards with icons
- **Browser:** Chrome, clean admin interface

**Screenshot 2: Auto-Detection**
- **Caption:** "Intelligent auto-detection suggests formats based on your content"
- **What to capture:** Auto-detection notice suggesting a format with confidence score

**Screenshot 3: Format Switcher**
- **Caption:** "Switch formats anytime with the editor sidebar control"
- **What to capture:** Post editor with format switcher visible in sidebar

**Screenshot 4: Chat Log Block - Setup**
- **Caption:** "Paste chat transcripts from Slack, Discord, Teams, and more"
- **What to capture:** Chat Log block in editor showing textarea with sample transcript

**Screenshot 5: Chat Log Block - Rendered**
- **Caption:** "Beautifully formatted chat conversations with timestamps"
- **What to capture:** Published post with rendered Chat Log block (frontend)

**Screenshot 6: Block Patterns**
- **Caption:** "Format-specific block patterns for quick content creation"
- **What to capture:** Pattern inserter showing post format patterns

**Screenshot 7: Settings/Format Repair**
- **Caption:** "Repair tool fixes legacy post format assignments"
- **What to capture:** Settings page or repair tool interface

**Screenshot 8: Site Editor Integration**
- **Caption:** "Full Site Editor support with format-specific templates"
- **What to capture:** Site Editor showing format template customization

**Capture Process:**
1. Set browser window to 1390×864px (use browser dev tools)
2. Clear cache and disable unrelated plugins
3. Use clean theme (Twenty Twenty-Four)
4. Take screenshots at 100% zoom
5. Save as PNG for best quality
6. Optimize file size (TinyPNG, ImageOptim)

### 6.5 Design Prompt Creation

**Create DESIGN-PROMPT.md for designers or AI tools:**

```markdown
# WordPress.org Plugin Assets Design Prompt

## Plugin Overview

**Name:** Your Plugin Name
**Tagline:** Brief tagline
**Purpose:** What the plugin does
**Target Audience:** Who uses it
**Brand Personality:** Modern, professional, accessible

## Icon Requirements (256×256px)

**Design Concept:**
- Simple, recognizable symbol
- Represents plugin's core purpose
- Clear at 32×32px when scaled
- Transparent background

**Color Palette:**
- WordPress Blue: #2271B1, #0073AA
- Accent: Purple #8B5CF6
- 2-3 colors maximum

**Dashicons to Use:**
[List specific Dashicons]

## Banner Requirements (772×250px and 1544×500px)

**Layout:**
- Left: Plugin name + tagline
- Right: Visual element (icons, mockup)

**Typography:**
- Plugin name: Bold, 42px, white
- Tagline: Regular, 18px, white with 90% opacity

**Background:**
- Gradient: #2271B1 → #0073AA → #1E3A8A

**Visual Elements:**
- [Specific icons or mockups to include]

**Text Content:**
```
Plugin Name: Your Plugin Name
Tagline: Your tagline here
Feature Highlights: Feature 1 • Feature 2 • Feature 3
Badge: WordPress 6.8+
```

## Design Specifications

- Icon: 256×256px PNG, transparent background
- Banner: 772×250px PNG/JPG
- Banner 2x: 1544×500px PNG/JPG (same design, 2× scale)
- All files under 1MB
- Use official WordPress Dashicons only

## Deliverables

1. icon-256x256.png
2. banner-772x250.png
3. banner-1544x500.png

Test icon at 32×32px to ensure clarity.
```

### 6.6 Asset Creation Workflow

**Option 1: Design Software (Recommended)**
1. Open Figma, Sketch, or Illustrator
2. Install WordPress Icons/Dashicons plugin
3. Create artboards at exact dimensions
4. Follow design specifications
5. Use exact Dashicon names
6. Export as PNG (icon with transparency, banners opaque)
7. Optimize file sizes
8. Save to `.wordpress-org/` directory

**Option 2: AI Design Tools**
1. Use DESIGN-PROMPT.md with Claude, ChatGPT, or Midjourney
2. Request exact Dashicon usage
3. Specify dimensions and file formats
4. Review and refine results
5. Export and optimize

**Option 3: Hire Designer**
1. Provide DESIGN-PROMPT.md
2. Share Dashicons resource links
3. Request vector source files (AI, SVG, Figma)
4. Review mockups before final delivery
5. Request revisions if needed

**Asset Optimization:**
```bash
# Install ImageOptim (Mac)
brew install --cask imageoptim

# Or use online tools
# - TinyPNG: https://tinypng.com/
# - Squoosh: https://squoosh.app/
```

### 6.7 WordPress.org Asset Directory: Lessons Learned

**CRITICAL UNDERSTANDING: Three Separate Locations**

Your WordPress plugin assets exist in **three different places** with different purposes:

**1. `.wordpress-org/` Directory (In Your Git Repository)**
- **Purpose:** Version control and development
- **Location:** Root of your Git repository
- **Contains:** All assets for WordPress.org listing
- **Tracked:** ✅ YES - Commit to Git for version control
- **Included in ZIP:** ❌ NO - Excluded via `.distignore`

**2. Plugin ZIP File (For Initial Submission)**
- **Purpose:** WordPress.org initial submission only
- **Location:** Distributed via ZIP file
- **Contains:** Plugin code ONLY (no assets)
- **Assets:** ❌ NOT included in plugin ZIP
- **Why:** Assets go to SVN `/assets` directory separately

**3. SVN `/assets` Directory (WordPress.org Hosting)**
- **Purpose:** Display on WordPress.org plugin page
- **Location:** `https://plugins.svn.wordpress.org/plugin-slug/assets/`
- **Contains:** Icon, banners, screenshots for plugin listing
- **User Downloads:** ❌ NO - Assets are NOT downloaded with plugin
- **Purpose:** Display only on WordPress.org website

**Workflow Summary:**
```bash
# Step 1: Create assets in .wordpress-org/ directory
# Step 2: Commit to Git (version control)
# Step 3: Build plugin ZIP (assets excluded via .distignore)
# Step 4: Submit plugin ZIP to WordPress.org
# Step 5: After approval, upload assets to SVN /assets directory separately
```

**Example .distignore File:**
```
# Exclude WordPress.org assets from plugin ZIP
.wordpress-org/

# Also exclude development files
.git/
.github/
node_modules/
tests/
bin/
src/
*.log
package-lock.json
composer.lock
phpunit.xml
```

**Why This Structure Matters:**

1. **Assets Don't Bloat Plugin Downloads**
   - Users only download plugin code (typically 50-200KB)
   - Assets (banners, screenshots) can be 2-5MB total
   - Assets are displayed on WordPress.org but never downloaded by users

2. **Independent Asset Updates**
   - Update screenshots without releasing new plugin version
   - Fix banner typos without code changes
   - Refresh icon without triggering update notifications

3. **Git Version Control**
   - Track asset changes over time
   - Review asset updates in pull requests
   - Rollback to previous asset versions if needed

**Real-World Example from This Project:**

```bash
# Our asset workflow for Post Formats for Block Themes
.wordpress-org/
├── icon-256x256.png          # 26KB - Small icon for search results
├── banner-772x250.png         # 345KB - Standard banner
├── banner-1544x500.png        # 1.0MB - Retina banner
├── screenshot-1.png           # ~200KB - Format selection modal
├── screenshot-2.png           # ~200KB - Chat Log block editor
├── screenshot-3.png           # ~200KB - Chat Log frontend
├── screenshot-4.png           # ~200KB - Quote format
├── screenshot-5.png           # ~200KB - Status format
├── screenshot-6.png           # ~200KB - Repair tool
├── README.md                  # Asset documentation
├── ASSETS-CHECKLIST.md        # Pre-submission checklist
└── DESIGN-PROMPT.md           # Design specifications

# Total assets: ~2.5MB
# Plugin ZIP size: 84KB
# User downloads: 84KB only!
```

**Asset Verification Checklist:**
- ✅ All assets saved to `.wordpress-org/` directory
- ✅ `.wordpress-org/` tracked in Git
- ✅ `.wordpress-org/` listed in `.distignore`
- ✅ Plugin ZIP does NOT contain `.wordpress-org/` directory
- ✅ All assets under 1MB each
- ✅ Icon is 256×256px PNG with transparent background
- ✅ Banners are 772×250px and 1544×500px
- ✅ Screenshots are 1390×864px (or close ratio)
- ✅ File naming: `icon-256x256.png`, `banner-772x250.png`, `screenshot-1.png`, etc.

**Pro Tips:**

1. **Always Check ZIP Contents**
   ```bash
   # Before submitting, verify .wordpress-org is excluded
   unzip -l plugin-name.zip | grep wordpress-org
   # Should return nothing
   ```

2. **Asset File Size Matters**
   - WordPress.org has 1MB per file limit
   - Optimize with TinyPNG, ImageOptim, or Squoosh
   - Balance quality vs file size
   - Our banners: 345KB (standard), 1.0MB (retina) - both acceptable

3. **Screenshot Captions Are Critical**
   - Users can't click screenshots to enlarge on WordPress.org
   - Captions should explain what's shown
   - Use descriptive, benefit-focused language
   - Example: "Format selection modal with 10 classic post formats and visual cards"

4. **Update Assets Independently**
   ```bash
   # After plugin approval, update assets anytime via SVN
   cd plugin-slug-svn/assets
   cp /path/to/new-screenshot-7.png .
   svn add screenshot-7.png
   svn ci -m "Add screenshot showing new feature"
   # No plugin version update needed!
   ```

---

## Phase 7: Pre-Submission Checklist

### 7.1 Code Quality Verification

**Run All Linters:**
```bash
# PHP CodeSniffer
composer phpcs

# Fix auto-fixable issues
composer phpcbf

# ESLint
npm run lint:js

# StyleLint
npm run lint:css
```

**Address All Violations:**
- WordPress Coding Standards compliance
- No PHP errors or warnings
- No JavaScript console errors
- No CSS validation errors

### 7.2 Security Review

**Security Checklist:**

**Data Sanitization:**
- ✅ All user input is sanitized (`sanitize_text_field`, `sanitize_textarea_field`, `wp_kses_post`)
- ✅ SQL queries use `$wpdb->prepare()`
- ✅ No raw SQL queries

**Data Escaping:**
- ✅ All output is escaped (`esc_html`, `esc_attr`, `esc_url`, `wp_kses_post`)
- ✅ Proper escaping in templates
- ✅ JavaScript data passed via `wp_localize_script()`

**Nonces:**
- ✅ All forms include nonce fields (`wp_nonce_field`)
- ✅ All AJAX requests verify nonces (`wp_verify_nonce`, `check_ajax_referer`)

**Capabilities:**
- ✅ Proper capability checks (`current_user_can`)
- ✅ No direct access to files (check `ABSPATH` constant)

**Common Vulnerabilities:**
- ✅ No XSS vulnerabilities
- ✅ No SQL injection vulnerabilities
- ✅ No CSRF vulnerabilities
- ✅ No file inclusion vulnerabilities
- ✅ No command injection

**Example Security Implementation:**
```php
// Form with nonce
<form method="post">
    <?php wp_nonce_field( 'plugin_action', 'plugin_nonce' ); ?>
    <input type="text" name="user_input" />
    <button type="submit">Submit</button>
</form>

// Processing with nonce verification
if ( isset( $_POST['plugin_nonce'] ) && wp_verify_nonce( $_POST['plugin_nonce'], 'plugin_action' ) ) {
    // Check capability
    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_die( 'Insufficient permissions' );
    }

    // Sanitize input
    $user_input = sanitize_text_field( $_POST['user_input'] );

    // Process data...
}

// Output with escaping
<div class="plugin-output">
    <h2><?php echo esc_html( $title ); ?></h2>
    <a href="<?php echo esc_url( $link ); ?>">
        <?php echo esc_html( $link_text ); ?>
    </a>
</div>
```

### 7.3 Testing Checklist

**Run All Tests:**
```bash
# PHP unit tests
composer phpunit

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y

# Full test suite
npm run test:all
```

**Manual Testing:**
- ✅ Test in fresh WordPress installation
- ✅ Test with default theme (Twenty Twenty-Four)
- ✅ Test with popular themes (GeneratePress, Astra)
- ✅ Test with common plugins (WooCommerce, Yoast SEO)
- ✅ Test on multiple browsers (Chrome, Firefox, Safari)
- ✅ Test on mobile devices
- ✅ Test with block editor (Gutenberg)
- ✅ Test with classic editor (if supported)

**Use QA Test Plan:**
- Run through all test cases in QA-TEST-PLAN.md
- Verify all demos work correctly
- Check edge cases and error handling
- Test with incorrect/malformed input

### 7.4 Accessibility Compliance

**WCAG 2.1 AA Standards:**
- ✅ Color contrast ratios meet requirements (4.5:1 for text)
- ✅ All interactive elements are keyboard accessible
- ✅ Focus indicators are visible
- ✅ ARIA labels on custom controls
- ✅ Semantic HTML structure
- ✅ Alt text on images
- ✅ Form labels associated with inputs
- ✅ Error messages are descriptive

**Screen Reader Testing:**
- ✅ Test with NVDA (Windows)
- ✅ Test with VoiceOver (Mac)
- ✅ All content is announced correctly
- ✅ Navigation is logical

**Keyboard Navigation:**
- ✅ Tab order is logical
- ✅ Enter/Space activate buttons
- ✅ ESC closes modals/dropdowns
- ✅ Arrow keys navigate lists/menus (where appropriate)
- ✅ No keyboard traps

### 7.5 Translation Readiness

**Internationalization (i18n):**
```php
// All strings wrapped in translation functions
__( 'Text to translate', 'plugin-text-domain' );
_e( 'Text to translate and echo', 'plugin-text-domain' );
_x( 'Text', 'Context for translator', 'plugin-text-domain' );
_n( 'Singular', 'Plural', $count, 'plugin-text-domain' );

// JavaScript translations
wp_set_script_translations( 'plugin-handle', 'plugin-text-domain' );
```

**Check Translation Readiness:**
```bash
# Generate POT file
wp i18n make-pot . languages/plugin-text-domain.pot
```

**Translation Checklist:**
- ✅ All user-facing strings are translatable
- ✅ Consistent text domain throughout plugin
- ✅ Text domain matches plugin slug
- ✅ POT file generates without errors
- ✅ No concatenated strings (translators need full context)
- ✅ Placeholders use sprintf format

**Example:**
```php
// ❌ Wrong: Concatenated strings
echo __( 'You have', 'plugin' ) . ' ' . $count . ' ' . __( 'items', 'plugin' );

// ✅ Correct: Full translatable string
echo sprintf(
    _n( 'You have %d item', 'You have %d items', $count, 'plugin' ),
    $count
);
```

### 7.6 Performance Optimization

**Performance Checklist:**
- ✅ Minimize number of database queries
- ✅ Cache expensive operations
- ✅ Lazy load non-critical assets
- ✅ Minify JavaScript and CSS (via build process)
- ✅ Optimize images (under 1MB)
- ✅ Avoid blocking scripts where possible
- ✅ Use transients for caching

**Example Caching:**
```php
// Cache expensive operation
$data = get_transient( 'plugin_cached_data' );

if ( false === $data ) {
    // Expensive operation
    $data = expensive_database_query();

    // Cache for 1 hour
    set_transient( 'plugin_cached_data', $data, HOUR_IN_SECONDS );
}

return $data;
```

### 7.7 Final Build

**Create Distribution Build:**
```bash
# Clean previous builds
rm -rf dist/ *.zip

# Run production build
npm run build

# Create plugin ZIP
zip -r plugin-name.zip . \
    -x "*.git*" \
    -x "*node_modules*" \
    -x "*vendor*" \
    -x "*tests*" \
    -x "*bin*" \
    -x "*.wordpress-org*" \
    -x "*src*" \
    -x "*package*.json" \
    -x "*composer*.json"
```

**Or use build script:**
```bash
#!/bin/bash
# bin/build-plugin.sh

PLUGIN_SLUG="plugin-name"
PLUGIN_VERSION=$(grep "Version:" $PLUGIN_SLUG.php | awk '{print $2}')

echo "Building $PLUGIN_SLUG v$PLUGIN_VERSION..."

# Clean
rm -rf dist/ *.zip

# Build JavaScript
npm run build

# Create distribution directory
mkdir -p dist/$PLUGIN_SLUG

# Copy plugin files (excluding development files)
rsync -av \
    --exclude='*.git*' \
    --exclude='node_modules' \
    --exclude='vendor' \
    --exclude='tests' \
    --exclude='bin' \
    --exclude='.wordpress-org' \
    --exclude='src' \
    --exclude='package*.json' \
    --exclude='composer*.json' \
    ./ dist/$PLUGIN_SLUG/

# Create ZIP
cd dist
zip -r ../$PLUGIN_SLUG-$PLUGIN_VERSION.zip $PLUGIN_SLUG/
cd ..

echo "Build complete: $PLUGIN_SLUG-$PLUGIN_VERSION.zip"
```

**Test Distribution Build:**
1. Extract ZIP to fresh WordPress installation
2. Activate plugin
3. Run through all test cases
4. Verify no errors in console or PHP logs
5. Check file size (should be reasonable, exclude unnecessary files)

---

## Phase 8: WordPress.org Submission

### 8.1 Plugin Submission Process

**Submit Plugin:**
1. Go to [WordPress.org Plugin Submission](https://wordpress.org/plugins/developers/add/)
2. Upload plugin ZIP file
3. Wait for automated checks
4. Plugin enters review queue

**What Happens:**
- Automated security scan
- Zip file validation
- readme.txt parsing
- Plugin enters manual review queue (can take days to weeks)

### 8.2 README.txt Requirements

**Critical readme.txt Elements:**

**Header Section:**
```
=== Plugin Name ===
Contributors: wordpressorgusername (must exist!)
Donate link: https://example.com/donate
Tags: tag1, tag2, tag3 (max 5, lowercase, hyphens)
Requires at least: 6.8
Tested up to: 6.8 (must be current)
Requires PHP: 7.4
Stable tag: 1.0.0 (matches version in plugin file)
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Short description here (150 characters max).
```

**Common Mistakes:**
- ❌ Contributors don't match WordPress.org usernames
- ❌ "Tested up to" is outdated
- ❌ "Stable tag" doesn't match plugin version
- ❌ More than 5 tags
- ❌ Tags with capital letters or spaces
- ❌ Short description exceeds 150 characters

**Description Section:**
- Clear explanation of what plugin does
- Feature list with bullet points
- Use cases or examples
- Link to documentation
- Support information

**Installation Section:**
- Step-by-step installation instructions
- After activation steps
- Configuration guide

**FAQ Section:**
- Common questions from users
- Compatibility information
- Troubleshooting tips

**Screenshots Section:**
```
== Screenshots ==

1. Caption for screenshot-1.png
2. Caption for screenshot-2.png
3. Caption for screenshot-3.png
```

**Changelog Section:**
```
== Changelog ==

= 1.0.0 =
* Initial release
* Feature 1
* Feature 2
```

### 8.2.1 Tag Selection: Best Practices and Strategy

**CRITICAL:** Tags determine plugin discoverability. Choose wisely!

**WordPress.org Tag Rules:**
- **Maximum:** 5 tags only
- **Format:** All lowercase, hyphens for spaces (e.g., `block-theme`, not `Block Theme`)
- **Purpose:** Help users find your plugin in WordPress.org search and filters
- **Strategy:** Balance specificity with search volume

**Tag Selection Strategy:**

**1. Primary Purpose Tags (1-2 tags)**
- What is the main function of your plugin?
- Examples: `post-formats`, `caching`, `security`, `seo`, `analytics`

**2. Technology/Integration Tags (1-2 tags)**
- What WordPress features does it integrate with?
- Examples: `block-editor`, `block-theme`, `gutenberg`, `rest-api`, `custom-post-types`

**3. Feature/Use Case Tags (1-2 tags)**
- What specific features or use cases does it solve?
- Examples: `patterns`, `templates`, `chat-log`, `markdown`, `syntax-highlighting`

**Real-World Example from This Project:**

Our plugin "Post Formats for Block Themes" uses these 5 tags:
```
Tags: post-formats, block-theme, patterns, block-editor, chat-log
```

**Why These Tags:**

1. **`post-formats`** (Primary Purpose)
   - Exact match for what plugin does
   - Users searching for "post formats" will find it
   - Core WordPress feature name

2. **`block-theme`** (Technology Integration)
   - Targets block theme users specifically
   - Distinguishes from classic theme support
   - Growing market segment (WordPress direction)

3. **`patterns`** (Feature)
   - Plugin provides 10 format-specific patterns
   - Popular search term in block editor ecosystem
   - Highlights key feature

4. **`block-editor`** (Technology Integration)
   - Integrates with Gutenberg/block editor
   - Users filtering by "block-editor" will see it
   - Indicates modern WordPress compatibility

5. **`chat-log`** (Unique Feature)
   - Differentiates from other post format plugins
   - Niche but specific search term
   - Highlights unique Chat Log block feature

**Tags We Considered But Didn't Use:**
- ❌ `gutenberg` - Too generic, redundant with `block-editor`
- ❌ `templates` - Less important than other features
- ❌ `editor` - Too broad, `block-editor` is more specific
- ❌ `content` - Too generic, doesn't help discoverability
- ❌ `formatting` - Similar to `post-formats`, wastes a tag slot

**Tag Research Tips:**

**1. Check Competitor Tags**
```bash
# Research similar plugins on WordPress.org
# Example: Search for "post formats" plugins
# Note their tags, active installs, and ratings
```

**2. Use WordPress.org Tag Pages**
- Visit: `https://wordpress.org/plugins/tags/YOUR-TAG/`
- Example: `https://wordpress.org/plugins/tags/block-theme/`
- See what other plugins are in that tag category
- Check if tag is too crowded or too empty

**3. Balance Specificity vs Search Volume**
- Too generic: `wordpress`, `plugin`, `content` (millions of results)
- Too specific: `chat-log-slack-parser` (nobody searches this)
- Just right: `chat-log` (specific but searchable)

**4. Use WordPress Core Terminology**
- ✅ `post-formats` (WordPress core feature)
- ✅ `block-editor` (official Gutenberg name)
- ✅ `block-theme` (official WordPress terminology)
- ❌ `gutenberg-templates` (unofficial combination)
- ❌ `post-styles` (not WordPress terminology)

**5. Think About User Search Behavior**
- Users search for problems, not solutions
- "How to add chat logs to WordPress" → `chat-log` tag
- "Post formats for block themes" → `post-formats`, `block-theme` tags
- "Block editor patterns" → `patterns`, `block-editor` tags

**Tag Formatting Checklist:**
- ✅ All lowercase
- ✅ Hyphens for multi-word tags (not underscores or spaces)
- ✅ No special characters (!@#$%^&*)
- ✅ No version numbers or dates
- ✅ Maximum 5 tags
- ✅ Each tag is relevant and purposeful

**Examples of Good Tags vs Bad Tags:**

**Good Tags:**
```
# E-commerce plugin
Tags: woocommerce, payment-gateway, stripe, checkout, subscriptions

# SEO plugin
Tags: seo, schema-markup, meta-tags, xml-sitemap, open-graph

# Security plugin
Tags: security, two-factor-authentication, login-security, firewall, malware-scanner

# Form builder
Tags: forms, contact-form, form-builder, email-notifications, spam-protection
```

**Bad Tags (Don't Do This):**
```
# Too generic
Tags: wordpress, plugin, tools, utility, helper

# Inconsistent formatting
Tags: Post-Formats, block_theme, PATTERNS, BlockEditor, chatLog

# Too similar (wasting slots)
Tags: forms, form-builder, contact-forms, form-creation, form-plugin

# Not WordPress terminology
Tags: cms, web-design, front-end, backend, admin-panel

# Too specific/obscure
Tags: slack-export-parser-v2, internal-tool, custom-solution, beta, experimental
```

**Pro Tips:**

1. **Tag Limit is Firm**
   - You CANNOT use more than 5 tags
   - WordPress.org will reject or truncate
   - Choose your 5 most important tags

2. **Tags Can Be Updated**
   - Update tags in readme.txt
   - Commit to SVN trunk
   - Changes take effect within hours
   - Monitor plugin stats to see if new tags improve discoverability

3. **Check Tag Performance**
   - WordPress.org shows download stats
   - If downloads are low, consider tag changes
   - Test different tag combinations
   - A/B test tags over time (change, monitor, adjust)

4. **Use Plugin Description for Additional Keywords**
   - Tags are limited to 5
   - Plugin description has no keyword limit
   - Include related terms in description for SEO
   - Example: Mention "Slack, Discord, Teams" in description even if not in tags

### 8.3 Common Rejection Reasons

**Security Issues:**
- Missing nonce verification
- Improper data sanitization
- Missing output escaping
- Direct file access allowed
- Unsafe SQL queries

**Guideline Violations:**
- Trademark violations in plugin name
- "WordPress" used incorrectly (must be "WordPress", not "Wordpress" or "wordpress")
- Competing with core functionality inappropriately
- Phone home or tracking without disclosure
- Obfuscated code
- External dependencies without disclosure

**Code Quality Issues:**
- Using deprecated WordPress functions
- Not following WordPress coding standards
- Including unnecessary files (node_modules, .git)
- Minified code without source maps
- Conflicting with other plugins (function name collisions)

**Documentation Issues:**
- readme.txt formatting errors
- Missing required sections
- Unclear plugin description
- Broken links

### 8.4 Responding to Review

**When Plugin is Approved:**
1. You'll receive email notification
2. Plugin slug is reserved for you
3. SVN repository is created
4. You can now upload plugin files

**When Plugin is Rejected:**
1. Review rejection email carefully
2. Address ALL issues mentioned
3. Reply to email with explanation of fixes
4. Be professional and courteous
5. Provide detailed responses

**Example Response:**
```
Thank you for the review feedback. I've addressed all the issues:

1. Nonce verification: Added wp_verify_nonce() checks to all forms
   (lines 234, 567, 890 in includes/class-admin.php)

2. Output escaping: Added esc_html() to all user-generated content
   (lines 123-145 in templates/display.php)

3. Capability checks: Added current_user_can() checks before admin actions
   (lines 456-478 in includes/class-admin.php)

I've tested all changes in a fresh WordPress installation and confirmed
the security measures work as expected. The updated plugin ZIP is attached.

Thank you for helping improve the security of the plugin.
```

### 8.5 SVN Workflow

**After Approval, Set Up SVN:**
```bash
# Checkout SVN repository
svn co https://plugins.svn.wordpress.org/plugin-slug plugin-slug-svn
cd plugin-slug-svn

# SVN structure:
# /trunk        - Development version
# /tags/1.0.0   - Release versions
# /assets       - WordPress.org assets (icons, banners, screenshots)
```

**Initial Commit to Trunk:**
```bash
# Copy plugin files to trunk
cp -r /path/to/plugin/* trunk/

# Add files to SVN
cd trunk
svn add --force *
svn status

# Commit to trunk
svn ci -m "Initial commit of Plugin Name 1.0.0"
```

**Tag Release Version:**
```bash
# Create tag from trunk
svn cp trunk tags/1.0.0

# Commit tag
svn ci -m "Tagging version 1.0.0"
```

**Upload Assets to SVN:**
```bash
# Copy assets to assets directory
cp /path/to/.wordpress-org/icon-256x256.png assets/
cp /path/to/.wordpress-org/banner-772x250.png assets/
cp /path/to/.wordpress-org/banner-1544x500.png assets/
cp /path/to/.wordpress-org/screenshot-1.png assets/
cp /path/to/.wordpress-org/screenshot-2.png assets/
# ... copy all screenshots

# Add to SVN
cd assets
svn add *.png
svn status

# Commit assets
svn ci -m "Add plugin assets (icon, banners, screenshots)"
```

**Important SVN Notes:**
- Assets directory is separate from plugin code
- Assets don't increase plugin download size
- Screenshots numbered in order (screenshot-1.png, screenshot-2.png, etc.)
- Icon can be 128×128 (icon-128x128.png) or 256×256 (icon-256x256.png)
- Banner 2x is for retina displays (optional but recommended)

### 8.6 Release Process

**For Future Updates:**
```bash
# Update trunk with new code
cd trunk
# ... make changes
svn status
svn add new-file.php (if new files)
svn ci -m "Update feature X for version 1.1.0"

# Tag new version
svn cp trunk tags/1.1.0
svn ci -m "Tagging version 1.1.0"

# Users receive update notification automatically
```

**Version Update Checklist:**
- ✅ Update version in main plugin file
- ✅ Update `Stable tag` in readme.txt
- ✅ Update CHANGELOG.md
- ✅ Update readme.txt changelog section
- ✅ Test new version thoroughly
- ✅ Create Git tag: `git tag 1.1.0 && git push --tags`
- ✅ Commit to SVN trunk
- ✅ Tag release in SVN
- ✅ Verify plugin page updates on WordPress.org

### 8.7 README.md vs readme.txt: Crafting Great Documentation

**CRITICAL UNDERSTANDING:** Your plugin needs TWO different README files, each serving a distinct purpose.

---

#### README.md (GitHub/Developer Documentation)

**Purpose:** Attract developers, contributors, and technical users on GitHub.

**Audience:**
- Developers who might contribute to your plugin
- Technical users who want to understand implementation
- Potential employers/clients viewing your portfolio
- Open source community

**Location:** `/README.md` (root of Git repository)

**Format:** GitHub-flavored Markdown with full HTML support

**Tone:** Technical, developer-focused, in-depth

**Key Sections for README.md:**

```markdown
# Plugin Name

Brief tagline describing what the plugin does.

[![WordPress Plugin Version](badge-url)](link)
[![License](badge-url)](link)
[![Build Status](badge-url)](link)

## Description

Comprehensive technical description including:
- What problem it solves
- How it works (high-level architecture)
- Key technical features
- Integration points

## Features

- Detailed feature list with technical implementation notes
- Use emojis if desired (✨, 🚀, 🔧)
- Include screenshots/GIFs demonstrating features

## Installation

### For Users
1. Install via WordPress admin
2. Activate plugin
3. Configure settings

### For Developers
```bash
# Clone repository
git clone https://github.com/username/plugin-name.git

# Install dependencies
npm install
composer install

# Build assets
npm run build

# Run tests
composer test
npm run test:e2e
```

## Development Workflow

Detailed information for contributors:
- How to set up development environment
- Build process and tools
- Testing requirements
- Code style guidelines
- How to submit pull requests

## Architecture

Optional but impressive:
- System architecture diagram
- File structure explanation
- How different components interact
- Design decisions and rationale

## API / Hooks

Documentation for developers who want to extend your plugin:
- Available filters and actions
- Function references
- Code examples
- Integration examples

## Testing

- How to run unit tests
- How to run E2E tests
- Testing checklist
- Continuous integration setup

## Contributing

- Contribution guidelines
- Code of conduct
- Issue reporting process
- Pull request template

## Changelog

Link to CHANGELOG.md or include recent changes

## Credits

- Attribution for third-party code
- Contributors
- Inspiration sources

## License

GPL v2 or later - link to LICENSE file

## Support

- Link to WordPress.org support forum
- GitHub issues for bugs/features
- Documentation links
```

**README.md Example from This Project:**

```markdown
# Post Formats for Block Themes

Brings the power of WordPress Post Formats to modern block themes with a beautiful, accessible interface.

## Features

- 🎨 **10 Classic Post Formats** - Aside, Audio, Chat, Gallery, Image, Link, Quote, Status, Video, Standard
- 🤖 **Intelligent Auto-Detection** - Automatically suggests the best format based on your content
- 🎯 **Block Patterns** - Format-specific patterns for quick content creation
- 💬 **Chat Log Block** - Parse and display chat transcripts from Slack, Discord, Teams, WhatsApp, and more
- ♿ **Accessibility First** - WCAG 2.1 AA compliant, keyboard navigation, screen reader friendly
- 🏗️ **Site Editor Support** - Format-specific templates for full site editing
- 🔧 **Repair Tool** - Fix legacy post format assignments from classic themes

## Development

### Prerequisites
- Node.js 20+ and npm
- PHP 7.4+ and Composer
- WordPress 6.8+
- Local WordPress development environment

### Setup
```bash
# Clone repository
git clone https://github.com/courtneyr-dev/post-formats-for-block-themes.git

# Install dependencies
npm install
composer install

# Build assets
npm run build

# Run tests
composer test
npm run test:e2e
```

### Testing with Query Monitor
Always test with Query Monitor active during development to catch issues before WordPress.org submission.

```bash
wp plugin install query-monitor --activate
```

### Architecture
- `/blocks/` - Custom blocks (Chat Log)
- `/includes/` - PHP classes and utilities
- `/patterns/` - Format-specific block patterns
- `/templates/` - Site Editor template parts
- `/src/` - JavaScript source files
- `/build/` - Compiled JavaScript assets

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

See [PLUGIN-DEVELOPMENT-WORKFLOW.md](PLUGIN-DEVELOPMENT-WORKFLOW.md) for detailed development documentation.

## License

GPL v2 or later

## Support

- [WordPress.org Support Forum](https://wordpress.org/support/plugin/post-formats-for-block-themes/)
- [GitHub Issues](https://github.com/courtneyr-dev/post-formats-for-block-themes/issues)
```

**README.md Best Practices:**

✅ **Do:**
- Use badges (version, license, build status)
- Include screenshots and GIFs
- Provide detailed setup instructions
- Document architecture and design decisions
- Include contribution guidelines
- Link to related documentation
- Use code examples liberally
- Write for developers

❌ **Don't:**
- Write marketing copy (save that for readme.txt)
- Skip technical details
- Forget to update after major changes
- Ignore formatting and readability
- Leave out development instructions

---

#### readme.txt (WordPress.org Listing)

**Purpose:** Convince WordPress users to install your plugin.

**Audience:**
- Non-technical WordPress users
- Site administrators
- WordPress.org plugin directory visitors
- Users searching for solutions to their problems

**Location:** `/readme.txt` (root of plugin ZIP and SVN)

**Format:** WordPress-specific text format (similar to Markdown but with quirks)

**Tone:** User-friendly, benefit-focused, clear

**Required Structure for readme.txt:**

```
=== Plugin Name ===
Contributors: wordpressorg-username
Donate link: https://example.com/donate
Tags: tag1, tag2, tag3, tag4, tag5
Requires at least: 6.8
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Short description here (under 150 characters, no markup).

== Description ==

User-friendly explanation of what your plugin does and why users need it.

Focus on benefits, not technical implementation:
- What problems does it solve?
- What can users accomplish?
- Why is it better than alternatives?

Use bullet points for features.
Keep paragraphs short.
Write in plain language.

**Key Features:**

* Feature 1 with user benefit
* Feature 2 with user benefit
* Feature 3 with user benefit

**Who Is This For?**

* Bloggers who want to add visual variety
* Content creators using modern block themes
* Teams who need to share chat logs
* Anyone wanting to restore classic post formats

== Installation ==

Simple, step-by-step instructions:

1. Install the plugin via WordPress plugin directory or upload ZIP
2. Activate the plugin through the 'Plugins' menu
3. Create or edit a post
4. Click the format icon in the editor toolbar
5. Choose your desired post format

== Frequently Asked Questions ==

= Question 1? =

Clear, concise answer focusing on user needs.

= Question 2? =

Another helpful answer with examples if needed.

= Does this work with my theme? =

Yes! This plugin works with any block theme (WordPress 5.9+). It requires a block theme for format-specific templates.

= How do I report a bug? =

Please use the [support forum](https://wordpress.org/support/plugin/plugin-slug/) or [GitHub issues](https://github.com/username/plugin-name/issues).

== Screenshots ==

1. Caption for screenshot-1.png - Be descriptive and benefit-focused
2. Caption for screenshot-2.png - Explain what users are seeing
3. Caption for screenshot-3.png - Highlight key features

== Changelog ==

= 1.0.0 =
* Initial release
* Feature 1
* Feature 2

== Upgrade Notice ==

= 1.0.0 =
Initial release of Post Formats for Block Themes. Bring classic post formats to modern block themes!
```

**readme.txt Example from This Project:**

```
=== Post Formats for Block Themes ===
Contributors: courane01
Donate link: https://example.com/donate
Tags: post-formats, block-theme, patterns, block-editor, chat-log
Requires at least: 6.8
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Brings the classic WordPress post formats to modern block themes with an intuitive interface and format-specific patterns.

== Description ==

Add visual variety and semantic meaning to your posts with **Post Formats for Block Themes**. This plugin restores the beloved Post Formats feature for modern block themes with a beautiful, accessible interface.

**Choose from 10 Classic Post Formats:**

* 📝 **Aside** - Quick notes and thoughts
* 🎵 **Audio** - Music and podcasts
* 💬 **Chat** - Conversations and interviews
* 🖼️ **Gallery** - Photo collections
* 📷 **Image** - Single photos
* 🔗 **Link** - Shared links with commentary
* 💭 **Quote** - Quotations with attribution
* 📱 **Status** - Twitter-style microblog posts
* 🎬 **Video** - Video content
* 📄 **Standard** - Traditional blog posts

**Intelligent Features:**

* **Auto-Detection** - Plugin suggests the best format based on your content
* **Block Patterns** - 10 format-specific patterns for quick content creation
* **Chat Log Block** - Automatically parse chat transcripts from Slack, Discord, Teams, WhatsApp, Telegram, and Signal
* **Site Editor Support** - Create format-specific templates with full site editing
* **Repair Tool** - Fix legacy post format assignments when migrating from classic themes
* **Accessibility First** - WCAG 2.1 AA compliant, keyboard navigation, screen reader friendly

**Perfect For:**

* Bloggers who want to add visual variety to their content
* Content creators using modern block themes (Twenty Twenty-Four, etc.)
* Teams who need to share meeting notes and chat logs
* Anyone migrating from classic themes who wants to keep post formats

== Installation ==

1. Install via the WordPress plugin directory or upload the ZIP file
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Create or edit a post in the block editor
4. Click the format button (chat bubble icon) in the editor toolbar
5. Select your desired post format
6. Optionally insert a format-specific block pattern

== Frequently Asked Questions ==

= Does this work with classic themes? =

This plugin is designed specifically for block themes (WordPress 5.9+). For classic theme support, use the built-in Post Formats feature.

= Can I create custom templates for each format? =

Yes! Use the Site Editor to create format-specific templates (single-format-aside, single-format-quote, etc.).

= How does the Chat Log block work? =

Paste a chat transcript from Slack, Discord, Teams, WhatsApp, or other platforms. The block automatically detects the format and renders it beautifully.

= Is this plugin accessible? =

Yes! We follow WCAG 2.1 AA guidelines with full keyboard navigation, proper ARIA labels, and screen reader support.

== Screenshots ==

1. Format selection modal with 10 classic post formats and visual cards
2. Chat Log block in editor showing platform auto-detection for Slack transcript
3. Beautifully formatted chat conversation on published post (frontend)
4. Quote format with elegant styling and attribution
5. Status format with Twitter-style microblog layout
6. Repair tool for fixing legacy post format assignments

== Changelog ==

= 1.0.0 =
* Initial release
* 10 classic post formats with visual format selector
* Intelligent auto-detection based on content
* Format-specific block patterns
* Chat Log block with multi-platform support (Slack, Discord, Teams, WhatsApp, Telegram, Signal, SRT, VTT)
* Site Editor integration with format-specific templates
* Format repair tool for migrating from classic themes
* Full accessibility compliance (WCAG 2.1 AA)

== Upgrade Notice ==

= 1.0.0 =
Initial release! Bring the power of classic post formats to your modern block theme.
```

**readme.txt Best Practices:**

✅ **Do:**
- Write for non-technical users
- Focus on benefits, not features
- Use clear, simple language
- Include emojis for visual appeal (in Description section)
- Provide detailed FAQ section
- Write descriptive screenshot captions
- Keep Changelog updated
- Test "Tested up to" with current WordPress version

❌ **Don't:**
- Use technical jargon
- Exceed 150 characters in short description
- Use more than 5 tags
- Use capital letters or spaces in tags
- Forget to update "Stable tag" when releasing
- Include external tracking or analytics links
- Write "WordPress" as "Wordpress" or "wordpress"

---

#### Key Differences: README.md vs readme.txt

| Aspect | README.md (GitHub) | readme.txt (WordPress.org) |
|--------|-------------------|---------------------------|
| **Audience** | Developers, contributors | End users, administrators |
| **Tone** | Technical, detailed | User-friendly, benefit-focused |
| **Length** | Long, comprehensive | Concise, focused |
| **Code Examples** | Many, detailed | Few or none |
| **Architecture** | Yes, explain design | No, not relevant |
| **Development** | Yes, setup instructions | No, only user installation |
| **Features** | How they work technically | What users can accomplish |
| **Screenshots** | Optional, GIFs encouraged | Required, PNG numbered |
| **Badges** | Yes (version, CI, license) | No, not supported |
| **Formatting** | Full Markdown + HTML | WordPress-specific format |
| **Emojis** | Optional, tasteful use | Optional, but effective |
| **Links** | Many (docs, API, etc.) | Few (support, donate) |

---

#### Content Strategy for Both README Files

**1. Write readme.txt First**
- Start with user-facing documentation
- Focus on the "why" and "what"
- This helps clarify your value proposition

**2. Then Expand to README.md**
- Add technical details for developers
- Include architecture and design decisions
- Document development workflow

**3. Keep Both Updated**
- When features change, update both files
- Changelog should be consistent
- Version numbers must match

**4. Use Different Examples**
- readme.txt: User scenarios and benefits
- README.md: Code examples and API usage

**5. Test Both Formats**
- View README.md on GitHub to verify formatting
- Validate readme.txt with WordPress.org validator
- Check for broken links in both

---

#### Tools and Validation

**Validate readme.txt:**
- [WordPress.org Readme Validator](https://wordpress.org/plugins/developers/readme-validator/)
- Paste your readme.txt content
- Fix any errors before submission

**Preview README.md:**
- View on GitHub repository
- Use GitHub's "Preview" tab when editing
- Check rendering with different screen sizes

**Check Both Files:**
```bash
# Verify files exist
ls -la README.md readme.txt

# Check line endings (should be LF, not CRLF)
file README.md readme.txt

# Word count (readme.txt should be concise)
wc -w readme.txt

# Check for common mistakes
grep -i "wordpress" readme.txt  # Should be "WordPress"
grep -E "[A-Z]" readme.txt | grep "^Tags:"  # Tags should be lowercase
```

---

#### Real-World Tips from This Project

**1. Screenshot Captions Matter**
- WordPress.org users can't enlarge screenshots
- Captions explain what users are seeing
- Use benefit-focused language
- Bad: "Modal window"
- Good: "Format selection modal with 10 classic post formats and visual cards"

**2. Keep Short Description Under 150 Characters**
- WordPress.org enforces this limit
- Focus on the main benefit
- Don't waste characters on "This plugin" prefix
- Bad (162 chars): "This plugin brings the classic WordPress post formats to modern block themes with an intuitive interface and format-specific patterns."
- Good (149 chars): "Brings the classic WordPress post formats to modern block themes with an intuitive interface and format-specific patterns."

**3. Tags Are Critical for Discoverability**
- Only 5 tags allowed
- Must be lowercase with hyphens
- Choose strategically (see section 8.2.1)
- Monitor performance and adjust

**4. Changelog Tells Your Plugin's Story**
- Users read changelog to understand evolution
- Group changes by type (Added, Fixed, Changed)
- Be specific about security fixes
- Show active development

**5. FAQ Section Prevents Support Requests**
- Answer questions before they're asked
- Address compatibility concerns
- Explain limitations clearly
- Link to documentation for detailed answers

---

## Phase 9: Maintenance & Updates

### 9.1 Version Management

**Semantic Versioning:**
- **Major (X.0.0):** Breaking changes, major new features
- **Minor (1.X.0):** New features, backwards compatible
- **Patch (1.0.X):** Bug fixes, security fixes

**When to Release Updates:**
- Security vulnerabilities (ASAP)
- Critical bugs affecting functionality (within days)
- Minor bugs (bundle into next minor release)
- New features (plan for minor release)
- WordPress core updates (test compatibility, update "Tested up to")

### 9.2 Bug Fix Workflow

**Bug Report Received:**
1. Reproduce bug in local environment
2. Identify root cause
3. Write failing test (if applicable)
4. Fix bug
5. Verify test passes
6. Test manually
7. Update CHANGELOG.md
8. Create patch release

**Example Bug Fix Commit:**
```bash
git checkout -b fix/chat-log-parsing
# ... make fix
git add blocks/chatlog/chatlog-block.php
git commit -m "Fix: Chat log parsing fails with single-space format

- Update regex to require 2+ spaces between name and timestamp
- Add validation for correct format
- Update documentation with format requirements

Fixes #42"

git push origin fix/chat-log-parsing
# ... create pull request, merge, release
```

### 9.3 Feature Addition Workflow

**Planning:**
1. Gather user feedback
2. Create feature specification
3. Check compatibility with existing features
4. Plan implementation

**Development:**
1. Create feature branch
2. Implement feature with tests
3. Update documentation
4. Test thoroughly
5. Create pull request
6. Code review
7. Merge and release

**Example Feature Branch:**
```bash
git checkout -b feature/custom-format-icons
# ... implement feature
git commit -m "Add: Custom format icon support

- New filter 'pfbt_format_icon' for custom icons
- Support for Dashicons, custom SVG, image URLs
- Documentation and examples added
- Tests for icon rendering

Closes #67"
```

### 9.4 WordPress Core Compatibility

**When New WordPress Version Releases:**
1. Install WordPress beta/RC
2. Test plugin thoroughly
3. Run all automated tests
4. Check for deprecated function usage
5. Update code if needed
6. Update "Tested up to" in readme.txt
7. Release compatibility update

**Check Deprecated Functions:**
```bash
# Search for deprecated functions
grep -r "wp_make_link_relative" .
grep -r "get_settings" .
```

**Subscribe to WordPress Development:**
- [WordPress Core Blog](https://make.wordpress.org/core/)
- [WordPress Beta Tester Plugin](https://wordpress.org/plugins/wordpress-beta-tester/)

### 9.5 Support Management

**Support Channels:**
- WordPress.org support forum (primary for free plugins)
- GitHub issues (for developers)
- Email support (if offering premium support)

**Forum Response Best Practices:**
1. Respond within 24-48 hours
2. Be professional and courteous
3. Ask for specific details (WordPress version, theme, error messages)
4. Provide clear instructions
5. Follow up to confirm resolution
6. Mark topic as resolved

**Example Support Response:**
```
Hi @username,

Thank you for your report. To help diagnose this issue, could you provide:

1. WordPress version (found in Dashboard > Updates)
2. Active theme name
3. List of active plugins
4. Any error messages in browser console (F12 > Console tab)
5. PHP error log if available

In the meantime, please try:
1. Deactivating other plugins temporarily
2. Switching to a default theme (Twenty Twenty-Four)
3. Checking if the issue persists

This will help identify if there's a plugin or theme conflict.

Looking forward to your response!
```

### 9.6 Security Updates

**Security Vulnerability Process:**
1. **Receive Report:** Via security@wordpress.org or GitHub Security
2. **Verify:** Reproduce vulnerability
3. **Assess Severity:** Critical, High, Medium, Low
4. **Fix ASAP:** Prioritize security fixes
5. **Test Thoroughly:** Ensure fix doesn't break functionality
6. **Release:** Patch version immediately
7. **Disclose Responsibly:** After fix is available

**Security Release Notes:**
```
= 1.0.1 =
* Security: Fixed XSS vulnerability in chat log rendering
* Security: Added nonce verification to format selection AJAX
* All users should update immediately
```

**Notify Users:**
- SVN commit triggers automatic update notification
- Post in support forum about security update
- Update readme.txt changelog
- Consider email notification to known users (if you have list)

### 9.7 Analytics and Feedback

**Track Plugin Success:**
- WordPress.org stats (downloads, active installations)
- Support forum activity
- GitHub stars, forks, issues
- User feedback and feature requests

**Gather Feedback:**
- Support forum questions reveal pain points
- Feature requests show what users need
- Positive reviews indicate successful features
- Negative reviews identify areas for improvement

**Make Data-Driven Decisions:**
- Prioritize features requested by multiple users
- Fix bugs affecting many installations
- Improve documentation for common questions
- Consider premium version for advanced features

---

## Lessons Learned

### Critical Lessons from Post Formats for Block Themes Development

### 1. Parser Requirements Must Match Documentation

**Problem:** QA test plan demos used format `@sarah [9:30 AM]: message` but parser required `sarah  9:30 AM` with 2 spaces and message on separate line.

**Result:** All demo tests failed with "Could not parse transcript" errors.

**Lesson:**
- Test documentation examples with actual parser code BEFORE finalizing
- If parser uses regex `\s{2,}` (2+ spaces), demos MUST use 2+ spaces
- Create reference document with correct format patterns
- Include "Common Issues" section explaining requirements

**Solution:**
- Read parser source code to understand exact patterns
- Update all demos to match parser requirements exactly
- Create CHAT-LOG-FORMAT-EXAMPLES.md with correct patterns
- Add testing checklist for format validation

### 2. Honest Auto-Detection

**Problem:** Auto-detection defaulted to "Teams" for any AM/PM timestamp without em dash, even when it was clearly Slack.

**Why Wrong:** Slack, Discord, Teams, Telegram, and Signal all use identical export format: `Name  HH:MM AM\nMessage`

**Result:** False "Teams (75% confidence)" detection for Slack transcripts.

**Lesson:**
- Be honest when you can't differentiate between platforms
- Don't make assumptions based on weak signals
- Lower confidence scores when pattern matching is ambiguous
- Provide manual override option

**Solution:**
- Changed detection to show "Slack/Teams/Telegram/Signal" at 60% confidence
- Added specific detection for platforms with unique patterns (WhatsApp brackets, VTT header, SRT numbering)
- Kept manual platform selection option
- Documented which platforms are distinguishable and which aren't

### 3. Text Parsing vs File Importing

**Problem:** readme.txt claimed support for "DOCX and HTML files" but block only parses TEXT strings, not binary files.

**Result:** Demo 11 (DOCX Import Test) failed with parsing error.

**Lesson:**
- Clearly distinguish between "formats you can convert FROM" and "formats you can import"
- If feature is "paste text from X", say that explicitly
- Don't claim file upload support unless feature actually imports files
- User expectations must match actual capabilities

**Solution:**
- Updated readme.txt: "text format support: plain text exports"
- Removed DOCX and HTML import demos
- Added demo showing how to copy text FROM various sources and paste INTO block
- Clarified: "Copy text from Word/HTML/PDF and paste into block"

### 4. Asset Workflow Planning

**Problem:** Unclear where assets should live, whether to track in Git, and how to prepare for WordPress.org submission.

**Lesson:**
- Plan asset workflow early in project
- Separate concerns: Git (version control) vs Distribution (plugin ZIP) vs WordPress.org (SVN assets)
- Document asset specifications before creation
- Provide clear instructions for designers

**Solution:**
- Created `.wordpress-org/` directory for all assets
- Track assets in Git (for version control)
- Exclude from plugin ZIP via `.distignore`
- Upload to separate SVN `/assets` directory
- Created comprehensive documentation: README, ASSETS-CHECKLIST, DESIGN-PROMPT

### 5. Design Specifications Matter

**Problem:** Initial attempt to generate assets resulted in "ugly" output that didn't meet standards.

**Why:** Insufficient specificity about exact Dashicons to use, unclear design requirements.

**Lesson:**
- Provide EXACT specifications (Dashicon names, not descriptions)
- Include links to official resources
- Specify dimensions, file formats, size limits
- Explain how to use Dashicons in different design tools
- Acknowledge when manual creation by designer is better than AI generation

**Solution:**
- Updated DESIGN-PROMPT.md with exact Dashicon names (dashicons-format-quote, etc.)
- Added instructions for Figma, design software, AI tools
- Linked to official Dashicons page and GitHub repo
- Clarified: DO NOT create custom icons, use official Dashicons only
- User opted for manual creation with proper specifications

### 6. Testing Infrastructure is Essential

**Lesson:**
- Set up testing EARLY in development
- Create QA test plan WITH working demos
- Test demos before including in documentation
- Automated tests catch regressions
- Accessibility tests should be mandatory, not optional

**Implementation:**
- PHPUnit for unit tests
- Playwright for E2E tests
- axe-core for accessibility testing
- QA test plan with copy-pasteable demos
- All demos tested against actual parser

### 7. Hook System Consistency

**Problem:** During README.md updates, found some hook examples used old `pfpu_` prefix instead of `pfbt_`.

**Lesson:**
- Establish hook naming convention early
- Document convention in architecture guide
- Search codebase for old prefixes before release
- Update ALL examples in documentation
- Consistency matters for developer experience

**Solution:**
- Updated all hook examples to use `pfbt_` prefix
- Documented hook naming convention
- Created developer examples section with correct prefixes

### 8. Documentation for Two Audiences

**Lesson:**
- README.md (GitHub) targets developers, contributors, technical users
- readme.txt (WordPress.org) targets end users, site admins, non-technical users
- Content should be different for each audience
- Both should be maintained and kept in sync for factual accuracy

**Implementation:**
- README.md: Architecture, testing, hooks, developer examples
- readme.txt: Installation, use cases, FAQs, user-friendly language
- Both include feature lists but with different depth
- Cross-reference between them where appropriate

### 9. Gradual Feature Discovery

**Lesson:**
- Not all features are obvious during initial planning
- User testing reveals needed features (repair tool, auto-detection)
- Third-party plugin integration opportunities emerge during development
- Plan for extensibility even if you don't know specific use cases yet

**Examples from Project:**
- Added integration with Bookmark Card plugin
- Added integration with Podlove Podcast Publisher
- Added integration with Able Player
- Created repair tool for legacy format migration
- Added format-specific templates for Site Editor

### 10. WordPress.org Submission Preparation

**Lesson:**
- Start preparing assets early (don't wait until last minute)
- Understand SVN workflow before submission
- readme.txt format is strict (test with WordPress.org readme validator)
- Screenshots should tell a story (show progression of features)
- Assets are separate from code (SVN `/assets` vs `/trunk`)

**Critical Checklist:**
- ✅ Contributors match WordPress.org usernames
- ✅ "Tested up to" is current WordPress version
- ✅ "Stable tag" matches plugin version
- ✅ Maximum 5 tags, lowercase, hyphens only
- ✅ All assets under 1MB
- ✅ Screenshots at 1390×864px
- ✅ Security review complete (nonces, escaping, sanitization)
- ✅ No trademark violations in plugin name
- ✅ All code follows WordPress Coding Standards

---

## Conclusion

This workflow documents the complete plugin development process from initial concept through WordPress.org submission and ongoing maintenance. Key takeaways:

1. **Plan thoroughly** - Architecture decisions made early affect entire project
2. **Test continuously** - Automated tests catch issues before users do
3. **Document honestly** - Don't claim capabilities you don't have
4. **Be consistent** - Naming, coding standards, documentation style
5. **Think extensibility** - Hooks and filters enable community contributions
6. **Prioritize security** - Sanitize input, escape output, verify nonces
7. **Design accessibility** - Keyboard navigation, screen readers, color contrast
8. **Support users well** - Responsive, professional, helpful
9. **Maintain actively** - Security updates, compatibility testing, bug fixes
10. **Learn continuously** - Each project teaches new lessons

This workflow is a living document. Update it as you learn new techniques, discover better practices, or encounter new challenges.

**Project:** Post Formats for Block Themes (WordPress 6.8+)
**Documentation Version:** 1.0.0
**Last Updated:** 2024-03-15

---

## Additional Resources

**WordPress Developer Resources:**
- [Plugin Handbook](https://developer.wordpress.org/plugins/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Coding Standards](https://developer.wordpress.org/coding-standards/)
- [Theme Handbook](https://developer.wordpress.org/themes/)
- [Dashicons](https://developer.wordpress.org/resource/dashicons/)

**Testing:**
- [PHPUnit](https://phpunit.de/)
- [Playwright](https://playwright.dev/)
- [axe-core](https://github.com/dequelabs/axe-core)
- [WordPress Test Suite](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/)

**Accessibility:**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WordPress Accessibility Handbook](https://make.wordpress.org/accessibility/handbook/)
- [WebAIM](https://webaim.org/)

**Build Tools:**
- [@wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts)
- [Webpack](https://webpack.js.org/)
- [Composer](https://getcomposer.org/)

**Version Control:**
- [Git Documentation](https://git-scm.com/doc)
- [SVN Documentation](https://subversion.apache.org/docs/)
- [WordPress.org SVN Guide](https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/)
