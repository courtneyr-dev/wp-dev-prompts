---
name: WordPress Security
description: The WordPress Security Trinity — sanitize input, validate data, escape output. Covers nonces, capabilities, database queries, XSS, CSRF, SQL injection prevention, and penetration testing methodology.
triggers:
  - security review
  - sanitize input
  - escape output
  - nonce
  - wp_verify_nonce
  - current_user_can
  - wpdb prepare
  - SQL injection
  - XSS prevention
  - CSRF
  - penetration testing
  - security audit
---

# WordPress Security

Security-first development following the WordPress Security Trinity: sanitize input, validate data, escape output.

## Input Sanitization

Sanitize data when it enters your system, before processing or storing.

### By Data Type

```php
// Text
$value = sanitize_text_field( $_POST['field'] );
$value = sanitize_textarea_field( $_POST['field'] );
$value = sanitize_title( $_POST['field'] );

// Specific types
$email    = sanitize_email( $_POST['email'] );
$url      = sanitize_url( $_POST['url'] );
$filename = sanitize_file_name( $_POST['filename'] );
$class    = sanitize_html_class( $_POST['class'] );
$slug     = sanitize_key( $_POST['slug'] );

// Numeric
$id    = absint( $_POST['id'] );
$num   = intval( $_POST['num'] );
$price = floatval( $_POST['price'] );

// Rich HTML
$html = wp_kses_post( $_POST['content'] );
```

## Output Escaping

Escape at the moment of output, using the function that matches the context.

```php
// HTML content
echo esc_html( $text );
esc_html_e( 'Translated string', 'text-domain' );

// HTML attributes
echo '<input value="' . esc_attr( $value ) . '">';

// URLs (href, src, action)
echo '<a href="' . esc_url( $url ) . '">Link</a>';

// JavaScript
echo '<script>var name = "' . esc_js( $name ) . '";</script>';

// JSON in attributes
echo '<div data-config="' . esc_attr( wp_json_encode( $config ) ) . '">';

// Allowed HTML
echo wp_kses_post( $content );

// Custom allowed tags
$allowed = [
    'a'      => [ 'href' => [], 'class' => [] ],
    'strong' => [],
];
echo wp_kses( $content, $allowed );
```

### Translation + Escaping

```php
printf(
    /* translators: %s: user name */
    esc_html__( 'Hello, %s!', 'text-domain' ),
    esc_html( $username )
);
```

## Nonces + Capabilities

Nonces prevent CSRF. Capabilities prevent unauthorized access. Always use both.

### Forms

```php
// In form
wp_nonce_field( 'my_action', 'my_nonce' );

// On submission
if ( ! wp_verify_nonce( $_POST['my_nonce'] ?? '', 'my_action' ) ) {
    wp_die( 'Security check failed.' );
}
if ( ! current_user_can( 'manage_options' ) ) {
    wp_die( 'Unauthorized.' );
}
```

### AJAX Handlers

```php
add_action( 'wp_ajax_my_action', 'handle_ajax' );

function handle_ajax() {
    check_ajax_referer( 'my_ajax_nonce', 'nonce' );

    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_send_json_error( 'Unauthorized' );
    }

    // Process...
    wp_send_json_success( $data );
}
```

### REST API Endpoints

```php
register_rest_route( 'vendor/v1', '/items', [
    'methods'             => WP_REST_Server::CREATABLE,
    'callback'            => 'create_item',
    'permission_callback' => function() {
        return current_user_can( 'edit_posts' );
    },
] );
```

## Secure Database Queries

Never concatenate user input into SQL. Always use `$wpdb->prepare()`.

```php
// Prepared statement
$results = $wpdb->get_results( $wpdb->prepare(
    "SELECT * FROM {$wpdb->posts} WHERE post_author = %d AND post_status = %s",
    $user_id,
    'publish'
) );

// Insert
$wpdb->insert(
    $wpdb->prefix . 'custom_table',
    [ 'user_id' => $user_id, 'value' => $value ],
    [ '%d', '%s' ]
);

// LIKE queries — escape wildcards first
$search = $wpdb->esc_like( $search_term );
$results = $wpdb->get_results( $wpdb->prepare(
    "WHERE title LIKE %s",
    '%' . $search . '%'
) );
```

### Placeholders

- `%d` — integer
- `%s` — string
- `%f` — float

## Common Capabilities

| Capability | Who |
|---|---|
| `manage_options` | Administrator |
| `edit_posts` | Editor, Author, Contributor |
| `edit_others_posts` | Editor |
| `publish_posts` | Editor, Author |
| `upload_files` | Author |

## WordPress-Specific Vulnerabilities

- **Object injection** via `unserialize()` on user data — use `json_decode()` instead
- **Path traversal** in file operations — validate paths against allowed directories
- **SSRF** in `wp_remote_get()` with user-controlled URLs — validate and restrict
- **Privilege escalation** in user meta/option updates — always check capabilities

## References

- [WordPress Plugin Security](https://developer.wordpress.org/plugins/security/)
- [Securing Output](https://developer.wordpress.org/plugins/security/securing-output/)
- [Nonces](https://developer.wordpress.org/plugins/security/nonces/)
- [WordPress/agent-skills](https://github.com/WordPress/agent-skills)
