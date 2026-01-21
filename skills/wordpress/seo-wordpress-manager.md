# SEO WordPress Manager

> **Type**: Skill
> **Domain**: wordpress/seo
> **Source**: [dragosroua/claude-content-skills](https://skills.sh/dragosroua/claude-content-skills/seo-wordpress-manager)

<skill>
<summary>
Batch management of Yoast SEO metadata via WPGraphQL API for titles, descriptions, keyphrases, and Open Graph data.
</summary>

<knowledge>
## Prerequisites

### WordPress Plugins Required

1. **WPGraphQL** — GraphQL API for WordPress
2. **WPGraphQL for Yoast SEO** — Exposes Yoast fields

### Authentication

Generate Application Password:
1. WordPress Admin → Users → Profile
2. Application Passwords section
3. Create new password for API access

## Configuration

### Option 1: Config File

Create `config.json`:
```json
{
    "graphql_endpoint": "https://your-site.com/graphql",
    "username": "your_username",
    "app_password": "xxxx xxxx xxxx xxxx",
    "batch_size": 10,
    "delay_between_requests": 500
}
```

### Option 2: Environment Variables

```env
WP_GRAPHQL_URL=https://your-site.com/graphql
WP_USERNAME=your_username
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

## Workflow

### Step 1: Analyze Current SEO

```bash
python analyze_seo.py
```

This generates a report of:
- Posts missing meta descriptions
- Titles that are too long/short
- Missing focus keyphrases
- Open Graph issues

### Step 2: Generate Optimized Content

Create `changes.json` with proposed updates:
```json
{
    "posts": [
        {
            "id": "cG9zdDoxMjM=",
            "current": {
                "title": "Old Title That's Too Long For Search Results",
                "metaDesc": "",
                "focusKeyphrase": ""
            },
            "proposed": {
                "title": "Optimized Title Under 60 Chars",
                "metaDesc": "Compelling description under 160 characters that includes the focus keyphrase naturally.",
                "focusKeyphrase": "focus keyphrase"
            }
        }
    ]
}
```

### Step 3: Preview Changes

```bash
python preview_changes.py --dry-run
```

Review proposed changes before applying.

### Step 4: Apply Changes

```bash
python yoast_batch_updater.py --apply
```

### Step 5: Handle Interruptions

Resume interrupted sessions:
```bash
python yoast_batch_updater.py --resume
```

## GraphQL Queries

### Fetch Posts with SEO Data

```graphql
query GetPostsWithSEO($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
        pageInfo {
            hasNextPage
            endCursor
        }
        nodes {
            id
            databaseId
            title
            slug
            seo {
                title
                metaDesc
                focuskw
                opengraphTitle
                opengraphDescription
                opengraphImage {
                    sourceUrl
                }
            }
        }
    }
}
```

### Update SEO Fields

```graphql
mutation UpdatePostSEO($id: ID!, $title: String, $metaDesc: String, $focuskw: String) {
    updatePost(input: {
        id: $id
        seo: {
            title: $title
            metaDesc: $metaDesc
            focuskw: $focuskw
        }
    }) {
        post {
            id
            seo {
                title
                metaDesc
                focuskw
            }
        }
    }
}
```

## SEO Guidelines

### Title Tags

- Length: 50-60 characters
- Include focus keyphrase near start
- Make it compelling for clicks
- Unique for each page

### Meta Descriptions

- Length: 150-160 characters
- Include focus keyphrase naturally
- Clear value proposition
- Call to action when appropriate

### Focus Keyphrases

- One primary keyphrase per page
- Research search volume
- Match user intent
- Use in title, meta, and content

## Safety Features

### Built-in Protections

1. **Dry-run mode** — Preview changes without applying
2. **Confirmation prompts** — Require explicit approval
3. **Progress tracking** — Resume interrupted sessions
4. **Rate limiting** — Configurable delays between requests
5. **Audit logging** — Record all changes with timestamps

### Best Practices

- Always preview before applying
- Back up database before batch updates
- Start with small batches
- Monitor site performance during updates
</knowledge>

<best_practices>
- Run analysis first to identify priority fixes
- Preview all changes before applying
- Use rate limiting to avoid server overload
- Keep titles under 60 chars, descriptions under 160
- Include focus keyphrase in title and meta
</best_practices>

<references>
- [skills.sh/dragosroua](https://skills.sh/dragosroua/claude-content-skills/seo-wordpress-manager)
- [WPGraphQL Documentation](https://www.wpgraphql.com/docs)
- [Yoast SEO Documentation](https://developer.yoast.com/)
</references>
</skill>
