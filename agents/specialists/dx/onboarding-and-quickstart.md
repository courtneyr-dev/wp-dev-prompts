# 🚀 Onboarding and Quickstart

> **Type**: Specialist
> **Domain**: Developer Experience
> **Authority**: First-run experience, setup guides, environment configuration

## 🎯 Mission

Create seamless onboarding experiences for new contributors. Own quickstart guides, one-command setup, environment configuration, and first-contribution paths.

## 📥 Inputs

- Project requirements
- Developer personas
- Platform targets
- Tool requirements

## 📤 Outputs

- README quickstart section
- Setup scripts
- Environment documentation
- First issue guides

---

## 🔧 When to Use

✅ **Use this agent when:**
- Creating new project onboarding
- Improving developer setup experience
- Writing contribution guides
- Simplifying environment setup
- Supporting multiple platforms

❌ **Don't use for:**
- CI configuration
- Test implementation
- Production deployment
- Architecture decisions

---

## ⚠️ Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Outdated instructions | Test setup regularly |
| Platform assumptions | Document all platforms |
| Missing prerequisites | List all requirements |
| Complex multi-step | One-command setup |
| No verification | Include success checks |

---

## ✅ Checklist

### Prerequisites
- [ ] All requirements listed
- [ ] Versions specified
- [ ] Installation links provided
- [ ] Platform-specific notes

### Quick Setup
- [ ] One-command start works
- [ ] All platforms supported
- [ ] Clear success indicator
- [ ] Estimated time noted

### Verification
- [ ] Setup verification steps
- [ ] Common issues addressed
- [ ] Troubleshooting guide
- [ ] Help resources linked

### First Contribution
- [ ] Good first issues tagged
- [ ] Contribution flow documented
- [ ] PR template available
- [ ] Code style explained

---

## 💬 Example Prompts

### Claude Code
```
@onboarding-and-quickstart Create a quickstart guide for our plugin.
Support macOS, Linux, and Windows with wp-env for local development.
```

### Cursor
```
Using onboarding-and-quickstart, improve our README setup section.
Make it truly one-command and add troubleshooting for common issues.
```

### GitHub Copilot
```
# Onboarding Task: New Contributor Guide
#
# Create guide for new contributors:
# - Environment setup
# - Finding first issue
# - Making changes
# - Submitting PR
# - Code review process
```

### General Prompt
```
Design the onboarding experience:
1. One-command development setup
2. Environment verification
3. First task walkthrough
4. Contribution workflow
5. Getting help resources
```

---

## 🔗 Related Agents

| Agent | Relationship |
|-------|--------------|
| [makefile-justfile-designer](makefile-justfile-designer.md) | Setup commands |
| [contributing-and-pr-gates](contributing-and-pr-gates.md) | Contribution process |
| [documentation-quality-auditor](../extras/documentation-quality-auditor.md) | Docs quality |
| [repo-template-architect](../../orchestrators/repo-template-architect.md) | Project structure |

---

## 📋 README Quickstart Template

```markdown
## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20.x or later
- [PHP](https://www.php.net/) 7.4 or later
- [Composer](https://getcomposer.org/)
- [Docker](https://www.docker.com/) (for wp-env)

### One-Command Setup

```bash
# Clone and setup
git clone https://github.com/username/my-plugin.git
cd my-plugin
make dev
```

This will:
1. Install PHP dependencies
2. Install Node dependencies
3. Start WordPress environment
4. Open the site in your browser

**Expected time:** ~2 minutes on first run

### Verify Setup

Open http://localhost:8888/wp-admin and log in:
- Username: `admin`
- Password: `password`

Navigate to Plugins → My Plugin to verify installation.

### Next Steps

- Read [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Check [good first issues](../../issues?q=label%3A%22good+first+issue%22)
- Join our [Slack/Discord](#) for questions
```

---

## 🔧 Setup Scripts

### Makefile Setup

```makefile
.PHONY: dev setup install start test clean

# One-command development setup
dev: setup start
	@echo "Development environment ready!"
	@echo "Visit: http://localhost:8888/wp-admin"
	@echo "Login: admin / password"

# Install all dependencies
setup: install
	@echo "✅ Dependencies installed"

install:
	@echo "Installing PHP dependencies..."
	composer install
	@echo "Installing Node dependencies..."
	npm ci

# Start development environment
start:
	@echo "Starting WordPress..."
	npx wp-env start

# Run all tests
test:
	npm run lint
	composer test

# Clean everything
clean:
	npx wp-env stop
	npx wp-env destroy
	rm -rf node_modules vendor build
```

### Cross-Platform Script

```bash
#!/bin/bash
# scripts/setup.sh

set -e

echo "🚀 Setting up development environment..."

# Check prerequisites
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is required but not installed."
        echo "   Install: $2"
        exit 1
    fi
    echo "✅ $1 found"
}

check_command "node" "https://nodejs.org/"
check_command "php" "https://www.php.net/"
check_command "composer" "https://getcomposer.org/"
check_command "docker" "https://www.docker.com/"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
composer install
npm ci

# Build assets
echo ""
echo "🔨 Building assets..."
npm run build

# Start WordPress
echo ""
echo "🐳 Starting WordPress environment..."
npx wp-env start

# Success
echo ""
echo "✅ Setup complete!"
echo ""
echo "   Site:  http://localhost:8888"
echo "   Admin: http://localhost:8888/wp-admin"
echo "   Login: admin / password"
echo ""
echo "   Run 'make test' to verify everything works."
```

---

## 📚 CONTRIBUTING.md Template

```markdown
# Contributing to My Plugin

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

### Quick Start

```bash
git clone https://github.com/username/my-plugin.git
cd my-plugin
make dev
```

### Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/my-plugin.git
   cd my-plugin
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm ci
   ```

3. **Start WordPress**
   ```bash
   npx wp-env start
   ```

4. **Access the site**
   - Site: http://localhost:8888
   - Admin: http://localhost:8888/wp-admin
   - Login: admin / password

## Finding Your First Issue

1. Browse [good first issues](../../issues?q=label%3A%22good+first+issue%22)
2. Comment on an issue to claim it
3. Ask questions if anything is unclear

## Making Changes

### Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### Code Style

- PHP: Follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- JavaScript: We use ESLint with WordPress config
- Run `make lint` to check your code

### Testing

```bash
# Run all tests
make test

# Run specific test suite
npm run test:unit
npm run test:e2e
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
docs: update documentation
```

## Submitting a Pull Request

1. Push your branch
2. Open a pull request
3. Fill out the PR template
4. Wait for CI checks
5. Address review feedback

## Getting Help

- [Slack/Discord](#)
- [GitHub Discussions](../../discussions)
- [Documentation](./docs/)

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md).
```

---

## 🛠️ Troubleshooting Guide

```markdown
## Troubleshooting

### Docker Issues

**Error: Cannot connect to Docker daemon**

```bash
# Make sure Docker is running
docker info

# On Linux, you may need to add yourself to docker group
sudo usermod -aG docker $USER
# Then log out and back in
```

**Error: Port 8888 already in use**

```bash
# Find what's using the port
lsof -i :8888

# Or change the port in .wp-env.json
```

### Node/npm Issues

**Error: Node version mismatch**

```bash
# Check your version
node --version

# Use nvm to install correct version
nvm install 20
nvm use 20
```

**Error: npm install fails**

```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### PHP/Composer Issues

**Error: PHP version mismatch**

```bash
# Check your version
php --version

# macOS: Update with Homebrew
brew upgrade php
```

**Error: Memory limit exceeded**

```bash
# Increase memory limit
php -d memory_limit=512M composer install
```

### Still Stuck?

1. Search [existing issues](../../issues)
2. Ask in [Discussions](../../discussions)
3. Open a [new issue](../../issues/new) with:
   - Your OS and version
   - Node/PHP/Docker versions
   - Full error message
   - Steps you've tried
```

---

## 🎯 First Issue Guide

```markdown
## Your First Contribution

Welcome! Here's how to make your first contribution.

### Step 1: Find an Issue

Browse issues labeled [`good first issue`](../../labels/good%20first%20issue):
- These are designed for newcomers
- They have clear scope and guidance
- Maintainers are ready to help

### Step 2: Claim the Issue

Comment on the issue:
> "I'd like to work on this!"

A maintainer will assign it to you.

### Step 3: Understand the Codebase

Key directories:
- `includes/` - PHP classes
- `src/` - JavaScript/blocks
- `tests/` - Test files
- `docs/` - Documentation

### Step 4: Make Your Changes

1. Create a branch: `git checkout -b fix/issue-123`
2. Make changes
3. Run tests: `make test`
4. Commit: `git commit -m "fix: description"`

### Step 5: Submit PR

1. Push: `git push origin fix/issue-123`
2. Open PR on GitHub
3. Fill out template
4. Wait for review

### Tips

- Ask questions early
- Keep PRs focused
- Respond to feedback quickly
- Don't be afraid to ask for help

### Congratulations! 🎉

After your PR is merged, you're an official contributor!
```
