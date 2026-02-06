#!/usr/bin/env python3
"""
Publish markdown blog posts to WordPress as drafts.

Source: https://github.com/richtabor/skills/tree/main/technical-writing

Usage:
    python publish-to-wordpress.py <file.md> [--tags tag1,tag2,tag3]

Environment variables required:
    WORDPRESS_URL - Your WordPress site URL (https://yourblog.com)
    WORDPRESS_USERNAME - Your WordPress username
    WORDPRESS_APP_PASSWORD - Application password (NOT your regular password)
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

try:
    import requests
    import markdown2
except ImportError:
    print(json.dumps({
        "success": False,
        "error": "Missing dependencies. Run: pip install requests markdown2"
    }))
    sys.exit(1)


def load_env():
    """Load environment variables from .env.local or .env files."""
    for env_file in [".env.local", ".env"]:
        env_path = Path(env_file)
        if env_path.exists():
            with open(env_path) as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        key, value = line.split("=", 1)
                        value = value.strip('"').strip("'")
                        os.environ.setdefault(key, value)


def get_credentials():
    """Get WordPress credentials from environment."""
    load_env()

    url = os.environ.get("WORDPRESS_URL", "").rstrip("/")
    username = os.environ.get("WORDPRESS_USERNAME", "")
    password = os.environ.get("WORDPRESS_APP_PASSWORD", "")

    if not all([url, username, password]):
        missing = []
        if not url:
            missing.append("WORDPRESS_URL")
        if not username:
            missing.append("WORDPRESS_USERNAME")
        if not password:
            missing.append("WORDPRESS_APP_PASSWORD")
        return None, f"Missing credentials: {', '.join(missing)}"

    return {"url": url, "username": username, "password": password}, None


def extract_title(content):
    """Extract title from first H1 heading."""
    match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    if match:
        title = match.group(1).strip()
        # Remove the title from content
        content = re.sub(r"^#\s+.+\n?", "", content, count=1, flags=re.MULTILINE)
        return title, content.strip()
    return "Untitled Post", content


def markdown_to_gutenberg(content):
    """Convert markdown to WordPress Gutenberg blocks."""
    html = markdown2.markdown(
        content,
        extras=["fenced-code-blocks", "tables", "header-ids"]
    )

    blocks = []
    lines = html.split("\n")
    i = 0

    while i < len(lines):
        line = lines[i].strip()

        if not line:
            i += 1
            continue

        # Code blocks
        if line.startswith("<pre>") or line.startswith("<code"):
            code_content = []
            while i < len(lines) and "</pre>" not in lines[i] and "</code>" not in lines[i]:
                code_content.append(lines[i])
                i += 1
            if i < len(lines):
                code_content.append(lines[i])
            code_html = "\n".join(code_content)
            # Extract language if present
            lang_match = re.search(r'class="[^"]*language-(\w+)', code_html)
            lang = lang_match.group(1) if lang_match else ""
            # Clean up the code
            code_text = re.sub(r"<[^>]+>", "", code_html)
            blocks.append(f'<!-- wp:code -->\n<pre class="wp-block-code"><code>{code_text}</code></pre>\n<!-- /wp:code -->')

        # Headings
        elif re.match(r"<h([1-6])", line):
            match = re.match(r"<h([1-6])[^>]*>(.+?)</h\1>", line)
            if match:
                level, text = match.groups()
                blocks.append(f'<!-- wp:heading {{"level":{level}}} -->\n<h{level} class="wp-block-heading">{text}</h{level}>\n<!-- /wp:heading -->')

        # Lists
        elif line.startswith("<ul>") or line.startswith("<ol>"):
            list_type = "list" if line.startswith("<ul>") else "list"
            ordered = "true" if line.startswith("<ol>") else "false"
            list_content = [line]
            while i < len(lines) and not (lines[i].strip().endswith("</ul>") or lines[i].strip().endswith("</ol>")):
                i += 1
                if i < len(lines):
                    list_content.append(lines[i])
            list_html = "\n".join(list_content)
            blocks.append(f'<!-- wp:list {{"ordered":{ordered}}} -->\n{list_html}\n<!-- /wp:list -->')

        # Blockquotes
        elif line.startswith("<blockquote>"):
            quote_content = [line]
            while i < len(lines) and "</blockquote>" not in lines[i]:
                i += 1
                if i < len(lines):
                    quote_content.append(lines[i])
            quote_html = "\n".join(quote_content)
            blocks.append(f'<!-- wp:quote -->\n{quote_html}\n<!-- /wp:quote -->')

        # Paragraphs
        elif line.startswith("<p>"):
            blocks.append(f'<!-- wp:paragraph -->\n{line}\n<!-- /wp:paragraph -->')

        # Other content as paragraph
        elif line and not line.startswith("<!--"):
            blocks.append(f'<!-- wp:paragraph -->\n<p>{line}</p>\n<!-- /wp:paragraph -->')

        i += 1

    return "\n\n".join(blocks)


def get_or_create_tags(creds, tag_names):
    """Get existing tags or create new ones."""
    tags_url = f"{creds['url']}/wp-json/wp/v2/tags"
    auth = (creds["username"], creds["password"])
    tag_ids = []

    for name in tag_names:
        name = name.strip()
        if not name:
            continue

        # Search for existing tag
        response = requests.get(tags_url, auth=auth, params={"search": name})
        if response.status_code == 200:
            existing = response.json()
            found = None
            for tag in existing:
                if tag["name"].lower() == name.lower():
                    found = tag
                    break
            if found:
                tag_ids.append(found["id"])
                continue

        # Create new tag
        response = requests.post(tags_url, auth=auth, json={"name": name})
        if response.status_code == 201:
            tag_ids.append(response.json()["id"])

    return tag_ids


def suggest_category(creds):
    """Fetch categories and return the first one as suggestion."""
    cats_url = f"{creds['url']}/wp-json/wp/v2/categories"
    auth = (creds["username"], creds["password"])

    response = requests.get(cats_url, auth=auth, params={"per_page": 10})
    if response.status_code == 200:
        categories = response.json()
        if categories:
            # Return first non-Uncategorized category
            for cat in categories:
                if cat["name"].lower() != "uncategorized":
                    return cat["id"], cat["name"]
            return categories[0]["id"], categories[0]["name"]
    return None, None


def load_post_mapping(blog_dir):
    """Load the mapping of markdown files to WordPress post IDs."""
    mapping_file = blog_dir / "wordpress.json"
    if mapping_file.exists():
        with open(mapping_file) as f:
            return json.load(f)
    return {}


def save_post_mapping(blog_dir, mapping):
    """Save the mapping of markdown files to WordPress post IDs."""
    mapping_file = blog_dir / "wordpress.json"
    with open(mapping_file, "w") as f:
        json.dump(mapping, f, indent=2)


def publish_post(file_path, tags=None):
    """Publish or update a markdown file as a WordPress draft."""
    creds, error = get_credentials()
    if error:
        return {"success": False, "error": error}

    file_path = Path(file_path)
    if not file_path.exists():
        return {"success": False, "error": f"File not found: {file_path}"}

    # Read and parse markdown
    content = file_path.read_text()
    title, body = extract_title(content)
    gutenberg_content = markdown_to_gutenberg(body)

    # Get blog directory and load mapping
    blog_dir = file_path.parent
    mapping = load_post_mapping(blog_dir)
    file_key = file_path.name

    # Check if post already exists
    existing_post_id = mapping.get(file_key)

    # Prepare post data
    post_data = {
        "title": title,
        "content": gutenberg_content,
        "status": "draft",
    }

    # Add tags if provided
    if tags:
        tag_names = [t.strip() for t in tags.split(",") if t.strip()]
        tag_ids = get_or_create_tags(creds, tag_names)
        if tag_ids:
            post_data["tags"] = tag_ids

    # Add category suggestion
    cat_id, cat_name = suggest_category(creds)
    if cat_id:
        post_data["categories"] = [cat_id]

    auth = (creds["username"], creds["password"])

    if existing_post_id:
        # Update existing post
        post_url = f"{creds['url']}/wp-json/wp/v2/posts/{existing_post_id}"
        response = requests.post(post_url, auth=auth, json=post_data)
        action = "updated"
    else:
        # Create new post
        post_url = f"{creds['url']}/wp-json/wp/v2/posts"
        response = requests.post(post_url, auth=auth, json=post_data)
        action = "created"

    if response.status_code not in [200, 201]:
        return {
            "success": False,
            "error": f"WordPress API error: {response.status_code}",
            "details": response.text
        }

    post = response.json()
    post_id = post["id"]

    # Save mapping
    mapping[file_key] = post_id
    save_post_mapping(blog_dir, mapping)

    return {
        "success": True,
        "message": f"Post {action} as draft",
        "title": title,
        "post_id": post_id,
        "post_url": post["link"],
        "edit_url": f"{creds['url']}/wp-admin/post.php?post={post_id}&action=edit",
        "status": "draft",
        "action": action,
        "category": cat_name,
        "tags": tags.split(",") if tags else []
    }


def main():
    parser = argparse.ArgumentParser(
        description="Publish markdown to WordPress as draft"
    )
    parser.add_argument("file", help="Markdown file to publish")
    parser.add_argument("--tags", help="Comma-separated tags", default="")

    args = parser.parse_args()
    result = publish_post(args.file, args.tags)
    print(json.dumps(result, indent=2))

    sys.exit(0 if result["success"] else 1)


if __name__ == "__main__":
    main()
