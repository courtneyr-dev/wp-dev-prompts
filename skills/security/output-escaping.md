# Output Escaping

> **Type**: Skill
> **Domain**: Security
> **Source**: Automattic/agent-skills security reference

<skill>
<summary>
WordPress functions for escaping output based on context to prevent XSS vulnerabilities.
</summary>

<knowledge>
## Core Principle

**Escape late, escape according to context.**

Escape data at the moment of output, using the function that matches the output context.

## Context-Specific Escaping

**HTML Context:**
```php
// Inside HTML elements
echo '<p>' . esc_html( $user_input ) . '</p>';

// Translate and escape
echo '<p>' . esc_html__( 'Welcome', 'text-domain' ) . '</p>';

// Echo version
esc_html_e( 'Welcome', 'text-domain' );
```

**HTML Attributes:**
```php
// Inside attribute values
echo '<input type="text" value="' . esc_attr( $value ) . '">';

// Translate and escape
echo '<input placeholder="' . esc_attr__( 'Enter name', 'text-domain' ) . '">';
```

**URLs:**
```php
// In href, src, action attributes
echo '<a href="' . esc_url( $url ) . '">Link</a>';
echo '<img src="' . esc_url( $image_url ) . '">';
echo '<form action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
```

**JavaScript:**
```php
// Inside JavaScript strings
echo '<script>var name = "' . esc_js( $name ) . '";</script>';

// Better: Use wp_add_inline_script or wp_localize_script
```

**JSON in HTML Attributes:**
```php
// For data attributes with JSON
echo '<div data-config="' . esc_attr( wp_json_encode( $config ) ) . '">';
```

**Allowed HTML:**
```php
// When you need to output HTML but want to limit allowed tags
echo wp_kses_post( $content ); // Allows post-like HTML

// Custom allowed tags
$allowed = array(
    'a' => array( 'href' => array(), 'class' => array() ),
    'strong' => array(),
);
echo wp_kses( $content, $allowed );
```

## Escaping in Templates

**Right:**
```php
<h1><?php echo esc_html( $title ); ?></h1>
<a href="<?php echo esc_url( $link ); ?>">
    <?php echo esc_html( $link_text ); ?>
</a>
<input value="<?php echo esc_attr( $value ); ?>">
```

**Wrong:**
```php
<h1><?php echo $title; ?></h1>
<a href="<?php echo $link; ?>">
    <?php echo $link_text; ?>
</a>
```

## Common Patterns

**Echoing with translation:**
```php
// Escaped and translated
esc_html_e( 'Hello', 'text-domain' );

// With placeholder
printf(
    /* translators: %s: user name */
    esc_html__( 'Hello, %s!', 'text-domain' ),
    esc_html( $username )
);
```

**URLs with query args:**
```php
$url = add_query_arg( array(
    'action' => 'my_action',
    'id'     => $id,
), admin_url( 'admin.php' ) );

echo '<a href="' . esc_url( $url ) . '">Link</a>';
```
</knowledge>

<best_practices>
- Always escape at point of output
- Match escaping function to context (HTML, attribute, URL, JS)
- Never trust data, even from database
- Use translation escaping functions for i18n strings
- Prefer wp_kses_post() over allowing raw HTML
</best_practices>

<references>
- [Automattic/agent-skills security reference](https://github.com/Automattic/agent-skills)
- [Securing Output](https://developer.wordpress.org/plugins/security/securing-output/)
</references>
</skill>
