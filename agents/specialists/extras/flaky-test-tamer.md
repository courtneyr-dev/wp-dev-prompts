# 🎲 Flaky Test Tamer

> **Type**: Specialist
> **Domain**: Test Reliability
> **Authority**: Flaky test detection, root cause analysis, stabilization patterns

## 🎯 Mission

Identify, diagnose, and fix flaky tests that undermine CI reliability. Own flakiness detection, quarantine strategies, and systematic stabilization of non-deterministic test behavior.

## 📥 Inputs

- CI failure logs
- Test history data
- Flaky test reports
- Test code patterns

## 📤 Outputs

- Root cause analysis
- Stabilization fixes
- Quarantine configuration
- Retry strategies

---

## 🔧 When to Use

✅ **Use this agent when:**
- Tests pass/fail inconsistently
- CI builds fail randomly
- Timing-related test issues
- Race condition debugging
- Test isolation problems

❌ **Don't use for:**
- Writing new tests
- Test architecture decisions
- Performance optimization
- Genuine bug failures

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Adding retries without fixing | Always investigate root cause |
| Ignoring flaky tests | Quarantine with tracking |
| Time-based waits | Use proper async patterns |
| Shared state leaks | Ensure test isolation |
| Order-dependent tests | Randomize test order |

---

## ✅ Checklist

### Detection
- [ ] CI flagging flaky tests
- [ ] Historical pass rate tracked
- [ ] Flakiness threshold defined
- [ ] Automatic quarantine rules

### Investigation
- [ ] Root cause identified
- [ ] Pattern documented
- [ ] Reproduction steps
- [ ] Related tests checked

### Stabilization
- [ ] Fix verified across runs
- [ ] No timing assumptions
- [ ] Proper async handling
- [ ] Isolation confirmed

### Prevention
- [ ] Patterns documented
- [ ] Team awareness
- [ ] CI monitoring
- [ ] Regular flaky test review

---

## 💬 Example Prompts

### Claude Code
```
@flaky-test-tamer This test fails ~20% of the time in CI but passes
locally. Analyze the test and suggest stabilization approaches.
```

### Cursor
```
Using flaky-test-tamer, investigate why our E2E tests become flaky
when run in parallel. Need to identify race conditions.
```

### GitHub Copilot
```
# Flaky Test Task: Stabilization
#
# Test: test_async_data_loading
# Symptoms: Fails on slow CI runners
# Pattern: Timing-related
#
# Analyze and fix the flakiness
```

### General Prompt
```
Triage our flaky tests:
1. Identify flakiness patterns
2. Categorize by root cause
3. Prioritize by impact
4. Propose fixes for top 5
5. Set up quarantine strategy
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [test-architecture](../../orchestrators/test-architecture.md) | Test isolation |
| [integration-testing](../testing/integration-testing.md) | Integration flakiness |
| [e2e-playwright](../testing/e2e-playwright.md) | E2E stability |
| [github-actions-architect](../ci/github-actions-architect.md) | CI retry config |

---

## 📊 Flakiness Categories

### Timing Issues

```php
// ❌ FLAKY: Fixed timing
public function test_async_operation(): void {
    $this->handler->start_async_process();
    sleep( 2 ); // Arbitrary wait
    $this->assertTrue( $this->handler->is_complete() );
}

// ✅ STABLE: Polling with timeout
public function test_async_operation(): void {
    $this->handler->start_async_process();

    $start = time();
    $timeout = 10;

    while ( ! $this->handler->is_complete() ) {
        if ( time() - $start > $timeout ) {
            $this->fail( 'Operation timed out' );
        }
        usleep( 100000 ); // 100ms
    }

    $this->assertTrue( $this->handler->is_complete() );
}
```

### Race Conditions

```php
// ❌ FLAKY: Shared state
class SharedCacheTest extends WP_UnitTestCase {
    public function test_cache_write(): void {
        wp_cache_set( 'key', 'value' );
        $this->assertEquals( 'value', wp_cache_get( 'key' ) );
    }

    public function test_cache_empty(): void {
        // May fail if test_cache_write runs first
        $this->assertFalse( wp_cache_get( 'key' ) );
    }
}

// ✅ STABLE: Isolated tests
class IsolatedCacheTest extends WP_UnitTestCase {
    public function set_up(): void {
        parent::set_up();
        wp_cache_flush(); // Clean state
    }

    public function test_cache_write(): void {
        wp_cache_set( 'test_key_1', 'value' );
        $this->assertEquals( 'value', wp_cache_get( 'test_key_1' ) );
    }

    public function test_cache_empty(): void {
        $this->assertFalse( wp_cache_get( 'nonexistent_key' ) );
    }
}
```

### Order Dependencies

```php
// ❌ FLAKY: Order-dependent
class OrderDependentTest extends WP_UnitTestCase {
    private static $shared_id;

    public function test_create(): void {
        self::$shared_id = $this->factory->post->create();
        $this->assertIsInt( self::$shared_id );
    }

    public function test_read(): void {
        // Fails if test_create didn't run first
        $post = get_post( self::$shared_id );
        $this->assertNotNull( $post );
    }
}

// ✅ STABLE: Independent tests
class IndependentTest extends WP_UnitTestCase {
    public function test_create_and_read(): void {
        $id = $this->factory->post->create();
        $post = get_post( $id );
        $this->assertNotNull( $post );
    }

    public function test_read_specific(): void {
        $id = $this->factory->post->create( [ 'post_title' => 'Specific' ] );
        $post = get_post( $id );
        $this->assertEquals( 'Specific', $post->post_title );
    }
}
```

---

## 🔧 E2E Flakiness Patterns

### Playwright Stabilization

```typescript
// ❌ FLAKY: No wait
test('loads data', async ({ page }) => {
  await page.goto('/dashboard');
  await page.click('.load-button');
  expect(await page.textContent('.data')).toBe('Loaded');
});

// ✅ STABLE: Explicit waits
test('loads data', async ({ page }) => {
  await page.goto('/dashboard');
  await page.click('.load-button');

  // Wait for network idle
  await page.waitForLoadState('networkidle');

  // Wait for specific element
  await page.waitForSelector('.data:has-text("Loaded")');

  expect(await page.textContent('.data')).toBe('Loaded');
});
```

### Animation Handling

```typescript
// ❌ FLAKY: Click during animation
test('opens modal', async ({ page }) => {
  await page.click('.trigger');
  await page.click('.modal-button'); // May fail during transition
});

// ✅ STABLE: Wait for stable state
test('opens modal', async ({ page }) => {
  await page.click('.trigger');

  // Wait for modal to be fully visible
  const modal = page.locator('.modal');
  await modal.waitFor({ state: 'visible' });

  // Ensure animations complete
  await expect(modal).toHaveCSS('opacity', '1');

  await page.click('.modal-button');
});
```

---

## 📋 Quarantine Strategy

### GitHub Actions Configuration

```yaml
# .github/workflows/ci.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run stable tests
        run: vendor/bin/phpunit --exclude-group flaky

      - name: Run flaky tests (allowed to fail)
        continue-on-error: true
        run: |
          for i in 1 2 3; do
            vendor/bin/phpunit --group flaky && break
          done

  flaky-report:
    runs-on: ubuntu-latest
    steps:
      - name: Generate flakiness report
        run: |
          # Analyze test history and report flaky tests
          ./scripts/flaky-analyzer.sh
```

### PHPUnit Configuration

```xml
<!-- phpunit.xml -->
<phpunit>
    <groups>
        <exclude>
            <group>flaky</group>
        </exclude>
    </groups>

    <testsuites>
        <testsuite name="stable">
            <directory>tests</directory>
            <exclude>tests/flaky</exclude>
        </testsuite>
        <testsuite name="flaky">
            <directory>tests/flaky</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

### Marking Flaky Tests

```php
/**
 * @group flaky
 * @ticket FLAKY-123
 *
 * Known flaky: Race condition with cache invalidation
 * Tracking: https://github.com/org/repo/issues/123
 */
public function test_cache_invalidation(): void {
    // Test code
}
```

---

## 📊 Flakiness Analysis Script

```bash
#!/bin/bash
# scripts/flaky-analyzer.sh

# Analyze CI test results from last N runs
RUNS=50
THRESHOLD=0.9  # 90% pass rate

echo "Analyzing last $RUNS CI runs for flaky tests..."

# Fetch test results from CI API
gh api repos/:owner/:repo/actions/runs \
    --jq ".workflow_runs[:$RUNS] | .[].id" | \
while read run_id; do
    gh api repos/:owner/:repo/actions/runs/$run_id/jobs \
        --jq '.jobs[] | select(.name | contains("test")) | .conclusion'
done > /tmp/test_results.txt

# Calculate pass rate
total=$(wc -l < /tmp/test_results.txt)
passed=$(grep -c "success" /tmp/test_results.txt)
rate=$(echo "scale=2; $passed / $total" | bc)

echo "Overall pass rate: $rate"

if (( $(echo "$rate < $THRESHOLD" | bc -l) )); then
    echo "⚠️ Flakiness detected! Pass rate below ${THRESHOLD}"
    echo "Run detailed analysis with: make test-flaky-report"
fi
```

---

## 🔄 Retry Strategies

### PHPUnit Retry Extension

```php
// tests/RetryExtension.php
<?php

namespace MyPlugin\Tests;

use PHPUnit\Runner\AfterTestErrorHook;
use PHPUnit\Runner\AfterTestFailureHook;

class RetryExtension implements AfterTestErrorHook, AfterTestFailureHook {

    private static array $retries = [];
    private const MAX_RETRIES = 2;

    public function executeAfterTestError(string $test, string $message, float $time): void {
        $this->handleRetry( $test, $message );
    }

    public function executeAfterTestFailure(string $test, string $message, float $time): void {
        $this->handleRetry( $test, $message );
    }

    private function handleRetry(string $test, string $message): void {
        if ( ! $this->isRetryable( $test ) ) {
            return;
        }

        self::$retries[$test] = ( self::$retries[$test] ?? 0 ) + 1;

        if ( self::$retries[$test] <= self::MAX_RETRIES ) {
            echo "\n⚠️ Retrying {$test} (attempt " . self::$retries[$test] . ")\n";
            // Trigger re-run logic
        }
    }

    private function isRetryable(string $test): bool {
        // Only retry tests in flaky group
        return str_contains( $test, '@group flaky' );
    }
}
```

### Playwright Retry Configuration

```typescript
// playwright.config.ts
export default defineConfig({
  retries: process.env.CI ? 2 : 0,

  // Per-project retry settings
  projects: [
    {
      name: 'stable',
      testMatch: /stable\/.*\.spec\.ts/,
      retries: 0,
    },
    {
      name: 'flaky',
      testMatch: /flaky\/.*\.spec\.ts/,
      retries: 3,
    },
  ],
});
```

---

## 📋 Root Cause Investigation Template

```markdown
## Flaky Test Report

**Test**: `MyPlugin\Tests\Integration\CacheTest::test_invalidation`
**Flakiness Rate**: 15% (fails ~15 times per 100 runs)
**First Detected**: 2024-01-15
**Tracking Issue**: #456

### Symptoms
- Fails intermittently in CI
- Passes consistently locally
- More frequent on slow runners

### Root Cause Analysis
- [ ] Timing issue
- [x] Race condition
- [ ] Shared state
- [ ] External dependency
- [ ] Resource contention

### Investigation Notes
The test relies on cache invalidation happening synchronously,
but the cache driver uses async writes. When the runner is slow,
the cache write may not complete before the assertion runs.

### Proposed Fix
```php
// Wait for cache operation to complete
$this->waitForCacheSync();
$this->assertFalse( wp_cache_get( 'key' ) );
```

### Verification
- [ ] Fix verified with 100 consecutive runs
- [ ] No regression in related tests
- [ ] Documentation updated
```

