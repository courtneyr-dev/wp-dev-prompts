# Add Learning to CLAUDE.md

Add a new guideline or anti-pattern to CLAUDE.md based on something Claude did incorrectly.

## Arguments

$ARGUMENTS

Describe what went wrong and what the correct behavior should be.

## Instructions

This command implements Boris's tip #4: "Anytime we see Claude do something incorrectly we add it to the CLAUDE.md, so Claude knows not to do it next time."

1. **Analyze the issue**:
   - What did Claude do wrong?
   - What should it have done instead?
   - Is this specific to this repo or general?

2. **Determine the category**:
   - Writing Guidelines
   - Code Patterns
   - Things Claude Should NOT Do
   - Verification Commands
   - Common Tasks

3. **Draft the addition**:
   - Keep it concise and actionable
   - Use imperative mood ("Do X" or "Don't do Y")
   - Include an example if helpful

4. **Read current CLAUDE.md**:
```bash
cat CLAUDE.md
```

5. **Add to appropriate section**:
   - Find the right section
   - Add the new guideline
   - Maintain consistent formatting

6. **Verify the change**:
   - Ensure no duplicate guidance exists
   - Check formatting matches existing entries
   - Confirm the addition is clear

7. **Summarize**:
   - What was added
   - Which section
   - Why this prevents the issue

## Example Usage

```
/add-to-claude-md Claude added emojis to commit messages without being asked
```

Would add to "Things Claude Should NOT Do":
```markdown
- Never add emojis to commit messages unless explicitly requested
```
