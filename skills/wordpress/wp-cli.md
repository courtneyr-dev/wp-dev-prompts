# WP-CLI Operations

> **Type**: Skill
> **Domain**: WordPress Development
> **Source**: Automattic/agent-skills wp-wpcli-and-ops

<skill>
<summary>
Best practices for using WP-CLI for WordPress administration, migrations, and debugging.
</summary>

<knowledge>
## Safety First

**Before Write Operations:**
1. Confirm execution environment (development/staging/production)
2. Back up database for risky changes
3. Use dry-run when available
4. Test on non-production first

**Three-Step Migration:**
1. Export database backup
2. Perform dry-run test
3. Execute actual operation

## Common Commands

**Site Information:**
```bash
# Check WordPress version
wp core version

# Check plugin status
wp plugin list

# Check theme status
wp theme list

# Site health check
wp doctor check
```

**Database Operations:**
```bash
# Export database
wp db export backup.sql

# Import database
wp db import backup.sql

# Search and replace
wp search-replace 'old-domain.com' 'new-domain.com' --dry-run
wp search-replace 'old-domain.com' 'new-domain.com'

# Run SQL query
wp db query "SELECT option_name, option_value FROM wp_options WHERE autoload='yes'"
```

**Plugin Management:**
```bash
# Install and activate
wp plugin install plugin-name --activate

# Deactivate
wp plugin deactivate plugin-name

# Update all
wp plugin update --all
```

**User Management:**
```bash
# Create user
wp user create username email@example.com --role=administrator

# Reset password
wp user update username --user_pass=newpassword

# List users
wp user list
```

## Multisite Operations

**Critical Decision:**
Always decide whether operating on:
- Single site: `--url=https://site.example.com`
- Network-wide: `--network`

```bash
# List sites
wp site list

# Run on specific site
wp plugin list --url=https://subsite.example.com

# Run across network
wp plugin update --all --network
```

## Performance Profiling

**WP Doctor:**
```bash
# Run all checks
wp doctor check

# Check specific issue
wp doctor check autoload-options-size
```

**WP Profile:**
```bash
# Profile page load stages
wp profile stage --url=https://example.com/

# Profile specific hooks
wp profile hook --all --url=https://example.com/

# Profile specific hook
wp profile hook init --url=https://example.com/
```

## Configuration Files

**wp-cli.yml:**
```yaml
# Local configuration
path: /var/www/html
url: https://example.com
user: admin

# Subcommand defaults
plugin update:
  all: true
```

**wp-cli.local.yml:**
```yaml
# Local overrides (gitignored)
path: /Users/me/sites/project
url: https://project.test
```

## Cron Management

```bash
# List scheduled events
wp cron event list

# Run specific event
wp cron event run my_scheduled_event

# Delete event
wp cron event delete my_scheduled_event
```
</knowledge>

<best_practices>
- Always confirm environment before write operations
- Back up before risky changes
- Use --dry-run when available
- For multisite, explicitly specify --url= or --network
- Use wp-cli.yml for project-specific settings
</best_practices>

<references>
- [Automattic/agent-skills wp-wpcli-and-ops](https://github.com/Automattic/agent-skills/tree/trunk/skills/wp-wpcli-and-ops)
- [WP-CLI Commands](https://developer.wordpress.org/cli/commands/)
</references>
</skill>
