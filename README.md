# 🚀 WordPress Development Prompts & Testing Framework

**A comprehensive collection of AI prompts, workflows, and testing automation for professional WordPress development.**

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![WordPress](https://img.shields.io/badge/WordPress-6.5+-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-8.0+-purple.svg)](https://www.php.net/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contributing)

---

## 📖 About This Repository

This repository is your complete toolkit for professional WordPress development, combining:

- 🤖 **AI-Powered Prompts** - Battle-tested prompts for themes, plugins, and blocks
- 🧪 **Testing Automation** - Production-ready testing infrastructure covering 21 quality dimensions
- 📋 **Development Workflows** - Complete guides from planning to WordPress.org submission
- 🎨 **Blueprint Templates** - WordPress Playground integration for demos and testing
- ✅ **QA Checklists** - Comprehensive manual testing protocols

Whether you're building your first plugin or managing enterprise WordPress projects, this repository provides the prompts, automation, and workflows you need to ship quality code with confidence.

---

## ✨ Key Features

### 🤖 AI Integration Ready

Work seamlessly with modern AI assistants:
- ✅ **Claude** (Anthropic) - Optimized for complex configurations
- ✅ **ChatGPT** (OpenAI) - Great for quick setups
- ✅ **GitHub Copilot** - Inline code suggestions
- ✅ **Cursor** - Full IDE integration
- ✅ **Any AI assistant** that accepts text prompts

### 🧪 Complete Testing Coverage

**21 testing dimensions** covered by our automation framework:
- **PHP**: Unit tests, integration tests, PHPCS, PHPStan, compatibility
- **JavaScript**: ESLint, Jest, TypeScript, Stylelint
- **Security**: SAST, dependency scanning, sanitization validation
- **Accessibility**: WCAG 2.1 AA compliance with axe-core
- **Performance**: Lighthouse CI with budget enforcement
- **WordPress-Specific**: Plugin Check, i18n, enqueueing patterns

### 📚 Production-Ready Resources

All resources are based on real-world WordPress development experience:
- Used in production projects
- WordPress 6.7+ compatible
- PHP 8.0+ optimized
- Follows WordPress Coding Standards
- GPL-compatible

---

## 📂 Repository Structure

### 🧪 Testing Automation Framework

**Your complete testing infrastructure in one package.**

| Resource | Description | Size |
|----------|-------------|------|
| **[TESTING-README.md](./TESTING-README.md)** | 📖 Main overview - Start here | 12 KB |
| **[TESTING-AUTOMATION-PROMPTS.md](./TESTING-AUTOMATION-PROMPTS.md)** | 🤖 24 AI prompts for testing | 39 KB |
| **[TESTING-SETUP-GUIDE.md](./TESTING-SETUP-GUIDE.md)** | 📝 Step-by-step setup | 26 KB |
| **[TESTING-QUICK-REFERENCE.md](./TESTING-QUICK-REFERENCE.md)** | ⚡ Command cheat sheet | 12 KB |
| **[QA-TESTING-CHECKLIST.md](./QA-TESTING-CHECKLIST.md)** | ✅ Manual QA protocol | 20 KB |
| **[setup-testing.sh](./setup-testing.sh)** | 🔧 Automated setup script | 17 KB |

**GitHub Actions Workflows** (`github-workflows/`):
- `wordpress-plugin-ci.yml` - Complete CI/CD pipeline
- `visual-regression-testing.yml` - Visual regression tests
- `dependabot-auto-merge.yml` - Auto-merge safe updates

**Configuration** (`.github/`):
- `dependabot.yml` - Dependency automation
- `workflows/` - Ready-to-use workflows

### 📋 Development Workflows & Guides

| Resource | Description | Size |
|----------|-------------|------|
| **[DEVELOPMENT-LIFECYCLE.md](./DEVELOPMENT-LIFECYCLE.md)** | 🔄 Complete dev lifecycle | 53 KB |
| **[PLUGIN-DEVELOPMENT-WORKFLOW.md](./PLUGIN-DEVELOPMENT-WORKFLOW.md)** | 📘 Complete plugin dev guide | 106 KB |
| **[USER-STORY-TEMPLATE.md](./USER-STORY-TEMPLATE.md)** | 📝 User story templates | 25 KB |
| **[DOCUMENTATION-WORKFLOW.md](./DOCUMENTATION-WORKFLOW.md)** | 📚 Documentation process | 45 KB |
| **[SCREENSHOT-DOCUMENTATION-GUIDE.md](./SCREENSHOT-DOCUMENTATION-GUIDE.md)** | 📸 Screenshot best practices | 35 KB |
| **[BLUEPRINT-CREATION-GUIDE.md](./BLUEPRINT-CREATION-GUIDE.md)** | 🎯 WordPress Playground blueprints | 3.7 KB |
| **[BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md](./BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md)** | 🤖 Automated screenshots | 12 KB |
| **[VISUAL-REGRESSION-TESTING-TEMPLATE.md](./VISUAL-REGRESSION-TESTING-TEMPLATE.md)** | 👁️ Visual testing template | 16 KB |
| **[product-research.md](./product-research.md)** | 🔍 Product research insights | 101 KB |

### 🎨 AI Prompts Collection

| Resource | Description | Size |
|----------|-------------|------|
| **[TESTING-AUTOMATION-PROMPTS.md](./TESTING-AUTOMATION-PROMPTS.md)** | 🧪 24 testing prompts | 39 KB |
| **[COMMUNITY-FILES-PROMPTS.md](./COMMUNITY-FILES-PROMPTS.md)** | 📝 Documentation & community file prompts | 35 KB |

### 📑 Templates & Community Files

**Ready-to-use templates** (`templates/` directory):

**Community Templates** (`templates/community/`):
- `CONTRIBUTING-TEMPLATE.md` - Contributing guidelines
- `SECURITY-TEMPLATE.md` - Security policy
- `SUPPORT-TEMPLATE.md` - Support documentation

**GitHub Templates** (`templates/github/`):
- `ISSUE_TEMPLATE/` - Bug reports, feature requests, questions
- `PULL_REQUEST_TEMPLATE.md` - PR template with checklists
- `config.yml` - Issue template configuration

---

## 🚀 Quick Start

### Option 1: Testing Framework Setup (Most Popular)

Set up complete testing automation for your WordPress plugin or theme:

```bash
# 1. Clone this repository
git clone https://github.com/courtneyr-dev/wp-dev-prompts.git
cd wp-dev-prompts

# 2. Navigate to your plugin/theme directory
cd /path/to/your/wordpress-plugin

# 3. Copy and run the setup script
cp /path/to/wp-dev-prompts/setup-testing.sh .
bash setup-testing.sh --plugin-name="My Plugin" --text-domain="my-plugin"

# 4. Install WordPress test suite
bash bin/install-wp-tests.sh wordpress_test root root localhost latest

# 5. Start testing!
composer test
npm run test:unit
npm run env:start  # Start local WordPress environment
```

**Result**: Complete testing infrastructure with PHPUnit, PHPCS, PHPStan, ESLint, Jest, and GitHub Actions CI/CD.

### Option 2: Use AI Prompts

Generate custom configurations using AI assistants:

```bash
# 1. Open the prompts file
open TESTING-AUTOMATION-PROMPTS.md

# 2. Find the relevant prompt (e.g., "Initial Project Testing Setup")

# 3. Copy and customize with your project details

# 4. Paste into Claude, ChatGPT, or your AI assistant

# 5. Review and apply the generated code
```

### Option 3: Manual Setup

Follow the detailed guide:

```bash
# Read the comprehensive setup guide
open TESTING-SETUP-GUIDE.md

# Follow step-by-step instructions for:
# - PHP testing (PHPUnit, PHPCS, PHPStan)
# - JavaScript testing (ESLint, Jest, Playwright)
# - GitHub Actions CI/CD
# - Pre-commit hooks
# - Local development environment
```

---

## 📚 Documentation Guide

### 🆕 New to WordPress Testing?

**Start here:**

1. 📖 **[TESTING-README.md](./TESTING-README.md)** - Understand what's included
2. 🔧 **Run [setup-testing.sh](./setup-testing.sh)** - Get set up in minutes
3. ⚡ **Bookmark [TESTING-QUICK-REFERENCE.md](./TESTING-QUICK-REFERENCE.md)** - Daily commands
4. 🤖 **Use [TESTING-AUTOMATION-PROMPTS.md](./TESTING-AUTOMATION-PROMPTS.md)** - When you need AI help

### 👨‍💻 Building a Plugin?

**Follow this path:**

1. 📝 **[USER-STORY-TEMPLATE.md](./USER-STORY-TEMPLATE.md)** - Plan features with user stories
2. 📘 **[PLUGIN-DEVELOPMENT-WORKFLOW.md](./PLUGIN-DEVELOPMENT-WORKFLOW.md)** - Complete dev process
3. 🧪 **[TESTING-SETUP-GUIDE.md](./TESTING-SETUP-GUIDE.md)** - Add testing infrastructure
4. 📚 **[DOCUMENTATION-WORKFLOW.md](./DOCUMENTATION-WORKFLOW.md)** - Document with automated screenshots
5. 🎯 **[BLUEPRINT-CREATION-GUIDE.md](./BLUEPRINT-CREATION-GUIDE.md)** - Create Playground demo
6. ✅ **[QA-TESTING-CHECKLIST.md](./QA-TESTING-CHECKLIST.md)** - Pre-release validation

### 🎨 Working on a Theme?

**Your workflow:**

1. 📝 **[USER-STORY-TEMPLATE.md](./USER-STORY-TEMPLATE.md)** - Plan features and layouts
2. 📘 Adapt **[PLUGIN-DEVELOPMENT-WORKFLOW.md](./PLUGIN-DEVELOPMENT-WORKFLOW.md)** for themes
3. 👁️ **[VISUAL-REGRESSION-TESTING-TEMPLATE.md](./VISUAL-REGRESSION-TESTING-TEMPLATE.md)** - Visual testing
4. 📚 **[DOCUMENTATION-WORKFLOW.md](./DOCUMENTATION-WORKFLOW.md)** - Create theme documentation
5. 📸 **[SCREENSHOT-DOCUMENTATION-GUIDE.md](./SCREENSHOT-DOCUMENTATION-GUIDE.md)** - Theme screenshots
6. 🧪 **[TESTING-SETUP-GUIDE.md](./TESTING-SETUP-GUIDE.md)** - Testing infrastructure
7. ✅ **[QA-TESTING-CHECKLIST.md](./QA-TESTING-CHECKLIST.md)** - Theme-specific QA

### 🚀 Setting Up CI/CD?

**GitHub Actions ready:**

1. Copy workflows from `github-workflows/` to `.github/workflows/`
2. Customize for your project (plugin name, versions, etc.)
3. Add GitHub secrets (SVN credentials, Codecov token)
4. Push and watch automated testing run!

---

## 🎯 Use Cases & Examples

### For Solo Plugin Developers

```bash
# Quick daily workflow
composer test           # Run PHP tests
npm run test:unit      # Run JS tests
git commit             # Pre-commit hooks run automatically
git push               # GitHub Actions runs full CI

# Before release
composer full-check                 # All automated tests
# Complete QA-TESTING-CHECKLIST.md  # Manual testing
git tag v1.0.0 && git push --tags  # Auto-deploy!
```

### For Development Teams

```bash
# Team member clones repo
git clone your-plugin-repo
composer install && npm install

# Local development
npm run env:start      # Everyone uses same wp-env config
composer test          # Tests run locally before PR

# Pull request
git push               # GitHub Actions runs automatically
# Code review + Tests must pass
# Dependabot keeps dependencies updated
```

### For Theme Shops

```bash
# Set up visual regression testing
npm run test:visual    # Screenshot comparison
npm run test:a11y      # Accessibility compliance
npm run test:e2e       # User flow testing

# Theme unit testing
npm run env:cli -- import theme-unit-test.xml
npm run test:visual -- --update-snapshots

# Multi-theme testing in CI
# Matrix strategy tests across multiple themes
```

### For WordPress Agencies

```bash
# Standardize across projects
cp setup-testing.sh ~/agency-scripts/
# All projects use same testing standards

# Client project setup
bash ~/agency-scripts/setup-testing.sh --plugin-name="Client Plugin"

# Continuous monitoring
# Dependabot: Automated security updates
# GitHub Actions: Every commit tested
# Codecov: Track coverage trends
```

---

## 🧪 Testing Framework Highlights

### What Makes This Different?

✅ **Complete Coverage** - All 21 quality dimensions in one package
✅ **Production-Ready** - Used in real WordPress.org plugins
✅ **AI-Powered** - 24 specialized prompts for every scenario
✅ **Automated Setup** - One script sets up everything
✅ **GitHub Actions** - Copy-paste CI/CD workflows
✅ **Zero Configuration** - Sensible defaults, customize as needed
✅ **Well Documented** - Comprehensive guides and examples
✅ **Actively Maintained** - Based on latest WordPress standards

### Testing Metrics & Targets

| Metric | Target | Tool |
|--------|--------|------|
| Code Coverage | 60%+ | PHPUnit + Codecov |
| PHPCS Errors | 0 | PHP_CodeSniffer |
| PHPStan Level | 5+ | PHPStan |
| Security Issues | 0 Critical/High | Trivy + Audit |
| Accessibility Score | 90+ | axe-core |
| Performance Score | 60+ | Lighthouse CI |
| Bundle Size (JS) | <300KB | webpack |
| Bundle Size (CSS) | <100KB | Built-in |

### Tools & Technologies

**PHP Stack:**
- PHPUnit 9.6 with Yoast PHPUnit Polyfills
- PHP_CodeSniffer 3.9 with WordPress Coding Standards 3.x
- PHPStan 2.0 with WordPress stubs
- PHPCompatibilityWP for version checking
- Psalm (optional) for taint analysis

**JavaScript Stack:**
- @wordpress/scripts 28.0+ (webpack, Babel, ESLint, Jest)
- @wordpress/env for local development
- Playwright for E2E testing
- @axe-core/playwright for accessibility
- Lighthouse CI for performance

**CI/CD:**
- GitHub Actions with matrix testing
- Dependabot for dependency updates
- Codecov for coverage tracking
- Trivy for security scanning

---

## 🤖 AI-Powered Development

### How to Use the Prompts

1. **Find Your Scenario**
   - Browse [TESTING-AUTOMATION-PROMPTS.md](./TESTING-AUTOMATION-PROMPTS.md)
   - Each prompt is organized by category
   - 24 prompts covering every testing scenario

2. **Customize Variables**
   ```markdown
   # Before
   Plugin name: [YOUR_PLUGIN_NAME]
   Text domain: [your-text-domain]

   # After
   Plugin name: Amazing Plugin
   Text domain: amazing-plugin
   ```

3. **Use with AI Assistant**
   - Copy the customized prompt
   - Paste into Claude, ChatGPT, etc.
   - Review generated code
   - Apply to your project

4. **Iterate & Improve**
   - Test the generated code
   - Ask follow-up questions
   - Refine as needed

### Example Workflow

```
You → AI: [Paste "PHPCS Configuration" prompt with your details]
AI → You: [Generates complete .phpcs.xml.dist file]
You → Terminal: ./vendor/bin/phpcs
Terminal → You: [Shows linting results]
You → AI: "How do I fix WordPress.Security.EscapeOutput errors?"
AI → You: [Explains and provides code examples]
```

### Supported AI Assistants

| Assistant | Best For | Notes |
|-----------|----------|-------|
| **Claude** | Complex configs, architecture | Excellent for system prompts |
| **ChatGPT** | Quick setups, explanations | Fast and versatile |
| **GitHub Copilot** | Inline suggestions | Great in IDE |
| **Cursor** | Full codebase context | IDE integration |
| **Codeium** | Free alternative | Good for basics |

---

## 📋 Complete Feature List

### Testing Automation ✅

- [x] PHPUnit unit and integration tests
- [x] PHPCS with WordPress Coding Standards 3.x
- [x] PHPStan static analysis (level 5-9)
- [x] ESLint with @wordpress/eslint-plugin
- [x] Jest for JavaScript unit tests
- [x] Playwright for E2E testing
- [x] Stylelint for CSS
- [x] TypeScript support
- [x] Security scanning (Trivy, Psalm taint analysis)
- [x] Dependency vulnerability scanning
- [x] Accessibility testing (axe-core, WCAG 2.1 AA)
- [x] Performance testing (Lighthouse CI)
- [x] Visual regression testing
- [x] WordPress Plugin Check integration
- [x] Internationalization validation
- [x] Code complexity analysis
- [x] PHP compatibility checks
- [x] Pre-commit hooks (Husky)
- [x] GitHub Actions CI/CD
- [x] Dependabot automation
- [x] Auto-merge safe updates

### Development Guides ✅

- [x] Complete plugin development workflow
- [x] WordPress Playground blueprint creation
- [x] Visual regression testing setup
- [x] Playwright screenshot automation
- [x] Product research template
- [x] QA testing checklist

### AI Integration ✅

- [x] 24 testing scenario prompts
- [x] Configuration generation prompts
- [x] Troubleshooting prompts
- [x] Best practices prompts

### Coming Soon 🔜

- [ ] Theme development prompt library
- [ ] Block development prompts
- [ ] Custom post type generators
- [ ] REST API endpoint templates
- [ ] Security audit prompts
- [ ] Performance optimization guides
- [ ] WooCommerce integration prompts
- [ ] Multisite development guides

---

## 💻 Installation & Setup

### Prerequisites

```bash
# Required
php >= 8.0
composer >= 2.0
node >= 20.0
npm >= 9.0
git

# Optional but recommended
docker  # For wp-env
jq      # For JSON manipulation in scripts
```

### Verify Installation

```bash
php --version      # Should be 8.0+
composer --version # Should be 2.0+
node --version     # Should be 20.0+
npm --version      # Should be 9.0+
```

### Quick Install

```bash
# 1. Clone repository
git clone https://github.com/courtneyr-dev/wp-dev-prompts.git
cd wp-dev-prompts

# 2. Make setup script executable
chmod +x setup-testing.sh

# 3. Run setup (interactive mode)
bash setup-testing.sh --interactive

# 4. Or run with parameters
bash setup-testing.sh \
  --plugin-name="My Plugin" \
  --text-domain="my-plugin" \
  --prefix="my_plugin" \
  --min-wp="6.5" \
  --min-php="8.0"
```

---

## 🔧 Configuration

### Customizing the Setup

All configuration files have sensible defaults but can be customized:

**PHP Testing:**
- `phpunit.xml.dist` - Test suites, coverage settings
- `.phpcs.xml.dist` - Coding standards rules
- `phpstan.neon` - Static analysis level and paths

**JavaScript Testing:**
- `.eslintrc.js` - ESLint rules
- `.stylelintrc.json` - CSS linting rules
- `jest.config.js` - Jest configuration
- `playwright.config.js` - E2E test settings

**Development:**
- `.wp-env.json` - Local WordPress environment
- `composer.json` - PHP dependencies and scripts
- `package.json` - npm dependencies and scripts

**CI/CD:**
- `.github/workflows/ci.yml` - Main CI pipeline
- `.github/dependabot.yml` - Dependency updates

### Environment Variables

```bash
# WordPress test suite location
export WP_TESTS_DIR=/tmp/wordpress-tests-lib

# Coverage reporting
export CODECOV_TOKEN=your-token

# Performance testing
export LHCI_GITHUB_APP_TOKEN=your-token
```

---

## 📊 Project Statistics

- **Total Files**: 12 core documentation files
- **Lines of Code**: 6,900+ lines of guides and automation
- **Testing Dimensions**: 21 quality metrics covered
- **AI Prompts**: 24 specialized scenarios
- **Workflow Templates**: 3 production-ready workflows
- **Configuration Files**: 10+ ready-to-use configs
- **License**: CC0 1.0 Universal (Public Domain)

---

## 🤝 Contributing

We welcome contributions! This project grows with the WordPress community.

### Ways to Contribute

1. **Share Your Prompts**
   - Add prompts that work well for you
   - Follow the established structure
   - Include examples and use cases

2. **Improve Documentation**
   - Fix typos and clarify instructions
   - Add real-world examples
   - Translate to other languages

3. **Enhance Testing Framework**
   - Add new testing tools integration
   - Improve GitHub Actions workflows
   - Share your configuration optimizations

4. **Report Issues**
   - Found a bug? Open an issue
   - Have a suggestion? We'd love to hear it
   - Question about usage? Ask away!

### Contribution Guidelines

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/amazing-prompt

# 3. Make your changes
# 4. Test thoroughly
# 5. Commit with clear message
git commit -m "Add: Amazing prompt for custom post types"

# 6. Push to your fork
git push origin feature/amazing-prompt

# 7. Open a Pull Request
```

### Code of Conduct

- Be respectful and inclusive
- Test your contributions
- Document your changes
- Follow WordPress Coding Standards
- Help others in issues and discussions

---

## 📄 License

This project is licensed under the **CC0 1.0 Universal (Public Domain)** license.

**This means:**
- ✅ Use freely in commercial projects
- ✅ Modify without attribution
- ✅ Redistribute without restriction
- ✅ No warranty or liability

See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Built With Insights From

- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [WordPress Theme Handbook](https://developer.wordpress.org/themes/)
- [PHPUnit Best Practices](https://phpunit.de/documentation.html)
- [WordPress VIP Code Review Standards](https://docs.wpvip.com/technical-references/vip-codebase/)

### Special Thanks

- **WordPress Core Team** - For excellent documentation
- **WordPress Testing Team** - For testing frameworks
- **Yoast** - For PHPUnit Polyfills
- **10up** - For WP_Mock and best practices
- **Automattic** - For @wordpress/scripts
- **Community Contributors** - For feedback and improvements

### Powered By

- [Claude Sonnet 4.5](https://claude.ai/) - AI assistance for prompt generation
- [GitHub Actions](https://github.com/features/actions) - CI/CD automation
- [Codecov](https://codecov.io/) - Coverage reporting
- [Dependabot](https://github.com/dependabot) - Dependency management

---

## 🔗 Resources & Links

### Official WordPress

- [WordPress Developer Resources](https://developer.wordpress.org/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [Plugin Handbook](https://developer.wordpress.org/plugins/)
- [Theme Handbook](https://developer.wordpress.org/themes/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [REST API Handbook](https://developer.wordpress.org/rest-api/)

### Testing Tools

- [PHPUnit Documentation](https://phpunit.de/documentation.html)
- [PHPStan Rules](https://phpstan.org/rules)
- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [wp-env Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)

### Community

- [WordPress Slack](https://make.wordpress.org/chat/) - #core-test channel
- [WordPress Stack Exchange](https://wordpress.stackexchange.com/)
- [WordPress GitHub](https://github.com/WordPress/WordPress)

---

## 📞 Support & Questions

### Getting Help

1. **Documentation** - Check the guides in this repository
2. **GitHub Issues** - [Open an issue](https://github.com/courtneyr-dev/wp-dev-prompts/issues)
3. **WordPress Slack** - Join #core-test channel
4. **Stack Exchange** - Ask on [WordPress StackExchange](https://wordpress.stackexchange.com/)

### FAQ

<details>
<summary><strong>Q: Can I use this for theme development?</strong></summary>

A: Absolutely! While examples focus on plugins, all testing infrastructure works for themes. Adjust paths in configuration files to point to your theme files.
</details>

<details>
<summary><strong>Q: Do I need to use all 21 testing dimensions?</strong></summary>

A: No! Start with the basics (PHPCS, PHPUnit) and add more as needed. The framework is modular - use what makes sense for your project.
</details>

<details>
<summary><strong>Q: Will this work with WordPress Multisite?</strong></summary>

A: Yes! The testing framework includes multisite test configurations. See the setup guide for multisite-specific instructions.
</details>

<details>
<summary><strong>Q: How do I update the framework?</strong></summary>

A: Pull the latest changes from this repository and re-run `setup-testing.sh`. Your custom configurations will be preserved.
</details>

<details>
<summary><strong>Q: Can I use this in commercial projects?</strong></summary>

A: Yes! Everything is licensed under CC0 1.0 Universal (Public Domain). Use freely without attribution.
</details>

<details>
<summary><strong>Q: How do I contribute my own prompts?</strong></summary>

A: Fork the repository, add your prompts following our structure, and submit a pull request. See [Contributing](#-contributing) for details.
</details>

---

## 🎯 Roadmap

### Current Version: 1.0.0

**Completed ✅**
- [x] Complete testing automation framework
- [x] 24 AI prompts for testing scenarios
- [x] Plugin development workflow guide
- [x] GitHub Actions CI/CD templates
- [x] Visual regression testing
- [x] QA checklist
- [x] Automated setup script

### Version 1.1.0 (Q1 2025)

**Planned 🔜**
- [ ] Theme development prompt library
- [ ] Block development prompts
- [ ] WooCommerce integration guide
- [ ] Advanced security testing prompts
- [ ] Performance optimization workflows
- [ ] Multi-language documentation

### Version 1.2.0 (Q2 2025)

**Planned 🔮**
- [ ] Interactive CLI tool
- [ ] VSCode extension
- [ ] Docker-based test environments
- [ ] Cloud CI/CD alternatives (GitLab CI, CircleCI)
- [ ] Advanced monitoring integrations
- [ ] Video tutorials

### Community Requests

Have a feature request? [Open an issue](https://github.com/courtneyr-dev/wp-dev-prompts/issues) with the `enhancement` label!

---

## 🌟 Show Your Support

If this project helps you build better WordPress plugins and themes:

- ⭐ **Star this repository** on GitHub
- 🐦 **Share on Twitter** with #WordPress #Testing
- 📝 **Write a blog post** about your experience
- 💬 **Tell other developers** in the WordPress community
- 🤝 **Contribute** your own prompts and improvements

---

## 📈 Stats & Metrics

![GitHub stars](https://img.shields.io/github/stars/courtneyr-dev/wp-dev-prompts?style=social)
![GitHub forks](https://img.shields.io/github/forks/courtneyr-dev/wp-dev-prompts?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/courtneyr-dev/wp-dev-prompts?style=social)
![GitHub issues](https://img.shields.io/github/issues/courtneyr-dev/wp-dev-prompts)
![GitHub pull requests](https://img.shields.io/github/issues-pr/courtneyr-dev/wp-dev-prompts)
![Last commit](https://img.shields.io/github/last-commit/courtneyr-dev/wp-dev-prompts)

---

## 📝 Changelog

### [1.0.0] - 2024-12-09

**Added:**
- Complete testing automation framework
- 24 AI prompts for testing scenarios
- Automated setup script (setup-testing.sh)
- GitHub Actions workflows (CI/CD, visual regression, auto-merge)
- Dependabot configuration
- Comprehensive documentation (6,900+ lines)
- QA testing checklist
- Quick reference guide
- Setup guide with configuration templates

**Resources:**
- Plugin development workflow guide
- Blueprint creation guides
- Visual regression testing templates
- Product research documentation

---

<div align="center">

**[⬆ back to top](#-wordpress-development-prompts--testing-framework)**

---

Made with ❤️ for the WordPress community

**[Documentation](./TESTING-README.md)** • **[Quick Start](#-quick-start)** • **[Contributing](#-contributing)** • **[License](./LICENSE)**

**Ready to build better WordPress projects?**
[Get Started →](#-quick-start)

</div>
