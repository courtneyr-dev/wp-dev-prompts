# Platform Capability Matrix

This document outlines what each AI platform can and cannot do, helping you choose the right platform and prompts for your task.

## Quick Reference

| Capability | ChatGPT | Gemini | Claude | Claude Code | Cursor | Cline | Copilot |
|------------|---------|--------|--------|-------------|--------|-------|---------|
| Read files | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅* |
| Write files | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅* |
| Run commands | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| Web access | ✅** | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Multi-turn memory | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Limited |
| Custom instructions | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| File upload | ✅ | ✅ | ✅ | N/A | N/A | N/A | N/A |
| Context window | 128K | 1M+ | 200K | 200K | 200K | Varies | 8K |
| Code execution | ✅*** | ✅*** | ❌ | ✅ | ✅ | ✅ | ❌ |

*Copilot: Within current file context
**ChatGPT: With browsing enabled
***Sandboxed code interpreter

---

## Platform Details

### ChatGPT / GPT-4

**Best For**: Brainstorming, planning, learning, general questions

**Capabilities**:
- Large context window (128K tokens)
- Web browsing (when enabled)
- Code interpreter for Python
- File upload and analysis
- Custom GPTs with persistent instructions
- DALL-E image generation

**Limitations**:
- No direct file system access
- Cannot run arbitrary shell commands
- No IDE integration
- Cannot access local projects

**Prompt Recommendations**:
- Use portable prompts from `prompts/core/`
- Provide all necessary context in the prompt
- Copy-paste code snippets for review
- Use for planning before implementation

**Configuration**: See `platforms/chatgpt/`

---

### Google Gemini

**Best For**: Large context analysis, research, documentation review

**Capabilities**:
- Massive context window (1M+ tokens)
- Web access and search
- File upload (documents, images, video)
- Code execution (sandboxed)
- Multi-modal understanding

**Limitations**:
- No direct file system access
- Cannot run shell commands
- No IDE integration
- May require different prompting style

**Prompt Recommendations**:
- Place instructions AFTER context (Gemini-specific)
- Use XML-style tags for structure
- Leverage large context for full file analysis
- Use for documentation and code review

**Configuration**: See `platforms/gemini/`

---

### Claude (Web/API)

**Best For**: Detailed analysis, nuanced responses, long-form content

**Capabilities**:
- Large context window (200K tokens)
- Excellent instruction following
- Strong code understanding
- File upload and analysis
- Projects with persistent context

**Limitations**:
- No web access
- No file system access
- Cannot run commands
- No IDE integration

**Prompt Recommendations**:
- Use extended prompts for complex tasks
- Leverage artifacts for code output
- Use Projects for persistent context
- Excellent for security reviews

**Configuration**: See `platforms/claude-code/` (shared patterns)

---

### Claude Code

**Best For**: Full development workflow, file management, testing

**Capabilities**:
- Direct file system access (read/write)
- Shell command execution
- Git operations
- Multi-file editing
- Tool use and MCP servers
- Web search and fetch
- Background task execution

**Limitations**:
- Requires terminal environment
- Permission-based (asks before actions)
- No GUI interaction

**Prompt Recommendations**:
- Use extended prompts for complex workflows
- Reference skills directly by path
- Use agents for multi-step tasks
- Primary platform for this framework

**Configuration**: See `platforms/claude-code/`

---

### Cursor

**Best For**: Code editing, refactoring, in-editor assistance

**Capabilities**:
- Full codebase awareness
- File reading and editing
- Terminal command execution
- .cursorrules for persistent instructions
- Multi-file context
- Composer for multi-step tasks

**Limitations**:
- IDE-specific (VS Code fork)
- May not follow complex workflows
- Context can be noisy with large codebases

**Prompt Recommendations**:
- Use `.cursorrules` for project standards
- Use `.cursor/rules/` for domain-specific rules
- Keep prompts focused on specific tasks
- Reference file paths explicitly

**Configuration**: See `platforms/cursor/`

---

### Cline

**Best For**: Autonomous coding tasks, guided development

**Capabilities**:
- File system access (read/write)
- Command execution
- Plan/Act mode separation
- Multiple AI provider support
- .clinerules for project guidelines
- Permission-based safety

**Limitations**:
- VS Code extension
- Requires explicit permission grants
- May be verbose in explanations

**Prompt Recommendations**:
- Use Plan mode for architecture decisions
- Use Act mode for implementation
- Configure .clinerules for project standards
- Set clear scope boundaries

**Configuration**: See `platforms/cline/`

---

### GitHub Copilot

**Best For**: Inline code completion, quick suggestions

**Capabilities**:
- Inline code completion
- Comment-driven generation
- Chat interface (@workspace)
- Multi-file awareness (limited)
- Custom instructions file

**Limitations**:
- Limited context window (~8K tokens)
- Best for small, focused tasks
- Less reliable for complex logic
- Cannot execute commands

**Prompt Recommendations**:
- Use `.github/copilot-instructions.md` for standards
- Write detailed comments before code
- Keep requests small and focused
- Use for boilerplate and patterns

**Configuration**: See `platforms/copilot/`

---

## Choosing the Right Platform

### By Task Type

| Task | Recommended Platform | Why |
|------|---------------------|-----|
| Project planning | ChatGPT, Claude | Good for brainstorming |
| Architecture design | Claude, Gemini | Long context, nuanced |
| Setting up testing | Claude Code, Cursor | Need file access |
| Writing tests | Claude Code, Cline | Need to read existing code |
| Code review | Gemini, Claude | Large context windows |
| Refactoring | Cursor, Claude Code | Direct file editing |
| Documentation | Claude, ChatGPT | Good prose generation |
| Security audit | Claude, Claude Code | Careful analysis |
| Quick edits | Cursor, Copilot | Fast, inline |

### By Project Stage

| Stage | Platforms | Notes |
|-------|-----------|-------|
| Brainstorming | ChatGPT, Claude, Gemini | No file access needed |
| Planning | Claude, Gemini | Long-form analysis |
| Setup | Claude Code, Cursor, Cline | Need file creation |
| Development | Claude Code, Cursor, Cline | File editing + commands |
| Testing | Claude Code, Cline | Run test commands |
| Documentation | Claude, Claude Code | Write + create files |
| Launch | Any | Mostly planning |
| Maintenance | Claude Code, Cursor | Ongoing edits |

---

## Platform-Specific Tips

### ChatGPT
- Enable web browsing for documentation lookups
- Use Custom GPTs for persistent WordPress context
- Upload the skills files as knowledge base

### Gemini
- Put your question AFTER the context/code
- Use explicit structural tags
- Leverage the massive context window

### Claude
- Use Projects for persistent context
- Upload frequently referenced files
- Excellent for security-sensitive reviews

### Claude Code
- Set up CLAUDE.md in your project root
- Configure relevant MCP servers
- Use skills/ directory for reference

### Cursor
- Create comprehensive .cursorrules
- Use @workspace for codebase questions
- Use Composer for multi-file changes

### Cline
- Start in Plan mode for new features
- Use .clinerules for consistent behavior
- Grant permissions thoughtfully

### Copilot
- Write descriptive function comments
- Use copilot-instructions.md for standards
- Best for completion, not generation
