# Email Setup Automation

This script automates the configuration of professional email for `saipienlabs.com` using:
- **Cloudflare Email Routing** (free email forwarding)
- **Mailgun SMTP** (send emails from @saipienlabs.com addresses)

## What This Script Does

### 1. DNS Records (Cloudflare)
- ✅ **SPF** - Authorizes Mailgun to send on your behalf
- ✅ **DMARC** - Email authentication and reporting policy
- ✅ **DKIM** (3 CNAME records) - Email signature verification for Mailgun

### 2. Email Routing (Cloudflare)
- ✅ Enables Cloudflare Email Routing
- ✅ Creates forwarding rules:
  - `hello@saipienlabs.com` → Your Gmail
  - `founders@saipienlabs.com` → Your Gmail
  - `press@saipienlabs.com` → Your Gmail
  - `partners@saipienlabs.com` → Your Gmail
  - `billing@saipienlabs.com` → Finance Gmail
  - `support@saipienlabs.com` → Support Gmail

### 3. Mailgun SMTP
- ✅ Verifies `mg.saipienlabs.com` domain exists
- ✅ Fetches DKIM DNS records from Mailgun API
- ✅ Creates SMTP credentials if needed

## Prerequisites

### 1. Cloudflare Setup
1. Domain must be on Cloudflare (free plan works)
2. Create an API Token: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use "Edit zone DNS" template
   - Add additional permissions:
     - Zone → Email Routing Address → Edit
     - Zone → Email Routing Rules → Edit
   - Zone Resources: Include → Specific zone → saipienlabs.com
   - Copy the token (you won't see it again!)

3. Get your Zone ID:
   - Go to https://dash.cloudflare.com/
   - Select `saipienlabs.com`
   - Right sidebar → Zone ID (copy it)

### 2. Mailgun Setup
1. Sign up at https://www.mailgun.com/ (free tier: 5,000 emails/month for 3 months)
2. Add domain `mg.saipienlabs.com`:
   - Go to: https://app.mailgun.com/app/sending/domains/new
   - Enter: `mg.saipienlabs.com`
   - Region: US or EU (remember for MG_BASE)
   - Click "Add Domain"

3. Get your API Key:
   - Go to: https://app.mailgun.com/settings/api_security
   - Copy "Private API key"

### 3. Edit Script Configuration

**IMPORTANT**: Before running, edit `scripts/setup-email.ts` and replace the placeholder Gmail addresses:

```typescript
const DEFAULT_ROUTES = [
  { address: "hello@saipienlabs.com", destination: "YOUR_PRIMARY_GMAIL@gmail.com" },  // ← EDIT THIS
  { address: "founders@saipienlabs.com", destination: "YOUR_PRIMARY_GMAIL@gmail.com" },  // ← EDIT THIS
  { address: "press@saipienlabs.com", destination: "YOUR_PRIMARY_GMAIL@gmail.com" },
  { address: "partners@saipienlabs.com", destination: "YOUR_PRIMARY_GMAIL@gmail.com" },
  { address: "billing@saipienlabs.com", destination: "YOUR_FINANCE_GMAIL@gmail.com" },  // ← EDIT THIS
  { address: "support@saipienlabs.com", destination: "YOUR_SUPPORT_GMAIL@gmail.com" },  // ← EDIT THIS
];
```

## Installation

1. **Copy environment template**:
   ```bash
   cp .env.email.example .env.email
   ```

2. **Fill in your credentials** in `.env.email`:
   ```bash
   CF_API_TOKEN=your_cloudflare_api_token
   CF_ZONE_ID=your_zone_id
   ROOT_DOMAIN=saipienlabs.com
   MG_API_KEY=your_mailgun_api_key
   MG_SENDING_DOMAIN=mg.saipienlabs.com
   ```

3. **Install dependencies** (if not already installed):
   ```bash
   npm install tsx --save-dev
   ```

## Usage

### Dry Run (Recommended First)
See what changes will be made without applying them:

```bash
npx tsx scripts/setup-email.ts --show-plan
```

### Interactive Mode
Review changes and confirm before applying:

```bash
npx tsx scripts/setup-email.ts
```

### Non-Interactive Mode
Apply all changes without prompts (for automation/CI):

```bash
npx tsx scripts/setup-email.ts --noninteractive
```

Or:

```bash
RUN_NONINTERACTIVE=true npx tsx scripts/setup-email.ts
```

### Force Update DMARC
Overwrite existing DMARC record:

```bash
npx tsx scripts/setup-email.ts --force-dmarc
```

## Expected Output

```
═══════════════════════════════════════════════════════════════
  Cloudflare Email Routing + Mailgun SMTP Setup
═══════════════════════════════════════════════════════════════

📋 Configuration:
   Domain: saipienlabs.com
   Mailgun Sending Domain: mg.saipienlabs.com
   Cloudflare Zone ID: abc123...
   Mode: INTERACTIVE

🔍 Analyzing current configuration...

1️⃣  Mailgun Domain Verification
  → [Mailgun] Domain mg.saipienlabs.com verified

2️⃣  DNS Records
  ✓ [DNS] SPF record at saipienlabs.com: "v=spf1 include:mailgun.org ~all"
  ✓ [DNS] DMARC record at _dmarc.saipienlabs.com: "v=DMARC1; p=none; ..."
  ✓ [DNS] DKIM CNAME krs._domainkey.mg.saipienlabs.com → krs.domainkey...
  ✓ [DNS] DKIM CNAME l3s._domainkey.mg.saipienlabs.com → l3s.domainkey...
  ✓ [DNS] DKIM CNAME mxs._domainkey.mg.saipienlabs.com → mxs.domainkey...

3️⃣  Email Routing
  ✓ [Email Routing] Enable Email Routing
  ✓ [Email Routing] Route hello@saipienlabs.com → your@gmail.com
  ✓ [Email Routing] Route founders@saipienlabs.com → your@gmail.com
  ...

4️⃣  SMTP Credentials
  ✓ [Mailgun] SMTP credential for postmaster@mg.saipienlabs.com

═══════════════════════════════════════════════════════════════
  SUMMARY OF CHANGES
═══════════════════════════════════════════════════════════════

  ✓ [DNS] SPF record at saipienlabs.com
  ✓ [DNS] DMARC record at _dmarc.saipienlabs.com
  ✓ [DNS] DKIM CNAME krs._domainkey.mg.saipienlabs.com
  ...

📊 Total: 12 creates, 0 updates, 2 skipped

Apply these changes? (y/N): y

🚀 Applying changes...

✅ All changes applied successfully!

═══════════════════════════════════════════════════════════════
  🔐 NEW SMTP CREDENTIALS CREATED
═══════════════════════════════════════════════════════════════

  Username: postmaster@mg.saipienlabs.com
  Password: Xk9mP4zL2nQ8vR6tY3wE5h

  ⚠ SAVE THESE CREDENTIALS NOW - Password will not be shown again!
```

## Next Steps After Running Script

### 1. Configure Gmail "Send mail as"

For each email address you want to send from:

1. **Open Gmail Settings**:
   - Click gear icon → "See all settings"
   - Go to "Accounts and Import" tab
   - Find "Send mail as" section
   - Click "Add another email address"

2. **Fill in details**:
   - **Name**: `Saipien Labs` (or your preferred sender name)
   - **Email**: `hello@saipienlabs.com`
   - ✅ Check "Treat as an alias"
   - Click "Next Step"

3. **Configure SMTP**:
   - **SMTP Server**: `smtp.mailgun.org`
   - **Port**: `587`
   - **Username**: `postmaster@mg.saipienlabs.com` (from script output)
   - **Password**: (from script output or Mailgun dashboard)
   - ✅ Check "Secured connection using TLS"
   - Click "Add Account"

4. **Verify the address**:
   - Gmail sends a verification code to `hello@saipienlabs.com`
   - Cloudflare Email Routing forwards it to your Gmail
   - Check your inbox for the verification email
   - Click the link or enter the code
   - ✅ Done!

5. **Set as default** (optional):
   - In Gmail settings → "Send mail as"
   - Find `hello@saipienlabs.com`
   - Click "make default"

### 2. Test Your Setup

1. **Send a test email**:
   - Compose new email in Gmail
   - In "From" dropdown, select `hello@saipienlabs.com`
   - Send to yourself

2. **Check deliverability**:
   - Visit https://www.mail-tester.com
   - Send an email to the address they provide
   - Check your score (aim for 10/10)
   - Verify SPF, DKIM, DMARC all pass ✅

3. **Check email headers**:
   - Open the test email
   - Click "Show original" (three dots menu)
   - Verify:
     - `SPF: PASS`
     - `DKIM: PASS`
     - `DMARC: PASS`

### 3. Monitor and Tighten DMARC

The script sets DMARC to `p=none` (monitoring only):

```
v=DMARC1; p=none; rua=mailto:dmarc@saipienlabs.com; pct=100; fo=1
```

**Recommended progression**:

1. **Week 1-2**: Monitor with `p=none`
   - Check DMARC reports at `dmarc@saipienlabs.com`
   - Verify all legitimate emails pass SPF/DKIM
   - Identify any issues

2. **Week 3-4**: Upgrade to `p=quarantine`
   ```
   v=DMARC1; p=quarantine; rua=mailto:dmarc@saipienlabs.com; pct=100; fo=1
   ```
   - Failed emails go to spam
   - Continue monitoring reports

3. **Week 5+**: Upgrade to `p=reject`
   ```
   v=DMARC1; p=reject; rua=mailto:dmarc@saipienlabs.com; pct=100; fo=1
   ```
   - Failed emails are rejected entirely
   - Maximum protection against spoofing

**To update DMARC**, either:
- Re-run script with `--force-dmarc` flag
- Or manually update in Cloudflare DNS dashboard

### 4. Repeat for Other Addresses

Repeat the "Send mail as" setup for:
- `founders@saipienlabs.com`
- `press@saipienlabs.com`
- `partners@saipienlabs.com`
- `billing@saipienlabs.com`
- `support@saipienlabs.com`

All use the same SMTP credentials!

## Troubleshooting

### "Domain not found" Error
- Verify you created `mg.saipienlabs.com` in Mailgun dashboard
- Check MG_SENDING_DOMAIN matches exactly
- Ensure MG_API_KEY is correct

### "Unauthorized" Error (Cloudflare)
- Verify CF_API_TOKEN has correct permissions:
  - Zone → DNS → Edit
  - Zone → Email Routing Address → Edit
  - Zone → Email Routing Rules → Edit
- Check CF_ZONE_ID is correct for saipienlabs.com

### "Unauthorized" Error (Mailgun)
- Verify MG_API_KEY is the **Private API key**, not public
- Check you're using correct region (US vs EU)
- If EU: set `MG_BASE=https://api.eu.mailgun.net`

### Email Not Forwarding
- Check Cloudflare Email Routing is enabled:
  - Cloudflare Dashboard → Email → Email Routing
  - Should show "Enabled"
- Verify destination email is verified in Cloudflare
- Check routing rules exist and are enabled

### DKIM Not Passing
- Wait 10-15 minutes for DNS propagation
- Verify CNAME records exist in Cloudflare DNS
- Check records are NOT proxied (cloud icon should be gray)
- Use DNS checker: https://mxtoolbox.com/dkim.aspx

### SPF Too Many Lookups
If you already have many SPF includes, you may hit the 10 lookup limit.

**Solution**: Use SPF flattening or create a new SPF record:
```
v=spf1 include:_spf.google.com include:mailgun.org ~all
```

### Gmail Verification Email Not Received
- Check spam folder
- Verify Cloudflare Email Routing is enabled
- Check routing rule exists for the address
- Verify destination Gmail is correct
- Wait 5-10 minutes and try again

## Advanced Configuration

### Custom Routes via Environment Variable

Instead of editing the script, provide routes via env var:

```bash
export ROUTES_JSON='[
  {"address":"hello@saipienlabs.com","destination":"founder@gmail.com"},
  {"address":"support@saipienlabs.com","destination":"support@gmail.com"}
]'

npx tsx scripts/setup-email.ts
```

### Using Different DKIM Records

If you need custom DKIM records (not from Mailgun API):

Edit `DKIM_CNAME_FALLBACKS` in the script:

```typescript
const DKIM_CNAME_FALLBACKS = [
  { name: "krs._domainkey.mg", content: "krs.domainkey.mg.saipienlabs.com.mailgun.org" },
  { name: "l3s._domainkey.mg", content: "l3s.domainkey.mg.saipienlabs.com.mailgun.org" },
  { name: "mxs._domainkey.mg", content: "mxs.domainkey.mg.saipienlabs.com.mailgun.org" },
];
```

Get actual values from Mailgun:
- Dashboard → Sending → Domains → mg.saipienlabs.com
- Copy DNS records shown

### Multiple Sending Domains

To add another sending domain (e.g., `newsletter.saipienlabs.com`):

1. Create domain in Mailgun
2. Update env vars:
   ```bash
   MG_SENDING_DOMAIN=newsletter.saipienlabs.com
   ```
3. Run script again
4. Script is idempotent - won't duplicate existing records

## Mailgun Free Tier Limits

- **5,000 emails/month** for first 3 months
- Then **1,000 emails/month** forever (Foundation plan)
- After 3 months, upgrade to Flex plan ($35/mo base + usage)

**Usage tips**:
- Transactional emails only (not marketing)
- Use for important notifications, alerts, replies
- For newsletters, use Mailchimp, ConvertKit, etc.

## Security Best Practices

1. **Never commit credentials**:
   - `.env.email` is gitignored
   - Never commit API tokens to git

2. **Rotate API tokens regularly**:
   - Cloudflare: Regenerate tokens every 90 days
   - Mailgun: Rotate API keys quarterly

3. **Use least privilege**:
   - Cloudflare token: Only DNS + Email Routing permissions
   - Don't use Global API Key

4. **Monitor DMARC reports**:
   - Check `dmarc@saipienlabs.com` weekly
   - Investigate any failures
   - Look for spoofing attempts

5. **Enable 2FA**:
   - Cloudflare account
   - Mailgun account
   - Gmail account

## Cost Breakdown

| Service | Plan | Cost | Notes |
|---------|------|------|-------|
| Cloudflare | Free | $0/mo | Email Routing is free |
| Mailgun | Foundation | $0/mo | 1,000 emails/month after trial |
| Mailgun | Flex | ~$35-50/mo | After free tier, usage-based |

**Total**: $0-50/month depending on email volume

## References

- [Cloudflare Email Routing Docs](https://developers.cloudflare.com/email-routing/)
- [Mailgun Documentation](https://documentation.mailgun.com/)
- [SPF Record Syntax](https://www.rfc-editor.org/rfc/rfc7208.html)
- [DMARC Best Practices](https://dmarc.org/overview/)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)

## Support

If you encounter issues:

1. Check this README's Troubleshooting section
2. Review script output for specific error messages
3. Check Cloudflare and Mailgun dashboards for status
4. Create an issue in the repo with:
   - Full error message
   - Script output (redact sensitive info)
   - What you've already tried

---

**Last Updated**: 2025-10-28
**Script Version**: 1.0.0
**Maintained By**: Saipien Labs Engineering
