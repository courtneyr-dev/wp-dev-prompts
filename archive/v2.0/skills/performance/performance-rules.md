# WordPress Performance Best Practices

> **Type**: Skill
> **Domain**: performance
> **Source**: [bartekmis/wordpress-performance-best-practises](https://skills.sh/bartekmis/wordpress-performance-best-practises/wordpress-performance-best-practices)

<skill>
<summary>
34 prioritized performance rules across 8 categories for WordPress development.
</summary>

<knowledge>
## Rule Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Database | CRITICAL | db- |
| 2 | Caching | CRITICAL | cache- |
| 3 | Assets | HIGH | asset- |
| 4 | Theme | HIGH | theme- |
| 5 | Plugin | MEDIUM-HIGH | plugin- |
| 6 | Media | MEDIUM | media- |
| 7 | API/AJAX | MEDIUM | api- |
| 8 | Advanced | LOW-MEDIUM | advanced- |

## Database Optimization (Critical)

### db-1: Use Prepared Statements
```php
// Good
$wpdb->prepare("SELECT * FROM {$wpdb->posts} WHERE ID = %d", $id);

// Bad - SQL injection risk and no query optimization
$wpdb->query("SELECT * FROM wp_posts WHERE ID = $id");
```

### db-2: Avoid post__not_in
```php
// Bad - Forces full table scan
$query = new WP_Query([
    'post__not_in' => [1, 2, 3, 4, 5]
]);

// Better - Use post_status or custom meta
$query = new WP_Query([
    'meta_query' => [
        ['key' => '_excluded', 'compare' => 'NOT EXISTS']
    ]
]);
```

### db-3: Limit Results
```php
// Always set posts_per_page
$query = new WP_Query([
    'posts_per_page' => 10,  // Never use -1 in production
    'no_found_rows' => true, // Skip counting if no pagination
]);
```

### db-4: Select Only Needed Fields
```php
$query = new WP_Query([
    'fields' => 'ids',  // Only get IDs if that's all you need
]);
```

### db-5: Optimize Meta Queries
```php
// Add index for frequently queried meta keys
// In your activation hook:
$wpdb->query("CREATE INDEX meta_key_idx ON {$wpdb->postmeta} (meta_key(191))");
```

## Caching (Critical)

### cache-1: Use Transients for External Calls
```php
function get_external_data() {
    $data = get_transient('external_data');

    if (false === $data) {
        $response = wp_remote_get('https://api.example.com/data');
        $data = wp_remote_retrieve_body($response);
        set_transient('external_data', $data, HOUR_IN_SECONDS);
    }

    return $data;
}
```

### cache-2: Use Object Cache with Groups
```php
// Set with group
wp_cache_set('user_' . $user_id, $data, 'my_plugin', 3600);

// Get with group
$data = wp_cache_get('user_' . $user_id, 'my_plugin');

// Flush entire group
wp_cache_flush_group('my_plugin');
```

### cache-3: Event-Driven Invalidation
```php
// Invalidate on relevant actions
add_action('save_post', function($post_id) {
    delete_transient('recent_posts_cache');
});
```

### cache-4: Cache Template Fragments
```php
function get_cached_sidebar() {
    $cache_key = 'sidebar_' . get_the_ID();
    $output = get_transient($cache_key);

    if (false === $output) {
        ob_start();
        get_sidebar();
        $output = ob_get_clean();
        set_transient($cache_key, $output, DAY_IN_SECONDS);
    }

    return $output;
}
```

## Asset Management (High)

### asset-1: Properly Enqueue Scripts/Styles
```php
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'my-plugin',
        plugins_url('css/style.css', __FILE__),
        [],
        filemtime(plugin_dir_path(__FILE__) . 'css/style.css')
    );
});
```

### asset-2: Load Conditionally
```php
add_action('wp_enqueue_scripts', function() {
    if (is_singular('product')) {
        wp_enqueue_script('product-gallery');
    }
});
```

### asset-3: Defer Non-Critical Scripts
```php
add_filter('script_loader_tag', function($tag, $handle) {
    $defer_scripts = ['analytics', 'social-share'];
    if (in_array($handle, $defer_scripts)) {
        return str_replace(' src', ' defer src', $tag);
    }
    return $tag;
}, 10, 2);
```

### asset-4: Dequeue Unused Assets
```php
add_action('wp_enqueue_scripts', function() {
    // Remove block library CSS if not using blocks
    if (!has_blocks()) {
        wp_dequeue_style('wp-block-library');
    }
}, 100);
```

## Theme Performance (High)

### theme-1: Avoid Queries in Templates
```php
// Bad - Query in template
<?php
$recent = new WP_Query(['posts_per_page' => 5]);
while ($recent->have_posts()) : $recent->the_post();
?>

// Good - Use pre_get_posts filter
add_action('pre_get_posts', function($query) {
    if ($query->is_main_query() && is_home()) {
        $query->set('posts_per_page', 5);
    }
});
```

### theme-2: Use get_template_part()
```php
// Enables template part caching and organization
get_template_part('template-parts/content', get_post_type());
```

### theme-3: Cache-Prime Loops
```php
// Before the loop, prime the cache
$post_ids = wp_list_pluck($posts, 'ID');
update_post_meta_cache($post_ids);
update_post_thumbnail_cache($query);
```

## Plugin Architecture (Medium-High)

### plugin-1: Load Conditionally
```php
// Only load admin features in admin
if (is_admin()) {
    require_once __DIR__ . '/admin/class-admin.php';
}

// Only load frontend features on frontend
if (!is_admin()) {
    require_once __DIR__ . '/public/class-public.php';
}
```

### plugin-2: Use PSR-4 Autoloading
```json
{
    "autoload": {
        "psr-4": {
            "MyPlugin\\": "src/"
        }
    }
}
```

### plugin-3: Proper Hook Priorities
```php
// Remove hooks with matching priority
remove_action('wp_head', 'wp_generator');  // Priority 10
add_action('wp_head', 'my_meta_tags', 1);  // Run early
```

## Media Optimization (Medium)

### media-1: Use Responsive Images
```php
// WordPress handles srcset automatically for images in content
// For custom images:
echo wp_get_attachment_image($attachment_id, 'large');
```

### media-2: Lazy Load Below-Fold
```php
// WordPress 5.5+ adds loading="lazy" automatically
// For custom images:
echo '<img src="image.jpg" loading="lazy" alt="Description">';
```

### media-3: Define Custom Image Sizes
```php
add_action('after_setup_theme', function() {
    add_image_size('card-thumbnail', 400, 300, true);
});
```

## API and AJAX (Medium)

### api-1: Prefer REST API Over admin-ajax.php
```php
// REST API - ~10x faster
register_rest_route('myplugin/v1', '/data', [
    'methods' => 'GET',
    'callback' => 'get_data',
    'permission_callback' => '__return_true',
]);
```

### api-2: Add Caching Headers
```php
add_filter('rest_post_dispatch', function($response, $server, $request) {
    if ($request->get_route() === '/myplugin/v1/data') {
        $response->header('Cache-Control', 'max-age=300');
    }
    return $response;
}, 10, 3);
```

## Advanced Patterns (Low-Medium)

### advanced-1: Keep Autoloaded Options Under 800KB
```php
// Check autoload size
SELECT SUM(LENGTH(option_value)) as size
FROM wp_options
WHERE autoload = 'yes';

// Disable autoload for large options
update_option('large_option', $data, false);
```

### advanced-2: Batch Cron Tasks
```php
// Process in batches, not all at once
add_action('my_batch_cron', function() {
    $items = get_pending_items(100); // Limit per run
    foreach ($items as $item) {
        process_item($item);
    }
});
```

### advanced-3: Profile Before Optimizing
```bash
# Use Query Monitor plugin
# Or WP-CLI profile command
wp profile stage --all --spotlight
```
</knowledge>

<best_practices>
- Always profile before optimizing — measure, don't guess
- Database and caching have highest impact
- Load code conditionally based on context
- Use WordPress caching APIs (transients, object cache)
- Batch long-running operations
</best_practices>

<references>
- [skills.sh/bartekmis](https://skills.sh/bartekmis/wordpress-performance-best-practises/wordpress-performance-best-practices)
- [WordPress Performance Team](https://make.wordpress.org/performance/)
- [Query Monitor Plugin](https://querymonitor.com/)
</references>
</skill>
