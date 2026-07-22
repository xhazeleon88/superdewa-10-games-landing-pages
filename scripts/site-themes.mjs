/**
 * Per-site identity: treat each domain as a separate website.
 * Shared only: Superdewa logo + footer group links.
 */

export const themes = {
  slot: {
    themeClass: "theme-slot",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Plus+Jakarta+Sans:wght@400;600;700&family=Saira+Condensed:wght@600;700&display=swap",
    fontDisplay: '"Saira Condensed", "Orbitron", sans-serif',
    fontBody: '"Plus Jakarta Sans", sans-serif',
    favicon: "bolt",
    nav: ["Kamus Slot", "Cara Main", "Tipe Game", "Tips Spin", "Tanya Jawab"],
    navHrefs: ["glosarium", "panduan", "game", "tips", "faq"],
    ctaPrimary: "Buka Kamus Slot",
    ctaSecondary: "Mulai dari Cara Main",
    homeSections: {
      introH2: "Kenapa kamus slot ini ada?",
      introP:
        "Biar kamu gak main sambil nebak-nebak istilah. Di sini fondasi slot dibahas lurus: RTP, scatter, volatilitas, sampai cara atur bet.",
      stepsH2: "Alur belajar yang disarankan",
      steps: [
        ["Baca istilah inti", "Mulai dari RTP, wild, scatter, dan paytable."],
        ["Coba panduan praktis", "Ikuti cara atur bet & pilih volatilitas."],
        ["Kunci batas session", "Timer + stop-loss sebelum jari gas terus."],
      ],
      glossH2: "Istilah yang paling sering bikin bingung",
      glossP: "Ini pintasan ke kamus—klik yang paling sering kamu dengar di obrolan.",
      guideH2: "Panduan buat yang baru pegang slot",
      guideP: "Bukan teori panjang. Lebih ke langkah yang bisa langsung dicoba.",
      faqH2: "Yang sering ditanya soal slot",
      faqs: [
        [
          "RTP tinggi berarti gampang menang hari ini?",
          "Tidak. RTP itu ekspektasi jangka panjang, bukan ramalan session pendek.",
        ],
        [
          "Harus mulai dari game apa?",
          "Mulai dari yang paytable-nya kamu ngerti, bet kecil, dan ritmenya kamu tahan.",
        ],
        [
          "Apa bedanya demo dan real?",
          "Mekaniknya mirip, tekanannya beda. Demo buat belajar; real butuh batas uang yang jelas.",
        ],
        [
          "Kok sering dengar ‘pola gacor’?",
          "Kebanyakan itu narasi. Hasil spin tetap acak; yang bisa kamu kontrol cuma budget dan durasi.",
        ],
      ],
    },
    indexLabels: {
      glosarium: ["Kamus Slot", "Kumpulan istilah slot yang dijelasin biar keputusanmu lebih sadar."],
      panduan: ["Cara Main Slot", "Panduan langkah demi langkah tanpa overclaim."],
      game: ["Tipe & Mekanik Slot", "Bedah tipe game biar kamu tahu lagi ngadepin ritme seperti apa."],
      tips: ["Tips Session Slot", "Habit kecil biar spin tetap hiburan, bukan balas dendam."],
    },
    voice: "slot",
  },

  pg: {
    themeClass: "theme-pg",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Syne:wght@700;800&display=swap",
    fontDisplay: '"Syne", sans-serif',
    fontBody: '"DM Sans", sans-serif',
    favicon: "tile",
    nav: ["Istilah PG", "Guide PG Soft", "Judul Populer", "Habit Main", "FAQ PG"],
    navHrefs: ["glosarium", "panduan", "game", "tips", "faq"],
    ctaPrimary: "Pelajari Istilah PG",
    ctaSecondary: "Guide Cascading",
    homeSections: {
      introH2: "PG Soft itu soal ritme cascading",
      introP:
        "Kalau kamu sering main Mahjong Ways atau Lucky Neko, paham multiplier trail & cascading bikin ekspektasi jauh lebih realistis.",
      stepsH2: "Cara eksplor PG Soft tanpa buru-buru",
      steps: [
        ["Pahami cascading", "Simbol hilang, yang baru jatuh—satu spin bisa lanjut."],
        ["Baca multiplier trail", "Jangan cuma lihat angka besar di highlight orang."],
        ["Main portrait dengan sadar", "Nyaman di HP, tapi tetap set timer."],
      ],
      glossH2: "Istilah khas PG yang worth dihafal",
      glossP: "Dari tumble sampai energy meter—biar UI PG gak terasa alien.",
      guideH2: "Guide judul & mekanik PG Soft",
      guideP: "Fokus ke cara baca fitur, bukan kejar klaim kemenangan.",
      faqH2: "FAQ seputar PG Soft",
      faqs: [
        [
          "Kenapa cascading terasa beda dari payline biasa?",
          "Karena kemenangan bisa berantai dalam satu putaran saat simbol diganti yang baru.",
        ],
        [
          "Apakah multiplier trail selalu naik tiap menang?",
          "Tergantung judul. Baca aturan di info game—jangan samakan semua title PG.",
        ],
        [
          "Cocok main di HP?",
          "Ya, banyak title PG memang nyaman di portrait. Tetap jaga postur & durasi main.",
        ],
        [
          "Perlu pakai feature buy?",
          "Opsional. Pelajari dulu base game; buy fitur bisa menghabiskan budget lebih cepat.",
        ],
      ],
    },
    indexLabels: {
      glosarium: ["Istilah PG Soft", "Kosakata cascading, trail, dan fitur khas PG."],
      panduan: ["Guide PG Soft", "Cara memahami judul dan mekanik tanpa drama."],
      game: ["Judul PG Soft", "Breakdown game populer biar kamu pilih dengan sadar."],
      tips: ["Habit Main PG", "Tips biar session portrait tetap terkendali."],
    },
    voice: "pg",
  },

  pp: {
    themeClass: "theme-pp",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Manrope:wght@400;600;700&display=swap",
    fontDisplay: '"Archivo Black", sans-serif',
    fontBody: '"Manrope", sans-serif',
    favicon: "olympus",
    nav: ["Glosarium PP", "Cara Main PP", "Title Hits", "Disiplin Bet", "FAQ"],
    navHrefs: ["glosarium", "panduan", "game", "tips", "faq"],
    ctaPrimary: "Glosarium Pragmatic",
    ctaSecondary: "Bedah Tumble",
    homeSections: {
      introH2: "Pragmatic Play: tumble, ante, dan ekspektasi realistis",
      introP:
        "Dari Gates of Olympus sampai Sweet Bonanza—situs ini fokus nerjemahin mekanik PP biar kamu gak cuma ikut highlight multiplier.",
      stepsH2: "Tiga pintu masuk ke dunia PP",
      steps: [
        ["Kenali tumble", "Simbol menang hilang, peluang lanjut di spin yang sama."],
        ["Pahami ante & buy", "Shortcut ada harganya—hitung dulu."],
        ["Set bankroll ketat", "High volatility PP butuh napas dan batas jelas."],
      ],
      glossH2: "Kosakata Pragmatic yang sering muncul",
      glossP: "Ante bet, tumble, max win—dibahas biar gak salah arti.",
      guideH2: "Cara main title PP yang ramai dicari",
      guideP: "Guide praktis per mekanik dan per judul populer.",
      faqH2: "Tanya jawab Pragmatic Play",
      faqs: [
        [
          "Ante bet itu wajib?",
          "Tidak. Ante biasanya menaikkan peluang fitur dengan biaya ekstra per spin.",
        ],
        [
          "Bonus buy selalu worth it?",
          "Tidak selalu. Harganya mahal relatif ke bankroll kecil; cocok hanya jika kamu sudah paham fiturnya.",
        ],
        [
          "Kenapa hasil bisa kering lama?",
          "Banyak title PP volatilitas tinggi. Dry spell itu bagian dari ritme, bukan ‘mesin rusak’.",
        ],
        [
          "Max win artinya dijamin kepake?",
          "Tidak. Max win adalah langit-langit teoretis, bukan event harian.",
        ],
      ],
    },
    indexLabels: {
      glosarium: ["Glosarium Pragmatic", "Istilah tumble, ante, multiplier, dan sejenisnya."],
      panduan: ["Cara Main Pragmatic", "Panduan mekanik & title hits secara realistis."],
      game: ["Title Pragmatic", "Kupasan game yang sering jadi bahan obrolan."],
      tips: ["Disiplin Bet PP", "Supaya high volatility tidak menyeret emosi."],
    },
    voice: "pp",
  },

  habanero: {
    themeClass: "theme-habanero",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&family=Teko:wght@600;700&display=swap",
    fontDisplay: '"Teko", sans-serif',
    fontBody: '"Rubik", sans-serif',
    favicon: "flame",
    nav: ["Istilah Hab", "Tutorial", "Game Hab", "Tips Arcade", "FAQ"],
    navHrefs: ["glosarium", "panduan", "game", "tips", "faq"],
    ctaPrimary: "Lihat Istilah Habanero",
    ctaSecondary: "Tutorial Koi Gate dkk",
    homeSections: {
      introH2: "Habanero: klasik, feature-rich, vibe arcade",
      introP:
        "Kalau kamu suka ritme yang gak selalu ‘modern glossy’, Habanero punya karakter sendiri—dari stacked symbols sampai gamble feature.",
      stepsH2: "Cara kenalan sama Habanero",
      steps: [
        ["Baca fitur klasik", "Stacked, expanding, pick bonus—beda nuansa."],
        ["Hati-hati gamble feature", "Double or nothing itu godaan, bukan kewajiban."],
        ["Pilih tema yang nyaman", "Main lebih awet kalau visualnya gak bikin pusing."],
      ],
      glossH2: "Istilah Habanero yang sering kelewat",
      glossP: "Supaya paytable Hab gak cuma dilewatin.",
      guideH2: "Tutorial judul & fitur Habanero",
      guideP: "Dari Koi Gate sampai Fa Cai Shen—dibahas biar mekaniknya kebaca.",
      faqH2: "FAQ Habanero",
      faqs: [
        [
          "Gamble feature aman dipakai?",
          "Bisa, tapi risikonya nyata: bisa menggandakan atau menghanguskan kemenangan tadi. Pakai batas ketat.",
        ],
        [
          "Habanero cocok untuk pemula?",
          "Ya, terutama title dengan aturan yang lebih sederhana—asal paytable dibaca dulu.",
        ],
        [
          "Kenapa terasa beda dari PG/PP?",
          "Ritme, gaya fitur, dan presentasi visualnya beda keluarga. Jangan samakan semua provider.",
        ],
        [
          "Perlu kejar jackpot Hab?",
          "Jackpot boleh jadi hiburan, tapi jangan jadi alasan naikkan bet di luar rencana.",
        ],
      ],
    },
    indexLabels: {
      glosarium: ["Istilah Habanero", "Kosakata fitur klasik sampai gamble."],
      panduan: ["Tutorial Habanero", "Cara paham title dan fitur khas Hab."],
      game: ["Game Habanero", "Cuplikan judul yang sering jadi pintu masuk."],
      tips: ["Tips Arcade Hab", "Main nyaman tanpa ketipu godaan fitur."],
    },
    voice: "habanero",
  },

  microgaming: {
    themeClass: "theme-microgaming",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap",
    fontDisplay: '"Cormorant Garamond", serif',
    fontBody: '"Source Sans 3", sans-serif',
    favicon: "gem",
    nav: ["Glosarium MG", "Panduan Jackpot", "Title Legend", "Etika Bankroll", "FAQ"],
    navHrefs: ["glosarium", "panduan", "game", "tips", "faq"],
    ctaPrimary: "Pahami Jackpot Network",
    ctaSecondary: "Baca Glosarium MG",
    homeSections: {
      introH2: "Microgaming: klasik legend & jackpot network",
      introP:
        "Dari Mega Moolah sampai Immortal Romance—situs ini menekankan ekspektasi realistis soal progressive, bukan fantasi ‘cepat kaya’.",
      stepsH2: "Fondasi sebelum kejar jackpot",
      steps: [
        ["Pahami pool progresif", "Jackpot naik dari kontribusi, peluang tetap kecil."],
        ["Pisahkan budget", "Anggaran jackpot ≠ anggaran main harian."],
        ["Hormati ritme klasik", "Banyak title MG punya tempo berbeda dari slot modern."],
      ],
      glossH2: "Istilah Microgaming yang wajib jelas",
      glossP: "Progressive network, must drop, contribution—dibahas tanpa mistis.",
      guideH2: "Panduan jackpot & title legend",
      guideP: "Belajar mekanik dulu; highlight jackpot belakangan.",
      faqH2: "FAQ Microgaming & jackpot",
      faqs: [
        [
          "Apakah progressive lebih untung?",
          "Tidak otomatis. Pot besar biasanya dibarengi peluang kecil dan kontribusi dari taruhan.",
        ],
        [
          "Harus main taruhan besar agar jackpot jatuh?",
          "Aturan tiap game beda. Yang pasti: jangan naikkan bet di luar bankroll hanya karena ‘kerasa mau jatuh’.",
        ],
        [
          "Apa itu must-drop?",
          "Konsep jackpot yang akan jatuh sebelum batas waktu/nilai tertentu—tetap bukan jaminan untuk kamu secara pribadi.",
        ],
        [
          "Cocok untuk main santai?",
          "Bisa, pilih title non-jackpot atau bet kecil, dan perlakukan jackpot sebagai bonus jarang.",
        ],
      ],
    },
    indexLabels: {
      glosarium: ["Glosarium Microgaming", "Istilah jackpot network dan fitur klasik."],
      panduan: ["Panduan Jackpot MG", "Cara baca progressive dengan kepala dingin."],
      game: ["Title Legend MG", "Game yang sering jadi rujukan sejarah slot."],
      tips: ["Etika Bankroll MG", "Supaya mimpi jackpot tidak mengalahkan batas."],
    },
    voice: "microgaming",
  },

  nolimit: {
    themeClass: "theme-nolimit",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap",
    fontDisplay: '"Space Grotesk", sans-serif',
    fontBody: '"IBM Plex Sans", sans-serif',
    favicon: "xmark",
    nav: ["x-Terms", "Decode NLC", "Title Extreme", "Risk Rules", "FAQ"],
    navHrefs: ["glosarium", "panduan", "game", "tips", "faq"],
    ctaPrimary: "Decode xNudge & xWays",
    ctaSecondary: "Lihat Risk Rules",
    homeSections: {
      introH2: "Nolimit City: extreme volatility, mekanik x-series",
      introP:
        "Kalau UI-nya terasa agresif, itu disengaja. Di sini kita translate xNudge, xWays, xBet biar kamu sadar risikonya sebelum masuk.",
      stepsH2: "Masuk Nolimit dengan protokol aman",
      steps: [
        ["Demo wajib", "Pelajari transformasi simbol tanpa tekanan uang."],
        ["Bankroll mikro", "Stake yang rela hilang—bukan uang tagihan."],
        ["Session pendek", "Extreme volatility + session panjang = gampang tilt."],
      ],
      glossH2: "Kamus x-series Nolimit City",
      glossP: "Supaya nama fitur gak cuma keren di telinga.",
      guideH2: "Decode title & mekanik NLC",
      guideP: "Mental, Tombstone, Fire in the Hole—dibahas dari sisi risiko.",
      faqH2: "FAQ Nolimit City",
      faqs: [
        [
          "Kenapa Nolimit terasa gila ayunannya?",
          "Banyak title memang extreme volatility: sepi lama, lalu ada potensi lonjakan tajam.",
        ],
        [
          "Apa itu xNudge?",
          "Mekanik yang ‘mendorong’ simbol khusus (sering wild) supaya membantu terbentuknya kombinasi—detailnya beda per game.",
        ],
        [
          "Bonus buy di NLC untuk pemula?",
          "Umumnya tidak disarankan di awal. Pahami dulu base game dan biaya buy-nya.",
        ],
        [
          "Satu tips paling penting?",
          "Jangan main Nolimit untuk ‘balik modal’. Treat sebagai hiburan berisiko tinggi.",
        ],
      ],
    },
    indexLabels: {
      glosarium: ["Kamus x-Series", "xNudge, xWays, xBet, dan istilah extreme lain."],
      panduan: ["Decode Nolimit", "Panduan mekanik tanpa romantisasi risiko."],
      game: ["Title Extreme NLC", "Game dengan karakter tegas dan ayunan tajam."],
      tips: ["Risk Rules", "Aturan main biar adrenaline tidak merusak budget."],
    },
    voice: "nolimit",
  },

  live: {
    themeClass: "theme-live",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Nunito+Sans:wght@400;600;700&display=swap",
    fontDisplay: '"Playfair Display", serif',
    fontBody: '"Nunito Sans", sans-serif',
    favicon: "chip",
    nav: ["Istilah Meja", "Tutorial Live", "Jenis Permainan", "Etiket & Tips", "FAQ"],
    navHrefs: ["glosarium", "panduan", "game", "tips", "faq"],
    ctaPrimary: "Belajar Istilah Meja",
    ctaSecondary: "Tutorial Roulette & Baccarat",
    homeSections: {
      introH2: "Live casino: dealer nyata, tempo nyata, etiket nyata",
      introP:
        "Bedanya dengan slot: ada betting window, table limit, dan interaksi. Situs ini bantu kamu duduk di meja tanpa awkward.",
      stepsH2: "Persiapan sebelum masuk meja",
      steps: [
        ["Cek table limit", "Jangan masuk VIP kalau bankroll belum siap."],
        ["Pahami pasar dasar", "Roulette, baccarat, blackjack—pilih satu dulu."],
        ["Jaga tempo", "Speed table enak, tapi keputusan jadi lebih buru-buru."],
      ],
      glossH2: "Istilah meja yang bikin kamu kelihatan siap",
      glossP: "Dari betting spot sampai roadmap—dibahas apa adanya.",
      guideH2: "Tutorial live yang paling sering dibutuhkan",
      guideP: "Cara main dasar tanpa pura-pura jadi high roller.",
      faqH2: "FAQ live casino",
      faqs: [
        [
          "Roadmap baccarat bisa diprediksi?",
          "Roadmap adalah catatan hasil, bukan ramalan wajib. Hati-hati fallacy ‘pasti balik’.",
        ],
        [
          "Lebih baik classic atau speed table?",
          "Classic lebih longgar buat belajar; speed menuntut keputusan cepat.",
        ],
        [
          "Side bet worth it?",
          "Payout menarik biasanya dibarengi probabilitas lebih sulit. Pelajari dulu payout table-nya.",
        ],
        [
          "Boleh ikut chat dealer?",
          "Boleh selama sopan. Fokus utama tetap keputusan taruhan dan batasmu.",
        ],
      ],
    },
    indexLabels: {
      glosarium: ["Istilah Meja Live", "Kosakata dealer, limit, payout, dan etiket."],
      panduan: ["Tutorial Live Casino", "Roulette, baccarat, blackjack—dasar yang rapi."],
      game: ["Jenis Permainan Live", "Pilih meja yang sesuai tempo dan budget."],
      tips: ["Etiket & Tips Meja", "Supaya session live tetap nyaman dan terkendali."],
    },
    voice: "live",
  },

  crash: {
    themeClass: "theme-crash",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap",
    fontDisplay: '"JetBrains Mono", monospace',
    fontBody: '"IBM Plex Sans", sans-serif',
    favicon: "curve",
    nav: ["Terms Crash", "Playbook", "Strategi Target", "Anti-FOMO", "FAQ"],
    navHrefs: ["glosarium", "panduan", "game", "tips", "faq"],
    ctaPrimary: "Buka Playbook Crash",
    ctaSecondary: "Pahami Auto Cash Out",
    homeSections: {
      introH2: "Crash games: kurva naik, keputusan harus dingin",
      introP:
        "Ini bukan soal nebak detik crash. Ini soal target, cash-out, dan menolak FOMO saat grafik masih ‘kerasa naik’.",
      stepsH2: "Protokol crash sebelum round pertama",
      steps: [
        ["Tentukan target", "Contoh 1.5x—tulis sebelum mulai."],
        ["Aktifkan auto cash out", "Jangan andalkan klik panik."],
        ["Batasi jumlah round", "Session pendek mengalahkan ego."],
      ],
      glossH2: "Istilah crash yang harus steril dari mitos",
      glossP: "Crash point, latency, streak bias—dibahas biar gak ketipu pola palsu.",
      guideH2: "Playbook cash-out & manajemen risk",
      guideP: "Langkah praktis biar grafik tidak menyetir emosi.",
      faqH2: "FAQ crash games",
      faqs: [
        [
          "Apakah history round bisa diprediksi?",
          "History membantu melihat distribusi kasar, bukan menjamin crash point berikutnya.",
        ],
        [
          "Martingale cocok di crash?",
          "Berbahaya. Kekalahan beruntun bisa menghabiskan bankroll jauh sebelum ‘balik’.",
        ],
        [
          "Auto cash out lebih baik dari manual?",
          "Untuk disiplin, biasanya ya—terutama jika kamu mudah FOMO atau koneksinya tidak stabil.",
        ],
        [
          "Target kecil membosankan. Harus naik?",
          "Boleh ganti target antar session, bukan di tengah emosi setelah hampir kena crash.",
        ],
      ],
    },
    indexLabels: {
      glosarium: ["Terms Crash", "Definisi kurva, cash-out, dan bias yang sering menipu."],
      panduan: ["Playbook Crash", "Cara main dengan target dan protokol risiko."],
      game: ["Strategi Target", "Low/mid/high target dibahas tanpa ilusi."],
      tips: ["Anti-FOMO Crash", "Habit biar grafik tidak menang dari kepalamu."],
    },
    voice: "crash",
  },

  sports: {
    themeClass: "theme-sports",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Karla:wght@400;600;700&display=swap",
    fontDisplay: '"Oswald", sans-serif',
    fontBody: '"Karla", sans-serif',
    favicon: "whistle",
    nav: ["Kamus Odds", "Playbook Sports", "Pasar & Cabang", "Disiplin Slip", "FAQ"],
    navHrefs: ["glosarium", "panduan", "game", "tips", "faq"],
    ctaPrimary: "Belajar Baca Odds",
    ctaSecondary: "Playbook Handicap",
    homeSections: {
      introH2: "Sportsbook: melek odds dulu, baru ngisi slip",
      introP:
        "Bukan tipster drama. Ini modul biar kamu paham odds decimal, handicap, over/under, dan risiko parlay sebelum duit keluar.",
      stepsH2: "Urutan belajar sportsbook yang masuk akal",
      steps: [
        ["Baca odds decimal", "Tahu return dan implied probability."],
        ["Kuasai satu pasar", "1X2 atau O/U dulu sebelum handicap rumit."],
        ["Unit betting kecil", "Jaga bankroll dengan stake konsisten."],
      ],
      glossH2: "Kamus odds & pasar",
      glossP: "Dari push/void sampai juice—biar settlement gak bikin kaget.",
      guideH2: "Playbook pasar yang sering dipakai",
      guideP: "Handicap, parlay, live bet—dibahas dengan contoh logika.",
      faqH2: "FAQ sportsbook",
      faqs: [
        [
          "Parlay cara cepat untung?",
          "Parlay menaikkan potensi return sekaligus menaikkan peluang slip gugur. Perlakukan sebagai hiburan kecil.",
        ],
        [
          "Live bet lebih unggul?",
          "Bisa jadi edge jika kamu paham momentum; bisa jadi jebakan jika impulsif. Disiplin tetap nomor satu.",
        ],
        [
          "Perlu ikut tipster?",
          "Tidak wajib. Kalau ikut, audit track record dan jangan all-in karena ‘yakin banget’.",
        ],
        [
          "Satu liga saja boleh?",
          "Boleh dan sering lebih sehat. Pemahaman > jumlah slip.",
        ],
      ],
    },
    indexLabels: {
      glosarium: ["Kamus Odds", "Istilah sportsbook biar slip tidak gelap."],
      panduan: ["Playbook Sports", "Cara baca pasar dan kelola bankroll."],
      game: ["Pasar & Cabang", "Bola, basket, tenis, esports—pintu masuknya."],
      tips: ["Disiplin Slip", "Supaya chasing loss tidak merusak minggu ini."],
    },
    voice: "sports",
  },

  play: {
    themeClass: "theme-play",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Figtree:wght@400;600;700&display=swap",
    fontDisplay: '"Fraunces", serif',
    fontBody: '"Figtree", sans-serif',
    favicon: "shield",
    nav: ["Istilah Sehat", "Panduan Kontrol", "Topik Refleksi", "Habit Baik", "FAQ"],
    navHrefs: ["glosarium", "panduan", "game", "tips", "faq"],
    ctaPrimary: "Mulai dari Batas Sehat",
    ctaSecondary: "Kenali Tanda Bahaya",
    homeSections: {
      introH2: "Main boleh seru, asal tetap ada rem",
      introP:
        "Ini hub responsible play Superdewa: batas waktu, batas uang, tanda bahaya, dan cara minta jeda tanpa drama malu.",
      stepsH2: "Tiga rem yang bisa dipasang hari ini",
      steps: [
        ["Budget hiburan", "Pisahkan dari uang tagihan."],
        ["Timer session", "Alarm lebih jujur daripada feeling."],
        ["Rencana istirahat", "Tahu mau ngapain setelah stop."],
      ],
      glossH2: "Istilah kontrol diri yang perlu dibiasakan",
      glossP: "Self-exclusion, cooling-off, chasing losses—biar gak cuma jargon.",
      guideH2: "Panduan biar hiburan tidak berubah jadi beban",
      guideP: "Langkah konkret menjaga jarak sehat dengan game.",
      faqH2: "FAQ bermain bertanggung jawab",
      faqs: [
        [
          "Kalau masih ‘sanggup’, perlu batas?",
          "Perlu. Batas paling berguna dipasang saat masih sanggup, bukan setelah regrete.",
        ],
        [
          "Self-exclusion berarti lemah?",
          "Tidak. Itu keputusan dewasa buat melindungi waktu, uang, dan hubungan.",
        ],
        [
          "Bagaimana kalau teman mengajak main terus?",
          "Boleh tolak dengan alasan batas pribadi. Teman yang respect akan paham.",
        ],
        [
          "Ke mana lagi setelah baca ini?",
          "Terapkan satu rem hari ini, lalu jelajahi hub edukasi Superdewa Group sesuai minat—tetap dengan kontrol yang sama.",
        ],
      ],
    },
    indexLabels: {
      glosarium: ["Istilah Sehat", "Kosakata kontrol diri dan sinyal bahaya."],
      panduan: ["Panduan Kontrol", "Cara pasang batas dan jaga keseimbangan."],
      game: ["Topik Refleksi", "FOMO, tidur, uang vs hiburan, dan sejenisnya."],
      tips: ["Habit Baik", "Kebiasaan kecil yang menjaga kamu tetap waras."],
    },
    voice: "play",
  },
};

export function getTheme(siteId) {
  return themes[siteId];
}
