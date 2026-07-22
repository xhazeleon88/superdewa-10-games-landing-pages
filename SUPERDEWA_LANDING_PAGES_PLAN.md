# Superdewa 10 Landing Sites - Research and Build Plan

## 1. Goal

Create 10 modern minimalist static HTML landing-site clusters for Superdewa, all in Bahasa Indonesia with a Gen Z tone, SEO-friendly structure, and at least 50 indexable pages per domain.

Target domains:

1. `superdewa-slot.com` - Slot Glossaries and How to Play
2. `superdewa-pg.com` - PG Soft Games Guide
3. `superdewa-pp.com` - Pragmatic Play Games Guide
4. `superdewa-habanero.com` - Habanero Games Guide
5. `superdewa-microgaming.com` - Microgaming Games Guide
6. `superdewa-nolimit.com` - Nolimit City Games Guide
7. `superdewa-live.com` - Live Casino Games Tutorial
8. `superdewa-crash.com` - Crash Games Guide
9. `superdewa-sports.com` - Sportsbook Guide
10. `superdewa-play.com` - Responsible Gambling Guide

## 2. Research summary

### SEO direction

- Use a hub-and-spoke structure per domain: one strong homepage hub, topic category pages, and detailed long-tail article pages.
- Keep every important page within three clicks from the homepage through category cards, breadcrumbs, related reading blocks, and footer navigation.
- Use descriptive Indonesian URLs, canonical tags, meta titles, meta descriptions, Open Graph tags, and JSON-LD.
- Generate one `sitemap.xml` per domain with only canonical HTML URLs, plus a `robots.txt` pointing to that sitemap.
- Use `Article`, `BreadcrumbList`, and `Organization` JSON-LD. FAQ content can still be visible on-page, but FAQ rich results are no longer a Google Search feature as of 2026, so FAQ schema is not a priority.
- Avoid fake ranking promises, fake RTP guarantees, and "pasti menang" copy. This is important for user trust and compliance in a high-scrutiny gambling niche.

### Game/provider content findings

- PG Soft: mobile-first slots, portrait UX, cascading reels, multipliers, bonus buy, strong Southeast Asia theme fit.
- Pragmatic Play: Megaways, tumble/cascade mechanics, bonus buy, high-volatility guides, Big Bass/Sweet Bonanza/Gates-style educational content.
- Habanero: mobile-optimized slots, colorful themes, free spins, multipliers, expanding wilds, medium-to-high volatility, Jackpot Race style promos.
- Microgaming/Games Global: progressive jackpot education, Mega Moolah/WowPot style content, RTP trade-offs between standard slots and progressive pools.
- Nolimit City: xMechanics education, especially xWays, xNudge, xSplit, xBomb, xBet, and extreme volatility risk framing.
- Live casino: roulette, blackjack, baccarat, game shows, table limits, latency, dealer rules, disconnection policies, and responsible play.
- Crash games: rising multiplier, manual/auto cashout, RTP math, variance, provably fair explanation, and warnings against Martingale/chasing losses.
- Sportsbook: odds formats, moneyline, spread/handicap, totals, props, parlays, bankroll, vig, implied probability, and responsible betting.
- Responsible gambling: budget limits, cooling-off, self-exclusion, age gate, warning signs, myth busting, and help resources.

## 3. Logo and color note

The logo file is not present in the workspace yet. Once supplied, the implementation should sample the logo colors and update tokens. Until then, use this provisional Superdewa palette:

- `--color-night`: `#101423` for deep background
- `--color-royal`: `#5A35F0` for primary gradient
- `--color-gold`: `#FFC857` for CTA and highlights
- `--color-cyan`: `#38E8FF` for neon accents
- `--color-pink`: `#FF4FD8` for playful emphasis
- `--color-paper`: `#F8F7FF` for text panels
- `--color-ink`: `#161721` for body text

Design mood: modern minimalist, clean cards, soft gradients, bold but controlled game-y accents, plenty of whitespace, rounded sections, lightweight SVG illustrations.

## 4. Technical architecture

Recommended repo shape:

- `src/generate.mjs` - static site generator
- `src/templates/` - layout, article, category, sitemap, robots templates
- `src/content/sites/*.json` - site metadata, page inventory, SEO fields
- `src/assets/` - shared CSS, fonts, and SVG vectors
- `dist/<domain>/` - generated static HTML site per domain

Output per domain:

- `index.html`
- minimum 50 article/category pages
- `sitemap.xml`
- `robots.txt`
- `assets/styles.css`
- `assets/*.svg`

No database is needed. Static HTML is enough and cheaper to host.

## 5. HTML, CSS, and performance rules

- Use semantic HTML: `header`, `nav`, `main`, `article`, `section`, `aside`, `footer`, one `h1` per page, sequential headings.
- Use `<html lang="id">`.
- Use responsive CSS Grid/Flexbox with container-friendly card layouts.
- Inline or cache a tiny critical CSS block only if needed; otherwise one compressed stylesheet.
- Use SVG for decorative vectors and mark decorative SVGs with `aria-hidden="true"`.
- Add width/height to image assets when raster assets are later introduced.
- Use `content-visibility: auto` for long below-the-fold article sections.
- Keep JavaScript optional. Prefer no JS for core content, navigation, and sitemap discoverability.
- Self-host fonts as WOFF2 where licensing permits.

## 6. Font direction

Use a playful display + readable body pairing:

- Display: `Bungee`, `Lilita One`, or `Baloo 2`
- Body: `Plus Jakarta Sans`, `Inter`, or system sans-serif
- Numbers/data cards: `JetBrains Mono` or `Space Mono` for RTP, odds, volatility, and glossary cards

Final implementation should self-host only the chosen weights to reduce page weight.

## 7. SVG visual plan

Use cost-effective vector assets instead of expensive raster image generation:

- Create reusable SVG components programmatically or with low-cost vector prompt drafts, then clean by hand/template.
- One hero SVG family per domain:
  - Slot: glowing slot reel glossary board
  - PG Soft: mobile phone with candy/mahjong icons
  - Pragmatic Play: dynamic reels and multiplier sparks
  - Habanero: chili mascot and tropical cards
  - Microgaming: jackpot wheel and coin orbit
  - Nolimit City: neon city grid with xMechanics symbols
  - Live Casino: dealer table and streaming frame
  - Crash: rocket/multiplier curve with stop marker
  - Sportsbook: stadium ticket and odds board
  - Responsible Play: shield, balance scale, and limit controls

## 8. Content voice

Bahasa Indonesia style:

- Gen Z, relaxed, and punchy: "gas paham dulu", "jangan FOMO", "cek paytable dulu", "main santai, bukan ngejar balik modal".
- Still clear, editorial, and trustworthy.
- No claims like "auto menang", "pasti maxwin", or "trik rahasia menang".
- Each page should include a short responsible-play note where money risk is discussed.

## 9. SEO page model

Each domain gets:

- 1 homepage hub
- 5 category pages
- 45+ detailed guide pages
- Minimum total: 51 HTML pages per domain
- Total across 10 domains: minimum 510 HTML pages

Per-page SEO fields:

- `title` target: 45-60 characters where possible
- `meta description` target: 135-160 characters
- `h1` unique per page
- `canonical` absolute URL
- `og:title`, `og:description`, `og:url`, `og:type`
- `Article` JSON-LD for guide pages
- `BreadcrumbList` JSON-LD for all non-home pages
- `datePublished` and `dateModified`

## 10. Footer cross-link requirement

Every page on every domain will include:

Navigation title: `Superdewa Group`

Naked URL links:

- `https://superdewa-slot.com/`
- `https://superdewa-pg.com/`
- `https://superdewa-pp.com/`
- `https://superdewa-habanero.com/`
- `https://superdewa-microgaming.com/`
- `https://superdewa-nolimit.com/`
- `https://superdewa-live.com/`
- `https://superdewa-crash.com/`
- `https://superdewa-sports.com/`
- `https://superdewa-play.com/`

Risk note: sitewide reciprocal cross-linking can look manipulative if hidden or keyword-stuffed. Keeping naked URLs in a visible brand navigation block is the cleanest version of this requirement.

## 11. Domain page inventory plan

Each site will use the same count model, but domain-specific titles and slugs.

### `superdewa-slot.com`

Purpose: general slot glossary and beginner guide.

Page clusters:

- 1 homepage: `/`
- 10 glossary basics: `/glosarium/rtp-slot/`, `/glosarium/volatilitas-slot/`, `/glosarium/payline/`, `/glosarium/scatter/`, `/glosarium/wild/`, `/glosarium/free-spin/`, `/glosarium/bonus-buy/`, `/glosarium/jackpot-progresif/`, `/glosarium/max-win/`, `/glosarium/hit-frequency/`
- 10 how-to pages: `/cara-main-slot-online/`, `/cara-baca-paytable/`, `/cara-cek-rtp/`, `/cara-pilih-volatilitas/`, `/cara-atur-budget-slot/`, `/cara-main-demo-slot/`, `/cara-pakai-auto-spin/`, `/cara-baca-simbol-slot/`, `/cara-pahami-fitur-bonus/`, `/cara-berhenti-saat-rugi/`
- 10 mechanics pages: `/mekanik/cascade/`, `/mekanik/megaways/`, `/mekanik/cluster-pays/`, `/mekanik/hold-and-win/`, `/mekanik/expanding-wild/`, `/mekanik/sticky-wild/`, `/mekanik/multiplier/`, `/mekanik/respin/`, `/mekanik/ante-bet/`, `/mekanik/gamble-feature/`
- 10 strategy and safety pages: `/strategi/bet-kecil/`, `/strategi/session-limit/`, `/strategi/stop-loss/`, `/strategi/target-menang-realistis/`, `/strategi/hindari-martingale/`, `/strategi/variance/`, `/strategi/game-high-rtp/`, `/strategi/game-low-volatility/`, `/strategi/mobile-play/`, `/strategi/cek-lisensi/`
- 10 FAQ/comparison pages: `/faq/slot-itu-random/`, `/faq/rtp-bisa-diprediksi/`, `/faq/jackpot-vs-rtp/`, `/faq/demo-vs-real/`, `/faq/bonus-buy-worth-it/`, `/bandingkan/slot-vs-live-casino/`, `/bandingkan/slot-vs-crash/`, `/bandingkan/pg-vs-pragmatic/`, `/bandingkan/habanero-vs-microgaming/`, `/panduan/pemula-anti-fomo/`

Total: 51 pages.

### `superdewa-pg.com`

Purpose: PG Soft game and mechanic guide.

Page clusters:

- 1 homepage
- 10 provider basics: overview, mobile-first design, RTP guide, volatility guide, paytable guide, demo guide, bonus buy guide, cascade guide, free spins guide, multiplier guide
- 20 game guides: Mahjong Ways, Mahjong Ways 2, Fortune Tiger, Fortune Rabbit, Fortune Ox, Fortune Mouse, Lucky Neko, Wild Bandito, Treasures of Aztec, Dragon Hatch, Caishen Wins, Candy Bonanza, Ganesha Fortune, Queen of Bounty, Captain's Bounty, Thai River Wonders, Bikini Paradise, Gem Saviour, Honey Trap of Diao Chan, Werewolf's Hunt
- 10 comparison pages: PG Soft vs Pragmatic, PG Soft vs Habanero, mobile slots, Asian-theme slots, low-volatility picks, high-volatility picks, quick-session slots, feature buy picks, beginner picks, bankroll notes
- 10 FAQ/safety pages: RTP variants, operator configuration, bonus buy risk, volatility myths, free spin triggers, mobile data usage, demo limitations, session limits, stop-loss, responsible play

Total: 51 pages.

### `superdewa-pp.com`

Purpose: Pragmatic Play game and mechanic guide.

Page clusters:

- 1 homepage
- 10 provider basics: overview, RTP, volatility, Megaways, tumble, bonus buy, ante bet, free spins, multiplier, mobile guide
- 20 game guides: Gates of Olympus, Gates of Olympus 1000, Sweet Bonanza, Sweet Bonanza 1000, Starlight Princess, Starlight Princess 1000, Big Bass Bonanza, Big Bass Splash, The Dog House, The Dog House Megaways, Wolf Gold, Great Rhino Megaways, Buffalo King Megaways, Wild West Gold, Sugar Rush, Sugar Rush 1000, Madame Destiny Megaways, Fruit Party, Floating Dragon, Power of Thor Megaways
- 10 comparison pages: Megaways vs paylines, tumble vs cascade, bonus buy vs base game, high-volatility picks, beginner-friendly picks, Big Bass series, candy-style slots, mythology-style slots, mobile performance, RTP variants
- 10 FAQ/safety pages: RTP check, bonus buy rules, max win myths, scatter triggers, volatility, bankroll, session limits, chasing losses, demo mode, responsible play

Total: 51 pages.

### `superdewa-habanero.com`

Purpose: Habanero game and feature guide.

Page clusters:

- 1 homepage
- 10 provider basics: overview, RTP, volatility, mobile, paytable, free spins, expanding wilds, multipliers, Jackpot Race, table/video poker overview
- 20 game guides: Hot Hot Fruit, Koi Gate, Fa Cai Shen, Mystic Fortune Deluxe, Lucky Durian, Wild Trucks, Nuwa, Dragon's Throne, Taiko Beats, Calaveras Explosivas, Knockout Football, Egyptian Dreams Deluxe, 5 Lucky Lions, Before Time Runs Out, Santa's Village, Presto, Wizards Want War, Scopa, Hey Sushi, Marvelous Furlongs
- 10 comparison pages: Habanero vs PG Soft, Habanero vs Pragmatic, high-RTP titles, low-volatility picks, high-volatility picks, fruit themes, Asian themes, mobile sessions, feature-heavy slots, table games
- 10 FAQ/safety pages: RTP visibility, operator variants, bonus rounds, Jackpot Race rules, demo limits, volatility, bankroll, stop-loss, mobile play, responsible play

Total: 51 pages.

### `superdewa-microgaming.com`

Purpose: Microgaming/Games Global guide with jackpot education.

Page clusters:

- 1 homepage
- 10 provider basics: overview, Games Global note, RTP guide, volatility guide, progressive jackpot guide, fixed jackpot guide, paytable guide, demo guide, mobile guide, jackpot contribution guide
- 20 game guides: Mega Moolah, Mega Moolah Isis, Absolootly Mad Mega Moolah, WowPot, Immortal Romance, Thunderstruck II, Break da Bank Again, 9 Masks of Fire, Lara Croft Temples and Tombs, Book of Oz, Jurassic World, Game of Thrones, Lucky Twins, Lucky Leprechaun, Avalon II, Agent Jane Blonde, Basketball Star, Football Star, Tiki Mania, Fishin' Pots of Gold
- 10 comparison pages: progressive vs standard slots, jackpot RTP trade-off, Mega Moolah vs WowPot, old-school slots vs modern slots, medium volatility picks, jackpot bankroll, demo vs real jackpot, provider history, mobile performance, game filters
- 10 FAQ/safety pages: jackpot random triggers, max bet myths, RTP variants, jackpot contribution, bankroll risk, session limits, chasing jackpots, demo limitations, licensing checks, responsible play

Total: 51 pages.

### `superdewa-nolimit.com`

Purpose: Nolimit City xMechanics and volatility guide.

Page clusters:

- 1 homepage
- 10 mechanic basics: xWays, xNudge, xSplit, xBomb, xPays, xReel, xBet, volatility, RTP, bonus buy
- 20 game guides: San Quentin xWays, Tombstone RIP, Deadwood, Mental, Fire in the Hole, Punk Rocker, Disturbed, Remember Gulag, East Coast vs West Coast, Das xBoot, Serial, The Border, Bonus Bunnies, Blood and Shadow, Karen Maneater, True Kult, Folsom Prison, Brick Snake 2000, Barbarian Fury, Roadkill
- 10 comparison pages: xWays vs xNudge, xSplit vs xBomb, extreme volatility guide, Nolimit vs Pragmatic, Nolimit vs PG Soft, bonus buy risk, max win education, dark-theme slots, high-risk bankroll, demo learning
- 10 FAQ/safety pages: xMechanics explained, RTP variants, volatility warnings, bonus buy cost, feature triggers, max win myths, bankroll, stop-loss, when to quit, responsible play

Total: 51 pages.

### `superdewa-live.com`

Purpose: live casino tutorial.

Page clusters:

- 1 homepage
- 10 basics: live casino overview, live lobby, table limits, streaming latency, dealer rules, game providers, mobile live play, chat etiquette, disconnection policy, responsible live play
- 15 game tutorials: live blackjack, blackjack side bets, blackjack basic strategy, live roulette, European roulette, American roulette, baccarat, baccarat commission, dragon tiger, sic bo, live poker basics, casino hold'em, game shows, wheel games, live craps
- 10 comparison pages: blackjack vs baccarat, roulette wheel types, game shows vs table games, low house edge games, beginner tables, fast tables, side bets, mobile vs desktop, RNG vs live, limits and bankroll
- 15 FAQ/safety pages: table minimums, payout rules, void rounds, latency, dealer mistakes, card shuffling, shoe games, tipping/chat, observing rounds, bankroll, stop-loss, session timers, age limits, licensed operators, responsible play

Total: 51 pages.

### `superdewa-crash.com`

Purpose: crash games guide.

Page clusters:

- 1 homepage
- 10 basics: what is crash, multiplier, cashout, auto-cashout, RTP, house edge, provably fair, volatility, round phases, mobile play
- 15 strategy/math pages: low target, high target, 1.5x guide, 2x guide, 5x guide, expected value, probability formula, variance, bankroll, stop-loss, flat betting, Martingale warning, streak myths, emotional control, session tracking
- 10 game-format pages: Aviator-style games, rocket crash, plane crash, crypto crash, dual bet, leaderboard modes, bonus rounds, speed rounds, demo crash, instant crash
- 15 FAQ/safety pages: can crash be predicted, is auto-cashout safer, what is seed hash, what happens on disconnect, RTP variants, casino limits, fast rounds, chasing losses, bankroll size, one-percent rule, cooling-off, time limits, warning signs, responsible play, when to stop

Total: 51 pages.

### `superdewa-sports.com`

Purpose: sportsbook guide.

Page clusters:

- 1 homepage
- 10 basics: sportsbook overview, decimal odds, American odds, fractional odds, implied probability, vig, bankroll, bet slip, pre-match betting, live betting
- 15 bet type pages: moneyline, handicap/spread, totals, props, parlays, teasers, futures, outrights, correct score, double chance, draw no bet, Asian handicap, player props, same-game parlay, cashout
- 10 sport pages: football/soccer, basketball, tennis, badminton, MMA, boxing, esports, baseball, cricket, motorsport
- 15 FAQ/safety pages: odds movement, line shopping, closing line value, limits, void bets, settlement rules, injuries, live delay, chasing losses, unit sizing, tracking bets, stop-loss, deposit limits, cooling-off, responsible betting

Total: 51 pages.

### `superdewa-play.com`

Purpose: responsible gambling guide and trust hub.

Page clusters:

- 1 homepage
- 10 core safety pages: responsible gambling overview, set budget, set time limits, deposit limits, loss limits, cooling-off, self-exclusion, age gate, warning signs, getting help
- 10 education pages: RTP reality, house edge, volatility, random outcomes, gambler's fallacy, chasing losses, Martingale myth, near misses, bonus terms, bankroll as entertainment budget
- 10 tool pages: session checklist, personal limit worksheet, spending tracker, risk quiz, mood check, break timer guide, family conversation guide, account closure guide, support resources, emergency stop plan
- 10 vertical safety pages: slot safety, live casino safety, crash safety, sportsbook safety, jackpot safety, bonus buy safety, game show safety, mobile play safety, late-night play safety, social pressure safety
- 10 FAQ/trust pages: is gambling income, when to stop, how to spot harm, how to talk to support, what is self-exclusion, can strategies guarantee profit, how to read terms, how to verify license, how to protect minors, glossary of help terms

Total: 51 pages.

## 12. Sitemap and robots plan

For each domain:

- `sitemap.xml` includes all 51 canonical HTML URLs.
- `lastmod` uses the build date.
- `changefreq`:
  - homepage: `weekly`
  - category pages: `monthly`
  - evergreen guides: `monthly`
- `priority`:
  - homepage: `1.0`
  - category pages: `0.8`
  - detailed guides: `0.6`
- `robots.txt`:
  - `User-agent: *`
  - `Allow: /`
  - `Sitemap: https://<domain>/sitemap.xml`

## 13. Internal linking plan

Each page should include:

- Breadcrumb links.
- 3-5 contextual internal links per long-form page.
- Related guides block with 4 cards.
- Category hub link.
- Footer Superdewa Group links.

For cross-domain links, keep naked URLs only in the footer to satisfy the requirement without polluting article copy.

## 14. Compliance and trust plan

Because this is gambling-adjacent content:

- Add `18+` or appropriate age-gate messaging depending on jurisdiction.
- Add a responsible-play note in footer.
- Add "informasi edukasi, bukan jaminan menang" language.
- Add "cek aturan dan legalitas wilayah masing-masing" language.
- Avoid targeting minors, school language, or youth-coded visuals despite the Gen Z tone.
- Do not publish fake licenses, fake testing lab badges, or unverifiable claims.
- For provider names, include "tidak berafiliasi resmi" where appropriate if the sites are independent guides.

## 15. Implementation phases

1. Brand intake
   - Add logo file.
   - Extract final color palette.
   - Pick final fonts and SVG style.

2. Static generator
   - Build templates and shared components.
   - Build content schema validation.
   - Generate all 10 domain folders.

3. Content expansion
   - Fill 510+ pages with Indonesian SEO copy.
   - Keep title/meta/H1 unique.
   - Add page-specific responsible-play notes.

4. SEO assets
   - Generate `sitemap.xml` and `robots.txt` per domain.
   - Add canonical, OG, JSON-LD, breadcrumbs.

5. Design pass
   - Apply responsive layout.
   - Add SVG vector heroes and cards.
   - Tune typography and color contrast.

6. QA
   - Validate page counts.
   - Validate sitemap URLs.
   - Check all footer Superdewa Group links.
   - Check broken links.
   - Run HTML validation.
   - Run Lighthouse or equivalent on representative pages.

## 16. Testing plan for implementation

Automated checks:

- Assert each domain has at least 51 HTML files.
- Assert each sitemap has the same canonical URL count as generated HTML pages.
- Assert every HTML page contains:
  - one `h1`
  - canonical URL
  - meta description
  - `lang="id"`
  - footer heading `Superdewa Group`
  - all 10 naked Superdewa URLs
- Assert internal links resolve within each generated domain folder.
- Validate XML sitemap format.

Manual checks:

- Open one homepage and two article pages from at least three domains.
- Check mobile and desktop layout.
- Check visual consistency, readability, and contrast.
- Confirm content tone feels Bahasa Indonesia, modern, and not spammy.

## 17. Open items

- Logo is still needed for the final color palette.
- Deployment target is not defined yet.
- Legal/compliance requirements by target country should be confirmed before publishing gambling-related pages.
- Final content should verify game/provider facts and RTP values before publishing, because operators can configure different RTP variants.

