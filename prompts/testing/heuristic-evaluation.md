# Heuristic Evaluation Prompt

> **Type**: Extended
> **Platforms**: Claude Code, Cursor, Cline
> **References**: `tests/ui-ux/heuristic-evaluation.spec.ts`, `data/ui-ux-audit-checklist.yaml`

<prompt>
<role>
You are a usability expert trained in Jakob Nielsen's 10 Usability Heuristics. You conduct rigorous heuristic evaluations that identify usability problems with specific references to which principles are violated and why. You understand that heuristics are guidelines, not rules, and consider context when evaluating severity.
</role>

<context>
I need a heuristic evaluation of [TARGET] using Nielsen's 10 Usability Heuristics. This evaluation should identify violations, rate their severity, and provide specific recommendations for improvement.

Reference the automated heuristic tests in `tests/ui-ux/heuristic-evaluation.spec.ts` for testable criteria.
</context>

<task>
Evaluate [TARGET] against each of Nielsen's 10 Heuristics:

## H1: Visibility of System Status
The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.

**Check for:**
- Loading indicators during operations
- Progress bars for multi-step processes
- Status messages after actions
- Real-time feedback (typing indicators, character counts)
- Clear indication of current state

## H2: Match Between System and Real World
The system should speak the user's language, with words, phrases, and concepts familiar to the user, rather than system-oriented terms.

**Check for:**
- Natural language instead of jargon
- Logical information ordering
- Real-world metaphors and conventions
- Culturally appropriate content
- Familiar icons and symbols

## H3: User Control and Freedom
Users often choose system functions by mistake and need a clearly marked "emergency exit" to leave the unwanted state.

**Check for:**
- Undo/redo functionality
- Cancel buttons on modals and forms
- Easy navigation back
- Confirmation before destructive actions
- Exit points in wizards/flows

## H4: Consistency and Standards
Users should not have to wonder whether different words, situations, or actions mean the same thing.

**Check for:**
- Consistent button styles and placement
- Same terminology throughout
- Standard platform conventions
- Predictable interaction patterns
- Uniform visual design language

## H5: Error Prevention
Even better than good error messages is a careful design which prevents a problem from occurring in the first place.

**Check for:**
- Confirmation dialogs for risky actions
- Input constraints (type="email", maxlength)
- Disabled states for invalid actions
- Clear labels and instructions
- Smart defaults

## H6: Recognition Rather Than Recall
Minimize the user's memory load by making objects, actions, and options visible.

**Check for:**
- Visible navigation and options
- Recently used items
- Contextual help
- Filled form fields visible
- Search suggestions and autocomplete

## H7: Flexibility and Efficiency of Use
Accelerators—unseen by the novice user—may speed up interaction for expert users.

**Check for:**
- Keyboard shortcuts
- Customizable interface
- Shortcuts for frequent actions
- Power user features
- Touch gestures

## H8: Aesthetic and Minimalist Design
Dialogues should not contain information that is irrelevant or rarely needed.

**Check for:**
- Clean, uncluttered layouts
- Progressive disclosure
- Relevant content only
- Clear visual hierarchy
- Purposeful use of space

## H9: Help Users Recognize, Diagnose, and Recover from Errors
Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.

**Check for:**
- Clear error messages
- Specific problem identification
- Actionable solutions
- Inline validation feedback
- Error recovery paths

## H10: Help and Documentation
Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.

**Check for:**
- Searchable help content
- Task-oriented documentation
- Contextual help (tooltips, hints)
- Onboarding for new users
- FAQ and troubleshooting
</task>

<constraints>
- Evaluate each heuristic independently
- Rate severity: 0 (not a problem) to 4 (usability catastrophe)
- Provide specific examples for each finding
- Include screenshots or element references
- Consider both novice and expert users
- Note findings that can be automated
</constraints>

<output_format>
## Heuristic Evaluation Report: [TARGET]

### Evaluation Summary

| Heuristic | Issues Found | Avg Severity | Status |
|-----------|--------------|--------------|--------|
| H1: Visibility of System Status | X | X.X | 🔴/🟡/🟢 |
| H2: Match with Real World | X | X.X | 🔴/🟡/🟢 |
| H3: User Control and Freedom | X | X.X | 🔴/🟡/🟢 |
| H4: Consistency and Standards | X | X.X | 🔴/🟡/🟢 |
| H5: Error Prevention | X | X.X | 🔴/🟡/🟢 |
| H6: Recognition vs Recall | X | X.X | 🔴/🟡/🟢 |
| H7: Flexibility and Efficiency | X | X.X | 🔴/🟡/🟢 |
| H8: Aesthetic and Minimalist | X | X.X | 🔴/🟡/🟢 |
| H9: Error Recovery | X | X.X | 🔴/🟡/🟢 |
| H10: Help and Documentation | X | X.X | 🔴/🟡/🟢 |

**Overall Usability Score: X/40**

---

### H1: Visibility of System Status

**Findings:**

#### H1-001: [Issue Title]
- **Severity**: X/4 (Cosmetic/Minor/Major/Catastrophe)
- **Location**: [URL or component]
- **Description**: [What's wrong]
- **Evidence**: [Screenshot/selector]
- **Recommendation**: [How to fix]
- **Automatable**: Yes/No

[Repeat for each finding]

---

### H2: Match Between System and Real World

[Same format for each heuristic]

---

## Priority Matrix

### Severity 4 (Usability Catastrophe)
Must fix before launch
1. [Finding ID]: [Brief description]

### Severity 3 (Major Problem)
Should fix as high priority
1. [Finding ID]: [Brief description]

### Severity 2 (Minor Problem)
Should fix as low priority
1. [Finding ID]: [Brief description]

### Severity 1 (Cosmetic)
Fix if time permits
1. [Finding ID]: [Brief description]

---

## Automated Test Recommendations

Based on findings, add these tests to `tests/ui-ux/heuristic-evaluation.spec.ts`:

```typescript
// Test suggestion based on finding H1-001
test('[Finding description]', async ({ page }) => {
  // Test implementation
});
```

---

## Positive Findings

Areas where [TARGET] excels:
1. [Positive observation]
2. [Positive observation]
</output_format>
</prompt>

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `[TARGET]` | Interface to evaluate | `Checkout flow`, `Dashboard`, `Mobile app` |

## Expected Output

- Comprehensive heuristic evaluation report
- Severity ratings for each finding
- Priority matrix for fixes
- Automated test suggestions

## Severity Scale

| Rating | Label | Description |
|--------|-------|-------------|
| 0 | Not a problem | No usability issue |
| 1 | Cosmetic | Surface issue, fix if time permits |
| 2 | Minor | User can work around it, low priority fix |
| 3 | Major | Significant impact, should fix |
| 4 | Catastrophe | Prevents task completion, must fix |

## Usage Examples

### E-commerce Checkout Evaluation
```
Conduct a heuristic evaluation of the checkout flow from cart to confirmation, paying special attention to:
- H1: Progress indication through steps
- H3: Ability to edit cart items
- H5: Address validation and error prevention
- H9: Payment error handling
```

### SaaS Dashboard Evaluation
```
Evaluate the main dashboard against all 10 heuristics, with focus on:
- H6: Recognition of data visualizations
- H7: Keyboard shortcuts for power users
- H8: Information density and cognitive load
- H10: Onboarding for new users
```

### Mobile App Evaluation
```
Conduct a heuristic evaluation of the iOS app considering:
- Platform-specific conventions (H4)
- Touch gesture expectations (H7)
- System status with network conditions (H1)
- Thumb zone accessibility (H8)
```

## Heuristic Quick Reference

| # | Heuristic | Key Question |
|---|-----------|--------------|
| 1 | Visibility of Status | Does the user know what's happening? |
| 2 | Real World Match | Does it use familiar language and concepts? |
| 3 | User Control | Can users undo and exit easily? |
| 4 | Consistency | Does it follow conventions? |
| 5 | Error Prevention | Are mistakes designed out? |
| 6 | Recognition | Is information visible when needed? |
| 7 | Flexibility | Can experts work faster? |
| 8 | Minimalist Design | Is only essential info shown? |
| 9 | Error Recovery | Are errors clear and recoverable? |
| 10 | Help | Is assistance available when needed? |

## Related Resources

- **Tests**: `tests/ui-ux/heuristic-evaluation.spec.ts`
- **Checklist**: `data/ui-ux-audit-checklist.yaml`
- **Full Audit**: `prompts/testing/ui-ux-audit.md`
- **Nielsen Norman Group**: https://www.nngroup.com/articles/ten-usability-heuristics/
