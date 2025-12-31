# 💥 Failure Injection (Chaos Lite)

> **Type**: Specialist
> **Domain**: Resilience Testing
> **Authority**: Controlled failure injection, error handling verification, degradation testing

## 🎯 Mission

Implement controlled failure injection to verify plugin resilience. Own chaos testing patterns, graceful degradation verification, and error recovery testing without production risk.

## 📥 Inputs

- Error scenarios to test
- Recovery requirements
- Degradation expectations
- Failure boundaries

## 📤 Outputs

- Failure injection tests
- Error handling verification
- Degradation test cases
- Recovery validation

---

## 🔧 When to Use

✅ **Use this agent when:**
- Testing error handling paths
- Verifying graceful degradation
- Testing recovery mechanisms
- Validating timeout handling
- Testing external service failures

❌ **Don't use for:**
- Production chaos engineering
- Load/stress testing
- Security testing
- Normal functional tests

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Uncontrolled failures | Use test-only injection |
| Missing cleanup | Always restore state |
| Cascading failures | Isolate failure scope |
| Silent failures | Verify error logging |
| Incomplete coverage | Map all failure modes |

---

## ✅ Checklist

### Failure Mapping
- [ ] External API failures
- [ ] Database errors
- [ ] File system failures
- [ ] Network timeouts
- [ ] Memory limits

### Injection Safety
- [ ] Test-only code paths
- [ ] Environment checks
- [ ] Automatic cleanup
- [ ] Scope boundaries

### Verification
- [ ] Error logged correctly
- [ ] User sees helpful message
- [ ] No data corruption
- [ ] Recovery works

### Documentation
- [ ] Failure modes documented
- [ ] Expected behaviors defined
- [ ] Recovery procedures listed
- [ ] Monitoring alerts set

---

## 💬 Example Prompts

### Claude Code
```
@failure-injection-chaos-lite Create tests that verify our plugin
handles WordPress REST API failures gracefully with proper error
messages and fallbacks.
```

### Cursor
```
Using failure-injection-chaos-lite, test what happens when the
external payment API times out. Verify user feedback and retry logic.
```

### GitHub Copilot
```
# Chaos Lite Task: Database Failures
#
# Test scenarios:
# - Connection timeout
# - Query failure
# - Deadlock
#
# Verify: error handling, user messaging, data integrity
```

### General Prompt
```
Test our plugin's resilience:
1. Map all external dependencies
2. Define failure scenarios
3. Create injection mechanism
4. Verify graceful degradation
5. Document expected behaviors
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [integration-testing](../testing/integration-testing.md) | Test execution |
| [test-data-and-fixtures](../testing/test-data-and-fixtures.md) | Failure fixtures |
| [qa-director](../../orchestrators/qa-director.md) | Quality gates |
| [risk-manager](../../orchestrators/risk-manager.md) | Risk assessment |

---

## 📋 Failure Injection Patterns

### HTTP Request Failures

```php
<?php

namespace MyPlugin\Tests\Chaos;

use WP_UnitTestCase;

class HTTP_Failure_Test extends WP_UnitTestCase {

    /**
     * Test handling of API timeout.
     */
    public function test_handles_api_timeout(): void {
        // Inject timeout failure
        add_filter( 'pre_http_request', function( $preempt, $args, $url ) {
            if ( str_contains( $url, 'api.example.com' ) ) {
                return new \WP_Error(
                    'http_request_failed',
                    'Connection timed out after 30000 milliseconds'
                );
            }
            return $preempt;
        }, 10, 3 );

        $client = new \MyPlugin\API_Client();
        $result = $client->fetch_data();

        $this->assertInstanceOf( \WP_Error::class, $result );
        $this->assertEquals( 'api_timeout', $result->get_error_code() );
    }

    /**
     * Test handling of 500 server error.
     */
    public function test_handles_server_error(): void {
        add_filter( 'pre_http_request', function( $preempt, $args, $url ) {
            if ( str_contains( $url, 'api.example.com' ) ) {
                return [
                    'response' => [ 'code' => 500, 'message' => 'Internal Server Error' ],
                    'body' => '{"error": "Server error"}',
                ];
            }
            return $preempt;
        }, 10, 3 );

        $client = new \MyPlugin\API_Client();
        $result = $client->fetch_data();

        $this->assertInstanceOf( \WP_Error::class, $result );
        $this->assertEquals( 'server_error', $result->get_error_code() );
    }

    /**
     * Test retry mechanism on transient failure.
     */
    public function test_retries_on_transient_failure(): void {
        $attempt = 0;

        add_filter( 'pre_http_request', function( $preempt, $args, $url ) use ( &$attempt ) {
            if ( str_contains( $url, 'api.example.com' ) ) {
                $attempt++;

                // Fail first 2 attempts, succeed on 3rd
                if ( $attempt < 3 ) {
                    return new \WP_Error( 'http_request_failed', 'Connection refused' );
                }

                return [
                    'response' => [ 'code' => 200 ],
                    'body' => '{"data": "success"}',
                ];
            }
            return $preempt;
        }, 10, 3 );

        $client = new \MyPlugin\API_Client();
        $result = $client->fetch_data_with_retry( max_attempts: 3 );

        $this->assertEquals( 3, $attempt, 'Should have attempted 3 times' );
        $this->assertArrayHasKey( 'data', $result );
    }
}
```

### Database Failures

```php
<?php

namespace MyPlugin\Tests\Chaos;

use WP_UnitTestCase;

class Database_Failure_Test extends WP_UnitTestCase {

    /**
     * Test handling of database connection failure.
     */
    public function test_handles_db_connection_failure(): void {
        global $wpdb;

        // Simulate connection failure
        $original_suppress = $wpdb->suppress_errors();
        $wpdb->suppress_errors( true );

        // Temporarily break connection
        add_filter( 'query', function( $query ) {
            if ( str_contains( $query, 'my_plugin_table' ) ) {
                global $wpdb;
                $wpdb->last_error = 'MySQL server has gone away';
                return '';
            }
            return $query;
        } );

        $repository = new \MyPlugin\Repository();
        $result = $repository->get_items();

        $this->assertInstanceOf( \WP_Error::class, $result );
        $this->assertEquals( 'database_error', $result->get_error_code() );

        $wpdb->suppress_errors( $original_suppress );
    }

    /**
     * Test transaction rollback on partial failure.
     */
    public function test_rollback_on_partial_failure(): void {
        global $wpdb;

        $initial_count = $wpdb->get_var(
            "SELECT COUNT(*) FROM {$wpdb->prefix}my_plugin_items"
        );

        // Inject failure after first insert
        $insert_count = 0;
        add_filter( 'query', function( $query ) use ( &$insert_count ) {
            if ( str_contains( $query, 'INSERT INTO' ) &&
                 str_contains( $query, 'my_plugin_items' ) ) {
                $insert_count++;
                if ( $insert_count > 1 ) {
                    global $wpdb;
                    $wpdb->last_error = 'Duplicate entry';
                    return '';
                }
            }
            return $query;
        } );

        $batch_processor = new \MyPlugin\Batch_Processor();
        $result = $batch_processor->import_items( [
            [ 'name' => 'Item 1' ],
            [ 'name' => 'Item 2' ], // Will fail
            [ 'name' => 'Item 3' ],
        ] );

        // Should rollback all changes
        $final_count = $wpdb->get_var(
            "SELECT COUNT(*) FROM {$wpdb->prefix}my_plugin_items"
        );

        $this->assertInstanceOf( \WP_Error::class, $result );
        $this->assertEquals( $initial_count, $final_count, 'Should rollback all inserts' );
    }
}
```

### File System Failures

```php
<?php

namespace MyPlugin\Tests\Chaos;

use WP_UnitTestCase;

class Filesystem_Failure_Test extends WP_UnitTestCase {

    /**
     * Test handling of write permission failure.
     */
    public function test_handles_write_permission_failure(): void {
        // Use WP_Filesystem mock
        add_filter( 'filesystem_method', fn() => 'direct' );

        // Inject permission denied
        add_filter( 'wp_handle_upload_prefilter', function( $file ) {
            $file['error'] = 'Unable to write file: Permission denied';
            return $file;
        } );

        $uploader = new \MyPlugin\File_Uploader();
        $result = $uploader->upload( [
            'name' => 'test.jpg',
            'tmp_name' => '/tmp/test.jpg',
            'size' => 1024,
            'type' => 'image/jpeg',
            'error' => UPLOAD_ERR_OK,
        ] );

        $this->assertInstanceOf( \WP_Error::class, $result );
        $this->assertEquals( 'upload_failed', $result->get_error_code() );
    }

    /**
     * Test handling of disk full scenario.
     */
    public function test_handles_disk_full(): void {
        add_filter( 'wp_handle_upload', function( $upload ) {
            return [
                'error' => 'Not enough space on device',
            ];
        } );

        $uploader = new \MyPlugin\File_Uploader();
        $result = $uploader->upload( $this->create_test_file() );

        $this->assertInstanceOf( \WP_Error::class, $result );
        $this->assertStringContainsString( 'space', $result->get_error_message() );
    }
}
```

---

## 🔧 Graceful Degradation Testing

### Feature Fallback

```php
<?php

namespace MyPlugin\Tests\Chaos;

class Degradation_Test extends WP_UnitTestCase {

    /**
     * Test plugin degrades gracefully without external service.
     */
    public function test_degrades_without_external_service(): void {
        // Block all external requests
        add_filter( 'pre_http_request', function() {
            return new \WP_Error( 'http_request_failed', 'Network unreachable' );
        } );

        $feature = new \MyPlugin\Enhanced_Feature();

        // Should still work with reduced functionality
        $this->assertTrue( $feature->is_available() );
        $this->assertEquals( 'basic', $feature->get_mode() );

        // Basic functionality should work
        $result = $feature->process( 'input' );
        $this->assertNotInstanceOf( \WP_Error::class, $result );
    }

    /**
     * Test caching provides offline resilience.
     */
    public function test_uses_cached_data_when_api_fails(): void {
        // Prime the cache
        wp_cache_set( 'api_data', [ 'cached' => 'data' ], 'my_plugin' );

        // Now block API
        add_filter( 'pre_http_request', function( $preempt, $args, $url ) {
            if ( str_contains( $url, 'api.example.com' ) ) {
                return new \WP_Error( 'http_request_failed', 'Timeout' );
            }
            return $preempt;
        }, 10, 3 );

        $client = new \MyPlugin\API_Client();
        $result = $client->get_data_with_fallback();

        $this->assertEquals( [ 'cached' => 'data' ], $result );
        $this->assertTrue( $client->is_using_cache() );
    }
}
```

### User-Facing Error Messages

```php
/**
 * Test user sees friendly error message on failure.
 */
public function test_shows_friendly_error_on_failure(): void {
    // Inject failure
    add_filter( 'pre_http_request', function() {
        return new \WP_Error( 'http_request_failed', 'Technical error details' );
    } );

    $controller = new \MyPlugin\AJAX_Controller();

    // Capture output
    ob_start();
    $controller->handle_request();
    $output = ob_get_clean();

    $response = json_decode( $output, true );

    // Should NOT expose technical details
    $this->assertStringNotContainsString( 'http_request_failed', $response['message'] );

    // Should show user-friendly message
    $this->assertStringContainsString( 'temporarily unavailable', $response['message'] );
    $this->assertArrayHasKey( 'retry_after', $response );
}
```

---

## 📊 Failure Injection Framework

### Chaos Controller

```php
<?php
// tests/chaos/class-chaos-controller.php

namespace MyPlugin\Tests\Chaos;

class Chaos_Controller {

    private static array $active_failures = [];

    /**
     * Inject a failure condition.
     */
    public static function inject( string $failure_type, array $config = [] ): void {
        if ( ! defined( 'WP_TESTS_DOMAIN' ) ) {
            throw new \RuntimeException( 'Chaos injection only allowed in tests' );
        }

        self::$active_failures[ $failure_type ] = $config;

        switch ( $failure_type ) {
            case 'http_timeout':
                self::inject_http_timeout( $config );
                break;
            case 'db_error':
                self::inject_db_error( $config );
                break;
            case 'memory_limit':
                self::inject_memory_limit( $config );
                break;
        }
    }

    /**
     * Clear all injected failures.
     */
    public static function restore(): void {
        foreach ( array_keys( self::$active_failures ) as $type ) {
            self::restore_single( $type );
        }
        self::$active_failures = [];
    }

    private static function inject_http_timeout( array $config ): void {
        $url_pattern = $config['url_pattern'] ?? '.*';
        $delay = $config['delay'] ?? 30;

        add_filter( 'pre_http_request', function( $preempt, $args, $url ) use ( $url_pattern, $delay ) {
            if ( preg_match( "/$url_pattern/", $url ) ) {
                return new \WP_Error(
                    'http_request_failed',
                    "Connection timed out after {$delay} seconds"
                );
            }
            return $preempt;
        }, 1, 3 );
    }

    private static function inject_db_error( array $config ): void {
        $table_pattern = $config['table'] ?? '.*';
        $error = $config['error'] ?? 'Database error';

        add_filter( 'query', function( $query ) use ( $table_pattern, $error ) {
            if ( preg_match( "/$table_pattern/", $query ) ) {
                global $wpdb;
                $wpdb->last_error = $error;
                return '';
            }
            return $query;
        }, 1 );
    }

    private static function inject_memory_limit( array $config ): void {
        $limit = $config['limit'] ?? '16M';
        ini_set( 'memory_limit', $limit );
    }
}
```

### Usage in Tests

```php
class Resilience_Test extends WP_UnitTestCase {

    public function tear_down(): void {
        Chaos_Controller::restore();
        parent::tear_down();
    }

    public function test_survives_multiple_failures(): void {
        // Inject multiple failure conditions
        Chaos_Controller::inject( 'http_timeout', [
            'url_pattern' => 'api\.example\.com',
        ] );

        Chaos_Controller::inject( 'db_error', [
            'table' => 'my_plugin_cache',
            'error' => 'Table is marked as crashed',
        ] );

        $service = new \MyPlugin\Service();

        // Should still return valid response using fallbacks
        $result = $service->get_status();

        $this->assertEquals( 'degraded', $result['status'] );
        $this->assertArrayHasKey( 'available_features', $result );
    }
}
```

---

## 📋 Failure Scenario Matrix

| Component | Failure Type | Expected Behavior | Test Method |
|-----------|--------------|-------------------|-------------|
| REST API | Timeout | Return cached data | `test_api_timeout_uses_cache` |
| REST API | 500 Error | Show error + retry | `test_api_error_shows_retry` |
| Database | Connection | Queue for retry | `test_db_connection_queues` |
| Database | Query error | Log + graceful fail | `test_db_query_logs_error` |
| File System | Permission | Inform user | `test_fs_permission_message` |
| File System | Disk full | Block + inform | `test_fs_disk_full_blocks` |
| Cache | Miss | Fetch fresh | `test_cache_miss_fetches` |
| Cache | Corruption | Clear + rebuild | `test_cache_corruption_rebuilds` |

