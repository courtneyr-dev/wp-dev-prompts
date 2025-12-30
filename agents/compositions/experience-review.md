# Experience Review

> **Type**: Agent Composition
> **Command**: `[EXPERIENCE REVIEW]`
> **Origin**: Extracted from Digital Experience Integrity System v1.0.0

<composition>
<purpose>
Focused assessment of user experience quality including accessibility, performance, and user research. Use when users complain about usability or when preparing for major UX improvements.
</purpose>

<agents>
**Coordinator:**
- site-review-orchestrator (orchestrators/)

**Specialists:**
- accessibility
- performance
- user-research
</agents>

<execution_order>
**Phase 1 (Parallel)**:
- Accessibility Agent: WCAG audit, keyboard testing, assistive tech compatibility
- Performance Agent: Core Web Vitals, asset analysis, third-party impact

**Phase 2 (Sequential)**:
- User Research Agent: Synthesize findings with user feedback

**Phase 3**:
- Orchestrator synthesizes findings
- Prioritized UX roadmap
</execution_order>

<permissions>
Before proceeding, ask user to confirm:

- [ ] Website URL(s) to assess
- [ ] Pages/features of primary concern
- [ ] Access to user feedback (support logs, surveys)
- [ ] Accessibility requirements (WCAG level)
- [ ] Performance targets (CWV thresholds)
</permissions>

<combined_output>
## Deliverable Structure

### 1. Executive Summary
- Top UX issues by user impact
- Risk assessment
- Immediate priorities

### 2. Accessibility Report
- WCAG violations by severity
- Keyboard navigation issues
- Screen reader compatibility
- Remediation guidance

### 3. Performance Report
- Core Web Vitals assessment
- Asset optimization opportunities
- Third-party script impact
- Performance budget recommendations

### 4. User Research Synthesis
- Existing feedback patterns
- Task completion barriers
- Research gap analysis
- Validation recommendations

### 5. Action Plan
- Critical accessibility fixes
- Performance quick wins
- Research priorities
- Monitoring recommendations
</combined_output>
</composition>

## Usage

```
[EXPERIENCE REVIEW]

Website: https://example.com
Focus: [Accessibility / Performance / User feedback / All]
User Complaints: [Describe reported issues]
Target Standards: [WCAG 2.1 AA, CWV good thresholds]
```

## When to Use

- When users complain about usability
- Before major UX initiatives
- For accessibility compliance
- When pages feel slow
- Before product launches

## Related Resources

- **Specialists**: agents/specialists/accessibility.md
- **Specialists**: agents/specialists/performance.md
- **Specialists**: agents/specialists/user-research.md
- **Prompts**: prompts/extended/TESTING-AUTOMATION-PROMPTS.md (#13, #14, #15)
