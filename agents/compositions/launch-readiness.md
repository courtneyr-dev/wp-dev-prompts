# Launch Readiness Check

> **Type**: Agent Composition
> **Command**: `[READINESS CHECK]`
> **Origin**: Extracted from Digital Experience Integrity System v1.0.0

<composition>
<purpose>
Pre-launch gate check covering critical quality dimensions. Use before deploying new sites, features, or major updates to production.
</purpose>

<agents>
**Coordinator:**
- site-review-orchestrator (orchestrators/)

**All Specialists in Gate-Check Mode:**
- content-strategy (content completeness)
- seo-strategy (SEO readiness)
- accessibility (WCAG compliance)
- performance (CWV thresholds)
- security-advisory (security gates)
- brand-consistency (brand alignment)
</agents>

<execution_order>
**All Parallel (Gate-Check Mode)**:
Each agent performs a focused go/no-go assessment:

- Content Strategy: Content complete? Navigation working? Governance clear?
- SEO Strategy: Meta tags set? Schema implemented? Redirects configured?
- Accessibility: WCAG AA compliant? Critical violations resolved?
- Performance: CWV thresholds met? Performance budget within limits?
- Security: Nonces in place? Capabilities checked? Privacy disclosed?
- Brand: On-brand? Consistent? No violations?

**Synthesis**:
- Orchestrator compiles go/no-go matrix
- Identifies blockers vs. non-blocking issues
- Provides launch recommendation
</execution_order>

<permissions>
Before proceeding, ask user to confirm:

- [ ] Staging/preview URL to assess
- [ ] Launch date/timeline
- [ ] Critical pages to verify
- [ ] Acceptance criteria (if defined)
- [ ] Stakeholder sign-off requirements
</permissions>

<combined_output>
## Deliverable Structure

### 1. Launch Readiness Summary

| Domain | Status | Blockers | Notes |
|--------|--------|----------|-------|
| Content | GO/NO-GO | [count] | [summary] |
| SEO | GO/NO-GO | [count] | [summary] |
| Accessibility | GO/NO-GO | [count] | [summary] |
| Performance | GO/NO-GO | [count] | [summary] |
| Security | GO/NO-GO | [count] | [summary] |
| Brand | GO/NO-GO | [count] | [summary] |

### 2. Overall Recommendation
**[READY TO LAUNCH / CONDITIONAL / NOT READY]**

### 3. Blocker Details
For each blocker:
- Issue description
- Why it blocks launch
- Remediation required
- Estimated effort

### 4. Non-Blocking Issues
Issues that should be addressed post-launch:
- Priority ranking
- Timeline recommendations

### 5. Post-Launch Monitoring
- What to monitor after launch
- Success metrics
- Rollback triggers
</combined_output>

<gate_criteria>
## Default Gate Criteria

**Content Gates:**
- [ ] All pages have content (no placeholders)
- [ ] Navigation complete and functional
- [ ] 404 page configured
- [ ] Contact/support paths working

**SEO Gates:**
- [ ] All pages have meta titles and descriptions
- [ ] Schema markup validated
- [ ] XML sitemap generated
- [ ] Robots.txt configured correctly
- [ ] Redirects from old URLs (if migration)

**Accessibility Gates:**
- [ ] No critical WCAG violations
- [ ] Keyboard navigation functional
- [ ] Focus indicators visible
- [ ] Form labels present

**Performance Gates:**
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] No render-blocking resources

**Security Gates:**
- [ ] Forms have CSRF protection
- [ ] No exposed sensitive data
- [ ] HTTPS enforced
- [ ] Privacy policy current

**Brand Gates:**
- [ ] Consistent with brand guidelines
- [ ] No placeholder branding
- [ ] Legal disclaimers present
</gate_criteria>
</composition>

## Usage

```
[READINESS CHECK]

URL: https://staging.example.com
Launch Date: [target date]
Critical Pages: [homepage, checkout, contact, etc.]
Known Risks: [describe any known issues]
```

## When to Use

- Before any production deployment
- Before WordPress.org plugin submission
- Before client handoff
- Before marketing campaign launch
- After major updates

## Related Resources

- **All Specialists**: agents/specialists/
- **Prompts**: prompts/extended/PROJECT-KICKSTART-PROMPT.md (Phase 6)
- **Checklists**: templates/checklists/QA-TESTING-CHECKLIST.md
