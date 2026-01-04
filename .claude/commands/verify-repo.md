# Verify Repository

Run comprehensive verification checks on the repository.

## Quick Status

```bash
# Repository overview
echo "=== Repository Status ==="
git status --short
echo ""
echo "=== Recent Changes ==="
git log --oneline -5
echo ""
echo "=== File Counts ==="
echo "Prompts: $(find prompts -name '*.md' 2>/dev/null | wc -l | tr -d ' ')"
echo "Skills: $(find skills -name '*.md' 2>/dev/null | wc -l | tr -d ' ')"
echo "Templates: $(find templates -name '*.md' 2>/dev/null | wc -l | tr -d ' ')"
echo "Agents: $(find agents -name '*.md' 2>/dev/null | wc -l | tr -d ' ')"
```

## Verification Checks

### 1. Structure Validation

```bash
echo "=== Required Directories ==="
for dir in prompts skills templates agents workflows platforms docs; do
  if [ -d "$dir" ]; then
    echo "✓ $dir exists"
  else
    echo "✗ $dir MISSING"
  fi
done
```

### 2. README Coverage

```bash
echo "=== README Files ==="
for dir in prompts skills templates agents workflows; do
  if [ -f "$dir/README.md" ]; then
    echo "✓ $dir/README.md"
  else
    echo "✗ $dir/README.md MISSING"
  fi
done
```

### 3. Content Quality

```bash
echo "=== AI Indicator Scan ==="
COUNT=$(grep -r -l -E "(delve|tapestry|myriad|leverage|utilize)" --include="*.md" . 2>/dev/null | wc -l | tr -d ' ')
if [ "$COUNT" -eq "0" ]; then
  echo "✓ No AI indicator words found"
else
  echo "✗ Found in $COUNT files:"
  grep -r -l -E "(delve|tapestry|myriad|leverage|utilize)" --include="*.md" . 2>/dev/null
fi
```

### 4. Link Validation

```bash
echo "=== Internal Links ==="
# Find markdown links and check if targets exist
grep -r -h -o '\[.*\](\.\.?/[^)]*\.md)' --include="*.md" . 2>/dev/null | head -10
echo "(Sampling first 10 internal links)"
```

### 5. Upstream Status

```bash
echo "=== Upstream Dependencies ==="
if [ -f "UPSTREAM.md" ]; then
  grep "Last Synced:" UPSTREAM.md | head -5
else
  echo "✗ UPSTREAM.md not found"
fi
```

## Instructions

1. Run all checks above
2. Summarize findings:
   - **Passing**: Things that look good
   - **Warnings**: Non-critical issues
   - **Errors**: Things that need immediate attention

3. For any errors found:
   - Explain what's wrong
   - Suggest a fix
   - Ask if user wants automatic fixes

4. Provide recommendations for improvements

## Optional Deep Checks

If user requests thorough verification:

```bash
# Check all markdown files for style issues
find . -name "*.md" -type f | while read file; do
  # Check for clichéd openings
  if head -5 "$file" | grep -qE "^(In today's|Have you ever|Let's dive)"; then
    echo "CLICHÉ: $file"
  fi
done

# Check for missing descriptions in skills
find skills -name "*.md" -type f | while read file; do
  if ! grep -q "<summary>" "$file" 2>/dev/null; then
    echo "NO SUMMARY: $file"
  fi
done
```
