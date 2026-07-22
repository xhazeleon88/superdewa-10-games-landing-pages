# Superdewa — 10 Games Landing Page Hubs

Static HTML educational hubs for the Superdewa Group (Bahasa Indonesia, Gen Z voice, SEO-ready).

## Domains

| Site | Theme |
| --- | --- |
| `sites/superdewa-slot.com` | Slot glossary & how to play |
| `sites/superdewa-pg.com` | PG Soft games guide |
| `sites/superdewa-pp.com` | Pragmatic Play games guide |
| `sites/superdewa-habanero.com` | Habanero games guide |
| `sites/superdewa-microgaming.com` | Microgaming games guide |
| `sites/superdewa-nolimit.com` | Nolimit City games guide |
| `sites/superdewa-live.com` | Live casino tutorial |
| `sites/superdewa-crash.com` | Crash games guide |
| `sites/superdewa-sports.com` | Sportsbook guide |
| `sites/superdewa-play.com` | Responsible gambling guide |

Each site ships **60 HTML pages**, `sitemap.xml`, and `robots.txt`.

## Build

```bash
npm run build
```

Content packs live in `scripts/sites-data.mjs`. Generator: `scripts/build.mjs`.
Shared design system: `shared/css`, `shared/svg`.

## Design

- Brand palette from Superdewa logo: blue / red / bolt yellow on dark
- Fonts: Saira Condensed + Orbitron + Plus Jakarta Sans + Space Grotesk
- SVG logo + hero illustrations (no paid stock images)
- Footer nav **Superdewa Group** with naked URL link farm across all 10 domains

## Docs

- `docs/SUPERDEWA-LANDING-PAGES-PLAN.md`
- `docs/CONTENT-MATRIX.md`
