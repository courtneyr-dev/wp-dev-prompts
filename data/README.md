# Data

Machine-readable reference data for AI prompts and automation. These files provide structured information that can be consumed by prompts, agents, and CI workflows.

## Files

### WordPress Development

| File | Description | Source |
|------|-------------|--------|
| `core-blocks.json` | WordPress core block metadata (categories, supports, attributes) | [WPHelpers API](https://wphelpers.dev/api/core-blocks) |
| `core-icons.json` | 400+ WordPress icons with accessibility labels | [WPHelpers Icons](https://wphelpers.dev/icons) |

### Audit & Testing

| File | Description | Source |
|------|-------------|--------|
| `wpaudit-checklist.json` | 35-item WordPress audit checklist with automation mappings | [WPAudit](https://wpaudit.site/) |
| `graphql-audit-checklist.yaml` | 24 GraphQL/WPGraphQL security checks | Custom |
| `ui-ux-audit-checklist.yaml` | 50+ UI/UX checks based on Nielsen's heuristics | Custom |

## Usage

### In Prompts

Reference data files to provide AI with structured information:

```markdown
Based on the core blocks data in `data/core-blocks.json`, recommend blocks for:
- A hero section with heading, paragraph, and CTA button
- An image gallery with captions
```

### In CI Workflows

Use checklist files to drive automated testing:

```yaml
- name: Run audit checks
  run: |
    # Parse wpaudit-checklist.json for automated tests
    node scripts/run-audit-checks.js
```

### Updating Data

The `scripts/fetch-wphelpers-data.js` script fetches fresh data from WPHelpers:

```bash
node scripts/fetch-wphelpers-data.js
```

## Data Structure

### core-blocks.json

```json
{
  "source": "wphelpers.dev",
  "version": "6.7",
  "lastUpdated": "2024-12-30",
  "categories": {
    "text": ["paragraph", "heading", "list", ...],
    "media": ["image", "gallery", "video", ...],
    ...
  },
  "blocks": {
    "core/paragraph": {
      "supports": { "color": true, "typography": true },
      "attributes": ["content", "dropCap", "placeholder"]
    }
  }
}
```

### core-icons.json

```json
{
  "categories": {
    "alignment": ["alignCenter", "alignJustify", ...],
    "arrows": ["arrowDown", "arrowLeft", ...],
    ...
  },
  "icons": ["alignCenter", "alignJustify", ...],
  "accessibilityLabels": {
    "alignCenter": "Align center",
    "check": "Check mark",
    ...
  }
}
```

### wpaudit-checklist.json

```json
{
  "categories": {
    "formatting_seo": {
      "items": [
        {
          "id": "proper_robots",
          "title": "Robots.txt exists",
          "severity": "high",
          "automated": true,
          "testCommand": "curl -s site.com/robots.txt"
        }
      ]
    }
  },
  "automationMappings": {
    "playwright": ["accessibility checks"],
    "lighthouse": ["performance audits"],
    ...
  }
}
```

### graphql-audit-checklist.yaml

```yaml
categories:
  schema:
    - id: introspection_available
      title: Schema introspection works
      severity: info
      test_query: "{ __schema { types { name } } }"
  security:
    - id: auth_required_mutations
      title: Mutations require authentication
      severity: critical
```

### ui-ux-audit-checklist.yaml

```yaml
categories:
  - visual-hierarchy
  - navigation
  - responsive
  - feedback-affordance
  - accessibility
  - heuristic-evaluation
  - forms
  - content
  - performance-perception

checks:
  - name: primary-cta-prominence
    category: visual-hierarchy
    severity: high
    automated: true
    checks:
      - question: Does the primary CTA have stronger visual weight?
        why: Users need a clear focal point
        test_hint: Compare computed styles of primary vs secondary buttons
```

## Related Resources

- **Prompts**: [../prompts/blocks/](../prompts/blocks/) - Block assistant prompts using this data
- **Prompts**: [../prompts/audit/](../prompts/audit/) - Audit prompts using checklists
- **Prompts**: [../prompts/testing/](../prompts/testing/) - UI/UX audit prompts
- **Tests**: [../tests/ui-ux/](../tests/ui-ux/) - Playwright UI/UX test suites
- **Docs**: [../docs/core-blocks-reference.md](../docs/core-blocks-reference.md) - Human-readable block reference
- **Docs**: [../docs/icons.md](../docs/icons.md) - Icon usage guide
- **Docs**: [../docs/audit.md](../docs/audit.md) - Audit documentation
- **Docs**: [../docs/ui-ux-audit.md](../docs/ui-ux-audit.md) - UI/UX audit guide
- **CI**: [../.github/workflows/audit.yml](../.github/workflows/audit.yml) - Automated audit workflow
- **CI**: [../.github/workflows/ui-ux-audit.yml](../.github/workflows/ui-ux-audit.yml) - UI/UX audit workflow
