# User Stories for WordPress

> **Type**: Skill
> **Domain**: product-management
> **Source**: [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts) — Adapted for WordPress

<skill>
<summary>
Create clear, actionable user stories for WordPress plugins and themes using persona-driven format with Gherkin acceptance criteria.
</summary>

<knowledge>
## User Story Format

```markdown
## [ID]: [Summary]

**As a** [WordPress persona/role]
**I want to** [specific action]
**So that** [measurable outcome/value]

### Acceptance Criteria

**Scenario:** [Specific use case]

**Given** [precondition/context]
**When** [user action]
**Then** [expected result]
```

## WordPress Personas

### Site Administrator
- Manages WordPress installation and settings
- Installs/updates plugins and themes
- Handles user management and permissions
- Primary concerns: security, stability, performance

### Content Editor
- Creates and publishes posts/pages
- Manages media library
- May not have admin access
- Primary concerns: efficiency, ease of use

### Developer
- Customizes themes and plugins
- Works with code and APIs
- Uses WP-CLI and development tools
- Primary concerns: flexibility, documentation, hooks

### Site Visitor
- Consumes content on the frontend
- Submits forms, comments, purchases
- Uses search and navigation
- Primary concerns: speed, accessibility, clarity

### Multisite Super Admin
- Manages network of WordPress sites
- Controls network-wide settings
- Provisions new sites
- Primary concerns: scalability, consistency

## Example User Stories

### Plugin Settings Story
```markdown
## US-001: Configure plugin via Settings API

**As a** Site Administrator
**I want to** configure the plugin through a settings page in wp-admin
**So that** I can customize behavior without editing code

### Acceptance Criteria

**Scenario:** Access settings page

**Given** I am logged in as an administrator
**And** the plugin is activated
**When** I navigate to Settings > [Plugin Name]
**Then** I see the plugin configuration options
**And** current values are pre-filled

**Scenario:** Save settings

**Given** I am on the plugin settings page
**When** I modify a setting and click "Save Changes"
**Then** I see a success notice
**And** the new value persists after page refresh
```

### Block Editor Story
```markdown
## US-002: Add custom block to editor

**As a** Content Editor
**I want to** insert the [Feature] block into my posts
**So that** I can display [content type] without shortcodes

### Acceptance Criteria

**Scenario:** Insert block

**Given** I am editing a post in the block editor
**When** I click the inserter and search for "[Block Name]"
**Then** the block appears in search results
**And** I can insert it into my content

**Scenario:** Configure block

**Given** I have inserted the [Block Name] block
**When** I select the block
**Then** I see configuration options in the sidebar
**And** changes preview immediately in the editor
```

### REST API Story
```markdown
## US-003: Fetch data via REST API

**As a** Developer
**I want to** retrieve [data type] through the REST API
**So that** I can build custom frontend experiences

### Acceptance Criteria

**Scenario:** Authenticated request

**Given** I have a valid application password
**When** I send a GET request to /wp-json/[namespace]/v1/[endpoint]
**Then** I receive a 200 response with JSON data
**And** the response includes [expected fields]

**Scenario:** Unauthorized request

**Given** I am not authenticated
**When** I send a GET request to the protected endpoint
**Then** I receive a 401 response
**And** the error message indicates authentication is required
```

### WP-CLI Story
```markdown
## US-004: Manage via WP-CLI

**As a** Developer
**I want to** manage the plugin via WP-CLI commands
**So that** I can automate tasks and script deployments

### Acceptance Criteria

**Scenario:** List items

**Given** WP-CLI is installed
**And** the plugin is active
**When** I run `wp [plugin] list`
**Then** I see a table of items with relevant columns

**Scenario:** Export data

**Given** items exist in the database
**When** I run `wp [plugin] export --format=json`
**Then** valid JSON is output to stdout
**And** I can pipe it to a file
```

## Story Splitting Guidelines

Split stories when you have:
- Multiple "When" clauses (each becomes a story)
- Different user types with same feature (one per persona)
- CRUD operations (Create, Read, Update, Delete)
- Frontend and admin interfaces

### Before (Too Large)
```
As an administrator, I want to manage products so I can run my store
```

### After (Split)
```
US-010: Create a new product with title and price
US-011: Edit existing product details
US-012: Delete a product with confirmation
US-013: View list of all products with filtering
US-014: Bulk edit product prices
```

## WordPress-Specific Considerations

- Include multisite scenarios if supporting network installs
- Consider both classic and block editor workflows
- Account for different user capability levels
- Specify REST API and WP-CLI interfaces for developer stories
- Include accessibility acceptance criteria (WCAG 2.1 AA)
</knowledge>

<best_practices>
- One When/Then pair per acceptance criteria
- Use concrete examples, not abstract descriptions
- Include negative scenarios (error states, unauthorized access)
- Reference specific WordPress APIs and hooks
- Keep stories small enough to complete in one sprint
</best_practices>

<references>
- [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts)
- [Mike Cohn's User Story Format](https://www.mountaingoatsoftware.com/agile/user-stories)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)
</references>
</skill>
