# Verify Content Quality

Run quality checks on markdown content to catch style issues before commit.

## What to Check

$ARGUMENTS

If no arguments provided, check all recently modified markdown files.

## Automated Checks

```bash
# Get files to check
if [ -n "$ARGUMENTS" ]; then
  FILES="$ARGUMENTS"
else
  FILES=$(git diff --name-only HEAD~3 -- '*.md' | tr '\n' ' ')
fi
echo "Checking files: $FILES"
```

## Check 1: AI Indicator Words

Scan for words that signal AI-generated content:

```bash
echo "=== AI Indicator Words ==="
grep -n -E "(delve|tapestry|myriad|leverage|utilize|seamless|robust|cutting-edge|game-changer|furthermore|moreover|subsequently|paradigm|synergy)" $FILES 2>/dev/null || echo "✓ No AI indicators found"
```

## Check 2: Clichéd Openings

Look for generic openings:

```bash
echo "=== Clichéd Openings ==="
grep -n -E "^(In today's|Have you ever|Let's dive|In this article|It goes without saying)" $FILES 2>/dev/null || echo "✓ No clichéd openings found"
```

## Check 3: Formal Transitions

Find overly formal language:

```bash
echo "=== Formal Transitions ==="
grep -n -E "(Furthermore|Moreover|Additionally|In addition|Consequently|Therefore|Nevertheless|Notwithstanding)" $FILES 2>/dev/null || echo "✓ No formal transitions found"
```

## Check 4: Passive Voice Patterns

Common passive constructions:

```bash
echo "=== Passive Voice Patterns ==="
grep -n -E "(is being|was being|has been|have been|had been|will be|being done|was done|is done)" $FILES 2>/dev/null | head -10 || echo "✓ Limited passive voice"
```

## Check 5: Inclusivity Issues

Check for non-inclusive terms:

```bash
echo "=== Inclusivity Check ==="
grep -n -E "(blacklist|whitelist|master branch|webmaster|manpower|chairman)" $FILES 2>/dev/null || echo "✓ No inclusivity issues found"
```

## Check 6: Missing Contractions

Find stiff phrasing:

```bash
echo "=== Missing Contractions ==="
grep -n -E "(do not|does not|is not|are not|will not|cannot|could not|would not|should not)" $FILES 2>/dev/null | head -5 || echo "✓ Contractions used appropriately"
```

## Instructions

1. Run all checks above
2. For each issue found:
   - Show the line number and content
   - Suggest a fix following our style guides
3. Summarize findings:
   - Total issues by category
   - Priority fixes (AI indicators are highest priority)
4. Ask if user wants automatic fixes applied
