# WordPress Plugin Architecture

> **Type**: Skill
> **Domain**: WordPress Development
> **Source**: WordPress/agent-skills wp-plugin-development

<skill>
<summary>
Best practices for structuring WordPress plugins with proper bootstrap, hooks, and deferred loading.
</summary>

<knowledge>
## Plugin Bootstrap

**Single Entry Point:**
- Maintain a single bootstrap file (main plugin file with header)
- Contains plugin header comment with metadata
- Registers activation/deactivation hooks at top level
- Defers heavy operations to hooks

**Plugin Header Example:**
```php
<?php
/**
 * Plugin Name: My Plugin
 * Plugin URI: https://example.com/my-plugin
 * Description: Brief description of the plugin.
 * Version: 1.0.0
 * Requires at least: 6.5
 * Requires PHP: 8.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: my-plugin
 * Domain Path: /languages
 */
```

## Hook-Based Architecture

**Defer Heavy Operations:**
- Don't execute code at load time
- Use appropriate hooks for initialization
- `plugins_loaded` - After all plugins load
- `init` - After WordPress core loads
- `admin_init` - Admin-specific initialization

**Example Pattern:**
```php
// Register hooks at top level
register_activation_hook( __FILE__, 'my_plugin_activate' );
register_deactivation_hook( __FILE__, 'my_plugin_deactivate' );

// Defer initialization
add_action( 'plugins_loaded', 'my_plugin_init' );

function my_plugin_init() {
    // Heavy initialization here
}
```

## File Organization

**Recommended Structure:**
```
my-plugin/
├── my-plugin.php           # Bootstrap file
├── includes/               # PHP classes and functions
│   ├── class-main.php
│   ├── class-admin.php
│   └── class-frontend.php
├── src/                    # Block editor source
│   └── blocks/
├── build/                  # Compiled assets
├── assets/                 # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── languages/              # Translation files
├── templates/              # Template files
└── tests/                  # Test files
```

## Activation/Deactivation

**Activation Hook:**
- Create database tables if needed
- Set default options
- Flush rewrite rules (if registering CPTs)
- Check requirements

**Deactivation Hook:**
- Clear scheduled events
- Flush rewrite rules
- Optional: Clean up transients

**Uninstall Hook:**
- Remove database tables
- Delete options
- Clean up user meta
- Use uninstall.php for complex cleanup
</knowledge>

<best_practices>
- Keep bootstrap file minimal
- Separate concerns into classes
- Use autoloading for classes
- Defer expensive operations
- Never use `die()` or `exit()` inappropriately
- Always register top-level hooks before deferring
</best_practices>

<references>
- [WordPress/agent-skills wp-plugin-development](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-plugin-development)
- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
</references>
</skill>
