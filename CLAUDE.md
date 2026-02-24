# CLAUDE.md - wp-dev-prompts

This file contains project-specific guidance for Claude Code when working on this repository.

## Project Overview

wp-dev-prompts is a collection of AI prompts, skills, agents, templates, and workflows for WordPress plugin development. It's designed to be platform-agnostic, working with Claude Code, Cursor, Cline, ChatGPT, Gemini, and others.

## Repository Structure

```
wp-dev-prompts/
├── prompts/           # AI prompts organized by category
├── agents/            # Agent compositions and specialists
├── skills/            # Reusable knowledge modules
├── templates/         # Project templates and checklists
├── workflows/         # Multi-step automation workflows
├── platforms/         # Platform-specific configurations
├── docs/              # Documentation and guides
├── tests/             # Test files and audit tools
└── .claude/           # Claude Code configuration
```

## Writing Guidelines

### For All Content

When creating or editing any documentation, prompts, or templates:

1. **Load style guides first** (in priority order):
   - `skills/prompt-engineering/references/anti-patterns.md` — highest priority
   - `skills/prompt-engineering/references/wordpress-docs-style-guide.md`
   - `skills/prompt-engineering/references/style-guide.md`

2. **Follow these rules**:
   - Use second person ("you") and present tense
   - Use active voice and contractions
   - Vary sentence and paragraph lengths
   - Be direct and specific, not vague

3. **Never use AI indicator words**:
   - delve, tapestry, myriad, leverage, utilize
   - seamless, robust, cutting-edge, game-changer
   - furthermore, moreover, subsequently
   - "In today's fast-paced world..."

### For Marketing Content

Always reference `templates/marketing/STYLE-REFERENCES.md` which includes:
- Anti-pattern checks
- WordPress standards
- Inclusivity guidelines
- Voice consistency

## Code Patterns

### Prompt Format

All prompts should follow this structure:

```markdown
# [Prompt Name]

> **Category**: [category/subcategory]
> **Platforms**: All | Claude Code | Cursor | etc.

<prompt>
[Prompt content here]
</prompt>

## Usage
[How to use this prompt]

## Customization
[What can be modified]
```

### Skill Format

Skills should use:

```markdown
# [Skill Name]

> **Topic**: [category/skill-name]
> **Platforms**: All
> **Source**: [attribution]

<skill>
<summary>[One-line description]</summary>
<knowledge>[Content]</knowledge>
<references>[Links]</references>
</skill>
```

## Things Claude Should NOT Do

### Content Creation
- Never start with clichéd openings ("In today's...", "Let's dive into...")
- Never use formal transitions (furthermore, moreover, additionally)
- Never write monotonous prose (vary sentence lengths)
- Never add unsolicited documentation or README files
- Never add emojis unless explicitly requested

### File Operations
- Never create files outside the repository root
- Never delete files without explicit confirmation
- Never modify .git directory contents
- Never commit secrets or credentials

### Git Operations
- Never force push to main branch
- Never amend commits by other authors
- Never skip pre-commit hooks without user request
- Never push without explicit user instruction

## Verification Commands

Before completing work, verify with these commands:

### Check file structure
```bash
# Verify no orphaned files
find . -name "*.md" -type f | head -20
```

### Check markdown formatting
```bash
# Look for common issues
grep -r "In today's" --include="*.md" . || echo "No clichés found"
grep -r "delve" --include="*.md" . || echo "No AI indicators found"
```

### Check links
```bash
# Find broken internal links
grep -r "\](\./" --include="*.md" . | head -10
```

## Upstream Dependencies

This repo tracks 11 external sources. See `UPSTREAM.md` for:
- WordPress/agent-skills (WordPress development patterns)
- richtabor/skills + richtabor/agent-skills (writing, accessibility, motion design)
- WordPress/WordPress-Documentation-Style-Guide
- pluginslab/wp-devdocs-mcp (hook/filter/block database MCP server)
- jonathanbossenger/wp-openrouter-provider (WordPress AI Client + OpenRouter)
- laxmariappan/abilities-scout (Abilities API static analysis)

When syncing upstream changes:
1. Check `UPSTREAM.md` for last sync dates
2. Review upstream commits since last sync
3. Apply relevant changes manually
4. Update sync date in `UPSTREAM.md`

## Common Tasks

### Adding a New Skill
1. Create file in appropriate `skills/[category]/` directory
2. Follow the skill format above
3. Update `skills/README.md` with new entry
4. Add references to relevant prompts

### Adding a New Prompt
1. Create file in appropriate `prompts/[category]/` directory
2. Follow the prompt format above
3. Link to relevant skills in references section
4. Test in at least one platform

### Adding Marketing Content
1. Review `templates/marketing/STYLE-REFERENCES.md` first
2. Load all three style guide references
3. Use appropriate template from `templates/marketing/`
4. Run style checks before finalizing

## Session Tips

### For Best Results
- Start complex tasks in Plan mode (shift+tab twice)
- Verify changes with grep/find commands
- Use `/commit-push-pr` for standard git workflow
- Reference this file when unsure about conventions

### Parallel Work
This repo works well with multiple Claude sessions:
- One for content creation
- One for verification/testing
- One for git operations
