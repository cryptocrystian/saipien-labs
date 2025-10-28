# Deployment Guide - Saipien Labs Site

## Cloudflare Pages Deployment (Recommended)

### Initial Setup

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Saipien Labs marketing site"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect your GitHub account
   - Select the `saipienlabs-site` repository
   - Configure build settings:
     - **Framework preset**: Next.js
     - **Build command**: `npm run build`
     - **Build output directory**: `.next`
     - **Root directory**: (leave empty or `/`)
     - **Node version**: 18 or higher

3. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare Pages will automatically build and deploy your site
   - You'll get a unique URL like `saipienlabs-site.pages.dev`

### Automatic Deployments

Every push to the `main` branch will trigger an automatic deployment to production.

### Custom Domain

1. Go to your Cloudflare Pages project
2. Click "Custom domains"
3. Add your domain (e.g., `saipienlabs.com`)
4. Follow the DNS configuration instructions

### Environment Variables

Currently, this is a static site with no backend, so no environment variables are needed.

## Alternative: GitHub Pages

If you prefer GitHub Pages:

1. **Enable Static Export**

   Update `next.config.ts`:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

2. **Add GitHub Actions Workflow**

   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

3. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Build for Production

```bash
# Build the site
npm run build

# Test production build locally
npm run start
```

## Performance Checklist

- ✅ Static site - fast load times
- ✅ Tailwind CSS - minimal CSS bundle
- ✅ No external image dependencies
- ✅ Custom fonts loaded via Google Fonts CDN
- ✅ Gradient animations use CSS only (no JavaScript)
- ✅ Mobile-first responsive design

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari iOS 14+
- Chrome Android (latest)

## Accessibility

- Semantic HTML5 structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios meet WCAG 2.1 AA standards
- Focus indicators visible

## Free Tier Limits

**Cloudflare Pages Free:**
- ✅ Unlimited static requests
- ✅ Unlimited bandwidth
- ✅ 500 builds/month
- ✅ 1 concurrent build
- ✅ Global CDN

**GitHub Pages:**
- ⚠️ 100GB soft bandwidth limit/month
- ⚠️ 1GB storage limit
- ⚠️ 10 builds/hour
