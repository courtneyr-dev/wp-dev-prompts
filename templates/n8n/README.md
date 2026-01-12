# n8n Workflow Templates

> **Platform**: n8n (self-hosted workflow automation)
> **Purpose**: Orchestrate tiered AI agent system

## Overview

These templates provide ready-to-import n8n workflows for automating task classification and routing in the tiered agent system.

## Available Templates

| Template | Purpose | Trigger |
|----------|---------|---------|
| `task-router.json` | Classify tasks and create labeled GitHub issues | Webhook |
| `github-issue-triage.json` | Auto-label new GitHub issues by complexity | GitHub webhook |
| `daily-maintenance.json` | Run scheduled quality checks | Cron schedule |

## Quick Start

### Import a Template

1. Open n8n at `http://localhost:5678`
2. Click **Import from File**
3. Select the JSON file
4. Update credentials and repository settings
5. Activate the workflow

### Required Credentials

All templates need GitHub credentials:

1. Create a [Personal Access Token](https://github.com/settings/tokens) with `repo` scope
2. In n8n, go to **Credentials** → **Add credential** → **GitHub**
3. Enter your token

## Template Details

### Task Router

**File**: `task-router.json`

Routes incoming tasks to appropriate tier based on complexity signals.

```
Webhook POST → Classify → Create GitHub Issue
```

**Webhook URL**: `http://localhost:5678/webhook/task-router`

**Sample Request**:

```bash
curl -X POST http://localhost:5678/webhook/task-router \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Add PHPDoc to helpers",
    "description": "Document helper functions",
    "files": ["includes/helpers.php"],
    "has_tests": true
  }'
```

**Classification Logic**:

| Signal | Score |
|--------|-------|
| 1-2 files | +1 |
| 3-5 files | +2 |
| 6+ files | +3 |
| "security" in description | +1 |
| "architecture" in description | +1 |
| "refactor" in description | +1 |
| No existing tests | +1 |

**Tier Assignment**:

| Score | Tier | Label | Tool |
|-------|------|-------|------|
| ≤2 | T1 | routine | Copilot |
| 3-4 | T2 | analytical | Cursor/ChatGPT |
| ≥5 | T3 | complex | Claude Code |

### GitHub Issue Triage

**File**: `github-issue-triage.json`

Automatically labels new GitHub issues based on complexity analysis.

```
GitHub Issue Created → Analyze → Add Labels
```

**Setup**:

1. Import the workflow
2. Configure GitHub webhook in your repository:
   - Settings → Webhooks → Add webhook
   - Payload URL: Your n8n webhook URL
   - Content type: application/json
   - Events: Issues (opened)

**Labels Created**:

- `t1` — Routine task
- `t2` — Analytical task
- `t3` — Complex task

### Daily Maintenance

**File**: `daily-maintenance.json`

Runs scheduled quality checks and creates tasks for violations.

```
Schedule (daily) → Run Checks → Create T1 Issues
```

**Default Schedule**: 8:00 AM daily (configurable)

**Checks Performed**:

1. PHPCS violations (creates T1 fix tasks)
2. Outdated dependencies (creates T2 review task)
3. Test coverage drops (creates T2 analysis task)

## Customization

### Adjust Classification Thresholds

In `task-router.json`, find the Code node and modify:

```javascript
// Change tier thresholds
if (score <= 2) {      // T1 threshold
  tier = 'T1';
} else if (score <= 4) { // T2 threshold
  tier = 'T2';
} else {
  tier = 'T3';
}
```

### Add Classification Signals

Add more signals in the scoring logic:

```javascript
// Add custom signals
if (task.description?.includes('database')) score += 1;
if (task.description?.includes('migration')) score += 2;
if (task.priority === 'critical') score += 1;
```

### Change Repository Settings

After import, update these in each GitHub node:

- **Owner**: Your GitHub username or organization
- **Repository**: Your repository name

### Modify Issue Templates

Edit the issue body template in the GitHub node:

```
## Task

{{ $json.description }}

## Classification

- **Tier**: {{ $json.tier }}
- **Tool**: {{ $json.tool }}

## Custom Section

Add your own content here.
```

## Troubleshooting

### Workflow Not Triggering

1. Check workflow is active (toggle should be green)
2. Verify webhook URL is correct
3. Check n8n logs: `docker logs n8n`

### GitHub Node Errors

1. Verify credentials are configured
2. Check token has required scopes
3. Confirm repository exists and is accessible

### Classification Seems Wrong

1. Check the scoring logic in Code node
2. Review input data format
3. Adjust thresholds for your workflow

## Exposing Webhooks

For GitHub to reach your n8n instance:

**Development**:

```bash
ngrok http 5678
```

**Production**:

Deploy n8n to a server with a public domain, or use Cloudflare Tunnel.

## Related

- [n8n Platform Guide](../../platforms/n8n/README.md)
- [n8n Getting Started](../../platforms/n8n/getting-started.md)
- [Tiered Agent System](../../workflows/tiered-agents/)
