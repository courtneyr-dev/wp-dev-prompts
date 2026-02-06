---
name: Software Engineering Practices
description: Engineering workflows for WordPress development including compound planning, code review, documentation generation, and git worktree strategies.
triggers:
  - code review
  - planning
  - documentation
  - git worktree
  - architecture review
  - compound planning
  - engineering workflow
---

# Software Engineering Practices

Structured workflows for planning, reviewing, documenting, and managing WordPress development projects.

## Compound Planning

Break complex tasks into phases with clear deliverables.

### Planning Template

```markdown
## Goal
[One sentence — what does success look like?]

## Context
[Relevant existing code, constraints, dependencies]

## Phases
1. **Research** — Understand existing patterns, identify risks
2. **Design** — Architecture decisions, API surface, data flow
3. **Implement** — Code changes with tests
4. **Verify** — Testing, code review, performance check
5. **Ship** — Documentation, changelog, deployment

## Decision Log
| Decision | Rationale | Date |
|---|---|---|
| [Choice made] | [Why] | [When] |
```

## Code Review Checklist

### Security
- [ ] No unsanitized input
- [ ] All output escaped
- [ ] Nonces verified on form submissions
- [ ] Capabilities checked on protected actions
- [ ] `$wpdb->prepare()` used for all queries with user input

### Performance
- [ ] No N+1 query patterns
- [ ] Transients/caching for expensive operations
- [ ] Assets loaded conditionally
- [ ] No blocking operations in `init` or `wp_loaded`

### Quality
- [ ] Follows WordPress Coding Standards
- [ ] Functions are focused (single responsibility)
- [ ] No dead code or commented-out blocks
- [ ] Error handling is present
- [ ] i18n applied to user-facing strings

### WordPress Patterns
- [ ] Hook-based architecture (no code at file load time)
- [ ] Proper activation/deactivation hooks
- [ ] Uninstall cleanup via `uninstall.php`
- [ ] Text domain matches plugin slug

## Git Worktree Strategy

Maintain parallel working directories:

```bash
# Feature work
git worktree add ../my-plugin-feature feature/new-feature

# Bug fix while feature work continues
git worktree add ../my-plugin-hotfix hotfix/critical-fix

# Cleanup
git worktree remove ../my-plugin-feature
```

## References

- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
- [WordPress Inline Documentation Standards](https://developer.wordpress.org/coding-standards/inline-documentation-standards/)
