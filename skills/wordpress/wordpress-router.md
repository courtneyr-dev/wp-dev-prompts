# WordPress Router

> **Type**: Skill
> **Domain**: wordpress/routing
> **Source**: [Automattic/agent-skills](https://skills.sh/automattic/agent-skills/wordpress-router)

<skill>
<summary>
Identify WordPress project types and route tasks to appropriate domain-specific skills.
</summary>

<knowledge>
## Purpose

Use this skill at the start of WordPress tasks to:
1. Identify the WordPress codebase type
2. Route to the most relevant skill/workflow

## Detection Procedure

### Step 1: Run Quick Checks

```bash
# Plugin detection
grep -r "Plugin Name:" *.php 2>/dev/null | head -1

# Theme detection
grep "Theme Name:" style.css 2>/dev/null

# Block theme detection
ls theme.json templates/ 2>/dev/null

# WordPress core detection
ls wp-includes/ wp-admin/ 2>/dev/null

# Full site detection
ls wp-content/ 2>/dev/null

# Block development detection
find . -name "block.json" 2>/dev/null | head -3
```

### Step 2: Classify Project

| Indicator | Type | Route To |
|-----------|------|----------|
| `Plugin Name:` in PHP | Plugin | plugin-architecture, plugin-core |
| `style.css` + `Theme Name:` | Classic Theme | block-themes |
| `theme.json` + `templates/` | Block Theme | block-themes |
| `block.json` files | Gutenberg Blocks | block-development |
| `wp-includes/` + `wp-admin/` | WP Core | Core contribution workflow |
| `wp-content/` directory | Full Site | Multiple skills based on task |

### Step 3: Route by Intent

| User Intent | Primary Skill | Secondary |
|-------------|---------------|-----------|
| Build Gutenberg block | block-development | interactivity-api |
| Create/edit block theme | block-themes | - |
| Add interactivity | interactivity-api | block-development |
| Plugin architecture | plugin-architecture | plugin-core |
| Performance review | performance-rules | wp-profiling |
| Security audit | input-sanitization, output-escaping | penetration-testing |
| WP-CLI operations | wp-cli | - |
| Isolated testing | playground | - |
| Plugin maintenance | wp-plugins-cli | - |

### Step 4: Apply Guardrails

Before implementing, confirm:
- Target WordPress version constraints
- Existing tooling conventions (composer, npm)
- Test/lint configurations present
- PHP version requirements

## Example Routing

### Scenario: "Add a settings page to my plugin"

1. **Detection**: Found `Plugin Name:` in main file → Plugin project
2. **Intent**: Settings/admin functionality
3. **Route**: `plugin-architecture.md` for Settings API patterns
4. **Check**: PHP version, existing admin structure

### Scenario: "Make this block interactive"

1. **Detection**: Found `block.json` → Block development
2. **Intent**: Add client-side interactivity
3. **Route**: `interactivity-api.md` for directive patterns
4. **Check**: WordPress 6.5+ required

### Scenario: "Review security of this plugin"

1. **Detection**: Found `Plugin Name:` → Plugin project
2. **Intent**: Security audit
3. **Route**: `input-sanitization.md`, `output-escaping.md`, `nonces-capabilities.md`, `database-queries.md`
4. **Check**: Known vulnerability patterns

## Verification

After significant changes:
1. Re-run detection (structure may have changed)
2. Execute repository's lint/test/build commands
3. Verify WordPress compatibility

## Troubleshooting

If detection is ambiguous, check:
- `composer.json` for dependencies
- `package.json` for build tools
- `.wp-env.json` for environment config
- `phpcs.xml` for coding standards
- `phpunit.xml` for test configuration

If still unclear, ask user to clarify project intent.
</knowledge>

<best_practices>
- Run detection before every major WordPress task
- Match skill to both project type AND user intent
- Check version constraints before recommending features
- Verify existing tooling to maintain consistency
</best_practices>

<references>
- [skills.sh/automattic](https://skills.sh/automattic/agent-skills/wordpress-router)
- [Automattic/agent-skills](https://github.com/Automattic/agent-skills)
</references>
</skill>
