# WordPress Documentation Workflow

Complete workflow for creating documentation for WordPress plugins and themes, leveraging WordPress Playground Blueprints for automated screenshot generation.

## 📋 Table of Contents

1. [Documentation Sequence](#documentation-sequence)
2. [Phase 1: Planning](#phase-1-planning)
3. [Phase 2: Blueprint Creation](#phase-2-blueprint-creation)
4. [Phase 3: Screenshot Generation](#phase-3-screenshot-generation)
5. [Phase 4: Writing Documentation](#phase-4-writing-documentation)
6. [Phase 5: Review & Publish](#phase-5-review--publish)
7. [Maintenance & Updates](#maintenance--updates)
8. [Templates & Automation](#templates--automation)

---

## Documentation Sequence

**The Complete Flow:**

```
1. Plan Documentation
   ├─ Identify features to document
   ├─ List required screenshots
   └─ Create documentation outline

2. Create Playground Blueprint
   ├─ Install WordPress
   ├─ Install your plugin/theme
   ├─ Add sample content
   ├─ Configure settings
   └─ Set up demo state

3. Generate Screenshots
   ├─ Write Playwright tests
   ├─ Capture automated screenshots
   ├─ Optimize images
   └─ Organize files

4. Write Documentation
   ├─ README.md (GitHub)
   ├─ readme.txt (WordPress.org)
   ├─ User guide
   ├─ Developer docs
   └─ Community files

5. Review & Publish
   ├─ Technical review
   ├─ Screenshot verification
   ├─ Link checking
   └─ Publish to platforms

6. Maintain
   ├─ Update for new features
   ├─ Refresh screenshots
   └─ Update changelogs
```

---

## Phase 1: Planning

### Step 1.1: Documentation Audit

**Checklist - What Needs Documentation?**

**Core Files (Required):**
- [ ] README.md (GitHub repository)
- [ ] readme.txt (WordPress.org)
- [ ] CHANGELOG.md (version history)
- [ ] LICENSE (or LICENSE.txt)

**Community Files (Recommended):**
- [ ] CONTRIBUTING.md (how to contribute)
- [ ] CODE_OF_CONDUCT.md (community guidelines)
- [ ] SECURITY.md (security policy)
- [ ] SUPPORT.md (getting help)

**User Documentation:**
- [ ] Installation guide
- [ ] Quick start guide
- [ ] Feature documentation
- [ ] Configuration guide
- [ ] Troubleshooting guide
- [ ] FAQ

**Developer Documentation (if applicable):**
- [ ] API reference
- [ ] Hooks documentation
- [ ] Template functions
- [ ] Code examples
- [ ] Integration guides

**GitHub Templates:**
- [ ] Issue templates (bug, feature, question)
- [ ] Pull request template
- [ ] Discussion categories

### Step 1.2: Feature Inventory

Create a list of all features that need documentation:

```markdown
# Feature Documentation Plan

## Admin Features
1. Settings Page
   - Screenshots needed: 3
   - Sections to document: API, Display, Advanced
   - Configuration options: 15

2. Dashboard Widget
   - Screenshots needed: 2
   - Interactive elements: Yes
   - User roles: Administrator, Editor

3. Bulk Actions
   - Screenshots needed: 2
   - Steps to document: 4
   - Edge cases: 3

## Frontend Features
1. Shortcodes
   - Screenshots needed: 4
   - Variations: 6
   - Parameters: 12

2. Widgets
   - Screenshots needed: 2
   - Configuration: Yes
   - Customization: CSS classes

3. Blocks (Gutenberg)
   - Screenshots needed: 5
   - Block variations: 3
   - Inspector controls: Yes
```

### Step 1.3: Screenshot Planning

**For each feature, plan screenshots:**

```markdown
# Screenshot Plan

## Screenshot 1: Main Settings Page
- **File:** `screenshot-1.png`
- **Location:** `/wp-admin/options-general.php?page=my-plugin`
- **Dimensions:** 1200 x 900 px
- **Caption:** "Main settings page with API configuration and display options"
- **Setup Required:**
  - Plugin activated
  - API key configured
  - Sample data loaded
- **Highlight:** API key field, mode selector, save button

## Screenshot 2: Dashboard Widget
- **File:** `screenshot-2.png`
- **Location:** `/wp-admin/`
- **Dimensions:** 1200 x 900 px
- **Caption:** "Dashboard widget showing analytics and quick actions"
- **Setup Required:**
  - Dashboard widget enabled
  - Sample data: 30 days of analytics
  - Widget positioned in main column

## Screenshot 3: Frontend Display
- **File:** `screenshot-3.png`
- **Location:** `/sample-page/`
- **Dimensions:** 1200 x 900 px
- **Caption:** "Frontend display with default styling"
- **Setup Required:**
  - Shortcode inserted in sample page
  - Default theme (Twenty Twenty-Four)
  - Sample content loaded

[Continue for all screenshots...]
```

---

## Phase 2: Blueprint Creation

### Step 2.1: Create Base Blueprint

**Goal:** Create a WordPress Playground Blueprint that sets up your plugin/theme in a ready-to-document state.

**See:** [BLUEPRINT-CREATION-GUIDE.md](BLUEPRINT-CREATION-GUIDE.md) for detailed instructions.

**Create: `blueprint.json`**

```json
{
  "$schema": "https://playground.wordpress.net/blueprint-schema.json",
  "preferredVersions": {
    "php": "8.2",
    "wp": "latest"
  },
  "phpExtensionBundles": [
    "kitchen-sink"
  ],
  "features": {
    "networking": true
  },
  "steps": [
    {
      "step": "login",
      "username": "admin",
      "password": "password"
    },
    {
      "step": "installPlugin",
      "pluginZipFile": {
        "resource": "wordpress.org/plugins",
        "slug": "wordpress-importer"
      }
    },
    {
      "step": "importWxr",
      "file": {
        "resource": "url",
        "url": "https://raw.githubusercontent.com/WPTT/theme-unit-test/master/themeunittestdata.wordpress.xml"
      }
    },
    {
      "step": "installPlugin",
      "pluginZipFile": {
        "resource": "url",
        "url": "https://github.com/YOUR-USERNAME/YOUR-PLUGIN/archive/refs/heads/main.zip"
      }
    },
    {
      "step": "runPHP",
      "code": "<?php require_once 'wordpress/wp-load.php'; update_option('my_plugin_api_key', 'demo-key-12345'); update_option('my_plugin_mode', 'production'); ?>"
    },
    {
      "step": "runPHP",
      "code": "<?php require_once 'wordpress/wp-load.php'; $post_id = wp_insert_post(['post_title' => 'Demo Page', 'post_content' => '[my_shortcode param=\"value\"]', 'post_status' => 'publish', 'post_type' => 'page']); ?>"
    }
  ]
}
```

**Key Components:**

1. **Install WordPress** - Latest or specific version
2. **Import Sample Content** - Theme unit test data
3. **Install Your Plugin/Theme** - From URL or local file
4. **Configure Settings** - Set up plugin options
5. **Add Demo Content** - Posts, pages with shortcodes
6. **Set User Preferences** - Admin color scheme, etc.

### Step 2.2: Test Blueprint Locally

```bash
# Test your blueprint
npx @wp-playground/cli server \
  --blueprint=blueprint.json \
  --mount=./:/wordpress/wp-content/plugins/my-plugin

# Opens at http://127.0.0.1:9400
# Login: admin / password
```

**Verify:**
- [ ] WordPress loads correctly
- [ ] Plugin/theme is installed and activated
- [ ] Sample content is imported
- [ ] Settings are configured
- [ ] Demo state matches requirements
- [ ] All features are accessible

### Step 2.3: Version Blueprint for Different Scenarios

Create multiple blueprints for different documentation needs:

**Directory Structure:**
```
.wordpress-org/
├── blueprints/
│   ├── base.json                  # Basic setup
│   ├── documentation.json         # For screenshot generation
│   ├── development.json           # For contributors
│   ├── testing.json               # For QA testing
│   └── demo.json                  # Public demo
```

**Example: `documentation.json`**
```json
{
  "$schema": "https://playground.wordpress.net/blueprint-schema.json",
  "meta": {
    "title": "My Plugin - Documentation Environment",
    "description": "Pre-configured environment for generating documentation screenshots",
    "author": "Your Name"
  },
  "preferredVersions": {
    "php": "8.2",
    "wp": "6.7"
  },
  "steps": [
    {
      "step": "login"
    },
    {
      "step": "installTheme",
      "themeZipFile": {
        "resource": "wordpress.org/themes",
        "slug": "twentytwentyfour"
      }
    },
    {
      "step": "activateTheme",
      "themeFolderName": "twentytwentyfour"
    },
    {
      "step": "installPlugin",
      "pluginZipFile": {
        "resource": "wordpress.org/plugins",
        "slug": "wordpress-importer"
      }
    },
    {
      "step": "importWxr",
      "file": {
        "resource": "url",
        "url": "https://raw.githubusercontent.com/WPTT/theme-unit-test/master/themeunittestdata.wordpress.xml"
      }
    },
    {
      "step": "mkdir",
      "path": "/wordpress/wp-content/uploads/demo-assets"
    },
    {
      "step": "writeFile",
      "path": "/wordpress/wp-content/uploads/demo-assets/sample.txt",
      "data": "Sample file for documentation"
    },
    {
      "step": "installPlugin",
      "pluginZipFile": {
        "resource": "url",
        "url": "https://github.com/YOUR-USERNAME/YOUR-PLUGIN/releases/latest/download/your-plugin.zip"
      }
    },
    {
      "step": "runPHP",
      "code": "<?php require_once 'wordpress/wp-load.php'; update_option('my_plugin_api_key', 'demo-api-key-for-screenshots'); update_option('my_plugin_mode', 'production'); update_option('my_plugin_display_type', 'cards'); update_option('my_plugin_items_per_page', 12); activate_plugin('my-plugin/my-plugin.php'); ?>"
    },
    {
      "step": "runPHP",
      "code": "<?php require_once 'wordpress/wp-load.php'; wp_insert_post(['post_title' => 'Shortcode Demo', 'post_content' => '[my_shortcode type=\"grid\" columns=\"3\" show_images=\"true\"]', 'post_status' => 'publish']); ?>"
    },
    {
      "step": "runPHP",
      "code": "<?php require_once 'wordpress/wp-load.php'; wp_insert_post(['post_title' => 'Feature Showcase', 'post_content' => 'This page demonstrates all plugin features...', 'post_status' => 'publish']); ?>"
    }
  ],
  "landingPage": "/wp-admin/"
}
```

---

## Phase 3: Screenshot Generation

### Step 3.1: Create Playwright Configuration

**See:** [BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md](BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md) for complete guide.

**Install Playwright:**

```bash
npm install --save-dev @playwright/test
npx playwright install chromium
```

**Create: `playwright.config.js`**

```javascript
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/screenshots',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',

  use: {
    baseURL: 'http://127.0.0.1:9400',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

### Step 3.2: Write Screenshot Tests

**Create: `tests/screenshots/generate-documentation-screenshots.spec.js`**

```javascript
import { test, expect } from '@playwright/test';
import { startPlaygroundWeb } from '@wp-playground/client';
import fs from 'fs';

const BLUEPRINT_PATH = './blueprints/documentation.json';
const SCREENSHOTS_DIR = './assets';

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

test.describe('Documentation Screenshots', () => {
  let playground;

  test.beforeAll(async () => {
    // Start WordPress Playground with blueprint
    const blueprint = JSON.parse(fs.readFileSync(BLUEPRINT_PATH, 'utf-8'));

    playground = await startPlaygroundWeb({
      blueprint,
    });

    // Wait for WordPress to be ready
    await playground.isReady();
  });

  test.afterAll(async () => {
    if (playground) {
      await playground.terminate();
    }
  });

  test('Screenshot 1: Main Settings Page', async ({ page }) => {
    // Navigate to settings page
    await page.goto('http://127.0.0.1:9400/wp-admin/options-general.php?page=my-plugin');

    // Wait for page to load
    await page.waitForSelector('.my-plugin-settings', { state: 'visible' });

    // Optional: Highlight specific elements
    await page.evaluate(() => {
      document.querySelector('#api-key-field').style.border = '2px solid #2271b1';
    });

    // Set viewport for consistent size
    await page.setViewportSize({ width: 1200, height: 900 });

    // Take screenshot
    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/screenshot-1.png`,
      fullPage: false,
    });

    console.log('✓ Generated screenshot-1.png');
  });

  test('Screenshot 2: Dashboard Widget', async ({ page }) => {
    await page.goto('http://127.0.0.1:9400/wp-admin/');

    // Wait for dashboard to load
    await page.waitForSelector('#dashboard-widgets', { state: 'visible' });

    // Wait for plugin widget specifically
    await page.waitForSelector('.my-plugin-dashboard-widget', { state: 'visible' });

    // Optional: Scroll widget into view
    await page.evaluate(() => {
      document.querySelector('.my-plugin-dashboard-widget')
        .scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    await page.setViewportSize({ width: 1200, height: 900 });

    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/screenshot-2.png`,
      fullPage: false,
    });

    console.log('✓ Generated screenshot-2.png');
  });

  test('Screenshot 3: Frontend Display', async ({ page }) => {
    // Navigate to frontend page with shortcode
    await page.goto('http://127.0.0.1:9400/shortcode-demo/');

    // Wait for shortcode output
    await page.waitForSelector('.my-plugin-output', { state: 'visible' });

    // Set mobile viewport for responsive screenshot (optional)
    await page.setViewportSize({ width: 1200, height: 900 });

    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/screenshot-3.png`,
      fullPage: false,
    });

    console.log('✓ Generated screenshot-3.png');
  });

  test('Screenshot 4: Block Editor Integration', async ({ page }) => {
    // Create new post
    await page.goto('http://127.0.0.1:9400/wp-admin/post-new.php');

    // Wait for block editor
    await page.waitForSelector('.block-editor', { state: 'visible' });

    // Click block inserter
    await page.click('.block-editor-inserter__toggle');

    // Search for custom block
    await page.fill('.block-editor-inserter__search-input', 'my block');

    // Wait for search results
    await page.waitForSelector('.editor-block-list-item-my-block', { state: 'visible' });

    await page.setViewportSize({ width: 1200, height: 900 });

    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/screenshot-4.png`,
      fullPage: false,
    });

    console.log('✓ Generated screenshot-4.png');
  });

  test('Screenshot 5: Settings Saved Success', async ({ page }) => {
    await page.goto('http://127.0.0.1:9400/wp-admin/options-general.php?page=my-plugin');

    await page.waitForSelector('.my-plugin-settings', { state: 'visible' });

    // Fill in a field
    await page.fill('#api-key-field', 'new-api-key-12345');

    // Click save
    await page.click('#submit');

    // Wait for success message
    await page.waitForSelector('.notice-success', { state: 'visible' });

    await page.setViewportSize({ width: 1200, height: 900 });

    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/screenshot-5.png`,
      fullPage: false,
    });

    console.log('✓ Generated screenshot-5.png');
  });
});
```

### Step 3.3: Add npm Scripts

**Update: `package.json`**

```json
{
  "scripts": {
    "playground:start": "npx @wp-playground/cli server --blueprint=blueprints/documentation.json",
    "screenshots": "playwright test tests/screenshots/generate-documentation-screenshots.spec.js",
    "screenshots:update": "npm run screenshots && npm run screenshots:optimize",
    "screenshots:optimize": "node scripts/optimize-images.js"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@wp-playground/client": "latest",
    "sharp": "^0.33.0",
    "imagemin": "^8.0.1",
    "imagemin-pngquant": "^9.0.2"
  }
}
```

### Step 3.4: Create Image Optimization Script

**Create: `scripts/optimize-images.js`**

```javascript
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SCREENSHOTS_DIR = './assets';
const MAX_FILE_SIZE = 200 * 1024; // 200KB

async function optimizeScreenshot(filePath) {
  const fileName = path.basename(filePath);
  console.log(`Optimizing ${fileName}...`);

  const stats = fs.statSync(filePath);
  const originalSize = stats.size;

  // Optimize with sharp
  await sharp(filePath)
    .png({
      quality: 80,
      compressionLevel: 9,
      palette: true,
    })
    .toFile(filePath + '.tmp');

  // Replace original
  fs.renameSync(filePath + '.tmp', filePath);

  const newStats = fs.statSync(filePath);
  const newSize = newStats.size;
  const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

  console.log(`  ${fileName}: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% savings)`);

  if (newSize > MAX_FILE_SIZE) {
    console.warn(`  ⚠️  ${fileName} is still over ${MAX_FILE_SIZE / 1024}KB`);
  }
}

// Find all PNG files in screenshots directory
const files = fs.readdirSync(SCREENSHOTS_DIR)
  .filter(file => file.endsWith('.png'))
  .map(file => path.join(SCREENSHOTS_DIR, file));

console.log(`Found ${files.length} screenshots to optimize\n`);

// Optimize all screenshots
for (const file of files) {
  await optimizeScreenshot(file);
}

console.log('\n✓ All screenshots optimized!');
```

### Step 3.5: Generate Screenshots

```bash
# Generate all screenshots
npm run screenshots

# Optimize images
npm run screenshots:optimize

# Or do both
npm run screenshots:update
```

**Output:**
```
Running 5 tests...
✓ Screenshot 1: Main Settings Page (2.1s)
✓ Screenshot 2: Dashboard Widget (1.8s)
✓ Screenshot 3: Frontend Display (1.5s)
✓ Screenshot 4: Block Editor Integration (2.3s)
✓ Screenshot 5: Settings Saved Success (1.9s)

5 passed (9.6s)

Optimizing images...
  screenshot-1.png: 245.3KB → 187.2KB (23.7% savings)
  screenshot-2.png: 298.1KB → 198.5KB (33.4% savings)
  screenshot-3.png: 412.8KB → 195.1KB (52.7% savings)
  screenshot-4.png: 356.2KB → 189.3KB (46.9% savings)
  screenshot-5.png: 221.4KB → 165.8KB (25.1% savings)

✓ All screenshots optimized!
```

---

## Phase 4: Writing Documentation

### Step 4.1: README.md (GitHub)

**Template Structure:**

```markdown
# Plugin Name

One-line description of what your plugin does.

![WordPress Version](https://img.shields.io/wordpress/v/plugin-slug)
![PHP Version](https://img.shields.io/badge/php-%3E%3D8.0-blue)
![License](https://img.shields.io/badge/license-GPL--2.0%2B-blue)
![WordPress Rating](https://img.shields.io/wordpress/plugin/stars/plugin-slug)
![Downloads](https://img.shields.io/wordpress/plugin/dt/plugin-slug)

## 📖 Description

Detailed description of what your plugin does, who it's for, and why they need it.

## ✨ Features

- **Feature 1** - Description
- **Feature 2** - Description
- **Feature 3** - Description
- **Feature 4** - Description

## 📋 Requirements

- WordPress 6.5 or higher
- PHP 8.0 or higher
- MySQL 5.7 or higher (or MariaDB 10.3+)

## 🚀 Installation

### Via WordPress.org
1. Go to **Plugins → Add New**
2. Search for "Your Plugin Name"
3. Click **Install Now**
4. Click **Activate**

### Manual Upload
1. Download the latest release
2. Go to **Plugins → Add New → Upload Plugin**
3. Choose the ZIP file
4. Click **Install Now** then **Activate**

### Via Composer
```bash
composer require your-vendor/your-plugin
```

## 📸 Screenshots

![Settings Page](./assets/screenshot-1.png)
*Main settings page with API configuration*

![Dashboard Widget](./assets/screenshot-2.png)
*Dashboard widget showing analytics*

[See more screenshots on WordPress.org →](https://wordpress.org/plugins/your-plugin/#screenshots)

## 📚 Documentation

- [User Guide](./docs/user-guide.md)
- [Developer Documentation](./docs/developer.md)
- [FAQ](./docs/faq.md)
- [Troubleshooting](./docs/troubleshooting.md)

## 🔧 Development

### Setup
```bash
git clone https://github.com/your-username/your-plugin.git
cd your-plugin
composer install
npm install
```

### Run Tests
```bash
composer test      # PHPUnit tests
npm run test       # Jest tests
composer lint      # PHPCS
composer analyze   # PHPStan
```

### Generate Screenshots
```bash
npm run screenshots:update
```

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for all changes.

## 📄 License

GPL-2.0-or-later. See [LICENSE](LICENSE).

## 🙏 Credits

Built by [Your Name](https://yoursite.com)
```

### Step 4.2: readme.txt (WordPress.org)

**Template:**

```text
=== Plugin Name ===
Contributors: your-wp-username
Tags: tag1, tag2, tag3, tag4, tag5
Requires at least: 6.5
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

One-line description (under 150 characters).

== Description ==

Longer description explaining what your plugin does.

Key features:
* Feature 1
* Feature 2
* Feature 3
* Feature 4

Perfect for:
* Use case 1
* Use case 2
* Use case 3

== Installation ==

= Automatic Installation =
1. Log in to your WordPress admin
2. Go to Plugins → Add New
3. Search for "Your Plugin Name"
4. Click Install Now
5. Activate the plugin

= Manual Installation =
1. Download the plugin ZIP file
2. Go to Plugins → Add New → Upload Plugin
3. Choose the ZIP file
4. Click Install Now
5. Activate the plugin

= Configuration =
1. Go to Settings → Your Plugin
2. Configure your settings
3. Save changes

== Frequently Asked Questions ==

= Question 1? =
Answer 1.

= Question 2? =
Answer 2.

= Question 3? =
Answer 3.

== Screenshots ==

1. Main settings page with API configuration and display options
2. Dashboard widget showing analytics and quick actions
3. Frontend display with default styling
4. Block editor integration showing custom block insertion
5. Settings saved success message

== Changelog ==

= 1.0.0 - 2024-12-10 =
* Initial release
* Feature 1 implementation
* Feature 2 implementation
* Feature 3 implementation

= 0.9.0 - 2024-11-15 =
* Beta release
* Core functionality complete
* Testing phase

== Upgrade Notice ==

= 1.0.0 =
Initial stable release. No upgrade needed.
```

### Step 4.3: User Documentation

**Create: `docs/user-guide.md`**

**Use screenshots extensively:**

```markdown
# User Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Configuration](#configuration)
3. [Using Features](#using-features)
4. [Troubleshooting](#troubleshooting)

## Getting Started

### Installation

[Installation steps with screenshots]

![Installation step 1](../assets/docs/install-1.png)

### Initial Setup

After activating the plugin, you'll see a setup wizard:

![Setup wizard](../assets/docs/setup-wizard.png)

Follow these steps:

1. **Enter your API key**
   ![API key field](../assets/docs/api-key.png)

2. **Choose your mode**
   ![Mode selection](../assets/docs/mode-select.png)

3. **Configure display options**
   ![Display options](../assets/docs/display-options.png)

## Configuration

### Settings Page

Navigate to **Settings → Your Plugin**:

![Settings page overview](../assets/screenshot-1.png)

#### API Configuration

Enter your API credentials:

![API configuration section](../assets/docs/api-config-detail.png)

- **API Key**: Your unique API key from [service.com](https://service.com)
- **API Secret**: Your API secret (keep this private!)
- **Mode**: Choose Development or Production

#### Display Settings

Configure how content displays:

![Display settings section](../assets/docs/display-settings-detail.png)

[Continue with detailed documentation...]
```

---

## Phase 5: Review & Publish

### Step 5.1: Documentation Review Checklist

**Content Review:**
- [ ] All features documented
- [ ] Screenshots are current and clear
- [ ] No lorem ipsum or placeholder text
- [ ] Code examples are tested and work
- [ ] Links are valid and not broken
- [ ] Spelling and grammar checked
- [ ] Consistent terminology throughout
- [ ] No sensitive information (API keys, passwords)

**Technical Review:**
- [ ] Screenshots optimized (under 200KB each)
- [ ] Images have proper alt text
- [ ] Markdown renders correctly
- [ ] Code blocks have syntax highlighting
- [ ] Internal links work
- [ ] External links open in new tabs (if HTML)

**WordPress.org Specific:**
- [ ] readme.txt validates (use [validator](https://wordpress.org/plugins/developers/readme-validator/))
- [ ] Screenshots numbered correctly (screenshot-1.png, etc.)
- [ ] Screenshots in /assets/ directory in SVN
- [ ] Captions match screenshots
- [ ] Banner and icon present (if required)
- [ ] Tags are relevant (max 5)
- [ ] "Tested up to" is current WordPress version

### Step 5.2: Screenshot Verification

```bash
# Check all screenshots exist
ls -lh assets/screenshot-*.png

# Check file sizes
du -h assets/screenshot-*.png

# Verify dimensions
for file in assets/screenshot-*.png; do
  echo "$file: $(identify -format "%wx%h" "$file")"
done

# Expected output:
# assets/screenshot-1.png: 1200x900
# assets/screenshot-2.png: 1200x900
# assets/screenshot-3.png: 1200x900
```

### Step 5.3: Publish to WordPress.org

```bash
# Checkout SVN assets directory
svn co https://plugins.svn.wordpress.org/your-plugin/assets svn-assets
cd svn-assets

# Copy screenshots
cp ../assets/screenshot-*.png .
cp ../assets/banner-*.png .  # if you have banners
cp ../assets/icon-*.png .    # if you have icons

# Add to SVN
svn add *.png --force

# Commit
svn commit -m "Update screenshots and assets for version 1.0.0"

# Update readme.txt in trunk
cd ../svn-trunk
cp ../readme.txt .
svn commit -m "Update readme.txt for version 1.0.0"
```

### Step 5.4: Publish to GitHub

```bash
# Commit all documentation
git add README.md CHANGELOG.md docs/ assets/ blueprints/
git commit -m "docs: complete documentation for version 1.0.0

- Add comprehensive README.md
- Add user guide and developer docs
- Generate screenshots via Playground
- Add WordPress Playground blueprints
- Update CHANGELOG.md"

git push origin main

# Create release
gh release create v1.0.0 \
  --title "Version 1.0.0" \
  --notes "Initial stable release. See CHANGELOG.md for details." \
  ./your-plugin.zip
```

---

## Maintenance & Updates

### When to Update Documentation

**Always update for:**
- Major version releases
- New features
- UI changes
- Breaking changes
- Security updates

**Consider updating for:**
- Minor feature improvements
- Bug fixes that affect usage
- Performance improvements users notice
- New integrations

### Screenshot Update Workflow

When updating screenshots:

```bash
# 1. Update blueprint if needed
vim blueprints/documentation.json

# 2. Test blueprint
npx @wp-playground/cli server --blueprint=blueprints/documentation.json

# 3. Update screenshot tests if needed
vim tests/screenshots/generate-documentation-screenshots.spec.js

# 4. Regenerate screenshots
npm run screenshots:update

# 5. Review screenshots
open assets/screenshot-*.png

# 6. Update captions in readme.txt if needed
vim readme.txt

# 7. Commit and publish
git add assets/ readme.txt blueprints/
git commit -m "docs: update screenshots for version 2.0"
git push

# 8. Update WordPress.org
cd svn-assets
cp ../assets/screenshot-*.png .
svn commit -m "Update screenshots for version 2.0"
```

### Automated Documentation Updates

**GitHub Action to regenerate screenshots on release:**

```yaml
# .github/workflows/update-documentation.yml
name: Update Documentation

on:
  release:
    types: [published]

jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Generate screenshots
        run: npm run screenshots:update

      - name: Commit screenshots
        run: |
          git config --global user.name 'Documentation Bot'
          git config --global user.email 'bot@example.com'
          git add assets/screenshot-*.png
          git diff --staged --quiet || git commit -m "docs: update screenshots for ${GITHUB_REF_NAME}"
          git push
```

---

## Templates & Automation

### Complete Package.json Scripts

```json
{
  "scripts": {
    "playground:start": "wp-now start --blueprint=blueprints/documentation.json",
    "playground:php8.0": "wp-now start --php=8.0 --blueprint=blueprints/documentation.json",
    "playground:php8.2": "wp-now start --php=8.2 --blueprint=blueprints/documentation.json",

    "screenshots": "playwright test tests/screenshots/",
    "screenshots:debug": "playwright test tests/screenshots/ --debug",
    "screenshots:ui": "playwright test tests/screenshots/ --ui",
    "screenshots:optimize": "node scripts/optimize-images.js",
    "screenshots:update": "npm run screenshots && npm run screenshots:optimize",

    "docs:validate": "node scripts/validate-docs.js",
    "docs:links": "markdown-link-check docs/**/*.md README.md",
    "docs:serve": "docsify serve docs",

    "readme:validate": "curl -F 'readme=<readme.txt' https://wordpress.org/plugins/developers/readme-validator/",

    "prepare": "husky install"
  }
}
```

### Validate Documentation Script

**Create: `scripts/validate-docs.js`**

```javascript
import fs from 'fs';
import path from 'path';

const errors = [];

// Check README.md exists
if (!fs.existsSync('README.md')) {
  errors.push('README.md is missing');
}

// Check readme.txt exists
if (!fs.existsSync('readme.txt')) {
  errors.push('readme.txt is missing');
}

// Check required documentation files
const requiredDocs = [
  'CONTRIBUTING.md',
  'SECURITY.md',
  'SUPPORT.md',
  'CHANGELOG.md',
];

for (const doc of requiredDocs) {
  if (!fs.existsSync(doc)) {
    errors.push(`${doc} is missing`);
  }
}

// Check screenshots exist
const screenshotFiles = fs.readdirSync('assets')
  .filter(file => file.match(/^screenshot-\d+\.png$/));

if (screenshotFiles.length === 0) {
  errors.push('No screenshots found in assets/');
}

// Check screenshot sizes
for (const file of screenshotFiles) {
  const stats = fs.statSync(`assets/${file}`);
  if (stats.size > 1024 * 1024) { // 1MB
    errors.push(`${file} is over 1MB (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
  }
}

// Check blueprint exists
if (!fs.existsSync('blueprints/documentation.json')) {
  errors.push('Documentation blueprint is missing');
}

// Report results
if (errors.length > 0) {
  console.error('Documentation validation failed:\n');
  errors.forEach(error => console.error(`  ❌ ${error}`));
  process.exit(1);
} else {
  console.log('✓ Documentation validation passed!');
}
```

---

## Quick Reference

### Complete Workflow Commands

```bash
# PHASE 1: PLANNING
# Create documentation plan manually

# PHASE 2: BLUEPRINT
vi blueprints/documentation.json
npx @wp-playground/cli server --blueprint=blueprints/documentation.json

# PHASE 3: SCREENSHOTS
npm run screenshots:update

# PHASE 4: WRITING
# Write documentation with screenshots

# PHASE 5: REVIEW & PUBLISH
npm run docs:validate
npm run readme:validate
git add . && git commit -m "docs: complete documentation"
git push

# Update WordPress.org
svn co https://plugins.svn.wordpress.org/your-plugin/assets
cp assets/screenshot-*.png svn-assets/
cd svn-assets && svn commit -m "Update screenshots"
```

### File Checklist

```
✓ README.md (GitHub)
✓ readme.txt (WordPress.org)
✓ CHANGELOG.md
✓ CONTRIBUTING.md
✓ SECURITY.md
✓ SUPPORT.md
✓ CODE_OF_CONDUCT.md
✓ LICENSE
✓ docs/user-guide.md
✓ docs/developer.md
✓ docs/faq.md
✓ docs/troubleshooting.md
✓ blueprints/documentation.json
✓ tests/screenshots/*.spec.js
✓ assets/screenshot-*.png (5+ screenshots)
✓ .github/ISSUE_TEMPLATE/
✓ .github/PULL_REQUEST_TEMPLATE.md
```

---

## Related Resources

- [BLUEPRINT-CREATION-GUIDE.md](BLUEPRINT-CREATION-GUIDE.md) - Complete blueprint guide
- [BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md](BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md) - Automated screenshots
- [SCREENSHOT-DOCUMENTATION-GUIDE.md](SCREENSHOT-DOCUMENTATION-GUIDE.md) - Screenshot best practices
- [TESTING-AUTOMATION-PROMPTS.md](TESTING-AUTOMATION-PROMPTS.md) - Testing prompts
- [COMMUNITY-FILES-PROMPTS.md](COMMUNITY-FILES-PROMPTS.md) - AI prompts for docs

---

**Last Updated:** December 10, 2024
**Version:** 1.0.0
