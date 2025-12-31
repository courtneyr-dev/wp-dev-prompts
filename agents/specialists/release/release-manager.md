# 🚀 Release Manager

> **Type**: Specialist
> **Domain**: Release Process
> **Authority**: Release workflow, changelog, tagging, deployment

## 🎯 Mission

Coordinate the complete release process from code freeze to deployment. Own release checklists, changelog generation, Git tagging, and deployment coordination.

## 📥 Inputs

- Release version
- Completed features/fixes
- Test results
- Approval status

## 📤 Outputs

- Release checklist
- Changelog entries
- Git tags
- Release notes
- Deployment triggers

---

## 🔧 When to Use

✅ **Use this agent when:**
- Planning a release
- Generating changelogs
- Creating release tags
- Coordinating deployment
- Writing release notes

❌ **Don't use for:**
- Building packages
- Updating version numbers
- Creating assets
- Running tests

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Incomplete changelog | Review all merged PRs |
| Missing approvals | Release checklist gates |
| Wrong tag format | Automated tagging |
| Skipped tests | CI gate on release |
| Forgotten documentation | Docs in release checklist |

---

## ✅ Checklist

### Pre-Release
- [ ] All features merged
- [ ] All tests passing
- [ ] Security scan clean
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Changelog complete

### Version Bump
- [ ] Version numbers synced
- [ ] Stable tag updated
- [ ] "Tested up to" current
- [ ] Minimum requirements checked

### Testing
- [ ] Smoke tests pass
- [ ] Upgrade path tested
- [ ] Multisite tested
- [ ] RTL tested
- [ ] Accessibility verified

### Release
- [ ] Git tag created
- [ ] GitHub release published
- [ ] Package uploaded
- [ ] WordPress.org deployed
- [ ] Announcements sent

---

## 💬 Example Prompts

### Claude Code
```
@release-manager Generate the changelog for v2.0.0 from our
merged PRs. Follow Keep a Changelog format.
```

### Cursor
```
Using release-manager, create the release checklist for our
upcoming v1.5.0 release including all verification steps.
```

### GitHub Copilot
```
# Release Task: Tag and Deploy
#
# Version: 1.3.0
# Type: Minor release
#
# Generate:
# - Git tag command
# - GitHub release notes
# - WordPress.org deployment steps
# - Announcement draft
```

### General Prompt
```
Coordinate the v2.0.0 release:
1. Generate changelog from merged PRs
2. Create release checklist
3. Draft release notes
4. Plan deployment steps
5. Prepare rollback procedure
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [plugin-header-and-metadata](plugin-header-and-metadata.md) | Version sync |
| [packaging-and-dist-builder](packaging-and-dist-builder.md) | Build process |
| [wporg-readme-and-assets](wporg-readme-and-assets.md) | WP.org deployment |
| [qa-director](../../orchestrators/qa-director.md) | Release quality |

---

## 📋 Release Checklist Template

```markdown
# Release Checklist: v${VERSION}

## Pre-Release Preparation

### Code Freeze
- [ ] Feature freeze announced
- [ ] All feature PRs merged
- [ ] Release branch created (if applicable)

### Quality Assurance
- [ ] All CI checks passing
- [ ] Manual testing completed
- [ ] Security scan clean
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed

### Documentation
- [ ] Changelog updated
- [ ] README current
- [ ] API documentation updated
- [ ] Upgrade notices written

## Version Update

### Files Updated
- [ ] Main plugin file header
- [ ] package.json
- [ ] composer.json
- [ ] readme.txt stable tag
- [ ] PHP version constant

### Validation
- [ ] All versions match
- [ ] "Tested up to" is current WP version
- [ ] Minimum requirements accurate

## Release Process

### Git Operations
- [ ] All changes committed
- [ ] Release commit created
- [ ] Tag created: v${VERSION}
- [ ] Pushed to origin

### GitHub Release
- [ ] Release notes drafted
- [ ] ZIP artifact attached
- [ ] Marked as latest release
- [ ] Notify watchers

### WordPress.org (if applicable)
- [ ] SVN updated
- [ ] Assets updated
- [ ] Tag created
- [ ] Verify on WP.org

## Post-Release

### Verification
- [ ] Install from WordPress.org
- [ ] Upgrade from previous version
- [ ] Basic functionality working
- [ ] No console errors

### Communication
- [ ] Blog post published
- [ ] Social media announced
- [ ] Newsletter sent
- [ ] Support forum post

### Monitoring
- [ ] Support queue monitored
- [ ] Error logs checked
- [ ] Rollback procedure ready
```

---

## 📝 Changelog Format

### Keep a Changelog Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2024-01-15

### Added
- New block editor integration
- REST API for external access
- Multisite network settings

### Changed
- Minimum WordPress version is now 6.0
- Minimum PHP version is now 7.4
- Improved admin UI design

### Deprecated
- `my_plugin_old_function()` - use `my_plugin_new_function()` instead

### Removed
- Legacy shortcode support

### Fixed
- Database query performance issue
- Translation loading on multisite

### Security
- Hardened XSS protection in admin

## [1.5.0] - 2023-12-01

### Added
- Export functionality
- Email notifications

### Fixed
- Various minor bugs
```

---

## 🏷️ Git Tagging

### Tagging Commands

```bash
# Create annotated tag
git tag -a v1.2.0 -m "Release v1.2.0"

# Push tag
git push origin v1.2.0

# Push all tags
git push origin --tags
```

### Automated Tagging Script

```bash
#!/bin/bash
# scripts/create-release.sh

set -e

VERSION=$(node -p "require('./package.json').version")

echo "Creating release v$VERSION..."

# Ensure we're on main branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo "ERROR: Must be on main branch"
    exit 1
fi

# Ensure working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "ERROR: Working directory is not clean"
    exit 1
fi

# Ensure we're up to date
git pull origin main

# Create tag
git tag -a "v$VERSION" -m "Release v$VERSION"

# Push tag
git push origin "v$VERSION"

echo "Created and pushed tag v$VERSION"
```

---

## 📣 Release Notes Template

```markdown
# My Plugin v2.0.0

We're excited to announce version 2.0.0 of My Plugin!

## Highlights

### New Block Editor Integration
You can now use My Plugin directly in the block editor with our new custom block.

### REST API Access
External applications can now interact with My Plugin via our new REST API.

## Breaking Changes

- **WordPress 6.0+ Required**: We've updated our minimum WordPress version.
- **PHP 7.4+ Required**: Please upgrade PHP if you're on an older version.
- **Removed Legacy Shortcodes**: Please migrate to blocks or use the new shortcode format.

## All Changes

### Added
- Block editor integration
- REST API endpoints
- Multisite network settings

### Changed
- Redesigned admin interface
- Improved performance

### Fixed
- Database query efficiency
- Translation loading

## Upgrade Notes

1. **Backup First**: Always backup before upgrading.
2. **Check Requirements**: Ensure WordPress 6.0+ and PHP 7.4+
3. **Update Shortcodes**: Migrate legacy shortcodes to new format.

## Getting Help

- [Documentation](https://example.com/docs)
- [Support Forum](https://wordpress.org/support/plugin/my-plugin)
- [GitHub Issues](https://github.com/username/my-plugin/issues)
```

---

## ⚙️ GitHub Release Workflow

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - name: Install dependencies
        run: |
          npm ci
          composer install --no-dev

      - name: Build
        run: npm run build:prod

      - name: Create package
        run: make package

      - name: Extract changelog
        id: changelog
        run: |
          VERSION=${GITHUB_REF#refs/tags/v}
          CHANGELOG=$(sed -n "/## \[$VERSION\]/,/## \[/p" CHANGELOG.md | head -n -1)
          echo "changelog<<EOF" >> $GITHUB_OUTPUT
          echo "$CHANGELOG" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          files: dist/*.zip
          body: ${{ steps.changelog.outputs.changelog }}
          generate_release_notes: true
```

---

## 🔙 Rollback Procedure

```markdown
## Rollback Procedure

If critical issues are discovered after release:

### WordPress.org
1. Increase version to x.y.z+1 (patch)
2. Revert problematic changes
3. Deploy hotfix to WordPress.org

### Self-Hosted
1. Remove broken release from downloads
2. Update "latest" symlink to previous version
3. Notify users via support channels

### Communication
1. Post on support forum
2. Add notice to readme.txt
3. Email registered users (if applicable)

### Post-Mortem
1. Document what went wrong
2. Add to test suite to prevent recurrence
3. Update release checklist
```
