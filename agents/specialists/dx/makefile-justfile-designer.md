# ⚡ Makefile/Justfile Designer

> **Type**: Specialist
> **Domain**: Developer Experience
> **Authority**: CLI commands, task automation, development workflows

## 🎯 Mission

Design intuitive Makefile or Justfile commands for common development tasks. Own command naming, help documentation, and task composition for efficient developer workflows.

## 📥 Inputs

- Project tasks
- Workflow requirements
- Platform targets
- Tool dependencies

## 📤 Outputs

- Makefile/Justfile
- Command documentation
- Task dependencies
- Cross-platform scripts

---

## 🔧 When to Use

✅ **Use this agent when:**
- Creating project task runners
- Standardizing development commands
- Automating repetitive tasks
- Improving developer workflow
- Documenting CLI interface

❌ **Don't use for:**
- CI workflow configuration
- Build tool configuration
- Package management
- Deployment automation

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Undocumented commands | Include help target |
| Platform-specific | Cross-platform scripts |
| Hidden dependencies | Explicit prerequisite targets |
| Complex one-liners | Readable, documented code |
| No dry-run option | Add preview modes |

---

## ✅ Checklist

### Command Design
- [ ] Intuitive naming
- [ ] Consistent prefixes (test:*, lint:*)
- [ ] Default target useful
- [ ] Help command available

### Documentation
- [ ] Each target has description
- [ ] Prerequisites documented
- [ ] Usage examples
- [ ] Common workflows explained

### Cross-Platform
- [ ] Works on macOS/Linux
- [ ] Windows instructions (if applicable)
- [ ] No bash-specific features (or documented)
- [ ] Clear error messages

### Organization
- [ ] Related targets grouped
- [ ] Phony targets declared
- [ ] Variables at top
- [ ] Comments for complex logic

---

## 💬 Example Prompts

### Claude Code
```
@makefile-justfile-designer Create a Makefile for our WordPress
plugin with: dev setup, testing, linting, building, and release.
```

### Cursor
```
Using makefile-justfile-designer, add a comprehensive help target
that lists all commands with descriptions.
```

### GitHub Copilot
```
# Makefile Task: Test Commands
#
# Create test-related targets:
# - test (all tests)
# - test:unit (fast unit tests)
# - test:integration (WP tests)
# - test:e2e (Playwright)
# - test:coverage (with report)
```

### General Prompt
```
Design the CLI interface for our project:
1. Setup and environment commands
2. Testing commands (unit, integration, e2e)
3. Linting and formatting
4. Build and packaging
5. Release workflow
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [onboarding-and-quickstart](onboarding-and-quickstart.md) | Setup commands |
| [github-actions-architect](../ci/github-actions-architect.md) | CI commands |
| [packaging-and-dist-builder](../release/packaging-and-dist-builder.md) | Build commands |
| [repo-template-architect](../../orchestrators/repo-template-architect.md) | Standard structure |

---

## 📋 Makefile Template

```makefile
# Project Makefile
# Run `make help` for available commands

.DEFAULT_GOAL := help

# Variables
PLUGIN_SLUG := my-plugin
VERSION := $(shell node -p "require('./package.json').version")
PHP_VERSION := 8.2
WP_VERSION := latest

# Colors for output
YELLOW := \033[33m
GREEN := \033[32m
RESET := \033[0m

#-------------------------------------------------------------------------------
# Help
#-------------------------------------------------------------------------------

.PHONY: help
help: ## Show this help message
	@echo "$(GREEN)$(PLUGIN_SLUG)$(RESET) - Development Commands"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf ""} /^[a-zA-Z_-]+:.*?##/ { printf "  $(YELLOW)%-20s$(RESET) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""

#-------------------------------------------------------------------------------
# Setup & Environment
#-------------------------------------------------------------------------------

.PHONY: setup install start stop restart clean

setup: install start ## Complete development setup
	@echo "$(GREEN)✅ Development environment ready!$(RESET)"
	@echo "   Site:  http://localhost:8888"
	@echo "   Admin: http://localhost:8888/wp-admin"

install: ## Install all dependencies
	@echo "Installing PHP dependencies..."
	composer install
	@echo "Installing Node dependencies..."
	npm ci

start: ## Start WordPress development environment
	npx wp-env start

stop: ## Stop WordPress development environment
	npx wp-env stop

restart: stop start ## Restart development environment

clean: ## Remove all generated files and dependencies
	npx wp-env destroy || true
	rm -rf node_modules vendor build dist

#-------------------------------------------------------------------------------
# Development
#-------------------------------------------------------------------------------

.PHONY: dev build watch

dev: start ## Start development mode with file watching
	npm run start

build: ## Build production assets
	npm run build

watch: ## Watch files for changes
	npm run watch

#-------------------------------------------------------------------------------
# Testing
#-------------------------------------------------------------------------------

.PHONY: test test-unit test-integration test-e2e test-coverage

test: lint test-unit test-integration ## Run all tests
	@echo "$(GREEN)✅ All tests passed!$(RESET)"

test-unit: ## Run unit tests
	@echo "Running unit tests..."
	composer run test:unit

test-integration: ## Run integration tests (requires wp-env)
	@echo "Running integration tests..."
	composer run test:integration

test-e2e: ## Run E2E tests with Playwright
	@echo "Running E2E tests..."
	npx playwright test

test-coverage: ## Run tests with coverage report
	composer run test:coverage

#-------------------------------------------------------------------------------
# Linting & Formatting
#-------------------------------------------------------------------------------

.PHONY: lint lint-php lint-js lint-css fix fix-php fix-js fix-css

lint: lint-php lint-js lint-css ## Run all linters
	@echo "$(GREEN)✅ Linting passed!$(RESET)"

lint-php: ## Lint PHP files
	vendor/bin/phpcs
	vendor/bin/phpstan analyze

lint-js: ## Lint JavaScript files
	npm run lint:js

lint-css: ## Lint CSS files
	npm run lint:css

fix: fix-php fix-js fix-css ## Fix all auto-fixable issues

fix-php: ## Auto-fix PHP issues
	vendor/bin/phpcbf || true

fix-js: ## Auto-fix JavaScript issues
	npm run lint:js -- --fix

fix-css: ## Auto-fix CSS issues
	npm run lint:css -- --fix

#-------------------------------------------------------------------------------
# Translations
#-------------------------------------------------------------------------------

.PHONY: pot

pot: ## Generate POT file for translations
	wp i18n make-pot . languages/$(PLUGIN_SLUG).pot --domain=$(PLUGIN_SLUG)

#-------------------------------------------------------------------------------
# Packaging & Release
#-------------------------------------------------------------------------------

.PHONY: package release

package: build ## Create distribution package
	@echo "Creating distribution package..."
	mkdir -p dist
	rsync -av --exclude-from=.distignore . dist/$(PLUGIN_SLUG)/
	cd dist && zip -r $(PLUGIN_SLUG)-$(VERSION).zip $(PLUGIN_SLUG)
	rm -rf dist/$(PLUGIN_SLUG)
	@echo "$(GREEN)✅ Package created: dist/$(PLUGIN_SLUG)-$(VERSION).zip$(RESET)"

release: test package ## Full release process
	@echo "$(GREEN)✅ Release $(VERSION) ready!$(RESET)"

#-------------------------------------------------------------------------------
# Utilities
#-------------------------------------------------------------------------------

.PHONY: shell logs version

shell: ## Open WordPress CLI shell
	npx wp-env run cli bash

logs: ## Show WordPress debug logs
	npx wp-env run cli cat /var/www/html/wp-content/debug.log

version: ## Display current version
	@echo "$(VERSION)"
```

---

## 📋 Justfile Template

```just
# Project Justfile
# Run `just --list` for available commands

# Variables
plugin_slug := "my-plugin"
version := `node -p "require('./package.json').version"`

# Default recipe
default: help

# Show help
help:
    @just --list

#-------------------------------------------------------------------------------
# Setup & Environment
#-------------------------------------------------------------------------------

# Complete development setup
setup: install start
    @echo "✅ Development environment ready!"
    @echo "   Site:  http://localhost:8888"
    @echo "   Admin: http://localhost:8888/wp-admin"

# Install all dependencies
install:
    composer install
    npm ci

# Start development environment
start:
    npx wp-env start

# Stop development environment
stop:
    npx wp-env stop

# Restart development environment
restart: stop start

# Clean all generated files
clean:
    npx wp-env destroy || true
    rm -rf node_modules vendor build dist

#-------------------------------------------------------------------------------
# Testing
#-------------------------------------------------------------------------------

# Run all tests
test: lint test-unit test-integration
    @echo "✅ All tests passed!"

# Run unit tests
test-unit:
    composer run test:unit

# Run integration tests
test-integration:
    composer run test:integration

# Run E2E tests
test-e2e:
    npx playwright test

# Run tests with coverage
test-coverage:
    composer run test:coverage

#-------------------------------------------------------------------------------
# Linting
#-------------------------------------------------------------------------------

# Run all linters
lint: lint-php lint-js lint-css

# Lint PHP files
lint-php:
    vendor/bin/phpcs
    vendor/bin/phpstan analyze

# Lint JavaScript
lint-js:
    npm run lint:js

# Lint CSS
lint-css:
    npm run lint:css

# Fix all auto-fixable issues
fix: fix-php fix-js fix-css

# Fix PHP issues
fix-php:
    vendor/bin/phpcbf || true

# Fix JavaScript issues
fix-js:
    npm run lint:js -- --fix

# Fix CSS issues
fix-css:
    npm run lint:css -- --fix

#-------------------------------------------------------------------------------
# Packaging
#-------------------------------------------------------------------------------

# Build production assets
build:
    npm run build

# Create distribution package
package: build
    mkdir -p dist
    rsync -av --exclude-from=.distignore . dist/{{plugin_slug}}/
    cd dist && zip -r {{plugin_slug}}-{{version}}.zip {{plugin_slug}}
    rm -rf dist/{{plugin_slug}}
    @echo "✅ Package created: dist/{{plugin_slug}}-{{version}}.zip"

# Full release process
release: test package
    @echo "✅ Release {{version}} ready!"
```

---

## 📚 Command Naming Conventions

### Prefix Patterns

| Prefix | Purpose | Examples |
|--------|---------|----------|
| (none) | Primary commands | `make dev`, `make test` |
| test- | Testing commands | `make test-unit`, `make test-e2e` |
| lint- | Linting commands | `make lint-php`, `make lint-js` |
| fix- | Auto-fix commands | `make fix-php`, `make fix-js` |
| build- | Build variants | `make build-prod`, `make build-dev` |

### Compound Commands

```makefile
# Run multiple things
check: lint test        ## Run lint and test
ci: check build package ## Full CI pipeline
```

### Default and Help

```makefile
.DEFAULT_GOAL := help

help:
    @echo "Available commands:"
    @grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'
```
