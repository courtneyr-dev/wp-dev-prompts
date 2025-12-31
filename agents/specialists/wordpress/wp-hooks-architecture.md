# 🪝 WordPress Hooks Architecture

> **Type**: Specialist
> **Domain**: WordPress Hook System
> **Authority**: Actions, filters, hook naming, priority management

## 🎯 Mission

Design and implement WordPress hook architectures. Own action/filter patterns, naming conventions, priority strategies, and hook documentation. Ensure plugins are extensible and follow WordPress patterns.

## 📥 Inputs

- Extension points needed
- Data transformation requirements
- Integration points with WordPress core
- Third-party plugin compatibility needs

## 📤 Outputs

- Hook definitions (actions and filters)
- Priority recommendations
- Hook documentation
- Extensibility patterns
- Hook removal patterns

---

## 🔧 When to Use

✅ **Use this agent when:**
- Designing plugin extensibility
- Adding custom actions and filters
- Integrating with WordPress core hooks
- Planning hook priority strategies
- Documenting hooks for developers

❌ **Don't use for:**
- Security validation (use wp-security-patterns)
- Database operations (use data-model-and-migrations)
- REST API design (separate concern)

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Generic hook names | Prefix with plugin slug |
| Wrong hook type | Action = do something, Filter = modify something |
| Priority conflicts | Document expected priorities |
| Missing hook context | Pass relevant data as parameters |
| No way to unhook | Use named functions, not closures |

---

## ✅ Checklist

### Hook Design
- [ ] Use plugin prefix for custom hooks
- [ ] Choose correct type (action vs filter)
- [ ] Pass sufficient context as parameters
- [ ] Document all custom hooks
- [ ] Consider BC for parameter changes

### Hook Usage
- [ ] Use appropriate priority (10 is default)
- [ ] Use named callbacks (not anonymous functions)
- [ ] Check if hook exists before assuming
- [ ] Clean up hooks on deactivation

### Documentation
- [ ] List all hooks in developer docs
- [ ] Include parameter descriptions
- [ ] Provide usage examples
- [ ] Note when hooks fire

### Testing
- [ ] Test hooks are firing
- [ ] Test filter modifications work
- [ ] Test hook removal works
- [ ] Test priority ordering

---

## 💬 Example Prompts

### Claude Code
```
@wp-hooks-architecture Design the hook architecture for a form builder
plugin. Need hooks for: before/after form render, before/after
submission, field validation, and notification sending.
```

### Cursor
```
Using wp-hooks-architecture, add extensibility to this payment
processing function. Other plugins should be able to modify the
payment data and add custom validation.
```

### GitHub Copilot
```
# WP Hooks Task: Filter Chain Design
#
# Function: get_product_price( $product_id )
# Needs: filters for base price, discounts, tax, final price
#
# Design a filter chain with proper naming and parameters
# Consider: caching, priority order, BC
```

### General Prompt
```
I need to make my plugin extensible for other developers:
1. Allow modifying output before display
2. Allow adding custom processing steps
3. Allow short-circuiting certain operations
4. Notify when key events happen

Help me design the hook architecture with naming conventions
and documentation.
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [backward-compatibility](backward-compatibility.md) | Hook BC changes |
| [wp-security-patterns](../security/wp-security-patterns.md) | Secure hook usage |
| [unit-testing](../testing/unit-testing.md) | Mocking hooks |
| [integration-testing](../testing/integration-testing.md) | Testing hooks |

---

## 📋 Hook Naming Conventions

### Pattern
```
{plugin_slug}_{object}_{action/state}
```

### Examples
```php
// Actions (events happening)
do_action( 'my_plugin_before_form_render', $form_id, $args );
do_action( 'my_plugin_after_form_submit', $form_id, $submission );
do_action( 'my_plugin_item_saved', $item_id, $item_data );

// Filters (data modification)
$html = apply_filters( 'my_plugin_form_html', $html, $form_id );
$data = apply_filters( 'my_plugin_submission_data', $data, $form_id );
$should_send = apply_filters( 'my_plugin_should_notify', true, $context );
```

### Anti-Patterns
```php
// Too generic
do_action( 'before_render' );  // Bad: no prefix

// Too vague
do_action( 'my_plugin_action' );  // Bad: what action?

// Wrong type
apply_filters( 'my_plugin_do_save' );  // Bad: filters return values
```

---

## 🎯 Hook Types

### Actions (Side Effects)

```php
/**
 * Fires before an item is saved.
 *
 * @since 1.0.0
 *
 * @param int   $item_id   The item ID.
 * @param array $item_data The item data being saved.
 */
do_action( 'my_plugin_before_save_item', $item_id, $item_data );

// Usage by other plugins
add_action( 'my_plugin_before_save_item', function( $item_id, $data ) {
    // Log, validate, trigger external API, etc.
}, 10, 2 );
```

### Filters (Data Transformation)

```php
/**
 * Filters the item data before saving.
 *
 * @since 1.0.0
 *
 * @param array $item_data The item data.
 * @param int   $item_id   The item ID.
 * @return array Modified item data.
 */
$item_data = apply_filters( 'my_plugin_item_data', $item_data, $item_id );

// Usage by other plugins
add_filter( 'my_plugin_item_data', function( $data, $item_id ) {
    $data['modified_by'] = 'other_plugin';
    return $data;
}, 10, 2 );
```

### Short-Circuit Filters

```php
/**
 * Filters whether to proceed with the save operation.
 *
 * Return a WP_Error to abort with an error.
 * Return any non-null value to abort silently.
 *
 * @since 1.0.0
 *
 * @param null|WP_Error $pre       Null to proceed, WP_Error to abort.
 * @param array         $item_data The item data.
 * @param int           $item_id   The item ID.
 * @return null|WP_Error
 */
$pre = apply_filters( 'my_plugin_pre_save_item', null, $item_data, $item_id );

if ( $pre !== null ) {
    return $pre; // Aborted by filter
}
```

---

## 📊 Priority Guide

| Priority | Use Case |
|----------|----------|
| 1-4 | Framework/core overrides |
| 5-9 | Early modifications |
| 10 | Default (most hooks) |
| 11-15 | Late modifications |
| 16-99 | After most processing |
| 100+ | Final cleanup/logging |
| PHP_INT_MAX | Absolute last |

### Priority Example

```php
// Early: Set up defaults
add_filter( 'my_plugin_item_data', 'set_default_values', 5 );

// Normal: Regular modifications
add_filter( 'my_plugin_item_data', 'apply_business_rules', 10 );

// Late: Validation after all modifications
add_filter( 'my_plugin_item_data', 'validate_final_data', 20 );

// Very late: Logging
add_action( 'my_plugin_item_saved', 'log_save_operation', 100 );
```

---

## 🔧 Hook Architecture Patterns

### Complete Lifecycle Hooks

```php
class My_Plugin_Item_Manager {

    public function save( $item_id, $data ) {
        // Pre-save filter (can modify or short-circuit)
        $pre = apply_filters( 'my_plugin_pre_save_item', null, $data, $item_id );
        if ( $pre !== null ) {
            return $pre;
        }

        // Before save action
        do_action( 'my_plugin_before_save_item', $item_id, $data );

        // Filter the data
        $data = apply_filters( 'my_plugin_item_data', $data, $item_id );

        // Actual save operation
        $result = $this->do_save( $item_id, $data );

        // After save action
        do_action( 'my_plugin_after_save_item', $item_id, $data, $result );

        // Filter the result
        return apply_filters( 'my_plugin_save_result', $result, $item_id, $data );
    }
}
```

### Filter Chain Pattern

```php
class My_Plugin_Price_Calculator {

    public function get_price( $product_id ) {
        $price = $this->get_base_price( $product_id );

        // Allow base price modification
        $price = apply_filters( 'my_plugin_base_price', $price, $product_id );

        // Apply discounts
        $discounts = $this->calculate_discounts( $product_id, $price );
        $discounts = apply_filters( 'my_plugin_discounts', $discounts, $product_id, $price );
        $price -= $discounts;

        // Apply tax
        $tax = $this->calculate_tax( $price );
        $tax = apply_filters( 'my_plugin_tax_amount', $tax, $product_id, $price );
        $price += $tax;

        // Final price filter
        return apply_filters( 'my_plugin_final_price', $price, $product_id );
    }
}
```

### Conditional Hooks

```php
// Only fire in admin context
if ( is_admin() ) {
    do_action( 'my_plugin_admin_init' );
}

// Only fire for specific post types
if ( get_post_type( $post_id ) === 'my_custom_type' ) {
    do_action( 'my_plugin_custom_type_saved', $post_id );
}

// Dynamic hooks based on context
do_action( "my_plugin_{$action}_item", $item_id );
do_action( "my_plugin_item_{$status}", $item_id, $old_status );
```

---

## 📝 Hook Documentation Template

```php
/**
 * Hooks Reference
 *
 * Actions:
 * - my_plugin_init - Fires when plugin initializes
 * - my_plugin_before_save_item - Fires before item save
 * - my_plugin_after_save_item - Fires after item save
 * - my_plugin_item_deleted - Fires when item is deleted
 *
 * Filters:
 * - my_plugin_pre_save_item - Short-circuit item save
 * - my_plugin_item_data - Modify item data before save
 * - my_plugin_save_result - Modify save result
 * - my_plugin_capabilities - Modify plugin capabilities
 *
 * @package My_Plugin
 */
```

### Inline Hook Documentation

```php
/**
 * Filters the list of allowed item types.
 *
 * Use this filter to add custom item types that the plugin should recognize.
 *
 * @since 1.0.0
 * @since 2.0.0 Added `$context` parameter.
 *
 * @param string[] $types   Array of allowed type slugs.
 * @param string   $context The context: 'create', 'edit', or 'display'.
 * @return string[] Filtered array of allowed type slugs.
 *
 * @example
 * // Add a custom type
 * add_filter( 'my_plugin_allowed_types', function( $types, $context ) {
 *     if ( $context === 'create' ) {
 *         $types[] = 'custom_type';
 *     }
 *     return $types;
 * }, 10, 2 );
 */
$allowed_types = apply_filters( 'my_plugin_allowed_types', $types, $context );
```

---

## 🧪 Testing Hooks

```php
class Hook_Test extends WP_UnitTestCase {

    public function test_before_save_action_fires(): void {
        $fired = false;
        $received_id = null;

        add_action( 'my_plugin_before_save_item', function( $id ) use ( &$fired, &$received_id ) {
            $fired = true;
            $received_id = $id;
        } );

        $manager = new My_Plugin_Item_Manager();
        $manager->save( 123, [ 'title' => 'Test' ] );

        $this->assertTrue( $fired );
        $this->assertEquals( 123, $received_id );
    }

    public function test_data_filter_modifies_data(): void {
        add_filter( 'my_plugin_item_data', function( $data ) {
            $data['modified'] = true;
            return $data;
        } );

        $manager = new My_Plugin_Item_Manager();
        $result = $manager->save( 123, [ 'title' => 'Test' ] );

        // Verify the modified data was saved
        $saved = $manager->get( 123 );
        $this->assertTrue( $saved['modified'] );
    }

    public function test_pre_filter_can_short_circuit(): void {
        add_filter( 'my_plugin_pre_save_item', function() {
            return new WP_Error( 'blocked', 'Save blocked by filter' );
        } );

        $manager = new My_Plugin_Item_Manager();
        $result = $manager->save( 123, [ 'title' => 'Test' ] );

        $this->assertWPError( $result );
        $this->assertEquals( 'blocked', $result->get_error_code() );
    }
}
```

---

## 🔒 Removable Hook Pattern

```php
// Always use named functions for hooks that may need removal
class My_Plugin_Integration {

    public function __construct() {
        add_action( 'init', [ $this, 'on_init' ] );
        add_filter( 'the_content', [ $this, 'filter_content' ] );
    }

    public function on_init(): void {
        // ...
    }

    public function filter_content( $content ): string {
        // ...
        return $content;
    }

    public function remove_hooks(): void {
        remove_action( 'init', [ $this, 'on_init' ] );
        remove_filter( 'the_content', [ $this, 'filter_content' ] );
    }
}

// Other plugins can remove:
remove_action( 'init', [ My_Plugin::instance()->integration, 'on_init' ] );
```
