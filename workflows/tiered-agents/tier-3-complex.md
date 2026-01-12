# T3: Complex Tasks — Claude Code Guide

> **Tool**: Claude Code
> **Time**: 2+ hours
> **Risk**: High
> **Files**: 6+

## When to Use T3

Use Claude Code for complex tasks that:

- Span many files or entire systems
- Require exploring the codebase first
- Involve architecture decisions
- Need iterative collaboration
- Have unclear or evolving requirements
- Require creating new infrastructure

## Ideal T3 Tasks

### New Features

- Implement multi-file feature
- Add new REST API with tests
- Create Gutenberg block from scratch
- Build admin settings page

### Infrastructure

- Set up testing framework
- Configure CI/CD pipeline
- Create build/release process
- Establish code quality gates

### Architecture

- Design plugin structure
- Plan data model and migrations
- Create extensibility layer (hooks/filters)
- Refactor major subsystem

### Security-Critical

- Implement authentication system
- Handle sensitive data securely
- Fix security vulnerabilities
- Audit and harden endpoints

## Claude Code Strengths

| Strength | Description |
|----------|-------------|
| **Full context** | Reads and understands entire codebase |
| **Exploration** | Searches for patterns, finds related code |
| **Iteration** | Works collaboratively through problems |
| **Execution** | Runs tests, validates changes |
| **Planning** | Creates structured implementation plans |

## Prompt Patterns for T3

### Pattern 1: Feature Implementation

```
Implement a reaction system for posts with these requirements:

Functional:
- Users can add emoji reactions to posts
- Store reaction counts per post
- REST API for adding/removing reactions
- Block for displaying reaction counts

Technical:
- Follow WordPress coding standards
- Include PHPUnit tests for core logic
- Use nonces and capability checks
- Escape all output

Start by exploring the codebase structure, then propose
an implementation plan before writing code.
```

### Pattern 2: Test Infrastructure Setup

```
Set up complete testing infrastructure for this WordPress plugin:

Requirements:
- PHPUnit with WordPress test framework
- Unit tests with WP_Mock for isolation
- Integration tests against real WordPress
- GitHub Actions CI running tests on PR

Current state:
- No existing tests
- Composer for PHP dependencies
- npm for build tools

Explore the codebase first to understand the structure,
then create a phased implementation plan.
```

### Pattern 3: Architecture Design

```
Design and implement a data model for storing reactions:

Considerations:
- Scale: expect 10,000 reactions/day
- Query patterns: get reactions by post, by user, leaderboard
- Multisite: should work on network-activated installs
- Migration: need upgrade path from any existing data

Explore similar patterns in the codebase, research WordPress
best practices, and propose options before implementing.
```

### Pattern 4: Security Hardening

```
Audit and harden all REST API endpoints in this plugin:

Focus areas:
- Authentication and authorization
- Input validation and sanitization
- Output escaping
- Rate limiting considerations
- Error handling (no information disclosure)

For each endpoint:
1. Identify the current security posture
2. Document any vulnerabilities
3. Implement fixes with tests
4. Verify the fix works
```

### Pattern 5: Refactoring Project

```
Refactor the API integration layer:

Current problems:
- Multiple classes making direct HTTP calls
- No consistent error handling
- Hard to test (no mocking points)
- Duplicate code across integrations

Goals:
- Single HTTP client abstraction
- Consistent error handling
- Mockable for testing
- DRY across integrations

Explore the current implementation, identify all touch points,
and propose a migration plan that doesn't break existing functionality.
```

## T3 Workflow

### Phase 1: Exploration

Claude Code explores before implementing:

```
> Explore the codebase to understand:
> - How are REST endpoints currently structured?
> - What patterns exist for database operations?
> - How is authentication handled?
```

### Phase 2: Planning

Request a plan before execution:

```
> Before implementing, create a plan covering:
> - Files to create/modify
> - Order of implementation
> - Testing approach
> - Potential risks
```

### Phase 3: Implementation

Implement incrementally with verification:

```
> Implement the plan step by step.
> After each major change, run relevant tests.
> Pause for my review at each milestone.
```

### Phase 4: Verification

Validate the complete implementation:

```
> Run all tests and fix any failures.
> Check for PHPCS/PHPStan violations.
> Verify the feature works end-to-end.
```

## Collaboration Patterns

### Exploratory Start

Don't know exactly what you need? Start broad:

```
I need to add user reactions to my WordPress plugin.
I'm not sure of the best approach.

Can you explore the codebase and suggest:
- Where reaction data should be stored
- How to structure the REST API
- What WordPress patterns to follow

Then we can discuss before implementing.
```

### Checkpoint-Based

For large tasks, set explicit checkpoints:

```
Implement the reaction system in phases:

Phase 1: Data model (stop for review)
Phase 2: REST API (stop for review)
Phase 3: Tests (stop for review)
Phase 4: Block integration (stop for review)

At each checkpoint, summarize what was done
and what's next.
```

### Problem-Solving

When stuck, collaborate through the problem:

```
The reactions aren't saving. I've tried:
- Checking nonce verification (passes)
- Logging the REST request (data arrives)
- Checking database queries (none executed)

Can you investigate and fix the issue?
```

## T3 Checklist

Before starting a T3 task, verify:

- [ ] Task genuinely requires exploration
- [ ] Multiple systems or files involved
- [ ] Architecture decisions may be needed
- [ ] T1/T2 approaches have failed or are insufficient
- [ ] You have time for iterative collaboration

## Common T3 Scenarios

### Blank Slate Project

Starting fresh with no existing code:

```
Create a WordPress plugin for [purpose]:

Requirements:
[List requirements]

Include:
- Proper plugin structure
- Activation/deactivation hooks
- Uninstall cleanup
- PHPUnit test setup
- GitHub Actions CI
- PHPCS/PHPStan configuration
```

### Legacy Modernization

Updating old code:

```
Modernize this legacy WordPress plugin:

Current issues:
- No tests
- Mixed PHP 5/7 patterns
- No type hints
- Inconsistent code style

Approach:
1. Add tests for existing behavior first
2. Refactor with tests as safety net
3. Don't change functionality yet
```

### Integration Project

Connecting external systems:

```
Integrate with [External API]:

Requirements:
- Authenticate via OAuth2
- Sync data bidirectionally
- Handle rate limits gracefully
- Retry failed requests
- Log all API interactions

Consider:
- What happens if API is down?
- How to handle partial failures?
- Caching strategy?
```

## When T3 Is Overkill

Don't use Claude Code for:

- Simple single-file changes (use T1)
- Code review without implementation (use T2)
- Questions that need reasoning, not exploration (use T2)
- Tasks with crystal-clear requirements (might be T1)

## T3 Anti-Patterns

### Over-Scoping

❌ "Build me a complete e-commerce system"
✅ "Implement the product catalog feature with tests"

### Under-Specifying

❌ "Make the plugin better"
✅ "Improve error handling in REST endpoints with proper logging and user-friendly messages"

### Skipping Exploration

❌ "Just implement it exactly like this..."
✅ "Explore the codebase first, then propose the best approach"

### No Verification

❌ "Looks good, ship it"
✅ "Run tests, check linting, verify it works before we finish"

## Sample T3 Session

```
User: Set up PHPUnit testing for my WordPress plugin

Claude: I'll explore the codebase first to understand
the structure...

[Explores files]

Based on my exploration:
- Plugin uses Composer for dependencies
- Main class is class-plugin.php
- REST API in class-rest-api.php
- No existing tests

I recommend this approach:
1. Add PHPUnit and WP test libs via Composer
2. Create tests/ directory structure
3. Configure phpunit.xml
4. Create bootstrap for WP test framework
5. Write first test for Plugin class
6. Add GitHub Actions workflow

Should I proceed with this plan?

User: Yes, go ahead

Claude: Starting Phase 1: Dependencies and configuration...

[Creates files, runs commands]

Phase 1 complete. Created:
- composer.json updates
- phpunit.xml.dist
- tests/bootstrap.php

Running `composer install` to verify...

Tests directory ready. Moving to Phase 2: First test...
```

## Related

- [TIER_SYSTEM.md](./TIER_SYSTEM.md) — Full framework
- [T3 Prompts](../../prompts/tiered/t3-collaborative/) — Ready-to-use prompts
- [Agent Index](../../agents/AGENT_INDEX.md) — Agent selection for T3 tasks
- [Escalation Guide](./escalation-guide.md) — When you've over-estimated
