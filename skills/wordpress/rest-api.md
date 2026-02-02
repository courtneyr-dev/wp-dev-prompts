# WordPress REST API

> **Type**: Skill
> **Domain**: WordPress Development
> **Source**: WordPress/agent-skills wp-rest-api

<skill>
<summary>
Guidelines for building and debugging WordPress REST API endpoints, including route creation, authentication, and data validation.
</summary>

<knowledge>
## Overview

This skill covers REST route creation, custom field exposure, authentication debugging, and CPT/taxonomy REST integration for WordPress 6.9+.

## Setup and Detection

1. Run project triage first
2. Locate existing REST patterns:
   - `register_rest_route`
   - `WP_REST_Controller`

## Approach Selection

**Exposing Content Types:**
```php
register_post_type('my_cpt', [
    'show_in_rest' => true,
    'rest_base'    => 'my-cpts',
]);
```

**Custom Endpoints:**
```php
add_action('rest_api_init', function() {
    register_rest_route('vendor/v1', '/items', [
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'get_items_callback',
        'permission_callback' => 'items_permission_check',
    ]);
});
```

## Implementation Standards

**Route Requirements:**
- Unique namespaces (e.g., `vendor/v1`)
- Mandatory permission callbacks
- Proper HTTP method constants (`WP_REST_Server::READABLE`, `CREATABLE`, etc.)

**Response Handling:**
```php
function get_items_callback($request) {
    $data = fetch_items();
    return rest_ensure_response($data);
}

// Or with status codes:
function create_item_callback($request) {
    $item = create_item($request->get_params());
    return new WP_REST_Response($item, 201);
}
```

## Data Validation

**Argument Schema:**
```php
register_rest_route('vendor/v1', '/items', [
    'methods'  => WP_REST_Server::CREATABLE,
    'callback' => 'create_item_callback',
    'args'     => [
        'title' => [
            'type'        => 'string',
            'required'    => true,
            'description' => 'Item title',
            'sanitize_callback' => 'sanitize_text_field',
            'validate_callback' => function($value) {
                return strlen($value) <= 200;
            },
        ],
    ],
    'permission_callback' => 'create_permission_check',
]);
```

**Validation Functions:**
- `rest_validate_value_from_schema`
- `rest_sanitize_value_from_schema`
- Never access `$_GET`/`$_POST` directly

## Field Management

**Custom Computed Fields:**
```php
register_rest_field('post', 'custom_field', [
    'get_callback' => function($post) {
        return compute_value($post['id']);
    },
    'schema' => [
        'type'        => 'string',
        'description' => 'Custom computed field',
    ],
]);
```

**Metadata Exposure:**
```php
register_meta('post', 'my_meta', [
    'show_in_rest' => true,
    'single'       => true,
    'type'         => 'string',
]);
```

## Security

**Authentication by Client Type:**
- Admin/JavaScript: Cookie + nonce
- External clients: Application passwords

**Authorization:**
```php
function items_permission_check($request) {
    return current_user_can('edit_posts');
}
```

## Debugging Common Issues

**404 Errors:**
- Verify route is registered
- Check namespace spelling
- Flush permalinks

**401/403 Errors:**
- Verify authentication method
- Check permission callback
- Confirm user capabilities

**Missing Fields:**
- Verify `show_in_rest` configuration
- Check field registration timing
- Confirm schema definitions
</knowledge>

<best_practices>
- Always include permission callbacks
- Use argument schemas for validation
- Return proper status codes
- Keep namespaces unique and versioned
- Don't remove core fields
</best_practices>

<references>
- [WordPress/agent-skills wp-rest-api](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-rest-api)
- [REST API Handbook](https://developer.wordpress.org/rest-api/)
</references>
</skill>
