# WordPress Plugin/Theme Development Lifecycle

**The complete workflow from initial idea to ongoing maintenance.**

This document sequences all the resources in this repository into a coherent, step-by-step workflow. Follow this guide to take your WordPress project from research through deployment and beyond.

**Timeline Overview:**
- 📊 **Research Phase**: 1-2 weeks
- 📋 **Planning Phase**: 1-2 weeks
- 🔧 **Setup Phase**: 1-2 days
- 💻 **Development Phase**: 4-12 weeks (varies by scope)
- 🧪 **Testing Phase**: 1-2 weeks
- 🚀 **Launch Phase**: 1 week
- 🔄 **Maintenance Phase**: Ongoing

---

## Table of Contents

1. [Phase 0: Pre-Research](#phase-0-pre-research)
2. [Phase 1: Research & Validation](#phase-1-research--validation)
3. [Phase 2: Planning & Requirements](#phase-2-planning--requirements)
4. [Phase 3: Technical Setup](#phase-3-technical-setup)
5. [Phase 4: Development](#phase-4-development)
6. [Phase 5: Testing & Quality Assurance](#phase-5-testing--quality-assurance)
7. [Phase 6: Pre-Launch Preparation](#phase-6-pre-launch-preparation)
8. [Phase 7: Launch & Deployment](#phase-7-launch--deployment)
9. [Phase 8: Post-Launch Monitoring](#phase-8-post-launch-monitoring)
10. [Phase 9: Ongoing Maintenance](#phase-9-ongoing-maintenance)
11. [Phase 10: Feature Releases](#phase-10-feature-releases)
12. [Decision Gates](#decision-gates)
13. [Phase Summary Checklist](#phase-summary-checklist)

---

## Visual Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: PRE-RESEARCH                        │
│  Identify vertical → Market research → Feasibility analysis     │
└─────────────────────┬───────────────────────────────────────────┘
                      ↓
                 [GO/NO-GO GATE]
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│                PHASE 1: RESEARCH & VALIDATION                   │
│  Competitive analysis → User interviews → Technical research    │
└─────────────────────┬───────────────────────────────────────────┘
                      ↓
              [VALIDATION GATE]
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│              PHASE 2: PLANNING & REQUIREMENTS                   │
│  Write user stories → Define architecture → Plan sprints       │
└─────────────────────┬───────────────────────────────────────────┘
                      ↓
              [PLANNING GATE]
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│                 PHASE 3: TECHNICAL SETUP                        │
│  Setup repo → Install testing → Configure CI/CD                │
└─────────────────────┬───────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│                   PHASE 4: DEVELOPMENT                          │
│  Sprint cycles → Code review → Continuous testing              │
└─────────────────────┬───────────────────────────────────────────┘
                      ↓
              [CODE COMPLETE GATE]
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│            PHASE 5: TESTING & QUALITY ASSURANCE                 │
│  Automated tests → Manual QA → Security audit                  │
└─────────────────────┬───────────────────────────────────────────┘
                      ↓
               [QA GATE]
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│              PHASE 6: PRE-LAUNCH PREPARATION                    │
│  Documentation → Assets → Marketing materials                   │
└─────────────────────┬───────────────────────────────────────────┘
                      ↓
              [LAUNCH GATE]
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│                PHASE 7: LAUNCH & DEPLOYMENT                     │
│  Submit to WP.org → Deploy → Announce                          │
└─────────────────────┬───────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│               PHASE 8: POST-LAUNCH MONITORING                   │
│  Monitor errors → Support users → Gather feedback              │
└─────────────────────┬───────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│                PHASE 9: ONGOING MAINTENANCE                     │
│  Bug fixes → Security updates → Compatibility updates          │
└─────────────────────┬───────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│                 PHASE 10: FEATURE RELEASES                      │
│  Plan features → Develop → Test → Release (repeat cycle)       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 0: Pre-Research

**Duration:** 2-3 days
**Goal:** Identify a viable vertical and determine if it's worth pursuing
**Resources:** [product-research.md](./product-research.md)

### Activities

#### 1. Identify Vertical/Market Opportunity

**Questions to Answer:**
- What problem are you solving?
- Who has this problem?
- How are they currently solving it?
- Why is now the right time?

**Method:**
```markdown
1. Browse WordPress.org plugin/theme directory
2. Read WordPress forums and support tickets
3. Check GitHub issues on popular plugins
4. Search Twitter for WordPress pain points
5. Review /r/WordPress on Reddit
```

**Output:** List of 3-5 potential verticals

---

#### 2. Quick Market Assessment

**For each potential vertical, evaluate:**

| Criteria | Weight | Score (1-10) | Notes |
|----------|--------|--------------|-------|
| Market size | 3x | ___ | How many potential users? |
| Problem severity | 2x | ___ | How painful is the problem? |
| Competition | 2x | ___ | How crowded is the space? |
| Your expertise | 1x | ___ | Can you build this well? |
| Monetization potential | 1x | ___ | Can you make money? |
| **Total** | | **___** | Multiply weight × score |

**Scoring Guide:**
- 8-10: Strong opportunity
- 6-7: Moderate opportunity
- <6: Weak opportunity (reconsider)

---

#### 3. Feasibility Check

**Technical Feasibility:**
- [ ] Can be built with WordPress core functionality
- [ ] Required APIs/services are available
- [ ] Performance requirements are achievable
- [ ] Can meet accessibility standards
- [ ] Compatible with common plugins/themes

**Business Feasibility:**
- [ ] Time to MVP: ≤ 12 weeks
- [ ] Budget available for development
- [ ] Marketing channel identified
- [ ] Support strategy defined
- [ ] Maintenance resources available

**Personal Feasibility:**
- [ ] Have required technical skills
- [ ] Available time commitment
- [ ] Interested in the problem space
- [ ] Can provide ongoing support

---

### Output Documents

Create a brief feasibility document:

```markdown
# Feasibility Analysis: [Project Name]

## Problem Statement
[1-2 paragraphs describing the problem]

## Market Opportunity
- Target audience: [describe]
- Market size: [estimate number of potential users]
- Competition: [list top 3 competitors]

## Solution Overview
[1 paragraph describing your solution]

## Feasibility
- Technical: [GREEN/YELLOW/RED + explanation]
- Business: [GREEN/YELLOW/RED + explanation]
- Personal: [GREEN/YELLOW/RED + explanation]

## Recommendation
[GO / NO-GO + reasoning]
```

---

### Decision Point: GO/NO-GO GATE

**Proceed if:**
- ✅ Market opportunity score ≥ 60
- ✅ All feasibility checks are GREEN or YELLOW
- ✅ You're excited about building this

**Stop if:**
- ❌ Market opportunity score < 40
- ❌ Any feasibility check is RED
- ❌ You're not excited (you'll need the motivation)

---

## Phase 1: Research & Validation

**Duration:** 1-2 weeks
**Goal:** Deeply understand the problem, validate demand, and research technical approach
**Resources:** [product-research.md](./product-research.md)

### Activities

#### 1. Competitive Analysis (2-3 days)

**Research Top Competitors:**

For each major competitor, document:

```markdown
## [Competitor Name]

**Overview:**
- Users: [active installs]
- Rating: [WordPress.org rating]
- Price: [free/premium pricing]
- Last updated: [date]

**Strengths:**
- [What they do well]
- [Popular features]

**Weaknesses:**
- [What users complain about]
- [Missing features]
- [UX issues]

**Opportunity:**
[How can you differentiate?]
```

**Where to Research:**
- WordPress.org plugin/theme page
- Support forums and reviews
- Product Hunt (if listed)
- YouTube reviews
- Blog posts and comparisons

**Output:** Competitive analysis document with 5-10 competitors

---

#### 2. User Research (3-5 days)

**Interview Potential Users:**

**Target:** 10-15 interviews with:
- Current users of competitor solutions
- People experiencing the problem
- WordPress professionals in the space

**Interview Script:**
```markdown
1. Background (5 min)
   - Tell me about your WordPress experience
   - What do you primarily use WordPress for?

2. Problem Discovery (10 min)
   - Tell me about [the problem]
   - How does this impact your work?
   - What have you tried to solve it?

3. Current Solutions (10 min)
   - What are you currently using?
   - What do you like about it?
   - What frustrates you?
   - What's missing?

4. Solution Validation (10 min)
   - [Describe your proposed solution]
   - Would this solve your problem?
   - What concerns do you have?
   - What would make this a must-have?

5. Wrap-up (5 min)
   - Anything else I should know?
   - Can I follow up with you?
```

**Output:** Interview notes and synthesis document

---

#### 3. Technical Research (2-3 days)

**Research Technical Approach:**

Use resources in this repository:

1. **Review similar implementations:**
   - Search GitHub for similar WordPress plugins
   - Read source code of competitors (if available)
   - Check WordPress core for relevant APIs

2. **Identify WordPress APIs needed:**
   - [ ] Settings API
   - [ ] REST API
   - [ ] Block Editor
   - [ ] Customizer
   - [ ] Cron API
   - [ ] Other: ___________

3. **Research third-party integrations:**
   - [ ] External APIs required
   - [ ] Authentication methods
   - [ ] Rate limits
   - [ ] Pricing

4. **Performance considerations:**
   - Database queries required
   - Caching strategy
   - Asset sizes (JS/CSS)
   - Server requirements

**Output:** Technical research document with:
- Architecture diagram (rough)
- API dependencies
- Performance requirements
- Risk assessment

---

#### 4. Validation Metrics

**Define Success Metrics:**

```markdown
## MVP Success Criteria (First 3 months)

**Adoption:**
- [ ] 100 active installations
- [ ] 50 active weekly users
- [ ] 10 reviews (average 4+ stars)

**Engagement:**
- [ ] 70% weekly retention
- [ ] 5 support tickets/week (manageable)
- [ ] 3 feature requests/week (indicates use)

**Quality:**
- [ ] <5% error rate
- [ ] <1% critical bugs
- [ ] 90+ accessibility score
```

---

### Output Documents

**Research Summary:**
```markdown
# Research Summary: [Project Name]

## Problem Validation
- ✅ Problem is real and painful
- ✅ Users willing to adopt new solution
- ✅ Market size is adequate

## Competitive Landscape
[Summary of competition and opportunities]

## User Insights
[Key findings from interviews]

## Technical Feasibility
[Can it be built? What are the risks?]

## Go-Forward Recommendation
[Proceed with MVP / Pivot / Stop]
```

---

### Decision Point: VALIDATION GATE

**Proceed if:**
- ✅ Problem validated by 8+ user interviews
- ✅ Clear differentiation from competitors
- ✅ Technical approach is viable
- ✅ Users express willingness to try it

**Pivot if:**
- ⚠️ Problem validated but solution needs adjustment
- ⚠️ Technical challenges require different approach

**Stop if:**
- ❌ Problem isn't painful enough
- ❌ Market is too competitive without clear differentiation
- ❌ Technical approach not feasible

---

## Phase 2: Planning & Requirements

**Duration:** 1-2 weeks
**Goal:** Define detailed requirements and create development plan
**Resources:**
- [USER-STORY-TEMPLATE.md](./USER-STORY-TEMPLATE.md)
- [PLUGIN-DEVELOPMENT-WORKFLOW.md](./PLUGIN-DEVELOPMENT-WORKFLOW.md)

### Activities

#### 1. Write User Stories (3-5 days)

**Use the User Story Template:**

📄 **Resource:** [USER-STORY-TEMPLATE.md](./USER-STORY-TEMPLATE.md)

**Process:**
1. List all features from research
2. Group into epics (major feature areas)
3. Write detailed user stories for each feature
4. Define acceptance criteria for each story
5. Estimate story points (1, 2, 3, 5, 8, 13, 21)

**Story Categories:**

```markdown
## Epic 1: Core Functionality
- STORY-001: [Basic feature]
- STORY-002: [Core workflow]
- STORY-003: [Data management]

## Epic 2: Admin Interface
- STORY-004: [Settings page]
- STORY-005: [Configuration]

## Epic 3: Frontend Display
- STORY-006: [Public display]
- STORY-007: [Shortcodes/blocks]

## Epic 4: Integration
- STORY-008: [REST API]
- STORY-009: [Third-party integration]
```

**Prioritization:**

Use MoSCoW method:
- **Must Have** (MVP blockers)
- **Should Have** (important but not MVP blockers)
- **Could Have** (nice to have)
- **Won't Have** (future versions)

---

#### 2. Define MVP Scope (1 day)

**MVP = Minimum Viable Product**

The smallest set of features that:
- Solves the core problem
- Provides value to users
- Can be released in 8-12 weeks

**MVP Checklist:**

```markdown
## MVP Features (Must Have)
- [ ] Feature 1: [Brief description]
- [ ] Feature 2: [Brief description]
- [ ] Feature 3: [Brief description]

## Post-MVP (Version 1.1+)
- [ ] Feature 4: [Brief description]
- [ ] Feature 5: [Brief description]

## Future Roadmap
- Version 1.2: [Major feature]
- Version 2.0: [Major feature]
```

---

#### 3. Create Development Plan (2-3 days)

**Sprint Planning:**

Break work into 2-week sprints:

```markdown
## Sprint 1: Foundation (Weeks 1-2)
**Goal:** Project setup and core architecture
- [ ] Repository setup
- [ ] Testing infrastructure
- [ ] Basic plugin structure
- [ ] Database schema
**Story Points:** 21

## Sprint 2: Core Features Part 1 (Weeks 3-4)
**Goal:** Implement foundational features
- [ ] STORY-001: Basic feature
- [ ] STORY-002: Core workflow
**Story Points:** 25

## Sprint 3: Core Features Part 2 (Weeks 5-6)
**Goal:** Complete core functionality
- [ ] STORY-003: Data management
- [ ] STORY-004: Settings page
**Story Points:** 30

## Sprint 4: Admin Interface (Weeks 7-8)
**Goal:** Complete admin experience
- [ ] STORY-005: Configuration
- [ ] STORY-006: Admin UX polish
**Story Points:** 20

## Sprint 5: Frontend & Integration (Weeks 9-10)
**Goal:** Public-facing features
- [ ] STORY-007: Frontend display
- [ ] STORY-008: REST API
**Story Points:** 25

## Sprint 6: Polish & Testing (Weeks 11-12)
**Goal:** Quality assurance and refinement
- [ ] Complete manual QA
- [ ] Fix critical bugs
- [ ] Documentation
- [ ] Assets for WordPress.org
**Story Points:** 15
```

**Note:** Adjust sprint length and scope based on your velocity.

---

#### 4. Define Architecture (2 days)

**Create Architecture Document:**

```markdown
# Technical Architecture: [Project Name]

## High-Level Architecture

[Diagram showing major components]

## Directory Structure
```
plugin-name/
├── includes/              # PHP classes
│   ├── class-plugin.php  # Main plugin class
│   ├── class-settings.php
│   └── class-api.php
├── src/                   # React/JS source
│   ├── blocks/
│   └── admin/
├── assets/               # Compiled assets
│   ├── css/
│   └── js/
├── languages/            # Translation files
├── tests/               # Test files
└── plugin-name.php      # Main plugin file
```

## Database Schema
[Tables, options, post meta]

## WordPress Hooks
[Key actions and filters you'll use]

## External Dependencies
[Third-party libraries, APIs]

## Performance Strategy
[Caching, lazy loading, etc.]

## Security Approach
[Authentication, authorization, data validation]
```

---

### Output Documents

**Planning Package:**
1. ✅ User stories (all features)
2. ✅ MVP definition
3. ✅ Sprint plan (6-8 sprints)
4. ✅ Architecture document
5. ✅ Risk assessment

---

### Decision Point: PLANNING GATE

**Proceed if:**
- ✅ All MVP stories written and estimated
- ✅ Sprint plan fits within timeline
- ✅ Architecture is sound
- ✅ Team/stakeholders agree on scope

**Revise if:**
- ⚠️ MVP too large (reduce scope)
- ⚠️ Timeline unrealistic (add time or reduce features)
- ⚠️ Architecture risks identified (plan mitigation)

---

## Phase 3: Technical Setup

**Duration:** 1-2 days
**Goal:** Set up development environment and testing infrastructure
**Resources:**
- [setup-testing.sh](./setup-testing.sh)
- [TESTING-SETUP-GUIDE.md](./TESTING-SETUP-GUIDE.md)

### Activities

#### 1. Repository Setup (2 hours)

**Create Repository:**

```bash
# 1. Create new repository on GitHub
# Repository name: your-plugin-name
# Description: Brief description
# Initialize with: README, .gitignore (WordPress), LICENSE (GPL-3.0)

# 2. Clone locally
git clone https://github.com/your-username/your-plugin-name.git
cd your-plugin-name

# 3. Create basic structure
mkdir -p includes src assets/css assets/js languages tests
touch your-plugin-name.php
```

**Initial Plugin File:**

```php
<?php
/**
 * Plugin Name: Your Plugin Name
 * Plugin URI: https://example.com
 * Description: Brief description
 * Version: 0.1.0
 * Requires at least: 6.9
 * Requires PHP: 8.2
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: your-plugin-name
 */

defined( 'ABSPATH' ) || exit;

// Plugin code here
```

---

#### 2. Testing Infrastructure Setup (4 hours)

**Automated Setup:**

```bash
# Copy setup script from wp-dev-prompts
cp /path/to/wp-dev-prompts/setup-testing.sh .

# Run setup
bash setup-testing.sh \
  --plugin-name="Your Plugin Name" \
  --text-domain="your-plugin-name" \
  --prefix="your_plugin" \
  --min-wp="6.5" \
  --min-php="8.0"

# Install WordPress test suite
bash bin/install-wp-tests.sh wordpress_test root root localhost latest

# Verify setup
composer test           # Should run (even if no tests yet)
npm run lint:js        # Should run
npm run env:start      # Should start WordPress
```

📄 **Resource:** [TESTING-SETUP-GUIDE.md](./TESTING-SETUP-GUIDE.md) for detailed instructions

---

#### 3. CI/CD Setup (2 hours)

**GitHub Actions:**

```bash
# 1. Copy workflow files
mkdir -p .github/workflows
cp /path/to/wp-dev-prompts/github-workflows/wordpress-plugin-ci.yml .github/workflows/ci.yml
cp /path/to/wp-dev-prompts/.github/dependabot.yml .github/dependabot.yml

# 2. Customize workflow
# Edit .github/workflows/ci.yml:
#   - Update plugin name
#   - Adjust PHP/WordPress version matrix
#   - Set correct paths

# 3. Enable GitHub Actions
# In GitHub repo settings → Actions → Enable

# 4. Add secrets (if deploying to WordPress.org)
# Settings → Secrets → New secret:
#   - SVN_USERNAME
#   - SVN_PASSWORD
#   - PLUGIN_SLUG
```

---

#### 4. Local Development Setup (1 hour)

**Configure wp-env:**

```bash
# Already created by setup script, but customize:
# Edit .wp-env.json

{
  "core": "WordPress/WordPress#6.7",
  "phpVersion": "8.2",
  "plugins": [
    ".",
    "https://downloads.wordpress.org/plugin/query-monitor.zip"
  ],
  "themes": [
    "https://downloads.wordpress.org/theme/twentytwentyfive.zip"
  ],
  "config": {
    "WP_DEBUG": true,
    "WP_DEBUG_LOG": true,
    "SCRIPT_DEBUG": true,
    "WP_ENVIRONMENT_TYPE": "development"
  }
}

# Start environment
npm run env:start

# Access:
# Frontend: http://localhost:8888
# Admin: http://localhost:8888/wp-admin (admin/password)
```

---

#### 5. Pre-commit Hooks (30 minutes)

**Already set up by script, but verify:**

```bash
# Test pre-commit hook
echo "// test" >> includes/test.php
git add includes/test.php
git commit -m "test"

# Should run:
# - PHPCS on PHP files
# - ESLint on JS files
# - Stylelint on CSS files

# Clean up
rm includes/test.php
```

---

### Setup Verification Checklist

**Verify everything works:**

- [ ] Repository created and cloned
- [ ] `composer install` completes successfully
- [ ] `npm install` completes successfully
- [ ] `composer test` runs (even with no tests)
- [ ] `composer lint` runs and passes
- [ ] `npm run lint:js` runs
- [ ] `npm run env:start` starts WordPress
- [ ] Can access http://localhost:8888/wp-admin
- [ ] Plugin appears in admin (even if empty)
- [ ] GitHub Actions workflow exists
- [ ] Pre-commit hooks work
- [ ] Can push to GitHub successfully

---

## Phase 4: Development

**Duration:** 4-12 weeks (varies by scope)
**Goal:** Implement features according to plan
**Resources:**
- [PLUGIN-DEVELOPMENT-WORKFLOW.md](./PLUGIN-DEVELOPMENT-WORKFLOW.md)
- [TESTING-AUTOMATION-PROMPTS.md](./TESTING-AUTOMATION-PROMPTS.md)
- [TESTING-QUICK-REFERENCE.md](./TESTING-QUICK-REFERENCE.md)

### Development Workflow

#### Sprint Cycle (2 weeks)

```
Week 1:
Mon: Sprint planning → Select stories → Break into tasks
Tue-Thu: Development → Write code → Write tests → Code review
Fri: Mid-sprint check-in → Adjust if needed

Week 2:
Mon-Wed: Complete development → Finish stories
Thu: Sprint review → Demo completed work
Fri: Sprint retrospective → Plan improvements
```

---

#### Daily Workflow

**Morning (9 AM - 12 PM):**
```bash
# 1. Start environment
npm run env:start

# 2. Pull latest changes
git pull origin main

# 3. Check story for today
# Review acceptance criteria
# Break into tasks

# 4. Create feature branch
git checkout -b feature/STORY-###-brief-description

# 5. Start development
# Write test first (TDD)
./vendor/bin/phpunit --filter=FeatureTest  # Watch it fail

# 6. Implement feature
# Make test pass

# 7. Run quick checks
composer lint
npm run lint:js
```

**Afternoon (1 PM - 5 PM):**
```bash
# 8. Continue development
# Write more tests
# Implement more features

# 9. Run full test suite
composer test
npm run test:unit

# 10. Commit frequently
git add .
git commit -m "feat(STORY-###): Implement feature X"
# Pre-commit hooks run automatically

# 11. Push to GitHub
git push origin feature/STORY-###-brief-description

# 12. Create Pull Request
# GitHub Actions runs CI automatically

# 13. End of day cleanup
npm run env:stop
```

---

#### Test-Driven Development (TDD)

**Follow Red-Green-Refactor:**

```bash
# 1. RED: Write failing test
./vendor/bin/phpunit --filter=test_new_feature
# ❌ Test fails (expected)

# 2. GREEN: Make it pass
# Write minimum code to pass test
./vendor/bin/phpunit --filter=test_new_feature
# ✅ Test passes

# 3. REFACTOR: Clean up code
# Improve structure without breaking tests
./vendor/bin/phpunit
# ✅ All tests still pass
```

---

#### Code Review Process

**For Each Pull Request:**

1. **Automated Checks** (GitHub Actions)
   - [ ] PHPCS passes
   - [ ] PHPStan passes
   - [ ] PHPUnit tests pass
   - [ ] ESLint passes
   - [ ] Security scan passes

2. **Manual Review**
   - [ ] Code follows WordPress standards
   - [ ] Tests adequately cover functionality
   - [ ] Security requirements met
   - [ ] Accessibility requirements met
   - [ ] Documentation updated

3. **Approval & Merge**
   - Approved by 1+ reviewer
   - All checks pass
   - Merge to main
   - Delete feature branch

---

#### Using AI Assistants During Development

📄 **Resource:** [TESTING-AUTOMATION-PROMPTS.md](./TESTING-AUTOMATION-PROMPTS.md)

**Common scenarios:**

```markdown
# Need to write a test?
→ Use "PHPUnit Unit Tests" prompt

# Need PHPCS configuration?
→ Use "PHPCS Configuration" prompt

# Need security review?
→ Use "Nonce and Capability Validation" prompt

# Need accessibility testing?
→ Use "Automated Accessibility Testing" prompt
```

---

#### Quick Reference for Commands

📄 **Resource:** [TESTING-QUICK-REFERENCE.md](./TESTING-QUICK-REFERENCE.md)

**Keep this open during development!**

```bash
# Most used commands:
composer test           # Run PHP tests
composer lint          # Check code standards
npm run test:unit      # Run JS tests
npm run env:start      # Start WordPress
npm run env:cli -- wp  # Run WP-CLI commands
```

---

### Development Milestones

**Track progress against sprint plan:**

```markdown
## Sprint 1: Foundation ✅
- [x] Repository setup
- [x] Testing infrastructure
- [x] Basic plugin structure
- [x] Database schema

## Sprint 2: Core Features Part 1 🔄 (In Progress)
- [x] STORY-001: Basic feature
- [ ] STORY-002: Core workflow (50% complete)

## Sprint 3: Core Features Part 2 ⏳ (Not Started)
- [ ] STORY-003: Data management
- [ ] STORY-004: Settings page
```

---

### Decision Point: CODE COMPLETE GATE

**Ready for testing when:**
- ✅ All MVP user stories completed
- ✅ All automated tests pass
- ✅ Code coverage ≥ 60%
- ✅ No critical bugs open
- ✅ All PRs merged
- ✅ Documentation up to date

---

## Phase 5: Testing & Quality Assurance

**Duration:** 1-2 weeks
**Goal:** Ensure quality meets standards before launch
**Resources:**
- [QA-TESTING-CHECKLIST.md](./QA-TESTING-CHECKLIST.md)
- [VISUAL-REGRESSION-TESTING-TEMPLATE.md](./VISUAL-REGRESSION-TESTING-TEMPLATE.md)

### Testing Layers

#### 1. Automated Testing (Continuous)

**Already running during development:**

```bash
# PHP Tests
composer test              # Unit + integration tests
composer lint             # PHPCS
composer analyze          # PHPStan

# JavaScript Tests
npm run test:unit         # Jest tests
npm run lint:js           # ESLint
npm run lint:css          # Stylelint

# E2E Tests
npm run test:e2e          # Playwright tests

# Security
composer audit            # Dependency vulnerabilities
npm audit                 # NPM vulnerabilities

# All of this also runs in GitHub Actions on every PR
```

---

#### 2. Manual QA Testing (1 week)

📄 **Resource:** [QA-TESTING-CHECKLIST.md](./QA-TESTING-CHECKLIST.md)

**Use the comprehensive checklist:**

```markdown
## Day 1-2: Functional Testing
- [ ] All features work as documented
- [ ] Forms submit correctly
- [ ] Data saves and displays correctly
- [ ] Admin interface works
- [ ] Frontend displays work

## Day 3: Compatibility Testing
- [ ] Latest WordPress (6.9+)
- [ ] Minimum WordPress (6.7)
- [ ] PHP 8.2, 8.3, 8.4
- [ ] Popular themes (Twenty Twenty-Five, Astra, GeneratePress)
- [ ] Popular plugins (Yoast SEO, WooCommerce if relevant)

## Day 4: Browser & Device Testing
- [ ] Chrome, Firefox, Safari, Edge (desktop)
- [ ] Chrome Mobile, Safari Mobile
- [ ] Desktop, tablet, mobile viewports

## Day 5: Security & Accessibility
- [ ] Manual security review
- [ ] Accessibility testing (keyboard, screen reader)
- [ ] Performance testing
```

---

#### 3. Visual Regression Testing

📄 **Resource:** [VISUAL-REGRESSION-TESTING-TEMPLATE.md](./VISUAL-REGRESSION-TESTING-TEMPLATE.md)

**If visual appearance is critical:**

```bash
# Set up visual regression tests
npm run test:visual -- --update-snapshots  # Create baselines

# After changes, compare
npm run test:visual  # Detects visual changes

# Review diff images if changes detected
```

---

#### 4. Beta Testing (Optional but Recommended)

**Recruit beta testers:**

**Process:**
1. Create beta version
2. Deploy to test site or staging
3. Invite 10-20 users to test
4. Provide testing guide
5. Collect feedback (surveys, interviews)
6. Fix critical issues
7. Consider feedback for roadmap

**Beta Period:** 1-2 weeks

---

### Bug Tracking

**Use GitHub Issues:**

```markdown
## Bug Template

**Bug Report:** [Brief title]

**Severity:** Critical / High / Medium / Low

**Environment:**
- WordPress: 6.7
- PHP: 8.2
- Theme: Twenty Twenty-Five
- Plugins: [list other active plugins]

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[If applicable]

**Additional Context:**
[Browser console errors, PHP errors, etc.]
```

**Bug Triage:**
- **Critical:** Blocks release (fix immediately)
- **High:** Major functionality broken (fix before release)
- **Medium:** Minor issues (fix before or after release)
- **Low:** Nice to have (add to backlog)

---

### Decision Point: QA GATE

**Ready to launch when:**
- ✅ All critical bugs fixed
- ✅ All high bugs fixed
- ✅ QA checklist 100% complete
- ✅ Automated tests pass (CI green)
- ✅ Security review complete
- ✅ Accessibility review complete
- ✅ Performance meets targets
- ✅ Beta feedback addressed

**If not ready:**
- 🔄 Fix remaining bugs
- 🔄 Address feedback
- 🔄 Re-test until ready

---

## Phase 6: Pre-Launch Preparation

**Duration:** 1 week
**Goal:** Prepare all launch materials
**Resources:** [PLUGIN-DEVELOPMENT-WORKFLOW.md](./PLUGIN-DEVELOPMENT-WORKFLOW.md) - Phase 5 & 6

### Launch Checklist

#### 1. Documentation (2 days)

**User Documentation:**

```markdown
## readme.txt (WordPress.org format)

=== Plugin Name ===
Contributors: yourusername
Tags: tag1, tag2, tag3
Requires at least: 6.9
Tested up to: 6.7
Requires PHP: 8.2
Stable tag: 1.0.0
License: GPLv3 or later

Brief description (150 chars max).

== Description ==

Detailed description...

== Installation ==

1. Upload plugin to /wp-content/plugins/
2. Activate through WordPress admin
3. Configure settings at Settings > Plugin Name

== Frequently Asked Questions ==

= Question 1? =
Answer 1.

= Question 2? =
Answer 2.

== Screenshots ==

1. Screenshot description
2. Screenshot description

== Changelog ==

= 1.0.0 =
* Initial release
* Feature 1
* Feature 2

== Upgrade Notice ==

= 1.0.0 =
Initial release.
```

**Developer Documentation:**

```markdown
## Developer Guide

### Hooks & Filters

**Actions:**
- `your_plugin_init` - Fires when plugin initializes
- `your_plugin_settings_saved` - Fires after settings saved

**Filters:**
- `your_plugin_setting_value` - Filter setting value
- `your_plugin_output` - Filter plugin output

### Examples

[Code examples for developers]
```

---

#### 2. WordPress.org Assets (1 day)

**Create Assets:**

```bash
# Create assets directory
mkdir .wordpress-org

# Required assets:
# - icon-128x128.png (128x128)
# - icon-256x256.png (256x256)
# - banner-772x250.png (772x250)
# - banner-1544x500.png (1544x500, retina)
# - screenshot-1.png (1200x900)
# - screenshot-2.png (1200x900)
# - screenshot-3.png (1200x900, etc.)
```

**Design Guidelines:**
- High quality, professional
- Clear, easy to understand
- Show actual plugin in use
- Follow WordPress design style
- Annotate screenshots with arrows/labels

---

#### 3. Marketing Materials (2 days)

**Create Marketing Assets:**

**Landing Page:**
- Clear value proposition
- Feature highlights
- Screenshots/demo
- Installation instructions
- Support information

**Launch Announcement:**
```markdown
# [Plugin Name] 1.0.0 Released!

We're excited to announce the launch of [Plugin Name]!

## What is it?
[Brief description]

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Get It Now
[WordPress.org link]
[GitHub link]

## Support
[How to get support]
```

**Social Media Posts:**
- Twitter/X thread
- LinkedIn post
- Reddit post (/r/WordPress, /r/ProWordPress)
- Facebook groups
- WordPress Slack

---

#### 4. Support Infrastructure (1 day)

**Set Up Support Channels:**

**WordPress.org Forums:**
- Monitor plugin support forum
- Respond within 24 hours
- Mark resolved topics

**GitHub Issues:**
- Enable issue templates
- Add labels (bug, enhancement, question)
- Set up notifications

**Documentation Site:**
- FAQs
- Troubleshooting guide
- Video tutorials (optional)

**Email Support:** (optional)
- Set up dedicated email
- Create canned responses for common questions

---

#### 5. Final Pre-Launch Checks (1 day)

**Version Bump:**

```bash
# Update version numbers in:
# - plugin-name.php (Plugin Version)
# - package.json (version)
# - readme.txt (Stable tag)
# - CHANGELOG.md

# Create git tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

**Build Production Assets:**

```bash
# Build optimized assets
npm run build:prod

# Verify build
# - Check file sizes
# - Test on production-like environment

# Create release package
npm run plugin-zip
# Or manually exclude dev files per .distignore
```

**Final Smoke Test:**

```bash
# 1. Install on fresh WordPress
# 2. Activate plugin
# 3. Test core workflows
# 4. Deactivate and check for errors
# 5. Reactivate and verify
# 6. Test uninstall (if cleanup is implemented)
```

---

### Decision Point: LAUNCH GATE

**Ready to launch when:**
- ✅ Documentation complete (readme.txt, user guide, dev docs)
- ✅ Assets created (icons, banners, screenshots)
- ✅ Marketing materials ready
- ✅ Support infrastructure set up
- ✅ Version tagged and built
- ✅ Final smoke test passed
- ✅ Stakeholder approval (if applicable)

---

## Phase 7: Launch & Deployment

**Duration:** 1-3 days
**Goal:** Release to WordPress.org and announce
**Resources:** [PLUGIN-DEVELOPMENT-WORKFLOW.md](./PLUGIN-DEVELOPMENT-WORKFLOW.md) - Phase 8

### Launch Steps

#### Day 1: Submit to WordPress.org

**Initial Submission:**

1. **Create WordPress.org Account**
   - Sign up at wordpress.org
   - Verify email

2. **Submit Plugin**
   - Go to: https://wordpress.org/plugins/developers/add/
   - Fill out form:
     - Plugin Name
     - Plugin Description
     - Plugin URL (GitHub/GitLab)
   - Agree to guidelines
   - Submit

3. **Wait for Review**
   - Usually 2-14 days
   - Check email for feedback
   - Address any issues raised

**Note:** Can't control timing of WordPress.org approval, so continue with other launch activities.

---

#### Day 1: Soft Launch

**While waiting for WordPress.org approval:**

**Deploy to GitHub:**
```bash
# Tag release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Create GitHub Release
# - Go to Releases → New Release
# - Tag: v1.0.0
# - Title: Version 1.0.0
# - Description: Release notes
# - Upload plugin.zip
# - Publish release
```

**Announce to Close Network:**
- Email to beta testers
- Post in private communities
- Share with team/stakeholders

---

#### Day 2-3: WordPress.org Approval & Setup

**Once Approved by WordPress.org:**

1. **Receive SVN Credentials**
   - Check email for SVN URL
   - Save credentials securely

2. **Initial SVN Setup**
   ```bash
   # Checkout your plugin directory
   svn co https://plugins.svn.wordpress.org/your-plugin-name
   cd your-plugin-name

   # See directory structure:
   # /trunk (development)
   # /tags (releases)
   # /assets (icons, banners, screenshots)
   ```

3. **Upload Plugin Files**
   ```bash
   # Copy files to trunk
   cp -r /path/to/your/plugin/* trunk/

   # Add files
   cd trunk
   svn add * --force
   svn ci -m "Initial commit of version 1.0.0"
   ```

4. **Upload Assets**
   ```bash
   # Copy assets
   cp /path/to/assets/* assets/

   # Add and commit
   cd assets
   svn add * --force
   svn ci -m "Add plugin assets"
   ```

5. **Create Release Tag**
   ```bash
   # Create tag from trunk
   svn cp trunk tags/1.0.0
   svn ci -m "Tagging version 1.0.0"
   ```

6. **Verify on WordPress.org**
   - Check your plugin page
   - Verify assets display correctly
   - Test installation from WordPress.org

---

**Alternative: Automated Deployment**

**Using GitHub Actions** (from our CI workflow):

```yaml
# When you push a tag, GitHub Actions automatically:
# 1. Builds production assets
# 2. Deploys to WordPress.org
# 3. Creates GitHub Release

# Just push tag:
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions handles the rest!
```

---

#### Day 3: Public Announcement

**Announce Widely:**

**WordPress.org:**
- Plugin page is live
- Users can install

**Social Media:**
```markdown
🚀 Excited to announce [Plugin Name] 1.0.0!

[Brief description of what it does]

✨ Key features:
• Feature 1
• Feature 2
• Feature 3

🔗 Get it: [WordPress.org link]

#WordPress #Plugin #OpenSource
```

**Community Channels:**
- WordPress Slack (#plugins channel)
- Reddit (/r/WordPress, /r/ProWordPress)
- WordPress forums
- Product Hunt (if appropriate)
- Your blog/website
- Newsletter (if you have one)

**WordPress News Sites** (pitch to):
- WP Tavern
- Post Status
- WPBeginner
- WPHub

---

### Launch Day Monitoring

**Watch Closely:**

```bash
# Monitor these:
# - WordPress.org support forum (respond quickly)
# - GitHub issues (new bug reports)
# - Error logging (Sentry, Rollbar, etc.)
# - Server load (if you have a service component)
# - Social media mentions
# - Email support queue
```

**Be Prepared:**
- Have rollback plan ready
- Monitor for critical bugs
- Respond to support requests quickly
- Fix show-stopper bugs immediately

---

## Phase 8: Post-Launch Monitoring

**Duration:** 2 weeks intensive, then ongoing
**Goal:** Ensure stable launch and gather feedback

### Week 1: Intensive Monitoring

**Daily Tasks:**

**Morning (30 minutes):**
```bash
# Check metrics
# - Active installations (WordPress.org stats)
# - Error reports (logs, Sentry)
# - Support tickets (WordPress.org, GitHub)
# - User feedback (reviews, social media)
```

**Throughout Day:**
- Monitor support forums
- Respond to issues within 4 hours
- Fix critical bugs immediately
- Document common questions

**Evening (30 minutes):**
- Review day's feedback
- Prioritize issues
- Plan fixes for tomorrow

---

**Weekly Review (End of Week 1):**

```markdown
## Week 1 Metrics

**Adoption:**
- Active installations: ___
- Downloads: ___
- Reviews: ___ (avg rating: ___)

**Quality:**
- Critical bugs: ___
- High priority bugs: ___
- Support tickets: ___

**Engagement:**
- Feature requests: ___
- Community feedback: ___

**Action Items:**
- [ ] Fix critical bug #1
- [ ] Address common support question (add to FAQ)
- [ ] Plan patch release if needed
```

---

### Week 2: Stabilization

**Focus:**
- Fix any remaining critical/high bugs
- Improve documentation based on common questions
- Plan first patch release (1.0.1) if needed

**Patch Release Criteria:**
- Critical bugs
- Security issues
- Data loss risks
- Major compatibility problems

**If patch needed:**
```bash
# Quick turnaround (1-2 days)
1. Fix issues
2. Test
3. Version bump to 1.0.1
4. Deploy to WordPress.org
5. Announce update
```

---

### Post-Launch Success Metrics

**Track These KPIs:**

```markdown
## 30-Day Metrics

**Adoption:**
- Active installations: [target: 100+]
- Growth rate: [target: 10% week-over-week]
- Reviews: [target: 10+ at 4+ stars]

**Quality:**
- Critical bugs: [target: 0]
- Support ticket resolution time: [target: <24 hours]
- User satisfaction: [target: 80%+]

**Engagement:**
- Forum participation: [target: healthy discussions]
- Feature requests: [target: 5+ good ideas]
- Community contributions: [target: 1+ PR/issue]
```

---

## Phase 9: Ongoing Maintenance

**Duration:** Ongoing (as long as plugin is active)
**Goal:** Keep plugin secure, compatible, and working well

### Maintenance Cadence

#### Weekly Tasks (1-2 hours/week)

**Monitor & Respond:**
- [ ] Check WordPress.org support forum
- [ ] Check GitHub issues
- [ ] Respond to support requests
- [ ] Review new reviews/feedback

**Security:**
- [ ] Check for security advisories (Composer/npm)
- [ ] Review Dependabot PRs
- [ ] Merge safe updates

---

#### Monthly Tasks (4-6 hours/month)

**Compatibility:**
- [ ] Test with latest WordPress version
- [ ] Test with latest PHP version
- [ ] Test with updated popular plugins/themes
- [ ] Update "Tested up to" version

**Maintenance:**
- [ ] Review and prioritize open issues
- [ ] Update dependencies (if needed)
- [ ] Refactor any technical debt
- [ ] Update documentation (if needed)

---

#### Quarterly Tasks (1-2 days/quarter)

**Major Updates:**
- [ ] Comprehensive security review
- [ ] Performance audit
- [ ] Accessibility review
- [ ] Update all dependencies
- [ ] Review codebase for improvements

**Community:**
- [ ] Engage with community
- [ ] Thank contributors
- [ ] Publish roadmap update

---

### Maintenance Releases

**Version Numbering:**
- **1.0.0** → **1.0.1** = Patch (bug fixes)
- **1.0.0** → **1.1.0** = Minor (new features, backward compatible)
- **1.0.0** → **2.0.0** = Major (breaking changes)

**Patch Releases (1.0.x):**
- Bug fixes only
- Security fixes
- No new features
- Release as needed (immediately for critical issues)

**When to Release Patch:**
- Critical bug discovered
- Security vulnerability
- Data loss issue
- Major compatibility problem

**Patch Release Process:**
```bash
# 1. Create hotfix branch
git checkout -b hotfix/1.0.1

# 2. Fix issue
# 3. Test thoroughly
# 4. Update version
# 5. Commit and tag
git commit -m "fix: Critical bug fix"
git tag v1.0.1

# 6. Deploy
git push origin hotfix/1.0.1
git push origin v1.0.1

# 7. Merge back to main
git checkout main
git merge hotfix/1.0.1
```

---

## Phase 10: Feature Releases

**Duration:** Varies (plan 4-8 weeks per minor release)
**Goal:** Add new features and improvements

### Feature Release Cycle

**Recommended Cadence:**
- Minor releases (1.x.0): Every 2-3 months
- Major releases (x.0.0): Every 12-18 months

---

### Planning Next Version

**8 weeks before release:**

1. **Gather Feedback**
   - Review feature requests
   - Analyze user data
   - Survey users (if possible)
   - Check competitor features

2. **Prioritize Features**
   - Use MoSCoW method again
   - Consider effort vs. impact
   - Check roadmap alignment

3. **Write User Stories**
   - Use [USER-STORY-TEMPLATE.md](./USER-STORY-TEMPLATE.md)
   - Full cycle again (but faster)

---

**6-7 weeks: Development**
- Sprint cycles (2 weeks each)
- 3 sprints for features
- 1 sprint for polish/testing

**1 week: Testing**
- QA checklist
- Compatibility testing
- Beta testing (optional)

**Release:**
- Version bump (1.1.0, 1.2.0, etc.)
- Deploy to WordPress.org
- Announce new features

---

### Major Version Planning

**For Breaking Changes (2.0.0):**

**When to release major version:**
- Architecture redesign
- Breaking API changes
- WordPress minimum version bump
- PHP minimum version bump
- Remove deprecated features

**Major Version Timeline:**
- **6 months before:** Announce plans
- **3 months before:** Deprecation warnings
- **2 months before:** Beta release
- **1 month before:** RC (release candidate)
- **Release day:** Version 2.0.0

**Migration Guide:**
- Document all breaking changes
- Provide upgrade path
- Offer migration tools if possible
- Support old version for 6-12 months

---

## Decision Gates

Summary of all decision points in the lifecycle:

### Gate 1: GO/NO-GO (Phase 0)
**Question:** Should we pursue this idea?
**Criteria:** Market opportunity, feasibility, personal fit
**Outcome:** Proceed to research / Stop

### Gate 2: VALIDATION (Phase 1)
**Question:** Is this worth building?
**Criteria:** Problem validated, differentiation clear, technically feasible
**Outcome:** Proceed to planning / Pivot / Stop

### Gate 3: PLANNING (Phase 2)
**Question:** Do we have a solid plan?
**Criteria:** Stories written, MVP defined, architecture sound
**Outcome:** Proceed to setup / Revise plan

### Gate 4: CODE COMPLETE (Phase 4)
**Question:** Is development done?
**Criteria:** All stories complete, tests pass, no critical bugs
**Outcome:** Proceed to QA / Continue development

### Gate 5: QA (Phase 5)
**Question:** Is quality acceptable?
**Criteria:** All bugs fixed, checklist complete, tests pass
**Outcome:** Proceed to launch prep / Fix issues

### Gate 6: LAUNCH (Phase 6)
**Question:** Ready to release?
**Criteria:** Documentation complete, assets ready, final checks pass
**Outcome:** Launch / Address issues

---

## Phase Summary Checklist

Use this master checklist to track overall progress:

```markdown
## Development Lifecycle Progress

### Phase 0: Pre-Research
- [ ] Vertical identified
- [ ] Market assessment completed
- [ ] Feasibility check passed
- [ ] GO/NO-GO decision: GO

### Phase 1: Research & Validation
- [ ] Competitive analysis (5-10 competitors)
- [ ] User research (10-15 interviews)
- [ ] Technical research completed
- [ ] Validation metrics defined
- [ ] Research summary created
- [ ] VALIDATION decision: Proceed

### Phase 2: Planning & Requirements
- [ ] User stories written (all MVP features)
- [ ] MVP scope defined
- [ ] Sprint plan created (6-8 sprints)
- [ ] Architecture documented
- [ ] PLANNING decision: Approved

### Phase 3: Technical Setup
- [ ] Repository created
- [ ] Testing infrastructure setup
- [ ] CI/CD configured
- [ ] Local environment working
- [ ] Pre-commit hooks active
- [ ] All checks verified

### Phase 4: Development
- [ ] Sprint 1 complete
- [ ] Sprint 2 complete
- [ ] Sprint 3 complete
- [ ] Sprint 4 complete
- [ ] Sprint 5 complete
- [ ] Sprint 6 (polish) complete
- [ ] All MVP stories done
- [ ] CODE COMPLETE: Yes

### Phase 5: Testing & QA
- [ ] Automated tests pass (100%)
- [ ] Manual QA checklist complete
- [ ] Compatibility testing done
- [ ] Security review complete
- [ ] Accessibility review complete
- [ ] Performance testing done
- [ ] Beta testing complete (if applicable)
- [ ] All critical bugs fixed
- [ ] QA decision: Approved

### Phase 6: Pre-Launch
- [ ] readme.txt complete
- [ ] User documentation complete
- [ ] Developer documentation complete
- [ ] WordPress.org assets created
- [ ] Marketing materials ready
- [ ] Support infrastructure set up
- [ ] Version tagged (1.0.0)
- [ ] Production build complete
- [ ] Final smoke test passed
- [ ] LAUNCH decision: Approved

### Phase 7: Launch
- [ ] Submitted to WordPress.org
- [ ] GitHub release created
- [ ] Soft launch to beta users
- [ ] WordPress.org approved
- [ ] SVN setup complete
- [ ] Plugin live on WordPress.org
- [ ] Public announcement made
- [ ] Launch day monitoring active

### Phase 8: Post-Launch
- [ ] Week 1 intensive monitoring complete
- [ ] Critical issues addressed
- [ ] Documentation updated (FAQs)
- [ ] Week 2 stabilization complete
- [ ] Patch release (if needed) deployed
- [ ] 30-day metrics reviewed

### Phase 9: Maintenance (Ongoing)
- [ ] Weekly support tasks (routine)
- [ ] Monthly compatibility checks (routine)
- [ ] Quarterly security reviews (routine)
- [ ] Dependency updates (routine)

### Phase 10: Feature Releases
- [ ] Version 1.1.0 planning
- [ ] Version 1.1.0 development
- [ ] Version 1.1.0 released
- [ ] (Repeat for subsequent versions)
```

---

## Tips for Success

### Time Management

**Realistic Timeline:**
- Don't underestimate research (Phase 0-1): 3-4 weeks
- Don't rush planning (Phase 2): 1-2 weeks
- Build in testing time (Phase 5): 1-2 weeks
- Account for WordPress.org review: 2-14 days

**Buffer Time:**
- Add 25% buffer to estimates
- Unexpected issues will arise
- Beta feedback may require changes

---

### Resource Management

**Solo Developer:**
- Focus on MVP (ruthlessly cut scope)
- Use AI assistants extensively
- Automate everything possible
- Don't try to support everything (browsers, WP versions)

**Small Team:**
- Clear role separation (dev, QA, support)
- Daily standups (15 minutes)
- Regular code reviews
- Shared responsibility for support

---

### Common Pitfalls to Avoid

**❌ Scope Creep**
- Adding features during development
- **Solution:** Strict MVP definition, backlog for "later"

**❌ Insufficient Testing**
- Skipping QA checklist
- **Solution:** Make QA a formal phase, use checklist

**❌ Poor Documentation**
- Rushing docs at the end
- **Solution:** Write docs during development

**❌ Ignoring Support**
- Slow response to issues
- **Solution:** Set expectations, respond within 24 hours

**❌ No Maintenance Plan**
- Launch and forget
- **Solution:** Schedule regular maintenance tasks

---

## Workflow Customization

**Adjust Based On:**

**Project Size:**
- Small (1-2 weeks): Combine phases, skip some gates
- Medium (4-8 weeks): Follow as written
- Large (3-6 months): Add more checkpoints, involve stakeholders

**Team Size:**
- Solo: More automation, longer sprints (3-4 weeks)
- 2-5: As written, 2-week sprints
- 6+: Add more structure, project management overhead

**Project Type:**
- Simple plugin: Faster through all phases
- Complex plugin: More research and planning time
- Theme: Adjust for design/visual focus

---

## Integration with Repository Resources

**This lifecycle ties together ALL resources in this repo:**

| Phase | Primary Resources |
|-------|-------------------|
| **0-1: Research** | product-research.md |
| **2: Planning** | USER-STORY-TEMPLATE.md |
| **3: Setup** | setup-testing.sh, TESTING-SETUP-GUIDE.md |
| **4: Development** | PLUGIN-DEVELOPMENT-WORKFLOW.md, TESTING-AUTOMATION-PROMPTS.md, TESTING-QUICK-REFERENCE.md |
| **5: Testing** | QA-TESTING-CHECKLIST.md, VISUAL-REGRESSION-TESTING-TEMPLATE.md |
| **6-7: Launch** | PLUGIN-DEVELOPMENT-WORKFLOW.md (phases 5-8) |
| **8-10: Ongoing** | TESTING-QUICK-REFERENCE.md, QA-TESTING-CHECKLIST.md |

**Plus supporting resources:**
- TESTING-README.md: Overview of testing framework
- BLUEPRINT-CREATION-GUIDE.md: Demo environment creation
- GitHub workflows: Automated CI/CD

---

## Next Steps

**Ready to start?**

1. **Choose your starting point:**
   - Have an idea? → Start at Phase 0
   - Validated idea? → Start at Phase 2
   - Existing project? → Jump to relevant phase

2. **Bookmark this document**
   - Use as your roadmap
   - Check off items as you complete them
   - Refer back at each decision gate

3. **Customize for your needs**
   - Adjust timeline based on your situation
   - Skip or combine phases if appropriate
   - Add your own checkpoints

4. **Start small**
   - Don't try to follow everything perfectly
   - Learn and adjust as you go
   - Focus on the current phase

---

**Questions? Issues? Improvements?**

Open an issue on GitHub or refer to specific phase documentation linked throughout this guide.

**Ready to build something amazing? Let's go!** 🚀

---

[⬆ Back to Top](#wordpress-plugintheme-development-lifecycle)
