# 📚 Documentation Quality Auditor

> **Type**: Specialist
> **Domain**: Documentation
> **Authority**: Documentation completeness, accuracy, code-docs sync, API documentation

## 🎯 Mission

Ensure documentation stays accurate and complete. Own documentation auditing, code-docs synchronization, API doc generation, and documentation coverage metrics.

## 📥 Inputs

- Source code
- Existing documentation
- API surface
- User feedback

## 📤 Outputs

- Documentation audit report
- Sync issues list
- Coverage metrics
- Update recommendations

---

## 🔧 When to Use

✅ **Use this agent when:**
- Auditing documentation completeness
- Checking code-docs sync
- Preparing for release
- Reviewing API documentation
- Measuring doc coverage

❌ **Don't use for:**
- Writing initial documentation
- Marketing content
- User tutorials
- Translation work

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Outdated code examples | Automated testing of examples |
| Missing function docs | Coverage metrics |
| Broken internal links | Link checker |
| Inconsistent formatting | Style guide |
| Unclear parameters | Require type hints |

---

## ✅ Checklist

### Code Documentation
- [ ] All public functions documented
- [ ] Parameters and returns described
- [ ] @since tags present
- [ ] @throws documented
- [ ] Examples provided

### README/Guides
- [ ] Installation accurate
- [ ] Quick start works
- [ ] Examples run correctly
- [ ] Links valid
- [ ] Screenshots current

### API Documentation
- [ ] Endpoints documented
- [ ] Request/response examples
- [ ] Error codes explained
- [ ] Authentication described
- [ ] Rate limits noted

### Synchronization
- [ ] Docs match code behavior
- [ ] Version numbers consistent
- [ ] Changelog updated
- [ ] Deprecations noted

---

## 💬 Example Prompts

### Claude Code
```
@documentation-quality-auditor Audit our plugin's inline documentation.
Find undocumented public methods and missing @since tags.
```

### Cursor
```
Using documentation-quality-auditor, check if our README examples
still work with the current codebase.
```

### GitHub Copilot
```
# Documentation Task: API Docs Audit
#
# Review REST API documentation:
# - Check all endpoints documented
# - Verify example requests/responses
# - Confirm error codes listed
# - Validate authentication section
```

### General Prompt
```
Audit our documentation:
1. Check inline code docs coverage
2. Verify README accuracy
3. Test all code examples
4. Validate links
5. Generate improvement report
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [onboarding-and-quickstart](../dx/onboarding-and-quickstart.md) | Setup docs |
| [contributing-and-pr-gates](../dx/contributing-and-pr-gates.md) | Contributing docs |
| [wporg-readme-and-assets](../release/wporg-readme-and-assets.md) | readme.txt |
| [qa-director](../../orchestrators/qa-director.md) | Release quality |

---

## 📋 PHPDoc Standards

### Required Tags

```php
<?php
/**
 * Process user data and return formatted result.
 *
 * Takes raw user input, validates it against schema,
 * and returns a normalized data structure.
 *
 * @since 1.0.0
 * @since 1.2.0 Added $options parameter.
 *
 * @param array $data {
 *     User data to process.
 *
 *     @type string $name     User's display name.
 *     @type string $email    User's email address.
 *     @type int    $role_id  Optional. Role ID. Default 0.
 * }
 * @param array $options {
 *     Optional. Processing options.
 *
 *     @type bool $validate  Whether to validate. Default true.
 *     @type bool $sanitize  Whether to sanitize. Default true.
 * }
 *
 * @return array|WP_Error Processed data array or error on failure.
 *
 * @throws InvalidArgumentException If $data is empty.
 */
public function process_user_data( array $data, array $options = [] ): array|WP_Error {
    // Implementation
}
```

### Class Documentation

```php
<?php
/**
 * Handles user data operations.
 *
 * Provides methods for CRUD operations on user data,
 * including validation, sanitization, and persistence.
 *
 * @since 1.0.0
 *
 * @package MyPlugin
 * @subpackage Users
 */
class User_Handler {

    /**
     * Database table name.
     *
     * @since 1.0.0
     * @var string
     */
    private string $table;

    /**
     * Constructor.
     *
     * @since 1.0.0
     *
     * @param string $table_prefix Table prefix to use.
     */
    public function __construct( string $table_prefix ) {
        $this->table = $table_prefix . 'users';
    }
}
```

---

## 🔧 Documentation Coverage

### PHPDoc Coverage Checker

```php
<?php
// scripts/check-doc-coverage.php

/**
 * Check documentation coverage for PHP files.
 */

$files = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator( __DIR__ . '/../includes' )
);

$stats = [
    'total_functions' => 0,
    'documented_functions' => 0,
    'total_classes' => 0,
    'documented_classes' => 0,
    'missing_since' => [],
    'missing_params' => [],
    'missing_return' => [],
];

foreach ( $files as $file ) {
    if ( $file->getExtension() !== 'php' ) {
        continue;
    }

    $content = file_get_contents( $file->getPathname() );
    $tokens = token_get_all( $content );

    $last_doc = null;

    foreach ( $tokens as $i => $token ) {
        if ( is_array( $token ) ) {
            // Track doc comments
            if ( $token[0] === T_DOC_COMMENT ) {
                $last_doc = $token[1];
            }

            // Check functions
            if ( $token[0] === T_FUNCTION ) {
                $stats['total_functions']++;

                if ( $last_doc !== null ) {
                    $stats['documented_functions']++;

                    // Check for @since
                    if ( ! str_contains( $last_doc, '@since' ) ) {
                        $stats['missing_since'][] = get_function_name( $tokens, $i );
                    }

                    // Check for @param
                    if ( ! str_contains( $last_doc, '@param' ) && has_parameters( $tokens, $i ) ) {
                        $stats['missing_params'][] = get_function_name( $tokens, $i );
                    }

                    // Check for @return
                    if ( ! str_contains( $last_doc, '@return' ) ) {
                        $stats['missing_return'][] = get_function_name( $tokens, $i );
                    }
                }

                $last_doc = null;
            }

            // Check classes
            if ( $token[0] === T_CLASS ) {
                $stats['total_classes']++;
                if ( $last_doc !== null ) {
                    $stats['documented_classes']++;
                }
                $last_doc = null;
            }
        }
    }
}

// Output report
$func_coverage = $stats['total_functions'] > 0
    ? round( $stats['documented_functions'] / $stats['total_functions'] * 100 )
    : 100;

$class_coverage = $stats['total_classes'] > 0
    ? round( $stats['documented_classes'] / $stats['total_classes'] * 100 )
    : 100;

echo "=== Documentation Coverage Report ===\n\n";
echo "Functions: {$stats['documented_functions']}/{$stats['total_functions']} ({$func_coverage}%)\n";
echo "Classes: {$stats['documented_classes']}/{$stats['total_classes']} ({$class_coverage}%)\n";

if ( ! empty( $stats['missing_since'] ) ) {
    echo "\nMissing @since:\n";
    foreach ( $stats['missing_since'] as $func ) {
        echo "  - {$func}\n";
    }
}
```

### JSDoc Coverage

```javascript
// scripts/check-jsdoc-coverage.js
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.js');
const stats = {
    totalFunctions: 0,
    documentedFunctions: 0,
    undocumented: [],
};

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const ast = parse(content, {
        sourceType: 'module',
        plugins: ['jsx'],
    });

    traverse(ast, {
        FunctionDeclaration(path) {
            stats.totalFunctions++;
            if (hasJSDoc(path)) {
                stats.documentedFunctions++;
            } else {
                stats.undocumented.push({
                    file,
                    name: path.node.id?.name || 'anonymous',
                    line: path.node.loc?.start.line,
                });
            }
        },
        ArrowFunctionExpression(path) {
            if (path.parent.type === 'VariableDeclarator') {
                stats.totalFunctions++;
                if (hasJSDoc(path.parentPath.parentPath)) {
                    stats.documentedFunctions++;
                } else {
                    stats.undocumented.push({
                        file,
                        name: path.parent.id?.name || 'anonymous',
                        line: path.node.loc?.start.line,
                    });
                }
            }
        },
    });
});

function hasJSDoc(path) {
    const comments = path.node.leadingComments || [];
    return comments.some(c => c.value.startsWith('*'));
}

const coverage = (stats.documentedFunctions / stats.totalFunctions * 100).toFixed(1);
console.log(`JSDoc Coverage: ${stats.documentedFunctions}/${stats.totalFunctions} (${coverage}%)`);

if (stats.undocumented.length > 0) {
    console.log('\nUndocumented functions:');
    stats.undocumented.forEach(({ file, name, line }) => {
        console.log(`  ${file}:${line} - ${name}`);
    });
}
```

---

## 📋 Link Checker

```javascript
// scripts/check-links.js
const { marked } = require('marked');
const fs = require('fs');
const glob = require('glob');
const https = require('https');
const http = require('http');

const mdFiles = glob.sync('**/*.md', { ignore: 'node_modules/**' });
const brokenLinks = [];

async function checkLink(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, { timeout: 5000 }, (res) => {
            resolve(res.statusCode >= 200 && res.statusCode < 400);
        }).on('error', () => resolve(false));
    });
}

async function checkFile(file) {
    const content = fs.readFileSync(file, 'utf8');
    const tokens = marked.lexer(content);

    for (const token of tokens) {
        if (token.type === 'link' || token.type === 'image') {
            const url = token.href;

            // Check internal links
            if (url.startsWith('./') || url.startsWith('../')) {
                const resolved = path.resolve(path.dirname(file), url);
                if (!fs.existsSync(resolved)) {
                    brokenLinks.push({ file, url, type: 'internal' });
                }
            }
            // Check external links
            else if (url.startsWith('http')) {
                const valid = await checkLink(url);
                if (!valid) {
                    brokenLinks.push({ file, url, type: 'external' });
                }
            }
        }
    }
}

(async () => {
    for (const file of mdFiles) {
        await checkFile(file);
    }

    if (brokenLinks.length > 0) {
        console.log('Broken links found:');
        brokenLinks.forEach(({ file, url, type }) => {
            console.log(`  [${type}] ${file}: ${url}`);
        });
        process.exit(1);
    } else {
        console.log('All links valid!');
    }
})();
```

---

## 📋 Example Code Testing

### Test Documentation Examples

```php
<?php
// tests/Documentation/ExampleTest.php

namespace MyPlugin\Tests\Documentation;

use PHPUnit\Framework\TestCase;

/**
 * Test that code examples in documentation actually work.
 */
class Example_Test extends TestCase {

    /**
     * Extract and test PHP examples from markdown.
     *
     * @dataProvider markdownFilesProvider
     */
    public function test_php_examples_run( string $file ): void {
        $content = file_get_contents( $file );

        // Extract PHP code blocks
        preg_match_all( '/```php\n(.*?)\n```/s', $content, $matches );

        foreach ( $matches[1] as $index => $code ) {
            // Skip incomplete examples
            if ( str_contains( $code, '// ...' ) ) {
                continue;
            }

            // Test syntax
            $result = exec( "php -l -r " . escapeshellarg( $code ) . " 2>&1", $output, $code );

            $this->assertEquals(
                0,
                $code,
                "Syntax error in {$file} example #{$index}: " . implode( "\n", $output )
            );
        }
    }

    public static function markdownFilesProvider(): array {
        $files = glob( __DIR__ . '/../../docs/**/*.md' );
        return array_map( fn( $f ) => [ $f ], $files );
    }
}
```

### Executable Documentation

```php
<?php
// docs/examples/basic-usage.php
/**
 * This file serves as both documentation and a test.
 * It's included in the docs but also run by CI.
 *
 * @example
 */

// Step 1: Initialize the plugin
$plugin = new MyPlugin\Plugin();

// Step 2: Register a handler
$plugin->register_handler( 'custom', function( $data ) {
    return array_map( 'strtoupper', $data );
} );

// Step 3: Process data
$result = $plugin->process( 'custom', [ 'hello', 'world' ] );

// Verify output
assert( $result === [ 'HELLO', 'WORLD' ] );

echo "Example completed successfully!\n";
```

---

## 📊 Documentation Audit Report Template

```markdown
# Documentation Audit Report

**Project**: My Plugin v1.0.0
**Date**: 2024-01-15
**Auditor**: Developer Name

## Coverage Summary

| Category | Coverage | Status |
|----------|----------|--------|
| PHP Functions | 85% | ⚠️ Below 90% threshold |
| PHP Classes | 100% | ✅ Complete |
| JavaScript | 72% | ❌ Below 80% threshold |
| README | 100% | ✅ Complete |
| API Docs | 95% | ✅ Complete |

## Issues Found

### Critical (Must Fix)

1. **Missing @since tag** - 12 functions
   - `includes/class-handler.php:45` - `process_data()`
   - `includes/class-api.php:123` - `validate_request()`

2. **Broken links** - 3 found
   - `docs/api.md:34` - Link to removed section
   - `README.md:89` - External link 404

### Warnings

1. **Missing @return** - 5 functions
2. **Missing parameter descriptions** - 8 functions
3. **Outdated code examples** - 2 files

## Link Validation

| Type | Total | Valid | Broken |
|------|-------|-------|--------|
| Internal | 45 | 43 | 2 |
| External | 23 | 22 | 1 |

## Example Code Testing

| File | Examples | Passed | Failed |
|------|----------|--------|--------|
| docs/quickstart.md | 5 | 5 | 0 |
| docs/api.md | 12 | 11 | 1 |
| README.md | 3 | 3 | 0 |

## Recommendations

1. Add @since tags to all public methods
2. Fix broken internal links in api.md
3. Update example in api.md line 234
4. Improve JavaScript documentation coverage
5. Add more inline examples to complex functions

## Action Items

- [ ] Fix critical issues before release
- [ ] Address warnings in next sprint
- [ ] Set up automated doc testing in CI
- [ ] Schedule quarterly doc review
```

---

## 📋 CI Integration

```yaml
# .github/workflows/docs.yml
name: Documentation

on:
  pull_request:
    paths:
      - '**/*.md'
      - 'includes/**/*.php'
      - 'src/**/*.js'
      - 'docs/**'

jobs:
  check-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check PHP doc coverage
        run: php scripts/check-doc-coverage.php

      - name: Check JS doc coverage
        run: node scripts/check-jsdoc-coverage.js

      - name: Check links
        run: node scripts/check-links.js

      - name: Test examples
        run: |
          for f in docs/examples/*.php; do
            php "$f" || exit 1
          done

      - name: Generate report
        run: php scripts/generate-doc-report.php > doc-report.md

      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('doc-report.md', 'utf8');
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: report
            });
```

