# GraphQL Audit Prompt

> Generate comprehensive GraphQL API audit plans for WordPress sites using WPGraphQL.

## System Context

You are a GraphQL audit specialist with expertise in:
- WPGraphQL and WordPress GraphQL implementations
- GraphQL specification and best practices
- API security testing
- Performance optimization

You have access to `data/graphql-audit-checklist.yaml` which contains audit items for schema validation, query functionality, mutations, authentication, error handling, and performance.

---

## Prompt Template

```text
You are a GraphQL audit specialist. Using `data/graphql-audit-checklist.yaml`, generate a GraphQL audit plan for a WordPress site that uses WPGraphQL.

For each checklist category, provide:

1. **Audit Items**
   - Question to verify
   - Why it matters
   - Severity level

2. **Test Implementation**
   - Sample GraphQL query or mutation
   - Expected response structure
   - Error scenarios to test

3. **Automation Approach**
   - Playwright test skeleton
   - Jest/Node.js test approach
   - cURL commands for quick checks

4. **Security Considerations**
   - Authentication test scenarios
   - Authorization edge cases
   - Data exposure risks

Output the audit plan in Markdown with executable code snippets.
```

---

## Example Output

### Schema Validation Audit

#### 1. Introspection Test

**Why:** Introspection is essential for developer tools and API documentation.

**Test Query:**
```graphql
query IntrospectionQuery {
  __schema {
    queryType { name }
    mutationType { name }
    types {
      name
      kind
      description
    }
  }
}
```

**Expected Response:**
```json
{
  "data": {
    "__schema": {
      "queryType": { "name": "RootQuery" },
      "mutationType": { "name": "RootMutation" },
      "types": [
        { "name": "Post", "kind": "OBJECT", "description": "..." }
      ]
    }
  }
}
```

**Playwright Test:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('GraphQL Schema Validation', () => {
  const endpoint = process.env.GRAPHQL_ENDPOINT || 'http://localhost/graphql';

  test('introspection query succeeds', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: `
          query IntrospectionQuery {
            __schema {
              queryType { name }
              mutationType { name }
              types { name kind }
            }
          }
        `
      }
    });

    expect(response.ok()).toBeTruthy();

    const json = await response.json();
    expect(json.errors).toBeUndefined();
    expect(json.data.__schema.queryType.name).toBe('RootQuery');
    expect(json.data.__schema.types.length).toBeGreaterThan(0);
  });

  test('custom types have descriptions', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: `
          query TypeDocumentation {
            __type(name: "Post") {
              name
              description
              fields {
                name
                description
              }
            }
          }
        `
      }
    });

    const json = await response.json();
    const postType = json.data.__type;

    expect(postType.description).toBeTruthy();

    // Check that fields have descriptions
    const undocumentedFields = postType.fields.filter(f => !f.description);
    expect(undocumentedFields).toHaveLength(0);
  });
});
```

---

### Authentication & Authorization Audit

#### 2. Protected Query Test

**Why:** Ensures sensitive data is not exposed to unauthenticated users.

**Test Query (Unauthenticated):**
```graphql
query SensitiveData {
  viewer {
    email
    capabilities
  }
  users {
    nodes {
      email
      registeredDate
    }
  }
}
```

**Expected Response (Unauthenticated):**
```json
{
  "data": {
    "viewer": null,
    "users": {
      "nodes": []
    }
  }
}
```

**Playwright Test:**
```typescript
test.describe('GraphQL Authentication', () => {
  test('viewer returns null for unauthenticated requests', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: `
          query Viewer {
            viewer {
              id
              email
              capabilities
            }
          }
        `
      }
    });

    const json = await response.json();
    expect(json.data.viewer).toBeNull();
  });

  test('sensitive user data is hidden from public', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: `
          query UsersPublic {
            users {
              nodes {
                name
                email
              }
            }
          }
        `
      }
    });

    const json = await response.json();

    // Email should be null for public queries
    json.data.users.nodes.forEach(user => {
      expect(user.email).toBeNull();
    });
  });

  test('mutations require authentication', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: `
          mutation CreatePost {
            createPost(input: {
              title: "Unauthorized Post"
              status: PUBLISH
            }) {
              post { id }
            }
          }
        `
      }
    });

    const json = await response.json();

    // Should have authorization error
    expect(json.errors).toBeDefined();
    expect(json.errors[0].message).toMatch(/authorized|permission|login/i);
  });
});
```

---

### Error Handling Audit

#### 3. Error Response Test

**Why:** Proper error handling improves developer experience without leaking sensitive information.

**Test Query (Malformed):**
```graphql
query MalformedQuery {
  posts {
    nodes {
      nonExistentField
    }
  }
}
```

**Expected Response:**
```json
{
  "errors": [
    {
      "message": "Cannot query field \"nonExistentField\" on type \"Post\".",
      "locations": [{ "line": 4, "column": 7 }],
      "extensions": {
        "category": "graphql"
      }
    }
  ]
}
```

**Playwright Test:**
```typescript
test.describe('GraphQL Error Handling', () => {
  test('unknown field returns clear error', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: `
          query UnknownField {
            posts {
              nodes {
                nonExistentField
              }
            }
          }
        `
      }
    });

    const json = await response.json();

    expect(json.errors).toBeDefined();
    expect(json.errors[0].message).toContain('nonExistentField');
    expect(json.errors[0].locations).toBeDefined();
  });

  test('errors do not leak stack traces', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: `
          query TriggerError {
            __triggerInternalError
          }
        `
      }
    });

    const json = await response.json();

    if (json.errors) {
      json.errors.forEach(error => {
        // Should not contain file paths or stack traces
        expect(error.message).not.toMatch(/\.php/);
        expect(error.message).not.toMatch(/wp-content/);
        expect(error.message).not.toMatch(/Stack trace/);
      });
    }
  });

  test('syntax errors include location', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: {
        query: '{ posts { nodes { id }' // Missing closing brace
      }
    });

    const json = await response.json();

    expect(json.errors).toBeDefined();
    expect(json.errors[0].locations).toBeDefined();
  });
});
```

---

### Performance & Security Audit

#### 4. Query Complexity Test

**Why:** Prevents denial of service through deeply nested or expensive queries.

**Test Query (Deep Nesting):**
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
                  posts {
                    nodes { id }
                  }
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

**Playwright Test:**
```typescript
test.describe('GraphQL Security', () => {
  test('deep nesting is limited', async ({ request }) => {
    const deepQuery = `
      query DeeplyNested {
        posts {
          nodes {
            categories {
              nodes {
                posts {
                  nodes {
                    categories {
                      nodes {
                        posts {
                          nodes {
                            categories {
                              nodes { name }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await request.post(endpoint, {
      data: { query: deepQuery }
    });

    const json = await response.json();

    // Either returns error about depth, or is processed
    // Log for manual review if no limit
    if (!json.errors) {
      console.warn('Warning: Deep nesting executed without limit');
    }
  });

  test('CORS is properly configured', async ({ request }) => {
    const response = await request.fetch(endpoint, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://malicious-site.com',
        'Access-Control-Request-Method': 'POST'
      }
    });

    const allowedOrigin = response.headers()['access-control-allow-origin'];

    // Should not allow arbitrary origins
    expect(allowedOrigin).not.toBe('*');
    expect(allowedOrigin).not.toBe('https://malicious-site.com');
  });
});
```

---

## cURL Quick Checks

```bash
# Check introspection
curl -X POST https://example.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { types { name } } }"}'

# Check authentication
curl -X POST https://example.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ viewer { email } }"}'

# Check CORS
curl -I -X OPTIONS https://example.com/graphql \
  -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: POST"

# Check rate limiting (run multiple times)
for i in {1..100}; do
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST https://example.com/graphql \
    -H "Content-Type: application/json" \
    -d '{"query":"{ posts { nodes { id } } }"}'
done | sort | uniq -c
```

---

## Audit Report Template

```markdown
# GraphQL Audit Report

**Site:** https://example.com/graphql
**Date:** YYYY-MM-DD
**Auditor:** [Name]

## Executive Summary

| Category | Checks | Passed | Failed | Score |
|----------|--------|--------|--------|-------|
| Schema | 4 | 4 | 0 | 100% |
| Queries | 4 | 3 | 1 | 75% |
| Mutations | 3 | 3 | 0 | 100% |
| Auth | 4 | 2 | 2 | 50% |
| Errors | 4 | 4 | 0 | 100% |
| Performance | 6 | 4 | 2 | 67% |

## Critical Findings

1. **User emails exposed to unauthenticated requests**
   - Severity: Critical
   - Location: `users.nodes.email`
   - Recommendation: Filter sensitive fields for public queries

2. **No query depth limiting**
   - Severity: High
   - Recommendation: Configure WPGraphQL query complexity settings

## Detailed Results

[Include test results for each category...]
```
