# WordPress Playground Blueprint Creation Guide

## Quick Reference for Prompting Claude

### Optimal Prompt Template

```
Create a WordPress Playground blueprint for [PLUGIN/THEME NAME].

Requirements:
- Use Base64 encoding for URL hash delivery
- Include: [list specific features/steps]
- Start with a minimal test if complex
- Open in browser to verify
- Check WordPress Playground docs if errors occur

Blueprint should include:
1. [Step 1]
2. [Step 2]
3. [etc.]
```

### Example Good Prompt

```
Create a WordPress Playground blueprint for the Post Formats plugin.
Use Base64 encoding for the URL hash method.
Include:
- Plugin installation and activation
- Twenty Twenty-Five theme
- Theme unit test data import
- Example posts for all 9 formats plus standard

Test it by opening in browser.
```

### Key Phrases to Use

| Phrase | Why It Helps |
|--------|--------------|
| "Use Base64 encoding" | Ensures correct encoding method from the start |
| "Start with a minimal test" | Validates structure before adding complexity |
| "Check the WordPress Playground documentation" | Directs to authoritative source |
| "Open it in browser to test" | Makes testing explicit |

### Troubleshooting Prompts

If you see repeated errors, use these:

**For "Invalid blueprint" errors:**
```
Stop. Review https://wordpress.github.io/wordpress-playground/blueprints/troubleshoot-and-debug/
Check the correct URL encoding method and step syntax.
```

**For stuck loops:**
```
Create a minimal test blueprint with just login and one step.
Once that works, add features incrementally.
```

**For parameter issues:**
```
Verify the step parameters against
https://wordpress.github.io/wordpress-playground/blueprints/steps
```

### Red Flags to Watch For

- ⚠️ Same error repeating → Ask for docs review
- ⚠️ Multiple retries without different approach → Request minimal test
- ⚠️ Guessing at syntax → Direct to specific documentation

### Blueprint Delivery Methods

1. **URL Hash (Base64)** - Best for testing
   ```
   https://playground.wordpress.net/#[BASE64_ENCODED_JSON]
   ```

2. **URL Parameter** - For hosted blueprints
   ```
   https://playground.wordpress.net/?blueprint-url=https://example.com/blueprint.json
   ```

3. **File Upload** - For local testing
   - Save as `blueprint.json`
   - Drag and drop into playground.wordpress.net

### Important URLs

- Main Docs: https://wordpress.github.io/wordpress-playground/
- Blueprint Steps: https://wordpress.github.io/wordpress-playground/blueprints/steps
- Troubleshooting: https://wordpress.github.io/wordpress-playground/blueprints/troubleshoot-and-debug/
- Using Blueprints: https://wordpress.github.io/wordpress-playground/blueprints/using-blueprints

### Common Blueprint Structure

```json
{
  "landingPage": "/wp-admin/edit.php",
  "preferredVersions": {
    "php": "8.0",
    "wp": "latest"
  },
  "features": {
    "networking": true
  },
  "steps": [
    {
      "step": "login",
      "username": "admin",
      "password": "password"
    },
    {
      "step": "installPlugin",
      "pluginData": {
        "resource": "wordpress.org/plugins",
        "slug": "plugin-slug"
      },
      "options": {
        "activate": true
      }
    }
  ]
}
```

### Notes from This Session

**What went wrong:**
- Initially used URL encoding instead of Base64 encoding
- Got stuck in error loop retrying same approach
- Needed to consult documentation sooner

**What fixed it:**
- Switched to Base64 encoding: `base64.b64encode(json.encode()).decode()`
- Started with minimal test to validate encoding method
- Built up complexity only after basic structure worked

**Key takeaway:**
When hitting "Invalid blueprint" errors, the encoding method is likely the issue, not the blueprint structure itself.

---

*Created: 2025-12-09*
*Last Updated: 2025-12-09*
