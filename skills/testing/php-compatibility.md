# PHP Compatibility Checking

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Ensuring PHP version compatibility for WordPress projects

<skill>
<summary>
Automated PHP compatibility checking using PHPCompatibility to ensure code works across target PHP versions.
</summary>

<knowledge>
## Why Check PHP Compatibility?

WordPress supports PHP 7.2.24+, but different sites run different versions:
- **WordPress.org requires** support for PHP 7.2.24+
- **Many hosts** still run PHP 7.4 or 8.0
- **New features** may not work on older versions
- **Deprecations** cause warnings on newer versions

## PHPCompatibility Setup

### Install

```bash
composer require --dev phpcompatibility/phpcompatibility-wp
```

### Configuration (.phpcs.xml.dist)

```xml
<?xml version="1.0"?>
<ruleset name="PHP Compatibility">
    <description>PHP Compatibility checks for WordPress plugin</description>

    <!-- Scan paths -->
    <file>.</file>
    <exclude-pattern>/vendor/*</exclude-pattern>
    <exclude-pattern>/node_modules/*</exclude-pattern>
    <exclude-pattern>/tests/*</exclude-pattern>

    <!-- PHP Compatibility -->
    <rule ref="PHPCompatibilityWP"/>

    <!-- Test against PHP 7.4 to 8.3 -->
    <config name="testVersion" value="7.4-8.3"/>

    <!-- Or test specific version -->
    <!-- <config name="testVersion" value="8.0-"/> -->
</ruleset>
```

### Run Check

```bash
# Check all files
./vendor/bin/phpcs --standard=PHPCompatibilityWP --runtime-set testVersion 7.4-8.3 .

# Check specific path
./vendor/bin/phpcs --standard=PHPCompatibilityWP --runtime-set testVersion 8.0- includes/
```

## Common Compatibility Issues

### PHP 8.0+ Features

**Named arguments (PHP 8.0+):**
```php
// Won't work in PHP 7.x
array_fill(start_index: 0, count: 10, value: 'x');

// Compatible
array_fill(0, 10, 'x');
```

**Nullsafe operator (PHP 8.0+):**
```php
// Won't work in PHP 7.x
$name = $user?->getProfile()?->getName();

// Compatible
$name = $user ? ($user->getProfile() ? $user->getProfile()->getName() : null) : null;
```

**Match expression (PHP 8.0+):**
```php
// Won't work in PHP 7.x
$result = match($status) {
    'draft' => 'Draft',
    'publish' => 'Published',
    default => 'Unknown',
};

// Compatible
switch ($status) {
    case 'draft':
        $result = 'Draft';
        break;
    case 'publish':
        $result = 'Published';
        break;
    default:
        $result = 'Unknown';
}
```

**Constructor property promotion (PHP 8.0+):**
```php
// Won't work in PHP 7.x
class User {
    public function __construct(
        public string $name,
        public int $age
    ) {}
}

// Compatible
class User {
    public string $name;
    public int $age;

    public function __construct(string $name, int $age) {
        $this->name = $name;
        $this->age = $age;
    }
}
```

### PHP 8.1+ Features

**Enums (PHP 8.1+):**
```php
// Won't work in PHP 8.0-
enum Status: string {
    case Draft = 'draft';
    case Published = 'publish';
}

// Compatible: use constants
class Status {
    public const DRAFT = 'draft';
    public const PUBLISHED = 'publish';
}
```

**Readonly properties (PHP 8.1+):**
```php
// Won't work in PHP 8.0-
class User {
    public readonly string $id;
}

// Compatible
class User {
    private string $id;

    public function getId(): string {
        return $this->id;
    }
}
```

**First-class callable syntax (PHP 8.1+):**
```php
// Won't work in PHP 8.0-
$fn = $obj->method(...);

// Compatible
$fn = [ $obj, 'method' ];
```

### Deprecated Features

**PHP 8.0 deprecations:**
```php
// Deprecated in PHP 8.0
${$var} = 'value';  // Variable variables in strings

// Use instead
${$var} = 'value';  // Outside strings
```

**PHP 8.1 deprecations:**
```php
// Deprecated in PHP 8.1
strftime('%Y-%m-%d', time());

// Use instead
date('Y-m-d', time());
// Or
(new DateTime())->format('Y-m-d');
```

**PHP 8.2 deprecations:**
```php
// Deprecated in PHP 8.2 - dynamic properties
class User {}
$user = new User();
$user->dynamicProperty = 'value';  // Deprecated

// Fix: Use #[AllowDynamicProperties] or define properties
#[AllowDynamicProperties]
class User {}
```

## CI/CD Integration

### GitHub Actions

```yaml
name: PHP Compatibility

on: [push, pull_request]

jobs:
  compatibility:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        php: ['7.4', '8.0', '8.1', '8.2', '8.3']

    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: ${{ matrix.php }}
          tools: composer

      - run: composer install

      - name: PHPCompatibility Check
        run: |
          ./vendor/bin/phpcs \
            --standard=PHPCompatibilityWP \
            --runtime-set testVersion ${{ matrix.php }} \
            --ignore=vendor,node_modules \
            .

  compatibility-range:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: Check compatibility range
        run: |
          ./vendor/bin/phpcs \
            --standard=PHPCompatibilityWP \
            --runtime-set testVersion 7.4-8.3 \
            --ignore=vendor,node_modules \
            .
```

### Combined with PHPCS

```xml
<?xml version="1.0"?>
<ruleset name="My Plugin">
    <!-- Coding standards -->
    <rule ref="WordPress-Extra"/>

    <!-- PHP Compatibility -->
    <rule ref="PHPCompatibilityWP"/>
    <config name="testVersion" value="7.4-8.3"/>

    <!-- Minimum WordPress version -->
    <config name="minimum_wp_version" value="6.5"/>
</ruleset>
```

## WordPress-Specific Compatibility

### Polyfills

WordPress provides polyfills for some PHP 8+ features:

```php
// str_contains() available in PHP 8.0+
// WordPress polyfill available since 5.9
if ( str_contains( $haystack, $needle ) ) {
    // Works on PHP 7.x with WordPress 5.9+
}

// str_starts_with() / str_ends_with() also polyfilled
```

### Check WordPress Version

```php
// Use feature detection when possible
if ( function_exists( 'wp_block_patterns_registry' ) ) {
    // Block patterns available
}

// Or check version
global $wp_version;
if ( version_compare( $wp_version, '6.0', '>=' ) ) {
    // WordPress 6.0+ features
}
```
</knowledge>

<best_practices>
- Test against full supported range (7.4-8.3)
- Check WordPress polyfills before adding custom ones
- Avoid PHP 8.1+ only features for public plugins
- Run compatibility checks in CI on every PR
- Document minimum PHP version in plugin header
- Update testVersion when dropping old PHP support
</best_practices>

<commands>
```bash
# Check PHP compatibility
./vendor/bin/phpcs --standard=PHPCompatibilityWP --runtime-set testVersion 7.4-8.3 .

# Check specific version range
./vendor/bin/phpcs --standard=PHPCompatibilityWP --runtime-set testVersion 8.0- includes/

# Check for deprecations
./vendor/bin/phpcs --standard=PHPCompatibilityWP --runtime-set testVersion 8.2 --sniffs=PHPCompatibility.*.Deprecated .
```
</commands>
</skill>
