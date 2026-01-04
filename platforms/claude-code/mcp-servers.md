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
