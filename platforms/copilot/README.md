# GitHub Copilot Configuration

> **Platform**: GitHub Copilot
> **Capabilities**: Inline completion, chat, limited context window

## Overview

GitHub Copilot provides inline code completion and chat assistance. It has a smaller context window (~8K tokens) compared to other AI tools, so instructions should be concise and focused.

## Setup

### Repository Instructions

Create `.github/copilot-instructions.md`:

```bash
mkdir -p .github
cp platforms/copilot/copilot-instructions.template .github/copilot-instructions.md
```

Customize the placeholders in the file.

### Workspace Instructions

In VS Code, you can also add workspace-level instructions in `.vscode/settings.json`:

```json
{
    "github.copilot.chat.codeGeneration.instructions": [
        {
            "text": "Follow WordPress Coding Standards. Use tabs. Always sanitize input and escape output."
        }
    ]
}
```

## Best Practices

### Write Descriptive Comments

Copilot learns from comments. Write what you want before the code:

```php
/**
 * Handle form submission with nonce verification and capability check.
 * Sanitizes all input and updates the plugin option.
 *
 * @return void
 */
function my_prefix_handle_form() {
    // Copilot will suggest secure code based on comment
}
```

### Use Function Signatures

Define signatures before implementation:

```php
/**
 * @param string $email User email to validate.
 * @return bool True if email is valid and not already registered.
 */
function my_prefix_validate_email( string $email ): bool {
    // Copilot will suggest implementation
}
```

### Keep Tasks Small

Copilot works best for:
- Single function implementations
- Small, focused changes
- Boilerplate code
- Pattern repetition

For complex multi-file changes, use Claude Code or Cursor.

## Inline Completion Tips

### Trigger with Comments

```php
// Create a nonce field for the settings form
// ← Copilot suggests: wp_nonce_field( 'my_settings', 'my_nonce' );
```

### Accept Partial Suggestions

Use Tab to accept, or Ctrl+→ to accept word-by-word.

### Cycle Through Options

Press Alt+] to see next suggestion, Alt+[ for previous.

## Chat Mode

### @workspace

For codebase questions:

```
@workspace How does this plugin register its blocks?
```

### Slash Commands

- `/explain` - Explain selected code
- `/fix` - Fix issues in selected code
- `/tests` - Generate tests for selected code

## Limitations

### Context Window

Copilot sees approximately 8K tokens. For large files:
- Focus on the current function
- Add relevant context in comments
- Use explicit type hints

### Complex Logic

For security-critical code, always review Copilot suggestions:
- Verify sanitization is correct
- Check escaping context matches output
- Confirm nonce/capability patterns

## Integration with wp-dev-prompts

### Include Key Patterns

In `.github/copilot-instructions.md`, include the most critical patterns from skills:

```markdown
## Security Patterns

[Paste key patterns from skills/wordpress-security/]
```

### Keep It Concise

Due to token limits, include only essential rules:
- Security patterns (required)
- Naming conventions (helpful)
- Common hooks (reference)

## Related Resources

- **Templates**: platforms/copilot/copilot-instructions.template
- **Skills**: skills/ (for content to include)
- **Capability Matrix**: platforms/universal/capability-matrix.md
