# 📚 Regression Suite Curator

> **Type**: Specialist
> **Domain**: Test Organization
> **Authority**: Test categorization, suite structure, regression tracking

## 🎯 Mission

Organize and maintain regression test suites. Own test categorization, priority classification, and regression tracking. Ensure critical paths are always tested and new regressions are caught systematically.

## 📥 Inputs

- Existing test files
- Bug reports and fixes
- Feature changes
- Coverage reports
- Test execution times

## 📤 Outputs

- Test suite organization
- Priority classifications
- Regression test additions
- Suite configuration
- Coverage maps

---

## 🔧 When to Use

✅ **Use this agent when:**
- Organizing test suites
- Adding regression tests for bugs
- Prioritizing test execution
- Planning test coverage
- Reducing test redundancy

❌ **Don't use for:**
- Writing individual tests
- Test framework decisions
- CI configuration
- Quality gate definitions

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Duplicate test coverage | Map tests to requirements |
| Missing critical paths | Document and track critical flows |
| Slow test suites | Categorize by priority/speed |
| Orphaned tests | Regular suite review |
| No regression tracking | Bug→Test→Verify process |

---

## ✅ Checklist

### Suite Organization
- [ ] Tests grouped by feature/domain
- [ ] Clear naming conventions
- [ ] Tagged by priority (smoke, critical, full)
- [ ] Tagged by type (unit, integration, e2e)

### Regression Tracking
- [ ] Each bug fix has regression test
- [ ] Tests linked to issues
- [ ] Regression tests in smoke suite
- [ ] Verify-fix process documented

### Coverage Mapping
- [ ] Critical paths identified
- [ ] Coverage gaps documented
- [ ] Feature→Test mapping exists
- [ ] Regular coverage reviews

### Maintenance
- [ ] Obsolete tests removed
- [ ] Flaky tests quarantined
- [ ] Suite runs in <30min
- [ ] Parallel execution optimized

---

## 💬 Example Prompts

### Claude Code
```
@regression-suite-curator Organize our test suite into smoke, critical,
and full categories. We need smoke to run in <5 min on PRs.
```

### Cursor
```
Using regression-suite-curator, add a regression test for issue #234.
The bug was in checkout when applying multiple discount codes.
```

### GitHub Copilot
```
# Regression Suite Task: Coverage Analysis
#
# Analyze our test suite for:
# - Missing critical path coverage
# - Duplicate tests
# - Tests that can be parallelized
# - Tests that should be in smoke suite
#
# Provide reorganization plan
```

### General Prompt
```
Help me reorganize our test suite:
1. We have 500+ tests taking 45 minutes
2. Need a 5-minute smoke suite for PRs
3. Need to identify redundant tests
4. Need to prioritize by business impact
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [qa-director](../../orchestrators/qa-director.md) | Suite strategy |
| [test-architecture](../../orchestrators/test-architecture.md) | Test boundaries |
| [flaky-test-tamer](../extras/flaky-test-tamer.md) | Suite stability |
| [unit-testing](unit-testing.md) | Unit test categorization |

---

## 📋 Suite Organization

### Directory Structure

```
tests/
├── unit/
│   ├── api/
│   │   ├── RestControllerTest.php
│   │   └── ValidationTest.php
│   ├── core/
│   │   ├── CalculatorTest.php
│   │   └── ProcessorTest.php
│   └── utils/
│       └── HelperTest.php
├── integration/
│   ├── database/
│   │   ├── MigrationTest.php
│   │   └── QueryTest.php
│   ├── hooks/
│   │   └── FilterTest.php
│   └── rest-api/
│       └── EndpointTest.php
├── e2e/
│   ├── checkout/
│   │   ├── guest-checkout.spec.ts
│   │   └── registered-checkout.spec.ts
│   └── admin/
│       ├── settings.spec.ts
│       └── dashboard.spec.ts
└── regression/
    ├── issue-234-discount-codes.php
    ├── issue-456-multisite-options.php
    └── issue-789-rtl-layout.spec.ts
```

### PHPUnit Groups

```php
/**
 * @group smoke
 * @group critical
 * @group checkout
 */
class CheckoutTest extends WP_UnitTestCase {
    // ...
}

/**
 * @group slow
 * @group migration
 */
class DataMigrationTest extends WP_UnitTestCase {
    // ...
}
```

### Running by Group

```bash
# Run smoke tests only
vendor/bin/phpunit --group smoke

# Run critical but exclude slow
vendor/bin/phpunit --group critical --exclude-group slow

# Run specific feature
vendor/bin/phpunit --group checkout
```

---

## 🏷️ Priority Classification

### Smoke Suite (<5 min)
Tests that must always pass. Run on every PR.

```php
/**
 * Smoke test: Plugin activates without errors.
 *
 * @group smoke
 */
public function test_plugin_activates(): void {
    activate_plugin( 'my-plugin/my-plugin.php' );

    $this->assertTrue( is_plugin_active( 'my-plugin/my-plugin.php' ) );
}

/**
 * Smoke test: Admin menu appears.
 *
 * @group smoke
 */
public function test_admin_menu_exists(): void {
    global $menu;

    $this->assertContains( 'my-plugin', wp_list_pluck( $menu, 2 ) );
}
```

### Critical Suite (<15 min)
Core functionality tests. Run on every PR.

```php
/**
 * @group critical
 */
class CoreFunctionalityTest extends WP_UnitTestCase {
    // Test main user flows
}
```

### Full Suite (<45 min)
Comprehensive tests. Run nightly.

```php
/**
 * @group full
 * @group slow
 */
class ComprehensiveMigrationTest extends WP_UnitTestCase {
    // Test all migration paths
}
```

---

## 🔄 Regression Test Process

### 1. Bug Report → Test

```php
/**
 * Regression test for issue #234.
 *
 * Bug: Multiple discount codes applied incorrect total.
 * Fix: Calculate discounts sequentially, not in parallel.
 *
 * @link https://github.com/org/repo/issues/234
 * @group regression
 * @group critical
 * @group checkout
 */
public function test_issue_234_multiple_discount_codes(): void {
    // Arrange: Create order with items
    $order_id = $this->create_order_with_items( 100.00 );

    // Apply first discount (10%)
    apply_discount( $order_id, 'SAVE10' );

    // Apply second discount (20%)
    apply_discount( $order_id, 'EXTRA20' );

    // Assert: Discounts applied correctly (100 * 0.9 * 0.8 = 72)
    $order = get_order( $order_id );
    $this->assertEquals( 72.00, $order->total );
}
```

### 2. Verify Fix Process

```markdown
## Regression Test Checklist

- [ ] Issue number referenced in test
- [ ] Test reproduces original bug (fails before fix)
- [ ] Test passes after fix
- [ ] Test added to appropriate suite (smoke/critical/full)
- [ ] Test tagged with feature area
- [ ] Related tests reviewed for coverage
```

---

## 📊 Coverage Mapping

### Feature → Test Matrix

```yaml
# tests/coverage-map.yml
features:
  checkout:
    critical_paths:
      - Guest purchase
      - Logged-in purchase
      - Discount codes
      - Shipping calculation
    tests:
      unit:
        - CartCalculatorTest
        - DiscountEngineTest
      integration:
        - CheckoutFlowTest
        - PaymentGatewayTest
      e2e:
        - guest-checkout.spec.ts
        - registered-checkout.spec.ts
    coverage_status: complete

  admin_settings:
    critical_paths:
      - Save settings
      - Reset to defaults
      - Import/export
    tests:
      integration:
        - SettingsTest
      e2e:
        - settings.spec.ts
    coverage_status: partial
    gaps:
      - Import/export not E2E tested
```

### Coverage Report

```typescript
// scripts/coverage-report.ts
import { glob } from 'glob';
import { parse } from 'yaml';

async function analyzeCoverage() {
    const map = parse(await readFile('tests/coverage-map.yml'));

    const report = {
        total_features: Object.keys(map.features).length,
        complete: 0,
        partial: 0,
        gaps: [],
    };

    for (const [name, feature] of Object.entries(map.features)) {
        if (feature.coverage_status === 'complete') {
            report.complete++;
        } else {
            report.partial++;
            report.gaps.push({
                feature: name,
                gaps: feature.gaps,
            });
        }
    }

    return report;
}
```

---

## 🧹 Suite Maintenance

### Obsolete Test Detection

```php
/**
 * Tests for deprecated feature.
 *
 * @deprecated 2.0.0 Feature removed, tests pending deletion.
 * @group deprecated
 */
class LegacyFeatureTest extends WP_UnitTestCase {
    // Mark for removal in next major version
}
```

### Duplicate Detection

```typescript
// scripts/find-duplicates.ts
// Analyze test files for overlapping coverage

const testMap = new Map<string, string[]>();

for (const testFile of testFiles) {
    const tests = extractTestMethods(testFile);

    for (const test of tests) {
        const signature = getTestSignature(test);

        if (testMap.has(signature)) {
            console.log(`Potential duplicate: ${signature}`);
            console.log(`  - ${testMap.get(signature)}`);
            console.log(`  - ${testFile}`);
        } else {
            testMap.set(signature, testFile);
        }
    }
}
```

### Suite Health Dashboard

```markdown
## Test Suite Health Report

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Smoke suite time | 4:23 | <5:00 | ✅ |
| Critical suite time | 12:45 | <15:00 | ✅ |
| Full suite time | 52:10 | <45:00 | ⚠️ |
| Flaky tests | 3 | 0 | ⚠️ |
| Quarantined tests | 2 | <5 | ✅ |
| Coverage | 78% | >80% | ⚠️ |
| Regression tests | 45 | - | ℹ️ |

### Action Items
- [ ] Optimize slow migration tests
- [ ] Fix flaky: CartTest::test_concurrent_updates
- [ ] Fix flaky: E2E checkout timeout
- [ ] Add coverage for admin export feature
```

---

## ⚙️ PHPUnit Configuration

```xml
<!-- phpunit.xml.dist -->
<phpunit>
    <testsuites>
        <testsuite name="smoke">
            <directory>tests/unit</directory>
            <directory>tests/integration</directory>
            <exclude>tests/integration/slow</exclude>
        </testsuite>

        <testsuite name="critical">
            <directory>tests/unit</directory>
            <directory>tests/integration</directory>
        </testsuite>

        <testsuite name="full">
            <directory>tests/unit</directory>
            <directory>tests/integration</directory>
            <directory>tests/regression</directory>
        </testsuite>

        <testsuite name="regression">
            <directory>tests/regression</directory>
        </testsuite>
    </testsuites>

    <groups>
        <exclude>
            <group>quarantine</group>
        </exclude>
    </groups>
</phpunit>
```
