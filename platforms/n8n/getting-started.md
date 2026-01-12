# Getting Started with n8n

> **Time**: 30-60 minutes
> **Requirements**: Docker or Node.js, GitHub account

## Overview

This guide walks through setting up n8n for orchestrating the tiered AI agent system. By the end, you'll have a working task router that classifies tasks and creates labeled GitHub issues.

## Installation Options

### Option A: Docker (Recommended)

```bash
# Create data directory
mkdir -p ~/.n8n

# Run n8n
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Access at `http://localhost:5678`

### Option B: npm

```bash
npm install n8n -g
n8n start
```

### Option C: Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    volumes:
      - ~/.n8n:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your-password
```

Run with:

```bash
docker-compose up -d
```

## First Workflow: Task Router

### Step 1: Create Webhook Trigger

1. Open n8n at `http://localhost:5678`
2. Click **Add workflow**
3. Click **+** to add first node
4. Search for **Webhook**
5. Configure:
   - HTTP Method: POST
   - Path: `task-router`
6. Copy the webhook URL (you'll need this later)

### Step 2: Add Classification Logic

1. Click **+** after Webhook node
2. Add **Code** node
3. Paste this classification logic:

```javascript
const task = $input.first().json;

// Count complexity signals
let score = 0;

// File count
const fileCount = task.files?.length || 1;
if (fileCount <= 2) score += 1;
else if (fileCount <= 5) score += 2;
else score += 3;

// Risk indicators
if (task.description?.toLowerCase().includes('security')) score += 1;
if (task.description?.toLowerCase().includes('architecture')) score += 1;
if (task.description?.toLowerCase().includes('refactor')) score += 1;

// Test status
if (task.has_tests === false) score += 1;

// Determine tier
let tier, label, tool;
if (score <= 2) {
  tier = 'T1';
  label = 'routine';
  tool = 'Copilot';
} else if (score <= 4) {
  tier = 'T2';
  label = 'analytical';
  tool = 'Cursor/ChatGPT';
} else {
  tier = 'T3';
  label = 'complex';
  tool = 'Claude Code';
}

return {
  json: {
    ...task,
    tier,
    label,
    tool,
    score,
    classified_at: new Date().toISOString()
  }
};
```

### Step 3: Add GitHub Integration

1. Click **+** after Code node
2. Add **GitHub** node
3. Configure:
   - Resource: Issue
   - Operation: Create
   - Owner: `{{ your-username }}`
   - Repository: `{{ your-repo }}`
   - Title: `[{{ $json.tier }}] {{ $json.title }}`
   - Body: See template below
   - Labels: `{{ $json.tier.toLowerCase() }}`

Issue body template:

```
## Task

{{ $json.description }}

## Classification

- **Tier**: {{ $json.tier }} ({{ $json.label }})
- **Recommended Tool**: {{ $json.tool }}
- **Complexity Score**: {{ $json.score }}

## Files

{{ $json.files?.join('\n- ') || 'Not specified' }}

---
*Classified by n8n task router*
```

### Step 4: Connect and Activate

1. Connect all nodes: Webhook → Code → GitHub
2. Click **Save**
3. Toggle **Active** to enable workflow

### Step 5: Test the Workflow

Send a test request:

```bash
curl -X POST http://localhost:5678/webhook/task-router \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Add PHPDoc to utility functions",
    "description": "Add documentation to helper functions",
    "files": ["includes/helpers.php"],
    "has_tests": true
  }'
```

This should create a T1 issue in your repository.

## Setting Up GitHub Credentials

### Create Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click **Generate new token (classic)**
3. Select scopes:
   - `repo` (full repo access)
   - `workflow` (optional, for Actions)
4. Copy the token

### Add Credentials in n8n

1. In n8n, click **Credentials** (left sidebar)
2. Click **Add credential**
3. Search for **GitHub**
4. Configure:
   - Credential Name: GitHub Personal
   - Access Token: (paste your token)
5. Click **Save**

## Next Steps

After the task router works:

### Import Pre-Built Workflows

Import templates from `templates/n8n/`:

1. In n8n, click **Import from File**
2. Select workflow JSON file
3. Update credentials and repository settings
4. Activate

### Add More Workflows

| Workflow | Purpose |
|----------|---------|
| `task-router.json` | Classify and route tasks |
| `github-issue-triage.json` | Auto-label new issues |
| `daily-maintenance.json` | Scheduled quality checks |

### Expose Webhook (Optional)

For GitHub webhooks, n8n needs to be publicly accessible:

**Option 1: ngrok (development)**

```bash
ngrok http 5678
```

**Option 2: Cloudflare Tunnel**

```bash
cloudflared tunnel --url http://localhost:5678
```

**Option 3: Deploy to server**

For production, deploy n8n to a server with a domain.

## Troubleshooting

### Webhook Not Receiving

- Check workflow is active (toggle should be on)
- Verify webhook URL is correct
- Check n8n logs: `docker logs n8n`

### GitHub Node Fails

- Verify credentials are configured
- Check token has `repo` scope
- Confirm repository exists

### Classification Wrong

- Review the scoring logic in Code node
- Adjust thresholds based on your needs
- Add more signals for your specific workflow

## Reference

### Sample Payloads

**T1 Task (Routine)**:

```json
{
  "title": "Fix typo in readme",
  "description": "Spelling error on line 42",
  "files": ["README.md"],
  "has_tests": true
}
```

**T2 Task (Analytical)**:

```json
{
  "title": "Review REST API security",
  "description": "Security audit of API endpoints",
  "files": ["includes/rest-api.php", "includes/auth.php", "includes/validation.php"],
  "has_tests": true
}
```

**T3 Task (Complex)**:

```json
{
  "title": "Implement caching layer",
  "description": "Add caching architecture for API responses",
  "files": ["includes/cache.php", "includes/api.php", "includes/settings.php", "tests/test-cache.php", "includes/admin.php", "includes/hooks.php"],
  "has_tests": false
}
```

## Related

- [n8n Platform Overview](./README.md)
- [n8n Workflow Templates](../../templates/n8n/)
- [Tiered Agent System](../../workflows/tiered-agents/)
