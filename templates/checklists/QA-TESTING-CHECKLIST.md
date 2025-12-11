# WordPress Plugin/Theme QA Testing Checklist

Comprehensive manual testing checklist for WordPress plugins and themes before release. Use this alongside automated testing to ensure quality and compatibility.

**Use this checklist for:**
- Pre-release testing (before submitting to WordPress.org)
- Major version updates
- After significant feature additions
- When making breaking changes

---

## Table of Contents

1. [Pre-Testing Setup](#pre-testing-setup)
2. [Functional Testing](#functional-testing)
3. [Compatibility Testing](#compatibility-testing)
4. [Security Testing](#security-testing)
5. [Performance Testing](#performance-testing)
6. [Accessibility Testing](#accessibility-testing)
7. [Internationalization Testing](#internationalization-testing)
8. [User Experience Testing](#user-experience-testing)
9. [Documentation Review](#documentation-review)
10. [Pre-Release Final Checks](#pre-release-final-checks)

---

## Pre-Testing Setup

### Testing Environments

Create the following test environments:

- [ ] **Fresh WordPress Install**
  - Latest WordPress version
  - Default theme (Twenty Twenty-Five)
  - No other plugins
  - MySQL 8.0 or MariaDB 10.11+
  - PHP 8.2

- [ ] **Minimum Requirements**
  - Minimum supported WordPress version
  - PHP minimum version
  - Test environment matches stated requirements

- [ ] **Common Hosting Environment**
  - Shared hosting (if applicable)
  - Managed WordPress hosting (WP Engine, Kinsta, etc.)
  - Test caching, CDN, server configs

### Test Data

- [ ] Import WordPress Theme Unit Test Data
- [ ] Create sample content for all custom post types
- [ ] Test with empty database (no content)
- [ ] Test with large database (1000+ posts)
- [ ] Test with long/special character content

---

## Functional Testing

### Installation & Activation

- [ ] **Fresh Install**
  - Plugin/theme installs without errors
  - No PHP warnings/notices
  - No JavaScript console errors
  - Database tables created correctly
  - Default options set correctly

- [ ] **Activation**
  - Activates on single site without errors
  - Activates on multisite (network/site-level)
  - Activation hooks run successfully
  - Welcome screen displays (if applicable)
  - No conflicts with default theme/plugins

- [ ] **Deactivation**
  - Deactivates cleanly
  - No errors on deactivation
  - Deactivation hook runs
  - Admin notices cleared

- [ ] **Uninstall**
  - Uninstall removes all plugin data (if configured)
  - Database tables removed (if applicable)
  - Options cleaned up
  - Files removed
  - No orphaned data

### Core Functionality

For each major feature:

- [ ] **Feature: [Feature Name]**
  - Feature works as documented
  - All buttons/links work correctly
  - Forms submit successfully
  - AJAX actions complete
  - Data saves correctly
  - Data displays correctly
  - Validation works as expected
  - Error messages are clear and helpful

- [ ] **Feature: [Feature Name]**
  - *(Repeat for each major feature)*

### Admin Interface

- [ ] **Settings Pages**
  - All settings pages load without errors
  - Form fields display correctly
  - Save button works
  - Settings persist after save
  - Reset to defaults works
  - Help text is clear and accurate
  - Required fields validated
  - Success/error messages display

- [ ] **Admin Menus**
  - Menu items appear in correct location
  - Submenu items display correctly
  - Menu capabilities checked correctly
  - Icons display properly
  - Menu highlighting works

- [ ] **Meta Boxes**
  - Display in correct location
  - Save data correctly
  - Permissions checked
  - UI is intuitive

- [ ] **Admin Notices**
  - Dismissible notices can be dismissed
  - Notices appear at appropriate times
  - No duplicate notices
  - Notices are styled correctly

### Frontend Display

- [ ] **Public Pages**
  - Custom post types display correctly
  - Archive pages work
  - Single pages work
  - Pagination works
  - Search includes custom content
  - RSS feeds include custom content

- [ ] **Shortcodes**
  - All shortcodes render correctly
  - Attributes work as documented
  - Nested shortcodes work (if applicable)
  - No output buffering issues

- [ ] **Widgets**
  - Display in widget areas
  - Settings save correctly
  - Output displays correctly
  - Widget caching works

- [ ] **Blocks** (Gutenberg)
  - All blocks appear in inserter
  - Blocks can be added to posts
  - Block settings work
  - Blocks preview correctly in editor
  - Blocks display correctly on frontend
  - Block transforms work
  - Block variations work
  - Block patterns available

### AJAX Functionality

- [ ] **AJAX Handlers**
  - All AJAX endpoints work
  - Nonce verification passes
  - Capability checks pass
  - Success responses correct
  - Error responses correct
  - Loading states display
  - Results update UI correctly

### REST API

- [ ] **Endpoints**
  - All custom endpoints registered
  - Authentication works
  - Permission callbacks work
  - GET requests return correct data
  - POST requests create data
  - PUT/PATCH requests update data
  - DELETE requests remove data
  - Error responses are appropriate
  - Rate limiting works (if applicable)

### Cron Jobs

- [ ] **Scheduled Tasks**
  - Cron events registered
  - Events run at scheduled times
  - Event callbacks execute successfully
  - Failed events handled gracefully
  - Manual trigger works (if applicable)

### Database Operations

- [ ] **Queries**
  - Custom queries use $wpdb correctly
  - Prepared statements used
  - Results cached appropriately
  - Queries optimized (no N+1 problems)
  - Transactions work correctly
  - Database errors logged

---

## Compatibility Testing

### WordPress Versions

- [ ] **Latest WordPress** (6.7+)
  - All features work
  - No deprecation notices

- [ ] **Minimum Supported Version** (e.g., 6.5)
  - Core functionality works
  - Graceful degradation for newer features

- [ ] **WordPress Trunk** (next version)
  - Test against beta/RC
  - No breaking changes anticipated

### PHP Versions

- [ ] **Latest PHP** (8.3)
  - No errors or warnings
  - Modern features work

- [ ] **Minimum Supported PHP** (e.g., 8.0)
  - All features functional
  - Polyfills work correctly

- [ ] **Deprecated PHP versions** (if supported)
  - Compatibility maintained
  - Warnings about upgrade

### Database Compatibility

- [ ] **MySQL** (8.0+)
  - All queries work
  - Character sets correct (utf8mb4)

- [ ] **MariaDB** (10.11+)
  - All queries work
  - No MySQL-specific syntax issues

### Multisite

- [ ] **Network Activation**
  - Activates on network
  - Works on all sites
  - Network admin menus appear

- [ ] **Per-Site Activation**
  - Works when activated per-site
  - Settings per-site work

- [ ] **Multisite-Specific Features**
  - Network options save correctly
  - Site switching works
  - Blog ID handling correct

### Theme Compatibility

Test with popular themes:

- [ ] **Default Themes**
  - Twenty Twenty-Five
  - Twenty Twenty-Four
  - Twenty Twenty-Three

- [ ] **Popular Themes**
  - Astra
  - GeneratePress
  - Kadence
  - *(Add others relevant to your plugin)*

- [ ] **Block Themes vs Classic**
  - Works with block themes
  - Works with classic themes
  - Theme.json compatibility

### Plugin Compatibility

Test with popular plugins:

- [ ] **Essential Plugins**
  - Yoast SEO
  - Rank Math
  - Contact Form 7
  - Gravity Forms
  - Advanced Custom Fields
  - WooCommerce (if applicable)
  - Elementor (if applicable)
  - Gutenberg plugin (latest blocks)

- [ ] **Caching Plugins**
  - WP Rocket
  - W3 Total Cache
  - LiteSpeed Cache
  - Cache cleared when content updates

- [ ] **Security Plugins**
  - Wordfence
  - Sucuri
  - iThemes Security
  - No false positives

### Browser Compatibility

- [ ] **Desktop Browsers**
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)

- [ ] **Mobile Browsers**
  - Chrome Mobile (Android)
  - Safari Mobile (iOS)
  - Samsung Internet

- [ ] **Legacy Browsers** (if supported)
  - Document any issues
  - Graceful degradation

### Device Testing

- [ ] **Desktop**
  - 1920x1080 (Full HD)
  - 1366x768 (common laptop)
  - 2560x1440 (2K)

- [ ] **Tablet**
  - iPad (768x1024)
  - Android tablet (various)
  - Landscape and portrait

- [ ] **Mobile**
  - iPhone (375x667, 390x844)
  - Android (360x640, 412x915)
  - Small screens (320px width)

---

## Security Testing

### Authentication & Authorization

- [ ] **Capability Checks**
  - Admin actions check capabilities
  - AJAX handlers check capabilities
  - Frontend actions check capabilities
  - Users can't access unauthorized features

- [ ] **Nonce Verification**
  - All forms have nonces
  - All AJAX requests verify nonces
  - All admin actions verify nonces
  - Nonces expire appropriately

### Input Validation & Sanitization

- [ ] **User Input**
  - All inputs sanitized on save
  - Appropriate sanitization function used
  - Validation prevents invalid data
  - Error messages for invalid input

- [ ] **File Uploads** (if applicable)
  - File type validation
  - File size limits enforced
  - Files stored securely
  - No arbitrary file execution

### Output Escaping

- [ ] **HTML Output**
  - All output escaped appropriately
  - `esc_html()` for text
  - `esc_attr()` for attributes
  - `esc_url()` for URLs
  - `wp_kses_post()` for HTML content

- [ ] **JavaScript Output**
  - Variables passed via `wp_localize_script()`
  - Or escaped with `esc_js()`
  - No unescaped user data

### SQL Injection Prevention

- [ ] **Database Queries**
  - All queries use $wpdb->prepare()
  - No direct user input in queries
  - Placeholders used correctly

### XSS Prevention

- [ ] **Cross-Site Scripting**
  - No reflected XSS vulnerabilities
  - No stored XSS vulnerabilities
  - No DOM-based XSS
  - All user-controlled data escaped

### CSRF Prevention

- [ ] **Cross-Site Request Forgery**
  - All state-changing actions use nonces
  - Nonces verified before processing
  - Referer checks where appropriate

### Direct File Access

- [ ] **PHP Files**
  - All PHP files have defined() check
  - `defined( 'ABSPATH' ) || exit;`
  - Or similar protection

### Sensitive Data

- [ ] **Data Exposure**
  - No API keys in code
  - No passwords in database (hashed)
  - No sensitive data in JS variables
  - Error messages don't expose paths

---

## Performance Testing

### Page Load Time

- [ ] **Frontend Performance**
  - Homepage loads in < 3 seconds
  - Single post/page loads in < 3 seconds
  - No render-blocking resources
  - Images optimized and lazy-loaded

- [ ] **Admin Performance**
  - Admin pages load quickly
  - No slow queries
  - Large datasets handled efficiently

### Database Performance

- [ ] **Query Optimization**
  - No N+1 query problems
  - Queries use indexes
  - Pagination implemented for large datasets
  - Transients used for expensive queries
  - Object cache utilized

### Asset Loading

- [ ] **JavaScript**
  - Only loaded where needed
  - Minified in production
  - No console errors
  - Bundle size reasonable (< 300KB)

- [ ] **CSS**
  - Only loaded where needed
  - Minified in production
  - No render blocking
  - Bundle size reasonable (< 100KB)

- [ ] **Images/Fonts**
  - Optimized and compressed
  - Correct formats (WebP where supported)
  - Fonts subset if custom

### Caching

- [ ] **Object Cache**
  - Transients used for expensive operations
  - Cache invalidation works correctly
  - No stale data issues

- [ ] **Page Cache**
  - Works with popular caching plugins
  - Cache cleared when content changes
  - Cache exclusions set correctly

### Resource Usage

- [ ] **Memory**
  - No memory leaks
  - Memory usage reasonable
  - Large operations chunked/batched

- [ ] **CPU**
  - No infinite loops
  - Background processes optimized
  - Cron jobs don't overload server

---

## Accessibility Testing

### WCAG 2.1 Level AA Compliance

- [ ] **Keyboard Navigation**
  - All interactive elements focusable
  - Tab order logical
  - Focus visible (outline/border)
  - No keyboard traps
  - Enter/Space activate buttons
  - ESC closes modals

- [ ] **Screen Reader**
  - All images have alt text
  - Form labels associated correctly
  - ARIA labels where needed
  - Landmark roles used
  - Focus announced correctly
  - Error messages announced

- [ ] **Color Contrast**
  - Text contrast ratio ≥ 4.5:1
  - Large text contrast ≥ 3:1
  - UI components contrast ≥ 3:1
  - No color-only communication

- [ ] **Forms**
  - Labels for all fields
  - Required fields indicated
  - Error messages descriptive
  - Success messages clear
  - Help text available

- [ ] **Media**
  - Videos have captions
  - Audio has transcripts
  - No auto-playing media
  - Media controls accessible

- [ ] **Responsive/Zoom**
  - Content readable at 200% zoom
  - No horizontal scrolling
  - Mobile-friendly
  - Touch targets ≥ 44x44px

### Testing Tools

- [ ] **Automated Testing**
  - axe DevTools scan passes
  - WAVE tool scan passes
  - Lighthouse accessibility score ≥ 90

- [ ] **Manual Testing**
  - Keyboard-only navigation works
  - Screen reader testing (NVDA/VoiceOver)
  - High contrast mode works

---

## Internationalization Testing

### Translation Readiness

- [ ] **Text Domains**
  - All strings have text domain
  - Text domain matches plugin slug
  - No variable text domains
  - Text domain in plugin header

- [ ] **Translation Functions**
  - `__()` for translated strings
  - `_e()` for echoed strings
  - `_n()` for plurals
  - `_x()` for context
  - `esc_html__()` / `esc_attr__()` for escaped output

- [ ] **Translation File**
  - POT file generated
  - All strings included
  - Translator comments added
  - No concatenated translations

### RTL (Right-to-Left) Testing

- [ ] **RTL Languages**
  - Layout mirrors correctly
  - Icons flip appropriately
  - Text alignment correct
  - No hardcoded left/right

- [ ] **RTL Stylesheet**
  - rtl.css file exists (if needed)
  - Bidirectional text works

### Locale Testing

- [ ] **Date/Time Formats**
  - Respects locale settings
  - Uses WordPress date functions
  - Timezone handling correct

- [ ] **Number Formats**
  - Respects locale number formats
  - Currency symbols correct

---

## User Experience Testing

### User Interface

- [ ] **Design Consistency**
  - Follows WordPress design patterns
  - Consistent with WP admin
  - Icons appropriate
  - Colors accessible

- [ ] **Clarity**
  - Labels clear and descriptive
  - Help text available
  - Tooltips where helpful
  - Examples provided

- [ ] **Feedback**
  - Loading indicators shown
  - Success messages displayed
  - Error messages helpful
  - Progress indicators for long tasks

### Error Handling

- [ ] **Error Messages**
  - User-friendly language
  - Specific (not generic)
  - Actionable (how to fix)
  - No technical jargon

- [ ] **Graceful Degradation**
  - JavaScript disabled fallback
  - Old browser support (or notice)
  - Missing dependencies handled

### Navigation & Flow

- [ ] **Intuitive Navigation**
  - Menu structure logical
  - Breadcrumbs where helpful
  - Back buttons work
  - Deep links work

- [ ] **Onboarding**
  - Welcome screen helpful (if present)
  - Setup wizard works (if present)
  - First-time user experience smooth
  - Documentation linked

---

## Documentation Review

### User Documentation

- [ ] **readme.txt** (WordPress.org)
  - Description clear and accurate
  - Installation instructions complete
  - FAQ answers common questions
  - Changelog up to date
  - Screenshots included and annotated
  - Tested up to version current
  - Requires PHP version specified
  - Tags relevant and accurate

- [ ] **In-App Documentation**
  - Help text accurate
  - Links work
  - Videos/GIFs helpful (if present)
  - Context-sensitive help available

### Developer Documentation

- [ ] **Code Documentation**
  - Functions documented (phpDoc)
  - Hooks documented
  - Filters documented
  - Examples provided

- [ ] **Technical Documentation**
  - API documentation complete
  - Hooks/filters list maintained
  - Extension points documented
  - Code samples work

### External Documentation

- [ ] **Website/Support Site**
  - Documentation up to date
  - Search works
  - Knowledge base complete
  - Tutorials/guides helpful

---

## Pre-Release Final Checks

### Code Quality

- [ ] **PHP Code**
  - PHPCS WordPress standards pass
  - PHPStan analysis passes (level 5+)
  - No PHP errors, warnings, notices
  - Code is documented
  - No debug code (var_dump, console.log)

- [ ] **JavaScript Code**
  - ESLint passes
  - TypeScript compiles (if applicable)
  - No console errors
  - Code is minified for production

- [ ] **CSS Code**
  - Stylelint passes
  - No unused styles
  - Minified for production
  - Prefixes added

### Version Control

- [ ] **Git**
  - Version number updated
  - Changelog updated
  - Tag created
  - Branch merged
  - Build files excluded from repo

### Build Process

- [ ] **Assets**
  - npm run build completes
  - No build errors
  - Sourcemaps generated (dev) or removed (prod)
  - Assets versioned/cache-busted

### File Preparation

- [ ] **Included Files**
  - Only necessary files in release
  - .distignore configured
  - No development files
  - No .git folder
  - No node_modules
  - No vendor/dev dependencies

### Testing in Production-Like Environment

- [ ] **Staging Environment**
  - Test on production-like setup
  - Test with production data (anonymized)
  - Test backup/restore
  - Test update process

### Compliance

- [ ] **Licensing**
  - License file included (LICENSE or license.txt)
  - License declared in headers
  - Third-party code attributed
  - GPL-compatible licenses

- [ ] **WordPress.org Guidelines**
  - No phone-home without opt-in
  - No obfuscated code
  - No crypto mining
  - No trademark violations
  - No sponsored links in free version

### Marketing Materials

- [ ] **Assets**
  - Banner images (772x250, 1544x500)
  - Icon (128x128, 256x256)
  - Screenshots (1200x900)
  - Video (if applicable)

---

## Sign-Off

Once all checklist items are complete:

- [ ] **Final Review**
  - All checklist items marked
  - Known issues documented
  - Release notes prepared
  - Support plan ready

- [ ] **Stakeholder Approval**
  - Product owner sign-off
  - QA lead sign-off
  - Security review complete

- [ ] **Ready to Release**
  - Version tagged in Git
  - WordPress.org submission prepared
  - Announcement drafted
  - Support resources ready

---

**Testing Date:** _______________
**Tested By:** _______________
**Version Tested:** _______________
**WordPress Version:** _______________
**PHP Version:** _______________

**Overall Status:** [ ] Pass [ ] Pass with known issues [ ] Fail

**Notes:**
```
[Add any additional notes, known issues, or follow-up items here]
```

---

## Using This Checklist

### For Different Release Types

**Patch Release (x.x.X)**
- Focus on: Functional Testing, Compatibility Testing (affected areas)
- Can skip: Full browser matrix, full plugin compatibility

**Minor Release (x.X.x)**
- Complete: All sections except multisite (if not supported)
- Priority: New features, compatibility, security

**Major Release (X.x.x)**
- Complete: **ALL** sections thoroughly
- Add: Beta testing period, user feedback collection

### Tips for Efficient Testing

1. **Automate what you can** - Use this for manual-only testing
2. **Create test accounts** - Different user roles, permissions
3. **Use browser profiles** - Fresh browser with no extensions
4. **Take screenshots** - Document issues as you find them
5. **Test systematically** - Don't skip sections
6. **Track time** - Know how long testing takes for planning

### When Issues Are Found

1. **Document** - Screenshot, browser, steps to reproduce
2. **Severity** - Critical (blocks release) vs. Can fix later
3. **Create tickets** - Track in your issue tracker
4. **Retest** - After fixes, retest the specific area
5. **Regression test** - Ensure fix didn't break anything else

---

**Questions?** See [TESTING-AUTOMATION-PROMPTS.md](./TESTING-AUTOMATION-PROMPTS.md) for AI assistance with specific testing scenarios.
