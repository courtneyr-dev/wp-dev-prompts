# Check Upstream Dependencies

Check all 10 upstream sources tracked in `UPSTREAM.md` for updates.

## Quick check

Run the sync script to see which sources have new commits:

```bash
bash scripts/sync-upstream.sh --check
```

## Full sync workflow

When updates are found:

```bash
# 1. Fetch the upstream repo
bash scripts/sync-upstream.sh --fetch <owner/repo>

# 2. Compare upstream vs local files
bash scripts/sync-upstream.sh --diff <owner/repo>

# 3. Apply changes manually (content is adapted, not directly copied)

# 4. Update the sync date in UPSTREAM.md
bash scripts/sync-upstream.sh --update <owner/repo>
```

## Tracked sources

| # | Repository | Affects |
|---|-----------|---------|
| 1 | WordPress/agent-skills | skills/wordpress-dev/, wordpress-security/, wordpress-performance/ |
| 2 | richtabor/skills | skills/prompt-engineering/ |
| 2b | richtabor/agent-skills | skills/wordpress-accessibility/, ui-ux-audit/, prompt-engineering/ |
| 3 | WordPress/WordPress-Documentation-Style-Guide | skills/prompt-engineering/references/ |
| 4 | Jameswlepage/trac-mcp | platforms/claude-code/ |
| 5 | felixarntz/packages | skills/wordpress-dev/, workflows/plugin-maintenance/ |
| 6 | deanpeters/product-manager-prompts | skills/product-management/ |
| 7 | EveryInc/compound-engineering-plugin | skills/engineering/ |
| 8 | skills.sh (7 individual repos) | skills/wordpress-dev/, wordpress-security/, wordpress-performance/ |
| 9 | jonathanbossenger/wp-openrouter-provider | skills/wordpress-dev/ |
| 10 | laxmariappan/abilities-scout | skills/wordpress-dev/ |

See `UPSTREAM.md` for full details, licenses, and per-repo sync commands.
