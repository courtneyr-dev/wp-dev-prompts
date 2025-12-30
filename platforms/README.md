# Platform Configurations

Configuration files and guides for using wp-dev-prompts across different AI platforms.

## Supported Platforms

| Platform | Type | Configuration |
|----------|------|---------------|
| Claude Code | IDE/Terminal | CLAUDE.md, MCP servers |
| Cursor | IDE | .cursorrules, .cursor/rules/ |
| Cline | IDE Extension | .clinerules |
| GitHub Copilot | IDE Extension | copilot-instructions.md |
| ChatGPT | Web/API | Custom GPT configuration |
| Gemini | Web/API | System instructions |

## Quick Start

### Which Platform Should I Use?

| Your Task | Recommended | Why |
|-----------|-------------|-----|
| Full development workflow | Claude Code | File access, commands, MCP |
| Quick code edits | Cursor | Fast, inline editing |
| Autonomous coding | Cline | Plan/Act modes |
| Code completion | Copilot | Inline suggestions |
| Planning/brainstorming | ChatGPT or Gemini | No setup needed |
| Large code review | Gemini | Massive context window |

### Setup by Platform

#### Claude Code (Primary)
```bash
# Copy CLAUDE.md to your project root
cp platforms/claude-code/CLAUDE.md /path/to/your/project/

# Optionally configure MCP servers
# See platforms/claude-code/mcp-servers.md
```

#### Cursor
```bash
# Copy .cursorrules to your project root
cp platforms/cursor/.cursorrules /path/to/your/project/

# Optionally add domain-specific rules
cp -r platforms/cursor/rules /path/to/your/project/.cursor/
```

#### Cline
```bash
# Copy .clinerules to your project root
cp platforms/cline/.clinerules /path/to/your/project/
```

#### GitHub Copilot
```bash
# Copy to .github directory
mkdir -p /path/to/your/project/.github
cp platforms/copilot/copilot-instructions.md /path/to/your/project/.github/
```

#### ChatGPT
```
1. Create a new Custom GPT
2. Copy instructions from platforms/chatgpt/custom-gpt-config.md
3. Upload skill files as knowledge base
```

#### Gemini
```
1. Copy system instructions from platforms/gemini/system-instructions.md
2. Paste when starting conversation or use in API
```

## Directory Structure

```
platforms/
├── README.md                    # This file
│
├── universal/                   # Cross-platform specs
│   ├── prompt-specification.md  # Standard prompt format
│   └── capability-matrix.md     # Platform comparison
│
├── claude-code/                 # Claude Code configuration
│   ├── CLAUDE.md               # Project instructions
│   ├── settings.json           # .claude/ settings
│   └── mcp-servers.md          # MCP server recommendations
│
├── cursor/                      # Cursor configuration
│   ├── .cursorrules            # Root cursor rules
│   └── rules/                  # Domain-specific rules
│       ├── wordpress.mdc
│       ├── testing.mdc
│       ├── blocks.mdc
│       └── security.mdc
│
├── cline/                       # Cline configuration
│   ├── .clinerules             # Project rules
│   └── custom-modes.md         # Plan vs Act guidance
│
├── copilot/                     # GitHub Copilot
│   └── copilot-instructions.md # Custom instructions
│
├── chatgpt/                     # ChatGPT / Custom GPTs
│   ├── custom-gpt-config.md    # GPT configuration
│   └── knowledge-base.md       # What to upload
│
└── gemini/                      # Google Gemini
    ├── system-instructions.md  # System prompt
    └── context-placement.md    # Gemini-specific tips
```

## Platform Comparison

See [capability-matrix.md](universal/capability-matrix.md) for detailed comparison.

### Summary

| Feature | Claude Code | Cursor | Cline | Copilot | ChatGPT | Gemini |
|---------|-------------|--------|-------|---------|---------|--------|
| File read/write | ✅ | ✅ | ✅ | Limited | ❌ | ❌ |
| Run commands | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Project context | ✅ | ✅ | ✅ | ✅ | Upload | Upload |
| Custom rules | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Best for | Full workflow | Editing | Autonomous | Completion | Planning | Large context |

## Using with wp-dev-prompts

### IDE Platforms (Claude Code, Cursor, Cline)

These platforms can directly access the repository:

```markdown
# In your prompt or conversation:

Please follow the WordPress development patterns from:
- skills/security/input-sanitization.md
- skills/testing/phpunit.md

Use the testing setup prompt from:
- prompts/core/testing/phpunit-setup.md
```

### Web Platforms (ChatGPT, Gemini)

These platforms need content provided in the conversation:

1. **Copy portable prompts** from `prompts/core/`
2. **Paste skill content** when asking about specific topics
3. **Use Custom GPT** with skill files as knowledge base

## Customization

### Adding Project-Specific Rules

Each platform supports customization:

**Claude Code** - Add to CLAUDE.md:
```markdown
## Project-Specific Rules
- Use Tailwind CSS for styling
- All components go in src/components/
```

**Cursor** - Add to .cursorrules:
```markdown
## Project Rules
- Use TypeScript strict mode
- Prefer functional components
```

**Cline** - Add to .clinerules:
```markdown
## Custom Guidelines
- Run tests before committing
- Update changelog for all changes
```

### Combining with Existing Configs

If you already have platform configs:

```bash
# Append wp-dev-prompts rules to existing .cursorrules
cat platforms/cursor/.cursorrules >> /path/to/project/.cursorrules

# Or selectively copy sections you need
```

## Troubleshooting

### Rules Not Being Applied

1. **Check file location** - Must be in project root
2. **Check file name** - Exact spelling matters
3. **Restart the tool** - Some require reload
4. **Check syntax** - Malformed rules may be ignored

### Platform Not Following Instructions

1. **Be more explicit** - Add specific examples
2. **Reduce scope** - Smaller, focused instructions
3. **Check context limits** - May be truncating
4. **Test in isolation** - Rule out conflicts

### Conflicting Rules

If rules conflict:
1. Put more specific rules after general ones
2. Remove redundant/conflicting sections
3. Test incrementally

## Contributing

To add or improve platform configurations:

1. Test in the actual platform
2. Follow existing format patterns
3. Include WordPress-specific rules
4. Document any platform quirks
5. Submit PR with examples
