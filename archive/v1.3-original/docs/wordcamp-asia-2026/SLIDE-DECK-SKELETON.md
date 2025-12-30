# Slide Deck Skeleton

> 10–12 slides for "From 'It Runs' to 'It Ships': Plugin Review Readiness for AI-Era Devs"
>
> **Format:** Title + 2–5 bullets per slide
> **Time:** 30 minutes (then 10 min Q&A)

---

## Slide 1: Title Slide

**From "It Runs" to "It Ships"**
*Plugin Review Readiness for AI-Era Devs*

- Courtney Robertson & Evan Herman
- WordCamp Asia 2026
- [Twitter/Social handles]

*Speaker notes: Quick intro, 30 seconds. Courtney welcomes, introduces Evan's Plugin Review Team background.*

---

## Slide 2: The Problem

**AI makes code easy. Shipping is the hard part.**

- You can generate a working plugin in minutes
- But "it runs on my machine" ≠ "it's ready for 40,000+ installs"
- The Plugin Review Team sends back the same fixable issues—every week
- This session: what those issues are and how to catch them first

*Speaker notes: Set up the tension. Evan adds: "We don't reject to be difficult—we want you to succeed."*

---

## Slide 3: What Reviewers Actually Check

**Not code style. Not architecture. Security first.**

- Input handled safely? (sanitization)
- Output safe for browsers? (escaping)
- Actions verified as intentional? (nonces)
- User authorized to do this? (capability checks)
- Files protected from direct access?

*Speaker notes: Briefly name each concept. We'll define them in the next slides.*

---

## Slide 4: Top 5 Avoidable Review Issues

**From the Plugin Handbook's "Common Issues" page:**

1. **Missing sanitization** – `$_POST` used directly
2. **Missing or early escaping** – `echo $var` without `esc_html()`
3. **No nonce verification** – forms without CSRF protection
4. **No capability checks** – anyone can trigger admin actions
5. **No direct access prevention** – PHP files loadable directly

*Speaker notes: Courtney introduces each. Evan gives 1-sentence "what we see" for each. Use icons or color coding.*

---

## Slide 5: The Golden Rule

**Sanitize Early. Escape Late. Always Validate.**

```
[INPUT] → sanitize() → [USE] → validate() → [OUTPUT] → escape()
```

- **Sanitize:** Clean input when it enters (immediately)
- **Validate:** Check it's what you expect (before using)
- **Escape:** Make it safe for context when outputting (at echo time)

**Escape ≠ Sanitize.** They're different jobs.

*Speaker notes: Evan explains why escape can't substitute for sanitize. Visual diagram helps.*

---

## Slide 6: Quick Reference – What Function Where?

| Data Type | Sanitize With | Escape With |
|-----------|---------------|-------------|
| Plain text | `sanitize_text_field()` | `esc_html()` |
| HTML attribute | `sanitize_text_field()` | `esc_attr()` |
| URL | `esc_url_raw()` (for DB) | `esc_url()` |
| Integer | `absint()` | `absint()` or `intval()` |
| HTML content | `wp_kses_post()` | `wp_kses_post()` |
| Email | `sanitize_email()` | `esc_html()` |

*Speaker notes: Reference slide. Point out that escaping is context-dependent.*

---

## Slide 7: Live Demo Introduction

**Let's fix a "vibe-coded" plugin together.**

🐱 **Cat Counter:** A tiny settings page with 5 common problems

What we'll do:
1. Run Plugin Check → see errors
2. Run PHPCS → see line-by-line issues
3. Fix each one live
4. Get green checks

*Speaker notes: Transition to demo. Courtney drives, Evan narrates reviewer perspective.*

---

## Slide 8: [DEMO SLIDE – PLACEHOLDER]

**🖥️ LIVE DEMO**

*Cat Counter: From 5 errors to 0*

[This slide stays up during the 8-minute demo]

*Speaker notes: Demo happens here. See LIVE-DEMO-PLAN.md for script.*

---

## Slide 9: Packaging – What Goes in the Zip?

**Exclude:**
- ❌ `node_modules/`
- ❌ `vendor/` (unless runtime-required)
- ❌ `.git/`, tests, build configs

**Include:**
- ✅ Plugin files
- ✅ `readme.txt` (validated!)
- ✅ `LICENSE` file
- ✅ Compiled assets (if applicable)

**Common mistake:** Stable tag doesn't match plugin version.

*Speaker notes: Courtney covers. Mention .distignore as a solution.*

---

## Slide 10: The Toolchain Map

**Idea → Code → Checks → Package → Submit → Maintain**

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  Idea   │ → │  Code   │ → │ Checks  │ → │ Package │ → │ Submit  │ → │ Maintain│
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
                  │              │              │              │              │
               AI + you    Plugin Check    .distignore    SVN workflow   Updates,
                           PHPCS           readme.txt     Wait for        support,
                           WP_DEBUG        Stable tag     review          security
```

*Speaker notes: Visual of the full journey. Most talks stop at "Code." We cover the rest.*

---

## Slide 11: After Approval – Maintenance Matters

**Your plugin is live. Now what?**

- **Support forum:** Respond thoughtfully. Users aren't developers.
- **Security reports:** Acknowledge fast. Fix fast. Credit reporter.
- **Updates:** Test with WP betas. Update "Tested up to" regularly.
- **Regressions:** Automated tests catch what you forgot.

Abandonment is worse than a slow reply. Stay present.

*Speaker notes: Evan emphasizes that long-term maintenance is part of the ecosystem.*

---

## Slide 12: Resources & Wrap-Up

**Your takeaways:**

- 📋 Shippable Plugin Checklist (handout)
- 🤖 Review-ready AI prompts (wp-dev-prompts repo)
- 📚 Plugin Handbook: Common Issues page
- 🔧 Tools: Plugin Check, PHPCS with WordPress standards

**We want you to succeed.**

*Fewer avoidable review emails. More plugins shipped.*

Questions? 🐱

*Speaker notes: Courtney wraps. Evan: "We're rooting for you." Transition to Q&A.*

---

## Supplementary Slides (If Time / For Reference)

### Supplementary A: SVN Basics

**First-time upload workflow:**

1. Approved? Get your SVN repo URL
2. `svn checkout https://plugins.svn.wordpress.org/your-slug/`
3. Copy files to `trunk/`
4. `svn add . && svn commit -m "Initial upload"`
5. `svn copy trunk tags/1.0.0 && svn commit`

Assets go in `assets/` folder.

### Supplementary B: Responding to Rejection

**Got a revision email?**

- Don't panic. It's normal.
- Read the specific issues listed.
- Reply to that email with fixes. Don't resubmit.
- Be patient—one review at a time.

### Supplementary C: Nonce Deep Dive

**What's a nonce doing?**

```php
// Form: Generate token
wp_nonce_field( 'cat_save_action', 'cat_save_nonce' );

// Processing: Verify token
$nonce = sanitize_text_field( wp_unslash( $_POST['cat_save_nonce'] ) );
if ( ! wp_verify_nonce( $nonce, 'cat_save_action' ) ) {
    wp_die( 'Security check failed.' );
}
```

Nonces expire. They're request-specific. They prevent CSRF.

---

## Slide Design Notes

- **Font size:** Minimum 28pt for body, 48pt for titles
- **Code blocks:** Maximum 10 lines per slide, syntax highlighted
- **Colors:** High contrast (WCAG AA minimum)
- **Animations:** Minimal—just for reveals if needed
- **Branding:** WordCamp Asia template, no company logos

---

## Timing Guide

| Slide | Duration | Cumulative |
|-------|----------|------------|
| 1 (Title) | 0:30 | 0:30 |
| 2 (Problem) | 1:30 | 2:00 |
| 3 (What Reviewers Check) | 1:30 | 3:30 |
| 4 (Top 5 Issues) | 3:30 | 7:00 |
| 5 (Golden Rule) | 2:00 | 9:00 |
| 6 (Quick Reference) | 1:00 | 10:00 |
| 7 (Demo Intro) | 0:30 | 10:30 |
| 8 (Demo) | 8:00 | 18:30 |
| 9 (Packaging) | 2:30 | 21:00 |
| 10 (Toolchain) | 2:30 | 23:30 |
| 11 (Maintenance) | 3:00 | 26:30 |
| 12 (Resources) | 2:00 | 28:30 |
| Buffer | 1:30 | 30:00 |

*Then 10 minutes Q&A.*
