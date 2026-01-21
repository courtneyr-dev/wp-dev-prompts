# Platform Configurations

Configuration files for using wp-dev-prompts across different AI platforms.

## Quick Setup

| Platform | Copy This | To Your Project |
|----------|-----------|-----------------|
| Claude Code | `platforms/claude-code/CLAUDE.md` | Project root |
| Cursor | `platforms/cursor/.cursorrules` | Project root |
| Cline | `platforms/cline/.clinerules` | Project root |
| Copilot | `platforms/copilot/copilot-instructions.md` | `.github/` |
| n8n | `templates/n8n/*.json` | n8n workflows |

## Which Platform?

| Your Task | Use | Why |
|-----------|-----|-----|
| Full development | Claude Code | File access, commands, MCP |
| Quick edits | Cursor | Fast inline editing |
| Autonomous coding | Cline | Plan/Act modes |
| Code completion | Copilot | Inline suggestions |
| Planning | ChatGPT/Gemini | No setup needed |
| Task routing | n8n | Webhook automation |

## Platform Comparison

| Feature | Claude Code | Cursor | Cline | Copilot | ChatGPT | Gemini |
|---------|-------------|--------|-------|---------|---------|--------|
| File read/write | ✅ | ✅ | ✅ | Limited | ❌ | ❌ |
| Run commands | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Project context | ✅ | ✅ | ✅ | ✅ | Upload | Upload |
| Custom rules | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Directory Structure

```
platforms/
├── universal/          # Cross-platform specs
│   ├── prompt-specification.md
│   └── capability-matrix.md
├── claude-code/        # CLAUDE.md, MCP servers
├── cursor/             # .cursorrules, domain rules
├── cline/              # .clinerules
├── copilot/            # copilot-instructions.md
├── chatgpt/            # Custom GPT config
├── gemini/             # System instructions
└── n8n/                # Workflow automation
```

## Using with wp-dev-prompts

### IDE Platforms (Claude Code, Cursor, Cline)

Reference files directly:
```markdown
Follow the patterns from:
- skills/security/input-sanitization.md
- skills/testing/phpunit.md
```

### Web Platforms (ChatGPT, Gemini)

Copy content from `prompts/core/` or upload skill files as knowledge base.

## Customization

Add project-specific rules to your config file:

```markdown
## Project-Specific Rules
- Use TypeScript strict mode
- All components in src/components/
```
