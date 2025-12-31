# Database Optimization for WordPress

> **Type**: Skill
> **Domain**: Performance
> **Focus**: Optimizing database queries and operations in WordPress

<skill>
<summary>
Best practices for writing efficient database queries and managing data in WordPress plugins.
</summary>

<knowledge>
## Query Optimization

### Using $wpdb Efficiently

```php
global $wpdb;

// Use get_var for single values
$count = $wpdb->get_var(
    $wpdb->prepare(
        "SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_type = %s",
        'product'
    )
);

// Use get_row for single row
$post = $wpdb->get_row(
    $wpdb->prepare(
        "SELECT ID, post_title FROM {$wpdb->posts} WHERE ID = %d",
        $post_id
    )
);

// Use get_col for single column
$ids = $wpdb->get_col(
    $wpdb->prepare(
        "SELECT ID FROM {$wpdb->posts} WHERE post_status = %s",
        'publish'
    )
);

// Use get_results for multiple rows
$posts = $wpdb->get_results(
    $wpdb->prepare(
        "SELECT * FROM {$wpdb->posts} WHERE post_type = %s LIMIT %d",
        'post',
        10
    )
);
```

### Avoiding N+1 Queries

```php
// BAD: N+1 query problem
$posts = get_posts( array( 'posts_per_page' => 100 ) );
foreach ( $posts as $post ) {
    $meta = get_post_meta( $post->ID, 'my_meta', true ); // 100 queries!
}

// GOOD: Prefetch meta
$posts = get_posts( array(
    'posts_per_page' => 100,
    'update_post_meta_cache' => true,
) );
foreach ( $posts as $post ) {
    $meta = get_post_meta( $post->ID, 'my_meta', true ); // Uses cache
}

// BETTER: Single query for specific meta
global $wpdb;
$results = $wpdb->get_results( $wpdb->prepare(
    "SELECT p.ID, p.post_title, pm.meta_value as my_meta
     FROM {$wpdb->posts} p
     LEFT JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id AND pm.meta_key = %s
     WHERE p.post_type = %s
     LIMIT 100",
    'my_meta',
    'post'
) );
```

### WP_Query Optimization

```php
// Optimize for listing (no content needed)
$query = new WP_Query( array(
    'post_type'      => 'post',
    'posts_per_page' => 20,

    // Skip expensive operations
    'no_found_rows'          => true,  // Skip count for pagination
    'update_post_meta_cache' => false, // Skip meta cache if not needed
    'update_post_term_cache' => false, // Skip term cache if not needed

    // Only get needed fields
    'fields' => 'ids', // Just IDs, or 'id=>parent'
) );

// For pagination (need total count)
$query = new WP_Query( array(
    'post_type'      => 'post',
    'posts_per_page' => 20,
    'paged'          => $paged,
    // no_found_rows must be false (default)
) );
```

## Custom Table Design

### Creating Tables

```php
function my_plugin_create_tables() {
    global $wpdb;

    $table_name      = $wpdb->prefix . 'my_data';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        user_id bigint(20) unsigned NOT NULL,
        item_type varchar(50) NOT NULL,
        item_data longtext NOT NULL,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY user_id (user_id),
        KEY item_type (item_type),
        KEY created_at (created_at)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta( $sql );
}
register_activation_hook( __FILE__, 'my_plugin_create_tables' );
```

### Index Strategy

```sql
-- Good: Index on frequently queried columns
CREATE INDEX idx_user_type ON wp_my_data (user_id, item_type);

-- Good: Covering index for common query
CREATE INDEX idx_user_created ON wp_my_data (user_id, created_at DESC);

-- Avoid: Too many indexes slow writes
-- Avoid: Indexes on rarely queried columns
-- Avoid: Duplicate/redundant indexes
```

### Query Analysis

```php
// Analyze query performance
global $wpdb;
$wpdb->query( 'SET profiling = 1' );

// Run your query
$results = $wpdb->get_results( $query );

// Check profile
$profile = $wpdb->get_results( 'SHOW PROFILES' );
error_log( print_r( $profile, true ) );

// Explain query
$explain = $wpdb->get_results( "EXPLAIN $query" );
error_log( print_r( $explain, true ) );
```

## Caching Strategies

### Transients

```php
// Cache expensive query results
function get_expensive_data() {
    $cache_key = 'my_expensive_data';
    $cached    = get_transient( $cache_key );

    if ( false !== $cached ) {
        return $cached;
    }

    // Expensive operation
    $data = expensive_database_query();

    // Cache for 1 hour
    set_transient( $cache_key, $data, HOUR_IN_SECONDS );

    return $data;
}

// Invalidate on changes
add_action( 'save_post', function( $post_id ) {
    delete_transient( 'my_expensive_data' );
} );
```

### Object Cache

```php
// Use object cache for request-level caching
function get_cached_result( $key ) {
    $cached = wp_cache_get( $key, 'my_plugin' );

    if ( false !== $cached ) {
        return $cached;
    }

    $result = compute_result( $key );

    wp_cache_set( $key, $result, 'my_plugin', 3600 );

    return $result;
}

// Group operations
wp_cache_set( 'item_1', $data1, 'my_plugin' );
wp_cache_set( 'item_2', $data2, 'my_plugin' );

// Delete group on change
wp_cache_delete( 'item_1', 'my_plugin' );
```

### Query Cache

```php
// WordPress caches most queries automatically
// For custom queries, use transients or object cache

// Bust cache on specific hooks
add_action( 'my_plugin_data_updated', function() {
    // Clear related caches
    delete_transient( 'my_data_summary' );
    wp_cache_delete( 'my_data', 'my_plugin' );
    clean_post_cache( $post_id );
} );
```

## Batch Operations

### Processing Large Datasets

```php
// Process in batches to avoid memory issues
function process_all_posts() {
    $offset = 0;
    $limit  = 100;

    do {
        global $wpdb;

        $posts = $wpdb->get_results( $wpdb->prepare(
            "SELECT ID FROM {$wpdb->posts}
             WHERE post_type = %s
             LIMIT %d OFFSET %d",
            'post',
            $limit,
            $offset
        ) );

        if ( empty( $posts ) ) {
            break;
        }

        foreach ( $posts as $post ) {
            process_post( $post->ID );
        }

        $offset += $limit;

        // Prevent memory buildup
        wp_cache_flush();

    } while ( count( $posts ) === $limit );
}
```

### Bulk Inserts

```php
// Efficient bulk insert
function bulk_insert_data( array $items ) {
    global $wpdb;

    if ( empty( $items ) ) {
        return;
    }

    $table        = $wpdb->prefix . 'my_data';
    $placeholders = array();
    $values       = array();

    foreach ( $items as $item ) {
        $placeholders[] = '(%d, %s, %s)';
        $values[]       = $item['user_id'];
        $values[]       = $item['type'];
        $values[]       = $item['data'];
    }

    $sql = "INSERT INTO $table (user_id, item_type, item_data) VALUES ";
    $sql .= implode( ', ', $placeholders );

    $wpdb->query( $wpdb->prepare( $sql, $values ) );
}
```

### Bulk Updates

```php
// Efficient bulk update with CASE
function bulk_update_status( array $updates ) {
    global $wpdb;

    if ( empty( $updates ) ) {
        return;
    }

    $cases  = array();
    $ids    = array();
    $values = array();

    foreach ( $updates as $id => $status ) {
        $cases[] = "WHEN %d THEN %s";
        $values[] = $id;
        $values[] = $status;
        $ids[]    = $id;
    }

    $case_sql = implode( ' ', $cases );
    $ids_sql  = implode( ',', array_fill( 0, count( $ids ), '%d' ) );
    $values   = array_merge( $values, $ids );

    $sql = "UPDATE {$wpdb->prefix}my_data
            SET status = CASE id {$case_sql} END
            WHERE id IN ({$ids_sql})";

    $wpdb->query( $wpdb->prepare( $sql, $values ) );
}
```

## Maintenance

### Cleanup Old Data

```php
// Register cleanup cron
register_activation_hook( __FILE__, function() {
    if ( ! wp_next_scheduled( 'my_plugin_cleanup' ) ) {
        wp_schedule_event( time(), 'daily', 'my_plugin_cleanup' );
    }
} );

add_action( 'my_plugin_cleanup', function() {
    global $wpdb;

    // Delete old records
    $wpdb->query( $wpdb->prepare(
        "DELETE FROM {$wpdb->prefix}my_data
         WHERE created_at < %s",
        date( 'Y-m-d H:i:s', strtotime( '-30 days' ) )
    ) );

    // Clean expired transients
    delete_expired_transients();
} );
```
</knowledge>

<best_practices>
- Use prepare() for all queries with variables
- Set no_found_rows when pagination not needed
- Cache expensive query results
- Process large datasets in batches
- Add indexes for frequently queried columns
- Clean up old data regularly
</best_practices>

<commands>
```bash
# Profile queries with Query Monitor plugin
# Enable and check admin bar

# WP-CLI database operations
wp db query "SHOW TABLE STATUS LIKE 'wp_posts'"
wp db query "EXPLAIN SELECT * FROM wp_posts WHERE post_type='post'"

# Optimize tables
wp db optimize

# Check transients
wp transient list
wp transient delete --expired
```
</commands>
</skill>
