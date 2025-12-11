# Contributing to [PLUGIN_NAME]

First off, thank you for considering contributing to [PLUGIN_NAME]! It's people like you that make the WordPress community great.

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
3. [Getting Started](#getting-started)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Testing Requirements](#testing-requirements)
7. [Commit Guidelines](#commit-guidelines)
8. [Pull Request Process](#pull-request-process)
9. [Community](#community)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [CONTACT_EMAIL].

---

## How Can I Contribute?

### Reporting Bugs

**Before submitting a bug report:**
- Check the [existing issues](https://github.com/[GITHUB_USERNAME]/[PLUGIN_SLUG]/issues)
- Ensure you're using the latest version
- Check the [documentation](https://github.com/[GITHUB_USERNAME]/[PLUGIN_SLUG]#readme)

**Submit a bug report:**
1. Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md)
2. Provide a clear, descriptive title
3. Include steps to reproduce the issue
4. Describe expected vs. actual behavior
5. Include relevant details:
   - WordPress version
   - PHP version
   - Plugin version
   - Theme (if relevant)
   - Browser (if frontend issue)
   - Screenshots or videos (if applicable)

### Suggesting Enhancements

**Before suggesting an enhancement:**
- Check if it's already been suggested
- Ensure it fits the plugin's scope and purpose
- Consider implementation complexity

**Submit an enhancement request:**
1. Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md)
2. Explain the problem it solves
3. Describe your proposed solution
4. Provide examples or mockups
5. Explain alternatives you've considered

### Contributing Code

We welcome code contributions! Here's what we accept:

- **Bug fixes** - Fix reported issues
- **New features** - Add functionality (discuss first via issue)
- **Improvements** - Enhance existing features
- **Documentation** - Fix typos, clarify instructions
- **Tests** - Add or improve test coverage
- **Translations** - Help translate the plugin

---

## Getting Started

### Prerequisites

- Git
- PHP [MIN_PHP_VERSION]+ with Composer
- Node.js [MIN_NODE_VERSION]+ with npm
- WordPress [MIN_WP_VERSION]+
- Local development environment ([wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/), Local, MAMP, etc.)

### Fork and Clone

```bash
# 1. Fork the repository on GitHub (click "Fork" button)

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/[PLUGIN_SLUG].git
cd [PLUGIN_SLUG]

# 3. Add upstream remote
git remote add upstream https://github.com/[GITHUB_USERNAME]/[PLUGIN_SLUG].git

# 4. Verify remotes
git remote -v
```

### Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

# Set up WordPress test environment
bash bin/install-wp-tests.sh wordpress_test root '' localhost latest

# Start local WordPress environment (if using wp-env)
npm run env:start
```

---

## Development Workflow

### 1. Create a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Changes

- Write clean, readable code
- Follow [WordPress Coding Standards](#coding-standards)
- Add/update tests as needed
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run all tests
composer test

# Run linting
composer lint

# Run static analysis
composer analyze

# Run JavaScript tests
npm run test

# Test manually in WordPress
npm run env:start
# Visit http://localhost:8888
```

### 4. Commit Your Changes

Follow our [commit message guidelines](#commit-guidelines).

```bash
git add .
git commit -m "feat: add amazing new feature"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

---

## Coding Standards

We follow WordPress coding standards strictly.

### PHP Standards

- **WordPress Coding Standards** - [WPCS](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- **PHP_CodeSniffer** with WPCS ruleset
- **PHPStan** level [PHPSTAN_LEVEL] for static analysis
- **PHP Compatibility** - [MIN_PHP_VERSION]+

**Check your code:**

```bash
# Check for coding standard violations
composer lint
./vendor/bin/phpcs

# Auto-fix fixable issues
composer lint:fix
./vendor/bin/phpcbf

# Run static analysis
composer analyze
./vendor/bin/phpstan analyse
```

### JavaScript Standards

- **WordPress JavaScript Standards** - [@wordpress/eslint-plugin](https://www.npmjs.com/package/@wordpress/eslint-plugin)
- **ESLint** with WordPress configuration
- **Prettier** for code formatting

**Check your code:**

```bash
# Lint JavaScript
npm run lint:js

# Auto-fix issues
npm run lint:js:fix

# Format with Prettier
npm run format
```

### Key Guidelines

**PHP:**
```php
<?php
/**
 * File description.
 *
 * @package [PLUGIN_PACKAGE_NAME]
 */

// Use proper spacing
function [prefix]_example_function( $arg1, $arg2 ) {
    // Use tabs for indentation
    if ( condition ) {
        // Always use braces
        do_something();
    }

    // Escape output
    echo esc_html( $variable );

    // Sanitize input
    $clean = sanitize_text_field( $_POST['data'] );

    // Check capabilities
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    // Verify nonces
    if ( ! wp_verify_nonce( $_POST['nonce'], 'action_name' ) ) {
        return;
    }
}
```

**JavaScript:**
```javascript
/**
 * Function description.
 *
 * @param {string} arg1 Description.
 * @param {Object} arg2 Description.
 * @return {boolean} Description.
 */
function exampleFunction( arg1, arg2 ) {
    // Use camelCase
    const myVariable = 'value';

    // Use const/let, not var
    let counter = 0;

    // Use WordPress functions when available
    const { __ } = wp.i18n;
    const label = __( 'Translate me', '[TEXT_DOMAIN]' );

    return true;
}
```

---

## Testing Requirements

All contributions must include appropriate tests.

### Required Tests

**For Bug Fixes:**
- Add test that reproduces the bug
- Verify test fails before fix
- Verify test passes after fix

**For New Features:**
- Unit tests for new functions/classes
- Integration tests for WordPress interactions
- E2E tests for user-facing features (when applicable)

### Test Types

**PHPUnit Tests:**
```bash
# Run all tests
composer test
./vendor/bin/phpunit

# Run specific test
./vendor/bin/phpunit --filter=TestClassName

# Run with coverage
./vendor/bin/phpunit --coverage-html coverage/
```

**Jest Tests:**
```bash
# Run all JavaScript tests
npm run test:unit

# Run with coverage
npm run test:unit -- --coverage

# Watch mode
npm run test:unit -- --watch
```

**E2E Tests:**
```bash
# Run E2E tests
npm run test:e2e

# Run specific test
npm run test:e2e -- tests/e2e/feature.spec.js
```

### Coverage Requirements

- Minimum **80%** code coverage for new code
- All public methods must have tests
- All hooks (actions/filters) must have tests

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring (no functional changes)
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements
- `ci` - CI/CD changes

### Scopes (Optional)

Examples for this plugin:
- `admin` - Admin interface changes
- `api` - REST API changes
- `blocks` - Gutenberg blocks
- `settings` - Settings page
- `security` - Security-related changes
- `i18n` - Internationalization

### Examples

```bash
# Simple commit
git commit -m "feat: add new settings option"

# With scope
git commit -m "fix(admin): resolve PHP notice in settings page"

# With body and footer
git commit -m "feat(blocks): add custom block for testimonials

- Add block registration
- Create block edit component
- Add block save function
- Include block styles

Closes #123"

# Breaking change
git commit -m "feat!: update minimum PHP version to 8.0

BREAKING CHANGE: This plugin now requires PHP 8.0 or higher"
```

### Rules

✅ **DO:**
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Capitalize first letter of subject
- Keep subject line under 50 characters
- Wrap body at 72 characters
- Reference issues and PRs in footer

❌ **DON'T:**
- End subject line with period
- Use vague messages ("Update files", "Fix bug")
- Commit multiple unrelated changes together
- Include WIP commits in PRs

---

## Pull Request Process

### Before Submitting

**Checklist:**
- [ ] Code follows WordPress Coding Standards
- [ ] All tests pass locally
- [ ] Added tests for new features/fixes
- [ ] Updated relevant documentation
- [ ] Commits follow commit guidelines
- [ ] Branch is up to date with main
- [ ] No merge conflicts
- [ ] Self-reviewed all changes

**Run final checks:**
```bash
# Run all checks
composer lint && composer analyze && composer test
npm run lint && npm run test

# Or use this shortcut (if available)
composer check-all
npm test
```

### Creating Pull Request

1. **Push your branch:**
   ```bash
   git push origin feature/your-branch-name
   ```

2. **Create PR on GitHub:**
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template completely
   - Link related issues

3. **PR Title Format:**
   ```
   <type>(<scope>): Brief description
   ```

   Examples:
   - `feat(admin): Add bulk actions for custom post type`
   - `fix(security): Resolve XSS vulnerability in search`
   - `docs: Update installation instructions`

4. **PR Description:**
   Use the provided template and include:
   - Clear description of changes
   - Reason for changes
   - Testing performed
   - Screenshots (for UI changes)
   - Breaking changes (if any)
   - Related issues

### Review Process

**What to expect:**
1. Automated checks run (CI/CD)
2. Code review by maintainer(s)
3. Feedback and requested changes
4. Additional commits (if needed)
5. Approval and merge

**During review:**
- Respond to feedback promptly
- Make requested changes
- Push additional commits to same branch
- Mark conversations as resolved
- Be open to suggestions

**After approval:**
- Maintainer will merge your PR
- Your branch can be deleted
- Changes will be included in next release

### After Merge

1. **Update your fork:**
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. **Delete your branch:**
   ```bash
   git branch -d feature/your-branch-name
   git push origin --delete feature/your-branch-name
   ```

3. **Celebrate!** 🎉 You've contributed to [PLUGIN_NAME]!

---

## Community

### Getting Help

**Questions about contributing?**
- Check [SUPPORT.md](SUPPORT.md)
- Open a [Discussion](https://github.com/[GITHUB_USERNAME]/[PLUGIN_SLUG]/discussions)
- Ask in [WordPress Slack](https://make.wordpress.org/chat/)

**Found a security issue?**
- **DO NOT** open a public issue
- Follow our [Security Policy](SECURITY.md)
- Email [SECURITY_EMAIL]

### Recognition

Contributors are recognized in:
- [Contributors list](https://github.com/[GITHUB_USERNAME]/[PLUGIN_SLUG]/graphs/contributors)
- Plugin changelog
- Release notes (for significant contributions)

### Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

---

## Development Tools

### Recommended IDE Setup

**Visual Studio Code:**
- [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)
- [PHPStan](https://marketplace.visualstudio.com/items?itemName=swordev.phpstan)
- [WordPress Snippets](https://marketplace.visualstudio.com/items?itemName=wordpresstoolbox.wordpress-toolbox)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

**PHPStorm:**
- WordPress plugin
- PHP_CodeSniffer plugin
- PHPStan plugin

### Pre-commit Hooks

We use [lint-staged](https://github.com/okonet/lint-staged) with [Husky](https://typicode.github.io/husky/) for pre-commit hooks.

**Setup:**
```bash
# Install dependencies
npm install

# Hooks are installed automatically
```

**What runs on commit:**
- PHPCS on staged PHP files
- ESLint on staged JS files
- PHPStan on staged PHP files
- Prettier on staged files

---

## FAQ

**Q: I'm new to WordPress plugin development. Can I still contribute?**
A: Absolutely! Start with documentation improvements, bug reports, or small bug fixes. Check issues labeled `good first issue`.

**Q: Do I need to sign a CLA?**
A: [YES/NO - Update based on your requirements]

**Q: How long do PRs take to review?**
A: We aim to review within 3-7 days. Complex changes may take longer.

**Q: Can I work on an issue that's already assigned?**
A: Please ask first. If there's been no activity for 2+ weeks, we may reassign.

**Q: My PR was rejected. What now?**
A: Don't take it personally! Ask for feedback, learn from it, and try again. Not all contributions fit the project's direction.

**Q: How do I run tests locally?**
A: See the [Testing Requirements](#testing-requirements) section above.

**Q: What if I make a mistake in my PR?**
A: No problem! Just push another commit to fix it. We can help guide you.

**Q: Can I add a new dependency?**
A: Maybe. Open an issue first to discuss. We keep dependencies minimal.

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project: [LICENSE_TYPE] (see [LICENSE](LICENSE) file).

---

## Thank You!

Your contributions make [PLUGIN_NAME] better for everyone in the WordPress community.

**Happy coding!** 🚀

---

## Variables to Customize

When using this template, replace the following placeholders:

- `[PLUGIN_NAME]` - Your plugin's display name
- `[GITHUB_USERNAME]` - Your GitHub username or organization
- `[PLUGIN_SLUG]` - Your plugin's slug (repository name)
- `[CONTACT_EMAIL]` - Email for general contact
- `[SECURITY_EMAIL]` - Email for security issues
- `[MIN_PHP_VERSION]` - Minimum PHP version (e.g., 8.0)
- `[MIN_NODE_VERSION]` - Minimum Node.js version (e.g., 18.0)
- `[MIN_WP_VERSION]` - Minimum WordPress version (e.g., 6.5)
- `[PHPSTAN_LEVEL]` - PHPStan level (e.g., 5)
- `[PLUGIN_PACKAGE_NAME]` - PHP package name (e.g., YourName\PluginName)
- `[prefix]` - Your plugin's function prefix (e.g., myplugin)
- `[TEXT_DOMAIN]` - Your plugin's text domain (e.g., my-plugin)
- `[LICENSE_TYPE]` - Your license type (e.g., GPL-2.0-or-later)

---

**Last Updated:** [DATE]
**Version:** 1.0.0
