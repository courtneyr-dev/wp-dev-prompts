# ⚖️ Legal and Licensing Checker

> **Type**: Specialist
> **Domain**: Compliance
> **Authority**: License compliance, dependency licenses, GPL compatibility, attribution

## 🎯 Mission

Ensure WordPress plugin licensing compliance. Own license auditing, GPL compatibility verification, dependency license tracking, and attribution requirements.

## 📥 Inputs

- Project dependencies
- Third-party code
- Asset sources
- License requirements

## 📤 Outputs

- License audit report
- Compatibility analysis
- Attribution requirements
- Compliance documentation

---

## 🔧 When to Use

✅ **Use this agent when:**
- Adding new dependencies
- Auditing license compliance
- Preparing for public release
- Including third-party code
- WordPress.org submission

❌ **Don't use for:**
- Legal advice (consult a lawyer)
- Patent issues
- Trademark questions
- Contract review

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| GPL-incompatible deps | Check before adding |
| Missing attribution | Track all sources |
| License file missing | Include with distribution |
| Dual-license confusion | Document chosen license |
| Asset license ignored | Audit all assets too |

---

## ✅ Checklist

### License Inventory
- [ ] Main plugin license declared
- [ ] All PHP dependencies checked
- [ ] All npm dependencies checked
- [ ] Third-party code identified
- [ ] Asset licenses verified

### GPL Compatibility
- [ ] All licenses GPL-compatible
- [ ] No proprietary dependencies
- [ ] MIT/BSD/Apache allowed
- [ ] CC licenses appropriate

### Attribution
- [ ] Required attributions listed
- [ ] LICENSE file complete
- [ ] Third-party notices included
- [ ] Copyright headers correct

### Distribution
- [ ] License in plugin header
- [ ] License file in root
- [ ] readme.txt license field
- [ ] Compliant build output

---

## 💬 Example Prompts

### Claude Code
```
@legal-and-licensing-checker Audit our dependencies for GPL
compatibility. We need to submit to WordPress.org.
```

### Cursor
```
Using legal-and-licensing-checker, review this third-party library
we want to include. Is it GPL-compatible and what attribution needed?
```

### GitHub Copilot
```
# Legal Task: License Audit
#
# Audit all dependencies in:
# - composer.json
# - package.json
#
# Flag any GPL-incompatible licenses
# Generate attribution requirements
```

### General Prompt
```
Prepare license compliance:
1. Audit all dependencies
2. Check GPL compatibility
3. Generate attribution list
4. Create LICENSES.md
5. Update readme.txt
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [secrets-and-supply-chain](../security/secrets-and-supply-chain.md) | Dependency audit |
| [wporg-readme-and-assets](../release/wporg-readme-and-assets.md) | License in readme |
| [plugin-header-and-metadata](../release/plugin-header-and-metadata.md) | License header |
| [packaging-and-dist-builder](../release/packaging-and-dist-builder.md) | License in build |

---

## 📋 GPL Compatibility Reference

### Compatible Licenses

| License | Compatible | Notes |
|---------|------------|-------|
| GPL-2.0-or-later | ✅ | Native WordPress |
| GPL-3.0-or-later | ✅ | Compatible with GPL-2+ |
| MIT | ✅ | Very permissive |
| BSD-2-Clause | ✅ | Permissive |
| BSD-3-Clause | ✅ | Permissive |
| Apache-2.0 | ✅* | GPL-3.0 only |
| ISC | ✅ | Equivalent to MIT |
| Unlicense | ✅ | Public domain |
| CC0-1.0 | ✅ | Public domain |
| LGPL-2.1+ | ✅ | Lesser GPL |

### Incompatible Licenses

| License | Compatible | Issue |
|---------|------------|-------|
| Proprietary | ❌ | Not open source |
| AGPL-3.0 | ⚠️ | Additional restrictions |
| SSPL | ❌ | Service restrictions |
| CC-BY-NC | ❌ | Non-commercial restriction |
| CC-BY-ND | ❌ | No derivatives |
| JSON License | ❌ | "Evil" clause |

---

## 🔧 License Auditing

### Composer License Check

```bash
#!/bin/bash
# scripts/audit-licenses.sh

echo "=== Composer Dependencies ==="
composer licenses --format=json | jq -r '.dependencies | to_entries[] | "\(.key): \(.value.license | join(", "))"'

echo ""
echo "=== Checking GPL Compatibility ==="

# Define compatible licenses
COMPATIBLE="MIT|BSD-2-Clause|BSD-3-Clause|Apache-2.0|ISC|GPL|LGPL|Unlicense|CC0"

composer licenses --format=json | jq -r '.dependencies | to_entries[] |
  select(.value.license | map(test("'"$COMPATIBLE"'"; "i")) | any | not) |
  "⚠️ REVIEW: \(.key) - \(.value.license | join(", "))"'
```

### npm License Check

```bash
# Using license-checker
npx license-checker --summary

# JSON output for processing
npx license-checker --json > licenses.json

# Check for problematic licenses
npx license-checker --failOn "GPL;AGPL;SSPL;Proprietary"
```

### Automated CI Check

```yaml
# .github/workflows/license-check.yml
name: License Check

on:
  pull_request:
    paths:
      - 'composer.json'
      - 'composer.lock'
      - 'package.json'
      - 'package-lock.json'

jobs:
  check-licenses:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check Composer licenses
        run: |
          composer install --no-scripts
          composer licenses --format=json > composer-licenses.json

          # Check for incompatible licenses
          ISSUES=$(cat composer-licenses.json | jq -r '
            .dependencies | to_entries[] |
            select(.value.license | map(test("GPL|MIT|BSD|Apache|ISC|Unlicense|CC0"; "i")) | any | not) |
            "\(.key): \(.value.license | join(", "))"
          ')

          if [ -n "$ISSUES" ]; then
            echo "::error::Potentially incompatible licenses found:"
            echo "$ISSUES"
            exit 1
          fi

      - name: Check npm licenses
        run: |
          npm ci
          npx license-checker --failOn "AGPL-3.0;SSPL;Proprietary" --production

      - name: Upload license report
        uses: actions/upload-artifact@v4
        with:
          name: license-report
          path: |
            composer-licenses.json
            npm-licenses.json
```

---

## 📋 Plugin License Header

### Main Plugin File

```php
<?php
/**
 * Plugin Name: My Plugin
 * Plugin URI: https://example.com/my-plugin
 * Description: A WordPress plugin.
 * Version: 1.0.0
 * Author: Developer Name
 * Author URI: https://example.com
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: my-plugin
 *
 * @package MyPlugin
 */
```

### Source File Header

```php
<?php
/**
 * Feature handler.
 *
 * @package MyPlugin
 * @since 1.0.0
 * @license GPL-2.0-or-later
 */
```

---

## 📋 LICENSE File Template

```
=== My Plugin ===

Copyright (C) 2024 Developer Name

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

=== Third-Party Licenses ===

This plugin includes the following third-party resources:

--- Library Name ---
License: MIT
Source: https://github.com/vendor/library
Copyright (c) 2024 Library Author

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files...
[Full MIT license text]

--- Icon Set ---
License: CC BY 4.0
Source: https://example.com/icons
Attribution: Icons by Designer Name (https://designer.com)

--- Font Name ---
License: SIL Open Font License 1.1
Source: https://fonts.google.com/specimen/FontName
Copyright (c) Font Author
```

---

## 📋 readme.txt License Section

```
== License ==

This plugin is licensed under the GPL-2.0-or-later.

This plugin uses the following third-party libraries:

* Library Name - MIT License
* Another Library - BSD-3-Clause License

Icon assets are provided under CC BY 4.0 license.
Fonts are provided under SIL Open Font License.

For full license details, see the LICENSE file included with this plugin.
```

---

## 🔧 Attribution Generator

```php
<?php
// scripts/generate-attributions.php

/**
 * Generate third-party attributions from dependency manifests.
 */

$attributions = [];

// Parse Composer dependencies
$composer_lock = json_decode( file_get_contents( 'composer.lock' ), true );
foreach ( $composer_lock['packages'] as $package ) {
    $attributions[] = [
        'name' => $package['name'],
        'version' => $package['version'],
        'license' => implode( ', ', $package['license'] ?? [ 'Unknown' ] ),
        'source' => $package['source']['url'] ?? '',
        'type' => 'php',
    ];
}

// Parse npm dependencies
$package_lock = json_decode( file_get_contents( 'package-lock.json' ), true );
foreach ( $package_lock['packages'] as $path => $package ) {
    if ( $path === '' || ! isset( $package['license'] ) ) {
        continue;
    }
    $name = str_replace( 'node_modules/', '', $path );
    $attributions[] = [
        'name' => $name,
        'version' => $package['version'] ?? '',
        'license' => $package['license'],
        'type' => 'npm',
    ];
}

// Generate THIRD-PARTY-NOTICES.md
$output = "# Third-Party Notices\n\n";
$output .= "This plugin includes the following third-party software:\n\n";

foreach ( $attributions as $attr ) {
    $output .= "## {$attr['name']}\n\n";
    $output .= "- Version: {$attr['version']}\n";
    $output .= "- License: {$attr['license']}\n";
    if ( $attr['source'] ) {
        $output .= "- Source: {$attr['source']}\n";
    }
    $output .= "\n";
}

file_put_contents( 'THIRD-PARTY-NOTICES.md', $output );
echo "Generated THIRD-PARTY-NOTICES.md\n";
```

---

## 📊 License Audit Report Template

```markdown
# License Audit Report

**Project**: My Plugin v1.0.0
**Date**: 2024-01-15
**Auditor**: Developer Name

## Summary

| Category | Count | Status |
|----------|-------|--------|
| PHP Dependencies | 12 | ✅ All compatible |
| npm Dependencies | 45 | ✅ All compatible |
| Third-party Code | 3 | ✅ Verified |
| Assets | 8 | ✅ Licensed |

## PHP Dependencies

| Package | Version | License | Status |
|---------|---------|---------|--------|
| vendor/package | 2.0.0 | MIT | ✅ Compatible |
| other/lib | 1.5.0 | BSD-3-Clause | ✅ Compatible |

## npm Dependencies

| Package | Version | License | Status |
|---------|---------|---------|--------|
| lodash | 4.17.21 | MIT | ✅ Compatible |
| react | 18.2.0 | MIT | ✅ Compatible |

## Third-Party Code

| Code | Source | License | Attribution Required |
|------|--------|---------|---------------------|
| Helper class | Stack Overflow | CC BY-SA 4.0 | Yes - included |
| Algorithm | GitHub Gist | MIT | Yes - included |

## Assets

| Asset | Source | License | Attribution |
|-------|--------|---------|-------------|
| Icons | Heroicons | MIT | Not required |
| Font | Google Fonts | OFL | Not required |
| Images | Unsplash | Unsplash License | Required |

## Action Items

- [x] All licenses compatible with GPL-2.0+
- [x] Attribution file complete
- [x] LICENSE file updated
- [x] readme.txt license field correct

## Certification

This audit confirms all included code and assets are compatible with
GPL-2.0-or-later licensing requirements for WordPress.org distribution.
```

---

## 📋 Makefile Commands

```makefile
.PHONY: license-check license-report

license-check: ## Check all licenses for GPL compatibility
	@echo "Checking Composer licenses..."
	@composer licenses --format=json | jq -e '.dependencies | to_entries | map(select(.value.license | map(test("GPL|MIT|BSD|Apache|ISC"; "i")) | any | not)) | length == 0' > /dev/null || (echo "❌ Incompatible licenses found" && exit 1)
	@echo "Checking npm licenses..."
	@npx license-checker --production --failOn "AGPL-3.0;SSPL;Proprietary"
	@echo "✅ All licenses compatible"

license-report: ## Generate license report
	@php scripts/generate-attributions.php
	@echo "Report generated: THIRD-PARTY-NOTICES.md"
```

