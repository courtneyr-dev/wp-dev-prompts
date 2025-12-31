# Code Quality Scoring

> **Type**: Skill
> **Domain**: Testing
> **Focus**: Measuring code complexity, maintainability, and quality metrics

<skill>
<summary>
Analyzing and scoring code quality using complexity metrics, duplication detection, and maintainability indexes.
</summary>

<knowledge>
## Code Quality Metrics

### Cyclomatic Complexity

Measures the number of independent paths through code:
- **1-10** - Simple, low risk
- **11-20** - Moderate complexity
- **21-50** - High complexity, difficult to test
- **50+** - Untestable, high risk

### Cognitive Complexity

Measures how hard code is to understand:
- Accounts for nesting depth
- Penalizes breaks in linear flow
- Better reflects human comprehension

### Other Metrics

- **Lines of Code (LOC)** - Raw size
- **Maintainability Index** - Composite score
- **Coupling** - Dependencies between modules
- **Duplication** - Copied code percentage

## PHP Tools

### PHPMD (PHP Mess Detector)

**Install:**
```bash
composer require --dev phpmd/phpmd
```

**Configuration (phpmd.xml):**
```xml
<?xml version="1.0"?>
<ruleset name="WordPress Plugin">
    <description>Custom ruleset for WordPress development</description>

    <!-- Complexity rules -->
    <rule ref="rulesets/codesize.xml/CyclomaticComplexity">
        <properties>
            <property name="reportLevel" value="10"/>
        </properties>
    </rule>

    <rule ref="rulesets/codesize.xml/NPathComplexity">
        <properties>
            <property name="minimum" value="200"/>
        </properties>
    </rule>

    <rule ref="rulesets/codesize.xml/ExcessiveMethodLength">
        <properties>
            <property name="minimum" value="100"/>
        </properties>
    </rule>

    <rule ref="rulesets/codesize.xml/ExcessiveClassLength">
        <properties>
            <property name="minimum" value="500"/>
        </properties>
    </rule>

    <rule ref="rulesets/codesize.xml/TooManyPublicMethods">
        <properties>
            <property name="maxmethods" value="15"/>
        </properties>
    </rule>

    <!-- Naming rules -->
    <rule ref="rulesets/naming.xml/ShortVariable">
        <properties>
            <property name="exceptions" value="id,wp"/>
        </properties>
    </rule>

    <!-- Clean code -->
    <rule ref="rulesets/cleancode.xml/BooleanArgumentFlag"/>
    <rule ref="rulesets/cleancode.xml/ElseExpression"/>

    <!-- Design -->
    <rule ref="rulesets/design.xml/CouplingBetweenObjects">
        <properties>
            <property name="maximum" value="15"/>
        </properties>
    </rule>
</ruleset>
```

**Run:**
```bash
./vendor/bin/phpmd includes/ text phpmd.xml
```

### PHPLOC (Lines of Code)

**Install:**
```bash
composer require --dev phploc/phploc
```

**Run:**
```bash
./vendor/bin/phploc includes/

# Output example:
# Lines of Code (LOC)                        2500
# Cyclomatic Complexity
#   Average per method                       3.5
#   Average per class                       12.0
```

### PHPCPD (Copy/Paste Detector)

**Install:**
```bash
composer require --dev sebastian/phpcpd
```

**Run:**
```bash
./vendor/bin/phpcpd includes/

# Finds duplicated code blocks
```

### PHPStan with Cognitive Complexity

**Install:**
```bash
composer require --dev tomasvotruba/cognitive-complexity
```

**phpstan.neon:**
```neon
parameters:
    cognitive_complexity:
        class: 50
        function: 8

rules:
    - Symplify\PHPStanRules\CognitiveComplexity\Rules\FunctionLikeCognitiveComplexityRule
    - Symplify\PHPStanRules\CognitiveComplexity\Rules\ClassLikeCognitiveComplexityRule
```

## JavaScript Tools

### ESLint Complexity Rules

**.eslintrc.js:**
```javascript
module.exports = {
    rules: {
        // Cyclomatic complexity
        'complexity': ['warn', { max: 10 }],

        // Maximum depth of nesting
        'max-depth': ['warn', { max: 4 }],

        // Maximum lines per function
        'max-lines-per-function': ['warn', {
            max: 50,
            skipBlankLines: true,
            skipComments: true,
        }],

        // Maximum statements per function
        'max-statements': ['warn', { max: 15 }],

        // Maximum parameters
        'max-params': ['warn', { max: 4 }],

        // Maximum lines per file
        'max-lines': ['warn', {
            max: 300,
            skipBlankLines: true,
            skipComments: true,
        }],

        // Cognitive complexity (with plugin)
        'sonarjs/cognitive-complexity': ['warn', 15],
    },
};
```

### SonarJS Plugin

**Install:**
```bash
npm install --save-dev eslint-plugin-sonarjs
```

**.eslintrc.js:**
```javascript
module.exports = {
    plugins: ['sonarjs'],
    extends: ['plugin:sonarjs/recommended'],
    rules: {
        'sonarjs/cognitive-complexity': ['error', 15],
        'sonarjs/no-duplicate-string': 'warn',
        'sonarjs/no-identical-functions': 'error',
    },
};
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Code Quality

on: [push, pull_request]

jobs:
  php-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - run: composer install

      - name: PHPMD
        run: ./vendor/bin/phpmd includes/ text phpmd.xml

      - name: PHPLOC
        run: ./vendor/bin/phploc includes/ --log-json=phploc.json

      - name: PHPCPD
        run: ./vendor/bin/phpcpd includes/ --min-tokens=50

  js-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci

      - name: ESLint Complexity
        run: |
          npx eslint src/ \
            --rule 'complexity: [error, 10]' \
            --rule 'max-depth: [error, 4]'
```

## Quality Gates

### Enforcing Thresholds

```yaml
# CI script
- name: Check Complexity
  run: |
    VIOLATIONS=$(./vendor/bin/phpmd includes/ text phpmd.xml | wc -l)
    if [ "$VIOLATIONS" -gt 0 ]; then
      echo "Found $VIOLATIONS quality violations"
      ./vendor/bin/phpmd includes/ text phpmd.xml
      exit 1
    fi
```

### SonarQube Integration

```yaml
- name: SonarQube Scan
  uses: SonarSource/sonarqube-scan-action@master
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
    SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

**sonar-project.properties:**
```properties
sonar.projectKey=my-plugin
sonar.sources=includes,src
sonar.php.coverage.reportPaths=coverage.xml
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

## Refactoring High Complexity

### Before (Complexity: 15)

```php
function process_data( $data, $options ) {
    if ( empty( $data ) ) {
        return false;
    }

    $result = [];
    foreach ( $data as $item ) {
        if ( isset( $item['type'] ) ) {
            if ( $item['type'] === 'post' ) {
                if ( $options['include_posts'] ) {
                    $result[] = $this->process_post( $item );
                }
            } elseif ( $item['type'] === 'page' ) {
                if ( $options['include_pages'] ) {
                    $result[] = $this->process_page( $item );
                }
            }
        }
    }
    return $result;
}
```

### After (Complexity: 5)

```php
function process_data( array $data, array $options ): array {
    if ( empty( $data ) ) {
        return [];
    }

    return array_filter( array_map(
        fn( $item ) => $this->process_item( $item, $options ),
        $data
    ) );
}

private function process_item( array $item, array $options ): ?array {
    $processors = [
        'post' => [ 'include_posts', 'process_post' ],
        'page' => [ 'include_pages', 'process_page' ],
    ];

    $type = $item['type'] ?? null;
    if ( ! isset( $processors[ $type ] ) ) {
        return null;
    }

    [ $option, $method ] = $processors[ $type ];
    return $options[ $option ] ? $this->$method( $item ) : null;
}
```
</knowledge>

<best_practices>
- Set complexity thresholds early
- Measure before refactoring
- Focus on cognitive complexity
- Extract methods to reduce complexity
- Keep functions under 50 lines
- Maximum 4 levels of nesting
</best_practices>

<commands>
```bash
# PHP complexity
./vendor/bin/phpmd includes/ text codesize

# PHP metrics
./vendor/bin/phploc includes/

# Duplicate detection
./vendor/bin/phpcpd includes/

# JavaScript complexity
npx eslint src/ --rule 'complexity: [error, 10]'
```
</commands>
</skill>
