# Templates

Ready-to-use templates for WordPress development projects.

## Quick Reference

| Need | Template |
|------|----------|
| QA checklist | [checklists/QA-TESTING-CHECKLIST.md](checklists/QA-TESTING-CHECKLIST.md) |
| Contributing guide | [community/CONTRIBUTING-TEMPLATE.md](community/CONTRIBUTING-TEMPLATE.md) |
| Security policy | [community/SECURITY-TEMPLATE.md](community/SECURITY-TEMPLATE.md) |
| Bug report | [github/ISSUE_TEMPLATE/bug_report.md](github/ISSUE_TEMPLATE/bug_report.md) |
| Launch blog post | [marketing/BLOG-POST-LAUNCH-TEMPLATE.md](marketing/BLOG-POST-LAUNCH-TEMPLATE.md) |
| Email sequence | [marketing/EMAIL-SEQUENCE-TEMPLATE.md](marketing/EMAIL-SEQUENCE-TEMPLATE.md) |
| Social calendar | [marketing/SOCIAL-MEDIA-CALENDAR-TEMPLATE.md](marketing/SOCIAL-MEDIA-CALENDAR-TEMPLATE.md) |
| Blueprint guide | [workflows/BLUEPRINT-CREATION-GUIDE.md](workflows/BLUEPRINT-CREATION-GUIDE.md) |
| User stories | [workflows/USER-STORY-TEMPLATE.md](workflows/USER-STORY-TEMPLATE.md) |

## Directory Structure

```
templates/
├── checklists/     # QA and testing checklists
├── community/      # CONTRIBUTING, SECURITY, SUPPORT
├── github/         # Issue and PR templates
├── marketing/      # Blog, email, social, press release
├── n8n/            # Workflow automation JSON
└── workflows/      # Blueprints, user stories, visual regression
```

## Usage

```bash
# Copy community files
cp templates/community/*.md /path/to/your-project/

# Copy GitHub templates
cp -r templates/github/* /path/to/your-project/.github/

# Copy marketing templates
cp templates/marketing/*.md /path/to/your-project/docs/
```

Replace `[PLACEHOLDERS]` with your project details.

## Related

- [Prompts](../prompts/) — AI prompts for generating content
- [Guides](../guides/) — Step-by-step documentation
- [Workflows](../workflows/) — Multi-step development guides
