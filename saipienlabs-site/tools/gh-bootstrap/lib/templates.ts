/**
 * GitHub file templates for organization repos
 * README, SECURITY, CODEOWNERS, Issues, PRs, Actions
 */

export interface RepoMeta {
  name: string;
  description: string;
  website: string;
}

/**
 * Generate README.md for a repository
 */
export function generateREADME(meta: RepoMeta): string {
  const shields = [
    `![Build](https://img.shields.io/github/actions/workflow/status/saipienlabs/${meta.name}/ci.yml?branch=main&style=flat-square)`,
    `![License](https://img.shields.io/github/license/saipienlabs/${meta.name}?style=flat-square)`,
    `![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square)`,
  ].join(' ');

  return `# ${meta.name}

${shields}

<p align="center">
  <img src="./docs/og-image.png" alt="${meta.name}" width="100%">
</p>

## Overview

${meta.description}

Built by [Saipien [LABS]](${meta.website}) — AI-accelerated dev pods that ship production in 90 days.

## Features

- 🚀 **Production-Ready** — Enterprise discipline, security controls, and budget guardrails
- 🔗 **Integration-First** — Plug into your existing CRM, ERP, support desk, and data warehouse
- 🛡️ **Governed from Day One** — Logging, eval loops, rollback plans, and spend caps baked in

## Getting Started

\`\`\`bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
\`\`\`

## Documentation

See [/docs](./docs) for detailed documentation.

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

Before submitting a PR:
- Run \`pnpm lint\` and \`pnpm test\`
- Follow our [Code of Conduct](./CODE_OF_CONDUCT.md)
- Sign the [CLA](./CLA.md) (if required)

## Security

Security is our top priority. See [SECURITY.md](./SECURITY.md) for reporting vulnerabilities.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Support

- 📧 Email: [hello@saipienlabs.com](mailto:hello@saipienlabs.com)
- 💬 Discussions: [GitHub Discussions](https://github.com/saipienlabs/${meta.name}/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/saipienlabs/${meta.name}/issues)

---

<p align="center">
  Built with ❤️ by <a href="${meta.website}">Saipien [LABS]</a>
</p>
`;
}

/**
 * Generate SECURITY.md
 */
export function generateSECURITY(repoName: string): string {
  return `# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to [security@saipienlabs.com](mailto:security@saipienlabs.com).

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the following information (as much as you can provide) to help us better understand the nature and scope of the possible issue:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

## Preferred Languages

We prefer all communications to be in English.

## Security Update Policy

When we learn of a critical security issue, we will:

1. Confirm the vulnerability and determine affected versions
2. Audit code to find similar problems
3. Prepare fixes for all supported releases
4. Release patched versions and notify users

## Bug Bounty Program

We do not currently offer a bug bounty program. However, we greatly appreciate the security research community's efforts in helping us keep ${repoName} secure.

## Security-Related Configuration

For production deployments, please ensure:

- All secrets are stored in environment variables, never committed to code
- Rate limiting is enabled for all public APIs
- HTTPS/TLS is enforced for all connections
- Regular dependency updates via Dependabot
- CodeQL scanning is enabled (automatic on this repo)

## Contact

For general security questions not related to vulnerabilities, contact [hello@saipienlabs.com](mailto:hello@saipienlabs.com).
`;
}

/**
 * Generate CODEOWNERS
 */
export function generateCODEOWNERS(owner: string): string {
  return `# CODEOWNERS
# These owners will be the default owners for everything in the repo.
# Unless a later match takes precedence, these users will be requested
# for review when someone opens a pull request.

* @${owner} @saipienlabs/core

# Workflows and CI/CD
/.github/ @${owner}

# Security-sensitive files
/SECURITY.md @${owner}
/.github/workflows/codeql.yml @${owner}
/.github/dependabot.yml @${owner}

# Documentation
/docs/ @saipienlabs/docs
/*.md @saipienlabs/docs
`;
}

/**
 * Generate Issue Template
 */
export function generateISSUE_TEMPLATE(): string {
  return `---
name: Bug Report or Feature Request
about: Report a bug or request a feature
title: ''
labels: ''
assignees: ''
---

## Type
<!-- Mark one with 'x' -->
- [ ] Bug Report
- [ ] Feature Request
- [ ] Question
- [ ] Documentation

## Description
<!-- A clear and concise description of the issue or feature -->


## Steps to Reproduce (for bugs)
<!-- Provide detailed steps to reproduce the behavior -->

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
<!-- What you expected to happen -->


## Actual Behavior
<!-- What actually happened -->


## Screenshots
<!-- If applicable, add screenshots to help explain your problem -->


## Environment
<!-- Please complete the following information -->

- OS: [e.g., macOS, Windows, Linux]
- Node Version: [e.g., 18.17.0]
- Package Version: [e.g., 1.2.3]

## Additional Context
<!-- Add any other context about the problem here -->


## Possible Solution
<!-- Optional: suggest a fix or reason for the bug -->

`;
}

/**
 * Generate PR Template
 */
export function generatePR_TEMPLATE(): string {
  return `## Description
<!-- Describe your changes in detail -->


## Type of Change
<!-- Mark relevant options with 'x' -->

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
<!-- Describe the tests you ran to verify your changes -->

- [ ] Unit tests pass locally
- [ ] Integration tests pass locally
- [ ] Manual testing completed
- [ ] No console errors or warnings

## Checklist
<!-- Mark completed items with 'x' -->

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)
<!-- Add screenshots to help explain your changes -->


## Additional Notes
<!-- Any additional information that reviewers should know -->

`;
}

/**
 * Generate CI Workflow
 */
export function generateCI_WORKFLOW(repoName: string): string {
  return `name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run tests
        run: pnpm test

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-\${{ github.sha }}
          path: |
            dist
            .next
            out
          retention-days: 7
`;
}

/**
 * Generate CodeQL Workflow
 */
export function generateCODEQL_WORKFLOW(): string {
  return `name: "CodeQL"

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 6 * * 1'

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write

    strategy:
      fail-fast: false
      matrix:
        language: ['javascript', 'typescript']

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: \${{ matrix.language }}
          queries: +security-and-quality

      - name: Autobuild
        uses: github/codeql-action/autobuild@v2

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2
        with:
          category: "/language:\${{ matrix.language }}"
`;
}

/**
 * Generate Dependabot config
 */
export function generateDEPENDABOT(): string {
  return `version: 2
updates:
  # Enable version updates for npm
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "06:00"
    open-pull-requests-limit: 10
    reviewers:
      - "saipienlabs/core"
    labels:
      - "dependencies"
      - "automated"
    commit-message:
      prefix: "chore"
      include: "scope"

  # Enable version updates for GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "06:00"
    open-pull-requests-limit: 5
    reviewers:
      - "saipienlabs/core"
    labels:
      - "dependencies"
      - "github-actions"
    commit-message:
      prefix: "ci"
`;
}

/**
 * Generate MIT License
 */
export function generateLICENSE(): string {
  const year = new Date().getFullYear();
  return `MIT License

Copyright (c) ${year} Saipien Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
}

/**
 * Generate Organization Profile README
 */
export function generateORG_PROFILE_README(siteUrl: string): string {
  return `# Saipien [LABS]

<p align="center">
  <img src="./profile/social-card.png" alt="Saipien Labs" width="100%">
</p>

## Build real software, really fast.

AI-accelerated dev pods that ship production in 90 days — with enterprise discipline, security controls, and budget guardrails.

### 🚀 What We Do

- **90-Day MVPs** — Fixed-scope production candidates delivered in 12-week sprints
- **Integration-First** — Wire AI into your existing CRM, ERP, support desk, data warehouse
- **Governed from Day One** — Logging, eval loops, rollback plans, spend caps baked in

### 💡 How We Work

Saipien [LABS] is a senior, AI-accelerated development pod. We audit workflows, map high-leverage automation, and then build, integrate, harden, and hand off production systems.

No junior waterfall team. No 8-week discovery theater. You work directly with people who ship.

### 🛠️ Tech Stack

\`\`\`
TypeScript • Next.js • React • Tailwind • Supabase
OpenAI • Anthropic • LangChain • Vercel AI SDK
Cloudflare • GitHub Actions • CodeQL • Dependabot
\`\`\`

### 📦 Open Source Projects

| Project | Description |
|---------|-------------|
| [saipienlabs.com](https://github.com/saipienlabs/saipienlabs.com) | Main website (Next.js / Cloudflare) |
| [pravado](https://github.com/saipienlabs/pravado) | Revenue Ops automation |
| [aivery](https://github.com/saipienlabs/aivery) | AI workflow engine for support |
| [wellstead](https://github.com/saipienlabs/wellstead) | Intake & triage automation |
| [saipien-templates](https://github.com/saipienlabs/saipien-templates) | Starter kits |
| [spec-kit](https://github.com/saipienlabs/spec-kit) | Dev automations |

### 🤝 Work With Us

- **[Book Feasibility Readout](${siteUrl}#contact)** — Free 90-min assessment + roadmap
- **[See 90-Day MVP Plan](${siteUrl}/mvp-plan)** — Our execution framework
- **[Partnerships](${siteUrl}/founder-partnership)** — Equity + advisory for founders

### 📬 Get in Touch

- 🌐 Website: [${siteUrl}](${siteUrl})
- 📧 Email: [hello@saipienlabs.com](mailto:hello@saipienlabs.com)
- 💼 LinkedIn: [/company/saipien-labs](https://linkedin.com/company/saipien-labs)
- 𝕏 Twitter: [@SaipienLabs](https://twitter.com/SaipienLabs)

---

<p align="center">
  <strong>© ${new Date().getFullYear()} Saipien Labs</strong><br>
  AI-accelerated dev pods • Integration-first • Governed
</p>
`;
}
