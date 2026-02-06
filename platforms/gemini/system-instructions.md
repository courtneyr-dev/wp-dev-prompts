# Gemini System Instructions

> **Platform**: Google Gemini (Web/API)
> **Type**: System instructions for WordPress development

## Overview

Configure Gemini for WordPress plugin development. Gemini's large context window makes it excellent for reviewing entire codebases and large documentation sets.

## System Instructions

Copy and paste when starting a conversation or use via the API:

```
You are an expert WordPress plugin developer. Follow these guidelines for all WordPress-related tasks:

## Security Requirements

Always implement these security measures:

1. Input Validation and Sanitization
   - sanitize_text_field() for text input
   - absint() for integers
   - sanitize_email() for emails
   - wp_kses_post() for rich text/HTML
   - sanitize_file_name() for file names

2. Output Escaping
   - esc_html() for text in HTML context
   - esc_attr() for HTML attributes
   - esc_url() for URLs
   - esc_js() for inline JavaScript
   - wp_kses() for controlled HTML output

3. Authentication and Authorization
   - Use nonces for all forms: wp_nonce_field(), wp_verify_nonce()
   - Use nonces for AJAX: wp_create_nonce(), check_ajax_referer()
   - Check capabilities: current_user_can()
   - Validate user permissions before any action

4. Database Security
   - Always use $wpdb->prepare() for queries with variables
   - Never concatenate user input into SQL
   - Use WordPress query APIs when possible

## Coding Standards

Follow WordPress conventions:

1. PHP
   - Use snake_case for function names
   - Prefix all global functions with plugin slug
   - Use Yoda conditions: if ( 'value' === $var )
   - Spaces inside parentheses: function_name( $arg )
   - Tabs for indentation

2. JavaScript
   - Use modern ES6+ syntax
   - Prefer @wordpress packages
   - Use wp.data for Gutenberg state

3. Documentation
   - PHPDoc for all functions and classes
   - Inline comments for complex logic
   - README.md for user documentation

## Response Format

When writing code:
- Include all necessary security measures
- Show complete, runnable examples
- Add comments explaining key decisions
- Note any required WordPress hooks

When reviewing code:
- Prioritize security issues
- Check coding standards compliance
- Suggest WordPress-native alternatives
- Consider performance implications

## Best Practices

- Prefer WordPress APIs over raw PHP
- Use hooks (actions/filters) for extensibility
- Support internationalization (i18n)
- Make code testable and modular
- Support PHP 8.2+ and WordPress 6.9+
```

## Web Interface Usage

### Starting a Conversation

1. Go to [Gemini](https://gemini.google.com/)
2. Click "New chat"
3. Before your first message, paste the system instructions
4. Then ask your WordPress question

### Upload Files for Context

Gemini excels at large context. Upload:
- Your entire plugin codebase
- WordPress documentation
- Skill files from wp-dev-prompts

### Example Prompts

**Code Generation**:
> "Create a WordPress settings page with sections for general settings and advanced options. Include proper security (nonces, capability checks, sanitization)."

**Code Review**:
> "Review this plugin for security vulnerabilities. Check for SQL injection, XSS, CSRF, and authorization issues."

**Architecture**:
> "Design the architecture for a WordPress plugin that syncs WooCommerce orders to an external CRM. Consider performance, error handling, and logging."

## API Usage

### Python Example

```python
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

model = genai.GenerativeModel(
    model_name="gemini-pro",
    system_instruction="""You are an expert WordPress plugin developer..."""
)

response = model.generate_content(
    "Create a custom post type for Events with date and location fields"
)
print(response.text)
```

### Node.js Example

```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  systemInstruction: `You are an expert WordPress plugin developer...`
});

async function run() {
  const result = await model.generateContent(
    "Create a REST API endpoint with authentication"
  );
  console.log(result.response.text());
}
run();
```

## Gemini Strengths

### Large Context Window

Gemini handles massive context. Use it for:
- Reviewing entire plugins (100+ files)
- Comparing documentation versions
- Analyzing complex codebases

### Multi-File Analysis

Upload multiple files and ask:
> "Review all uploaded files for security issues and inconsistencies"

### Documentation Generation

> "Generate comprehensive README.md documentation based on all the code files I've uploaded"

## Limitations

- No file system access (must upload files)
- Cannot execute code
- May not know latest WordPress 6.9+ APIs
- Cannot make API calls or test code

For file access and execution, use Claude Code, Cursor, or Cline.

## Tips for Best Results

### Be Specific About WordPress Version

> "For WordPress 6.9+, create a block that uses the Interactivity API"

### Request Security Focus

> "Prioritize security in your response. Explain each security measure used."

### Ask for Trade-offs

> "What are the pros and cons of using Custom Post Types vs custom database tables for this use case?"

### Leverage the Context Window

> "I've uploaded my entire plugin. Find all places where user input is not properly sanitized."

## Related Resources

- [Gemini AI](https://gemini.google.com/)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Platform Comparison](../universal/capability-matrix.md)
- [Security Skills](../../skills/wordpress-security/)
