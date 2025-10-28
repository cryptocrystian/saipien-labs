#!/usr/bin/env node
/**
 * Cloudflare Email Routing + Mailgun SMTP Configuration Script
 *
 * Automates:
 * - SPF, DMARC, and Mailgun DKIM records in Cloudflare DNS
 * - Cloudflare Email Routing setup with forwarding rules
 * - Mailgun domain verification and SMTP credential creation
 *
 * Usage:
 *   npx tsx scripts/setup-email.ts --show-plan    # Dry run
 *   npx tsx scripts/setup-email.ts --noninteractive # Apply without confirmation
 *   npx tsx scripts/setup-email.ts                 # Interactive mode
 */

import { createInterface } from 'readline';

// ============================================================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================================================

const DEFAULT_ROUTES = [
  { address: "hello@saipienlabs.com", destination: "YOUR_PRIMARY_GMAIL@gmail.com" },
  { address: "founders@saipienlabs.com", destination: "YOUR_PRIMARY_GMAIL@gmail.com" },
  { address: "press@saipienlabs.com", destination: "YOUR_PRIMARY_GMAIL@gmail.com" },
  { address: "partners@saipienlabs.com", destination: "YOUR_PRIMARY_GMAIL@gmail.com" },
  { address: "billing@saipienlabs.com", destination: "YOUR_FINANCE_GMAIL@gmail.com" },
  { address: "support@saipienlabs.com", destination: "YOUR_SUPPORT_GMAIL@gmail.com" },
];

// Fallback DKIM CNAMEs if Mailgun API doesn't return them
// Paste these from Mailgun UI > Sending > Domains > mg.saipienlabs.com > DNS Records
const DKIM_CNAME_FALLBACKS = [
  { name: "krs._domainkey.mg", content: "krs.domainkey.mg.saipienlabs.com.mailgun.org" },
  { name: "l3s._domainkey.mg", content: "l3s.domainkey.mg.saipienlabs.com.mailgun.org" },
  { name: "mxs._domainkey.mg", content: "mxs.domainkey.mg.saipienlabs.com.mailgun.org" },
];

// ============================================================================
// ENVIRONMENT VARIABLES
// ============================================================================

const ENV = {
  CF_API_TOKEN: process.env.CF_API_TOKEN || '',
  CF_ZONE_ID: process.env.CF_ZONE_ID || '',
  CF_ACCOUNT_ID: process.env.CF_ACCOUNT_ID || '',
  ROOT_DOMAIN: process.env.ROOT_DOMAIN || 'saipienlabs.com',
  MG_API_KEY: process.env.MG_API_KEY || '',
  MG_BASE: process.env.MG_BASE || 'https://api.mailgun.net',
  MG_SENDING_DOMAIN: process.env.MG_SENDING_DOMAIN || 'mg.saipienlabs.com',
  ROUTES_JSON: process.env.ROUTES_JSON || '',
};

// ============================================================================
// CLI FLAGS
// ============================================================================

const args = process.argv.slice(2);
const FLAGS = {
  showPlan: args.includes('--show-plan'),
  nonInteractive: args.includes('--noninteractive') || process.env.RUN_NONINTERACTIVE === 'true',
  forceDmarc: args.includes('--force-dmarc'),
};

// ============================================================================
// TYPES
// ============================================================================

interface CloudflareDNSRecord {
  id?: string;
  type: string;
  name: string;
  content: string;
  ttl: number;
  proxied: boolean;
}

interface EmailRoute {
  address: string;
  destination: string;
}

interface CloudflareEmailRule {
  id?: string;
  enabled: boolean;
  name: string;
  matchers: Array<{ type: string; field: string; value: string }>;
  actions: Array<{ type: string; value: string[] }>;
}

interface MailgunDKIMRecord {
  name: string;
  content: string;
}

interface Change {
  type: 'create' | 'update' | 'skip';
  category: 'DNS' | 'Email Routing' | 'Mailgun';
  description: string;
}

// ============================================================================
// UTILITIES
// ============================================================================

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logChange(change: Change) {
  const symbols = {
    create: '✓',
    update: '↻',
    skip: '→',
  };
  const symbolColors: Record<Change['type'], keyof typeof colors> = {
    create: 'green',
    update: 'yellow',
    skip: 'gray',
  };

  const symbol = symbols[change.type];
  const color = symbolColors[change.type];

  log(`  ${symbol} [${change.category}] ${change.description}`, color);
}

function validateEnv(): boolean {
  const required = ['CF_API_TOKEN', 'CF_ZONE_ID', 'ROOT_DOMAIN', 'MG_API_KEY', 'MG_SENDING_DOMAIN'];
  const missing = required.filter(key => !ENV[key as keyof typeof ENV]);

  if (missing.length > 0) {
    log(`❌ Missing required environment variables: ${missing.join(', ')}`, 'red');
    log('\nRequired environment variables:', 'cyan');
    log('  CF_API_TOKEN       - Cloudflare API Token (DNS:Edit, Zone:Read, Email Routing:Edit)', 'gray');
    log('  CF_ZONE_ID         - Cloudflare Zone ID for saipienlabs.com', 'gray');
    log('  ROOT_DOMAIN        - Root domain (default: saipienlabs.com)', 'gray');
    log('  MG_API_KEY         - Mailgun API key', 'gray');
    log('  MG_SENDING_DOMAIN  - Mailgun sending domain (default: mg.saipienlabs.com)', 'gray');
    log('\nOptional:', 'cyan');
    log('  CF_ACCOUNT_ID      - Cloudflare Account ID', 'gray');
    log('  MG_BASE            - Mailgun API base (default: https://api.mailgun.net)', 'gray');
    log('  ROUTES_JSON        - JSON array of email routes', 'gray');
    return false;
  }

  return true;
}

async function confirm(question: string): Promise<boolean> {
  if (FLAGS.nonInteractive) return true;

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// ============================================================================
// HTTP CLIENT
// ============================================================================

async function httpRequest<T = any>(
  url: string,
  options: RequestInit & { json?: any } = {}
): Promise<T> {
  const { json, ...fetchOptions } = options;

  if (json) {
    fetchOptions.body = JSON.stringify(json);
    fetchOptions.headers = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };
  }

  try {
    const response = await fetch(url, fetchOptions);
    const text = await response.text();

    let data: any;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status} ${response.statusText} for ${options.method || 'GET'} ${url}\n` +
        `Response: ${JSON.stringify(data, null, 2)}`
      );
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Request failed: ${error.message}`);
    }
    throw error;
  }
}

// ============================================================================
// CLOUDFLARE API
// ============================================================================

namespace Cloudflare {
  const BASE = 'https://api.cloudflare.com/client/v4';

  function headers() {
    return {
      Authorization: `Bearer ${ENV.CF_API_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  export async function listDNSRecords(type?: string, name?: string): Promise<CloudflareDNSRecord[]> {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (name) params.set('name', name);

    const url = `${BASE}/zones/${ENV.CF_ZONE_ID}/dns_records?${params}`;
    const response = await httpRequest<{ result: CloudflareDNSRecord[] }>(url, {
      headers: headers(),
    });

    return response.result || [];
  }

  export async function createDNSRecord(record: CloudflareDNSRecord): Promise<CloudflareDNSRecord> {
    const url = `${BASE}/zones/${ENV.CF_ZONE_ID}/dns_records`;
    const response = await httpRequest<{ result: CloudflareDNSRecord }>(url, {
      method: 'POST',
      headers: headers(),
      json: record,
    });

    return response.result;
  }

  export async function updateDNSRecord(id: string, record: Partial<CloudflareDNSRecord>): Promise<CloudflareDNSRecord> {
    const url = `${BASE}/zones/${ENV.CF_ZONE_ID}/dns_records/${id}`;
    const response = await httpRequest<{ result: CloudflareDNSRecord }>(url, {
      method: 'PATCH',
      headers: headers(),
      json: record,
    });

    return response.result;
  }

  export async function getEmailRoutingSettings(): Promise<any> {
    const url = `${BASE}/zones/${ENV.CF_ZONE_ID}/email/routing`;
    const response = await httpRequest<{ result: any }>(url, {
      headers: headers(),
    });

    return response.result;
  }

  export async function enableEmailRouting(): Promise<any> {
    const url = `${BASE}/zones/${ENV.CF_ZONE_ID}/email/routing/enable`;
    const response = await httpRequest<{ result: any }>(url, {
      method: 'POST',
      headers: headers(),
      json: {},
    });

    return response.result;
  }

  export async function listEmailRoutingRules(): Promise<CloudflareEmailRule[]> {
    const url = `${BASE}/zones/${ENV.CF_ZONE_ID}/email/routing/rules`;
    const response = await httpRequest<{ result: CloudflareEmailRule[] }>(url, {
      headers: headers(),
    });

    return response.result || [];
  }

  export async function createEmailRoutingRule(rule: Omit<CloudflareEmailRule, 'id'>): Promise<CloudflareEmailRule> {
    const url = `${BASE}/zones/${ENV.CF_ZONE_ID}/email/routing/rules`;
    const response = await httpRequest<{ result: CloudflareEmailRule }>(url, {
      method: 'POST',
      headers: headers(),
      json: rule,
    });

    return response.result;
  }

  export async function updateEmailRoutingRule(id: string, rule: Partial<CloudflareEmailRule>): Promise<CloudflareEmailRule> {
    const url = `${BASE}/zones/${ENV.CF_ZONE_ID}/email/routing/rules/${id}`;
    const response = await httpRequest<{ result: CloudflareEmailRule }>(url, {
      method: 'PUT',
      headers: headers(),
      json: rule,
    });

    return response.result;
  }
}

// ============================================================================
// MAILGUN API
// ============================================================================

namespace Mailgun {
  function headers() {
    return {
      Authorization: `Basic ${Buffer.from(`api:${ENV.MG_API_KEY}`).toString('base64')}`,
      'Content-Type': 'application/json',
    };
  }

  export async function getDomain(): Promise<any> {
    const url = `${ENV.MG_BASE}/v3/domains/${ENV.MG_SENDING_DOMAIN}`;
    const response = await httpRequest<any>(url, {
      headers: headers(),
    });

    return response.domain || response;
  }

  export async function listCredentials(): Promise<any[]> {
    const url = `${ENV.MG_BASE}/v3/domains/${ENV.MG_SENDING_DOMAIN}/credentials`;
    try {
      const response = await httpRequest<{ items: any[] }>(url, {
        headers: headers(),
      });
      return response.items || [];
    } catch (error) {
      log(`  ⚠ Could not list Mailgun credentials: ${error}`, 'yellow');
      return [];
    }
  }

  export async function createCredential(login: string, password: string): Promise<any> {
    const url = `${ENV.MG_BASE}/v3/domains/${ENV.MG_SENDING_DOMAIN}/credentials`;

    // Mailgun expects form data, not JSON
    const formData = new URLSearchParams();
    formData.append('login', login);
    formData.append('password', password);

    const response = await httpRequest<any>(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${ENV.MG_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    return response;
  }
}

// ============================================================================
// DNS OPERATIONS
// ============================================================================

async function setupSPF(changes: Change[], dryRun: boolean): Promise<void> {
  const spfValue = 'v=spf1 include:mailgun.org ~all';
  const rootDomain = ENV.ROOT_DOMAIN;

  // Look for existing SPF records
  const existingRecords = await Cloudflare.listDNSRecords('TXT', rootDomain);
  const spfRecords = existingRecords.filter(r => r.content.startsWith('v=spf1'));

  if (spfRecords.length === 0) {
    // Create new SPF record
    changes.push({
      type: 'create',
      category: 'DNS',
      description: `SPF record at ${rootDomain}: "${spfValue}"`,
    });

    if (!dryRun) {
      await Cloudflare.createDNSRecord({
        type: 'TXT',
        name: rootDomain,
        content: spfValue,
        ttl: 3600,
        proxied: false,
      });
    }
  } else {
    const existing = spfRecords[0];

    // Check if mailgun.org is already included
    if (existing.content.includes('include:mailgun.org')) {
      changes.push({
        type: 'skip',
        category: 'DNS',
        description: `SPF record already includes mailgun.org: "${existing.content}"`,
      });
    } else {
      // Merge mailgun.org into existing SPF
      const merged = existing.content.replace(/[~-]all$/, 'include:mailgun.org ~all');

      changes.push({
        type: 'update',
        category: 'DNS',
        description: `SPF record to include mailgun.org: "${merged}"`,
      });

      if (!dryRun && existing.id) {
        await Cloudflare.updateDNSRecord(existing.id, { content: merged });
      }
    }
  }
}

async function setupDMARC(changes: Change[], dryRun: boolean): Promise<void> {
  const dmarcName = `_dmarc.${ENV.ROOT_DOMAIN}`;
  const dmarcValue = `v=DMARC1; p=none; rua=mailto:dmarc@${ENV.ROOT_DOMAIN}; pct=100; fo=1`;

  const existingRecords = await Cloudflare.listDNSRecords('TXT', dmarcName);
  const dmarcRecords = existingRecords.filter(r => r.content.startsWith('v=DMARC1'));

  if (dmarcRecords.length === 0) {
    changes.push({
      type: 'create',
      category: 'DNS',
      description: `DMARC record at ${dmarcName}: "${dmarcValue}"`,
    });

    if (!dryRun) {
      await Cloudflare.createDNSRecord({
        type: 'TXT',
        name: dmarcName,
        content: dmarcValue,
        ttl: 3600,
        proxied: false,
      });
    }
  } else {
    const existing = dmarcRecords[0];

    if (FLAGS.forceDmarc) {
      changes.push({
        type: 'update',
        category: 'DNS',
        description: `DMARC record (forced): "${dmarcValue}"`,
      });

      if (!dryRun && existing.id) {
        await Cloudflare.updateDNSRecord(existing.id, { content: dmarcValue });
      }
    } else {
      changes.push({
        type: 'skip',
        category: 'DNS',
        description: `DMARC record exists: "${existing.content}" (use --force-dmarc to overwrite)`,
      });
    }
  }
}

async function setupDKIM(changes: Change[], dryRun: boolean, dkimRecords: MailgunDKIMRecord[]): Promise<void> {
  for (const dkim of dkimRecords) {
    const fullName = dkim.name.includes(ENV.ROOT_DOMAIN)
      ? dkim.name
      : `${dkim.name}.${ENV.ROOT_DOMAIN}`;

    const existingRecords = await Cloudflare.listDNSRecords('CNAME', fullName);

    if (existingRecords.length === 0) {
      changes.push({
        type: 'create',
        category: 'DNS',
        description: `DKIM CNAME ${fullName} → ${dkim.content}`,
      });

      if (!dryRun) {
        await Cloudflare.createDNSRecord({
          type: 'CNAME',
          name: fullName,
          content: dkim.content,
          ttl: 3600,
          proxied: false,
        });
      }
    } else {
      const existing = existingRecords[0];

      if (existing.content === dkim.content) {
        changes.push({
          type: 'skip',
          category: 'DNS',
          description: `DKIM CNAME ${fullName} already correct`,
        });
      } else {
        changes.push({
          type: 'update',
          category: 'DNS',
          description: `DKIM CNAME ${fullName} → ${dkim.content}`,
        });

        if (!dryRun && existing.id) {
          await Cloudflare.updateDNSRecord(existing.id, { content: dkim.content });
        }
      }
    }
  }
}

// ============================================================================
// EMAIL ROUTING OPERATIONS
// ============================================================================

async function setupEmailRouting(changes: Change[], dryRun: boolean, routes: EmailRoute[]): Promise<void> {
  // Check if Email Routing is enabled
  let settings: any;
  try {
    settings = await Cloudflare.getEmailRoutingSettings();
  } catch (error) {
    changes.push({
      type: 'create',
      category: 'Email Routing',
      description: 'Enable Email Routing',
    });

    if (!dryRun) {
      await Cloudflare.enableEmailRouting();
    }
  }

  if (settings && !settings.enabled) {
    changes.push({
      type: 'update',
      category: 'Email Routing',
      description: 'Enable Email Routing',
    });

    if (!dryRun) {
      await Cloudflare.enableEmailRouting();
    }
  } else if (settings?.enabled) {
    changes.push({
      type: 'skip',
      category: 'Email Routing',
      description: 'Email Routing already enabled',
    });
  }

  // Setup routing rules
  const existingRules = await Cloudflare.listEmailRoutingRules();

  for (const route of routes) {
    const existingRule = existingRules.find(r =>
      r.matchers.some(m => m.field === 'to' && m.value === route.address)
    );

    if (!existingRule) {
      changes.push({
        type: 'create',
        category: 'Email Routing',
        description: `Route ${route.address} → ${route.destination}`,
      });

      if (!dryRun) {
        await Cloudflare.createEmailRoutingRule({
          enabled: true,
          name: `${route.address} route`,
          matchers: [{ type: 'literal', field: 'to', value: route.address }],
          actions: [{ type: 'forward', value: [route.destination] }],
        });
      }
    } else {
      const currentDestination = existingRule.actions[0]?.value[0];

      if (currentDestination === route.destination && existingRule.enabled) {
        changes.push({
          type: 'skip',
          category: 'Email Routing',
          description: `Route ${route.address} → ${route.destination} already exists`,
        });
      } else {
        changes.push({
          type: 'update',
          category: 'Email Routing',
          description: `Route ${route.address} → ${route.destination}`,
        });

        if (!dryRun && existingRule.id) {
          await Cloudflare.updateEmailRoutingRule(existingRule.id, {
            enabled: true,
            actions: [{ type: 'forward', value: [route.destination] }],
          });
        }
      }
    }
  }
}

// ============================================================================
// MAILGUN OPERATIONS
// ============================================================================

async function verifyMailgunDomain(changes: Change[]): Promise<MailgunDKIMRecord[]> {
  try {
    const domain = await Mailgun.getDomain();

    changes.push({
      type: 'skip',
      category: 'Mailgun',
      description: `Domain ${ENV.MG_SENDING_DOMAIN} verified`,
    });

    // Try to extract DKIM records from API response
    const dkimRecords: MailgunDKIMRecord[] = [];

    if (domain.sending_dns_records) {
      for (const record of domain.sending_dns_records) {
        if (record.record_type === 'CNAME' && record.name?.includes('domainkey')) {
          dkimRecords.push({
            name: record.name,
            content: record.value,
          });
        }
      }
    }

    // Fallback to hardcoded values if API doesn't return them
    if (dkimRecords.length === 0) {
      log('  ⚠ Could not fetch DKIM records from Mailgun API, using fallback values', 'yellow');
      return DKIM_CNAME_FALLBACKS;
    }

    return dkimRecords;
  } catch (error) {
    log(`  ❌ Mailgun domain ${ENV.MG_SENDING_DOMAIN} not found or API error`, 'red');
    log(`  Please create the domain in Mailgun first: ${ENV.MG_BASE}/app/sending/domains/new`, 'yellow');
    throw error;
  }
}

async function ensureSMTPCredential(changes: Change[], dryRun: boolean): Promise<{ username: string; password: string } | null> {
  try {
    const credentials = await Mailgun.listCredentials();

    if (credentials.length > 0) {
      changes.push({
        type: 'skip',
        category: 'Mailgun',
        description: `SMTP credentials exist (${credentials.length} found)`,
      });

      return {
        username: credentials[0].login,
        password: '********',
      };
    }

    // Create new credential
    const username = `postmaster@${ENV.MG_SENDING_DOMAIN}`;
    const password = generatePassword(24);

    changes.push({
      type: 'create',
      category: 'Mailgun',
      description: `SMTP credential for ${username}`,
    });

    if (!dryRun) {
      await Mailgun.createCredential(username, password);
      return { username, password };
    }

    return null;
  } catch (error) {
    log(`  ⚠ Could not manage SMTP credentials: ${error}`, 'yellow');
    return null;
  }
}

function generatePassword(length: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
  let password = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  log('═══════════════════════════════════════════════════════════════', 'cyan');
  log('  Cloudflare Email Routing + Mailgun SMTP Setup', 'bright');
  log('═══════════════════════════════════════════════════════════════', 'cyan');
  log('');

  // Validate environment
  if (!validateEnv()) {
    process.exit(1);
  }

  log(`📋 Configuration:`, 'cyan');
  log(`   Domain: ${ENV.ROOT_DOMAIN}`, 'gray');
  log(`   Mailgun Sending Domain: ${ENV.MG_SENDING_DOMAIN}`, 'gray');
  log(`   Cloudflare Zone ID: ${ENV.CF_ZONE_ID}`, 'gray');
  log(`   Mode: ${FLAGS.showPlan ? 'DRY RUN' : FLAGS.nonInteractive ? 'NON-INTERACTIVE' : 'INTERACTIVE'}`, 'gray');
  log('');

  const changes: Change[] = [];
  const dryRun = FLAGS.showPlan;

  try {
    // Parse routes
    let routes: EmailRoute[];
    if (ENV.ROUTES_JSON) {
      try {
        routes = JSON.parse(ENV.ROUTES_JSON);
      } catch {
        log('❌ Invalid ROUTES_JSON format, using defaults', 'red');
        routes = DEFAULT_ROUTES;
      }
    } else {
      routes = DEFAULT_ROUTES;
    }

    // Check for placeholder emails
    const hasPlaceholders = routes.some(r => r.destination.includes('YOUR_'));
    if (hasPlaceholders) {
      log('⚠ WARNING: Found placeholder email addresses in routes!', 'yellow');
      log('   Please edit DEFAULT_ROUTES in the script with your actual Gmail addresses.', 'yellow');
      log('');

      if (!FLAGS.nonInteractive) {
        const proceed = await confirm('Continue anyway?');
        if (!proceed) {
          log('Aborted.', 'red');
          process.exit(0);
        }
      }
    }

    log('🔍 Analyzing current configuration...', 'cyan');
    log('');

    // 1. Verify Mailgun domain and get DKIM records
    log('1️⃣  Mailgun Domain Verification', 'bright');
    const dkimRecords = await verifyMailgunDomain(changes);
    log('');

    // 2. Setup DNS records
    log('2️⃣  DNS Records', 'bright');
    await setupSPF(changes, dryRun);
    await setupDMARC(changes, dryRun);
    await setupDKIM(changes, dryRun, dkimRecords);
    log('');

    // 3. Setup Email Routing
    log('3️⃣  Email Routing', 'bright');
    await setupEmailRouting(changes, dryRun, routes);
    log('');

    // 4. Ensure SMTP credentials
    log('4️⃣  SMTP Credentials', 'bright');
    const smtpCreds = await ensureSMTPCredential(changes, dryRun);
    log('');

    // Print summary
    log('═══════════════════════════════════════════════════════════════', 'cyan');
    log('  SUMMARY OF CHANGES', 'bright');
    log('═══════════════════════════════════════════════════════════════', 'cyan');
    log('');

    if (changes.length === 0) {
      log('  No changes needed - everything is already configured!', 'green');
    } else {
      changes.forEach(logChange);
    }

    log('');

    const createCount = changes.filter(c => c.type === 'create').length;
    const updateCount = changes.filter(c => c.type === 'update').length;

    log(`📊 Total: ${createCount} creates, ${updateCount} updates, ${changes.filter(c => c.type === 'skip').length} skipped`, 'cyan');
    log('');

    // Apply changes
    if (!dryRun && (createCount > 0 || updateCount > 0)) {
      const shouldApply = FLAGS.nonInteractive || await confirm('Apply these changes?');

      if (shouldApply) {
        log('🚀 Applying changes...', 'cyan');
        log('');

        // Re-run with dryRun=false
        const finalChanges: Change[] = [];
        await verifyMailgunDomain(finalChanges);
        await setupSPF(finalChanges, false);
        await setupDMARC(finalChanges, false);
        await setupDKIM(finalChanges, false, dkimRecords);
        await setupEmailRouting(finalChanges, false, routes);
        const finalSmtpCreds = await ensureSMTPCredential(finalChanges, false);

        log('✅ All changes applied successfully!', 'green');
        log('');

        // Print SMTP settings if credentials were created
        if (finalSmtpCreds && finalSmtpCreds.password !== '********') {
          log('═══════════════════════════════════════════════════════════════', 'cyan');
          log('  🔐 NEW SMTP CREDENTIALS CREATED', 'bright');
          log('═══════════════════════════════════════════════════════════════', 'cyan');
          log('');
          log(`  Username: ${finalSmtpCreds.username}`, 'green');
          log(`  Password: ${finalSmtpCreds.password}`, 'green');
          log('');
          log('  ⚠ SAVE THESE CREDENTIALS NOW - Password will not be shown again!', 'yellow');
          log('');
        }
      } else {
        log('Aborted - no changes made.', 'yellow');
        process.exit(0);
      }
    }

    // Print next steps
    log('═══════════════════════════════════════════════════════════════', 'cyan');
    log('  📝 NEXT STEPS', 'bright');
    log('═══════════════════════════════════════════════════════════════', 'cyan');
    log('');
    log('1️⃣  Configure Gmail "Send mail as":', 'bright');
    log('   • Go to Gmail → Settings → Accounts & Import → Send mail as', 'gray');
    log(`   • Click "Add another email address"`, 'gray');
    log(`   • Name: Saipien Labs (or your preferred name)`, 'gray');
    log(`   • Email: hello@${ENV.ROOT_DOMAIN}`, 'gray');
    log(`   • SMTP Server: smtp.mailgun.org`, 'gray');
    log(`   • Port: 587 (TLS)`, 'gray');
    if (smtpCreds) {
      log(`   • Username: ${smtpCreds.username}`, 'gray');
      log(`   • Password: (from Mailgun or credentials above)`, 'gray');
    }
    log('');

    log('2️⃣  Verify the email address:', 'bright');
    log(`   • Gmail will send a verification code to hello@${ENV.ROOT_DOMAIN}`, 'gray');
    log(`   • This will be forwarded to your Gmail via Cloudflare Email Routing`, 'gray');
    log(`   • Click the verification link or enter the code`, 'gray');
    log('');

    log('3️⃣  Test your setup:', 'bright');
    log(`   • Send a test email from Gmail using hello@${ENV.ROOT_DOMAIN}`, 'gray');
    log(`   • Use https://www.mail-tester.com to verify SPF/DKIM/DMARC pass`, 'gray');
    log(`   • Check spam score and deliverability`, 'gray');
    log('');

    log('4️⃣  Monitor and adjust DMARC:', 'bright');
    log(`   • Current policy: p=none (monitoring only)`, 'gray');
    log(`   • After 1-2 weeks of monitoring, update to p=quarantine`, 'gray');
    log(`   • After successful quarantine period, update to p=reject`, 'gray');
    log(`   • Monitor reports at dmarc@${ENV.ROOT_DOMAIN}`, 'gray');
    log('');

    log('5️⃣  Repeat for other addresses:', 'bright');
    log(`   • founders@${ENV.ROOT_DOMAIN}`, 'gray');
    log(`   • press@${ENV.ROOT_DOMAIN}`, 'gray');
    log(`   • partners@${ENV.ROOT_DOMAIN}`, 'gray');
    log(`   • (all configured addresses in routes)`, 'gray');
    log('');

    log('═══════════════════════════════════════════════════════════════', 'cyan');
    log('  ✅ Setup Complete!', 'green');
    log('═══════════════════════════════════════════════════════════════', 'cyan');

  } catch (error) {
    log('', 'reset');
    log('═══════════════════════════════════════════════════════════════', 'red');
    log('  ❌ ERROR', 'red');
    log('═══════════════════════════════════════════════════════════════', 'red');
    log('');

    if (error instanceof Error) {
      log(error.message, 'red');
    } else {
      log(String(error), 'red');
    }

    log('');
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
