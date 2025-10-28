# Scripts

Automation scripts for Saipien Labs infrastructure and tooling.

## Available Scripts

### 📧 Email Setup (`setup-email.ts`)

Automates configuration of professional email for saipienlabs.com using Cloudflare Email Routing + Mailgun SMTP.

**What it does**:
- ✅ Creates SPF, DMARC, and DKIM DNS records in Cloudflare
- ✅ Enables Cloudflare Email Routing with forwarding rules
- ✅ Verifies Mailgun domain and creates SMTP credentials
- ✅ Idempotent - safe to run multiple times

**Quick Start**:
```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.email.example .env.email
# Edit .env.email with your API keys

# 3. Edit script to replace Gmail placeholders
# Edit DEFAULT_ROUTES in scripts/setup-email.ts

# 4. Dry run
npm run setup-email:plan

# 5. Apply changes
npm run setup-email
```

**Documentation**:
- 📖 **Full Guide**: [EMAIL_SETUP.md](./EMAIL_SETUP.md) - Complete documentation with troubleshooting
- ⚡ **Quick Start**: [EMAIL_QUICKSTART.md](./EMAIL_QUICKSTART.md) - 5-minute setup guide

**Commands**:
```bash
npm run setup-email           # Interactive mode (review changes)
npm run setup-email:plan      # Dry run (show changes without applying)

# Advanced:
npx tsx scripts/setup-email.ts --noninteractive  # Auto-apply
npx tsx scripts/setup-email.ts --force-dmarc     # Force DMARC update
```

**Environment Variables** (`.env.email`):
```bash
CF_API_TOKEN=your_cloudflare_api_token
CF_ZONE_ID=your_zone_id
MG_API_KEY=your_mailgun_api_key
ROOT_DOMAIN=saipienlabs.com
MG_SENDING_DOMAIN=mg.saipienlabs.com
```

**Features**:
- 🎯 Idempotent - won't duplicate existing records
- 🔒 Safe - validates inputs and shows plan before applying
- 📊 Clear output with color-coded status
- ⚡ Fast - uses parallel API calls where possible
- 🐛 Detailed error messages for debugging

---

## Adding New Scripts

When creating new automation scripts:

1. **Create the script**: `scripts/your-script.ts`
2. **Add to package.json**:
   ```json
   "scripts": {
     "your-script": "tsx scripts/your-script.ts"
   }
   ```
3. **Create documentation**: `scripts/YOUR_SCRIPT.md`
4. **Add environment variables**: Create `.env.your-script.example`
5. **Update .gitignore**: Ensure `.env*` is ignored
6. **Update this README**: Add entry above

### Script Template

```typescript
#!/usr/bin/env node
/**
 * Your Script Name
 *
 * Description of what this script does
 */

// Parse CLI arguments
const args = process.argv.slice(2);
const FLAGS = {
  dryRun: args.includes('--dry-run'),
  // ... other flags
};

// Validate environment
function validateEnv(): boolean {
  const required = ['SOME_API_KEY', 'SOME_CONFIG'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error(`Missing: ${missing.join(', ')}`);
    return false;
  }
  return true;
}

// Main execution
async function main() {
  if (!validateEnv()) {
    process.exit(1);
  }

  // Your script logic here
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
```

### Best Practices

- ✅ Use TypeScript for type safety
- ✅ Add `#!/usr/bin/env node` shebang
- ✅ Validate environment variables before execution
- ✅ Provide `--dry-run` flag to preview changes
- ✅ Use color-coded console output for clarity
- ✅ Include detailed error messages
- ✅ Make scripts idempotent when possible
- ✅ Add comprehensive documentation
- ✅ Never commit secrets or API keys

---

## Environment Files

All environment files are gitignored (`.env*`).

**Current environment files**:
- `.env.email` - Email setup credentials (gitignored)
- `.env.email.example` - Email setup template (committed)

**To use**:
```bash
cp .env.example .env.your-script
# Edit with your credentials
```

---

## Dependencies

All scripts use these common dependencies:

- **tsx** (^4.19.2) - TypeScript execution
- **Node.js built-ins** - No external dependencies for core functionality

To install:
```bash
npm install
```

---

## Support

For issues with scripts:

1. Check the script's documentation (MD file)
2. Verify environment variables are set correctly
3. Run with `--dry-run` or `--show-plan` flags
4. Check error messages for specific API issues
5. Create an issue in the repo with full error output

---

**Last Updated**: 2025-10-28
**Maintained By**: Saipien Labs Engineering
