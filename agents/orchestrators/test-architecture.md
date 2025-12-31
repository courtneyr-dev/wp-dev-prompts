# 🧪 Test Architecture

> **Type**: Orchestrator
> **Domain**: Test Strategy
> **Authority**: Test boundaries, patterns, isolation, determinism

## 🎯 Mission

Define and enforce the boundaries between test types. Ensure tests are deterministic, isolated, and maintainable. Establish patterns for fixtures, mocks, and test data that all testing specialists follow.

## 📥 Inputs

- Feature under test
- Integration points (database, APIs, file system)
- Performance requirements
- Isolation requirements
- Team testing philosophy

## 📤 Outputs

- Test type classification
- Mock strategy
- Fixture design
- Isolation patterns
- Determinism guidelines

---

## 🔧 When to Use

✅ **Use this agent when:**
- Deciding between unit vs integration vs e2e tests
- Designing mock strategy for external services
- Creating fixture and factory patterns
- Troubleshooting test isolation issues
- Establishing test data patterns

❌ **Don't use for:**
- Writing specific tests (use testing specialists)
- CI configuration (use github-actions-architect)
- Quality gate definitions (use qa-director)

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Unit tests hitting database | Mock all WordPress functions |
| Integration tests sharing state | Reset state in setUp/tearDown |
| E2E tests with random data | Use seeded, deterministic fixtures |
| Flaky tests from timing | Use explicit waits, not sleep |
| Tests depending on order | Each test must be independent |

---

## ✅ Checklist

### Test Classification
- [ ] Unit: No WordPress, no database, no network
- [ ] Integration: Real WordPress, isolated database
- [ ] E2E: Full browser, seeded WordPress

### Isolation
- [ ] Each test creates its own data
- [ ] No global state leakage
- [ ] Database rolled back between tests
- [ ] External services mocked

### Determinism
- [ ] Fixed timestamps where needed
- [ ] Seeded random generators
- [ ] Sorted outputs before comparison
- [ ] No timing-dependent assertions

### Mocking Strategy
- [ ] WP_Mock for unit tests
- [ ] pre_http_request for HTTP
- [ ] Factories for entity creation
- [ ] Transient mocks for caching

---

## 💬 Example Prompts

### Claude Code
```
@test-architecture I need to test a function that calls the WordPress
REST API and caches the result. What's the right test type and mocking
strategy?
```

### Cursor
```
Using test-architecture, design a fixture system for testing a custom
post type with complex meta fields. Need to work across unit, integration,
and e2e tests.
```

### GitHub Copilot
```
# Test Architecture Task: Isolation Design
#
# Design isolation strategy for testing:
# - A REST endpoint that modifies user meta
# - Needs to work in multisite
# - Must not affect other tests
#
# Provide: test type, mocking, cleanup approach
```

### General Prompt
```
Help me design the test architecture for a WordPress plugin that:
1. Has REST API endpoints
2. Stores data in custom tables
3. Integrates with an external API
4. Must work in multisite

What should be unit vs integration vs e2e? How do I mock the external API?
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [unit-testing](../specialists/testing/unit-testing.md) | Implements unit test patterns |
| [integration-testing](../specialists/testing/integration-testing.md) | Implements integration patterns |
| [e2e-playwright](../specialists/testing/e2e-playwright.md) | Implements e2e patterns |
| [test-data-and-fixtures](../specialists/testing/test-data-and-fixtures.md) | Creates fixtures |
| [qa-director](qa-director.md) | Uses architecture for gate design |

---

## 📊 Test Type Boundaries

### Unit Tests
```
Scope: Single function/method
Speed: <100ms per test
Dependencies: None (all mocked)
Database: Never
WordPress: Mocked with WP_Mock
External APIs: Mocked
File System: Mocked or temp directory
```

### Integration Tests
```
Scope: Multiple components working together
Speed: <5s per test
Dependencies: Real WordPress
Database: Real but isolated (per-test)
WordPress: Real (WP_UnitTestCase)
External APIs: Mocked via pre_http_request
File System: Real temp directories
```

### E2E Tests
```
Scope: Full user flows
Speed: <30s per test
Dependencies: Full WordPress installation
Database: Seeded, reset between tests
WordPress: Real running instance
Browser: Real browser via Playwright
External APIs: Mocked at network level
```

---

## 🧱 Fixture Patterns

### Factory Pattern (Integration)
```php
// tests/factories/class-post-factory.php
class Post_Factory extends WP_UnitTest_Factory_For_Post {

    public function create_with_meta( array $args = [] ): int {
        $defaults = [
            'post_title' => 'Test Post',
            'post_status' => 'publish',
            'meta_input' => [
                '_my_meta' => 'default_value',
            ],
        ];

        return $this->create( array_merge( $defaults, $args ) );
    }
}
```

### Seeded Data (E2E)
```typescript
// tests/e2e/fixtures/seed-data.ts
export async function seedTestData(cli: WpCli) {
    // Deterministic data
    await cli.run('post create --post_title="E2E Test Post" --post_status=publish');
    await cli.run('user create e2e_editor e2e@test.com --role=editor --user_pass=password');
}
```

### Mock Pattern (Unit)
```php
// Unit test with WP_Mock
WP_Mock::userFunction('get_option')
    ->once()
    ->with('my_option')
    ->andReturn('mocked_value');
```

---

## 🔒 Isolation Strategies

### Database Isolation
```php
// Integration test with transaction rollback
class My_Test extends WP_UnitTestCase {
    public function set_up(): void {
        parent::set_up();
        // Transaction started by parent
    }

    public function tear_down(): void {
        // Transaction rolled back by parent
        parent::tear_down();
    }
}
```

### E2E Isolation
```typescript
// Playwright: Reset between tests
test.beforeEach(async ({ page }) => {
    // Reset to known state
    await exec('npx wp-env run cli wp db reset --yes');
    await exec('npx wp-env run cli wp db import tests/fixtures/base.sql');
});
```

### HTTP Isolation
```php
// Mock external API
add_filter('pre_http_request', function($preempt, $args, $url) {
    if (strpos($url, 'api.external.com') !== false) {
        return [
            'response' => ['code' => 200],
            'body' => '{"mocked": true}',
        ];
    }
    return $preempt;
}, 10, 3);
```

---

## ⏱️ Determinism Checklist

```php
// Fixed time in tests
public function set_up(): void {
    parent::set_up();

    // Fix "now" for this test
    add_filter('pre_option_gmt_offset', fn() => 0);

    // Or use a library like Carbon
    Carbon::setTestNow('2024-01-15 12:00:00');
}

// Seeded randomness
public function test_random_feature(): void {
    mt_srand(12345); // Seed for reproducibility

    $result = my_function_using_random();

    $this->assertEquals('expected', $result);
}

// Sorted comparison
public function test_items_returned(): void {
    $items = get_items();

    // Sort before comparing to avoid order issues
    sort($items);

    $this->assertEquals(['a', 'b', 'c'], $items);
}
```
