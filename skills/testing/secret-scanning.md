# Secret Scanning

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Detecting secrets and credentials in code repositories

<skill>
<summary>
Automated detection of accidentally committed secrets, API keys, and credentials using Gitleaks and other tools.
</summary>

<knowledge>
## Why Secret Scanning?

Accidentally committed secrets cause:
- **Account compromise** - API keys, passwords exposed
- **Data breaches** - Database credentials leaked
- **Service abuse** - Cloud credentials exploited
- **Compliance failures** - PCI, HIPAA violations

## Gitleaks Setup

### Installation

```bash
# macOS
brew install gitleaks

# Linux
wget https://github.com/gitleaks/gitleaks/releases/latest/download/gitleaks_linux_x64.tar.gz
tar -xzf gitleaks_linux_x64.tar.gz
sudo mv gitleaks /usr/local/bin/

# npm (for CI)
npm install -g @gitleaks/gitleaks
```

### Configuration (.gitleaks.toml)

```toml
# .gitleaks.toml
title = "WordPress Project Gitleaks Config"

[extend]
useDefault = true

# WordPress-specific patterns
[[rules]]
id = "wordpress-salts"
description = "WordPress Authentication Keys and Salts"
regex = '''define\s*\(\s*['"](?:AUTH_KEY|SECURE_AUTH_KEY|LOGGED_IN_KEY|NONCE_KEY|AUTH_SALT|SECURE_AUTH_SALT|LOGGED_IN_SALT|NONCE_SALT)['"]\s*,\s*['"][^'"]{32,}['"]'''
tags = ["wordpress", "key"]

[[rules]]
id = "wordpress-db-password"
description = "WordPress Database Password"
regex = '''define\s*\(\s*['"]DB_PASSWORD['"]\s*,\s*['"][^'"]+['"]'''
tags = ["wordpress", "database"]

[[rules]]
id = "wp-config-secrets"
description = "Secrets in wp-config format"
regex = '''define\s*\(\s*['"](?:AWS_KEY|API_KEY|SECRET_KEY|STRIPE_KEY)['"]\s*,\s*['"][^'"]+['"]'''
tags = ["wordpress", "api"]

# Allow list for false positives
[allowlist]
description = "Global allow list"
paths = [
    '''\.gitleaks\.toml$''',
    '''tests/fixtures/''',
    '''\.example$''',
    '''\.sample$''',
]

# Specific patterns to ignore
regexes = [
    '''put your unique phrase here''',  # Default WP placeholder
    '''your_password_here''',
]

# Specific commits to ignore (after remediation)
commits = [
    # "abc123..."
]
```

### Running Scans

```bash
# Scan current directory
gitleaks detect

# Scan with verbose output
gitleaks detect -v

# Scan git history
gitleaks detect --source=. --log-opts="--all"

# Generate report
gitleaks detect --report-format=sarif --report-path=gitleaks.sarif

# Scan specific commits
gitleaks detect --log-opts="HEAD~10..HEAD"

# Pre-commit hook mode
gitleaks protect --staged
```

## Pre-Commit Integration

### Husky + Gitleaks

```json
// package.json
{
  "scripts": {
    "prepare": "husky install"
  },
  "devDependencies": {
    "husky": "^9.0.0"
  }
}
```

**.husky/pre-commit:**
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run gitleaks on staged files
gitleaks protect --staged --verbose

# Exit code 0 = no leaks, non-zero = leaks found
```

### GitHub Pre-receive Hook

```yaml
# .github/workflows/gitleaks.yml
name: Secret Scan

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITLEAKS_LICENSE: ${{ secrets.GITLEAKS_LICENSE }}
```

## Common Secret Patterns

### WordPress Specific

```php
// ❌ Hardcoded database password
define( 'DB_PASSWORD', 'actual_password_123' );

// ✅ Environment variable
define( 'DB_PASSWORD', getenv( 'DB_PASSWORD' ) );

// ❌ Hardcoded API key
$api_key = 'sk_live_1234567890abcdef';

// ✅ WordPress option or constant
$api_key = defined( 'MY_PLUGIN_API_KEY' )
    ? MY_PLUGIN_API_KEY
    : get_option( 'my_plugin_api_key' );

// ❌ Hardcoded salt
define( 'AUTH_KEY', 'aB3$kL9#mN2@pQ5^rS8!' );

// ✅ Generated from wp-config (separate file)
// Include salts from separate file not in repo
require_once 'wp-salts.php';
```

### API Keys

```php
// ❌ Hardcoded in code
$stripe_key = 'sk_live_51HG...';
$aws_key = 'AKIAIOSFODNN7EXAMPLE';

// ✅ Environment or encrypted options
$stripe_key = getenv( 'STRIPE_SECRET_KEY' );
$aws_key = get_option( 'encrypted_aws_key' );
```

## Handling Found Secrets

### Immediate Response

1. **Revoke the secret** - Rotate API key, change password
2. **Remove from history** - Use git-filter-repo or BFG
3. **Audit access** - Check for unauthorized use
4. **Prevent recurrence** - Add to .gitignore, pre-commit hook

### Removing from Git History

```bash
# Using BFG Repo Cleaner
brew install bfg

# Remove file containing secret
bfg --delete-files wp-config.php

# Remove specific text
echo "sk_live_1234567890" > secrets.txt
bfg --replace-text secrets.txt

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (coordinate with team!)
git push origin --force --all
```

### Adding to .gitignore

```gitignore
# Environment files
.env
.env.local
.env.*.local

# WordPress config with secrets
wp-config.php
wp-salts.php

# API credentials
credentials.json
*.pem
*.key

# IDE with possible credentials
.idea/
.vscode/settings.json
```

## CI/CD Configuration

### GitHub Actions

```yaml
name: Security Scan

on:
  push:
  pull_request:
  schedule:
    - cron: '0 0 * * *'  # Daily scan

jobs:
  secrets:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Gitleaks Scan
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: TruffleHog Scan
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
          extra_args: --only-verified

      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: results.sarif
```

### GitLab CI

```yaml
# .gitlab-ci.yml
secret-scan:
  stage: security
  image: zricethezav/gitleaks:latest
  script:
    - gitleaks detect --source=. --report-format=sarif --report-path=gitleaks.sarif
  artifacts:
    reports:
      sast: gitleaks.sarif
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

## Alternative Tools

### TruffleHog

```bash
# Install
pip install trufflehog

# Scan
trufflehog git file://. --only-verified

# Scan GitHub repo
trufflehog github --repo=https://github.com/org/repo
```

### detect-secrets

```bash
# Install
pip install detect-secrets

# Create baseline
detect-secrets scan > .secrets.baseline

# Audit baseline
detect-secrets audit .secrets.baseline

# Pre-commit hook
detect-secrets-hook --baseline .secrets.baseline
```

## WordPress Plugin Best Practices

### Secure Settings Storage

```php
/**
 * Store API key securely.
 */
function my_plugin_save_api_key( string $key ): bool {
    // Never store in plain text if possible
    // Use WordPress's built-in encryption if available (VIP, etc.)
    // Or store encrypted

    if ( defined( 'LOGGED_IN_KEY' ) ) {
        $encrypted = openssl_encrypt(
            $key,
            'aes-256-cbc',
            LOGGED_IN_KEY,
            0,
            substr( LOGGED_IN_SALT, 0, 16 )
        );
        return update_option( 'my_plugin_api_key_encrypted', $encrypted );
    }

    // Fallback: at minimum don't autoload
    return update_option( 'my_plugin_api_key', $key, false );
}

/**
 * Retrieve API key.
 */
function my_plugin_get_api_key(): string {
    // Check environment first
    if ( getenv( 'MY_PLUGIN_API_KEY' ) ) {
        return getenv( 'MY_PLUGIN_API_KEY' );
    }

    // Check constant
    if ( defined( 'MY_PLUGIN_API_KEY' ) ) {
        return MY_PLUGIN_API_KEY;
    }

    // Decrypt from database
    $encrypted = get_option( 'my_plugin_api_key_encrypted' );
    if ( $encrypted && defined( 'LOGGED_IN_KEY' ) ) {
        return openssl_decrypt(
            $encrypted,
            'aes-256-cbc',
            LOGGED_IN_KEY,
            0,
            substr( LOGGED_IN_SALT, 0, 16 )
        );
    }

    return get_option( 'my_plugin_api_key', '' );
}
```

### Example Configuration

```php
// wp-config.php (not in repo)
define( 'MY_PLUGIN_API_KEY', getenv( 'MY_PLUGIN_API_KEY' ) );

// Or use .env file with vlucas/phpdotenv
// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
// $dotenv->load();
```
</knowledge>

<best_practices>
- Run secret scanning in pre-commit hooks
- Scan entire git history periodically
- Use environment variables for secrets
- Rotate any exposed credentials immediately
- Add sensitive files to .gitignore
- Use encrypted storage for API keys
</best_practices>

<commands>
```bash
# Install gitleaks
brew install gitleaks

# Scan current state
gitleaks detect

# Scan git history
gitleaks detect --log-opts="--all"

# Pre-commit check
gitleaks protect --staged

# Generate SARIF report
gitleaks detect --report-format=sarif --report-path=gitleaks.sarif

# Remove secret from history
bfg --replace-text secrets.txt
```
</commands>
</skill>
