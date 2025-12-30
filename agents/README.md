# Agents

Modular AI agents for WordPress development and site review tasks. Each agent is a specialist in one domain, coordinated by orchestrators for complex workflows.

## What Are Agents?

Agents are specialized AI personas that:
- Have **deep expertise** in one domain
- Can be **combined** for complex tasks
- Always **ask permission** before taking significant actions
- Follow **consistent patterns** for output and ownership

## Agent Types

### 1. Orchestrators (`orchestrators/`)

Master agents that coordinate specialists:
- Route requests to appropriate specialists
- Synthesize findings across domains
- Prioritize recommendations
- Assign ownership via RACI model

**Examples**:
- `site-review-orchestrator.md` - Coordinates site assessment
- `plugin-kickstart-orchestrator.md` - Guides new plugin development
- `testing-setup-orchestrator.md` - Coordinates testing infrastructure

### 2. Specialists (`specialists/`)

Domain experts with focused knowledge:
- Single area of expertise
- Deep, actionable recommendations
- Standard output format
- RACI ownership assignments

**Examples**:
- `content-strategy.md` - Information architecture
- `seo-strategy.md` - Search optimization
- `accessibility.md` - WCAG compliance
- `performance.md` - Speed optimization
- `security-advisory.md` - Security review

### 3. Compositions (`compositions/`)

Pre-configured agent groups for common tasks:
- Define which specialists to include
- Specify execution order (parallel/sequential)
- Set permission requirements
- Produce combined output

**Examples**:
- `full-site-assessment.md` - All specialists
- `content-review.md` - Content-focused subset
- `experience-review.md` - UX-focused subset
- `launch-readiness.md` - Pre-launch checks

## Directory Structure

```
agents/
├── README.md                    # This file
│
├── orchestrators/               # Master coordinators
│   ├── site-review-orchestrator.md
│   ├── plugin-kickstart-orchestrator.md
│   └── testing-setup-orchestrator.md
│
├── specialists/                 # Domain experts
│   ├── content-strategy.md
│   ├── seo-strategy.md
│   ├── accessibility.md
│   ├── performance.md
│   ├── security-advisory.md
│   ├── brand-consistency.md
│   ├── localization.md
│   ├── analytics.md
│   ├── user-research.md
│   └── competitive-intel.md
│
└── compositions/                # Pre-configured groups
    ├── full-site-assessment.md
    ├── content-review.md
    ├── experience-review.md
    ├── security-review.md
    └── launch-readiness.md
```

## Agent Format

### Orchestrator Format

```markdown
# [Orchestrator Name]

<agent type="orchestrator">
<role>
You are the [Name] Orchestrator. You coordinate specialized agents
to [achieve goal].
</role>

<capabilities>
- Route requests to appropriate specialist agents
- Synthesize findings across multiple domains
- Prioritize recommendations by business impact
- Assign ownership via RACI model
</capabilities>

<routing>
## Decision Tree

When user describes their problem, route to appropriate agents:

| Problem | Agents to Spawn |
|---------|-----------------|
| [Problem 1] | [Agent A] + [Agent B] |
| [Problem 2] | [Agent C] |
</routing>

<activation_commands>
- `[COMMAND 1]` - Description
- `[COMMAND 2]` - Description
- `[SPECIFIC: agent-name]` - Spawn single specialist
</activation_commands>

<permissions>
Before proceeding, ask user to confirm:
- [ ] [Permission 1]
- [ ] [Permission 2]
</permissions>

<output_synthesis>
## Final Deliverable Structure

1. Executive Summary (top findings by impact)
2. Findings by Domain (each agent's output)
3. RACI Ownership Matrix
4. Prioritized Action Plan
</output_synthesis>
</agent>
```

### Specialist Format

```markdown
# [Specialist Name] Agent

<agent type="specialist">
<role>
You are a [Role Title] focused on [specific domain].
</role>

<analyzes>
- [What this agent examines 1]
- [What this agent examines 2]
- [What this agent examines 3]
</analyzes>

<delivers>
- [Output 1]
- [Output 2]
- [Output 3]
</delivers>

<methodology>
## Assessment Process

1. [Step 1]
2. [Step 2]
3. [Step 3]
</methodology>

<findings_format>
## Finding Template

**Issue**: [Description]
**Impact**: [High/Medium/Low]
**Evidence**: [Specific examples]
**Recommendation**: [Action to take]
**Effort**: [Quick win / Medium / Major project]
</findings_format>

<raci_assignments>
| Activity | Accountable | Responsible | Consulted | Informed |
|----------|-------------|-------------|-----------|----------|
| [Activity 1] | [Role] | This Agent | [Roles] | [Roles] |
</raci_assignments>
</agent>
```

### Composition Format

```markdown
# [Composition Name]

<composition>
<purpose>
[What this composition accomplishes]
</purpose>

<agents>
- [orchestrator-name] (coordinator)
- [specialist-1]
- [specialist-2]
- [specialist-3]
</agents>

<execution_order>
Phase 1 (Parallel): [Agent A], [Agent B]
Phase 2 (Parallel): [Agent C], [Agent D]
Phase 3 (Sequential): [Agent E] (needs prior findings)
Phase 4: Orchestrator synthesizes all findings
</execution_order>

<permissions>
Before proceeding, ask user to confirm:
- [ ] [Permission 1]
- [ ] [Permission 2]
- [ ] [Permission 3]
</permissions>

<combined_output>
## Deliverable Structure

1. [Section 1]
2. [Section 2]
3. [Section 3]
</combined_output>
</composition>
```

## Permission Model

All agents follow the "ask permission" principle:

### Before Taking Action

Agents must ask permission before:
- Creating or modifying files
- Running shell commands
- Making architectural decisions
- Accessing external resources
- Changing existing functionality

### How to Ask

```markdown
I'd like to [action]. This will:
- [Impact 1]
- [Impact 2]

May I proceed? [Yes/No]
```

### Scope Confirmation

For complex tasks, confirm scope first:

```markdown
Before I begin the [task], please confirm:
- [ ] Scope: [what's included]
- [ ] Access: [what I can access]
- [ ] Timeline: [any constraints]
```

## RACI Model

All agents use RACI for ownership assignment:

| Role | Meaning | Description |
|------|---------|-------------|
| **R** | Responsible | Does the work |
| **A** | Accountable | Owns the outcome |
| **C** | Consulted | Gives input |
| **I** | Informed | Kept in loop |

Example:
| Activity | A | R | C | I |
|----------|---|---|---|---|
| Security audit | CTO | Security Agent | Dev Team | Leadership |
| Fix vulnerabilities | Dev Lead | Developer | Security Agent | CTO |

## Using Agents

### Direct Invocation

Call a specific agent:

```
Use the Performance Agent to analyze this site's Core Web Vitals.
```

### Via Composition

Use pre-configured groups:

```
Run [EXPERIENCE REVIEW] on this WordPress site.
```

### Via Orchestrator

Let orchestrator route:

```
I'm seeing slow load times and users can't find content.
[Let orchestrator decide which agents to spawn]
```

## Origin

These agents are extracted from the **Digital Experience Integrity System** (DEIS), which was an 800+ line monolithic prompt. The modular structure allows:

- Using individual specialists as needed
- Creating custom compositions
- Easier maintenance and updates
- Better cross-platform compatibility

The original DEIS is preserved in `archive/v1.3-original/prompts/site-review/`.
