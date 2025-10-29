/**
 * Asset generation for GitHub organization branding
 * Generates SVG social cards and OG images
 */

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const BRAND_COLORS = {
  obsidian: '#0B0F14',
  graphite: '#11141A',
  slate: '#1C2128',
  mist: '#E6EBF2',
  accentTeal: '#00BFA6',
  accentBlue: '#4C8DFF',
  accentViolet: '#8B5CF6',
  aurora: 'linear-gradient(90deg, #00F5A0 0%, #9A5CFF 100%)',
};

export interface AssetConfig {
  title: string;
  subtitle?: string;
  description?: string;
  width?: number;
  height?: number;
}

/**
 * Generate organization social card SVG
 */
export function generateOrgSocialCard(): string {
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="${BRAND_COLORS.obsidian}"/>

  <!-- Gradient accent -->
  <defs>
    <linearGradient id="aurora" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00F5A0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#9A5CFF;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="aurora-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00F5A0;stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:#9A5CFF;stop-opacity:0.1" />
    </linearGradient>
  </defs>

  <!-- Glow effect -->
  <circle cx="600" cy="315" r="400" fill="url(#aurora-glow)" opacity="0.3"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="1200" height="4" fill="url(#aurora)"/>

  <!-- Logo / Brand -->
  <text x="100" y="180" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="72" font-weight="700" fill="${BRAND_COLORS.mist}">
    Saipien [LABS]
  </text>

  <!-- Tagline -->
  <text x="100" y="260" font-family="'Inter', sans-serif" font-size="32" font-weight="400" fill="${BRAND_COLORS.mist}" opacity="0.8">
    AI-accelerated dev pods that ship production
  </text>

  <!-- Description -->
  <text x="100" y="340" font-family="'JetBrains Mono', 'Courier New', monospace" font-size="20" fill="${BRAND_COLORS.accentTeal}">
    90-day MVPs • Integration-first • Governed
  </text>

  <!-- Bottom -->
  <text x="100" y="560" font-family="'Inter', sans-serif" font-size="24" fill="${BRAND_COLORS.mist}" opacity="0.6">
    saipienlabs.com
  </text>
</svg>`;
}

/**
 * Generate repository OG image SVG
 */
export function generateRepoOGImage(config: AssetConfig): string {
  const {
    title,
    subtitle = 'Saipien [LABS]',
    description = 'AI-accelerated development',
    width = 1200,
    height = 630,
  } = config;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${BRAND_COLORS.obsidian}"/>

  <!-- Gradient definitions -->
  <defs>
    <linearGradient id="aurora" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00F5A0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#9A5CFF;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:#00F5A0;stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:#9A5CFF;stop-opacity:0.05" />
    </radialGradient>
  </defs>

  <!-- Background glow -->
  <circle cx="${width / 2}" cy="${height / 2}" r="350" fill="url(#glow)"/>

  <!-- Top border -->
  <rect x="0" y="0" width="${width}" height="3" fill="url(#aurora)"/>

  <!-- Subtitle / Brand -->
  <text x="80" y="120" font-family="'Inter', sans-serif" font-size="28" font-weight="600" fill="${BRAND_COLORS.accentTeal}">
    ${escapeXml(subtitle)}
  </text>

  <!-- Main Title -->
  <text x="80" y="220" font-family="'Inter', sans-serif" font-size="64" font-weight="700" fill="${BRAND_COLORS.mist}">
    ${escapeXml(title)}
  </text>

  <!-- Description -->
  <text x="80" y="300" font-family="'Inter', sans-serif" font-size="28" font-weight="400" fill="${BRAND_COLORS.mist}" opacity="0.7">
    ${escapeXml(description)}
  </text>

  <!-- Bottom accent -->
  <text x="80" y="560" font-family="'JetBrains Mono', monospace" font-size="18" fill="${BRAND_COLORS.mist}" opacity="0.5">
    github.com/saipienlabs/${escapeXml(title.toLowerCase().replace(/\s+/g, '-'))}
  </text>
</svg>`;
}

/**
 * Generate profile README banner SVG
 */
export function generateProfileBanner(): string {
  return `<svg width="1000" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1000" height="200" fill="${BRAND_COLORS.graphite}"/>

  <!-- Gradient -->
  <defs>
    <linearGradient id="aurora" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00F5A0;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#4C8DFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#9A5CFF;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Top accent -->
  <rect x="0" y="0" width="1000" height="3" fill="url(#aurora)"/>

  <!-- Logo -->
  <text x="50" y="80" font-family="'Inter', sans-serif" font-size="48" font-weight="700" fill="${BRAND_COLORS.mist}">
    Saipien [LABS]
  </text>

  <!-- Tagline -->
  <text x="50" y="130" font-family="'Inter', sans-serif" font-size="24" fill="${BRAND_COLORS.mist}" opacity="0.7">
    Build real software, really fast.
  </text>

  <!-- Pills -->
  <g transform="translate(50, 150)">
    <rect x="0" y="0" width="120" height="32" rx="16" fill="${BRAND_COLORS.accentTeal}" opacity="0.2"/>
    <text x="60" y="21" font-family="'Inter', sans-serif" font-size="14" font-weight="500" fill="${BRAND_COLORS.accentTeal}" text-anchor="middle">
      90-Day MVPs
    </text>

    <rect x="140" y="0" width="140" height="32" rx="16" fill="${BRAND_COLORS.accentBlue}" opacity="0.2"/>
    <text x="210" y="21" font-family="'Inter', sans-serif" font-size="14" font-weight="500" fill="${BRAND_COLORS.accentBlue}" text-anchor="middle">
      Integration-First
    </text>

    <rect x="300" y="0" width="100" height="32" rx="16" fill="${BRAND_COLORS.accentViolet}" opacity="0.2"/>
    <text x="350" y="21" font-family="'Inter', sans-serif" font-size="14" font-weight="500" fill="${BRAND_COLORS.accentViolet}" text-anchor="middle">
      Governed
    </text>
  </g>
</svg>`;
}

/**
 * Save SVG to file
 */
export async function saveSVG(
  svg: string,
  outputPath: string
): Promise<void> {
  const dir = join(outputPath, '..');
  await mkdir(dir, { recursive: true });
  await writeFile(outputPath, svg, 'utf-8');
}

/**
 * Convert SVG to PNG (requires external tool or library)
 * For production, use: sharp, playwright, or puppeteer
 */
export async function svgToPNG(
  svgPath: string,
  pngPath: string
): Promise<void> {
  // Placeholder: In production, use sharp or puppeteer
  console.log(
    `\n⚠️  Manual PNG conversion needed:`
  );
  console.log(`   Input:  ${svgPath}`);
  console.log(`   Output: ${pngPath}`);
  console.log(
    `   Use: npx @svgr/cli --icon --typescript ${svgPath} > temp.tsx`
  );
  console.log(
    `   Or:  inkscape ${svgPath} --export-filename=${pngPath}`
  );
  console.log(
    `   Or:  Use online tool: https://cloudconvert.com/svg-to-png\n`
  );
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate all assets for a repository
 */
export async function generateRepoAssets(
  repoName: string,
  outputDir: string
): Promise<{ svg: string; png: string }> {
  const config: AssetConfig = {
    title: repoName,
    subtitle: 'Saipien [LABS]',
    description: 'AI-accelerated development',
  };

  const svg = generateRepoOGImage(config);
  const svgPath = join(outputDir, `${repoName}-og.svg`);
  const pngPath = join(outputDir, `${repoName}-og.png`);

  await saveSVG(svg, svgPath);

  return { svg: svgPath, png: pngPath };
}
