# WordPress Plugin Development Core

> **Type**: Skill
> **Domain**: wordpress/plugins
> **Source**: [jezweb/claude-skills](https://skills.sh/jezweb/claude-skills/wordpress-plugin-core)

<skill>
<summary>
Security-first WordPress plugin development for WordPress 6.7-6.9+, covering architecture patterns and critical issue prevention.
</summary>

<knowledge>
## Security Foundations (5 Essentials)

### 1. Unique Prefixes
Use 4-5 character prefix for all global code:
```php
// Functions
function myplugin_init() {}

// Classes
class MyPlugin_Admin {}

// Options
update_option('myplugin_settings', $data);

// Hooks
do_action('myplugin_after_save', $post_id);
```

### 2. ABSPATH Check
Every PHP file must start with:
```php
<?php
if (!defined('ABSPATH')) {
    exit;
}
```

### 3. Nonce Verification
```php
// Create nonce in form
wp_nonce_field('myplugin_save_action', 'myplugin_nonce');

// Verify on submission
if (!wp_verify_nonce($_POST['myplugin_nonce'] ?? '', 'myplugin_save_action')) {
    wp_die('Security check failed');
}
```

### 4. Input Sanitization & Output Escaping
```php
// Sanitize input (by data type)
$text = sanitize_text_field($_POST['title']);
$email = sanitize_email($_POST['email']);
$int = absint($_POST['count']);
$html = wp_kses_post($_POST['content']);

// Escape output (by context)
echo esc_html($text);           // HTML content
echo esc_attr($value);          // HTML attributes
echo esc_url($url);             // URLs
echo esc_js($string);           // JavaScript
echo wp_kses_post($html);       // Allow safe HTML
```

### 5. Prepared Statements
```php
global $wpdb;

// Always use prepare() for dynamic values
$results = $wpdb->get_results(
    $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}custom_table WHERE user_id = %d AND status = %s",
        $user_id,
        $status
    )
);
```

## Architecture Patterns

### Simple (Functions Only)
For plugins with fewer than 5 functions:
```php
<?php
/**
 * Plugin Name: My Simple Plugin
 */

if (!defined('ABSPATH')) exit;

add_action('init', 'myplugin_init');
function myplugin_init() {
    // Plugin logic
}
```

### OOP Singleton
For medium-sized plugins:
```php
<?php
/**
 * Plugin Name: My OOP Plugin
 */

if (!defined('ABSPATH')) exit;

final class MyPlugin {
    private static $instance = null;

    public static function instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->define_constants();
        $this->init_hooks();
    }

    private function define_constants() {
        define('MYPLUGIN_VERSION', '1.0.0');
        define('MYPLUGIN_PATH', plugin_dir_path(__FILE__));
    }

    private function init_hooks() {
        add_action('init', [$this, 'init']);
    }

    public function init() {
        // Plugin initialization
    }
}

MyPlugin::instance();
```

### PSR-4 with Composer
For large-scale plugins:
```json
{
    "autoload": {
        "psr-4": {
            "MyPlugin\\": "src/"
        }
    }
}
```

## Common Patterns

### Custom Post Type
```php
add_action('init', 'myplugin_register_cpt');
function myplugin_register_cpt() {
    register_post_type('myplugin_item', [
        'labels' => [
            'name' => __('Items', 'myplugin'),
            'singular_name' => __('Item', 'myplugin'),
        ],
        'public' => true,
        'show_in_rest' => true,  // Block editor support
        'supports' => ['title', 'editor', 'thumbnail'],
        'rewrite' => ['slug' => 'items'],
    ]);
}
```

### Meta Box
```php
add_action('add_meta_boxes', 'myplugin_add_meta_box');
function myplugin_add_meta_box() {
    add_meta_box(
        'myplugin_details',
        __('Details', 'myplugin'),
        'myplugin_meta_box_callback',
        'myplugin_item'
    );
}

function myplugin_meta_box_callback($post) {
    wp_nonce_field('myplugin_save_meta', 'myplugin_meta_nonce');
    $value = get_post_meta($post->ID, '_myplugin_field', true);
    ?>
    <label for="myplugin_field"><?php esc_html_e('Field:', 'myplugin'); ?></label>
    <input type="text" id="myplugin_field" name="myplugin_field"
           value="<?php echo esc_attr($value); ?>">
    <?php
}

add_action('save_post_myplugin_item', 'myplugin_save_meta');
function myplugin_save_meta($post_id) {
    if (!wp_verify_nonce($_POST['myplugin_meta_nonce'] ?? '', 'myplugin_save_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $value = sanitize_text_field($_POST['myplugin_field'] ?? '');
    update_post_meta($post_id, '_myplugin_field', $value);
}
```

### REST API Endpoint
```php
add_action('rest_api_init', 'myplugin_register_routes');
function myplugin_register_routes() {
    register_rest_route('myplugin/v1', '/items', [
        'methods' => 'GET',
        'callback' => 'myplugin_get_items',
        'permission_callback' => function() {
            return current_user_can('read');
        },
    ]);
}

function myplugin_get_items($request) {
    $items = get_posts([
        'post_type' => 'myplugin_item',
        'posts_per_page' => 10,
    ]);
    return rest_ensure_response($items);
}
```

## Critical Issues to Prevent

| Issue | Prevention |
|-------|------------|
| SQL Injection | Always use `$wpdb->prepare()` |
| XSS | Escape all output with `esc_*` functions |
| CSRF | Verify nonces on all form submissions |
| Capability bypass | Check `current_user_can()` |
| REST API auth | Always set `permission_callback` |
| Direct file access | Add ABSPATH check |

## WordPress 6.7+ Changes

- **Translation loading**: Use `load_plugin_textdomain()` in `init`, not earlier
- **bcrypt passwords** (6.8): Passwords auto-migrate on login
- **WP_Dependencies** (6.9): Deprecated, use new APIs
</knowledge>

<best_practices>
- Security first: sanitize input, escape output, verify nonces
- Use unique prefixes for all global identifiers
- Check capabilities before performing actions
- REST API is 10x faster than admin-ajax.php
- Always set `show_in_rest` for block editor support
</best_practices>

<references>
- [skills.sh/jezweb](https://skills.sh/jezweb/claude-skills/wordpress-plugin-core)
- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
</references>
</skill>
