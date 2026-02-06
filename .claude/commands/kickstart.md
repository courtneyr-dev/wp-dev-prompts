# Kickstart

Interactive WordPress project setup using the PROJECT-KICKSTART-PROMPT.

## Instructions

1. Read `prompts/extended/PROJECT-KICKSTART-PROMPT.md`

2. Walk the user through each section interactively:

   **Phase 1 - Project Definition**:
   - Ask: What type of project? (plugin, theme, block theme, block plugin)
   - Ask: Project name and slug?
   - Ask: Brief description of what it does?
   - Ask: Target WordPress version? (default: 6.9+)
   - Ask: Minimum PHP version? (default: 8.2)

   **Phase 2 - Architecture**:
   - Based on project type, recommend architecture pattern
   - Ask about block development needs (static, dynamic, interactive)
   - Ask about REST API needs
   - Ask about admin UI needs

   **Phase 3 - Testing**:
   - Recommend testing stack based on project complexity
   - Offer to run `scripts/setup-testing.sh`
   - Set up CI/CD from `github-workflows/`

   **Phase 4 - Documentation**:
   - Generate README from `prompts/extended/COMMUNITY-FILES-PROMPTS.md`
   - Set up CONTRIBUTING, SECURITY, SUPPORT files

   **Phase 5 - Launch Prep**:
   - Run through QA checklist from `templates/checklists/QA-TESTING-CHECKLIST.md`
   - Marketing prep from `prompts/extended/PLUGIN-MARKETING-PROMPTS.md`

3. Load relevant skills for each phase:
   - `skills/wordpress-dev/plugin-architecture.md` for plugin projects
   - `skills/wordpress-dev/block-development.md` for block projects
   - `skills/wordpress-security/` for security setup
   - `skills/wordpress-testing/` for test configuration

4. Generate a project plan document summarizing all decisions.
