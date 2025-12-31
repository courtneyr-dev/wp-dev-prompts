# 📦 Packaging and Dist Builder

> **Type**: Specialist
> **Domain**: Build & Distribution
> **Authority**: Build process, asset bundling, distribution packaging

## 🎯 Mission

Build production-ready distribution packages for WordPress plugins and themes. Own asset compilation, file exclusion, ZIP generation, and WordPress.org SVN deployment preparation.

## 📥 Inputs

- Source code
- Build configuration
- Distribution requirements
- Target platforms (WordPress.org, private, etc.)

## 📤 Outputs

- Compiled assets
- Distribution ZIP
- .distignore configuration
- Build scripts
- SVN-ready structure

---

## 🔧 When to Use

✅ **Use this agent when:**
- Setting up build pipelines
- Creating distribution packages
- Configuring asset compilation
- Preparing WordPress.org deployment
- Optimizing build output

❌ **Don't use for:**
- Version number management
- Changelog writing
- Release notes
- Repository structure

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Dev files in distribution | Proper .distignore |
| Missing compiled assets | Build before package |
| Large package size | Optimize and exclude |
| Wrong file permissions | Set in build script |
| Missing translation files | Include in build |

---

## ✅ Checklist

### Build Process
- [ ] All assets compiled (JS, CSS)
- [ ] Assets minified for production
- [ ] Source maps excluded
- [ ] Translation files generated

### Exclusions
- [ ] No node_modules
- [ ] No vendor dev dependencies
- [ ] No test files
- [ ] No build configuration
- [ ] No source files (if compiled)

### Package Validation
- [ ] ZIP structure correct
- [ ] All required files present
- [ ] No hidden files
- [ ] Correct permissions
- [ ] Size is reasonable

### WordPress.org
- [ ] SVN structure ready
- [ ] Assets folder prepared
- [ ] readme.txt valid
- [ ] No disallowed files

---

## 💬 Example Prompts

### Claude Code
```
@packaging-and-dist-builder Set up the build pipeline for our block
plugin. Need webpack for JS, PostCSS for styles, and ZIP generation.
```

### Cursor
```
Using packaging-and-dist-builder, create a .distignore file for our
plugin. Exclude all dev files but include compiled assets and
translation files.
```

### GitHub Copilot
```
# Packaging Task: WordPress.org Deployment
#
# Create deployment script that:
# 1. Builds assets for production
# 2. Creates clean distribution
# 3. Prepares SVN structure
# 4. Validates package
#
# Include: CI integration, version tagging
```

### General Prompt
```
Set up the complete build and packaging pipeline:
1. npm run build for assets
2. Composer install --no-dev
3. Generate POT file
4. Create distribution ZIP
5. Validate against WordPress.org requirements
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [release-manager](release-manager.md) | Release coordination |
| [wporg-readme-and-assets](wporg-readme-and-assets.md) | WP.org assets |
| [plugin-header-and-metadata](plugin-header-and-metadata.md) | Version consistency |
| [github-actions-architect](../ci/github-actions-architect.md) | CI integration |

---

## 📋 Build Configuration

### Package.json Scripts

```json
{
    "scripts": {
        "build": "npm run build:js && npm run build:css && npm run build:pot",
        "build:js": "wp-scripts build",
        "build:css": "postcss src/css/*.css -d build/css",
        "build:pot": "wp i18n make-pot . languages/my-plugin.pot",
        "build:prod": "NODE_ENV=production npm run build",
        "package": "npm run build:prod && npm run create-zip",
        "create-zip": "node scripts/create-zip.js"
    }
}
```

### Webpack Configuration

```javascript
// webpack.config.js
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'admin': './src/js/admin.js',
        'frontend': './src/js/frontend.js',
        'blocks': './src/blocks/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js',
    },
};
```

---

## 📁 .distignore

```
# Build and dev files
/.git
/.github
/node_modules
/vendor-dev
/tests
/src
/.wordpress-org

# Config files
.babelrc
.distignore
.editorconfig
.eslintrc.js
.gitignore
.npmrc
.phpcs.xml.dist
.stylelintrc.json
.wp-env.json
composer.json
composer.lock
package.json
package-lock.json
phpstan.neon.dist
phpunit.xml.dist
webpack.config.js
postcss.config.js
Makefile

# Documentation
/docs
CONTRIBUTING.md
CHANGELOG.md
CODE_OF_CONDUCT.md

# IDE
/.idea
/.vscode
*.sublime-project
*.sublime-workspace

# OS files
.DS_Store
Thumbs.db
```

---

## 🔧 Build Scripts

### Create ZIP Script

```javascript
// scripts/create-zip.js
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { execSync } = require('child_process');

const packageJson = require('../package.json');
const pluginSlug = packageJson.name;
const version = packageJson.version;

async function createZip() {
    const distDir = path.join(__dirname, '..', 'dist');
    const zipPath = path.join(distDir, `${pluginSlug}-${version}.zip`);

    // Create dist directory
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
    }

    // Create ZIP
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`Created ${zipPath} (${archive.pointer()} bytes)`);
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    // Get files respecting .distignore
    const files = execSync('git ls-files')
        .toString()
        .trim()
        .split('\n')
        .filter(file => !shouldIgnore(file));

    // Add each file
    for (const file of files) {
        archive.file(file, { name: `${pluginSlug}/${file}` });
    }

    // Add built files
    archive.directory('build/', `${pluginSlug}/build/`);
    archive.directory('languages/', `${pluginSlug}/languages/`);

    await archive.finalize();
}

function shouldIgnore(file) {
    const distignore = fs.readFileSync('.distignore', 'utf8')
        .split('\n')
        .filter(line => line && !line.startsWith('#'))
        .map(line => line.trim());

    return distignore.some(pattern => {
        if (pattern.startsWith('/')) {
            return file.startsWith(pattern.slice(1));
        }
        return file.includes(pattern);
    });
}

createZip();
```

### Makefile Targets

```makefile
.PHONY: build package release clean

PLUGIN_SLUG := my-plugin
VERSION := $(shell node -p "require('./package.json').version")

build:
	npm run build:prod
	composer install --no-dev --optimize-autoloader

package: build
	@echo "Creating distribution package..."
	mkdir -p dist
	rsync -av --exclude-from=.distignore . dist/$(PLUGIN_SLUG)/
	cd dist && zip -r $(PLUGIN_SLUG)-$(VERSION).zip $(PLUGIN_SLUG)
	rm -rf dist/$(PLUGIN_SLUG)
	@echo "Package created: dist/$(PLUGIN_SLUG)-$(VERSION).zip"

validate-package:
	@echo "Validating package..."
	unzip -l dist/$(PLUGIN_SLUG)-$(VERSION).zip | head -50
	@echo "Package size: $$(du -h dist/$(PLUGIN_SLUG)-$(VERSION).zip | cut -f1)"

clean:
	rm -rf dist build node_modules vendor
```

---

## 🌐 WordPress.org SVN Structure

```
plugin-name/
├── assets/                    # SVN assets folder
│   ├── banner-772x250.png
│   ├── banner-1544x500.png
│   ├── icon-128x128.png
│   ├── icon-256x256.png
│   └── screenshot-1.png
├── tags/
│   ├── 1.0.0/                # Each version
│   │   └── [plugin files]
│   └── 1.1.0/
│       └── [plugin files]
└── trunk/                     # Development version
    └── [plugin files]
```

### SVN Deployment Script

```bash
#!/bin/bash
# scripts/deploy-wporg.sh

set -e

PLUGIN_SLUG="my-plugin"
VERSION=$(node -p "require('./package.json').version")
SVN_URL="https://plugins.svn.wordpress.org/$PLUGIN_SLUG"
SVN_DIR="$HOME/svn/$PLUGIN_SLUG"

echo "Deploying $PLUGIN_SLUG version $VERSION to WordPress.org..."

# Build
npm run build:prod
composer install --no-dev --optimize-autoloader

# Checkout SVN
if [ ! -d "$SVN_DIR" ]; then
    svn checkout "$SVN_URL" "$SVN_DIR"
else
    svn update "$SVN_DIR"
fi

# Clean trunk
rm -rf "$SVN_DIR/trunk/*"

# Copy files to trunk
rsync -av --exclude-from=.distignore . "$SVN_DIR/trunk/"

# Copy assets
cp -r .wordpress-org/* "$SVN_DIR/assets/"

# Create tag
mkdir -p "$SVN_DIR/tags/$VERSION"
cp -r "$SVN_DIR/trunk/"* "$SVN_DIR/tags/$VERSION/"

# Commit
cd "$SVN_DIR"
svn add --force .
svn status | grep '^!' | awk '{print $2}' | xargs -r svn delete
svn commit -m "Release $VERSION"

echo "Deployed $PLUGIN_SLUG $VERSION to WordPress.org"
```

---

## ⚙️ GitHub Actions

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - name: Install dependencies
        run: |
          npm ci
          composer install --no-dev

      - name: Build
        run: npm run build:prod

      - name: Create package
        run: make package

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: my-plugin-${{ github.ref_name }}
          path: dist/*.zip

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          files: dist/*.zip
          generate_release_notes: true
```

---

## ✅ Package Validation

```bash
#!/bin/bash
# scripts/validate-package.sh

ZIP_FILE=$1

if [ -z "$ZIP_FILE" ]; then
    echo "Usage: ./validate-package.sh <zip-file>"
    exit 1
fi

echo "Validating $ZIP_FILE..."

# Check ZIP exists
if [ ! -f "$ZIP_FILE" ]; then
    echo "ERROR: File not found"
    exit 1
fi

# Extract and check
TEMP_DIR=$(mktemp -d)
unzip -q "$ZIP_FILE" -d "$TEMP_DIR"

PLUGIN_DIR=$(ls "$TEMP_DIR")
PLUGIN_PATH="$TEMP_DIR/$PLUGIN_DIR"

# Check main plugin file
if [ ! -f "$PLUGIN_PATH/$PLUGIN_DIR.php" ]; then
    echo "ERROR: Main plugin file not found"
    exit 1
fi

# Check for forbidden files
FORBIDDEN="node_modules vendor-dev .git tests phpunit.xml"
for item in $FORBIDDEN; do
    if [ -e "$PLUGIN_PATH/$item" ]; then
        echo "ERROR: Forbidden file/directory found: $item"
        exit 1
    fi
done

# Check required files
REQUIRED="readme.txt"
for item in $REQUIRED; do
    if [ ! -f "$PLUGIN_PATH/$item" ]; then
        echo "ERROR: Required file not found: $item"
        exit 1
    fi
done

# Check file size
SIZE=$(du -sm "$ZIP_FILE" | cut -f1)
if [ "$SIZE" -gt 10 ]; then
    echo "WARNING: Package size is ${SIZE}MB (recommended < 10MB)"
fi

echo "Validation passed!"
rm -rf "$TEMP_DIR"
```
