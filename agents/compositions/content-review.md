# Content Review

> **Type**: Agent Composition
> **Command**: `[CONTENT REVIEW]`
> **Origin**: Extracted from Digital Experience Integrity System v1.0.0

<composition>
<purpose>
Focused assessment of content strategy, quality, and marketing effectiveness. Use when content is the primary concern or when planning content-heavy initiatives.
</purpose>

<agents>
**Coordinator:**
- site-review-orchestrator (orchestrators/)

**Specialists:**
- content-strategy
- content-consulting (via content-strategy with quality focus)
- brand-consistency
</agents>

<execution_order>
**Phase 1 (Parallel)**:
- Content Strategy Agent: Information architecture, content models, governance
- Brand Consistency Agent: Voice/tone audit, visual consistency

**Phase 2 (Sequential)**:
- Combined content quality assessment
- Gap analysis and recommendations

**Phase 3**:
- Orchestrator synthesizes findings
- Prioritized content roadmap
</execution_order>

<permissions>
Before proceeding, ask user to confirm:

- [ ] Website URL(s) to assess
- [ ] Access to content inventory (if available)
- [ ] Brand/style guidelines (if available)
- [ ] Known content pain points
- [ ] Content team structure
</permissions>

<combined_output>
## Deliverable Structure

### 1. Executive Summary
- Top content issues by impact
- Content health scorecard
- Immediate priorities

### 2. Content Strategy Report
- Content inventory with health scores
- Information architecture assessment
- Navigation and wayfinding analysis
- Content model recommendations
- Governance and workflow review

### 3. Content Quality Report
- Page-level audits
- Readability assessment
- Terminology consistency
- Template effectiveness

### 4. Brand Consistency Report
- Voice and tone alignment
- Visual identity adherence
- Style guide gap analysis

### 5. Action Plan
- Content fixes (quick wins)
- Governance improvements
- Template standardization
- Training recommendations
</combined_output>
</composition>

## Usage

```
[CONTENT REVIEW]

Website: https://example.com
Focus: [Information architecture / Content quality / Governance / All]
Known Issues: [Describe any known content problems]
```

## When to Use

- Before content migration or CMS change
- When users can't find information
- When content feels inconsistent
- When teams struggle with publishing
- Before major content initiatives

## Related Resources

- **Specialists**: agents/specialists/content-strategy.md
- **Specialists**: agents/specialists/brand-consistency.md
