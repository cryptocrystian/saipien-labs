#!/usr/bin/env node

/**
 * PDF Generation Script for MVP Plan
 *
 * This script provides instructions for generating the PDF.
 *
 * OPTION 1 - Browser Print to PDF (Recommended for now):
 * 1. Open: file:///home/saipienlabs/projects/saipien-labs/saipienlabs-site/public/assets/mvp-plan-printable.html
 * 2. Press Ctrl+P (or Cmd+P on Mac)
 * 3. Select "Save as PDF"
 * 4. In print settings:
 *    - Paper size: Letter
 *    - Margins: None
 *    - Background graphics: Enabled
 * 5. Save as: public/assets/saipien-90-day-mvp-plan.pdf
 *
 * OPTION 2 - Install Puppeteer (automated):
 * Run: npm install --save-dev puppeteer
 * Then run: node scripts/generate-pdf.js --auto
 *
 * OPTION 3 - Use external tool:
 * wkhtmltopdf public/assets/mvp-plan-printable.html public/assets/saipien-90-day-mvp-plan.pdf
 */

const fs = require('fs');
const path = require('path');

console.log('');
console.log('='.repeat(60));
console.log('Saipien Labs - MVP Plan PDF Generator');
console.log('='.repeat(60));
console.log('');

const htmlPath = path.join(__dirname, '../public/assets/mvp-plan-printable.html');
const pdfPath = path.join(__dirname, '../public/assets/saipien-90-day-mvp-plan.pdf');

// Check if HTML file exists
if (!fs.existsSync(htmlPath)) {
  console.error('❌ Error: mvp-plan-printable.html not found');
  console.log('Expected location:', htmlPath);
  process.exit(1);
}

console.log('✓ Found HTML template:', htmlPath);
console.log('');

// Check if running with --auto flag
if (process.argv.includes('--auto')) {
  console.log('Attempting automated PDF generation...');

  try {
    const puppeteer = require('puppeteer');

    (async () => {
      console.log('Launching browser...');
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();

      console.log('Loading HTML...');
      await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

      console.log('Generating PDF...');
      await page.pdf({
        path: pdfPath,
        format: 'Letter',
        printBackground: true,
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      });

      await browser.close();

      console.log('');
      console.log('✅ PDF generated successfully!');
      console.log('📄 Location:', pdfPath);
      console.log('');

      // Check file size
      const stats = fs.statSync(pdfPath);
      console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);
      console.log('');
    })();

  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('');
      console.log('⚠️  Puppeteer not installed.');
      console.log('');
      console.log('To install and generate PDF automatically:');
      console.log('  npm install --save-dev puppeteer');
      console.log('  node scripts/generate-pdf.js --auto');
      console.log('');
    } else {
      console.error('Error generating PDF:', error.message);
    }
  }
} else {
  // Show manual instructions
  console.log('MANUAL PDF GENERATION (Recommended):');
  console.log('');
  console.log('1. Open this file in your browser:');
  console.log(`   file://${htmlPath}`);
  console.log('');
  console.log('2. Press Ctrl+P (Cmd+P on Mac)');
  console.log('');
  console.log('3. Configure print settings:');
  console.log('   • Destination: Save as PDF');
  console.log('   • Paper size: Letter');
  console.log('   • Margins: None');
  console.log('   • Background graphics: ✓ Enabled');
  console.log('');
  console.log('4. Save as:');
  console.log(`   ${pdfPath}`);
  console.log('');
  console.log('-'.repeat(60));
  console.log('');
  console.log('AUTOMATED GENERATION:');
  console.log('');
  console.log('  node scripts/generate-pdf.js --auto');
  console.log('');
  console.log('(Requires: npm install --save-dev puppeteer)');
  console.log('');
}
