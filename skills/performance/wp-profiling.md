# WordPress Performance Profiling

> **Type**: Skill
> **Domain**: Performance
> **Source**: Automattic/agent-skills wp-performance

<skill>
<summary>
Profiling WordPress performance using WP-CLI and identifying bottlenecks.
</summary>

<knowledge>
## Profiling Approach

**Measure First:**
1. Establish baseline measurements
2. Identify the dominant bottleneck
3. Target specific optimization
4. Re-measure to verify improvement

**Don't Optimize Blindly:**
- Always measure before making changes
- Focus on the biggest problem first
- Verify improvements with data

## WP Doctor

**Run All Checks:**
```bash
wp doctor check
```

**Common Issues Detected:**
- Autoload bloat
- Debug flags left enabled
- Plugin overload
- Object cache status
- Cron issues

**Specific Checks:**
```bash
# Check autoload size
wp doctor check autoload-options-size

# Check cron status
wp doctor check cron-count
```

## WP Profile

**Profile Page Load Stages:**
```bash
wp profile stage --url=https://example.com/
```

**Sample Output:**
```
+------------+----------------+-------------+
| stage      | time           | cache_ratio |
+------------+----------------+-------------+
| bootstrap  | 0.2843s        | 91.1%       |
| main_query | 0.0124s        | 100%        |
| template   | 0.4521s        | 85.3%       |
+------------+----------------+-------------+
| total      | 0.7488s        | 89.2%       |
+------------+----------------+-------------+
```

**Profile Specific Hooks:**
```bash
# All hooks
wp profile hook --all --url=https://example.com/

# Specific hook
wp profile hook init --url=https://example.com/

# With ordering
wp profile hook --all --orderby=time --order=desc --url=https://example.com/
```

## Common Bottlenecks

**Database Queries:**
```bash
# Count queries
wp db query "SELECT COUNT(*) FROM wp_options WHERE autoload='yes'"

# List large autoloaded options
wp db query "SELECT option_name, LENGTH(option_value) as size
             FROM wp_options
             WHERE autoload='yes'
             ORDER BY size DESC
             LIMIT 20"
```

**Autoloaded Options:**
```bash
# Total autoload size
wp db query "SELECT SUM(LENGTH(option_value)) as total_size
             FROM wp_options
             WHERE autoload='yes'"

# Find bloated options
wp option list --autoload=on --format=table --fields=option_name,size_bytes
```

**Object Cache:**
```bash
# Check if object cache is active
wp cache type

# Cache stats (if available)
wp cache get wp_object_cache_stats
```

**Cron Tasks:**
```bash
# List scheduled events
wp cron event list

# Check for overdue events
wp cron event list --format=table

# Run specific event manually
wp cron event run my_event_hook
```

## Baseline Measurements

**HTTP Timing:**
```bash
# Measure TTFB
curl -o /dev/null -s -w "TTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" https://example.com/

# Multiple runs for average
for i in {1..5}; do
    curl -o /dev/null -s -w "%{time_starttransfer}\n" https://example.com/
done
```

**WordPress Timing:**
```php
// Add to wp-config.php temporarily
define( 'SAVEQUERIES', true );

// Then check query log
global $wpdb;
error_log( print_r( $wpdb->queries, true ) );
```

## Query Monitor

**Key Panels:**
- Queries: SQL queries with time
- Hooks: Action/filter execution
- HTTP API: External requests
- Transients: Cached data status
- Environment: PHP/WP configuration

**REST API Headers:**
For headless debugging, Query Monitor adds headers:
```
X-QM-Overview-Time: 0.1234
X-QM-Overview-Memory: 12345678
```
</knowledge>

<best_practices>
- Establish baseline before changes
- Focus on dominant bottleneck
- Re-measure after each change
- Use production-like data for testing
- Monitor performance over time
</best_practices>

<references>
- [Automattic/agent-skills wp-performance](https://github.com/Automattic/agent-skills/tree/trunk/skills/wp-performance)
- [WP-CLI Profile](https://developer.wordpress.org/cli/commands/profile/)
- [Query Monitor](https://querymonitor.com/)
</references>
</skill>
