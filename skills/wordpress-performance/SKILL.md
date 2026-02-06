---
name: WordPress Performance
description: WordPress performance optimization targeting Core Web Vitals (LCP, INP, CLS). Covers PHP profiling, database optimization, caching strategies, asset loading, and WordPress 6.9+ performance features.
triggers:
  - performance
  - core web vitals
  - LCP
  - INP
  - CLS
  - caching
  - object cache
  - transients
  - database optimization
  - asset loading
  - lazy loading
  - profiling
---

# WordPress Performance

Optimize WordPress for Core Web Vitals (LCP, INP, CLS) and server response times. Focus on measurable improvements with highest impact.

## Core Web Vitals

### LCP (Largest Contentful Paint) — Target: < 2.5s

Identify the largest visible element and optimize its load path:

- **Preload LCP image**: `<link rel="preload" as="image" href="hero.webp">`
- **Remove render-blocking CSS** for above-the-fold content
- **Optimize server response time** (TTFB < 800ms)
- Use `fetchpriority="high"` on LCP image

### INP (Interaction to Next Paint) — Target: < 200ms

Reduce JavaScript execution blocking interaction:

- Defer non-critical JavaScript
- Break long tasks into smaller chunks
- Use `requestIdleCallback` for non-urgent work
- Avoid heavy `click` handlers on main thread

### CLS (Cumulative Layout Shift) — Target: < 0.1

Prevent layout shifts:

- Set `width` and `height` on all images
- Use `aspect-ratio` CSS for responsive images
- Reserve space for dynamic content (ads, embeds)
- Avoid inserting content above existing content

## PHP Performance

### Avoid Expensive Operations on Every Page Load

```php
// BAD: Runs on every request
add_action( 'init', function() {
    $data = expensive_api_call();
} );

// GOOD: Cache the result
add_action( 'init', function() {
    $data = get_transient( 'my_api_data' );
    if ( false === $data ) {
        $data = expensive_api_call();
        set_transient( 'my_api_data', $data, HOUR_IN_SECONDS );
    }
} );
```

### Object Cache

```php
// Use wp_cache for frequently accessed data
$value = wp_cache_get( 'my_key', 'my_group' );
if ( false === $value ) {
    $value = compute_expensive_value();
    wp_cache_set( 'my_key', $value, 'my_group', 3600 );
}
```

### N+1 Query Prevention

```php
// BAD: One query per post
foreach ( $posts as $post ) {
    $meta = get_post_meta( $post->ID, 'my_meta', true );
}

// GOOD: Prime the cache first
update_postmeta_cache( wp_list_pluck( $posts, 'ID' ) );
foreach ( $posts as $post ) {
    $meta = get_post_meta( $post->ID, 'my_meta', true ); // Uses cache
}
```

## Database Optimization

### Efficient Queries

```php
// BAD: meta_query with LIKE
'meta_query' => [
    [ 'key' => 'color', 'value' => 'blue', 'compare' => 'LIKE' ]
]

// GOOD: Exact match or taxonomy
'meta_query' => [
    [ 'key' => 'color', 'value' => 'blue', 'compare' => '=' ]
]
```

### Query Optimizations

- Use `'fields' => 'ids'` when you only need IDs
- Use `'no_found_rows' => true` when you don't need pagination
- Use `'update_post_meta_cache' => false` when you don't need meta
- Use `'update_post_term_cache' => false` when you don't need terms

```php
$query = new WP_Query( [
    'post_type'              => 'post',
    'posts_per_page'         => 10,
    'no_found_rows'          => true,
    'update_post_meta_cache' => false,
    'update_post_term_cache' => false,
] );
```

### Custom Table Indexes

```php
// Add index for frequently queried columns
$wpdb->query( "CREATE INDEX idx_custom_col ON {$wpdb->prefix}my_table (custom_col)" );
```

## Asset Loading

### Conditional Loading

```php
// Only load on pages that need it
add_action( 'wp_enqueue_scripts', function() {
    if ( ! is_singular( 'product' ) ) {
        return;
    }
    wp_enqueue_script( 'product-gallery', ... );
} );
```

### Defer / Async

```php
// Defer non-critical scripts
add_filter( 'script_loader_tag', function( $tag, $handle ) {
    if ( 'my-script' === $handle ) {
        return str_replace( ' src', ' defer src', $tag );
    }
    return $tag;
}, 10, 2 );
```

### Critical CSS

Inline critical CSS and defer the rest:

```php
add_action( 'wp_head', function() {
    echo '<style>' . file_get_contents( get_template_directory() . '/critical.css' ) . '</style>';
} );
```

## WordPress 6.9+ Optimizations

- **On-demand CSS loading** for classic themes
- **Speculative loading API** for prefetching
- **Block-level asset loading** — scripts/styles per block, not global
- **Lazy loading** built into core for images and iframes

## Caching Strategy

| Layer | Tool | TTL |
|---|---|---|
| Object cache | Redis/Memcached | Persistent |
| Transients | `set_transient()` | Hours/days |
| Fragment cache | `wp_cache_get()` | Minutes |
| Full page | Varnish/CDN | Minutes |
| Browser | `Cache-Control` headers | Hours/days |

## References

- [WordPress Performance Team](https://make.wordpress.org/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [WordPress Performance Best Practices](https://developer.wordpress.org/advanced-administration/performance/)
