# WordPress Project Kickstart Prompt

Use this prompt when starting a new WordPress plugin or theme project with Claude or any AI assistant.

## 📋 How to Use

1. Copy the prompt below
2. Replace all `[PLACEHOLDERS]` with your project details
3. Paste into Claude, ChatGPT, or your AI assistant
4. The AI will guide you through the complete development lifecycle

---

## 🚀 The Prompt

```
I'm starting a new WordPress [plugin/theme] project and want to use the wp-dev-prompts framework to guide the entire development process.

# Project Details

**Project Type:** [Plugin/Theme]
**Project Name:** [Your Plugin/Theme Name]
**Slug:** [your-project-slug]
**Text Domain:** [your-text-domain]
**Prefix:** [your_prefix]

**Description:** [One-line description of what your project does]

**Main Features:**
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]
4. [Feature 4]

**Target Users:** [Who will use this? e.g., Site administrators, content editors, end users]

**Use Cases:**
- [Use case 1]
- [Use case 2]
- [Use case 3]

**Technical Requirements:**
- Minimum WordPress: [e.g., 6.9+] *(See: [WordPress/agent-skills](https://github.com/WordPress/agent-skills) for WP 6.9+ best practices)*
- Minimum PHP: [e.g., 8.0]
- Dependencies: [List any required plugins or libraries]

**Project Type Detection:**
*(From [WordPress/agent-skills wp-project-triage](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-project-triage))*
- Repository type: [plugin/theme/block-theme/full-site]
- Available tooling: [PHP/Node.js/Composer/npm]
- Existing test infrastructure: [describe if any]

**Repository:** https://github.com/[username]/[repo-name]

# Resources Available

I have the wp-dev-prompts repository available at:
https://github.com/courtneyr-dev/wp-dev-prompts

This repository contains:
- Complete development lifecycle workflow
- Testing automation framework (21 testing dimensions)
- Documentation workflow with automated screenshots
- User story templates
- AI prompts for all phases
- Community file templates
- GitHub Actions CI/CD workflows
- WordPress Playground Blueprint guides
- Digital Experience Integrity System (comprehensive website review framework)

# What I Need You To Do

Follow the complete development lifecycle from the wp-dev-prompts framework:

## Phase 0: Validation & Assessment (Optional)

**For new product ideas**, validate product-market fit first using [PRODUCT-MARKET-FIT-RESEARCH.md](PRODUCT-MARKET-FIT-RESEARCH.md):
- Research existing solutions and market size
- Identify gaps and differentiation opportunities
- Validate willingness to pay
- Assess technical feasibility and ecosystem risks

**If building for an existing website**, consider running a comprehensive site review using the Digital Experience Integrity System (site-review/DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md):

1. Assess the existing site's content strategy and information architecture
2. Review current SEO, accessibility, and performance baselines
3. Identify gaps that the plugin/theme should address
4. Understand the technical environment and constraints
5. Use findings to inform feature requirements and architecture decisions

This phase is particularly valuable when:
- Building solutions for client sites
- Creating plugins to solve specific site problems
- Ensuring compatibility with existing site infrastructure
- Planning features based on actual user needs and site data

## Phase 1: Research & Planning (DEVELOPMENT-LIFECYCLE.md)

1. Help me refine the project scope and requirements
2. Identify any research needed for technical decisions
3. Create user stories for all features (use USER-STORY-TEMPLATE.md)
4. Plan the architecture and technical approach
5. Identify potential challenges and solutions

## Phase 2: Initial Setup

1. Guide me through the initial project structure
2. Set up the development environment
3. Configure version control (Git)
4. Create the base plugin/theme files following WordPress standards

## Phase 3: Testing Infrastructure (TESTING-SETUP-GUIDE.md)

Set up comprehensive testing covering all 21 quality dimensions:

**PHP Testing:**
- PHPUnit for unit and integration tests
- PHP_CodeSniffer with WordPress Coding Standards
- PHPStan for static analysis
- PHP Compatibility checks

**JavaScript Testing:**
- ESLint with @wordpress/eslint-plugin
- Jest for unit tests
- Playwright for E2E tests

**Quality & Security:**
- Security scanning (Trivy, audit)
- Accessibility testing (axe-core)
- Performance testing (Lighthouse CI)
- Visual regression testing

**Automation:**
- GitHub Actions CI/CD (use github-workflows/wordpress-plugin-ci.yml)
- Pre-commit hooks
- Dependabot configuration

Use the prompts from TESTING-AUTOMATION-PROMPTS.md to generate configurations.

## Phase 4: Development

*(Architecture guidance from [WordPress/agent-skills wp-plugin-development](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-plugin-development))*

**Plugin Architecture Best Practices:**
- Maintain a single bootstrap (main plugin file with header)
- Defer heavy operations to hooks rather than load-time execution
- Register activation/deactivation hooks at top level, separate from other callbacks

**Security Foundation:**
*(From [WordPress/agent-skills security reference](https://github.com/WordPress/agent-skills))*
- Validate/sanitize input early; escape output late
- Combine nonces with capability checks (nonces prevent CSRF, not authorization)
- Avoid processing entire superglobal arrays; access only specific keys
- Apply `wp_unslash()` before sanitization when necessary
- Use parameterized SQL statements rather than concatenating user input

**For Block Development:**
*(From [WordPress/agent-skills wp-block-development](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-block-development))*
- Upgrade to `apiVersion: 3` for WordPress 6.9+ compatibility (WP 7.0 will run post editor in iframe regardless of apiVersion)
- Choose between static blocks (saved in post content), dynamic blocks (server-rendered), or interactive blocks using `viewScriptModule`
- Never change block names (breaks compatibility) or modify saved markup without deprecations
- Always add deprecations with migration paths when changing block structure

**For Interactive Blocks:**
*(From [WordPress/agent-skills wp-interactivity-api](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-interactivity-api))*
- Use `@wordpress/create-block-interactive-template` for new interactive blocks
- Ensure server-rendered markup + client hydration align
- Keep directives scoped and minimal
- Note: `data-wp-ignore` is deprecated in WP 6.9

1. Implement features following WordPress Coding Standards
2. Write tests as we go (TDD approach)
3. Follow security best practices (sanitization, escaping, nonces, capabilities)
4. Ensure proper i18n/l10n
5. Use the QA-TESTING-CHECKLIST.md throughout development

## Phase 5: Documentation (DOCUMENTATION-WORKFLOW.md)

Follow the 5-phase documentation workflow:

**Phase 1: Documentation Planning**
- Plan what needs documentation
- Create screenshot list
- Outline user guide structure

**Phase 2: WordPress Playground Blueprint**
*(Enhanced with [WordPress/agent-skills wp-playground](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-playground))*
- Create blueprint.json following BLUEPRINT-CREATION-GUIDE.md
- Set up demo environment with sample content
- Configure settings for documentation state
- Use `npx @wp-playground/cli@latest server --auto-mount` for local testing
- Note: Playground instances are ephemeral and SQLite-backed; never point at production data
- Test across different WordPress and PHP versions for compatibility verification

**Phase 3: Automated Screenshot Generation**
- Write Playwright tests for screenshots (BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md)
- Generate all screenshots automatically
- Optimize images for WordPress.org

**Phase 4: Write Documentation**
- README.md (GitHub)
- readme.txt (WordPress.org)
- User guide with screenshots
- Developer documentation (if applicable)
- Community files (use templates/community/)

**Phase 5: GitHub Setup**
- Issue templates (use templates/github/ISSUE_TEMPLATE/)
- PR template (use templates/github/PULL_REQUEST_TEMPLATE.md)
- Contributing guidelines
- Security policy
- Support documentation

Use COMMUNITY-FILES-PROMPTS.md to generate any documentation with AI assistance.

## Phase 6: Pre-Launch (QA-TESTING-CHECKLIST.md)

**Performance Optimization:**
*(From [WordPress/agent-skills wp-performance](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-performance))*
- Establish baseline performance with `curl` or WP-CLI before making changes
- Run `wp doctor check` to catch common issues (autoload bloat, debug flags, plugin overload)
- Use `wp profile stage` to identify where time is spent
- Focus on dominant bottlenecks: queries, autoloaded options, object cache misses, remote HTTP calls, or cron spikes
- Note: WP 6.9 classic themes benefit from on-demand CSS loading (30-65% reduction)

1. Run complete test suite
2. Perform manual QA using QA-TESTING-CHECKLIST.md
3. Security audit
4. Accessibility compliance check (WCAG 2.1 AA)
5. Performance testing
6. Cross-browser testing
7. WordPress compatibility testing (6.5, 6.6, 6.7, 6.8, 6.9, trunk)
8. PHP compatibility testing (8.0, 8.1, 8.2, 8.3)

## Phase 7: Deployment

**WP-CLI Operations:**
*(From [WordPress/agent-skills wp-wpcli-and-ops](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-wpcli-and-ops))*
- Establish execution environment (development, staging, or production)
- Backup database before performing risky changes
- For migrations: export database, perform dry-run test, then execute
- Use `wp-cli.yml` configuration files for automation
- For multisite: always decide whether operating on single site (`--url=`) or network-wide (`--network`)

1. Version tagging and changelog
2. WordPress.org submission (if applicable)
3. GitHub release
4. Documentation publishing
5. Announcement

## Phase 8: Post-Launch

1. Monitor for issues
2. Set up support channels
3. Plan ongoing maintenance
4. Track feature requests

## Task Routing with Tiered Agents

Throughout development, route tasks to the appropriate AI tool based on complexity:

| Signal | T1 (Copilot) | T2 (Cursor/ChatGPT) | T3 (Claude Code) |
|--------|--------------|---------------------|------------------|
| Files touched | 1-2 | 3-5 | 6+ |
| Existing tests | Yes | Partial | No |
| Risk level | Low | Medium | High |
| Architecture change | No | Minor | Yes |

**Examples:**
- **T1**: Fix typo, add comment, simple function change
- **T2**: Refactor module, add feature to existing code, code review
- **T3**: New feature architecture, security patterns, multi-component work

See [workflows/tiered-agents/](../../workflows/tiered-agents/) for the complete tier system.

# How to Guide Me

Throughout this project:

1. **Reference specific files** from wp-dev-prompts when relevant
   - Example: "Following TESTING-SETUP-GUIDE.md, let's set up PHPUnit..."

2. **Use the AI prompts** from the repository
   - When generating configs, use prompts from TESTING-AUTOMATION-PROMPTS.md
   - When creating docs, use prompts from COMMUNITY-FILES-PROMPTS.md

3. **Follow WordPress standards**
   - WordPress Coding Standards (WPCS)
   - WordPress best practices
   - Security guidelines
   - Accessibility requirements

4. **Provide complete, production-ready code**
   - No placeholder comments
   - Proper error handling
   - Security-first approach
   - Well-documented

5. **Ask clarifying questions** when needed
   - Technical decisions with trade-offs
   - Architecture choices
   - Feature requirements
   - User experience considerations

6. **Check off milestones** as we complete them
   - Use the DEVELOPMENT-LIFECYCLE.md checklist
   - Track progress through phases
   - Ensure nothing is skipped

7. **Create reusable assets**
   - WordPress Playground Blueprint for demos
   - Automated screenshot generation
   - Comprehensive test suite
   - Complete documentation

# Current Phase

I'm currently in: [Pre-Research / Research / Planning / Development / Testing / Documentation / Launch / Post-Launch]

# Immediate Next Steps

What I want to work on right now:
[Describe what you want to start with - could be planning, setting up testing, developing a specific feature, etc.]

# Questions I Have

[List any questions or concerns you have about the project]

# Additional Context

[Any other relevant information about the project, constraints, timeline, etc.]

---

Let's build this following the wp-dev-prompts framework, ensuring we create a professional, production-ready WordPress [plugin/theme] with comprehensive testing, documentation, and community files.

Please start by confirming you understand the project scope and the framework we'll be using, then guide me through the first phase.
```

---

## 📝 Example: Filled-In Prompt

Here's an example of how to fill this out:

```
I'm starting a new WordPress plugin project and want to use the wp-dev-prompts framework to guide the entire development process.

# Project Details

**Project Type:** Plugin
**Project Name:** Analytics Dashboard Pro
**Slug:** analytics-dashboard-pro
**Text Domain:** analytics-dashboard-pro
**Prefix:** adp

**Description:** Professional analytics dashboard for WordPress with real-time metrics, custom reports, and data export capabilities.

**Main Features:**
1. Real-time analytics dashboard widget
2. Custom report builder with drag-and-drop interface
3. Data export to CSV, PDF, and Excel
4. REST API for third-party integrations
5. Gutenberg block for displaying analytics on frontend
6. Multi-site support with network-wide reporting

**Target Users:** Site administrators, marketing teams, business owners

**Use Cases:**
- Monitor website traffic and user engagement
- Create custom reports for stakeholders
- Export data for external analysis
- Display public analytics on frontend
- Compare performance across network sites

**Technical Requirements:**
- Minimum WordPress: 6.5
- Minimum PHP: 8.0
- Dependencies: None (standalone)

**Repository:** https://github.com/myusername/analytics-dashboard-pro

[... rest of prompt follows the template above ...]

# Current Phase

I'm currently in: Pre-Research

# Immediate Next Steps

I want to start by planning the architecture and creating user stories for all features. I need help deciding:
1. Should I use a custom database table or post meta for storing analytics?
2. What's the best approach for real-time updates (polling vs WebSockets)?
3. How should I structure the REST API endpoints?

# Questions I Have

- What's the best way to handle large datasets without impacting performance?
- Should I queue data processing or handle it synchronously?
- What security measures are critical for analytics data?

# Additional Context

This will be a free plugin initially, with plans for a premium version later. The free version will include the dashboard widget and basic reporting. Premium will add advanced features like custom reports, exports, and API access.

Timeline: Aiming for initial release in 3 months.

---

Let's build this following the wp-dev-prompts framework, ensuring we create a professional, production-ready WordPress plugin with comprehensive testing, documentation, and community files.

Please start by confirming you understand the project scope and the framework we'll be using, then guide me through the first phase.
```

---

## 🎯 What Happens Next

When you use this prompt, the AI will:

1. ✅ **Confirm understanding** of your project and the wp-dev-prompts framework
2. 📋 **Guide you through each phase** systematically
3. 📚 **Reference specific files** from the repository as needed
4. 🤖 **Use the AI prompts** from TESTING-AUTOMATION-PROMPTS.md and COMMUNITY-FILES-PROMPTS.md
5. ✅ **Create checklists** to track progress
6. 🔄 **Follow the complete lifecycle** from planning to post-launch
7. 📝 **Generate all necessary files** including tests, docs, and configs
8. 🎨 **Create WordPress Playground Blueprint** for demos and screenshots
9. 📸 **Set up automated screenshot generation**
10. 🚀 **Ensure production-ready code** with full test coverage

---

## 💡 Tips for Best Results

### Be Specific About Your Phase

If you're jumping into an existing project, specify where you are:

```
# Current Phase

I'm currently in: Development

I've already completed:
- ✅ Initial setup and project structure
- ✅ Testing infrastructure setup
- ✅ Core feature implementation

I'm working on:
- Settings page implementation
- REST API endpoints
- Documentation

I haven't started:
- Screenshots and WordPress Playground Blueprint
- Community files
- WordPress.org submission
```

### Ask for Specific Help

```
# Immediate Next Steps

I specifically need help with:
1. Setting up PHPStan configuration for WordPress
2. Writing Playwright tests for the settings page
3. Creating a WordPress Playground Blueprint with sample data
```

### Provide Context About Constraints

```
# Additional Context

- This needs to work with PHP 8.2+ (client requirement)
- Must be compatible with WPML for internationalization
- Client uses Cloudflare, so need to consider caching
- Multisite support is critical
- Timeline is tight - 6 weeks to launch
```

---

## 🔄 Iterative Development

You can use this prompt multiple times throughout the project:

**Session 1:** Initial planning and architecture
```
# Current Phase: Pre-Research
# Immediate Next Steps: Help me plan architecture and create user stories
```

**Session 2:** Setting up testing
```
# Current Phase: Development Setup
# Immediate Next Steps: Set up complete testing infrastructure with PHPUnit, PHPCS, PHPStan, ESLint
```

**Session 3:** Implementing features
```
# Current Phase: Development
# Immediate Next Steps: Implement the settings page with proper sanitization, nonces, and capabilities
```

**Session 4:** Documentation
```
# Current Phase: Documentation
# Immediate Next Steps: Create WordPress Playground Blueprint and generate screenshots automatically
```

---

## 📦 What You'll Get

By following this prompt and the wp-dev-prompts framework, you'll end up with:

### Code Quality
- ✅ WordPress Coding Standards compliant
- ✅ 80%+ test coverage
- ✅ PHPStan level 5+ passing
- ✅ Security-first approach
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Performance optimized

### Testing
- ✅ PHPUnit unit and integration tests
- ✅ Jest JavaScript tests
- ✅ Playwright E2E tests
- ✅ Visual regression tests
- ✅ GitHub Actions CI/CD
- ✅ Pre-commit hooks

### Documentation
- ✅ Professional README.md
- ✅ WordPress.org readme.txt
- ✅ Complete user guide
- ✅ Developer documentation
- ✅ 5+ automated screenshots
- ✅ WordPress Playground demo

### Community
- ✅ Contributing guidelines
- ✅ Security policy
- ✅ Support documentation
- ✅ Issue templates
- ✅ PR template
- ✅ Code of conduct

### Infrastructure
- ✅ Dependabot automation
- ✅ Auto-merge workflows
- ✅ Security scanning
- ✅ Automated deployments
- ✅ Version management

---

## 🎓 Learning Resources

As you work through the project, reference these files:

**Pre-Research (Optional):**
- [DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md](site-review/DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md) - Comprehensive website assessment

**Planning Phase:**
- [DEVELOPMENT-LIFECYCLE.md](DEVELOPMENT-LIFECYCLE.md)
- [USER-STORY-TEMPLATE.md](USER-STORY-TEMPLATE.md)
- [PLUGIN-DEVELOPMENT-WORKFLOW.md](PLUGIN-DEVELOPMENT-WORKFLOW.md)

**Testing Phase:**
- [TESTING-README.md](TESTING-README.md)
- [TESTING-SETUP-GUIDE.md](TESTING-SETUP-GUIDE.md)
- [TESTING-AUTOMATION-PROMPTS.md](TESTING-AUTOMATION-PROMPTS.md)

**Documentation Phase:**
- [DOCUMENTATION-WORKFLOW.md](DOCUMENTATION-WORKFLOW.md)
- [SCREENSHOT-DOCUMENTATION-GUIDE.md](SCREENSHOT-DOCUMENTATION-GUIDE.md)
- [COMMUNITY-FILES-PROMPTS.md](COMMUNITY-FILES-PROMPTS.md)

**Blueprint & Screenshots:**
- [BLUEPRINT-CREATION-GUIDE.md](BLUEPRINT-CREATION-GUIDE.md)
- [BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md](BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md)
- [VISUAL-REGRESSION-TESTING-TEMPLATE.md](VISUAL-REGRESSION-TESTING-TEMPLATE.md)

**Quality Assurance:**
- [QA-TESTING-CHECKLIST.md](QA-TESTING-CHECKLIST.md)
- [TESTING-QUICK-REFERENCE.md](TESTING-QUICK-REFERENCE.md)

---

## 🚀 Quick Start Commands

After the AI helps you set up, you'll have these commands:

```bash
# Development
npm run env:start              # Start WordPress environment
composer install               # Install PHP dependencies
npm install                    # Install JS dependencies

# Testing
composer test                  # Run PHPUnit tests
composer lint                  # Check coding standards
composer analyze               # Run PHPStan
npm run test                   # Run all JS tests
npm run test:e2e              # Run E2E tests

# Documentation
npm run screenshots           # Generate screenshots
npm run playground:start      # Start Playground with Blueprint

# Quality
composer check-all            # Run all PHP checks
npm test                      # Run all JS checks

# Build
npm run build                 # Build production assets
composer install --no-dev     # Install for production
```

---

## 💬 Example Follow-Up Prompts

**During Development:**
```
Following the wp-dev-prompts framework, help me implement the settings page.
Use the security best practices from the repository and ensure proper:
- Sanitization of all inputs
- Nonce verification
- Capability checks
- Escaping of all outputs

Also write PHPUnit tests for this settings page.
```

**For Documentation:**
```
Using DOCUMENTATION-WORKFLOW.md, help me:
1. Create a WordPress Playground Blueprint that sets up the plugin with sample data
2. Write Playwright tests to automatically capture 5 screenshots
3. Generate README.md and readme.txt with the screenshots

Reference BLUEPRINT-CREATION-GUIDE.md for Blueprint creation.
```

**For Testing:**
```
Following TESTING-SETUP-GUIDE.md, help me set up:
1. PHPStan configuration for WordPress
2. PHPCS with WordPress Coding Standards
3. GitHub Actions workflow using github-workflows/wordpress-plugin-ci.yml

Use the relevant prompts from TESTING-AUTOMATION-PROMPTS.md.
```

---

## 📞 Support

If you need help with:
- **Using this prompt**: See examples above
- **The wp-dev-prompts framework**: Check individual guide files
- **Specific phases**: Reference the DEVELOPMENT-LIFECYCLE.md
- **WordPress questions**: Consult WordPress documentation
- **Contributing improvements**: See CONTRIBUTING.md

---

## ✨ Pro Tips

1. **Start with user stories** - Use USER-STORY-TEMPLATE.md before coding
2. **Set up testing first** - Don't wait until the end
3. **Create Blueprint early** - Makes demos and testing easier
4. **Automate screenshots** - Use Playwright + Playground
5. **Use AI prompts** - The repository has prompts for everything
6. **Follow the checklist** - DEVELOPMENT-LIFECYCLE.md keeps you on track
7. **Test early and often** - Run tests before every commit
8. **Document as you go** - Don't save it all for the end
9. **Use templates** - Copy from templates/ directory
10. **Leverage Playground** - Great for testing and demos

---

**Last Updated:** December 30, 2024
**Framework Version:** 1.3.0
**Compatible With:** WordPress 6.9+, PHP 8.2+
**Enhanced With:** [WordPress/agent-skills](https://github.com/WordPress/agent-skills) - WordPress Agent Skills for AI assistants

---

**Ready to start?** Copy the prompt above, fill in your project details, and let's build something amazing! 🚀
