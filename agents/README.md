# Agents

Specialized AI personas for WordPress development and site review. Agents focus on one domain and can be combined for complex tasks.

## Quick Start

| Task | Use |
|------|-----|
| Full site audit | [full-site-assessment.md](compositions/full-site-assessment.md) |
| Content review | [content-review.md](compositions/content-review.md) |
| Pre-launch check | [launch-readiness.md](compositions/launch-readiness.md) |
| Security review | [security-review.md](compositions/security-review.md) |

## Agent Types

### Orchestrators (`orchestrators/`)

Coordinate multiple specialists:
- Route requests to the right agent
- Synthesize findings across domains
- Prioritize recommendations

### Specialists (`specialists/`)

Domain experts with focused knowledge:

| Agent | Focus |
|-------|-------|
| content-strategy | Information architecture, content gaps |
| seo-strategy | Search optimization, keywords |
| accessibility | WCAG compliance, keyboard nav |
| performance | Core Web Vitals, speed |
| security-advisory | Vulnerabilities, privacy |
| brand-consistency | Visual identity, voice |
| localization | i18n, RTL support |
| analytics | Tracking, conversion |
| user-research | Usability, user needs |
| competitive-intel | Market positioning |

### Compositions (`compositions/`)

Pre-configured agent groups:
- Define which specialists to include
- Specify execution order
- Produce combined output

## Directory Structure

```
agents/
├── orchestrators/      # Master coordinators
├── specialists/        # Domain experts (10 agents)
└── compositions/       # Pre-configured groups
```

## Using Agents

**Direct invocation:**
```
Use the Performance Agent to analyze this site's Core Web Vitals.
```

**Via composition:**
```
Run [EXPERIENCE REVIEW] on this WordPress site.
```

**Via orchestrator:**
```
I'm seeing slow load times and users can't find content.
[Let orchestrator decide which agents to spawn]
```

## Related

- [Prompts](../prompts/) — Single-task AI prompts
- [Skills](../skills/) — Knowledge modules
- [Workflows](../workflows/) — Step-by-step guides
