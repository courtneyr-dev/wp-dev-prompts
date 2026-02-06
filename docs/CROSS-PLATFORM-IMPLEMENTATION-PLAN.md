# Cross-Platform AI Implementation Plan

**Status**: Planning (not yet implemented)
**Created**: December 30, 2024
**Purpose**: Make wp-dev-prompts work seamlessly across ChatGPT, Gemini, Claude, Claude Code, Cline, Copilot, Cursor, and other AI tools.

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Target Audience | All users of the repo | Not personal use; must be universally accessible |
| Portable Prompt Size | <2000 tokens | Fits context limits of most AI platforms |
| Tag Format | XML-style (`<task>`, `<context>`) | Best cross-platform compatibility per Gemini/Claude research |
| Skill Granularity | One skill per topic | Fine-grained for maximum reusability |
| Agent Autonomy | Ask for permission | Safe default for all users |
| Migration Strategy | Migrate, lose no content | All existing content preserved |
| Priority Platforms | Claude Code first | Primary validation target, then others |
| Prompt Priority | All equally important | Different prompts used at different project stages |
| Version Strategy | v2.0.0 release | Major restructure warrants major version bump |

## Contribution Guidelines

### For New Prompts

1. **Choose the right location**:
   - `prompts/core/` - Portable, <2000 tokens, self-contained
   - `prompts/extended/` - Full-featured, can reference other files

2. **Follow the universal format**:
   - Use XML-style tags (`<role>`, `<context>`, `<task>`, etc.)
   - Include all required sections (Variables, Expected Output)
   - Add platform-specific notes if behavior differs

3. **For portable prompts**:
   - Target 800-1200 tokens (max 2000)
   - Make completely self-contained (no external references)
   - Link to extended version if one exists

### For New Skills

1. **One skill per topic** - Don't combine multiple concepts
2. **Follow skill format** - See `skills/README.md`
3. **Include verification checklist** - How to confirm correct usage
4. **Add platform integration notes** - How to use in each tool

### For New Agents

1. **Specialists** - Single domain of expertise
2. **Orchestrators** - Coordinate multiple specialists
3. **Compositions** - Pre-configured agent groups
4. **Always ask permission** - Before taking significant actions

### For Platform Configurations

1. **Test in actual platform** before submitting
2. **Include WordPress-specific rules**
3. **Reference skills by path** where supported

---

## Prompt Usage by Project Stage

All prompts are equally important but used at different stages of a WordPress project:

| Stage | Prompts & Skills Used | Purpose |
|-------|----------------------|---------|
| **Brainstorming** | PROJECT-KICKSTART (Phase 1), User Story templates | Define scope, features, architecture |
| **Planning** | Content Strategy Agent, Competitive Intel Agent | Research, competitive analysis |
| **Setup** | Testing setup prompts, PHPCS/PHPStan configs | Initialize project infrastructure |
| **Development** | Block prompts, Security skills, Plugin architecture | Build features with best practices |
| **Testing** | PHPUnit, Playwright, Accessibility prompts | Verify quality across 21 dimensions |
| **Documentation** | Community files, README prompts, Blueprint guide | Create user and developer docs |
| **Pre-Launch** | QA checklist, Performance profiling, Security review | Final validation before release |
| **Launch** | Marketing prompts (blog, social, email, PR) | Announce and promote |
| **Maintenance** | Site review agents, Performance monitoring | Ongoing improvements |

---

## Table of Contents

1. [Universal Prompt Specification](#1-universal-prompt-specification)
2. [Directory Restructure Plan](#2-directory-restructure-plan)
3. [Skill Extraction Strategy](#3-skill-extraction-strategy)
4. [Agent Modularization](#4-agent-modularization)
5. [Platform Configurations](#5-platform-configurations)
6. [Portable Prompt Variants](#6-portable-prompt-variants)
7. [Migration Checklist](#7-migration-checklist)
8. [Implementation Phases](#8-implementation-phases)

---

## 1. Universal Prompt Specification

### 1.1 Standard Prompt Format

All prompts will follow this XML-tagged structure for maximum cross-platform compatibility:

```markdown
# [PROMPT_NAME]

> **Portable Version**: [link to portable variant if exists]
> **Platforms**: All (ChatGPT, Gemini, Claude, Copilot, Cursor, Cline)
> **Token Count**: ~[X] tokens

## Quick Copy

<prompt>
<role>
You are a [specific role with WordPress expertise].
</role>

<context>
[Background information - what problem this solves, what the user has]
- Current situation: [PLACEHOLDER]
- Goal: [PLACEHOLDER]
</context>

<task>
[Clear, specific instructions - what to do]

1. [Step 1]
2. [Step 2]
3. [Step 3]
</task>

<constraints>
- [Constraint 1 - e.g., "Follow WordPress Coding Standards"]
- [Constraint 2 - e.g., "Ask before making destructive changes"]
- [Constraint 3 - e.g., "Escape all output"]
</constraints>

<output_format>
[Explicit specification of expected output format]

Example:
```[language]
[code or structure example]
```
</output_format>
</prompt>

## Variables to Customize

| Variable | Description | Example |
|----------|-------------|---------|
| `[PLACEHOLDER_1]` | What to put here | `example-value` |
| `[PLACEHOLDER_2]` | What to put here | `example-value` |

## Expected Output

[Description of what the AI should produce]

## Platform-Specific Notes

### ChatGPT / GPT-4
- [Any adaptations needed]

### Gemini
- [Any adaptations needed]

### Claude Code / Cursor / Cline
- [Any adaptations needed - e.g., "Can use file system access"]

## Related Resources

- [Link to extended version]
- [Link to related skill]
- [Link to related guide]
```

### 1.2 Placeholder Convention

Standardize all placeholders:

| Format | Meaning | Example |
|--------|---------|---------|
| `[VARIABLE_NAME]` | Required user input | `[PLUGIN_NAME]` |
| `[variable_name]` | Required, lowercase expected | `[plugin-slug]` |
| `[e.g., value]` | Example provided | `[e.g., my-plugin]` |
| `[option1/option2]` | Choose one | `[plugin/theme]` |
| `[describe X]` | Free-form description | `[describe your feature]` |

### 1.3 Token Budget Guidelines

| Prompt Type | Target Tokens | Max Tokens |
|-------------|---------------|------------|
| Portable (core) | 800-1200 | 2000 |
| Extended | 2000-4000 | 6000 |
| Full (orchestrator) | 4000-8000 | No limit |

---

## 2. Directory Restructure Plan

### 2.1 New Directory Structure

```
wp-dev-prompts/
│
├── README.md                              # Updated with platform guide
├── CONTRIBUTING.md                        # Updated with new format specs
├── LICENSE
│
├── 📋 prompts/                            # RESTRUCTURED
│   ├── README.md                          # Prompt usage guide
│   │
│   ├── core/                              # NEW: Portable prompts (<2000 tokens)
│   │   ├── testing/
│   │   │   ├── phpunit-setup.md
│   │   │   ├── phpcs-setup.md
│   │   │   ├── phpstan-setup.md
│   │   │   ├── eslint-setup.md
│   │   │   ├── playwright-setup.md
│   │   │   └── ...
│   │   ├── blocks/
│   │   │   ├── static-block.md
│   │   │   ├── dynamic-block.md
│   │   │   ├── interactive-block.md
│   │   │   └── block-deprecation.md
│   │   ├── security/
│   │   │   ├── input-validation.md
│   │   │   ├── output-escaping.md
│   │   │   ├── nonce-capabilities.md
│   │   │   └── sql-safety.md
│   │   ├── documentation/
│   │   │   ├── readme-github.md
│   │   │   ├── readme-wporg.md
│   │   │   ├── changelog.md
│   │   │   └── contributing.md
│   │   └── marketing/
│   │       ├── blog-launch.md
│   │       ├── social-twitter.md
│   │       ├── email-sequence.md
│   │       └── press-release.md
│   │
│   ├── extended/                          # MOVED: Full prompts (current files)
│   │   ├── PROJECT-KICKSTART-PROMPT.md    # Moved from prompts/
│   │   ├── TESTING-AUTOMATION-PROMPTS.md  # Moved from prompts/
│   │   ├── BLOCK-DEVELOPMENT-PROMPTS.md   # Moved from prompts/
│   │   ├── COMMUNITY-FILES-PROMPTS.md     # Moved from prompts/
│   │   └── PLUGIN-MARKETING-PROMPTS.md    # Moved from prompts/
│   │
│   └── legacy/                            # SYMLINKS: Backward compatibility
│       ├── PROJECT-KICKSTART-PROMPT.md    → ../extended/PROJECT-KICKSTART-PROMPT.md
│       └── ...                            # Symlinks to extended versions
│
├── 🤖 agents/                             # NEW: Modular agents
│   ├── README.md                          # Agent architecture docs
│   │
│   ├── orchestrators/                     # Master coordinators
│   │   ├── site-review-orchestrator.md    # Extracted from DEIS
│   │   ├── plugin-kickstart-orchestrator.md
│   │   └── testing-setup-orchestrator.md
│   │
│   ├── specialists/                       # Domain experts (from DEIS)
│   │   ├── content-strategy.md
│   │   ├── seo-strategy.md
│   │   ├── accessibility.md
│   │   ├── performance.md
│   │   ├── security-advisory.md
│   │   ├── brand-consistency.md
│   │   ├── localization.md
│   │   ├── analytics.md
│   │   ├── user-research.md
│   │   └── competitive-intel.md
│   │
│   └── compositions/                      # Pre-configured agent groups
│       ├── full-site-assessment.md
│       ├── content-review.md
│       ├── experience-review.md
│       ├── security-review.md
│       └── launch-readiness.md
│
├── 🧩 skills/                             # NEW: Reusable skills (one per topic)
│   ├── README.md                          # Skill format specification
│   │
│   ├── wordpress/
│   │   ├── plugin-architecture.md
│   │   ├── theme-architecture.md
│   │   ├── block-development.md
│   │   ├── interactivity-api.md
│   │   ├── rest-api.md
│   │   └── wp-cli.md
│   │
│   ├── security/
│   │   ├── input-sanitization.md
│   │   ├── output-escaping.md
│   │   ├── nonces-csrf.md
│   │   ├── capabilities.md
│   │   └── sql-injection.md
│   │
│   ├── testing/
│   │   ├── phpunit.md
│   │   ├── phpcs-wpcs.md
│   │   ├── phpstan.md
│   │   ├── eslint.md
│   │   ├── jest.md
│   │   └── playwright.md
│   │
│   ├── performance/
│   │   ├── profiling.md
│   │   ├── caching.md
│   │   ├── database-optimization.md
│   │   └── asset-loading.md
│   │
│   └── accessibility/
│       ├── wcag-basics.md
│       ├── aria-patterns.md
│       └── testing-tools.md
│
├── 🔧 platforms/                          # NEW: Platform-specific configs
│   ├── README.md                          # Platform selection guide
│   │
│   ├── universal/
│   │   ├── prompt-specification.md        # This format spec
│   │   └── capability-matrix.md           # What each platform can do
│   │
│   ├── claude-code/
│   │   ├── CLAUDE.md                      # Main instructions file
│   │   ├── settings.json                  # .claude/ settings
│   │   └── mcp-servers.md                 # Recommended MCP servers
│   │
│   ├── cursor/
│   │   ├── .cursorrules                   # Root cursor rules
│   │   └── rules/                         # Domain-specific rules
│   │       ├── wordpress.mdc
│   │       ├── testing.mdc
│   │       ├── blocks.mdc
│   │       └── security.mdc
│   │
│   ├── cline/
│   │   ├── .clinerules                    # Cline project rules
│   │   └── custom-modes.md                # Plan vs Act mode guidance
│   │
│   ├── copilot/
│   │   └── copilot-instructions.md        # .github/copilot-instructions.md
│   │
│   ├── chatgpt/
│   │   ├── custom-gpt-config.md           # Instructions for Custom GPT
│   │   └── knowledge-base.md              # What to upload as knowledge
│   │
│   └── gemini/
│       ├── system-instructions.md         # Gemini system prompt
│       └── context-placement.md           # Gemini-specific tips
│
├── 🔄 workflows/                          # NEW: Multi-step workflows
│   ├── README.md
│   │
│   ├── new-plugin/
│   │   ├── overview.md                    # Workflow description
│   │   ├── step-1-planning.md
│   │   ├── step-2-setup.md
│   │   ├── step-3-testing.md
│   │   ├── step-4-development.md
│   │   ├── step-5-documentation.md
│   │   └── step-6-launch.md
│   │
│   ├── add-testing/
│   │   ├── overview.md
│   │   ├── php-testing.md
│   │   ├── js-testing.md
│   │   └── ci-setup.md
│   │
│   ├── site-review/
│   │   ├── overview.md
│   │   ├── quick-audit.md
│   │   └── full-assessment.md
│   │
│   └── block-creation/
│       ├── overview.md
│       ├── static-block.md
│       ├── dynamic-block.md
│       └── interactive-block.md
│
├── 📚 guides/                             # KEPT: Comprehensive guides
│   ├── DEVELOPMENT-LIFECYCLE.md
│   ├── DOCUMENTATION-WORKFLOW.md
│   ├── PLUGIN-DEVELOPMENT-WORKFLOW.md
│   ├── PLUGIN-MARKETING-STRATEGY.md
│   ├── SCREENSHOT-DOCUMENTATION-GUIDE.md
│   └── testing/
│       ├── TESTING-README.md
│       ├── TESTING-SETUP-GUIDE.md
│       └── TESTING-QUICK-REFERENCE.md
│
├── 📑 templates/                          # KEPT: Ready-to-use templates
│   ├── community/
│   ├── github/
│   ├── marketing/
│   ├── workflows/
│   └── checklists/
│
├── 🔧 scripts/                            # KEPT + NEW
│   ├── setup-testing.sh                   # Existing
│   └── generate-portable-prompts.js       # NEW: Generate portable variants
│
├── ⚙️ github-workflows/                   # KEPT
│   ├── wordpress-plugin-ci.yml
│   ├── visual-regression-testing.yml
│   └── dependabot-auto-merge.yml
│
├── 📖 docs/                               # KEPT + NEW
│   ├── SETUP-COMPLETE.md
│   ├── product-research.md
│   └── CROSS-PLATFORM-IMPLEMENTATION-PLAN.md  # This file
│
└── 🗄️ archive/                            # NEW: Preserved originals
    └── v1.3-original/                     # Snapshot before migration
        └── [all original files]
```

### 2.2 Backward Compatibility Strategy

1. **Symlinks in prompts/legacy/**: Point to new locations
2. **README redirects**: Note new locations at top of moved files
3. **Archive folder**: Complete snapshot of v1.3 before changes

### 2.3 File Movement Map

| Original Location | New Location | Action |
|-------------------|--------------|--------|
| `prompts/PROJECT-KICKSTART-PROMPT.md` | `prompts/extended/PROJECT-KICKSTART-PROMPT.md` | Move + symlink |
| `prompts/TESTING-AUTOMATION-PROMPTS.md` | `prompts/extended/TESTING-AUTOMATION-PROMPTS.md` | Move + symlink |
| `prompts/BLOCK-DEVELOPMENT-PROMPTS.md` | `prompts/extended/BLOCK-DEVELOPMENT-PROMPTS.md` | Move + symlink |
| `prompts/COMMUNITY-FILES-PROMPTS.md` | `prompts/extended/COMMUNITY-FILES-PROMPTS.md` | Move + symlink |
| `prompts/PLUGIN-MARKETING-PROMPTS.md` | `prompts/extended/PLUGIN-MARKETING-PROMPTS.md` | Move + symlink |
| `prompts/site-review/DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md` | Split into `agents/` | Extract + preserve original |

---

## 3. Skill Extraction Strategy

### 3.1 Skills to Extract

Extract one skill per topic from existing content:

#### From WordPress/agent-skills Integration

| Skill | Source | Content |
|-------|--------|---------|
| `wordpress/plugin-architecture.md` | PROJECT-KICKSTART, agent-skills | Bootstrap, hooks, lifecycle |
| `wordpress/block-development.md` | BLOCK-DEVELOPMENT-PROMPTS | apiVersion 3, models, deprecations |
| `wordpress/interactivity-api.md` | BLOCK-DEVELOPMENT-PROMPTS | Directives, stores, hydration |
| `wordpress/wp-cli.md` | TESTING-AUTOMATION-PROMPTS | Operations, migrations |
| `security/input-sanitization.md` | PROJECT-KICKSTART | Sanitize functions, patterns |
| `security/output-escaping.md` | PROJECT-KICKSTART | Escape functions, late escaping |
| `security/nonces-csrf.md` | PROJECT-KICKSTART | Nonce + capability combo |
| `performance/profiling.md` | TESTING-AUTOMATION-PROMPTS | wp profile, diagnostics |

#### From Existing Testing Prompts

| Skill | Source | Content |
|-------|--------|---------|
| `testing/phpunit.md` | TESTING-AUTOMATION-PROMPTS #1-2 | Unit + integration tests |
| `testing/phpcs-wpcs.md` | TESTING-AUTOMATION-PROMPTS #3 | WordPress Coding Standards |
| `testing/phpstan.md` | TESTING-AUTOMATION-PROMPTS #4 | Static analysis config |
| `testing/eslint.md` | TESTING-AUTOMATION-PROMPTS #6 | JavaScript linting |
| `testing/jest.md` | TESTING-AUTOMATION-PROMPTS #7 | JS unit testing |
| `testing/playwright.md` | TESTING-AUTOMATION-PROMPTS #8 | E2E testing |

### 3.2 Skill File Format

```markdown
# [SKILL_NAME]

> **Topic**: [category/topic-name]
> **Platforms**: All
> **Source**: [WordPress/agent-skills](URL) | wp-dev-prompts

<skill>
<summary>
[One-line description of what this skill teaches]
</summary>

<knowledge>
## Core Concepts

[Key concepts the AI needs to know]

## Best Practices

1. [Practice 1]
2. [Practice 2]
3. [Practice 3]

## Common Patterns

```[language]
[Code pattern example]
```

## Anti-Patterns (Avoid)

- ❌ [What not to do]
- ❌ [What not to do]

## Verification Checklist

- [ ] [How to verify correct implementation]
- [ ] [How to verify correct implementation]
</knowledge>

<references>
- [WordPress Developer Docs](URL)
- [WordPress/agent-skills](URL)
</references>
</skill>

## Platform Integration

### Claude Code / Cursor / Cline
[How to use this skill in IDE-based tools]

### ChatGPT / Gemini
[How to reference this knowledge in conversation]
```

---

## 4. Agent Modularization

### 4.1 Digital Experience Integrity System Breakdown

The current 800+ line DEIS file will be split into:

#### Orchestrator (agents/orchestrators/site-review-orchestrator.md)

```markdown
# Site Review Orchestrator

<agent type="orchestrator">
<role>
You are the Digital Experience Integrity Orchestrator. You coordinate
specialized agents to perform comprehensive website assessments.
</role>

<capabilities>
- Route requests to appropriate specialist agents
- Synthesize findings across multiple domains
- Prioritize recommendations by business impact
- Assign ownership via RACI model
</capabilities>

<routing>
## Decision Tree

When user describes their problem, route to appropriate agents:

| Problem | Agents to Spawn |
|---------|-----------------|
| "Users can't find things" | SEO + Content Strategy |
| "Users find pages but don't act" | Content Consulting + Marketing |
| "Usability complaints" | Accessibility + User Research |
| "Site feels slow" | Performance |
| "Security concerns" | Security Advisory |
| [Full decision tree...] |
</routing>

<activation_commands>
- `[FULL ASSESSMENT]` - All agents, phased approach
- `[CONTENT REVIEW]` - Content Strategy + Consulting + Marketing
- `[EXPERIENCE REVIEW]` - Accessibility + Performance + User Research
- `[SECURITY REVIEW]` - Security Advisory + Analytics
- `[SPECIFIC: agent-name]` - Single specialist
</activation_commands>

<output_synthesis>
## Final Deliverable Structure

1. Executive Summary (top 5 findings by impact)
2. Findings by Domain (each agent's output)
3. RACI Ownership Matrix
4. Prioritized Action Plan
</output_synthesis>
</agent>
```

#### Specialists (agents/specialists/*.md)

Each specialist becomes its own file:

```markdown
# Content Strategy Agent

<agent type="specialist">
<role>
You are a Content Strategist focused on information architecture
and content systems.
</role>

<analyzes>
- Page intent clarity and alignment with user tasks
- Navigation logic, labels, and wayfinding
- Content models (types, fields, relationships, governance)
- Content gaps, duplication, staleness, and contradictions
- Editorial workflows and publishing sustainability
</analyzes>

<delivers>
- Content inventory with health scores
- Information architecture recommendations
- Content model specifications
- Gap analysis mapped to user journeys
- Governance playbooks
</delivers>

<methodology>
## Assessment Process

1. [Step 1]
2. [Step 2]
3. [Step 3]
</methodology>

<raci_assignments>
| Activity | Accountable | Responsible | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| Content inventory | Product Owner | This Agent | UX, Support | Leadership |
| Gap analysis | Product Owner | This Agent | Engineering | Leadership |
</raci_assignments>
</agent>
```

#### Compositions (agents/compositions/*.md)

Pre-configured multi-agent setups:

```markdown
# Full Site Assessment

<composition>
<agents>
- site-review-orchestrator (coordinator)
- content-strategy
- seo-strategy
- accessibility
- performance
- security-advisory
- brand-consistency
- localization
- analytics
- user-research
- competitive-intel
</agents>

<execution_order>
Phase 1 (Parallel): Content Strategy, SEO, Performance
Phase 2 (Parallel): Accessibility, Security, Analytics
Phase 3 (Parallel): Brand, Localization, User Research
Phase 4 (Sequential): Competitive Intel (needs prior findings)
Phase 5: Orchestrator synthesizes all findings
</execution_order>

<permissions>
Before proceeding, ask user to confirm:
- [ ] Scope of assessment (which pages/sections)
- [ ] Access to analytics data
- [ ] Stakeholder availability for RACI assignments
- [ ] Timeline expectations
</permissions>
</composition>
```

### 4.2 Preserved Content

The original DEIS file will be:
1. Archived in `archive/v1.3-original/`
2. Kept as `prompts/extended/DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md` with redirect notice

---

## 5. Platform Configurations

### 5.1 Claude Code Configuration

**platforms/claude-code/CLAUDE.md**:
```markdown
# WordPress Development with wp-dev-prompts

You have access to the wp-dev-prompts framework for WordPress development.

## Skills Available

Load skills from `skills/` directory as needed:
- wordpress/* - Core WordPress patterns
- security/* - Security best practices
- testing/* - Testing setup and configuration
- performance/* - Optimization techniques

## Behaviors

1. **Ask Permission** before:
   - Creating new files
   - Modifying existing code
   - Running destructive commands
   - Making architectural decisions

2. **Reference Skills** when working on:
   - Security-sensitive code → Load security/* skills
   - Block development → Load wordpress/block-development.md
   - Testing setup → Load testing/* skills

3. **Use Portable Prompts** from `prompts/core/` for focused tasks

4. **Follow WordPress Standards**:
   - WordPress Coding Standards (WPCS)
   - Sanitize input, escape output
   - Use nonces + capabilities together

## MCP Servers Recommended

- filesystem - File operations
- git - Version control
- github - Issues and PRs
```

### 5.2 Cursor Configuration

**platforms/cursor/.cursorrules**:
```markdown
# WordPress Development Rules

You are working on a WordPress project using the wp-dev-prompts framework.

## Core Principles

1. Follow WordPress Coding Standards (WPCS)
2. Security: Sanitize input early, escape output late
3. Always combine nonces with capability checks
4. Use WordPress APIs over custom implementations

## Code Patterns

### PHP Security
- Use `sanitize_*()` functions for input
- Use `esc_*()` functions for output
- Use `$wpdb->prepare()` for SQL
- Check `current_user_can()` for permissions

### Block Development
- Use apiVersion: 3 for WordPress 6.9+
- Never change block names after release
- Add deprecations when changing saved markup

### Testing
- PHPUnit with WordPress test suite
- PHPCS with WordPress standards
- ESLint with @wordpress/eslint-plugin

## Ask Before

- Creating new database tables
- Modifying core WordPress behavior
- Adding external dependencies
- Changing existing public APIs
```

### 5.3 Cline Configuration

**platforms/cline/.clinerules**:
```markdown
# WordPress Development with wp-dev-prompts

## Project Context
This project uses the wp-dev-prompts framework for WordPress development.

## Plan Mode
Use Plan mode when:
- Designing plugin/theme architecture
- Planning testing infrastructure
- Evaluating multiple implementation approaches
- Reviewing security implications

## Act Mode
Use Act mode when:
- Implementing approved plans
- Writing tests for existing code
- Fixing identified bugs
- Updating documentation

## Permissions Required
Always ask before:
- Creating new files outside current scope
- Installing new dependencies
- Modifying database schema
- Running commands that affect production

## WordPress Standards
- Follow WPCS coding standards
- Sanitize all input, escape all output
- Use nonces + capabilities together
- Prefer WordPress APIs over custom code
```

### 5.4 GitHub Copilot Configuration

**platforms/copilot/copilot-instructions.md**:
```markdown
# WordPress Development Instructions

When generating code for this WordPress project:

## Security Requirements
- Always sanitize user input with appropriate sanitize_*() functions
- Always escape output with appropriate esc_*() functions
- Use $wpdb->prepare() for all database queries with variables
- Combine nonce verification with current_user_can() checks

## Coding Standards
- Follow WordPress PHP Coding Standards
- Use WordPress naming conventions (snake_case for functions)
- Prefix all functions, classes, and constants
- Add proper PHPDoc blocks to all functions

## Block Development
- Use apiVersion: 3 in block.json
- Implement deprecations when changing saved markup
- Use @wordpress/scripts for building

## Testing
- Write PHPUnit tests for PHP code
- Write Jest tests for JavaScript
- Include edge cases and error conditions
```

### 5.5 ChatGPT Custom GPT Configuration

**platforms/chatgpt/custom-gpt-config.md**:
```markdown
# WordPress Development Assistant - Custom GPT Configuration

## Name
WordPress Development Assistant (wp-dev-prompts)

## Description
Expert WordPress plugin and theme development assistant using the
wp-dev-prompts framework. Provides guidance on testing, security,
blocks, performance, and documentation.

## Instructions

You are an expert WordPress developer assistant. You help users build
professional WordPress plugins and themes following best practices.

### Core Knowledge Areas
1. WordPress Plugin Development (architecture, hooks, security)
2. WordPress Block Development (Gutenberg, apiVersion 3)
3. WordPress Testing (PHPUnit, PHPCS, Playwright)
4. WordPress Security (sanitization, escaping, nonces)
5. WordPress Performance (profiling, caching, optimization)

### Response Guidelines
1. Always follow WordPress Coding Standards
2. Prioritize security in all code suggestions
3. Provide complete, production-ready code
4. Explain the "why" behind recommendations
5. Ask clarifying questions when requirements are unclear

### Security Rules (Always Apply)
- Sanitize input: sanitize_text_field(), absint(), etc.
- Escape output: esc_html(), esc_attr(), esc_url(), etc.
- Use nonces AND capability checks together
- Use $wpdb->prepare() for database queries

### When Asked About Testing
Reference the 21 quality dimensions: PHPUnit, PHPCS, PHPStan,
ESLint, Jest, Playwright, security scanning, accessibility,
performance, visual regression, etc.

### When Asked About Blocks
- Recommend apiVersion: 3 for WordPress 6.9+
- Explain static vs dynamic vs interactive blocks
- Emphasize never changing block names
- Require deprecations for markup changes

## Conversation Starters
- "Help me set up testing for my WordPress plugin"
- "Create a new Gutenberg block for [purpose]"
- "Review this code for security issues"
- "How do I structure a WordPress plugin?"

## Knowledge Files
Upload these from the wp-dev-prompts repository:
- prompts/extended/PROJECT-KICKSTART-PROMPT.md
- skills/wordpress-dev/*.md
- skills/wordpress-security/*.md
- skills/wordpress-testing/*.md
```

### 5.6 Gemini Configuration

**platforms/gemini/system-instructions.md**:
```markdown
# WordPress Development Assistant - Gemini System Instructions

<role>
You are an expert WordPress developer assistant using the wp-dev-prompts
framework. You help users build professional WordPress plugins and themes.
</role>

<expertise>
- WordPress Plugin/Theme Architecture
- Gutenberg Block Development (apiVersion 3)
- WordPress Security Best Practices
- Testing Infrastructure (PHPUnit, PHPCS, Playwright)
- Performance Optimization
- WordPress REST API
- WP-CLI Operations
</expertise>

<guidelines>
1. Follow WordPress Coding Standards in all code
2. Prioritize security: sanitize input, escape output
3. Always combine nonces with capability checks
4. Provide complete, working code (not pseudo-code)
5. Ask clarifying questions when requirements are ambiguous
6. Explain the reasoning behind recommendations
</guidelines>

<security_rules>
ALWAYS apply these security patterns:
- Input: Use sanitize_text_field(), absint(), sanitize_email(), etc.
- Output: Use esc_html(), esc_attr(), esc_url(), wp_kses_post()
- Database: Use $wpdb->prepare() for all variable queries
- Auth: Combine wp_verify_nonce() with current_user_can()
</security_rules>

<block_development>
For Gutenberg blocks:
- Use apiVersion: 3 (required for WordPress 6.9+)
- Never change block names after initial release
- Add deprecations when changing saved markup
- Choose: static (save.js) | dynamic (render.php) | interactive (Interactivity API)
</block_development>

<permissions>
Before making significant changes, ask the user to confirm:
- Architecture decisions
- New dependencies
- Database schema changes
- Breaking changes to existing code
</permissions>
```

---

## 6. Portable Prompt Variants

### 6.1 Extraction Process

For each extended prompt, create a portable version:

1. **Identify core task** - What's the essential action?
2. **Remove external references** - Make self-contained
3. **Condense context** - Keep only essential background
4. **Simplify output spec** - Clear but concise
5. **Target <2000 tokens** - Verify with tokenizer

### 6.2 Example: PHPUnit Setup (Portable)

**Original** (TESTING-AUTOMATION-PROMPTS.md #1): ~800 tokens in prompt section
**Portable** (prompts/core/testing/phpunit-setup.md): Target ~600 tokens

```markdown
# PHPUnit Setup for WordPress

> **Portable Version**: <2000 tokens, self-contained
> **Full Version**: [TESTING-AUTOMATION-PROMPTS.md](../../extended/TESTING-AUTOMATION-PROMPTS.md#1-phpunit-unit-tests)

<prompt>
<role>
You are a WordPress testing expert setting up PHPUnit.
</role>

<context>
Project: WordPress [plugin/theme] called [PROJECT_NAME]
WordPress: [6.5+]
PHP: [8.0+]
Current tests: [none/describe existing]
</context>

<task>
Set up PHPUnit for WordPress with:

1. Create composer.json with:
   - phpunit/phpunit ^9.0
   - yoast/phpunit-polyfills
   - wp-phpunit/wp-phpunit

2. Create phpunit.xml.dist with:
   - Unit test suite (tests/unit/)
   - Integration test suite (tests/integration/)
   - WordPress test bootstrap

3. Create tests/bootstrap.php for WordPress integration

4. Create one example unit test demonstrating:
   - Test class structure
   - setUp/tearDown methods
   - WordPress function mocking
</task>

<constraints>
- Use Yoast PHPUnit Polyfills for compatibility
- Follow WordPress testing conventions
- Tests should be isolated and independent
</constraints>

<output_format>
Provide complete file contents for:
1. composer.json (dev dependencies section)
2. phpunit.xml.dist
3. tests/bootstrap.php
4. tests/unit/ExampleTest.php
</output_format>
</prompt>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `[plugin/theme]` | Project type | `plugin` |
| `[PROJECT_NAME]` | Your project name | `My Awesome Plugin` |
| `[6.5+]` | Min WordPress version | `6.7` |
| `[8.0+]` | Min PHP version | `8.1` |

## Expected Output

Complete, working configuration files ready to use after
running `composer install`.
```

### 6.3 Portable Prompts to Create

| Category | Portable Prompts to Extract |
|----------|----------------------------|
| **Testing** | phpunit-setup, phpcs-setup, phpstan-setup, eslint-setup, jest-setup, playwright-setup |
| **Blocks** | static-block, dynamic-block, interactive-block, block-deprecation, theme-json |
| **Security** | input-validation, output-escaping, nonce-setup, capability-check |
| **Documentation** | readme-github, readme-wporg, changelog, contributing, security-policy |
| **Marketing** | blog-launch, social-twitter, email-sequence, press-release |

---

## 7. Migration Checklist

### 7.1 Pre-Migration

- [ ] Create `archive/v1.3-original/` with complete snapshot
- [ ] Document all file locations and purposes
- [ ] Verify no external dependencies will break
- [ ] Communicate changes in CHANGELOG.md

### 7.2 Directory Structure

- [ ] Create `prompts/core/` directory structure
- [ ] Create `prompts/extended/` directory
- [ ] Create `agents/` directory structure
- [ ] Create `skills/` directory structure
- [ ] Create `platforms/` directory structure
- [ ] Create `workflows/` directory structure

### 7.3 File Movements

- [ ] Move PROJECT-KICKSTART-PROMPT.md → prompts/extended/
- [ ] Move TESTING-AUTOMATION-PROMPTS.md → prompts/extended/
- [ ] Move BLOCK-DEVELOPMENT-PROMPTS.md → prompts/extended/
- [ ] Move COMMUNITY-FILES-PROMPTS.md → prompts/extended/
- [ ] Move PLUGIN-MARKETING-PROMPTS.md → prompts/extended/
- [ ] Split DIGITAL-EXPERIENCE-INTEGRITY-SYSTEM.md → agents/
- [ ] Create symlinks in prompts/legacy/ for backward compatibility

### 7.4 New Content Creation

- [ ] Create universal prompt specification (platforms/universal/prompt-specification.md)
- [ ] Create platform capability matrix (platforms/universal/capability-matrix.md)
- [ ] Extract skills from extended prompts → skills/
- [ ] Create portable prompt variants → prompts/core/
- [ ] Create platform configurations → platforms/*/
- [ ] Create workflow guides → workflows/

### 7.5 Documentation Updates

- [ ] Update main README.md with new structure
- [ ] Update CONTRIBUTING.md with new format specs
- [ ] Add redirect notices to moved files
- [ ] Create prompts/README.md explaining core vs extended
- [ ] Create agents/README.md explaining architecture
- [ ] Create skills/README.md with format spec
- [ ] Create platforms/README.md with selection guide

### 7.6 Validation

- [ ] Verify all original content preserved
- [ ] Test symlinks work correctly
- [ ] Validate portable prompts are <2000 tokens
- [ ] Test platform configs in each tool
- [ ] Verify cross-references still work
- [ ] Run any existing tests

### 7.7 Release

- [ ] Update version to 2.0.0
- [ ] Update CHANGELOG.md with all changes
- [ ] Tag release in git
- [ ] Announce changes to users

---

## 8. Implementation Phases

### Phase 1: Foundation
**Scope**: Create structure and specifications

- Create archive of v1.3
- Create new directory structure (empty)
- Write universal prompt specification
- Write platform capability matrix
- Update CONTRIBUTING.md with new format

**Deliverables**:
- `archive/v1.3-original/`
- Empty directory structure
- `platforms/universal/prompt-specification.md`
- `platforms/universal/capability-matrix.md`

### Phase 2: Content Migration
**Scope**: Move existing files, maintain compatibility

- Move extended prompts to new location
- Create symlinks for backward compatibility
- Add redirect notices to moved files
- Split DEIS into agents/

**Deliverables**:
- All extended prompts in `prompts/extended/`
- Symlinks in `prompts/legacy/`
- Modular agents in `agents/`

### Phase 3: Skill Extraction
**Scope**: Create reusable skills from existing content

- Extract WordPress skills
- Extract security skills
- Extract testing skills
- Extract performance skills
- Extract accessibility skills

**Deliverables**:
- All skills in `skills/` following format spec

### Phase 4: Portable Prompts
**Scope**: Create <2000 token versions of key prompts

- Create testing portable prompts
- Create block development portable prompts
- Create security portable prompts
- Create documentation portable prompts
- Create marketing portable prompts

**Deliverables**:
- All portable prompts in `prompts/core/`
- Each validated to be <2000 tokens

### Phase 5: Platform Configurations
**Scope**: Create configs for each AI platform

- Create Claude Code configuration
- Create Cursor configuration
- Create Cline configuration
- Create Copilot configuration
- Create ChatGPT Custom GPT guide
- Create Gemini configuration

**Deliverables**:
- Complete `platforms/` directory with all configs

### Phase 6: Workflows & Polish
**Scope**: Create workflow guides, finalize documentation

- Create workflow guides
- Update main README.md
- Create directory READMEs
- Final validation and testing
- Version bump to 2.0.0

**Deliverables**:
- Complete `workflows/` directory
- Updated documentation
- Release 2.0.0

---

## Appendix: Token Counting

### Tools for Validation

```bash
# Using tiktoken (Python)
pip install tiktoken
python -c "import tiktoken; enc = tiktoken.get_encoding('cl100k_base'); print(len(enc.encode(open('file.md').read())))"

# Using OpenAI tokenizer web tool
# https://platform.openai.com/tokenizer

# Rough estimate: ~4 characters per token for English text
wc -c file.md  # Divide by 4 for rough token count
```

### Token Budget Reference

| Content Type | Character Limit | Token Estimate |
|--------------|-----------------|----------------|
| Portable prompt | ~8000 chars | ~2000 tokens |
| Skill file | ~4000 chars | ~1000 tokens |
| Platform config | ~2000 chars | ~500 tokens |

---

## Resolved Questions

| Question | Decision |
|----------|----------|
| Priority order for portable prompts | All equally important - used at different project stages |
| Platform priority for validation | Claude Code first, then others |
| Naming conventions | Use existing conventions (no changes) |
| Versioning strategy | Single version for entire repo (v2.0.0) |
| Contribution guidelines | Added to Design Decisions section above |
