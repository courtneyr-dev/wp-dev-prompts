# Claude Code Configuration

> **Platform**: Claude Code (CLI)
> **Capabilities**: Full file access, command execution, web search

## Overview

Claude Code is the primary platform for this framework. It has full file system access, can execute commands, and search the web for documentation.

## Setup

### CLAUDE.md

Copy the template to your project root:

```bash
cp platforms/claude-code/CLAUDE.md.template /path/to/your-project/CLAUDE.md
```

Customize the placeholders:
- `[PROJECT_NAME]` - Your project name
- `[plugin/theme/block-theme]` - Project type
- `[project-slug]` - URL-friendly slug
- `[text-domain]` - i18n text domain
- `[prefix_]` - Function/constant prefix

### Using Skills

Reference skills directly in conversations:

```
Read skills/wordpress-security/input-sanitization.md and apply those patterns to this form handler.
```

Or ask Claude Code to use them:

```
Following the WordPress security best practices, review this code for vulnerabilities.
```

### Using Agents

Invoke agent prompts for complex reviews:

```
Use the site-review-orchestrator to assess this WordPress site.
```

### Using Prompts

For complex tasks, reference extended prompts:

```
Follow the PROJECT-KICKSTART-PROMPT workflow to set up this new plugin.
```

## Best Practices

### Start with Skills

Before diving into implementation, point Claude Code at relevant skills:

```
Before we implement this feature, read:
- skills/wordpress-dev/plugin-architecture.md
- skills/wordpress-security/nonces-capabilities.md
```

### Use the Task System

For multi-step work:

```
Let's set up testing infrastructure following the TESTING-AUTOMATION-PROMPTS workflow.
```

### Leverage Web Search

Claude Code can search for current documentation:

```
Search for the latest WordPress 6.9 block deprecation patterns.
```

## Integration Points

### MCP Servers

Claude Code supports MCP (Model Context Protocol) servers for extended capabilities.

#### WordPress Trac MCP Server

**Highly recommended**: Two MCP servers cover WordPress development from different angles.

**[trac-mcp](https://github.com/Jameswlepage/trac-mcp)** — AI access to WordPress.org Trac data: 60,000+ tickets, changesets with diffs, and development activity.

**[wp-devdocs-mcp](https://github.com/pluginslab/wp-devdocs-mcp)** — Local hook/filter/block database indexed from actual source code. Prevents AI hallucination of hook names.

**Setup** (add to `claude_desktop_config.json` or `.mcp.json`):

```json
{
  "mcpServers": {
    "wordpress-trac": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp-server-wporg-trac-staging.a8cai.workers.dev/mcp"]
    },
    "wp-devdocs": {
      "command": "npx",
      "args": ["--prefix", "/path/to/wp-devdocs-mcp", "wp-devdocs-mcp"]
    }
  }
}
```

See [MCP Servers](mcp-servers.md) for full documentation, tools, and use cases.

### Git Operations

Claude Code can manage Git operations directly:

```
Commit these changes with a conventional commit message.
```

## Troubleshooting

### Skills Not Found

Ensure you're in the wp-dev-prompts directory or have proper paths:

```
Read /path/to/wp-dev-prompts/skills/wordpress-dev/plugin-architecture.md
```

### Permission Issues

Claude Code will ask before:
- Creating or modifying files
- Running shell commands
- Making significant changes

If blocked, check your permission settings.

## Related Resources

- **Prompts**: prompts/extended/ for full workflows
- **Skills**: skills/ for focused knowledge
- **Agents**: agents/ for specialized assessments
