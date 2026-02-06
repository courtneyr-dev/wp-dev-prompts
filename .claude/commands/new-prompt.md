# New Prompt

Create a new prompt following the repository's prompt specification.

## Arguments

$ARGUMENTS

Expected format: `<category> <prompt-name> "<one-line description>"`

Example: `core security-review "Quick security audit checklist for WordPress plugins"`

## Instructions

1. Parse arguments for:
   - **Category**: core, extended, blocks, testing, audit, frontend-design, site-review, or tiered/t1-t3
   - **Prompt name**: kebab-case
   - **Description**: one-line summary

2. Load style guides:
   - `skills/technical-writing/references/anti-patterns.md`
   - `skills/technical-writing/references/wordpress-docs-style-guide.md`

3. Determine prompt type:
   - **core/**: Must be under 2000 tokens, self-contained, no external refs
   - **extended/**: Unlimited length, can reference skills and data files
   - **tiered/**: Match the tier level (t1=constrained, t2=analytical, t3=collaborative)

4. Create the file at `prompts/<category>/<prompt-name>.md`:

For **core/** prompts:
```markdown
# [Prompt Name]

> **Category**: [category]
> **Platforms**: All
> **Tokens**: ~[count]

[Self-contained prompt content under 2000 tokens]

## Variables
- `[PLACEHOLDER]`: Description

## Usage
Brief usage instructions.
```

For **extended/** prompts:
```markdown
# [Prompt Name]

> **Category**: [category]
> **Platforms**: Claude Code | Cursor | Cline

<prompt>
[Full prompt content]
</prompt>

## Usage
[How to use]

## Customization
[What to modify]

## Related Skills
- [Link to relevant skill]
```

5. Run `/audit-prompt` on the new file to validate it.

6. Update the category's README.md if it exists.
