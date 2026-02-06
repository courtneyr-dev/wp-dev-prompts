# File Structure Validation

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Validating WordPress plugin and theme file organization

<skill>
<summary>
Automated validation of WordPress project file structure, naming conventions, and required files.
</summary>

<knowledge>
## Standard Plugin Structure

### Recommended Layout

```
my-plugin/
├── my-plugin.php           # Main plugin file (required)
├── readme.txt              # WordPress.org readme (required for .org)
├── uninstall.php           # Cleanup on uninstall
├── LICENSE                 # License file
├── composer.json           # PHP dependencies
├── package.json            # JS dependencies
├── includes/               # PHP classes
│   ├── class-main.php
│   ├── class-admin.php
│   └── class-public.php
├── src/                    # Block/JS source
│   ├── blocks/
│   │   └── my-block/
│   │       ├── block.json
│   │       ├── index.js
│   │       └── style.scss
│   └── index.js
├── build/                  # Compiled assets
├── assets/                 # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── languages/              # Translation files
│   └── my-plugin.pot
├── templates/              # Template files
└── tests/                  # Test files
    ├── bootstrap.php
    ├── unit/
    └── integration/
```

## Validation Script

### PHP Validator

```php
<?php
/**
 * Validates WordPress plugin file structure.
 */
function validate_plugin_structure( string $plugin_dir ): array {
    $errors = [];
    $warnings = [];
    $slug = basename( $plugin_dir );

    // Required files
    $main_file = "{$plugin_dir}/{$slug}.php";
    if ( ! file_exists( $main_file ) ) {
        // Try finding any PHP file with Plugin Name header
        $found = false;
        foreach ( glob( "{$plugin_dir}/*.php" ) as $file ) {
            $content = file_get_contents( $file, false, null, 0, 8192 );
            if ( strpos( $content, 'Plugin Name:' ) !== false ) {
                $found = true;
                $warnings[] = "Main file should be named '{$slug}.php', found: " . basename( $file );
                break;
            }
        }
        if ( ! $found ) {
            $errors[] = 'No main plugin file found';
        }
    }

    // Recommended files
    $recommended = [
        'readme.txt' => 'readme.txt for WordPress.org',
        'LICENSE'    => 'License file',
    ];

    foreach ( $recommended as $file => $description ) {
        if ( ! file_exists( "{$plugin_dir}/{$file}" ) ) {
            $warnings[] = "Missing {$description} ({$file})";
        }
    }

    // Disallowed files
    $disallowed = [
        '.git',
        '.gitignore',
        '.github',
        'node_modules',
        '.env',
        '.env.local',
        'composer.lock',
        'package-lock.json',
        'phpunit.xml',
        'phpunit.xml.dist',
        '.phpcs.xml',
        '.phpcs.xml.dist',
        'phpstan.neon',
        'phpstan.neon.dist',
    ];

    // Check for development files (warning for .org submission)
    foreach ( $disallowed as $item ) {
        if ( file_exists( "{$plugin_dir}/{$item}" ) ) {
            $warnings[] = "Development file/folder should be excluded from distribution: {$item}";
        }
    }

    // Check for PHP files in root
    $root_php_files = glob( "{$plugin_dir}/*.php" );
    if ( count( $root_php_files ) > 3 ) {
        $warnings[] = 'Consider moving PHP files to includes/ directory';
    }

    // Validate includes/ structure
    if ( is_dir( "{$plugin_dir}/includes" ) ) {
        foreach ( glob( "{$plugin_dir}/includes/*.php" ) as $file ) {
            $basename = basename( $file );
            // Check class naming convention
            if ( strpos( $basename, 'class-' ) === 0 ) {
                // Valid class file
            } elseif ( strpos( $basename, 'trait-' ) === 0 ) {
                // Valid trait file
            } elseif ( strpos( $basename, 'interface-' ) === 0 ) {
                // Valid interface file
            } else {
                $warnings[] = "Consider using 'class-' prefix for: includes/{$basename}";
            }
        }
    }

    // Check for block.json in blocks
    $block_dirs = glob( "{$plugin_dir}/src/blocks/*", GLOB_ONLYDIR );
    foreach ( $block_dirs as $block_dir ) {
        if ( ! file_exists( "{$block_dir}/block.json" ) ) {
            $errors[] = 'Block missing block.json: ' . basename( $block_dir );
        }
    }

    return [
        'errors'   => $errors,
        'warnings' => $warnings,
    ];
}
```

### Bash Validation

```bash
#!/bin/bash
# validate-structure.sh

PLUGIN_DIR=$1
SLUG=$(basename "$PLUGIN_DIR")

if [ ! -d "$PLUGIN_DIR" ]; then
    echo "Error: Directory not found: $PLUGIN_DIR"
    exit 1
fi

ERRORS=0
WARNINGS=0

# Check main plugin file
if [ ! -f "$PLUGIN_DIR/$SLUG.php" ]; then
    echo "Error: Main plugin file not found: $SLUG.php"
    ERRORS=$((ERRORS + 1))
fi

# Check readme.txt
if [ ! -f "$PLUGIN_DIR/readme.txt" ]; then
    echo "Warning: readme.txt not found"
    WARNINGS=$((WARNINGS + 1))
fi

# Check for dev files that shouldn't be distributed
for item in ".git" ".github" "node_modules" ".env" "composer.lock" "package-lock.json"; do
    if [ -e "$PLUGIN_DIR/$item" ]; then
        echo "Warning: Development file should be excluded: $item"
        WARNINGS=$((WARNINGS + 1))
    fi
done

# Check blocks have block.json
if [ -d "$PLUGIN_DIR/src/blocks" ]; then
    for block in "$PLUGIN_DIR"/src/blocks/*/; do
        if [ ! -f "${block}block.json" ]; then
            echo "Error: Block missing block.json: $(basename "$block")"
            ERRORS=$((ERRORS + 1))
        fi
    done
fi

echo "Validation complete: $ERRORS error(s), $WARNINGS warning(s)"

if [ $ERRORS -gt 0 ]; then
    exit 1
fi
```

## CI/CD Integration

### GitHub Actions

```yaml
name: File Structure

on: [push, pull_request]

jobs:
  validate-structure:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check main plugin file
        run: |
          SLUG=$(basename "$GITHUB_WORKSPACE")

          # Check if main file exists
          if [ ! -f "$SLUG.php" ]; then
            # Look for any file with Plugin Name header
            MAIN_FILE=$(grep -l "Plugin Name:" *.php 2>/dev/null | head -1)
            if [ -z "$MAIN_FILE" ]; then
              echo "::error::No main plugin file found"
              exit 1
            fi
            echo "::warning::Main file should be named '${SLUG}.php', found: $MAIN_FILE"
          fi

      - name: Check required files
        run: |
          # readme.txt required for .org
          if [ ! -f readme.txt ]; then
            echo "::warning::readme.txt not found (required for WordPress.org)"
          fi

      - name: Check for dev files
        run: |
          DEV_FILES=".git .github node_modules .env composer.lock package-lock.json"

          for file in $DEV_FILES; do
            if [ -e "$file" ]; then
              echo "::warning::Development file should be excluded from release: $file"
            fi
          done

      - name: Validate block structure
        run: |
          if [ -d src/blocks ]; then
            for block in src/blocks/*/; do
              if [ ! -f "${block}block.json" ]; then
                echo "::error::Block missing block.json: $(basename "$block")"
                exit 1
              fi
            done
          fi

      - name: Check naming conventions
        run: |
          # Check class file naming in includes/
          if [ -d includes ]; then
            for file in includes/*.php; do
              if [ -f "$file" ]; then
                basename=$(basename "$file")
                if [[ ! "$basename" =~ ^(class-|trait-|interface-) ]]; then
                  echo "::warning::Consider prefixing with 'class-': includes/$basename"
                fi
              fi
            done
          fi
```

## WordPress Theme Structure

### Recommended Layout

```
my-theme/
├── style.css               # Main stylesheet with theme header (required)
├── index.php               # Main template (required)
├── functions.php           # Theme functions
├── screenshot.png          # Theme screenshot
├── readme.txt              # Theme readme
├── templates/              # Block templates
│   ├── archive.html
│   ├── single.html
│   └── page.html
├── parts/                  # Template parts
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
├── patterns/               # Block patterns
├── styles/                 # Style variations
├── assets/
│   ├── css/
│   ├── js/
│   ├── fonts/
│   └── images/
└── theme.json              # Theme configuration
```

## Distribution Checklist

### Files to Include

- [x] Main plugin/theme file
- [x] readme.txt
- [x] LICENSE
- [x] Built assets (build/, assets/)
- [x] Translation files (languages/)
- [x] Templates if applicable

### Files to Exclude

- [ ] .git, .github
- [ ] node_modules, vendor (dev deps)
- [ ] .env, .env.*
- [ ] composer.lock, package-lock.json
- [ ] *.log, *.cache
- [ ] phpunit.xml, phpstan.neon
- [ ] .phpcs.xml, .eslintrc
- [ ] tests/
- [ ] src/ (if build/ has compiled assets)

### .distignore Example

```
.git
.github
.gitignore
.distignore
node_modules
src
tests
*.lock
*.log
.env*
phpunit.xml*
phpstan.neon*
.phpcs.xml*
.eslintrc*
webpack.config.js
babel.config.js
```
</knowledge>

<best_practices>
- Name main file same as plugin directory
- Use includes/ for PHP classes
- Use class- prefix for class files
- Exclude dev files from distribution
- Every block needs block.json
- Keep root directory clean
</best_practices>

<commands>
```bash
# List plugin structure
tree -L 2 --dirsfirst

# Find PHP files in root
ls *.php

# Check for dev files
ls -la .git node_modules .env 2>/dev/null

# Validate blocks have block.json
find src/blocks -mindepth 1 -maxdepth 1 -type d -exec test ! -f {}/block.json \; -print
```
</commands>
</skill>
