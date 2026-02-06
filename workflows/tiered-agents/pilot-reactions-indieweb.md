# Pilot: reactions-for-indieweb

> **Plugin**: reactions-for-indieweb
> **Duration**: 4 weeks
> **Approach**: Testing infrastructure first

## Project Profile

| Metric | Value |
|--------|-------|
| PHP Files | ~110 |
| Gutenberg Blocks | 16 |
| External API Integrations | 18+ |
| Existing Tests | None |
| Test Coverage | 0% |

This plugin is an ideal T3 starting point — complex enough to benefit from the tiered approach, with a blank slate for testing infrastructure.

## Why Testing First?

Starting with testing infrastructure provides:

1. **Safety net** — Catch regressions as other work proceeds
2. **CI foundation** — All subsequent PRs run through quality gates
3. **Confidence** — Enables more aggressive refactoring later
4. **Measurable progress** — Coverage percentage gives clear metrics

## Week 1: Testing Infrastructure (T3)

**Tool**: Claude Code
**Classification**: Complex — architecture decisions, multi-file setup, CI integration

### Tasks

- [ ] Set up PHPUnit with WordPress test framework
- [ ] Create GitHub Actions CI workflow
- [ ] Add PHPCS configuration (WordPress-Extra ruleset)
- [ ] Add PHPStan configuration (level 5 target)
- [ ] Set up quality gates for PRs
- [ ] Create first integration test (smoke test)
- [ ] Document testing commands in README

### Deliverables

```
.github/
├── workflows/
│   └── ci.yml              # PHPUnit, PHPCS, PHPStan

tests/
├── bootstrap.php           # WP test framework setup
├── test-plugin.php         # Smoke test
└── fixtures/               # Test data

phpcs.xml                   # PHPCS configuration
phpstan.neon                # PHPStan configuration
phpunit.xml                 # PHPUnit configuration
```

### Claude Code Prompt

```
Set up complete testing infrastructure for this WordPress plugin:

1. PHPUnit with WordPress test framework
   - Configure wp-env or wp-phpunit/wp-phpunit
   - Create bootstrap.php with proper WP loading
   - Add phpunit.xml with coverage configuration

2. GitHub Actions CI
   - Run on pull requests and main branch
   - Matrix test PHP 8.2, 8.3, 8.4
   - Include PHPCS and PHPStan checks
   - Report coverage to PR comments

3. Quality tools
   - PHPCS with WordPress-Extra ruleset
   - PHPStan at level 5 (with WordPress stubs)
   - Configure for gradual adoption (baseline files)

4. First test
   - Create a smoke test that loads the plugin
   - Verify no fatal errors on activation

Current state: No tests exist. Start fresh.
```

### Success Criteria

- [ ] `composer test` runs PHPUnit
- [ ] `composer phpcs` runs code standards check
- [ ] `composer phpstan` runs static analysis
- [ ] GitHub Actions runs on every PR
- [ ] At least one passing test

## Week 2: Documentation Pass (T1)

**Tool**: Copilot
**Classification**: Routine — repetitive, single-file focus, low risk

### Tasks

- [ ] Add PHPDoc to `class-plugin.php`
- [ ] Add PHPDoc to `class-rest-api.php`
- [ ] Document all public methods
- [ ] Add `@since` tags where missing
- [ ] Add inline comments to complex logic sections

### Copilot Usage

For each file, use inline Copilot suggestions:

1. Position cursor above undocumented function
2. Type `/**` and let Copilot complete
3. Review and adjust the generated PHPDoc
4. Move to next function

### Success Criteria

- [ ] All public methods have PHPDoc
- [ ] Complex functions have inline explanations
- [ ] PHPCS documentation rules pass

## Week 3: Code Review (T2)

**Tool**: Cursor or ChatGPT
**Classification**: Analytical — multi-file awareness, security focus, judgment required

### Tasks

- [ ] Security audit of REST API endpoints
- [ ] Review nonce and capability checks
- [ ] Analyze external API integration patterns
- [ ] Identify sanitization/escaping gaps
- [ ] Document refactoring opportunities
- [ ] Create prioritized issue backlog

### Review Checklist

```markdown
## REST API Security
- [ ] All endpoints check capabilities
- [ ] Nonces used for state-changing operations
- [ ] Input sanitized with appropriate functions
- [ ] Output escaped before rendering

## External APIs
- [ ] API keys stored securely (not in code)
- [ ] Requests use wp_remote_* functions
- [ ] Responses validated before use
- [ ] Errors handled gracefully
- [ ] Rate limiting considered

## Data Handling
- [ ] Database queries use $wpdb->prepare()
- [ ] User input never trusted
- [ ] File operations validated
```

### Deliverables

Create GitHub issues for findings:
- `[T1] Fix X sanitization issues` — Routine fixes
- `[T2] Review Y API integration pattern` — Needs analysis
- `[T3] Refactor Z for security` — Architecture changes

### Success Criteria

- [ ] Security audit complete
- [ ] All findings documented as issues
- [ ] Issues labeled by tier
- [ ] No critical vulnerabilities remain

## Week 4: Test Writing (T1)

**Tool**: Copilot
**Classification**: Routine — pattern-based, constrained scope

### Tasks

- [ ] Unit tests for utility functions
- [ ] Tests for data sanitization helpers
- [ ] Tests for API response handling
- [ ] Tests for block registration

### Copilot Prompts

Use these prompts in your editor:

**For utility functions:**
```
Write a PHPUnit test for this function that:
- Tests the happy path with valid input
- Tests edge cases (empty, null, invalid)
- Uses data providers for multiple cases
```

**For sanitization:**
```
Write a PHPUnit test that verifies:
- Malicious input is sanitized
- Valid input passes through
- Edge cases handled (unicode, special chars)
```

### Success Criteria

- [ ] 20%+ code coverage
- [ ] All utility functions tested
- [ ] Sanitization functions tested
- [ ] Tests pass in CI

## n8n Integration

Set up at least one automation workflow during the pilot.

### Recommended: Issue Triage

1. Import `templates/n8n/github-issue-triage.json`
2. Configure for reactions-for-indieweb repository
3. Activate webhook
4. Test by creating a new issue

This provides immediate value — new issues automatically get tier labels.

## Progress Tracking

### Weekly Check-ins

| Week | Focus | Tool | Key Metric |
|------|-------|------|------------|
| 1 | Infrastructure | Claude Code | CI passing |
| 2 | Documentation | Copilot | PHPDoc coverage |
| 3 | Security Review | Cursor | Issues created |
| 4 | Test Writing | Copilot | Code coverage % |

### Final Success Criteria

- [ ] CI runs on every PR
- [ ] 20%+ code coverage achieved
- [ ] All PHPCS violations resolved
- [ ] PHPStan level 5 passing
- [ ] At least one n8n workflow active
- [ ] Security audit complete
- [ ] Issue backlog populated with tiered labels

## Lessons Learned

*Fill in after pilot completion*

### What Worked

-

### What Didn't

-

### Tier Boundary Adjustments

-

### Process Improvements

-

## Related

- [Tiered Agent System](./TIER_SYSTEM.md)
- [T1 Routine Guide](./tier-1-routine.md)
- [T2 Analytical Guide](./tier-2-analytical.md)
- [T3 Complex Guide](./tier-3-complex.md)
- [n8n Templates](../../templates/n8n/)
