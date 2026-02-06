# Validate Repository

Run comprehensive validation checks on the wp-dev-prompts repository.

## Instructions

Run all checks below and produce a summary report.

### 1. Structure Validation

```bash
echo "=== Required Directories ==="
for dir in prompts skills templates agents workflows platforms docs data tests; do
  if [ -d "$dir" ]; then
    echo "PASS: $dir exists"
  else
    echo "FAIL: $dir MISSING"
  fi
done
```

### 2. README Coverage

```bash
echo "=== README Files ==="
for dir in prompts skills templates agents workflows platforms docs data; do
  if [ -f "$dir/README.md" ]; then
    echo "PASS: $dir/README.md"
  else
    echo "FAIL: $dir/README.md MISSING"
  fi
done
```

### 3. Version References

```bash
echo "=== Outdated WordPress Versions ==="
grep -rn "Requires at least: [0-5]\|Requires at least: 6\.[0-8]" --include="*.md" . 2>/dev/null | grep -v archive/ | grep -v node_modules/ || echo "PASS: No outdated WP versions"

echo "=== Outdated PHP Versions ==="
grep -rn "Requires PHP: [0-7]\|Requires PHP: 8\.[01]" --include="*.md" . 2>/dev/null | grep -v archive/ | grep -v node_modules/ || echo "PASS: No outdated PHP versions"
```

### 4. AI Indicator Words

```bash
echo "=== AI Word Scan ==="
FOUND=$(grep -rl -E "\b(delve|tapestry|myriad)\b" --include="*.md" . 2>/dev/null | grep -v archive/ | grep -v node_modules/ | grep -v anti-patterns)
if [ -z "$FOUND" ]; then
  echo "PASS: No AI indicator words"
else
  echo "WARN: Found in:"
  echo "$FOUND"
fi
```

### 5. Core Prompt Token Counts

```bash
echo "=== Core Prompt Sizes ==="
for file in prompts/core/*.md; do
  if [ -f "$file" ] && [ "$(basename $file)" != "README.md" ]; then
    WORDS=$(wc -w < "$file" | tr -d ' ')
    TOKENS=$((WORDS * 4 / 3))
    if [ "$TOKENS" -gt 2000 ]; then
      echo "FAIL: $file (~$TOKENS tokens, over 2000 limit)"
    else
      echo "PASS: $file (~$TOKENS tokens)"
    fi
  fi
done
```

### 6. Dead Internal Links (Sample)

Read all markdown files and check a sample of internal relative links to verify targets exist.

### 7. Upstream Sync Status

```bash
echo "=== Upstream Status ==="
grep "Last Synced:" UPSTREAM.md 2>/dev/null | while read line; do
  echo "  $line"
done
```

### 8. Duplicate Detection

Check for files that exist in multiple locations (especially prompts/ root vs extended/).

### Report Format

Summarize findings as:
- **Passing**: [count] checks passed
- **Warnings**: [list non-critical issues]
- **Failures**: [list critical issues needing fixes]
- **Recommendations**: [suggested improvements]
