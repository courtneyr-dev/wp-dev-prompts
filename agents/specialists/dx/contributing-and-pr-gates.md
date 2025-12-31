# 📋 Contributing and PR Gates

> **Type**: Specialist
> **Domain**: Developer Experience
> **Authority**: Contribution guidelines, PR requirements, code review

## 🎯 Mission

Define contribution workflows and pull request quality gates. Own CONTRIBUTING.md, PR templates, required checks, and code review guidelines.

## 📥 Inputs

- Project workflow
- Quality requirements
- Team preferences
- CI capabilities

## 📤 Outputs

- CONTRIBUTING.md
- PR templates
- Branch protection rules
- Review guidelines

---

## 🔧 When to Use

✅ **Use this agent when:**
- Setting up contribution guidelines
- Creating PR templates
- Defining quality gates
- Establishing code review process
- Configuring branch protection

❌ **Don't use for:**
- CI workflow implementation
- Test writing
- Code style rules
- Release process

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Too many requirements | Start minimal, add as needed |
| Unclear process | Document each step |
| No template | Provide PR template |
| Blocking on flaky tests | Allow re-runs, fix flaky tests |
| Slow review cycle | Set SLA expectations |

---

## ✅ Checklist

### Contribution Guide
- [ ] Code style documented
- [ ] Setup instructions linked
- [ ] Issue/PR workflow explained
- [ ] Communication channels listed

### PR Template
- [ ] Description section
- [ ] Change type checkboxes
- [ ] Testing checklist
- [ ] Review request guidance

### Quality Gates
- [ ] Required checks defined
- [ ] Review requirements set
- [ ] Branch protection configured
- [ ] Merge strategy documented

### Review Process
- [ ] Review timeline expectations
- [ ] Reviewer assignment guidelines
- [ ] Feedback conventions
- [ ] Merge responsibility

---

## 💬 Example Prompts

### Claude Code
```
@contributing-and-pr-gates Create a CONTRIBUTING.md that covers
our development setup, coding standards, and PR process.
```

### Cursor
```
Using contributing-and-pr-gates, design a PR template that ensures
contributors include description, testing evidence, and screenshots.
```

### GitHub Copilot
```
# PR Gates Task: Branch Protection
#
# Define branch protection rules for main:
# - Required checks
# - Review requirements
# - Merge restrictions
# - Status checks
```

### General Prompt
```
Set up our contribution workflow:
1. Write CONTRIBUTING.md
2. Create PR template
3. Define required checks
4. Document review process
5. Configure branch protection
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [onboarding-and-quickstart](onboarding-and-quickstart.md) | Setup docs |
| [github-actions-architect](../ci/github-actions-architect.md) | CI checks |
| [linting-and-static-analysis](../ci/linting-and-static-analysis.md) | Code standards |
| [qa-director](../../orchestrators/qa-director.md) | Quality gates |

---

## 📋 PR Template

```markdown
<!-- .github/PULL_REQUEST_TEMPLATE.md -->

## Description

<!-- Describe your changes in detail -->

## Related Issue

<!-- Link to issue: Fixes #123 -->

## Type of Change

<!-- Mark relevant options with [x] -->

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that changes existing behavior)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement

## How Has This Been Tested?

<!-- Describe the tests you ran -->

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)

<!-- Add screenshots for UI changes -->

## Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged

## Additional Notes

<!-- Any additional information for reviewers -->
```

---

## 📝 CONTRIBUTING.md Template

```markdown
# Contributing to My Plugin

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Development Process

We use GitHub to host code, to track issues and feature requests, and to accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue your pull request!

## Pull Request Process

1. **Open an issue first** for significant changes
2. **Create a feature branch** from `main`
3. **Make your changes** following our coding standards
4. **Write/update tests** for your changes
5. **Run the full test suite** locally
6. **Submit your PR** with a clear description

### PR Requirements

- Descriptive title following conventional commits
- Link to related issue
- All CI checks passing
- At least one reviewer approval
- Up-to-date with main branch

### Review Timeline

- Initial response: Within 2 business days
- Review completion: Within 1 week
- Questions should be answered within 2 business days

## Coding Standards

### PHP

We follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/).

```bash
# Check your code
make lint-php

# Auto-fix issues
make fix-php
```

### JavaScript

We use ESLint with WordPress configuration.

```bash
# Check your code
make lint-js

# Auto-fix issues
make fix-js
```

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

## Testing

### Running Tests

```bash
# All tests
make test

# Unit tests only
make test-unit

# E2E tests
make test-e2e
```

### Writing Tests

- Place unit tests in `tests/unit/`
- Place integration tests in `tests/integration/`
- Name test files `*Test.php` or `*.spec.ts`
- Follow existing test patterns

## Reporting Bugs

Use [GitHub Issues](../../issues/new?template=bug_report.md) with:

- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## Requesting Features

Use [GitHub Issues](../../issues/new?template=feature_request.md) with:

- Clear description of the feature
- Use case / problem it solves
- Proposed solution (optional)
- Alternatives considered

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the project's license.
```

---

## 🔒 Branch Protection Rules

```yaml
# Recommended settings for main branch

# Require pull request before merging
require_pull_request:
  required_approving_review_count: 1
  dismiss_stale_reviews: true
  require_code_owner_reviews: false
  require_last_push_approval: true

# Require status checks
required_status_checks:
  strict: true
  contexts:
    - lint
    - test
    - build

# Restrict who can push
restrictions:
  users: []
  teams: ["maintainers"]

# Additional settings
enforce_admins: true
required_linear_history: false
allow_force_pushes: false
allow_deletions: false
```

### GitHub Settings

```json
{
  "protection": {
    "required_status_checks": {
      "strict": true,
      "checks": [
        { "context": "lint", "app_id": null },
        { "context": "test (8.2, latest)", "app_id": null },
        { "context": "build", "app_id": null }
      ]
    },
    "required_pull_request_reviews": {
      "dismiss_stale_reviews": true,
      "require_code_owner_reviews": false,
      "required_approving_review_count": 1,
      "require_last_push_approval": true
    },
    "enforce_admins": true,
    "restrictions": null,
    "allow_force_pushes": false,
    "allow_deletions": false,
    "required_linear_history": false
  }
}
```

---

## 👥 CODEOWNERS

```
# .github/CODEOWNERS

# Default owner
* @username

# Specific areas
/includes/admin/ @admin-team
/includes/api/ @api-team
/src/blocks/ @blocks-team
/.github/ @devops-team

# Security-sensitive files
/includes/security/ @security-team
composer.lock @security-team
package-lock.json @security-team
```

---

## 📝 Issue Templates

### Bug Report

```yaml
# .github/ISSUE_TEMPLATE/bug_report.yml
name: Bug Report
description: Report a bug or unexpected behavior
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: Thanks for reporting! Please fill out the form below.

  - type: textarea
    id: description
    attributes:
      label: Bug Description
      description: Clear description of the bug
    validations:
      required: true

  - type: textarea
    id: reproduction
    attributes:
      label: Steps to Reproduce
      placeholder: |
        1. Go to...
        2. Click on...
        3. See error
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
    validations:
      required: true

  - type: textarea
    id: environment
    attributes:
      label: Environment
      placeholder: |
        - WordPress version:
        - PHP version:
        - Browser:
    validations:
      required: true
```

### Feature Request

```yaml
# .github/ISSUE_TEMPLATE/feature_request.yml
name: Feature Request
description: Suggest a new feature
labels: ["enhancement"]
body:
  - type: textarea
    id: problem
    attributes:
      label: Problem Description
      description: What problem does this solve?
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
```
