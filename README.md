# ScreenTools — complete starter website

A Next.js App Router website containing a homepage, a data-driven library of screen tools, screen colour tests, a countdown timer, stopwatch, visual effects, fictional simulation pages, SEO metadata, sitemap, robots rules, and policy pages.

## Included

- Responsive homepage with categories and tool links.
- 50+ individual tool routes generated from `lib/tools.ts`.
- Solid colour screens and a downloadable 1920 × 1080 white/selected-colour PNG.
- Fullscreen controls.
- Countdown timer with presets, custom duration, pause, reset, and fullscreen.
- Stopwatch with start, pause, reset, and lap controls.
- Animated visual effects and clearly labelled fictional simulation pages.
- Per-tool title, description, canonical URL, and Open Graph metadata.
- Sitemap and robots routes.
- Reduced-motion CSS support.

## Run locally

Use Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To check a production build:

```bash
npm run build
```

## Deploy with GitHub and Vercel

1. Download and extract this project.
2. Upload the extracted files and folders to your existing GitHub repository, preserving the folder structure. Replace matching starter files when prompted.
3. Commit the changes to the `main` branch.
4. Vercel should deploy the commit automatically.
5. Open the Vercel deployment and check several routes.

## Important before public launch

- Update `metadataBase`, the sitemap base URL, and robots sitemap URL in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` if you connect a custom domain.
- Review and customize policy pages to match the services actually used.
- The contact page is informational only; it does not submit a form.
- Screen tests are visual aids and do not automatically detect dead pixels, diagnose burn-in, or measure calibrated display properties.
- Fake screens are fictional visual simulations and must not be represented as real updates or calls.
- This is an original implementation inspired by the general category of browser-based screen tools, not a copy of another site's source code or branding.

## Project structure

- `app/page.tsx` — homepage
- `app/[slug]/page.tsx` — individual tool pages and metadata
- `app/globals.css` — responsive design and visual effects
- `components/tool-experience.tsx` — interactive client-side tool UI
- `components/tool-search.tsx` — working client-side tool search
- `lib/tools.ts` — central tool registry
- `app/sitemap.ts` and `app/robots.ts` — crawl guidance
