# Style Language Prompt

> Generate aesthetic style specifications for WordPress UI components.

## System Context

You are a creative UI/UX designer with expertise in visual design aesthetics and WordPress theming. You understand how to translate design movements and styles into functional CSS and theme.json configurations.

---

## Prompt Template

```text
You are a creative UI/UX designer with expertise in aesthetics.

I want you to generate a style specification for a WordPress plugin UI/block, including colors, typography, spacing, and visual rhythm.

Style language: <insert style language here>

For the style language, provide:
- A color palette (primary, secondary, accents, surfaces)
- Typography rules (font family, sizes, weight scales)
- Spacing system (based on 8px or 4px grid)
- Visual tokens for buttons, forms, and cards
- Border and shadow styles

Also include:
- A brief rationale behind the aesthetic
- How it works with common WordPress themes
- Suggestions for theme overrides

Generate output as:
1. JSON design tokens
2. CSS custom properties
3. theme.json integration
```

---

## Available Style Languages

| Style | Characteristics | Best For |
|-------|-----------------|----------|
| **Brutalist** | Raw, stark, high contrast, blocky | Developer tools, technical interfaces |
| **Art Deco** | Geometric, elegant, metallic accents | Premium/luxury products |
| **Art Nouveau** | Organic, flowing lines, nature-inspired | Creative/artistic sites |
| **Minimalism** | Whitespace, restraint, clean | Modern business, productivity |
| **Bauhaus** | Functional, grid-based, primary colors | Utilitarian interfaces |
| **Cyberpunk** | Neon, dark, glitch effects | Gaming, tech, entertainment |
| **Memphis** | Bold shapes, playful, clashing colors | Creative tools, fun apps |
| **Nordic** | Cool tones, light, simple | Wellness, lifestyle |
| **Neumorphism** | Soft shadows, embedded look | Subtle interactions |
| **Material** | Depth, motion, bold color | Enterprise, Android |

---

## Example: Art Deco Style

**Input:**
```text
Style language: Art Deco
```

**Output:**

### Style Rationale

Art Deco emerged in the 1920s-30s, characterized by geometric patterns, bold lines, metallic colors, and luxurious materials. For digital interfaces, this translates to:
- Strong geometric shapes and symmetry
- Gold/brass accents against dark backgrounds
- Decorative borders and frames
- Elegant serif typography

### Design Tokens (JSON)

```json
{
  "colors": {
    "primary": {
      "gold": "#c9a227",
      "goldLight": "#d4b854",
      "goldDark": "#9e7b1e"
    },
    "secondary": {
      "navy": "#1a1a2e",
      "teal": "#16213e",
      "midnight": "#0f0f23"
    },
    "accent": {
      "copper": "#b87333",
      "emerald": "#2d5a4e",
      "ivory": "#f5f0e8"
    },
    "surface": {
      "dark": "#1a1a2e",
      "card": "#252540",
      "light": "#f5f0e8"
    },
    "text": {
      "onDark": "#f5f0e8",
      "onLight": "#1a1a2e",
      "muted": "#8a8aa3"
    }
  },
  "typography": {
    "fontFamily": {
      "display": "'Playfair Display', 'Times New Roman', serif",
      "body": "'Raleway', 'Helvetica Neue', sans-serif",
      "mono": "'Fira Code', 'Courier New', monospace"
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "3rem",
      "display": "4.5rem"
    },
    "fontWeight": {
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "letterSpacing": {
      "tight": "-0.02em",
      "normal": "0",
      "wide": "0.05em",
      "ultrawide": "0.15em"
    }
  },
  "spacing": {
    "unit": "8px",
    "scale": {
      "0": "0",
      "1": "4px",
      "2": "8px",
      "3": "12px",
      "4": "16px",
      "5": "24px",
      "6": "32px",
      "7": "48px",
      "8": "64px",
      "9": "96px"
    }
  },
  "borders": {
    "width": {
      "thin": "1px",
      "medium": "2px",
      "thick": "4px"
    },
    "style": {
      "solid": "solid",
      "double": "double"
    },
    "radius": {
      "none": "0",
      "sm": "2px",
      "md": "4px",
      "geometric": "0 24px 0 24px"
    }
  },
  "shadows": {
    "sm": "0 2px 4px rgba(0, 0, 0, 0.3)",
    "md": "0 4px 12px rgba(0, 0, 0, 0.4)",
    "lg": "0 8px 24px rgba(0, 0, 0, 0.5)",
    "gold": "0 0 20px rgba(201, 162, 39, 0.3)",
    "inset": "inset 0 2px 4px rgba(0, 0, 0, 0.2)"
  }
}
```

### CSS Custom Properties

```css
:root {
  /* Colors - Primary */
  --art-deco-gold: #c9a227;
  --art-deco-gold-light: #d4b854;
  --art-deco-gold-dark: #9e7b1e;

  /* Colors - Secondary */
  --art-deco-navy: #1a1a2e;
  --art-deco-teal: #16213e;
  --art-deco-midnight: #0f0f23;

  /* Colors - Accent */
  --art-deco-copper: #b87333;
  --art-deco-emerald: #2d5a4e;
  --art-deco-ivory: #f5f0e8;

  /* Typography */
  --art-deco-font-display: 'Playfair Display', 'Times New Roman', serif;
  --art-deco-font-body: 'Raleway', 'Helvetica Neue', sans-serif;

  /* Borders */
  --art-deco-border-decorative: 2px double var(--art-deco-gold);
  --art-deco-radius-geometric: 0 24px 0 24px;

  /* Shadows */
  --art-deco-shadow-gold: 0 0 20px rgba(201, 162, 39, 0.3);
}

/* Component: Button */
.art-deco-button {
  font-family: var(--art-deco-font-body);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 12px 32px;
  background: linear-gradient(135deg, var(--art-deco-gold) 0%, var(--art-deco-gold-dark) 100%);
  color: var(--art-deco-navy);
  border: none;
  border-radius: var(--art-deco-radius-geometric);
  box-shadow: var(--art-deco-shadow-gold);
  transition: all 0.3s ease;
}

.art-deco-button:hover {
  background: linear-gradient(135deg, var(--art-deco-gold-light) 0%, var(--art-deco-gold) 100%);
  box-shadow: 0 0 30px rgba(201, 162, 39, 0.5);
  transform: translateY(-2px);
}

.art-deco-button:focus {
  outline: 2px solid var(--art-deco-ivory);
  outline-offset: 4px;
}

/* Component: Card */
.art-deco-card {
  background: var(--art-deco-navy);
  border: var(--art-deco-border-decorative);
  padding: 32px;
  position: relative;
}

.art-deco-card::before,
.art-deco-card::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--art-deco-gold);
}

.art-deco-card::before {
  top: 8px;
  left: 8px;
  border-right: none;
  border-bottom: none;
}

.art-deco-card::after {
  bottom: 8px;
  right: 8px;
  border-left: none;
  border-top: none;
}

/* Component: Input */
.art-deco-input {
  font-family: var(--art-deco-font-body);
  font-size: 1rem;
  padding: 12px 16px;
  background: var(--art-deco-midnight);
  border: 1px solid var(--art-deco-gold);
  border-radius: 0;
  color: var(--art-deco-ivory);
}

.art-deco-input:focus {
  outline: none;
  border-color: var(--art-deco-gold-light);
  box-shadow: var(--art-deco-shadow-gold);
}

.art-deco-input::placeholder {
  color: #8a8aa3;
  font-style: italic;
}

/* Typography */
.art-deco-heading {
  font-family: var(--art-deco-font-display);
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--art-deco-gold);
}

.art-deco-body {
  font-family: var(--art-deco-font-body);
  font-weight: 400;
  line-height: 1.7;
  color: var(--art-deco-ivory);
}
```

### theme.json Integration

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        {
          "slug": "primary",
          "color": "#c9a227",
          "name": "Art Deco Gold"
        },
        {
          "slug": "secondary",
          "color": "#1a1a2e",
          "name": "Art Deco Navy"
        },
        {
          "slug": "tertiary",
          "color": "#b87333",
          "name": "Art Deco Copper"
        },
        {
          "slug": "surface",
          "color": "#252540",
          "name": "Card Surface"
        },
        {
          "slug": "contrast",
          "color": "#f5f0e8",
          "name": "Ivory"
        }
      ]
    },
    "typography": {
      "fontFamilies": [
        {
          "slug": "display",
          "fontFamily": "'Playfair Display', serif",
          "name": "Display"
        },
        {
          "slug": "body",
          "fontFamily": "'Raleway', sans-serif",
          "name": "Body"
        }
      ],
      "fontSizes": [
        {
          "slug": "small",
          "size": "0.875rem",
          "name": "Small"
        },
        {
          "slug": "medium",
          "size": "1rem",
          "name": "Medium"
        },
        {
          "slug": "large",
          "size": "1.25rem",
          "name": "Large"
        },
        {
          "slug": "x-large",
          "size": "2rem",
          "name": "Extra Large"
        },
        {
          "slug": "display",
          "size": "4rem",
          "name": "Display"
        }
      ]
    },
    "spacing": {
      "spacingSizes": [
        { "slug": "20", "size": "8px", "name": "2" },
        { "slug": "30", "size": "16px", "name": "3" },
        { "slug": "40", "size": "24px", "name": "4" },
        { "slug": "50", "size": "32px", "name": "5" },
        { "slug": "60", "size": "48px", "name": "6" }
      ]
    }
  },
  "styles": {
    "color": {
      "background": "#1a1a2e",
      "text": "#f5f0e8"
    },
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--body)",
      "lineHeight": "1.7"
    },
    "elements": {
      "heading": {
        "typography": {
          "fontFamily": "var(--wp--preset--font-family--display)",
          "fontWeight": "700"
        },
        "color": {
          "text": "#c9a227"
        }
      },
      "link": {
        "color": {
          "text": "#c9a227"
        },
        ":hover": {
          "color": {
            "text": "#d4b854"
          }
        }
      },
      "button": {
        "color": {
          "background": "#c9a227",
          "text": "#1a1a2e"
        },
        "typography": {
          "fontFamily": "var(--wp--preset--font-family--body)",
          "fontWeight": "600",
          "letterSpacing": "0.15em",
          "textTransform": "uppercase"
        }
      }
    }
  }
}
```

### Theme Compatibility

**Works well with:**
- Twenty Twenty-Three (with dark mode)
- Block themes with full-site editing
- Custom themes with CSS variable support

**Override suggestions:**
```css
/* In child theme or plugin */
body.is-art-deco-style {
  --wp--preset--color--primary: var(--art-deco-gold);
  --wp--preset--color--background: var(--art-deco-navy);
  --wp--preset--color--foreground: var(--art-deco-ivory);
}
```

---

## Other Style Examples

<details>
<summary>Brutalist Style</summary>

Key characteristics:
- Black and white with occasional red
- Monospace typography
- Raw, unpolished edges
- Visible grid structure
- No rounded corners

```css
:root {
  --brutalist-black: #000000;
  --brutalist-white: #ffffff;
  --brutalist-red: #ff0000;
  --brutalist-font: 'IBM Plex Mono', monospace;
  --brutalist-border: 4px solid black;
}
```
</details>

<details>
<summary>Nordic Style</summary>

Key characteristics:
- Cool, muted colors
- Lots of whitespace
- Clean sans-serif typography
- Subtle shadows
- Rounded, soft edges

```css
:root {
  --nordic-white: #fafafa;
  --nordic-gray: #e5e5e5;
  --nordic-blue: #6b8cae;
  --nordic-green: #7d9d8c;
  --nordic-font: 'Inter', sans-serif;
}
```
</details>

---

## Usage Notes

- Test style tokens against WCAG contrast requirements
- Provide light/dark mode variations when appropriate
- Include reduced-motion alternatives for animated effects
- Document font loading requirements (Google Fonts, local fonts)
