# Core Web Vitals

> **Type**: Skill
> **Domain**: Performance
> **Source**: WordPress/agent-skills wp-performance

<skill>
<summary>
Understanding and optimizing Core Web Vitals for WordPress sites.
</summary>

<knowledge>
## The Three Metrics

**LCP (Largest Contentful Paint):**
- Measures loading performance
- Time until largest content element is visible
- Target: < 2.5 seconds

**INP (Interaction to Next Paint):**
- Measures interactivity responsiveness
- Time from user interaction to visual feedback
- Target: < 200 milliseconds
- Replaced FID in March 2024

**CLS (Cumulative Layout Shift):**
- Measures visual stability
- Unexpected layout shifts during page life
- Target: < 0.1

## Measuring Core Web Vitals

**Field Data (Real Users):**
- Chrome User Experience Report (CrUX)
- Google Search Console
- Real User Monitoring (RUM)

**Lab Data (Synthetic):**
- Lighthouse
- PageSpeed Insights
- WebPageTest

**WordPress Tools:**
```bash
# WP-CLI profiling
wp profile stage --url=https://example.com/

# WP Doctor checks
wp doctor check

# Query Monitor (in-browser)
# Activate Query Monitor plugin
```

## LCP Optimization

**Common LCP Elements:**
- Hero images
- Featured images
- Large text blocks
- Video posters

**Optimization Strategies:**
```php
// Preload LCP image
add_action( 'wp_head', function() {
    echo '<link rel="preload" as="image" href="hero.webp">';
} );

// Priority hints
<img fetchpriority="high" src="hero.webp" alt="Hero">

// Lazy load below-fold images only
<img loading="lazy" src="below-fold.webp" alt="...">
```

## INP Optimization

**Common Causes:**
- Heavy JavaScript execution
- Long tasks blocking main thread
- Complex event handlers
- Third-party scripts

**Optimization Strategies:**
```javascript
// Break up long tasks
function processItems(items) {
    if (items.length === 0) return;

    const item = items.shift();
    processItem(item);

    // Yield to browser
    requestIdleCallback(() => processItems(items));
}

// Debounce event handlers
const debouncedHandler = debounce(handler, 150);
```

## CLS Optimization

**Common Causes:**
- Images without dimensions
- Ads/embeds without reserved space
- Dynamic content injection
- Web fonts causing FOIT/FOUT

**Optimization Strategies:**
```html
<!-- Always set dimensions -->
<img src="image.jpg" width="800" height="600" alt="...">

<!-- Reserve space for embeds -->
<div style="aspect-ratio: 16/9;">
    <iframe src="..."></iframe>
</div>
```

```css
/* Prevent font swap shifts */
@font-face {
    font-family: 'Custom';
    font-display: optional; /* or swap */
}
```

## WordPress-Specific Tips

**WP 6.9+ Features:**
- On-demand CSS loading for classic themes
- 30-65% CSS reduction possible
- Verify theme takes advantage

**Image Optimization:**
```php
// WebP support (WP 5.8+)
add_filter( 'image_editor_output_format', function( $formats ) {
    $formats['image/jpeg'] = 'image/webp';
    return $formats;
} );

// Responsive images (automatic in WP)
// Verify srcset is present in markup
```

**Script Loading:**
```php
// Defer non-critical scripts
wp_enqueue_script( 'my-script', 'script.js', array(), '1.0', array(
    'strategy' => 'defer',
) );

// Async loading
wp_enqueue_script( 'my-script', 'script.js', array(), '1.0', array(
    'strategy' => 'async',
) );
```
</knowledge>

<best_practices>
- Measure before optimizing
- Focus on dominant bottleneck first
- Use field data when available
- Test on real devices
- Monitor after changes
</best_practices>

<references>
- [WordPress/agent-skills wp-performance](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-performance)
- [web.dev Core Web Vitals](https://web.dev/vitals/)
</references>
</skill>
