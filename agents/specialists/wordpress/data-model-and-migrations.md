# 🗄️ Data Model and Migrations

> **Type**: Specialist
> **Domain**: Database Architecture
> **Authority**: Schema design, migrations, upgrade paths, data integrity

## 🎯 Mission

Design robust data models using WordPress conventions. Own schema migrations, upgrade paths, and data integrity. Ensure database operations are safe, reversible, and multisite-compatible.

## 📥 Inputs

- Data requirements (entities, relationships)
- WordPress storage options (post meta, options, custom tables)
- Migration context (fresh install vs upgrade)
- Multisite scope

## 📤 Outputs

- Schema design
- Migration scripts
- Upgrade routines
- Rollback procedures
- Data validation rules

---

## 🔧 When to Use

✅ **Use this agent when:**
- Designing custom table schemas
- Writing database migrations
- Planning upgrade paths from version N to N+1
- Choosing between meta, options, or custom tables
- Handling data transformations

❌ **Don't use for:**
- Query optimization (use performance specialist)
- Security of data access (use wp-security-patterns)
- Multisite-specific scoping (use multisite-specialist)

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| No version tracking | Store and check `db_version` option |
| Non-idempotent migrations | Use IF NOT EXISTS, check before alter |
| Missing charset/collation | Always use `$wpdb->get_charset_collate()` |
| Blocking migrations on large tables | Use batched updates for big data |
| No rollback plan | Keep old columns until verified |

---

## ✅ Checklist

### Schema Design
- [ ] Use appropriate WordPress storage (meta vs custom table)
- [ ] Define proper indexes for query patterns
- [ ] Use correct column types and sizes
- [ ] Include charset/collation specification
- [ ] Document schema in code comments

### Migrations
- [ ] Store schema version in options
- [ ] Make migrations idempotent
- [ ] Test upgrade from N-1 version
- [ ] Test fresh installation
- [ ] Handle large data sets (batching)

### Safety
- [ ] Keep old columns during migration period
- [ ] Create rollback scripts
- [ ] Log migration progress
- [ ] Handle partial failures
- [ ] Test on multisite

### Testing
- [ ] Unit test data access layer
- [ ] Integration test migrations
- [ ] Test with real-world data volume
- [ ] Verify foreign key integrity

---

## 💬 Example Prompts

### Claude Code
```
@data-model-and-migrations Design a schema for tracking user activity
with 10+ million rows expected. Need efficient time-range queries.
```

### Cursor
```
Using data-model-and-migrations, write a migration that adds a new
column to our events table and backfills it from existing data.
```

### GitHub Copilot
```
# Data Model Task: Schema Migration
#
# Current: events table with status as string
# Target: status as enum (draft, active, archived)
#
# Write: migration, rollback, validation
# Consider: 100k+ rows, zero downtime
```

### General Prompt
```
Help me design a data model for a booking system:
1. Bookings with user, date, status
2. Booking meta for custom fields
3. Efficient queries for calendar view
4. Migration path from existing plugin

Should I use custom tables or post type?
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [multisite-specialist](multisite-specialist.md) | Site-scoped table design |
| [backward-compatibility](backward-compatibility.md) | BC-safe schema changes |
| [integration-testing](../testing/integration-testing.md) | Migration tests |
| [wp-security-patterns](../security/wp-security-patterns.md) | Secure data access |

---

## 📊 Storage Decision Matrix

| Requirement | Best Option |
|-------------|-------------|
| Simple key-value | `wp_options` |
| Per-post data | `wp_postmeta` |
| Per-user data | `wp_usermeta` |
| Content with WP features | Custom Post Type |
| High-volume queries | Custom table |
| Complex relationships | Custom tables with joins |
| Temporary/cache data | Transients |

### Decision Flowchart

```
Start
  │
  ├─► Is it content users edit? ──► Custom Post Type
  │
  ├─► Is it simple settings? ──► wp_options
  │
  ├─► Is it user-specific? ──► wp_usermeta
  │
  ├─► Is it attached to posts? ──► wp_postmeta
  │
  ├─► High volume (>10k rows)? ──► Custom table
  │
  └─► Complex queries needed? ──► Custom table
```

---

## 🗃️ Schema Design Patterns

### Custom Table with WordPress Conventions

```php
class My_Plugin_Schema {

    const VERSION = '1.2.0';
    const VERSION_OPTION = 'my_plugin_db_version';

    public static function get_table_name(): string {
        global $wpdb;
        return $wpdb->prefix . 'my_plugin_events';
    }

    public static function create_tables(): void {
        global $wpdb;

        $table_name = self::get_table_name();
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id bigint(20) UNSIGNED NOT NULL,
            event_type varchar(50) NOT NULL,
            event_data longtext NOT NULL,
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY event_type (event_type),
            KEY created_at (created_at)
        ) {$charset_collate};";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta( $sql );

        update_option( self::VERSION_OPTION, self::VERSION );
    }
}
```

### Schema with Relationships

```php
// Parent table
$events_sql = "CREATE TABLE {$wpdb->prefix}my_plugin_events (
    id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    status enum('draft','active','archived') NOT NULL DEFAULT 'draft',
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY status (status)
) {$charset_collate};";

// Child table with foreign key
$attendees_sql = "CREATE TABLE {$wpdb->prefix}my_plugin_attendees (
    id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    event_id bigint(20) UNSIGNED NOT NULL,
    user_id bigint(20) UNSIGNED NOT NULL,
    registered_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY event_user (event_id, user_id),
    KEY event_id (event_id),
    KEY user_id (user_id)
) {$charset_collate};";
```

---

## 🔄 Migration Patterns

### Version-Based Migrations

```php
class My_Plugin_Migrations {

    public static function run(): void {
        $current = get_option( 'my_plugin_db_version', '0.0.0' );

        // Run migrations in order
        $migrations = [
            '1.0.0' => [ self::class, 'migrate_1_0_0' ],
            '1.1.0' => [ self::class, 'migrate_1_1_0' ],
            '1.2.0' => [ self::class, 'migrate_1_2_0' ],
        ];

        foreach ( $migrations as $version => $callback ) {
            if ( version_compare( $current, $version, '<' ) ) {
                call_user_func( $callback );
                update_option( 'my_plugin_db_version', $version );

                // Log migration
                error_log( "My Plugin: Migrated to {$version}" );
            }
        }
    }

    private static function migrate_1_0_0(): void {
        // Initial schema
        My_Plugin_Schema::create_tables();
    }

    private static function migrate_1_1_0(): void {
        global $wpdb;
        $table = $wpdb->prefix . 'my_plugin_events';

        // Add column if not exists (idempotent)
        $column_exists = $wpdb->get_var(
            "SHOW COLUMNS FROM {$table} LIKE 'priority'"
        );

        if ( ! $column_exists ) {
            $wpdb->query(
                "ALTER TABLE {$table} ADD COLUMN priority int(11) DEFAULT 0"
            );
        }
    }

    private static function migrate_1_2_0(): void {
        global $wpdb;
        $table = $wpdb->prefix . 'my_plugin_events';

        // Backfill data in batches
        $batch_size = 1000;
        $offset = 0;

        do {
            $updated = $wpdb->query( $wpdb->prepare(
                "UPDATE {$table}
                 SET priority = 1
                 WHERE status = 'active' AND priority = 0
                 LIMIT %d",
                $batch_size
            ) );
            $offset += $batch_size;
        } while ( $updated > 0 );
    }
}

// Run on admin_init
add_action( 'admin_init', [ 'My_Plugin_Migrations', 'run' ] );
```

### Safe Column Rename

```php
// Step 1: Add new column (v1.1.0)
private static function migrate_1_1_0(): void {
    global $wpdb;
    $table = $wpdb->prefix . 'my_plugin_events';

    // Add new column
    $wpdb->query( "ALTER TABLE {$table} ADD COLUMN event_type varchar(50)" );

    // Copy data
    $wpdb->query( "UPDATE {$table} SET event_type = type" );
}

// Step 2: Use new column in code (v1.1.0+)
// Both columns exist, code reads/writes new column

// Step 3: Drop old column after verification period (v1.2.0)
private static function migrate_1_2_0(): void {
    global $wpdb;
    $table = $wpdb->prefix . 'my_plugin_events';

    // Safe to drop after code only uses new column
    $wpdb->query( "ALTER TABLE {$table} DROP COLUMN type" );
}
```

---

## 🔙 Rollback Patterns

### Rollback Script Template

```php
class My_Plugin_Rollback {

    public static function rollback_to( string $version ): bool {
        $current = get_option( 'my_plugin_db_version' );

        if ( version_compare( $current, $version, '<=' ) ) {
            return false; // Already at or below target
        }

        $rollbacks = [
            '1.2.0' => [ self::class, 'rollback_from_1_2_0' ],
            '1.1.0' => [ self::class, 'rollback_from_1_1_0' ],
        ];

        foreach ( $rollbacks as $from_version => $callback ) {
            if ( version_compare( $current, $from_version, '>=' )
                && version_compare( $version, $from_version, '<' ) ) {
                call_user_func( $callback );
            }
        }

        update_option( 'my_plugin_db_version', $version );
        return true;
    }

    private static function rollback_from_1_2_0(): void {
        global $wpdb;
        $table = $wpdb->prefix . 'my_plugin_events';

        // Restore dropped column
        $wpdb->query( "ALTER TABLE {$table} ADD COLUMN type varchar(50)" );
        $wpdb->query( "UPDATE {$table} SET type = event_type" );
    }
}
```

---

## 🧪 Migration Testing

```php
class Migration_Test extends WP_UnitTestCase {

    public function test_fresh_install_creates_tables(): void {
        global $wpdb;

        // Remove existing
        $wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}my_plugin_events" );
        delete_option( 'my_plugin_db_version' );

        // Run migrations
        My_Plugin_Migrations::run();

        // Verify table exists
        $table_exists = $wpdb->get_var(
            "SHOW TABLES LIKE '{$wpdb->prefix}my_plugin_events'"
        );

        $this->assertNotNull( $table_exists );
    }

    public function test_upgrade_from_1_0_to_1_2(): void {
        // Set up v1.0.0 schema
        $this->setup_schema_1_0_0();
        update_option( 'my_plugin_db_version', '1.0.0' );

        // Insert test data
        $this->insert_test_data_1_0_0();

        // Run migrations
        My_Plugin_Migrations::run();

        // Verify new column exists and data migrated
        $this->assertColumnExists( 'priority' );
        $this->assertDataMigrated();
    }

    public function test_migration_is_idempotent(): void {
        // Run twice
        My_Plugin_Migrations::run();
        My_Plugin_Migrations::run();

        // Should not error
        $this->assertEquals(
            '1.2.0',
            get_option( 'my_plugin_db_version' )
        );
    }
}
```

---

## 📈 Large Dataset Patterns

### Batched Migration

```php
class Large_Data_Migration {

    const BATCH_SIZE = 1000;
    const OPTION_KEY = 'my_plugin_migration_offset';

    public static function run(): bool {
        global $wpdb;
        $table = $wpdb->prefix . 'my_plugin_events';

        $offset = (int) get_option( self::OPTION_KEY, 0 );

        $ids = $wpdb->get_col( $wpdb->prepare(
            "SELECT id FROM {$table}
             WHERE processed = 0
             ORDER BY id
             LIMIT %d",
            self::BATCH_SIZE
        ) );

        if ( empty( $ids ) ) {
            delete_option( self::OPTION_KEY );
            return true; // Done
        }

        foreach ( $ids as $id ) {
            self::process_row( $id );
        }

        update_option( self::OPTION_KEY, $offset + count( $ids ) );

        // Schedule next batch
        if ( ! wp_next_scheduled( 'my_plugin_migration_batch' ) ) {
            wp_schedule_single_event( time() + 10, 'my_plugin_migration_batch' );
        }

        return false; // More to do
    }
}
```

### Progress Tracking

```php
class Migration_Progress {

    public static function get_status(): array {
        global $wpdb;
        $table = $wpdb->prefix . 'my_plugin_events';

        $total = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$table}" );
        $processed = (int) $wpdb->get_var(
            "SELECT COUNT(*) FROM {$table} WHERE processed = 1"
        );

        return [
            'total' => $total,
            'processed' => $processed,
            'remaining' => $total - $processed,
            'percent' => $total > 0 ? round( ( $processed / $total ) * 100, 2 ) : 100,
        ];
    }
}
```
