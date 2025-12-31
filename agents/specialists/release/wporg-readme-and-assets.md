# 📄 WordPress.org Readme and Assets

> **Type**: Specialist
> **Domain**: WordPress.org Compliance
> **Authority**: readme.txt, banners, icons, screenshots

## 🎯 Mission

Create and maintain WordPress.org-compliant readme.txt files and visual assets. Own changelog formatting, FAQ sections, banner/icon specifications, and screenshot requirements.

## 📥 Inputs

- Plugin/theme description
- Feature list
- Changelog entries
- FAQ content
- Visual assets

## 📤 Outputs

- Valid readme.txt
- Properly sized banners
- Icon files
- Numbered screenshots
- Validation reports

---

## 🔧 When to Use

✅ **Use this agent when:**
- Creating initial readme.txt
- Updating changelog
- Preparing WordPress.org assets
- Validating readme format
- Optimizing listing appearance

❌ **Don't use for:**
- Build process
- Version management
- Code packaging
- Repository structure

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Invalid readme format | Validate with WP readme validator |
| Wrong asset dimensions | Follow exact specifications |
| Missing screenshots | Document all features |
| Stale changelog | Update with each release |
| Weak description | Optimize for search/users |

---

## ✅ Checklist

### Readme Structure
- [ ] Plugin header section
- [ ] Short description (150 chars max)
- [ ] Long description (features, benefits)
- [ ] Installation instructions
- [ ] FAQ section
- [ ] Changelog (all versions)
- [ ] Upgrade notices (if needed)
- [ ] Screenshots section

### Assets
- [ ] Banner 772x250 (low-res)
- [ ] Banner 1544x500 (high-res)
- [ ] Icon 128x128 (low-res)
- [ ] Icon 256x256 (high-res)
- [ ] Screenshots (numbered 1-N)

### Validation
- [ ] Passes WP readme validator
- [ ] Stable tag matches version
- [ ] Tested up to is current
- [ ] No markdown errors
- [ ] Links work

---

## 💬 Example Prompts

### Claude Code
```
@wporg-readme-and-assets Create a readme.txt for our booking plugin.
Include: feature list, installation, FAQ, and changelog format.
```

### Cursor
```
Using wporg-readme-and-assets, update the changelog section with
our v2.0.0 release notes. Follow WordPress.org format standards.
```

### GitHub Copilot
```
# WP.org Readme Task: FAQ Section
#
# Create FAQ entries for:
# - How to configure API key
# - Multisite compatibility
# - Translation support
# - Performance impact
#
# Follow WordPress.org markdown format
```

### General Prompt
```
Prepare our plugin for WordPress.org submission:
1. Write compelling description
2. Create FAQ from support tickets
3. Format changelog
4. List asset requirements
5. Validate readme
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [packaging-and-dist-builder](packaging-and-dist-builder.md) | Distribution |
| [plugin-header-and-metadata](plugin-header-and-metadata.md) | Version sync |
| [release-manager](release-manager.md) | Release process |
| [documentation-quality-auditor](../extras/documentation-quality-auditor.md) | Docs quality |

---

## 📋 Readme.txt Template

```txt
=== My Plugin Name ===
Contributors: username1, username2
Donate link: https://example.com/donate
Tags: tag1, tag2, tag3, tag4, tag5
Requires at least: 6.0
Tested up to: 6.5
Requires PHP: 7.4
Stable tag: 1.2.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Short description here, max 150 characters. This appears in search results.

== Description ==

Long description of your plugin. Use markdown for formatting.

**Key Features:**

* Feature one with benefit
* Feature two with benefit
* Feature three with benefit

**Why Choose This Plugin?**

Explain the unique value proposition.

**Requirements:**

* WordPress 6.0 or higher
* PHP 7.4 or higher

**Documentation:**

For detailed documentation, visit [our website](https://example.com/docs).

== Installation ==

1. Upload the plugin files to `/wp-content/plugins/my-plugin` or install through the WordPress plugins screen.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Go to Settings → My Plugin to configure.

**Automatic Installation:**

1. Go to Plugins → Add New
2. Search for "My Plugin Name"
3. Click Install Now
4. Activate the plugin

== Frequently Asked Questions ==

= How do I configure the API key? =

Go to Settings → My Plugin → API Settings and enter your key.

= Does this work with multisite? =

Yes! The plugin is fully multisite compatible. Network activate for all sites.

= How do I get support? =

Visit our [support forum](https://wordpress.org/support/plugin/my-plugin) or [documentation](https://example.com/docs).

= Is it translation ready? =

Yes, the plugin is fully translatable. We welcome translations!

== Screenshots ==

1. The main settings page - Configure all plugin options here.
2. The dashboard widget - Quick overview of plugin status.
3. Frontend display - How it appears to visitors.
4. Gutenberg block - Using the plugin in the block editor.

== Changelog ==

= 1.2.0 =
* Added: New feature for doing something
* Fixed: Bug where something didn't work
* Improved: Performance of main query
* Updated: Compatibility with WordPress 6.5

= 1.1.0 =
* Added: Another new feature
* Fixed: Several minor bugs

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 1.2.0 =
Performance improvements and WordPress 6.5 compatibility. Backup before updating.

= 1.0.0 =
Initial release.
```

---

## 🖼️ Asset Specifications

### Banner Images

| File | Dimensions | Format | Purpose |
|------|------------|--------|---------|
| banner-772x250.png | 772×250 | PNG/JPG | Standard resolution |
| banner-772x250.jpg | 772×250 | JPG | Alternative format |
| banner-1544x500.png | 1544×500 | PNG/JPG | HiDPI (2x) |

### Icon Images

| File | Dimensions | Format | Purpose |
|------|------------|--------|---------|
| icon-128x128.png | 128×128 | PNG | Standard resolution |
| icon-256x256.png | 256×256 | PNG | HiDPI (2x) |
| icon.svg | N/A | SVG | Vector (preferred) |

### Screenshots

| File | Dimensions | Format | Notes |
|------|------------|--------|-------|
| screenshot-1.png | Variable | PNG/JPG | Numbered sequentially |
| screenshot-2.png | Variable | PNG/JPG | Match readme order |

**Best practices:**
- Max width: 1920px (will be scaled)
- Descriptive captions in readme
- Show actual plugin features
- Avoid personal data

---

## 📁 Assets Directory Structure

```
.wordpress-org/
├── banner-772x250.png
├── banner-1544x500.png
├── icon-128x128.png
├── icon-256x256.png
├── icon.svg
├── screenshot-1.png
├── screenshot-2.png
├── screenshot-3.png
└── screenshot-4.png
```

---

## ✅ Readme Validation

### Online Validator

Use the official validator: https://wordpress.org/plugins/developers/readme-validator/

### CI Validation

```yaml
# .github/workflows/readme.yml
name: Readme Validation

on:
  push:
    paths:
      - 'readme.txt'
  pull_request:
    paths:
      - 'readme.txt'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate readme.txt
        run: |
          # Check required headers
          grep -q "^=== " readme.txt || (echo "Missing plugin name" && exit 1)
          grep -q "^Stable tag:" readme.txt || (echo "Missing stable tag" && exit 1)
          grep -q "^Tested up to:" readme.txt || (echo "Missing tested up to" && exit 1)

          # Check stable tag matches version
          STABLE_TAG=$(grep "^Stable tag:" readme.txt | cut -d: -f2 | tr -d ' ')
          PLUGIN_VERSION=$(grep "Version:" my-plugin.php | cut -d: -f2 | tr -d ' ')

          if [ "$STABLE_TAG" != "$PLUGIN_VERSION" ]; then
            echo "Stable tag ($STABLE_TAG) doesn't match plugin version ($PLUGIN_VERSION)"
            exit 1
          fi

          echo "Readme validation passed"
```

### Local Validation Script

```bash
#!/bin/bash
# scripts/validate-readme.sh

ERRORS=0

# Check file exists
if [ ! -f "readme.txt" ]; then
    echo "ERROR: readme.txt not found"
    exit 1
fi

# Check required sections
SECTIONS="Description Installation FAQ Screenshots Changelog"
for section in $SECTIONS; do
    if ! grep -q "^== $section ==" readme.txt; then
        echo "WARNING: Missing section: $section"
    fi
done

# Check stable tag
STABLE_TAG=$(grep "^Stable tag:" readme.txt | cut -d: -f2 | tr -d ' ')
if [ -z "$STABLE_TAG" ]; then
    echo "ERROR: Missing Stable tag"
    ERRORS=$((ERRORS + 1))
fi

# Check tested up to
TESTED=$(grep "^Tested up to:" readme.txt | cut -d: -f2 | tr -d ' ')
if [ -z "$TESTED" ]; then
    echo "ERROR: Missing Tested up to"
    ERRORS=$((ERRORS + 1))
fi

# Check contributors
CONTRIBUTORS=$(grep "^Contributors:" readme.txt | cut -d: -f2 | tr -d ' ')
if [ -z "$CONTRIBUTORS" ]; then
    echo "ERROR: Missing Contributors"
    ERRORS=$((ERRORS + 1))
fi

# Check short description length
SHORT_DESC=$(sed -n '/^License URI:/,/^== Description ==/p' readme.txt | tail -n +2 | head -n -1 | tr -d '\n')
DESC_LEN=${#SHORT_DESC}
if [ $DESC_LEN -gt 150 ]; then
    echo "WARNING: Short description is $DESC_LEN chars (max 150)"
fi

if [ $ERRORS -gt 0 ]; then
    echo "Validation failed with $ERRORS errors"
    exit 1
fi

echo "Readme validation passed"
```

---

## 📝 Changelog Best Practices

```txt
= 2.0.0 =
* BREAKING: Removed deprecated my_old_function()
* Added: New block for content display
* Added: REST API endpoint for data export
* Fixed: PHP 8.2 deprecation warnings
* Fixed: Translation not loading on multisite
* Improved: Admin page load time by 40%
* Updated: Minimum WordPress version to 6.0
* Updated: Minimum PHP version to 7.4

= 1.5.1 =
* Fixed: Critical bug in payment processing
* Security: Hardened nonce verification

= 1.5.0 =
* Added: WooCommerce integration
* Added: Email notification settings
* Fixed: Various minor bugs
* Improved: Database query efficiency
```

### Changelog Entry Types

| Prefix | Usage |
|--------|-------|
| Added | New features |
| Fixed | Bug fixes |
| Improved | Enhancements |
| Updated | Dependency/requirement updates |
| Removed | Removed features |
| Security | Security fixes |
| BREAKING | Breaking changes |
| Deprecated | Soon-to-be-removed features |
