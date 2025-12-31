# Packaging and Release Validation

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Validating plugin/theme packages for distribution

<skill>
<summary>
Automated validation of WordPress plugin and theme packages to ensure clean, correct releases.
</summary>

<knowledge>
## What to Validate

### Package Contents

- **Required files present** - Main file, readme.txt, license
- **No dev files** - node_modules, .git, tests, configs
- **Compiled assets** - Build directory present
- **Version consistency** - All version numbers match
- **No secrets** - No .env, credentials, API keys

### Quality Checks

- **File size** - Not bloated
- **PHP syntax** - No errors
- **Asset optimization** - Minified CSS/JS
- **Translation files** - POT present and valid

## Package Validation Script

### PHP Validator

```php
<?php
/**
 * Validate plugin package for release.
 */
class Package_Validator {

    private string $package_path;
    private array $errors = [];
    private array $warnings = [];

    public function __construct( string $package_path ) {
        $this->package_path = $package_path;
    }

    /**
     * Run all validations.
     */
    public function validate(): bool {
        $this->validate_required_files();
        $this->validate_no_dev_files();
        $this->validate_version_consistency();
        $this->validate_file_sizes();
        $this->validate_php_syntax();
        $this->validate_assets();
        $this->validate_translations();

        return empty( $this->errors );
    }

    /**
     * Validate required files exist.
     */
    private function validate_required_files(): void {
        $slug = basename( $this->package_path );

        $required = [
            "{$slug}.php"  => 'Main plugin file',
            'readme.txt'   => 'WordPress readme',
        ];

        foreach ( $required as $file => $description ) {
            if ( ! file_exists( $this->package_path . '/' . $file ) ) {
                $this->errors[] = "Missing required file: {$file} ({$description})";
            }
        }

        // Recommended files
        $recommended = [
            'LICENSE'      => 'License file',
            'languages/'   => 'Translation directory',
        ];

        foreach ( $recommended as $file => $description ) {
            $path = $this->package_path . '/' . $file;
            if ( ! file_exists( $path ) && ! is_dir( $path ) ) {
                $this->warnings[] = "Missing recommended: {$file} ({$description})";
            }
        }
    }

    /**
     * Validate no development files.
     */
    private function validate_no_dev_files(): void {
        $forbidden = [
            '.git',
            '.github',
            '.gitignore',
            '.gitattributes',
            'node_modules',
            'vendor',  // If dev dependencies only
            '.env',
            '.env.local',
            'composer.lock',
            'package-lock.json',
            'yarn.lock',
            'phpunit.xml',
            'phpunit.xml.dist',
            '.phpcs.xml',
            '.phpcs.xml.dist',
            'phpstan.neon',
            'phpstan.neon.dist',
            '.eslintrc',
            '.eslintrc.js',
            '.stylelintrc',
            'tests',
            'src',  // If built to build/
            'webpack.config.js',
            'babel.config.js',
            'tsconfig.json',
            '.editorconfig',
            'Makefile',
            'docker-compose.yml',
            '.wp-env.json',
        ];

        foreach ( $forbidden as $file ) {
            $path = $this->package_path . '/' . $file;
            if ( file_exists( $path ) || is_dir( $path ) ) {
                $this->errors[] = "Development file/folder should not be in package: {$file}";
            }
        }

        // Check for test files in any directory
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator( $this->package_path )
        );

        foreach ( $iterator as $file ) {
            if ( $file->isFile() ) {
                $filename = $file->getFilename();

                // Test files
                if ( preg_match( '/Test\.php$/', $filename ) ) {
                    $this->errors[] = "Test file found: " . $file->getPathname();
                }

                // Backup files
                if ( preg_match( '/\.(bak|orig|tmp)$/', $filename ) ) {
                    $this->errors[] = "Backup file found: " . $file->getPathname();
                }

                // Debug files
                if ( preg_match( '/debug\.log$/', $filename ) ) {
                    $this->errors[] = "Debug log found: " . $file->getPathname();
                }
            }
        }
    }

    /**
     * Validate version consistency.
     */
    private function validate_version_consistency(): void {
        $slug = basename( $this->package_path );

        // Get version from main plugin file
        $main_file = $this->package_path . "/{$slug}.php";
        $plugin_version = null;

        if ( file_exists( $main_file ) ) {
            $content = file_get_contents( $main_file );
            if ( preg_match( '/Version:\s*([0-9.]+)/i', $content, $matches ) ) {
                $plugin_version = $matches[1];
            }

            // Check for version constant
            if ( preg_match( "/define\s*\(\s*['\"]" . strtoupper( str_replace( '-', '_', $slug ) ) . "_VERSION['\"]\s*,\s*['\"]([0-9.]+)['\"]/", $content, $matches ) ) {
                if ( $matches[1] !== $plugin_version ) {
                    $this->errors[] = "Version constant mismatch: header={$plugin_version}, constant={$matches[1]}";
                }
            }
        }

        // Get version from readme.txt
        $readme_file = $this->package_path . '/readme.txt';
        $readme_version = null;

        if ( file_exists( $readme_file ) ) {
            $content = file_get_contents( $readme_file );
            if ( preg_match( '/Stable tag:\s*([0-9.]+)/i', $content, $matches ) ) {
                $readme_version = $matches[1];
            }
        }

        // Compare
        if ( $plugin_version && $readme_version ) {
            if ( $plugin_version !== $readme_version ) {
                $this->errors[] = "Version mismatch: plugin={$plugin_version}, readme={$readme_version}";
            }
        }

        // Check package.json if exists
        $package_json = $this->package_path . '/package.json';
        if ( file_exists( $package_json ) ) {
            $package = json_decode( file_get_contents( $package_json ), true );
            if ( isset( $package['version'] ) && $package['version'] !== $plugin_version ) {
                $this->warnings[] = "package.json version differs: {$package['version']}";
            }
        }
    }

    /**
     * Validate file sizes.
     */
    private function validate_file_sizes(): void {
        // Max total package size (MB)
        $max_total_mb = 10;

        // Max single file size (MB)
        $max_file_mb = 5;

        $total_size = 0;

        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator( $this->package_path )
        );

        foreach ( $iterator as $file ) {
            if ( $file->isFile() ) {
                $size = $file->getSize();
                $total_size += $size;

                $size_mb = $size / 1024 / 1024;
                if ( $size_mb > $max_file_mb ) {
                    $this->warnings[] = sprintf(
                        "Large file: %s (%.2f MB)",
                        $file->getPathname(),
                        $size_mb
                    );
                }
            }
        }

        $total_mb = $total_size / 1024 / 1024;
        if ( $total_mb > $max_total_mb ) {
            $this->warnings[] = sprintf( "Package size: %.2f MB (consider optimization)", $total_mb );
        }
    }

    /**
     * Validate PHP syntax.
     */
    private function validate_php_syntax(): void {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator( $this->package_path )
        );

        foreach ( $iterator as $file ) {
            if ( $file->isFile() && $file->getExtension() === 'php' ) {
                $output = [];
                $return = 0;

                exec( "php -l " . escapeshellarg( $file->getPathname() ) . " 2>&1", $output, $return );

                if ( $return !== 0 ) {
                    $this->errors[] = "PHP syntax error in: " . $file->getPathname();
                }
            }
        }
    }

    /**
     * Validate assets are optimized.
     */
    private function validate_assets(): void {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator( $this->package_path )
        );

        foreach ( $iterator as $file ) {
            if ( ! $file->isFile() ) {
                continue;
            }

            $filename = $file->getFilename();
            $path = $file->getPathname();

            // Check for unminified assets in production directories
            if ( strpos( $path, '/build/' ) !== false || strpos( $path, '/dist/' ) !== false ) {
                // CSS should be minified (heuristic: check for newlines)
                if ( $file->getExtension() === 'css' ) {
                    $content = file_get_contents( $path );
                    $lines = substr_count( $content, "\n" );
                    $chars = strlen( $content );

                    if ( $lines > 10 && $lines / $chars > 0.01 ) {
                        $this->warnings[] = "CSS may not be minified: {$filename}";
                    }
                }

                // JS should be minified
                if ( $file->getExtension() === 'js' && strpos( $filename, '.min.' ) === false ) {
                    $content = file_get_contents( $path );
                    $lines = substr_count( $content, "\n" );

                    if ( $lines > 50 ) {
                        $this->warnings[] = "JS may not be minified: {$filename}";
                    }
                }
            }

            // Source maps should not be in package
            if ( strpos( $filename, '.map' ) !== false ) {
                $this->warnings[] = "Source map found: {$filename}";
            }
        }
    }

    /**
     * Validate translations.
     */
    private function validate_translations(): void {
        $languages_dir = $this->package_path . '/languages';

        if ( ! is_dir( $languages_dir ) ) {
            $this->warnings[] = "No languages directory found";
            return;
        }

        $slug = basename( $this->package_path );
        $pot_file = "{$languages_dir}/{$slug}.pot";

        if ( ! file_exists( $pot_file ) ) {
            $this->warnings[] = "POT file not found: {$slug}.pot";
        } else {
            // Validate POT structure
            $content = file_get_contents( $pot_file );

            if ( strpos( $content, 'msgid ""' ) === false ) {
                $this->errors[] = "Invalid POT file structure";
            }
        }
    }

    /**
     * Get errors.
     */
    public function get_errors(): array {
        return $this->errors;
    }

    /**
     * Get warnings.
     */
    public function get_warnings(): array {
        return $this->warnings;
    }
}
```

### CLI Wrapper

```php
#!/usr/bin/env php
<?php
/**
 * CLI package validator.
 */

if ( $argc < 2 ) {
    echo "Usage: php validate-package.php <package-path>\n";
    exit( 1 );
}

require_once __DIR__ . '/class-package-validator.php';

$validator = new Package_Validator( $argv[1] );
$valid = $validator->validate();

$errors = $validator->get_errors();
$warnings = $validator->get_warnings();

// Output
if ( ! empty( $errors ) ) {
    echo "\nErrors:\n";
    foreach ( $errors as $error ) {
        echo "  ❌ {$error}\n";
    }
}

if ( ! empty( $warnings ) ) {
    echo "\nWarnings:\n";
    foreach ( $warnings as $warning ) {
        echo "  ⚠️  {$warning}\n";
    }
}

if ( $valid ) {
    echo "\n✅ Package validation passed\n";
    exit( 0 );
} else {
    echo "\n❌ Package validation failed\n";
    exit( 1 );
}
```

## Build Pipeline

### Package Creation Script

```bash
#!/bin/bash
# package.sh - Create release package

PLUGIN_SLUG="my-plugin"
VERSION=$(grep "Version:" "${PLUGIN_SLUG}.php" | sed 's/.*Version:\s*//' | tr -d ' ')
DIST_DIR="dist"
PACKAGE_DIR="${DIST_DIR}/${PLUGIN_SLUG}"

echo "Building ${PLUGIN_SLUG} v${VERSION}..."

# Clean
rm -rf "${DIST_DIR}"
mkdir -p "${PACKAGE_DIR}"

# Build assets
npm run build

# Copy files (excluding dev files)
rsync -av \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='.github' \
    --exclude='tests' \
    --exclude='src' \
    --exclude='.env*' \
    --exclude='*.lock' \
    --exclude='phpunit.xml*' \
    --exclude='phpstan.neon*' \
    --exclude='.phpcs.xml*' \
    --exclude='webpack.config.js' \
    --exclude='package.json' \
    --exclude='composer.json' \
    --exclude='Makefile' \
    --exclude='.editorconfig' \
    --exclude='.eslintrc*' \
    --exclude='.stylelintrc*' \
    --exclude='.wp-env.json' \
    --exclude='docker-compose.yml' \
    ./ "${PACKAGE_DIR}/"

# Create zip
cd "${DIST_DIR}"
zip -r "${PLUGIN_SLUG}-${VERSION}.zip" "${PLUGIN_SLUG}"

echo "Created: ${DIST_DIR}/${PLUGIN_SLUG}-${VERSION}.zip"

# Validate
php ../scripts/validate-package.php "${PACKAGE_DIR}"
```

### .distignore

```
# Development files to exclude from distribution

# Version control
.git
.github
.gitignore
.gitattributes

# Dependencies
node_modules
vendor

# Source files (if built)
src

# Config files
.env*
*.lock
phpunit.xml*
phpstan.neon*
.phpcs.xml*
webpack.config.js
babel.config.js
tsconfig.json
package.json
composer.json
Makefile
.editorconfig
.eslintrc*
.stylelintrc*
.wp-env.json
docker-compose.yml
.distignore

# Tests
tests
*.Test.php
phpunit

# IDE
.idea
.vscode
*.code-workspace

# Temp files
*.log
*.cache
.DS_Store
Thumbs.db
```

## GitHub Actions CI

```yaml
name: Package Validation

on:
  push:
    tags:
      - 'v*'
  pull_request:

jobs:
  build-and-validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: npm ci
      - run: composer install --no-dev

      - name: Build assets
        run: npm run build

      - name: Create package
        run: ./scripts/package.sh

      - name: Validate package
        run: php scripts/validate-package.php dist/my-plugin

      - name: Check package size
        run: |
          SIZE=$(du -sm dist/my-plugin | cut -f1)
          echo "Package size: ${SIZE}MB"
          if [ "$SIZE" -gt 10 ]; then
            echo "Warning: Package exceeds 10MB"
          fi

      - name: Upload package
        uses: actions/upload-artifact@v4
        with:
          name: plugin-package
          path: dist/*.zip

  # WordPress Plugin Check
  plugin-check:
    needs: build-and-validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Download package
        uses: actions/download-artifact@v4
        with:
          name: plugin-package

      - name: Unzip
        run: unzip *.zip

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - name: Install WP-CLI
        run: |
          curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
          chmod +x wp-cli.phar
          sudo mv wp-cli.phar /usr/local/bin/wp

      - name: Run Plugin Check
        run: |
          # Set up WordPress for Plugin Check
          # ... (requires full WP installation)
          wp plugin check my-plugin --format=json > plugin-check.json

      - name: Upload check results
        uses: actions/upload-artifact@v4
        with:
          name: plugin-check-results
          path: plugin-check.json

  release:
    needs: [build-and-validate, plugin-check]
    if: startsWith(github.ref, 'refs/tags/')
    runs-on: ubuntu-latest
    steps:
      - name: Download package
        uses: actions/download-artifact@v4
        with:
          name: plugin-package

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: '*.zip'
          generate_release_notes: true
```

## WordPress.org Deployment

```yaml
name: Deploy to WordPress.org

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: WordPress Plugin Deploy
        uses: 10up/action-wordpress-plugin-deploy@stable
        env:
          SVN_PASSWORD: ${{ secrets.SVN_PASSWORD }}
          SVN_USERNAME: ${{ secrets.SVN_USERNAME }}
          SLUG: my-plugin
          VERSION: ${{ github.event.release.tag_name }}
          ASSETS_DIR: .wordpress-org
```
</knowledge>

<best_practices>
- Automate package creation in CI
- Validate before every release
- Use .distignore for consistent exclusions
- Check version consistency across files
- Verify assets are built and optimized
- Run WordPress Plugin Check
</best_practices>

<commands>
```bash
# Create package
./scripts/package.sh

# Validate package
php scripts/validate-package.php dist/my-plugin

# Check package size
du -sh dist/my-plugin

# List package contents
unzip -l dist/my-plugin-1.0.0.zip

# WordPress Plugin Check
wp plugin check my-plugin
```
</commands>
</skill>
