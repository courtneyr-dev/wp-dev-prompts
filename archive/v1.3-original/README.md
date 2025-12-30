# Archive: v1.3.0 Original

This directory contains a complete snapshot of wp-dev-prompts v1.3.0 before the v2.0.0 restructure.

**Archived**: December 30, 2024
**Reason**: Major restructure for cross-platform AI compatibility

## What Changed in v2.0.0

The v2.0.0 release restructured the repository for cross-platform AI compatibility:

- **prompts/** split into `core/` (portable) and `extended/` (full)
- **agents/** extracted from Digital Experience Integrity System
- **skills/** created with one skill per topic
- **platforms/** added with configs for each AI tool
- **workflows/** added with multi-step guides

## Using This Archive

If you need the original v1.3.0 structure:

1. These files are preserved exactly as they were
2. The main repo now uses the new structure
3. Symlinks in `prompts/legacy/` point to new locations for backward compatibility

## Original Structure

```
v1.3-original/
├── prompts/
│   ├── PROJECT-KICKSTART-PROMPT.md
│   ├── TESTING-AUTOMATION-PROMPTS.md
│   ├── BLOCK-DEVELOPMENT-PROMPTS.md
│   ├── COMMUNITY-FILES-PROMPTS.md
│   ├── PLUGIN-MARKETING-PROMPTS.md
│   └── site-review/
│       └── DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md
├── guides/
├── templates/
├── scripts/
├── github-workflows/
└── docs/
```
