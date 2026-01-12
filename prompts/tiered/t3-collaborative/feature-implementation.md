# Feature Implementation

> **Tier**: T3
> **Tool**: Claude Code
> **Time**: 2-4 hours
> **Files**: 6+

## When to Use

- Building new multi-file features
- Implementing functionality with unclear requirements
- Creating features that span multiple systems
- Features requiring exploration of existing patterns

## Prompt

```
Implement [FEATURE_NAME] with these requirements:

**Functional Requirements:**
- [REQUIREMENT_1]
- [REQUIREMENT_2]
- [REQUIREMENT_3]

**Technical Requirements:**
- Follow WordPress coding standards
- Include PHPUnit tests for core logic
- Use nonces and capability checks
- Escape all output
- [ADDITIONAL_REQUIREMENTS]

**Constraints:**
- [CONSTRAINT_1]
- [CONSTRAINT_2]

**Start by:**
1. Exploring the codebase to understand existing patterns
2. Proposing an implementation plan
3. Wait for my approval before writing code
```

## Customization

| Variable | Description |
|----------|-------------|
| `[FEATURE_NAME]` | Name of the feature |
| `[REQUIREMENT_N]` | Specific functional requirements |
| `[ADDITIONAL_REQUIREMENTS]` | Project-specific technical needs |
| `[CONSTRAINT_N]` | Limitations or boundaries |

## Example Implementation Session

### Turn 1: Feature Request

```
Implement a reaction system for posts with these requirements:

Functional:
- Users can add emoji reactions to posts
- Store reaction counts per post
- REST API for adding/removing reactions
- Gutenberg block for displaying reactions

Technical:
- Follow WordPress coding standards
- Include PHPUnit tests
- Use nonces and capability checks
- Support logged-in users only initially

Constraints:
- Must work with existing post types
- Should not add new database tables if avoidable

Start by exploring the codebase structure, then propose
an implementation plan before writing code.
```

### Turn 2: Plan Review

```
The plan looks good. A few questions:

1. For storing reactions, would post meta work at scale?
   We expect ~1000 reactions/day.

2. Should the REST API support batch operations?

3. For the block, should it be dynamic or static?

Let's discuss before proceeding.
```

### Turn 3: Implementation Start

```
Approved. Please proceed with implementation.

Start with the data layer (storage), then build up:
1. Data model and storage
2. REST API
3. Tests for above
4. Block (last)

Pause after each major component for review.
```

### Turn 4: Checkpoint Review

```
Data layer looks good. Before REST API:

- Add index on user_id for the meta query
- Include a method to get user's reactions across all posts

Then proceed with REST API.
```

## Implementation Phases

### Phase 1: Exploration

Ask Claude to understand the codebase first:

```
Before implementing, explore:
- How are similar features structured?
- What patterns does this codebase use?
- Where should new files go?
- What utilities already exist?
```

### Phase 2: Planning

Get a concrete plan:

```
Create an implementation plan covering:
- Files to create (with paths)
- Files to modify
- Order of implementation
- Testing approach
- Potential risks
```

### Phase 3: Implementation

Execute with checkpoints:

```
Implement in phases, pausing after each:
1. [Component 1] — stop for review
2. [Component 2] — stop for review
3. [Component 3] — stop for review
4. Integration — stop for review
5. Tests — stop for review
```

### Phase 4: Verification

Validate the implementation:

```
Verify the implementation:
- Run all tests
- Check PHPCS/PHPStan
- Test manually in WordPress
- Check for regressions
```

## Feature Types

### REST API Feature

```
Additional requirements for REST API:
- RESTful endpoint design
- Proper HTTP status codes
- JSON schema validation
- Rate limiting consideration
- Error response format
```

### Gutenberg Block Feature

```
Additional requirements for blocks:
- Block.json configuration
- Editor and frontend styles
- Block supports (align, color, etc.)
- InspectorControls for settings
- Responsive behavior
```

### Admin Feature

```
Additional requirements for admin:
- Settings API integration
- Admin menu placement
- Capability requirements
- Settings validation
- Default values
```

## Collaboration Tips

### Be Specific About Trade-offs

```
I'd prefer [A] over [B] because [reason].
If you see issues with that approach, let me know.
```

### Set Clear Boundaries

```
For this implementation:
- Do add tests for new code
- Don't refactor existing code
- Do follow existing patterns
- Don't optimize prematurely
```

### Request Explanations

```
Before implementing [complex part], explain:
- Why this approach?
- What alternatives did you consider?
- What are the trade-offs?
```

## Verification Checklist

- [ ] All requirements implemented
- [ ] Tests passing
- [ ] PHPCS clean
- [ ] PHPStan passing
- [ ] Manual testing done
- [ ] Documentation updated
- [ ] No regressions introduced

## Related

- [T3 Guide](../../../workflows/tiered-agents/tier-3-complex.md)
- [Architecture Design](./architecture-design.md)
- [Test Infrastructure](./test-infrastructure.md)
