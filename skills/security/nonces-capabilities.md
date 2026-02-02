# Nonces and Capabilities

> **Type**: Skill
> **Domain**: Security
> **Source**: WordPress/agent-skills wp-plugin-development

<skill>
<summary>
How to properly combine nonces with capability checks for secure WordPress operations.
</summary>

<knowledge>
## Core Principle

**Nonces prevent CSRF, not authorization.**

- **Nonces**: Verify the request came from your site
- **Capabilities**: Verify the user has permission

**Always combine both** for protected operations.

## Nonce Creation

**In Forms:**
```php
<form method="post" action="">
    <?php wp_nonce_field( 'my_action_nonce', 'my_nonce_field' ); ?>
    <!-- form fields -->
    <button type="submit">Submit</button>
</form>
```

**In URLs:**
```php
$url = wp_nonce_url(
    admin_url( 'admin.php?action=delete&id=' . $id ),
    'delete_item_' . $id
);
echo '<a href="' . esc_url( $url ) . '">Delete</a>';
```

**For AJAX:**
```php
// Create nonce
wp_localize_script( 'my-script', 'myAjax', array(
    'nonce' => wp_create_nonce( 'my_ajax_nonce' ),
    'ajaxurl' => admin_url( 'admin-ajax.php' ),
) );
```

## Nonce Verification

**Form Submissions:**
```php
function handle_form_submission() {
    // Verify nonce
    if ( ! isset( $_POST['my_nonce_field'] ) ||
         ! wp_verify_nonce( $_POST['my_nonce_field'], 'my_action_nonce' ) ) {
        wp_die( 'Security check failed.' );
    }

    // Check capability
    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_die( 'You do not have permission to do this.' );
    }

    // Process form...
}
```

**AJAX Handlers:**
```php
add_action( 'wp_ajax_my_action', 'handle_ajax_request' );

function handle_ajax_request() {
    // Verify nonce
    check_ajax_referer( 'my_ajax_nonce', 'nonce' );

    // Check capability
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_send_json_error( 'Unauthorized' );
    }

    // Process request...
    wp_send_json_success( $data );
}
```

**URL Actions:**
```php
function handle_url_action() {
    $id = isset( $_GET['id'] ) ? absint( $_GET['id'] ) : 0;

    // Verify nonce
    if ( ! wp_verify_nonce( $_GET['_wpnonce'], 'delete_item_' . $id ) ) {
        wp_die( 'Security check failed.' );
    }

    // Check capability
    if ( ! current_user_can( 'delete_posts' ) ) {
        wp_die( 'Unauthorized.' );
    }

    // Process...
}
```

## Common Capabilities

**Posts:**
- `edit_posts` - Create/edit own posts
- `edit_others_posts` - Edit any post
- `publish_posts` - Publish posts
- `delete_posts` - Delete own posts

**Pages:**
- `edit_pages` - Create/edit own pages
- `edit_others_pages` - Edit any page
- `publish_pages` - Publish pages

**Users:**
- `create_users` - Create new users
- `edit_users` - Edit user profiles
- `delete_users` - Delete users

**Options:**
- `manage_options` - Access admin settings

**Custom:**
```php
// Check custom capability
if ( current_user_can( 'my_custom_cap' ) ) {
    // Do something
}

// Check capability on specific object
if ( current_user_can( 'edit_post', $post_id ) ) {
    // Can edit this specific post
}
```

## Complete Example

```php
function my_settings_page_handler() {
    // Verify nonce
    if ( ! isset( $_POST['my_settings_nonce'] ) ) {
        return;
    }

    if ( ! wp_verify_nonce( $_POST['my_settings_nonce'], 'save_my_settings' ) ) {
        add_settings_error( 'my_settings', 'invalid_nonce', 'Security check failed.' );
        return;
    }

    // Check capability
    if ( ! current_user_can( 'manage_options' ) ) {
        add_settings_error( 'my_settings', 'no_permission', 'Unauthorized.' );
        return;
    }

    // Sanitize and save
    $value = sanitize_text_field( wp_unslash( $_POST['my_option'] ) );
    update_option( 'my_option', $value );

    add_settings_error( 'my_settings', 'success', 'Settings saved.', 'updated' );
}
```
</knowledge>

<best_practices>
- Always combine nonce verification with capability checks
- Use unique nonce actions for different operations
- Include identifiers in nonce actions (e.g., 'delete_item_' . $id)
- Use check_ajax_referer() for AJAX handlers
- Check capability on specific objects when applicable
</best_practices>

<references>
- [WordPress/agent-skills wp-plugin-development](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-plugin-development)
- [Nonces](https://developer.wordpress.org/plugins/security/nonces/)
- [Checking User Capabilities](https://developer.wordpress.org/plugins/security/checking-user-capabilities/)
</references>
</skill>
