# 🏷️ Plugin Header and Metadata

> **Type**: Specialist
> **Domain**: Version Management
> **Authority**: Plugin headers, version consistency, metadata

## 🎯 Mission

Maintain consistency across all version and metadata references. Own plugin headers, package.json, composer.json, readme.txt stable tag, and constant definitions to ensure they all match.

## 📥 Inputs

- Current version files
- New version number
- Plugin metadata changes
- Changelog entries

## 📤 Outputs

- Updated plugin headers
- Synchronized version numbers
- Validation reports
- Version bump scripts

---

## 🔧 When to Use

✅ **Use this agent when:**
- Bumping version numbers
- Adding plugin headers
- Syncing metadata across files
- Validating version consistency
- Creating new plugins

❌ **Don't use for:**
- Changelog content
- Asset creation
- Build process
- Distribution packaging

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Mismatched versions | Automated sync script |
| Missing required headers | Header checklist |
| Wrong text domain | Match plugin slug |
| Stale "Tested up to" | Update on each WP release |
| Inconsistent author info | Single source of truth |

---

## ✅ Checklist

### Required Headers
- [ ] Plugin Name
- [ ] Plugin URI
- [ ] Description
- [ ] Version
- [ ] Author
- [ ] Author URI
- [ ] License
- [ ] License URI
- [ ] Text Domain
- [ ] Domain Path (if translations)
- [ ] Requires at least
- [ ] Requires PHP
- [ ] Tested up to (recommended)

### Version Locations
- [ ] Main plugin file header
- [ ] package.json
- [ ] composer.json (if applicable)
- [ ] readme.txt Stable tag
- [ ] PHP constant (MY_PLUGIN_VERSION)

### Sync Validation
- [ ] All versions match
- [ ] Text domain matches slug
- [ ] WP/PHP requirements consistent
- [ ] License consistent

---

## 💬 Example Prompts

### Claude Code
```
@plugin-header-and-metadata Bump version from 1.2.0 to 1.3.0
across all files. Update changelog and ensure consistency.
```

### Cursor
```
Using plugin-header-and-metadata, validate that all version
references match and fix any inconsistencies.
```

### GitHub Copilot
```
# Metadata Task: Create Plugin Headers
#
# New plugin: my-awesome-plugin
# Version: 1.0.0
# Requires WP: 6.0
# Requires PHP: 8.2
#
# Create headers for main plugin file following WP standards
```

### General Prompt
```
Set up version management for a new plugin:
1. Create plugin header
2. Set up package.json
3. Create version constant
4. Add version sync script
5. Add pre-commit validation
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [wporg-readme-and-assets](wporg-readme-and-assets.md) | Stable tag sync |
| [release-manager](release-manager.md) | Release process |
| [packaging-and-dist-builder](packaging-and-dist-builder.md) | Build process |
| [backward-compatibility](../wordpress/backward-compatibility.md) | Version policy |

---

## 📋 Plugin Header Format

### Main Plugin File

```php
<?php
/**
 * Plugin Name:       My Awesome Plugin
 * Plugin URI:        https://example.com/my-awesome-plugin
 * Description:       A short description of what this plugin does.
 * Version:           1.2.0
 * Author:            Your Name
 * Author URI:        https://example.com
 * License:           GPL-2.0+
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       my-awesome-plugin
 * Domain Path:       /languages
 * Requires at least: 6.9
 * Requires PHP:      8.2
 * Tested up to:      6.5
 * Network:           true
 *
 * @package MyAwesomePlugin
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Plugin version constant.
define( 'MY_AWESOME_PLUGIN_VERSION', '1.2.0' );
define( 'MY_AWESOME_PLUGIN_FILE', __FILE__ );
define( 'MY_AWESOME_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'MY_AWESOME_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
```

### Block Plugin Headers (block.json)

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "my-plugin/my-block",
    "version": "1.2.0",
    "title": "My Block",
    "category": "widgets",
    "description": "A custom block.",
    "supports": {
        "html": false
    },
    "textdomain": "my-awesome-plugin",
    "editorScript": "file:./build/index.js",
    "editorStyle": "file:./build/index.css",
    "style": "file:./build/style-index.css"
}
```

---

## 📦 Package Files

### package.json

```json
{
    "name": "my-awesome-plugin",
    "version": "1.2.0",
    "description": "A short description of what this plugin does.",
    "author": "Your Name <email@example.com>",
    "license": "GPL-2.0-or-later",
    "homepage": "https://example.com/my-awesome-plugin",
    "repository": {
        "type": "git",
        "url": "https://github.com/username/my-awesome-plugin"
    },
    "bugs": {
        "url": "https://github.com/username/my-awesome-plugin/issues"
    },
    "keywords": [
        "wordpress",
        "plugin"
    ],
    "scripts": {
        "version": "node scripts/sync-version.js"
    }
}
```

### composer.json

```json
{
    "name": "username/my-awesome-plugin",
    "version": "1.2.0",
    "description": "A short description of what this plugin does.",
    "type": "wordpress-plugin",
    "license": "GPL-2.0-or-later",
    "authors": [
        {
            "name": "Your Name",
            "email": "email@example.com"
        }
    ],
    "require": {
        "php": ">=7.4"
    }
}
```

---

## 🔄 Version Sync Script

```javascript
// scripts/sync-version.js
const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const newVersion = packageJson.version;

console.log(`Syncing version to ${newVersion}...`);

// Files to update
const files = [
    {
        path: 'my-awesome-plugin.php',
        patterns: [
            [/Version:\s*[\d.]+/, `Version:           ${newVersion}`],
            [/MY_AWESOME_PLUGIN_VERSION',\s*'[\d.]+'/, `MY_AWESOME_PLUGIN_VERSION', '${newVersion}'`],
        ],
    },
    {
        path: 'readme.txt',
        patterns: [
            [/Stable tag:\s*[\d.]+/, `Stable tag: ${newVersion}`],
        ],
    },
    {
        path: 'composer.json',
        patterns: [
            [/"version":\s*"[\d.]+"/, `"version": "${newVersion}"`],
        ],
    },
    {
        path: 'src/blocks/my-block/block.json',
        patterns: [
            [/"version":\s*"[\d.]+"/, `"version": "${newVersion}"`],
        ],
    },
];

for (const file of files) {
    const filePath = path.join(__dirname, '..', file.path);

    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${file.path} (not found)`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    for (const [pattern, replacement] of file.patterns) {
        content = content.replace(pattern, replacement);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file.path}`);
}

console.log('Version sync complete!');
```

---

## ✅ Version Validation

```bash
#!/bin/bash
# scripts/validate-versions.sh

set -e

echo "Validating version consistency..."

# Get version from package.json
PKG_VERSION=$(node -p "require('./package.json').version")
echo "package.json: $PKG_VERSION"

# Get version from main plugin file
PLUGIN_VERSION=$(grep "Version:" my-awesome-plugin.php | head -1 | sed 's/.*Version:\s*//' | tr -d ' ')
echo "Plugin header: $PLUGIN_VERSION"

# Get version from constant
CONST_VERSION=$(grep "MY_AWESOME_PLUGIN_VERSION" my-awesome-plugin.php | grep define | sed "s/.*'\([0-9.]*\)'.*/\1/")
echo "PHP constant: $CONST_VERSION"

# Get version from readme.txt
README_VERSION=$(grep "Stable tag:" readme.txt | sed 's/Stable tag:\s*//' | tr -d ' ')
echo "readme.txt: $README_VERSION"

# Compare
ERRORS=0

if [ "$PKG_VERSION" != "$PLUGIN_VERSION" ]; then
    echo "ERROR: package.json ($PKG_VERSION) != plugin header ($PLUGIN_VERSION)"
    ERRORS=$((ERRORS + 1))
fi

if [ "$PKG_VERSION" != "$CONST_VERSION" ]; then
    echo "ERROR: package.json ($PKG_VERSION) != PHP constant ($CONST_VERSION)"
    ERRORS=$((ERRORS + 1))
fi

if [ "$PKG_VERSION" != "$README_VERSION" ]; then
    echo "ERROR: package.json ($PKG_VERSION) != readme.txt ($README_VERSION)"
    ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -gt 0 ]; then
    echo "Version validation failed with $ERRORS errors"
    exit 1
fi

echo "All versions match: $PKG_VERSION"
```

---

## ⚙️ Pre-commit Hook

```bash
#!/bin/bash
# .husky/pre-commit

# Validate versions before commit
./scripts/validate-versions.sh

# Ensure text domain matches
SLUG=$(node -p "require('./package.json').name")
TEXT_DOMAIN=$(grep "Text Domain:" my-awesome-plugin.php | sed 's/.*Text Domain:\s*//' | tr -d ' ')

if [ "$SLUG" != "$TEXT_DOMAIN" ]; then
    echo "ERROR: Plugin slug ($SLUG) != text domain ($TEXT_DOMAIN)"
    exit 1
fi
```

---

## 📋 Version Bump Workflow

```yaml
# .github/workflows/version-bump.yml
name: Version Bump

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'New version number'
        required: true
      type:
        description: 'Release type'
        required: true
        type: choice
        options:
          - patch
          - minor
          - major

jobs:
  bump:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Bump version
        run: |
          npm version ${{ inputs.version }} --no-git-tag-version
          npm run version

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          title: "Release v${{ inputs.version }}"
          commit-message: "chore: bump version to ${{ inputs.version }}"
          branch: "release/v${{ inputs.version }}"
          body: |
            ## Version Bump to ${{ inputs.version }}

            - [ ] Version updated in all files
            - [ ] Changelog updated
            - [ ] readme.txt stable tag updated
            - [ ] Tests passing
```
