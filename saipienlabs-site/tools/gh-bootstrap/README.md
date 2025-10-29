# GitHub Organization Bootstrap CLI

Automated setup tool for the **Saipien-Labs** GitHub organization with branded assets, repositories, CI/CD workflows, and security configurations.

## Features

- 🏢 **Organization Profile** — Auto-generate .github profile README with branding
- 📦 **Repository Management** — Create/update repos with consistent templates
- 🛡️ **Security Hardening** — Enable Dependabot, CodeQL, vulnerability alerts
- 🔒 **Branch Protection** — Enforce PR reviews, status checks, admin controls
- 🎨 **Branded Assets** — Generate SVG social cards and OG images
- 📝 **Templates** — README, SECURITY, CODEOWNERS, Issue/PR templates
- ⚡ **CI/CD Workflows** — GitHub Actions for lint, test, build, CodeQL
- 🔄 **Idempotent** — Safe to run multiple times, only creates/updates as needed

## Prerequisites

### GitHub Personal Access Token (PAT)

Create a token at https://github.com/settings/tokens with these scopes:

- ✅ **repo** (full control)
- ✅ **admin:org** (read and write)
- ✅ **workflow** (update workflows)
- ✅ **security_events** (code scanning)

### Environment Variables

```bash
export GH_TOKEN="ghp_your_token_here"
export GH_ORG="Saipien-Labs"
export GH_OWNER_USERNAME="cryptocrystian"
export SITE_URL="https://saipienlabs.com"
```

## Usage

### Dry Run (Recommended First)

```bash
npx tsx tools/gh-bootstrap/bootstrap.ts --dry-run
```

This shows what would be created/updated without making changes.

### Live Run

```bash
npx tsx tools/gh-bootstrap/bootstrap.ts
```

### Options

- `--dry-run` — Preview changes without applying
- `--skip-assets` — Skip SVG/PNG asset generation
- `--skip-security` — Skip security feature enablement
- `--verbose` — Show detailed error messages

## What It Does

### 1. Organization Profile

- Creates `.github` organization repo if missing
- Generates and uploads `profile/README.md` with branding
- Provides DNS TXT record for domain verification
- Instructions for enabling 2FA requirement

### 2. Repository Setup

For each repo in `config/org.json`:

**Files Created:**
- `README.md` — Branded readme with shields, features, getting started
- `LICENSE` — MIT license
- `SECURITY.md` — Security policy and vulnerability reporting
- `.github/CODEOWNERS` — Code review assignments
- `.github/ISSUE_TEMPLATE.md` — Issue template
- `.github/PULL_REQUEST_TEMPLATE.md` — PR template
- `.github/workflows/ci.yml` — Lint, test, build workflow
- `.github/workflows/codeql.yml` — Code scanning
- `.github/dependabot.yml` — Automated dependency updates

**Settings Applied:**
- Description, website, topics
- Default branch: `main`
- Vulnerability alerts enabled
- Automated security fixes enabled
- Branch protection on `main`:
  - Require 1 PR review
  - Require status checks: `build`, `test`, `codeql`
  - Dismiss stale reviews
  - Enforce for admins

**Assets Generated:**
- `/docs/og-image.png` — Social media preview (manual upload)

### 3. Repository Transfer (Optional)

If `transfer.enabled: true` in config, transfers repos from personal accounts to org.

## Configuration

Edit `config/org.json` to customize:

```json
{
  "org": {
    "name": "saipienlabs",
    "displayName": "Saipien [LABS]",
    "description": "AI-accelerated dev pods that ship production in 90 days",
    "website": "https://saipienlabs.com"
  },
  "repos": [
    {
      "name": "saipienlabs.com",
      "description": "Main website — Next.js on Cloudflare Pages",
      "website": "https://saipienlabs.com",
      "topics": ["nextjs", "typescript", "ai", "saas"]
    }
  ],
  "transfer": {
    "enabled": false,
    "repos": [
      {
        "name": "old-repo-name",
        "fromOwner": "personal-account",
        "renameAs": "new-repo-name"
      }
    ]
  }
}
```

## Manual Steps

After running the CLI, complete these manual steps:

### 1. Convert SVG Assets to PNG

Assets are generated in `tools/gh-bootstrap/assets/`:

```bash
# Using Inkscape
inkscape org-social-card.svg --export-filename=org-social-card.png

# Using CloudConvert
https://cloudconvert.com/svg-to-png

# Upload to .github/profile/social-card.png
```

### 2. Add DNS TXT Record

The CLI will print:

```
Host: _github-challenge-saipienlabs-org
Value: <token>
TTL: 3600
```

Add this to your DNS provider (Cloudflare).

### 3. Enable 2FA Requirement

Go to: https://github.com/organizations/saipienlabs/settings/security

Enable: **Require two-factor authentication for everyone**

### 4. Invite Team Members

Create teams and invite members:
- `@saipienlabs/core` — Core team
- `@saipienlabs/docs` — Documentation team

## Troubleshooting

### "GitHub API error: 403"

- Check token permissions (needs `repo`, `admin:org`, `workflow`, `security_events`)
- Token might be expired
- Org might have SSO enabled (authorize token)

### "Branch protection (requires commits first)"

- Normal for new repos with no commits
- Push at least one commit, then re-run the CLI

### "Could not route to endpoint"

- Check `GH_ORG` matches your actual org name
- Verify token has `admin:org` scope

## Architecture

```
tools/gh-bootstrap/
├── bootstrap.ts          # Main CLI entry point
├── lib/
│   ├── github.ts         # GitHub REST + GraphQL API wrapper
│   ├── assets.ts         # SVG/PNG asset generation
│   └── templates.ts      # File templates (README, workflows, etc.)
├── config/
│   └── org.json          # Organization & repo configuration
└── assets/               # Generated assets (gitignored)
```

## Development

```bash
# Type check
npx tsc --noEmit tools/gh-bootstrap/**/*.ts

# Lint
npx eslint tools/gh-bootstrap

# Run with verbose logging
npx tsx tools/gh-bootstrap/bootstrap.ts --dry-run --verbose
```

## License

MIT — see [LICENSE](../../LICENSE)

---

**Built with ❤️ by Saipien [LABS]**
