# WordPress Publisher

> **Type**: Skill
> **Domain**: wordpress/publishing
> **Source**: [aviz85/claude-skills-library](https://skills.sh/aviz85/claude-skills-library/wordpress-publisher)

<skill>
<summary>
Publish content to WordPress via REST API using a two-step draft-then-publish workflow.
</summary>

<knowledge>
## Setup

### 1. Create Environment File

Create `.env` in your project root:
```env
WP_URL=https://your-site.com
WP_USERNAME=your_username
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

### 2. Generate Application Password

1. WordPress Admin → Users → Profile
2. Scroll to "Application Passwords"
3. Enter name (e.g., "Claude Publisher")
4. Click "Add New Application Password"
5. Copy the password (remove spaces for `.env`)

### 3. Install Script

Save to `~/.claude/skills/wordpress-publisher/scripts/wp-publish.js`:

```javascript
#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const { WP_URL, WP_USERNAME, WP_APP_PASSWORD } = process.env;

async function createPost(title, contentFile, options = {}) {
    const content = contentFile === '-'
        ? await readStdin()
        : fs.readFileSync(contentFile, 'utf8');

    const postData = {
        title,
        content,
        status: options.publish ? 'publish' : 'draft',
        excerpt: options.excerpt || '',
        categories: options.categories?.split(',').map(Number) || [],
        tags: options.tags?.split(',').map(Number) || [],
    };

    const response = await wpRequest('POST', '/wp-json/wp/v2/posts', postData);

    if (options.image) {
        await uploadFeaturedImage(response.id, options.image);
    }

    return response;
}

async function publishPost(postId) {
    return wpRequest('POST', `/wp-json/wp/v2/posts/${postId}`, {
        status: 'publish'
    });
}

async function getPostStatus(postId) {
    return wpRequest('GET', `/wp-json/wp/v2/posts/${postId}`);
}

async function wpRequest(method, endpoint, data = null) {
    const auth = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

    const options = {
        method,
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
        },
    };

    return new Promise((resolve, reject) => {
        const req = https.request(`${WP_URL}${endpoint}`, options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 400) {
                    reject(new Error(`HTTP ${res.statusCode}: ${body}`));
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// CLI handling
const [,, command, ...args] = process.argv;
// ... implement CLI parsing
```

## Commands

### Create Draft

```bash
# From file
node wp-publish.js create "Post Title" content.html

# From stdin
echo "<h1>Content</h1>" | node wp-publish.js create "Post Title" -

# With featured image
node wp-publish.js create "Post Title" content.html --image=cover.jpg

# Publish immediately
node wp-publish.js create "Post Title" content.html --publish
```

### Publish Existing Draft

```bash
node wp-publish.js publish POST_ID
```

### Check Status

```bash
node wp-publish.js status POST_ID
```

## Options

| Flag | Description |
|------|-------------|
| `--publish` | Publish immediately (default: draft) |
| `--image=<path>` | Featured image file |
| `--excerpt=<text>` | Post excerpt |
| `--categories=<ids>` | Comma-separated category IDs |
| `--tags=<ids>` | Comma-separated tag IDs |

## Response Format

### Draft Created
```json
{
    "id": 123,
    "status": "draft",
    "link": "https://site.com/?p=123",
    "edit_link": "https://site.com/wp-admin/post.php?post=123&action=edit"
}
```

### Published
```json
{
    "id": 123,
    "status": "publish",
    "link": "https://site.com/post-slug/"
}
```

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Bad credentials | Check `.env` values |
| 403 Forbidden | Insufficient permissions | User needs Editor+ role |
| 404 Not Found | Wrong URL or REST disabled | Check site URL, verify REST API |

## RTL Content Support

For Hebrew or Arabic content:
```html
<article dir="rtl" lang="he">
    <p>תוכן בעברית</p>
</article>
```

## Workflow Integration

### With Technical Writing Skill

1. Draft content using technical-writing skill
2. Export to HTML file
3. Create WordPress draft:
   ```bash
   node wp-publish.js create "$(head -1 draft.md | sed 's/# //')" draft.html
   ```
4. Review in WordPress
5. Publish when ready:
   ```bash
   node wp-publish.js publish 123
   ```
</knowledge>

<best_practices>
- Always create as draft first, review, then publish
- Use application passwords, never your main password
- Store credentials in `.env`, never commit to git
- Add `.env` to `.gitignore`
</best_practices>

<references>
- [skills.sh/aviz85](https://skills.sh/aviz85/claude-skills-library/wordpress-publisher)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Application Passwords](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)
</references>
</skill>
