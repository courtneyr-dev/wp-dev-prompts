# Architecture Design

> **Tier**: T3
> **Tool**: Claude Code
> **Time**: 2-4 hours
> **Files**: 6+

## When to Use

- Designing new plugin structure
- Planning major refactoring
- Creating extensibility layer
- Designing data models
- Planning system integration

## Prompt

```
Design architecture for [SYSTEM/FEATURE]:

**Goals:**
- [GOAL_1]
- [GOAL_2]
- [GOAL_3]

**Constraints:**
- [CONSTRAINT_1]
- [CONSTRAINT_2]

**Considerations:**
- Scale: [EXPECTED_SCALE]
- Compatibility: [COMPATIBILITY_REQUIREMENTS]
- Extensibility: [EXTENSIBILITY_NEEDS]

**Process:**
1. Explore existing codebase patterns
2. Research WordPress best practices
3. Propose 2-3 architectural options
4. Discuss trade-offs
5. Implement chosen approach after approval
```

## Customization

| Variable | Description |
|----------|-------------|
| `[SYSTEM/FEATURE]` | What you're designing |
| `[GOAL_N]` | Objectives to achieve |
| `[CONSTRAINT_N]` | Limitations to work within |
| `[EXPECTED_SCALE]` | Volume expectations |
| `[COMPATIBILITY_REQUIREMENTS]` | What it needs to work with |
| `[EXTENSIBILITY_NEEDS]` | How others might extend it |

## Example Design Session

### Turn 1: Design Request

```
Design data model for storing post reactions:

Goals:
- Store emoji reactions per user per post
- Query reactions efficiently
- Support reaction analytics

Constraints:
- Prefer WordPress native storage
- Must work on multisite
- Should handle 10k reactions/day

Considerations:
- Query patterns: by post, by user, leaderboards
- Future: reaction types beyond emoji
- Future: anonymous reactions

Explore the codebase, research options, and propose
2-3 approaches with trade-offs.
```

### Turn 2: Option Discussion

```
Let's discuss Option B (custom table) more:

Questions:
1. How would this handle multisite?
2. What indexes would we need?
3. How would upgrades work?
4. What's the migration path from Option A?
```

### Turn 3: Decision

```
Let's go with Option B (custom table) because:
- Better query performance at scale
- Cleaner data model
- Easier analytics

Before implementing, design:
1. Table schema with indexes
2. Migration strategy
3. API for accessing data
4. Multisite approach
```

### Turn 4: Implementation

```
Schema looks good. Implement:
1. Database table creation/upgrade
2. Data access layer (CRUD operations)
3. Migration from any existing data
4. Tests for data layer

Then we'll build the API on top.
```

## Architecture Types

### Plugin Structure Design

```
Design plugin architecture:
- File organization
- Class responsibilities
- Dependency management
- Hook/filter strategy
- Extensibility points
```

### Data Model Design

```
Design data storage:
- What data needs to be stored
- Relationships between entities
- Query patterns to optimize for
- WordPress storage options (options, meta, custom tables)
- Caching strategy
```

### API Design

```
Design API layer:
- REST API endpoints
- Request/response formats
- Authentication approach
- Rate limiting strategy
- Versioning approach
```

### Integration Design

```
Design system integration:
- External API connections
- Webhook handling
- Queue/background processing
- Error handling and retry
- Monitoring approach
```

## Design Deliverables

Request these outputs:

```
Provide:

1. **Architecture Diagram**
   - Components and their relationships
   - Data flow between components

2. **Component Specifications**
   - Responsibility of each component
   - Public interfaces
   - Dependencies

3. **File Structure**
   - Directory organization
   - File naming conventions
   - Class placement

4. **Database Schema** (if applicable)
   - Tables and columns
   - Indexes
   - Relationships

5. **Extension Points**
   - Hooks for customization
   - Filters for modification
   - How third parties extend

6. **Implementation Plan**
   - Order of development
   - Milestones
   - Testing checkpoints
```

## Evaluation Criteria

When comparing options, consider:

```
Evaluate each option on:
- Performance at expected scale
- WordPress conventions alignment
- Maintenance burden
- Testing complexity
- Upgrade path difficulty
- Third-party extension ability
```

## WordPress Architecture Patterns

### Service Class Pattern

```
When to use:
- Complex business logic
- Multiple entry points
- Need for testing in isolation

Structure:
- Service classes in includes/services/
- Registered via dependency container or manual instantiation
- Accessed via helper functions or facade
```

### Repository Pattern

```
When to use:
- Complex data access
- Multiple storage backends
- Need to mock for testing

Structure:
- Repository interfaces in includes/repositories/
- Concrete implementations (WP, custom table, external)
- Factory for instantiation
```

### Hook-Based Architecture

```
When to use:
- Maximum extensibility
- WordPress-native feel
- Plugin ecosystem integration

Structure:
- Core functionality fires hooks at key points
- Features implemented as hook callbacks
- Allow unhooking for customization
```

## Verification

After design approval:

1. Document decisions in architecture doc
2. Create implementation tasks
3. Set up initial file structure
4. Implement core abstractions first
5. Build features on top

## Related

- [T3 Guide](../../../workflows/tiered-agents/tier-3-complex.md)
- [Feature Implementation](./feature-implementation.md)
- [WordPress Plugin Architecture](https://developer.wordpress.org/plugins/)
