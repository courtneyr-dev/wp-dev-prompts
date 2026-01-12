# Tiered Agents — Quick Reference

> Print this. Tape it to your monitor.

## Tier Cheat Sheet

| Tier | Tool | Use When | Time |
|------|------|----------|------|
| **T1** | Copilot | Single file, clear pattern, low risk | <30 min |
| **T2** | Cursor/ChatGPT | Analysis, review, 3-5 files | 30 min–2 hr |
| **T3** | Claude Code | Architecture, new systems, 6+ files | 2+ hr |

## Classification Questions

1. **How many files?** 1-2 → T1, 3-5 → T2, 6+ → T3
2. **Do tests exist?** Yes → T1, Partial → T2, No → T3
3. **Architecture change?** No → T1/T2, Yes → T3
4. **Clear requirements?** Yes → T1, Somewhat → T2, No → T3

## T1 Tasks (Copilot)

- Add PHPDoc to methods
- Write unit test for existing function
- Fix PHPCS violations
- Simple bugfix with clear pattern
- Add inline comments

## T2 Tasks (Cursor/ChatGPT)

- Security review of endpoints
- Refactoring analysis
- Test coverage gap identification
- Dependency audit
- Code explanation

## T3 Tasks (Claude Code)

- New feature implementation
- Test infrastructure setup
- Architecture design
- Multi-system integration
- Security-critical changes

## Escalation Triggers

**T1 → T2:** Failed twice, unclear requirements, needs context

**T2 → T3:** Architecture decisions, security concerns, expanding scope

## Quick Decision

```
Single file + clear pattern? → T1
Analysis or review? → T2
Everything else? → T3
```

---

*Full documentation: [TIER_SYSTEM.md](./TIER_SYSTEM.md)*
