# WordPress User Story Template

A comprehensive template for writing effective user stories during the research and planning phase of WordPress plugin/theme development.

**Use this template to:**
- Document feature requirements before coding
- Communicate with stakeholders and team members
- Plan development sprints and milestones
- Ensure all perspectives are considered
- Create testable acceptance criteria

---

## Table of Contents

1. [User Story Format](#user-story-format)
2. [Complete Story Template](#complete-story-template)
3. [WordPress-Specific Considerations](#wordpress-specific-considerations)
4. [Examples by Feature Type](#examples-by-feature-type)
5. [User Story Checklist](#user-story-checklist)
6. [Best Practices](#best-practices)

---

## User Story Format

### Basic Structure

```
As a [USER_TYPE]
I want to [ACTION/FEATURE]
So that [BENEFIT/VALUE]
```

### Enhanced Structure (Recommended)

```
As a [USER_TYPE]
I want to [ACTION/FEATURE]
So that [BENEFIT/VALUE]

Context:
[Background information, current pain points, why this is needed]

Acceptance Criteria:
Given [PRECONDITION]
When [ACTION]
Then [EXPECTED_RESULT]

Technical Considerations:
- [WordPress hooks/APIs involved]
- [Performance implications]
- [Security considerations]
- [Compatibility requirements]

Dependencies:
- [Other features or stories this depends on]

Definition of Done:
- [ ] Code implemented and follows WordPress Coding Standards
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Security review completed
- [ ] Accessibility tested (WCAG 2.1 AA)
- [ ] Documentation updated
- [ ] Peer review completed
```

---

## Complete Story Template

### Story ID: [STORY-###]

**Title:** [Brief, descriptive title]

**Priority:** [Critical / High / Medium / Low]

**Story Points:** [1, 2, 3, 5, 8, 13, 21]

**Sprint:** [Sprint number or version milestone]

**Type:** [Feature / Enhancement / Bug Fix / Technical Debt / Research]

---

### User Story

```
As a [USER_TYPE: site administrator / content editor / end user / developer]
I want to [ACTION: what they want to do]
So that [BENEFIT: the value they get]
```

---

### Context & Background

**Current Situation:**
[Describe the current state, pain points, or problems]

**Why This Matters:**
[Business value, user impact, technical debt reduction]

**Related Stories:**
- [STORY-###] - Related feature
- [STORY-###] - Dependent story

---

### Acceptance Criteria

#### Scenario 1: [Primary Use Case]

```gherkin
Given [PRECONDITION: the system state before action]
When [ACTION: what the user does]
Then [RESULT: what should happen]
And [ADDITIONAL_RESULT: any other expected outcomes]
```

#### Scenario 2: [Edge Case or Alternative Flow]

```gherkin
Given [PRECONDITION]
When [ACTION]
Then [RESULT]
```

#### Scenario 3: [Error Handling]

```gherkin
Given [ERROR_CONDITION]
When [ACTION]
Then [ERROR_HANDLING: error message, fallback behavior]
```

---

### Technical Specifications

**WordPress Integration:**
- Hooks: `[action/filter names]`
- APIs: `[REST API endpoints, Settings API, etc.]`
- Database: `[Tables, options, post meta, user meta]`
- Cron: `[Scheduled tasks if applicable]`

**Frontend Requirements:**
- JavaScript: `[React, vanilla JS, jQuery]`
- CSS: `[Styling approach]`
- Gutenberg: `[Block editor integration]`

**Backend Requirements:**
- PHP Version: `[Minimum supported version]`
- WordPress Version: `[Minimum supported version]`
- Required Plugins: `[Any dependencies]`
- Server Requirements: `[Special PHP extensions, etc.]`

**Performance Considerations:**
- Database queries: `[Expected query count, caching strategy]`
- Asset loading: `[JS/CSS bundle sizes]`
- API calls: `[External services, rate limits]`

**Security Requirements:**
- Capability checks: `[Required WordPress capabilities]`
- Nonce verification: `[Where nonces are needed]`
- Data sanitization: `[Input validation requirements]`
- Data escaping: `[Output escaping requirements]`

**Accessibility Requirements:**
- WCAG Level: `[A, AA, AAA]`
- Keyboard navigation: `[Specific requirements]`
- Screen reader: `[ARIA labels, announcements]`
- Color contrast: `[Minimum ratios]`

**Internationalization:**
- Text domain: `[your-plugin-slug]`
- RTL support: `[Yes/No]`
- Date/time formatting: `[Locale-aware]`

---

### User Interface Mockups

**Desktop View:**
```
[Link to mockup or ASCII representation]
```

**Mobile View:**
```
[Link to mockup or ASCII representation]
```

**Accessibility States:**
- Keyboard focus
- Screen reader experience
- High contrast mode

---

### Testing Strategy

**Unit Tests:**
- [ ] Test [specific function/class]
- [ ] Test edge cases
- [ ] Test error handling
- [ ] Test data validation

**Integration Tests:**
- [ ] Test WordPress hook integration
- [ ] Test database operations
- [ ] Test with other plugins
- [ ] Test multisite (if applicable)

**E2E Tests:**
- [ ] Test user workflow
- [ ] Test form submission
- [ ] Test AJAX operations
- [ ] Test admin interface

**Manual Testing:**
- [ ] Test on latest WordPress
- [ ] Test on minimum supported WordPress
- [ ] Test with popular themes
- [ ] Test with popular plugins

**Security Testing:**
- [ ] SQL injection tests
- [ ] XSS vulnerability tests
- [ ] CSRF protection tests
- [ ] Capability bypass tests

**Accessibility Testing:**
- [ ] Keyboard navigation
- [ ] Screen reader (NVDA/VoiceOver)
- [ ] axe DevTools scan
- [ ] Color contrast check

**Performance Testing:**
- [ ] Page load time impact
- [ ] Database query count
- [ ] Memory usage
- [ ] JavaScript execution time

---

### Dependencies

**Requires:**
- [STORY-###] - Feature needed before this can start
- [STORY-###] - API endpoint dependency

**Blocks:**
- [STORY-###] - This story blocks these other stories

**Related To:**
- [STORY-###] - Similar feature
- [STORY-###] - Complementary functionality

---

### Definition of Done

**Code Quality:**
- [ ] Code follows WordPress Coding Standards (PHPCS passes)
- [ ] PHPStan level 5+ passes with no errors
- [ ] ESLint passes with no errors
- [ ] All functions have proper docblocks
- [ ] No PHP warnings, notices, or errors

**Testing:**
- [ ] Unit tests written and passing (60%+ coverage)
- [ ] Integration tests written and passing
- [ ] Manual testing completed (QA checklist)
- [ ] Cross-browser testing completed
- [ ] Accessibility testing completed (WCAG 2.1 AA)

**Security:**
- [ ] All inputs sanitized
- [ ] All outputs escaped
- [ ] Nonces implemented for state-changing actions
- [ ] Capability checks in place
- [ ] Security review completed

**Documentation:**
- [ ] Code comments added
- [ ] User documentation updated
- [ ] Developer documentation updated (hooks, filters)
- [ ] Changelog entry added
- [ ] readme.txt updated (if applicable)

**Review:**
- [ ] Code review completed
- [ ] QA review completed
- [ ] Accessibility review completed
- [ ] Security review completed
- [ ] Product owner approval

**Deployment:**
- [ ] Feature flagged (if applicable)
- [ ] Database migrations tested
- [ ] Rollback plan documented
- [ ] Monitoring in place

---

### Notes & Questions

**Open Questions:**
- [Question 1: What happens if...?]
- [Question 2: How should we handle...?]

**Assumptions:**
- [Assumption 1: We assume users have...]
- [Assumption 2: The system will...]

**Risks:**
- [Risk 1: Potential performance impact]
- [Risk 2: Breaking change for users]

**Future Enhancements:**
- [Enhancement 1: Could add...]
- [Enhancement 2: In version 2.0...]

---

### Change Log

| Date | Author | Change |
|------|--------|--------|
| 2024-12-09 | [Name] | Initial story creation |
| 2024-12-10 | [Name] | Updated acceptance criteria |

---

## WordPress-Specific Considerations

### Common User Types in WordPress

**1. Site Administrator**
- Full access to WordPress admin
- Manages plugins, themes, users
- Needs powerful features, doesn't mind complexity

**2. Content Editor**
- Creates and publishes content
- Limited admin access
- Needs intuitive, simple interfaces

**3. Contributor**
- Creates content but can't publish
- Very limited admin access
- Needs streamlined content creation

**4. End User (Visitor)**
- Interacts with public-facing site
- No admin access
- Needs fast, accessible experience

**5. Developer**
- Extends or customizes plugin/theme
- Uses hooks, filters, APIs
- Needs documentation, extensibility

### WordPress Feature Categories

**Admin Interface Features:**
- Settings pages
- Meta boxes
- Admin menus
- List tables
- Dashboard widgets

**Content Management:**
- Custom post types
- Custom taxonomies
- Custom fields
- Media handling
- Import/export

**Frontend Features:**
- Shortcodes
- Widgets
- Gutenberg blocks
- Template tags
- REST API endpoints

**Data & Storage:**
- Options API
- Transients API
- Post meta
- User meta
- Custom tables

**Integration & Extensibility:**
- Action hooks
- Filter hooks
- REST API
- WP-CLI commands
- Webhook support

---

## Examples by Feature Type

### Example 1: Admin Settings Page

**Story ID:** STORY-001

**Title:** Create Plugin Settings Page with API Key Configuration

**Priority:** High | **Points:** 5 | **Sprint:** 1.0

---

#### User Story

```
As a site administrator
I want to configure my API credentials from the WordPress admin
So that I can connect my site to external services without editing code
```

---

#### Context & Background

**Current Situation:**
Users must manually edit wp-config.php to add API credentials, which is error-prone and requires FTP access.

**Why This Matters:**
- Reduces support requests
- Improves user experience
- Follows WordPress best practices for settings

---

#### Acceptance Criteria

**Scenario 1: Access Settings Page**

```gherkin
Given I am logged in as an administrator
When I navigate to Settings > Plugin Name
Then I should see the settings page with API configuration fields
```

**Scenario 2: Save Valid API Key**

```gherkin
Given I am on the plugin settings page
When I enter a valid API key and click "Save Changes"
Then the API key should be saved securely
And I should see a success message
And the API connection should be tested automatically
```

**Scenario 3: Invalid API Key**

```gherkin
Given I am on the plugin settings page
When I enter an invalid API key and click "Save Changes"
Then I should see an error message "Invalid API key"
And the settings should not be saved
And helpful troubleshooting steps should be displayed
```

---

#### Technical Specifications

**WordPress Integration:**
- Hooks: `admin_menu`, `admin_init`
- APIs: Settings API, Options API
- Database: wp_options table (`myplugin_api_key`)
- Security: Store in encrypted format

**Frontend Requirements:**
- JavaScript: Vanilla JS for API key testing
- CSS: WordPress admin styles
- AJAX: Test API connection without page reload

**Security Requirements:**
- Capability: `manage_options`
- Nonce: `myplugin_settings_nonce`
- Sanitization: `sanitize_text_field()` for API key
- Escaping: `esc_attr()` for output

---

#### Definition of Done

- [x] Settings page registered via Settings API
- [x] API key saved securely (hashed)
- [x] AJAX endpoint for testing connection
- [x] Success/error notices displayed
- [x] Help text and documentation links
- [x] PHPUnit tests for settings save/retrieve
- [x] PHPCS WordPress standards compliance
- [x] Accessibility tested (WCAG 2.1 AA)

---

### Example 2: Custom Gutenberg Block

**Story ID:** STORY-002

**Title:** Create Testimonial Gutenberg Block

**Priority:** High | **Points:** 8 | **Sprint:** 1.1

---

#### User Story

```
As a content editor
I want to add customer testimonials using a Gutenberg block
So that I can showcase reviews without writing HTML or shortcodes
```

---

#### Context & Background

**Current Situation:**
Editors use shortcodes which are not intuitive and don't provide live preview.

**Why This Matters:**
- Modern editing experience
- Real-time preview
- Better content creation workflow
- Follows WordPress direction (block editor)

---

#### Acceptance Criteria

**Scenario 1: Insert Block**

```gherkin
Given I am editing a post in the block editor
When I click the inserter and search for "testimonial"
Then I should see the Testimonial block in the results
And I should be able to insert it into my post
```

**Scenario 2: Configure Testimonial**

```gherkin
Given I have inserted a Testimonial block
When I fill in the quote, author name, and author title fields
And I upload an author photo
Then I should see a live preview of the testimonial
And the styling should match my theme
```

**Scenario 3: Customize Appearance**

```gherkin
Given I have a Testimonial block in my post
When I access the block settings in the sidebar
Then I should be able to choose:
- Quote style (default, boxed, minimal)
- Show/hide author photo
- Photo position (left, right, top)
- Background color
And changes should update in real-time
```

---

#### Technical Specifications

**WordPress Integration:**
- Hooks: `init` (block registration)
- APIs: Block Editor API
- Build: @wordpress/scripts

**Frontend Requirements:**
- JavaScript: React (JSX)
- CSS: SCSS with BEM methodology
- Block editor: Full support for all editor features
- Theme: Works with any theme (style inheritance)

**Block Attributes:**
```javascript
{
  quote: { type: 'string' },
  author: { type: 'string' },
  authorTitle: { type: 'string' },
  authorImage: { type: 'object' },
  style: { type: 'string', default: 'default' },
  showImage: { type: 'boolean', default: true },
  imagePosition: { type: 'string', default: 'left' }
}
```

**Accessibility Requirements:**
- Proper semantic HTML (blockquote, cite)
- ARIA labels for controls
- Keyboard navigation
- Screen reader tested
- High contrast mode support

---

#### Definition of Done

- [x] Block registered and appears in inserter
- [x] Edit and save functionality working
- [x] Frontend rendering matches editor preview
- [x] Block variations created (3 styles)
- [x] Block patterns registered (common layouts)
- [x] Jest tests for block functionality
- [x] Playwright E2E tests for editor workflow
- [x] Documentation in Block Editor Handbook format
- [x] Works with Full Site Editing

---

### Example 3: REST API Endpoint

**Story ID:** STORY-003

**Title:** Create REST API Endpoint for User Statistics

**Priority:** Medium | **Points:** 5 | **Sprint:** 1.2

---

#### User Story

```
As a developer
I want to fetch user statistics via REST API
So that I can build custom dashboards and integrations
```

---

#### Context & Background

**Current Situation:**
User statistics are only available in WordPress admin, requiring scraping or custom SQL queries.

**Why This Matters:**
- Enables custom integrations
- Supports headless WordPress
- Follows WordPress REST API standards
- Provides data for external analytics

---

#### Acceptance Criteria

**Scenario 1: Fetch All User Stats**

```gherkin
Given I have valid authentication credentials
When I send a GET request to /wp-json/myplugin/v1/users/stats
Then I should receive a 200 response
And the response should include total users, active users, and new users this month
And the response should be properly formatted JSON
```

**Scenario 2: Fetch Single User Stats**

```gherkin
Given I have valid authentication and a valid user ID
When I send a GET request to /wp-json/myplugin/v1/users/123/stats
Then I should receive that user's statistics
And private data should only be visible to authorized users
```

**Scenario 3: Unauthorized Access**

```gherkin
Given I do not have valid authentication
When I send a GET request to /wp-json/myplugin/v1/users/stats
Then I should receive a 401 Unauthorized response
And the error message should explain authentication requirements
```

**Scenario 4: Invalid User ID**

```gherkin
Given I request stats for a non-existent user
When I send a GET request to /wp-json/myplugin/v1/users/999999/stats
Then I should receive a 404 Not Found response
```

---

#### Technical Specifications

**WordPress Integration:**
- Hooks: `rest_api_init`
- APIs: REST API
- Namespace: `myplugin/v1`
- Routes: `/users/stats`, `/users/(?P<id>\d+)/stats`

**Authentication:**
- Methods: Cookie authentication, OAuth, Application passwords
- Capabilities: `list_users` for all stats, `edit_users` for individual
- Nonce: Standard REST API nonce

**Response Format:**
```json
{
  "total_users": 1234,
  "active_users": 890,
  "new_users_this_month": 45,
  "user_growth": "3.8%",
  "_links": {
    "self": [{"href": "https://example.com/wp-json/myplugin/v1/users/stats"}]
  }
}
```

**Rate Limiting:**
- 100 requests per hour per user
- Return `X-RateLimit` headers
- Return 429 Too Many Requests when exceeded

**Caching:**
- Cache results for 5 minutes (transients)
- Invalidate on user creation/deletion
- ETag support for conditional requests

---

#### Definition of Done

- [x] Endpoint registered and functional
- [x] Permission callbacks implemented
- [x] Input validation and sanitization
- [x] Response schema documented
- [x] PHPUnit tests for all scenarios
- [x] Postman collection created
- [x] Rate limiting implemented
- [x] API documentation written
- [x] Versioning strategy documented

---

## User Story Checklist

Use this checklist to ensure your user story is complete:

### Story Basics
- [ ] Story follows "As a [user], I want [feature], so that [benefit]" format
- [ ] User type is clearly defined and realistic
- [ ] Benefit/value is clear and measurable
- [ ] Story is sized appropriately (can be completed in one sprint)
- [ ] Priority is assigned (Critical/High/Medium/Low)

### Context
- [ ] Current situation described
- [ ] Pain points identified
- [ ] Business value articulated
- [ ] Related stories linked

### Acceptance Criteria
- [ ] Written in Given/When/Then format
- [ ] Primary use case covered
- [ ] Edge cases identified
- [ ] Error handling specified
- [ ] Success criteria is measurable

### Technical Details
- [ ] WordPress hooks/APIs identified
- [ ] Database impact considered
- [ ] Performance implications noted
- [ ] Security requirements specified
- [ ] Accessibility requirements defined

### Testing
- [ ] Unit test requirements specified
- [ ] Integration test scenarios defined
- [ ] Manual testing checklist created
- [ ] Cross-browser testing planned
- [ ] Accessibility testing included

### Documentation
- [ ] User documentation needs identified
- [ ] Developer documentation needs identified
- [ ] API documentation planned (if applicable)
- [ ] Changelog entry planned

### Dependencies
- [ ] Prerequisite stories identified
- [ ] Blocking relationships documented
- [ ] Third-party dependencies noted
- [ ] WordPress version requirements clear

### Definition of Done
- [ ] Code quality criteria defined
- [ ] Testing requirements clear
- [ ] Security checklist included
- [ ] Documentation requirements listed
- [ ] Review process specified

---

## Best Practices

### Writing Effective User Stories

#### 1. Focus on the User, Not the Implementation

**❌ Bad:**
```
As a developer
I want to create a MySQL table for storing testimonials
So that data can be persisted
```

**✅ Good:**
```
As a content editor
I want to save and manage customer testimonials
So that I can showcase social proof on my site
```

#### 2. Make Stories Independently Valuable

Each story should deliver value on its own. Avoid stories that are just technical tasks.

**❌ Bad:** "Create database schema" (no user value)
**✅ Good:** "Display testimonials on pages" (delivers value)

#### 3. Size Stories Appropriately

Use story points (Fibonacci: 1, 2, 3, 5, 8, 13, 21):
- **1-2 points**: Simple changes, minor tweaks
- **3-5 points**: Standard features, well-understood work
- **8 points**: Complex features, needs investigation
- **13+ points**: Epic - break down into smaller stories

#### 4. Include All Acceptance Criteria

Don't just test the happy path:
- ✅ Primary use case
- ✅ Edge cases
- ✅ Error handling
- ✅ Performance requirements
- ✅ Security requirements
- ✅ Accessibility requirements

#### 5. Consider WordPress Context

Always think about:
- Which WordPress hooks/filters to use
- How it integrates with WordPress admin
- Compatibility with common plugins/themes
- Impact on WordPress performance
- WordPress Coding Standards compliance
- Multisite compatibility (if relevant)

#### 6. Use WordPress Terminology

**❌ Generic:** "Add admin panel"
**✅ WordPress:** "Add settings page to WordPress admin"

**❌ Generic:** "Create widget"
**✅ WordPress:** "Register WordPress widget via Widgets API"

#### 7. Plan for Extensibility

WordPress is built for extensibility. Include:
- Action hooks for developers to extend
- Filter hooks to modify behavior
- Documented APIs
- Examples for developers

---

## Using This Template

### For Individual Stories

1. Copy the [Complete Story Template](#complete-story-template)
2. Fill in all sections
3. Review with [User Story Checklist](#user-story-checklist)
4. Get feedback from team/stakeholders
5. Refine based on feedback
6. Move to "Ready for Development"

### For Planning Sessions

1. Brainstorm user types and their needs
2. Write high-level stories (epics)
3. Break epics into detailed stories
4. Prioritize stories
5. Assign story points
6. Plan sprints/milestones

### For Agile Teams

1. Product Owner writes initial story
2. Team reviews and asks questions
3. Story is refined in backlog grooming
4. Acceptance criteria validated
5. Story moved to sprint
6. Developer picks up story
7. Tester uses acceptance criteria for QA
8. Story marked done when all criteria met

---

## Templates for Common WordPress Features

### Settings Page Template
→ See [Example 1: Admin Settings Page](#example-1-admin-settings-page)

### Gutenberg Block Template
→ See [Example 2: Custom Gutenberg Block](#example-2-custom-gutenberg-block)

### REST API Endpoint Template
→ See [Example 3: REST API Endpoint](#example-3-rest-api-endpoint)

### Additional Templates

**Custom Post Type:** [Create template following structure above]
**Shortcode:** [Create template following structure above]
**Widget:** [Create template following structure above]
**WP-CLI Command:** [Create template following structure above]
**Cron Job:** [Create template following structure above]

---

## Integration with Development Workflow

### Story → Testing Framework

Each user story should map to specific tests:

```bash
# User Story: STORY-001 (Settings Page)
# Maps to:
tests/unit/SettingsPageTest.php        # Unit tests
tests/integration/SettingsSaveTest.php # Integration tests
tests/e2e/settings-page.spec.js        # E2E tests

# User Story: STORY-002 (Gutenberg Block)
# Maps to:
src/blocks/testimonial/test/edit.test.js  # Jest tests
tests/e2e/testimonial-block.spec.js       # Playwright tests
```

### Story → Documentation

Each story should update documentation:

```bash
# User Story maps to:
README.md                  # Feature list
CHANGELOG.md               # Version history
docs/user-guide.md         # End user docs
docs/developer-guide.md    # Developer docs (hooks, filters)
docs/api-reference.md      # API docs (if applicable)
```

### Story → Code Review

Use story acceptance criteria as code review checklist:
- ✅ All acceptance criteria met
- ✅ Tests written and passing
- ✅ Security requirements fulfilled
- ✅ Accessibility requirements met
- ✅ Performance targets achieved

---

## AI Prompt for User Story Generation

Use this prompt with AI assistants to generate user stories:

```markdown
I'm developing a WordPress [plugin/theme] called [NAME].

Feature to develop: [DESCRIBE FEATURE]

Target users: [site admins, content editors, end users, developers]

Please create a complete user story following this structure:
1. User story (As a... I want... So that...)
2. Context and background
3. Acceptance criteria (Given/When/Then format)
4. Technical specifications (WordPress hooks, APIs, etc.)
5. Security requirements
6. Accessibility requirements
7. Testing strategy
8. Definition of done

Make it specific to WordPress development with:
- WordPress Coding Standards considerations
- Appropriate WordPress hooks and APIs
- Common WordPress user types
- Integration with WordPress admin
- Compatibility considerations
```

---

## Contributing

Have a better user story template or example? Contributions welcome!

1. Fork this repository
2. Add your template or example
3. Ensure it follows WordPress best practices
4. Submit a pull request

---

## Resources

### WordPress Development

- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
- [WordPress Theme Handbook](https://developer.wordpress.org/themes/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [REST API Handbook](https://developer.wordpress.org/rest-api/)

### User Story Best Practices

- [User Stories by Mike Cohn](https://www.mountaingoatsoftware.com/agile/user-stories)
- [Agile Alliance: User Stories](https://www.agilealliance.org/glossary/user-stories/)
- [Acceptance Criteria](https://www.leadingagile.com/2014/09/acceptance-criteria/)

### Gherkin Syntax

- [Cucumber Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
- [Gherkin Best Practices](https://cucumber.io/docs/bdd/better-gherkin/)

---

**Ready to write amazing user stories?** Use this template to plan your next WordPress feature!

[⬆ Back to Top](#wordpress-user-story-template)
