# Audit Prompt

Validate a prompt file for quality, token count, and platform compatibility.

## Arguments

$ARGUMENTS

Expected: path to a prompt file (e.g., `prompts/core/security-review.md`)

## Instructions

1. Read the specified prompt file

2. **Token Count Check**:
   - Count approximate tokens (words / 0.75)
   - If in `prompts/core/`: flag if over 2000 tokens
   - If in `prompts/extended/`: note the count, no limit

3. **Structure Check**:
   - Has a title (# heading)
   - Has category/platform metadata
   - Has `<prompt>` tags (for extended) or clear prompt section
   - Has Usage section
   - Has Customization or Variables section

4. **Content Quality**:
   - Check for AI indicator words (delve, tapestry, myriad, leverage, utilize, seamless, robust)
   - Check for cliched openings ("In today's...", "Have you ever...")
   - Check for formal transitions (furthermore, moreover, additionally)
   - Verify WordPress version references are 6.9+
   - Verify PHP version references are 8.2+

5. **Platform Compatibility**:
   - Self-contained? (no external file references for core/ prompts)
   - Uses standard markdown formatting?
   - Placeholder variables clearly marked with [BRACKETS]?

6. **Report Results**:
   - Pass/Fail for each check
   - Specific line numbers for any issues
   - Suggestions for improvement
