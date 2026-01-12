# Product-Market Fit Research Prompt

> **Type**: Extended Prompt
> **Platforms**: All (Claude, ChatGPT, Cursor, Cline, Gemini)
> **Phase**: Phase 0 — Pre-development validation
> **Attribution**: Inspired by Matt Cromwell's product thinking framework

Use this prompt to validate product-market fit before building a WordPress plugin or product. This research-first approach helps you discover whether your idea solves a real problem that people will pay for.

## When to Use This Prompt

- Before starting a new plugin project
- When considering whether to build a feature or standalone product
- When pivoting an existing product
- Before investing significant development time

## The Framework

This prompt uses a **falsification-based approach** — instead of seeking confirmation that your idea is good, it actively tries to find reasons why it might fail. This protects you from confirmation bias and helps identify risks early.

---

## The Prompt

```
I'm researching product-market fit for a WordPress plugin idea. Help me validate this concept using a falsification-based approach — I want to find reasons this might fail before I invest in building it.

# Product Concept

**Working Name:** [Your plugin name]
**One-Line Description:** [What it does in one sentence]
**Target User:** [Who specifically would use this]
**Problem Statement:** [What problem does it solve]
**Proposed Solution:** [How your plugin solves it]

# Research Questions

Help me investigate each of these areas. For each question, I want you to:
1. Research the current landscape
2. Identify specific evidence (not opinions)
3. Flag red flags or concerns
4. Suggest what would need to be true for this to succeed

## 1. Problem Validation
- Is this a real problem people actively seek solutions for?
- How do people currently solve this problem?
- What search terms do people use? (estimate search volume if possible)
- Are people complaining about this in forums, support tickets, or social media?

## 2. Existing Solutions
- What plugins already solve this problem?
- How many active installs do competitors have?
- What are their ratings and common complaints?
- What's their pricing model?
- What gap exists that they don't fill?

## 3. Market Size & Willingness to Pay
- How large is the potential market?
- Is this a "nice to have" or a "must have"?
- What price point would this support?
- Are there comparable plugins at similar price points?
- What's the typical customer lifetime value in this space?

## 4. Distribution & Discovery
- How would people find this plugin?
- Is wordpress.org/plugins a viable channel?
- What content/SEO opportunities exist?
- Are there partnership or integration opportunities?
- What would customer acquisition cost look like?

## 5. Technical Feasibility & Differentiation
- Can this be built with WordPress capabilities?
- What technical moat (if any) exists?
- How easily could competitors copy this?
- What ongoing maintenance burden exists?
- Are there API dependencies or third-party risks?

## 6. Economic Reality Check
- Given realistic market size, price point, and conversion rates — is this viable?
- What would monthly revenue look like at 1%, 5%, 10% market penetration?
- How does this compare to the development and support investment?
- Is this a venture-scale opportunity, a lifestyle business, or a side project?

## 7. Ecosystem Pressure
- Is WordPress core moving in a direction that helps or hurts this?
- Are hosting companies or page builders adding similar features?
- Is AI potentially commoditizing this solution?
- What regulatory or platform risks exist?

# Output Format

Structure your response as:

## Executive Summary
[2-3 sentences: Should I pursue this? What's the verdict?]

## Go/No-Go Signals

### Green Flags (Reasons to Proceed)
- [Evidence-based reasons this could work]

### Red Flags (Reasons to Stop)
- [Evidence-based concerns]

### Yellow Flags (Needs More Research)
- [Areas of uncertainty]

## Detailed Analysis
[Your analysis of each research question]

## Recommended Next Steps
[If proceeding: what to validate next]
[If not: what alternative directions to consider]

## Key Assumptions to Test
[List the critical assumptions that must be true for success]
```

---

## Customization Options

### For Feature vs. Product Decisions

Add this section to the prompt:

```
# Additional Context: Feature or Product?

This might be better as:
- A feature in an existing plugin: [which one?]
- A standalone free plugin
- A standalone premium plugin
- A SaaS product
- Not worth building

Help me determine which path makes sense.
```

### For Existing Products

Add this section:

```
# Existing Product Context

**Current Product:** [Name and description]
**Current MRR:** [If applicable]
**Current User Base:** [Size and characteristics]
**Relationship to Existing Product:** [Extension, replacement, complement]
```

### For Competitive Analysis Deep-Dive

Add this section:

```
# Competitor Deep-Dive

Analyze these specific competitors in detail:
1. [Competitor 1 name/URL]
2. [Competitor 2 name/URL]
3. [Competitor 3 name/URL]

For each, identify:
- Their positioning and messaging
- Pricing tiers and what's included
- Recent changelog/development activity
- Strengths I'd need to match
- Weaknesses I could exploit
```

---

## Example Use Cases

### Example 1: New Plugin Idea

```
I'm researching product-market fit for a WordPress plugin idea...

**Working Name:** WP Email Validator
**One-Line Description:** Validates email addresses in forms before submission to reduce bounces
**Target User:** WordPress site owners using contact forms
**Problem Statement:** Fake or mistyped emails waste marketing resources and hurt sender reputation
**Proposed Solution:** Real-time email validation integrated with popular form plugins
```

### Example 2: Feature Extraction

```
I'm researching product-market fit for a WordPress plugin idea...

**Working Name:** Simple Redirects
**One-Line Description:** Lightweight 301 redirect manager without the bloat of SEO plugins
**Target User:** Developers and site owners who don't need full SEO suites
**Problem Statement:** Users install heavy SEO plugins just for redirect functionality
**Proposed Solution:** Minimal redirect-only plugin with CSV import/export
```

---

## Follow-Up Prompts

After completing the initial research, use these follow-up prompts:

### If Proceeding: MVP Definition
```
Based on our research, help me define the minimum viable product:
1. What's the smallest version that delivers core value?
2. What features can wait for v2?
3. What's the launch timeline look like?
4. What metrics will prove/disprove our assumptions?
```

### If Pivoting: Alternative Directions
```
The original concept has too many red flags. Based on what we learned, suggest:
1. Adjacent problems that might be better opportunities
2. Different target markets for the same solution
3. Partnership or integration opportunities instead of building
```

---

## Related Resources

- [PROJECT-KICKSTART-PROMPT.md](PROJECT-KICKSTART-PROMPT.md) — Use after validating PMF
- [PLUGIN-MARKETING-PROMPTS.md](PLUGIN-MARKETING-PROMPTS.md) — Marketing strategy and positioning
- [../../workflows/new-plugin/](../../workflows/new-plugin/) — Complete plugin development workflow

---

## Attribution

This research framework is inspired by Matt Cromwell's approach to product thinking in the WordPress ecosystem. The falsification-based methodology helps builders avoid confirmation bias and identify real market opportunities.
