# Universal Prompt Specification

This document defines the standard format for all prompts in wp-dev-prompts, designed for cross-platform AI compatibility.

## Supported Platforms

- ChatGPT / GPT-4
- Google Gemini
- Claude (Web, API, Claude Code)
- GitHub Copilot
- Cursor
- Cline
- Other AI assistants

## Format Requirements

### XML-Style Tags

All prompts use XML-style tags for clear section boundaries. This format works well across all major AI platforms.

```xml
<role>
[Who the AI should act as]
</role>

<context>
[Background information and current situation]
</context>

<task>
[Clear instructions for what to do]
</task>

<constraints>
[Rules and limitations to follow]
</constraints>

<output_format>
[Expected format of the response]
</output_format>
```

### Why XML Tags?

| Platform | XML Support | Notes |
|----------|-------------|-------|
| Claude | Excellent | Native understanding of XML structure |
| Gemini | Excellent | Recommended in official docs |
| ChatGPT | Good | Parses structure reliably |
| Copilot | Good | Works in comments and prompts |
| Cursor | Good | Works in .cursorrules |
| Cline | Good | Works in .clinerules |

---

## Portable Prompt Template

Use this template for prompts in `prompts/core/`:

```markdown
# [Prompt Title]

> **Type**: Portable (<2000 tokens)
> **Platforms**: All
> **Extended Version**: [Link if exists]

## Quick Copy

<prompt>
<role>
You are a [specific role] expert specializing in WordPress development.
</role>

<context>
[User's current situation - use placeholders]

Project: [PROJECT_NAME]
Type: [plugin/theme]
WordPress: [VERSION]
PHP: [VERSION]
</context>

<task>
[Clear, numbered instructions]

1. [First step]
2. [Second step]
3. [Third step]
</task>

<constraints>
- Follow WordPress Coding Standards
- Ask permission before creating files
- [Additional constraints]
</constraints>

<output_format>
[Specify exact format expected]

Example structure:
```[language]
[code example]
```
</output_format>
</prompt>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `[PROJECT_NAME]` | Your project name | `My Plugin` |
| `[VERSION]` | Version number | `6.9` |

## Expected Output

[Description of what the AI will produce]

## Platform Notes

### ChatGPT / Gemini
[Any specific notes for web-based AI]

### Claude Code / Cursor / Cline
[Notes for IDE-integrated AI with file access]
```

---

## Extended Prompt Template

Use this template for prompts in `prompts/extended/`:

```markdown
# [Prompt Title]

> **Type**: Extended (full-featured)
> **Platforms**: All (optimized for Claude Code, Cursor, Cline)
> **Portable Version**: [Link to core/ version]

## Overview

[Detailed description of what this prompt does]

## Prerequisites

- [Requirement 1]
- [Requirement 2]

## The Prompt

<prompt>
<role>
You are a [detailed role description with expertise areas].
</role>

<context>
[Comprehensive background information]

### Project Details
- Project: [PROJECT_NAME]
- Type: [plugin/theme/block-theme]
- WordPress: [VERSION]
- PHP: [VERSION]
- Repository: [REPO_URL]

### Current State
[Description of where user is in their project]

### Resources Available
[List of files, tools, or references available]
</context>

<task>
[Detailed multi-step instructions]

## Phase 1: [Phase Name]
1. [Step 1]
2. [Step 2]

## Phase 2: [Phase Name]
1. [Step 1]
2. [Step 2]

[Continue as needed]
</task>

<constraints>
- Follow WordPress Coding Standards (WPCS)
- Security: Sanitize input, escape output
- Always combine nonces with capability checks
- Ask permission before:
  - Creating new files
  - Modifying existing code
  - Making architectural decisions
- [Additional constraints]
</constraints>

<output_format>
[Detailed format specification]

### File Structure
```
[Expected file structure]
```

### Code Format
```[language]
[Code template]
```
</output_format>

<references>
- [Skill or guide reference]
- [External documentation]
</references>
</prompt>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `[VARIABLE]` | Description | `example` |

## Expected Output

[Detailed description]

## Related Resources

- **Skills**: [skill-name.md](../../skills/category/skill-name.md)
- **Guides**: [GUIDE-NAME.md](../../guides/GUIDE-NAME.md)
- **Templates**: [template.md](../../templates/category/template.md)

## Platform-Specific Usage

### ChatGPT / Gemini
[Usage notes]

### Claude Code
[Usage notes, can reference file system]

### Cursor
[Usage notes, can reference .cursorrules]

### Cline
[Usage notes, can reference .clinerules]
```

---

## Placeholder Convention

Use consistent placeholder formatting:

| Format | Meaning | Example |
|--------|---------|---------|
| `[UPPER_CASE]` | Required user input | `[PLUGIN_NAME]` |
| `[lower-case]` | Slug/identifier format expected | `[plugin-slug]` |
| `[e.g., value]` | Example provided | `[e.g., my-plugin]` |
| `[option1/option2]` | Choose one option | `[plugin/theme]` |
| `[describe X]` | Free-form text | `[describe your feature]` |

---

## Token Guidelines

| Prompt Type | Target | Maximum | Location |
|-------------|--------|---------|----------|
| Portable | 800-1200 | 2000 | `prompts/core/` |
| Extended | 2000-4000 | No limit | `prompts/extended/` |
| Skill | 500-800 | 1000 | `skills/` |
| Platform config | 300-500 | 800 | `platforms/` |

### Estimating Tokens

```bash
# Rough estimate: ~4 characters per token
wc -c file.md  # Divide by 4

# Accurate count (requires Python)
pip install tiktoken
python -c "import tiktoken; enc = tiktoken.get_encoding('cl100k_base'); print(len(enc.encode(open('file.md').read())))"
```

---

## Best Practices

### 1. Be Specific About Role

```xml
<!-- Good -->
<role>
You are a WordPress security expert specializing in plugin development,
with deep knowledge of sanitization, escaping, and capability checks.
</role>

<!-- Too vague -->
<role>
You are a developer.
</role>
```

### 2. Structure Tasks Clearly

```xml
<!-- Good -->
<task>
Create a PHPUnit test file:

1. Set up test class extending WP_UnitTestCase
2. Add setUp() method to initialize test fixtures
3. Write test methods for each public function
4. Include edge cases and error conditions
</task>

<!-- Too vague -->
<task>
Write some tests.
</task>
```

### 3. Define Output Format Explicitly

```xml
<!-- Good -->
<output_format>
Provide a complete PHP file with:
- File header comment with @package tag
- Namespace declaration
- Class definition
- All test methods with @covers annotations

Example:
```php
<?php
namespace MyPlugin\Tests;

class ExampleTest extends \WP_UnitTestCase {
    // ...
}
```
</output_format>

<!-- Too vague -->
<output_format>
Give me the code.
</output_format>
```

### 4. Include Permission Constraints

```xml
<constraints>
- Ask permission before creating new files
- Ask permission before modifying existing files
- Ask permission before running shell commands
- Explain proposed changes before implementing
</constraints>
```

---

## Validation Checklist

Before submitting a new prompt:

- [ ] Uses XML-style tags consistently
- [ ] Includes all required sections (role, context, task, constraints, output_format)
- [ ] Placeholders follow naming convention
- [ ] Token count within limits for prompt type
- [ ] Tested on at least one platform (Claude Code preferred)
- [ ] Includes Variables table
- [ ] Includes Expected Output section
- [ ] Links to related resources where applicable
