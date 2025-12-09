# 🚀 WordPress Development Prompts

A curated collection of AI prompts specifically designed for WordPress development. Supercharge your WordPress coding workflow with battle-tested prompts for themes, plugins, blocks, and more.

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![WordPress](https://img.shields.io/badge/WordPress-6.0+-blue.svg)](https://wordpress.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contributing)

## 📖 About

This repository contains a growing collection of Markdown-formatted prompts that I use when developing for WordPress. Each prompt is carefully crafted to help AI assistants provide accurate, WordPress-standard-compliant code and solutions.

### Why Use These Prompts?

- **WordPress-Specific**: Tailored specifically for WordPress development best practices
- **Time-Saving**: Skip the context-setting and jump straight to coding
- **Consistent Quality**: Generate code that follows WordPress Coding Standards
- **Battle-Tested**: Real prompts used in production WordPress projects
- **Copy-Paste Ready**: Just copy, customize parameters, and use

## 📂 Prompt Categories

The prompts in this repository cover various aspects of WordPress development:

### 🎨 **Theme Development**
Prompts for building custom themes, child themes, and theme components

### 🔌 **Plugin Development**
Create custom plugins, shortcodes, widgets, and plugin features

### 🧱 **Block Development**
Build custom Gutenberg blocks using modern JavaScript and React

### 🗄️ **Database & Custom Post Types**
Work with custom post types, taxonomies, and database operations

### 🔧 **WordPress Core Functions**
Leverage hooks, filters, actions, and WordPress APIs

### 🎯 **Performance & Optimization**
Optimize WordPress performance, caching, and database queries

### 🔒 **Security**
Implement WordPress security best practices and sanitization

### 🌐 **REST API & AJAX**
Work with WordPress REST API and AJAX functionality

### 🎨 **Customizer & Settings**
Build theme customizers and admin settings pages

### 🧪 **Testing & Automation** ⭐ NEW!
Complete testing infrastructure for WordPress plugins and themes covering all 21 quality dimensions

## 🧪 Testing Automation Framework

**NEW!** A comprehensive testing automation framework for WordPress plugins and themes. This includes:

- **[TESTING-README.md](./TESTING-README.md)** - Complete overview of the testing framework
- **[TESTING-AUTOMATION-PROMPTS.md](./TESTING-AUTOMATION-PROMPTS.md)** - 24 AI prompts for every testing scenario
- **[TESTING-SETUP-GUIDE.md](./TESTING-SETUP-GUIDE.md)** - Step-by-step setup instructions
- **[TESTING-QUICK-REFERENCE.md](./TESTING-QUICK-REFERENCE.md)** - One-page command reference
- **[QA-TESTING-CHECKLIST.md](./QA-TESTING-CHECKLIST.md)** - Comprehensive manual QA checklist
- **[setup-testing.sh](./setup-testing.sh)** - Automated setup script
- **GitHub Actions Workflows** - Production-ready CI/CD pipelines
- **Dependabot Configuration** - Automated dependency updates

### What's Covered

This testing framework provides complete coverage across:

**PHP Testing**: Unit tests, integration tests, PHPCS, PHPStan, PHP compatibility
**JavaScript Testing**: ESLint, Jest, TypeScript, Stylelint
**Security**: SAST, dependency scanning, sanitization checks, nonce validation
**Accessibility**: WCAG 2.1 AA compliance with axe-core
**Performance**: Lighthouse CI, bundle size checks, query optimization
**WordPress-Specific**: Plugin Check, i18n validation, enqueueing patterns

### Quick Start with Testing

```bash
# Clone this repository
git clone https://github.com/courtneyr-dev/wp-dev-prompts.git
cd wp-dev-prompts

# Run automated setup
bash setup-testing.sh --plugin-name="My Plugin" --text-domain="my-plugin"

# Install WordPress test suite
bash bin/install-wp-tests.sh wordpress_test root root localhost latest

# Start testing!
composer test
npm run test:unit
```

See **[TESTING-README.md](./TESTING-README.md)** for complete documentation.

## 🚀 Quick Start

1. **Browse the prompts** in the relevant category folder
2. **Copy the prompt** you need
3. **Customize** any placeholder variables (marked with `[brackets]`)
4. **Paste** into your AI assistant (ChatGPT, Claude, GitHub Copilot, etc.)
5. **Iterate** on the results as needed

### Example Usage

```markdown
You're a WordPress developer. Create a custom post type called "Portfolio" 
with the following features:
- Support for featured images, editor, and custom fields
- Custom taxonomy called "Project Type"
- Archive page template
- Single post template
Follow WordPress Coding Standards and include proper sanitization.
```

## 📝 Prompt Structure

Each prompt file follows a consistent structure:

```markdown
# [Prompt Title]

## Context
Brief description of what this prompt does

## Prompt
The actual prompt text to use

## Variables to Customize
- `[variable_name]`: Description of what to replace

## Expected Output
What you should expect from the AI assistant

## Notes
Additional tips or considerations
```

## 🤝 Contributing

Contributions are welcome! If you have prompts that have worked well for you:

1. Fork this repository
2. Create a new branch (`git checkout -b add-new-prompt`)
3. Add your prompt following the existing structure
4. Commit your changes (`git commit -am 'Add prompt for [feature]'`)
5. Push to the branch (`git push origin add-new-prompt`)
6. Open a Pull Request

### Contribution Guidelines

- Follow the established prompt structure
- Include clear descriptions and use cases
- Test your prompts before submitting
- One prompt per file for easy discovery
- Use descriptive file names (e.g., `custom-post-type-with-metabox.md`)

## 📋 Best Practices

When using these prompts:

- **Always review generated code** before implementing it
- **Test thoroughly** in a development environment
- **Customize** prompts to match your specific needs
- **Keep WordPress updated** to ensure compatibility
- **Follow WordPress Coding Standards**: [https://developer.wordpress.org/coding-standards/](https://developer.wordpress.org/coding-standards/)
- **Security first**: Always sanitize inputs and escape outputs

## 🛠️ Recommended Tools

These prompts work great with:

- [ChatGPT](https://chat.openai.com/)
- [Claude](https://claude.ai/)
- [GitHub Copilot](https://github.com/features/copilot)
- [Cursor](https://cursor.sh/)
- Any AI coding assistant that accepts text prompts

## 📚 Resources

- [WordPress Developer Resources](https://developer.wordpress.org/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
- [WordPress Theme Handbook](https://developer.wordpress.org/themes/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)

## 📄 License

This project is licensed under the [CC0 1.0 Universal](LICENSE) license - feel free to use these prompts however you'd like, no attribution required.

## 🙏 Acknowledgments

Built with ❤️ for the WordPress developer community. Special thanks to everyone who contributes prompts and improvements.

---

**Note**: These prompts are starting points. Always review, test, and adapt generated code to your specific needs and ensure it follows WordPress best practices and security standards.

## 🔗 Connect

Have questions or suggestions? Feel free to open an issue or contribute to the project!

Happy coding! 🎉
