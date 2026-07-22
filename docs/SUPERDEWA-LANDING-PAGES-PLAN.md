# Superdewa — Rencana 10 Landing Page Hub

Dokumen riset + rencana eksekusi untuk membangun **10 situs panduan** Superdewa (HTML statis), masing-masing **≥ 50 halaman**, bahasa Indonesia Gen Z yang fun tapi tetap SEO-solid, desain modern-minimalis, aset SVG murah, dan link farm footer antar domain.

---

## 1. Ringkasan tujuan

| Item | Keputusan |
| --- | --- |
| Format | Pure HTML + CSS + SVG (tanpa framework berat) |
| Bahasa | Bahasa Indonesia — tone Gen Z santai, jelas, engaging |
| Volume | 10 situs × minimum 50 halaman = **≥ 500 halaman** |
| SEO | Pillar–cluster, title/meta unik, internal linking, FAQ schema, sitemap.xml |
| Desain | Modern minimalist, dark gaming aesthetic dari logo, SVG vector |
| Footer | Navigasi **“Superdewa Group”** + naked URL ke 10 domain |

Fokus konten: **edukasi & panduan** (cara main, istilah, mekanik provider, tips aman). Site #10 (Responsible Gambling) menjadi jangkar etika & E-E-A-T.

---

## 2. Analisis brand dari logo

Logo wordmark **SUPER** (biru) + petir kuning + **DEWA** (merah), italic bold, outline putih, latar hitam. Kesan: cepat, kompetitif, “superhero gaming”, high-contrast, mobile-first.

### 2.1 Palette inti (CSS variables)

```css
:root {
  /* Brand */
  --sd-blue-light: #5EC8FF;
  --sd-blue:       #2B9FE8;
  --sd-blue-deep:  #0B5FA8;
  --sd-red:        #E53945;
  --sd-red-deep:   #B71C2C;
  --sd-bolt:       #FFD400;
  --sd-bolt-glow:  #FFF59D;

  /* Neutrals */
  --sd-bg:         #07090F;
  --sd-bg-elev:    #101522;
  --sd-surface:    #161C2C;
  --sd-border:     #243049;
  --sd-text:       #F4F7FB;
  --sd-muted:      #9AA6BF;
  --sd-white:      #FFFFFF;

  /* Accents (site-tint, lihat §4) */
  --sd-accent:     var(--sd-blue);
  --sd-accent-2:   var(--sd-red);
}
```

**Aturan warna**

- Background gelap (bukan flat hitam polos): gunakan **radial glow biru/merah** + noise/grid subtle.
- CTA primer: gradient biru → cyan; CTA sekunder: outline merah atau bolt-yellow.
- Jangan default ke purple-indigo AI cliché; brand sudah punya biru + merah + kuning.
- Accent per-situs (tint) membedakan identitas tanpa pecah sistem.

### 2.2 Tipografi (game-y, fun, readable)

| Peran | Font | Alasan |
| --- | --- | --- |
| Display / H1–H2 | **Saira Condensed** atau **Orbitron** | Esports, slanted energy mirip logo |
| Body / UI | **Plus Jakarta Sans** | Modern, ramah ID, x-height bagus |
| Accent / angka / RTP | **Space Grotesk** | Teknis, “stats panel” feel |

Fallback stack: `"Saira Condensed", "Orbitron", system-ui` → hindari Inter/Roboto/Arial sebagai face utama.

### 2.3 Motion (2–3 intentional)

1. **Bolt flicker** singkat di logo/hero accent (CSS, bukan GIF berat).
2. **Scroll reveal** section (opacity + translateY).
3. **Hover lift** pada card navigasi internal (hanya di area interaksi).

Tidak ada parallax berat, glow berlapis, atau animasi yang ganggu CLS.

---

## 3. Daftar 10 situs & positioning

| # | Domain | Tema | Accent tint | Pillar keyword (contoh) |
| --- | --- | --- | --- | --- |
| 1 | `superdewa-slot.com` | Slot glossary & how to play | Bolt yellow + blue | `cara main slot`, `istilah slot` |
| 2 | `superdewa-pg.com` | PG Soft games guide | Cyan soft | `panduan PG Soft`, `game PG Soft` |
| 3 | `superdewa-pp.com` | Pragmatic Play guide | Red brand | `panduan Pragmatic Play` |
| 4 | `superdewa-habanero.com` | Habanero guide | Orange-amber | `panduan Habanero` |
| 5 | `superdewa-microgaming.com` | Microgaming guide | Teal | `panduan Microgaming` |
| 6 | `superdewa-nolimit.com` | Nolimit City guide | Hot pink-red | `panduan Nolimit City` |
| 7 | `superdewa-live.com` | Live casino tutorial | Deep red | `cara main live casino` |
| 8 | `superdewa-crash.com` | Crash games guide | Neon lime-yellow | `cara main crash game` |
| 9 | `superdewa-sports.com` | Sportsbook guide | Field green-blue | `panduan sportsbook` |
| 10 | `superdewa-play.com` | Responsible gambling | Calm blue-white | `bermain bertanggung jawab` |

Setiap situs = **satu topik utama** (silo), bukan dashboard campuran.

---

## 4. Arsitektur informasi (per situs ≥ 50 halaman)

### 4.1 Pola hub-and-spoke

```
/                       → Pillar homepage (hero + ringkasan + CTA cluster)
/panduan/               → Index panduan
/panduan/{slug}.html    → Artikel how-to / mekanik
/glosarium/             → Index istilah
/glosarium/{slug}.html  → Definisi istilah
/game/                  → Index game (jika relevan)
/game/{slug}.html       → Halaman per judul / tipe game
/tips/                  → Tips Gen Z / strategi ringan
/tips/{slug}.html
/faq/                   → FAQ cluster
/faq/{slug}.html        atau 1 halaman FAQ besar + beberapa turunan
/tentang.html           → Tentang hub edukasi Superdewa
/kontak.html            → Kontak / disclaimer
/sitemap.xml
/robots.txt
```

### 4.2 Kuota halaman (target aman: **55 halaman / situs**)

| Tipe | Qty | Catatan |
| --- | --- | --- |
| Homepage pillar | 1 | Brand + H1 SEO + CTA |
| Glosarium istilah | 18–22 | 1 istilah / halaman + index |
| Panduan how-to | 12–15 | Langkah, mekanik, “cara baca RTP”, dll. |
| Game / tipe game | 10–14 | Judul populer / kategori |
| Tips & bankroll | 5–7 | Tone santai, non-clickbait bohong |
| FAQ / tentang / kontak | 3–5 | Schema FAQ di beberapa halaman |
| **Total** | **≥ 55** | Buffer di atas minimum 50 |

Semua 10 situs mengikuti **template struktur yang sama**, isi & keyword beda per silo.

### 4.3 Matriks konten singkat per situs

**1 — Slot Glossary (`superdewa-slot.com`)**  
Istilah: RTP, volatilitas, payline, scatter, wild, free spin, buy feature, megaways, progressive, dll.  
How-to: cara baca tabel bayaran, cara atur bet, demo vs real, pola mental Gen Z “main santai”.

**2 — PG Soft**  
Mahjong Ways, Lucky Neko, Treasures of Aztec, Wild Bandito, mekanik cascading, multiplier trail.

**3 — Pragmatic Play**  
Gates of Olympus, Sweet Bonanza, Starlight Princess, sugar rush, volatility tips, fitur tumble.

**4 — Habanero**  
Hot Hot Fruit, Koi Gate, Fa Cai Shen, klasik vs modern, vibe retro-arcade.

**5 — Microgaming**  
Mega Moolah family, Immortal Romance, cascading classics, jackpot network edukasi.

**6 — Nolimit City**  
Mental, Tombstone, Fire in the Hole, xNudge / xWays / xBet dijelaskan Gen Z-friendly.

**7 — Live Casino**  
Roulette, baccarat, blackjack, game show (Crazy Time style edukasi), etiket meja, speed vs classic.

**8 — Crash**  
Aviator-style mechanics (edukasi generik), cash-out timing mindset, risk curve, auto cash-out.

**9 — Sportsbook**  
Odds decimal, handicap, over/under, parlay, live bet, bankroll olahraga, istilah “odds value”.

**10 — Responsible Gambling**  
Batas deposit/waktu, self-exclusion konsep, tanda problem gambling, tips Gen Z “main buat hiburan”, hotline/resources generik, link ke semua hub edukasi.

---

## 5. Strategi copy: Gen Z × SEO

### 5.1 Tone of voice

- Santai, jujur, “ngobrol bareng temen” — bukan formal koran, bukan spam “MAXWIN PASTI”.
- Campur istilah gaul ringan (*literally*, *no cap*, *worth it*, *gas*, *chill*) **tanpa membanjiri** setiap kalimat.
- Edukatif dulu; hiburan kedua. Hindari klaim kemenangan pasti.
- CTA lembut: “Pelajari dulu”, “Cek glosarium”, “Simpan tips ini”.

Contoh H1 (bukan final copy):

> **Slot 101 buat yang baru start** — istilah wajib biar gak bingung pas spin pertama.

### 5.2 SEO on-page (setiap halaman)

- `<title>` unik ≤ ~60 karakter, keyword depan + brand soft.
- Meta description 140–160 karakter, hook Gen Z + benefit.
- 1× H1; H2/H3 skannable; paragraf pendek (≤ 3 baris).
- Keyword utama di: title, H1, intro, 1 H2, alt SVG, URL slug.
- Internal links: pillar ↔ cluster; cluster ↔ cluster related; footer group.
- `lang="id"`, canonical self, Open Graph dasar.
- JSON-LD: `WebSite` + `Organization` di home; `Article` / `FAQPage` / `DefinedTerm` di cluster.

### 5.3 SEO “fun & engaging”

- Judul yang conversational: “RTP itu apaan sih?” bukan hanya “Pengertian RTP”.
- Snippet-friendly: box definisi 40–55 kata di atas fold glosarium.
- Tabel ringkas (RTP range, volatilitas) untuk featured snippet.
- FAQ “yang orang sering nanya” di akhir artikel.
- Breadcrumb visual + schema.

### 5.4 Keyword seed (contoh arah riset)

| Situs | Seed primer | Long-tail contoh |
| --- | --- | --- |
| Slot | cara main slot, istilah slot | arti scatter slot, volatilitas tinggi artinya |
| PG Soft | panduan PG Soft | cara main Mahjong Ways, fitur cascading PG Soft |
| PP | panduan Pragmatic Play | cara main Gates of Olympus, tumble Pragmatic |
| Habanero | slot Habanero | Koi Gate cara main |
| Microgaming | Microgaming jackpot | Mega Moolah apa itu |
| Nolimit | Nolimit City guide | xNudge artinya |
| Live | cara main live casino | baccarat pemula |
| Crash | cara main crash game | auto cash out crash |
| Sports | panduan sportsbook | arti handicap Asian |
| Play | bermain bertanggung jawab | batasi waktu main game |

---

## 6. Desain UI (modern minimalist, pretty)

### 6.1 First viewport (hero budget)

Satu komposisi, bukan dashboard:

1. Brand logo (hero-level, bukan cuma nav kecil)
2. Satu headline
3. Satu supporting sentence
4. Satu CTA group (2 tombol max)
5. Satu visual dominan: SVG full-bleed / background plane (bukan card inset)

Tidak ada: stat strip, badge floating, promo sticker, schedule, multi-card hero.

### 6.2 Layout section (satu job / section)

- **Apa ini** — penjelasan singkat silo
- **Glosarium cepat** — list link istilah (bukan card berat)
- **Cara mulai** — 3 langkah tipografi + ikon SVG
- **Pilihan panduan** — grid navigasi (interaksi → boleh “card” ringan)
- **FAQ** — accordion sederhana
- **Footer Superdewa Group**

### 6.3 Komponen bersama

- `site.css` design tokens + layout
- `site-{n}.css` accent override tipis
- Nav sticky minimal (logo + 4–5 link)
- Breadcrumb
- Definition callout
- Tip callout (“Pro tip chill”)
- Disclaimer bar (edukasi, 18+)

### 6.4 SVG strategy (cost-effective & pretty)

- Semua ilustrasi **hand-authored SVG** (inline atau `/assets/svg/`), bukan stock foto.
- Set ikon 24×24 stroke: wild, scatter, chip, ball, chart, shield, bolt.
- Hero illustration per situs: 1 scene vector (slot reel, PG mahjong tile stylized, dice, plane crash curve, stadium, shield responsible).
- Logo Superdewa: recreate sebagai SVG akurat dari palette biru/merah/petir.
- Optimasi: viewBox bersih, tanpa filter berlebih, `currentColor` untuk ikon UI.

Model “murah”: generate SVG lewat kode/template (bukan API image mahal). Konsisten geometri rounded + gradient brand.

---

## 7. Footer link farm — Superdewa Group

Wajib di **setiap halaman** semua situs:

```html
<footer class="site-footer">
  <nav class="group-nav" aria-labelledby="sd-group-title">
    <h2 id="sd-group-title">Superdewa Group</h2>
    <ul>
      <li><a href="https://superdewa-slot.com/">https://superdewa-slot.com/</a></li>
      <li><a href="https://superdewa-pg.com/">https://superdewa-pg.com/</a></li>
      <li><a href="https://superdewa-pp.com/">https://superdewa-pp.com/</a></li>
      <li><a href="https://superdewa-habanero.com/">https://superdewa-habanero.com/</a></li>
      <li><a href="https://superdewa-microgaming.com/">https://superdewa-microgaming.com/</a></li>
      <li><a href="https://superdewa-nolimit.com/">https://superdewa-nolimit.com/</a></li>
      <li><a href="https://superdewa-live.com/">https://superdewa-live.com/</a></li>
      <li><a href="https://superdewa-crash.com/">https://superdewa-crash.com/</a></li>
      <li><a href="https://superdewa-sports.com/">https://superdewa-sports.com/</a></li>
      <li><a href="https://superdewa-play.com/">https://superdewa-play.com/</a></li>
    </ul>
  </nav>
  <p class="disclaimer">Konten edukasi. Main bijak, batasi waktu & budget. 18+.</p>
</footer>
```

- Anchor text = **naked URL** (sesuai brief).
- Judul navigasi persis: **Superdewa Group**.
- Domain aktif di list boleh `aria-current="page"` atau class `is-current`.

---

## 8. Sitemap & teknis SEO

### 8.1 Per situs

- `sitemap.xml` — semua URL absolut `https://{domain}/...`
- `robots.txt` — `Allow: /` + `Sitemap: https://{domain}/sitemap.xml`
- `404.html` branded ringan
- Optional: `manifest` tidak perlu; fokus crawlability

### 8.2 Struktur repo

```
/workspace
  /docs
    SUPERDEWA-LANDING-PAGES-PLAN.md   ← dokumen ini
    CONTENT-MATRIX.md                 ← daftar 55 slug × 10 situs
  /shared
    /css/tokens.css
    /css/base.css
    /css/components.css
    /svg/logo-superdewa.svg
    /svg/icons/*.svg
    /partials/footer-group.html       ← referensi (di-build ke tiap page)
  /sites
    /superdewa-slot.com/ ...
    /superdewa-pg.com/ ...
    ... (10 folders)
  /scripts
    build-pages.mjs                   ← generator HTML dari template + markdown/JSON
    build-sitemaps.mjs
```

Karena volume ≥ 500 file, **generator script** wajib agar konsisten SEO tags, footer, nav, dan sitemap.

---

## 9. Accessibility & performa

- Kontras teks ≥ WCAG AA di dark UI.
- Fokus keyboard visible (outline bolt-yellow).
- `prefers-reduced-motion` mematikan bolt flicker & reveal.
- Font via Google Fonts dengan `display=swap` atau self-host subset latin + latin-ext (penting untuk Bahasa Indonesia: é jarang, tapi tanda baca OK).
- Hero SVG lazy-safe; LCP = logo/teks, bukan image berat.
- Tidak ada layout shift dari font/ikon.

---

## 10. Compliance & editorial guardrails

- Frame sebagai **panduan edukasi / hiburan**, bukan ajakan ilegal.
- Hindari: jaminan menang, “pola gacor pasti”, tipu-tipu deposit.
- Sertakan disclaimer 18+ di footer.
- Site #10 wajib menonjolkan kontrol diri, batas waktu/uang, dan sinyal bahaya.
- Nama provider (PG Soft, Pragmatic, dll.) dipakai untuk **edukasi mekanik**; jangan klaim kemitraan resmi kecuali ada aset resmi.

---

## 11. Rencana implementasi (teknis, berurutan)

### Fase A — Fondasi design system
1. SVG logo akurat dari brief warna.
2. `tokens.css` + tipografi + base layout.
3. Komponen: header, hero, definition, tips, FAQ, footer group.
4. 1 prototype homepage (Slot) untuk validasi look & feel.

### Fase B — Content matrix
1. Finalisasi **55 slug** per situs di `CONTENT-MATRIX.md`.
2. Seed keyword + title + meta per slug (spreadsheet JSON).
3. Outline H2 per template tipe (glossary / how-to / game / tips).

### Fase C — Generator & batch write
1. Script template → HTML.
2. Generate situs #1 penuh (≥ 55) + sitemap + robots.
3. Clone struktur ke situs #2–#10 dengan content packs berbeda.
4. Cross-check footer naked URLs di semua halaman.

### Fase D — QA
1. Hitungan file HTML ≥ 50 per folder.
2. Validasi sitemap URL count.
3. Mobile + desktop visual check homepage tiap situs.
4. Link checker internal + footer farm.
5. Lint HTML dasar (title unik, 1 H1, lang=id).

### Fase E — Ship
1. Commit bertahap per situs atau per batch.
2. PR dengan preview struktur & catatan deploy (static host per domain).

---

## 12. Definition of Done

- [ ] 10 folder domain, masing-masing ≥ 50 HTML
- [ ] `sitemap.xml` + `robots.txt` per domain
- [ ] Bahasa Indonesia Gen Z + SEO on-page lengkap
- [ ] Design system dark modern-minimalist dari palette logo
- [ ] SVG logo + ilustrasi/ikon vector (tanpa aset foto mahal)
- [ ] Font combo game-y (Saira/Orbitron + Plus Jakarta Sans + Space Grotesk)
- [ ] Footer **Superdewa Group** + naked URL ke 10 domain di setiap halaman
- [ ] Site Responsible Gambling lengkap & saling tertaut
- [ ] Dokumentasi matrix konten di `/docs`

---

## 13. Risiko & mitigasi

| Risiko | Mitigasi |
| --- | --- |
| 500+ halaman duplikat tipis | Template beda intro/H2/contoh; unik title+meta; entity terms jelas |
| Thin content glosarium | Min. 350–500 kata / istilah + contoh + FAQ mini |
| Brand logo file hilang di repo | Recreate SVG dari palette & siluet yang sudah dianalisis |
| Tone Gen Z jadi cringe | Batasi slang; utamakan kejelasan; review sample 5 halaman |
| Crawl trap footer | Footer OK (10 link tetap); jangan duplicate sitewide spam di body |

---

## 14. Keputusan yang sudah dikunci

1. **Visual direction:** dark + blue/red/bolt-yellow (dari logo), minimalis tapi expressive.
2. **Stack:** static HTML/CSS/SVG + Node generator.
3. **IA:** pillar–cluster, ≥ 55 pages/site.
4. **Footer:** judul “Superdewa Group”, naked URLs.
5. **Copy:** ID Gen Z edukatif, SEO fun (judul conversational + snippet boxes).
6. **Images:** SVG only, cost-effective, brand-consistent.

---

## 15. Next step setelah approve plan

Mulai **Fase A**: recreate logo SVG, tokens, prototype homepage `superdewa-slot.com`, lalu `CONTENT-MATRIX.md` penuh untuk 10 situs sebelum batch generate.

Jika ada aset logo file asli (PNG/SVG), taruh di `/assets/brand/` agar recreate SVG 1:1 lebih akurat; sementara palette & siluet dari logo yang dibagikan sudah cukup untuk mulai.
