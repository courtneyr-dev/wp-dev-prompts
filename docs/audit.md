# WordPress Site Audit Guide

> A comprehensive guide to auditing WordPress sites for production readiness.

## Overview

This guide covers essential audits across five domains:
1. **Formatting & SEO** - Search optimization and meta configuration
2. **Performance** - Speed and resource optimization
3. **Accessibility** - WCAG compliance and inclusive design
4. **Privacy & Data** - GDPR compliance and data protection
5. **Security** - Site hardening and protection

## Quick Start

### Automated Audit Script

```bash
# Run the full audit suite
npm run audit:all

# Run specific category
npm run audit:a11y
npm run audit:performance
npm run audit:security
```

### Using the Checklist Data

```javascript
const checklist = require('./data/wpaudit-checklist.json');

// Get all high priority items
const highPriority = checklist.categories.flatMap(cat =>
  cat.items.filter(item => item.priority === 'high')
);

// Get automated tests only
const automated = checklist.categories.flatMap(cat =>
  cat.items.filter(item => item.automated)
);
```

---

## 1. Formatting & SEO

### Language Declaration

**Why it matters:** Screen readers, translation tools, and search engines use the language attribute.

```php
<!-- In header.php -->
<html <?php language_attributes(); ?>>
```

**Test:**
```bash
curl -s https://example.com | grep -o 'lang="[^"]*"'
```

### SEO Configuration

**Essential meta tags:**
```html
<meta name="description" content="Site description">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

**Validation tools:**
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Hey Meta](https://www.heymeta.com/)

### Broken Links

**Automated check:**
```bash
npx broken-link-checker https://example.com --ordered --recursive
```

**WordPress plugin:** Redirection (captures 404s and enables redirects)

### Responsive Design

**Test command:**
```bash
npx lighthouse https://example.com --only-categories=performance \
  --chrome-flags="--headless" --output=json
```

**Manual checklist:**
- [ ] Viewport meta tag present
- [ ] Touch targets ≥44x44 pixels
- [ ] Text readable without zooming
- [ ] No horizontal scrolling on mobile

---

## 2. Performance

### Core Web Vitals

| Metric | Good | Needs Work | Poor |
|--------|------|------------|------|
| LCP (Largest Contentful Paint) | ≤2.5s | ≤4.0s | >4.0s |
| FID (First Input Delay) | ≤100ms | ≤300ms | >300ms |
| CLS (Cumulative Layout Shift) | ≤0.1 | ≤0.25 | >0.25 |

### GZip Compression

**Test:**
```bash
curl -s -H 'Accept-Encoding: gzip,deflate' -I https://example.com \
  | grep -i 'content-encoding'
```

**Enable via .htaccess:**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### Image Optimization

**Automated audit:**
```bash
npx lighthouse https://example.com \
  --only-audits=uses-webp-images,offscreen-images,uses-optimized-images
```

**Best practices:**
- Use WebP format with fallbacks
- Implement lazy loading (`loading="lazy"`)
- Provide responsive images (`srcset`)
- Compress images (target: <100KB for most images)

### Caching Headers

**Test:**
```bash
curl -I https://example.com/wp-content/themes/theme/style.css | grep -E 'Cache-Control|Expires|ETag'
```

**Recommended headers:**
```
Cache-Control: public, max-age=31536000
```

### Full Performance Audit

```bash
# Lighthouse CLI
npx lighthouse https://example.com --output=html --output-path=./audit-report.html

# WebPageTest API
curl "https://www.webpagetest.org/runtest.php?url=https://example.com&f=json"
```

---

## 3. Accessibility

### Color Contrast

**WCAG Requirements:**
- Normal text: 4.5:1 minimum ratio
- Large text (18px+ or 14px+ bold): 3:1 minimum
- UI components: 3:1 minimum

**Test tools:**
```bash
# axe-core
npx axe https://example.com

# Pa11y
npx pa11y https://example.com
```

### Keyboard Navigation

**Required behaviors:**
- [ ] All interactive elements focusable
- [ ] Focus visible (outline or other indicator)
- [ ] Tab order logical
- [ ] No keyboard traps
- [ ] Skip link functional

**Playwright test:**
```typescript
test('keyboard navigation', async ({ page }) => {
  await page.goto('/');

  // Tab through all interactive elements
  const focusableElements = await page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const count = await focusableElements.count();

  for (let i = 0; i < count; i++) {
    await page.keyboard.press('Tab');
    const focused = await page.locator(':focus');
    await expect(focused).toBeVisible();
  }
});
```

### Image Alt Text

**Audit:**
```bash
curl -s https://example.com | grep -E '<img[^>]*>' | grep -v 'alt='
```

**Guidelines:**
- Descriptive: Convey meaning, not just "image of..."
- Decorative images: Use `alt=""`
- Complex images: Provide longer description nearby

### Skip Link

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<style>
.skip-link {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.skip-link:focus {
  position: fixed;
  top: 10px;
  left: 10px;
  width: auto;
  height: auto;
  padding: 10px 20px;
  background: #000;
  color: #fff;
  z-index: 100000;
}
</style>
```

### Full Accessibility Audit

```bash
# Lighthouse accessibility
npx lighthouse https://example.com --only-categories=accessibility --output=json

# axe with output
npx axe https://example.com --save ./a11y-results.json
```

---

## 4. Privacy & Data

### Privacy Policy

**Required elements:**
- What data is collected
- How data is used
- Third-party sharing
- User rights (access, deletion)
- Contact information
- Cookie policy

**WordPress integration:**
```php
// Check privacy policy page exists
$privacy_page = get_option('wp_page_for_privacy_policy');
```

### Analytics Compliance

**GDPR-compliant options:**
| Service | Privacy Level | Requires Consent |
|---------|---------------|------------------|
| Fathom | High | No |
| Plausible | High | No |
| Matomo (self-hosted) | High | Configurable |
| Google Analytics | Low | Yes |

### Local Font Hosting

**Why:** External fonts (Google Fonts) share visitor IPs.

**Test:**
```bash
curl -s https://example.com | grep -c 'fonts.googleapis.com'
```

**Solution:** Use OMGF plugin or manually host fonts.

---

## 5. Security

### SSL/HTTPS

**Test:**
```bash
# Check certificate
openssl s_client -connect example.com:443 -servername example.com

# Check redirect
curl -I http://example.com
```

**Required:**
- Valid SSL certificate
- HTTP → HTTPS redirect
- HSTS header (optional but recommended)

### WordPress Updates

```bash
# Check via WP-CLI
wp core check-update
wp plugin list --update=available
wp theme list --update=available
```

### Security Headers

**Test:**
```bash
curl -I https://example.com | grep -E 'X-Frame-Options|X-Content-Type-Options|Strict-Transport-Security'
```

**Recommended headers:**
```apache
Header set X-Frame-Options "SAMEORIGIN"
Header set X-Content-Type-Options "nosniff"
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header set Content-Security-Policy "default-src 'self'"
```

### Login Security

**Audit items:**
- [ ] No "admin" username
- [ ] Login attempt limiting enabled
- [ ] Strong passwords enforced
- [ ] Two-factor authentication available

```bash
# Check for admin user via WP-CLI
wp user list --field=user_login | grep -c '^admin$'
```

### Unused Code Cleanup

```bash
# List inactive plugins
wp plugin list --status=inactive

# List inactive themes (keep one default)
wp theme list --status=inactive
```

---

## CI Integration

### GitHub Actions Workflow

```yaml
name: Site Audit

on:
  schedule:
    - cron: '0 6 * * 1'  # Weekly Monday 6am
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://example.com
            https://example.com/sample-page/
          uploadArtifacts: true
          budgetPath: ./lighthouse-budget.json

      - name: Run axe accessibility tests
        run: |
          npx axe https://example.com --save ./axe-results.json

      - name: Check broken links
        run: |
          npx broken-link-checker https://example.com --ordered --recursive > ./broken-links.txt || true

      - name: Upload audit results
        uses: actions/upload-artifact@v4
        with:
          name: audit-results
          path: |
            ./axe-results.json
            ./broken-links.txt
            ./.lighthouseci/
```

### Lighthouse Budget

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["warn", {"minScore": 0.9}],
        "categories:seo": ["warn", {"minScore": 0.9}]
      }
    }
  }
}
```

---

## Related Resources

- [WPAudit Checklist](https://wpaudit.site/)
- [WebPageTest](https://www.webpagetest.org/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)
- [Security Headers](https://securityheaders.com/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
