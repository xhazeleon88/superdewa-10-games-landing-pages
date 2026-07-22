#!/usr/bin/env node
/**
 * Superdewa static site generator
 * Builds 10 domains × ≥50 HTML pages + sitemap.xml + robots.txt
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sites, GROUP_URLS, OFFICIAL_LINK, HOME_ACTION_CTAS } from "./sites-data.mjs";
import { enrichItem, buildProse } from "./content-engine.mjs";
import { getTheme } from "./site-themes.mjs";
import { faviconSvg } from "./favicons.mjs";

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

function relatedLinks(site, current, depth) {
  const pool = [
    ...site.glossaries.map((x) => ({ ...enrichItem(x, "glossary", site), href: `glosarium/${x[0]}.html` })),
    ...site.guides.map((x) => ({ ...enrichItem(x, "guide", site), href: `panduan/${x[0]}.html` })),
    ...site.games.map((x) => ({ ...enrichItem(x, "game", site), href: `game/${x[0]}.html` })),
    ...site.tips.map((x) => ({ ...enrichItem(x, "tip", site), href: `tips/${x[0]}.html` })),
  ].filter((p) => p.slug !== current.slug);

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

function layout({ site, theme, depth, title, description, canonical, body, schema, activeNav }) {
  const assets = assetPrefix(depth);
  const home = homeHref(depth);
  const group = GROUP_URLS.map((url) => {
    const current = url.includes(site.domain);
    return `<li><a href="${url}"${current ? ' aria-current="page"' : ""}>${url}</a></li>`;
  }).join("\n");
  const official = `<li><a href="${OFFICIAL_LINK.href}">${esc(OFFICIAL_LINK.label)}</a></li>`;

  const navItems = theme.nav
    .map((label, i) => {
      const key = theme.navHrefs[i];
      const href = key === "faq" ? "faq.html" : `${key}/index.html`;
      return `<li><a href="${rel(depth, href)}"${activeNav === key ? ' aria-current="page"' : ""}>${esc(label)}</a></li>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(site.keyword)}">
  <link rel="canonical" href="${esc(canonical)}">
  <link rel="icon" href="${assets}/favicon.svg" type="image/svg+xml">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(canonical)}">
  <meta name="theme-color" content="#07090F">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${theme.fontUrl}" rel="stylesheet">
  <link rel="stylesheet" href="${assets}/css/site.css">
  ${schema ? `<script type="application/ld+json">${schema}</script>` : ""}
</head>
<body class="${theme.themeClass}">
  <header class="site-header">
    <div class="wrap nav-row">
      <a class="brand-link" href="${home}" aria-label="${esc(site.name)}">
        <img src="${assets}/img/logo-superdewa.png" width="200" height="64" alt="Superdewa">
      </a>
      <ul class="nav-links">
        ${navItems}
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
          ${official}
        </ul>
      </nav>
      <p class="disclaimer">${esc(site.name)} — konten edukasi. Main bijak, batasi waktu & budget. 18+. Bukan jaminan kemenangan.</p>
    </div>
  </footer>
</body>
</html>`;
}

function buildHome(site, theme) {
  const depth = 0;
  const canonical = `https://${site.domain}/`;
  const hs = theme.homeSections;
  const gCards = site.glossaries
    .slice(0, 6)
    .map((raw) => {
      const item = enrichItem(raw, "glossary", site);
      return `<a class="link-card" href="glosarium/${item.slug}.html"><strong>${esc(item.label)}</strong><span>${esc(item.dek)}</span></a>`;
    })
    .join("\n");
  const guideCards = site.guides
    .slice(0, 6)
    .map((raw) => {
      const item = enrichItem(raw, "guide", site);
      return `<a class="link-card" href="panduan/${item.slug}.html"><strong>${esc(item.label)}</strong><span>${esc(item.dek)}</span></a>`;
    })
    .join("\n");

  const steps = hs.steps
    .map(([t, p]) => `<div class="step"><h3>${esc(t)}</h3><p>${esc(p)}</p></div>`)
    .join("\n");
  const faqs = hs.faqs
    .map(
      ([q, a], i) =>
        `<details${i === 0 ? " open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`
    )
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
      <div>
        <img class="hero-brand" src="assets/img/logo-superdewa.png" width="420" height="134" alt="Superdewa">
        <h1>${esc(site.pillarH1)}</h1>
        <p class="hero-lead">${esc(site.pillarDek)}</p>
        <div class="cta-row cta-actions">
          ${HOME_ACTION_CTAS.map(
            (c, i) =>
              `<a class="btn ${i === 0 ? "btn-primary" : "btn-secondary"}" href="${c.href}" rel="noopener noreferrer" target="_blank">${esc(c.label)}</a>`
          ).join("\n          ")}
        </div>
        <div class="cta-row cta-learn">
          <a class="btn btn-secondary" href="glosarium/index.html">${esc(theme.ctaPrimary)}</a>
          <a class="btn btn-secondary" href="panduan/index.html">${esc(theme.ctaSecondary)}</a>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <img src="assets/svg/heroes/${site.hero}" width="520" height="360" alt="">
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>${esc(hs.introH2)}</h2>
        <p>${esc(hs.introP)}</p>
      </div>
      <div class="section-head" style="margin-top:1.5rem">
        <h2>${esc(hs.stepsH2)}</h2>
      </div>
      <div class="steps">${steps}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>${esc(hs.glossH2)}</h2>
        <p>${esc(hs.glossP)}</p>
      </div>
      <div class="link-grid">${gCards}</div>
      <p style="margin-top:1rem"><a href="glosarium/index.html">${esc(theme.nav[0])} lengkap →</a></p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>${esc(hs.guideH2)}</h2>
        <p>${esc(hs.guideP)}</p>
      </div>
      <div class="link-grid">${guideCards}</div>
      <p style="margin-top:1rem"><a href="panduan/index.html">${esc(theme.nav[1])} lengkap →</a></p>
    </div>
  </section>

  <section class="section">
    <div class="wrap faq">
      <div class="section-head">
        <h2>${esc(hs.faqH2)}</h2>
      </div>
      ${faqs}
    </div>
  </section>`;

  return layout({
    site,
    theme,
    depth,
    title: site.pillarTitle,
    description: site.pillarDek,
    canonical,
    body,
    schema,
    activeNav: "home",
  });
}

function buildIndexPage(site, theme, kind, items, folder) {
  const depth = 1;
  const canonical = `https://${site.domain}/${folder}/`;
  const kindMap = {
    glosarium: "glossary",
    panduan: "guide",
    tips: "tip",
    game: "game",
  };
  const [heading, intro] = theme.indexLabels[folder];
  const cards = items
    .map((raw) => {
      const item = enrichItem(raw, kindMap[kind] || "game", site);
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
        <h1 style="font-family:var(--font-display);font-size:clamp(1.8rem,4vw,2.6rem);margin:0 0 .5rem">${esc(heading)}</h1>
        <p>${esc(intro)}</p>
      </div>
      <div class="link-grid">${cards}</div>
    </div>
  </section>`;

  return layout({
    site,
    theme,
    depth,
    title: `${heading} | ${site.name}`,
    description: intro,
    canonical,
    body,
    activeNav: folder,
  });
}

function buildArticle(site, theme, raw, kind, folder) {
  const item = enrichItem(raw, kind, site);
  const depth = 1;
  const canonical = `https://${site.domain}/${folder}/${item.slug}.html`;
  const folderLabel = theme.indexLabels[folder][0];
  const relatedH2 = {
    slot: "Lanjut baca agar makin melek slot",
    pg: "Materi PG Soft terkait",
    pp: "Lanjutan buat yang lagi dalemin PP",
    habanero: "Konten Habanero yang nyambung",
    microgaming: "Bacaan MG berikutnya",
    nolimit: "Masih seputar risiko NLC",
    live: "Materi meja yang relevan",
    crash: "Modul crash terkait",
    sports: "Slip knowledge terkait",
    play: "Lanjutan kontrol diri",
  }[site.id] || "Bacaan terkait";

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
        <div class="meta-chip"><span>${esc(site.name)}</span><span>${esc(item.keyword)}</span></div>
        <h1>${esc(item.h1)}</h1>
        <p class="dek">${esc(item.dek)}</p>
      </header>
      <div class="prose">
        ${buildProse(item, site)}
        <div class="related">
          <h2>${esc(relatedH2)}</h2>
          <div class="link-grid">${relatedLinks(site, item, depth)}</div>
        </div>
      </div>
    </div>
  </article>`;

  return {
    html: layout({
      site,
      theme,
      depth,
      title: item.title,
      description: item.description || item.dek,
      canonical,
      body,
      schema,
      activeNav: folder,
    }),
    url: canonical,
  };
}

function buildStaticInfo(site, theme, page) {
  const depth = 0;
  const canonical = `https://${site.domain}/${page}.html`;
  const hs = theme.homeSections;
  let h1, dek, content;
  if (page === "faq") {
    h1 = hs.faqH2;
    dek = `Jawaban spesifik seputar ${site.topic} di ${site.name}.`;
    content = `<div class="faq">${hs.faqs
      .map(
        ([q, a], i) =>
          `<details${i === 0 ? " open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`
      )
      .join("\n")}</div>`;
  } else if (page === "tentang") {
    h1 = `Tentang ${site.name}`;
    dek = site.about;
    content = `
      <p>${esc(hs.introP)}</p>
      <p>${esc(site.about)}</p>
      <p>Situs ini berdiri sendiri dengan fokus ${esc(site.topic)}. Footer Superdewa Group hanya penghubung ke hub edukasi lain.</p>`;
  } else {
    h1 = `Disclaimer ${site.name}`;
    dek = `Catatan penting sebelum memakai materi ${site.topic}.`;
    content = `
      <p>Konten di ${esc(site.domain)} bersifat edukasi. Usia 18+. Main hanya dengan budget hiburan.</p>
      <p>Untuk kontrol diri, kunjungi <a href="https://superdewa-play.com/">https://superdewa-play.com/</a>.</p>
      <p>Hub lain ada di navigasi Superdewa Group (naked URL) di footer.</p>`;
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
      theme,
      depth,
      title: `${h1} | ${site.name}`,
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
  const theme = getTheme(site.id);
  if (!theme) throw new Error(`Missing theme for ${site.id}`);
  const out = path.join(SITES_DIR, site.domain);
  ensureDir(out);
  copyDir(path.join(SHARED, "css"), path.join(out, "assets", "css"));
  copyDir(path.join(SHARED, "svg"), path.join(out, "assets", "svg"));
  copyDir(path.join(SHARED, "img"), path.join(out, "assets", "img"));
  write(path.join(out, "assets", "favicon.svg"), faviconSvg(theme.favicon));
  // Also drop PNG bolt favicon fallback derived from brand logo
  const boltSrc = path.join(ROOT, "assets", "brand", "bolt.png");
  if (fs.existsSync(boltSrc)) {
    fs.copyFileSync(boltSrc, path.join(out, "assets", "favicon-bolt.png"));
  }

  const urls = [];

  write(path.join(out, "index.html"), buildHome(site, theme));
  urls.push(`https://${site.domain}/`);

  write(
    path.join(out, "glosarium", "index.html"),
    buildIndexPage(site, theme, "glosarium", site.glossaries, "glosarium")
  );
  urls.push(`https://${site.domain}/glosarium/`);

  for (const raw of site.glossaries) {
    const { html, url } = buildArticle(site, theme, raw, "glossary", "glosarium");
    write(path.join(out, "glosarium", `${raw[0]}.html`), html);
    urls.push(url);
  }

  write(
    path.join(out, "panduan", "index.html"),
    buildIndexPage(site, theme, "panduan", site.guides, "panduan")
  );
  urls.push(`https://${site.domain}/panduan/`);

  for (const raw of site.guides) {
    const { html, url } = buildArticle(site, theme, raw, "guide", "panduan");
    write(path.join(out, "panduan", `${raw[0]}.html`), html);
    urls.push(url);
  }

  write(
    path.join(out, "game", "index.html"),
    buildIndexPage(site, theme, "game", site.games, "game")
  );
  urls.push(`https://${site.domain}/game/`);

  for (const raw of site.games) {
    const { html, url } = buildArticle(site, theme, raw, "game", "game");
    write(path.join(out, "game", `${raw[0]}.html`), html);
    urls.push(url);
  }

  write(
    path.join(out, "tips", "index.html"),
    buildIndexPage(site, theme, "tips", site.tips, "tips")
  );
  urls.push(`https://${site.domain}/tips/`);

  for (const raw of site.tips) {
    const { html, url } = buildArticle(site, theme, raw, "tip", "tips");
    write(path.join(out, "tips", `${raw[0]}.html`), html);
    urls.push(url);
  }

  for (const page of ["faq", "tentang", "kontak"]) {
    const { html, url } = buildStaticInfo(site, theme, page);
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
  const keep = new Set(sites.map((s) => s.domain));
  for (const entry of fs.readdirSync(SITES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (!keep.has(entry.name)) {
      fs.rmSync(path.join(SITES_DIR, entry.name), { recursive: true, force: true });
      console.log(`– removed old site folder: ${entry.name}`);
    }
  }
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
