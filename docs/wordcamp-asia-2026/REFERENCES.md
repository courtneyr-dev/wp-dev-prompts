# References

> Source documentation and supporting context for "From 'It Runs' to 'It Ships'"

---

## Official WordPress.org Sources

These are authoritative references from WordPress.org documentation:

### Plugin Handbook – Common Issues
**URL:** https://developer.wordpress.org/plugins/wordpress-org/common-issues/

**Used for:**
- Top 5 avoidable review issues list
- Sanitization/validation/escaping requirements
- Nonce verification patterns
- Capability check requirements
- Direct file access prevention
- SQL injection prevention
- Function/class naming requirements

### Plugin Developer FAQ
**URL:** https://developer.wordpress.org/plugins/wordpress-org/plugin-developer-faq/

**Used for:**
- Submission file format requirements (zip, under 10MB)
- Production-readiness expectations
- Resubmission protocol
- Review timeline expectations

### Plugin Handbook – Security
**URL:** https://developer.wordpress.org/plugins/security/

**Used for:**
- Data validation overview
- Nonce explanation
- User capability checks
- Securing input and output

### Plugin Handbook – Data Validation
**URL:** https://developer.wordpress.org/plugins/security/data-validation/

**Used for:**
- Sanitization function reference
- Validation best practices
- Escaping function reference

### Plugin Handbook – Nonces
**URL:** https://developer.wordpress.org/plugins/security/nonces/

**Used for:**
- Nonce generation (`wp_nonce_field()`, `wp_create_nonce()`)
- Nonce verification (`wp_verify_nonce()`)
- Nonce lifespan and security properties

### Plugin Handbook – Securing Output
**URL:** https://developer.wordpress.org/plugins/security/securing-output/

**Used for:**
- Escaping function reference
- Context-appropriate escaping guidance
- "Escape late" principle

### readme.txt Validator
**URL:** https://wordpress.org/plugins/developers/readme-validator/

**Used for:**
- readme.txt format validation
- Header requirements reference

### Plugin Check Plugin
**URL:** https://wordpress.org/plugins/plugin-check/

**Used for:**
- Pre-submission automated checks
- Demo tool reference

---

## WordPress Coding Standards

### PHPCS WordPress Coding Standards (GitHub)
**URL:** https://github.com/WordPress/WordPress-Coding-Standards

**Used for:**
- PHPCS ruleset reference
- Installation instructions
- Security sniff documentation

### WordPress Coding Standards (Handbook)
**URL:** https://developer.wordpress.org/coding-standards/wordpress-coding-standards/

**Used for:**
- PHP coding style requirements
- Naming conventions
- Documentation standards

---

## Tools Referenced in Session

| Tool | URL | Purpose |
|------|-----|---------|
| Plugin Check | https://wordpress.org/plugins/plugin-check/ | Pre-submission validation |
| PHPCS + WPCS | https://github.com/WordPress/WordPress-Coding-Standards | Coding standards enforcement |
| PHPStan | https://phpstan.org/ | Static analysis (optional) |
| WP-CLI | https://wp-cli.org/ | Command-line plugin check |

---

## Supporting Context (Non-Authoritative)

These sources provide additional context but are not official WordPress.org documentation. They're labeled for transparency:

### WordCamp Asia CFP Information
**URL:** https://asia.wordcamp.org/2026/call-for-speakers/ (presumed)

**Used for:**
- Session format options (Joint Session)
- Topic directions (WordPress + AI)
- Submission guidance

*Note: Verify current URL when CFP opens.*

### wp-dev-prompts Repository
**URL:** https://github.com/courtneyr-dev/wp-dev-prompts

**Used for:**
- Existing prompt structure and format
- Repository organization patterns
- CC0 licensing reference

*Note: This is the speakers' own resource, not a WordPress.org source.*

---

## Inferred Patterns (Not Documented)

The following observations are based on experience and community discussion, not official documentation. They're marked as "inferred" in the session materials:

1. **AI-generated code patterns** – Observations about common gaps in AI output for WordPress development. No official WordPress.org position on AI code.

2. **Review timeline variability** – The handbook says "around fourteen days," but actual times vary based on queue size and code quality. No published queue metrics.

3. **Reviewer volunteer capacity** – The review team consists of volunteers; capacity fluctuates. Not officially documented.

---

## How Sources Are Used in Session

| Session Section | Primary Sources |
|-----------------|-----------------|
| Top 5 Issues | Plugin Handbook: Common Issues |
| Security Patterns | Plugin Handbook: Security, Data Validation, Nonces, Securing Output |
| Demo (Plugin Check) | Plugin Check plugin |
| Demo (PHPCS) | WordPress Coding Standards |
| readme.txt | readme.txt Validator, Plugin Developer FAQ |
| Submission Process | Plugin Developer FAQ |
| SVN Workflow | Plugin Handbook (inferred from structure) |

---

## Citation Format for Slides

When citing in slides, use short references:

- "Plugin Handbook: Common Issues"
- "Plugin Handbook: Security"
- "WordPress Coding Standards"

Full URLs in the Resources slide and handout only.

---

## Version and Access Date

- All URLs accessed and verified: December 2024
- WordPress version at time of creation: 6.7
- Recheck all URLs before session delivery (February 2026)
