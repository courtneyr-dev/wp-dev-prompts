# Screenshot Documentation Guide

A comprehensive guide for creating, organizing, and using screenshots in WordPress plugin and theme documentation.

## 📋 Table of Contents

1. [Why Screenshots Matter](#why-screenshots-matter)
2. [Screenshot Requirements](#screenshot-requirements)
3. [Tools for Creating Screenshots](#tools-for-creating-screenshots)
4. [Screenshot Types](#screenshot-types)
5. [Best Practices](#best-practices)
6. [Automated Screenshot Generation](#automated-screenshot-generation)
7. [Organization and Storage](#organization-and-storage)
8. [WordPress.org Requirements](#wordpressorg-requirements)
9. [Maintenance and Updates](#maintenance-and-updates)

---

## Why Screenshots Matter

Good screenshots are essential for:

- **User Understanding** - Visual guide for features
- **WordPress.org Listing** - Required for plugin directory
- **Documentation** - Makes guides clearer
- **Marketing** - Shows value at a glance
- **Support** - Reduces support requests
- **SEO** - Improves search visibility

**Statistics:**
- Plugins with screenshots get 40% more downloads
- Users scan images before reading text
- Visual documentation reduces support tickets by 30%

---

## Screenshot Requirements

### WordPress.org Requirements

**For Plugins:**
- **Format:** PNG or JPEG
- **Max file size:** 1MB per screenshot
- **Recommended dimensions:** 1200 x 900 px (4:3 ratio)
- **Minimum dimensions:** 772 x 250 px
- **Naming:**
  - `screenshot-1.png`
  - `screenshot-2.png`
  - `screenshot-3.png`
  - etc.
- **Location:** Root of your plugin's `/assets/` directory in SVN
- **Caption:** Described in readme.txt

**For Themes:**
- **Screenshot.png** (required)
- **Dimensions:** 1200 x 900 px (exactly 4:3 ratio)
- **Location:** Theme root directory
- **Shows:** Homepage or key features

### General Requirements

**File Requirements:**
- **Format:** PNG (preferred) or JPEG
- **Resolution:** 2x for Retina displays
- **Color Mode:** RGB
- **Compression:** Optimize for web
- **Max Size:** Keep under 200KB if possible

**Content Requirements:**
- No placeholder or lorem ipsum text
- Real, meaningful content
- Professional appearance
- Consistent branding
- No personally identifiable information
- No copyrighted content without permission

---

## Tools for Creating Screenshots

### Manual Screenshot Tools

#### macOS
```bash
# Full screen
Cmd + Shift + 3

# Selection
Cmd + Shift + 4

# Window
Cmd + Shift + 4, then Space

# Screenshots saved to ~/Desktop/
```

**Third-party:**
- [CleanShot X](https://cleanshot.com/) - Professional screenshots (paid)
- [Skitch](https://evernote.com/products/skitch) - Annotation tool (free)

#### Windows
```bash
# Full screen
PrtScn or Win + PrtScn

# Active window
Alt + PrtScn

# Snipping Tool
Win + Shift + S
```

**Third-party:**
- [Greenshot](https://getgreenshot.org/) - Open-source (free)
- [ShareX](https://getsharex.com/) - Feature-rich (free)
- [Snagit](https://www.techsmith.com/screen-capture.html) - Professional (paid)

#### Linux
```bash
# GNOME Screenshot
gnome-screenshot

# Flameshot (recommended)
sudo apt install flameshot
flameshot gui
```

#### Browser Extensions
- [Awesome Screenshot](https://www.awesomescreenshot.com/) - Full page capture
- [Nimbus Screenshot](https://nimbusweb.me/screenshot.php) - Advanced features
- [Fireshot](https://getfireshot.com/) - Full page + editing

### Automated Screenshot Tools

#### Playwright (Recommended)

See our [BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md](BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md) for complete automated screenshot generation.

**Quick Example:**

```javascript
// screenshots.spec.js
import { test } from '@playwright/test';

test('Capture settings page', async ({ page }) => {
  await page.goto('http://localhost:8888/wp-admin/options-general.php?page=my-plugin');

  await page.screenshot({
    path: 'assets/screenshot-1.png',
    fullPage: true
  });
});
```

**Run:**
```bash
npx playwright test screenshots.spec.js
```

#### Puppeteer

```javascript
// screenshot.js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport for consistent size
  await page.setViewport({ width: 1200, height: 900 });

  // Navigate and login
  await page.goto('http://localhost:8888/wp-admin/');
  await page.type('#user_login', 'admin');
  await page.type('#user_pass', 'password');
  await page.click('#wp-submit');

  // Wait for dashboard
  await page.waitForSelector('#wpbody');

  // Navigate to plugin page
  await page.goto('http://localhost:8888/wp-admin/admin.php?page=my-plugin');

  // Take screenshot
  await page.screenshot({
    path: 'assets/screenshot-1.png',
    fullPage: false
  });

  await browser.close();
})();
```

**Run:**
```bash
node screenshot.js
```

#### WordPress Playground

See [VISUAL-REGRESSION-TESTING-TEMPLATE.md](VISUAL-REGRESSION-TESTING-TEMPLATE.md) for visual regression testing with WordPress Playground.

---

## Screenshot Types

### 1. Feature Screenshots

**Purpose:** Show main plugin/theme features

**Examples:**
- Settings/configuration page
- Admin interface
- Frontend output
- Gutenberg blocks
- Shortcode results

**Checklist:**
- [ ] Clear, focused on one feature
- [ ] Meaningful data (not defaults)
- [ ] Proper permissions visible
- [ ] Professional appearance
- [ ] Annotations (if needed)

### 2. Installation Screenshots

**Purpose:** Guide users through setup

**Examples:**
- Plugin activation
- Initial setup wizard
- Configuration steps
- Import process

**Checklist:**
- [ ] Step-by-step sequence
- [ ] Clear numbered captions
- [ ] Highlight important elements
- [ ] Show success states

### 3. Frontend Screenshots

**Purpose:** Show user-facing output

**Examples:**
- Homepage display
- Post/page integration
- Widgets
- Shortcode output
- Custom post types

**Checklist:**
- [ ] Realistic content
- [ ] Multiple device sizes (responsive)
- [ ] Different themes (if applicable)
- [ ] Interactive elements visible

### 4. Comparison Screenshots

**Purpose:** Show before/after or version differences

**Examples:**
- Performance improvements
- UI redesigns
- Feature additions
- Migration results

**Format:**
```markdown
| Before | After |
|--------|-------|
| ![Before](img/before.png) | ![After](img/after.png) |
```

### 5. Error/Warning Screenshots

**Purpose:** Document issues and solutions

**Examples:**
- Error messages
- Warning states
- Validation errors
- Troubleshooting steps

**Checklist:**
- [ ] Clear error message visible
- [ ] Solution or fix shown
- [ ] Supporting context included

---

## Best Practices

### Composition

**Do:**
- ✅ Show one feature per screenshot
- ✅ Use real, meaningful content
- ✅ Maintain consistent window size
- ✅ Include relevant UI context
- ✅ Highlight important areas
- ✅ Use consistent branding
- ✅ Show realistic use cases

**Don't:**
- ❌ Use lorem ipsum or placeholder text
- ❌ Include personal information
- ❌ Show confusing or cluttered interfaces
- ❌ Use copyrighted images without permission
- ❌ Include outdated UI elements
- ❌ Mix different themes/styles

### Annotations

**When to annotate:**
- Complex interfaces
- Highlighting specific elements
- Step-by-step guides
- Drawing attention to changes

**Tools:**
- [Skitch](https://evernote.com/products/skitch)
- [Annotate](https://annotate.com/)
- [Snagit](https://www.techsmith.com/screen-capture.html)
- Photoshop/GIMP

**Annotation types:**
- 🔴 Circles - Highlight areas
- ➡️ Arrows - Point to elements
- 📝 Text boxes - Explain features
- ✓ Numbers - Sequential steps

**Example:**
```markdown
![Settings page with numbered steps](assets/screenshot-annotated.png)
1. Enter API key
2. Select mode
3. Click Save
```

### Consistency

**Maintain consistency:**
- **Browser:** Same browser for all screenshots
- **Theme:** Same WordPress theme
- **Window size:** Same dimensions
- **Zoom level:** 100% (no browser zoom)
- **WordPress version:** Latest stable
- **Plugin state:** Activated with sample data

**Create a style guide:**
```markdown
# Screenshot Style Guide

- **Browser:** Chrome 120+ (latest stable)
- **Window Size:** 1200 x 900 px
- **WordPress:** 6.5+ with Twenty Twenty-Four theme
- **Admin Color Scheme:** Fresh (default)
- **Sample Data:** WordPress standard sample content
- **Font Rendering:** macOS standard
- **DPI:** 2x for Retina (export 1x)
```

### Optimization

**Compress images:**

```bash
# Install tools
npm install -g pngquant imageoptim-cli

# Optimize PNG
pngquant --quality=65-80 screenshot-1.png -o screenshot-1-optimized.png

# Optimize multiple files
imageoptim assets/*.png

# Or use online tools
# https://tinypng.com/
# https://imagecompressor.com/
```

**Responsive images:**

```markdown
# Regular display
![Settings page](assets/screenshot-1.png)

# Retina display
![Settings page](assets/screenshot-1@2x.png)

# HTML for both
<img src="assets/screenshot-1.png"
     srcset="assets/screenshot-1@2x.png 2x"
     alt="Settings page" />
```

### Accessibility

**Alt text:**
```markdown
# Bad
![](screenshot.png)

# Good
![Plugin settings page showing API configuration options](screenshot.png)

# Better
![Plugin settings page with API key field, mode selector dropdown (Development/Production), and Save Changes button](screenshot.png)
```

**Descriptive captions:**
```markdown
## Screenshot 1: Main Settings Page

![Main settings page](screenshot-1.png)

The main settings page allows administrators to configure API credentials,
select operating mode, and manage cache settings.
```

---

## Automated Screenshot Generation

### Using Playwright with WordPress Playground

**Complete automated workflow:**

```javascript
// generate-screenshots.spec.js
import { test } from '@playwright/test';

const SCREENSHOTS = [
  {
    name: 'screenshot-1',
    title: 'Plugin settings page',
    url: '/wp-admin/options-general.php?page=my-plugin',
    waitFor: '.my-plugin-settings',
  },
  {
    name: 'screenshot-2',
    title: 'Frontend widget display',
    url: '/',
    waitFor: '.my-plugin-widget',
  },
  {
    name: 'screenshot-3',
    title: 'Block editor integration',
    url: '/wp-admin/post-new.php',
    waitFor: '.block-editor',
    actions: async (page) => {
      // Click add block
      await page.click('.block-editor-inserter__toggle');
      // Search for block
      await page.fill('.block-editor-inserter__search-input', 'my-block');
      // Wait for block to appear
      await page.waitForSelector('.editor-block-list-item-my-block');
    },
  },
];

for (const screenshot of SCREENSHOTS) {
  test(`Generate ${screenshot.name}`, async ({ page }) => {
    // Navigate to URL
    await page.goto(`http://localhost:8888${screenshot.url}`);

    // Wait for element
    await page.waitForSelector(screenshot.waitFor);

    // Perform actions if needed
    if (screenshot.actions) {
      await screenshot.actions(page);
    }

    // Take screenshot
    await page.screenshot({
      path: `assets/${screenshot.name}.png`,
      fullPage: false,
    });

    console.log(`✓ Generated ${screenshot.name}.png`);
  });
}
```

**Add to package.json:**

```json
{
  "scripts": {
    "screenshots": "playwright test generate-screenshots.spec.js",
    "screenshots:update": "npm run screenshots && npm run optimize-images"
  }
}
```

### Automated Screenshot Pipeline

**GitHub Actions workflow:**

```yaml
name: Update Screenshots

on:
  workflow_dispatch:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'assets/**'

jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Start WordPress environment
        run: npm run env:start

      - name: Generate screenshots
        run: npm run screenshots

      - name: Optimize images
        run: npm run optimize-images

      - name: Commit screenshots
        run: |
          git config --global user.name 'Screenshot Bot'
          git config --global user.email 'bot@example.com'
          git add assets/*.png
          git diff --staged --quiet || git commit -m "docs: update screenshots"
          git push
```

---

## Organization and Storage

### Directory Structure

**Recommended:**

```
your-plugin/
├── assets/                    # WordPress.org assets (SVN)
│   ├── banner-772x250.png    # Plugin banner (required)
│   ├── banner-1544x500.png   # Retina banner (optional)
│   ├── icon-128x128.png      # Plugin icon
│   ├── icon-256x256.png      # Retina icon
│   ├── screenshot-1.png      # First screenshot
│   ├── screenshot-2.png      # Second screenshot
│   └── screenshot-3.png      # Third screenshot
│
├── .wordpress-org/            # Alternative location (Git)
│   └── [same as assets/]
│
└── docs/                      # Documentation images
    ├── images/
    │   ├── setup/
    │   │   ├── step-1.png
    │   │   └── step-2.png
    │   ├── features/
    │   │   ├── feature-1.png
    │   │   └── feature-2.png
    │   └── troubleshooting/
    │       ├── error-1.png
    │       └── fix-1.png
    └── screenshots/           # Generated screenshots
        ├── admin/
        ├── frontend/
        └── blocks/
```

### Naming Conventions

**WordPress.org (required):**
- `screenshot-1.png` - First screenshot
- `screenshot-2.png` - Second screenshot
- `screenshot-N.png` - Additional screenshots

**Documentation (recommended):**
- `[feature]-[variant]-[state].png`
- Examples:
  - `settings-api-empty.png`
  - `settings-api-filled.png`
  - `dashboard-widget-dark.png`
  - `block-editor-inserter.png`

### Version Control

**Git:**

```gitignore
# Ignore generated screenshots (regenerate as needed)
docs/screenshots/

# Keep WordPress.org assets
!assets/screenshot-*.png
!assets/banner-*.png
!assets/icon-*.png
```

**SVN (WordPress.org):**

```bash
# Update screenshots
svn co https://plugins.svn.wordpress.org/your-plugin/assets
cd assets/
cp /path/to/new/screenshot-1.png .
svn commit -m "Update screenshots for version 1.2.0"
```

---

## WordPress.org Requirements

### readme.txt Captions

**Format:**

```text
== Screenshots ==

1. Main settings page with API configuration and mode selection
2. Frontend widget display with customization options
3. Block editor integration showing custom block insertion
4. Analytics dashboard with performance metrics
5. Import/export interface for settings backup
```

**Best practices:**
- One caption per line
- Numbered to match screenshot files
- Descriptive but concise
- Focus on what's shown, not how to use it

### Banner and Icon

**Plugin Banner:**

```
# Required (for featured plugins)
banner-772x250.png     # Standard (772 x 250 px)
banner-1544x500.png    # Retina (1544 x 500 px)

# Location
assets/banner-772x250.png
```

**Plugin Icon:**

```
# Required
icon-128x128.png       # Standard (128 x 128 px)
icon-256x256.png       # Retina (256 x 256 px)

# Or use SVG
icon.svg               # Scalable (preferred)

# Location
assets/icon-128x128.png
```

### Submission Checklist

**Before submitting to WordPress.org:**

- [ ] Screenshots are 1200 x 900 px (or proportional)
- [ ] Files are under 1MB each
- [ ] Named `screenshot-1.png`, `screenshot-2.png`, etc.
- [ ] Placed in `/assets/` directory (SVN)
- [ ] Captions added to readme.txt
- [ ] No placeholder content
- [ ] No personal information visible
- [ ] Professional appearance
- [ ] Optimized for web
- [ ] Show real functionality
- [ ] Consistent with current version

---

## Maintenance and Updates

### When to Update Screenshots

**Update screenshots when:**
- Major UI changes
- New features added
- Branding updates
- WordPress core UI changes
- Theme compatibility updates
- User feedback indicates confusion

**Update schedule:**
- **Major releases:** Always update
- **Minor releases:** If UI changed
- **Patch releases:** Usually not needed
- **Annual review:** Check all screenshots

### Screenshot Audit Process

**Quarterly audit:**

```markdown
# Screenshot Audit Checklist

## Visual Quality
- [ ] All screenshots clear and crisp
- [ ] Consistent dimensions
- [ ] No compression artifacts
- [ ] Proper colors and contrast

## Content
- [ ] Reflects current version
- [ ] No outdated UI elements
- [ ] Real, meaningful content
- [ ] No typos or errors visible

## Technical
- [ ] Optimized file sizes
- [ ] Proper file names
- [ ] All files present in SVN
- [ ] Captions match screenshots

## Accessibility
- [ ] Alt text provided
- [ ] Descriptive captions
- [ ] High contrast (if needed)
- [ ] Text readable at thumbnail size

## Actions Needed
- Screenshot 1: Update for new settings page (v2.0)
- Screenshot 3: Replace lorem ipsum with real content
- Screenshot 5: Optimize file size (currently 850KB)
```

### Tracking Changes

**In CHANGELOG.md:**

```markdown
## [2.0.0] - 2024-12-10

### Changed
- Complete redesign of settings interface
- Updated screenshots 1-3 to reflect new UI
- Added screenshot 6 showing new dashboard widget

### Assets Updated
- `screenshot-1.png` - New settings page design
- `screenshot-2.png` - Updated with new color scheme
- `screenshot-3.png` - Shows new import feature
- `screenshot-6.png` - NEW: Dashboard widget
```

---

## AI Prompts for Screenshots

### Generate Screenshot Documentation

```
Create comprehensive screenshot documentation for my WordPress plugin.

Plugin: [PLUGIN_NAME]
Features: [LIST_FEATURES]

Generate:
1. List of required screenshots (minimum 5)
2. Caption for each screenshot
3. Best practices for capturing each type
4. Playwright test for automated capture

Include screenshots for:
- Settings/configuration page
- Main feature display
- Gutenberg block (if applicable)
- Frontend output
- Dashboard widgets (if applicable)
```

### Create Screenshot Checklist

```
Create a screenshot quality checklist for WordPress plugin submission.

Requirements:
- WordPress.org compliance
- Professional quality standards
- Accessibility guidelines
- Technical requirements

Output as markdown checklist with categories:
- File requirements
- Content requirements
- Quality requirements
- Accessibility requirements
```

---

## Resources

### Official Documentation
- [WordPress Plugin Handbook - Assets](https://developer.wordpress.org/plugins/wordpress-org/plugin-assets/)
- [Theme Handbook - Screenshots](https://developer.wordpress.org/themes/release/required-theme-files/)
- [Playground Blueprints](https://wordpress.github.io/wordpress-playground/)

### Tools
- [TinyPNG](https://tinypng.com/) - Image compression
- [Playwright](https://playwright.dev/) - Automated screenshots
- [ImageOptim](https://imageoptim.com/) - Mac image optimization
- [pngquant](https://pngquant.org/) - PNG compression

### Related Guides
- [BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md](BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md)
- [VISUAL-REGRESSION-TESTING-TEMPLATE.md](VISUAL-REGRESSION-TESTING-TEMPLATE.md)
- [TESTING-AUTOMATION-PROMPTS.md](TESTING-AUTOMATION-PROMPTS.md)

---

## Example Workflow

**Complete screenshot workflow:**

```bash
# 1. Start WordPress environment
npm run env:start

# 2. Activate plugin and add sample data
wp plugin activate my-plugin
wp plugin install wordpress-importer --activate
wp import sample-content.xml

# 3. Generate screenshots automatically
npm run screenshots

# 4. Optimize images
npm run optimize-images

# 5. Review screenshots
open assets/screenshot-*.png

# 6. Update readme.txt captions
vim readme.txt

# 7. Commit to repository
git add assets/screenshot-*.png readme.txt
git commit -m "docs: update screenshots for version 2.0"

# 8. Update WordPress.org SVN
cd ~/svn/my-plugin/assets/
cp ~/git/my-plugin/assets/screenshot-*.png .
svn add screenshot-*.png --force
svn commit -m "Update screenshots for version 2.0"

# 9. Verify on WordPress.org
# Visit https://wordpress.org/plugins/my-plugin/
```

---

**Last Updated:** December 10, 2024
**Version:** 1.0.0

For questions or improvements, please open an issue or discussion on GitHub.
