# 🧭 Agent Index — Router + Composition Guide

> **Purpose**: Route requests to the best agents, enforce predictable workflows, and produce consistent deliverables.

## 🎯 Mission

This index serves as the central router for the wp-dev-prompts agent library. It:
- Classifies incoming requests by domain and risk level
- Selects optimal agent teams (3–6 agents preferred)
- Enforces phase-based execution: Plan → Implement → Verify → Document
- Produces artifacts that meet the Output Contract
- Resolves conflicts between competing concerns

---

## 🧠 How to Use This Index

1. **Start with Orchestrators** — Always consider qa-director for quality gates
2. **Add Primary Specialists** — Based on task category (1–2 per domain)
3. **Add Supporting Agents** — Only for missing outputs (reports, fixtures, CI)
4. **Keep Teams Lean** — 3–6 agents unless work clearly spans more domains
5. **Run Phases** — Plan → Implement → Verify → Document

---

## 🧑‍💼 Orchestrators (Always Considered)

| Agent | Owns | When Required |
|-------|------|---------------|
| [qa-director](orchestrators/qa-director.md) | Quality gates, test matrix, PR/nightly/release strategy | Any change affecting tests or gates |
| [repo-template-architect](orchestrators/repo-template-architect.md) | Structure, profiles, commands, template consistency | Structural changes, new project setup |
| [test-architecture](orchestrators/test-architecture.md) | Test boundaries, fixtures, mocks, determinism | Test infrastructure changes |
| [risk-manager](orchestrators/risk-manager.md) | Risk register, threat model, prioritization | High-risk changes, security, data handling |

---

## 🗂️ Task Categories → Agent Sets

### 🧪 Testing & QA

**Primary Agents:**
- [unit-testing](specialists/testing/unit-testing.md) — Isolated PHP unit tests with WP_Mock
- [integration-testing](specialists/testing/integration-testing.md) — Tests against real WordPress
- [e2e-playwright](specialists/testing/e2e-playwright.md) — Browser automation and user flows
- [regression-suite-curator](specialists/testing/regression-suite-curator.md) — Regression test organization
- [visual-regression](specialists/testing/visual-regression.md) — Screenshot comparison testing

**Supporting Agents:**
- [test-data-and-fixtures](specialists/testing/test-data-and-fixtures.md) — Factories, seeds, fixtures
- [flaky-test-tamer](specialists/extras/flaky-test-tamer.md) — Stabilizing unreliable tests
- [reporting-and-artifacts](specialists/ci/reporting-and-artifacts.md) — JUnit, coverage, traces

**Mandatory Checks:**
- Deterministic seeds and stable selectors
- Artifacts uploaded on failure
- Quarantine policy for flaky tests
- Test isolation (no shared state)

---

### ♿ Accessibility

**Primary Agents:**
- [a11y-tree-and-aria-auditor](specialists/accessibility/a11y-tree-and-aria-auditor.md) — Accessibility tree assertions
- [keyboard-and-focus-specialist](specialists/accessibility/keyboard-and-focus-specialist.md) — Focus management, traps
- [storybook-a11y-specialist](specialists/accessibility/storybook-a11y-specialist.md) — Component-level a11y

**Supporting Agents:**
- [manual-a11y-protocol](specialists/accessibility/manual-a11y-protocol.md) — Screen reader testing scripts
- [i18n-l10n-rtl-specialist](specialists/wordpress/i18n-l10n-rtl-specialist.md) — RTL layout testing

**Mandatory Checks:**
- axe-core scans on all routes
- Explicit name/role/state assertions
- Focus trap testing for modals
- RTL run for critical routes
- Keyboard-only navigation validation

---

### 🛡️ Security

**Primary Agents:**
- [threat-modeling](specialists/security/threat-modeling.md) — STRIDE analysis, attack surfaces
- [wp-security-patterns](specialists/security/wp-security-patterns.md) — Nonces, caps, sanitization
- [secrets-and-supply-chain](specialists/security/secrets-and-supply-chain.md) — Gitleaks, dependency audit

**Supporting Agents:**
- [pentest-playbook](specialists/security/pentest-playbook.md) — Manual security testing
- [security-advisory](../specialists/security-advisory.md) — Existing security specialist

**Mandatory Checks:**
- Nonce verification on all forms
- Capability checks before actions
- Input sanitization, output escaping
- Semgrep rules for WP patterns
- SARIF output for security findings
- SBOM generation for dependencies

---

### 🌍 Multisite + Locales

**Primary Agents:**
- [multisite-specialist](specialists/wordpress/multisite-specialist.md) — Network admin, site scoping
- [i18n-l10n-rtl-specialist](specialists/wordpress/i18n-l10n-rtl-specialist.md) — Translations, RTL

**Supporting Agents:**
- [data-model-and-migrations](specialists/wordpress/data-model-and-migrations.md) — Schema across sites
- [visual-regression](specialists/testing/visual-regression.md) — RTL snapshots

**Mandatory Checks:**
- Network activation/uninstall hooks
- `get_option` vs `get_site_option` usage
- Super-admin capability boundaries
- Locale matrix tests per site
- RTL visual regression for critical screens

---

### ⚡ Performance

**Primary Agents:**
- [performance](../specialists/performance.md) — Existing performance specialist
- [e2e-playwright](specialists/testing/e2e-playwright.md) — Lighthouse integration

**Supporting Agents:**
- [packaging-and-dist-builder](specialists/release/packaging-and-dist-builder.md) — Asset optimization
- [reporting-and-artifacts](specialists/ci/reporting-and-artifacts.md) — LHCI reports

**Mandatory Checks:**
- Performance budgets defined
- Cold and warm run measurements
- Lighthouse CI artifacts
- Core Web Vitals thresholds

---

### 📦 Packaging & Release

**Primary Agents:**
- [packaging-and-dist-builder](specialists/release/packaging-and-dist-builder.md) — Build, bundle, exclude
- [wporg-readme-and-assets](specialists/release/wporg-readme-and-assets.md) — readme.txt, screenshots
- [plugin-header-and-metadata](specialists/release/plugin-header-and-metadata.md) — Version consistency
- [release-manager](specialists/release/release-manager.md) — Release process, changelog

**Supporting Agents:**
- [contributing-and-pr-gates](specialists/dx/contributing-and-pr-gates.md) — PR requirements
- [reporting-and-artifacts](specialists/ci/reporting-and-artifacts.md) — Release artifacts

**Mandatory Checks:**
- No dev files in distribution
- Version consistency across files
- Changelog entry for each release
- ZIP artifact creation and validation

---

### 🧰 CI / Toolchain

**Primary Agents:**
- [github-actions-architect](specialists/ci/github-actions-architect.md) — Workflow design
- [linting-and-static-analysis](specialists/ci/linting-and-static-analysis.md) — PHPCS, PHPStan, ESLint
- [reporting-and-artifacts](specialists/ci/reporting-and-artifacts.md) — Output formats

**Supporting Agents:**
- [compatibility-matrix](specialists/ci/compatibility-matrix.md) — PHP/WP version matrix
- [flaky-test-tamer](specialists/extras/flaky-test-tamer.md) — CI stability

**Mandatory Checks:**
- Cache strategy for dependencies
- Job isolation (no cross-job state)
- Matrix design for versions
- Fast lane (PR) vs slow lane (nightly)
- Artifact retention policy

---

### 🧱 Data & Migrations

**Primary Agents:**
- [data-model-and-migrations](specialists/wordpress/data-model-and-migrations.md) — Schema, upgrades
- [backward-compatibility](specialists/wordpress/backward-compatibility.md) — Deprecation, BC breaks

**Supporting Agents:**
- [integration-testing](specialists/testing/integration-testing.md) — Migration tests
- [regression-suite-curator](specialists/testing/regression-suite-curator.md) — Upgrade scenarios

**Mandatory Checks:**
- Upgrade-from-N-1 tests
- Idempotent migrations
- Deprecation policy documented
- Contract tests for data structures

---

### 🧑‍🏫 Developer Experience

**Primary Agents:**
- [onboarding-and-quickstart](specialists/dx/onboarding-and-quickstart.md) — First-run experience
- [makefile-justfile-designer](specialists/dx/makefile-justfile-designer.md) — CLI commands
- [documentation-quality-auditor](specialists/extras/documentation-quality-auditor.md) — Docs validation

**Supporting Agents:**
- [repo-template-architect](orchestrators/repo-template-architect.md) — Structure consistency

**Mandatory Checks:**
- "One command" setup works
- Docs are executable (examples compile)
- README is current and accurate

---

## 🧾 Routing Algorithm

### Step 0: Determine Complexity Tier

Before selecting agents, classify the task:

| Signal | T1 | T2 | T3 |
|--------|----|----|----|
| Files | 1-2 | 3-5 | 6+ |
| Existing tests | Yes | Partial | No |
| Risk | Low | Medium | High |
| Architecture change | No | Minor | Yes |

**Tool Assignment**:
- **T1 (Routine)**: Copilot — inline suggestions, constrained scope
- **T2 (Analytical)**: Cursor/ChatGPT — code review, refactoring analysis
- **T3 (Complex)**: Claude Code — full-context, architecture decisions

Then proceed to Step 1.

### Step 1: Identify Request Type
- **Code**: New features, bug fixes, refactoring
- **Tests**: Test creation, test infrastructure
- **CI**: Workflow changes, job configuration
- **Packaging**: Build, release, distribution
- **Security**: Auth, data handling, secrets
- **A11y**: Accessibility improvements
- **Perf**: Performance optimization
- **Multisite**: Network-aware changes
- **i18n**: Localization, RTL
- **Docs**: Documentation updates
- **Mixed**: Spans multiple domains

### Step 2: Determine Risk Level

| Level | Scope | Examples |
|-------|-------|----------|
| **Low** | Formatting, docs, comments | README update, code style |
| **Medium** | Config, lint rules, minor features | ESLint config, new utility |
| **High** | Auth, data, REST, files, multisite, release | Login flow, database schema, API endpoints |

### Step 3: Choose Agents

1. **Always include** qa-director for anything affecting gates
2. **Add 1–2 primary specialists** per domain involved
3. **Add supporting agents** only for missing outputs
4. **Cap at 6 agents** unless truly necessary

### Step 4: Run Phases

| Phase | Activities | Outputs |
|-------|------------|---------|
| **A: Plan** | Analyze, checklist, acceptance criteria | Plan document |
| **B: Implement** | Write code, configs, tests | Source files |
| **C: Verify** | Run tests, validate gates | Test results, artifacts |
| **D: Document** | Update docs, handoff notes | Documentation |

---

## 🧯 Conflict Resolution Rules

When agents disagree, apply this priority order:

1. **Security** > Performance > Accessibility > Correctness > DX > Style
2. **Multisite correctness** > Single-site convenience
3. **Determinism** > "Fast but flaky"
4. **Ship safe** > "Ship fast"

### Common Conflicts

| Conflict | Resolution |
|----------|------------|
| Performance vs Security | Security wins; optimize safely |
| Fast tests vs Thorough tests | Fast on PR, thorough on nightly |
| DX vs Correctness | Correctness wins; improve DX separately |
| New feature vs BC | Maintain BC; deprecate gracefully |

---

## 🧪 Output Contract

Every routed task must produce:

### 1. Agent Team
```
Primary Agents:
- agent-name: one-line justification

Supporting Agents:
- agent-name: one-line justification
```

### 2. Deliverables
- Files to create/modify (paths)
- Commands to add
- CI jobs to add
- Documentation to write

### 3. Gates
- What blocks PR merge
- What runs on nightly
- What runs on release-candidate

### 4. Artifacts
- Report locations (JUnit, SARIF, screenshots, traces, LHCI)
- Retention policy
- Upload conditions

### 5. Verification
- Local commands to validate
- CI validation steps
- Manual verification if needed

### 6. Risks & Gaps
- What remains manual
- What may be noisy/flaky
- Known limitations

---

## 📁 Agent Directory Structure

```
agents/
├── AGENT_INDEX.md              # This file
├── orchestrators/
│   ├── qa-director.md
│   ├── repo-template-architect.md
│   ├── test-architecture.md
│   └── risk-manager.md
├── specialists/
│   ├── testing/
│   │   ├── unit-testing.md
│   │   ├── integration-testing.md
│   │   ├── e2e-playwright.md
│   │   ├── visual-regression.md
│   │   ├── regression-suite-curator.md
│   │   └── test-data-and-fixtures.md
│   ├── accessibility/
│   │   ├── a11y-tree-and-aria-auditor.md
│   │   ├── keyboard-and-focus-specialist.md
│   │   ├── storybook-a11y-specialist.md
│   │   └── manual-a11y-protocol.md
│   ├── security/
│   │   ├── threat-modeling.md
│   │   ├── wp-security-patterns.md
│   │   ├── pentest-playbook.md
│   │   └── secrets-and-supply-chain.md
│   ├── wordpress/
│   │   ├── multisite-specialist.md
│   │   ├── data-model-and-migrations.md
│   │   ├── backward-compatibility.md
│   │   ├── wp-hooks-architecture.md
│   │   └── i18n-l10n-rtl-specialist.md
│   ├── release/
│   │   ├── packaging-and-dist-builder.md
│   │   ├── wporg-readme-and-assets.md
│   │   ├── plugin-header-and-metadata.md
│   │   └── release-manager.md
│   ├── ci/
│   │   ├── github-actions-architect.md
│   │   ├── reporting-and-artifacts.md
│   │   ├── linting-and-static-analysis.md
│   │   └── compatibility-matrix.md
│   ├── dx/
│   │   ├── onboarding-and-quickstart.md
│   │   ├── makefile-justfile-designer.md
│   │   └── contributing-and-pr-gates.md
│   └── extras/
│       ├── flaky-test-tamer.md
│       ├── failure-injection-chaos-lite.md
│       ├── legal-and-licensing-checker.md
│       └── documentation-quality-auditor.md
```

---

## 🔗 Quick Reference: Agent by Concern

| Concern | Go-To Agent |
|---------|-------------|
| "Tests are flaky" | flaky-test-tamer |
| "Need multisite support" | multisite-specialist |
| "RTL is broken" | i18n-l10n-rtl-specialist |
| "Preparing a release" | release-manager + packaging-and-dist-builder |
| "Security review needed" | wp-security-patterns + threat-modeling |
| "CI is slow" | github-actions-architect |
| "Accessibility audit" | a11y-tree-and-aria-auditor |
| "Database schema change" | data-model-and-migrations |
| "New contributor setup" | onboarding-and-quickstart |
| "Quality gates unclear" | qa-director |
