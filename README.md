# QMahyar.github.io

Personal site — plain HTML/CSS/JS, no build step. Served from this repo via GitHub Pages.

**URL:** https://QMahyar.github.io

## Sections

- `~/about` — bio + live GitHub metrics (repos, stars, followers, following, joined) and ASCII language bars, fetched from the GitHub API on load
- `~/projects` — all projects, grouped; ✦ = featured with feature highlights; the grep box filters them live
- `~/stack` — languages, platforms, areas
- `~/recent` — 5 most recently pushed repos (live from the API)
- `~/contact` — links
- **Command palette** — press `/` or `Ctrl+K` anywhere; `help` lists commands

## Edit

- `index.html` — content. Projects live in `#projects`; copy/delete an `<article class="project">` block to add/remove one. `data-name`/`data-tags` feed the grep filter.
- `styles.css` — design tokens (Campbell-Vivid palette from `wezterm.lua`) at the top under `:root`.
- `script.js` — typewriter script, API fetching, grep filter, and `PALETTE` commands.
- `404.html` — custom not-found page.

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
