# HTTP Mocking and Network Testing

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Mocking HTTP requests and testing external API integrations

<skill>
<summary>
Strategies for mocking external HTTP requests in WordPress tests to ensure reliable, isolated testing of API integrations.
</summary>

<knowledge>
## Why Mock HTTP Requests?

- **Isolation** - Tests don't depend on external services
- **Speed** - No network latency
- **Reliability** - No flaky tests from service outages
- **Control** - Test error scenarios easily
- **Cost** - No API rate limits or charges

## WordPress HTTP API Mocking

### pre_http_request Filter

```php
<?php
/**
 * Mock HTTP responses using WordPress filters.
 */
class HTTP_Mock_Test extends WP_UnitTestCase {

    /**
     * Mock all requests to specific API.
     */
    public function test_api_call_success() {
        // Set up mock
        add_filter( 'pre_http_request', [ $this, 'mock_api_response' ], 10, 3 );

        // Make the call
        $result = my_plugin_fetch_data();

        // Verify result
        $this->assertEquals( 'mocked_value', $result['data'] );

        // Clean up
        remove_filter( 'pre_http_request', [ $this, 'mock_api_response' ] );
    }

    /**
     * Mock API response.
     */
    public function mock_api_response( $preempt, $args, $url ) {
        // Only mock specific URLs
        if ( strpos( $url, 'api.example.com' ) === false ) {
            return $preempt;
        }

        return [
            'response' => [
                'code'    => 200,
                'message' => 'OK',
            ],
            'body'     => wp_json_encode( [
                'data'   => 'mocked_value',
                'status' => 'success',
            ] ),
            'headers'  => [
                'content-type' => 'application/json',
            ],
            'cookies'  => [],
        ];
    }

    /**
     * Test error handling.
     */
    public function test_api_call_error() {
        add_filter( 'pre_http_request', function( $preempt, $args, $url ) {
            if ( strpos( $url, 'api.example.com' ) !== false ) {
                return new WP_Error( 'http_request_failed', 'Connection refused' );
            }
            return $preempt;
        }, 10, 3 );

        $result = my_plugin_fetch_data();

        $this->assertWPError( $result );
        $this->assertEquals( 'http_request_failed', $result->get_error_code() );
    }

    /**
     * Test rate limiting.
     */
    public function test_api_rate_limit() {
        add_filter( 'pre_http_request', function( $preempt, $args, $url ) {
            if ( strpos( $url, 'api.example.com' ) !== false ) {
                return [
                    'response' => [
                        'code'    => 429,
                        'message' => 'Too Many Requests',
                    ],
                    'body'     => wp_json_encode( [
                        'error'       => 'rate_limited',
                        'retry_after' => 60,
                    ] ),
                    'headers'  => [
                        'retry-after' => '60',
                    ],
                    'cookies'  => [],
                ];
            }
            return $preempt;
        }, 10, 3 );

        $result = my_plugin_fetch_data();

        // Should handle rate limit gracefully
        $this->assertWPError( $result );
        $this->assertEquals( 'rate_limited', $result->get_error_code() );
    }
}
```

### Reusable Mock Trait

```php
<?php
/**
 * Trait for HTTP mocking in tests.
 */
trait HTTP_Mock_Trait {

    /**
     * @var array Mocked responses.
     */
    private array $mocked_responses = [];

    /**
     * Set up HTTP mocking.
     */
    protected function set_up_http_mocking(): void {
        add_filter( 'pre_http_request', [ $this, 'handle_mock_request' ], 10, 3 );
    }

    /**
     * Tear down HTTP mocking.
     */
    protected function tear_down_http_mocking(): void {
        remove_filter( 'pre_http_request', [ $this, 'handle_mock_request' ] );
        $this->mocked_responses = [];
    }

    /**
     * Add a mock response.
     */
    protected function mock_http_response(
        string $url_pattern,
        int $status_code,
        array $body,
        array $headers = []
    ): void {
        $this->mocked_responses[] = [
            'pattern' => $url_pattern,
            'status'  => $status_code,
            'body'    => $body,
            'headers' => $headers,
        ];
    }

    /**
     * Mock an error response.
     */
    protected function mock_http_error(
        string $url_pattern,
        string $error_code,
        string $error_message
    ): void {
        $this->mocked_responses[] = [
            'pattern' => $url_pattern,
            'error'   => new WP_Error( $error_code, $error_message ),
        ];
    }

    /**
     * Handle mock request.
     */
    public function handle_mock_request( $preempt, $args, $url ) {
        foreach ( $this->mocked_responses as $mock ) {
            if ( preg_match( $mock['pattern'], $url ) ) {
                if ( isset( $mock['error'] ) ) {
                    return $mock['error'];
                }

                return [
                    'response' => [
                        'code'    => $mock['status'],
                        'message' => 'OK',
                    ],
                    'body'     => wp_json_encode( $mock['body'] ),
                    'headers'  => array_merge(
                        [ 'content-type' => 'application/json' ],
                        $mock['headers']
                    ),
                    'cookies'  => [],
                ];
            }
        }

        return $preempt;
    }
}

/**
 * Usage in test class.
 */
class API_Test extends WP_UnitTestCase {
    use HTTP_Mock_Trait;

    public function set_up(): void {
        parent::set_up();
        $this->set_up_http_mocking();
    }

    public function tear_down(): void {
        $this->tear_down_http_mocking();
        parent::tear_down();
    }

    public function test_api_success() {
        $this->mock_http_response(
            '#https://api\.example\.com/users#',
            200,
            [ 'users' => [ [ 'id' => 1, 'name' => 'Test' ] ] ]
        );

        $users = my_plugin_get_users();

        $this->assertCount( 1, $users );
        $this->assertEquals( 'Test', $users[0]['name'] );
    }

    public function test_api_timeout() {
        $this->mock_http_error(
            '#https://api\.example\.com#',
            'http_request_failed',
            'Operation timed out'
        );

        $result = my_plugin_get_users();

        $this->assertWPError( $result );
    }
}
```

## WP_Mock for HTTP

```php
<?php
/**
 * Using WP_Mock for HTTP testing.
 */
class WP_Mock_HTTP_Test extends TestCase {

    public function test_api_call_with_wp_mock() {
        WP_Mock::userFunction( 'wp_remote_get' )
            ->once()
            ->with( 'https://api.example.com/data', \WP_Mock\Functions::type( 'array' ) )
            ->andReturn( [
                'response' => [ 'code' => 200 ],
                'body'     => '{"success": true}',
            ] );

        WP_Mock::userFunction( 'wp_remote_retrieve_response_code' )
            ->andReturn( 200 );

        WP_Mock::userFunction( 'wp_remote_retrieve_body' )
            ->andReturn( '{"success": true}' );

        $result = my_plugin_fetch_data();

        $this->assertTrue( $result['success'] );
    }

    public function test_post_request() {
        WP_Mock::userFunction( 'wp_remote_post' )
            ->once()
            ->with(
                'https://api.example.com/create',
                \Mockery::on( function( $args ) {
                    return isset( $args['body'] ) &&
                           $args['body']['name'] === 'Test';
                } )
            )
            ->andReturn( [
                'response' => [ 'code' => 201 ],
                'body'     => '{"id": 123}',
            ] );

        $result = my_plugin_create_item( [ 'name' => 'Test' ] );

        $this->assertEquals( 123, $result['id'] );
    }
}
```

## Request Recording

```php
<?php
/**
 * Record HTTP requests for verification.
 */
trait HTTP_Request_Recorder {

    private array $recorded_requests = [];

    protected function start_recording(): void {
        add_filter( 'pre_http_request', [ $this, 'record_request' ], 1, 3 );
    }

    protected function stop_recording(): void {
        remove_filter( 'pre_http_request', [ $this, 'record_request' ] );
    }

    public function record_request( $preempt, $args, $url ) {
        $this->recorded_requests[] = [
            'url'     => $url,
            'method'  => $args['method'] ?? 'GET',
            'headers' => $args['headers'] ?? [],
            'body'    => $args['body'] ?? null,
            'time'    => microtime( true ),
        ];

        return $preempt;
    }

    protected function get_recorded_requests(): array {
        return $this->recorded_requests;
    }

    protected function assert_request_made( string $url_pattern, string $method = 'GET' ): void {
        $found = false;

        foreach ( $this->recorded_requests as $request ) {
            if ( preg_match( $url_pattern, $request['url'] ) &&
                 strtoupper( $request['method'] ) === strtoupper( $method ) ) {
                $found = true;
                break;
            }
        }

        $this->assertTrue( $found, "Expected request to {$url_pattern} ({$method}) was not made" );
    }

    protected function assert_no_requests_made(): void {
        $this->assertEmpty(
            $this->recorded_requests,
            'Expected no HTTP requests, but ' . count( $this->recorded_requests ) . ' were made'
        );
    }
}
```

## Testing OAuth/Authentication

```php
<?php
/**
 * Tests for OAuth authentication flow.
 */
class OAuth_Test extends WP_UnitTestCase {
    use HTTP_Mock_Trait;

    public function test_token_refresh() {
        // Mock token refresh endpoint
        $this->mock_http_response(
            '#/oauth/token#',
            200,
            [
                'access_token'  => 'new_access_token',
                'refresh_token' => 'new_refresh_token',
                'expires_in'    => 3600,
            ]
        );

        // Set expired token
        update_option( 'my_plugin_token', [
            'access_token' => 'old_token',
            'expires_at'   => time() - 100, // Expired
        ] );

        // Make authenticated request
        $result = my_plugin_authenticated_request( '/api/data' );

        // Verify token was refreshed
        $new_token = get_option( 'my_plugin_token' );
        $this->assertEquals( 'new_access_token', $new_token['access_token'] );
    }

    public function test_authentication_failure() {
        $this->mock_http_response(
            '#/oauth/token#',
            401,
            [ 'error' => 'invalid_grant' ]
        );

        $result = my_plugin_refresh_token();

        $this->assertWPError( $result );
        $this->assertEquals( 'auth_failed', $result->get_error_code() );
    }
}
```

## Playwright Network Mocking

```typescript
// tests/e2e/api-mock.spec.ts
import { test, expect } from '@playwright/test';

test.describe('API Integration', () => {
    test('handles API success', async ({ page }) => {
        // Mock API response
        await page.route('**/api.example.com/**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ data: 'mocked' }),
            });
        });

        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Trigger API call
        await page.click('#fetch-data');

        // Verify UI updates
        await expect(page.locator('#result')).toContainText('mocked');
    });

    test('handles API error gracefully', async ({ page }) => {
        await page.route('**/api.example.com/**', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Server error' }),
            });
        });

        await page.goto('/wp-admin/options-general.php?page=my-plugin');
        await page.click('#fetch-data');

        // Should show error message
        await expect(page.locator('.notice-error')).toBeVisible();
    });

    test('handles timeout', async ({ page }) => {
        await page.route('**/api.example.com/**', async (route) => {
            // Delay response to simulate timeout
            await new Promise((resolve) => setTimeout(resolve, 30000));
            await route.fulfill({
                status: 200,
                body: JSON.stringify({}),
            });
        });

        await page.goto('/wp-admin/options-general.php?page=my-plugin');

        // Set shorter timeout in plugin
        await page.click('#fetch-data');

        // Should show timeout error
        await expect(page.locator('.notice-error')).toContainText(/timeout/i);
    });

    test('records and verifies requests', async ({ page }) => {
        const requests: string[] = [];

        page.on('request', (request) => {
            if (request.url().includes('api.example.com')) {
                requests.push(request.url());
            }
        });

        await page.route('**/api.example.com/**', async (route) => {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true }),
            });
        });

        await page.goto('/wp-admin/options-general.php?page=my-plugin');
        await page.click('#fetch-data');

        // Verify correct API was called
        expect(requests.some((r) => r.includes('/api/v1/data'))).toBe(true);
    });
});
```

## CI Configuration

```yaml
name: HTTP Mock Tests

on: [push, pull_request]

jobs:
  unit-with-mocks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: Run mocked HTTP tests
        run: ./vendor/bin/phpunit --group http-mock

  e2e-with-mocks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npx playwright install --with-deps chromium

      - name: Start WordPress
        run: npx wp-env start

      - name: Run E2E with mocked APIs
        run: npx playwright test tests/e2e/api-mock.spec.ts

  # Optional: Integration tests against real API (nightly)
  integration-real-api:
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule'
    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: Run real API tests
        run: ./vendor/bin/phpunit --group integration-api
        env:
          API_KEY: ${{ secrets.TEST_API_KEY }}
```
</knowledge>

<best_practices>
- Mock all external HTTP in unit tests
- Use real APIs only in scheduled integration tests
- Test all HTTP error scenarios
- Record requests to verify correct API usage
- Mock at the WordPress HTTP API level
- Clean up mocks in tear_down
</best_practices>

<commands>
```bash
# Run HTTP mock tests
./vendor/bin/phpunit --group http-mock

# Run with request recording
./vendor/bin/phpunit --group http-recording

# Run E2E with network mocking
npx playwright test tests/e2e/api-mock.spec.ts
```
</commands>
</skill>
