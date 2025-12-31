# Tests

Automated tests for auditing, validation, and quality assurance.

## Directory Structure

```
tests/
├── README.md           # This file
└── audit/              # Audit-related tests
    └── graphql.spec.ts # GraphQL API audit tests
```

## Test Types

### Audit Tests (`audit/`)

Playwright tests for automated site and API auditing.

| Test File | Description |
|-----------|-------------|
| `graphql.spec.ts` | WPGraphQL endpoint security and functionality testing |

## Running Tests

### Prerequisites

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test Suites

```bash
# GraphQL audit tests
npx playwright test tests/audit/graphql.spec.ts

# With specific endpoint
GRAPHQL_ENDPOINT=https://example.com/graphql npx playwright test tests/audit/
```

### Run with Reporters

```bash
# HTML report
npx playwright test --reporter=html

# JSON output for CI
npx playwright test --reporter=json

# Multiple reporters
npx playwright test --reporter=html --reporter=json
```

## GraphQL Audit Tests

The `graphql.spec.ts` file tests WPGraphQL endpoints across 6 categories:

### Test Categories

| Category | Tests | What's Checked |
|----------|-------|----------------|
| Schema Validation | 4 | Introspection, types, query/mutation types |
| Query Functionality | 4 | Posts, pages, pagination, filtering |
| Authentication | 4 | Viewer protection, mutation auth, token handling |
| Error Handling | 4 | Error format, info leakage, invalid queries |
| Performance & Security | 4 | Depth limiting, rate limiting, CORS |
| WPGraphQL Specific | 4 | Content nodes, node queries, revisions |

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GRAPHQL_ENDPOINT` | GraphQL API URL | `http://localhost:8888/graphql` |
| `WP_AUTH_TOKEN` | Authentication token | (none) |

### Example Usage

```bash
# Test local development site
GRAPHQL_ENDPOINT=http://localhost:8888/graphql npx playwright test tests/audit/graphql.spec.ts

# Test staging site with auth
GRAPHQL_ENDPOINT=https://staging.example.com/graphql \
WP_AUTH_TOKEN=your-jwt-token \
npx playwright test tests/audit/graphql.spec.ts
```

## CI Integration

Tests are integrated into GitHub Actions:

- `.github/workflows/graphql-audit.yml` - GraphQL-specific workflow
- `.github/workflows/audit.yml` - General WordPress audit workflow
- `.github/workflows/ci-nightly.yml` - Nightly comprehensive tests

### Workflow Inputs

The GraphQL audit workflow accepts:

```yaml
workflow_dispatch:
  inputs:
    endpoint:
      description: 'GraphQL endpoint URL'
      default: 'http://localhost:8888/graphql'
    auth_token:
      description: 'Authentication token'
    run_security_tests:
      description: 'Run security-focused tests'
      default: true
```

## Adding New Tests

### New Audit Test

1. Create test file in `tests/audit/`:

```typescript
// tests/audit/my-audit.spec.ts
import { test, expect } from '@playwright/test';

test.describe('My Audit', () => {
  test('should check something', async ({ request }) => {
    const response = await request.get('https://example.com/api');
    expect(response.ok()).toBeTruthy();
  });
});
```

2. Add to CI workflow if needed

3. Document in this README

### Test Structure Guidelines

- Use `test.describe()` for grouping related tests
- Use descriptive test names
- Include `test.skip()` for optional/conditional tests
- Add proper error messages to assertions
- Use fixtures for common setup

## Related Resources

- **Data**: [../data/](../data/) - Audit checklists (JSON/YAML)
- **Prompts**: [../prompts/audit/](../prompts/audit/) - Audit prompt templates
- **Docs**: [../docs/audit/](../docs/audit/) - Audit documentation
- **CI**: [../.github/workflows/](../.github/workflows/) - GitHub Actions
- **Skills**: [../skills/testing/](../skills/testing/) - Testing knowledge modules

## Test Reports

Test results are saved to:

- `playwright-report/` - HTML report
- `test-results/` - Screenshots and traces

View HTML report:

```bash
npx playwright show-report
```
