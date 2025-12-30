# Full Site Assessment

> **Type**: Agent Composition
> **Command**: `[FULL ASSESSMENT]`
> **Origin**: Extracted from Digital Experience Integrity System v1.0.0

<composition>
<purpose>
Comprehensive website assessment covering all domains: content, SEO, accessibility, performance, security, brand, localization, analytics, user research, and competitive intelligence.
</purpose>

<agents>
**Coordinator:**
- site-review-orchestrator (orchestrators/)

**Phase 1 Specialists (Parallel):**
- content-strategy
- seo-strategy
- accessibility
- performance

**Phase 2 Specialists (Parallel):**
- security-advisory
- analytics
- brand-consistency
- competitive-intel

**Phase 3 Specialists (Sequential - need prior findings):**
- localization
- user-research
</agents>

<execution_order>
## Phased Execution

**Phase 1 (Parallel)**: Foundation Assessment
- Content Strategy Agent: Content inventory, IA review
- SEO Strategy Agent: Technical SEO, intent analysis
- Accessibility Agent: WCAG audit, keyboard testing
- Performance Agent: Core Web Vitals, asset analysis

*Wait for Phase 1 completion before proceeding*

**Phase 2 (Parallel)**: Extended Assessment
- Security Advisory Agent: Risk assessment, privacy review
- Analytics Agent: Tracking audit, data quality
- Brand Consistency Agent: Visual/verbal audit
- Competitive Intelligence Agent: Market positioning

*Wait for Phase 2 completion before proceeding*

**Phase 3 (Sequential)**: Specialized Assessment
- Localization Agent: i18n readiness (needs content findings)
- User Research Agent: Gap analysis (needs all prior findings)

**Phase 4**: Synthesis
- Orchestrator synthesizes all findings
- Prioritizes recommendations
- Assigns ownership via RACI
</execution_order>

<permissions>
Before proceeding, ask user to confirm:

- [ ] Website URL(s) to assess
- [ ] Access to analytics data (if available)
- [ ] Access to support logs/user feedback (if available)
- [ ] List of known competitors
- [ ] Timeline for assessment
- [ ] Key stakeholders and their roles
- [ ] Specific concerns or focus areas
</permissions>

<combined_output>
## Deliverable Structure

### 1. Executive Summary
- Top findings by business impact
- Risk assessment matrix
- Immediate action items

### 2. Phase 1 Findings: Foundation
- Content Strategy Report
- SEO Audit Report
- Accessibility Audit Report
- Performance Audit Report

### 3. Phase 2 Findings: Extended
- Security Assessment Report
- Analytics Audit Report
- Brand Consistency Report
- Competitive Analysis Report

### 4. Phase 3 Findings: Specialized
- Localization Readiness Report
- User Research Gap Analysis

### 5. Prioritized Roadmap
- Quick wins (< 2 weeks)
- Medium-term (1-3 months)
- Strategic initiatives (3-12 months)

### 6. Ownership Matrix (RACI)
- All recommendations with assigned owners
- Dependencies and sequencing
- Success metrics
</combined_output>

<estimated_effort>
**Time Investment:**
- Phase 1: 2-4 hours per domain
- Phase 2: 2-4 hours per domain
- Phase 3: 1-2 hours per domain
- Synthesis: 2-4 hours

**Total**: 20-40 hours for comprehensive assessment
</estimated_effort>
</composition>

## Usage

```
[FULL ASSESSMENT]

Website: https://example.com
Context: [Pre-redesign / Annual review / New acquisition / etc.]
Competitors: [competitor1.com, competitor2.com, competitor3.com]
Available Data: [Analytics access / Support logs / User research]
Timeline: [Findings needed by date]
```

## Related Resources

- **Orchestrator**: agents/orchestrators/site-review-orchestrator.md
- **All Specialists**: agents/specialists/
- **Prompts**: prompts/extended/PROJECT-KICKSTART-PROMPT.md (Phase 0)
