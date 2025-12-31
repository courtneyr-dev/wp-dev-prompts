# Block Pattern Recommender

> AI prompt for recommending WordPress block patterns and compositions based on design requirements.

## System Context

You are a WordPress block pattern expert who understands:
- Core block capabilities and limitations
- Block nesting rules and parent-child relationships
- Theme.json styling integration
- Responsive design patterns
- Accessibility requirements

## Primary Functions

1. **Pattern Recommendation** - Suggest block patterns for UI needs
2. **Composition Analysis** - Break down complex layouts into block structures
3. **Pattern Registration** - Generate PHP code to register patterns
4. **Pattern Optimization** - Improve existing patterns for performance/accessibility

---

## Prompt Template

```text
You are a WordPress block pattern architect.

Given this design requirement:
<insert design description or screenshot analysis>

Provide:

1. **Pattern Structure**
   - Block hierarchy diagram
   - Parent-child relationships
   - Required attributes per block

2. **Block Markup**
   - Complete block markup (HTML comments format)
   - All attributes and settings
   - Placeholder content

3. **Pattern Registration**
   - PHP code to register the pattern
   - Pattern categories
   - Keywords for discoverability

4. **Theme.json Integration**
   - Required style settings
   - Block-specific styles
   - Custom CSS if needed

5. **Variations**
   - Alternative layouts
   - Responsive adaptations
   - Color scheme variants

Format output as structured markdown with code blocks.
```

---

## Example Invocations

### Example 1: Testimonial Section

**Input:**
```text
Create a testimonial section with:
- Large quote
- Author name and title
- Author photo
- Company logo
- Subtle background
```

**Expected Output:**

```markdown
## Pattern Structure

```
group (background, padding)
├── columns
│   ├── column (30%)
│   │   └── image (author photo, circular)
│   └── column (70%)
│       ├── pullquote (testimonial text)
│       ├── paragraph (author name, bold)
│       ├── paragraph (author title, small)
│       └── image (company logo, small)
```

## Block Markup

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}},"color":{"background":"#f5f5f5"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#f5f5f5;padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">

  <!-- wp:columns {"verticalAlignment":"center","align":"wide"} -->
  <div class="wp-block-columns alignwide are-vertically-aligned-center">

    <!-- wp:column {"width":"30%"} -->
    <div class="wp-block-column" style="flex-basis:30%">
      <!-- wp:image {"align":"center","sizeSlug":"medium","className":"is-style-rounded"} -->
      <figure class="wp-block-image aligncenter size-medium is-style-rounded">
        <img src="author-photo.jpg" alt="Author Name"/>
      </figure>
      <!-- /wp:image -->
    </div>
    <!-- /wp:column -->

    <!-- wp:column {"width":"70%"} -->
    <div class="wp-block-column" style="flex-basis:70%">

      <!-- wp:pullquote {"style":{"typography":{"fontSize":"1.5rem"}}} -->
      <figure class="wp-block-pullquote">
        <blockquote>
          <p>"This product transformed our workflow. We've seen a 40% increase in productivity since implementing it."</p>
        </blockquote>
      </figure>
      <!-- /wp:pullquote -->

      <!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"}}} -->
      <p style="font-weight:600">Jane Smith</p>
      <!-- /wp:paragraph -->

      <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"},"color":{"text":"#666666"}}} -->
      <p class="has-text-color" style="color:#666666;font-size:0.875rem">VP of Operations, Acme Corp</p>
      <!-- /wp:paragraph -->

      <!-- wp:image {"width":"120px","sizeSlug":"full"} -->
      <figure class="wp-block-image size-full is-resized">
        <img src="company-logo.png" alt="Acme Corp logo" style="width:120px"/>
      </figure>
      <!-- /wp:image -->

    </div>
    <!-- /wp:column -->

  </div>
  <!-- /wp:columns -->

</div>
<!-- /wp:group -->

## Pattern Registration

```php
<?php
/**
 * Register testimonial pattern.
 */
function register_testimonial_pattern() {
    register_block_pattern(
        'theme-slug/testimonial-with-photo',
        [
            'title'       => __( 'Testimonial with Photo', 'theme-slug' ),
            'description' => __( 'A testimonial section with author photo and company logo.', 'theme-slug' ),
            'categories'  => [ 'testimonials', 'featured' ],
            'keywords'    => [ 'quote', 'review', 'testimonial', 'customer' ],
            'blockTypes'  => [ 'core/group' ],
            'content'     => '<!-- Block markup here -->',
        ]
    );
}
add_action( 'init', 'register_testimonial_pattern' );
```

## Theme.json Integration

```json
{
  "styles": {
    "blocks": {
      "core/pullquote": {
        "border": {
          "width": "0"
        },
        "typography": {
          "fontStyle": "italic"
        }
      }
    }
  }
}
```

## Variations

### Variation A: Centered Layout
- All content centered
- Photo above quote
- Best for single testimonials

### Variation B: Card Style
- Add border radius and shadow to group
- White background
- Floating card appearance

### Variation C: Dark Mode
- Dark background (#1a1a1a)
- Light text
- Inverted logo if needed
```

---

### Example 2: Pricing Table

**Input:**
```text
Create a 3-tier pricing table:
- Free, Pro, Enterprise tiers
- Feature lists with checkmarks
- Highlighted "popular" option
- CTA buttons
```

**Expected Output:**

```markdown
## Pattern Structure

```
group (container)
└── columns (3 equal)
    ├── column (Free tier)
    │   └── group (card)
    │       ├── heading (tier name)
    │       ├── paragraph (price)
    │       ├── separator
    │       ├── list (features)
    │       └── buttons > button
    ├── column (Pro tier - highlighted)
    │   └── group (card, accent border)
    │       ├── paragraph (badge: "Popular")
    │       ├── heading (tier name)
    │       ├── paragraph (price)
    │       ├── separator
    │       ├── list (features)
    │       └── buttons > button (filled)
    └── column (Enterprise tier)
        └── group (card)
            ├── heading (tier name)
            ├── paragraph (price)
            ├── separator
            ├── list (features)
            └── buttons > button
```

## Block Markup

<!-- wp:group {"align":"wide","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide">

  <!-- wp:columns {"align":"wide"} -->
  <div class="wp-block-columns alignwide">

    <!-- Free Tier -->
    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"style":{"border":{"width":"1px","color":"#e0e0e0","radius":"8px"},"spacing":{"padding":{"top":"var:preset|spacing|40","right":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40"}}}} -->
      <div class="wp-block-group has-border-color" style="border-color:#e0e0e0;border-width:1px;border-radius:8px;padding:var(--wp--preset--spacing--40)">

        <!-- wp:heading {"textAlign":"center","level":3} -->
        <h3 class="has-text-align-center">Free</h3>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"}}} -->
        <p class="has-text-align-center" style="font-size:2.5rem;font-weight:700">$0<span style="font-size:1rem;font-weight:400">/month</span></p>
        <!-- /wp:paragraph -->

        <!-- wp:separator {"className":"is-style-wide"} -->
        <hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
        <!-- /wp:separator -->

        <!-- wp:list -->
        <ul>
          <li>5 projects</li>
          <li>Basic analytics</li>
          <li>Community support</li>
          <li>1 team member</li>
        </ul>
        <!-- /wp:list -->

        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
        <div class="wp-block-buttons">
          <!-- wp:button {"className":"is-style-outline","width":100} -->
          <div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-outline">
            <a class="wp-block-button__link">Get Started</a>
          </div>
          <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->

      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->

    <!-- Pro Tier (Popular) -->
    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- wp:group {"style":{"border":{"width":"2px","color":"#0073aa","radius":"8px"},"spacing":{"padding":{"top":"var:preset|spacing|40","right":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40"}},"shadow":"0 4px 20px rgba(0,0,0,0.1)"}} -->
      <div class="wp-block-group has-border-color" style="border-color:#0073aa;border-width:2px;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.1);padding:var(--wp--preset--spacing--40)">

        <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.75rem","fontWeight":"600","textTransform":"uppercase","letterSpacing":"0.1em"},"color":{"background":"#0073aa","text":"#ffffff"},"spacing":{"padding":{"top":"4px","right":"12px","bottom":"4px","left":"12px"}},"border":{"radius":"4px"}}} -->
        <p class="has-text-align-center has-text-color has-background" style="background-color:#0073aa;color:#ffffff;border-radius:4px;font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;padding:4px 12px">Most Popular</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading {"textAlign":"center","level":3} -->
        <h3 class="has-text-align-center">Pro</h3>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"}}} -->
        <p class="has-text-align-center" style="font-size:2.5rem;font-weight:700">$29<span style="font-size:1rem;font-weight:400">/month</span></p>
        <!-- /wp:paragraph -->

        <!-- wp:separator {"className":"is-style-wide"} -->
        <hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
        <!-- /wp:separator -->

        <!-- wp:list -->
        <ul>
          <li>Unlimited projects</li>
          <li>Advanced analytics</li>
          <li>Priority support</li>
          <li>10 team members</li>
          <li>API access</li>
        </ul>
        <!-- /wp:list -->

        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
        <div class="wp-block-buttons">
          <!-- wp:button {"width":100,"backgroundColor":"primary"} -->
          <div class="wp-block-button has-custom-width wp-block-button__width-100">
            <a class="wp-block-button__link has-primary-background-color has-background">Start Free Trial</a>
          </div>
          <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->

      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->

    <!-- Enterprise Tier -->
    <!-- wp:column -->
    <div class="wp-block-column">
      <!-- Same structure as Free tier with Enterprise content -->
    </div>
    <!-- /wp:column -->

  </div>
  <!-- /wp:columns -->

</div>
<!-- /wp:group -->

## Pattern Registration

```php
register_block_pattern(
    'theme-slug/pricing-table-three-tier',
    [
        'title'       => __( 'Three-Tier Pricing Table', 'theme-slug' ),
        'description' => __( 'A pricing comparison table with Free, Pro, and Enterprise tiers.', 'theme-slug' ),
        'categories'  => [ 'pricing', 'featured' ],
        'keywords'    => [ 'pricing', 'plans', 'subscription', 'comparison' ],
        'viewportWidth' => 1200,
        'content'     => '<!-- Block markup here -->',
    ]
);
```
```

---

## Pattern Categories Reference

Register custom categories for organization:

```php
register_block_pattern_category(
    'testimonials',
    [ 'label' => __( 'Testimonials', 'theme-slug' ) ]
);

register_block_pattern_category(
    'pricing',
    [ 'label' => __( 'Pricing', 'theme-slug' ) ]
);

register_block_pattern_category(
    'call-to-action',
    [ 'label' => __( 'Call to Action', 'theme-slug' ) ]
);
```

---

## Usage Notes

- Test patterns in the block editor before registering
- Use theme.json color/spacing presets for consistency
- Include `viewportWidth` for wide patterns
- Provide meaningful `keywords` for searchability
- Consider mobile layout in all patterns
