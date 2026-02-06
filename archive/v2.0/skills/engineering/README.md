# Engineering Skills

Compound engineering workflows for WordPress development, adapted from [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin).

## Skills

| Skill | Description |
|-------|-------------|
| [compound-planning.md](compound-planning.md) | Transform features into structured implementation plans |
| [compound-review.md](compound-review.md) | Multi-dimensional code review for WordPress |
| [compound-docs.md](compound-docs.md) | Document solved problems to build team knowledge |
| [git-worktree-wordpress.md](git-worktree-wordpress.md) | Parallel development with Git worktrees |

## Core Philosophy

**"Each unit of engineering work should make subsequent units easier—not harder."**

- Spend 80% on planning and review, 20% on execution
- Document decisions and solutions for future reference
- Build reusable patterns, not one-off solutions

## Workflow Integration

```
┌─────────────────────────────────────────────────────────────┐
│                    Compound Workflow                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. PLAN ─────────► 2. IMPLEMENT ─────────► 3. REVIEW       │
│     │                    │                      │            │
│     │                    │                      │            │
│     ▼                    ▼                      ▼            │
│  compound-planning   git-worktree         compound-review    │
│                      (parallel work)                         │
│                                                              │
│                           │                                  │
│                           ▼                                  │
│                    4. DOCUMENT                               │
│                           │                                  │
│                           ▼                                  │
│                    compound-docs                             │
│                    (knowledge compounds)                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Usage

### Starting a New Feature

1. Use `compound-planning.md` to create implementation plan
2. Create worktree for isolated development
3. Implement following the plan
4. Use `compound-review.md` checklist before PR
5. Document solutions with `compound-docs.md`

### Reviewing a PR

1. Create worktree for the PR branch
2. Run through `compound-review.md` dimensions
3. Test in isolated environment
4. Document any interesting findings

### After Solving a Hard Problem

1. Follow `compound-docs.md` template
2. Save to appropriate category
3. Link from related code or issues

## Related

- [Product Management Skills](../product-management/) — Requirements and user research
- [Testing Skills](../testing/) — Test strategies and tools
- [Security Skills](../security/) — Security review patterns
- [Performance Skills](../performance/) — Performance review patterns
