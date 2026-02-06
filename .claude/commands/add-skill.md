# Add New Skill

Create a new skill following the standard format.

## Arguments

$ARGUMENTS

Expected format: `<category> <skill-name> "<one-line description>"`

Example: `security xss-prevention "Prevent cross-site scripting attacks in WordPress"`

## Pre-flight Checks

```bash
# List existing skill categories
ls -d skills/*/ 2>/dev/null | sed 's/skills\///' | sed 's/\///'

# Show skill format reference
head -30 skills/prompt-engineering/SKILL.md
```

## Instructions

1. Parse the arguments to get:
   - Category (must be existing directory or create new)
   - Skill name (kebab-case)
   - One-line description

2. Load style guides first:
   - `skills/prompt-engineering/references/anti-patterns.md`
   - `skills/prompt-engineering/references/wordpress-docs-style-guide.md`

3. Create the skill file at `skills/<category>/<skill-name>.md` with this structure:

```markdown
# [Skill Name in Title Case]

> **Topic**: <category>/<skill-name>
> **Platforms**: All
> **Source**: wp-dev-prompts

<skill>
<summary>
[One-line description from arguments]
</summary>

<knowledge>
## Core Concepts

[Essential knowledge - 2-3 paragraphs]

## Best Practices

1. [Practice with explanation]
2. [Practice with explanation]
3. [Practice with explanation]

## Common Patterns

```[language]
[Correct code pattern example]
```

## Anti-Patterns (Avoid)

- ❌ [What NOT to do and why]
- ❌ [Another thing to avoid]

## Verification Checklist

- [ ] [How to verify correct implementation]
- [ ] [Another verification step]
</knowledge>

<references>
- [Relevant official docs](URL)
</references>
</skill>

## Platform Integration

### Claude Code / Cursor / Cline
Reference this skill in prompts or CLAUDE.md.

### ChatGPT / Gemini
Copy the <knowledge> section directly into your prompt.
```

4. Update `skills/README.md`:
   - Add to directory structure if new category
   - Update skill count
   - Add to category description section

5. Verify the skill:
   - Check for AI indicator words
   - Confirm proper markdown formatting
   - Validate internal links
