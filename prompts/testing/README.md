# Testing Prompts

AI prompts for comprehensive testing, with a focus on UI/UX validation.

## Available Prompts

| Prompt | Description | Focus Area |
|--------|-------------|------------|
| `ui-ux-audit.md` | Complete UI/UX audit framework | Full evaluation |
| `navigation-flow-tests.md` | Navigation and wayfinding tests | Information architecture |
| `responsive-tests.md` | Responsive design validation | Cross-device compatibility |
| `heuristic-evaluation.md` | Nielsen's 10 Heuristics | Usability principles |

## Quick Start

### Full UI/UX Audit
Use `ui-ux-audit.md` for comprehensive evaluation:
- Visual hierarchy
- Navigation
- Responsive design
- Feedback & affordance
- Accessibility
- Nielsen's heuristics

### Focused Testing
Use individual prompts for specific concerns:
- **Navigation issues?** → `navigation-flow-tests.md`
- **Mobile problems?** → `responsive-tests.md`
- **General usability?** → `heuristic-evaluation.md`

## Related Resources

### Data Files
- `data/ui-ux-audit-checklist.yaml` - Structured audit checklist

### Test Templates
- `tests/ui-ux/visual-hierarchy.spec.ts`
- `tests/ui-ux/navigation.spec.ts`
- `tests/ui-ux/responsive.spec.ts`
- `tests/ui-ux/feedback-affordance.spec.ts`
- `tests/ui-ux/accessibility.spec.ts`
- `tests/ui-ux/heuristic-evaluation.spec.ts`

### Documentation
- `docs/ui-ux-audit.md` - Audit guide
- `docs/ui-ux-guidelines.md` - Design principles

## Usage Pattern

1. **Start with audit prompt** to identify issues
2. **Generate specific tests** with focused prompts
3. **Run automated tests** from `tests/ui-ux/`
4. **Track findings** using the YAML checklist

## Severity Levels

All prompts use consistent severity ratings:

| Level | Name | Action |
|-------|------|--------|
| Critical | Usability catastrophe | Must fix before launch |
| High | Major problem | Fix as high priority |
| Medium | Minor problem | Fix as low priority |
| Low | Cosmetic | Fix if time permits |
