// Data Pertanyaan & Matriks Penilaian Skrining Mandiri Tingkat Ketergantungan Iffah
// Berdasarkan adaptasi Cyber Pornography Addiction Screen (CPAS) & Indikator Tazkiyatun Nafs

export const screeningQuestions = [
  {
    id: 1,
    category: "Kontrol Impuls",
    question: "Apakah kamu sering berniat hanya melihat 'sebentar' (1-2 menit), namun akhirnya kebablasan berselancar berjam-jam?",
    desc: "Ini menunjukkan apakah Prefrontal Cortex (rem otak) masih mampu menghentikan dorongan impulsif atau sudah dibajak sistem limbik.",
    options: [
      { text: "Tidak Pernah (Selalu mampu mengontrol durasi)", score: 0 },
      { text: "Kadang-kadang (1-2 kali dalam sebulan)", score: 1 },
      { text: "Sering (Hampir setiap kali membuka gadget)", score: 2 },
      { text: "Selalu (Sama sekali tidak bisa berhenti hingga lelah)", score: 3 }
    ]
  },
  {
    id: 2,
    category: "Toleransi Dopamin",
    question: "Apakah konten yang kamu cari terasa semakin ekstrem, tidak biasa, atau membutuhkan durasi lebih lama untuk merasakan kepuasan yang sama?",
    desc: "Fenomena desensitisasi reseptor dopamin (down-regulation) membuat otak menuntut stimulus yang semakin abnormal.",
    options: [
      { text: "Tidak Pernah (Tidak ada peningkatan)", score: 0 },
      { text: "Sedikit (Kadang mencari variasi baru)", score: 1 },
      { text: "Ya, Cukup Nyata (Konten biasa sudah tidak mempan)", score: 2 },
      { text: "Sangat Nyata (Terjebak pada kategori yang sebelumnya membuatku jijik)", score: 3 }
    ]
  },
  {
    id: 3,
    category: "Pelarian Emosional (Coping)",
    question: "Apakah kamu secara otomatis lari ke pornografi saat merasa stres, tertekan, kesepian, cemas, atau lelah setelah beraktivitas?",
    desc: "Tanda bahwa pornografi telah bertindak sebagai 'obat bius' kimiawi untuk menidurkan emosi negatif alih-alih diselesaikan dengan sehat.",
    options: [
      { text: "Tidak Pernah (Mencari solusi lain / wudhu / istirahat)", score: 0 },
      { text: "Jarang (Hanya sesekali saat stres berat)", score: 1 },
      { text: "Sering (Sudah menjadi kebiasaan otomatis pelarian)", score: 2 },
      { text: "Selalu (Satu-satunya cara yang kukenal untuk meredakan beban)", score: 3 }
    ]
  },
  {
    id: 4,
    category: "Gejala Sakau (Withdrawal)",
    question: "Ketika berusaha berhenti selama beberapa hari, apakah kamu merasa gelisah, lekas marah, hampa (*brain fog*), atau sulit konsentrasi?",
    desc: "Sindrom putus zat (*withdrawal*) terjadi saat otak kelaparan suplai dopamin buatan yang biasanya diterimanya.",
    options: [
      { text: "Tidak Pernah (Pikiran tetap tenang dan fokus)", score: 0 },
      { text: "Ringan (Merasa agak gelisah di hari ke 2-3)", score: 1 },
      { text: "Cukup Berat (Cemas berlebihan dan emosi meledak-ledak)", score: 2 },
      { text: "Sangat Berat (Merasa tidak berdaya dan tersiksa)", score: 3 }
    ]
  },
  {
    id: 5,
    category: "Disfungsi Kehidupan & Sosial",
    question: "Apakah kebiasaan ini mulai mengganggu produktivitas harianmu, membuatmu malas bangun subuh, menunda tugas, atau takut menatap mata orang lain?",
    desc: "Kecanduan pornografi mengikis rasa percaya diri dan menimbulkan kecemasan sosial (*social anxiety*).",
    options: [
      { text: "Tidak Pernah (Aktivitas berjalan normal)", score: 0 },
      { text: "Sedikit Mengganggu (Kadang terlambat bangun atau lesu)", score: 1 },
      { text: "Sering Mengganggu (Tugas terbengkalai dan malas bersosialisasi)", score: 2 },
      { text: "Sangat Parah (Hidup terasa kacau dan kehilangan arah)", score: 3 }
    ]
  },
  {
    id: 6,
    category: "Dampak Spiritual & Hati",
    question: "Bagaimana dampak kebiasaan ini terhadap ibadahmu? Apakah sholat terasa hampa, tilawah terasa berat, dan rasa bersalah mulai memudar?",
    desc: "Titik-titik hitam (*ar-ran*) menutupi hati hingga mata batin (*bashirah*) kehilangan kepekaan terhadap dosa.",
    options: [
      { text: "Alhamdulillah Sholat Tetap Terjaga & Khusyuk", score: 0 },
      { text: "Kadang Menunda Sholat dan Merasa Bersalah Mendalam", score: 1 },
      { text: "Sering Melalaikan Sholat dan Ibadah Terasa Hambar", score: 2 },
      { text: "Mati Rasa (Rasa malu dan takut kepada Allah mulai tumpul)", score: 3 }
    ]
  },
  {
    id: 7,
    category: "Kerahasiaan & Penyamaran",
    question: "Apakah kamu merasa sangat panik atau ketakutan jika ada orang lain (orang tua/pasangan/rekan) yang meminjam atau membuka ponselmu?",
    desc: "Menunjukkan beban mental yang berat akibat hidup dalam dua kepribadian yang berbeda (*split identity*).",
    options: [
      { text: "Biasa Saja (Tidak ada rahasia kotor yang disembunyikan)", score: 0 },
      { text: "Agak Waspada (Selalu mengaktifkan mode incognito)", score: 1 },
      { text: "Cukup Cemas (Selalu menghapus riwayat dan mengunci aplikasi)", score: 2 },
      { text: "Panik Luar Biasa (Ketakutan ekstrem aib terbongkar)", score: 3 }
    ]
  },
  {
    id: 8,
    category: "Siklus Kambuh (Relapse Loop)",
    question: "Berapa kali kamu berjanji atau bahkan bersumpah untuk berhenti selamanya, namun tetap kembali jatuh dalam beberapa hari kemudian?",
    desc: "Mengukur seberapa kuat 'lingkaran setan' adiksi mengikat kesadaran dan tekadmu.",
    options: [
      { text: "Belum pernah terjebak siklus ini", score: 0 },
      { text: "1 - 3 kali pernah mencoba berhenti dan terpeleset", score: 1 },
      { text: "Sering sekali (Puluhan kali berjanji dan selalu gagal)", score: 2 },
      { text: "Sudah tidak terhitung dan hampir putus asa dari usaha berhenti", score: 3 }
    ]
  }
];

export const severityLevels = [
  {
    minScore: 0,
    maxScore: 6,
    level: "Tahap Awal / Waspada Ringan (Mild Phase)",
    badgeColor: "from-teal-600 to-emerald-600",
    badgeText: "Tingkat Rendah",
    summary: "Alhamdulillah! Sirkuit saraf otakmu belum mengalami kerusakan struktural yang parah. Kamu berada dalam fase yang sangat mudah untuk diputus total.",
    brainCondition: "Prefrontal Cortex masih memiliki kendali yang kuat. Reseptor dopamin belum mengalami penurunan drastis, namun benih kebiasaan sudah mulai tertanam jika tidak segera dicabut.",
    actionPlan: [
      "Pasang pemblokir konten dan safe-search di semua perangkat.",
      "Terapkan aturan ketat: Jangan pernah membawa ponsel ke kasur saat mengantuk.",
      "Perbanyak puasa sunnah Senin-Kamis untuk melatih daya tahan hawa nafsu.",
      "Hapus aplikasi media sosial yang memuat konten setengah telanjang (*softcore*)."
    ],
    targetDays: "Target Detoks: 14 Hari Bersih untuk Reset Total"
  },
  {
    minScore: 7,
    maxScore: 14,
    level: "Tahap Ketergantungan Sedang (Moderate Dependency)",
    badgeColor: "from-amber-600 to-orange-600",
    badgeText: "Tingkat Sedang",
    summary: "Peringatan Serius! Kebiasaan ini sudah mulai membajak sistem hadiah otak (*reward pathway*) dan mempengaruhi kestabilan emosi serta kekhusyukan ibadahmu.",
    brainCondition: "Prefrontal Cortex mulai mengalami kelelahan fungsional. Otakmu mulai mengaitkan rasa bosan, stres, atau lelah dengan pornografi sebagai jalan keluar cepat.",
    actionPlan: [
      "Wajib terapkan Aturan Cas HP di Luar Kamar (Jarak minimal 2 meter dari ranjang).",
      "Gunakan Tombol Darurat SOS Iffah setiap kali dorongan (urge) memuncak di 90 detik pertama.",
      "Isi kekosongan waktu dengan olahraga fisik intensif untuk memproduksi dopamin sehat.",
      "Lakukan shalat sunnah taubat 2 rakaat dan mulailah mencatat pemicu HALT di Jurnal Muhasabah."
    ],
    targetDays: "Target Detoks: 30 Hari Bersih untuk Pemulihan Sirkuit Otak"
  },
  {
    minScore: 15,
    maxScore: 24,
    level: "Tahap Kecanduan Kronis (Severe / High Dependency)",
    badgeColor: "from-rose-600 to-red-700",
    badgeText: "Tingkat Kronis",
    summary: "Darurat Jiwa & Otak! Kamu sedang berada dalam cengkeraman adiksi tingkat tinggi. Kamu membutuhkan intervensi radikal, komitmen total, dan pertolongan Allah secara sungguh-sungguh.",
    brainCondition: "Otak mengalami 'Hypofrontality' (rem logika melemah drastis). Reseptor dopamin D2 mengalami desensitisasi berat, menyebabkan brain fog, mati rasa spiritual, dan dorongan kompulsi yang sangat kuat.",
    actionPlan: [
      "Sadari bahwa kamu TIDAK BISA berjuang sendirian: bergabunglah di Halaqah Iffah untuk saling mendoakan.",
      "Tandatangani Ikrar Janji Suci 'Iffah di Benteng Kesucian sebagai akad komitmen di hadapan Allah.",
      "Ganti smartphone dengan ponsel dasar (dumbphone) untuk sementara waktu jika memungkinkan, atau minta orang terpercaya memasang sandi pemblokir.",
      "Rutin dengarkan Murottal Surah An-Nur dan Surah Az-Zumar setiap malam untuk mencairkan kekerasan hati.",
      "Konsultasikan dengan konselor profesional atau asatidz jika merasa butuh pendampingan intensif."
    ],
    targetDays: "Target Detoks: 90 Hari Bersih (Full Reboot Neuroplastisitas)"
  }
];
