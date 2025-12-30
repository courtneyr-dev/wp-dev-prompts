# Reality Check

> Bias and accuracy review for "From 'It Runs' to 'It Ships'"
>
> This section identifies potential overgeneralizations, biases, and areas needing verification before presenting.

---

## 1. Overgeneralization Risks

### Issue A: "Reviewers always check..."

**Where it appears:**
- Slide 3: "What Reviewers Actually Check"
- Q&A Bank: Multiple references to "what reviewers look for"

**The problem:**
The Plugin Review Team has multiple volunteers with different experience levels and focus areas. Saying "reviewers always check X" implies uniformity that may not exist. Different reviewers might prioritize different issues, and the review process may evolve.

**Revised wording:**

> ❌ "Reviewers always check for proper escaping first."
>
> ✅ "The review process prioritizes security checks like escaping, though individual reviewers may have different workflows."

> ❌ "All reviewers will flag this immediately."
>
> ✅ "This is documented in the Common Issues handbook, so reviewers are trained to look for it."

---

### Issue B: "AI-generated code always misses..."

**Where it appears:**
- Q&A Bank: "Are there things AI-generated code gets wrong consistently?"
- Multiple references to AI code patterns

**The problem:**
AI models improve rapidly. What ChatGPT or Claude miss today may be fixed next month. Also, prompt quality affects output dramatically. Blanket statements about "AI code" lump together wildly different tools and prompts.

**Revised wording:**

> ❌ "AI tools always forget nonces."
>
> ✅ "In our experience, AI-generated code often omits nonces unless the prompt specifically requires them—though this varies by model and prompt quality."

> ❌ "AI can't produce review-ready code."
>
> ✅ "Without WordPress-specific guidance in the prompt, AI tools may miss directory-specific requirements like proper escaping and unique prefixing."

---

### Issue C: "The review takes about two weeks"

**Where it appears:**
- Q&A Bank: Review timeline question
- Checklist: Submission section

**The problem:**
The handbook says "around fourteen days" for straightforward plugins. But this is a baseline, not a guarantee. Queue size, volunteer availability, and code quality all affect timing. Some plugins clear in days; others take months.

**Revised wording:**

> ❌ "Expect your review in two weeks."
>
> ✅ "The handbook estimates around fourteen days for straightforward plugins, but actual times vary based on queue size and code quality."

---

## 2. Survivorship Bias Risks

### Issue D: "These are the top issues" based on what we've seen

**Where it appears:**
- Slide 4: "Top 5 Avoidable Review Issues"
- Throughout the checklist

**The problem:**
We're basing the "top issues" on:
1. The Plugin Handbook's Common Issues page (documented)
2. Evan's experience as a reviewer (anecdotal)
3. Community discussion (secondhand)

We don't have access to aggregate rejection data. The issues Evan sees most often may not represent the full picture—he may be assigned certain types of plugins, or recall dramatic cases more readily.

**Mitigation:**
- Clearly cite the Common Issues page as the primary source
- Use language like "Based on the handbook and Evan's experience reviewing submissions..."
- Avoid claiming statistical certainty ("80% of rejections are...")

---

### Issue E: "Plugins that follow this advice succeed"

**Where it appears:**
- Implicit throughout the session

**The problem:**
We can point to plugins that followed good practices and got approved. We can't point to all the plugins that followed good practices but still had issues, or plugins that broke rules but got through. Success stories are more visible than failures.

**Mitigation:**
- Avoid implying that following the checklist guarantees approval
- Use language like "reduces the likelihood of common rejections"
- Acknowledge that reviews are subjective and edge cases exist

---

## 3. Availability Bias Risks

### Issue F: Security examples based on memorable incidents

**Where it appears:**
- Demo plugin design
- Examples throughout

**The problem:**
Dramatic security failures (major XSS exploits, backdoors found in plugins) are memorable and often discussed in the community. Routine issues (missing text domain, incorrect stable tag) are less memorable but may be equally common in rejections.

**Mitigation:**
- Balance security focus with "boring but common" packaging issues
- Don't imply that most rejections are for critical security holes—many are for metadata and formatting

---

### Issue G: Assuming our audience matches "vibe coders"

**Where it appears:**
- Session framing throughout

**The problem:**
"Vibe coder" is a catchy framing, but the actual audience may include:
- Agency developers submitting their first .org plugin
- Experienced devs new to WordPress
- People who don't use AI at all but are new to plugin standards

We may over-index on AI-specific concerns when the core issues (sanitization, escaping, nonces) apply regardless of how code was written.

**Mitigation:**
- Keep AI as a hook, not the whole story
- Frame lessons as "for anyone new to plugin standards" with AI as one path in
- Don't alienate attendees who don't use AI tools

---

## 4. Follow-Up Research Items

Before presenting, verify these with current Plugin Review Team members or documentation:

### Research Item 1: Current rejection statistics

**Question:** What percentage of initial submissions require revisions? What are the actual top reasons?

**Why it matters:** We're inferring "top issues" from handbook documentation and personal experience. Actual data would strengthen or correct our claims.

**How to verify:**
- Ask in #pluginreview Slack channel
- Check if any team reports or summaries are published
- Ask Evan to informally poll review team members

---

### Research Item 2: Automated review tool current state

**Question:** What automated checks run on submission now? Has Plugin Check been integrated into the submission process?

**Why it matters:** Our demo assumes Plugin Check and PHPCS are distinct from what happens in the queue. If automated checks now run at submission, the advice changes ("You'll see these results anyway, but catch them first").

**How to verify:**
- Test with a fresh submission
- Check Plugin Check plugin changelog and roadmap
- Ask in #pluginreview about current automation

---

### Research Item 3: AI-generated code official stance

**Question:** Does the Plugin Review Team have any official guidance on AI-generated code?

**Why it matters:** We say "the review team doesn't ask how you wrote your code"—but if there's official guidance, disclosure requirements, or known concerns, we should address them.

**How to verify:**
- Search plugin handbook for "AI" or "machine generated"
- Ask in #pluginreview Slack
- Check Make WordPress blog for any statements

---

## 5. Summary: Language to Avoid

| Avoid | Use Instead |
|-------|-------------|
| "Reviewers always..." | "The handbook documents..." or "Reviewers typically..." |
| "This guarantees approval" | "This reduces common rejection reasons" |
| "AI code never..." | "AI-generated code often misses X without specific prompting" |
| "Two weeks exactly" | "Around fourteen days for straightforward plugins" |
| "80% of rejections are..." | "Common rejection reasons include..." |
| "Every plugin fails on..." | "A pattern we see frequently is..." |

---

## 6. Presenter Reminders

**For Courtney:**
- When making broad claims, ground them in the handbook
- If sharing anecdotes, label them as anecdotes ("In my experience...")
- Don't claim certainty about review team internal processes

**For Evan:**
- Speak from personal reviewer experience, not as representing the whole team
- Use language like "When I review..." not "The team thinks..."
- Clarify when something is documented vs. personal practice

---

## 7. Pre-Session Checklist

Before finalizing session materials:

- [ ] Verify all handbook URLs still work
- [ ] Check if Plugin Check has new features relevant to the demo
- [ ] Confirm review timeline info with current team member
- [ ] Ask about any new guidelines added since December 2024
- [ ] Review Make WordPress Plugins blog for recent announcements
- [ ] Test demo plugin with current WordPress version
