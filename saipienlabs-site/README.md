# Saipien Labs Marketing Site

AI-accelerated dev pods that ship production in weeks — with enterprise discipline, security controls, and budget guardrails.

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4
- **Typography**: Inter (UI) + JetBrains Mono (technical/code elements)
- **Hosting**: Cloudflare Pages (recommended)
- **Deployment**: Automatic on push to `main`

## Design System

### Colors
- **Obsidian** (`#0B0F14`) - Page background
- **Graphite** (`#111821`) - Header / surfaces
- **Slate** (`#1A2430`) - Cards
- **Mist** (`#C7D2E0`) - Primary text

### Aurora Gradient
- **Teal** (`#00BFA6`) → **Blue** (`#4C8DFF`) → **Violet** (`#8B5CF6`)

## Project Structure

```
saipienlabs-site/
├── app/
│   ├── globals.css          # Tailwind config + design tokens
│   ├── layout.tsx            # Root layout + metadata
│   └── page.tsx              # Home page composition
├── components/
│   ├── HeaderNav.tsx         # Sticky header with scroll effect
│   ├── HeroSection.tsx       # Hero with pod dashboard mock
│   ├── ValueProps.tsx        # 3-card value proposition grid
│   ├── PricingGrid.tsx       # 5 productized service offerings
│   ├── Timeline90Days.tsx    # 4-phase 90-day roadmap
│   ├── CaseStudies.tsx       # Client work (Pravado, aivery, Wellstead)
│   ├── GovernanceStrip.tsx   # Compliance badges section
│   ├── FinalCTA.tsx          # Bottom CTA with aurora bar
│   └── Footer.tsx            # Site footer
└── public/                   # Static assets

```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm run start  # Test production build locally
```

## Key Features

### Responsive Design
- Mobile-first approach (390px+)
- Tablet optimized (768px+)
- Desktop enhanced (1280px+)

### Accessibility
- Semantic HTML5
- WCAG 2.1 AA contrast ratios
- Keyboard navigation support
- Focus indicators

### Performance
- Static site generation
- Minimal JavaScript (client components only where needed)
- Custom CSS gradients (no heavy animations)
- Font loading via Google Fonts

## Sections

1. **HeaderNav** - Sticky navigation with backdrop blur on scroll
2. **HeroSection** - Main value proposition + pod dashboard mock
3. **ValueProps** - Outcome-led, Integration-first, Velocity without corners
4. **PricingGrid** - 5 productized offerings with clear pricing
5. **Timeline90Days** - 4-phase delivery roadmap
6. **CaseStudies** - 3 client examples with KPIs
7. **GovernanceStrip** - Enterprise compliance badges
8. **FinalCTA** - Book feasibility readout
9. **Footer** - Navigation + contact

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Cloudflare Pages:**
1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Auto-deploy on every push to `main`

## Sprint 1 & 2 Acceptance Criteria

### Sprint 1 ✅
- ✅ Live preview URL on Cloudflare Pages
- ✅ All 9 sections rendering responsively
- ✅ Sticky header with scroll effect
- ✅ Aurora gradient brand system
- ✅ SAIPIEN [LABS] wordmark (live text, not image)
- ✅ Accessibility: 4.5:1 contrast, focus rings, semantic HTML
- ✅ Mobile (390px) / Tablet (768px) / Desktop (1280px+) layouts

### Sprint 2 ✅ CLIENT-FACING READY
- ✅ Final production copy (no filler anywhere)
- ✅ Contact modal with form (Book Feasibility Readout)
- ✅ Pod Dashboard enhanced with micro-labels + [healthy] status
- ✅ Timeline with animated pipeline rail + updated status pills
- ✅ Case Studies with integration diagrams + schema callouts
- ✅ Governance badges styled as system status
- ✅ SEO metadata + OG image + favicon
- ✅ Universal focus states for accessibility
- ✅ NDA-friendly trust signals throughout

## Contact

- **Email**: hello@saipienlabs.com
- **Live Site**: [Coming soon after Cloudflare Pages setup]

---

Built with speed and enterprise discipline in mind. 🚀
