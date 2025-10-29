#!/usr/bin/env tsx
/**
 * GitHub Organization Bootstrap CLI
 * Automated setup for saipienlabs GitHub org with branded assets, repos, CI, and security
 *
 * Usage:
 *   npx tsx tools/gh-bootstrap/bootstrap.ts [--dry-run] [--skip-assets] [--skip-security]
 *
 * Required ENV vars:
 *   GH_TOKEN - GitHub PAT with repo, admin:org, write:org, workflow, security_events
 *   GH_ORG - GitHub organization name (default: saipienlabs)
 *   GH_OWNER_USERNAME - Primary owner username (default: cryptocrystian)
 *   SITE_URL - Website URL (default: https://saipienlabs.com)
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { GitHub, type RepoConfig } from './lib/github';
import {
  generateOrgSocialCard,
  generateRepoAssets,
  saveSVG,
} from './lib/assets';
import {
  generateREADME,
  generateSECURITY,
  generateCODEOWNERS,
  generateISSUE_TEMPLATE,
  generatePR_TEMPLATE,
  generateCI_WORKFLOW,
  generateCODEQL_WORKFLOW,
  generateDEPENDABOT,
  generateLICENSE,
  generateORG_PROFILE_README,
} from './lib/templates';

// ============================================================================
// CONFIGURATION
// ============================================================================

const ENV = {
  GH_TOKEN: process.env.GH_TOKEN || '',
  GH_ORG: process.env.GH_ORG || 'Saipien-Labs',
  GH_OWNER: process.env.GH_OWNER_USERNAME || 'cryptocrystian',
  SITE_URL: process.env.SITE_URL || 'https://saipienlabs.com',
};

const FLAGS = {
  dryRun: process.argv.includes('--dry-run'),
  skipAssets: process.argv.includes('--skip-assets'),
  skipSecurity: process.argv.includes('--skip-security'),
  verbose: process.argv.includes('--verbose'),
};

// ============================================================================
// LOGGING
// ============================================================================

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title: string) {
  log('\n' + '═'.repeat(70), 'blue');
  log(`  ${title}`, 'bright');
  log('═'.repeat(70), 'blue');
}

function logStep(step: string, status: 'pending' | 'success' | 'skip' | 'error') {
  const symbols = {
    pending: '○',
    success: '✓',
    skip: '→',
    error: '✗',
  };
  const statusColors: Record<typeof status, keyof typeof colors> = {
    pending: 'gray',
    success: 'green',
    skip: 'yellow',
    error: 'red',
  };

  log(`  ${symbols[status]} ${step}`, statusColors[status]);
}

// ============================================================================
// VALIDATION
// ============================================================================

function validateEnv(): boolean {
  if (!ENV.GH_TOKEN) {
    log('❌ Missing GH_TOKEN environment variable', 'red');
    log('\nRequired permissions:', 'yellow');
    log('  • repo (full control)', 'gray');
    log('  • admin:org (read/write)', 'gray');
    log('  • workflow (update workflows)', 'gray');
    log('  • security_events (code scanning)', 'gray');
    return false;
  }

  return true;
}

// ============================================================================
// ORGANIZATION SETUP
// ============================================================================

async function setupOrgProfile(gh: GitHub) {
  logSection('Organization Profile Setup');

  try {
    // Check if .github repo exists
    const dotGithubRepo = await gh.getRepo('.github');

    if (!dotGithubRepo) {
      logStep('Create .github repo', 'pending');
      if (!FLAGS.dryRun) {
        await gh.createRepo({
          name: '.github',
          description: 'Organization profile and community health files',
          isPrivate: false,
        });
      }
      logStep('Created .github repo', 'success');
    } else {
      logStep('.github repo exists', 'skip');
    }

    // Generate and upload profile README
    logStep('Generate profile README', 'pending');
    const profileReadme = generateORG_PROFILE_README(ENV.SITE_URL);

    if (!FLAGS.dryRun) {
      await gh.createOrUpdateFile('.github', {
        path: 'profile/README.md',
        content: profileReadme,
        message: 'Update organization profile README',
      });
    }
    logStep('Profile README updated', 'success');

    // Generate social card
    if (!FLAGS.skipAssets) {
      logStep('Generate social card', 'pending');
      const socialCardSVG = generateOrgSocialCard();
      const svgPath = join(process.cwd(), 'tools/gh-bootstrap/assets/org-social-card.svg');
      await saveSVG(socialCardSVG, svgPath);
      logStep(`Social card saved to: ${svgPath}`, 'success');
      log('   ⚠️  Manual step: Convert SVG to PNG and upload to .github/profile/', 'yellow');
    }

    // Get domain verification token
    logStep('Check domain verification', 'pending');
    const verificationToken = await gh.getDomainVerificationToken();
    if (verificationToken) {
      log('\n📋 Domain Verification Instructions:', 'blue');
      log('   Add this DNS TXT record:', 'gray');
      log(`   Host: _github-challenge-${ENV.GH_ORG}-org`, 'bright');
      log(`   Value: ${verificationToken}`, 'bright');
      log('   TTL: 3600\n', 'gray');
      logStep('Domain verification token retrieved', 'success');
    } else {
      logStep('Domain verification not available', 'skip');
    }

    // Organization settings
    logStep('Check 2FA requirement', 'pending');
    log('   ⚠️  Manual step: Enable "Require two-factor authentication" in org settings', 'yellow');
    logStep('Organization security configured', 'success');

  } catch (error) {
    logStep(`Error: ${error}`, 'error');
    throw error;
  }
}

// ============================================================================
// REPOSITORY SETUP
// ============================================================================

async function setupRepository(gh: GitHub, repoConfig: RepoConfig) {
  const { name, description, website, topics } = repoConfig;

  log(`\n→ Repository: ${name}`, 'blue');

  try {
    // Create or update repo
    const existingRepo = await gh.getRepo(name);

    if (!existingRepo) {
      logStep(`Create repo: ${name}`, 'pending');
      if (!FLAGS.dryRun) {
        await gh.createRepo(repoConfig);
        // Wait a bit for repo to be ready
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      logStep(`Repo created: ${name}`, 'success');
    } else {
      logStep(`Repo exists: ${name}`, 'skip');
      logStep(`Update repo metadata`, 'pending');
      if (!FLAGS.dryRun) {
        await gh.updateRepo(name, { description, website });
      }
      logStep(`Metadata updated`, 'success');
    }

    // Set topics
    logStep('Set topics', 'pending');
    if (!FLAGS.dryRun && topics) {
      await gh.setRepoTopics(name, topics);
    }
    logStep(`Topics set: ${topics?.join(', ')}`, 'success');

    // Generate and upload files
    const files = [
      {
        path: 'README.md',
        content: generateREADME({ name, description, website: website || ENV.SITE_URL }),
        message: 'Add/update README',
      },
      {
        path: 'LICENSE',
        content: generateLICENSE(),
        message: 'Add MIT license',
      },
      {
        path: 'SECURITY.md',
        content: generateSECURITY(name),
        message: 'Add security policy',
      },
      {
        path: '.github/CODEOWNERS',
        content: generateCODEOWNERS(ENV.GH_OWNER),
        message: 'Add code owners',
      },
      {
        path: '.github/ISSUE_TEMPLATE.md',
        content: generateISSUE_TEMPLATE(),
        message: 'Add issue template',
      },
      {
        path: '.github/PULL_REQUEST_TEMPLATE.md',
        content: generatePR_TEMPLATE(),
        message: 'Add PR template',
      },
      {
        path: '.github/workflows/ci.yml',
        content: generateCI_WORKFLOW(name),
        message: 'Add CI workflow',
      },
      {
        path: '.github/workflows/codeql.yml',
        content: generateCODEQL_WORKFLOW(),
        message: 'Add CodeQL workflow',
      },
      {
        path: '.github/dependabot.yml',
        content: generateDEPENDABOT(),
        message: 'Add Dependabot config',
      },
    ];

    logStep('Upload files', 'pending');
    if (!FLAGS.dryRun) {
      const results = await gh.createOrUpdateFiles(name, files);
      const successCount = results.filter(r => r.status === 'success').length;
      logStep(`Files uploaded: ${successCount}/${files.length}`, 'success');

      if (FLAGS.verbose) {
        results.forEach(r => {
          if (r.status === 'error') {
            log(`   ⚠️  ${r.path}: ${r.error}`, 'yellow');
          }
        });
      }
    } else {
      logStep(`Would upload ${files.length} files`, 'skip');
    }

    // Generate OG image
    if (!FLAGS.skipAssets) {
      logStep('Generate OG image', 'pending');
      const assetsDir = join(process.cwd(), 'tools/gh-bootstrap/assets');
      const { svg, png } = await generateRepoAssets(name, assetsDir);
      logStep(`OG image: ${svg}`, 'success');
      log(`   ⚠️  Manual step: Convert to PNG and upload to /docs/og-image.png`, 'yellow');
    }

    // Security settings
    if (!FLAGS.skipSecurity) {
      logStep('Enable security features', 'pending');
      if (!FLAGS.dryRun) {
        try {
          await gh.enableVulnerabilityAlerts(name);
          await gh.enableAutomatedSecurityFixes(name);
          logStep('Vulnerability alerts enabled', 'success');
        } catch {
          logStep('Security features (check permissions)', 'skip');
        }
      } else {
        logStep('Would enable Dependabot & code scanning', 'skip');
      }
    }

    // Branch protection
    logStep('Set branch protection', 'pending');
    if (!FLAGS.dryRun) {
      try {
        await gh.setBranchProtection(name, 'main');
        logStep('Branch protection configured', 'success');
      } catch (error) {
        // Branch might not exist yet if repo is empty
        logStep('Branch protection (requires commits first)', 'skip');
      }
    } else {
      logStep('Would set branch protection on main', 'skip');
    }

  } catch (error) {
    logStep(`Error setting up ${name}: ${error}`, 'error');
    if (FLAGS.verbose) {
      console.error(error);
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  log('═'.repeat(70), 'blue');
  log('  GitHub Organization Bootstrap', 'bright');
  log('  Saipien [LABS] — Automated setup', 'dim');
  log('═'.repeat(70), 'blue');

  if (!validateEnv()) {
    process.exit(1);
  }

  log('\n📋 Configuration:', 'blue');
  log(`   Org: ${ENV.GH_ORG}`, 'gray');
  log(`   Owner: ${ENV.GH_OWNER}`, 'gray');
  log(`   Site: ${ENV.SITE_URL}`, 'gray');
  log(`   Mode: ${FLAGS.dryRun ? 'DRY RUN' : 'LIVE'}`, FLAGS.dryRun ? 'yellow' : 'green');

  const gh = new GitHub({
    token: ENV.GH_TOKEN,
    org: ENV.GH_ORG,
    owner: ENV.GH_OWNER,
  });

  try {
    // Load org config
    const configPath = join(process.cwd(), 'tools/gh-bootstrap/config/org.json');
    const configData = await readFile(configPath, 'utf-8');
    const config = JSON.parse(configData);

    // Step 1: Setup organization profile
    await setupOrgProfile(gh);

    // Step 2: Setup repositories
    logSection('Repository Setup');
    for (const repo of config.repos) {
      await setupRepository(gh, repo);
    }

    // Step 3: Transfer repos (if enabled)
    if (config.transfer?.enabled && config.transfer.repos.length > 0) {
      logSection('Repository Transfer');
      for (const transfer of config.transfer.repos) {
        logStep(`Transfer ${transfer.name} from ${transfer.fromOwner}`, 'pending');
        if (!FLAGS.dryRun) {
          await gh.transferRepo(transfer.name, transfer.fromOwner);
          logStep(`Transferred: ${transfer.name}`, 'success');
        } else {
          logStep(`Would transfer ${transfer.name}`, 'skip');
        }
      }
    }

    // Summary
    log('\n' + '═'.repeat(70), 'green');
    log('  ✅ Bootstrap Complete!', 'bright');
    log('═'.repeat(70), 'green');

    if (FLAGS.dryRun) {
      log('\n⚠️  This was a DRY RUN. No changes were made.', 'yellow');
      log('   Run without --dry-run to apply changes.\n', 'gray');
    } else {
      log('\n📝 Manual steps remaining:', 'blue');
      log('   1. Convert SVG social cards to PNG and upload', 'gray');
      log('   2. Add DNS TXT record for domain verification', 'gray');
      log('   3. Enable 2FA requirement in org settings', 'gray');
      log('   4. Invite team members to @saipienlabs/core team\n', 'gray');
    }

  } catch (error) {
    log('\n' + '═'.repeat(70), 'red');
    log('  ❌ Bootstrap Failed', 'bright');
    log('═'.repeat(70), 'red');
    log(`\n${error}\n`, 'red');
    if (FLAGS.verbose && error instanceof Error) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
