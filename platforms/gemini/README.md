# Gemini Platform Configuration

Configuration for using wp-dev-prompts with Google Gemini.

## Setup

1. Open [Google AI Studio](https://aistudio.google.com/) or Gemini
2. Copy the system instructions from `system-instructions.md` into the **System Instructions** field
3. Customize for your project

## Files

| File | Purpose |
|------|---------|
| `system-instructions.md` | System instructions for WordPress development with Gemini |

## Notes

- Gemini supports up to 2M tokens of context (largest of any platform)
- You can include entire codebases in a single prompt
- See `platforms/universal/capability-matrix.md` for Gemini's feature support
