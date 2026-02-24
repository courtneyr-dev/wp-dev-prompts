# ChatGPT Platform Configuration

Configuration for using wp-dev-prompts with ChatGPT Custom GPTs.

## Setup

1. Open [ChatGPT](https://chat.openai.com/) and go to **Explore GPTs** > **Create**
2. Copy the system instructions from `custom-gpt-config.md` into the **Instructions** field
3. Customize the configuration for your project

## Files

| File | Purpose |
|------|---------|
| `custom-gpt-config.md` | System instructions for a WordPress development GPT |

## Notes

- ChatGPT Custom GPTs support up to ~8,000 characters of instructions
- You can upload reference files (like skills or data files) as knowledge
- See `platforms/universal/capability-matrix.md` for ChatGPT's context window and feature support
