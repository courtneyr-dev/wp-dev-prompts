# Universal WordPress Plugin Screenshot Automation Prompt

## Generic Prompt Template (Adaptable for Any Plugin)

```
Create a Playwright test suite for automated screenshot generation of the [PLUGIN_NAME] plugin.

BLUEPRINT SETUP:
- Use blueprint from: [PATH_TO_BLUEPRINT or URL]
- Blueprint should include:
  * [PLUGIN_NAME] plugin installation and activation
  * Compatible theme: [THEME_NAME] (or leave default)
  * Sample content: [SPECIFY_CONTENT_TYPE]
  * Any required configuration/settings

SCREENSHOTS TO CAPTURE:

Admin Views:
1. Plugins page showing [PLUGIN_NAME] activated
2. [PLUGIN_NAME] settings/configuration page
3. [LIST_OTHER_ADMIN_SCREENS]

Editor Views:
4. [DESCRIBE_EDITOR_INTEGRATIONS]
   - Block editor modifications
   - Sidebar panels
   - Toolbar additions
   - Inspector controls

Frontend Views:
5. [LIST_FRONTEND_FEATURES]
   - Main feature display
   - User interactions
   - Responsive views (if applicable)

VIEWPORTS:
- Mobile: 375x667
- Tablet: 768x1024
- Desktop: 1920x1080
- [ADD_CUSTOM_VIEWPORTS if needed]

ACCESSIBILITY REQUIREMENTS:
Generate metadata including:
- Descriptive alt text following WCAG guidelines
- Format: "[Plugin name] [screen/feature] showing [key elements and their states]"
- Document keyboard navigation where relevant
- Note focus states and interactive elements
- Include ARIA label information
- WCAG compliance notes (contrast ratios, etc.)

SEO OPTIMIZATION:
Filename Convention:
- Format: [plugin-slug]-[screen-type]-[feature]-[viewport].png
- Example: my-plugin-settings-page-desktop.png
- Lowercase, hyphen-separated
- Descriptive and keyword-rich

Image Optimization:
- Format: PNG for UI/admin (lossless), JPEG for content (85% quality)
- Generate WebP versions for modern browsers
- Max width: 1920px (for desktop), scale down for smaller viewports
- Target file size: <300kb per image
- Use compression: sharp, imagemin, or similar
- 2x resolution for retina displays

Metadata JSON Structure:
{
  "filename": "[descriptive-filename].png",
  "title": "[Human Readable Title]",
  "alt": "[Descriptive alt text for accessibility]",
  "caption": "[Brief caption for documentation]",
  "description": "[Longer description with context]",
  "keywords": ["[plugin-name]", "[feature]", "[category]", "wordpress"],
  "dimensions": "[width]x[height]",
  "format": "png|jpeg|webp",
  "filesize": "[size in kb]",
  "viewport": "desktop|tablet|mobile",
  "screen": "admin|editor|frontend",
  "feature": "[specific feature shown]",
  "created": "[ISO date]",
  "checksum": "[file hash for change detection]"
}

PLAYWRIGHT CONFIGURATION:
- Browser: Chromium (default)
- Viewport: As specified above
- Wait Strategies:
  * Initial load: Wait for WordPress Playground iframe (60s timeout)
  * Navigation: Wait for networkidle
  * Dynamic content: Wait for specific selectors
  * AJAX/Fetch: Wait for response
- Context Switching:
  * Handle WordPress Playground iframe
  * Switch contexts as needed
- Interaction Delays:
  * Allow animations to complete (500ms default)
  * Wait for modals/popovers to appear
- Full Page vs Viewport:
  * Admin/Editor: Full page screenshots
  * Frontend: Viewport screenshots (for responsive testing)

WORDPRESS-SPECIFIC HANDLING:
- Dismiss welcome screens/tours
- Close admin notices/banners
- Handle "What's New" modals
- Set screen options (show/hide panels)
- Expand/collapse meta boxes
- Handle autosave notifications

OUTPUT STRUCTURE:
/screenshots
  /admin
    [plugin-slug]-plugins-activated-[viewport].png
    [plugin-slug]-settings-[viewport].png
    [plugin-slug]-[feature]-[viewport].png
  /editor
    [plugin-slug]-editor-[feature]-[viewport].png
  /frontend
    /desktop
      [plugin-slug]-[feature]-desktop.png
    /tablet
      [plugin-slug]-[feature]-tablet.png
    /mobile
      [plugin-slug]-[feature]-mobile.png
  /social
    [plugin-slug]-social-preview.png (1200x630)
  /thumbnails
    [plugin-slug]-[feature]-thumb.png (400px width)
  /metadata
    screenshots.json (all metadata)
    alt-text.md (for documentation)
    embed-codes.md (ready-to-use codes)
    changelog.md (visual changes log)

DOCUMENTATION GENERATION:
Create documentation files:

1. README-SCREENSHOTS.md
   - Table of screenshots with previews
   - Alt text for each
   - Context and usage
   - Embed codes (Markdown, HTML, readme.txt)

2. alt-text.md
   - List all alt text for easy copying
   - Organized by screen type

3. embed-codes.md
   - Markdown: ![Alt](path)
   - HTML: <img src="" alt="" />
   - WordPress readme.txt: [screenshot URL]
   - GitHub: ![Alt](URL)

4. ACCESSIBILITY.md
   - Accessibility features documented
   - Keyboard navigation guides
   - ARIA label documentation
   - WCAG compliance notes

ERROR HANDLING:
- Retry Strategy: Up to 3 attempts per screenshot
- Timeout Handling: Increase timeout for slow loading
- Element Not Found: Log warning, capture debug screenshot
- Playground Load Failure: Retry entire blueprint load
- Network Errors: Wait and retry
- Continue on Failure: Don't stop entire suite for one failure
- Debug Output:
  * Save HTML snapshot on failure
  * Capture console errors
  * Log network requests
  * Save trace file for debugging

AUTOMATED UPDATES:
- Re-runnable: Can run multiple times safely
- Change Detection:
  * Compare new screenshots with existing
  * Generate visual diff images
  * Report changed screenshots
  * Update changelog automatically
- Selective Updates:
  * Skip unchanged screenshots (checksum comparison)
  * Only regenerate specified screens
  * Force regenerate option available
- Version Tracking:
  * Tag screenshots by plugin version
  * Keep archive of previous versions
  * Document visual changes between versions

ADDITIONAL FEATURES (Optional):
- [ ] Add annotations/callouts to highlight features
- [ ] Blur sensitive information (API keys, emails, etc.)
- [ ] Highlight interactive elements with subtle borders
- [ ] Create animated GIFs for workflows (max 3-5 seconds)
- [ ] Generate comparison images (before/after)
- [ ] Create sprite sheets for quick reference
- [ ] Add device frames (optional, for marketing)
- [ ] Generate dark mode screenshots (if supported)
- [ ] Create localized versions (different languages)
- [ ] Add watermark/branding (optional)

SCRIPT COMMANDS:
Implement these npm scripts:

npm run screenshots              # Generate all screenshots
npm run screenshots:admin        # Admin screens only
npm run screenshots:editor       # Editor screens only
npm run screenshots:frontend     # Frontend screens only
npm run screenshots:update       # Update existing screenshots
npm run screenshots:diff         # Compare with previous version
npm run screenshots:clean        # Remove old screenshots
npm run screenshots:optimize     # Optimize file sizes
npm run screenshots:validate     # Check for missing screenshots
npm run screenshots:metadata     # Regenerate metadata only

CONFIGURATION FILE:
Create screenshots.config.js:

module.exports = {
  plugin: {
    name: '[PLUGIN_NAME]',
    slug: '[plugin-slug]',
    blueprintUrl: '[PATH_OR_URL]'
  },
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 }
  },
  screenshots: [
    {
      name: 'plugins-activated',
      url: '/wp-admin/plugins.php',
      viewports: ['desktop'],
      waitFor: '.plugin-title'
    },
    // Add more screenshot definitions
  ],
  optimization: {
    png: { compressionLevel: 9 },
    jpeg: { quality: 85 },
    webp: { quality: 85 }
  },
  accessibility: {
    generateAltText: true,
    documentKeyboardNav: true,
    checkContrast: true
  },
  seo: {
    generateMetadata: true,
    optimizeFilenames: true,
    createSocialImages: true
  }
}
```

---

## Quick Start Checklist

Before running the automation, ensure you have:

- [ ] Blueprint file ready and tested
- [ ] Plugin available (WordPress.org or local)
- [ ] Compatible theme identified
- [ ] Sample content prepared (if needed)
- [ ] List of screens to capture defined
- [ ] Viewports specified
- [ ] Output directory structure created
- [ ] Playwright installed and configured
- [ ] Image optimization tools installed

---

## Customization Guide

### For Simple Plugins (Settings Page Only)
Focus on:
- Plugins activation screen
- Settings page (all tabs)
- Maybe 1-2 frontend views

### For Block Editor Plugins
Capture:
- Block inserter showing your block
- Block in editor (default state)
- Block with different configurations
- Block inspector controls
- Block toolbar
- Frontend render

### For Frontend-Heavy Plugins
Emphasize:
- Multiple frontend views
- User interactions (forms, buttons)
- Responsive behavior
- Mobile experience
- Loading states

### For Admin Workflow Plugins
Document:
- Step-by-step workflow
- Create animated GIFs showing process
- Each screen in the workflow
- Success/error states

---

## Integration Examples

### GitHub Actions Workflow
```yaml
name: Update Screenshots
on:
  release:
    types: [published]
jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run screenshots
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "Update screenshots for release"
```

### Pre-Release Hook
```json
{
  "scripts": {
    "prerelease": "npm run screenshots:update && git add screenshots/"
  }
}
```

---

## Success Criteria

A successful implementation provides:

✅ **Completeness**
- All required screens captured
- Multiple viewport sizes
- Both admin and frontend views

✅ **Quality**
- Sharp, clear images
- Consistent styling
- Proper sizing and cropping
- Optimized file sizes

✅ **Accessibility**
- Descriptive alt text for every image
- Keyboard navigation documented
- WCAG compliance noted
- Screen reader context provided

✅ **SEO Optimization**
- Keyword-rich filenames
- Comprehensive metadata
- Optimized file formats
- Multiple formats (PNG, WebP)

✅ **Documentation**
- Auto-generated markdown files
- Ready-to-use embed codes
- Clear organization
- Update instructions

✅ **Automation**
- Re-runnable without errors
- Change detection
- Error recovery
- Minimal manual intervention

✅ **Maintainability**
- Configuration-driven
- Version tracked
- Well-documented
- Easy to update

---

## Reference Documentation

**WordPress Playground:**
- Main: https://wordpress.github.io/wordpress-playground/
- Blueprints: https://wordpress.github.io/wordpress-playground/blueprints/
- API: https://wordpress.github.io/wordpress-playground/javascript-api

**Playwright:**
- Screenshots: https://playwright.dev/docs/screenshots
- Selectors: https://playwright.dev/docs/selectors
- Frames: https://playwright.dev/docs/frames
- Best Practices: https://playwright.dev/docs/best-practices

**Accessibility:**
- Alt Text: https://www.w3.org/WAI/tutorials/images/
- WCAG: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA: https://www.w3.org/TR/wai-aria-practices/

**SEO & Images:**
- Google Images: https://developers.google.com/search/docs/appearance/google-images
- Web Performance: https://web.dev/fast/#optimize-your-images
- Image Formats: https://web.dev/choose-the-right-image-format/

**Image Optimization:**
- Sharp: https://sharp.pixelplumbing.com/
- Imagemin: https://github.com/imagemin/imagemin
- Squoosh: https://squoosh.app/

---

## Example Usage

### Minimal Plugin (Just Settings Page)
```
Create Playwright screenshots for Simple Contact Form plugin.
Blueprint: simple-contact-form/.wordpress.org/blueprint.json
Capture: Plugins page, Settings page (desktop only)
Alt text required, SEO filenames, standard optimization.
```

### Complex Plugin (Full Suite)
```
Create comprehensive screenshot suite for WooCommerce Product Addons plugin.
Blueprint: product-addons/blueprint.json (includes sample products)
Capture: Admin (6 screens), Editor (4 blocks), Frontend (8 views)
All viewports (mobile, tablet, desktop)
Full accessibility metadata, SEO optimization
Generate animated GIF of addon creation workflow
Include social preview images
```

---

*Template Version: 1.0*
*Created: 2025-12-09*
*Last Updated: 2025-12-09*
