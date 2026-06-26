export default {
  header: { language: "Bahasa" },
  hero: {
    eyebrow: "Untuk Tokutei Ginou dan Magang Teknis",
    title: "Cek tipe karier Anda di Jepang",
    subtitle: "Gunakan pengalaman care atau rumah sakit untuk melihat petunjuk gaya kerja dan peluang penghasilan di Jepang.",
    startButton: "Coba cek tipe",
    bubble: "Bisa dicek 1 menit",
  },
  proof: {
    item1: { label: "Untuk", value: "Tokutei Ginou / Magang Teknis" },
    item2: { label: "Bahasa", value: "4 bahasa" },
    item3: { label: "Konsultasi", value: "OK via Messenger" },
  },
  quiz: { label: "Cek tipe karier", helper: "Pilih dengan intuisi", progress: "{current}/{total}" },
  calculating: {
    label: "Memeriksa",
    title: "Kami mencari tipe yang cocok untuk Anda.",
    copy: "Hasil disusun berdasarkan pengalaman dan keinginan Anda.",
  },
  result: {
    label: "Hasil cek",
    helper: "Hasil sudah keluar",
    darumaKicker: "Warna Daruma Anda",
    strengthsTitle: "Kelebihan Anda",
    cautionsTitle: "Poin sebelum konsultasi",
    copyButton: "Salin hasil",
    copied: "Disalin",
    messengerButton: "Tanya via Messenger",
    restartButton: "Cek lagi",
    instruction: "Saat Messenger terbuka, kirim pesan: “Hasil saya adalah {level}.”",
  },
  trust: {
    eyebrow: "Khusus Tokutei Ginou dan Magang Teknis",
    title: "Cek sederhana untuk menghubungkan pengalaman Anda ke pekerjaan berikutnya di Jepang.",
    copy: "Kami merapikan pengalaman care atau rumah sakit, level bahasa Jepang, dan kondisi kerja yang Anda inginkan sebelum konsultasi karier di Jepang.",
    item1: "Dirancang untuk bekerja di Jepang",
    item2: "Hasil langsung tampil",
    item3: "Bisa konsultasi via Messenger",
  },
  footer: {
    notice: "Ini adalah cek sederhana. Kondisi resmi akan dikonfirmasi saat konsultasi.",
    privacy: "Kebijakan privasi",
  },
  errors: { missingTranslation: "Beberapa teks tidak dapat ditampilkan." },
  questions: {
    experience: {
      text: "Apakah Anda pernah bekerja di fasilitas care atau rumah sakit?",
      answers: { exp0: "Kurang dari 1 tahun", exp1: "Kurang dari 2 tahun", exp2: "2 tahun atau lebih" },
    },
    japanese: {
      text: "Apakah Anda nyaman berbicara bahasa Jepang dengan pasien, pengguna layanan, atau staf?",
      answers: {
        jp0: "Percakapan sederhana bisa",
        jp1: "Percakapan sehari-hari cukup nyaman",
        jp2: "Bisa menjelaskan dan berdiskusi soal pekerjaan",
      },
    },
    skill: {
      text: "Pengalaman mana yang paling dekat dengan Anda?",
      answers: {
        care: "Mendukung pasien atau pengguna layanan bersama beberapa orang",
        factory: "Pernah bekerja shift malam",
        technical: "Memiliki sertifikat Jitsumusha Kenshu atau lebih tinggi",
      },
    },
    timing: {
      text: "Bagaimana perasaan Anda tentang cara kerja berikutnya?",
      answers: {
        soon: "Ingin segera bertanya",
        threeMonths: "Ingin berpikir pelan-pelan",
        research: "Ingin lihat informasi dulu",
      },
    },
    goal: {
      text: "Apa yang paling penting bagi Anda?",
      answers: {
        salary: "Penghasilan lebih tinggi",
        stable: "Kerja stabil jangka panjang",
        support: "Dukungan hidup dan dokumen",
      },
    },
  },
  levels: {
    lv1: {
      title: "Tipe persiapan pelan-pelan",
      lead: "Mulai dari merapikan pengalaman dan harapan Anda agar lebih mudah menemukan pekerjaan yang cocok.",
      daruma: {
        title: "Daruma pink yang bersiap dengan tenang",
        copy: "Anda cocok maju setelah semuanya tertata. Dukungan dan langkah berikutnya yang jelas akan membuat Anda lebih siap.",
        alt: "Daruma pink",
      },
      strengths: ["Peluang berkembang masih besar", "Mudah mempersiapkan diri dengan dukungan"],
      cautions: ["Bahasa Jepang dan pengalaman perlu dicek", "Catatan singkat tentang keinginan Anda akan membantu konsultasi"],
    },
    lv2: {
      title: "Tipe konsultasi kondisi lebih baik",
      lead: "Pengalaman lapangan Anda bisa membantu konsultasi untuk kondisi yang lebih baik.",
      daruma: {
        title: "Daruma biru yang tenang",
        copy: "Anda bisa membandingkan pilihan berdasarkan pengalaman. Lihat gaji, shift, dan jarak kerja bersama-sama agar pilihan lebih tepat.",
        alt: "Daruma biru",
      },
      strengths: ["Pengalaman care atau rumah sakit dapat dinilai", "Bisa membandingkan gaya kerja dan gaji"],
      cautions: ["Status visa dan kondisi kerja perlu dikonfirmasi", "Cek shift dan jarak kerja, bukan hanya gaji"],
    },
    lv3: {
      title: "Tipe siap tantangan",
      lead: "Pengalaman dan kemampuan komunikasi Anda dapat mendukung kenaikan gaji atau peran calon leader.",
      daruma: {
        title: "Daruma merah yang cepat bertindak",
        copy: "Anda siap bergerak saat melihat peluang. Menyampaikan skill dengan jelas akan membuat konsultasi kenaikan kondisi lebih lancar.",
        alt: "Daruma merah",
      },
      strengths: ["Anda bisa dipercaya di tempat kerja", "Pengalaman dapat mendukung kondisi lebih baik"],
      cautions: ["Urutkan prioritas kondisi yang Anda inginkan", "Siapkan tugas yang bisa Anda lakukan sebelum konsultasi"],
    },
  },
};
