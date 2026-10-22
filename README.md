# WhiteScreen.vip starter

A Next.js App Router starter for browser-based colour screens, display tests, effects, timers, fake-screen simulations and guide pages.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this project to your GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: Next.js. Build command: `npm run build`.
4. Deploy and open the generated `vercel.app` URL.

## Notes

- Tool pages are generated from `lib/tools.ts` and `app/[slug]/page.tsx`.
- Update the `metadataBase` and sitemap URLs in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` after selecting your real domain.
- Dead-pixel and display test tools only show patterns for visual inspection; they do not automatically diagnose hardware.
- Fake screens are clearly marked as simulations.
- This is a generated starter. Test every route and browser interaction before production use.
