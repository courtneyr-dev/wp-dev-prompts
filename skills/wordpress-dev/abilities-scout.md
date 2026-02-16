# Abilities Scout

> **Source**: [laxmariappan/abilities-scout](https://github.com/laxmariappan/abilities-scout)
> **License**: GPL v2 or later
> **Last reviewed**: 2026-02-16

## Summary

WordPress plugin that performs static analysis on installed plugins to discover hooks, REST routes, and shortcodes that could become AI-callable abilities via the Abilities API (WP 6.9+). Uses `token_get_all()` for safe tokenization -- no plugin code is executed during scanning.

## Key Patterns

### Static Analysis Scanner

The scanner tokenizes PHP files with `token_get_all()` and looks for specific function calls:

- `add_action()` / `add_filter()` -- hook registration
- `register_rest_route()` -- REST API endpoints
- `add_shortcode()` -- shortcode registration

It walks directories recursively (capped at 500 files, 2MB per file), skipping symlinks, `vendor/`, `node_modules/`, and test directories.

### Point-Based Scoring

Discovered items are scored to determine confidence and ability type:

| Signal | Points |
|--------|--------|
| REST route (base) | +50 |
| Plugin-namespaced REST namespace | +15 |
| REST route without regex params | +5 |
| Shortcode (base) | +30 |
| Plugin-namespaced shortcode tag | +15 |
| Action verb match (tool) | +20 |
| Plugin-namespaced hook | +15 |
| Hook with 2+ parameters | +10 |
| Hook with 1+ parameters | +5 |
| Static hook name | +5 |
| Dynamic hook name | -10 |
| Infrastructure suffix match | -30 |

**Confidence thresholds**: High (60+), Medium (30-59), Low (1-29)

### Verb Classification

Hooks are classified as `tool` or `resource` abilities based on verb matching:

**Tool verbs** (action-indicating):
```
submit, send, create, delete, update, process, add, remove, save, run,
export, import, activate, deactivate, clear, flush, purge, publish,
unpublish, approve, reject, reset, schedule, unschedule, pause, resume,
trigger, register, unregister, enable, disable, toggle, insert, set,
put, post, patch, write
```

**Resource verbs** (data-return-indicating):
```
get, list, check, query, count, search, fetch, read, load, retrieve,
find, lookup, verify, validate, is, has, can
```

Fallback: actions default to `tool`, filters default to `resource`.

### Infrastructure Filtering

UI and plumbing hooks are penalized with -30 points using suffix matching:

```
_nonce, _sanitize, _enqueue, _css, _js, _style, _script, _column,
_row, _menu, _submenu, _notice, _message, _class, _attr, _template,
_widget, _metabox, _meta_box, _capability, _screen, _tab, _section,
_field, _option_page, _display, _render, _output, _html, _markup,
_view, _form, _input, _label, _title, _heading, _header, _footer,
_sidebar, _nav, _breadcrumb, _link, _url, _path, _icon, _image
```

### Core Hooks Blocklist

WordPress lifecycle hooks are filtered out entirely: `init`, `admin_init`, `plugins_loaded`, `wp_head`, `wp_footer`, `wp_enqueue_scripts`, `admin_menu`, `save_post`, `delete_post`, `rest_api_init`, `wp_ajax_*`, and ~30 more.

### Ability Name Sanitization

Discovered abilities are normalized to the pattern `/^[a-z0-9-]+\/[a-z0-9-]+$/`:

```php
// Input:  "MyPlugin_do_something" action hook
// Output: "myplugin/do-something" ability name
```

### Abilities API Registration

The plugin itself registers three abilities with `wp_register_ability()`:

```php
// Register category
wp_register_ability_category( 'abilities-scout', [
    'label'       => __( 'Abilities Scout', 'abilities-scout' ),
    'description' => __( 'Plugin scanning tools', 'abilities-scout' ),
] );

// Register scan ability
wp_register_ability( 'abilities-scout/scan', [
    'label'       => __( 'Scan Plugin', 'abilities-scout' ),
    'description' => __( 'Scans a plugin for potential abilities', 'abilities-scout' ),
    'category'    => 'abilities-scout',
    'callback'    => [ $this, 'handle_scan' ],
    'input_schema' => [
        'type'       => 'object',
        'properties' => [
            'plugin'     => [ 'type' => 'string', 'description' => 'Plugin file path' ],
            'confidence' => [ 'type' => 'string', 'enum' => ['high','medium','low'] ],
        ],
        'required' => [ 'plugin' ],
    ],
    'output_schema' => [
        'type'       => 'object',
        'properties' => [
            'plugin_info'         => [ 'type' => 'object' ],
            'potential_abilities' => [ 'type' => 'array' ],
            'stats'               => [ 'type' => 'object' ],
        ],
    ],
    'permission_callback' => [ $this, 'check_permissions' ],
    'meta' => [
        'show_in_rest' => true,
        'mcp' => [ 'public' => true, 'type' => 'tool' ],
    ],
] );
```

The `export` ability generates Markdown or JSON reports. The `draft` ability generates `wp_register_ability()` PHP code stubs for discovered abilities.

### Plugin Architecture

```
abilities-scout/
├── abilities-scout.php           # Singleton entry, constants, dependency loader
├── includes/
│   ├── class-scanner.php         # Static analysis engine (token_get_all)
│   ├── class-mcp-tools.php       # Abilities API registration (3 abilities)
│   ├── class-export-generator.php # Markdown/JSON report generation
│   ├── class-draft-generator.php  # PHP code stub generation
│   └── class-admin-page.php      # Admin UI (Abilities > Scout)
```

- **Singleton pattern** via `private static ?Abilities_Scout $instance` and `get_instance()`
- MCP tools only load when `function_exists( 'wp_register_ability' )` returns true
- Admin page loads conditionally via `is_admin()` check
- Requires WordPress 6.0+, PHP 8.0+

## When to Reference This Skill

Use this as a reference when:

- Building plugins that use `token_get_all()` for static PHP analysis
- Implementing the Abilities API (`wp_register_ability()`, `wp_register_ability_category()`)
- Designing scoring or classification systems for WordPress hooks
- Creating tools that export ability definitions for AI coding assistants
- Working with the MCP (Model Context Protocol) integration in WordPress
- Scanning plugins to find hooks, REST routes, or shortcodes programmatically

## References

- [laxmariappan/abilities-scout](https://github.com/laxmariappan/abilities-scout) -- source repository
- [WordPress Abilities API](https://make.wordpress.org/core/) -- core proposal
- [WordPress MCP Integration](https://make.wordpress.org/core/) -- Model Context Protocol for WordPress
