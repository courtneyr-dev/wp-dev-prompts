# Universal Visual Regression Testing Prompt
## WordPress Plugins & Themes with Playwright + Blueprints

## Complete Visual Regression Testing Prompt

```
Create a visual regression testing suite for [PLUGIN_NAME / THEME_NAME] using Playwright and WordPress Playground blueprints.

PROJECT SETUP:
- Type: [Plugin | Theme]
- Name: [PROJECT_NAME]
- Slug: [project-slug]
- Blueprint: [PATH_TO_BLUEPRINT or URL]
- Repository: [GIT_REPO_URL]
- Version: [CURRENT_VERSION]

BASELINE CONFIGURATION:
- Baseline Source: [main branch | tagged release | specific commit]
- Baseline Directory: ./visual-regression/baselines/
- Store baselines in: [Git LFS | Separate repo | Artifact storage]
- Update strategy: [Manual approval | Automatic on merge | PR-based]

TEST SCENARIOS:

Define test cases for:

1. ADMIN SCREENS
   - Plugin/Theme activation
   - Settings pages
   - Configuration screens
   - Dashboard widgets
   - Meta boxes
   [LIST_SPECIFIC_ADMIN_SCREENS]

2. EDITOR INTEGRATION
   - Block inserter
   - Block editor states
   - Sidebar panels
   - Inspector controls
   - Toolbar modifications
   [LIST_SPECIFIC_EDITOR_FEATURES]

3. FRONTEND VIEWS
   - Homepage
   - Archive pages
   - Single post/page
   - Custom post types
   - Widgets/Sidebars
   [LIST_SPECIFIC_FRONTEND_VIEWS]

4. RESPONSIVE VIEWS
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
   [CUSTOM_BREAKPOINTS]

5. STATE VARIATIONS
   - Default state
   - Hover states
   - Focus states
   - Active states
   - Error states
   - Loading states
   - Empty states
   [LIST_SPECIFIC_STATES]

6. USER INTERACTIONS
   - Form submissions
   - Button clicks
   - Modal interactions
   - Dropdown menus
   - Dynamic content loading
   [LIST_SPECIFIC_INTERACTIONS]

COMPARISON STRATEGY:

Pixel-Perfect Comparison:
- Threshold: [0.1 - 1%] difference tolerance
- Ignore regions: [Specify areas to ignore - dates, random content, ads]
- Anti-aliasing: [Enable | Disable]
- Color difference threshold: [0-255]

Structural Comparison:
- Layout shifts detection
- Element presence/absence
- Size changes
- Position changes

Perceptual Comparison:
- Human-like visual difference detection
- Focus on user-visible changes
- Ignore sub-pixel differences

DIFF GENERATION:

For each failed comparison, generate:
1. Side-by-side comparison image
2. Diff overlay (highlighted changes)
3. Difference percentage
4. Affected regions highlighted
5. Metadata:
   - Test name
   - Viewport
   - Difference score
   - Number of changed pixels
   - Timestamp
   - Git commit hash

APPROVAL WORKFLOW:

Define approval process:

1. AUTOMATIC APPROVAL (Optional)
   - Threshold: Changes < [0.1%]
   - Conditions: [Specify scenarios for auto-approval]

2. MANUAL REVIEW REQUIRED
   - Changes > [0.1%]
   - New visual elements
   - Layout changes
   - Color changes

3. APPROVAL INTERFACE
   - Web UI for reviewing diffs
   - Accept/Reject buttons
   - Bulk approval option
   - Comment/annotation capability
   - Assignment to reviewers

4. BASELINE UPDATE
   - Approved changes update baseline
   - Versioned baselines
   - Rollback capability
   - Changelog generation

CI/CD INTEGRATION:

GitHub Actions Example:
- Trigger: [On PR | On push | On schedule]
- Run visual tests on: [Every commit | Tagged releases | Main branch]
- Block merge if: [Any changes detected | Changes exceed threshold]
- Notify on: [Slack | Email | GitHub Comments]

Other CI Systems:
- [GitLab CI | CircleCI | Jenkins | Travis]
- Configuration examples provided
- Artifact storage strategy
- Result publishing

TEST EXECUTION:

Playwright Configuration:
- Browser: [Chromium | Firefox | WebKit | All]
- Headless: [Yes | No]
- Screenshot type: [PNG | JPEG]
- Timeout: [60s for Playground load, 30s for navigation]
- Retries: [2-3 attempts on failure]
- Parallel execution: [Yes | No | Max workers: N]

WordPress Playground:
- Wait for iframe initialization (60s)
- Handle loading states
- Wait for network idle
- Dismiss welcome screens
- Handle admin notices

Comparison Tool:
- Tool: [Playwright built-in | pixelmatch | looks-same | Percy | Applitools]
- Configuration: [Specify settings]
- Output format: [HTML report | JSON | Both]

ERROR HANDLING:

Handle these scenarios:
- Baseline doesn't exist (create new)
- Playground fails to load (retry N times)
- Screenshot timeout (extend timeout, retry)
- Comparison tool failure (log and continue)
- Storage failure (backup strategy)
- Network issues (retry with backoff)

OUTPUT STRUCTURE:

/visual-regression
  /baselines
    /v1.0.0
      /admin
        [test-name]-[viewport].png
      /editor
      /frontend
  /current
    /admin
      [test-name]-[viewport].png
  /diffs
    /[timestamp]-[commit-hash]
      [test-name]-[viewport]-diff.png
      [test-name]-[viewport]-side-by-side.png
  /reports
    /[timestamp]
      index.html (interactive report)
      results.json (machine-readable)
      summary.md (human-readable)
  /config
    tests.config.js
    ignore-regions.json
    thresholds.json

REPORTING:

Generate comprehensive reports:

1. HTML REPORT (Interactive)
   - Overview: Pass/Fail summary
   - Failed tests with diffs
   - Image comparison slider
   - Filter by: Screen type, Viewport, Status
   - Search functionality
   - Export options

2. JSON REPORT (Machine-readable)
   {
     "summary": {
       "total": 50,
       "passed": 47,
       "failed": 3,
       "threshold": "0.1%",
       "runtime": "5m 23s",
       "commit": "abc123",
       "branch": "feature/new-ui"
     },
     "failed": [
       {
         "test": "admin-settings-page-desktop",
         "viewport": "1920x1080",
         "difference": "2.3%",
         "pixelsChanged": 45820,
         "baselineImage": "path/to/baseline.png",
         "currentImage": "path/to/current.png",
         "diffImage": "path/to/diff.png",
         "regions": [
           {"x": 100, "y": 200, "width": 300, "height": 150}
         ]
       }
     ]
   }

3. SUMMARY REPORT (Markdown)
   - Executive summary
   - Pass/fail counts
   - Top issues
   - Recommendations
   - Links to detailed reports

4. NOTIFICATION MESSAGES
   - Slack/Email format
   - GitHub PR comments
   - Include thumbnails
   - Action links

IGNORE REGIONS:

Define areas to exclude from comparison:

{
  "global": [
    {
      "selector": ".admin-notice",
      "reason": "Dynamic admin notices"
    },
    {
      "selector": ".update-nag",
      "reason": "WordPress update notifications"
    },
    {
      "coordinates": {"x": 0, "y": 0, "width": 200, "height": 50},
      "reason": "WordPress admin bar with username"
    }
  ],
  "per-test": {
    "dashboard": [
      {
        "selector": ".activity-widget .comment-count",
        "reason": "Dynamic comment counts"
      }
    ]
  }
}

THRESHOLD CONFIGURATION:

Define acceptable differences:

{
  "global": {
    "threshold": 0.1,
    "maxDiffPixels": 100
  },
  "per-viewport": {
    "mobile": {"threshold": 0.15},
    "tablet": {"threshold": 0.1},
    "desktop": {"threshold": 0.1}
  },
  "per-test": {
    "homepage": {"threshold": 0.2},
    "settings-page": {"threshold": 0.05}
  },
  "per-region": {
    "header": {"threshold": 0.05},
    "content": {"threshold": 0.1},
    "footer": {"threshold": 0.15}
  }
}

BASELINE MANAGEMENT:

Version Strategy:
- Option 1: Git-based (small repos)
  * Store baselines in git
  * Use Git LFS for large images
  * Tag baselines with version numbers

- Option 2: Separate Storage (large repos)
  * S3 / Cloud storage
  * CDN for fast access
  * Versioned with plugin/theme version

- Option 3: Artifact-based (CI/CD)
  * Store as CI artifacts
  * Reference by build number
  * Automatic cleanup policy

Update Workflow:
1. Review failed tests
2. Approve legitimate changes
3. Update baseline images
4. Commit with descriptive message
5. Tag with version
6. Document visual changes

PERFORMANCE OPTIMIZATION:

Speed up test execution:
- Parallel test execution (N workers)
- Reuse Playground instances
- Cache WordPress installation
- Incremental testing (only changed areas)
- Smart test selection (affected tests only)
- Comparison optimization (downsample for quick check)

INTEGRATION WITH EXISTING TOOLS:

If using Percy:
- Percy token configuration
- Project setup
- Comparison settings
- Approval workflow integration

If using Applitools:
- API key setup
- Eyes SDK configuration
- Batch management
- Visual AI settings

If using Chromatic:
- Storybook integration
- Component-level testing
- UI Library snapshots

DIY / Playwright Native:
- Built-in screenshot comparison
- Custom comparison logic
- No external dependencies
- Full control over process

ACCESSIBILITY INTEGRATION:

Combine visual regression with accessibility:
- Run axe-core on each screen
- Document accessibility issues alongside visual changes
- Ensure changes don't break accessibility
- Generate combined report (visual + a11y)

TESTING VARIATIONS:

Test multiple scenarios:

1. WORDPRESS VERSIONS
   - Latest stable
   - Previous major version
   - Beta versions

2. THEME COMPATIBILITY
   - Default theme (Twenty Twenty-Five)
   - Popular themes (Astra, GeneratePress)
   - Block themes vs Classic themes

3. PHP VERSIONS
   - PHP 8.2
   - PHP 8.3
   - PHP 8.4

4. BROWSER VARIATIONS
   - Chromium
   - Firefox
   - WebKit

5. USER ROLES
   - Administrator
   - Editor
   - Author
   - Subscriber

6. LANGUAGE/RTL
   - English (LTR)
   - Arabic (RTL)
   - Other locales

SCRIPT COMMANDS:

Implement npm scripts:

npm run vrt:baseline          # Create/update baseline
npm run vrt:test             # Run visual regression tests
npm run vrt:approve          # Approve all changes
npm run vrt:approve:test     # Approve specific test
npm run vrt:report           # Generate HTML report
npm run vrt:clean            # Clean old reports/diffs
npm run vrt:diff             # Show differences
npm run vrt:update           # Update baselines from current
npm run vrt:ci               # Run in CI mode
npm run vrt:watch            # Watch mode for development

CONFIGURATION FILE:

Create visual-regression.config.js:

module.exports = {
  project: {
    name: '[PROJECT_NAME]',
    type: 'plugin', // or 'theme'
    slug: '[project-slug]',
    version: '[current-version]'
  },

  blueprint: {
    path: '[path-to-blueprint.json]',
    timeout: 60000
  },

  tests: [
    {
      name: 'admin-settings',
      url: '/wp-admin/options-general.php?page=[plugin-page]',
      viewports: ['desktop'],
      waitFor: '.wrap',
      ignore: ['.notice', '.update-nag']
    },
    // More test definitions...
  ],

  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 }
  },

  comparison: {
    tool: 'playwright', // or 'pixelmatch', 'percy', etc.
    threshold: 0.1,
    ignoreAntialiasing: true,
    outputDiffFormat: ['overlay', 'side-by-side']
  },

  baselines: {
    directory: './visual-regression/baselines',
    storage: 'git', // or 's3', 'azure', 'artifact'
    versioning: true
  },

  reporting: {
    formats: ['html', 'json', 'markdown'],
    outputDir: './visual-regression/reports'
  },

  ci: {
    enabled: true,
    failOnDifference: true,
    notifications: {
      slack: process.env.SLACK_WEBHOOK,
      github: true
    }
  }
}
```

---

## Quick Start Guide

### 1. Initial Setup
```bash
npm install playwright @playwright/test pixelmatch
npx playwright install chromium
```

### 2. Create Baseline
```bash
npm run vrt:baseline
# Review screenshots in ./visual-regression/baselines
```

### 3. Make Changes
```bash
# Edit your plugin/theme code
```

### 4. Run Tests
```bash
npm run vrt:test
# Check ./visual-regression/reports/index.html
```

### 5. Review & Approve
```bash
npm run vrt:report
# Review diffs, then:
npm run vrt:approve  # if changes are intentional
```

---

## Use Cases by Project Type

### Simple Plugin (Settings Page)
Minimal configuration:
- 3-5 admin screens
- Desktop viewport only
- Basic threshold (0.1%)
- Manual approval
- Git storage

### Complex Plugin (Editor + Frontend)
Comprehensive testing:
- 10-20 screens
- All viewports
- Multiple user roles
- Automated approval for minor changes
- Cloud storage for baselines

### Theme
Extensive coverage:
- 20+ page templates
- All viewports
- Multiple post types
- Component variations
- Block patterns
- RTL support

### Block Plugin
Focused testing:
- Block editor states
- Block variations
- Block patterns
- Inspector controls
- Frontend renders

---

## CI/CD Integration Examples

### GitHub Actions
```yaml
name: Visual Regression Tests
on: [pull_request]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      # Download baselines
      - name: Download baselines
        uses: actions/download-artifact@v3
        with:
          name: vrt-baselines
          path: ./visual-regression/baselines

      # Run tests
      - name: Run visual regression tests
        run: npm run vrt:test

      # Upload results
      - name: Upload results
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: vrt-results
          path: ./visual-regression/reports

      # Comment on PR
      - name: Comment PR
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const summary = fs.readFileSync('./visual-regression/reports/summary.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: summary
            });
```

### GitLab CI
```yaml
visual-regression:
  stage: test
  image: mcr.microsoft.com/playwright:latest
  script:
    - npm install
    - npm run vrt:test
  artifacts:
    when: on_failure
    paths:
      - visual-regression/reports/
    expire_in: 1 week
  only:
    - merge_requests
```

---

## Best Practices

### ✅ DO:
- Start with critical user paths
- Use meaningful test names
- Document ignored regions
- Version your baselines
- Review changes before approving
- Automate baseline updates
- Keep thresholds tight
- Test responsive views
- Include loading states
- Test error conditions

### ❌ DON'T:
- Ignore legitimate failures
- Set thresholds too high (>1%)
- Skip responsive testing
- Store uncompressed images in git
- Approve changes blindly
- Test dynamic content without masking
- Forget to test user interactions
- Neglect accessibility
- Skip documentation

---

## Troubleshooting

**Problem: Too many false positives**
- Increase threshold slightly
- Add ignore regions for dynamic content
- Disable anti-aliasing comparison
- Use perceptual comparison

**Problem: Tests are slow**
- Enable parallel execution
- Cache WordPress Playground
- Use incremental testing
- Optimize image comparison

**Problem: Baselines out of sync**
- Version baselines with plugin/theme
- Use automated baseline updates
- Document visual changes
- Regular baseline audits

**Problem: Storage issues**
- Use Git LFS for large images
- Compress baseline images
- Clean up old reports
- Use cloud storage

---

## Success Metrics

Track these KPIs:
- Test coverage (% of screens tested)
- False positive rate (<5% goal)
- Average test runtime (<10 min goal)
- Baseline update frequency
- Bugs caught before production
- Time saved in manual QA

---

## Reference Documentation

**Visual Testing:**
- Playwright Visual Comparisons: https://playwright.dev/docs/test-snapshots
- Percy: https://docs.percy.io/
- Applitools: https://applitools.com/docs/
- Chromatic: https://www.chromatic.com/docs/

**Tools:**
- pixelmatch: https://github.com/mapbox/pixelmatch
- looks-same: https://github.com/gemini-testing/looks-same
- resemblejs: https://github.com/rsmbl/Resemble.js

**CI/CD:**
- GitHub Actions: https://docs.github.com/actions
- GitLab CI: https://docs.gitlab.com/ee/ci/
- CircleCI: https://circleci.com/docs/

---

*Template Version: 1.0*
*Created: 2025-12-09*
*Compatible with: WordPress 6.8+, Playwright 1.40+*
