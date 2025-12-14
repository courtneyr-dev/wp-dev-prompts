# WordCamp Asia 2026 Speaker Submission Package

> **Session:** "From 'It Runs' to 'It Ships': Plugin Review Readiness for AI-Era Devs"
> **Format:** Joint Session (Two Speakers), 40 minutes
> **Speakers:** Courtney Robertson & Evan Herman
> **CFP Deadline:** December 15, 2025, 11:59 PM IST

---

## What's in This Folder

| File | Purpose |
|------|---------|
| [CFP-PROPOSAL.md](CFP-PROPOSAL.md) | Complete proposal ready to paste into the WordCamp Asia CFP form |
| [SHIPPABLE-PLUGIN-CHECKLIST.md](SHIPPABLE-PLUGIN-CHECKLIST.md) | Handout for attendees covering security, QA, packaging, and maintenance |
| [LIVE-DEMO-PLAN.md](LIVE-DEMO-PLAN.md) | 8-minute demo script with "Cat Counter" plugin |
| [WP-DEV-PROMPTS-REPO-PLAN.md](WP-DEV-PROMPTS-REPO-PLAN.md) | 8 new prompts to add to this repository |
| [SLIDE-DECK-SKELETON.md](SLIDE-DECK-SKELETON.md) | 12-slide outline with timing and speaker notes |
| [QA-BANK.md](QA-BANK.md) | 10 likely + 3 "spicy" questions with prepared answers |
| [REFERENCES.md](REFERENCES.md) | All sources with official vs. supporting context labeled |
| [REALITY-CHECK.md](REALITY-CHECK.md) | Bias review and research items to verify before presenting |

---

## Session Summary

**The problem:** AI tools have lowered the barrier to writing WordPress plugin code. But "code that runs" is not "code that ships."

**The solution:** This joint session walks through what the Plugin Review Team actually flags—sanitization, escaping, nonces, capability checks, packaging—and how to catch those issues before you submit.

**Key takeaways for attendees:**
1. Understand the top 5 issues reviewers flag most often
2. Learn the "Sanitize Early, Escape Late, Always Validate" rule
3. Run Plugin Check and PHPCS locally before submitting
4. Package plugins correctly (no node_modules, valid readme.txt)
5. Navigate the SVN submission workflow
6. Use AI prompts designed for review readiness
7. Plan for ongoing maintenance

---

## Speaker Roles

**Courtney Robertson** – Leads the session, drives the demo, manages flow, moderates Q&A

**Evan Herman** – Provides Plugin Review Team perspective, explains "what reviewers see," answers technical questions

The format is conversational: Courtney asks Evan to explain specific topics rather than lecturing.

---

## Before Submitting the CFP

- [ ] Fill in speaker bio placeholders in CFP-PROPOSAL.md
- [ ] Have Evan verify the 3 research items in REALITY-CHECK.md
- [ ] Confirm current WordCamp Asia CFP URL
- [ ] Submit before December 15, 2025, 11:59 PM IST

---

## After Acceptance

- [ ] Implement the 8 new prompts from WP-DEV-PROMPTS-REPO-PLAN.md
- [ ] Build slide deck from SLIDE-DECK-SKELETON.md
- [ ] Create demo environment with Cat Counter plugin
- [ ] Record backup video of demo
- [ ] Prepare accessible PDF of checklist handout

---

## License

All materials in this folder are licensed under [CC0 1.0 (Public Domain)](https://creativecommons.org/publicdomain/zero/1.0/). Use, share, and adapt freely.
