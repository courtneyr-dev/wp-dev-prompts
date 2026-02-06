# WordPress Block Development: AI Prompts Guide

Comprehensive prompt templates for building Gutenberg blocks, block themes, and interactive blocks using the WordPress Interactivity API. These prompts incorporate best practices from [WordPress/agent-skills](https://github.com/WordPress/agent-skills).

**Compatible with**: WordPress 6.9+ | PHP 8.2+ | Node 20+
**Source**: [WordPress/agent-skills](https://github.com/WordPress/agent-skills) - WordPress Agent Skills for AI assistants

---

## Table of Contents

1. [Block Creation Prompts](#block-creation-prompts)
2. [Block Theme Prompts](#block-theme-prompts)
3. [Interactivity API Prompts](#interactivity-api-prompts)
4. [Block Deprecation Prompts](#block-deprecation-prompts)
5. [Abilities API Prompts](#abilities-api-prompts)

---

## Block Creation Prompts

*(From [WordPress/agent-skills wp-block-development](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-block-development))*

### 1. Create a New Static Block

#### Context
Create a static block that saves content directly to post_content.

#### Prompt
```markdown
Create a new WordPress Gutenberg block with the following specifications:

Block details:
- Block name: [namespace]/[block-name]
- Block title: [Human Readable Title]
- Block description: [What the block does]
- Block category: [text/media/design/widgets/theme/embed]
- WordPress target: 6.9+

Requirements:
- Use apiVersion: 3 (required for WordPress 6.9+ and mandatory for WP 7.0 iframe support)
- Create block.json with proper metadata
- Create edit.js with InspectorControls for settings
- Create save.js for frontend output
- Include proper styling (editor.scss and style.scss)
- Follow WordPress Block API best practices

Attributes needed:
- [attribute1]: [type, default value]
- [attribute2]: [type, default value]

Do NOT include:
- No deprecated patterns from older WordPress versions
- No inline styles in JavaScript (use CSS classes)

Important from agent-skills:
- Never change block names after initial creation (breaks compatibility)
- Use proper attribute source definitions for content extraction
```

#### Expected Output
- Complete block.json configuration
- edit.js with full editor functionality
- save.js with proper output
- SCSS files for styling
- index.js for registration

---

### 2. Create a Dynamic Block

#### Context
Create a server-rendered block that uses render_callback or render.php.

#### Prompt
```markdown
Create a dynamic WordPress block that renders on the server.

Block details:
- Block name: [namespace]/[block-name]
- Block title: [Human Readable Title]
- Purpose: [Why this needs server rendering - e.g., database queries, user-specific content]
- WordPress target: 6.9+

Requirements:
- Use apiVersion: 3
- Create block.json with render property
- Create render.php for server-side output
- Create edit.js for editor preview
- Use ServerSideRender component or custom preview logic
- Include proper attribute sanitization and escaping in PHP

PHP render context:
- What data does it need to fetch? [describe data needs]
- What WordPress APIs will it use? [WP_Query, get_posts, get_users, etc.]

Security requirements from agent-skills:
- Escape all output with esc_html(), esc_attr(), wp_kses_post() as appropriate
- Sanitize any user input before processing
- Use current_user_can() for any permission-based output
```

#### Expected Output
- block.json with render configuration
- render.php with secure output
- edit.js with editor experience
- Proper attribute definitions

---

### 3. Scaffold Block with @wordpress/create-block

#### Context
Use the official scaffolding tool to create a new block.

#### Prompt
```markdown
Help me scaffold a new WordPress block using @wordpress/create-block.

Block requirements:
- Block slug: [block-slug]
- Block namespace: [namespace]
- Block title: [Human Readable Title]
- Block type: [static/dynamic/interactive]
- WordPress target: 6.9+

If interactive, use the interactive template:
npx @wordpress/create-block-interactive-template [block-slug]

Otherwise:
npx @wordpress/create-block [block-slug] --namespace=[namespace]

After scaffolding, help me:
1. Update block.json to use apiVersion: 3
2. Configure proper attributes for my use case
3. Set up the edit.js with my required controls
4. [For static] Set up save.js properly
5. [For dynamic] Set up render.php securely
6. [For interactive] Set up the Interactivity API store

My block needs to:
[Describe what the block should do]
```

---

## Block Theme Prompts

*(From [WordPress/agent-skills wp-block-themes](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-block-themes))*

### 4. Create theme.json Configuration

#### Context
Set up or modify theme.json for a block theme.

#### Prompt
```markdown
Help me configure theme.json for my WordPress block theme.

Theme details:
- Theme name: [theme-name]
- WordPress target: 6.9+
- theme.json version: 3

I need to configure:

**Settings (UI controls/presets):**
- Color palette: [describe colors needed]
- Typography: [font families, sizes]
- Spacing: [spacing scale]
- Layout: [content width, wide width]

**Styles (default appearance):**
- Background and text colors
- Typography defaults
- Link styles
- Block-specific styles

Important from agent-skills:
- Understand WordPress style hierarchy: core defaults → theme.json → child theme → user customizations
- Settings control what appears in the UI; Styles set default appearance
- User Site Editor customizations can override theme defaults
- Place templates in templates/, parts in parts/ (no nested subdirectories)

Current issue (if debugging):
[Describe any styling issues you're experiencing]
```

#### Expected Output
- Complete theme.json structure
- Proper settings and styles separation
- Correct schema version

---

### 5. Create Block Pattern

#### Context
Create a reusable block pattern for a theme.

#### Prompt
```markdown
Create a WordPress block pattern for my theme.

Pattern details:
- Pattern name: [namespace]/[pattern-name]
- Pattern title: [Human Readable Title]
- Pattern category: [featured/header/footer/posts/text/gallery/call-to-action/etc.]
- WordPress target: 6.9+

Pattern should include:
- [Describe the layout and blocks needed]
- [List specific blocks to use]
- [Describe styling requirements]

Pattern registration location:
- patterns/[pattern-name].php (filesystem-based)

Include:
- Proper pattern metadata header
- Block markup with appropriate defaults
- Placeholder content that demonstrates usage
- Theme-aware styling (use theme.json presets)

Do NOT:
- Hardcode colors or sizes (use CSS custom properties)
- Include images without proper placeholders
```

#### Expected Output
- Pattern PHP file with proper header
- Block markup for the pattern
- Instructions for category registration if needed

---

### 6. Create Style Variation

#### Context
Create a theme style variation for alternate designs.

#### Prompt
```markdown
Create a WordPress theme style variation.

Variation details:
- Variation name: [variation-name]
- Variation title: [Human Readable Title]
- Purpose: [What makes this variation different]

The variation should modify:
- Color scheme: [describe changes]
- Typography: [describe changes]
- Spacing: [describe changes if any]

Create as: styles/[variation-name].json

Important:
- Only include settings/styles that differ from main theme.json
- Maintain accessibility contrast ratios
- Test with Site Editor preview
```

---

## Interactivity API Prompts

*(From [WordPress/agent-skills wp-interactivity-api](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-interactivity-api))*

### 7. Create Interactive Block

#### Context
Build a block using the WordPress Interactivity API for client-side interactions.

#### Prompt
```markdown
Create an interactive WordPress block using the Interactivity API.

Block details:
- Block name: [namespace]/[block-name]
- Block title: [Human Readable Title]
- WordPress target: 6.9+
- Store namespace: [namespace]

Interactivity requirements:
- User interactions: [describe what user can do - click, hover, type, etc.]
- State changes: [describe what changes when user interacts]
- Initial state: [describe default state]

Directives I'll need:
- [ ] data-wp-interactive (required)
- [ ] data-wp-context (local context)
- [ ] data-wp-bind (attribute binding)
- [ ] data-wp-class (class binding)
- [ ] data-wp-style (style binding)
- [ ] data-wp-text (text content binding)
- [ ] data-wp-on (event handlers)
- [ ] data-wp-watch (side effects)
- [ ] data-wp-init (initialization)

Important from agent-skills:
- Ensure server-rendered markup + client hydration align
- Keep directives scoped and minimal
- data-wp-ignore is deprecated in WordPress 6.9
- Server state resets between page transitions; don't assume stale values persist
- Use @wordpress/create-block-interactive-template for scaffolding

Please provide:
1. block.json with viewScriptModule configuration
2. render.php with proper directives
3. view.js with store definition (state, actions, callbacks)
4. edit.js for editor experience
```

#### Expected Output
- Complete interactive block structure
- Proper store definition
- Working directive implementation
- Editor preview setup

---

### 8. Debug Interactivity API Issues

#### Context
Troubleshoot non-functional Interactivity API directives.

#### Prompt
```markdown
Help me debug my WordPress Interactivity API block that isn't working.

Block details:
- Block name: [namespace]/[block-name]
- Store namespace: [namespace]
- WordPress version: [version]

Current behavior:
- [Describe what's happening]

Expected behavior:
- [Describe what should happen]

Debugging checklist from agent-skills:

1. View script module loading:
   - Is viewScriptModule defined in block.json?
   - Check browser Network tab for script loading

2. DOM element requirements:
   - Does the container have data-wp-interactive="[namespace]"?
   - Are child elements using the correct namespace in directives?

3. Store namespace matching:
   - Does the store namespace in view.js match the directive namespace?
   - store('[namespace]', { ... }) must match data-wp-interactive="[namespace]"

4. JavaScript errors:
   - Check browser console for errors blocking hydration
   - Look for undefined store, missing dependencies, syntax errors

5. Server/client alignment:
   - Does server-rendered markup match what client expects?
   - Are data-wp-context values valid JSON?

Please help me identify the issue based on:
[Paste relevant code: block.json, render.php, view.js]
```

---

### 9. Add Interactivity to Existing Block

#### Context
Convert a static or dynamic block to use the Interactivity API.

#### Prompt
```markdown
Help me add Interactivity API functionality to my existing WordPress block.

Current block:
- Block name: [namespace]/[block-name]
- Current type: [static/dynamic]
- Current functionality: [describe what it does now]

New interactive functionality:
- [Describe what interactions to add]

Migration requirements:
1. Add viewScriptModule to block.json
2. Create view.js with store definition
3. Add directives to server-rendered markup (render.php or save.js output)
4. Ensure hydration alignment

Important considerations from agent-skills:
- Don't change the block name
- Add deprecations if changing saved markup (for static blocks)
- Test server rendering matches client expectations
- Keep existing functionality working during migration
```

---

## Block Deprecation Prompts

*(From [WordPress/agent-skills wp-block-development](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-block-development))*

### 10. Add Block Deprecation

#### Context
Add a deprecation when changing block structure or attributes.

#### Prompt
```markdown
Help me add a deprecation to my WordPress block to handle a breaking change.

Block details:
- Block name: [namespace]/[block-name]
- WordPress target: 6.9+

Change description:
- What changed: [attribute schema change/markup change/class name change/etc.]
- Old implementation: [describe or paste old code]
- New implementation: [describe or paste new code]

Important guidance from agent-skills:
- "When in doubt, add a migration path rather than silently changing selectors"
- Add newer deprecations at the START of the deprecated array (newest → oldest)
- Maintain fixtures (example content) for each deprecated version

Create deprecation with:
1. Old attribute definitions (if changed)
2. Old supports configuration (if changed)
3. Old save function implementation
4. Migrate function to convert old attributes to new format
5. isEligible function (optional, for complex migrations)

Also provide:
- Example fixture content for testing
- Test approach to verify migration works
```

#### Expected Output
- Complete deprecated array entry
- Migration function logic
- Fixture example
- Testing recommendations

---

## Abilities API Prompts

*(From [WordPress/agent-skills wp-abilities-api](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-abilities-api))*

### 11. Register WordPress Ability

#### Context
Register a new ability for permission-based functionality (WordPress 6.9+).

#### Prompt
```markdown
Help me register a new WordPress Ability using the Abilities API.

Ability details:
- Ability ID: [namespace]/[ability-name]
- Ability label: [Human Readable Label]
- Ability description: [What this ability grants]
- Category: [category-name] (or create new category)

Requirements:
- WordPress 6.9+
- PHP registration with wp_register_ability()
- REST API exposure (show_in_rest: true)
- JavaScript consumption via @wordpress/abilities

Create:
1. PHP ability registration with proper metadata
2. Category registration if needed (wp_register_ability_category)
3. JavaScript integration example

Important from agent-skills:
- Set meta.show_in_rest: true for client visibility
- Category and ID must match exactly between registration and usage
- If REST shows ability but JavaScript doesn't, check dependency bundling and object caching
```

#### Expected Output
- PHP registration code
- Category registration (if needed)
- JavaScript usage example
- Verification steps

---

### 12. Debug Missing Abilities

#### Context
Troubleshoot abilities that aren't appearing in REST or JavaScript.

#### Prompt
```markdown
Help me debug why my WordPress Ability isn't visible.

Ability details:
- Ability ID: [namespace]/[ability-name]
- Where it's missing: [REST API/JavaScript/both]

Debugging checklist from agent-skills:

1. Registration execution:
   - Is registration code actually running?
   - Check for PHP errors in debug.log

2. REST exposure:
   - Is meta.show_in_rest set to true?
   - Check wp-abilities/v1 endpoint response

3. Category matching:
   - Does category ID match between ability and category registration?

4. JavaScript visibility:
   - If REST works but JS doesn't:
     - Check @wordpress/abilities is properly imported
     - Check dependency bundling in block.json or script registration
     - Clear object cache and test again

5. Caching issues:
   - Object cache may be caching old values
   - Try flushing cache and re-testing

Please help me identify the issue based on:
[Describe your implementation or paste relevant code]
```

---

## Related Skills

These prompts work best when combined with the following skills from this repository:

| Skill | Use For |
|-------|---------|
| [Block Development](../../skills/wordpress-dev/block-development.md) | API versions, deprecations, block types |
| [Block Themes](../../skills/wordpress-dev/block-themes.md) | theme.json, templates, style variations |
| [Interactivity API](../../skills/wordpress-dev/interactivity-api.md) | Directives, stores, hydration |
| [Abilities API](../../skills/wordpress-dev/abilities-api.md) | Permission-based functionality |
| [REST API](../../skills/wordpress-dev/rest-api.md) | Custom endpoints, authentication |
| [Project Triage](../../skills/wordpress-dev/project-triage.md) | Project detection before development |
| [WPDS](../../skills/ui-ux-audit/wpds.md) | WordPress Design System components |

---

## Additional Resources

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [Interactivity API Reference](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/)
- [theme.json Reference](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/)
- [WordPress/agent-skills](https://github.com/WordPress/agent-skills) - WordPress Agent Skills for AI assistants

---

## Contributing

Found a better prompt pattern? Have suggestions for additional scenarios?

Please contribute:
1. Fork the repository
2. Add your prompt following the established structure
3. Test it thoroughly
4. Submit a PR with examples

---

**Last Updated:** December 30, 2024
**Source:** [WordPress/agent-skills](https://github.com/WordPress/agent-skills)
