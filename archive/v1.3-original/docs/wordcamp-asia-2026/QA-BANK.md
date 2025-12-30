# Q&A Bank

> Prepared questions and answers for the Q&A segment
>
> **10 likely audience questions + 3 "spicy but respectful" questions**

---

## Likely Audience Questions

### Q1: How long does the review process actually take?

**Answer (Evan):**

> "The handbook says 'around fourteen days' for straightforward plugins, but it varies. If your plugin has security issues, there's back-and-forth, and it takes longer. If you run Plugin Check and PHPCS first and fix what they find, you're more likely to get through on the first pass. We're volunteers doing this alongside our day jobs, so patience helps—but so does submitting clean code."

**Key point:** Clean submissions move faster.

---

### Q2: What if I disagree with a reviewer's feedback?

**Answer (Courtney):**

> "First, read the feedback carefully. Sometimes there's a misunderstanding that a quick reply can clear up. If you genuinely think something is wrong, reply to the email and explain your reasoning. Reviewers are reasonable—if you can show why your approach is secure and valid, they'll work with you. What doesn't help: getting defensive or ignoring the feedback and resubmitting."

**Key point:** Communication works. Defensiveness doesn't.

---

### Q3: Are there things AI-generated code gets wrong consistently?

**Answer (Courtney):**

> "Yes, and that's part of why we made this session. AI tools often miss WordPress-specific patterns: they'll use generic PHP instead of `wp_handle_upload()`, they'll escape too early during variable assignment instead of at output, they'll forget nonces entirely, or they'll use `esc_html()` for HTML content instead of `wp_kses_post()`. The prompts we're sharing are designed to force these patterns into the generated code."

**Evan adds:**

> "We also see AI generating outdated patterns—things that were fine in 2015 but aren't best practice anymore. Always check the current Plugin Handbook."

**Key point:** AI needs WordPress-specific guardrails.

---

### Q4: Can I submit a plugin that uses AI-generated code?

**Answer (Evan):**

> "The review team doesn't ask how you wrote your code. We check if it's secure, follows guidelines, and works. If AI helped you write it, that's fine—but *you* are responsible for what you submit. We've seen beautiful AI-generated code and we've seen AI-generated code with obvious vulnerabilities. The tools don't care who wrote it; they care what it does."

**Key point:** You're responsible for what you submit, regardless of how it was written.

---

### Q5: What's the difference between sanitization and escaping? I keep mixing them up.

**Answer (Courtney):**

> "Think of it this way:
> - **Sanitization** cleans data *coming in*. It removes or neutralizes dangerous content so you can safely store it.
> - **Escaping** prepares data *going out*. It makes data safe for a specific output context—HTML, attributes, JavaScript, SQL.
>
> You sanitize once at input. You escape every time you output—and you use different escape functions depending on where the output goes. They're not interchangeable. Escaping doesn't clean data; it just makes dirty data display safely."

**Key point:** Sanitize input, escape output—they're separate jobs.

---

### Q6: Do I need to use the Settings API, or can I just handle form posts myself?

**Answer (Evan):**

> "You can handle forms yourself, but the Settings API does a lot of the security work for you—nonce generation, option registration, sanitization callbacks. If you roll your own, you need to do all that manually, and reviewers will check if you did it right. For most settings pages, using the Settings API is easier and safer."

**Key point:** Settings API is recommended—it handles security boilerplate.

---

### Q7: My plugin needs to make external API calls. Will that get rejected?

**Answer (Courtney):**

> "Not automatically. The handbook says offloading *assets* (CSS, JS, images) to external servers isn't allowed unless it's a service-providing plugin. But making API calls to services your plugin integrates with is generally fine—that's what plugins do. Just make sure you're not phoning home with user data without consent, and you're not loading assets from CDNs you don't control."

**Key point:** API calls are fine; unexplained asset loading isn't.

---

### Q8: How strict is the WordPress Coding Standards check?

**Answer (Evan):**

> "Reviewers care most about security sniffs—sanitization, escaping, nonces. If your code is functionally secure but has some formatting issues like spacing or brace positions, that's usually not a blocker. But following the full standard makes your code easier to review, easier for others to contribute to, and catches some issues early. We recommend running PHPCS with the WordPress standard, fixing errors, and reviewing warnings. You don't need 100% clean, but security errors are non-negotiable."

**Key point:** Security errors are blockers. Style issues are not.

---

### Q9: What tools should I install before I start?

**Answer (Courtney):**

> "At minimum:
> 1. **Plugin Check plugin** – install it in your dev site
> 2. **PHPCS with WordPress Coding Standards** – install via Composer
> 3. **A local dev environment with `WP_DEBUG` enabled**
>
> Optional but helpful: PHPStan for static analysis, and npm audit if you have JavaScript dependencies.
>
> Run Plugin Check and PHPCS before every submission. Fix errors. Review warnings. This single habit prevents most review rejections."

**Key point:** Plugin Check + PHPCS + WP_DEBUG = your pre-flight checklist.

---

### Q10: I submitted weeks ago and haven't heard anything. What should I do?

**Answer (Evan):**

> "First, check your email including spam—we send from wordpress.org addresses. If it's been more than 3 weeks with no response for a simple plugin, you can post in the #pluginreview Slack channel asking for a status update. Be polite; we're volunteers. Also: don't submit the same plugin again while waiting. One submission at a time per account."

**Key point:** Check spam folder. Be patient. Don't double-submit.

---

## Spicy But Respectful Questions

### Spicy Q1: "Isn't this just gatekeeping? Why so many rules?"

**Answer (Evan, calm and direct):**

> "I get why it feels that way. But the WordPress.org directory is installed by millions of people who trust that plugins there won't break their sites or expose them to attacks. The review process isn't about style preferences—it's about security minimums that protect real users.
>
> The rules we're talking about today aren't arbitrary. Input sanitization prevents attackers from injecting malicious data. Output escaping prevents cross-site scripting. Nonces prevent forged requests. These aren't hoops for the sake of hoops.
>
> And honestly, if a plugin can't pass these checks, it's not ready for production—regardless of whether it's going in the directory."

**Courtney adds:**

> "We're also trying to lower the barrier to *understanding* these rules. That's part of why we made this session—so it doesn't feel like arcane gatekeeping but like a checklist you can actually follow."

**Key point:** Security isn't gatekeeping; it's protecting millions of users.

---

### Spicy Q2: "The review process is too slow. Why can't you just automate it?"

**Answer (Evan):**

> "We've automated a lot. Plugin Check runs automatically on submissions now. But automated tools catch patterns—they don't understand intent. A human reviewer can tell the difference between 'this code looks weird but is actually safe' and 'this code looks normal but has a subtle vulnerability.' We've caught backdoors, tracking code, and security issues that automated tools missed entirely.
>
> Speed is a real concern, and we're working on it. More volunteers always help. But I'd rather have a slower process that catches real problems than a fast process that lets vulnerable plugins into the directory."

**Courtney adds:**

> "And the fastest path through review is submitting clean code. Everything we covered today is about reducing your wait by getting it right the first time."

**Key point:** Automation catches patterns; humans catch intent. Clean code is the fastest path.

---

### Spicy Q3: "Is AI going to make plugin reviewers obsolete?"

**Answer (Courtney):**

> "AI tools are getting better at spotting known patterns. But reviewing a plugin isn't just pattern-matching—it's understanding what the plugin is trying to do, whether its approach is appropriate, and whether there are edge cases the author didn't consider. That requires judgment."

**Evan adds:**

> "Right now, AI helps us scan faster, but it also helps people write code faster—which means more submissions. The bottleneck isn't just scanning; it's decision-making. I don't see human reviewers going away. I see the tooling getting better on both sides.
>
> Also, the 'cat and mouse' aspect is real. People who want to sneak things past review will try to fool automated tools. Human judgment is the last line of defense."

**Key point:** AI speeds up scanning but doesn't replace judgment. Reviewers stay relevant.

---

## Q&A Moderation Notes

**Courtney's role:**
- Call on questioners, repeat questions for the room
- Direct technical questions to Evan: "Evan, what's your take on...?"
- Keep answers to 60–90 seconds
- Have 2–3 pre-seeded questions ready if audience is slow to start

**Evan's role:**
- Answer reviewer-specific and security questions
- Keep answers concrete and brief
- If a question is confrontational, stay calm and focus on facts

**Time management:**
- 10 minutes = roughly 6–8 questions
- At 8 minutes, signal "one more question"
- End on time—thank audience, point to resources

**Dodge politely if needed:**
- "That's a great question but a bit outside our scope—happy to chat after!"
- "I don't want to speculate—check the handbook for the authoritative answer."

---

## Backup Seed Questions (If Audience Is Quiet)

If no hands go up:

1. "A question we get a lot is: 'What if I disagree with reviewer feedback?' Evan, how should developers handle that?"

2. "Courtney, you mentioned AI-generated code—what patterns do you see that don't match WordPress standards?"

3. "Someone in the back is definitely wondering: how long does review actually take? Evan, the real answer?"
