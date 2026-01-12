# n8n Platform Integration

> **Platform**: n8n (self-hosted workflow automation)
> **Use Case**: Orchestrating tiered AI agent workflows

## Overview

n8n is a self-hosted workflow automation tool that can orchestrate the tiered agent system. It handles task routing, GitHub integration, and scheduled maintenance without relying on external services.

## Why n8n?

| Feature | Benefit |
|---------|---------|
| Self-hosted | Full control, no vendor lock-in |
| Visual workflows | Easy to understand and modify |
| Webhook triggers | Integrate with GitHub, Slack, etc. |
| HTTP requests | Call AI APIs directly |
| Scheduling | Run maintenance tasks automatically |
| Free tier | Generous limits for personal use |

## Tiered Agent Workflows

### Task Router

Routes incoming tasks to appropriate tier based on complexity signals:

```
Webhook → Classify → Route
                ↓
    T1: Create issue with [T1] label
    T2: Create issue + request review
    T3: Create issue + full context dump
```

### GitHub Issue Triage

Automatically labels new issues by complexity:

```
GitHub webhook → Parse → Classify → Label
```

### Daily Maintenance

Scheduled tasks for repository health:

```
Schedule → Run PHPCS → Report violations → Create T1 tasks
```

## Getting Started

See [getting-started.md](./getting-started.md) for setup instructions.

## Available Templates

Templates are located in [`/templates/n8n/`](../../templates/n8n/):

| Template | Purpose |
|----------|---------|
| `task-router.json` | Route tasks to appropriate tier |
| `github-issue-triage.json` | Auto-label GitHub issues |
| `daily-maintenance.json` | Scheduled quality checks |

## Integration Points

### With GitHub

- Webhook on issue creation
- Webhook on PR creation
- Create issues via API
- Add labels via API
- Create comments via API

### With AI Tools

n8n can call AI APIs directly, but for the tiered system, it's better to:

1. Use n8n for **orchestration** (routing, triggering, logging)
2. Use AI tools **directly** for the actual work

This keeps workflows simple and leverages each tool's strengths.

### With Slack/Discord

Optional notifications:

- T3 task created → notify team
- Daily report → post summary
- Escalation detected → alert

## Best Practices

### Keep Workflows Simple

Each workflow should do one thing well:

- ✅ Route tasks to tiers
- ✅ Label GitHub issues
- ❌ Route tasks AND create PRs AND run tests

### Use Webhooks Sparingly

Webhooks create immediate load. For non-urgent tasks:

- Use scheduled triggers instead
- Batch similar operations
- Add rate limiting

### Log Everything

Include logging nodes for debugging:

```
Trigger → Log input → Process → Log result → Output
```

### Test Before Production

n8n has a test mode. Use it:

1. Build workflow
2. Test with sample data
3. Check all branches
4. Enable for production

## Related

- [Getting Started](./getting-started.md)
- [n8n Templates](../../templates/n8n/)
- [Tiered Agent System](../../workflows/tiered-agents/)
