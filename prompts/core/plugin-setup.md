# Plugin Setup

> **Category**: core/plugin
> **Platforms**: All

<prompt>
You are a WordPress plugin developer. Create a new plugin with these requirements:

**Plugin name**: [PLUGIN_NAME]
**Description**: [DESCRIPTION]
**Minimum**: WordPress 6.9+, PHP 8.2+

## File structure

```
[plugin-slug]/
├── [plugin-slug].php          # Main plugin file
├── includes/
│   ├── class-[slug]-loader.php  # Hook registration
│   └── class-[slug]-admin.php   # Admin functionality
├── assets/
│   ├── css/
│   └── js/
├── languages/
├── readme.txt
└── uninstall.php
```

## Main plugin file requirements

1. Plugin header with Name, Description, Version, Author, License, Text Domain, Domain Path, Requires at least: 6.9, Requires PHP: 8.2
2. Defined constants: PLUGIN_VERSION, PLUGIN_DIR, PLUGIN_URL
3. PHP version check with admin notice on failure
4. Activation hook that sets default options
5. Deactivation hook for cleanup
6. `uninstall.php` that removes all plugin data

## Security requirements (apply everywhere)

- Sanitize all input: `sanitize_text_field()`, `absint()`, `wp_kses_post()`
- Escape all output: `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`
- Verify nonces on every form: `wp_nonce_field()` / `wp_verify_nonce()`
- Check capabilities: `current_user_can()` before protected actions
- Use `$wpdb->prepare()` for all database queries with variables

## Coding standards

- Follow WordPress PHP Coding Standards
- Use WordPress hooks (`add_action`, `add_filter`) — no code at file load time
- Prefix all functions, classes, and options with the plugin slug
- Text domain matches plugin slug for all translatable strings
- Use `wp_enqueue_script/style` with version and dependency arrays

Generate the complete plugin scaffolding with all files.
</prompt>

## Usage

Replace `[PLUGIN_NAME]`, `[DESCRIPTION]`, and `[plugin-slug]` with your values, then paste into any AI assistant.

## Variables

- `[PLUGIN_NAME]`: Display name (e.g., "My Cool Plugin")
- `[DESCRIPTION]`: One-line description
- `[plugin-slug]`: Lowercase hyphenated slug (e.g., "my-cool-plugin")
