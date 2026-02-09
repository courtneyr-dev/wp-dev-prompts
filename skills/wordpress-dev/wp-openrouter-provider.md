# WP OpenRouter Provider

> **Source**: [jonathanbossenger/wp-openrouter-provider](https://github.com/jonathanbossenger/wp-openrouter-provider)
> **License**: Check repository
> **Last reviewed**: 2026-02-09

## Summary

WordPress plugin that registers [OpenRouter](https://openrouter.ai) as an AI model provider for the [WordPress AI Client](https://github.com/WordPress/wordpress-ai-client) library. Gives WordPress access to 400+ AI models (Claude, GPT-4, Llama, Gemini, Mistral) through a single OpenAI-compatible API endpoint.

## Key Patterns

### AI Client Provider Registration

The plugin extends the WordPress AI Client's provider architecture. This is the pattern for registering a custom AI provider:

```php
// Hook into init to register the provider
add_action( 'init', function() {
    if ( ! class_exists( 'WordPress\AI\Client' ) ) {
        return;
    }

    $provider = new OpenRouterProvider( /* config */ );
    // Provider is registered with the AI Client automatically
} );
```

Provider classes extend `AbstractApiProvider` and implement:

- `baseUrl()` -- the API endpoint
- `createModel()` -- factory for model instances
- `createProviderMetadata()` -- provider identity (name, type)
- `createProviderAvailability()` -- model listing
- `createModelMetadataDirectory()` -- model discovery

### OpenAI-Compatible Models

Since OpenRouter uses the OpenAI-compatible API format, the text generation model extends `AbstractOpenAiCompatibleTextGenerationModel`. This pattern works for any OpenAI-compatible provider:

```php
class OpenRouterTextGenerationModel extends AbstractOpenAiCompatibleTextGenerationModel {
    protected function createRequest( array $params ): array {
        // Point /chat/completions at OpenRouter's base URL
        // Parent class handles request formatting
    }
}
```

### Custom Authentication Headers

The authentication class implements `RequestAuthenticationInterface` to inject:

```php
// Required
'Authorization' => 'Bearer ' . $api_key,

// Optional attribution headers
'HTTP-Referer' => $site_url,   // Your site URL for OpenRouter tracking
'X-Title'      => $site_name,  // Your site name for OpenRouter dashboard
```

### Model Discovery

The `OpenRouterModelMetadataDirectory` hits `/models` to discover available models and parses modality strings:

- `"text->text"` -- text generation
- `"text+image->text"` -- multimodal input
- Maps to AI Client capabilities: text generation, chat history, image input

### Settings API Integration

The plugin uses WordPress Settings API with proper sanitization:

| Option | Purpose | Sanitizer |
|--------|---------|-----------|
| `wp_openrouter_provider_api_key` | API key | Custom (clears model cache on change) |
| `wp_openrouter_provider_model` | Selected model ID | `sanitize_text_field` |
| `wp_openrouter_provider_enable_attribution` | Send referer headers | `rest_sanitize_boolean` |
| `wp_openrouter_provider_site_url` | Attribution URL | `esc_url_raw` |
| `wp_openrouter_provider_site_name` | Attribution name | `sanitize_text_field` |

### Transient Caching

Model list is cached as a WordPress transient for 10 minutes by default. Cache invalidation happens when the API key changes or when the admin clicks "Refresh Model List."

### Custom Filters

All filters are prefixed with `wp_openrouter_provider_`:

```php
// Override base URL
add_filter( 'wp_openrouter_provider_base_url', function( $url ) {
    return 'https://custom-openrouter-proxy.example.com/api/v1';
} );

// Filter available models
add_filter( 'wp_openrouter_provider_models', function( $models ) {
    // Only show free models, for example
    return array_filter( $models, fn( $m ) => $m['pricing']['prompt'] === '0' );
} );

// Adjust request timeout (default: 30s)
add_filter( 'wp_openrouter_provider_request_timeout', fn() => 60 );

// Adjust cache duration (default: 600 seconds)
add_filter( 'wp_openrouter_provider_cache_duration', fn() => 1800 );
```

### Public API

Three helper functions expose plugin state:

```php
// Get the currently selected model ID
$model = wp_openrouter_provider_get_selected_model();

// Check if the provider is registered with the AI Client
if ( wp_openrouter_provider_is_registered() ) {
    // Provider is active
}

// Check if settings page exists
$has_settings = wp_openrouter_provider_has_settings_page();
```

## Architecture Notes

- Main plugin file is a monolith (~600 lines) handling all WordPress integration
- OOP classes in `includes/Providers/OpenRouter/` handle AI Client integration only
- Uses PSR-4 autoloading via Composer (`WpOpenRouterProvider\` namespace)
- Select2 loaded from CDN for searchable model dropdown
- AJAX handler for model fetching verifies nonce + `manage_options` capability
- Requires WordPress 6.0+, PHP 8.0+, and `wordpress/wp-ai-client ^0.2.1`

## When to Reference This Skill

Use this as a reference when:

- Building a custom AI provider for the WordPress AI Client
- Integrating OpenRouter's multi-model gateway into a WordPress plugin
- Implementing OpenAI-compatible API wrappers in WordPress
- Working with the WordPress AI Client provider architecture
- Adding searchable dropdowns with Select2 in WordPress admin settings

## References

- [jonathanbossenger/wp-openrouter-provider](https://github.com/jonathanbossenger/wp-openrouter-provider) -- source repository
- [WordPress AI Client](https://github.com/WordPress/wordpress-ai-client) -- core library
- [OpenRouter API](https://openrouter.ai/docs) -- API documentation
- [OpenRouter Models](https://openrouter.ai/models) -- full model catalog
