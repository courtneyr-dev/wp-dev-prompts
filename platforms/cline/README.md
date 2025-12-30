# Cline Configuration

> **Platform**: Cline (VS Code Extension)
> **Capabilities**: File access, command execution, Plan/Act modes

## Overview

Cline is a VS Code extension that provides AI-powered development assistance with a unique Plan/Act mode separation. It can read and edit files, execute commands, and work autonomously within defined boundaries.

## Setup

### .clinerules

Copy the template to your project root:

```bash
cp platforms/cline/clinerules.template /path/to/your-project/.clinerules
```

Customize the placeholders:
- `[PROJECT_NAME]` - Your project name
- `[plugin/theme]` - Project type
- `[project-slug]` - URL-friendly slug
- `[text-domain]` - i18n text domain
- `[prefix_]` - Function/constant prefix

## Plan vs Act Mode

### Plan Mode

Use for:
- New feature design
- Architecture decisions
- Complex multi-file changes
- When you need to think before acting

In Plan mode, Cline will:
- Analyze the task
- Propose an approach
- Outline the steps
- Wait for approval before implementation

### Act Mode

Use for:
- Clear, well-defined tasks
- Implementing approved plans
- Small, focused changes
- Bug fixes with known solutions

In Act mode, Cline will:
- Execute changes directly
- Create/modify files
- Run commands
- Still ask permission for significant actions

## Best Practices

### Start in Plan Mode

For new features:

```
[Plan Mode]
I need to add a settings page for this plugin with options for:
- API key field
- Enable/disable toggle
- Cache duration setting

Plan the implementation first.
```

### Use Clear Boundaries

Be explicit about scope:

```
[Act Mode]
Add nonce verification to the form in includes/class-admin.php.
Only modify that file, don't change anything else.
```

### Reference wp-dev-prompts

Include skill content in your rules:

```markdown
For security patterns, follow:
[Paste content from skills/security/nonces-capabilities.md]
```

## Integration with wp-dev-prompts

### Option 1: Include Inline

Copy relevant skill content directly into `.clinerules`.

### Option 2: Reference Path

If wp-dev-prompts is in your project:

```markdown
See ./wp-dev-prompts/skills/ for detailed guidelines.
```

### Option 3: Link to GitHub

```markdown
For detailed patterns:
https://github.com/courtneyr-dev/wp-dev-prompts/tree/main/skills
```

## Permission Model

Cline asks permission before:
- Creating new files
- Modifying existing files
- Running shell commands
- Making significant changes

Configure permission level in Cline settings to balance autonomy and control.

## Tips

### Keep Rules Focused

`.clinerules` should be concise. For detailed guidelines, reference external files or include only the most critical rules.

### Use Task Context

Cline works best with clear task context:

```
In this WordPress plugin, I need to:
1. Add a REST API endpoint
2. Handle authentication
3. Return user data

The endpoint should be at /wp-json/[prefix]/v1/user
```

### Leverage Autonomy

For well-defined tasks, let Cline work autonomously:

```
[Act Mode, Autonomous]
Fix all PHPCS errors in the includes/ directory.
```

## Troubleshooting

### Rules Not Applied

1. Ensure `.clinerules` is in project root
2. Restart Cline after adding/changing rules
3. Check for syntax errors

### Too Many Permission Prompts

- Adjust permission settings in Cline
- Use more specific task descriptions
- Consider autonomous mode for trusted tasks

### Context Limits

If responses seem incomplete:
- Break large tasks into smaller pieces
- Use Plan mode to outline before implementing
- Be more specific about scope

## Related Resources

- **Templates**: platforms/cline/clinerules.template
- **Skills**: skills/ for content to include
- **Capability Matrix**: platforms/universal/capability-matrix.md
