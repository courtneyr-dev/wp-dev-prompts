# GraphQL Audit Guide

> A comprehensive guide to auditing WordPress GraphQL APIs (WPGraphQL).

## Overview

This guide covers auditing GraphQL implementations on WordPress, focusing on:
- Schema validation and documentation
- Query functionality and performance
- Authentication and authorization
- Error handling and security
- WPGraphQL-specific considerations

## Prerequisites

- WordPress site with WPGraphQL installed
- Node.js 18+ for Playwright tests
- Optional: WPGraphQL IDE extension for interactive testing

## Quick Start

### 1. Run Automated Tests

```bash
# Install dependencies
npm install

# Set endpoint (default: http://localhost:8888/graphql)
export GRAPHQL_ENDPOINT=https://your-site.com/graphql

# Optional: Add authentication token
export WP_AUTH_TOKEN=your_jwt_or_app_password

# Run GraphQL audit tests
npx playwright test tests/audit/graphql.spec.ts
```

### 2. Generate Report

```bash
# Run with HTML report
npx playwright test tests/audit/graphql.spec.ts --reporter=html

# View report
npx playwright show-report
```

## Audit Categories

### 1. Schema Validation

Verify the GraphQL schema is properly structured and documented.

#### Test: Introspection

```bash
curl -X POST https://example.com/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ __schema { queryType { name } mutationType { name } types { name kind } } }"
  }'
```

**Expected:** Returns complete schema structure.

**Red flags:**
- Introspection errors
- Missing queryType or mutationType
- No custom types beyond built-in scalars

#### Test: Type Documentation

```graphql
query TypeDocs {
  __type(name: "Post") {
    description
    fields {
      name
      description
    }
  }
}
```

**Expected:** Types and fields have descriptions.

### 2. Query Functionality

Verify queries work correctly and efficiently.

#### Test: Basic Query

```graphql
query Posts {
  posts(first: 10) {
    nodes {
      id
      title
      date
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

**Expected:** Returns posts with pagination info.

#### Test: Pagination

```graphql
# First page
query FirstPage {
  posts(first: 5) {
    pageInfo { endCursor hasNextPage }
    nodes { id }
  }
}

# Second page (use endCursor from above)
query SecondPage($after: String!) {
  posts(first: 5, after: $after) {
    nodes { id }
  }
}
```

**Expected:** Cursor-based pagination works correctly.

#### Test: Filtering

```graphql
query FilteredPosts {
  posts(where: {
    status: PUBLISH
    categoryName: "News"
    orderby: { field: DATE, order: DESC }
  }) {
    nodes {
      id
      title
      status
    }
  }
}
```

**Expected:** Filters apply correctly.

### 3. Authentication & Authorization

Verify security controls work properly.

#### Test: Unauthenticated Access

```graphql
# Should return null for unauthenticated requests
query Viewer {
  viewer {
    id
    email
    capabilities
  }
}
```

**Expected:** `viewer` is null.

#### Test: Sensitive Data Protection

```graphql
# Emails should not be exposed publicly
query Users {
  users {
    nodes {
      name
      email  # Should be null for public
    }
  }
}
```

**Expected:** `email` is null for public queries.

#### Test: Mutation Authorization

```graphql
# Should fail without authentication
mutation CreatePost {
  createPost(input: {
    title: "Test"
    status: DRAFT
  }) {
    post { id }
  }
}
```

**Expected:** Authorization error.

### 4. Error Handling

Verify errors are handled properly without information leakage.

#### Test: Unknown Field

```graphql
query UnknownField {
  posts {
    nodes {
      nonExistentField
    }
  }
}
```

**Expected:** Clear error with field name and location.

#### Test: Syntax Error

```graphql
{ posts { nodes { id }
```

**Expected:** Error with line/column information.

#### Test: Information Leakage

**Red flags in error messages:**
- File paths (e.g., `/var/www/html/wp-content/...`)
- Stack traces
- Database queries
- Internal class names

### 5. Performance & Security

Verify performance safeguards and security controls.

#### Test: Query Depth

```graphql
query DeeplyNested {
  posts {
    nodes {
      categories {
        nodes {
          posts {
            nodes {
              categories {
                nodes {
                  posts { nodes { id } }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

**Expected:** Error if exceeds depth limit, or be aware this is allowed.

#### Test: CORS Configuration

```bash
curl -I -X OPTIONS https://example.com/graphql \
  -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: POST"
```

**Expected:** `Access-Control-Allow-Origin` should NOT be `*` or `https://evil.com`.

#### Test: Rate Limiting

```bash
# Run 100 requests rapidly
for i in {1..100}; do
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST https://example.com/graphql \
    -H "Content-Type: application/json" \
    -d '{"query":"{ posts { nodes { id } } }"}'
done | sort | uniq -c
```

**Expected:** Should see 429 responses if rate limiting is enabled.

## WPGraphQL-Specific Tests

### Content Nodes Interface

```graphql
query ContentNodes {
  contentNodes(first: 10) {
    nodes {
      __typename
      id
      ... on Post { title }
      ... on Page { title }
    }
  }
}
```

### Node Query

```graphql
query GetNode($id: ID!) {
  node(id: $id) {
    __typename
    id
    ... on Post { title }
  }
}
```

### Media Items

```graphql
query MediaItems {
  mediaItems(first: 10) {
    nodes {
      id
      sourceUrl
      altText
      mimeType
    }
  }
}
```

## Security Checklist

### Critical

- [ ] Unauthenticated users cannot access sensitive data
- [ ] Mutations require authentication
- [ ] User emails are not exposed publicly
- [ ] Error messages don't leak internal information
- [ ] CORS is properly configured

### High Priority

- [ ] Query depth/complexity is limited
- [ ] Rate limiting is enabled
- [ ] Introspection is disabled in production (or intentionally enabled)
- [ ] Draft/private content is not exposed

### Medium Priority

- [ ] Batch queries are limited
- [ ] Query logging is enabled for security monitoring
- [ ] Authentication tokens have appropriate expiration

## Troubleshooting

### Common Issues

#### "Cannot query field X on type Y"

The field doesn't exist or has a different name. Check the schema:

```graphql
query CheckType {
  __type(name: "Post") {
    fields { name }
  }
}
```

#### "You do not have permission"

Authentication required. Add authorization header:

```bash
curl -X POST https://example.com/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"query":"..."}'
```

#### Empty Results

Check if content exists and is published:

```graphql
query CheckPosts {
  posts(where: { status: PUBLISH }) {
    nodes { id status }
  }
}
```

## Automation

### CI/CD Integration

```yaml
# .github/workflows/graphql-audit.yml
name: GraphQL Audit

on:
  schedule:
    - cron: '0 6 * * 1'  # Weekly
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run GraphQL audit
        env:
          GRAPHQL_ENDPOINT: ${{ secrets.GRAPHQL_ENDPOINT }}
        run: npx playwright test tests/audit/graphql.spec.ts

      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: graphql-audit-report
          path: playwright-report/
```

## Related Resources

- [WPGraphQL Documentation](https://www.wpgraphql.com/docs)
- [GraphQL Specification](https://spec.graphql.org/)
- [OWASP GraphQL Security](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html)
- [Playwright Testing](https://playwright.dev/)
