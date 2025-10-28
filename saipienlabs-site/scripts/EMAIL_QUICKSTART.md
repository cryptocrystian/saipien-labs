# Email Setup - Quick Start Guide

⚡ **5-Minute Setup** for professional email at saipienlabs.com

## Prerequisites Checklist

- [ ] Domain on Cloudflare (saipienlabs.com)
- [ ] Cloudflare API token with DNS + Email Routing permissions
- [ ] Mailgun account with mg.saipienlabs.com domain created
- [ ] Mailgun API key

## Step 1: Get Credentials (5 min)

### Cloudflare API Token
1. Visit: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token" → "Edit zone DNS" template
3. Add permissions:
   - Zone → Email Routing Address → Edit
   - Zone → Email Routing Rules → Edit
4. Zone: saipienlabs.com
5. Copy token → Save securely

### Cloudflare Zone ID
1. Visit: https://dash.cloudflare.com/
2. Select `saipienlabs.com`
3. Right sidebar → Copy "Zone ID"

### Mailgun Setup
1. Visit: https://app.mailgun.com/app/sending/domains/new
2. Add domain: `mg.saipienlabs.com`
3. Region: US (or EU if preferred)
4. Go to: https://app.mailgun.com/settings/api_security
5. Copy "Private API key"

## Step 2: Configure Script (2 min)

```bash
# 1. Copy environment template
cp .env.email.example .env.email

# 2. Edit .env.email with your credentials
nano .env.email
```

Fill in:
```bash
CF_API_TOKEN=your_cloudflare_token_here
CF_ZONE_ID=your_zone_id_here
MG_API_KEY=your_mailgun_api_key_here
```

**IMPORTANT**: Edit `scripts/setup-email.ts` and replace Gmail placeholders:

```typescript
// Line ~25 - Replace these with your actual Gmail addresses:
const DEFAULT_ROUTES = [
  { address: "hello@saipienlabs.com", destination: "your.email@gmail.com" },
  { address: "founders@saipienlabs.com", destination: "your.email@gmail.com" },
  { address: "press@saipienlabs.com", destination: "your.email@gmail.com" },
  { address: "partners@saipienlabs.com", destination: "your.email@gmail.com" },
  { address: "billing@saipienlabs.com", destination: "finance@gmail.com" },
  { address: "support@saipienlabs.com", destination: "support@gmail.com" },
];
```

## Step 3: Install Dependencies (1 min)

```bash
npm install
```

## Step 4: Run Script (2 min)

### Dry run first (recommended):
```bash
npm run setup-email:plan
```

### Apply changes:
```bash
npm run setup-email
```

Review the changes and type `y` to confirm.

## Step 5: Configure Gmail (3 min per address)

### For hello@saipienlabs.com:

1. **Open Gmail** → Settings (gear icon) → "See all settings"

2. **Accounts and Import** tab → "Send mail as" → **Add another email address**

3. **Enter details**:
   - Name: `Saipien Labs`
   - Email: `hello@saipienlabs.com`
   - ✅ Treat as an alias
   - Click "Next"

4. **SMTP settings**:
   - SMTP Server: `smtp.mailgun.org`
   - Port: `587`
   - Username: `postmaster@mg.saipienlabs.com`
   - Password: *(from script output)*
   - ✅ TLS encryption
   - Click "Add Account"

5. **Verify**:
   - Check your Gmail inbox for verification email
   - Click verification link
   - ✅ Done!

### Repeat for other addresses:
- founders@saipienlabs.com
- press@saipienlabs.com
- partners@saipienlabs.com
- billing@saipienlabs.com
- support@saipienlabs.com

*(All use the same SMTP credentials!)*

## Step 6: Test (2 min)

1. **Send test email**:
   - Gmail → Compose
   - From: hello@saipienlabs.com
   - To: your.email@gmail.com
   - Subject: "Test"
   - Send

2. **Check deliverability**:
   - Visit: https://www.mail-tester.com
   - Copy the test address
   - Send email from hello@saipienlabs.com
   - Check score (aim for 10/10)

3. **Verify headers**:
   - Open test email → "Show original"
   - Confirm:
     - ✅ SPF: PASS
     - ✅ DKIM: PASS
     - ✅ DMARC: PASS

## What the Script Created

### DNS Records (Cloudflare)
- ✅ SPF: `v=spf1 include:mailgun.org ~all`
- ✅ DMARC: `v=DMARC1; p=none; ...`
- ✅ DKIM: 3 CNAME records for Mailgun

### Email Routing (Cloudflare)
- ✅ Email Routing enabled
- ✅ 6 forwarding rules created
- ✅ All @saipienlabs.com emails route to your Gmail

### Mailgun
- ✅ Domain verified
- ✅ SMTP credentials created

## Troubleshooting

### Verification email not received
- Check spam folder
- Wait 5-10 minutes
- Verify routing rule exists in Cloudflare
- Check destination Gmail is correct

### SMTP authentication failed
- Double-check username: `postmaster@mg.saipienlabs.com`
- Verify password from script output
- Try regenerating credentials in Mailgun

### DKIM not passing
- Wait 15 minutes for DNS propagation
- Verify CNAME records in Cloudflare DNS
- Records should NOT be proxied (gray cloud)

### Script errors
See full documentation: `scripts/EMAIL_SETUP.md`

## Next Steps

### 1. Set Default Sender
In Gmail → Settings → "Send mail as":
- Find `hello@saipienlabs.com`
- Click "make default"

### 2. Monitor DMARC
- Check `dmarc@saipienlabs.com` weekly
- After 2 weeks, upgrade to `p=quarantine`
- After 4 weeks, upgrade to `p=reject`

### 3. Add to Signature
Update your Gmail signature to use saipienlabs.com email

### 4. Test All Addresses
Send test emails from each configured address

## Commands Reference

```bash
# Dry run (see changes without applying)
npm run setup-email:plan

# Interactive (review and confirm)
npm run setup-email

# Non-interactive (auto-apply)
npx tsx scripts/setup-email.ts --noninteractive

# Force DMARC update
npx tsx scripts/setup-email.ts --force-dmarc
```

## Cost

- **Cloudflare Email Routing**: FREE ✅
- **Mailgun**:
  - First 3 months: 5,000 emails/month FREE
  - After: 1,000 emails/month FREE (Foundation)
  - Paid: $35+/mo (Flex plan)

## Support

Full documentation: `scripts/EMAIL_SETUP.md`

---

**Total Setup Time**: ~15-20 minutes
**Difficulty**: Easy
**Prerequisites**: Gmail, Cloudflare, Mailgun accounts
