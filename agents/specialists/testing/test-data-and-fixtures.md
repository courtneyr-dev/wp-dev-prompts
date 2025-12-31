# 🏭 Test Data and Fixtures

> **Type**: Specialist
> **Domain**: Test Data
> **Authority**: Factories, fixtures, seeders, test data patterns

## 🎯 Mission

Create and manage test data through factories, fixtures, and seeders. Own deterministic data generation, realistic test scenarios, and data isolation patterns across all test types.

## 📥 Inputs

- Entity types to create
- Relationship requirements
- Volume requirements
- Determinism needs

## 📤 Outputs

- Factory classes
- Fixture files
- Seeder scripts
- Data builders

---

## 🔧 When to Use

✅ **Use this agent when:**
- Creating test data factories
- Setting up database seeds
- Building complex entity relationships
- Generating realistic test data
- Ensuring deterministic test data

❌ **Don't use for:**
- Writing test assertions
- Test organization
- CI configuration
- Mocking external services

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Non-deterministic data | Seed random generators |
| Slow fixture loading | Lazy loading, caching |
| Data coupling between tests | Isolate test data per test |
| Missing relationships | Factory traits for variants |
| Hardcoded IDs | Use factories, not raw inserts |

---

## ✅ Checklist

### Factory Design
- [ ] One factory per entity type
- [ ] Sensible defaults
- [ ] Override any attribute
- [ ] Relationship creation included

### Determinism
- [ ] Seeded random values
- [ ] Fixed timestamps available
- [ ] Reproducible sequences
- [ ] No external data fetching

### Performance
- [ ] Minimal data creation
- [ ] Lazy relationship loading
- [ ] Batch creation available
- [ ] Factory caching where safe

### Maintainability
- [ ] Documented factory usage
- [ ] Consistent naming
- [ ] Trait-based variations
- [ ] Centralized fixture location

---

## 💬 Example Prompts

### Claude Code
```
@test-data-and-fixtures Create factories for our e-commerce entities:
Product, Order, LineItem, Customer. Include relationships and
realistic default data.
```

### Cursor
```
Using test-data-and-fixtures, create a seeder that sets up a
WordPress site with: 100 posts, 5 categories, 10 users with
different roles, and sample comments.
```

### GitHub Copilot
```
# Test Data Task: Complex Fixture
#
# Create fixture for testing multisite:
# - 3 sites in network
# - Each with 10 posts
# - Shared users across sites
# - Network-wide settings
#
# Must be deterministic and fast to load
```

### General Prompt
```
Set up test data infrastructure for our booking plugin:
1. Factories for: Booking, TimeSlot, Service, Customer
2. Traits for: past bookings, cancelled, with conflicts
3. E2E seeds for full calendar scenarios
4. Performance: create 1000 bookings quickly
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [test-architecture](../../orchestrators/test-architecture.md) | Data patterns |
| [integration-testing](integration-testing.md) | Factory usage |
| [e2e-playwright](e2e-playwright.md) | E2E seeders |
| [regression-suite-curator](regression-suite-curator.md) | Fixture organization |

---

## 📋 Factory Patterns

### Basic WordPress Factory

```php
<?php

namespace MyPlugin\Tests\Factories;

use WP_UnitTest_Factory;

class ProductFactory {

    private WP_UnitTest_Factory $factory;

    public function __construct( WP_UnitTest_Factory $factory ) {
        $this->factory = $factory;
    }

    /**
     * Create a product with default values.
     */
    public function create( array $args = [] ): int {
        $defaults = [
            'post_type' => 'product',
            'post_title' => 'Test Product',
            'post_status' => 'publish',
            'post_content' => 'Product description.',
        ];

        $post_id = $this->factory->post->create( array_merge( $defaults, $args ) );

        // Default meta
        $meta_defaults = [
            '_price' => '29.99',
            '_sku' => 'PROD-' . $post_id,
            '_stock' => '100',
            '_stock_status' => 'instock',
        ];

        $meta = array_merge( $meta_defaults, $args['meta'] ?? [] );

        foreach ( $meta as $key => $value ) {
            update_post_meta( $post_id, $key, $value );
        }

        return $post_id;
    }

    /**
     * Create multiple products.
     */
    public function create_many( int $count, array $args = [] ): array {
        $ids = [];
        for ( $i = 0; $i < $count; $i++ ) {
            $ids[] = $this->create( $args );
        }
        return $ids;
    }

    /**
     * Create a product that is out of stock.
     */
    public function create_out_of_stock( array $args = [] ): int {
        return $this->create( array_merge( $args, [
            'meta' => [
                '_stock' => '0',
                '_stock_status' => 'outofstock',
            ],
        ] ) );
    }

    /**
     * Create a product on sale.
     */
    public function create_on_sale( array $args = [] ): int {
        return $this->create( array_merge( $args, [
            'meta' => [
                '_regular_price' => '49.99',
                '_sale_price' => '29.99',
                '_price' => '29.99',
            ],
        ] ) );
    }
}
```

### Factory Registration

```php
// tests/bootstrap.php
class TestFactory extends WP_UnitTest_Factory {

    public ProductFactory $product;
    public OrderFactory $order;
    public CustomerFactory $customer;

    public function __construct() {
        parent::__construct();

        $this->product = new ProductFactory( $this );
        $this->order = new OrderFactory( $this );
        $this->customer = new CustomerFactory( $this );
    }
}

// In test
class OrderTest extends WP_UnitTestCase {

    protected TestFactory $factory;

    public function test_order_total(): void {
        $product = $this->factory->product->create( [
            'meta' => [ '_price' => '50.00' ],
        ] );

        $order = $this->factory->order->create( [
            'items' => [
                [ 'product_id' => $product, 'quantity' => 2 ],
            ],
        ] );

        $this->assertEquals( 100.00, get_order_total( $order ) );
    }
}
```

---

## 🔧 Deterministic Data

### Seeded Random

```php
class DeterministicFactory {

    private int $seed;
    private int $counter = 0;

    public function __construct( int $seed = 12345 ) {
        $this->seed = $seed;
        mt_srand( $this->seed );
    }

    public function reset(): void {
        $this->counter = 0;
        mt_srand( $this->seed );
    }

    public function name(): string {
        $names = [ 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve' ];
        return $names[ mt_rand( 0, count( $names ) - 1 ) ];
    }

    public function email(): string {
        return 'user' . ( ++$this->counter ) . '@example.com';
    }

    public function price(): float {
        return round( mt_rand( 100, 10000 ) / 100, 2 );
    }

    public function date( string $start, string $end ): string {
        $start_ts = strtotime( $start );
        $end_ts = strtotime( $end );
        $random_ts = mt_rand( $start_ts, $end_ts );
        return date( 'Y-m-d H:i:s', $random_ts );
    }
}

// Usage
$fake = new DeterministicFactory( 42 );
$email1 = $fake->email(); // Always: user1@example.com
$email2 = $fake->email(); // Always: user2@example.com

$fake->reset();
$email1_again = $fake->email(); // Same: user1@example.com
```

### Fixed Timestamps

```php
class TimeFreezer {

    private static ?string $frozen_time = null;

    public static function freeze( string $time = '2024-01-15 12:00:00' ): void {
        self::$frozen_time = $time;

        add_filter( 'pre_option_gmt_offset', fn() => 0 );

        // Override current_time
        add_filter( 'pre_transient_doing_cron', function() use ( $time ) {
            return strtotime( $time );
        } );
    }

    public static function unfreeze(): void {
        self::$frozen_time = null;
        remove_all_filters( 'pre_option_gmt_offset' );
    }

    public static function now(): string {
        return self::$frozen_time ?? current_time( 'mysql' );
    }
}

// In test
public function set_up(): void {
    parent::set_up();
    TimeFreezer::freeze( '2024-06-15 10:00:00' );
}

public function tear_down(): void {
    TimeFreezer::unfreeze();
    parent::tear_down();
}
```

---

## 🌱 E2E Seeders

### WP-CLI Seeder

```php
// wp-cli/seed-command.php
WP_CLI::add_command( 'my-plugin seed', function( $args, $assoc_args ) {
    $scenario = $assoc_args['scenario'] ?? 'default';

    switch ( $scenario ) {
        case 'e-commerce':
            seed_ecommerce_data();
            break;
        case 'multisite':
            seed_multisite_data();
            break;
        default:
            seed_default_data();
    }

    WP_CLI::success( "Seeded {$scenario} data" );
} );

function seed_ecommerce_data(): void {
    // Create categories
    $categories = [];
    foreach ( [ 'Electronics', 'Clothing', 'Books' ] as $name ) {
        $categories[] = wp_insert_term( $name, 'product_cat' );
    }

    // Create products
    for ( $i = 1; $i <= 50; $i++ ) {
        $post_id = wp_insert_post( [
            'post_type' => 'product',
            'post_title' => "Product {$i}",
            'post_status' => 'publish',
        ] );

        update_post_meta( $post_id, '_price', rand( 10, 200 ) . '.00' );

        wp_set_object_terms( $post_id, $categories[ $i % 3 ]['term_id'], 'product_cat' );
    }

    // Create test users
    wp_create_user( 'customer', 'password', 'customer@example.com' );
    $admin = wp_create_user( 'storeadmin', 'password', 'admin@example.com' );
    $user = get_user_by( 'id', $admin );
    $user->set_role( 'administrator' );
}
```

### TypeScript Seeder for Playwright

```typescript
// tests/e2e/fixtures/seeder.ts
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class WordPressSeeder {
    private baseCommand = 'npx wp-env run cli';

    async reset(): Promise<void> {
        await execAsync(`${this.baseCommand} wp db reset --yes`);
        await execAsync(`${this.baseCommand} wp core install --url=http://localhost:8888 --title=Test --admin_user=admin --admin_password=password --admin_email=admin@example.com`);
    }

    async seedScenario(scenario: string): Promise<void> {
        await execAsync(`${this.baseCommand} wp my-plugin seed --scenario=${scenario}`);
    }

    async createUser(login: string, role: string): Promise<void> {
        await execAsync(`${this.baseCommand} wp user create ${login} ${login}@example.com --role=${role} --user_pass=password`);
    }

    async createPost(title: string, status: string = 'publish'): Promise<number> {
        const { stdout } = await execAsync(`${this.baseCommand} wp post create --post_title="${title}" --post_status=${status} --porcelain`);
        return parseInt(stdout.trim(), 10);
    }
}

// Usage in tests
import { test } from '@playwright/test';
import { WordPressSeeder } from './fixtures/seeder';

const seeder = new WordPressSeeder();

test.beforeAll(async () => {
    await seeder.reset();
    await seeder.seedScenario('e-commerce');
});
```

---

## 📁 Fixture Files

### JSON Fixtures

```json
// tests/fixtures/products.json
{
    "products": [
        {
            "title": "Wireless Headphones",
            "sku": "WH-001",
            "price": 79.99,
            "category": "electronics",
            "stock": 50
        },
        {
            "title": "Running Shoes",
            "sku": "RS-001",
            "price": 119.99,
            "category": "clothing",
            "stock": 25
        }
    ]
}
```

### Loading Fixtures

```php
class FixtureLoader {

    public static function load( string $fixture ): array {
        $path = __DIR__ . "/fixtures/{$fixture}.json";

        if ( ! file_exists( $path ) ) {
            throw new InvalidArgumentException( "Fixture not found: {$fixture}" );
        }

        return json_decode( file_get_contents( $path ), true );
    }

    public static function loadProducts(): array {
        $data = self::load( 'products' );
        $ids = [];

        foreach ( $data['products'] as $product ) {
            $ids[] = self::createProduct( $product );
        }

        return $ids;
    }

    private static function createProduct( array $data ): int {
        $post_id = wp_insert_post( [
            'post_type' => 'product',
            'post_title' => $data['title'],
            'post_status' => 'publish',
        ] );

        update_post_meta( $post_id, '_sku', $data['sku'] );
        update_post_meta( $post_id, '_price', $data['price'] );
        update_post_meta( $post_id, '_stock', $data['stock'] );

        return $post_id;
    }
}
```

---

## ⚡ Performance Optimization

### Batch Creation

```php
class BulkProductFactory {

    public function create_many( int $count ): array {
        global $wpdb;

        $ids = [];

        // Disable hooks for speed
        remove_all_actions( 'save_post' );

        // Start transaction
        $wpdb->query( 'START TRANSACTION' );

        try {
            for ( $i = 0; $i < $count; $i++ ) {
                $ids[] = wp_insert_post( [
                    'post_type' => 'product',
                    'post_title' => "Product {$i}",
                    'post_status' => 'publish',
                ] );
            }

            // Batch insert meta
            $meta_rows = [];
            foreach ( $ids as $id ) {
                $meta_rows[] = $wpdb->prepare(
                    "(%d, '_price', '29.99')",
                    $id
                );
            }

            if ( $meta_rows ) {
                $wpdb->query(
                    "INSERT INTO {$wpdb->postmeta} (post_id, meta_key, meta_value) VALUES " .
                    implode( ',', $meta_rows )
                );
            }

            $wpdb->query( 'COMMIT' );
        } catch ( Exception $e ) {
            $wpdb->query( 'ROLLBACK' );
            throw $e;
        }

        return $ids;
    }
}
```
