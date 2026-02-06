# X Writing

> **Type**: Skill
> **Domain**: social-media
> **Source**: [richtabor/agent-skills](https://github.com/richtabor/agent-skills/tree/main/skills/x-writing)

<skill>
<summary>
Transform notes into authentic X (Twitter) posts with strong hooks, specific details, and natural engagement.
</summary>

<knowledge>
## Process

### Phase 1: Preparation

1. Load reference guides:
   - `references/x-strategy.md` — Content selection, growth principles
   - `references/style-guide.md` — Voice and structure
   - `references/anti-patterns.md` — AI patterns to avoid

2. Clarify source material (notes, ideas, updates)

3. Evaluate potential posts against selection criteria

4. Work through ideas sequentially — don't overwhelm

### Phase 2: Content Creation

**Select the strongest angle** with specific details:
- Names, numbers, tools, examples build credibility
- Avoid generic observations

**Choose format**:
- Single tweet: One clear insight
- Thread: Multi-step narratives, tutorials

**Draft using both guides**:
- Get to the point in line 1
- Zero fluff, short sentences (10-15 words max)
- Be specific, not generic
- End 70% of posts with engagement (questions, teasers, invitations)

**Quality check** against references for authenticity

### Phase 3: Output

Present posts with:
- Character count
- Patterns used
- 2-3 variations when appropriate

Save approved posts to `.social/X.md` with metadata:
```markdown
---
category: shipped | learning | insight | question
type: single | thread
status: draft | approved | posted
date: YYYY-MM-DD
---

[Post content]
```

## Voice Requirements

**Do**:
- Get to the point immediately
- Use short sentences (10-15 words)
- Be specific with details
- Write with confidence
- Use contractions

**Don't**:
- Warm up or hedge
- Use generic phrases
- Say "game-changer" or "revolutionary"
- Use AI-typical patterns
- Add excessive hashtags

## High-Performing Patterns

### Shipped X, Learned Y
```
Shipped [specific thing] this week.

Biggest surprise: [unexpected insight].

[What you'd do differently]
```

### Here's What I Learned
```
[Number] hours building [thing].

What actually worked:
- [Specific detail 1]
- [Specific detail 2]
- [Specific detail 3]
```

### How to Do X
```
How I [achieved result]:

1. [Specific step]
2. [Specific step]
3. [Specific step]

The key: [core insight]
```

### Problem → Solution
```
[Problem everyone relates to]

What fixed it for me: [specific solution]

Went from [before state] to [after state].
```

### Tool Recommendation
```
[Tool name] saved me [specific time/effort].

Before: [old way]
Now: [new way with tool]

[One specific feature that made the difference]
```

## Content Mix (Weekly)

Over 21 posts per week:
- 38% educational/how-to (8 posts)
- 29% personal updates (6 posts)
- 19% insights/observations (4 posts)
- 14% questions/engagement (3 posts)

## Quality Test

Before posting, ask: "Would I bookmark this if someone else wrote it?"

If no, strengthen with:
- More specific details
- A surprising angle
- Actionable takeaway
</knowledge>

<best_practices>
- Hook in line 1 — no warm-up
- Specificity builds credibility
- End with natural engagement, not forced CTA
- One idea per post
- Vary between educational, personal, and observational
</best_practices>

<references>
- [richtabor/agent-skills](https://github.com/richtabor/agent-skills/tree/main/skills/x-writing)
- [references/x-strategy.md](references/x-strategy.md)
- [references/style-guide.md](references/style-guide.md)
- [references/anti-patterns.md](references/anti-patterns.md)
</references>
</skill>
