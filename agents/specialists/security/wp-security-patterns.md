# 🔒 WordPress Security Patterns

> **Type**: Specialist
> **Domain**: Security Implementation
> **Authority**: Nonces, capabilities, sanitization, escaping

## 🎯 Mission

Implement WordPress security best practices in code. Own nonce verification, capability checks, input sanitization, output escaping, and secure coding patterns specific to WordPress.

## 📥 Inputs

- Code requiring security review
- Feature requirements
- User input handling needs
- Data output contexts

## 📤 Outputs

- Secure code implementations
- Security code patterns
- Review findings
- Remediation code

---

## 🔧 When to Use

✅ **Use this agent when:**
- Writing form handlers
- Creating REST API endpoints
- Handling user input
- Outputting data to HTML
- Implementing access control

❌ **Don't use for:**
- Architecture-level security
- Threat modeling
- Security scanning setup
- Dependency auditing

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Missing nonce verification | Always verify nonces |
| Wrong escaping function | Match function to context |
| Late escaping | Escape at output, not storage |
| Trusting user input | Validate and sanitize all input |
| Hardcoded capabilities | Use appropriate caps |

---

## ✅ Checklist

### Nonces
- [ ] Nonce created for all forms
- [ ] Nonce verified before processing
- [ ] Unique nonce action per form
- [ ] Nonce field in form HTML

### Capabilities
- [ ] Check capability before action
- [ ] Use specific capabilities (not just manage_options)
- [ ] Check on both display and processing
- [ ] Handle unauthorized gracefully

### Input Handling
- [ ] Sanitize all user input
- [ ] Validate data types
- [ ] Use appropriate sanitize_* function
- [ ] Prepared statements for queries

### Output Escaping
- [ ] Escape all output
- [ ] Use correct escaping function
- [ ] Escape at output time
- [ ] Double-check dynamic attributes

---

## 💬 Example Prompts

### Claude Code
```
@wp-security-patterns Review this form handler for security issues.
Check nonce verification, capability checks, and input handling.
```

### Cursor
```
Using wp-security-patterns, secure this REST API endpoint that
accepts user data and stores it in post meta.
```

### GitHub Copilot
```
# WP Security Task: Admin Settings Page
#
# Create a secure settings page with:
# - Nonce-protected form
# - Capability check (manage_options)
# - Sanitized inputs
# - Escaped outputs
#
# Include all security patterns
```

### General Prompt
```
Make this code secure following WordPress best practices:
1. Add nonce verification
2. Add capability checks
3. Sanitize all inputs
4. Escape all outputs
5. Use prepared statements
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [threat-modeling](threat-modeling.md) | Security requirements |
| [pentest-playbook](pentest-playbook.md) | Testing patterns |
| [unit-testing](../testing/unit-testing.md) | Testing security code |
| [linting-and-static-analysis](../ci/linting-and-static-analysis.md) | Security rules |

---

## 📋 Nonce Verification

### Form Nonces

```php
// Creating the form
function my_plugin_settings_form() {
    ?>
    <form method="post" action="">
        <?php wp_nonce_field( 'my_plugin_save_settings', 'my_plugin_nonce' ); ?>

        <input type="text" name="api_key" value="<?php echo esc_attr( get_option( 'my_plugin_api_key' ) ); ?>">

        <?php submit_button( 'Save Settings' ); ?>
    </form>
    <?php
}

// Processing the form
function my_plugin_process_settings() {
    // Verify nonce
    if ( ! isset( $_POST['my_plugin_nonce'] ) ||
         ! wp_verify_nonce( $_POST['my_plugin_nonce'], 'my_plugin_save_settings' ) ) {
        wp_die( 'Security check failed' );
    }

    // Verify capability
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( 'Unauthorized access' );
    }

    // Process with sanitization
    $api_key = sanitize_text_field( wp_unslash( $_POST['api_key'] ?? '' ) );
    update_option( 'my_plugin_api_key', $api_key );

    wp_safe_redirect( add_query_arg( 'updated', 'true' ) );
    exit;
}
```

### AJAX Nonces

```php
// Enqueue script with nonce
wp_enqueue_script( 'my-plugin-admin', ... );
wp_localize_script( 'my-plugin-admin', 'myPlugin', [
    'nonce' => wp_create_nonce( 'my_plugin_ajax' ),
    'ajaxUrl' => admin_url( 'admin-ajax.php' ),
] );

// JavaScript
fetch( myPlugin.ajaxUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams( {
        action: 'my_plugin_action',
        nonce: myPlugin.nonce,
        data: 'value',
    } ),
} );

// PHP handler
add_action( 'wp_ajax_my_plugin_action', function() {
    check_ajax_referer( 'my_plugin_ajax', 'nonce' );

    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_send_json_error( 'Unauthorized', 403 );
    }

    $data = sanitize_text_field( $_POST['data'] ?? '' );

    wp_send_json_success( [ 'result' => $data ] );
} );
```

### REST API Nonces

```php
// Register route with permission callback
register_rest_route( 'my-plugin/v1', '/items', [
    'methods' => 'POST',
    'callback' => 'my_plugin_create_item',
    'permission_callback' => function() {
        return current_user_can( 'edit_posts' );
    },
    'args' => [
        'title' => [
            'required' => true,
            'sanitize_callback' => 'sanitize_text_field',
        ],
    ],
] );

// JavaScript with nonce
fetch( '/wp-json/my-plugin/v1/items', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpApiSettings.nonce,
    },
    body: JSON.stringify( { title: 'New Item' } ),
} );
```

---

## 🛡️ Capability Checks

### Standard Capabilities

```php
// Check before displaying admin page
function my_plugin_admin_menu() {
    add_menu_page(
        'My Plugin',
        'My Plugin',
        'manage_options', // Required capability
        'my-plugin',
        'my_plugin_admin_page'
    );
}

// Double-check in page callback
function my_plugin_admin_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( 'Unauthorized access' );
    }

    // Render page
}
```

### Custom Capabilities

```php
// Register custom capability on activation
function my_plugin_activate() {
    $role = get_role( 'administrator' );
    $role->add_cap( 'manage_my_plugin' );

    $role = get_role( 'editor' );
    $role->add_cap( 'use_my_plugin' );
}

// Check custom capability
if ( current_user_can( 'manage_my_plugin' ) ) {
    // Admin-level plugin actions
}

if ( current_user_can( 'use_my_plugin' ) ) {
    // User-level plugin actions
}
```

### Object-Level Capabilities

```php
// Check capability for specific post
if ( current_user_can( 'edit_post', $post_id ) ) {
    // User can edit this specific post
}

// Custom object capability
function my_plugin_can_edit_item( int $item_id ): bool {
    if ( current_user_can( 'manage_options' ) ) {
        return true;
    }

    $item = get_post( $item_id );
    return $item && (int) $item->post_author === get_current_user_id();
}
```

---

## 🧹 Input Sanitization

### Common Sanitization Functions

```php
// Text input
$text = sanitize_text_field( wp_unslash( $_POST['text'] ?? '' ) );

// Email
$email = sanitize_email( $_POST['email'] ?? '' );

// URL
$url = esc_url_raw( $_POST['url'] ?? '' );

// Integer
$number = absint( $_POST['number'] ?? 0 );

// HTML content (limited tags)
$html = wp_kses_post( $_POST['content'] ?? '' );

// Filename
$filename = sanitize_file_name( $_POST['filename'] ?? '' );

// Slug
$slug = sanitize_title( $_POST['title'] ?? '' );

// Textarea (multiline text)
$textarea = sanitize_textarea_field( wp_unslash( $_POST['textarea'] ?? '' ) );

// Array of values
$values = array_map( 'sanitize_text_field', wp_unslash( $_POST['values'] ?? [] ) );
```

### Validation

```php
function my_plugin_validate_input( array $input ): array {
    $errors = [];

    // Required field
    if ( empty( $input['email'] ) ) {
        $errors['email'] = 'Email is required';
    } elseif ( ! is_email( $input['email'] ) ) {
        $errors['email'] = 'Invalid email format';
    }

    // Range validation
    $quantity = absint( $input['quantity'] ?? 0 );
    if ( $quantity < 1 || $quantity > 100 ) {
        $errors['quantity'] = 'Quantity must be between 1 and 100';
    }

    // Enum validation
    $allowed_statuses = [ 'draft', 'active', 'archived' ];
    if ( ! in_array( $input['status'] ?? '', $allowed_statuses, true ) ) {
        $errors['status'] = 'Invalid status';
    }

    return $errors;
}
```

---

## 🖨️ Output Escaping

### Escaping by Context

```php
// HTML content
echo '<p>' . esc_html( $user_input ) . '</p>';

// HTML attributes
echo '<input value="' . esc_attr( $value ) . '">';

// URLs
echo '<a href="' . esc_url( $link ) . '">Link</a>';

// JavaScript
echo '<script>var data = ' . wp_json_encode( $data ) . ';</script>';

// Translation with escaping
echo esc_html__( 'Welcome', 'my-plugin' );
printf( esc_html__( 'Hello, %s', 'my-plugin' ), esc_html( $name ) );

// Rich HTML (use sparingly)
$allowed_html = [
    'a' => [ 'href' => [], 'title' => [] ],
    'strong' => [],
    'em' => [],
];
echo wp_kses( $rich_text, $allowed_html );
```

### Dynamic Attributes

```php
// DANGEROUS - Don't do this
echo '<div class="' . $user_class . '">'; // XSS vulnerability!

// SAFE - Escape properly
echo '<div class="' . esc_attr( $user_class ) . '">';

// SAFE - Use allowed list
$allowed_classes = [ 'primary', 'secondary', 'danger' ];
$class = in_array( $user_class, $allowed_classes, true ) ? $user_class : 'primary';
echo '<div class="' . esc_attr( $class ) . '">';
```

---

## 🗄️ Database Security

### Prepared Statements

```php
global $wpdb;

// Single value
$result = $wpdb->get_row(
    $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}my_table WHERE id = %d",
        $id
    )
);

// Multiple values
$results = $wpdb->get_results(
    $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}my_table WHERE status = %s AND user_id = %d",
        $status,
        $user_id
    )
);

// Insert with prepare
$wpdb->query(
    $wpdb->prepare(
        "INSERT INTO {$wpdb->prefix}my_table (name, value) VALUES (%s, %d)",
        $name,
        $value
    )
);

// Use insert method (auto-prepares)
$wpdb->insert(
    $wpdb->prefix . 'my_table',
    [ 'name' => $name, 'value' => $value ],
    [ '%s', '%d' ]
);
```

### LIKE Queries

```php
// Escape LIKE wildcards
$search = $wpdb->esc_like( $user_search );

$results = $wpdb->get_results(
    $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}posts WHERE post_title LIKE %s",
        '%' . $search . '%'
    )
);
```

---

## 🔐 File Upload Security

```php
function my_plugin_handle_upload(): array {
    // Verify nonce and capability first
    check_ajax_referer( 'my_plugin_upload', 'nonce' );

    if ( ! current_user_can( 'upload_files' ) ) {
        return [ 'error' => 'Unauthorized' ];
    }

    $file = $_FILES['file'] ?? null;
    if ( ! $file ) {
        return [ 'error' => 'No file uploaded' ];
    }

    // Validate file type
    $allowed_types = [ 'image/jpeg', 'image/png', 'image/gif' ];
    $finfo = new finfo( FILEINFO_MIME_TYPE );
    $mime_type = $finfo->file( $file['tmp_name'] );

    if ( ! in_array( $mime_type, $allowed_types, true ) ) {
        return [ 'error' => 'Invalid file type' ];
    }

    // Validate file size (5MB max)
    if ( $file['size'] > 5 * 1024 * 1024 ) {
        return [ 'error' => 'File too large' ];
    }

    // Use WordPress upload handling
    require_once ABSPATH . 'wp-admin/includes/file.php';

    $upload = wp_handle_upload( $file, [
        'test_form' => false,
        'mimes' => [
            'jpg|jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
        ],
    ] );

    if ( isset( $upload['error'] ) ) {
        return [ 'error' => $upload['error'] ];
    }

    return [ 'url' => $upload['url'] ];
}
```
