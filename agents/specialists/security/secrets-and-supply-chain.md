# 🔑 Secrets and Supply Chain

> **Type**: Specialist
> **Domain**: Secrets Management & Dependencies
> **Authority**: Secret scanning, dependency auditing, SBOM

## 🎯 Mission

Protect against secrets exposure and supply chain attacks. Own secret scanning configuration, dependency vulnerability monitoring, and software bill of materials generation.

## 📥 Inputs

- Repository to scan
- Dependency manifests
- CI/CD configuration
- Third-party service integrations

## 📤 Outputs

- Secret scanning rules
- Dependency audit reports
- SBOM generation
- Remediation plans

---

## 🔧 When to Use

✅ **Use this agent when:**
- Setting up secret scanning
- Auditing dependencies
- Generating SBOM
- Responding to CVE alerts
- Reviewing third-party packages

❌ **Don't use for:**
- Code-level security patterns
- Threat modeling
- Penetration testing
- Access control design

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Secrets in history | Rotate exposed secrets, rewrite history |
| Outdated dependencies | Regular automated audits |
| Transitive vulnerabilities | Check full dependency tree |
| No SBOM | Generate with each release |
| Ignoring advisories | Process all CVE alerts |

---

## ✅ Checklist

### Secret Scanning
- [ ] Pre-commit hooks configured
- [ ] CI/CD scanning enabled
- [ ] Custom patterns for internal secrets
- [ ] Historical scan completed

### Dependency Audit
- [ ] npm audit in CI
- [ ] Composer audit in CI
- [ ] Dependabot/Renovate configured
- [ ] Security advisories monitored

### SBOM
- [ ] SBOM generated for releases
- [ ] Format: SPDX or CycloneDX
- [ ] Includes all dependencies
- [ ] Stored with release artifacts

### Response
- [ ] CVE response process documented
- [ ] SLA for critical vulnerabilities
- [ ] Upgrade path planning
- [ ] Breaking change handling

---

## 💬 Example Prompts

### Claude Code
```
@secrets-and-supply-chain Set up Gitleaks for our repository.
We need to detect API keys, AWS credentials, and our internal
JWT signing keys.
```

### Cursor
```
Using secrets-and-supply-chain, audit our Composer and npm
dependencies. Generate a report of vulnerabilities and
prioritize by severity.
```

### GitHub Copilot
```
# Supply Chain Task: SBOM Generation
#
# Generate SBOM for plugin release:
# - PHP dependencies (Composer)
# - JS dependencies (npm)
# - WordPress compatibility
#
# Format: SPDX
# Include: licenses, versions, checksums
```

### General Prompt
```
Set up complete supply chain security:
1. Secret scanning with custom rules
2. Dependency vulnerability monitoring
3. SBOM generation on release
4. Automated CVE alerts
5. Dependency update automation
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [threat-modeling](threat-modeling.md) | Supply chain threats |
| [linting-and-static-analysis](../ci/linting-and-static-analysis.md) | Static security |
| [github-actions-architect](../ci/github-actions-architect.md) | CI integration |
| [release-manager](../release/release-manager.md) | Release security |

---

## 🔍 Secret Scanning

### Gitleaks Configuration

```toml
# .gitleaks.toml
title = "WordPress Plugin Gitleaks Config"

[extend]
# Extend default rules
useDefault = true

[[rules]]
id = "wordpress-auth-key"
description = "WordPress Authentication Key"
regex = '''(?i)(AUTH_KEY|SECURE_AUTH_KEY|LOGGED_IN_KEY|NONCE_KEY)\s*[=:]\s*['"]([^'"]{32,})['"]'''
tags = ["wordpress", "key"]

[[rules]]
id = "wordpress-salt"
description = "WordPress Salt"
regex = '''(?i)(AUTH_SALT|SECURE_AUTH_SALT|LOGGED_IN_SALT|NONCE_SALT)\s*[=:]\s*['"]([^'"]{32,})['"]'''
tags = ["wordpress", "salt"]

[[rules]]
id = "api-key"
description = "API Key"
regex = '''(?i)(api[_-]?key|apikey)\s*[=:]\s*['"]([a-zA-Z0-9_\-]{20,})['"]'''
tags = ["api", "key"]

[[rules]]
id = "jwt-secret"
description = "JWT Secret"
regex = '''(?i)(jwt[_-]?secret|jwt[_-]?key)\s*[=:]\s*['"]([^'"]{20,})['"]'''
tags = ["jwt", "secret"]

[[rules]]
id = "database-password"
description = "Database Password"
regex = '''(?i)(DB_PASSWORD|database[_-]?pass)\s*[=:]\s*['"]([^'"]+)['"]'''
tags = ["database", "password"]

[allowlist]
paths = [
    '''vendor/''',
    '''node_modules/''',
    '''\.example$''',
    '''\.sample$''',
]
```

### Pre-commit Hook

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks

  - repo: https://github.com/trufflesecurity/trufflehog
    rev: v3.63.0
    hooks:
      - id: trufflehog
```

### GitHub Actions

```yaml
# .github/workflows/secrets.yml
name: Secret Scanning

on:
  push:
    branches: [main]
  pull_request:

jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Gitleaks scan
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  trufflehog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: TruffleHog scan
        uses: trufflesecurity/trufflehog@main
        with:
          extra_args: --only-verified
```

---

## 📦 Dependency Auditing

### Composer Audit

```json
// composer.json
{
    "scripts": {
        "audit": "composer audit --format=json > audit-composer.json",
        "audit:ci": "composer audit --locked"
    }
}
```

```yaml
# CI job
- name: Composer audit
  run: composer audit --locked --format=plain
  continue-on-error: false
```

### npm Audit

```json
// package.json
{
    "scripts": {
        "audit": "npm audit --json > audit-npm.json",
        "audit:ci": "npm audit --audit-level=high"
    }
}
```

```yaml
# CI job
- name: npm audit
  run: npm audit --audit-level=high
```

### Combined Audit Report

```yaml
# .github/workflows/audit.yml
name: Dependency Audit

on:
  schedule:
    - cron: '0 6 * * 1' # Weekly Monday 6am
  push:
    paths:
      - 'composer.lock'
      - 'package-lock.json'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          composer install --no-dev
          npm ci --production

      - name: Composer audit
        run: composer audit --locked

      - name: npm audit
        run: npm audit --audit-level=high

      - name: Generate report
        if: failure()
        run: |
          echo "## Dependency Audit Report" >> $GITHUB_STEP_SUMMARY
          echo "### Composer" >> $GITHUB_STEP_SUMMARY
          composer audit --locked --format=plain >> $GITHUB_STEP_SUMMARY || true
          echo "### npm" >> $GITHUB_STEP_SUMMARY
          npm audit >> $GITHUB_STEP_SUMMARY || true
```

---

## 📋 SBOM Generation

### CycloneDX for PHP

```bash
# Install
composer require --dev cyclonedx/cyclonedx-php-composer

# Generate
./vendor/bin/cyclonedx-php-composer --output-format=json > sbom-composer.json
```

### CycloneDX for npm

```bash
# Install globally
npm install -g @cyclonedx/cyclonedx-npm

# Generate
cyclonedx-npm --output-format json --output-file sbom-npm.json
```

### Combined SBOM in CI

```yaml
# .github/workflows/sbom.yml
name: SBOM Generation

on:
  release:
    types: [published]

jobs:
  sbom:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generate PHP SBOM
        run: |
          composer require --dev cyclonedx/cyclonedx-php-composer
          ./vendor/bin/cyclonedx-php-composer --output-format=json > sbom-php.json

      - name: Generate npm SBOM
        run: |
          npx @cyclonedx/cyclonedx-npm --output-format json --output-file sbom-npm.json

      - name: Merge SBOMs
        run: |
          npx @cyclonedx/cyclonedx-cli merge \
            --input-files sbom-php.json sbom-npm.json \
            --output-file sbom-combined.json

      - name: Upload SBOM to release
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ github.event.release.upload_url }}
          asset_path: ./sbom-combined.json
          asset_name: sbom.json
          asset_content_type: application/json
```

---

## 🔄 Dependency Updates

### Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: composer
    directory: "/"
    schedule:
      interval: weekly
    groups:
      wordpress:
        patterns:
          - "wp-*"
          - "wordpress-*"
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
    labels:
      - dependencies
      - php

  - package-ecosystem: npm
    directory: "/"
    schedule:
      interval: weekly
    groups:
      wordpress:
        patterns:
          - "@wordpress/*"
    labels:
      - dependencies
      - javascript

  - package-ecosystem: github-actions
    directory: "/"
    schedule:
      interval: weekly
    labels:
      - dependencies
      - ci
```

### Renovate Configuration

```json
// renovate.json
{
    "$schema": "https://docs.renovatebot.com/renovate-schema.json",
    "extends": [
        "config:base",
        ":separateMajorReleases",
        ":combinePatchMinorReleases"
    ],
    "packageRules": [
        {
            "matchPackagePatterns": ["@wordpress/*"],
            "groupName": "WordPress packages"
        },
        {
            "matchPackagePatterns": ["phpunit", "wp-phpunit"],
            "groupName": "PHPUnit"
        },
        {
            "matchUpdateTypes": ["major"],
            "labels": ["breaking-change"]
        }
    ],
    "vulnerabilityAlerts": {
        "enabled": true,
        "labels": ["security"]
    }
}
```

---

## 🚨 Incident Response

### Exposed Secret Response

```markdown
## Secret Exposure Response Procedure

### Immediate Actions (within 1 hour)
1. [ ] Rotate the exposed credential immediately
2. [ ] Revoke any active sessions using the credential
3. [ ] Check logs for unauthorized access
4. [ ] Block the exposed key if possible

### Investigation (within 24 hours)
1. [ ] Determine exposure timeline
2. [ ] Identify all affected systems
3. [ ] Audit access logs for anomalies
4. [ ] Document the incident

### Remediation
1. [ ] Remove secret from git history (if applicable)
2. [ ] Update secret management practices
3. [ ] Add secret pattern to scanning rules
4. [ ] Train team on incident

### Post-Incident
1. [ ] Write incident report
2. [ ] Update runbooks
3. [ ] Schedule follow-up review
```

### CVE Response

```markdown
## CVE Response Procedure

### Severity: Critical (CVSS 9.0+)
- Response time: 24 hours
- Actions:
  1. [ ] Assess exploitability
  2. [ ] Check if currently exploited
  3. [ ] Apply patch or mitigation
  4. [ ] Notify affected users

### Severity: High (CVSS 7.0-8.9)
- Response time: 72 hours
- Actions:
  1. [ ] Assess impact
  2. [ ] Schedule patch deployment
  3. [ ] Document workarounds

### Severity: Medium (CVSS 4.0-6.9)
- Response time: 1 week
- Actions:
  1. [ ] Add to backlog
  2. [ ] Include in next release

### Severity: Low (CVSS 0.1-3.9)
- Response time: 2 weeks
- Actions:
  1. [ ] Document and track
  2. [ ] Fix opportunistically
```
