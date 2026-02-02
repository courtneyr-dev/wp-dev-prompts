# Security Skills

WordPress security best practices for plugin and theme development.

## Skills

| Skill | Description |
|-------|-------------|
| [input-sanitization.md](input-sanitization.md) | Validating and sanitizing user input |
| [output-escaping.md](output-escaping.md) | Escaping output to prevent XSS |
| [nonces-capabilities.md](nonces-capabilities.md) | CSRF protection and user authorization |
| [database-queries.md](database-queries.md) | Secure database operations and SQL injection prevention |

## Usage

These skills should be applied to all WordPress code:

```markdown
For security review, apply:
- skills/security/input-sanitization.md
- skills/security/output-escaping.md
- skills/security/nonces-capabilities.md
- skills/security/database-queries.md
```

## Source

Based on [WordPress/agent-skills](https://github.com/WordPress/agent-skills).

## Related

- [WordPress Skills](../wordpress/) - Plugin architecture, hooks
- [Testing: Security Scanning](../testing/security-scanning.md)
