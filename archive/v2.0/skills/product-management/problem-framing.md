# Problem Framing for WordPress

> **Type**: Skill
> **Domain**: product-management
> **Source**: [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts) — Adapted for WordPress

<skill>
<summary>
Frame problems from the WordPress user's perspective to ensure solutions address real needs.
</summary>

<knowledge>
## Problem Framing Canvas

```markdown
## Problem Framing: [Working Title]

### The Persona
**Who**: [Specific WordPress user type]
**Context**: [Their situation and environment]

### The Outcome They Want
[What they're trying to achieve — the job to be done]

### The Barrier
[What's preventing them from achieving it]

### The Root Cause
[Why the barrier exists — dig deeper than surface symptoms]

### The Emotional Impact
[How this makes them feel — frustration, anxiety, embarrassment]

### Current Workarounds
[How they cope today — manual processes, competing solutions]

### Constraints & Context
[Environmental factors affecting the solution space]

### Problem Statement
[One sentence synthesizing the above]
```

## WordPress-Specific Problem Domains

### Performance Problems
- "My site is slow but I don't know why"
- "PageSpeed says I need to [technical thing] but I don't understand"
- "Every plugin I add makes it slower"

### Security Problems
- "I got hacked and don't know how it happened"
- "I'm afraid to update because something might break"
- "I don't know if my site is actually secure"

### Content Management Problems
- "The editor is confusing and I can't do what I want"
- "I spend too much time formatting instead of writing"
- "My content doesn't look like the design"

### Technical Problems
- "Plugins conflict and I don't know which one is causing it"
- "I updated and now my site is broken"
- "I can't figure out how to customize this"

### Business Problems
- "I'm not getting traffic/leads/sales"
- "I can't compete with [competitor] who has better [feature]"
- "Managing multiple sites is taking all my time"

## The Five Whys for WordPress

Start with the surface problem, ask "why" five times:

**Surface**: "My site is slow"
1. Why? "Because pages take 5 seconds to load"
2. Why? "Because there are too many database queries"
3. Why? "Because I have 30 plugins installed"
4. Why? "Because I needed features the theme didn't have"
5. Why? "Because I chose a theme based on looks, not functionality"

**Root cause**: Theme selection process doesn't account for built-in features

**Better solution**: Theme selection guide, not just another caching plugin

## Problem vs Solution Confusion

### Common Mistakes

**User says**: "I need a plugin that does X"
**They actually need**: To accomplish Y, and think X is the way

**User says**: "Add feature Z to your plugin"
**They actually need**: To solve problem that Z would address (but maybe A, B, or C would be better)

### Reframing Technique

When users request features:
1. "What are you trying to accomplish?"
2. "What happens when you can't do that?"
3. "How do you handle that situation today?"
4. "What would success look like?"

## Problem Statement Formula

```
[Persona] needs a way to [accomplish goal]
because [current barrier/pain]
but currently [inadequate workaround]
which results in [negative outcome/emotion].
```

### Example

```
Content creators need a way to schedule social media posts
because manually posting at optimal times is time-consuming
but currently they use separate tools that don't integrate with WordPress
which results in inconsistent posting and duplicate work.
```

## Validation Checklist

Before building a solution, confirm:

- [ ] Problem is real (evidence from multiple sources)
- [ ] Problem is frequent (happens often enough to matter)
- [ ] Problem is painful (motivation to seek solution)
- [ ] Problem is solvable (within technical/business constraints)
- [ ] Solution is better (meaningful improvement over status quo)
- [ ] Users will pay/adopt (willing to change behavior)

## Problem Sources for WordPress

### Where to Find Problems

- **WordPress.org support forums** — Common questions and frustrations
- **Plugin reviews** — Complaints about existing solutions
- **Reddit r/WordPress** — User discussions and help requests
- **Facebook groups** — WordPress Starter Help, Advanced WP
- **Twitter/X** — #WordPress complaints
- **Your own support tickets** — Patterns in user questions
- **Competitor support forums** — Their users' frustrations
</knowledge>

<best_practices>
- Fall in love with the problem, not your solution
- Validate problems before building solutions
- Reframe feature requests as problems to solve
- Use user language, not technical jargon
- Quantify the problem when possible (time, money, frequency)
</best_practices>

<references>
- [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts)
- [Design Thinking Problem Framing](https://www.interaction-design.org/literature/article/what-is-design-thinking-and-why-is-it-so-popular)
- [Five Whys Technique](https://www.lean.org/lexicon-terms/five-whys/)
</references>
</skill>
