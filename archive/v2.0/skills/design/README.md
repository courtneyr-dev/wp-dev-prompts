# Design Skills

Skills for UI/UX design patterns, motion design, and visual consistency.

## Skills

| Skill | Description | Source |
|-------|-------------|--------|
| [motion-design.md](motion-design.md) | Animation specifications for product UI | [richtabor/agent-skills](https://github.com/richtabor/agent-skills) |
| [wpds.md](wpds.md) | WordPress Design System components and tokens | [WordPress/agent-skills](https://github.com/WordPress/agent-skills) |

## References

Reference materials for motion design:

- `references/decision-tree.md` — Flowchart for selecting easing types
- `references/easing-tokens.md` — Standardized animation curves and durations

## Usage

### With Claude Code

Reference in CLAUDE.md:
```markdown
For animation guidance, apply:
- skills/design/motion-design.md
```

### Key Principles

1. Every animation needs a job — if it has no job, don't animate
2. High-frequency interactions should be instant or near-instant
3. Exit animations are faster than enters
4. Always respect `prefers-reduced-motion`
