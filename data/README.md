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

## Related Resources

- **Prompts**: [../prompts/blocks/](../prompts/blocks/) - Block assistant prompts using this data
- **Prompts**: [../prompts/audit/](../prompts/audit/) - Audit prompts using checklists
- **Docs**: [../docs/core-blocks-reference.md](../docs/core-blocks-reference.md) - Human-readable block reference
- **Docs**: [../docs/icons.md](../docs/icons.md) - Icon usage guide
- **Docs**: [../docs/audit.md](../docs/audit.md) - Audit documentation
- **CI**: [../.github/workflows/audit.yml](../.github/workflows/audit.yml) - Automated audit workflow
