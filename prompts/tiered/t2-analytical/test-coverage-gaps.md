# Test Coverage Gap Analysis

> **Tier**: T2
> **Tool**: Cursor or ChatGPT
> **Time**: 30-60 min
> **Files**: Multiple (source + tests)

## When to Use

- Identifying untested code paths
- Planning test writing effort
- Evaluating test quality
- Preparing for T1 test writing tasks

## Prompt

```
Analyze test coverage gaps for this code:

**Source code:**
[PASTE SOURCE CODE]

**Existing tests:**
[PASTE TEST CODE or "No existing tests"]

Identify:

1. **Untested Public Methods**
   - Methods with no test coverage
   - Methods with partial coverage

2. **Missing Edge Cases**
   - Boundary conditions not tested
   - Error conditions not tested
   - Empty/null input handling

3. **Integration Points**
   - Database interactions untested
   - External API calls untested
   - WordPress hook integrations untested

4. **Critical Paths**
   - Business logic without tests
   - Security-sensitive code without tests
   - Data transformation without tests

For each gap:
- What's missing
- Why it matters (risk level)
- Suggested test approach
- Estimated effort (T1 or needs T3)
```

## Customization

| Variable | Description |
|----------|-------------|
| `[PASTE SOURCE CODE]` | Implementation to analyze |
| `[PASTE TEST CODE]` | Existing tests, if any |

## Example Analysis Session

### Turn 1: Initial Analysis

```
Analyze test coverage for this REST API class:

[paste REST API class]

Current tests:
[paste or describe existing tests]

Focus on security-critical paths.
```

### Turn 2: Deep Dive

```
You identified the permission callback as untested. Here's the full callback:

[paste permission callback]

What test cases would cover this properly?
```

### Turn 3: Prioritization

```
Given limited time, which 5 tests would give the most coverage value?

Constraints:
- 2 hours available for test writing
- Need to cover security-critical paths first
- Plugin is used on high-traffic sites
```

## Analysis Approaches

### Method-by-Method Analysis

```
For each public method:
1. Is there any test?
2. Are happy paths tested?
3. Are error paths tested?
4. Are edge cases tested?

Create a coverage matrix.
```

### Risk-Based Analysis

```
Prioritize by risk:
- High: Auth, permissions, data modification
- Medium: Business logic, data transformation
- Low: Display, formatting, utilities

Focus gaps analysis on high-risk areas first.
```

### WordPress Integration Analysis

```
Check coverage of WordPress interactions:
- Hook callbacks
- Database operations via $wpdb
- Options API usage
- Transient operations
- REST API endpoints
- Admin AJAX handlers
```

## Output Template

```
## Coverage Summary

**Source methods**: X
**Tested methods**: Y
**Coverage estimate**: Z%

## Critical Gaps (Must Test)

| Method/Area | What's Missing | Risk | Effort |
|-------------|----------------|------|--------|
| [name] | [description] | High | T1 |

## Important Gaps (Should Test)

[Same table format]

## Nice-to-Have Coverage

[Same table format]

## Recommended Test Order

1. [First priority with rationale]
2. [Second priority]
3. [etc.]

## Test Approach Recommendations

### Unit Tests Needed
[List of isolated unit tests]

### Integration Tests Needed
[List of WordPress integration tests]

### Mock Requirements
[External dependencies to mock]
```

## Creating T1 Tasks

Convert gaps into T1-ready tasks:

```
## T1 Test Tasks

### Task 1: Test get_reactions() happy path
- File: tests/test-reactions.php
- Pattern: Follow existing test_get_post_* tests
- Time: <15 min

### Task 2: Test get_reactions() with invalid post ID
- File: tests/test-reactions.php
- Assert: Returns empty array
- Time: <10 min
```

## Verification

After gap analysis:

1. Create T1 tasks for each gap
2. Prioritize by risk
3. Estimate total effort
4. Decide if T3 infrastructure needed first

## When to Escalate

Escalate to T3 if:

- No test infrastructure exists
- Tests require complex fixtures
- Mocking strategy needs design
- Coverage requires architectural changes

## Related

- [T2 Guide](../../../workflows/tiered-agents/tier-2-analytical.md)
- [Add PHPUnit Test](../t1-constrained/add-phpunit-test.md) — For writing individual tests
- [Test Infrastructure](../t3-collaborative/test-infrastructure.md) — For setting up testing
