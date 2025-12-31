# Templates

Ready-to-use templates for WordPress development projects.

## Directory Structure

```
templates/
├── checklists/           # QA and testing checklists
├── community/            # Community and contribution files
├── github/               # GitHub-specific templates
├── marketing/            # Marketing content templates
└── workflows/            # Development workflow templates
```

## Templates by Category

### Checklists (`checklists/`)

| Template | Description |
|----------|-------------|
| `QA-TESTING-CHECKLIST.md` | Comprehensive pre-release QA checklist |

### Community (`community/`)

| Template | Description |
|----------|-------------|
| `CONTRIBUTING-TEMPLATE.md` | Contribution guidelines for open source projects |
| `SECURITY-TEMPLATE.md` | Security policy and vulnerability reporting |
| `SUPPORT-TEMPLATE.md` | Support documentation and help resources |

### GitHub (`github/`)

| Template | Description |
|----------|-------------|
| `ISSUE_TEMPLATE/bug_report.md` | Bug report issue template |
| `ISSUE_TEMPLATE/feature_request.md` | Feature request issue template |
| `ISSUE_TEMPLATE/question.md` | Question/help issue template |
| `PULL_REQUEST_TEMPLATE.md` | Pull request template |

### Marketing (`marketing/`)

| Template | Description |
|----------|-------------|
| `BLOG-POST-LAUNCH-TEMPLATE.md` | Plugin launch announcement post |
| `EMAIL-SEQUENCE-TEMPLATE.md` | 5-email onboarding sequence |
| `SOCIAL-MEDIA-CALENDAR-TEMPLATE.md` | 30-day social content plan |
| `PODCAST-PITCH-TEMPLATE.md` | Podcast guest pitch template |
| `PRESS-RELEASE-TEMPLATE.md` | Professional press release format |

### Workflows (`workflows/`)

| Template | Description |
|----------|-------------|
| `BLUEPRINT-CREATION-GUIDE.md` | WordPress Playground Blueprint guide |
| `BLUEPRINT-PLAYWRIGHT-SCREENSHOTS-TEMPLATE.md` | Automated screenshot setup |
| `USER-STORY-TEMPLATE.md` | User story planning template |
| `VISUAL-REGRESSION-TESTING-TEMPLATE.md` | Visual regression test setup |

## Usage

### Copy to Your Project

```bash
# Copy community files
cp templates/community/*.md /path/to/your-project/

# Copy GitHub templates
cp -r templates/github/* /path/to/your-project/.github/

# Copy specific template
cp templates/marketing/BLOG-POST-LAUNCH-TEMPLATE.md /path/to/your-project/
```

### Customize

1. Replace `[PLACEHOLDERS]` with your project details
2. Remove sections that don't apply
3. Add project-specific information

## Related Resources

- **Guides**: [../guides/](../guides/) - Step-by-step development guides
- **Prompts**: [../prompts/](../prompts/) - AI prompt templates
- **Scripts**: [../scripts/](../scripts/) - Automation scripts
