# ARIA Patterns for WordPress

> **Type**: Skill
> **Domain**: Accessibility
> **Focus**: Correct ARIA usage in WordPress development

<skill>
<summary>
Implementing ARIA roles, states, and properties correctly in WordPress plugins and blocks.
</summary>

<knowledge>
## First Rule of ARIA

**Don't use ARIA if you can use native HTML.**

```html
<!-- Bad: ARIA role on div -->
<div role="button" tabindex="0">Click me</div>

<!-- Good: Native button -->
<button>Click me</button>

<!-- Bad: ARIA for link -->
<span role="link" tabindex="0">Go here</span>

<!-- Good: Native anchor -->
<a href="/page">Go here</a>
```

## Landmark Roles

### Page Structure

```html
<header role="banner">
    <nav role="navigation" aria-label="Main">
        <!-- Primary navigation -->
    </nav>
</header>

<main role="main">
    <article>
        <!-- Content -->
    </article>

    <aside role="complementary">
        <!-- Sidebar -->
    </aside>
</main>

<footer role="contentinfo">
    <!-- Footer content -->
</footer>
```

### Multiple Navigation Regions

```html
<!-- Label distinguishes regions -->
<nav aria-label="Main navigation">
    <!-- Primary menu -->
</nav>

<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/section">Section</a></li>
        <li aria-current="page">Current Page</li>
    </ol>
</nav>

<nav aria-label="Pagination">
    <!-- Page navigation -->
</nav>
```

## Widget Roles

### Buttons and Links

```jsx
// Button that performs action
<button
    aria-pressed={isActive}
    onClick={toggleActive}
>
    Toggle Feature
</button>

// Button that opens menu
<button
    aria-haspopup="menu"
    aria-expanded={isOpen}
    aria-controls="menu-id"
>
    Options
</button>

// Link styled as button
<a href="/page" className="button">
    Go to Page
</a>
```

### Forms

```html
<!-- Required field -->
<label for="email">Email (required)</label>
<input
    type="email"
    id="email"
    required
    aria-required="true"
>

<!-- Field with error -->
<label for="password">Password</label>
<input
    type="password"
    id="password"
    aria-invalid="true"
    aria-describedby="password-error"
>
<span id="password-error" role="alert">
    Password must be at least 8 characters
</span>

<!-- Field with description -->
<label for="username">Username</label>
<input
    type="text"
    id="username"
    aria-describedby="username-hint"
>
<span id="username-hint">
    Letters, numbers, and underscores only
</span>
```

### Tabs

```jsx
function AccessibleTabs({ tabs, activeTab, onChange }) {
    return (
        <div>
            <div role="tablist" aria-label="Settings sections">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.id}
                        role="tab"
                        id={`tab-${tab.id}`}
                        aria-selected={activeTab === tab.id}
                        aria-controls={`panel-${tab.id}`}
                        tabIndex={activeTab === tab.id ? 0 : -1}
                        onClick={() => onChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    role="tabpanel"
                    id={`panel-${tab.id}`}
                    aria-labelledby={`tab-${tab.id}`}
                    hidden={activeTab !== tab.id}
                    tabIndex={0}
                >
                    {tab.content}
                </div>
            ))}
        </div>
    );
}
```

### Accordions

```jsx
function Accordion({ items }) {
    const [expandedId, setExpandedId] = useState(null);

    return (
        <div className="accordion">
            {items.map((item) => (
                <div key={item.id} className="accordion-item">
                    <h3>
                        <button
                            aria-expanded={expandedId === item.id}
                            aria-controls={`panel-${item.id}`}
                            onClick={() =>
                                setExpandedId(
                                    expandedId === item.id ? null : item.id
                                )
                            }
                        >
                            {item.title}
                        </button>
                    </h3>
                    <div
                        id={`panel-${item.id}`}
                        role="region"
                        aria-labelledby={`heading-${item.id}`}
                        hidden={expandedId !== item.id}
                    >
                        {item.content}
                    </div>
                </div>
            ))}
        </div>
    );
}
```

### Modal Dialogs

```jsx
function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
        >
            <h2 id="modal-title">{title}</h2>
            <div id="modal-desc">{children}</div>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

// Alert dialog (requires acknowledgment)
function AlertDialog({ message, onConfirm, onCancel }) {
    return (
        <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            aria-describedby="alert-desc"
        >
            <h2 id="alert-title">Confirm Action</h2>
            <p id="alert-desc">{message}</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
```

## Live Regions

### Announcements

```jsx
// Status message (polite)
<div role="status" aria-live="polite" aria-atomic="true">
    {statusMessage}
</div>

// Alert (assertive)
<div role="alert" aria-live="assertive">
    {errorMessage}
</div>

// Progress
<div
    role="progressbar"
    aria-valuenow={progress}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label="Upload progress"
>
    {progress}%
</div>
```

### Dynamic Content

```jsx
function NotificationArea() {
    const [notifications, setNotifications] = useState([]);

    return (
        <div
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Notifications"
        >
            {notifications.map((notification) => (
                <div key={notification.id}>{notification.message}</div>
            ))}
        </div>
    );
}
```

## WordPress Block ARIA

### Block Editor Patterns

```jsx
import { __ } from '@wordpress/i18n';

function MyBlockEdit({ attributes }) {
    return (
        <div
            role="region"
            aria-label={__('My Custom Block', 'my-plugin')}
        >
            {/* Block controls with proper labeling */}
            <div
                role="toolbar"
                aria-label={__('Block options', 'my-plugin')}
            >
                <button aria-label={__('Add item', 'my-plugin')}>
                    +
                </button>
            </div>

            {/* Content area */}
            <div role="list">
                {attributes.items.map((item, index) => (
                    <div
                        key={item.id}
                        role="listitem"
                        aria-label={sprintf(
                            __('Item %d of %d', 'my-plugin'),
                            index + 1,
                            attributes.items.length
                        )}
                    >
                        {item.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
```

### InspectorControls

```jsx
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

function MyBlockEdit({ attributes, setAttributes }) {
    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings', 'my-plugin')}>
                    <ToggleControl
                        label={__('Enable feature', 'my-plugin')}
                        help={__('Turn on advanced features', 'my-plugin')}
                        checked={attributes.enabled}
                        onChange={(enabled) => setAttributes({ enabled })}
                    />
                </PanelBody>
            </InspectorControls>
            {/* Block content */}
        </>
    );
}
```

## Common Mistakes

### Don't Override Semantics

```html
<!-- Wrong: Button with link role -->
<button role="link">Go somewhere</button>

<!-- Right: Use appropriate element -->
<a href="/somewhere">Go somewhere</a>
```

### Don't Add Redundant ARIA

```html
<!-- Wrong: Redundant role -->
<button role="button">Click</button>
<nav role="navigation">...</nav>

<!-- Right: Native semantics sufficient -->
<button>Click</button>
<nav>...</nav>
```

### Use aria-hidden Correctly

```html
<!-- Decorative image - hide from AT -->
<img src="decoration.svg" alt="" aria-hidden="true">

<!-- Don't hide interactive elements -->
<button aria-hidden="true">Wrong!</button>
```

### Connect Labels Properly

```html
<!-- Wrong: No connection -->
<label>Name</label>
<input type="text">

<!-- Right: Explicit connection -->
<label for="name">Name</label>
<input type="text" id="name">

<!-- Right: Implicit connection -->
<label>
    Name
    <input type="text">
</label>
```
</knowledge>

<best_practices>
- Use native HTML elements first
- Add ARIA only when HTML is insufficient
- Test with screen readers
- Validate ARIA with automated tools
- Don't change native semantics
- Keep labels and descriptions connected
</best_practices>

<commands>
```bash
# Validate ARIA with axe
npx playwright test --grep accessibility

# ESLint JSX a11y
npx eslint src/ --rule 'jsx-a11y/aria-role: error'

# Manual testing with screen reader
# VoiceOver: Cmd + F5 on Mac
# NVDA: Free Windows screen reader
```
</commands>
</skill>
