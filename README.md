# qmahyar.github.io

Personal portfolio of [QMahyar](https://github.com/QMahyar) — cinematic dark theme built from my WezTerm palette (Campbell-Vivid).

## Stack

Svelte 5 (runes) · Vite · Tailwind CSS v4 · TypeScript · GitHub Pages

## Develop

```sh
npm install
npm run dev      # local dev server
npm run check    # svelte-check
npm run build    # production build → dist/
npm run preview  # serve the build
npm run og       # regenerate public/og.png from the Midnight tokens
```

## Data

`+page.server.ts` runs at prerender time: it fetches
`api.github.com/users/QMahyar/repos` (authenticated with the server-only
`GITHUB_TOKEN` when present) and merges live stars / push dates into the static
catalogue in `src/lib/data/site.ts`. Any fetch failure falls back to the static
data, so the build never breaks when the API is unreachable or rate-limited.
The token never reaches the client bundle — do not use a `VITE_*` variable here.

## Deploy

Push to `main` → GitHub Actions builds and deploys (`deploy.yml`,
`adapter-static` → `dist/`).
Requires Pages source set to **GitHub Actions** in repo settings.
