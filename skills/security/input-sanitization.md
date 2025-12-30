# Input Sanitization

> **Type**: Skill
> **Domain**: Security
> **Source**: Automattic/agent-skills security reference

<skill>
<summary>
WordPress functions for sanitizing user input before processing or storing.
</summary>

<knowledge>
## Core Principle

**Sanitize input early, escape output late.**

Always sanitize data when it enters your system, before processing or storing.

## Sanitization Functions

**Text Input:**
```php
// Simple text field
$value = sanitize_text_field( $_POST['field'] );

// Multiline text (preserves newlines)
$value = sanitize_textarea_field( $_POST['field'] );

// Title-like text
$value = sanitize_title( $_POST['field'] );
```

**Specific Types:**
```php
// Email addresses
$email = sanitize_email( $_POST['email'] );

// URLs
$url = sanitize_url( $_POST['url'] );

// Filenames
$filename = sanitize_file_name( $_POST['filename'] );

// CSS class names
$class = sanitize_html_class( $_POST['class'] );

// Slugs (lowercase, dashes)
$slug = sanitize_key( $_POST['slug'] );
```

**Numeric Input:**
```php
// Positive integers only
$id = absint( $_POST['id'] );

// Integers (can be negative)
$num = intval( $_POST['num'] );

// Floats
$price = floatval( $_POST['price'] );
```

**HTML Content:**
```php
// Post content (allowed HTML)
$content = wp_kses_post( $_POST['content'] );

// Custom allowed HTML
$allowed_html = array(
    'a' => array(
        'href' => array(),
        'title' => array(),
    ),
    'strong' => array(),
    'em' => array(),
);
$content = wp_kses( $_POST['content'], $allowed_html );

// Strip all HTML
$content = wp_strip_all_tags( $_POST['content'] );
```

## Superglobal Access

**Access Specific Keys Only:**
```php
// WRONG: Processing entire array
foreach ( $_POST as $key => $value ) { ... }

// RIGHT: Access specific keys
$name = isset( $_POST['name'] ) ? sanitize_text_field( $_POST['name'] ) : '';
$email = isset( $_POST['email'] ) ? sanitize_email( $_POST['email'] ) : '';
```

**Handle wp_unslash:**
```php
// WordPress adds slashes to superglobals
$value = sanitize_text_field( wp_unslash( $_POST['field'] ) );
```

## Validation vs Sanitization

**Validation:** Check if data meets criteria
```php
if ( ! is_email( $email ) ) {
    return new WP_Error( 'invalid_email', 'Please enter a valid email.' );
}
```

**Sanitization:** Clean/transform data
```php
$email = sanitize_email( $email );
```

**Use both:**
```php
$email = sanitize_email( wp_unslash( $_POST['email'] ) );
if ( ! is_email( $email ) ) {
    return new WP_Error( 'invalid_email', 'Invalid email address.' );
}
```
</knowledge>

<best_practices>
- Apply wp_unslash() before sanitization when needed
- Use most restrictive sanitization that works
- Avoid processing entire superglobal arrays
- Access only specific keys you need
- Validate after sanitizing
</best_practices>

<references>
- [Automattic/agent-skills security reference](https://github.com/Automattic/agent-skills)
- [Data Validation](https://developer.wordpress.org/plugins/security/data-validation/)
</references>
</skill>
