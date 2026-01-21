# WordPress Pro

> **Type**: Skill
> **Domain**: wordpress/development
> **Source**: [jeffallan/claude-skills](https://skills.sh/jeffallan/claude-skills/wordpress-pro)

<skill>
<summary>
Senior WordPress development specialization covering themes, plugins, Gutenberg, WooCommerce, and performance optimization.
</summary>

<knowledge>
## When to Use

- Building custom WordPress themes
- Creating plugins with sound architecture
- Developing Gutenberg blocks and patterns
- Extending WooCommerce functionality
- Creating REST API endpoints
- Performance and security optimization
- Working with ACF (Advanced Custom Fields)
- Implementing Full Site Editing (FSE)

## Core Workflow

### 1. Analyze
Evaluate environment, existing configuration, and objectives:
- WordPress version
- PHP version
- Existing plugins/themes
- Database structure
- Performance baseline

### 2. Design
Structure architecture, define hooks and data patterns:
- Template hierarchy
- Hook priorities
- Data flow
- Caching strategy

### 3. Implement
Develop following WordPress standards:
- WPCS compliance
- Security protocols
- Internationalization
- Accessibility

### 4. Optimize
Apply performance best practices:
- Query optimization
- Caching implementation
- Asset loading
- Database indexing

### 5. Test & Secure
Validate and harden:
- Security review
- Performance testing
- Version compatibility
- Code review

## Must Do

- Follow WordPress Coding Standards (WPCS)
- Implement nonces on all forms
- Sanitize all user inputs
- Escape all outputs
- Use prepared statements for database queries
- Check capabilities before actions
- Properly enqueue scripts/styles
- Use hooks, never modify core
- Include translation strings with text domain
- Test against multiple WP versions

## Must Not Do

- Modify WordPress core files
- Use PHP short tags
- Process unsanitized input
- Output unescaped data
- Hardcode table prefixes (use `$wpdb->prefix`)
- Skip capability checks
- Leave SQL injection vulnerabilities
- Bundle redundant libraries
- Create file upload vulnerabilities
- Skip internationalization

## Key Patterns

### Theme Development

```php
// functions.php - Theme setup
add_action('after_setup_theme', 'mytheme_setup');
function mytheme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'gallery', 'caption']);
    add_theme_support('editor-styles');
    add_theme_support('wp-block-styles');

    register_nav_menus([
        'primary' => __('Primary Menu', 'mytheme'),
        'footer' => __('Footer Menu', 'mytheme'),
    ]);
}
```

### Custom Block (PHP)

```php
add_action('init', 'mytheme_register_blocks');
function mytheme_register_blocks() {
    register_block_type(__DIR__ . '/blocks/my-block');
}
```

### REST API Endpoint

```php
add_action('rest_api_init', 'mytheme_api_routes');
function mytheme_api_routes() {
    register_rest_route('mytheme/v1', '/featured', [
        'methods' => 'GET',
        'callback' => 'mytheme_get_featured',
        'permission_callback' => '__return_true',
    ]);
}

function mytheme_get_featured() {
    $posts = get_posts([
        'post_type' => 'post',
        'posts_per_page' => 5,
        'meta_key' => '_featured',
        'meta_value' => '1',
    ]);

    return array_map(function($post) {
        return [
            'id' => $post->ID,
            'title' => get_the_title($post),
            'excerpt' => get_the_excerpt($post),
            'link' => get_permalink($post),
            'thumbnail' => get_the_post_thumbnail_url($post, 'medium'),
        ];
    }, $posts);
}
```

### WooCommerce Customization

```php
// Add custom field to product
add_action('woocommerce_product_options_general_product_data', 'mytheme_product_field');
function mytheme_product_field() {
    woocommerce_wp_text_input([
        'id' => '_custom_field',
        'label' => __('Custom Field', 'mytheme'),
        'desc_tip' => true,
        'description' => __('Enter custom value', 'mytheme'),
    ]);
}

add_action('woocommerce_process_product_meta', 'mytheme_save_product_field');
function mytheme_save_product_field($post_id) {
    $value = sanitize_text_field($_POST['_custom_field'] ?? '');
    update_post_meta($post_id, '_custom_field', $value);
}
```

### ACF Integration

```php
// Get ACF field with fallback
function mytheme_get_field($field, $post_id = null, $default = '') {
    if (!function_exists('get_field')) {
        return $default;
    }
    $value = get_field($field, $post_id);
    return $value !== null ? $value : $default;
}
```

## Technology Stack

- WordPress 6.4+
- PHP 8.1+
- Gutenberg / Block Editor
- WooCommerce
- ACF
- REST API
- WP-CLI
- Object caching (Redis/Memcached)

## Related Skills

- **plugin-architecture** — Plugin structure patterns
- **block-development** — Gutenberg block creation
- **interactivity-api** — Client-side interactivity
- **performance-rules** — Optimization strategies
- **input-sanitization** — Security practices
</knowledge>

<best_practices>
- Use hooks and filters, never modify core
- Follow template hierarchy for themes
- Implement proper error handling
- Cache expensive operations
- Profile before optimizing
</best_practices>

<references>
- [skills.sh/jeffallan](https://skills.sh/jeffallan/claude-skills/wordpress-pro)
- [WordPress Developer Resources](https://developer.wordpress.org/)
- [WooCommerce Developer Docs](https://woo.com/document/woocommerce-developer-documentation/)
</references>
</skill>
