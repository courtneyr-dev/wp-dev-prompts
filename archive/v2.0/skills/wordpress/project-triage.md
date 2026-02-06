# WordPress Project Triage

> **Type**: Skill
> **Domain**: WordPress Development
> **Source**: WordPress/agent-skills wp-project-triage

<skill>
<summary>
Deterministic inspection of WordPress repositories to generate structured reports for development workflow decisions.
</summary>

<knowledge>
## Overview

This skill performs deterministic inspection of WordPress repositories including plugins, themes, and core installations, generating structured JSON reports to inform development workflows.

**Requirements:**
- WordPress 6.9+ with PHP 7.2.24+
- Filesystem-based approach using bash and Node.js
- Optional: WP-CLI for certain operations

## Core Workflow

The three-step process involves:

1. **Detection**: Execute the detector script to produce JSON output
2. **Schema Review**: Reference the output contract documentation
3. **Implementation**: Use the report to apply appropriate guardrails based on project characteristics

## Essential Data Points

The generated report must include:
- `project.kind` - Project type classification (plugin, theme, core)
- `signals` - Detected features and patterns
- `tooling` - Available tools and configurations

## Project Kind Classifications

**Plugins:**
- Single-file plugins
- Multi-file plugins with standard structure
- Composer-managed plugins

**Themes:**
- Classic themes
- Block themes
- Child themes

**Core:**
- WordPress core installations
- Core development checkouts

## Signals Detection

Common signals include:
- Block editor usage (`signals.usesBlocks`)
- REST API implementation (`signals.usesRestApi`)
- Interactivity API (`signals.usesInteractivityApi`)
- Abilities API (`signals.usesAbilitiesApi`)
- Custom post types and taxonomies
- Settings pages and options

## Tooling Detection

Detects presence of:
- Composer (`composer.json`)
- npm/Node.js (`package.json`)
- PHPUnit configuration
- PHPStan/PHPCS configuration
- Build tools (webpack, wp-scripts)
- CI/CD configurations

## Validation

**Quality Assurance Requirements:**
- Confirm JSON parseability
- Verify presence of core fields (`project.kind`, `signals`, `tooling`)
- Re-execute detector following structural or tooling modifications

## Troubleshooting

**Common Issues:**
- Misidentified project types: Verify correct repository root
- Performance delays: Optimize ignore directories in detection script
- Missing signals: Ensure code patterns match expected signatures
</knowledge>

<best_practices>
- Run triage at the start of any WordPress project analysis
- Use the JSON output to guide subsequent tool selection
- Re-run detection after significant project changes
- Validate against schema before consuming in workflows
</best_practices>

<references>
- [WordPress/agent-skills wp-project-triage](https://github.com/WordPress/agent-skills/tree/trunk/skills/wp-project-triage)
</references>
</skill>
