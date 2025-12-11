# 🚀 WordPress Development Prompts & Testing Framework

**Complete WordPress development toolkit with AI-powered prompts, automated testing, marketing strategies, and production-ready workflows.**

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![WordPress](https://img.shields.io/badge/WordPress-6.5+-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-8.0+-purple.svg)](https://www.php.net/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 🎯 Start Here: New Project?

### **👉 [PROJECT-KICKSTART-PROMPT.md](prompts/PROJECT-KICKSTART-PROMPT.md) 👈**

**The single prompt to rule them all.**

Copy this comprehensive prompt, fill in your project details, and paste into Claude or any AI assistant to:

✅ **Build your plugin/theme** following the complete wp-dev-prompts framework
✅ **Set up testing** for all 21 quality dimensions
✅ **Create documentation** with automated screenshots via WordPress Playground
✅ **Generate community files** (Contributing, Security, Support, GitHub templates)
✅ **Market strategically** with comprehensive marketing playbook and templates
✅ **Deploy confidently** with comprehensive QA and CI/CD

**→ Start here to leverage the entire framework in one conversation.**

---

## 📖 What's Inside

This repository provides everything you need for professional WordPress development:

### 🤖 AI-Powered Development
- **One kickstart prompt** that references the entire framework
- **70+ specialized prompts** for testing, documentation, community files, and marketing
- **Works with Claude, ChatGPT, Copilot, and any AI assistant**

### 🧪 Complete Testing Framework
- **21 quality dimensions**: PHP, JavaScript, security, accessibility, performance
- **Automated setup script**: Configure everything in minutes
- **GitHub Actions CI/CD**: Ready-to-use workflows
- **Pre-commit hooks**: Catch issues before they're committed

### 📚 Production-Ready Workflows
- **Complete lifecycle guide**: From research to post-launch
- **User story templates**: Plan features before coding
- **Documentation workflow**: 5-phase process with automated screenshots
- **WordPress Playground integration**: Blueprints for demos and testing

### 📑 Templates & Community Files
- **Community templates**: Contributing, Security, Support
- **GitHub templates**: Issues, PRs, discussions
- **Workflow templates**: Blueprints, testing, visual regression
- **Marketing templates**: Blog posts, emails, social media, press releases
- **Checklists**: Comprehensive QA for pre-release

### 📣 Complete Marketing Strategy
- **Full marketing playbook**: Launch to ongoing promotion
- **30+ marketing prompts**: Blog posts, videos, social media, outreach
- **Ready-to-use templates**: Email sequences, social calendars, press releases
- **Multi-channel strategy**: Content, social, podcasts, newsletters, community

---

## 🚀 Quick Start Options

### Option 1: Start a New Project (Recommended)

Use the kickstart prompt for guided development:

```bash
# 1. Open the kickstart prompt
open prompts/PROJECT-KICKSTART-PROMPT.md

# 2. Copy the prompt template

# 3. Fill in your project details:
#    - Project name, slug, description
#    - Features and use cases
#    - Technical requirements

# 4. Paste into Claude or your AI assistant

# 5. Follow the guided workflow through all phases
```

**Result**: Complete project with testing, documentation, and community files.

---

### Option 2: Add Testing to Existing Project

Set up comprehensive testing quickly:

```bash
# 1. Navigate to your plugin/theme
cd /path/to/your/wordpress-plugin

# 2. Copy the setup script
cp /path/to/wp-dev-prompts/scripts/setup-testing.sh .

# 3. Run automated setup
bash setup-testing.sh --plugin-name="My Plugin" --text-domain="my-plugin"

# 4. Install WordPress test suite
bash bin/install-wp-tests.sh wordpress_test root root localhost latest

# 5. Start testing
composer test
npm run test:unit
```

**Result**: PHPUnit, PHPCS, PHPStan, ESLint, Jest, Playwright, and GitHub Actions CI/CD.

---

### Option 3: Use Specific Resources

Pick what you need:

```bash
# Documentation workflow
open guides/DOCUMENTATION-WORKFLOW.md

# Testing setup guide
open guides/testing/TESTING-SETUP-GUIDE.md

# Development lifecycle
open guides/DEVELOPMENT-LIFECYCLE.md

# Browse templates
cd templates/
```

---

## 📂 Repository Structure

```
wp-dev-prompts/
├── 📋 prompts/                           # 🎯 START HERE
│   ├── PROJECT-KICKSTART-PROMPT.md      # 👈 Main entry point
│   ├── TESTING-AUTOMATION-PROMPTS.md    # 24 testing prompts
│   ├── COMMUNITY-FILES-PROMPTS.md       # 16 documentation prompts
│   └── PLUGIN-MARKETING-PROMPTS.md      # 32 marketing prompts
│
├── 📚 guides/                            # Complete development guides
│   ├── DEVELOPMENT-LIFECYCLE.md         # 10-phase lifecycle
│   ├── DOCUMENTATION-WORKFLOW.md        # Doc creation workflow
│   ├── PLUGIN-DEVELOPMENT-WORKFLOW.md   # Plugin development
│   ├── PLUGIN-MARKETING-STRATEGY.md     # Complete marketing playbook
│   ├── SCREENSHOT-DOCUMENTATION-GUIDE.md # Screenshot guide
│   └── testing/                         # Testing guides
│       ├── TESTING-README.md            # Testing overview
│       ├── TESTING-SETUP-GUIDE.md       # Setup instructions
│       └── TESTING-QUICK-REFERENCE.md   # Command reference
│
├── 📑 templates/                         # Ready-to-use templates
│   ├── community/                       # Community files
│   │   ├── CONTRIBUTING-TEMPLATE.md
│   │   ├── SECURITY-TEMPLATE.md
│   │   └── SUPPORT-TEMPLATE.md
│   ├── github/                          # GitHub templates
│   │   ├── ISSUE_TEMPLATE/
│   │   │   ├── bug_report.md
│   │   │   ├── feature_request.md
│   │   │   ├── question.md
│   │   │   └── config.yml
│   │   └── PULL_REQUEST_TEMPLATE.md
│   ├── marketing/                       # Marketing templates
│   │   ├── BLOG-POST-LAUNCH-TEMPLATE.md
│   │   ├── EMAIL-SEQUENCE-TEMPLATE.md
│   │   ├── SOCIAL-MEDIA-CALENDAR-TEMPLATE.md
│   │   ├── PODCAST-PITCH-TEMPLATE.md
│   │   └── PRESS-RELEASE-TEMPLATE.md
│   ├── workflows/                       # Workflow templates
│   │   ├── BLUEPRINT-CREATION-GUIDE.md
│   │   ├── BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md
│   │   ├── USER-STORY-TEMPLATE.md
│   │   └── VISUAL-REGRESSION-TESTING-TEMPLATE.md
│   └── checklists/                      # QA checklists
│       └── QA-TESTING-CHECKLIST.md
│
├── 🔧 scripts/                           # Automation scripts
│   └── setup-testing.sh                 # Automated testing setup
│
├── ⚙️ github-workflows/                  # GitHub Actions workflows
│   ├── wordpress-plugin-ci.yml
│   ├── visual-regression-testing.yml
│   └── dependabot-auto-merge.yml
│
├── 📖 docs/                              # Additional documentation
│   ├── SETUP-COMPLETE.md                # Setup completion guide
│   └── product-research.md              # Research insights
│
├── .github/                              # GitHub configuration
│   ├── dependabot.yml
│   └── workflows/
│
├── README.md                             # This file
├── CONTRIBUTING.md                       # Contributing guidelines
└── LICENSE                               # CC0 1.0 Universal
```

---

## 💡 How to Use This Framework

### 🆕 For New Projects

**Use [PROJECT-KICKSTART-PROMPT.md](prompts/PROJECT-KICKSTART-PROMPT.md)** - It guides you through:

1. **Phase 1: Planning** - Research, user stories, architecture
2. **Phase 2: Setup** - Project structure, Git, base files
3. **Phase 3: Testing** - All 21 dimensions with automation
4. **Phase 4: Development** - Features with TDD approach
5. **Phase 5: Documentation** - Playground + automated screenshots
6. **Phase 6: QA** - Comprehensive pre-launch checklist
7. **Phase 7: Launch** - WordPress.org & GitHub deployment
8. **Phase 8: Post-Launch** - Monitoring and support

### 🔧 For Existing Projects

**Add testing infrastructure:**
```bash
bash scripts/setup-testing.sh --plugin-name="Your Plugin"
```

**Add documentation:**
```bash
# Follow guides/DOCUMENTATION-WORKFLOW.md
# Creates Playground Blueprint + automated screenshots
```

**Add community files:**
```bash
# Copy from templates/community/
cp templates/community/*.md .
# Customize for your project
```

### 🤖 With AI Assistants

**For specific tasks**, use targeted prompts:

```
# Setting up testing
Use prompts/TESTING-AUTOMATION-PROMPTS.md > "Initial Project Testing Setup"

# Creating documentation
Use prompts/COMMUNITY-FILES-PROMPTS.md > "Generate User Guide"

# Writing user stories
Use templates/workflows/USER-STORY-TEMPLATE.md
```

---

## 🎯 What You Get

### ✅ Testing Framework (21 Dimensions)

**PHP Testing:**
- ✅ PHPUnit (unit + integration tests)
- ✅ PHP_CodeSniffer (WordPress Coding Standards)
- ✅ PHPStan (static analysis, level 5+)
- ✅ PHP Compatibility (8.0+)

**JavaScript Testing:**
- ✅ ESLint (@wordpress/eslint-plugin)
- ✅ Jest (unit tests)
- ✅ Playwright (E2E tests)
- ✅ TypeScript support
- ✅ Stylelint (CSS)

**Security:**
- ✅ PHPCS security sniffs
- ✅ Composer/npm audit
- ✅ Trivy vulnerability scanning
- ✅ Sanitization/escaping validation

**WordPress-Specific:**
- ✅ Plugin/Theme Check (official)
- ✅ Internationalization (i18n)
- ✅ Enqueueing pattern validation
- ✅ Deprecated function detection

**Quality & Performance:**
- ✅ Accessibility (WCAG 2.1 AA with axe-core)
- ✅ Performance (Lighthouse CI)
- ✅ Visual regression (Playwright)
- ✅ Code complexity analysis

### ✅ Documentation System

**Automated Workflow:**
1. Create WordPress Playground Blueprint
2. Write Playwright tests for screenshots
3. Generate screenshots automatically
4. Optimize images for WordPress.org
5. Use AI prompts to write docs

**What's Created:**
- ✅ README.md (GitHub)
- ✅ readme.txt (WordPress.org)
- ✅ User guide with screenshots
- ✅ Developer documentation
- ✅ 5+ optimized screenshots

### ✅ Community Files

**Templates provided for:**
- ✅ Contributing guidelines
- ✅ Security policy
- ✅ Support documentation
- ✅ Code of conduct
- ✅ Issue templates (bug, feature, question)
- ✅ Pull request template
- ✅ GitHub Discussions setup

### ✅ CI/CD & Automation

**GitHub Actions Workflows:**
- ✅ Multi-version testing (PHP 8.0-8.3 × WP 6.5-trunk)
- ✅ Linting and static analysis
- ✅ Security scanning
- ✅ Visual regression tests
- ✅ Automated deployment
- ✅ Dependabot with auto-merge

---

## 📚 Usage Guides

### 🎯 I'm Building a Plugin

**Follow this path:**

1. 📋 **[PROJECT-KICKSTART-PROMPT.md](prompts/PROJECT-KICKSTART-PROMPT.md)** - Start here
2. 📝 **[templates/workflows/USER-STORY-TEMPLATE.md](templates/workflows/USER-STORY-TEMPLATE.md)** - Plan features
3. 📘 **[guides/PLUGIN-DEVELOPMENT-WORKFLOW.md](guides/PLUGIN-DEVELOPMENT-WORKFLOW.md)** - Development guide
4. 🧪 **[guides/testing/TESTING-SETUP-GUIDE.md](guides/testing/TESTING-SETUP-GUIDE.md)** - Add testing
5. 📚 **[guides/DOCUMENTATION-WORKFLOW.md](guides/DOCUMENTATION-WORKFLOW.md)** - Create docs
6. ✅ **[templates/checklists/QA-TESTING-CHECKLIST.md](templates/checklists/QA-TESTING-CHECKLIST.md)** - Pre-release QA

### 🎨 I'm Building a Theme

**Follow this path:**

1. 📋 **[PROJECT-KICKSTART-PROMPT.md](prompts/PROJECT-KICKSTART-PROMPT.md)** - Start here
2. 📘 **[guides/PLUGIN-DEVELOPMENT-WORKFLOW.md](guides/PLUGIN-DEVELOPMENT-WORKFLOW.md)** - Adapt for themes
3. 👁️ **[templates/workflows/VISUAL-REGRESSION-TESTING-TEMPLATE.md](templates/workflows/VISUAL-REGRESSION-TESTING-TEMPLATE.md)** - Visual testing
4. 📚 **[guides/DOCUMENTATION-WORKFLOW.md](guides/DOCUMENTATION-WORKFLOW.md)** - Theme docs
5. 📸 **[guides/SCREENSHOT-DOCUMENTATION-GUIDE.md](guides/SCREENSHOT-DOCUMENTATION-GUIDE.md)** - Screenshots

### 🧪 I Just Want Testing

**Quick setup:**

1. 📖 **[guides/testing/TESTING-README.md](guides/testing/TESTING-README.md)** - Understand what's included
2. 🔧 **Run [setup-testing.sh](scripts/setup-testing.sh)** - Automated setup
3. ⚡ **[guides/testing/TESTING-QUICK-REFERENCE.md](guides/testing/TESTING-QUICK-REFERENCE.md)** - Daily commands

### 📚 I Just Want Documentation

**Documentation workflow:**

1. 📚 **[guides/DOCUMENTATION-WORKFLOW.md](guides/DOCUMENTATION-WORKFLOW.md)** - 5-phase process
2. 🎯 **[templates/workflows/BLUEPRINT-CREATION-GUIDE.md](templates/workflows/BLUEPRINT-CREATION-GUIDE.md)** - Create Blueprint
3. 📸 **[templates/workflows/BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md](templates/workflows/BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md)** - Automate screenshots
4. 🤖 **[prompts/COMMUNITY-FILES-PROMPTS.md](prompts/COMMUNITY-FILES-PROMPTS.md)** - AI prompts for docs

### 🚀 I'm Setting Up CI/CD

**GitHub Actions:**

1. Copy `github-workflows/wordpress-plugin-ci.yml` to `.github/workflows/`
2. Customize for your project (plugin name, versions, etc.)
3. Add GitHub secrets (if deploying)
4. Copy `.github/dependabot.yml` for dependency updates
5. Push and let CI run

### 📣 I Need to Market My Plugin

**Complete marketing strategy:**

1. 📖 **[guides/PLUGIN-MARKETING-STRATEGY.md](guides/PLUGIN-MARKETING-STRATEGY.md)** - Full playbook
2. 🤖 **[prompts/PLUGIN-MARKETING-PROMPTS.md](prompts/PLUGIN-MARKETING-PROMPTS.md)** - 32 AI prompts
3. 📝 **[templates/marketing/](templates/marketing/)** - Ready-to-use templates:
   - **Blog Post Launch Template** - Announcement post structure
   - **Email Sequence Template** - 5-email onboarding series
   - **Social Media Calendar** - 30-day content plan
   - **Podcast Pitch Template** - Outreach to podcasters
   - **Press Release Template** - Professional media announcements

---

## 🌟 Key Concepts

### Always Create a WordPress Playground Blueprint

**Every project gets a Blueprint** (`blueprint.json`) for:
- ✅ **Instant demos** - Share live preview links
- ✅ **Automated screenshots** - Generate docs screenshots via Playwright
- ✅ **Testing environments** - Consistent test states
- ✅ **Visual regression** - Compare UI changes
- ✅ **QA validation** - Reproducible test scenarios

See: [templates/workflows/BLUEPRINT-CREATION-GUIDE.md](templates/workflows/BLUEPRINT-CREATION-GUIDE.md)

### Automated Screenshot Generation

**Never manually capture screenshots again:**

1. Create Playground Blueprint with demo data
2. Write Playwright tests that navigate and capture
3. Run `npm run screenshots` to generate all
4. Auto-optimize for WordPress.org

See: [guides/DOCUMENTATION-WORKFLOW.md](guides/DOCUMENTATION-WORKFLOW.md)

### Test-Driven Development

**Write tests as you develop:**
- Unit tests for functions/classes
- Integration tests for WordPress interactions
- E2E tests for user workflows
- Visual tests for UI changes

Target: **80%+ code coverage**

### AI-Powered Workflow

**Use AI for configuration and boilerplate:**
- Copy prompts from prompts/TESTING-AUTOMATION-PROMPTS.md
- Generate configs (phpunit.xml, .phpcs.xml, etc.)
- Create documentation (README, guides, FAQs)
- Write community files (Contributing, Security)

**You review and customize** - AI accelerates, you control quality.

---

## 💻 Commands Reference

### Testing Commands

```bash
# PHP
composer test              # Run PHPUnit tests
composer lint              # Check coding standards
composer lint:fix          # Auto-fix standards
composer analyze           # Run PHPStan
composer check-all         # Run all PHP checks

# JavaScript
npm run test              # Run all JS tests
npm run test:unit         # Jest unit tests
npm run test:e2e          # Playwright E2E tests
npm run lint              # ESLint + Stylelint
npm run lint:fix          # Auto-fix lint issues

# Environment
npm run env:start         # Start WordPress (http://localhost:8888)
npm run env:stop          # Stop WordPress
npm run env:clean         # Clean environment
```

### Documentation Commands

```bash
# Screenshots
npm run screenshots       # Generate all screenshots
npm run screenshots:optimize  # Optimize images

# Playground
npm run playground:start  # Start with Blueprint
```

### Validation

```bash
# Validate docs
npm run docs:validate

# Validate readme.txt for WordPress.org
npm run readme:validate

# Check links
npm run docs:links
```

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

**Ways to contribute:**
- 🐛 Report bugs or issues
- 💡 Suggest new prompts or workflows
- 📝 Improve documentation
- ✅ Add templates or examples
- 🔧 Enhance testing configurations
- 🎨 Share your Blueprint examples

---

## 📝 License

This repository is licensed under [CC0 1.0 Universal (Public Domain)](LICENSE).

**You can:**
- ✅ Use commercially
- ✅ Modify freely
- ✅ Distribute
- ✅ Use privately
- ✅ No attribution required (but appreciated!)

---

## 🙏 Credits

Created and maintained by [Courtney Robertson](https://github.com/courtneyr-dev)

Built for the WordPress community with ❤️

---

## 📞 Support & Resources

- **GitHub Issues**: [Report bugs or request features](https://github.com/courtneyr-dev/wp-dev-prompts/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/courtneyr-dev/wp-dev-prompts/discussions)
- **WordPress Slack**: [#core-test channel](https://make.wordpress.org/chat/)

### External Resources

- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
- [WordPress Theme Handbook](https://developer.wordpress.org/themes/)
- [WordPress Playground](https://wordpress.github.io/wordpress-playground/)
- [Playwright Documentation](https://playwright.dev/)

---

## 🗺️ Roadmap

**Current Version: 1.0.0**

### ✅ Completed (v1.0)
- Complete testing framework (21 dimensions)
- Documentation workflow with Playground
- Community file templates
- GitHub Actions CI/CD workflows
- AI prompts for all phases
- Project kickstart prompt

### ✅ Completed (v1.1 - December 2024)
- **Complete marketing strategy guide**
- **32 marketing AI prompts** (blog, video, social, outreach)
- **5 marketing templates** (blog, email, social, podcast, press)
- Multi-channel marketing playbook
- Launch and ongoing promotion strategies

### 🔮 Planned

**v1.2 - Enhanced AI Integration**
- Theme-specific prompt collection
- Block development prompts
- WooCommerce integration guides
- Multisite-specific workflows

**v1.3 - Extended Testing**
- Load testing templates
- Security audit workflows
- Compliance checking (GDPR, WCAG)
- Cross-browser matrix expansion

**v1.4 - Documentation Expansion**
- Video documentation workflows
- Interactive documentation examples
- API documentation generators
- Translation workflows

---

## ⭐ Star This Repository

If this framework helps you build better WordPress projects, please star the repository! ⭐

---

**Last Updated**: December 11, 2024
**Framework Version**: 1.1.0
**WordPress**: 6.5+
**PHP**: 8.0+

---

**Ready to start?** → [PROJECT-KICKSTART-PROMPT.md](prompts/PROJECT-KICKSTART-PROMPT.md) 🚀
