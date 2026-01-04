# Draft Blog Post

Draft a technical blog post about recent work in this or another repository.

## Arguments

$ARGUMENTS

Expected: Topic or feature to write about, optionally with target repo path.

## Pre-flight

```bash
# Load style guides
echo "Loading style guides..."

# Recent commits for context
git log --oneline -10

# Recent file changes
git diff --stat HEAD~5
```

## Instructions

1. **Load all reference files first** (this is critical):
   - Read `skills/technical-writing/references/anti-patterns.md`
   - Read `skills/technical-writing/references/wordpress-docs-style-guide.md`
   - Read `skills/technical-writing/references/style-guide.md`

2. **Research the topic**:
   - Review recent commits related to the topic
   - Read key implementation files
   - Note design decisions and trade-offs
   - Identify interesting technical challenges

3. **Plan the structure** (don't follow a formula):
   - Opening hook (specific, not clichéd)
   - What was built and why
   - Technical details with code snippets (5-15 lines each)
   - Challenges and solutions
   - Future directions

4. **Write the draft** applying all style guides:
   - Target 500-1200 words
   - Vary sentence and paragraph lengths
   - Use active voice, present tense, second person
   - Include contractions naturally
   - No AI indicator words
   - No formal transitions

5. **Save the draft**:
```bash
# Create .blog directory if needed
mkdir -p .blog

# Generate filename
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$ARGUMENTS" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
echo "Saving to: .blog/${DATE}-${SLUG}.md"
```

6. **Provide deliverables**:
   - File location
   - Final post title
   - 4-6 suggested tags
   - Key files referenced (with line numbers)
   - Word count

7. **Run verification**:
   - Use /verify-content on the draft
   - Fix any issues found

8. **Ask about WordPress publishing**:
   - If yes, read `skills/technical-writing/references/wordpress-publishing.md`
   - Run the publish script
