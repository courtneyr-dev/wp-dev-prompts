# Caching Strategies for WordPress

> **Type**: Skill
> **Domain**: Performance
> **Focus**: Implementing effective caching in WordPress plugins

<skill>
<summary>
Best practices for implementing various caching layers in WordPress plugins to improve performance.
</summary>

<knowledge>
## Caching Layers

### 1. Object Cache (Request Level)

```php
// In-memory cache for current request
$data = wp_cache_get( 'my_key', 'my_plugin' );

if ( false === $data ) {
    $data = compute_expensive_data();
    wp_cache_set( 'my_key', $data, 'my_plugin' );
}

return $data;
```

### 2. Transients (Database/Object Cache)

```php
// Persistent cache with expiration
$data = get_transient( 'my_plugin_data' );

if ( false === $data ) {
    $data = fetch_external_data();
    set_transient( 'my_plugin_data', $data, HOUR_IN_SECONDS );
}

return $data;
```

### 3. Site Transients (Multisite Aware)

```php
// For multisite-wide data
$data = get_site_transient( 'my_plugin_network_data' );

if ( false === $data ) {
    $data = compute_network_data();
    set_site_transient( 'my_plugin_network_data', $data, DAY_IN_SECONDS );
}

return $data;
```

## Object Cache Patterns

### Grouped Caching

```php
// Group related items for easy invalidation
wp_cache_set( 'item_1', $data1, 'my_plugin_items' );
wp_cache_set( 'item_2', $data2, 'my_plugin_items' );
wp_cache_set( 'item_3', $data3, 'my_plugin_items' );

// Invalidate entire group
wp_cache_flush_group( 'my_plugin_items' );
```

### Cache Stampede Prevention

```php
/**
 * Prevents cache stampede with stale-while-revalidate pattern.
 */
function get_cached_with_lock( string $key, callable $callback, int $ttl = 3600 ): mixed {
    $cache_key  = "my_plugin_{$key}";
    $lock_key   = "{$cache_key}_lock";

    $cached = get_transient( $cache_key );

    if ( false !== $cached ) {
        return $cached;
    }

    // Try to acquire lock
    if ( ! get_transient( $lock_key ) ) {
        set_transient( $lock_key, true, 30 ); // 30 second lock

        try {
            $data = $callback();
            set_transient( $cache_key, $data, $ttl );
            return $data;
        } finally {
            delete_transient( $lock_key );
        }
    }

    // Another process is refreshing, wait and retry
    usleep( 100000 ); // 100ms
    return get_cached_with_lock( $key, $callback, $ttl );
}

// Usage
$data = get_cached_with_lock( 'expensive_data', function() {
    return expensive_api_call();
}, HOUR_IN_SECONDS );
```

### Lazy Cache Refresh

```php
/**
 * Returns stale data while refreshing in background.
 */
function get_with_background_refresh( string $key, callable $callback, int $ttl = 3600 ): mixed {
    $cache_key     = "my_plugin_{$key}";
    $timestamp_key = "{$cache_key}_timestamp";

    $cached    = get_transient( $cache_key );
    $timestamp = get_transient( $timestamp_key );

    // Fresh data exists
    if ( false !== $cached && $timestamp && time() < $timestamp + $ttl ) {
        return $cached;
    }

    // Stale data exists - return it but schedule refresh
    if ( false !== $cached ) {
        wp_schedule_single_event( time(), 'my_plugin_refresh_cache', array( $key ) );
        return $cached;
    }

    // No data - compute synchronously
    $data = $callback();
    set_transient( $cache_key, $data, $ttl * 2 ); // Keep longer for stale serving
    set_transient( $timestamp_key, time(), $ttl * 2 );

    return $data;
}

// Handle background refresh
add_action( 'my_plugin_refresh_cache', function( $key ) {
    $data = expensive_computation();
    set_transient( "my_plugin_{$key}", $data, HOUR_IN_SECONDS * 2 );
    set_transient( "my_plugin_{$key}_timestamp", time(), HOUR_IN_SECONDS * 2 );
} );
```

## Cache Invalidation

### Hook-Based Invalidation

```php
// Clear cache when content changes
add_action( 'save_post', function( $post_id, $post ) {
    if ( 'publish' !== $post->post_status ) {
        return;
    }

    // Clear related caches
    delete_transient( 'my_plugin_posts_list' );
    delete_transient( 'my_plugin_posts_count' );
    wp_cache_delete( 'posts_summary', 'my_plugin' );
}, 10, 2 );

// Clear cache on option change
add_action( 'update_option_my_plugin_settings', function() {
    delete_transient( 'my_plugin_computed_settings' );
} );

// Clear cache on plugin update
add_action( 'upgrader_process_complete', function( $upgrader, $options ) {
    if ( 'plugin' === $options['type'] && in_array( 'my-plugin/my-plugin.php', $options['plugins'] ) ) {
        my_plugin_flush_all_caches();
    }
}, 10, 2 );
```

### Versioned Cache Keys

```php
/**
 * Uses version in cache key for easy invalidation.
 */
function get_versioned_cache( string $key ): mixed {
    $version   = get_option( 'my_plugin_cache_version', 1 );
    $cache_key = "my_plugin_v{$version}_{$key}";

    return get_transient( $cache_key );
}

function set_versioned_cache( string $key, $data, int $ttl = 3600 ): bool {
    $version   = get_option( 'my_plugin_cache_version', 1 );
    $cache_key = "my_plugin_v{$version}_{$key}";

    return set_transient( $cache_key, $data, $ttl );
}

function invalidate_all_caches(): void {
    $version = get_option( 'my_plugin_cache_version', 1 );
    update_option( 'my_plugin_cache_version', $version + 1 );
}
```

### Tag-Based Invalidation

```php
/**
 * Track cache entries by tags for selective invalidation.
 */
function set_tagged_cache( string $key, $data, array $tags, int $ttl = 3600 ): void {
    set_transient( "my_plugin_{$key}", $data, $ttl );

    foreach ( $tags as $tag ) {
        $tag_keys   = get_option( "my_plugin_tag_{$tag}", array() );
        $tag_keys[] = $key;
        update_option( "my_plugin_tag_{$tag}", array_unique( $tag_keys ) );
    }
}

function invalidate_by_tag( string $tag ): void {
    $tag_keys = get_option( "my_plugin_tag_{$tag}", array() );

    foreach ( $tag_keys as $key ) {
        delete_transient( "my_plugin_{$key}" );
    }

    delete_option( "my_plugin_tag_{$tag}" );
}

// Usage
set_tagged_cache( 'user_123_profile', $profile, array( 'user_123', 'profiles' ) );
set_tagged_cache( 'user_123_settings', $settings, array( 'user_123', 'settings' ) );

// Invalidate all user's caches
invalidate_by_tag( 'user_123' );
```

## Fragment Caching

### Caching Page Fragments

```php
/**
 * Cache expensive template parts.
 */
function cached_template_part( string $slug, string $name = '', array $args = array() ): void {
    $cache_key = 'template_' . md5( $slug . $name . serialize( $args ) );
    $cached    = get_transient( $cache_key );

    if ( false !== $cached ) {
        echo $cached;
        return;
    }

    ob_start();
    get_template_part( $slug, $name, $args );
    $output = ob_get_clean();

    set_transient( $cache_key, $output, HOUR_IN_SECONDS );
    echo $output;
}

// Usage
cached_template_part( 'template-parts/sidebar', 'related' );
```

### Block Caching

```php
/**
 * Cache block render output.
 */
add_filter( 'render_block', function( $content, $block ) {
    if ( 'my-plugin/expensive-block' !== $block['blockName'] ) {
        return $content;
    }

    $cache_key = 'block_' . md5( serialize( $block['attrs'] ) );
    $cached    = get_transient( $cache_key );

    if ( false !== $cached ) {
        return $cached;
    }

    set_transient( $cache_key, $content, HOUR_IN_SECONDS );
    return $content;
}, 10, 2 );
```

## External Cache Integration

### Redis/Memcached

```php
// Works automatically with object cache drop-in
// No code changes needed for wp_cache_* functions

// Check if persistent cache available
if ( wp_using_ext_object_cache() ) {
    // Use longer TTLs, more aggressive caching
    $ttl = WEEK_IN_SECONDS;
} else {
    // Database-backed transients, shorter TTLs
    $ttl = HOUR_IN_SECONDS;
}
```

### CDN Cache Headers

```php
/**
 * Set cache headers for CDN caching.
 */
add_action( 'send_headers', function() {
    if ( is_admin() || is_user_logged_in() ) {
        header( 'Cache-Control: private, no-cache, no-store' );
        return;
    }

    if ( is_singular() ) {
        header( 'Cache-Control: public, max-age=3600, s-maxage=86400' );
        return;
    }

    if ( is_archive() ) {
        header( 'Cache-Control: public, max-age=1800, s-maxage=3600' );
    }
} );
```

## Cache Warming

```php
/**
 * Pre-populate cache after clear.
 */
function warm_cache(): void {
    // Warm common queries
    $posts = get_posts( array( 'posts_per_page' => 50 ) );

    // Warm external API data
    get_cached_api_data();

    // Warm computed settings
    get_computed_settings();
}

// Run after cache clear
add_action( 'my_plugin_cache_cleared', 'warm_cache' );

// Or via WP-CLI
if ( defined( 'WP_CLI' ) && WP_CLI ) {
    WP_CLI::add_command( 'my-plugin cache warm', function() {
        warm_cache();
        WP_CLI::success( 'Cache warmed.' );
    } );
}
```
</knowledge>

<best_practices>
- Use object cache for request-level data
- Use transients for persistent data
- Set appropriate TTLs per data type
- Implement proper invalidation hooks
- Prevent cache stampedes
- Warm cache after invalidation
</best_practices>

<commands>
```bash
# Check transients
wp transient list
wp transient get my_plugin_data
wp transient delete my_plugin_data
wp transient delete --expired

# Object cache operations
wp cache flush

# Check if object cache is available
wp cache type
```
</commands>
</skill>
