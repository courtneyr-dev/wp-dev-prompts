# Security Review

> **Type**: Agent Composition
> **Command**: `[SECURITY REVIEW]`
> **Origin**: Extracted from Digital Experience Integrity System v1.0.0

<composition>
<purpose>
Focused assessment of content-driven security risks and privacy compliance. Use for compliance preparation, after security incidents, or for regular security hygiene reviews.
</purpose>

<agents>
**Coordinator:**
- site-review-orchestrator (orchestrators/)

**Specialists:**
- security-advisory
- analytics (for privacy/tracking assessment)
</agents>

<execution_order>
**Phase 1 (Parallel)**:
- Security Advisory Agent: Risk assessment, permission review, privacy gaps
- Analytics Agent: Tracking audit, consent verification, data flows

**Phase 2 (Sequential)**:
- Combined privacy impact assessment
- Third-party risk synthesis

**Phase 3**:
- Orchestrator synthesizes findings
- Prioritized security roadmap
</execution_order>

<permissions>
Before proceeding, ask user to confirm:

- [ ] Website URL(s) to assess
- [ ] Compliance requirements (GDPR, CCPA, SOC2, etc.)
- [ ] Access to form inventory
- [ ] List of third-party integrations
- [ ] User role structure
- [ ] Previous security assessments (if any)
</permissions>

<combined_output>
## Deliverable Structure

### 1. Executive Summary
- Critical security findings
- Risk level assessment
- Immediate actions required

### 2. Security Assessment Report
- Content security risks
- Form data collection audit
- Third-party integration risks
- Permission and access control review
- Content-based attack surfaces

### 3. Privacy Compliance Report
- Consent mechanism evaluation
- Cookie/tracking inventory
- Privacy disclosure assessment
- Data flow analysis
- Compliance gap analysis

### 4. Third-Party Risk Summary
- Vendor inventory
- Risk ratings
- Governance recommendations

### 5. Action Plan
- Critical fixes (immediate)
- Compliance gaps to address
- Policy updates needed
- Monitoring recommendations
</combined_output>
</composition>

## Usage

```
[SECURITY REVIEW]

Website: https://example.com
Compliance Context: [SOC 2 prep / GDPR review / General hygiene]
Focus: [Forms / Third-party scripts / Access control / Privacy / All]
Known Concerns: [Describe any known issues]
```

## When to Use

- Before compliance certifications (SOC 2, ISO 27001)
- GDPR/CCPA compliance verification
- After security incidents
- Before adding new third-party tools
- Quarterly security hygiene

## Related Resources

- **Specialists**: agents/specialists/security-advisory.md
- **Specialists**: agents/specialists/analytics.md
- **Prompts**: prompts/extended/TESTING-AUTOMATION-PROMPTS.md (#10, #11, #12)
