# Performance Linting

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Automated performance audits with Lighthouse CI

<skill>
<summary>
Running automated performance checks using Lighthouse CI to catch performance regressions in WordPress projects.
</summary>

<knowledge>
## What Is Performance Linting?

Automated performance testing in CI:
- **Lighthouse audits** - Core Web Vitals metrics
- **Budget enforcement** - Size and timing limits
- **Regression detection** - Compare against baselines
- **Early warning** - Catch issues before production

## Lighthouse CI Setup

### Install

```bash
npm install --save-dev @lhci/cli
```

### Configuration (lighthouserc.js)

```javascript
module.exports = {
    ci: {
        collect: {
            // Start local server
            startServerCommand: 'npm run start',
            startServerReadyPattern: 'ready on',
            startServerReadyTimeout: 30000,

            // URLs to test
            url: [
                'http://localhost:8080/',
                'http://localhost:8080/sample-page/',
            ],

            // Number of runs per URL
            numberOfRuns: 3,

            // Chrome settings
            settings: {
                preset: 'desktop',
                // Or 'mobile' for mobile testing
            },
        },

        assert: {
            assertions: {
                // Performance
                'categories:performance': ['error', { minScore: 0.8 }],

                // Accessibility
                'categories:accessibility': ['error', { minScore: 0.9 }],

                // Best practices
                'categories:best-practices': ['warn', { minScore: 0.9 }],

                // SEO
                'categories:seo': ['warn', { minScore: 0.8 }],

                // Core Web Vitals
                'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
                'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
                'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
                'total-blocking-time': ['warn', { maxNumericValue: 300 }],

                // Resource sizes
                'total-byte-weight': ['warn', { maxNumericValue: 500000 }],
                'mainthread-work-breakdown': ['warn', { maxNumericValue: 4000 }],
            },
        },

        upload: {
            // Store results (optional)
            target: 'temporary-public-storage',
            // Or 'lhci' for self-hosted server
        },
    },
};
```

## Performance Budgets

### Budget Configuration (budget.json)

```json
[
    {
        "path": "/*",
        "resourceSizes": [
            { "resourceType": "document", "budget": 50 },
            { "resourceType": "script", "budget": 200 },
            { "resourceType": "stylesheet", "budget": 50 },
            { "resourceType": "image", "budget": 300 },
            { "resourceType": "font", "budget": 100 },
            { "resourceType": "total", "budget": 500 }
        ],
        "resourceCounts": [
            { "resourceType": "script", "budget": 10 },
            { "resourceType": "stylesheet", "budget": 5 }
        ],
        "timings": [
            { "metric": "first-contentful-paint", "budget": 2000 },
            { "metric": "largest-contentful-paint", "budget": 2500 },
            { "metric": "interactive", "budget": 3500 }
        ]
    }
]
```

### Use in Lighthouse

```javascript
module.exports = {
    ci: {
        collect: {
            settings: {
                budgets: require('./budget.json'),
            },
        },
        assert: {
            assertions: {
                'performance-budget': ['error', { minScore: 1 }],
            },
        },
    },
};
```

## WordPress-Specific Checks

### Testing with WordPress

```javascript
module.exports = {
    ci: {
        collect: {
            // Use wp-env or Local
            startServerCommand: 'npx wp-env start',
            startServerReadyPattern: 'WordPress development site started',

            url: [
                'http://localhost:8888/',
                'http://localhost:8888/?p=1',  // Single post
                'http://localhost:8888/wp-admin/',  // Admin (if logged in)
            ],

            // Puppeteer script for authenticated pages
            puppeteerScript: './lighthouse-auth.js',
        },
    },
};
```

### Authentication Script (lighthouse-auth.js)

```javascript
module.exports = async (browser) => {
    const page = await browser.newPage();

    // Login to WordPress
    await page.goto('http://localhost:8888/wp-login.php');
    await page.type('#user_login', 'admin');
    await page.type('#user_pass', 'password');
    await page.click('#wp-submit');
    await page.waitForNavigation();

    await page.close();
};
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Performance

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci

      - name: Build
        run: npm run build

      - name: Start WordPress
        run: npx wp-env start

      - name: Run Lighthouse CI
        run: npx lhci autorun

      - name: Upload results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: lighthouse-results
          path: .lighthouseci/
```

### With Lighthouse CI Server

```yaml
- name: Run Lighthouse CI
  run: npx lhci autorun
  env:
    LHCI_TOKEN: ${{ secrets.LHCI_TOKEN }}
    LHCI_SERVER_BASE_URL: https://lhci.example.com
```

## Custom Audits

### Plugin/Theme Specific

```javascript
module.exports = {
    ci: {
        collect: {
            settings: {
                // Skip audits not relevant to plugins
                skipAudits: [
                    'service-worker',
                    'pwa-cross-browser',
                    'pwa-page-transitions',
                ],
            },
        },
        assert: {
            assertions: {
                // Plugin-specific checks
                'uses-rel-preconnect': 'off',  // May not apply
                'render-blocking-resources': ['warn', { minScore: 0.8 }],
                'unused-javascript': ['warn', { minScore: 0.7 }],
                'unused-css-rules': ['warn', { minScore: 0.7 }],
            },
        },
    },
};
```

## Common Performance Issues

### Large JavaScript Bundles

```javascript
// Detection
'total-byte-weight': ['error', { maxNumericValue: 500000 }],
'unused-javascript': ['warn', { minScore: 0.8 }],

// Solution: Code splitting
import(/* webpackChunkName: "admin" */ './admin').then((module) => {
    module.init();
});
```

### Render-Blocking Resources

```javascript
// Detection
'render-blocking-resources': ['warn', { minScore: 0.8 }],

// Solution: Defer scripts
wp_enqueue_script('my-script', $url, [], '1.0', ['strategy' => 'defer']);
```

### Unoptimized Images

```javascript
// Detection
'uses-webp-images': ['warn', { minScore: 0.8 }],
'uses-responsive-images': ['warn', { minScore: 0.8 }],

// Solution: Use WordPress image functions
wp_get_attachment_image($id, 'large');
```
</knowledge>

<best_practices>
- Set performance budgets early in development
- Run Lighthouse on every PR
- Test both desktop and mobile
- Monitor trends over time
- Focus on Core Web Vitals
- Test with realistic data
</best_practices>

<commands>
```bash
# Run Lighthouse CI
npx lhci autorun

# Collect only (no assertions)
npx lhci collect --url=http://localhost:8080/

# Assert against baseline
npx lhci assert

# View results
npx lhci open

# Single page audit
npx lighthouse http://localhost:8080/ --output=html --output-path=./report.html
```
</commands>
</skill>
