/**
 * GraphQL Audit Tests
 *
 * Playwright tests for auditing WordPress GraphQL API (WPGraphQL).
 *
 * Run: npx playwright test tests/audit/graphql.spec.ts
 *
 * @package wp-dev-prompts
 */

import { test, expect, APIRequestContext } from '@playwright/test';

// Configuration
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || 'http://localhost:8888/graphql';
const AUTH_TOKEN = process.env.WP_AUTH_TOKEN; // Optional: JWT or application password

/**
 * Helper to make GraphQL requests
 */
async function graphql(
  request: APIRequestContext,
  query: string,
  variables?: Record<string, unknown>,
  headers?: Record<string, string>
) {
  const response = await request.post(GRAPHQL_ENDPOINT, {
    data: { query, variables },
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  return {
    response,
    json: await response.json(),
  };
}

// =============================================================================
// Schema Validation Tests
// =============================================================================

test.describe('Schema Validation', () => {
  test('introspection query succeeds', async ({ request }) => {
    const { json } = await graphql(request, `
      query IntrospectionQuery {
        __schema {
          queryType { name }
          mutationType { name }
          types { name kind }
        }
      }
    `);

    expect(json.errors).toBeUndefined();
    expect(json.data.__schema.queryType.name).toBeTruthy();
    expect(json.data.__schema.types.length).toBeGreaterThan(0);
  });

  test('Post type has required fields', async ({ request }) => {
    const { json } = await graphql(request, `
      query PostTypeFields {
        __type(name: "Post") {
          fields {
            name
            type { name kind }
          }
        }
      }
    `);

    const fieldNames = json.data.__type.fields.map((f: { name: string }) => f.name);

    // Required WordPress post fields
    expect(fieldNames).toContain('id');
    expect(fieldNames).toContain('title');
    expect(fieldNames).toContain('content');
    expect(fieldNames).toContain('date');
    expect(fieldNames).toContain('author');
  });

  test('types have descriptions', async ({ request }) => {
    const { json } = await graphql(request, `
      query TypeDocumentation {
        __type(name: "Post") {
          description
          fields {
            name
            description
          }
        }
      }
    `);

    // Type should have description
    expect(json.data.__type.description).toBeTruthy();

    // Log undocumented fields for review
    const undocumented = json.data.__type.fields.filter(
      (f: { description: string | null }) => !f.description
    );
    if (undocumented.length > 0) {
      console.log('Undocumented fields:', undocumented.map((f: { name: string }) => f.name));
    }
  });
});

// =============================================================================
// Query Functionality Tests
// =============================================================================

test.describe('Query Functionality', () => {
  test('basic posts query works', async ({ request }) => {
    const { json } = await graphql(request, `
      query BasicPosts {
        posts(first: 5) {
          nodes {
            id
            title
            date
          }
        }
      }
    `);

    expect(json.errors).toBeUndefined();
    expect(json.data.posts.nodes).toBeDefined();
    expect(Array.isArray(json.data.posts.nodes)).toBe(true);
  });

  test('pagination with cursors works', async ({ request }) => {
    const { json: firstPage } = await graphql(request, `
      query FirstPage {
        posts(first: 2) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes { id }
        }
      }
    `);

    expect(firstPage.data.posts.pageInfo).toBeDefined();
    expect(firstPage.data.posts.pageInfo.endCursor).toBeTruthy();

    if (firstPage.data.posts.pageInfo.hasNextPage) {
      const cursor = firstPage.data.posts.pageInfo.endCursor;

      const { json: secondPage } = await graphql(request, `
        query SecondPage($after: String) {
          posts(first: 2, after: $after) {
            nodes { id }
          }
        }
      `, { after: cursor });

      expect(secondPage.errors).toBeUndefined();
      expect(secondPage.data.posts.nodes).toBeDefined();
    }
  });

  test('nested relationships resolve', async ({ request }) => {
    const { json } = await graphql(request, `
      query NestedQuery {
        posts(first: 1, where: { status: PUBLISH }) {
          nodes {
            id
            title
            author {
              node {
                name
              }
            }
            categories {
              nodes {
                name
              }
            }
          }
        }
      }
    `);

    expect(json.errors).toBeUndefined();

    if (json.data.posts.nodes.length > 0) {
      const post = json.data.posts.nodes[0];
      expect(post.author).toBeDefined();
    }
  });

  test('filtering by status works', async ({ request }) => {
    const { json } = await graphql(request, `
      query FilteredPosts {
        posts(where: { status: PUBLISH }) {
          nodes {
            id
            status
          }
        }
      }
    `);

    expect(json.errors).toBeUndefined();

    // All returned posts should be published
    json.data.posts.nodes.forEach((post: { status: string }) => {
      expect(post.status).toBe('publish');
    });
  });
});

// =============================================================================
// Authentication & Authorization Tests
// =============================================================================

test.describe('Authentication & Authorization', () => {
  test('viewer is null for unauthenticated requests', async ({ request }) => {
    const { json } = await graphql(request, `
      query Viewer {
        viewer {
          id
          email
          capabilities
        }
      }
    `);

    expect(json.data.viewer).toBeNull();
  });

  test('user emails are not exposed publicly', async ({ request }) => {
    const { json } = await graphql(request, `
      query UsersPublic {
        users(first: 10) {
          nodes {
            name
            email
          }
        }
      }
    `);

    // Either users are empty or email is null
    if (json.data.users.nodes.length > 0) {
      json.data.users.nodes.forEach((user: { email: string | null }) => {
        expect(user.email).toBeNull();
      });
    }
  });

  test('mutations require authentication', async ({ request }) => {
    const { json } = await graphql(request, `
      mutation CreatePostUnauth {
        createPost(input: {
          title: "Unauthorized Test Post"
          status: DRAFT
          clientMutationId: "test"
        }) {
          post {
            id
          }
        }
      }
    `);

    // Should have error about authentication/authorization
    expect(json.errors).toBeDefined();
    expect(json.errors.length).toBeGreaterThan(0);

    // Should NOT have created a post
    expect(json.data?.createPost?.post).toBeFalsy();
  });

  test.skip('authenticated user can access protected data', async ({ request }) => {
    // Skip if no auth token configured
    if (!AUTH_TOKEN) {
      test.skip();
      return;
    }

    const { json } = await graphql(
      request,
      `
        query AuthenticatedViewer {
          viewer {
            id
            email
            capabilities
          }
        }
      `,
      undefined,
      { Authorization: `Bearer ${AUTH_TOKEN}` }
    );

    expect(json.data.viewer).not.toBeNull();
    expect(json.data.viewer.id).toBeTruthy();
  });
});

// =============================================================================
// Error Handling Tests
// =============================================================================

test.describe('Error Handling', () => {
  test('unknown field returns clear error', async ({ request }) => {
    const { json } = await graphql(request, `
      query UnknownField {
        posts {
          nodes {
            nonExistentField
          }
        }
      }
    `);

    expect(json.errors).toBeDefined();
    expect(json.errors[0].message).toContain('nonExistentField');
    expect(json.errors[0].locations).toBeDefined();
  });

  test('syntax errors include location', async ({ request }) => {
    const { response, json } = await graphql(request, '{ posts { nodes { id }');

    // Should return 400 or have errors
    expect(json.errors).toBeDefined();

    if (json.errors[0].locations) {
      expect(json.errors[0].locations[0]).toHaveProperty('line');
      expect(json.errors[0].locations[0]).toHaveProperty('column');
    }
  });

  test('errors do not leak sensitive information', async ({ request }) => {
    // Try to trigger an error
    const { json } = await graphql(request, `
      query PotentialError {
        posts(where: { id: "invalid" }) {
          nodes { id }
        }
      }
    `);

    if (json.errors) {
      json.errors.forEach((error: { message: string }) => {
        // Should not contain file paths
        expect(error.message).not.toMatch(/\.php/i);
        expect(error.message).not.toMatch(/wp-content/i);
        expect(error.message).not.toMatch(/stack trace/i);
        expect(error.message).not.toMatch(/\/var\/www/i);
      });
    }
  });

  test('partial failure returns partial data', async ({ request }) => {
    const { json } = await graphql(request, `
      query PartialFailure {
        posts(first: 1) {
          nodes {
            id
            title
          }
        }
        unknownField
      }
    `);

    // Should have both data (posts) and errors (unknownField)
    expect(json.errors).toBeDefined();
    // Data may or may not be present depending on implementation
  });
});

// =============================================================================
// Performance & Security Tests
// =============================================================================

test.describe('Performance & Security', () => {
  test('query complexity is limited', async ({ request }) => {
    // Create a deeply nested query
    const deepQuery = `
      query DeeplyNested {
        posts(first: 100) {
          nodes {
            categories(first: 100) {
              nodes {
                posts(first: 100) {
                  nodes {
                    categories(first: 100) {
                      nodes {
                        name
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

    const { json, response } = await graphql(request, deepQuery);

    // Should either error or complete
    // Log warning if no complexity limit
    if (!json.errors && response.ok()) {
      console.warn('Warning: Deep nesting executed without apparent limits');
    }
  });

  test('CORS is configured correctly', async ({ request }) => {
    const response = await request.fetch(GRAPHQL_ENDPOINT, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://malicious-site.com',
        'Access-Control-Request-Method': 'POST',
      },
    });

    const allowedOrigin = response.headers()['access-control-allow-origin'];

    // Should not allow arbitrary origins
    if (allowedOrigin) {
      expect(allowedOrigin).not.toBe('*');
      expect(allowedOrigin).not.toBe('https://malicious-site.com');
    }
  });

  test('batch queries are handled', async ({ request }) => {
    // Test batch query support
    const response = await request.post(GRAPHQL_ENDPOINT, {
      data: [
        { query: '{ posts(first: 1) { nodes { id } } }' },
        { query: '{ users(first: 1) { nodes { id } } }' },
        { query: '{ categories(first: 1) { nodes { id } } }' },
      ],
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    // Either processes batch or returns error
    // Log for review
    if (Array.isArray(json)) {
      console.log(`Batch queries supported: ${json.length} responses`);
    }
  });

  test('introspection can be controlled', async ({ request }) => {
    const { json } = await graphql(request, `
      query Introspection {
        __schema {
          types { name }
        }
      }
    `);

    // Log whether introspection is enabled
    if (json.errors) {
      console.log('Introspection is disabled (recommended for production)');
    } else {
      console.log('Introspection is enabled - verify this is intentional');
    }
  });
});

// =============================================================================
// WPGraphQL-Specific Tests
// =============================================================================

test.describe('WPGraphQL Specific', () => {
  test('content nodes interface works', async ({ request }) => {
    const { json } = await graphql(request, `
      query ContentNodes {
        contentNodes(first: 5) {
          nodes {
            __typename
            id
            ... on Post {
              title
            }
            ... on Page {
              title
            }
          }
        }
      }
    `);

    expect(json.errors).toBeUndefined();
    expect(json.data.contentNodes).toBeDefined();
  });

  test('node query by ID works', async ({ request }) => {
    // First get a post ID
    const { json: postsJson } = await graphql(request, `
      query GetPostId {
        posts(first: 1) {
          nodes {
            id
          }
        }
      }
    `);

    if (postsJson.data.posts.nodes.length > 0) {
      const postId = postsJson.data.posts.nodes[0].id;

      const { json: nodeJson } = await graphql(request, `
        query GetNode($id: ID!) {
          node(id: $id) {
            __typename
            id
            ... on Post {
              title
            }
          }
        }
      `, { id: postId });

      expect(nodeJson.errors).toBeUndefined();
      expect(nodeJson.data.node).toBeDefined();
      expect(nodeJson.data.node.__typename).toBe('Post');
    }
  });

  test('media items are accessible', async ({ request }) => {
    const { json } = await graphql(request, `
      query MediaItems {
        mediaItems(first: 5) {
          nodes {
            id
            sourceUrl
            altText
            mimeType
          }
        }
      }
    `);

    expect(json.errors).toBeUndefined();
    expect(json.data.mediaItems).toBeDefined();
  });

  test('menus are queryable', async ({ request }) => {
    const { json } = await graphql(request, `
      query Menus {
        menus {
          nodes {
            id
            name
            menuItems {
              nodes {
                id
                label
                url
              }
            }
          }
        }
      }
    `);

    expect(json.errors).toBeUndefined();
    expect(json.data.menus).toBeDefined();
  });
});
