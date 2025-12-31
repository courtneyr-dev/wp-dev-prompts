# Database Migration Testing

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Testing database schema changes and data migrations in WordPress

<skill>
<summary>
Strategies for testing database migrations, schema updates, and data transformations in WordPress plugins.
</summary>

<knowledge>
## Migration Scenarios

### Common Migration Types

1. **Schema changes** - Add/modify tables, columns, indexes
2. **Data transformations** - Convert data formats, merge fields
3. **Option migrations** - Move from single option to structured data
4. **Meta migrations** - Change meta key names, structures
5. **Version upgrades** - N-1 to N version updates

## Version-Based Migration System

### Migration Manager

```php
<?php
/**
 * Database migration manager.
 */
class My_Plugin_Migrations {

    private const VERSION_OPTION = 'my_plugin_db_version';
    private const CURRENT_VERSION = '2.0.0';

    /**
     * Run pending migrations.
     */
    public function run(): void {
        $installed_version = get_option( self::VERSION_OPTION, '0.0.0' );

        if ( version_compare( $installed_version, self::CURRENT_VERSION, '>=' ) ) {
            return;
        }

        $migrations = $this->get_migrations();

        foreach ( $migrations as $version => $callback ) {
            if ( version_compare( $installed_version, $version, '<' ) ) {
                $callback();
                update_option( self::VERSION_OPTION, $version );
            }
        }

        update_option( self::VERSION_OPTION, self::CURRENT_VERSION );
    }

    /**
     * Get ordered migrations.
     */
    private function get_migrations(): array {
        return [
            '1.0.0' => [ $this, 'migrate_1_0_0' ],
            '1.1.0' => [ $this, 'migrate_1_1_0' ],
            '1.2.0' => [ $this, 'migrate_1_2_0' ],
            '2.0.0' => [ $this, 'migrate_2_0_0' ],
        ];
    }

    private function migrate_1_0_0(): void {
        // Initial schema
        $this->create_tables();
    }

    private function migrate_1_1_0(): void {
        // Add column
        global $wpdb;
        $wpdb->query( "ALTER TABLE {$wpdb->prefix}my_table ADD COLUMN status VARCHAR(20) DEFAULT 'active'" );
    }

    private function migrate_1_2_0(): void {
        // Add index
        global $wpdb;
        $wpdb->query( "CREATE INDEX idx_status ON {$wpdb->prefix}my_table (status)" );
    }

    private function migrate_2_0_0(): void {
        // Data transformation
        $this->transform_legacy_options();
    }

    private function create_tables(): void {
        global $wpdb;
        $charset = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$wpdb->prefix}my_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            user_id bigint(20) unsigned NOT NULL,
            data longtext NOT NULL,
            created_at datetime NOT NULL,
            PRIMARY KEY  (id),
            KEY user_id (user_id)
        ) $charset;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta( $sql );
    }

    private function transform_legacy_options(): void {
        // Move from single option to structured
        $legacy = get_option( 'my_plugin_settings' );

        if ( $legacy && is_string( $legacy ) ) {
            $new_format = [
                'value'   => $legacy,
                'version' => '2.0.0',
            ];
            update_option( 'my_plugin_settings', $new_format );
        }
    }
}
```

## PHPUnit Migration Tests

### Testing Upgrades

```php
<?php
/**
 * Tests for database migrations.
 */
class Migration_Test extends WP_UnitTestCase {

    /**
     * Test fresh install creates correct schema.
     */
    public function test_fresh_install_creates_tables() {
        global $wpdb;

        // Clear any existing
        $wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}my_table" );
        delete_option( 'my_plugin_db_version' );

        // Run migrations
        $migrations = new My_Plugin_Migrations();
        $migrations->run();

        // Verify table exists
        $table_exists = $wpdb->get_var(
            $wpdb->prepare(
                "SHOW TABLES LIKE %s",
                $wpdb->prefix . 'my_table'
            )
        );

        $this->assertNotNull( $table_exists );

        // Verify columns
        $columns = $wpdb->get_col( "DESCRIBE {$wpdb->prefix}my_table" );

        $this->assertContains( 'id', $columns );
        $this->assertContains( 'user_id', $columns );
        $this->assertContains( 'data', $columns );
        $this->assertContains( 'status', $columns );  // Added in 1.1.0
        $this->assertContains( 'created_at', $columns );
    }

    /**
     * Test upgrade from 1.0.0 adds status column.
     */
    public function test_upgrade_1_0_to_1_1_adds_column() {
        global $wpdb;

        // Simulate 1.0.0 state
        $wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}my_table" );
        $wpdb->query( "CREATE TABLE {$wpdb->prefix}my_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            user_id bigint(20) unsigned NOT NULL,
            data longtext NOT NULL,
            created_at datetime NOT NULL,
            PRIMARY KEY  (id)
        ) " . $wpdb->get_charset_collate() );

        update_option( 'my_plugin_db_version', '1.0.0' );

        // Run migrations
        $migrations = new My_Plugin_Migrations();
        $migrations->run();

        // Verify column added
        $columns = $wpdb->get_col( "DESCRIBE {$wpdb->prefix}my_table" );
        $this->assertContains( 'status', $columns );

        // Verify version updated
        $this->assertEquals( '2.0.0', get_option( 'my_plugin_db_version' ) );
    }

    /**
     * Test data transformation preserves existing data.
     */
    public function test_upgrade_preserves_existing_data() {
        global $wpdb;

        // Set up table with data
        $this->set_up_version_1_0_schema();

        // Insert test data
        $wpdb->insert(
            $wpdb->prefix . 'my_table',
            [
                'user_id'    => 1,
                'data'       => 'test data',
                'created_at' => current_time( 'mysql' ),
            ]
        );
        $original_id = $wpdb->insert_id;

        update_option( 'my_plugin_db_version', '1.0.0' );

        // Run migrations
        $migrations = new My_Plugin_Migrations();
        $migrations->run();

        // Verify data preserved
        $row = $wpdb->get_row( $wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}my_table WHERE id = %d",
            $original_id
        ) );

        $this->assertEquals( 'test data', $row->data );
        $this->assertEquals( 'active', $row->status );  // Default value
    }

    /**
     * Test option format migration.
     */
    public function test_legacy_option_format_migration() {
        // Set legacy format (string)
        update_option( 'my_plugin_settings', 'legacy_value' );
        update_option( 'my_plugin_db_version', '1.2.0' );

        // Run migrations
        $migrations = new My_Plugin_Migrations();
        $migrations->run();

        // Verify new format
        $settings = get_option( 'my_plugin_settings' );

        $this->assertIsArray( $settings );
        $this->assertEquals( 'legacy_value', $settings['value'] );
        $this->assertEquals( '2.0.0', $settings['version'] );
    }

    /**
     * Test migration is idempotent.
     */
    public function test_migration_is_idempotent() {
        // Run migrations twice
        $migrations = new My_Plugin_Migrations();
        $migrations->run();
        $migrations->run();

        // Should not throw errors
        $this->assertEquals( '2.0.0', get_option( 'my_plugin_db_version' ) );
    }

    /**
     * Test rollback capability.
     */
    public function test_rollback_restores_previous_state() {
        global $wpdb;

        // Run full migrations
        $migrations = new My_Plugin_Migrations();
        $migrations->run();

        // Simulate rollback to 1.0.0
        $wpdb->query( "ALTER TABLE {$wpdb->prefix}my_table DROP COLUMN status" );
        update_option( 'my_plugin_db_version', '1.0.0' );

        // Re-run should apply 1.1.0+
        $migrations->run();

        $columns = $wpdb->get_col( "DESCRIBE {$wpdb->prefix}my_table" );
        $this->assertContains( 'status', $columns );
    }

    /**
     * Test N-1 version upgrade.
     */
    public function test_n_minus_1_upgrade() {
        // Simulate one version behind
        update_option( 'my_plugin_db_version', '1.2.0' );

        $migrations = new My_Plugin_Migrations();
        $migrations->run();

        // Should only run 2.0.0 migration
        $this->assertEquals( '2.0.0', get_option( 'my_plugin_db_version' ) );
    }

    /**
     * Helper: Set up 1.0.0 schema.
     */
    private function set_up_version_1_0_schema(): void {
        global $wpdb;

        $wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}my_table" );
        $wpdb->query( "CREATE TABLE {$wpdb->prefix}my_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            user_id bigint(20) unsigned NOT NULL,
            data longtext NOT NULL,
            created_at datetime NOT NULL,
            PRIMARY KEY  (id)
        ) " . $wpdb->get_charset_collate() );
    }
}
```

### Testing Meta Migrations

```php
<?php
/**
 * Tests for post meta migrations.
 */
class Meta_Migration_Test extends WP_UnitTestCase {

    /**
     * Test meta key rename migration.
     */
    public function test_meta_key_rename() {
        // Create post with old meta key
        $post_id = $this->factory()->post->create();
        update_post_meta( $post_id, 'old_meta_key', 'test_value' );

        // Run migration
        my_plugin_migrate_meta_keys();

        // Old key should be gone
        $this->assertEmpty( get_post_meta( $post_id, 'old_meta_key', true ) );

        // New key should have value
        $this->assertEquals( 'test_value', get_post_meta( $post_id, 'new_meta_key', true ) );
    }

    /**
     * Test serialized meta transformation.
     */
    public function test_serialized_meta_transformation() {
        $post_id = $this->factory()->post->create();

        // Old format: simple array
        $old_format = [ 'key1' => 'value1', 'key2' => 'value2' ];
        update_post_meta( $post_id, 'my_meta', $old_format );

        // Run migration
        my_plugin_migrate_meta_format();

        // New format: nested structure
        $new_value = get_post_meta( $post_id, 'my_meta', true );

        $this->assertIsArray( $new_value );
        $this->assertArrayHasKey( 'data', $new_value );
        $this->assertEquals( 'value1', $new_value['data']['key1'] );
    }
}
```

## Multisite Migration Tests

```php
<?php
/**
 * Tests for multisite migrations.
 */
class Multisite_Migration_Test extends WP_UnitTestCase {

    /**
     * @group multisite
     */
    public function test_migration_runs_on_all_sites() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Create sites
        $site_ids = [];
        for ( $i = 0; $i < 3; $i++ ) {
            $site_ids[] = $this->factory()->blog->create();
        }

        // Set old version on each site
        foreach ( $site_ids as $site_id ) {
            switch_to_blog( $site_id );
            update_option( 'my_plugin_db_version', '1.0.0' );
            restore_current_blog();
        }

        // Run network-wide migration
        my_plugin_network_migrate();

        // Verify all sites updated
        foreach ( $site_ids as $site_id ) {
            switch_to_blog( $site_id );
            $this->assertEquals(
                '2.0.0',
                get_option( 'my_plugin_db_version' ),
                "Site {$site_id} not migrated"
            );
            restore_current_blog();
        }
    }

    /**
     * @group multisite
     */
    public function test_network_option_migration() {
        if ( ! is_multisite() ) {
            $this->markTestSkipped( 'Multisite only test.' );
        }

        // Set legacy network option
        update_site_option( 'my_plugin_network_legacy', 'old_value' );

        // Run migration
        my_plugin_migrate_network_options();

        // Verify transformation
        $new_value = get_site_option( 'my_plugin_network_settings' );
        $this->assertEquals( 'old_value', $new_value['migrated_from_legacy'] );
    }
}
```

## Integration Test Patterns

```php
<?php
/**
 * Integration tests for migrations.
 */
class Migration_Integration_Test extends WP_UnitTestCase {

    /**
     * Test full upgrade path from oldest to newest.
     */
    public function test_full_upgrade_path() {
        // Start at version 0 (fresh)
        delete_option( 'my_plugin_db_version' );

        // Run activation
        do_action( 'activate_my-plugin/my-plugin.php' );

        // Verify at current version
        $this->assertEquals( '2.0.0', get_option( 'my_plugin_db_version' ) );

        // Verify all features work
        $this->assertTrue( my_plugin_save_data( [ 'test' => 'data' ] ) );
        $this->assertNotEmpty( my_plugin_get_data() );
    }

    /**
     * Test upgrade doesn't break active functionality.
     */
    public function test_upgrade_with_active_data() {
        global $wpdb;

        // Set up with data
        $migrations = new My_Plugin_Migrations();
        $migrations->run();

        // Insert data
        for ( $i = 0; $i < 100; $i++ ) {
            $wpdb->insert(
                $wpdb->prefix . 'my_table',
                [
                    'user_id'    => wp_rand( 1, 10 ),
                    'data'       => wp_json_encode( [ 'item' => $i ] ),
                    'created_at' => current_time( 'mysql' ),
                ]
            );
        }

        $original_count = $wpdb->get_var(
            "SELECT COUNT(*) FROM {$wpdb->prefix}my_table"
        );

        // Simulate next version
        update_option( 'my_plugin_db_version', '1.2.0' );

        // Run upgrade
        $migrations->run();

        // Verify data preserved
        $new_count = $wpdb->get_var(
            "SELECT COUNT(*) FROM {$wpdb->prefix}my_table"
        );

        $this->assertEquals( $original_count, $new_count );
    }
}
```

## CI Configuration

```yaml
name: Migration Tests

on: [push, pull_request]

jobs:
  migration-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        from-version: ['1.0.0', '1.1.0', '1.2.0']
        to-version: ['2.0.0']

    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: Start WordPress
        run: npx wp-env start

      - name: Set up from-version state
        run: |
          npx wp-env run cli wp option update my_plugin_db_version ${{ matrix.from-version }}

      - name: Run migrations
        run: |
          npx wp-env run cli wp eval "do_action('activate_my-plugin/my-plugin.php');"

      - name: Verify migration
        run: |
          VERSION=$(npx wp-env run cli wp option get my_plugin_db_version)
          [ "$VERSION" = "${{ matrix.to-version }}" ]

      - name: Run migration tests
        run: ./vendor/bin/phpunit --group migration
```
</knowledge>

<best_practices>
- Use version-based migration system
- Make migrations idempotent
- Test upgrade from every supported version
- Preserve existing data during migrations
- Support multisite migrations
- Test rollback scenarios
</best_practices>

<commands>
```bash
# Run migration tests
./vendor/bin/phpunit --group migration

# Simulate upgrade
wp option update my_plugin_db_version 1.0.0
wp eval "do_action('plugins_loaded');"

# Check current version
wp option get my_plugin_db_version

# Run specific migration manually
wp eval "(new My_Plugin_Migrations())->run();"
```
</commands>
</skill>
