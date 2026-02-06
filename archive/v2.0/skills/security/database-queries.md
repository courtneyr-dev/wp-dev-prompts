# Secure Database Queries

> **Type**: Skill
> **Domain**: Security
> **Source**: WordPress/agent-skills wp-plugin-development

<skill>
<summary>
How to write secure database queries in WordPress using $wpdb->prepare().
</summary>

<knowledge>
## Core Principle

**Never concatenate user input into SQL queries.**

Always use `$wpdb->prepare()` with parameterized queries.

## Using $wpdb->prepare()

**Basic Pattern:**
```php
global $wpdb;

// WRONG: SQL Injection vulnerability
$results = $wpdb->get_results(
    "SELECT * FROM {$wpdb->posts} WHERE post_author = " . $user_id
);

// RIGHT: Prepared statement
$results = $wpdb->get_results(
    $wpdb->prepare(
        "SELECT * FROM {$wpdb->posts} WHERE post_author = %d",
        $user_id
    )
);
```

## Placeholders

**Available Placeholders:**
- `%d` - Integer
- `%f` - Float
- `%s` - String

**Examples:**
```php
// Integer
$wpdb->prepare( "WHERE ID = %d", $id );

// String
$wpdb->prepare( "WHERE post_title = %s", $title );

// Multiple
$wpdb->prepare(
    "WHERE post_author = %d AND post_type = %s",
    $author_id,
    $post_type
);

// Float
$wpdb->prepare( "WHERE price = %f", $price );
```

## Common Query Types

**Get Single Value:**
```php
$count = $wpdb->get_var( $wpdb->prepare(
    "SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_author = %d",
    $user_id
) );
```

**Get Single Row:**
```php
$post = $wpdb->get_row( $wpdb->prepare(
    "SELECT * FROM {$wpdb->posts} WHERE ID = %d",
    $post_id
) );
```

**Get Multiple Rows:**
```php
$posts = $wpdb->get_results( $wpdb->prepare(
    "SELECT * FROM {$wpdb->posts} WHERE post_author = %d AND post_status = %s",
    $user_id,
    'publish'
) );
```

**Insert:**
```php
$wpdb->insert(
    $wpdb->prefix . 'custom_table',
    array(
        'user_id' => $user_id,
        'value'   => $value,
    ),
    array( '%d', '%s' )
);
```

**Update:**
```php
$wpdb->update(
    $wpdb->prefix . 'custom_table',
    array( 'value' => $new_value ),    // data
    array( 'id' => $id ),              // where
    array( '%s' ),                      // data format
    array( '%d' )                       // where format
);
```

**Delete:**
```php
$wpdb->delete(
    $wpdb->prefix . 'custom_table',
    array( 'id' => $id ),
    array( '%d' )
);
```

## LIKE Queries

**Proper LIKE Escaping:**
```php
// WRONG: Allows SQL wildcards in input
$wpdb->prepare( "WHERE title LIKE %s", '%' . $search . '%' );

// RIGHT: Escape special characters first
$search_escaped = $wpdb->esc_like( $search );
$wpdb->prepare(
    "WHERE title LIKE %s",
    '%' . $search_escaped . '%'
);
```

## IN Clauses

**Array Parameters:**
```php
$ids = array( 1, 2, 3, 4, 5 );

// Create placeholders
$placeholders = implode( ', ', array_fill( 0, count( $ids ), '%d' ) );

$results = $wpdb->get_results( $wpdb->prepare(
    "SELECT * FROM {$wpdb->posts} WHERE ID IN ($placeholders)",
    $ids
) );
```

## Table Names

**Always use table prefix:**
```php
// Core tables
$wpdb->posts
$wpdb->postmeta
$wpdb->users
$wpdb->usermeta
$wpdb->options

// Custom tables
$table = $wpdb->prefix . 'my_custom_table';
```
</knowledge>

<best_practices>
- Always use $wpdb->prepare() for queries with user input
- Use appropriate placeholder types (%d, %s, %f)
- Use $wpdb->esc_like() before LIKE wildcards
- Use $wpdb->prefix for table names
- Prefer WordPress API functions when available (get_posts, etc.)
</best_practices>

<references>
- [WordPress/agent-skills wp-plugin-development](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-plugin-development)
- [Class Reference/wpdb](https://developer.wordpress.org/reference/classes/wpdb/)
</references>
</skill>
