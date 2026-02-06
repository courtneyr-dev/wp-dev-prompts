# WordPress Testing Automation: Complete AI Prompts Guide

Comprehensive prompt templates for setting up automated testing infrastructure across all 21 quality dimensions for WordPress plugins and themes. These prompts help you work with AI assistants to establish production-ready testing pipelines.

**Compatible with**: WordPress 6.7+ | PHP 8.2+ | Node 20+
**Enhanced with**: [WordPress/agent-skills](https://github.com/WordPress/agent-skills) - WordPress Agent Skills for AI assistants

---

## Table of Contents

1. [Quick Start Prompts](#quick-start-prompts)
2. [PHP Testing Prompts](#php-testing-prompts)
3. [JavaScript Testing Prompts](#javascript-testing-prompts)
4. [Security Testing Prompts](#security-testing-prompts)
5. [Accessibility Testing Prompts](#accessibility-testing-prompts)
6. [Performance Testing Prompts](#performance-testing-prompts)
7. [Code Quality Prompts](#code-quality-prompts)
8. [CI/CD Setup Prompts](#cicd-setup-prompts)
9. [Performance Profiling Prompts](#performance-profiling-prompts) *(NEW - from agent-skills)*
10. [Block Development Testing Prompts](#block-development-testing-prompts) *(NEW - from agent-skills)*

---

## Quick Start Prompts

### Initial Project Testing Setup

#### Context
Set up complete testing infrastructure for a WordPress plugin/theme from scratch.

#### Prompt
```markdown
I need to set up comprehensive automated testing for my WordPress [plugin/theme] called [PROJECT_NAME].

Project details:
- WordPress minimum version: [6.5]
- PHP minimum version: [8.0]
- Current directory structure: [describe or say "standard WordPress plugin structure"]
- Existing tests: [none/describe what exists]

Please create:
1. composer.json with all necessary dev dependencies (PHPUnit, PHPCS, PHPStan, security tools)
2. phpunit.xml configuration for unit and integration tests
3. .phpcs.xml.dist for WordPress Coding Standards
4. phpstan.neon for static analysis
5. tests/bootstrap.php for WordPress test integration
6. package.json with @wordpress/scripts and linting tools

Follow WordPress 6.7+ best practices and use Yoast PHPUnit Polyfills.
```

#### Variables to Customize
- `[plugin/theme]`: Type of project
- `[PROJECT_NAME]`: Your project name
- `[6.5]`, `[8.0]`: Minimum WordPress and PHP versions
- Directory structure details

#### Expected Output
- Complete configuration files for all testing tools
- Properly configured composer and npm dependencies
- Ready-to-use test bootstrap file
- Clear instructions for running tests locally

#### Notes
- Start with this prompt to establish the foundation
- Run `composer install` and `npm install` after files are created
- Test the setup with a simple unit test before proceeding

---

## PHP Testing Prompts

### 1. PHPUnit Unit Tests

#### Context
Create isolated unit tests for WordPress plugin classes and functions using WP_Mock.

#### Prompt
```markdown
Create PHPUnit unit tests for the following WordPress [class/function]:

[PASTE YOUR CODE HERE]

Requirements:
- Use WP_Mock for WordPress function mocking
- Test all public methods/functions
- Include edge cases and error conditions
- Mock all WordPress hooks (add_action, add_filter)
- Assert expected WordPress function calls
- Follow WordPress testing best practices
- Use Yoast PHPUnit Polyfills for compatibility

Test file should be named: tests/unit/[ClassName]Test.php
```

#### Variables to Customize
- `[class/function]`: Type of code being tested
- Code to test (paste actual code)
- Test file path

#### Expected Output
- Complete PHPUnit test class
- Proper setUp() and tearDown() methods
- Comprehensive test coverage for all scenarios
- Properly mocked WordPress functions

#### Notes
- Unit tests should NOT require WordPress to run
- Each test should be isolated and independent
- Use descriptive test method names (test_method_does_something_when_condition)

---

### 2. PHPUnit Integration Tests

#### Context
Create integration tests that run against actual WordPress installation.

#### Prompt
```markdown
Create PHPUnit integration tests for the following WordPress functionality:

Feature: [DESCRIBE FEATURE]
Code location: [FILE PATH]

The tests should:
- Run against actual WordPress (WP_TESTS_DIR)
- Test database interactions if applicable
- Verify hooks are registered correctly
- Test complete user workflows
- Include setup and teardown for clean test state

Integration test file: tests/integration/[FeatureName]IntegrationTest.php
```

#### Variables to Customize
- `[DESCRIBE FEATURE]`: What functionality you're testing
- `[FILE PATH]`: Location of code being tested
- Test file name

#### Expected Output
- Integration test class extending WP_UnitTestCase
- Database setup/cleanup in setUp() and tearDown()
- Tests verifying actual WordPress behavior
- Assertions for database state, hook execution, etc.

#### Notes
- Integration tests require WordPress test suite installed
- Run: `bash bin/install-wp-tests.sh wordpress_test root root localhost latest`
- Slower than unit tests but more comprehensive

---

### 3. PHPCS Configuration

#### Context
Set up WordPress Coding Standards enforcement with custom rules.

#### Prompt
```markdown
Create a comprehensive .phpcs.xml.dist configuration for my WordPress [plugin/theme].

Project details:
- Text domain: [your-text-domain]
- Function prefix: [your_prefix]
- Constant prefix: [YOUR_PREFIX]
- Minimum WP version: [6.5]
- PHP compatibility: [8.0-8.3]

Include:
- WordPress-Extra ruleset
- WordPress-Docs ruleset
- PHPCompatibilityWP checks
- Security sniffs (EscapeOutput, NonceVerification, ValidatedSanitizedInput)
- I18n checks with text domain enforcement
- Prefix checks for globals
- Exclusions for vendor/, node_modules/, build/, tests/
- Parallel execution support
- Cache configuration

Make it strict but practical for production use.
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- `[your-text-domain]`: Your i18n text domain
- `[your_prefix]`, `[YOUR_PREFIX]`: Code prefixes
- Version numbers

#### Expected Output
- Complete .phpcs.xml.dist file
- All rulesets properly configured
- Appropriate exclusions set
- Performance optimizations enabled

#### Notes
- Run with: `./vendor/bin/phpcs`
- Auto-fix with: `./vendor/bin/phpcbf`
- Use inline `// phpcs:ignore` comments sparingly for legitimate exceptions

---

### 4. PHPStan Configuration

#### Context
Set up static analysis with WordPress-specific type checking.

#### Prompt
```markdown
Create a phpstan.neon configuration file for WordPress [plugin/theme] static analysis.

Requirements:
- Start at level [5] (increase to 9 over time)
- Include szepeviktor/phpstan-wordpress extension
- Analyze: [src/, includes/, plugin-name.php]
- Exclude: [vendor/, node_modules/, tests/]
- Enable parallel processing (8 processes)
- Disable checkMissingIterableValueType for WordPress compatibility
- Report unmatched ignored errors

The project uses:
- WordPress 6.7+
- PHP 8.2+
- [List any specific WordPress APIs heavily used: REST API, Block Editor, etc.]
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- `[5]`: PHPStan level (5-9)
- Paths to analyze
- Excluded paths
- WordPress APIs used

#### Expected Output
- Complete phpstan.neon configuration
- WordPress stubs integration
- Appropriate strictness level
- Performance optimizations

#### Notes
- Start at level 5, increase gradually as you fix issues
- Run with: `./vendor/bin/phpstan analyse`
- Level 9 is very strict but catches most bugs

---

### 5. Psalm Configuration (Optional)

#### Context
Add Psalm static analysis with taint tracking for security.

#### Prompt
```markdown
Create a psalm.xml configuration for WordPress security taint analysis.

Project: [PROJECT_NAME]
Analyze: [src/, includes/, plugin-name.php]

Include:
- humanmade/psalm-plugin-wordpress
- Taint analysis for SQL injection, XSS, and unvalidated redirects
- Track taint sources: $_GET, $_POST, $_REQUEST, $_SERVER
- Track taint sinks: echo, print, $wpdb->query, wp_redirect
- Error level: [3]
- Report mixed types and unused code

Focus on security vulnerabilities.
```

#### Variables to Customize
- `[PROJECT_NAME]`: Your project name
- Paths to analyze
- `[3]`: Error level (1-8)

#### Expected Output
- Complete psalm.xml configuration
- WordPress plugin integration
- Taint analysis rules configured
- Security-focused checks enabled

#### Notes
- Psalm and PHPStan can run side-by-side
- Run taint analysis: `./vendor/bin/psalm --taint-analysis`
- Complementary to PHPStan, catches different issues

---

## JavaScript Testing Prompts

### 6. ESLint Configuration

#### Context
Set up ESLint with WordPress standards for JavaScript and React.

#### Prompt
```markdown
Create ESLint configuration for WordPress [plugin/theme] JavaScript code.

Project uses:
- [React/Vanilla JavaScript]
- [@wordpress/scripts]
- [TypeScript: yes/no]
- Block editor components: [yes/no]

Requirements:
- Extend @wordpress/eslint-plugin/recommended
- Set globals: wp, jQuery, ajaxurl
- Enforce i18n text domain: [your-text-domain]
- Enable @wordpress/no-unsafe-wp-apis rule
- Configure for test files (Jest/Playwright)
- [If TypeScript] Add TypeScript support
- Support both .js and .jsx files

File structure:
- Source files: [src/]
- Build output: [build/]
- Test files: [tests/]
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- JavaScript framework used
- TypeScript usage
- `[your-text-domain]`: i18n text domain
- Directory paths

#### Expected Output
- Complete .eslintrc.js configuration
- WordPress-specific rules enabled
- Test environment overrides
- TypeScript configuration if needed

#### Notes
- Run with: `npm run lint:js`
- Auto-fix with: `npm run lint:js:fix`
- Integrated with @wordpress/scripts

---

### 7. Jest Unit Tests (JavaScript)

#### Context
Create JavaScript unit tests for WordPress blocks or frontend code.

#### Prompt
```markdown
Create Jest unit tests for the following JavaScript [component/function]:

[PASTE YOUR CODE HERE]

Context:
- Uses: [@wordpress/components, @wordpress/data, React, etc.]
- Purpose: [describe what it does]
- Location: [src/path/to/file.js]

Requirements:
- Use @testing-library/react for components
- Mock WordPress dependencies (@wordpress/data, @wordpress/block-editor)
- Test all user interactions
- Test edge cases and error states
- Mock API calls if applicable
- Achieve 80%+ code coverage

Test file: [src/path/to/file.test.js]
```

#### Variables to Customize
- `[component/function]`: What you're testing
- Code to test
- WordPress dependencies used
- File paths

#### Expected Output
- Complete Jest test file
- Proper mocking of WordPress APIs
- Comprehensive test scenarios
- Clear test descriptions

#### Notes
- Run with: `npm run test:unit`
- Watch mode: `npm run test:unit:watch`
- @wordpress/scripts includes Jest configuration

---

### 8. Stylelint Configuration

#### Context
Set up CSS/SCSS linting with WordPress standards.

#### Prompt
```markdown
Create Stylelint configuration for WordPress [plugin/theme] stylesheets.

Project details:
- CSS preprocessor: [Sass/SCSS/PostCSS/none]
- CSS methodology: [BEM/utility/custom]
- Editor styles: [yes/no]
- Block styles: [yes/no]

Requirements:
- Extend @wordpress/stylelint-config[/scss] based on preprocessor
- Enforce tab indentation (WordPress standard)
- Allow kebab-case and wp-block-* class patterns
- Ignore build/, node_modules/, *.min.css
- Enable auto-fixing where possible

Analyze: [src/**/*.{css,scss}]
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- CSS preprocessor used
- CSS methodology
- File patterns to lint

#### Expected Output
- Complete .stylelintrc.json configuration
- WordPress style rules enforced
- Appropriate pattern matching
- Ignore patterns set

#### Notes
- Run with: `npm run lint:css`
- Auto-fix with: `npm run lint:css:fix`
- Block editor has specific style requirements

---

### 9. TypeScript Configuration (Optional)

#### Context
Set up TypeScript for WordPress block development.

#### Prompt
```markdown
Create TypeScript configuration for WordPress block development.

Project uses:
- @wordpress/scripts (includes webpack config)
- React components for blocks
- WordPress packages: [list: @wordpress/blocks, @wordpress/components, etc.]
- Target: [modern browsers supporting ES2020+]

Requirements:
- Set jsx: "react-jsx" for automatic runtime
- Enable strict mode
- Skip lib checking for faster compilation
- Include WordPress type definitions
- Set moduleResolution: "bundler"
- Include src/, exclude build/ and node_modules/
- Configure for @wordpress/scripts build system

Create both tsconfig.json for IDE and build integration.
```

#### Variables to Customize
- WordPress packages used
- Source directory structure
- Browser target

#### Expected Output
- Complete tsconfig.json
- WordPress types configured
- Strict mode enabled
- Build system integration

#### Notes
- @wordpress/scripts v28+ has built-in TypeScript support
- Types available: `npm install --save-dev @types/wordpress__*`
- No compilation needed - webpack handles it

---

## Security Testing Prompts

### 10. Security Scanning Setup

#### Context
Configure security scanning for vulnerabilities and code issues.

#### Prompt
```markdown
Set up comprehensive security scanning for WordPress [plugin/theme].

Requirements:

1. PHPCS Security Sniffs:
   - WordPress.Security.EscapeOutput
   - WordPress.Security.ValidatedSanitizedInput
   - WordPress.Security.NonceVerification
   - WordPress.DB.PreparedSQL
   - WordPress.DB.PreparedSQLPlaceholders
   - Make these errors (not warnings)

2. Composer Security Audit:
   - Add roave/security-advisories to require-dev
   - Configure composer audit command

3. NPM Security Audit:
   - Configure audit levels and exceptions

4. Psalm Taint Analysis:
   - Track $_GET, $_POST to echo, $wpdb->query
   - Identify unvalidated redirects

Create the complete configuration and provide commands to run each check.
```

#### Variables to Customize
- `[plugin/theme]`: Project type

#### Expected Output
- Enhanced .phpcs.xml.dist with security rules
- Composer configuration for security advisories
- NPM audit configuration
- Psalm taint analysis setup
- Command reference for running scans

#### Notes
- Security checks should be mandatory in CI
- Run before every commit
- Zero tolerance for critical/high vulnerabilities

---

### 11. Nonce and Capability Validation

#### Context
Create prompts for generating secure WordPress code with proper authorization.

#### Prompt
```markdown
Review the following WordPress code for security issues:

[PASTE CODE HERE]

Check for:
1. Missing nonce verification on form submissions
2. Missing capability checks before privileged operations
3. Direct $_POST/$_GET usage without sanitization
4. Output without escaping
5. Direct database queries without $wpdb->prepare()
6. Unvalidated file operations
7. Missing authentication checks on AJAX handlers

For each issue found:
- Explain the vulnerability
- Provide the corrected code
- Show the specific WordPress functions to use

Follow WordPress VIP security standards.
```

#### Variables to Customize
- Code to review

#### Expected Output
- Detailed security analysis
- Specific vulnerabilities identified
- Corrected code examples
- WordPress security functions to use

#### Notes
- Use for manual code review
- Run PHPCS security sniffs for automated checking
- All admin actions need nonce + capability checks

---

### 12. Sanitization and Escaping

#### Context
Generate proper sanitization and escaping for WordPress code.

#### Prompt
```markdown
Add proper sanitization and escaping to this WordPress code:

[PASTE CODE HERE]

For each input, use:
- sanitize_text_field() for simple text
- sanitize_email() for emails
- sanitize_url() for URLs
- sanitize_textarea_field() for multiline text
- wp_kses_post() for HTML content
- absint() for positive integers

For each output, use:
- esc_html() for HTML content
- esc_attr() for HTML attributes
- esc_url() for URLs
- esc_js() for JavaScript strings
- wp_kses_post() for allowed HTML

Show before/after for each change.
```

#### Variables to Customize
- Code to sanitize/escape

#### Expected Output
- Properly sanitized input handling
- Properly escaped output
- Clear before/after comparison
- Explanation of function choices

#### Notes
- Different functions for different data types
- Always sanitize on input, escape on output
- Use most restrictive function that works

---

## Accessibility Testing Prompts

### 13. Automated Accessibility Testing

#### Context
Set up automated WCAG 2.1 AA compliance testing with axe-core.

#### Prompt
```markdown
Create automated accessibility tests for WordPress [plugin/theme] using Playwright and axe-core.

Pages/components to test:
- [List admin pages, settings screens, frontend components]

Requirements:
- Use @axe-core/playwright
- Test against WCAG 2.1 Level AA standards
- Exclude #wpadminbar from scans (core WordPress element)
- Test both desktop and mobile viewports
- Generate HTML reports for violations
- Include color contrast checks
- Verify keyboard navigation

Create tests in: tests/accessibility.spec.js

Provide:
1. Complete test file
2. Playwright configuration
3. Commands to run tests
4. Example of interpreting results
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- Pages/components to test

#### Expected Output
- Complete Playwright test file with axe-core
- Playwright configuration
- Test execution commands
- Documentation on fixing common violations

#### Notes
- Run in CI but don't block on warnings initially
- Aim for zero violations before release
- Manual testing still required for keyboard navigation

---

### 14. Keyboard Navigation Testing

#### Context
Create manual test procedures for keyboard accessibility.

#### Prompt
```markdown
Create a keyboard navigation testing checklist for [SPECIFIC FEATURE/PAGE].

Feature: [describe feature]
Interactive elements: [buttons, links, form fields, modals, etc.]

Generate test cases for:
- Tab order (should follow visual order)
- Focus indicators (visible for all interactive elements)
- Enter/Space key activation for buttons
- ESC key to close modals/dropdowns
- Arrow keys for navigation where appropriate
- Shift+Tab for reverse navigation
- No keyboard traps
- Skip links where appropriate

Format as checklist with pass/fail for each test.
```

#### Variables to Customize
- Feature or page to test
- Interactive elements present

#### Expected Output
- Detailed keyboard navigation checklist
- Expected behavior for each interaction
- Pass/fail criteria
- Common issues and fixes

#### Notes
- Manual testing required - can't fully automate
- Test with actual keyboard users when possible
- Focus indicators must be visible

---

## Performance Testing Prompts

### 15. Lighthouse CI Configuration

#### Context
Set up performance testing with Lighthouse CI and budgets.

#### Prompt
```markdown
Create Lighthouse CI configuration for WordPress [plugin/theme].

URLs to test:
- [Homepage: http://localhost:8080/]
- [Admin page: http://localhost:8080/wp-admin/]
- [Custom page: specify any custom routes]

Requirements:
- Run 3 times per URL for consistency
- Test desktop preset
- Set performance budgets:
  - Performance score: minimum 60 (warn)
  - Accessibility score: minimum 90 (error)
  - LCP: maximum 4000ms
  - CLS: maximum 0.1
  - Color contrast: error
  - Image alt text: error

Create lighthouserc.js configuration.
Provide GitHub Actions integration.
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- URLs to test
- Performance thresholds

#### Expected Output
- Complete lighthouserc.js file
- Performance budget configuration
- CI integration snippet
- Commands to run locally

#### Notes
- Requires running WordPress instance (use wp-env)
- Adjust budgets based on project type
- Performance score varies by hardware

---

### 16. Code Complexity Analysis

#### Context
Analyze code complexity and maintainability.

#### Prompt
```markdown
Add complexity checks to PHPCS configuration for code quality scoring.

Enable these sniffs:
- Generic.Metrics.CyclomaticComplexity (threshold: 10)
- Generic.Metrics.NestingLevel (threshold: 5)
- Generic.Files.LineLength (threshold: 120)
- Generic.Metrics.NPathComplexity (threshold: 200)

For the following files:
[src/, includes/, plugin-name.php]

Exclude:
- Tests (acceptable higher complexity)
- Third-party code
- Generated files

Provide updated .phpcs.xml.dist section.
```

#### Variables to Customize
- Complexity thresholds
- Files to analyze
- Exclusions

#### Expected Output
- PHPCS configuration with complexity rules
- Appropriate thresholds set
- Exclusions configured

#### Notes
- High complexity = harder to maintain/test
- Refactor functions exceeding thresholds
- Tests can have higher complexity

---

## Code Quality Prompts

### 17. Internationalization (i18n) Validation

#### Context
Ensure all strings are properly translatable.

#### Prompt
```markdown
Audit this WordPress code for i18n compliance:

[PASTE CODE HERE]

Check for:
1. All user-facing strings wrapped in i18n functions
   - __() for translation
   - _e() for translation and echo
   - _n() for plural forms
   - _x() for context
   - esc_html__(), esc_html_e() for escaped output

2. Correct text domain: [your-text-domain]
3. No variable text domains
4. No concatenated translation strings
5. Translator comments for complex strings
6. Proper plural form handling

For each issue:
- Show the problem
- Provide corrected code
- Explain the fix

Also provide the WP-CLI command to generate .pot file.
```

#### Variables to Customize
- Code to audit
- `[your-text-domain]`: Your text domain

#### Expected Output
- Detailed i18n audit
- Corrected code examples
- POT file generation command
- Best practices explanation

#### Notes
- PHPCS can catch many i18n issues automatically
- Run: `wp i18n make-pot . languages/your-plugin.pot`
- Test with Loco Translate or Poedit

---

### 18. Enqueueing Pattern Validation

#### Context
Verify proper script and style enqueueing.

#### Prompt
```markdown
Review this WordPress code for proper asset enqueueing:

[PASTE CODE HERE]

Check for:
1. All scripts/styles use wp_enqueue_script/wp_enqueue_style
2. Registered before enqueueing
3. Proper dependencies declared
4. Version numbers for cache busting
5. Correct hook (wp_enqueue_scripts, admin_enqueue_scripts)
6. Localized scripts for AJAX/variables
7. No hardcoded <script> or <link> tags
8. Conditional loading (don't load everywhere)
9. Async/defer attributes where appropriate

Provide:
- Issues found
- Corrected code
- Best practices explanation
```

#### Variables to Customize
- Code to review

#### Expected Output
- Enqueueing pattern audit
- Corrected code
- Dependency declarations
- Localization examples

#### Notes
- PHPCS WordPress.WP.EnqueuedResources catches many issues
- Block editor has different enqueueing patterns
- Always version your assets

---

### 19. Deprecated Function Detection

#### Context
Find and replace deprecated WordPress functions.

#### Prompt
```markdown
Scan this code for deprecated WordPress functions:

[PASTE CODE HERE or specify: "scan entire project"]

For WordPress version: [6.7]

Check against:
- Official deprecation list
- Functions marked with _deprecated_function()
- Common outdated patterns

For each deprecated function:
- Show the usage
- Provide the modern replacement
- Explain the migration
- Note any behavior changes

Also check for:
- jQuery deprecated methods
- Old block editor APIs
- Deprecated REST API patterns
```

#### Variables to Customize
- Code to scan or "entire project"
- WordPress version

#### Expected Output
- List of deprecated functions found
- Replacement functions
- Migration guide for each
- Updated code examples

#### Notes
- PHPStan with WordPress stubs catches many
- Test thoroughly after updating
- Some deprecations have behavior changes

---

## CI/CD Setup Prompts

### 20. GitHub Actions Workflow

#### Context
Create complete GitHub Actions CI/CD workflow for WordPress testing.

#### Prompt
```markdown
Create a comprehensive GitHub Actions workflow for WordPress [plugin/theme]: [PROJECT_NAME]

Requirements:

1. **Lint Job** (runs first):
   - PHP: PHPCS, PHPStan
   - JavaScript: ESLint
   - CSS: Stylelint
   - PHP version: 8.2
   - Parallel execution

2. **PHPUnit Job** (after lint):
   - Matrix: PHP [8.0, 8.1, 8.2, 8.3] × WordPress [6.5, 6.6, 6.7, trunk]
   - MySQL service (MariaDB 10.11)
   - Code coverage on PHP 8.2 + WP 6.7
   - Upload to Codecov

3. **JavaScript Tests**:
   - Jest unit tests
   - Node 20

4. **Plugin Check Job**:
   - wordpress/plugin-check-action
   - Validate i18n, readme, headers, escaping, enqueuing

5. **Security Job**:
   - composer audit
   - npm audit
   - Trivy filesystem scan
   - Upload SARIF to GitHub Security

6. **Accessibility Job** (optional):
   - Playwright + axe-core
   - Lighthouse CI

7. **Deploy Job** (on tags only):
   - Requires all tests pass
   - Build production assets
   - Deploy to WordPress.org

Triggers:
- Push to main/develop (skip on *.md, docs/**)
- Pull requests
- Concurrency: cancel in-progress on new push

Create complete .github/workflows/ci.yml
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- `[PROJECT_NAME]`: Your project name
- PHP versions to test
- WordPress versions to test
- Jobs to include/exclude

#### Expected Output
- Complete GitHub Actions workflow file
- All jobs properly configured
- Matrix strategy for multi-version testing
- Caching for performance
- Security scanning integration
- Deployment automation

#### Notes
- Split into separate workflow files if too large
- Use secrets for Codecov, WordPress.org credentials
- Test workflow on a branch before merging

---

### 21. Dependabot Configuration

#### Context
Set up automatic dependency updates with Dependabot.

#### Prompt
```markdown
Create Dependabot configuration for WordPress [plugin/theme] with:

1. **Composer dependencies**:
   - Check weekly
   - Group WordPress packages together
   - Group dev dependencies together
   - Prefix commits with "build(composer):"
   - Auto-merge patch updates for dev dependencies

2. **NPM dependencies**:
   - Check weekly
   - Group @wordpress packages together
   - Group dev dependencies together
   - Prefix commits with "build(npm):"
   - Auto-merge patch updates

3. **GitHub Actions**:
   - Check monthly
   - Keep actions up to date

Create .github/dependabot.yml with grouping strategies to minimize PR spam.
Also provide GitHub Actions workflow for auto-merge if tests pass.
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- Update frequency
- Grouping strategy
- Auto-merge rules

#### Expected Output
- Complete .github/dependabot.yml
- Dependency grouping configuration
- Auto-merge workflow (optional)
- Update schedule configuration

#### Notes
- Reduces manual dependency management
- Groups related updates to reduce PRs
- Still requires review of major updates
- Auto-merge only safe for patch updates with good test coverage

---

### 22. Pre-commit Hooks

#### Context
Set up Husky pre-commit hooks for local validation.

#### Prompt
```markdown
Create Husky and lint-staged configuration for WordPress [plugin/theme].

Requirements:

1. **On pre-commit**:
   - Run PHPCS on staged .php files
   - Run ESLint on staged .{js,jsx,ts,tsx} files
   - Run Stylelint on staged .{css,scss} files
   - Auto-fix where possible
   - Run Prettier on staged files
   - Block commit if unfixable errors exist

2. **Configuration**:
   - .husky/pre-commit script
   - .lintstagedrc.json for file patterns
   - package.json scripts
   - Handle monorepo if applicable

3. **Commands**:
   - PHP: ./vendor/bin/phpcbf --standard=WordPress
   - JavaScript: wp-scripts lint-js --fix
   - CSS: wp-scripts lint-style --fix
   - Format: prettier --write

Make it fast (only check changed files) but thorough.
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- Linting tools to include
- Auto-fix behavior

#### Expected Output
- Husky installation command
- .husky/pre-commit script
- .lintstagedrc.json configuration
- package.json script updates
- Setup instructions

#### Notes
- Requires Node.js and npm install
- Run `npm run prepare` after install
- Can bypass with --no-verify if needed (emergency only)

---

### 23. Local Development Environment

#### Context
Set up wp-env for local testing.

#### Prompt
```markdown
Create wp-env configuration for WordPress [plugin/theme] development and testing.

Requirements:

1. **Development environment**:
   - WordPress: latest
   - PHP: 8.2
   - Port: 8888
   - Plugins: [Query Monitor, Debug Bar]
   - Theme: [Twenty Twenty-Five] (for plugin testing)

2. **Test environment**:
   - Port: 8889
   - PHP: 8.1 (test compatibility with older version)
   - Minimal setup for automated tests

3. **Configuration**:
   - WP_DEBUG: true
   - WP_DEBUG_LOG: true
   - SCRIPT_DEBUG: true
   - WP_ENVIRONMENT_TYPE: development

4. **Custom setup** (if needed):
   - Sample data import
   - Specific plugins required for testing
   - Database seed script

Create .wp-env.json configuration.
Provide start/stop commands and access URLs.
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- PHP versions
- Port numbers
- Required plugins/themes
- Debug settings

#### Expected Output
- Complete .wp-env.json file
- Start/stop commands
- Access URLs
- Setup instructions
- Integration with test suite

#### Notes
- Requires Docker installed
- Start: `npm run env:start`
- Access: http://localhost:8888 (admin: admin/password)
- Faster than local LAMP/MAMP setup

---

### 24. VS Code Workspace Settings

#### Context
Configure VS Code for WordPress development with all linting tools.

#### Prompt
```markdown
Create VS Code workspace settings for WordPress [plugin/theme] development.

Requirements:

1. **PHP**:
   - Enable PHPCS with WordPress standard
   - Auto-fix with PHPCBF on save
   - Intelephense with WordPress stubs
   - Format on save

2. **JavaScript**:
   - Enable ESLint
   - Auto-fix on save
   - Use @wordpress/eslint-plugin rules

3. **CSS**:
   - Enable Stylelint
   - Auto-fix on save

4. **Editor**:
   - Tab size: 4 for PHP, 2 for JS/CSS
   - Insert tabs (not spaces) per WordPress standards
   - Trim trailing whitespace
   - Insert final newline

5. **Extensions to recommend**:
   - List essential extensions

Create:
- .vscode/settings.json
- .vscode/extensions.json
- .editorconfig (for non-VS Code editors)
```

#### Variables to Customize
- `[plugin/theme]`: Project type
- Preferred extensions
- Format-on-save behavior

#### Expected Output
- Complete .vscode/settings.json
- .vscode/extensions.json with recommendations
- .editorconfig for consistency
- Extension installation instructions

#### Notes
- Settings apply only to this workspace
- Team members get recommended extensions automatically
- .editorconfig works with most editors

---

## Testing Workflow Order

### Recommended Sequence for New Projects

1. **Initial Setup** (Day 1)
   - Use [Quick Start Prompt](#initial-project-testing-setup)
   - Install dependencies: `composer install && npm install`
   - Set up wp-env: use [Local Environment Prompt](#23-local-development-environment)

2. **Configure Linting** (Day 1-2)
   - PHPCS: [Prompt #3](#3-phpcs-configuration)
   - ESLint: [Prompt #6](#6-eslint-configuration)
   - Stylelint: [Prompt #8](#8-stylelint-configuration)
   - Run initial scans, fix violations

3. **Add Static Analysis** (Day 2-3)
   - PHPStan: [Prompt #4](#4-phpstan-configuration)
   - Start at level 5, fix errors
   - Optional: Psalm for security: [Prompt #5](#5-psalm-configuration-optional)

4. **Write Tests** (Ongoing)
   - Unit tests first: [Prompt #1](#1-phpunit-unit-tests)
   - Integration tests: [Prompt #2](#2-phpunit-integration-tests)
   - JS tests: [Prompt #7](#7-jest-unit-tests-javascript)
   - Target 60%+ code coverage

5. **Security Scanning** (Week 1)
   - Configure security checks: [Prompt #10](#10-security-scanning-setup)
   - Run audits: `composer audit && npm audit`
   - Review code for security issues: [Prompt #11](#11-nonce-and-capability-validation)

6. **CI/CD Setup** (Week 1-2)
   - GitHub Actions: [Prompt #20](#20-github-actions-workflow)
   - Dependabot: [Prompt #21](#21-dependabot-configuration)
   - Pre-commit hooks: [Prompt #22](#22-pre-commit-hooks)

7. **Advanced Testing** (Week 2+)
   - Accessibility: [Prompt #13](#13-automated-accessibility-testing)
   - Performance: [Prompt #15](#15-lighthouse-ci-configuration)
   - Manual QA: Use provided checklist

8. **Continuous Improvement**
   - Increase PHPStan level gradually (5 → 9)
   - Add tests for new features
   - Monitor Dependabot PRs
   - Review security advisories

### Daily Development Workflow

**Before starting work:**
```bash
npm run env:start  # Start wp-env
composer install   # Update dependencies
npm install        # Update dependencies
```

**While coding:**
```bash
./vendor/bin/phpcs path/to/changed/file.php  # Quick PHPCS check
npm run lint:js                               # Quick JS check
./vendor/bin/phpunit --filter=FeatureTest     # Run specific test
```

**Before committing:**
```bash
composer lint      # Full PHP lint (PHPCS + PHPStan)
npm run lint       # Full JS/CSS lint
composer test      # Run all PHPUnit tests
npm run test:unit  # Run Jest tests
```

Pre-commit hooks will run automatically if configured.

**Before pushing:**
```bash
composer full-check  # Run everything
```

GitHub Actions will run full CI on push/PR.

### Pre-Release Workflow

**2 weeks before release:**
1. Run full test suite locally
2. Manual QA with provided checklist
3. Test on clean WordPress install
4. Test with popular plugins (conflict check)
5. Run accessibility audit
6. Run performance audit

**1 week before release:**
1. Security scan with latest tools
2. Update dependencies
3. Test on WordPress trunk (upcoming version)
4. Generate translation files
5. Update readme.txt

**Release day:**
1. Final test suite run
2. Version bump
3. Tag release
4. GitHub Actions deploys automatically

---

## Makefile for Easy Commands

### Context
Create Makefile for common testing commands.

#### Prompt
```markdown
Create a Makefile with convenient shortcuts for WordPress [plugin/theme] testing.

Include targets for:
- lint-php: Run PHPCS
- fix-php: Run PHPCBF
- analyze: Run PHPStan
- test-unit: Run PHPUnit unit tests
- test-integration: Run integration tests
- test-all: Run all PHP tests
- lint-js: ESLint
- fix-js: ESLint with --fix
- lint-css: Stylelint
- test-js: Jest
- coverage: PHPUnit with coverage report
- security: Run all security scans
- full-check: Run everything
- clean: Clean caches and builds

Make commands:
- Easy to remember
- Show progress
- Provide helpful output
```

#### Expected Output
```makefile
.PHONY: lint-php fix-php analyze test-unit test-integration test-all lint-js fix-js lint-css test-js coverage security full-check clean

lint-php:
	@echo "Running PHPCS..."
	./vendor/bin/phpcs

fix-php:
	@echo "Running PHPCBF..."
	./vendor/bin/phpcbf

analyze:
	@echo "Running PHPStan..."
	./vendor/bin/phpstan analyse

test-unit:
	@echo "Running PHPUnit unit tests..."
	./vendor/bin/phpunit --testsuite=unit

test-integration:
	@echo "Running PHPUnit integration tests..."
	./vendor/bin/phpunit --testsuite=integration

test-all:
	@echo "Running all PHPUnit tests..."
	./vendor/bin/phpunit

lint-js:
	@echo "Running ESLint..."
	npm run lint:js

fix-js:
	@echo "Running ESLint with auto-fix..."
	npm run lint:js:fix

lint-css:
	@echo "Running Stylelint..."
	npm run lint:css

test-js:
	@echo "Running Jest tests..."
	npm run test:unit

coverage:
	@echo "Generating code coverage report..."
	./vendor/bin/phpunit --coverage-html coverage

security:
	@echo "Running security scans..."
	composer audit
	npm audit
	./vendor/bin/psalm --taint-analysis

full-check: lint-php analyze test-all lint-js lint-css test-js security
	@echo "✓ All checks passed!"

clean:
	@echo "Cleaning caches and builds..."
	rm -rf .phpcs.cache
	rm -rf vendor
	rm -rf node_modules
	rm -rf build
	rm -rf coverage
```

---

## Pro Tips for Using These Prompts

### 1. Start Simple, Iterate
Don't try to implement everything at once. Start with linting (PHPCS, ESLint), add static analysis, then tests.

### 2. Copy-Paste Context
When using prompts, include:
- Your actual code
- Current project structure
- Existing configuration files
- Specific errors you're seeing

### 3. Test Configurations Immediately
After AI generates a config file:
```bash
composer install  # or npm install
./vendor/bin/phpcs --version  # verify installation
./vendor/bin/phpcs  # run actual check
```

### 4. Fix Issues Incrementally
Don't try to fix 1000 PHPCS violations at once:
```bash
# Fix one file at a time
./vendor/bin/phpcbf path/to/file.php

# Or fix by type
./vendor/bin/phpcs --sniffs=WordPress.Security.EscapeOutput
```

### 5. Use Baselines for Legacy Code
If adding testing to existing project with many issues:
```bash
# Create baseline (ignore existing issues)
./vendor/bin/phpcs --report=json > phpcs-baseline.json
./vendor/bin/phpstan analyse --generate-baseline
```

### 6. Customize Thresholds
Adjust strictness based on project phase:
- New project: Start strict (PHPStan level 8, zero warnings)
- Legacy project: Start lenient (level 5, warnings allowed)
- Gradually increase over time

### 7. CI Should Match Local
Ensure CI runs same checks as local:
- Same tool versions
- Same configuration files
- Same commands

### 8. Don't Block on Everything
Reasonable blocking checks in CI:
- ✅ PHPCS errors (not warnings)
- ✅ PHPStan at project level
- ✅ Security critical/high
- ✅ Test failures
- ❌ Performance suggestions (warn only)
- ❌ Accessibility warnings (error on violations)

---

## Common Issues and Solutions

### "PHPCS not found" after composer install
```bash
composer install --no-dev  # Don't do this
composer install           # Installs dev dependencies
```

### PHPUnit can't find WordPress test suite
```bash
# Install it first
bash bin/install-wp-tests.sh wordpress_test root root localhost latest

# Set environment variable
export WP_TESTS_DIR=/tmp/wordpress-tests-lib
```

### PHPStan errors about undefined WordPress functions
```php
// Missing extension in phpstan.neon
includes:
    - vendor/szepeviktor/phpstan-wordpress/extension.neon
```

### ESLint doesn't recognize WordPress globals
```javascript
// Add to .eslintrc.js
globals: {
    wp: 'readonly',
    jQuery: 'readonly',
    ajaxurl: 'readonly',
}
```

### Tests pass locally but fail in CI
```yaml
# Check PHP/WordPress versions match
strategy:
  matrix:
    php: ['8.2']  # Match your local version
    wordpress: ['6.7']  # Match your local version
```

### Coverage reports missing
```bash
# Enable PCOV or Xdebug
composer require --dev pcov/clobber
./vendor/bin/pcov clobber
```

---

## Next Steps

After setting up testing infrastructure:

1. **Read the full research document** for deep dives on each tool
2. **Create your first test** using the unit test prompt
3. **Set up GitHub Actions** for automated CI
4. **Add pre-commit hooks** for local validation
5. **Monitor Dependabot PRs** for security updates
6. **Gradually increase strictness** (PHPStan levels, coverage requirements)

### Additional Resources

- [WordPress Plugin Handbook - Testing](https://developer.wordpress.org/plugins/testing/)
- [WP-CLI Testing Framework](https://make.wordpress.org/cli/handbook/plugin-unit-tests/)
- [@wordpress/scripts Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- [GitHub Actions for WordPress](https://github.com/marketplace?query=wordpress)
- [WordPress/agent-skills](https://github.com/WordPress/agent-skills) - WordPress Agent Skills for AI assistants

---

## Performance Profiling Prompts

*(From [WordPress/agent-skills wp-performance](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-performance))*

### 25. WordPress Performance Profiling Setup

#### Context
Set up performance profiling infrastructure for diagnosing slow WordPress sites without browser access.

#### Prompt
```markdown
I need to set up performance profiling for my WordPress [plugin/theme/site] to diagnose slow performance.

Issue description:
- Slow TTFB on: [frontend/admin screens/REST endpoints]
- Suspected bottleneck: [queries/autoload/caching/cron/HTTP calls/unknown]
- Environment: [development/staging/production]

Please help me:
1. Establish baseline performance measurements using curl or WP-CLI
2. Run wp doctor check to identify common issues
3. Set up wp profile for deep profiling
4. Configure Query Monitor for headless debugging (REST API headers)
5. Create a systematic debugging workflow

Key areas to investigate:
- Database queries and autoloaded options
- Object cache effectiveness
- Remote HTTP call latency
- Cron task performance
- Hook execution time

Note: WordPress 6.9 includes on-demand CSS loading for classic themes (30-65% reduction).
Follow the "measure first, then optimize" approach from agent-skills.
```

#### Variables to Customize
- `[plugin/theme/site]`: What you're profiling
- Issue description specifics
- Environment details

#### Expected Output
- Baseline measurement commands
- WP-CLI profiling setup
- Query Monitor configuration
- Systematic debugging checklist

#### Notes
*(From [WordPress/agent-skills wp-performance](https://github.com/WordPress/agent-skills))*
- Always establish baseline before making changes
- Focus on the dominant bottleneck first
- Re-run measurements after each change to verify improvements
- Avoid production changes without explicit approval

---

### 26. WP-CLI Performance Diagnostics

#### Context
Use WP-CLI commands for performance diagnostics without browser access.

#### Prompt
```markdown
Help me diagnose performance issues on my WordPress site using WP-CLI.

Current symptoms:
- [Describe slow behavior: slow page loads, admin lag, API timeouts, etc.]

Please provide commands for:
1. Initial diagnostics with `wp doctor check`
2. Profile stage timing with `wp profile stage`
3. Hook execution profiling
4. Database query analysis
5. Autoload options review (look for bloat)
6. Object cache status check
7. Cron task analysis

Environment:
- WordPress version: [version]
- PHP version: [version]
- Object cache: [none/Redis/Memcached/other]
- Hosting: [shared/VPS/managed/other]

Follow systematic approach: diagnose → identify bottleneck → target optimization → verify.
```

#### Expected Output
- Complete WP-CLI command sequence
- Interpretation guidance for outputs
- Recommended follow-up actions
- Optimization suggestions based on findings

---

## Block Development Testing Prompts

*(From [WordPress/agent-skills wp-block-development](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-block-development))*

### 27. Block Validation and Deprecation Testing

#### Context
Set up testing for block validation, deprecation handling, and migration paths.

#### Prompt
```markdown
Create a testing strategy for my Gutenberg block to ensure proper validation and backward compatibility.

Block details:
- Block name: [namespace/block-name]
- Block type: [static/dynamic/interactive]
- Current apiVersion: [2/3]
- WordPress target: [6.9+]

Please create tests for:
1. Block inserter availability
2. Save/reload cycle validation (no "Invalid block" errors)
3. Frontend output accuracy
4. Asset loading verification
5. Attribute persistence
6. Deprecation migration paths

Important considerations from agent-skills:
- WordPress 7.0 will run post editor in iframe regardless of apiVersion
- Upgrade to apiVersion: 3 for WordPress 6.9+ compatibility
- Never change block names (breaks compatibility)
- Always add deprecations with migration paths when changing saved markup
- Maintain fixtures for each deprecated version

Test file: tests/e2e/blocks/[block-name].spec.js
```

#### Variables to Customize
- Block name and namespace
- Block type
- Current and target apiVersion
- WordPress version requirements

#### Expected Output
- Playwright E2E test suite for block validation
- Deprecation test patterns
- Migration verification tests
- Fixture examples for deprecated versions

#### Notes
*(From [WordPress/agent-skills wp-block-development](https://github.com/WordPress/agent-skills))*
- Keep example content samples (fixtures) for each deprecated version
- Prioritize migration paths: "When in doubt, add a migration path rather than silently changing selectors"

---

### 28. Interactivity API Testing

#### Context
Test WordPress Interactivity API directives and store behavior.

#### Prompt
```markdown
Create E2E tests for my block using the WordPress Interactivity API.

Block details:
- Block name: [namespace/block-name]
- Store namespace: [namespace]
- Directives used: [data-wp-interactive, data-wp-bind, data-wp-on, data-wp-context, etc.]

Please create tests for:
1. View script module loading verification
2. DOM elements have required data-wp-interactive attributes
3. Store namespace matches directive references
4. Hydration success (no JavaScript errors)
5. Client-side state management
6. Action/callback execution
7. Server-rendered markup + client hydration alignment

Important considerations from agent-skills:
- data-wp-ignore is deprecated in WordPress 6.9
- Server state resets between page transitions
- Ensure scoped and minimal directives
- Verify no JavaScript errors block hydration

Test file: tests/e2e/interactivity/[block-name].spec.js
```

#### Variables to Customize
- Block name and store namespace
- Directives being used
- Expected interactions

#### Expected Output
- Playwright tests for Interactivity API behavior
- Hydration verification tests
- Store state tests
- Directive functionality tests

#### Notes
*(From [WordPress/agent-skills wp-interactivity-api](https://github.com/WordPress/agent-skills))*
- For new interactive blocks, use `@wordpress/create-block-interactive-template`
- Check for JavaScript console errors that may block hydration
- Verify directive scoping is minimal and purposeful

---

## WP-CLI Operations Testing Prompts

*(From [WordPress/agent-skills wp-wpcli-and-ops](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-wpcli-and-ops))*

### 29. WP-CLI Migration Testing

#### Context
Test database migrations and URL replacements using WP-CLI.

#### Prompt
```markdown
Create a testing workflow for database migrations using WP-CLI.

Migration scenario:
- Operation: [search-replace/export/import/reset]
- Environment: [development/staging/production]
- Multisite: [yes/no]
- Source URL: [old-domain.com]
- Target URL: [new-domain.com]

Please create:
1. Pre-migration backup procedure
2. Dry-run test commands
3. Verification queries
4. Rollback procedure
5. Post-migration validation

Safety requirements from agent-skills:
- Always confirm execution environment before write operations
- Back up database for risky changes
- Follow three-step migration: export → dry-run → execute
- For multisite: explicitly decide single site (--url=) vs network-wide (--network)

Document each step with expected output.
```

#### Expected Output
- Complete WP-CLI command sequence with explanations
- Backup and restore procedures
- Dry-run verification approach
- Multisite-specific considerations

---

## Block Theme Testing Prompts

*(From [WordPress/agent-skills wp-block-themes](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-block-themes))*

### 30. Block Theme Style Debugging

#### Context
Debug theme.json styles that aren't applying or are being overridden.

#### Prompt
```markdown
Help me debug styling issues in my WordPress block theme.

Issue:
- [Describe what styles aren't applying]
- Expected behavior: [what should happen]
- Actual behavior: [what's happening instead]

Theme structure:
- Theme root: [path]
- Has child theme: [yes/no]
- theme.json version: [2/3]

Please help me:
1. Verify theme root identification (especially with multiple themes present)
2. Check WordPress style hierarchy: core defaults → theme.json → child theme → user customizations
3. Distinguish between settings (UI controls/presets) and styles (default appearance)
4. Verify template and parts are in correct directories (no nested parts subdirectories)
5. Check if user customizations are overriding theme defaults

Key debugging steps from agent-skills:
- Check if user Site Editor customizations are masking theme edits
- Verify settings vs styles distinction in theme.json
- Ensure template files are in templates/, parts in parts/ (not nested)

Provide systematic debugging approach.
```

#### Expected Output
- Diagnostic checklist
- Common issues and solutions
- theme.json validation steps
- Style hierarchy debugging approach

#### Notes
*(From [WordPress/agent-skills wp-block-themes](https://github.com/WordPress/agent-skills))*
- User customizations can mask theme edits - check this first
- Settings control UI options; styles control default appearance
- Templates go in templates/, parts go in parts/ (no subdirectory nesting)

---

## Contributing

Found a better prompt pattern? Have suggestions for additional testing scenarios?

Please contribute:
1. Fork the repository
2. Add your prompt following the established structure
3. Test it thoroughly
4. Submit a PR with examples

---

**Remember**: These prompts are starting points. Always review generated code, test thoroughly, and adapt to your specific needs. Testing infrastructure is an investment that pays off in code quality, security, and maintainability.

Happy testing! 🧪
