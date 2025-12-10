# Contributing to WordPress Development Prompts

First off, thank you for considering contributing to this project! It's people like you that make this resource valuable for the WordPress community.

## 🌟 How You Can Contribute

There are many ways to contribute:

- 🤖 **Add AI Prompts** - Share prompts that work well for you
- 📝 **Improve Documentation** - Fix typos, clarify instructions, add examples
- 🧪 **Enhance Testing Framework** - Add new tools, improve workflows
- 🐛 **Report Bugs** - Found an issue? Let us know
- 💡 **Suggest Features** - Have an idea? We'd love to hear it
- ✅ **Share Use Cases** - Tell us how you're using these resources

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Contribution Guidelines](#contribution-guidelines)
5. [Style Guide](#style-guide)
6. [Commit Message Guidelines](#commit-message-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Community](#community)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## Getting Started

### Prerequisites

- Git installed locally
- GitHub account
- Text editor (VS Code, Sublime, etc.)
- Basic understanding of Markdown

### Fork and Clone

```bash
# 1. Fork the repository on GitHub (click "Fork" button)

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/wp-dev-prompts.git
cd wp-dev-prompts

# 3. Add upstream remote
git remote add upstream https://github.com/courtneyr-dev/wp-dev-prompts.git

# 4. Verify remotes
git remote -v
```

---

## How to Contribute

### Reporting Bugs

**Before submitting a bug report:**
- Check the [existing issues](https://github.com/courtneyr-dev/wp-dev-prompts/issues)
- Ensure you're using the latest version
- Collect relevant information

**Submit a bug report:**
1. Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md)
2. Provide a clear title
3. Include steps to reproduce
4. Describe expected vs. actual behavior
5. Add relevant screenshots or logs

### Suggesting Features

**Before suggesting a feature:**
- Check if it's already been suggested
- Consider if it fits the project scope
- Think about implementation

**Submit a feature request:**
1. Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md)
2. Explain the problem it solves
3. Describe your proposed solution
4. Provide examples or mockups
5. Explain alternatives considered

### Contributing Code or Documentation

**Types of contributions we accept:**

#### 1. AI Prompts

Add prompts for:
- WordPress plugin development
- Theme development
- Block development
- Testing scenarios
- Security auditing
- Performance optimization
- Accessibility testing

**Prompt Requirements:**
- Follow the established template
- Include clear context
- Specify variables to customize
- Provide expected output
- Add usage notes

#### 2. Documentation

Improve:
- README files
- Setup guides
- Workflow documentation
- Code comments
- Examples and tutorials

#### 3. Testing Resources

Add or improve:
- Test configuration templates
- GitHub Actions workflows
- Testing scripts
- QA checklists

#### 4. Workflow Guides

Contribute:
- Development workflows
- Best practices
- Real-world examples
- Case studies

---

## Contribution Guidelines

### General Guidelines

✅ **DO:**
- Follow the existing file structure
- Use clear, descriptive names
- Write concise, clear documentation
- Test your changes
- Update relevant documentation
- Reference related issues
- Be respectful and professional

❌ **DON'T:**
- Submit AI-generated content without review
- Copy content without attribution
- Include sensitive information (API keys, passwords)
- Submit incomplete work
- Ignore feedback from reviewers

### File Organization

```
wp-dev-prompts/
├── prompts/                    # AI prompts organized by category
│   ├── plugin-development/
│   ├── theme-development/
│   ├── block-development/
│   ├── testing/
│   └── security/
├── workflows/                  # Development workflow guides
├── templates/                  # Templates for various files
├── github-workflows/          # GitHub Actions templates
└── .github/                   # GitHub community files
```

### Naming Conventions

**Files:**
- Use `kebab-case` for filenames
- Markdown files: `my-prompt-name.md`
- Shell scripts: `my-script.sh`
- Config files: Follow convention (e.g., `.eslintrc.js`)

**Git Branches:**
- Feature: `feature/add-amazing-prompt`
- Bug fix: `fix/broken-link-in-readme`
- Documentation: `docs/improve-setup-guide`
- Workflow: `workflow/add-security-check`

---

## Style Guide

### Markdown Style

**Headings:**
```markdown
# H1 - Document Title
## H2 - Major Section
### H3 - Subsection
#### H4 - Minor Section
```

**Lists:**
```markdown
- Unordered lists use hyphens
- Keep consistent indentation
- Use sub-bullets when needed
  - Like this
  - And this

1. Ordered lists use numbers
2. Auto-numbering is fine
3. Be consistent
```

**Code Blocks:**
````markdown
```bash
# Always specify language
git commit -m "message"
```

```php
// PHP example
function example() {
    return true;
}
```
````

**Links:**
```markdown
[Descriptive text](https://example.com)
[Relative link](./other-file.md)
[Section link](#section-heading)
```

**Emphasis:**
```markdown
**Bold** for strong emphasis
*Italic* for regular emphasis
`code` for inline code
```

### Prompt Template Format

Follow this structure for all AI prompts:

```markdown
# [Prompt Title]

## Context
Brief description of what this prompt does and when to use it.

## Prompt

```
[The actual prompt text that users will copy]

Variables to customize:
- [VARIABLE_NAME]: Description of what to replace
- [ANOTHER_VAR]: What this represents
```

## Variables to Customize

- `[VARIABLE_NAME]`: Detailed explanation
- `[ANOTHER_VAR]`: What to enter here
- `[OPTIONAL_VAR]`: (Optional) When to use this

## Expected Output

Describe what the AI should generate:
- Type of code or documentation
- Structure of response
- What files or sections to expect

## Example

Show a real example of the prompt in use:

### Input:
```
[Filled-in prompt with real values]
```

### Output:
```
[Example of what AI might generate]
```

## Notes

Additional tips:
- When to use this prompt
- Common variations
- Related prompts
- Troubleshooting tips

## Related Resources

- [Link to related prompt](./related-prompt.md)
- [WordPress documentation](https://developer.wordpress.org/)
```

### Code Style

**Shell Scripts:**
```bash
#!/bin/bash
# Script description
# Usage: script.sh [options]

set -e  # Exit on error

# Use descriptive variable names
PLUGIN_NAME="example"

# Comment non-obvious code
function main() {
    # Function description
    echo "Doing something"
}

main "$@"
```

**Configuration Files:**
- Follow WordPress Coding Standards for PHP
- Follow Airbnb style for JavaScript
- Use consistent indentation (tabs for PHP, 2 spaces for JS)
- Include comments explaining complex configuration

---

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature or prompt
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Scopes

- `prompts`: AI prompts
- `workflows`: Development workflows
- `testing`: Testing infrastructure
- `ci`: GitHub Actions and CI/CD
- `docs`: Documentation

### Examples

```bash
# Feature addition
git commit -m "feat(prompts): Add Gutenberg block development prompt"

# Bug fix
git commit -m "fix(workflows): Correct GitHub Actions syntax error"

# Documentation
git commit -m "docs(readme): Update installation instructions"

# With body and footer
git commit -m "feat(testing): Add visual regression workflow

- Add Playwright configuration
- Include screenshot comparison
- Set up GitHub Actions integration

Closes #123"
```

### Commit Message Rules

✅ **DO:**
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Capitalize first letter of subject
- Limit subject line to 50 characters
- Wrap body at 72 characters
- Reference issues and PRs

❌ **DON'T:**
- End subject line with a period
- Use vague messages like "Update files"
- Commit multiple unrelated changes together
- Include WIP commits in PRs

---

## Pull Request Process

### Before Submitting

**Checklist:**
- [ ] Code/docs follow style guidelines
- [ ] Tested changes locally
- [ ] Updated relevant documentation
- [ ] Added/updated examples if needed
- [ ] Commits follow commit message guidelines
- [ ] Branch is up to date with main
- [ ] No merge conflicts
- [ ] Self-reviewed changes

### Creating a Pull Request

1. **Push your changes:**
   ```bash
   git push origin feature/your-branch-name
   ```

2. **Create PR on GitHub:**
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Link related issues

3. **PR Title Format:**
   ```
   <type>(<scope>): Brief description
   ```

   Examples:
   - `feat(prompts): Add security audit prompt`
   - `docs(testing): Improve setup guide clarity`
   - `fix(ci): Resolve GitHub Actions workflow error`

4. **PR Description:**

   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Documentation update
   - [ ] Breaking change

   ## Related Issues
   Closes #123
   Related to #456

   ## Testing
   How to test these changes

   ## Screenshots (if applicable)
   [Add screenshots]

   ## Checklist
   - [x] Self-reviewed
   - [x] Follows style guidelines
   - [x] Documentation updated
   - [x] No breaking changes (or documented if so)
   ```

### Review Process

**What to expect:**
1. Automated checks run (if applicable)
2. Maintainer reviews within 2-7 days
3. Feedback provided via comments
4. Revisions requested if needed
5. Approval and merge

**During review:**
- Respond to feedback promptly
- Make requested changes
- Push additional commits
- Mark conversations as resolved
- Be open to suggestions

### After Merge

1. **Delete your branch:**
   ```bash
   git checkout main
   git pull upstream main
   git branch -d feature/your-branch-name
   git push origin --delete feature/your-branch-name
   ```

2. **Update your fork:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   git push origin main
   ```

3. **Celebrate!** 🎉 You've contributed to the project!

---

## Community

### Getting Help

**Questions about contributing?**
- Open a [Discussion](https://github.com/courtneyr-dev/wp-dev-prompts/discussions)
- Check existing [Issues](https://github.com/courtneyr-dev/wp-dev-prompts/issues)
- Read the [Documentation](./README.md)

**Need support using the resources?**
- Check [SUPPORT.md](./SUPPORT.md)
- Search [existing discussions](https://github.com/courtneyr-dev/wp-dev-prompts/discussions)
- Ask in [WordPress Slack](https://make.wordpress.org/chat/)

### Recognition

Contributors are recognized in:
- [Contributors list](https://github.com/courtneyr-dev/wp-dev-prompts/graphs/contributors)
- Release notes for significant contributions
- Project README (for major contributions)

### Maintainer Responsibilities

**Maintainers will:**
- Review PRs within 7 days
- Provide constructive feedback
- Help with questions
- Keep discussions respectful
- Triage issues
- Maintain project quality

---

## FAQ

**Q: I'm new to open source. Can I still contribute?**
A: Absolutely! Start with documentation improvements or adding prompts. Everyone starts somewhere.

**Q: How do I know what to work on?**
A: Check [Issues](https://github.com/courtneyr-dev/wp-dev-prompts/issues) labeled `good first issue` or `help wanted`.

**Q: Can I contribute prompts for paid tools?**
A: Yes, but note that they require paid services. Focus on free/open-source tools when possible.

**Q: How do I test my changes?**
A: For documentation, preview Markdown locally. For scripts, test in a safe environment.

**Q: What if my PR is rejected?**
A: Don't take it personally! Ask for feedback, learn from it, and try again.

**Q: Can I submit AI-generated content?**
A: Yes, but review and test it thoroughly. You're responsible for what you submit.

**Q: How do I update my PR after feedback?**
A: Make changes locally, commit them, and push to your branch. The PR updates automatically.

**Q: Can I work on multiple things at once?**
A: Yes, but use separate branches for each. One PR per feature/fix.

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (CC0 1.0 Universal - Public Domain).

---

## Thank You!

Your contributions make this project better for everyone. Whether you're fixing a typo or adding major features, every contribution matters.

**Happy contributing!** 🚀

---

**Questions?** Open an issue or discussion, and we'll help you out!

[⬆ Back to Top](#contributing-to-wordpress-development-prompts)
