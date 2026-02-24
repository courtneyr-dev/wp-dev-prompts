# MCP Servers for WordPress Development

> **Platform**: Claude Code
> **Type**: Model Context Protocol integrations

## Overview

MCP (Model Context Protocol) servers extend Claude Code's capabilities by providing access to external data sources and APIs. These are particularly useful for WordPress development.

## Recommended MCP Servers

### WordPress Trac MCP Server

**Repository**: [Jameswlepage/trac-mcp](https://github.com/Jameswlepage/trac-mcp)

Provides AI access to WordPress.org Trac data—the official WordPress bug tracker and development hub.

#### What It Does

- Search 60,000+ WordPress tickets by keyword, component, or status
- Retrieve full ticket details with comment threads
- Access changesets with complete diffs
- Monitor WordPress development activity timeline
- Get project metadata (components, milestones, priorities)

#### Setup

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "wordpress-trac": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp-server-wporg-trac-staging.a8cai.workers.dev/mcp"]
    }
  }
}
```

Or deploy your own instance:

```bash
git clone https://github.com/Jameswlepage/trac-mcp.git
cd trac-mcp
npm install
wrangler login
npm run deploy
```

#### Available Tools

| Tool | Description |
|------|-------------|
| `searchTickets` | Query tickets by keywords, components, status |
| `getTicket` | Get ticket details with optional comments |
| `getChangeset` | Access commit info with diffs |
| `getTimeline` | Recent development activity |
| `getTracInfo` | Project metadata |

#### Use Cases

**Before creating a new core ticket:**
```
Search Trac for existing tickets about [your issue].
```

**Debugging WordPress behavior:**
```
Find changesets related to wp_insert_post from the last 6 months.
```

**Understanding feature implementation:**
```
Get ticket #59166 with comments to see how they discussed REST API caching.
```

**Tracking development:**
```
Show me this week's WordPress development activity.
```

**Finding related code changes:**
```
Get changeset r58504 with the full diff.
```

#### ChatGPT Integration

For ChatGPT Deep Research, use endpoint:
```
https://mcp-server-wporg-trac-staging.a8cai.workers.dev/mcp/chatgpt
```

Connect via ChatGPT Settings > Connectors.

### WordPress DevDocs MCP Server

**Repository**: [pluginslab/wp-devdocs-mcp](https://github.com/pluginslab/wp-devdocs-mcp)

A local MCP server that indexes every action, filter, block registration, and JavaScript API call from WordPress core, WooCommerce, Gutenberg, or any plugin codebase. Gives your AI assistant a verified hook database instead of relying on training data.

#### What It Does

- Index PHP actions and filters (`do_action`, `apply_filters` calls)
- Index JavaScript hooks (`addAction`, `addFilter`, etc.)
- Track block registrations and variations
- Capture WordPress JS API usage (`wp.blocks.*`, `wp.blockEditor.*`, `wp.data.*`)
- Full-text search across all indexed hooks with file locations, docblocks, and parameters
- Validate hook names against actual source to prevent hallucination

#### Setup

```bash
git clone https://github.com/pluginslab/wp-devdocs-mcp.git
cd wp-devdocs-mcp
npm install
```

Add to your `.mcp.json` or `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "wp-devdocs": {
      "command": "npx",
      "args": ["--prefix", "/path/to/wp-devdocs-mcp", "wp-devdocs-mcp"]
    }
  }
}
```

#### Available Tools

| Tool | Description |
|------|-------------|
| `search_hooks` | Find hooks by name, type, or keyword across indexed sources |
| `validate_hook` | Confirm a hook exists in actual source code |
| `get_hook_context` | Get surrounding code, parameters, and docblock for a hook |
| `search_block_apis` | Search block registrations and JS API usage |

#### Use Cases

**Before using a hook in your plugin:**
```
Validate that the hook "wp_enqueue_scripts" exists and show me its parameters.
```

**Finding the right filter:**
```
Search for hooks related to "post title" filtering.
```

**Understanding block APIs:**
```
Search for block registrations related to "gallery" in Gutenberg.
```

**Indexing your own plugin:**
```
Index the hooks in /path/to/my-plugin so I can search them.
```

#### Requirements

- Node.js 20+
- ~500MB disk space per large indexed source

---

## Other Useful MCP Servers

### Database Access

For local WordPress development, consider MCP servers that provide:
- MySQL/MariaDB query access
- wp-config.php parsing
- Direct database inspection

### API Integrations

Consider MCP servers for:
- WordPress.org Plugin API
- GitHub Issues/PRs
- Slack notifications

## Creating Custom MCP Servers

For project-specific needs, you can create MCP servers using:
- [Cloudflare Workers MCP](https://developers.cloudflare.com/workers/)
- [MCP SDK](https://github.com/modelcontextprotocol/sdk)

## Related Resources

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Code MCP Documentation](https://docs.anthropic.com/claude-code/mcp)
- [trac-mcp GitHub](https://github.com/Jameswlepage/trac-mcp)
- [wp-devdocs-mcp GitHub](https://github.com/pluginslab/wp-devdocs-mcp)
