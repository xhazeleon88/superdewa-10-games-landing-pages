#!/usr/bin/env node
/**
 * Superdewa static site generator
 * Builds 10 domains × ≥50 HTML pages + sitemap.xml + robots.txt
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sites, GROUP_URLS } from "./sites-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITES_DIR = path.join(ROOT, "sites");
const SHARED = path.join(ROOT, "shared");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, "utf8");
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function assetPrefix(depth) {
  return depth <= 0 ? "assets" : "../".repeat(depth) + "assets";
}

function homeHref(depth) {
  return depth <= 0 ? "index.html" : "../".repeat(depth) + "index.html";
}

function rel(depth, target) {
  if (depth <= 0) return target.replace(/^\//, "");
  return "../".repeat(depth) + target.replace(/^\//, "");
}

function titleCaseLabel(label) {
  return label;
}

function expandItem([slug, label, keyword], kind, site) {
  const topic = site.topic;
  const h1Map = {
    glossary: `${label}: artinya apa, biar gak cuma dengerin doang`,
    guide: `${label} — panduan santai tapi ngena`,
    game: `${label}: breakdown biar mainnya lebih sadar`,
    tip: `Tips: ${label}`,
  };
  const dekMap = {
    glossary: `Penjelasan ${label} di dunia ${topic} dengan bahasa Gen Z yang jelas, plus contoh biar nempel di kepala.`,
    guide: `Step-by-step ${label} buat kamu yang pengen paham mekanik ${topic} tanpa drama overclaim.`,
    game: `Kupasan ${label}: vibe, mekanik inti, dan cara approach yang lebih sehat.`,
    tip: `Tips praktis soal ${label} biar session ${topic} kamu tetap terkendali.`,
  };
  return {
    slug,
    label,
    keyword,
    kind,
    title: `${label} | ${site.name} Superdewa`,
    h1: h1Map[kind],
    dek: dekMap[kind],
    blurb: `${label} adalah bagian penting dalam pemahaman ${topic} yang dibahas secara edukatif di Superdewa.`,
  };
}

function relatedLinks(site, current, depth) {
  const pool = [
    ...site.glossaries.map((x) => ({ ...expandItem(x, "glossary", site), href: `glosarium/${x[0]}.html` })),
    ...site.guides.map((x) => ({ ...expandItem(x, "guide", site), href: `panduan/${x[0]}.html` })),
    ...site.games.map((x) => ({ ...expandItem(x, "game", site), href: `game/${x[0]}.html` })),
    ...site.tips.map((x) => ({ ...expandItem(x, "tip", site), href: `tips/${x[0]}.html` })),
  ].filter((p) => p.slug !== current.slug);

  // deterministic pseudo-random pick
  let seed = [...current.slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  const picks = [];
  const used = new Set();
  while (picks.length < 5 && picks.length < pool.length) {
    seed = (seed * 9301 + 49297) % 233280;
    const idx = seed % pool.length;
    if (!used.has(idx)) {
      used.add(idx);
      picks.push(pool[idx]);
    }
  }
  return picks
    .map(
      (p) =>
        `<a class="link-card" href="${rel(depth, p.href)}"><strong>${esc(p.label)}</strong><span>${esc(p.dek)}</span></a>`
    )
    .join("\n");
}

function proseFor(item, site) {
  const { label, kind, keyword } = item;
  const topic = site.topic;
  const paragraphs = [];

  paragraphs.push(
    `<p>Kalau kamu sering denger istilah <strong>${esc(label)}</strong> pas ngobrolin ${esc(topic)}, tapi masih “hmm… apaan tuh?”, page ini buat kamu. Kita bahas santai, tetap SEO-clear, tanpa gaya guru galak.</p>`
  );

  paragraphs.push(`<div class="def-box"><strong>Definisi cepat</strong><p>${esc(item.blurb)} Singkatnya: ini konsep yang bantu kamu baca situasi sebelum keputusan impulsif muncul.</p></div>`);

  if (kind === "glossary") {
    paragraphs.push(`<h2>Kenapa ${esc(label)} penting?</h2>`);
    paragraphs.push(
      `<p>Karena banyak orang main dulu, paham belakangan. Padahal ngerti <em>${esc(keyword)}</em> itu ngebantu kamu set ekspektasi. Bukan buat ngejar “pola rahasia”, tapi biar kamu sadar lagi main game tipe apa.</p>`
    );
    paragraphs.push(`<h2>Cara ngerasain konsep ini di game</h2>`);
    paragraphs.push(
      `<ol><li>Buka info/paytable atau aturan ringkas dulu.</li><li>Cari bagian yang nyebut ${esc(label)} atau konsep sejenis.</li><li>Bandingin sama budget & mood kamu hari ini.</li><li>Baru putuskan mau lanjut, ganti game, atau istirahat.</li></ol>`
    );
    paragraphs.push(`<h2>Salah paham yang sering kejadian</h2>`);
    paragraphs.push(
      `<p>Salah paham klasik: menganggap ${esc(label)} sebagai jaminan hasil. Nope. Di ${esc(topic)}, angka dan fitur itu kerangka probabilitas, bukan ramalan harian. Kalau ada yang bilang “pasti”, itu red flag.</p>`
    );
    paragraphs.push(`<h2>Contoh mindset yang lebih sehat</h2>`);
    paragraphs.push(
      `<p>“Oke, aku paham ${esc(label)}. Berarti session ini aku batasi waktu & budget.” Itu vibe yang kita dorong di Superdewa — gen Z cool, tapi tetap waras.</p>`
    );
  } else if (kind === "guide") {
    paragraphs.push(`<h2>Sebelum mulai</h2>`);
    paragraphs.push(
      `<p>Siapkan tiga hal: budget hiburan yang rela hilang, timer session, dan niat “belajar mekanik” bukan “balas dendam”. ${esc(label)} jadi jauh lebih berguna kalau otaknya masih fresh.</p>`
    );
    paragraphs.push(`<h2>Langkah praktis</h2>`);
    paragraphs.push(
      `<ol><li>Pahami tujuan page ini: ${esc(label)} dalam konteks ${esc(topic)}.</li><li>Cek aturan / info game terkait keyword <strong>${esc(keyword)}</strong>.</li><li>Coba ritme pelan di awal — jangan langsung max bet.</li><li>Evaluasi tiap 10–15 menit: masih seru atau udah tilt?</li><li>Stop sesuai rencana, meski lagi “kerasa hoki”.</li></ol>`
    );
    paragraphs.push(`<h2>Yang sebaiknya dihindari</h2>`);
    paragraphs.push(
      `<ul><li>Naikkan taruhan habis kalah streak.</li><li>Percaya mitos jam/pola tanpa dasar.</li><li>Main sambil capek atau emosi.</li><li>Pinjam uang buat “satu kali lagi”.</li></ul>`
    );
    paragraphs.push(`<div class="tip-box"><strong>Pro tip chill</strong><p>Screenshot atau catat hasil session. Otak suka lupa kerugian dan cuma inget momen menang. Catatan jujur = self-awareness.</p></div>`);
  } else if (kind === "game") {
    paragraphs.push(`<h2>Vibe ${esc(label)}</h2>`);
    paragraphs.push(
      `<p>${esc(label)} masuk radar karena karakternya yang khas di ekosistem ${esc(topic)}. Sebelum kejar highlight orang lain di TL, pahami dulu tempo & fitur intinya.</p>`
    );
    paragraphs.push(`<h2>Mekanik yang perlu kamu scan</h2>`);
    paragraphs.push(
      `<ul><li>Cara menang dasar (line, ways, cluster, odds, cash-out — tergantung jenis).</li><li>Fitur bonus / momen “spike” yang bikin adrenalina naik.</li><li>Volatilitas atau ritme risiko secara kasar.</li><li>Info max potential vs realita session pendek.</li></ul>`
    );
    paragraphs.push(`<h2>Approach recommended</h2>`);
    paragraphs.push(
      `<p>Mulai kecil. Baca dulu. Kalau ${esc(label)} terasa terlalu liar buat mood kamu hari ini, switch. Itu bukan “lemah” — itu melek risiko. Keyword yang sering dicari orang: <strong>${esc(keyword)}</strong>.</p>`
    );
    paragraphs.push(`<h2>Kapan sebaiknya skip</h2>`);
    paragraphs.push(
      `<p>Skip kalau kamu lagi kejar rugi, belum set batas, atau cuma FOMO karena konten orang lain. ${esc(topic)} itu hiburan — kalau udah kerasa pekerjaan emosional, istirahat.</p>`
    );
  } else {
    paragraphs.push(`<h2>Kenapa tips ini worth it</h2>`);
    paragraphs.push(
      `<p>${esc(label)} kedengerannya simpel, tapi impact-nya ke session ${esc(topic)} bisa gede. Kebiasaan kecil > “strategi rahasia”.</p>`
    );
    paragraphs.push(`<h2>Cara apply hari ini</h2>`);
    paragraphs.push(
      `<ol><li>Tulis batas sebelum mulai (waktu + uang).</li><li>Terapkan ${esc(label)} sebagai aturan non-negotiable.</li><li>Kalau dilanggar, session selesai — no debate.</li></ol>`
    );
    paragraphs.push(`<div class="tip-box"><strong>Reminder</strong><p>Kalau tips terasa “ribet”, itu biasanya karena otak lagi pengen impuls. Balik ke niat awal: hiburan terkendali.</p></div>`);
  }

  paragraphs.push(`<h2>FAQ singkat soal ${esc(label)}</h2>`);
  paragraphs.push(`<div class="faq">
    <details open><summary>Apakah ${esc(label)} bikin menang terus?</summary><p>Tidak. Ini kerangka pemahaman, bukan mesin printer uang. Hasil tetap berisiko.</p></details>
    <details><summary>Harus hafal semua istilah ${esc(topic)} dulu?</summary><p>Enggak. Hafalin yang sering muncul, lalu belajar bertahap lewat glosarium Superdewa.</p></details>
    <details><summary>Cocok buat pemula?</summary><p>Ya — page ini memang disusun biar pemula gak overwhelm, tapi tetap hormati risiko.</p></details>
  </div>`);

  paragraphs.push(
    `<p>Mau lanjut eksplor? Cek glosarium & panduan lain di hub <strong>${esc(site.name)}</strong>, atau loncat ke jaringan edukasi di footer Superdewa Group.</p>`
  );

  return paragraphs.join("\n");
}

function layout({ site, depth, title, description, canonical, heading, body, schema, activeNav }) {
  const assets = assetPrefix(depth);
  const home = homeHref(depth);
  const group = GROUP_URLS.map((url) => {
    const current = url.includes(site.domain);
    return `<li><a href="${url}"${current ? ' aria-current="page"' : ""}>${url}</a></li>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(site.keyword)}">
  <link rel="canonical" href="${esc(canonical)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(canonical)}">
  <meta name="theme-color" content="#07090F">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Plus+Jakarta+Sans:wght@400;600;700&family=Saira+Condensed:wght@600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${assets}/css/site.css">
  ${schema ? `<script type="application/ld+json">${schema}</script>` : ""}
</head>
<body class="${site.accent}">
  <header class="site-header">
    <div class="wrap nav-row">
      <a class="brand-link" href="${home}" aria-label="Superdewa home">
        <img src="${assets}/svg/logo-superdewa.svg" width="200" height="38" alt="Superdewa">
      </a>
      <ul class="nav-links">
        <li><a href="${rel(depth, "glosarium/index.html")}"${activeNav === "glosarium" ? ' aria-current="page"' : ""}>Glosarium</a></li>
        <li><a href="${rel(depth, "panduan/index.html")}"${activeNav === "panduan" ? ' aria-current="page"' : ""}>Panduan</a></li>
        <li><a href="${rel(depth, "game/index.html")}"${activeNav === "game" ? ' aria-current="page"' : ""}>Topik</a></li>
        <li><a href="${rel(depth, "tips/index.html")}"${activeNav === "tips" ? ' aria-current="page"' : ""}>Tips</a></li>
        <li><a href="${rel(depth, "faq.html")}"${activeNav === "faq" ? ' aria-current="page"' : ""}>FAQ</a></li>
      </ul>
    </div>
  </header>
  <main>
    ${body}
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <nav class="group-nav" aria-labelledby="sd-group-title">
        <h2 id="sd-group-title">Superdewa Group</h2>
        <ul>
          ${group}
        </ul>
      </nav>
      <p class="disclaimer">Konten edukasi Superdewa (${esc(site.nav)}). Main bijak, batasi waktu & budget. 18+. Bukan jaminan kemenangan.</p>
    </div>
  </footer>
</body>
</html>`;
}

function buildHome(site) {
  const depth = 0;
  const canonical = `https://${site.domain}/`;
  const gCards = site.glossaries
    .slice(0, 6)
    .map(([slug, label]) => `<a class="link-card" href="glosarium/${slug}.html"><strong>${esc(label)}</strong><span>Arti & contoh biar langsung kebayang.</span></a>`)
    .join("\n");
  const guideCards = site.guides
    .slice(0, 6)
    .map(([slug, label]) => `<a class="link-card" href="panduan/${slug}.html"><strong>${esc(label)}</strong><span>Step-by-step yang enak diikutin.</span></a>`)
    .join("\n");

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: canonical,
    description: site.pillarDek,
    inLanguage: "id",
    publisher: { "@type": "Organization", name: "Superdewa", url: canonical },
  });

  const body = `
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="reveal">
        <img class="hero-brand" src="assets/svg/logo-superdewa.svg" width="420" height="80" alt="Superdewa">
        <h1>${esc(site.pillarH1)}</h1>
        <p class="hero-lead">${esc(site.pillarDek)}</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="glosarium/index.html">Buka Glosarium</a>
          <a class="btn btn-secondary" href="panduan/index.html">Lihat Panduan</a>
        </div>
      </div>
      <div class="hero-art reveal" aria-hidden="true">
        <img src="assets/svg/heroes/${site.hero}" width="520" height="360" alt="">
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>Apa ini?</h2>
        <p>${esc(site.about)} Fokusnya edukasi — biar kamu melek istilah, bukan kejar janji palsu.</p>
      </div>
      <div class="steps">
        <div class="step"><h3>Pahami istilah</h3><p>Glosarium biar keyword gak cuma lewat di telinga.</p></div>
        <div class="step"><h3>Ikuti panduan</h3><p>Step praktis buat approach yang lebih sehat.</p></div>
        <div class="step"><h3>Main dengan batas</h3><p>Timer + budget. Seru boleh, dramatize jangan.</p></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>Glosarium cepat</h2>
        <p>Istilah yang paling sering bikin pemula bingung — langsung klik.</p>
      </div>
      <div class="link-grid">${gCards}</div>
      <p style="margin-top:1rem"><a href="glosarium/index.html">Lihat semua istilah →</a></p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>Panduan pilihan</h2>
        <p>Konten how-to yang SEO-friendly tapi tetap kece dibaca.</p>
      </div>
      <div class="link-grid">${guideCards}</div>
      <p style="margin-top:1rem"><a href="panduan/index.html">Semua panduan →</a></p>
    </div>
  </section>

  <section class="section">
    <div class="wrap faq">
      <div class="section-head">
        <h2>FAQ cepat</h2>
        <p>Yang orang sering nanya soal hub ${esc(site.nav)}.</p>
      </div>
      <details open><summary>Ini situs judi langsung?</summary><p>Ini hub edukasi Superdewa soal ${esc(site.topic)}. Fokusnya pemahaman & kebiasaan sehat.</p></details>
      <details><summary>Bahasanya kenapa santai banget?</summary><p>Biar Gen Z betah baca, tapi tetap akurat. SEO fun ≠ spam keyword.</p></details>
      <details><summary>Ke mana lagi setelah ini?</summary><p>Jelajahi glosarium, tips, lalu cek Superdewa Group di footer buat topik lain.</p></details>
    </div>
  </section>`;

  return layout({
    site,
    depth,
    title: site.pillarTitle,
    description: site.pillarDek,
    canonical,
    body,
    schema,
    activeNav: "home",
  });
}

function buildIndexPage(site, kind, items, folder, heading, intro) {
  const depth = 1;
  const canonical = `https://${site.domain}/${folder}/`;
  const cards = items
    .map((raw) => {
      const item = expandItem(raw, kind === "glosarium" ? "glossary" : kind === "panduan" ? "guide" : kind === "tips" ? "tip" : "game", site);
      return `<a class="link-card" href="${item.slug}.html"><strong>${esc(item.label)}</strong><span>${esc(item.dek)}</span></a>`;
    })
    .join("\n");

  const body = `
  <div class="wrap">
    <nav class="breadcrumb"><a href="${homeHref(depth)}">Beranda</a> / <span>${esc(heading)}</span></nav>
  </div>
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h1 style="font-family:var(--font-display);text-transform:uppercase;letter-spacing:.03em;font-size:clamp(1.8rem,4vw,2.6rem);margin:0 0 .5rem">${esc(heading)}</h1>
        <p>${esc(intro)}</p>
      </div>
      <div class="link-grid">${cards}</div>
    </div>
  </section>`;

  return layout({
    site,
    depth,
    title: `${heading} | ${site.name} Superdewa`,
    description: intro,
    canonical,
    body,
    activeNav: folder,
  });
}

function buildArticle(site, raw, kind, folder) {
  const item = expandItem(raw, kind, site);
  const depth = 2;
  const canonical = `https://${site.domain}/${folder}/${item.slug}.html`;
  const folderLabel = folder === "glosarium" ? "Glosarium" : folder === "panduan" ? "Panduan" : folder === "tips" ? "Tips" : "Topik";

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": kind === "glossary" ? "DefinedTerm" : "Article",
    name: item.label,
    description: item.dek,
    inLanguage: "id",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: site.name, url: `https://${site.domain}/` },
  });

  const body = `
  <article class="article">
    <div class="wrap">
      <nav class="breadcrumb">
        <a href="${homeHref(depth)}">Beranda</a> /
        <a href="${rel(depth, folder + "/index.html")}">${esc(folderLabel)}</a> /
        <span>${esc(item.label)}</span>
      </nav>
      <header class="article-header">
        <div class="meta-chip"><span>${esc(site.nav)}</span><span>${esc(item.keyword)}</span></div>
        <h1>${esc(item.h1)}</h1>
        <p class="dek">${esc(item.dek)}</p>
      </header>
      <div class="prose">
        ${proseFor(item, site)}
        <div class="related">
          <h2>Related yang worth dibuka</h2>
          <div class="link-grid">${relatedLinks(site, item, depth)}</div>
        </div>
      </div>
    </div>
  </article>`;

  return {
    html: layout({
      site,
      depth,
      title: item.title,
      description: item.dek,
      canonical,
      body,
      schema,
      activeNav: folder,
    }),
    url: canonical,
  };
}

function buildStaticInfo(site, page) {
  const depth = 0;
  const canonical = `https://${site.domain}/${page}.html`;
  let h1, dek, content;
  if (page === "faq") {
    h1 = `FAQ ${site.nav}`;
    dek = `Pertanyaan yang paling sering muncul soal ${site.topic}, dijawab tanpa basa-basi berlebih.`;
    content = `
      <div class="faq">
        <details open><summary>Apa tujuan situs ini?</summary><p>${esc(site.about)}</p></details>
        <details><summary>Apakah ini menjamin menang?</summary><p>Tidak. Semua konten bersifat edukasi & hiburan. Risiko tetap ada.</p></details>
        <details><summary>Untuk siapa konten ini?</summary><p>Pemula sampai intermediate yang mau paham istilah & kebiasaan main lebih sehat.</p></details>
        <details><summary>Kenapa ada Superdewa Group di footer?</summary><p>Itu navigasi antar hub edukasi Superdewa (slot, provider, live, crash, sports, responsible play).</p></details>
        <details><summary>Bahasa kontennya kenapa Gen Z banget?</summary><p>Biar engagement enak, tetap jelas, dan gak kaku — sambil tetap SEO-friendly.</p></details>
        <details><summary>Di mana tips bermain bertanggung jawab?</summary><p>Kunjungi <a href="https://superdewa-play.com/">https://superdewa-play.com/</a> dan selalu pakai batas waktu/uang.</p></details>
      </div>`;
  } else if (page === "tentang") {
    h1 = `Tentang ${site.name}`;
    dek = site.about;
    content = `
      <p>Superdewa membangun hub edukasi biar pemain lebih melek mekanik ${esc(site.topic)}. Bukan soft-sell berisik — lebih ke “paham dulu, baru main dengan kepala dingin”.</p>
      <p>Design-nya dark, cepat, minimalis, dengan aksen brand biru–merah–petir. Kontennya Bahasa Indonesia yang fun, scannable, dan ramah SEO.</p>
      <p>Semua halaman saling terhubung lewat glosarium, panduan, topik, tips, dan footer <strong>Superdewa Group</strong>.</p>`;
  } else {
    h1 = "Kontak & Disclaimer";
    dek = "Catatan penting soal konten edukasi Superdewa.";
    content = `
      <p>Hub ini bersifat informasi/edukasi. Pastikan kamu 18+. Main hanya dengan budget hiburan.</p>
      <p>Kalau butuh arah ke topik lain, pakai navigasi Superdewa Group di footer (naked URL).</p>
      <p>Untuk panduan kontrol diri, buka <a href="https://superdewa-play.com/">https://superdewa-play.com/</a>.</p>`;
  }

  const body = `
  <article class="article">
    <div class="wrap">
      <nav class="breadcrumb"><a href="index.html">Beranda</a> / <span>${esc(h1)}</span></nav>
      <header class="article-header">
        <h1>${esc(h1)}</h1>
        <p class="dek">${esc(dek)}</p>
      </header>
      <div class="prose">${content}</div>
    </div>
  </article>`;

  return {
    html: layout({
      site,
      depth,
      title: `${h1} | Superdewa`,
      description: dek,
      canonical,
      body,
      activeNav: page === "faq" ? "faq" : undefined,
    }),
    url: canonical,
  };
}

function buildRobots(domain) {
  return `User-agent: *
Allow: /

Sitemap: https://${domain}/sitemap.xml
`;
}

function buildSite(site) {
  const out = path.join(SITES_DIR, site.domain);
  ensureDir(out);
  copyDir(path.join(SHARED, "css"), path.join(out, "assets", "css"));
  copyDir(path.join(SHARED, "svg"), path.join(out, "assets", "svg"));

  const urls = [];

  write(path.join(out, "index.html"), buildHome(site));
  urls.push(`https://${site.domain}/`);

  write(
    path.join(out, "glosarium", "index.html"),
    buildIndexPage(site, "glosarium", site.glossaries, "glosarium", `Glosarium ${site.topic}`, `Kumpulan istilah ${site.topic} yang dijelasin biar gak muter-muter.`)
  );
  urls.push(`https://${site.domain}/glosarium/`);

  for (const raw of site.glossaries) {
    const { html, url } = buildArticle(site, raw, "glossary", "glosarium");
    write(path.join(out, "glosarium", `${raw[0]}.html`), html);
    urls.push(url);
  }

  write(
    path.join(out, "panduan", "index.html"),
    buildIndexPage(site, "panduan", site.guides, "panduan", `Panduan ${site.topic}`, `How-to praktis seputar ${site.topic} dengan tone santai dan langkah jelas.`)
  );
  urls.push(`https://${site.domain}/panduan/`);

  for (const raw of site.guides) {
    const { html, url } = buildArticle(site, raw, "guide", "panduan");
    write(path.join(out, "panduan", `${raw[0]}.html`), html);
    urls.push(url);
  }

  write(
    path.join(out, "game", "index.html"),
    buildIndexPage(site, "game", site.games, "game", `Topik ${site.topic}`, `Breakdown topik/game pilihan biar kamu punya mental model sebelum gas.`)
  );
  urls.push(`https://${site.domain}/game/`);

  for (const raw of site.games) {
    const { html, url } = buildArticle(site, raw, "game", "game");
    write(path.join(out, "game", `${raw[0]}.html`), html);
    urls.push(url);
  }

  write(
    path.join(out, "tips", "index.html"),
    buildIndexPage(site, "tips", site.tips, "tips", `Tips ${site.topic}`, `Habit kecil yang bikin session lebih terkendali dan tetap seru.`)
  );
  urls.push(`https://${site.domain}/tips/`);

  for (const raw of site.tips) {
    const { html, url } = buildArticle(site, raw, "tip", "tips");
    write(path.join(out, "tips", `${raw[0]}.html`), html);
    urls.push(url);
  }

  for (const page of ["faq", "tentang", "kontak"]) {
    const { html, url } = buildStaticInfo(site, page);
    write(path.join(out, `${page}.html`), html);
    urls.push(url);
  }

  // Fix sitemap priority check
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    const priority = u === `https://${site.domain}/` ? "1.0" : u.endsWith("/") ? "0.8" : "0.7";
    return `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n")}
</urlset>
`;
  write(path.join(out, "sitemap.xml"), sitemap);
  write(path.join(out, "robots.txt"), buildRobots(site.domain));

  const htmlCount = urls.length;
  return { domain: site.domain, htmlCount, urls: urls.length };
}

function main() {
  ensureDir(SITES_DIR);
  const summary = [];
  for (const site of sites) {
    const result = buildSite(site);
    summary.push(result);
    console.log(`✓ ${result.domain}: ${result.htmlCount} pages`);
  }
  const total = summary.reduce((a, b) => a + b.htmlCount, 0);
  console.log(`\nDone. ${summary.length} sites, ${total} HTML pages total.`);
  write(
    path.join(ROOT, "docs", "BUILD-SUMMARY.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), totalPages: total, sites: summary }, null, 2)
  );
}

main();
