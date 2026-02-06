# Documentation Generator

> **Category**: core/documentation
> **Platforms**: All

<prompt>
Generate documentation for this WordPress plugin.

**Plugin name**: [PLUGIN_NAME]
**Plugin slug**: [PLUGIN_SLUG]
**Code/description**: [PASTE CODE OR DESCRIBE FUNCTIONALITY]

## Generate these documents

### 1. readme.txt (WordPress.org format)

```
=== [Plugin Name] ===
Contributors: [username]
Tags: [tag1], [tag2], [tag3], [tag4], [tag5]
Requires at least: 6.9
Tested up to: 6.9
Requires PHP: 8.2
Stable tag: [VERSION]
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

[Short description — max 150 characters]

== Description ==
[Clear explanation of what the plugin does, key features as bullet list]

== Installation ==
[Step-by-step instructions]

== Frequently Asked Questions ==
[3-5 common questions and answers]

== Screenshots ==
[Numbered list matching screenshot files]

== Changelog ==
= [VERSION] =
* [Change entries]
```

### 2. README.md (GitHub format)

Include:
- Plugin name and one-line description
- Requirements (WP 6.9+, PHP 8.2+)
- Installation (from WordPress.org + manual)
- Configuration steps
- Developer section with hooks/filters list
- Contributing guidelines link
- License

### 3. Inline documentation

For each public function and class, generate PHPDoc:
```php
/**
 * Short description in one line.
 *
 * Longer description if needed.
 *
 * @since 1.0.0
 *
 * @param string $param Description.
 * @return bool Description.
 */
```

For hooks, document where they fire:
```php
/**
 * Filters the widget output.
 *
 * @since 1.0.0
 *
 * @param string $output The HTML output.
 * @param array  $args   Widget arguments.
 */
$output = apply_filters( '[plugin_slug]_widget_output', $output, $args );
```

## Writing rules

- Use second person ("you") when addressing users
- Use active voice and contractions
- Be specific and direct — no filler words
- Keep paragraphs short (1-4 sentences)
- Avoid: delve, leverage, utilize, seamless, robust, cutting-edge
- Don't start with "In today's..." or "Have you ever..."
- Follow WordPress Documentation Style Guide conventions

Generate all three documents based on the code provided.
</prompt>

## Usage

Replace variables and paste your plugin code for context. Works best when you include the main plugin file and any key class files.
