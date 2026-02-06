# Cursor Configuration

> **Platform**: Cursor (VS Code fork)
> **Capabilities**: File access, command execution, codebase awareness

## Overview

Cursor is an AI-powered IDE with full codebase awareness. It can read and edit files directly, execute terminal commands, and understand your entire project context.

## Setup

### .cursorrules

Copy the template to your project root:

```bash
cp platforms/cursor/cursorrules.template /path/to/your-project/.cursorrules
```

Customize the placeholders:
- `[PROJECT_NAME]` - Your project name
- `[plugin/theme]` - Project type
- `[project-slug]` - URL-friendly slug
- `[text-domain]` - i18n text domain
- `[prefix_]` - Function/constant prefix

### Directory Rules

For domain-specific rules, create files in `.cursor/rules/`:

```
.cursor/
└── rules/
    ├── blocks.md       # Block development rules
    ├── security.md     # Security requirements
    └── testing.md      # Testing standards
```

## Best Practices

### Use @workspace

For codebase-wide questions:

```
@workspace How do I register a new post type in this plugin?
```

### Composer Mode

Use Composer for multi-file changes:

```
Create a settings page with proper security (nonces, capability checks, sanitization)
```

### Reference Skills

Include skill content in your rules:

```markdown
# Security Rules

Follow the patterns in wp-dev-prompts skills/wordpress-security/

[Paste relevant skill content]
```

## Integration with wp-dev-prompts

### Option 1: Reference Externally

In your `.cursorrules`:

```markdown
For security patterns, reference:
https://github.com/courtneyr-dev/wp-dev-prompts/tree/main/skills/security

For WordPress best practices, reference:
https://github.com/courtneyr-dev/wp-dev-prompts/tree/main/skills/wordpress
```

### Option 2: Include Inline

Copy relevant skill content directly into your `.cursorrules` or `.cursor/rules/` files.

### Option 3: Git Submodule

Add wp-dev-prompts as a submodule:

```bash
git submodule add https://github.com/courtneyr-dev/wp-dev-prompts.git .wp-dev-prompts
```

Then reference in rules:
```markdown
See .wp-dev-prompts/skills/ for detailed guidelines.
```

## Tips

### Keep Rules Focused

Don't overload `.cursorrules` with everything. Use `.cursor/rules/` for domain-specific rules.

### Use Code Patterns

Include actual code examples in rules - Cursor learns from patterns:

```php
// Always use this pattern for AJAX handlers
add_action( 'wp_ajax_my_action', function() {
    check_ajax_referer( 'my_nonce', 'nonce' );
    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_send_json_error( 'Unauthorized' );
    }
    // Process...
} );
```

### Leverage Tab Completion

Cursor's tab completion is context-aware. Well-defined rules improve suggestions.

## Troubleshooting

### Rules Not Applied

1. Ensure `.cursorrules` is in project root
2. Check for syntax errors in the file
3. Restart Cursor after changes

### Context Overload

If responses are slow or unfocused:
- Reduce `.cursorrules` size
- Move specific rules to `.cursor/rules/`
- Be more specific in prompts

## Related Resources

- **Templates**: platforms/cursor/cursorrules.template
- **Skills**: skills/ for content to include in rules
- **Capability Matrix**: platforms/universal/capability-matrix.md
