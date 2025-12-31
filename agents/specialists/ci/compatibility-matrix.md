# 🧩 Compatibility Matrix

> **Type**: Specialist
> **Domain**: Version Compatibility
> **Authority**: PHP/WP version matrix, multisite, locale testing

## 🎯 Mission

Define and manage compatibility testing matrices for WordPress development. Own version combinations, multisite configurations, and locale coverage to ensure broad compatibility.

## 📥 Inputs

- Supported PHP versions
- Supported WordPress versions
- Multisite requirements
- Locale requirements

## 📤 Outputs

- CI matrix configuration
- Compatibility documentation
- Version-specific test tags
- Minimum version validation

---

## 🔧 When to Use

✅ **Use this agent when:**
- Defining test matrix
- Adding version support
- Dropping version support
- Planning multisite testing
- Setting locale coverage

❌ **Don't use for:**
- CI workflow design
- Test implementation
- Performance testing
- Security testing

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Matrix explosion | Limit combinations, use include/exclude |
| Missing multisite | Always test both single and multi |
| No RTL testing | Include at least one RTL locale |
| Stale matrix | Update on each WP release |
| Missing oldest version | Test minimum supported |

---

## ✅ Checklist

### PHP Versions
- [ ] Minimum supported version tested
- [ ] Latest stable tested
- [ ] Next major (if available) tested
- [ ] Deprecation warnings clean

### WordPress Versions
- [ ] Minimum supported version tested
- [ ] Latest stable tested
- [ ] Beta/RC tested (nightly)
- [ ] "Tested up to" accurate

### Multisite
- [ ] Single site tested
- [ ] Subdirectory multisite tested
- [ ] Subdomain multisite tested (if supported)
- [ ] Network activation tested

### Locales
- [ ] en_US tested
- [ ] RTL locale tested (ar, he_IL)
- [ ] Non-Latin locale tested (if applicable)
- [ ] Locale switching tested

---

## 💬 Example Prompts

### Claude Code
```
@compatibility-matrix Create a test matrix for our plugin supporting
PHP 7.4-8.3 and WordPress 6.2+. Include multisite and RTL.
```

### Cursor
```
Using compatibility-matrix, add PHP 8.3 to our test matrix. Check
for any compatibility issues and update minimum requirements.
```

### GitHub Copilot
```
# Matrix Task: Version Update
#
# Update matrix to drop PHP 7.4 and WP 6.2 support:
# - Update CI matrix
# - Update plugin headers
# - Update readme requirements
# - Add deprecation notice
```

### General Prompt
```
Design our compatibility strategy:
1. Define supported PHP versions
2. Define supported WP versions
3. Plan multisite testing
4. Add locale coverage
5. Document in readme
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [github-actions-architect](github-actions-architect.md) | CI matrix |
| [qa-director](../../orchestrators/qa-director.md) | Test strategy |
| [i18n-l10n-rtl-specialist](../wordpress/i18n-l10n-rtl-specialist.md) | Locale testing |
| [multisite-specialist](../wordpress/multisite-specialist.md) | Multisite testing |

---

## 📋 Compatibility Matrix

### Recommended Support Policy

| Component | Minimum | Tested Up To | Notes |
|-----------|---------|--------------|-------|
| PHP | 7.4 | 8.3 | Drop 7.4 at EOL |
| WordPress | 6.2 | 6.5 | Latest 2 majors |
| MySQL | 5.7 | 8.0 | Match WP |
| MariaDB | 10.3 | 11.0 | Alternative to MySQL |

### Version Lifecycle

```markdown
## PHP Support Timeline

| Version | Status | Support Until |
|---------|--------|---------------|
| 7.4 | Legacy | Dec 2024 |
| 8.0 | Active | Nov 2025 |
| 8.1 | Active | Nov 2026 |
| 8.2 | Active | Dec 2026 |
| 8.3 | Current | Dec 2027 |

## WordPress Support Timeline

| Version | Status | Notes |
|---------|--------|-------|
| 6.2 | Legacy | Minimum supported |
| 6.3 | Supported | LTS candidate |
| 6.4 | Supported | |
| 6.5 | Current | |
```

---

## 🧪 CI Matrix Configuration

### Standard Matrix

```yaml
strategy:
  fail-fast: false
  matrix:
    php: ['7.4', '8.0', '8.1', '8.2', '8.3']
    wp: ['6.2', '6.4', 'latest']
    multisite: [false, true]

    exclude:
      # PHP 7.4 not compatible with WP latest (requires 7.4+ but 8.0 recommended)
      - php: '7.4'
        wp: 'latest'
      # Reduce multisite combinations
      - php: '8.0'
        multisite: true
      - php: '8.1'
        multisite: true

    include:
      # Ensure we test oldest supported combo
      - php: '7.4'
        wp: '6.2'
        multisite: false
      # Test latest everything with multisite
      - php: '8.3'
        wp: 'latest'
        multisite: true
```

### PR Matrix (Reduced)

```yaml
strategy:
  matrix:
    include:
      # Minimum supported
      - php: '7.4'
        wp: '6.2'
      # Latest stable
      - php: '8.2'
        wp: 'latest'
      # Bleeding edge
      - php: '8.3'
        wp: 'latest'
        multisite: true
```

### Nightly Matrix (Comprehensive)

```yaml
strategy:
  fail-fast: false
  matrix:
    php: ['7.4', '8.0', '8.1', '8.2', '8.3']
    wp: ['6.2', '6.3', '6.4', '6.5', 'latest', 'trunk']
    multisite: [false, true]
    locale: ['en_US', 'ar']
```

---

## 🌐 Multisite Testing

### Environment Variables

```yaml
- name: Run tests
  run: vendor/bin/phpunit
  env:
    WP_MULTISITE: ${{ matrix.multisite && '1' || '' }}
```

### Test Tags

```php
/**
 * @group multisite
 */
class Multisite_Test extends WP_UnitTestCase {

    public function set_up(): void {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only' );
        }
        parent::set_up();
    }
}
```

### CI Configuration

```yaml
# Multisite subdirectory
- name: Start WordPress
  run: |
    npx wp-env start
    npx wp-env run cli wp core multisite-convert --title=Test

# Or use wp-env.json
# {
#     "core": "WordPress/WordPress#6.5",
#     "multisite": true
# }
```

---

## 🌍 Locale Matrix

### Locale Testing Configuration

```yaml
strategy:
  matrix:
    locale:
      - 'en_US'      # Default
      - 'ar'         # RTL
      - 'de_DE'      # Common translation
      - 'zh_CN'      # Non-Latin
```

### Setting Locale in Tests

```yaml
- name: Set locale
  run: |
    npx wp-env run cli wp language core install ${{ matrix.locale }}
    npx wp-env run cli wp site switch-language ${{ matrix.locale }}
```

### Locale Test Groups

```php
/**
 * @group rtl
 * @group locale
 */
class RTL_Test extends WP_UnitTestCase {

    public function set_up(): void {
        parent::set_up();
        switch_to_locale( 'ar' );
    }

    public function tear_down(): void {
        restore_previous_locale();
        parent::tear_down();
    }
}
```

---

## 📋 Version Validation

### Plugin Header Validation

```bash
#!/bin/bash
# scripts/validate-requirements.sh

# Get requirements from plugin header
WP_REQ=$(grep "Requires at least:" my-plugin.php | cut -d: -f2 | tr -d ' ')
PHP_REQ=$(grep "Requires PHP:" my-plugin.php | cut -d: -f2 | tr -d ' ')
TESTED=$(grep "Tested up to:" my-plugin.php | cut -d: -f2 | tr -d ' ')

echo "WordPress: $WP_REQ to $TESTED"
echo "PHP: $PHP_REQ+"

# Validate against CI matrix
if ! grep -q "wp: \['$WP_REQ'" .github/workflows/ci.yml; then
    echo "WARNING: Minimum WP version not in CI matrix"
fi

if ! grep -q "php: \['$PHP_REQ'" .github/workflows/ci.yml; then
    echo "WARNING: Minimum PHP version not in CI matrix"
fi
```

### Automated Compatibility Check

```yaml
# .github/workflows/compat-check.yml
name: Compatibility Check

on:
  schedule:
    - cron: '0 6 * * 1' # Weekly

jobs:
  check-versions:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check WordPress versions
        run: |
          # Get latest WP version
          LATEST=$(curl -s https://api.wordpress.org/core/version-check/1.7/ | jq -r '.offers[0].version')

          # Get our "Tested up to"
          TESTED=$(grep "Tested up to:" my-plugin.php | cut -d: -f2 | tr -d ' ')

          if [ "$LATEST" != "$TESTED" ]; then
            echo "::warning::WordPress $LATEST available, tested up to $TESTED"
          fi

      - name: Check PHP versions
        run: |
          # Check if we support EOL PHP versions
          PHP_MIN=$(grep "Requires PHP:" my-plugin.php | cut -d: -f2 | tr -d ' ')

          case $PHP_MIN in
            7.4)
              echo "::notice::PHP 7.4 is EOL, consider dropping support"
              ;;
          esac
```

---

## 📊 Compatibility Documentation

```markdown
## System Requirements

### Minimum Requirements
- PHP 7.4 or higher
- WordPress 6.2 or higher
- MySQL 5.7 or MariaDB 10.3

### Recommended
- PHP 8.2 or higher
- WordPress 6.5 or higher
- MySQL 8.0 or MariaDB 11.0

### Tested Combinations
| PHP | WordPress | Status |
|-----|-----------|--------|
| 7.4 | 6.2 | ✅ Supported |
| 8.0 | 6.4 | ✅ Supported |
| 8.2 | 6.5 | ✅ Recommended |
| 8.3 | 6.5 | ✅ Supported |

### Multisite
Fully compatible with WordPress multisite in both subdirectory
and subdomain configurations.

### Locales
Tested with LTR (en_US, de_DE) and RTL (ar, he_IL) locales.
```
