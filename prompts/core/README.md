# Core Prompts

Portable, self-contained prompts under 2000 tokens for cross-platform compatibility.

## Status

**Coming in v2.1** - Core prompts are planned but not yet implemented.

## Planned Structure

```
core/
├── blocks/           # Block development prompts
├── documentation/    # Documentation generation
├── marketing/        # Marketing content prompts
├── security/         # Security-focused prompts
└── testing/          # Testing setup prompts
```

## Design Goals

Core prompts will be:
- **Under 2000 tokens** - Works on all platforms
- **Self-contained** - No external file references
- **Single task focus** - One specific action per prompt
- **Platform agnostic** - Works with ChatGPT, Gemini, Claude, etc.

## Current Alternative

Use extended prompts from `prompts/extended/` with Claude Code, Cursor, or Cline.

## Related Resources

- **Extended Prompts**: [../extended/](../extended/) - Full-featured prompts
- **Prompt Guide**: [../README.md](../README.md) - Prompt structure guide
