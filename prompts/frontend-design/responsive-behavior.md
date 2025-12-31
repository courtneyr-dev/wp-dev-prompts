# Responsive Behavior Prompt

> Define responsive and accessible behavior for UI components.

## System Context

You are an accessibility and responsive design expert specializing in:
- Mobile-first CSS architecture
- WCAG 2.1/2.2 compliance
- Touch-friendly interface design
- Progressive enhancement

---

## Prompt Template

```text
You are an accessibility and responsive design expert.

For this UI component:
<insert component description here>

Define:
1. Responsive breakpoints and behavior at each
2. Mobile-first CSS strategy
3. Touch target sizing (minimum 44x44px)
4. ARIA roles and states
5. Keyboard navigation pattern
6. Focus management
7. High-contrast mode support
8. Reduced-motion alternatives

Output should include:
- Breakpoint definitions
- CSS with media queries
- ARIA attributes
- Keyboard interaction table
- Testing checklist

Format as structured markdown with code examples.
```

---

## WordPress Breakpoints Reference

```css
/* WordPress/Gutenberg default breakpoints */
:root {
  --wp-breakpoint-mobile: 600px;
  --wp-breakpoint-tablet: 782px;
  --wp-breakpoint-desktop: 960px;
  --wp-breakpoint-wide: 1280px;
}

/* Mobile-first media queries */
@media (min-width: 600px) { /* Tablet */ }
@media (min-width: 782px) { /* Small Desktop */ }
@media (min-width: 960px) { /* Desktop */ }
@media (min-width: 1280px) { /* Wide */ }
```

---

## Example: Navigation Menu

**Input:**
```text
A responsive navigation menu with logo, primary links, and mobile hamburger toggle.
```

**Output:**

### Breakpoint Behavior

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | <600px | Hamburger menu, full-screen overlay |
| Tablet | 600-959px | Hamburger menu, slide-in drawer |
| Desktop | ≥960px | Horizontal menu, visible links |

### HTML Structure

```html
<nav class="site-nav" aria-label="Primary navigation">
  <a href="/" class="site-nav__logo">
    <img src="logo.svg" alt="Site Name" />
  </a>

  <button
    class="site-nav__toggle"
    aria-expanded="false"
    aria-controls="primary-menu"
    aria-label="Open menu"
  >
    <span class="site-nav__toggle-icon" aria-hidden="true"></span>
  </button>

  <div id="primary-menu" class="site-nav__menu" role="presentation">
    <ul class="site-nav__list" role="list">
      <li class="site-nav__item">
        <a href="/about" class="site-nav__link">About</a>
      </li>
      <li class="site-nav__item site-nav__item--has-submenu">
        <button
          class="site-nav__link"
          aria-expanded="false"
          aria-controls="services-submenu"
        >
          Services
          <span class="site-nav__arrow" aria-hidden="true"></span>
        </button>
        <ul id="services-submenu" class="site-nav__submenu">
          <li><a href="/services/design">Design</a></li>
          <li><a href="/services/development">Development</a></li>
        </ul>
      </li>
      <li class="site-nav__item">
        <a href="/contact" class="site-nav__link">Contact</a>
      </li>
    </ul>
  </div>
</nav>
```

### Mobile-First CSS

```css
/* Base (Mobile) Styles */
.site-nav {
  --nav-height: 64px;
  --nav-bg: var(--wp--preset--color--background, #ffffff);
  --nav-text: var(--wp--preset--color--foreground, #1e1e1e);
  --nav-accent: var(--wp--preset--color--primary, #0073aa);
  --nav-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);

  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
  padding: 0 var(--wp--preset--spacing--30, 1rem);
  background: var(--nav-bg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Logo */
.site-nav__logo {
  display: flex;
  align-items: center;
  height: 40px;
}

.site-nav__logo img {
  height: 100%;
  width: auto;
}

/* Hamburger Toggle */
.site-nav__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  /* Touch target: 48x48px */
}

.site-nav__toggle-icon {
  position: relative;
  width: 24px;
  height: 2px;
  background: var(--nav-text);
  transition: background var(--nav-transition);
}

.site-nav__toggle-icon::before,
.site-nav__toggle-icon::after {
  content: '';
  position: absolute;
  left: 0;
  width: 24px;
  height: 2px;
  background: var(--nav-text);
  transition: transform var(--nav-transition);
}

.site-nav__toggle-icon::before { top: -8px; }
.site-nav__toggle-icon::after { bottom: -8px; }

/* Toggle open state */
.site-nav__toggle[aria-expanded="true"] .site-nav__toggle-icon {
  background: transparent;
}

.site-nav__toggle[aria-expanded="true"] .site-nav__toggle-icon::before {
  transform: translateY(8px) rotate(45deg);
}

.site-nav__toggle[aria-expanded="true"] .site-nav__toggle-icon::after {
  transform: translateY(-8px) rotate(-45deg);
}

/* Menu (Mobile: Full-screen overlay) */
.site-nav__menu {
  position: fixed;
  inset: var(--nav-height) 0 0 0;
  background: var(--nav-bg);
  transform: translateX(100%);
  transition: transform var(--nav-transition);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.site-nav__menu[data-open="true"] {
  transform: translateX(0);
}

/* Menu List */
.site-nav__list {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: var(--wp--preset--spacing--30, 1rem);
  list-style: none;
}

/* Menu Links */
.site-nav__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 48px; /* Touch target */
  padding: 12px 16px;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--nav-text);
  text-decoration: none;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background var(--nav-transition);
}

.site-nav__link:hover,
.site-nav__link:focus {
  background: rgba(0, 0, 0, 0.05);
}

.site-nav__link:focus {
  outline: 2px solid var(--nav-accent);
  outline-offset: 2px;
}

/* Submenu */
.site-nav__submenu {
  display: none;
  margin: 0;
  padding: 0 0 0 1rem;
  list-style: none;
}

.site-nav__item--has-submenu [aria-expanded="true"] + .site-nav__submenu {
  display: block;
}

.site-nav__arrow {
  width: 20px;
  height: 20px;
  transition: transform var(--nav-transition);
}

[aria-expanded="true"] .site-nav__arrow {
  transform: rotate(180deg);
}

/* ========================================
   TABLET (600px+)
   ======================================== */
@media (min-width: 600px) {
  .site-nav__menu {
    width: 300px;
    left: auto;
    right: 0;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  }
}

/* ========================================
   DESKTOP (960px+)
   ======================================== */
@media (min-width: 960px) {
  .site-nav {
    padding: 0 var(--wp--preset--spacing--50, 2rem);
  }

  /* Hide toggle */
  .site-nav__toggle {
    display: none;
  }

  /* Horizontal menu */
  .site-nav__menu {
    position: static;
    transform: none;
    width: auto;
    overflow: visible;
    box-shadow: none;
  }

  .site-nav__list {
    flex-direction: row;
    gap: 4px;
    padding: 0;
  }

  .site-nav__link {
    min-height: 40px;
    padding: 8px 16px;
    font-size: 1rem;
  }

  /* Submenu as dropdown */
  .site-nav__item--has-submenu {
    position: relative;
  }

  .site-nav__submenu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    padding: 8px;
    background: var(--nav-bg);
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: opacity var(--nav-transition),
                visibility var(--nav-transition),
                transform var(--nav-transition);
  }

  .site-nav__item--has-submenu:hover .site-nav__submenu,
  .site-nav__item--has-submenu:focus-within .site-nav__submenu,
  [aria-expanded="true"] + .site-nav__submenu {
    display: block;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

/* ========================================
   ACCESSIBILITY
   ======================================== */

/* Focus visible (keyboard only) */
.site-nav__link:focus:not(:focus-visible) {
  outline: none;
}

.site-nav__link:focus-visible {
  outline: 2px solid var(--nav-accent);
  outline-offset: 2px;
}

/* Skip link */
.site-nav__skip {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.site-nav__skip:focus {
  position: fixed;
  top: 10px;
  left: 10px;
  width: auto;
  height: auto;
  padding: 12px 24px;
  background: var(--nav-accent);
  color: white;
  z-index: 10000;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .site-nav {
    border-bottom: 2px solid currentColor;
  }

  .site-nav__link:hover,
  .site-nav__link:focus {
    outline: 2px solid currentColor;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .site-nav__menu,
  .site-nav__toggle-icon,
  .site-nav__toggle-icon::before,
  .site-nav__toggle-icon::after,
  .site-nav__submenu,
  .site-nav__arrow {
    transition: none;
  }
}
```

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next interactive element |
| `Shift+Tab` | Move focus to previous element |
| `Enter` / `Space` | Activate link or toggle submenu |
| `Escape` | Close open menu/submenu |
| `↓` | Open submenu, move to next item |
| `↑` | Move to previous item |
| `→` | Open submenu (when focused on parent) |
| `←` | Close submenu, return to parent |
| `Home` | Move to first menu item |
| `End` | Move to last menu item |

### JavaScript for Keyboard Navigation

```javascript
class NavigationMenu {
  constructor(nav) {
    this.nav = nav;
    this.toggle = nav.querySelector('.site-nav__toggle');
    this.menu = nav.querySelector('.site-nav__menu');
    this.links = nav.querySelectorAll('.site-nav__link');

    this.bindEvents();
  }

  bindEvents() {
    // Toggle button
    this.toggle?.addEventListener('click', () => this.toggleMenu());

    // Escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.closeMenu();
        this.toggle?.focus();
      }
    });

    // Arrow key navigation
    this.links.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        this.handleArrowKeys(e, index);
      });
    });

    // Focus trap when open
    this.menu?.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.trapFocus(e);
      }
    });
  }

  toggleMenu() {
    const isOpen = this.toggle.getAttribute('aria-expanded') === 'true';

    this.toggle.setAttribute('aria-expanded', !isOpen);
    this.toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    this.menu.dataset.open = !isOpen;

    if (!isOpen) {
      // Focus first link when opening
      this.links[0]?.focus();
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.toggle?.setAttribute('aria-expanded', 'false');
    this.toggle?.setAttribute('aria-label', 'Open menu');
    this.menu.dataset.open = 'false';
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.menu?.dataset.open === 'true';
  }

  handleArrowKeys(e, index) {
    const isVertical = window.innerWidth < 960;

    if (isVertical) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.focusLink(index + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.focusLink(index - 1);
      }
    }
  }

  focusLink(index) {
    const target = this.links[index];
    if (target) {
      target.focus();
    }
  }

  trapFocus(e) {
    const focusable = this.menu.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

// Initialize
document.querySelectorAll('.site-nav').forEach(nav => {
  new NavigationMenu(nav);
});
```

### Testing Checklist

#### Responsive
- [ ] Menu collapses to hamburger below 960px
- [ ] Touch targets are at least 48x48px on mobile
- [ ] Menu scrolls if content overflows on mobile
- [ ] No horizontal overflow at any breakpoint

#### Accessibility
- [ ] All interactive elements are keyboard accessible
- [ ] Focus is visible on all elements
- [ ] Escape closes open menus
- [ ] Screen reader announces menu state (open/closed)
- [ ] Skip link works to bypass navigation
- [ ] Color contrast meets 4.5:1 for text
- [ ] Works with 200% browser zoom

#### Motion
- [ ] Animations disabled with `prefers-reduced-motion`
- [ ] No content-changing animations that can't be paused

#### Screen Readers
- [ ] Navigation landmark announced
- [ ] Menu state (expanded/collapsed) announced
- [ ] Submenu relationships clear
