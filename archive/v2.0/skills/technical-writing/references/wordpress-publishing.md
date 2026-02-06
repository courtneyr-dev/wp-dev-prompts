# Publishing to WordPress

> **Source**: [richtabor/skills](https://github.com/richtabor/skills/tree/main/technical-writing)

Once you've drafted a blog post, you can push it directly to WordPress as a draft via the REST API.

---

## Setup (One Time)

You need three things:

### 1. WordPress Site URL

Your blog URL with https:

```
https://yourblog.com
```

### 2. WordPress Username

Your WordPress account username.

### 3. Application Password

Generate one at: **WordPress.com → Account Settings → Security → Application Passwords**

Or for self-hosted: **Users → Profile → Application Passwords**

> **Important**: Use an Application Password, NOT your regular WordPress password. Application Passwords can be revoked independently for better security.

### Set Environment Variables

Add to your shell profile (`~/.zshrc`, `~/.bashrc`, etc.):

```bash
export WORDPRESS_URL="https://yourblog.com"
export WORDPRESS_USERNAME="your_username"
export WORDPRESS_APP_PASSWORD="xxxx xxxx xxxx xxxx"
```

Then reload your shell:

```bash
source ~/.zshrc
```

---

## Install Dependencies

The publishing script requires two Python packages:

```bash
pip install requests markdown2
```

---

## Publishing Your Post

After creating a blog post (saved to `.blog/`), publish it as a WordPress draft.

### Basic Commands

**Save to WordPress:**
```
Save this to WordPress
```

**Save with specific tags:**
```
Save this to WordPress with tags: wordpress, blocks, development
```

**Update an existing post:**
```
Update the block-editor post on WordPress
```

### What the Script Does

1. **Checks if post exists** (tracked via `.blog/wordpress.json`)
2. **If exists**: Updates the existing draft (no duplicates)
3. **If new**: Creates new draft and saves the mapping
4. **Extracts title** from the first H1 heading
5. **Converts markdown** to Gutenberg blocks
6. **Fetches categories** and suggests the best match
7. **Creates or finds tags** on WordPress
8. **Always saves as draft** (never auto-publishes)
9. **Returns URLs** for post and edit page

---

## How It Works

When you ask to save to WordPress, the skill runs:

```bash
python scripts/publish-to-wordpress.py .blog/2025-06-15-my-post.md --tags wordpress,blocks
```

### First Time (Creates New Post)

```json
{
  "success": true,
  "message": "Post created as draft",
  "title": "Building a Better Block",
  "post_id": 123,
  "post_url": "https://yourblog.com/?p=123",
  "edit_url": "https://yourblog.com/wp-admin/post.php?post=123&action=edit",
  "status": "draft",
  "action": "created",
  "category": "Development",
  "tags": ["wordpress", "blocks"]
}
```

### Subsequent Times (Updates Existing)

```json
{
  "success": true,
  "message": "Post updated as draft",
  "post_id": 123,
  "action": "updated"
}
```

The `post_id` stays the same—it updates rather than duplicating.

---

## Workflow Summary

1. All drafts save to `.blog/` with date-based filenames
2. Mapping of files → WordPress posts tracked in `.blog/wordpress.json`
3. First save creates a new WordPress draft
4. Subsequent saves update the same draft
5. Preview, edit, and publish from WordPress admin when ready

---

## Troubleshooting

### "Missing WordPress credentials"

- Check environment variables are set
- Reload your shell (`source ~/.zshrc`)

### Connection Errors

- Verify `WORDPRESS_URL` includes `https://`
- Check your internet connection
- Ensure WordPress site is accessible

### Authentication Errors

- Generate a fresh Application Password
- Don't use your regular WordPress password
- Check username spelling

### Python Package Errors

```bash
pip install requests markdown2
```
