# wp-dev-prompts

AI-powered toolkit for WordPress plugin and theme development. Works across Claude Code, Cursor, Cline, Copilot, ChatGPT, Gemini, and others.

**Version**: 3.0.0 | **WordPress**: 6.9+ | **PHP**: 8.2+

## Architecture

```
wp-dev-prompts/
├── prompts/           # AI prompts (core/ portable, extended/ full-featured, tiered/)
├── skills/            # Claude Code Skills with YAML frontmatter + knowledge modules
├── agents/            # Specialist agent prompts for site review and auditing
├── workflows/         # Multi-step automation (plugin maintenance, tiered agents)
├── templates/         # Ready-to-use files (community, marketing, GitHub, n8n)
├── platforms/         # Platform-specific configs (Claude Code, Cursor, Cline, etc.)
├── guides/            # Development lifecycle, testing, marketing guides
├── data/              # Reference data (blocks JSON, audit checklists YAML)
├── tests/             # Playwright tests (GraphQL audit, UI/UX)
├── ui/storybook/      # Component stories with accessibility testing
├── scripts/           # Setup and data fetch scripts
├── docs/              # Documentation, WordCamp materials, audit docs
├── archive/           # Previous version snapshots (v1.3)
└── .claude/           # Claude Code config (commands, agents, hooks, settings)
```

## Commands

| Command | Purpose |
|---------|---------|
| `/commit-push-pr` | Standard git workflow |
| `/verify-content [files]` | Check for AI indicator words and style issues |
| `/verify-repo` | Full repo health check |
| `/add-skill <category> <name> "<desc>">` | Scaffold a new skill |
| `/add-to-claude-md <issue>` | Record a learning |
| `/audit-prompt <file>` | Validate prompt quality and token count |
| `/new-prompt <category> <name>` | Create a prompt from template |
| `/validate-repo` | Comprehensive validation (links, versions, structure) |
| `/kickstart` | Interactive project setup using PROJECT-KICKSTART-PROMPT |
| `/wp-check` | WordPress coding standards compliance check |
| `/check-upstream` | Check upstream dependencies for updates |
| `/draft-post` | Draft a blog post from repo context |

## Writing Rules

Load these references (in priority order) when writing content:
1. `skills/prompt-engineering/references/anti-patterns.md` (highest priority)
2. `skills/prompt-engineering/references/wordpress-docs-style-guide.md`
3. `skills/prompt-engineering/references/style-guide.md`

**Required**: Use second person, active voice, contractions, and present tense. Vary sentence lengths. Be direct.

**Banned words**: delve, tapestry, myriad, leverage, utilize, seamless, robust, cutting-edge, game-changer, furthermore, moreover, subsequently.

**Banned openings**: "In today's...", "Have you ever...", "Let's dive into..."

For marketing content, also load `templates/marketing/STYLE-REFERENCES.md`.

## WordPress Standards

- Follow [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- Sanitize all input, escape all output, verify nonces + capabilities
- Use `$wpdb->prepare()` for all database queries with user input
- Target WordPress 6.9+ and PHP 8.2+
- Use `apiVersion: 3` for blocks (required for WP 7.0 iframe support)

## Content Formats

### Skill Format
Skills use `<skill>`, `<summary>`, `<knowledge>`, `<references>` tags. See `skills/prompt-engineering/SKILL.md` as the reference implementation.

### Prompt Format
Prompts use `<prompt>` tags with category/platform metadata. See `platforms/universal/prompt-specification.md`.

## Things Claude Should NOT Do

- Use AI indicator words or cliched openings
- Add emojis unless explicitly requested
- Create files outside the repository root
- Delete files without explicit confirmation
- Force push to main or amend others' commits
- Push without explicit user instruction
- Add unsolicited documentation or README files

## Upstream Dependencies

This repo tracks 8 external sources. See `UPSTREAM.md` for sync status and update commands. Key sources:
- WordPress/agent-skills (WordPress development patterns)
- richtabor/agent-skills (accessibility, motion design, X writing)
- skills.sh (community WordPress skills)

## Verification

Before completing work, check for AI indicator words:
```bash
grep -r -E "(delve|tapestry|myriad)" --include="*.md" . || echo "Clean"
```
