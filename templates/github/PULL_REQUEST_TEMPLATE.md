## Description

<!-- Provide a clear and concise description of your changes -->

## Type of Change

<!-- Check all that apply -->

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that breaks existing functionality)
- [ ] 📝 Documentation update
- [ ] 🎨 Code style/formatting (no functional changes)
- [ ] ♻️ Refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] ✅ Test updates
- [ ] 🔧 Build/CI configuration
- [ ] 🌐 Translation/i18n

## Related Issues

<!-- Link related issues. Use "Closes #123" to auto-close issues when PR merges -->

- Closes #
- Related to #
- Fixes #

## Motivation and Context

<!-- Why is this change needed? What problem does it solve? -->

## Changes Made

<!-- Detailed list of changes made in this PR -->

### Added
-

### Changed
-

### Removed
-

### Fixed
-

## Screenshots (if applicable)

<!-- Add screenshots or videos to demonstrate UI changes -->

**Before:**


**After:**


## Testing Performed

<!-- Describe the tests you ran to verify your changes -->

### Test Environment

- WordPress: [e.g., 6.5.2]
- PHP: [e.g., 8.2.15]
- Plugin Version: [e.g., 1.2.3 + this PR]
- Theme: [e.g., Twenty Twenty-Four]
- Browser(s): [e.g., Chrome 120, Firefox 121]

### Manual Testing

<!-- Describe manual testing you performed -->

- [ ] Tested feature X works as expected
- [ ] Tested with other plugins active (no conflicts)
- [ ] Tested with default theme
- [ ] Tested in different browsers
- [ ] Tested on mobile/tablet (if UI changes)
- [ ] Tested with multisite (if applicable)

### Automated Testing

<!-- Check all that apply -->

- [ ] All PHPUnit tests pass (`composer test`)
- [ ] All Jest tests pass (`npm run test:unit`)
- [ ] PHPCS passes (`composer lint`)
- [ ] ESLint passes (`npm run lint`)
- [ ] PHPStan passes (`composer analyze`)
- [ ] E2E tests pass (`npm run test:e2e`) (if applicable)
- [ ] Added new tests for this change
- [ ] Existing tests updated for this change

### Test Results

<details>
<summary>Click to expand test output</summary>

```bash
# Paste relevant test output here
```

</details>

## Code Quality Checklist

<!-- Ensure your code meets quality standards -->

### WordPress Standards

- [ ] Follows [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- [ ] Follows [WordPress JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/)
- [ ] All functions have proper DocBlocks
- [ ] All strings are internationalized (i18n ready)
- [ ] Text domain is correct (`[TEXT_DOMAIN]`)
- [ ] Proper escaping for output (`esc_html()`, `esc_url()`, etc.)
- [ ] Proper sanitization for input (`sanitize_text_field()`, etc.)
- [ ] Nonces verified for all forms/AJAX
- [ ] Capabilities checked for all privileged operations

### Security

- [ ] No SQL injection vulnerabilities (using `$wpdb->prepare()`)
- [ ] No XSS vulnerabilities (proper escaping)
- [ ] No CSRF vulnerabilities (nonce verification)
- [ ] No insecure file operations
- [ ] No hardcoded secrets or credentials
- [ ] User input properly validated and sanitized
- [ ] Output properly escaped based on context

### Performance

- [ ] No N+1 database queries
- [ ] Database queries are optimized
- [ ] Large operations are chunked/paginated
- [ ] Caching implemented where appropriate
- [ ] No blocking operations on page load
- [ ] Assets are minified (if applicable)

### Compatibility

- [ ] Works with minimum WordPress version ([MIN_WP_VERSION]+)
- [ ] Works with minimum PHP version ([MIN_PHP_VERSION]+)
- [ ] Tested with latest WordPress version
- [ ] Tested with PHP [MAX_PHP_VERSION]
- [ ] No deprecated WordPress functions used
- [ ] No deprecated PHP functions used
- [ ] Backward compatible (or breaking changes documented)

## Documentation

<!-- Check all that apply -->

- [ ] README updated (if needed)
- [ ] CHANGELOG.md updated
- [ ] User documentation updated (if applicable)
- [ ] Developer documentation updated (if applicable)
- [ ] Code comments added/updated
- [ ] PHPDoc blocks added/updated
- [ ] JSDoc blocks added/updated (if JS changes)

## Deployment Notes

<!-- Any special deployment considerations? -->

**Database Changes:**
- [ ] No database changes
- [ ] Database migration required
- [ ] Database version bump needed

**Breaking Changes:**
<!-- If this is a breaking change, describe the impact and migration path -->

**Special Instructions:**
<!-- Any special steps needed when deploying this change? -->

## Dependencies

<!-- List any new dependencies added -->

**Composer:**
- None

**npm:**
- None

**Why are these dependencies needed?**
<!-- Justify new dependencies -->

## Checklist

<!-- Ensure you've completed all required items -->

### Before Submitting

- [ ] I've read the [Contributing Guidelines](../CONTRIBUTING.md)
- [ ] I've tested my changes locally
- [ ] All tests pass locally
- [ ] My code follows the project's coding standards
- [ ] I've added tests for my changes
- [ ] I've updated documentation as needed
- [ ] My commits follow the [commit message guidelines](../CONTRIBUTING.md#commit-guidelines)
- [ ] I've checked for breaking changes
- [ ] I've updated CHANGELOG.md

### Code Review Ready

- [ ] I've self-reviewed my code
- [ ] I've added comments to complex code
- [ ] There are no debugging statements (console.log, var_dump, etc.)
- [ ] There are no TODO/FIXME comments
- [ ] Branch is up to date with main/develop
- [ ] No merge conflicts
- [ ] CI/CD checks pass

## Additional Notes

<!-- Any other information reviewers should know? -->

## For Reviewers

<!-- Help reviewers understand what to focus on -->

**Areas of focus:**
<!-- What should reviewers pay special attention to? -->

**Known limitations:**
<!-- Are there any known limitations or edge cases? -->

---

## Post-Merge Checklist

<!-- Maintainers will complete this after merging -->

- [ ] Update version number
- [ ] Tag release (if needed)
- [ ] Deploy to WordPress.org (if needed)
- [ ] Update changelog on WordPress.org
- [ ] Announce in Discussions
- [ ] Close related issues
- [ ] Update documentation site (if applicable)

---

**Thank you for contributing to [PLUGIN_NAME]!** 🎉

Your contribution helps make this plugin better for the entire WordPress community.

---

## Template Variables

When using this template, customize these placeholders:
- `[TEXT_DOMAIN]` - Plugin text domain
- `[MIN_WP_VERSION]` - Minimum WordPress version
- `[MIN_PHP_VERSION]` - Minimum PHP version
- `[MAX_PHP_VERSION]` - Maximum tested PHP version
- `[PLUGIN_NAME]` - Plugin display name
