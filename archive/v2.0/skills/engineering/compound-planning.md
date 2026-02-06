# Compound Planning for WordPress

> **Type**: Skill
> **Domain**: engineering/workflow
> **Source**: [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — Adapted for WordPress

<skill>
<summary>
Transform WordPress feature concepts into structured implementation plans that compound knowledge over time.
</summary>

<knowledge>
## Core Philosophy

**"Each unit of engineering work should make subsequent units easier—not harder."**

Spend 80% on planning and review, 20% on execution. In WordPress development, this means:
- Research existing patterns before creating new ones
- Document decisions for future reference
- Build reusable components, not one-off solutions

## Planning Process

### Phase 1: Idea Refinement

Clarify the feature through targeted questions:

1. **What problem does this solve?** (Link to Jobs to Be Done)
2. **Who is the primary user?** (WordPress persona)
3. **What's the success criteria?** (Measurable outcome)
4. **What's the scope?** (MVP vs full vision)
5. **What constraints exist?** (WP version, PHP version, dependencies)

### Phase 2: WordPress Research

Run parallel research on:

**Repository Patterns**
- How does this codebase handle similar features?
- What hooks and filters are already available?
- What's the existing architecture pattern?

**WordPress Best Practices**
- How do core or popular plugins solve this?
- What do the WordPress coding standards say?
- What accessibility requirements apply?

**API Documentation**
- Which WordPress APIs are relevant?
- Are there Gutenberg components to reuse?
- What REST endpoints exist or need creation?

### Phase 3: Technical Analysis

Document with specific file paths and code references:

```markdown
### Existing Patterns Found
- `includes/class-admin.php:45` — Settings API implementation
- `src/blocks/example/edit.js:12` — Block controls pattern
- `tests/test-api.php:78` — REST endpoint test pattern

### WordPress APIs to Use
- Settings API for configuration
- Block Supports API for styling
- REST API for frontend data

### Dependencies
- WordPress 6.4+ required (uses X feature)
- PHP 8.0+ required (uses Y syntax)
- No external dependencies needed
```

### Phase 4: Plan Structure

#### MINIMAL Plan (Simple bugs, small fixes)
```markdown
## [Type]: [Descriptive Title]

### Problem
[One paragraph describing the issue]

### Solution
[One paragraph describing the fix]

### Files to Modify
- `path/to/file.php` — [change description]

### Acceptance Criteria
- [ ] [Testable criterion]
- [ ] Tests pass
- [ ] PHPCS clean
```

#### STANDARD Plan (Most features)
```markdown
## [Type]: [Descriptive Title]

### Background
[Context and motivation]

### Problem Statement
[What we're solving and why it matters]

### Proposed Solution
[Approach with rationale]

### Technical Design

#### Architecture
[How it fits into existing structure]

#### Data Model
[Database changes, if any]

#### API Changes
[Hooks, filters, REST endpoints]

#### UI/UX
[Admin interface or block editor changes]

### Implementation Steps
- [ ] Step 1: [Specific task]
- [ ] Step 2: [Specific task]
- [ ] ...

### Testing Strategy
- Unit tests for [components]
- Integration tests for [flows]
- Manual testing for [scenarios]

### Acceptance Criteria
- [ ] [Specific, testable criterion]

### Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| [Risk] | [How we handle it] |

### References
- [Related issue/PR links]
- [Documentation links]
- [Code references]
```

#### COMPREHENSIVE Plan (Major features, architecture changes)

Add to STANDARD:
```markdown
### Alternatives Considered
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Option A | ... | ... | Rejected: [reason] |
| Option B | ... | ... | **Selected** |

### Migration Strategy
[How existing users/data will be handled]

### Rollout Plan
- Phase 1: Beta users
- Phase 2: Gradual rollout
- Phase 3: Full release

### Success Metrics
- [Metric 1]: Target [value]
- [Metric 2]: Target [value]

### Documentation Required
- [ ] README updates
- [ ] Inline documentation
- [ ] User-facing documentation
```

## WordPress-Specific Sections

### Hook Design
```markdown
### Hooks Introduced
| Hook | Type | Purpose |
|------|------|---------|
| `{prefix}_before_save` | Action | Allow modification before save |
| `{prefix}_output` | Filter | Customize output |

### Hooks Used
| Hook | Purpose |
|------|---------|
| `admin_init` | Register settings |
| `rest_api_init` | Register endpoints |
```

### Block Editor Integration
```markdown
### Block Changes
- New block: `namespace/block-name`
- Block supports: `color`, `spacing`, `typography`
- InnerBlocks: [allowed blocks]

### Editor UI
- Inspector controls for [settings]
- Toolbar controls for [actions]
- Block patterns: [pattern names]
```

### Database Changes
```markdown
### Schema Changes
| Table | Change | Migration |
|-------|--------|-----------|
| `{prefix}_items` | Add column `status` | Via dbDelta on activation |

### Options
| Option | Purpose | Autoload |
|--------|---------|----------|
| `{prefix}_settings` | Plugin settings | Yes |
| `{prefix}_cache` | Cached data | No |
```

## File Naming Convention

```
plans/
├── feat-user-authentication-flow.md
├── fix-checkout-race-condition.md
├── refactor-settings-api-usage.md
└── docs-rest-api-endpoints.md
```

Prefixes:
- `feat-` — New feature
- `fix-` — Bug fix
- `refactor-` — Code improvement
- `docs-` — Documentation
- `test-` — Test additions
- `chore-` — Maintenance tasks
</knowledge>

<best_practices>
- Never generate code during planning phase
- Reference specific file paths and line numbers
- Include both happy path and error scenarios
- Document decisions, not just conclusions
- Update plans as implementation reveals new information
</best_practices>

<references>
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)
- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
</references>
</skill>
