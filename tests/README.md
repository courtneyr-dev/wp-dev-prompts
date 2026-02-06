# Tests

Automated tests for auditing, validation, and quality assurance.

## Directory Structure

```
tests/
├── README.md                    # This file
├── audit/                       # Audit-related tests
│   └── graphql.spec.ts         # GraphQL API audit tests
└── ui-ux/                       # UI/UX testing (NEW)
    ├── visual-hierarchy.spec.ts # CTA prominence, typography, contrast
    ├── navigation.spec.ts       # Navigation consistency, breadcrumbs
    ├── responsive.spec.ts       # Breakpoint behavior, touch targets
    ├── feedback-affordance.spec.ts # Interaction feedback, loading states
    ├── accessibility.spec.ts    # Keyboard nav, focus, ARIA, forms
    └── heuristic-evaluation.spec.ts # Nielsen's 10 heuristics
```

## Test Types

### Audit Tests (`audit/`)

Playwright tests for automated site and API auditing.

| Test File | Description |
|-----------|-------------|
| `graphql.spec.ts` | WPGraphQL endpoint security and functionality testing |

### UI/UX Tests (`ui-ux/`)

Playwright tests for UI/UX validation based on established usability principles.

| Test File | Description |
|-----------|-------------|
| `visual-hierarchy.spec.ts` | CTA prominence, typography scale, color contrast, content grouping |
| `navigation.spec.ts` | Navigation consistency, breadcrumbs, back/forward, skip links |
| `responsive.spec.ts` | Breakpoint behavior, touch targets, content reflow, mobile inputs |
| `feedback-affordance.spec.ts` | Hover/focus/active states, loading indicators, error messages |
| `accessibility.spec.ts` | Keyboard navigation, focus visibility, form labels, ARIA |
| `heuristic-evaluation.spec.ts` | All 10 Nielsen usability heuristics |

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

# UI/UX tests - all
npx playwright test tests/ui-ux/

# UI/UX tests - specific categories
npx playwright test tests/ui-ux/visual-hierarchy.spec.ts
npx playwright test tests/ui-ux/responsive.spec.ts
npx playwright test tests/ui-ux/heuristic-evaluation.spec.ts
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
- `.github/workflows/ui-ux-audit.yml` - UI/UX testing workflow
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
- **Skills**: [../skills/wordpress-testing/](../skills/wordpress-testing/) - Testing knowledge modules

## Test Reports

Test results are saved to:

- `playwright-report/` - HTML report
- `test-results/` - Screenshots and traces

View HTML report:

```bash
npx playwright show-report
```
