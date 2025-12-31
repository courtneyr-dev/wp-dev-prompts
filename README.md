# 🚀 WordPress Development Prompts & Testing Framework

**Complete WordPress development toolkit with AI-powered prompts, automated testing, and cross-platform AI compatibility.**

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![WordPress](https://img.shields.io/badge/WordPress-6.5+-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-8.0+-purple.svg)](https://www.php.net/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Version](https://img.shields.io/badge/Version-2.0.0-blue.svg)](https://github.com/courtneyr-dev/wp-dev-prompts)

> **Works with any AI platform**: Claude Code, Cursor, Cline, GitHub Copilot, ChatGPT, Gemini, and more.
>
> **Enhanced with [Automattic/agent-skills](https://github.com/Automattic/agent-skills)** - WordPress Agent Skills for AI assistants, providing modern best practices for WordPress 6.9+ development.

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
- **90+ specialized prompts** for testing, documentation, community files, marketing, and block development
- **Works with Claude, ChatGPT, Copilot, and any AI assistant**
- **Enhanced with [Automattic/agent-skills](https://github.com/Automattic/agent-skills)** - Modern WordPress 6.9+ best practices

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

### 🔍 Website & Digital Experience Review System
- **Comprehensive site audit framework**: Multi-agent system for website assessment
- **12 specialized sub-agents**: Content, SEO, accessibility, performance, security, and more
- **Decision tree routing**: Automated assessment scoping based on problem type
- **RACI ownership model**: Clear accountability for all review findings
- **Integration with WordPress development**: Use findings to inform plugin/theme projects

### 🎨 Frontend Design System
- **10 aesthetic style languages**: Art Deco, Brutalist, Nordic, Cyberpunk, and more
- **Component design prompts**: Generate accessible, responsive UI components
- **Storybook integration**: Preview components across all style themes
- **WordPress compatibility**: CSS custom properties map to theme.json presets
- **Accessibility-first**: WCAG 2.1 AA compliance built into all components

### 🔌 WPHelpers & Data Integration
- **Core blocks reference**: Structured data for all WordPress core blocks
- **Icon library**: 400+ icons with accessibility labels
- **Audit checklists**: Machine-readable WordPress and GraphQL audit items
- **CI automation**: GitHub Actions workflows for automated auditing

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

## 📂 Repository Structure (v2.0.0)

```
wp-dev-prompts/
├── 📋 prompts/                           # AI Prompts
│   ├── README.md                        # Prompt structure guide
│   ├── core/                            # Portable prompts (<2000 tokens)
│   │   ├── testing/
│   │   ├── blocks/
│   │   ├── security/
│   │   └── documentation/
│   ├── extended/                        # Full-featured prompts
│   │   ├── PROJECT-KICKSTART-PROMPT.md  # 👈 Main entry point
│   │   ├── TESTING-AUTOMATION-PROMPTS.md
│   │   ├── BLOCK-DEVELOPMENT-PROMPTS.md
│   │   ├── COMMUNITY-FILES-PROMPTS.md
│   │   └── PLUGIN-MARKETING-PROMPTS.md
│   └── legacy/                          # Backward compatibility symlinks
│
├── 🤖 agents/                            # Modular AI Agents
│   ├── README.md                        # Agent architecture
│   ├── orchestrators/                   # Master coordinators
│   │   └── site-review-orchestrator.md
│   ├── specialists/                     # Domain experts (10 agents)
│   │   ├── content-strategy.md
│   │   ├── seo-strategy.md
│   │   ├── accessibility.md
│   │   ├── performance.md
│   │   ├── security-advisory.md
│   │   └── ... (5 more)
│   └── compositions/                    # Pre-configured groups
│       ├── full-site-assessment.md
│       ├── content-review.md
│       ├── experience-review.md
│       ├── security-review.md
│       └── launch-readiness.md
│
├── 📚 skills/                            # Knowledge Modules
│   ├── README.md                        # Skill format guide
│   ├── wordpress/                       # WordPress skills
│   │   ├── plugin-architecture.md
│   │   ├── block-development.md
│   │   ├── interactivity-api.md
│   │   ├── block-themes.md
│   │   ├── wp-cli.md
│   │   └── playground.md
│   ├── security/                        # Security skills
│   │   ├── input-sanitization.md
│   │   ├── output-escaping.md
│   │   ├── nonces-capabilities.md
│   │   └── database-queries.md
│   ├── testing/                         # Testing skills
│   │   ├── phpunit-wordpress.md
│   │   ├── phpcs-wordpress.md
│   │   ├── phpstan-wordpress.md
│   │   └── playwright-wordpress.md
│   ├── performance/                     # Performance skills
│   │   ├── core-web-vitals.md
│   │   └── wp-profiling.md
│   └── accessibility/                   # Accessibility skills
│       └── wcag-checklist.md
│
├── 🔌 platforms/                         # Platform Configurations
│   ├── README.md                        # Platform selection guide
│   ├── universal/                       # Cross-platform specs
│   │   ├── prompt-specification.md
│   │   └── capability-matrix.md
│   ├── claude-code/                     # Claude Code
│   │   ├── README.md
│   │   └── CLAUDE.md.template
│   ├── cursor/                          # Cursor
│   │   ├── README.md
│   │   └── cursorrules.template
│   ├── cline/                           # Cline
│   │   ├── README.md
│   │   └── clinerules.template
│   └── copilot/                         # GitHub Copilot
│       ├── README.md
│       └── copilot-instructions.template
│
├── 📖 workflows/                         # Multi-step Guides
│   └── README.md                        # Workflow structure
│
├── 📚 guides/                            # Development guides
├── 📑 templates/                         # Ready-to-use templates
├── 🔧 scripts/                           # Automation scripts
├── ⚙️ github-workflows/                  # GitHub Actions templates
├── 📖 docs/                              # Additional documentation
│
├── 📊 data/                              # Reference Data (NEW)
│   ├── core-blocks.json                 # WordPress core blocks metadata
│   ├── core-icons.json                  # 400+ icons with a11y labels
│   ├── wpaudit-checklist.json           # 35 audit items from WPAudit
│   └── graphql-audit-checklist.yaml     # 24 GraphQL security checks
│
├── 🎨 ui/                                # UI Components (NEW)
│   └── storybook/                       # Storybook with 10 style themes
│       ├── .storybook/                  # Config (a11y, themes, viewports)
│       ├── stories/                     # Example component stories
│       └── styles/                      # Style language CSS
│
├── 🧪 tests/                             # Automated Tests (NEW)
│   └── audit/                           # Audit test suites
│       └── graphql.spec.ts              # GraphQL API tests
│
└── 📁 archive/                           # Previous versions
    └── v1.3-original/                   # Complete v1.3 backup
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

### 🔍 I Need to Audit a Website

**Comprehensive digital experience review:**

1. 📋 **[prompts/site-review/DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md](prompts/site-review/DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md)** - Master orchestrator prompt
2. **Use Case Scenarios:**
   - **Client site audits** - Before proposing WordPress solutions
   - **Pre-redesign assessment** - Baseline before major changes
   - **Performance diagnostics** - Identify bottlenecks and optimization opportunities
   - **Accessibility compliance** - WCAG audit and remediation planning
   - **Competitive analysis** - Benchmark against competitors
   - **Security review** - Assess vulnerabilities and privacy compliance
3. **12 Specialized Sub-Agents:**
   - Content Strategy, SEO, Accessibility, Performance
   - Security, Analytics, Brand Consistency, Localization
   - Content Marketing, User Research, Competitive Intelligence
4. **Integration:** Use findings to inform WordPress plugin/theme development decisions

### 🔌 I Need to Audit a GraphQL API

**WPGraphQL security and functionality testing:**

1. 📋 **[prompts/audit/graphql-audit.md](prompts/audit/graphql-audit.md)** - GraphQL audit prompt
2. 🧪 **[tests/audit/graphql.spec.ts](tests/audit/graphql.spec.ts)** - Playwright test suite
3. ⚙️ **[.github/workflows/graphql-audit.yml](.github/workflows/graphql-audit.yml)** - CI workflow
4. 📊 **[data/graphql-audit-checklist.yaml](data/graphql-audit-checklist.yaml)** - 24 security checks

**Run manually:**
```bash
GRAPHQL_ENDPOINT=https://example.com/graphql npx playwright test tests/audit/
```

### 🎨 I'm Designing UI Components

**Frontend design with accessibility and style themes:**

1. 🎯 **[prompts/frontend-design/component-design.md](prompts/frontend-design/component-design.md)** - Generate components
2. 🎨 **[prompts/frontend-design/style-language.md](prompts/frontend-design/style-language.md)** - Define visual style
3. 📱 **[prompts/frontend-design/responsive-behavior.md](prompts/frontend-design/responsive-behavior.md)** - Mobile-first patterns
4. ♿ **[prompts/frontend-design/accessibility-presets.md](prompts/frontend-design/accessibility-presets.md)** - WCAG compliance
5. 🔮 **[ui/storybook/](ui/storybook/)** - Preview with 10 style themes

**New to design?** → **[docs/design-style-guide.md](docs/design-style-guide.md)** - Browse 20+ styles by vibe ("I want it to feel calm"), see examples, get copy-paste prompts

**Style themes available:** Art Deco, Brutalist, Nordic, Neo-Classical, Biophilic, Maximalist, Zen, Cyberpunk, Bauhaus, Retro-Futurism

### 🧱 I'm Working with WordPress Blocks

**Block selection, patterns, and icons:**

1. 🧱 **[prompts/blocks/core-blocks-assistant.md](prompts/blocks/core-blocks-assistant.md)** - Choose optimal blocks
2. 🎭 **[prompts/blocks/block-pattern-recommender.md](prompts/blocks/block-pattern-recommender.md)** - Create reusable patterns
3. 🎯 **[prompts/blocks/icon-assistant.md](prompts/blocks/icon-assistant.md)** - Find WordPress icons
4. 📊 **[data/core-blocks.json](data/core-blocks.json)** - Block metadata reference
5. 📊 **[data/core-icons.json](data/core-icons.json)** - 400+ icons with labels

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

**Current Version: 2.0.0**

### ✅ Completed (v1.0-1.3)
- Complete testing framework (21 dimensions)
- Documentation workflow with Playground
- Community file templates and marketing prompts
- Digital Experience Integrity System
- Integration with Automattic/agent-skills

### ✅ Completed (v2.0.0 - December 2024)
- **Cross-platform AI compatibility** - Works with Claude Code, Cursor, Cline, Copilot, ChatGPT, Gemini
- **Modular agent architecture** - Orchestrators, specialists, and compositions
- **Skill-based knowledge modules** - 54 focused skills across 5 domains
- **Platform configuration templates** - CLAUDE.md, .cursorrules, .clinerules, copilot-instructions.md
- **Universal prompt specification** - XML-style tags for all platforms
- **Legacy compatibility** - Symlinks preserve existing paths
- **WPHelpers data integration** - Core blocks and icons reference data
- **Audit system** - WPAudit and GraphQL security checklists with CI workflows
- **Frontend design prompts** - Component design, style languages, accessibility presets
- **Storybook starter** - 10 aesthetic themes with a11y testing
- **CI workflow suite** - Fast PR, nightly, audit, release candidate workflows

### 🔮 Planned

**v2.1 - Portable Prompts**
- Create <2000 token versions of all prompts
- Test across ChatGPT, Gemini, and Claude Web

**v2.2 - Extended Workflows**
- Multi-step workflow guides
- New plugin creation workflow
- Block creation workflow
- Testing setup workflow

**v2.3 - Additional Platforms**
- ChatGPT custom GPT configuration
- Gemini Gems setup
- Additional MCP server integrations

---

## ⭐ Star This Repository

If this framework helps you build better WordPress projects, please star the repository! ⭐

---

## 🙏 Credits & Sources

This framework incorporates best practices and guidance from:

- **[Automattic/agent-skills](https://github.com/Automattic/agent-skills)** - WordPress Agent Skills for AI assistants (MIT License)
  - wp-plugin-development - Plugin architecture and security patterns
  - wp-block-development - Block creation, deprecations, and apiVersion guidance
  - wp-block-themes - theme.json, templates, and style variations
  - wp-interactivity-api - Directives, stores, and hydration patterns
  - wp-performance - Profiling, WP-CLI diagnostics, and optimization
  - wp-wpcli-and-ops - Database operations, migrations, and multisite
  - wp-playground - Blueprint creation and local testing
  - wp-abilities-api - Permission-based functionality (WP 6.9+)
  - wp-project-triage - Repository detection and tooling identification

---

**Last Updated**: December 30, 2024
**Framework Version**: 2.0.0
**WordPress**: 6.5+
**PHP**: 8.0+
**Enhanced With**: [Automattic/agent-skills](https://github.com/Automattic/agent-skills)
**Platforms**: Claude Code, Cursor, Cline, GitHub Copilot, ChatGPT, Gemini

---

**Ready to start?** → [PROJECT-KICKSTART-PROMPT.md](prompts/extended/PROJECT-KICKSTART-PROMPT.md) 🚀
