# Internationalization (i18n) Checks

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Validating text-domain, function usage, and translation readiness

<skill>
<summary>
Automated checks for WordPress internationalization compliance including text-domain validation and translation function usage.
</summary>

<knowledge>
## What to Check

### Text Domain Validation

- All strings use the correct text-domain
- Text-domain matches plugin/theme slug
- No hardcoded or mismatched domains

### Function Usage

- Proper i18n functions used (`__()`, `_e()`, etc.)
- Correct function for context
- Translator comments for placeholders
- No concatenated strings

## PHPCS i18n Rules

### Configuration

```xml
<?xml version="1.0"?>
<ruleset name="i18n">
    <description>Internationalization checks</description>

    <!-- Text domain check -->
    <rule ref="WordPress.WP.I18n">
        <properties>
            <property name="text_domain" type="array">
                <element value="my-plugin"/>
            </property>
        </properties>
    </rule>

    <!-- Make i18n issues errors -->
    <rule ref="WordPress.WP.I18n.MissingTranslatorsComment">
        <type>error</type>
    </rule>

    <rule ref="WordPress.WP.I18n.NonSingularStringLiteralText">
        <type>error</type>
    </rule>

    <rule ref="WordPress.WP.I18n.NonSingularStringLiteralDomain">
        <type>error</type>
    </rule>

    <rule ref="WordPress.WP.I18n.MixedOrderedPlaceholders">
        <type>error</type>
    </rule>
</ruleset>
```

### Common Errors

**Missing text domain:**
```php
// Error
__( 'Hello World' );

// Fix
__( 'Hello World', 'my-plugin' );
```

**Wrong text domain:**
```php
// Error
__( 'Hello', 'wrong-domain' );

// Fix
__( 'Hello', 'my-plugin' );
```

**Missing translator comment:**
```php
// Error
sprintf( __( 'Hello, %s', 'my-plugin' ), $name );

// Fix
/* translators: %s: user name */
sprintf( __( 'Hello, %s', 'my-plugin' ), $name );
```

## WP-CLI i18n Commands

### Make POT File

```bash
# Generate POT file
wp i18n make-pot . languages/my-plugin.pot

# With options
wp i18n make-pot . languages/my-plugin.pot \
    --slug=my-plugin \
    --domain=my-plugin \
    --exclude=vendor,node_modules,tests \
    --headers='{"Report-Msgid-Bugs-To":"https://example.com/support"}'
```

### Make JSON for JavaScript

```bash
# Convert PO to JSON for JavaScript
wp i18n make-json languages/

# Specific file
wp i18n make-json languages/my-plugin-es_ES.po languages/
```

### Update PO from POT

```bash
# Update PO files from POT
wp i18n update-po languages/my-plugin.pot languages/
```

## JavaScript i18n Checks

### ESLint Rules

**Install:**
```bash
npm install --save-dev @wordpress/eslint-plugin
```

**.eslintrc.js:**
```javascript
module.exports = {
    extends: ['plugin:@wordpress/eslint-plugin/i18n'],
    rules: {
        '@wordpress/i18n-text-domain': ['error', {
            allowedTextDomain: 'my-plugin',
        }],
        '@wordpress/i18n-translator-comments': 'error',
        '@wordpress/i18n-no-collapsible-whitespace': 'error',
        '@wordpress/i18n-no-placeholders-only': 'error',
        '@wordpress/i18n-no-variables': 'error',
        '@wordpress/i18n-ellipsis': 'warn',
    },
};
```

### Common JavaScript Errors

**Missing text domain:**
```javascript
// Error
__( 'Hello World' );

// Fix
__( 'Hello World', 'my-plugin' );
```

**Variable in translation:**
```javascript
// Error
__( `Hello ${name}`, 'my-plugin' );

// Fix
sprintf( __( 'Hello %s', 'my-plugin' ), name );
```

**Missing translator comment:**
```javascript
// Error
sprintf( __( 'Hello, %s', 'my-plugin' ), name );

// Fix
sprintf(
    /* translators: %s: user name */
    __( 'Hello, %s', 'my-plugin' ),
    name
);
```

## CI/CD Integration

### GitHub Actions

```yaml
name: i18n

on: [push, pull_request]

jobs:
  i18n-php:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: PHPCS i18n Check
        run: |
          ./vendor/bin/phpcs \
            --standard=WordPress.WP.I18n \
            --runtime-set text_domain my-plugin \
            includes/

  i18n-js:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci

      - name: ESLint i18n Check
        run: npx eslint src/ --rule '@wordpress/i18n-text-domain: error'

  pot-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup WP-CLI
        run: |
          curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
          chmod +x wp-cli.phar
          sudo mv wp-cli.phar /usr/local/bin/wp

      - name: Generate POT
        run: wp i18n make-pot . languages/my-plugin.pot --domain=my-plugin

      - name: Check for changes
        run: |
          if git diff --exit-code languages/my-plugin.pot; then
            echo "POT file is up to date"
          else
            echo "POT file needs updating"
            exit 1
          fi
```

## Best Practice Patterns

### Correct Function Usage

```php
// Simple string
$text = __( 'Hello World', 'my-plugin' );

// Echoing directly
_e( 'Click here', 'my-plugin' );

// With context
$text = _x( 'Post', 'noun', 'my-plugin' );

// Singular/plural
$text = _n(
    '%d item',
    '%d items',
    $count,
    'my-plugin'
);

// With context and count
$text = _nx(
    '%d item',
    '%d items',
    $count,
    'inventory',
    'my-plugin'
);

// Escaped for HTML
echo esc_html__( 'Title', 'my-plugin' );

// Escaped for attributes
echo esc_attr__( 'Click me', 'my-plugin' );
```

### Translator Comments

```php
/* translators: %s: file name */
printf( __( 'Uploading %s', 'my-plugin' ), $filename );

/* translators: 1: username, 2: date */
printf(
    __( '%1$s posted on %2$s', 'my-plugin' ),
    $username,
    $date
);

/* translators: %d: number of items, always greater than 1 */
printf(
    _n( '%d item', '%d items', $count, 'my-plugin' ),
    $count
);
```

### JavaScript Patterns

```javascript
import { __, _n, sprintf } from '@wordpress/i18n';

// Simple string
const text = __( 'Hello World', 'my-plugin' );

// With placeholder
const greeting = sprintf(
    /* translators: %s: user name */
    __( 'Hello, %s', 'my-plugin' ),
    userName
);

// Plural
const itemsText = sprintf(
    _n(
        '%d item',
        '%d items',
        count,
        'my-plugin'
    ),
    count
);
```
</knowledge>

<best_practices>
- Use consistent text-domain everywhere
- Add translator comments for all placeholders
- Use ordered placeholders (%1$s, %2$s)
- Never concatenate translated strings
- Use _x() when context matters
- Generate and commit POT files
</best_practices>

<commands>
```bash
# PHPCS i18n check
./vendor/bin/phpcs --standard=WordPress.WP.I18n --runtime-set text_domain my-plugin .

# ESLint i18n check
npx eslint src/ --rule '@wordpress/i18n-text-domain: error'

# Generate POT file
wp i18n make-pot . languages/my-plugin.pot

# Make JSON for JS translations
wp i18n make-json languages/
```
</commands>
</skill>
