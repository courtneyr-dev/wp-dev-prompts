# Core Prompts

Portable, self-contained prompts under 2000 tokens. Works on every platform — ChatGPT, Gemini, Claude, Copilot, and more.

## Prompts

| Prompt | What It Does |
|--------|-------------|
| [plugin-setup.md](plugin-setup.md) | Scaffold a new WordPress plugin with security patterns |
| [block-dev.md](block-dev.md) | Create a custom block with apiVersion 3 and Interactivity API |
| [testing-setup.md](testing-setup.md) | Set up PHPUnit, PHPCS, PHPStan, and CI pipeline |
| [security-review.md](security-review.md) | Audit code against the Security Trinity and OWASP patterns |
| [accessibility-check.md](accessibility-check.md) | WCAG 2.2 Level AA compliance audit |
| [documentation.md](documentation.md) | Generate readme.txt, README.md, and inline docs |

## How to use

1. Open any prompt file
2. Copy the content inside `<prompt>...</prompt>` tags
3. Replace bracketed `[VARIABLES]` with your values
4. Paste into your AI assistant

No tool access required. No file references to resolve. Just paste and go.

## Design principles

- **Under 2000 tokens** — fits in any context window
- **Self-contained** — no external file dependencies
- **Single purpose** — one task per prompt
- **Platform agnostic** — no tool-specific features

## Want more?

For full-featured prompts that use tool access and file references, see [../extended/](../extended/).
