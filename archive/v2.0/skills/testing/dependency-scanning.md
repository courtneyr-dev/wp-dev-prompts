# Dependency Vulnerability Scanning

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Scanning PHP and JavaScript dependencies for known vulnerabilities

<skill>
<summary>
Identifying security vulnerabilities in Composer and npm dependencies using automated scanning tools.
</summary>

<knowledge>
## Why Scan Dependencies?

Third-party packages can introduce vulnerabilities:
- **Known CVEs** - Published security issues
- **Outdated packages** - Unpatched vulnerabilities
- **Supply chain attacks** - Compromised packages
- **License compliance** - Legal requirements

## PHP/Composer Scanning

### Composer Audit (Built-in)

**Run audit:**
```bash
# Check for vulnerabilities
composer audit

# JSON output for CI
composer audit --format=json

# Lock file only
composer audit --locked
```

### Roave Security Advisories

**Install:**
```bash
composer require --dev roave/security-advisories:dev-latest
```

This package prevents installing packages with known vulnerabilities. It has no code—just conflict rules in composer.json.

### Local PHP Security Checker

**Install and run:**
```bash
# Download
curl -sSL https://github.com/fabpot/local-php-security-checker/releases/latest/download/local-php-security-checker_linux_amd64 -o security-checker
chmod +x security-checker

# Run
./security-checker --path=composer.lock
```

## JavaScript/npm Scanning

### npm Audit (Built-in)

**Run audit:**
```bash
# Check for vulnerabilities
npm audit

# JSON output
npm audit --json

# Fix automatically where possible
npm audit fix

# Force fix (may break things)
npm audit fix --force

# Production only
npm audit --omit=dev
```

### Understanding Severity

```
┌──────────────┬────────────────────────────────────────────┐
│ Severity     │ Description                                │
├──────────────┼────────────────────────────────────────────┤
│ critical     │ Immediate action required                  │
│ high         │ Fix as soon as possible                    │
│ moderate     │ Fix when convenient                        │
│ low          │ Minimal risk, fix when updating            │
└──────────────┴────────────────────────────────────────────┘
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Dependency Scan

on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: '0 0 * * 1'  # Weekly Monday

jobs:
  php-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: Composer Audit
        run: composer audit --format=json > composer-audit.json

      - name: Check for vulnerabilities
        run: |
          if [ $(cat composer-audit.json | jq '.advisories | length') -gt 0 ]; then
            echo "Vulnerabilities found!"
            cat composer-audit.json | jq '.advisories'
            exit 1
          fi

  npm-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci

      - name: npm Audit
        run: npm audit --audit-level=high

  snyk:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Snyk
        uses: snyk/actions/php@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

### Dependabot Configuration

**.github/dependabot.yml:**
```yaml
version: 2
updates:
  - package-ecosystem: "composer"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    labels:
      - "dependencies"
      - "php"
    groups:
      wordpress:
        patterns:
          - "wordpress/*"
          - "wp-*"

  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    labels:
      - "dependencies"
      - "javascript"
    groups:
      wordpress:
        patterns:
          - "@wordpress/*"
```

## Handling Vulnerabilities

### Immediate Actions

```bash
# PHP: Update specific package
composer update vendor/package

# PHP: Update all packages
composer update

# npm: Update specific package
npm update package-name

# npm: Install fixed version
npm install package@version
```

### When No Fix Available

1. **Check if actually vulnerable** - Is the vulnerable code path used?
2. **Find alternatives** - Different package without the issue
3. **Apply workaround** - Mitigate without updating
4. **Accept risk** - Document and monitor

### Creating an Allowlist

**audit-ci configuration (.audit-ci.json):**
```json
{
  "moderate": true,
  "allowlist": [
    "CVE-2023-XXXXX"
  ],
  "path-allowlist": [
    "build/some-dev-tool"
  ]
}
```

## Reporting

### Generate Reports

```bash
# PHP detailed report
composer audit --format=json | jq '.' > audit-report.json

# npm detailed report
npm audit --json > npm-audit.json

# Combined summary
echo "=== PHP ===" && composer audit
echo "=== npm ===" && npm audit
```

### Key Metrics to Track

- Total vulnerabilities by severity
- Time to remediate
- Outdated dependency count
- Direct vs transitive vulnerabilities
</knowledge>

<best_practices>
- Scan on every PR and scheduled weekly
- Block merges for high/critical issues
- Keep lock files committed
- Use Dependabot for automated updates
- Review transitive dependencies
- Document accepted vulnerabilities
</best_practices>

<commands>
```bash
# PHP scanning
composer audit
composer audit --format=json

# npm scanning
npm audit
npm audit --audit-level=moderate
npm audit fix

# Combined check
composer audit && npm audit
```
</commands>
</skill>
