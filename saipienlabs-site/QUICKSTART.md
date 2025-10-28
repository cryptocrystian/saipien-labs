# Quick Start Guide

## First Time Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

   This will install:
   - Next.js 16
   - React 19
   - Tailwind CSS v4
   - TypeScript
   - ESLint

2. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open http://localhost:3000

3. **Build for Production**
   ```bash
   npm run build
   ```

## What You Get

The site includes all 9 sections from the Sprint 1 spec:

1. ✅ **HeaderNav** - Sticky header with scroll blur effect
2. ✅ **HeroSection** - Main headline + Pod Dashboard mock
3. ✅ **ValueProps** - 3 value proposition cards
4. ✅ **PricingGrid** - 5 productized service offerings
5. ✅ **Timeline90Days** - 90-day delivery roadmap
6. ✅ **CaseStudies** - Pravado, aivery, Wellstead
7. ✅ **GovernanceStrip** - Compliance badges
8. ✅ **FinalCTA** - Final call to action
9. ✅ **Footer** - Site footer with links

## Design System Ready

All design tokens are configured in `app/globals.css`:

- **Colors**: Obsidian, Graphite, Slate, Mist
- **Aurora Gradient**: Teal → Blue → Violet
- **Fonts**: Inter (UI) + JetBrains Mono (code)
- **Custom utilities**: `.bg-aurora`, `.text-aurora`, `.bg-aurora-animated`

## Responsive Breakpoints

- Mobile: 390px+
- Tablet: 768px+
- Desktop: 1280px+

All components are fully responsive.

## Next Steps

1. Test the site locally with `npm run dev`
2. Make any content/copy tweaks
3. Push to GitHub
4. Connect to Cloudflare Pages (see DEPLOYMENT.md)
5. Deploy automatically

## Troubleshooting

**Issue**: `next: command not found`
**Fix**: Run `npm install` first

**Issue**: Build errors
**Fix**: Make sure you're using Node 18+ (`node --version`)

**Issue**: Port 3000 already in use
**Fix**: Use `npm run dev -- -p 3001` to use a different port

## File Structure

```
app/
  ├── globals.css        # Design tokens + Tailwind config
  ├── layout.tsx         # Root layout + metadata
  └── page.tsx           # Homepage (imports all components)

components/
  ├── HeaderNav.tsx      # Sticky navigation
  ├── HeroSection.tsx    # Hero with dashboard
  ├── ValueProps.tsx     # Value propositions
  ├── PricingGrid.tsx    # Pricing cards
  ├── Timeline90Days.tsx # Roadmap
  ├── CaseStudies.tsx    # Client work
  ├── GovernanceStrip.tsx # Compliance
  ├── FinalCTA.tsx       # Bottom CTA
  └── Footer.tsx         # Footer
```

## Making Changes

### Update Copy
Edit the component files in `components/` - all copy is inline in JSX.

### Change Colors
Edit `app/globals.css` - update the CSS variables in `:root` and `@theme inline`.

### Add New Section
1. Create component in `components/NewSection.tsx`
2. Import and add to `app/page.tsx`

### Modify Layout
Each component is self-contained with Tailwind classes. Edit the component files directly.

## Ready to Ship?

Once you're happy with local preview:
1. Commit your changes
2. Push to GitHub
3. Follow DEPLOYMENT.md to set up Cloudflare Pages
4. Your site will be live with automatic deployments!
