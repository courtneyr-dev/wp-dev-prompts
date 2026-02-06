# Technical Writing

> **Topic**: technical-writing/blog-drafts
> **Platforms**: Claude Code
> **Source**: [richtabor/skills](https://github.com/richtabor/skills/tree/main/technical-writing) | wp-dev-prompts

<skill>
<summary>
Draft technical blog posts directly from a repository, reading commits, exploring files, and writing in your voice—then optionally push as a WordPress draft.
</summary>

<knowledge>

## Overview

This skill helps you create technical blog posts about features you're actively building. It analyzes your codebase to understand implementations, then structures engaging content that balances technical depth with readability—while maintaining your authentic voice.

The key insight: **draft while you're still in the code**, when implementation details and decision rationale are fresh.

## Three-Phase Workflow

### Phase 1: Research & Planning

Before writing anything:

1. **Load all reference files first**:
   - `references/anti-patterns.md` — words and phrases to avoid (highest priority)
   - `references/wordpress-docs-style-guide.md` — official WordPress standards
   - `references/style-guide.md` — personal voice and tone
   - When guidance conflicts, anti-patterns take priority, then WordPress standards

2. **Investigate the codebase**:
   - Read recent commits with `git log --oneline -20`
   - Review changed files with `git diff HEAD~5`
   - Explore implementation details in key files
   - Note interesting design decisions and trade-offs

3. **Plan structure naturally** (not formulaic):
   - Opening hook that draws readers in
   - Brief overview of what was built
   - The problem or value proposition
   - Technical details with focused code snippets
   - Challenges solved along the way
   - Future directions or integration points

### Phase 2: Writing

Create the draft applying both guides:

- **Code snippets**: 5-15 lines, focused on the interesting parts
- **Word count**: 500-1200 words depending on complexity
- **Save location**: `.blog/YYYY-MM-DD-slug.md`

Example filename: `.blog/2025-06-15-building-voice-planner.md`

### Phase 3: Publishing (Optional)

If publishing to WordPress:

1. Load `references/wordpress-publishing.md` for setup instructions
2. Run the publish script to create a draft
3. Script creates drafts only—never auto-publishes
4. Updates existing drafts intelligently (no duplicates)

## Prompting Tips

Be specific about:
- **Scope**: "Write about the voice input feature" vs. "Write about the app"
- **Audience**: "For WordPress developers" vs. "For general readers"
- **Length**: "Keep it short, around 500 words"
- **Angle**: "Focus on the technical challenges" vs. "Focus on the user experience"

For post series:
- Outline all posts first
- Include "Previously" / "Next up" sections
- Maintain consistent voice across posts

## Output Deliverables

When the draft is complete, provide:

1. File location (`.blog/YYYY-MM-DD-slug.md`)
2. Final post title
3. 4-6 suggested tags
4. Key files referenced (with line numbers)
5. Word count

</knowledge>

<references>
- [richtabor/skills - technical-writing](https://github.com/richtabor/skills/tree/main/technical-writing)
- [WordPress Documentation Style Guide](https://make.wordpress.org/docs/style-guide/)
- [WordPress/WordPress-Documentation-Style-Guide](https://github.com/WordPress/WordPress-Documentation-Style-Guide)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
</references>
</skill>

## Platform Integration

### Claude Code

Reference this skill when starting a blog post:

```markdown
Load the technical-writing skill and help me draft a post about [feature].
```

Or add to your CLAUDE.md:

```markdown
When writing blog posts, use:
- skills/technical-writing/SKILL.md
- skills/technical-writing/references/anti-patterns.md
- skills/technical-writing/references/wordpress-docs-style-guide.md
- skills/technical-writing/references/style-guide.md
```

### Cursor / Cline

Add to your rules file:

```markdown
For technical blog posts:
1. Analyze recent commits and code changes
2. Follow anti-pattern guidance to avoid AI-sounding prose
3. Apply WordPress Documentation Style Guide standards
4. Apply personal style guide for voice consistency
5. Save drafts to .blog/ directory with date-slug format
```
