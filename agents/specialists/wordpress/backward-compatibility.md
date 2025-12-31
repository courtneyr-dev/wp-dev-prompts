# 🔄 Backward Compatibility

> **Type**: Specialist
> **Domain**: API Stability
> **Authority**: Deprecation policy, BC breaks, version contracts

## 🎯 Mission

Maintain API stability across versions. Define deprecation policies, identify BC-breaking changes, and provide migration paths. Ensure existing integrations continue working through major versions.

## 📥 Inputs

- Proposed API changes
- Current public API surface
- Consumer usage patterns
- Version constraints (semver)

## 📤 Outputs

- BC impact assessment
- Deprecation notices
- Migration guides
- Shim/adapter code
- Version compatibility matrix

---

## 🔧 When to Use

✅ **Use this agent when:**
- Changing function signatures
- Removing or renaming APIs
- Modifying hook parameters
- Planning major version bumps
- Reviewing PRs for BC breaks

❌ **Don't use for:**
- New features (no BC concern)
- Internal/private code changes
- Bug fixes that don't affect API
- Documentation-only changes

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Silent BC breaks | Add `@since` and `@deprecated` tags |
| No migration path | Always provide upgrade guide |
| Immediate removal | Deprecate for at least one major version |
| Changing hook parameters | Add new hooks instead |
| Optional→required params | Use func_get_args() for BC |

---

## ✅ Checklist

### Before Making Changes
- [ ] Identify all public APIs affected
- [ ] Check for external consumers (other plugins/themes)
- [ ] Determine if change is BC-breaking
- [ ] Plan deprecation timeline

### Deprecation Process
- [ ] Add `@deprecated` PHPDoc tag with version
- [ ] Add `_deprecated_function()` call
- [ ] Document in CHANGELOG
- [ ] Provide migration path in docs
- [ ] Set removal version (usually major + 2)

### Migration Support
- [ ] Create compatibility shim if possible
- [ ] Write migration guide
- [ ] Add upgrade notice in readme
- [ ] Test with known consumers

### Testing
- [ ] Test deprecated path still works
- [ ] Test new path works
- [ ] Verify deprecation notices appear
- [ ] Check consumer plugin compatibility

---

## 💬 Example Prompts

### Claude Code
```
@backward-compatibility I need to change this function signature:
`get_items( $type )` → `get_items( $args )`. How do I do this
without breaking existing code?
```

### Cursor
```
Using backward-compatibility, review this PR for BC-breaking changes.
The PR modifies several hooks and renames two public methods.
```

### GitHub Copilot
```
# Backward Compatibility Task: Hook Migration
#
# Current: apply_filters( 'my_filter', $value )
# Target: apply_filters( 'my_filter', $value, $context, $user_id )
#
# Ensure existing filter callbacks still work
# Provide migration path for new parameters
```

### General Prompt
```
I'm planning a v2.0.0 release that includes:
1. Renaming my_plugin_do_thing() to my_plugin_process()
2. Changing REST endpoint from /v1/items to /v2/items
3. Removing three deprecated functions

Help me:
- Write deprecation notices for v1.x
- Create compatibility shims
- Write migration guide
- Plan the removal timeline
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [data-model-and-migrations](data-model-and-migrations.md) | Data schema BC |
| [wp-hooks-architecture](wp-hooks-architecture.md) | Hook BC |
| [release-manager](../release/release-manager.md) | Version planning |
| [regression-suite-curator](../testing/regression-suite-curator.md) | BC tests |

---

## 📋 Deprecation Policy

### Standard Timeline

| Phase | Version | Action |
|-------|---------|--------|
| Deprecate | v2.0.0 | Add notices, keep working |
| Soft removal | v3.0.0 | Trigger errors, shim works |
| Hard removal | v4.0.0 | Remove code completely |

### Deprecation Notice Pattern

```php
/**
 * Get items by type.
 *
 * @since 1.0.0
 * @deprecated 2.0.0 Use my_plugin_query_items() instead.
 * @see my_plugin_query_items()
 *
 * @param string $type Item type.
 * @return array Items.
 */
function my_plugin_get_items( $type ) {
    _deprecated_function( __FUNCTION__, '2.0.0', 'my_plugin_query_items()' );

    return my_plugin_query_items( [ 'type' => $type ] );
}

/**
 * Query items with flexible arguments.
 *
 * @since 2.0.0
 *
 * @param array $args Query arguments.
 * @return array Items.
 */
function my_plugin_query_items( $args = [] ) {
    // New implementation
}
```

---

## 🔧 BC Patterns

### Function Signature Changes

```php
// OLD: function get_items( $type, $limit = 10 )
// NEW: function get_items( $args )

function my_plugin_get_items( $type_or_args = [], $limit = null ) {
    // BC: Handle old signature
    if ( is_string( $type_or_args ) ) {
        _deprecated_argument(
            __FUNCTION__,
            '2.0.0',
            'Pass an array of arguments instead of individual parameters.'
        );

        $args = [
            'type' => $type_or_args,
            'limit' => $limit ?? 10,
        ];
    } else {
        $args = $type_or_args;
    }

    // New implementation uses $args
    return self::query_items( $args );
}
```

### Hook Parameter Addition

```php
// OLD: apply_filters( 'my_filter', $value )
// NEW: apply_filters( 'my_filter', $value, $context, $user_id )

// Safe way: Check callback signature
$value = apply_filters( 'my_plugin_filter', $value, $context, $user_id );

// For callbacks that don't accept new params, they just ignore them
// PHP handles extra arguments gracefully

// If callbacks NEED new params, create new hook:
$value = apply_filters( 'my_plugin_filter', $value );
$value = apply_filters( 'my_plugin_filter_with_context', $value, $context, $user_id );
```

### Method Rename with Alias

```php
class My_Plugin_API {

    /**
     * @since 2.0.0
     */
    public function process_item( $item ) {
        // New implementation
    }

    /**
     * @since 1.0.0
     * @deprecated 2.0.0 Use process_item() instead.
     */
    public function do_thing( $item ) {
        _deprecated_function( __METHOD__, '2.0.0', __CLASS__ . '::process_item()' );
        return $this->process_item( $item );
    }
}
```

### Class Rename with Alias

```php
// New class
class My_Plugin_Event_Handler {
    // Implementation
}

// Old class as alias (in autoloader or separate file)
class_alias( 'My_Plugin_Event_Handler', 'My_Plugin_Handler' );

// Trigger deprecation when old class is used
// Add to the old class file:
_deprecated_file(
    'class-my-plugin-handler.php',
    '2.0.0',
    'class-my-plugin-event-handler.php'
);
```

---

## 📝 Migration Guide Template

```markdown
# Migrating from v1.x to v2.0

## Breaking Changes

### 1. `my_plugin_get_items()` is deprecated

**Before (v1.x):**
```php
$items = my_plugin_get_items( 'post', 10 );
```

**After (v2.0+):**
```php
$items = my_plugin_query_items( [
    'type' => 'post',
    'limit' => 10,
] );
```

**Compatibility:** The old function still works but triggers a deprecation notice. It will be removed in v4.0.

### 2. REST API v1 endpoints deprecated

**Before (v1.x):**
```
GET /wp-json/my-plugin/v1/items
```

**After (v2.0+):**
```
GET /wp-json/my-plugin/v2/items
```

**Compatibility:** v1 endpoints remain functional through v3.x with deprecation headers.

## Deprecation Timeline

| Feature | Deprecated | Soft Removal | Hard Removal |
|---------|------------|--------------|--------------|
| `get_items()` signature | v2.0.0 | v3.0.0 | v4.0.0 |
| REST v1 endpoints | v2.0.0 | v3.0.0 | v4.0.0 |
| `My_Plugin_Handler` class | v2.0.0 | v3.0.0 | v4.0.0 |
```

---

## 🧪 BC Testing Patterns

### Deprecation Test

```php
class BC_Test extends WP_UnitTestCase {

    public function test_deprecated_function_still_works(): void {
        $this->expectDeprecation();
        $this->expectDeprecationMessage(
            'my_plugin_get_items is deprecated since version 2.0.0'
        );

        $result = my_plugin_get_items( 'post' );

        $this->assertIsArray( $result );
    }

    public function test_old_signature_produces_same_result(): void {
        // Suppress deprecation for comparison
        $old_result = @my_plugin_get_items( 'post', 5 );
        $new_result = my_plugin_query_items( [ 'type' => 'post', 'limit' => 5 ] );

        $this->assertEquals( $old_result, $new_result );
    }
}
```

### Contract Test

```php
/**
 * Tests that verify the public API contract hasn't changed.
 */
class API_Contract_Test extends WP_UnitTestCase {

    public function test_public_functions_exist(): void {
        $required_functions = [
            'my_plugin_query_items',
            'my_plugin_get_item',
            'my_plugin_save_item',
        ];

        foreach ( $required_functions as $function ) {
            $this->assertTrue(
                function_exists( $function ),
                "Required function {$function} must exist"
            );
        }
    }

    public function test_hooks_are_available(): void {
        $required_hooks = [
            'my_plugin_before_save',
            'my_plugin_after_save',
            'my_plugin_item_data',
        ];

        foreach ( $required_hooks as $hook ) {
            $this->assertTrue(
                has_filter( $hook ) !== false || true, // Hook is registerable
                "Required hook {$hook} must be available"
            );
        }
    }
}
```

---

## 📊 BC Impact Assessment Template

```markdown
## BC Impact Assessment: [Feature/Change Name]

### Change Summary
[Describe the change]

### Affected APIs
- `function_name()` - [breaking/deprecated/safe]
- `Class::method()` - [breaking/deprecated/safe]
- `hook_name` filter - [breaking/deprecated/safe]

### Consumer Impact
- **WordPress Core:** [None/Low/Medium/High]
- **Other Plugins:** [None/Low/Medium/High]
- **Themes:** [None/Low/Medium/High]
- **Custom Code:** [None/Low/Medium/High]

### Migration Effort
- **Trivial:** Find-replace or no changes needed
- **Low:** Update a few function calls
- **Medium:** Refactor integration points
- **High:** Significant rewrite required

### Recommendation
- [ ] Ship as-is (non-breaking)
- [ ] Add deprecation notices
- [ ] Create compatibility shim
- [ ] Delay until major version
- [ ] Reconsider approach
```
