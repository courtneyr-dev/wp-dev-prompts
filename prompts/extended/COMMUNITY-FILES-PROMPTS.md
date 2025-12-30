# AI Prompts for WordPress Community Files & Documentation

This guide provides AI prompts for generating community files, documentation, and screenshots for WordPress plugins and themes. Use these with Claude, ChatGPT, or any AI assistant.

## 📋 Table of Contents

1. [Community File Prompts](#community-file-prompts)
2. [Documentation Prompts](#documentation-prompts)
3. [Screenshot Prompts](#screenshot-prompts)
4. [README Prompts](#readme-prompts)
5. [Changelog Prompts](#changelog-prompts)
6. [Support Documentation](#support-documentation)

---

## Community File Prompts

### 1. Generate Contributing Guidelines

#### Context
Create a comprehensive CONTRIBUTING.md file for a WordPress plugin or theme following best practices.

#### Prompt

```
Create a CONTRIBUTING.md file for my WordPress project.

Project Details:
- Name: [PLUGIN/THEME_NAME]
- Type: [Plugin/Theme]
- Repository: https://github.com/[USERNAME]/[REPO]
- Minimum WordPress: [e.g., 6.5]
- Minimum PHP: [e.g., 8.0]
- License: [e.g., GPL-2.0-or-later]
- Text Domain: [e.g., my-plugin]

Include:
1. How to contribute (bugs, features, docs, code)
2. Getting started (fork, clone, setup)
3. Development workflow
4. WordPress coding standards
5. Testing requirements (PHPUnit, PHPCS, PHPStan, ESLint, Jest)
6. Commit message guidelines (Conventional Commits)
7. Pull request process with checklist
8. Code review expectations

Format:
- Use markdown with proper headings
- Include code examples
- Add checklists for contributors
- Link to related files (CODE_OF_CONDUCT.md, SECURITY.md)
```

#### Variables to Customize
- `[PLUGIN/THEME_NAME]` - Your project name
- `[USERNAME]` - GitHub username
- `[REPO]` - Repository name
- WordPress/PHP versions
- Specific requirements for your project

---

### 2. Generate Security Policy

#### Context
Create a SECURITY.md file that outlines how to report vulnerabilities and security practices.

#### Prompt

```
Create a comprehensive SECURITY.md file for my WordPress plugin.

Plugin: [PLUGIN_NAME]
Current Version: [VERSION]
Supported Versions: [e.g., 2.x, 1.x]
Security Contact: [EMAIL]

Include:
1. Supported versions table
2. How to report vulnerabilities (privately)
3. Response timeline by severity level
4. What information to include in reports
5. Security best practices for users
6. Security features implemented
7. Disclosure policy
8. Security hall of fame (placeholder)

Severity Levels:
- Critical (24-48h): RCE, auth bypass, SQL injection
- High (7-14 days): XSS, CSRF, privilege escalation
- Medium (14-30 days): Info disclosure, minor issues
- Low (next release): Minimal impact issues

Format in markdown with clear sections and examples of good security reports.
```

---

### 3. Generate Support Documentation

#### Context
Create a SUPPORT.md file that helps users get help.

#### Prompt

```
Create a SUPPORT.md file for my WordPress plugin.

Plugin: [PLUGIN_NAME]
Repository: https://github.com/[USERNAME]/[REPO]
WordPress.org: https://wordpress.org/plugins/[SLUG]/

Include:
1. Before requesting support checklist
2. Support channels (free and premium if applicable)
   - GitHub Discussions
   - GitHub Issues
   - WordPress.org Support Forum
   - Documentation links
3. How to write a good support request
4. Common issues and solutions:
   - Installation/activation problems
   - Configuration issues
   - Feature not working
   - Plugin conflicts
   - Performance issues
   - Common error messages
5. FAQ (10-15 common questions)
6. Troubleshooting steps

Format:
- Markdown with collapsible sections
- Code examples for fixes
- Links to documentation
- Clear structure for easy navigation
```

---

### 4. Generate Issue Templates

#### Context
Create GitHub issue templates for structured bug reports and feature requests.

#### Prompt

```
Create GitHub issue templates for my WordPress plugin.

Plugin Details:
- Name: [PLUGIN_NAME]
- Min WordPress: [VERSION]
- Min PHP: [VERSION]
- Repository: [GITHUB_URL]

Create three templates:

1. **Bug Report** (.github/ISSUE_TEMPLATE/bug_report.md)
   - Clear bug description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (WP, PHP, theme, plugins)
   - Error messages/logs
   - Troubleshooting already tried
   - Screenshots
   - System health info

2. **Feature Request** (.github/ISSUE_TEMPLATE/feature_request.md)
   - Feature description
   - Problem it solves
   - Proposed solution
   - Alternatives considered
   - Examples from other plugins
   - Priority and impact
   - Willingness to contribute

3. **Question** (.github/ISSUE_TEMPLATE/question.md)
   - Question with context
   - What they're trying to do
   - What they've tried
   - Environment (if relevant)
   - Code examples

Also create config.yml with links to:
- GitHub Discussions
- Documentation
- Support resources
- Security policy

Use YAML frontmatter with labels and proper formatting.
```

---

### 5. Generate Pull Request Template

#### Context
Create a comprehensive PR template that ensures quality contributions.

#### Prompt

```
Create a Pull Request template for my WordPress plugin.

Plugin: [PLUGIN_NAME]
Standards:
- WordPress Coding Standards (PHPCS)
- PHPStan level [LEVEL]
- ESLint with @wordpress/eslint-plugin
- 80%+ test coverage

Include sections:
1. Description and type of change
2. Related issues (with auto-close syntax)
3. Motivation and context
4. Detailed changes (Added, Changed, Removed, Fixed)
5. Screenshots (if UI changes)
6. Testing performed:
   - Test environment details
   - Manual testing checklist
   - Automated testing results
7. Code quality checklist:
   - WordPress standards
   - Security (sanitization, escaping, nonces, capabilities)
   - Performance
   - Compatibility
8. Documentation updates
9. Deployment notes (DB changes, breaking changes)
10. Dependencies
11. Comprehensive PR checklist

Format as markdown in .github/PULL_REQUEST_TEMPLATE.md with detailed checklists.
```

---

## Documentation Prompts

### 6. Generate User Guide

#### Context
Create comprehensive user documentation for your plugin.

#### Prompt

```
Create a user guide for my WordPress plugin.

Plugin: [PLUGIN_NAME]
Features:
- [Feature 1]
- [Feature 2]
- [Feature 3]

Create documentation covering:

1. **Getting Started**
   - Installation (WordPress.org, upload, Composer)
   - Activation
   - Initial setup/wizard
   - Basic configuration

2. **Core Features**
   For each feature:
   - What it does
   - How to use it
   - Configuration options
   - Screenshots (describe what to capture)
   - Examples
   - Tips and tricks

3. **Advanced Usage**
   - Developer hooks (actions/filters)
   - Shortcodes with parameters
   - Template overrides
   - Integration with other plugins
   - Custom code examples

4. **Troubleshooting**
   - Common issues
   - Error messages
   - Debug mode
   - Support resources

5. **FAQ** (20+ questions)

Format as markdown with clear hierarchy, code blocks with syntax highlighting,
and placeholders for screenshots. Include a table of contents.
```

---

### 7. Generate Developer Documentation

#### Context
Create API documentation for developers extending your plugin.

#### Prompt

```
Create developer documentation for my WordPress plugin.

Plugin: [PLUGIN_NAME]
Prefix: [PREFIX]
Text Domain: [DOMAIN]

Document:

1. **Hooks Reference**
   - Actions (when they fire, parameters, examples)
   - Filters (what they filter, parameters, return values, examples)

2. **Functions Reference**
   - Public functions
   - Parameters and return types
   - Usage examples
   - Availability (since which version)

3. **Classes Reference**
   - Public methods
   - Properties
   - Usage examples
   - Instantiation

4. **Template Functions**
   - Available template tags
   - Parameters
   - Output examples

5. **Customization Examples**
   - Modify output
   - Add custom fields
   - Extend functionality
   - Integration examples

6. **Code Examples**
   - Real-world scenarios
   - Best practices
   - Common patterns

Format: Markdown with PHPDoc-style documentation, code examples with
syntax highlighting, and clear categorization.

Include:
```php
/**
 * Function description.
 *
 * @since 1.0.0
 * @param string $param Description.
 * @return bool Description.
 */
```
style documentation for each item.
```

---

## Screenshot Prompts

### 8. Screenshot Planning

#### Context
Plan what screenshots to create for WordPress.org listing.

#### Prompt

```
Plan screenshots for my WordPress plugin listing on WordPress.org.

Plugin: [PLUGIN_NAME]
Type: [Admin tool/Frontend display/Block/Widget/etc.]
Key Features:
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

Create a screenshot plan:

For each screenshot (minimum 5):
1. Screenshot number and filename
2. Caption for readme.txt
3. What to show
4. Where to capture (admin page, frontend, etc.)
5. Required setup/sample data
6. Important elements to highlight
7. Optimal dimensions (1200x900px recommended)

Requirements:
- Show real, meaningful content (no lorem ipsum)
- Professional appearance
- Consistent theme/styling
- Clear demonstration of features
- No personal information

Output:
- List of screenshots with descriptions
- readme.txt captions
- Capture instructions
- Sample data needed
```

---

### 9. Automated Screenshot Script

#### Context
Generate a Playwright script to automatically capture screenshots.

#### Prompt

```
Create a Playwright test script to automatically generate screenshots for my WordPress plugin.

Plugin: [PLUGIN_NAME]
Admin Pages:
- [Page 1]: /wp-admin/[path]
- [Page 2]: /wp-admin/[path]

Frontend Pages:
- [Page 1]: /[slug]
- [Page 2]: /[slug]

Create a Playwright test (generate-screenshots.spec.js) that:
1. Logs into WordPress admin
2. Navigates to each screenshot location
3. Performs any necessary actions (clicks, fills forms)
4. Waits for elements to load
5. Captures screenshot at 1200x900px
6. Saves as assets/screenshot-N.png

Include:
- Setup with WordPress Playground blueprint
- Login handling
- Screenshot configuration
- Proper waits/selectors
- Error handling
- Multiple screenshots in one test file

Also create:
- package.json scripts
- README instructions
- Sample blueprint.json for WordPress Playground

Format as complete, runnable code with comments.
```

---

### 10. Screenshot Optimization Workflow

#### Context
Create a workflow to optimize screenshots for WordPress.org.

#### Prompt

```
Create a screenshot optimization workflow for WordPress plugin assets.

Requirements:
- Compress PNG files (under 200KB each)
- Maintain quality (no visible artifacts)
- Batch process multiple screenshots
- Automate as npm script

Create:

1. **npm script** using pngquant or similar
2. **GitHub Action** to auto-optimize on commit
3. **Pre-commit hook** to warn if files too large
4. **Documentation** on manual optimization

Output:
- package.json scripts
- .github/workflows/optimize-screenshots.yml
- Instructions for local setup
- Quality check process

Tools to consider:
- pngquant
- imagemin
- sharp
- tinypng API (if applicable)
```

---

## README Prompts

### 11. Generate Plugin README.md

#### Context
Create a comprehensive README.md for GitHub.

#### Prompt

```
Create a professional README.md for my WordPress plugin GitHub repository.

Plugin Details:
- Name: [PLUGIN_NAME]
- Description: [ONE_LINE_DESCRIPTION]
- Features: [LIST_FEATURES]
- Min WordPress: [VERSION]
- Min PHP: [VERSION]
- License: [LICENSE]

Include:

1. **Header**
   - Plugin name
   - One-line description
   - Badges (WordPress version, PHP version, license, downloads, rating)
   - Links (WordPress.org, demo, docs)

2. **Description**
   - What it does
   - Who it's for
   - Key benefits

3. **Features** (with emojis)
   - List all features
   - Brief description of each

4. **Requirements**
   - WordPress version
   - PHP version
   - Dependencies (if any)

5. **Installation**
   - Via WordPress.org
   - Via upload
   - Via Composer
   - Via Git

6. **Quick Start**
   - Basic setup
   - First steps
   - Example usage

7. **Screenshots**
   - Reference to WordPress.org listing
   - Or embedded images

8. **Documentation**
   - User guide link
   - Developer docs link
   - FAQ link

9. **Development**
   - Setup instructions
   - Building assets
   - Running tests
   - Contributing link

10. **Support**
    - Where to get help
    - Link to SUPPORT.md

11. **Changelog**
    - Recent changes
    - Link to full CHANGELOG.md

12. **License**
    - License info
    - Copyright

Format: Modern markdown with badges, emojis, and clear sections.
Use shields.io for badges.
```

---

### 12. Generate readme.txt for WordPress.org

#### Context
Create readme.txt following WordPress.org requirements.

#### Prompt

```
Create a readme.txt file for WordPress.org plugin directory.

Plugin: [PLUGIN_NAME]
Contributors: [WP.ORG_USERNAMES]
Tags: [TAG1], [TAG2], [TAG3]
Requires at least: [MIN_WP]
Tested up to: [MAX_WP]
Requires PHP: [MIN_PHP]
Stable tag: [VERSION]
License: [LICENSE]

Sections needed:

1. **Short Description** (150 characters max)
2. **Long Description**
   - What it does
   - Key features (bullet points)
   - Use cases
3. **Installation**
   - Automated
   - Manual
   - Configuration
4. **Frequently Asked Questions** (minimum 5)
5. **Screenshots** (captions for each)
6. **Changelog** (last 5 versions)
7. **Upgrade Notice** (if applicable)

Follow WordPress.org readme.txt standards:
- Use = Section = for H1
- Use == Section == for H2
- Use = Section = for H3
- Proper formatting for lists
- Links in parentheses
- Proper tag format

Output valid readme.txt that will pass WordPress.org validation.
```

---

## Changelog Prompts

### 13. Generate Changelog Entry

#### Context
Create properly formatted changelog entries following Keep a Changelog format.

#### Prompt

```
Create a changelog entry for my WordPress plugin following Keep a Changelog format.

Version: [VERSION_NUMBER]
Release Date: [DATE]
Type: [Major/Minor/Patch]

Changes made:
- [Change 1]
- [Change 2]
- [Change 3]

Create changelog entry with categories:
- **Added** - New features
- **Changed** - Changes to existing features
- **Deprecated** - Soon-to-be-removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security fixes

Format:
```markdown
## [VERSION] - YYYY-MM-DD

### Added
- Feature description (#PR_NUMBER)

### Changed
- Change description (#PR_NUMBER)

### Fixed
- Bug fix description (#PR_NUMBER)

### Security
- Security fix description (do not detail vulnerability)
```

Include:
- Semantic version
- Date in ISO format
- Clear descriptions
- PR/issue references
- Breaking changes clearly marked
- Migration guides if needed
```

---

### 14. Update All Changelogs

#### Context
Sync changelogs across multiple files (CHANGELOG.md, readme.txt, readme.md).

#### Prompt

```
Update all changelog files for my WordPress plugin release.

Plugin: [PLUGIN_NAME]
Version: [VERSION]
Date: [DATE]
Changes: [PASTE_CHANGELOG_ENTRY]

Update these files consistently:

1. **CHANGELOG.md** (full history, Keep a Changelog format)
2. **readme.txt** (last 5 versions, WordPress format)
3. **README.md** (last 3 versions, brief format)
4. **Upgrade Notice** in readme.txt (if breaking changes)

Ensure:
- Version numbers match
- Dates are consistent
- Format is correct for each file type
- Breaking changes are highlighted
- Security fixes don't reveal vulnerabilities

Output changes for each file separately, ready to copy/paste.
```

---

## Support Documentation

### 15. Generate FAQ from Support Tickets

#### Context
Convert common support questions into FAQ documentation.

#### Prompt

```
Create FAQ documentation from these common support questions.

Plugin: [PLUGIN_NAME]

Common Support Questions:
1. [Question 1]
2. [Question 2]
3. [Question 3]
...

For each question, create:
- Clear, concise question
- Detailed answer with steps
- Code examples (if applicable)
- Screenshots needed (describe)
- Links to related docs
- Troubleshooting tips

Categories:
- Installation & Setup
- Configuration
- Features & Usage
- Troubleshooting
- Compatibility
- Development
- Performance

Format:
- Markdown with headings
- Collapsible sections (if HTML allowed)
- Code blocks with syntax highlighting
- Internal links for navigation
- External links for resources

Also suggest:
- Related documentation to create
- Common issues to add to SUPPORT.md
- Potential plugin improvements based on questions
```

---

### 16. Generate Troubleshooting Guide

#### Context
Create a comprehensive troubleshooting guide for common issues.

#### Prompt

```
Create a troubleshooting guide for my WordPress plugin.

Plugin: [PLUGIN_NAME]

Cover these common issues:
1. [Issue 1]
2. [Issue 2]
3. [Issue 3]

For each issue, provide:

**Problem:**
- Symptoms
- Error messages
- When it occurs

**Causes:**
- Most common reasons
- Environmental factors
- Conflicts

**Solutions:**
1. Quick fix (if available)
2. Step-by-step resolution
3. Code fixes (if needed)
4. When to contact support

Also include:
- General troubleshooting steps
- How to enable debug mode
- How to check error logs
- How to check for conflicts
- System requirements checklist
- How to gather diagnostic info

Format as searchable documentation with:
- Table of contents
- Clear headings
- Code examples
- Command-line instructions
- Screenshots descriptions
```

---

## Quick Reference

### Template Locations

All templates are in `/templates/` directory:

```
templates/
├── community/
│   ├── CONTRIBUTING-TEMPLATE.md
│   ├── SECURITY-TEMPLATE.md
│   └── SUPPORT-TEMPLATE.md
└── github/
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md
    │   ├── feature_request.md
    │   ├── question.md
    │   └── config.yml
    └── PULL_REQUEST_TEMPLATE.md
```

### Using Templates

1. Copy template to your project
2. Search and replace placeholders:
   - `[PLUGIN_NAME]`
   - `[GITHUB_USERNAME]`
   - `[PLUGIN_SLUG]`
   - `[MIN_WP_VERSION]`
   - `[MIN_PHP_VERSION]`
   - etc.
3. Customize content for your project
4. Commit to repository

### Quick Start Commands

```bash
# Copy all community files
cp templates/community/* .

# Copy GitHub templates
cp -r templates/github/.github .

# Replace placeholders (macOS/Linux)
find . -type f -name "*.md" -exec sed -i '' \
  -e 's/\[PLUGIN_NAME\]/My Plugin/g' \
  -e 's/\[GITHUB_USERNAME\]/myusername/g' \
  -e 's/\[PLUGIN_SLUG\]/my-plugin/g' {} +

# On Linux (slightly different syntax)
find . -type f -name "*.md" -exec sed -i \
  -e 's/\[PLUGIN_NAME\]/My Plugin/g' {} +
```

---

## Related Resources

- [SCREENSHOT-DOCUMENTATION-GUIDE.md](SCREENSHOT-DOCUMENTATION-GUIDE.md) - Complete screenshot guide
- [TESTING-AUTOMATION-PROMPTS.md](TESTING-AUTOMATION-PROMPTS.md) - Testing and QA prompts
- [DEVELOPMENT-LIFECYCLE.md](DEVELOPMENT-LIFECYCLE.md) - Complete development workflow
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute to wp-dev-prompts

---

**Last Updated:** December 10, 2024
**Version:** 1.0.0
