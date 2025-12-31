# 📊 Reporting and Artifacts

> **Type**: Specialist
> **Domain**: CI Outputs
> **Authority**: Test reports, coverage, artifacts, dashboards

## 🎯 Mission

Standardize CI/CD output formats and artifact management. Own JUnit XML, SARIF, coverage reports, and artifact upload strategies for consistent reporting across all workflows.

## 📥 Inputs

- Test runners
- Analysis tools
- Build outputs
- Retention requirements

## 📤 Outputs

- JUnit XML reports
- SARIF security reports
- Coverage reports
- Artifact configurations
- Dashboard integrations

---

## 🔧 When to Use

✅ **Use this agent when:**
- Configuring test result reporting
- Setting up coverage tracking
- Managing CI artifacts
- Integrating with dashboards
- Standardizing output formats

❌ **Don't use for:**
- Writing tests
- Configuring tools
- Workflow design
- Quality gates

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Missing reports | Always upload on failure |
| Large artifacts | Compress, set retention |
| Format inconsistency | Standardize across tools |
| Report not parsed | Use correct format |
| Coverage gaps | Combine all sources |

---

## ✅ Checklist

### Test Reports
- [ ] JUnit XML for all test suites
- [ ] Uploaded for GitHub annotations
- [ ] Combined across matrix jobs
- [ ] Retained for debugging

### Coverage
- [ ] Coverage XML generated
- [ ] Uploaded to service (Codecov/Coveralls)
- [ ] Combined from all test types
- [ ] Badge in README

### Security
- [ ] SARIF format for security tools
- [ ] Uploaded to GitHub Security
- [ ] Includes all scan types
- [ ] Severity levels correct

### Artifacts
- [ ] Naming convention consistent
- [ ] Retention policy set
- [ ] Compressed appropriately
- [ ] Failure artifacts captured

---

## 💬 Example Prompts

### Claude Code
```
@reporting-and-artifacts Configure PHPUnit to output JUnit XML
and coverage reports. Set up upload to Codecov with proper merging.
```

### Cursor
```
Using reporting-and-artifacts, add SARIF output to our security
scanning and upload to GitHub Security tab.
```

### GitHub Copilot
```
# Reporting Task: Artifact Strategy
#
# Configure artifacts for:
# - Test results (JUnit XML)
# - Coverage (Clover XML)
# - Screenshots (on failure)
# - Traces (on failure)
#
# Include: naming, retention, upload conditions
```

### General Prompt
```
Set up comprehensive CI reporting:
1. JUnit for all test types
2. Coverage with Codecov
3. SARIF for security scans
4. Lighthouse for performance
5. Dashboard integration
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [github-actions-architect](github-actions-architect.md) | Workflow integration |
| [qa-director](../../orchestrators/qa-director.md) | Quality metrics |
| [linting-and-static-analysis](linting-and-static-analysis.md) | Analysis reports |
| [e2e-playwright](../testing/e2e-playwright.md) | Test traces |

---

## 📋 Report Formats

### JUnit XML (PHPUnit)

```xml
<!-- phpunit.xml.dist -->
<phpunit>
    <logging>
        <junit outputFile="junit.xml"/>
    </logging>
</phpunit>
```

```yaml
# GitHub Actions
- name: Run tests
  run: vendor/bin/phpunit --log-junit=junit.xml

- name: Publish test results
  uses: mikepenz/action-junit-report@v4
  if: always()
  with:
    report_paths: junit.xml
    check_name: PHPUnit Results
```

### JUnit XML (Playwright)

```typescript
// playwright.config.ts
export default defineConfig({
    reporter: [
        ['html'],
        ['junit', { outputFile: 'test-results/junit.xml' }],
    ],
});
```

### Coverage (Clover XML)

```xml
<!-- phpunit.xml.dist -->
<phpunit>
    <coverage>
        <report>
            <clover outputFile="coverage.xml"/>
            <html outputDirectory="coverage-html"/>
        </report>
    </coverage>
</phpunit>
```

```yaml
# Upload to Codecov
- name: Upload coverage
  uses: codecov/codecov-action@v4
  with:
    files: coverage.xml
    flags: unittests
    name: php-${{ matrix.php }}
    fail_ci_if_error: true
```

### SARIF (Security)

```yaml
# PHPStan SARIF
- name: Run PHPStan
  run: vendor/bin/phpstan analyze --error-format=sarif > phpstan.sarif

- name: Upload SARIF
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: phpstan.sarif

# Semgrep SARIF
- name: Run Semgrep
  run: semgrep --config auto --sarif > semgrep.sarif

- name: Upload SARIF
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: semgrep.sarif
```

---

## 📦 Artifact Configuration

### Standard Naming

```yaml
- name: Upload test results
  uses: actions/upload-artifact@v4
  with:
    name: test-results-php${{ matrix.php }}-wp${{ matrix.wp }}
    path: |
      junit.xml
      coverage.xml
    retention-days: 14

- name: Upload failure artifacts
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: failure-artifacts-${{ github.run_id }}
    path: |
      /tmp/wordpress/wp-content/debug.log
      test-results/
    retention-days: 7
```

### Combining Matrix Artifacts

```yaml
# After matrix jobs complete
combine-coverage:
  needs: test
  runs-on: ubuntu-latest
  steps:
    - name: Download all coverage
      uses: actions/download-artifact@v4
      with:
        pattern: coverage-*
        merge-multiple: true
        path: coverage

    - name: Upload combined coverage
      uses: codecov/codecov-action@v4
      with:
        directory: coverage
```

### Retention Policy

```yaml
# Default: 90 days for public, 400 days for private

# Override per artifact
- uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: dist/
    retention-days: 30  # Keep for 30 days

# For debugging (short retention)
- uses: actions/upload-artifact@v4
  if: failure()
  with:
    name: debug-logs
    path: logs/
    retention-days: 3
```

---

## 📊 Coverage Integration

### Codecov Configuration

```yaml
# codecov.yml
coverage:
  status:
    project:
      default:
        target: 80%
        threshold: 2%
    patch:
      default:
        target: 80%

comment:
  layout: "reach,diff,files"
  behavior: default
  require_changes: true

flags:
  unit:
    paths:
      - src/
    carryforward: true
  integration:
    paths:
      - src/
    carryforward: true
```

### Upload with Flags

```yaml
# Unit tests
- name: Upload unit coverage
  uses: codecov/codecov-action@v4
  with:
    files: coverage-unit.xml
    flags: unit
    name: unit-tests

# Integration tests
- name: Upload integration coverage
  uses: codecov/codecov-action@v4
  with:
    files: coverage-integration.xml
    flags: integration
    name: integration-tests
```

---

## 📈 Dashboard Integration

### Lighthouse CI

```yaml
- name: Run Lighthouse CI
  run: npx lhci autorun
  env:
    LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

# .lighthouserc.js
module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

### GitHub Job Summary

```yaml
- name: Create summary
  run: |
    echo "## Test Results" >> $GITHUB_STEP_SUMMARY
    echo "" >> $GITHUB_STEP_SUMMARY
    echo "| Metric | Value |" >> $GITHUB_STEP_SUMMARY
    echo "|--------|-------|" >> $GITHUB_STEP_SUMMARY
    echo "| Tests | $(grep -c 'testcase' junit.xml) |" >> $GITHUB_STEP_SUMMARY
    echo "| Passed | $(grep -c 'passed' junit.xml) |" >> $GITHUB_STEP_SUMMARY
    echo "| Coverage | $(grep -oP 'line-rate="\K[^"]+' coverage.xml | head -1)% |" >> $GITHUB_STEP_SUMMARY
```

---

## 🔍 Playwright Reports

### HTML Report

```typescript
// playwright.config.ts
export default defineConfig({
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
    ],
});
```

### Upload Artifacts

```yaml
- name: Run Playwright
  run: npx playwright test

- name: Upload HTML report
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 14

- name: Upload traces on failure
  uses: actions/upload-artifact@v4
  if: failure()
  with:
    name: playwright-traces
    path: test-results/
    retention-days: 7
```

---

## 📋 Report Templates

### Test Results Summary

```markdown
## Test Results Summary

### PHPUnit
- **Total Tests**: 245
- **Passed**: 243
- **Failed**: 2
- **Skipped**: 0
- **Time**: 45.2s

### Coverage
- **Line Coverage**: 82.5%
- **Function Coverage**: 78.3%
- **Branch Coverage**: 71.2%

### Failed Tests
1. `Tests\Unit\CalculatorTest::testDivideByZero`
2. `Tests\Integration\ApiTest::testRateLimiting`
```

### Security Scan Summary

```markdown
## Security Scan Results

### Summary
| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 1 |
| Medium | 3 |
| Low | 7 |

### High Severity Issues
1. **SQL Injection Risk** in `src/Query.php:45`
   - CWE-89: SQL Injection
   - Fix: Use prepared statements
```
