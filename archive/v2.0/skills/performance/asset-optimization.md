# Asset Optimization for WordPress

> **Type**: Skill
> **Domain**: Performance
> **Focus**: Optimizing CSS, JavaScript, and images for WordPress

<skill>
<summary>
Techniques for optimizing static assets in WordPress plugins and themes to improve loading performance.
</summary>

<knowledge>
## Script and Style Loading

### Defer and Async Loading

```php
// Defer script (WP 6.3+)
wp_enqueue_script(
    'my-script',
    plugin_dir_url( __FILE__ ) . 'js/script.js',
    array(),
    '1.0.0',
    array(
        'strategy' => 'defer',
    )
);

// Async script
wp_enqueue_script(
    'my-analytics',
    'https://example.com/analytics.js',
    array(),
    '1.0.0',
    array(
        'strategy' => 'async',
    )
);

// In footer (legacy approach)
wp_enqueue_script(
    'my-script',
    plugin_dir_url( __FILE__ ) . 'js/script.js',
    array(),
    '1.0.0',
    true // in_footer
);
```

### Conditional Loading

```php
// Load only on specific admin pages
add_action( 'admin_enqueue_scripts', function( $hook ) {
    if ( 'settings_page_my-plugin' !== $hook ) {
        return;
    }

    wp_enqueue_script( 'my-admin-script', ... );
} );

// Load only when block is used
add_action( 'enqueue_block_assets', function() {
    if ( ! has_block( 'my-plugin/my-block' ) ) {
        return;
    }

    wp_enqueue_style( 'my-block-style', ... );
} );

// Load on specific post types
add_action( 'wp_enqueue_scripts', function() {
    if ( ! is_singular( 'my_cpt' ) ) {
        return;
    }

    wp_enqueue_script( 'my-cpt-script', ... );
} );
```

### Script Dependencies

```php
// Correct dependency chain
wp_enqueue_script(
    'my-component',
    plugin_dir_url( __FILE__ ) . 'js/component.js',
    array( 'wp-element', 'wp-components', 'wp-i18n' ),
    '1.0.0',
    array( 'strategy' => 'defer' )
);

// Register without enqueue
wp_register_script( 'my-library', ... );

// Enqueue only when needed
if ( $condition ) {
    wp_enqueue_script( 'my-library' );
}
```

## CSS Optimization

### Critical CSS

```php
// Inline critical CSS
add_action( 'wp_head', function() {
    ?>
    <style id="critical-css">
        /* Above-the-fold styles */
        .header { ... }
        .hero { ... }
    </style>
    <?php
}, 1 );

// Defer non-critical CSS
add_filter( 'style_loader_tag', function( $html, $handle ) {
    if ( 'my-non-critical-style' === $handle ) {
        $html = str_replace(
            "rel='stylesheet'",
            "rel='preload' as='style' onload=\"this.onload=null;this.rel='stylesheet'\"",
            $html
        );
        $html .= "<noscript><link rel='stylesheet' href='" . wp_styles()->registered[ $handle ]->src . "'></noscript>";
    }
    return $html;
}, 10, 2 );
```

### CSS Containment

```css
/* Improve rendering performance */
.independent-component {
    contain: layout style paint;
}

/* For complex widgets */
.complex-widget {
    content-visibility: auto;
    contain-intrinsic-size: 0 500px;
}
```

### Reduce Unused CSS

```bash
# PurgeCSS configuration
npx purgecss --css build/*.css --content "**/*.php" "**/*.html" -o build/
```

**purgecss.config.js:**
```javascript
module.exports = {
    content: [
        './**/*.php',
        './src/**/*.js',
        './src/**/*.jsx',
    ],
    css: ['./build/*.css'],
    safelist: [
        /^wp-/,
        /^is-/,
        /^has-/,
        /^block-/,
        /^alignwide/,
        /^alignfull/,
    ],
};
```

## Image Optimization

### WordPress Native Features

```php
// WebP generation (WP 5.8+)
add_filter( 'image_editor_output_format', function( $formats ) {
    $formats['image/jpeg'] = 'image/webp';
    $formats['image/png'] = 'image/webp';
    return $formats;
} );

// Responsive images are automatic
// Verify srcset is present:
$image = wp_get_attachment_image( $id, 'large' );
// Includes srcset and sizes by default
```

### Lazy Loading

```php
// WordPress 5.5+ adds loading="lazy" automatically
// Add fetchpriority for above-fold images
add_filter( 'wp_get_attachment_image_attributes', function( $attr, $attachment, $size ) {
    // LCP image gets high priority
    if ( is_singular() && has_post_thumbnail() && get_post_thumbnail_id() === $attachment->ID ) {
        $attr['fetchpriority'] = 'high';
        $attr['loading'] = 'eager';
    }
    return $attr;
}, 10, 3 );
```

### Preloading

```php
add_action( 'wp_head', function() {
    // Preload LCP image
    if ( is_front_page() ) {
        echo '<link rel="preload" as="image" href="' . esc_url( get_theme_file_uri( 'images/hero.webp' ) ) . '">';
    }

    // Preload fonts
    echo '<link rel="preload" as="font" type="font/woff2" href="' . esc_url( get_theme_file_uri( 'fonts/custom.woff2' ) ) . '" crossorigin>';
}, 1 );
```

## Build Optimization

### Webpack Configuration

```javascript
// webpack.config.js
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    optimization: {
        ...defaultConfig.optimization,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};
```

### Tree Shaking

```javascript
// Import only what you need
import { Button, TextControl } from '@wordpress/components';

// Not the entire package
// import * as components from '@wordpress/components'; // Bad

// Use named exports in your code
export { MyComponent } from './MyComponent';
```

## Measuring Impact

### Performance Budget

```json
// budget.json
[
    {
        "path": "/*",
        "resourceSizes": [
            { "resourceType": "script", "budget": 200 },
            { "resourceType": "stylesheet", "budget": 50 },
            { "resourceType": "total", "budget": 400 }
        ]
    }
]
```

### Lighthouse CI

```yaml
# In CI
- name: Lighthouse Performance
  run: |
    npx lhci autorun --collect.settings.preset=desktop
```

## Caching Strategy

### Script/Style Versioning

```php
// Use file modification time for cache busting
wp_enqueue_script(
    'my-script',
    plugin_dir_url( __FILE__ ) . 'js/script.js',
    array(),
    filemtime( plugin_dir_path( __FILE__ ) . 'js/script.js' )
);

// Or use plugin version
wp_enqueue_script(
    'my-script',
    plugin_dir_url( __FILE__ ) . 'js/script.js',
    array(),
    MY_PLUGIN_VERSION
);
```

### CDN Integration

```php
// Use WordPress.org CDN for common assets
wp_enqueue_script(
    'lodash',
    'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
    array(),
    '4.17.21'
);

// Integrity checks
add_filter( 'script_loader_tag', function( $tag, $handle ) {
    if ( 'lodash' === $handle ) {
        return str_replace(
            ' src=',
            ' integrity="sha384-..." crossorigin="anonymous" src=',
            $tag
        );
    }
    return $tag;
}, 10, 2 );
```
</knowledge>

<best_practices>
- Load scripts only when needed
- Use defer/async for non-critical scripts
- Inline critical CSS
- Lazy load below-fold images
- Preload LCP resources
- Set performance budgets
</best_practices>

<commands>
```bash
# Build with optimization
npm run build

# Analyze bundle size
npx webpack-bundle-analyzer build/

# Check unused CSS
npx purgecss --css build/*.css --content "**/*.php"

# Lighthouse audit
npx lighthouse http://localhost:8888 --only-categories=performance
```
</commands>
</skill>
