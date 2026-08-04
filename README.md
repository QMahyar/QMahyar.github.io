# QMahyar.github.io

Personal site — plain HTML/CSS/JS, no build step. Served from this repo via GitHub Pages.

**URL:** https://QMahyar.github.io

## Everything is automatic

The page fetches from the GitHub API on every load:

- `~/projects` — rendered from your repos: new repos appear automatically, stars, status (active/archived), language tags, npm links
- `~/starred` — repos you've starred on GitHub (top 8, by stars)
- `~/recent` — 5 most recently pushed repos
- metrics (repos / followers / following / joined) and language bars
- hero `ls ~/projects` count + the `ls` command in the palette

If the API is unreachable it falls back to static data baked into `script.js`.

## Curating — edit the CONFIG block at the top of `script.js`

```js
exclude:  ["QMahyar", "QMahyar.github.io"],   // repos hidden from ~/projects
hideForks: true,                              // forks never shown
featured: ["Telegram-Cli", ...],              // ✦ + highlights
highlights: { "<repo>": ["bullet", ...] },    // feature bullets for featured repos
describe:  { "<repo>": "custom description" },// optional description overrides
links:     { "<repo>": {label, url} },        // extra links (npm is auto)
groups:    [ { name, match: [keywords] } ],   // ordering + grouping rules
starredLimit: 8,                              // rows in ~/starred
excludeStarred: ["owner/name"]                // hide specific starred repos
```

Add a repo → it shows up on the next page load. No HTML editing required.

## Other files

- `index.html` — page skeleton (hero, sections, palette overlay)
- `styles.css` — design tokens (Campbell-Vivid palette from `wezterm.lua`) at the top under `:root`
- `script.js` — CONFIG + all behavior
- `404.html` — custom not-found page

## Deploy

Push to `main` and GitHub Pages rebuilds automatically (takes ~1 minute).

## Colors

From `wezterm.lua` (Campbell-Vivid):

| Token | Hex |
|---|---|
| background | `#0C0C0C` |
| panel | `#1A1A1A` |
| border | `#3A3A3A` |
| text | `#E8E8E8` |
| green | `#23F00F` |
| cyan | `#79EAEA` |
| blue | `#4D8FFF` |
| yellow | `#FFEE58` |
| red | `#FF5561` |
