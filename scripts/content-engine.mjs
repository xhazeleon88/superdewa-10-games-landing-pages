/**
 * Natural, useful Bahasa Indonesia content for Superdewa pages.
 * Goal: readable for humans + clear for search — no robotic template openers.
 */

function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick(seedKey, arr) {
  return arr[hash(seedKey) % arr.length];
}

function shortRef(label, kind) {
  // Avoid "Terapkan Cara Baca Odds Decimal..." awkwardness
  if (kind === "guide" && /^cara\s+/i.test(label)) {
    return label.replace(/^cara\s+/i, "").trim() || label;
  }
  if (kind === "tip" && /^tips?:\s*/i.test(label)) {
    return label.replace(/^tips?:\s*/i, "").trim() || label;
  }
  return label;
}

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Hand-tuned explanations for high-traffic / easy-to-roboticize terms */
const FACTS = {
  rtp: {
    meaning:
      "RTP (Return to Player) adalah persentase teoretis total taruhan yang “kembali” ke pemain dalam jangka panjang. RTP 96% tidak berarti kamu akan balik 96% setelah main sejam.",
    useful:
      "Pakai RTP untuk membandingkan ekspektasi antar game, bukan meramal spin berikutnya. Angkanya baru kerasa setelah volume putaran sangat besar.",
    example:
      "Dua game sama-sama RTP 96%, tapi yang satu low volatility dan yang lain high volatility bisa terasa jauh berbeda di session 30 menit.",
    mistakes: [
      "Menganggap RTP tinggi = menang hari ini",
      "Mengabaikan volatilitas padahal RTP-nya mirip",
      "Percaya klaim RTP tanpa cek info di game",
    ],
    tip: "Kalau budget terbatas, prioritaskan game yang ritmenya kamu tahan, bukan semata angka RTP terbesar di screenshot orang.",
  },
  volatilitas: {
    meaning:
      "Volatilitas menggambarkan seberapa “kasar” ayunan hasil: low cenderung lebih sering kasih nilai kecil, high lebih jarang tapi potensinya lebih liar.",
    useful:
      "Cocokkan volatilitas dengan bankroll dan mood. High volatility butuh napas panjang; low volatility lebih nyaman buat belajar mekanik.",
    example:
      "Kalau kamu cuma siap 40 spin, high volatility sering terasa “mati gaya” duluan sebelum fitur sempat kebuka.",
    mistakes: [
      "Main high volatility pakai budget ketat lalu tilt",
      "Ganti game tiap kalah tanpa paham ritmenya",
      "Menyamakan volatilitas dengan jaminan kemenangan",
    ],
    tip: "Sebelum naikkan bet, tanya: tahan berapa lama kalau bonus belum muncul? Kalau jawabannya pendek, pilih ritme lebih landai.",
  },
  payline: {
    meaning:
      "Payline adalah jalur kombinasi yang dihitung sebagai kemenangan. Jumlah line aktif dan arah bacanya (kiri-kanan, keduanya, dsb.) beda-beda tiap game.",
    useful:
      "Sebelum spin, cek berapa line yang aktif dan apakah taruhan per line sudah sesuai budget. Salah baca line = salah baca kenapa “hampir menang”.",
    example:
      "Simbol yang kelihatan nyambung secara visual belum tentu ada di payline aktif.",
    mistakes: [
      "Mengira semua gulungan dibayar meski line tidak aktif",
      "Naikkan jumlah line tanpa hitung total bet",
      "Skip diagram payline di paytable",
    ],
    tip: "Buka paytable, scroll ke bagian lines, dan pastikan total bet = bet per line × jumlah line (atau skema ways yang dipakai game).",
  },
  paytable: {
    meaning:
      "Paytable adalah “buku nilai” game: harga simbol, syarat free spin, perilaku wild/scatter, dan catatan fitur penting.",
    useful:
      "Ini sumber kebenaran paling dekat sebelum kamu percaya tips orang random. 60 detik baca paytable sering lebih berguna daripada 60 spin buta.",
    example:
      "Banyak orang baru sadar scatter tidak diganti wild setelah rugi dulu — padahal itu tertulis di paytable.",
    mistakes: [
      "Langsung spin tanpa buka paytable",
      "Hanya lihat simbol mahal, skip aturan fitur",
      "Mengira semua game sejenis punya aturan sama",
    ],
    tip: "Urutan baca yang efisien: simbol mahal → wild/scatter → syarat bonus → info max win/volatilitas kalau ada.",
  },
  scatter: {
    meaning:
      "Scatter biasanya simbol pemicu fitur (sering free spin). Di banyak title, scatter bisa bayar tanpa harus duduk di payline tertentu.",
    useful:
      "Yang penting bukan “scatter lewat terus”, tapi syarat jumlah dan apa yang dijamin saat fitur kebuka.",
    example:
      "Ada game yang butuh 3 scatter di reel mana pun; ada yang membatasi posisi. Jangan samakan.",
    mistakes: [
      "Mengira setiap scatter otomatis buka free spin",
      "Naikkan bet hanya karena sering lihat 2 scatter",
      "Tidak cek apakah scatter bisa diganti wild",
    ],
    tip: "Di mode demo, sengaja perhatikan apa yang terjadi saat 2 vs 3 scatter muncul. Itu bikin ekspektasi lebih realistis.",
  },
  wild: {
    meaning:
      "Wild berperan seperti joker: membantu melengkapi kombinasi dengan mengganti simbol lain. Varian wild bisa expanding, sticky, atau bawa multiplier.",
    useful:
      "Cek apakah wild mengganti scatter atau tidak, dan di reel mana wild boleh muncul. Detail itu mengubah frekuensi kemenangan kecil.",
    example:
      "Sticky wild di free spin terasa jauh lebih “nempel” daripada wild biasa di base game.",
    mistakes: [
      "Berasumsi wild mengganti semua simbol",
      "Mengabaikan aturan wild saat free spin",
      "Kejar wild tanpa pantau ukuran bet",
    ],
    tip: "Kalau ada beberapa jenis wild, baca yang spesial dulu—itu biasanya pusat fitur.",
  },
  "free-spin": {
    meaning:
      "Free spin adalah putaran tanpa menambah taruhan manual, biasanya dibuka oleh scatter atau fitur tertentu. Tetap ada risiko: hasilnya bisa kecil, besar, atau datar.",
    useful:
      "Treat free spin sebagai bagian dari volatilitas game, bukan “uang gratis”. Cara masuk fitur dan modifier di dalamnya yang menentukan rasanya.",
    example:
      "Free spin dengan multiplier yang tumbuh terasa beda jauh dibanding free spin polos.",
    mistakes: [
      "Langsung naikkan bet setelah dapat free spin",
      "Mengira free spin selalu profit",
      "Keluar tengah fitur karena panik (kalau sistem mengizinkan interrupt)",
    ],
    tip: "Catat: berapa sering fitur muncul di sessionmu, dan apakah hasilnya sebanding dengan total taruhan menuju trigger.",
  },
  multiplier: {
    meaning:
      "Multiplier mengalikan nilai kemenangan (x2, x10, dst.). Sumbernya bisa simbol, fitur, atau akumulasi selama tumble/cascade.",
    useful:
      "Multiplier kelihatan sexy di highlight, tapi frekuensi munculnya yang lebih penting buat ekspektasi session pendek.",
    example:
      "x100 yang jarang muncul tidak otomatis lebih “baik” dari x5 yang lebih sering, tergantung gaya main dan bankroll.",
    mistakes: [
      "FOMO kejar multiplier tinggi tanpa batas rugi",
      "Mengira multiplier berlaku ke semua jenis bayaran",
      "Lupa cek apakah multiplier di-reset tiap spin",
    ],
    tip: "Kalau game menampilkan riwayat multiplier, pakai itu buat paham ritme—bukan buat nebak putaran berikutnya.",
  },
  "buy-feature": {
    meaning:
      "Buy feature (bonus buy) adalah opsi membayar sejumlah kelipatan bet untuk masuk fitur lebih cepat, tanpa menunggu trigger alami.",
    useful:
      "Ini shortcut berbayar. Cocok hanya kalau kamu sudah paham base game dan sadar biayanya bisa menghabiskan budget lebih cepat.",
    example:
      "Kalau harga buy = 100x bet, berarti 10 kali beli setara 1.000x bet—cepat habis kalau hasil fitur datar.",
    mistakes: [
      "Bonus buy jadi default sejak spin pertama",
      "Beli fitur saat sedang tilt",
      "Tidak membandingkan harga buy dengan frekuensi trigger alami",
    ],
    tip: "Uji dulu di demo: catat hasil 10x buy. Kalau fluktuasinya bikin kamu gak nyaman, jangan bawa ke uang asli dulu.",
  },
  megaways: {
    meaning:
      "Megaways adalah mekanik jumlah “ways to win” yang berubah tiap spin, tergantung berapa simbol yang tampil di tiap reel.",
    useful:
      "Karena ways-nya dinamis, visual bisa ramai dan hasilnya terasa lebih volatile. Baca dulu cara simbol bayar (biasanya kiri ke kanan di reel berurutan).",
    example:
      "Satu spin bisa punya ratusan hingga ribuan ways; spin berikutnya bisa jauh lebih rendah.",
    mistakes: [
      "Mengira ways tinggi = menang pasti",
      "Skip penjelasan cara menang karena UI ramai",
      "Main Megaways dengan bet terlalu besar sejak awal",
    ],
    tip: "Mulai di bet kecil sampai kamu terbiasa membaca grid yang berubah-ubah.",
  },
  "odds-decimal": {
    meaning:
      "Odds decimal menunjukkan total pengembalian jika menang, termasuk modal. Odds 2.50 pada taruhan 10.000 menghasilkan 25.000 jika menang.",
    useful:
      "Hitung cepat implied probability: 1 ÷ odds. Odds 2.00 ≈ 50% (sebelum margin). Ini bantu kamu bandingkan harga antar pasar.",
    example:
      "Pasar A odds 1.90 dan pasar B odds 2.05 untuk seleksi yang sama: B memberi harga lebih “murah” untuk risiko serupa (tetap cek konteks pertandingan).",
    mistakes: [
      "Mengira odds besar selalu lebih cerdas",
      "Lupa bahwa parlay mengalikan risiko",
      "Mencampur format odds tanpa konversi",
    ],
    tip: "Sebelum pasang, tulis: stake, odds, potensi return, dan alasan singkat. Kalau alasanmu cuma “kerasa”, tunda dulu.",
  },
  "handicap-asian": {
    meaning:
      "Asian handicap memberi start virtual ke salah satu sisi supaya pasar lebih seimbang. Bisa utuh (0.5, 1.0) atau seperempat (0.25, 0.75) yang membagi taruhan.",
    useful:
      "Pahami dulu arti “menang penuh / setengah / push / kalah” di tiap angka handicap sebelum ikut tips orang.",
    example:
      "Handicap 0.0 (level ball) artinya kalau seri, stake kembali (push).",
    mistakes: [
      "Menghafal angka tanpa paham settlement",
      "Masuk live handicap tanpa cek skor & merah",
      "Kumpulkan banyak handicap dalam satu parlay",
    ],
    tip: "Latihan: ambil satu pertandingan, tulis skenario skor 0-0, 1-0, 0-1, lalu tentukan hasil taruhanmu. Kalau masih bingung, jangan naikkan stake.",
  },
  "over-under": {
    meaning:
      "Over/Under adalah pasar total (biasanya gol/poin). Over 2.5 gol menang jika total gol ≥ 3; Under 2.5 menang jika total ≤ 2.",
    useful:
      "Fokus ke tempo pertandingan, cedera, motivasi, dan tren scoring—bukan cuma klasemen.",
    example:
      "Laga yang terbuka secara gaya main belum tentu Over kalau kedua tim sedang kering gol.",
    mistakes: [
      "Masuk Over hanya karena “lagi seru di TL”",
      "Abaikan red card / cuaca / rotasi pemain",
      "Kejar rugi Over dengan naikkan stake match berikutnya",
    ],
    tip: "Pilih liga yang kamu ikuti. Edge paling realistis biasanya dari pemahaman, bukan dari jumlah slip.",
  },
  parlay: {
    meaning:
      "Parlay menggabungkan beberapa pilihan dalam satu slip. Semua harus menang agar parlay menang; odds dikalikan.",
    useful:
      "Potensi return naik, probabilitas gabungan turun. Cocok sebagai hiburan kecil, rawan kalau dipakai buat “balik modal”.",
    example:
      "Tiga pilihan masing-masing odds 1.60 ≈ gabungan 4.096—kelihatan menarik, tapi satu saja salah membuat slip gugur.",
    mistakes: [
      "Menumpuk 8–10 pilihan karena “biar gede”",
      "Campur pasar yang tidak dipahami",
      "Naikkan jumlah parlay setelah kalah",
    ],
    tip: "Batasi 2–3 pilihan dan stake kecil. Kalau butuh banyak hiburan, lebih aman beberapa single kecil daripada satu parlay gila.",
  },
  "cash-out": {
    meaning:
      "Cash out mengunci hasil sebelum event/round selesai. Di crash, itu berarti keluar sebelum multiplier jatuh; di sportsbook, biasanya keluar sebelum pertandingan berakhir.",
    useful:
      "Cash out adalah alat manajemen risiko/FOMO, bukan tombol ajaib. Harganya sering sudah termasuk margin.",
    example:
      "Auto cash out di 1.50x membantu disiplin, meski kadang terasa “sayang” saat grafik lanjut naik.",
    mistakes: [
      "Matikan auto cash out saat emosi",
      "Cash out panik tanpa aturan",
      "Mengira cash out selalu lebih bijak dari hold",
    ],
    tip: "Tentukan aturan sebelum mulai: target keluar, batas rugi, dan kapan kamu boleh override (spoiler: sebaiknya jarang).",
  },
  "auto-cash-out": {
    meaning:
      "Auto cash out menetapkan multiplier/target keluar otomatis supaya kamu tidak mengandalkan klik di detik terakhir.",
    useful:
      "Paling berguna saat koneksi tidak sempurna atau saat kamu tahu diri mudah FOMO.",
    example:
      "Set 1.40x–1.80x untuk latihan disiplin lebih masuk akal daripada kejar 10x tiap round.",
    mistakes: [
      "Naikkan target terus setelah hampir kena crash",
      "Pakai auto + manual impulsif bersamaan tanpa catatan",
      "Set target ekstrem dengan stake besar",
    ],
    tip: "Kunci target di awal session. Ubah target hanya antar session, bukan tiap kali “hampir”.",
  },
  "dealer-live": {
    meaning:
      "Dealer live adalah manusia nyata yang memandu meja melalui video streaming: mengocok/mengundi, mengelola tempo, dan mengumumkan hasil.",
    useful:
      "Bedanya dengan RNG murni: ada latensi, etiket meja, dan limit yang harus kamu taati. Pilih meja sesuai budget, bukan sesuai “aura dealer”.",
    example:
      "Di roulette live, kamu harus menempatkan chip sebelum betting time ditutup; terlambat = taruhan tidak masuk.",
    mistakes: [
      "Masuk meja VIP tanpa cek limit",
      "Spam chat / gangguan saat ragu keputusan",
      "Kejar warna/hasil sebelumnya (gambler’s fallacy)",
    ],
    tip: "Uji dulu meja low limit untuk paham tempo. Speed table terasa beda dari classic table.",
  },
  "self-exclusion": {
    meaning:
      "Self-exclusion adalah keputusan membatasi atau menghentikan akses bermain untuk periode tertentu agar jarak dari impuls lebih jelas.",
    useful:
      "Ini alat kontrol diri. Berguna kalau main sudah terasa wajib, atau batas waktu/uang sering dilanggar.",
    example:
      "Cooling-off 7 hari plus hapus shortcut aplikasi sering lebih efektif daripada “janji ke diri sendiri” tanpa penghalang.",
    mistakes: [
      "Menganggap minta jeda sebagai kelemahan",
      "Mencari jalan pintas sebelum periode selesai",
      "Tidak mengganti kebiasaan dengan aktivitas lain",
    ],
    tip: "Pasangkan self-exclusion dengan rencana konkret: tidur, olahraga singkat, atau ngobrol ke orang yang dipercaya.",
  },
  tilt: {
    meaning:
      "Tilt adalah kondisi emosi (kesal, dendam, panik) yang membuat keputusan jadi impulsif—naikkan bet, kejar rugi, atau main lebih lama dari rencana.",
    useful:
      "Kenali tanda awal: napas pendek, klik lebih cepat, “sekali lagi” berulang. Itu sinyal stop, bukan sinyal strategy.",
    example:
      "Habis kalah big, langsung naikkan bet 5x tanpa evaluasi = pola tilt klasik.",
    mistakes: [
      "Menyangkal sedang emosi",
      "Main lagi untuk “membersihkan” perasaan",
      "Minum/kurang tidur lalu memaksakan session",
    ],
    tip: "Punya ritual exit: tutup tab, jalan 5 menit, minum air. Jangan buka ulang sebelum timer selesai.",
  },
  "chasing-losses": {
    meaning:
      "Chasing losses adalah berusaha mengejar kerugian dengan taruhan lebih besar atau session lebih panjang dari rencana awal.",
    useful:
      "Secara matematis dan emosional, ini jebakan umum. Kerugian yang sudah terjadi tidak bisa “diwajibkan” kembali oleh spin/slip berikutnya.",
    example:
      "Target awal rugi max 100, tapi setelah -100 kamu gas terus sampai -300 karena “hampir balik”.",
    mistakes: [
      "Mengubah batas rugi di tengah jalan",
      "Pinjam dana untuk balik modal",
      "Mengikuti tips hot-headed di chat",
    ],
    tip: "Tulis stop-loss di kertas/HP sebelum main. Kalau tersentuh, session selesai—tanpa negosiasi.",
  },
};

function inferFact(slug, label, topic) {
  const s = `${slug} ${label}`.toLowerCase();
  if (FACTS[slug]) return FACTS[slug];
  for (const [k, v] of Object.entries(FACTS)) {
    if (s.includes(k.replace(/-/g, " ")) || slug.includes(k) || k.includes(slug)) return v;
  }

  // Keyword-driven useful fallbacks (still natural, topic-aware)
  if (/rtp/.test(s)) return FACTS.rtp;
  if (/volatil|variance/.test(s)) return FACTS.volatilitas;
  if (/scatter/.test(s)) return FACTS.scatter;
  if (/wild/.test(s)) return FACTS.wild;
  if (/free.?spin|freespin/.test(s)) return FACTS["free-spin"];
  if (/multipli/.test(s)) return FACTS.multiplier;
  if (/buy|bonus.?buy|feature.?buy|ante/.test(s)) return FACTS["buy-feature"];
  if (/megaway/.test(s)) return FACTS.megaways;
  if (/odds|decimal|implied/.test(s)) return FACTS["odds-decimal"];
  if (/handicap/.test(s)) return FACTS["handicap-asian"];
  if (/over|under/.test(s)) return FACTS["over-under"];
  if (/parlay|mix.?parlay/.test(s)) return FACTS.parlay;
  if (/auto.?cash/.test(s)) return FACTS["auto-cash-out"];
  if (/cash.?out/.test(s)) return FACTS["cash-out"];
  if (/dealer|live casino|roulette|baccarat|blackjack/.test(s)) return FACTS["dealer-live"];
  if (/tilt/.test(s)) return FACTS.tilt;
  if (/chas(e|ing)|kejar/.test(s)) return FACTS["chasing-losses"];
  if (/self.?exclusion|limit waktu|limit deposit|responsible|cooling/.test(s)) return FACTS["self-exclusion"];

  return {
    meaning: `${label} adalah bagian penting saat memahami ${topic}. Intinya: bantu kamu membaca risiko, tempo, dan aturan sebelum ambil keputusan.`,
    useful: `Dengan paham ${label}, kamu lebih gampang filter informasi mana yang berguna dan mana yang cuma bikin FOMO. Itu bedanya belajar mekanik vs ikut keramaian.`,
    example: `Contoh praktis: sebelum naikkan taruhan, cek dulu bagaimana ${label} memengaruhi ukuran risiko session kamu hari ini.`,
    mistakes: [
      `Menghafal istilah ${label} tanpa menyesuaikan budget`,
      "Mengambil keputusan besar saat sedang emosi",
      "Menelan klaim orang lain tanpa cek aturan/info resmi",
    ],
    tip: `Coba jelaskan ${label} ke diri sendiri dalam satu kalimat. Kalau masih muter-muter, buka lagi aturan terkait lalu tulis ulang dengan bahasa sendiri.`,
  };
}

const OPENERS = {
  glossary: [
    (l, t) =>
      `<p><strong>${l}</strong> sering muncul dalam obrolan ${t}, tapi banyak yang cuma hafal katanya. Di sini kita rapikan artinya, biar keputusanmu lebih sadar.</p>`,
    (l, t) =>
      `<p>Sebelum jauh-jauh main ${t}, pause sebentar di istilah <strong>${l}</strong>. Bukan biar sok kamus, tapi biar gak salah baca situasi di layar.</p>`,
    (l, t) =>
      `<p>Kalau ${t} terasa ribet, biasanya karena fondasi istilahnya bolong. Yuk bedah <strong>${l}</strong> secara lurus dan berguna.</p>`,
  ],
  guide: [
    (l, t) =>
      `<p>Panduan <strong>${l}</strong> ini disusun buat dipraktekin di ${t}—bukan buat dikoleksi. Fokusnya ke langkah, risiko, dan batas yang masuk akal.</p>`,
    (l, t) =>
      `<p>Mau rapiin cara approach ${t}? Mulai dari <strong>${l}</strong>. Kita bahas apa yang dicek dulu, apa yang sering bikin orang salah langkah.</p>`,
    (l, t) =>
      `<p><strong>${l}</strong> kedengaran simpel, tapi detailnya yang biasanya nentuin session ${t} terasa terkendali atau berantakan.</p>`,
  ],
  game: [
    (l, t) =>
      `<p><strong>${l}</strong> sering dicari orang yang explorasi ${t}. Sebelum ikut rame, ada baiknya paham mekanik intinya dan risiko yang nyangkut.</p>`,
    (l, t) =>
      `<p>Ini ringkasan berguna soal <strong>${l}</strong>: karakter permainan, hal wajib dicek, dan kapan lebih bijak skip.</p>`,
    (l, t) =>
      `<p>Kalau kamu landing di <strong>${l}</strong> karena penasaran ${t}, fokus dulu ke aturan main—bukan ke highlight orang lain.</p>`,
  ],
  tip: [
    (l, t) =>
      `<p>Tips <strong>${l}</strong> bertujuan sederhana: bikin session ${t} tetap hiburan. Bisa langsung dicoba tanpa mengandalkan “pola rahasia”.</p>`,
    (l, t) =>
      `<p>Kadang yang bikin berantakan bukan game-nya, tapi kebiasaan. <strong>${l}</strong> adalah habit kecil yang impact-nya kerasa.</p>`,
    (l, t) =>
      `<p>Kalau selesai main sering diikuti perasaan “ngapa gue…”, coba terapkan <strong>${l}</strong> sebagai rem praktis.</p>`,
  ],
};

function naturalMeta(item, site) {
  const { label, kind, keyword } = item;
  const topic = site.topic;
  const titles = {
    glossary: `${label}: Arti & Cara Memahaminya di ${topic}`,
    guide: `${label}: Panduan Praktis ${topic}`,
    game: `${label}: Hal Wajib Dicek Sebelum Main`,
    tip: `${label}: Tips Session ${topic} Lebih Terkendali`,
  };
  const h1s = {
    glossary: `${label}: arti, fungsi, dan cara bacanya biar gak salah kaprah`,
    guide: `${label}: langkah praktis yang bisa langsung dicoba`,
    game: `${label}: mekanik, ritme, dan approach yang lebih sadar`,
    tip: `${label} — kebiasaan kecil yang efeknya kerasa`,
  };
  const deks = {
    glossary: `Penjelasan ${label} untuk pemahaman ${topic} yang realistis: arti, contoh pemakaian, dan salah kaprah yang sering kejadian.`,
    guide: `Panduan ${label} dengan langkah konkret, risiko yang perlu diwaspadai, plus checklist singkat sebelum diterapkan.`,
    game: `Ringkasan ${label}: karakter permainan, hal wajib dicek, dan kapan sebaiknya skip.`,
    tip: `Cara menerapkan ${label} supaya hiburan ${topic} tetap terkendali dan tidak bikin keputusan impulsif.`,
  };
  return {
    title: `${titles[kind]} | Superdewa`,
    h1: h1s[kind],
    dek: deks[kind],
    description: deks[kind],
    keyword,
  };
}

function uniqueExtras(slug, label, topic, kind) {
  const scenarios = [
    `Bayangin kamu baru masuk session ${topic} dengan budget terbatas: paham <strong>${esc(label)}</strong> membantu kamu menolak keputusan “sekali lagi” yang gak ada dasarnya.`,
    `Kalau temanmu cuma kirim screenshot tanpa konteks, kamu yang sudah paham <strong>${esc(label)}</strong> bisa filter mana yang info dan mana yang bait FOMO.`,
    `Di HP, keputusan cenderung lebih cepat. Itu kenapa konsep <strong>${esc(label)}</strong> perlu “nempel” sebelum jari otomatis klik.`,
  ];
  const closers = [
    `Intinya sederhana: makin jelas konsepnya, makin kecil peluang kamu membiarkan emosi yang nyetir.`,
    `Kalau setelah baca ini kamu bisa jelasin ulang dengan bahasa sendiri, berarti fondasinya sudah mulai berdiri.`,
    `Simpan page ini sebagai catatan singkat, lalu balik lagi setelah satu session untuk bandingkan teori vs pengalamanmu.`,
  ];
  return {
    scenario: pick(slug + "sc", scenarios),
    closer: pick(slug + "cl", closers),
    headingWhy: pick(slug + "why", [
      `Kenapa ${esc(label)} penting di ${esc(topic)}?`,
      `Manfaat praktis paham ${esc(label)}`,
      `${esc(label)} dan pengaruhnya ke keputusanmu`,
    ]),
    headingHow: pick(slug + "how", [
      `Cara menerapkan ${esc(label)} di sesi nyata`,
      `Langkah singkat supaya ${esc(label)} kebawa ke praktik`,
      `Urutan cek yang masuk akal`,
    ]),
    headingMiss: pick(slug + "miss", [
      `Salah kaprah yang sering kejadian`,
      `Kesalahan umum soal ${esc(label)}`,
      `Jebakan yang sebaiknya dihindari`,
    ]),
  };
}

export function buildProse(item, site) {
  const { slug, label, kind, keyword } = item;
  const topic = site.topic;
  const ref = shortRef(label, kind);
  const L = esc(label);
  const R = esc(ref);
  const T = esc(topic);
  const K = esc(keyword);
  const fact = inferFact(slug, label, topic);
  const opener = pick(slug + kind, OPENERS[kind])(L, T);
  const extra = uniqueExtras(slug, label, topic, kind);

  const blocks = [opener];
  blocks.push(`<div class="def-box"><strong>Intinya</strong><p>${esc(fact.meaning)}</p></div>`);

  if (kind === "glossary") {
    blocks.push(`<h2>${extra.headingWhy}</h2>`);
    blocks.push(`<p>${esc(fact.useful)}</p>`);
    if (fact.example) blocks.push(`<p>${esc(fact.example)}</p>`);
    blocks.push(`<h2>${extra.headingHow}</h2>`);
    blocks.push(`<ol>
      <li>Buka info/aturan/paytable, cari bagian yang relevan dengan ${R}.</li>
      <li>Samakan pemahamanmu dengan teks resmi—jangan cuma dari chat.</li>
      <li>Hubungkan ke batas session: waktu, uang, dan ukuran taruhan.</li>
      <li>Putuskan lanjut, ganti game/pasar, atau istirahat.</li>
    </ol>`);
    blocks.push(`<h2>${extra.headingMiss}</h2>`);
    blocks.push(`<ul>${fact.mistakes.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>`);
    blocks.push(`<p>${extra.scenario}</p>`);
    blocks.push(`<div class="tip-box"><strong>Catatan praktis</strong><p>${esc(fact.tip)}</p></div>`);
    blocks.push(`<p>Kalau kamu datang dari pencarian “${K}”, bawa pulang satu hal: istilah ini buat ngerapikan keputusan, bukan buat ngejar jaminan hasil.</p>`);
  } else if (kind === "guide") {
    blocks.push(`<h2>Persiapan sebelum mulai</h2>`);
    blocks.push(
      `<p>Siapkan budget hiburan yang rela hilang, timer, dan kondisi kepala yang masih waras. Panduan ini sulit menolong kalau kamu mulai dari mode balas dendam.</p>`
    );
    blocks.push(`<h2>Langkah praktis</h2>`);
    blocks.push(`<ol>
      <li>Tentukan tujuan session: belajar, hiburan singkat, atau eksplor fitur—pilih satu.</li>
      <li>Cek informasi terkait <strong>${K}</strong> di game/pasar yang kamu mainkan.</li>
      <li>Mulai dengan taruhan kecil sampai ritmenya kerasa.</li>
      <li>Terapkan pemahaman soal ${R} sesuai rencana; jangan improvisasi karena FOMO.</li>
      <li>Stop sesuai batas. Menang atau kalah, aturannya sama.</li>
    </ol>`);
    blocks.push(`<h2>${extra.headingMiss}</h2>`);
    blocks.push(`<ul>${fact.mistakes.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>`);
    blocks.push(`<p>${esc(fact.useful)}</p>`);
    if (fact.example) blocks.push(`<p>${esc(fact.example)}</p>`);
    blocks.push(`<div class="tip-box"><strong>Checklist cepat</strong><p>${esc(fact.tip)}</p></div>`);
    blocks.push(`<p>${extra.scenario}</p>`);
  } else if (kind === "game") {
    blocks.push(`<h2>Karakter ${L}</h2>`);
    blocks.push(`<p>${esc(fact.meaning)}</p>`);
    blocks.push(`<h2>Yang perlu discan sebelum main</h2>`);
    blocks.push(`<ul>
      <li>Cara menang dasar dan tempo permainan.</li>
      <li>Fitur yang menaikkan risiko (bonus buy, live bet, target tinggi, dll.).</li>
      <li>Batas meja / ukuran bet yang masuk akal untuk bankroll.</li>
      <li>Aturan keluar, settlement, atau cash-out jika relevan.</li>
    </ul>`);
    blocks.push(`<h2>Approach yang lebih sehat</h2>`);
    blocks.push(`<p>${esc(fact.useful)}</p>`);
    if (fact.example) blocks.push(`<p>${esc(fact.example)}</p>`);
    blocks.push(`<h2>Kapan lebih baik skip</h2>`);
    blocks.push(
      `<p>Skip ${L} kalau batas belum diset, emosi lagi naik, atau kamu cuma ikut hiruk-pikuk konten orang lain. Filter terbaik untuk pencarian “${K}”: apakah ini hiburan yang kamu kontrol?</p>`
    );
    blocks.push(`<div class="tip-box"><strong>Reminder</strong><p>${esc(fact.tip)}</p></div>`);
  } else {
    blocks.push(`<h2>Kenapa tips ini relevan</h2>`);
    blocks.push(`<p>${esc(fact.useful)}</p>`);
    blocks.push(`<h2>Cara apply hari ini</h2>`);
    blocks.push(`<ol>
      <li>Tulis batas waktu dan uang sebelum mulai.</li>
      <li>Jadikan <strong>${R}</strong> aturan yang tidak ditawar di tengah session.</li>
      <li>Kalau aturan dilanggar, session selesai—lanjut lain waktu.</li>
    </ol>`);
    blocks.push(`<h2>${extra.headingMiss}</h2>`);
    blocks.push(`<ul>${fact.mistakes.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>`);
    blocks.push(`<div class="tip-box"><strong>Praktikkan</strong><p>${esc(fact.tip)}</p></div>`);
    blocks.push(`<p>${extra.scenario}</p>`);
  }

  const faqs = [
    {
      q: `Apakah paham ${ref} menjamin hasil lebih baik?`,
      a: `Tidak ada jaminan. Yang biasanya membaik adalah kualitas keputusan dan kontrol diri. Hasil di ${topic} tetap berisiko.`,
    },
    {
      q: `Cocok untuk pemula?`,
      a: `Cocok. Justru pemula lebih diuntungkan jika fondasi istilah dan kebiasaan dibenahi lebih awal.`,
    },
    {
      q: `Harus hafal semua istilah ${topic}?`,
      a: `Tidak. Mulai dari yang sering muncul di layar/aturan, lalu perluas bertahap lewat glosarium.`,
    },
  ];

  blocks.push(`<h2>Pertanyaan yang sering muncul</h2>`);
  blocks.push(
    `<div class="faq">${faqs
      .map((f, i) => `<details${i === 0 ? " open" : ""}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
      .join("")}</div>`
  );
  blocks.push(`<p>${extra.closer}</p>`);

  return blocks.join("\n");
}

export function enrichItem(raw, kind, site) {
  const [slug, label, keyword] = raw;
  const base = { slug, label, keyword, kind };
  const meta = naturalMeta(base, site);
  const fact = inferFact(slug, label, site.topic);
  return {
    ...base,
    ...meta,
    blurb: fact.meaning,
  };
}
