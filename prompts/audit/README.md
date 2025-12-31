# Audit Prompts

AI prompts for WordPress site auditing, security assessment, and GraphQL API testing.

## Prompts

| Prompt | Description | Use Case |
|--------|-------------|----------|
| `graphql-audit.md` | Generate GraphQL API audit plans | WPGraphQL security testing, API validation |

## Quick Start

### GraphQL Audit

Generate a complete audit plan for a WordPress GraphQL endpoint:

```markdown
Audit the GraphQL endpoint at https://example.com/graphql:
- Check authentication requirements
- Test for data exposure risks
- Validate query depth limiting
- Verify CORS configuration
```

## Data Sources

Audit prompts reference structured checklists:

- `data/wpaudit-checklist.json` - 35 WordPress audit items from WPAudit.site
- `data/graphql-audit-checklist.yaml` - 24 GraphQL security checks

## Audit Categories

### WordPress Audit (wpaudit-checklist.json)

| Category | Items | Focus |
|----------|-------|-------|
| Formatting & SEO | 7 | Meta tags, robots.txt, sitemaps |
| Performance | 7 | Caching, compression, assets |
| Accessibility | 7 | WCAG compliance, keyboard nav |
| Privacy & Data | 7 | GDPR, cookie consent, data handling |
| Security | 7 | Headers, HTTPS, file protection |

### GraphQL Audit (graphql-audit-checklist.yaml)

| Category | Checks | Focus |
|----------|--------|-------|
| Schema | 4 | Introspection, types, documentation |
| Queries | 4 | Posts, pages, custom types, filtering |
| Mutations | 4 | Auth requirements, input validation |
| Authentication | 4 | Viewer protection, token handling |
| Error Handling | 4 | Information leakage, error format |
| Performance | 4 | Depth limiting, rate limiting, caching |

## CI Integration

These audits integrate with GitHub Actions workflows:

```yaml
# .github/workflows/graphql-audit.yml
- name: Run GraphQL audit
  run: npx playwright test tests/audit/graphql.spec.ts
  env:
    GRAPHQL_ENDPOINT: ${{ inputs.endpoint }}
```

See:
- `.github/workflows/audit.yml` - WordPress site auditing
- `.github/workflows/graphql-audit.yml` - GraphQL-specific tests

## Related Resources

- **Tests**: [../../tests/audit/](../../tests/audit/) - Playwright test implementations
- **Docs**: [../../docs/audit.md](../../docs/audit.md) - WordPress audit guide
- **Docs**: [../../docs/audit/graphql-audit.md](../../docs/audit/graphql-audit.md) - GraphQL audit guide
- **Agents**: [../../agents/specialists/security-advisory.md](../../agents/specialists/security-advisory.md) - Security specialist
- **Skills**: [../../skills/security/](../../skills/security/) - Security knowledge modules
- **Site Review**: [../site-review/](../site-review/) - Comprehensive site assessment

## Automation Mappings

The audit checklists include automation hints:

| Tool | Use Case |
|------|----------|
| `playwright` | E2E tests, visual checks, interaction tests |
| `lighthouse` | Performance, accessibility, SEO scoring |
| `axe-core` | WCAG accessibility validation |
| `wpcli` | WordPress-specific checks |
| `curl` | HTTP header validation, file checks |

## Creating Custom Audits

Extend the audit system by:

1. Adding items to `data/wpaudit-checklist.json`
2. Creating Playwright tests in `tests/audit/`
3. Updating the CI workflow
4. Documenting in `docs/audit/`
