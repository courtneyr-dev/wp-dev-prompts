# WordCamp Asia 2026 CFP Proposal

## Session Details

**Format:** Joint Session (Two Speakers)
**Duration:** 40 minutes (30 min talk + 10 min Q&A)
**Speakers:** Courtney Robertson & Evan Herman

---

## Title

**From "It Runs" to "It Ships": Plugin Review Readiness for AI-Era Devs**

*(67 characters)*

---

## One-Sentence Hook

Learn the security checks, testing workflows, and packaging steps that transform AI-generated plugin code into directory-ready submissions—straight from a Plugin Review Team contributor.

---

## Abstract

AI tools have lowered the barrier to writing WordPress plugin code. But "code that runs" is not "code that ships."

Every week, the Plugin Review Team sends back submissions with the same fixable issues: missing input sanitization, escaping done too early (or not at all), capability checks forgotten, nonces misused, node_modules accidentally zipped up, and readme.txt files that don't match the plugin header.

This joint session bridges that gap. Courtney Robertson (developer educator and documentation contributor) teams up with Evan Herman (Plugin Review Team contributor) to walk through what reviewers actually flag—and how to catch those issues before you submit.

You'll see a live demo: a tiny "vibe-coded" plugin with common problems, then watch as automated tools (Plugin Check, PHPCS with WordPress Coding Standards) surface the issues. We'll fix them in real-time and explain *why* each check matters.

You'll leave with a practical checklist, a set of AI prompts designed to generate review-ready code, and a clear picture of the path from "first commit" to "listed in the directory."

No prior plugin submission experience required—just working PHP/JavaScript knowledge and a willingness to learn the craft behind shipping.

*(248 words)*

---

## Key Takeaways

1. **Understand the top 5 issues reviewers flag most often**—sanitization, escaping, nonces, capability checks, and unique prefixing—with code examples of what's wrong and what's right.

2. **Learn the "Sanitize Early, Escape Late, Always Validate" rule** and why escape functions cannot substitute for sanitization.

3. **Run Plugin Check and PHPCS locally** before submitting, interpret the output, and fix issues fast.

4. **Package your plugin correctly**: exclude node_modules/vendor bloat, write a valid readme.txt, set stable tags properly, and avoid common metadata mistakes.

5. **Navigate the SVN submission workflow**: initial upload, release tagging, asset management, and changelog discipline.

6. **Use AI prompts designed for review readiness**—prompts that force escaping on output, capability checks, nonce verification, and WordPress Coding Standards compliance.

7. **Plan for ongoing maintenance**: responding to support requests, handling security disclosures responsibly, and preventing regressions with automated testing.

---

## Intended Audience

**Who should attend:**
- Developers who can write PHP/JavaScript (often with AI assistance) but have never submitted a plugin to WordPress.org
- "Vibe coders" who've generated working code but haven't learned WordPress plugin standards
- Agency developers preparing their first directory submission
- Contributors curious about what the Plugin Review Team actually looks for

**Prerequisites:**
- Basic PHP and JavaScript familiarity
- Access to a local WordPress development environment (for trying tools afterward)
- No prior plugin submission experience required

**Who this is NOT for:**
- Experienced plugin authors who've shipped multiple directory plugins
- Those looking for advanced architecture patterns or performance optimization

---

## Session Outline (30 minutes)

| Time | Section | Speaker(s) | Content |
|------|---------|------------|---------|
| 0:00–2:00 | **Opening** | Courtney | Welcome, context-setting: "AI makes code easy; shipping is the hard part." Introduce Evan's unique perspective from the Plugin Review Team. |
| 2:00–7:00 | **Top 5 Avoidable Review Issues** | Courtney leads, Evan explains reviewer perspective | Walk through: (1) Sanitization/validation, (2) Escaping late, (3) Nonces + capability checks, (4) Unique prefixing, (5) Direct file access. Each with bad/good code comparison. Evan adds "what we see in the queue." |
| 7:00–9:00 | **The Rule: Sanitize Early, Escape Late, Always Validate** | Evan explains, Courtney shows code | Visual diagram. Why escape functions can't sanitize. Quick mnemonic. |
| 9:00–10:00 | **Transition to Demo** | Courtney | Introduce the "intentionally bad" plugin snippet we'll fix live. |
| 10:00–18:00 | **Live Demo (8 min)** | Courtney codes, Evan narrates issues | Run Plugin Check → interpret warnings. Run PHPCS → see sniff output. Fix 3–4 issues on screen. End with green checks + "Why reviewers care" summary. |
| 18:00–21:00 | **Packaging & Submission** | Courtney | Correct directory structure, excluding dev dependencies, readme.txt essentials, stable tag sanity, licensing. |
| 21:00–24:00 | **SVN Workflow Basics** | Evan | Trunk vs. tags, assets folder, first upload, tagging a release, changelog discipline. |
| 24:00–27:00 | **Maintenance Mindset** | Courtney | Support forum etiquette, handling security reports, update cadence, regression prevention with CI. |
| 27:00–29:00 | **Toolchain Map & AI Prompt Resources** | Courtney | Show the full workflow: Idea → Code → Checks → Package → Submit → Maintain. Introduce wp-dev-prompts repo with review-ready prompts. |
| 29:00–30:00 | **Close & Handoff to Q&A** | Evan | Recap, encourage questions, affirm "we want you to succeed." |

---

## Q&A Plan (10 minutes)

**Facilitation approach:**
- Courtney moderates; Evan answers technical/reviewer questions
- Pre-seeded with 2–3 common questions if audience is slow to start
- Courtney directs specific topics to Evan with prompts like "Evan, what do you see when..."
- Keep answers to 60–90 seconds each to fit more questions

**Topics we're prepared for:**
- Review timeline expectations
- AI-generated code policies
- Handling rejection emails
- Security disclosure process
- Free vs. premium plugin distinctions

---

## Why This Is a Joint Session

**Courtney Robertson** brings:
- Developer education experience (teaching complex concepts accessibly)
- Documentation perspective (how to explain standards clearly)
- The wp-dev-prompts repository with AI prompt templates
- Comfortable leading demos and managing session flow

**Evan Herman** brings:
- Direct Plugin Review Team experience (what reviewers actually see)
- Core contributor credibility (trusted community voice)
- Specific examples of recurring issues from the review queue
- Technical depth on security and coding standards

**Together:**
The combination of "educator who explains" + "reviewer who's seen it all" creates a session that's both practical and authoritative. Evan's quieter, more technical style pairs well with Courtney's facilitation—she can prompt him with specific questions, making the conversation natural rather than lecture-style.

---

## How This Avoids Being a Sales Pitch

- **No products promoted.** The wp-dev-prompts repository is open-source (CC0 licensed) and free. We mention it as a resource, not a product.
- **Focus on community standards.** Everything we teach comes from official WordPress.org handbooks and Plugin Review Team guidelines.
- **No company branding.** Speaker affiliations are mentioned only in bios; the content is entirely community-focused.
- **Practical, not promotional.** The goal is helping attendees ship plugins successfully, not selling services.

---

## Accessibility Considerations

1. **Live captions:** We'll work with event organizers to ensure captioning is available.

2. **Code readability:**
   - All code samples use large fonts (minimum 24pt)
   - High-contrast color schemes (dark text on light background or verified accessible dark mode)
   - Syntax highlighting follows WCAG 2.1 AA color contrast guidelines
   - Code snippets are short (10–15 lines max per slide)

3. **Pace and structure:**
   - Clear verbal transitions between sections
   - Key terms defined when first introduced (nonce, escaping, capability check, PHPCS)
   - Slides available in advance for attendees using screen readers
   - Handout (checklist) available as accessible PDF and markdown

4. **Visual aids:**
   - Diagrams have descriptive alt text in slides
   - No information conveyed by color alone
   - Demo has verbal narration of every action

5. **Q&A inclusivity:**
   - Repeat questions before answering for those who couldn't hear
   - Written Q&A option (Slido or similar) if available

---

## Speaker Bios

**Courtney Robertson**
Courtney is a developer educator and WordPress contributor focused on documentation and developer experience. She maintains the wp-dev-prompts repository, an open-source collection of AI prompts and workflows for plugin/theme development. She's spoken at [PLACEHOLDER: previous WordCamps/events] and is passionate about helping new developers succeed in the WordPress ecosystem.

**Evan Herman (@eherman24)**
Evan is a contributor to the WordPress Plugins Team (Plugin Review Team) and Core. He reviews plugin submissions and has seen firsthand the patterns that slow down approvals. When not reviewing code, he's [PLACEHOLDER: brief personal note]. He brings a reviewer's perspective on what makes plugins succeed—or get sent back for revision.

---

## Additional Notes for Organizers

- This session directly addresses "WordPress + AI: Practical use cases and workflows"—a direction WordCamp Asia explicitly welcomes.
- Both speakers are first-time WordCamp Asia speakers (if applicable), aligning with the CFP's encouragement of new voices.
- The session balances technical depth with accessibility for developers new to WordPress standards.
- All materials (checklist, prompts, slides) will be made freely available post-session.
