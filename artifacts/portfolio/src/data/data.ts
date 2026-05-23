export type WorkCategory = "cleaning" | "office-boy" | "messenger";

export interface WorkDoc {
  id: string;
  title: string;
  category: WorkCategory;
  company: string;
  location: string;
  date: string;
  description: string;
  images: {
    before?: string;
    progress?: string;
    after: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  via?: string;
  period: string;
  location: string;
  responsibilities: string[];
}

export const profile = {
  name: "Asra Patrian",
  tagline: "Tenaga Cleaning Service, Office Boy & Operasional Profesional",
  summary:
    "Tenaga operasional berpengalaman lebih dari 8 tahun di bidang Cleaning Service, Office Boy, Messenger, dan Pelayanan Pelanggan. Terbiasa bekerja di lingkungan perbankan, perkantoran, transportasi publik, dan logistik. Terbiasa bekerja sesuai SOP perusahaan, menjaga kebersihan area dengan standar tinggi, serta mendukung kelancaran operasional harian. Memiliki disiplin kerja, tanggung jawab, komunikasi yang baik, serta mampu bekerja secara mandiri maupun tim.",
  phone: "+62 899 7706 751",
  email: "rasamjupatrian97@gmail.com",
  location: "Bogor, Jawa Barat",
  linkedin: "https://www.linkedin.com/in/asra-patrian-b75b76320",
  pintarnya: "https://pintarnya.com/cv/asra-patrian-j4697e7mxt",
  glints: "Asra Patrian",
  jobstreet: "Asra Patrian",
  kitalulus: "Asra Patrian",
  siapkerja: "Asra Patrian",
  posisiDilamar: ["Office Boy (OB)", "Cleaning Service"],
  skills: [
    "Cleaning Service & Housekeeping",
    "Office Boy & Operasional Kantor",
    "Messenger & Pengiriman Dokumen",
    "Pelayanan Pelanggan",
    "Pengelolaan Area Publik & High Traffic",
    "Pengelolaan ATK & Kebutuhan Operasional",
    "Administrasi Dasar & Microsoft Office",
    "Manajemen Waktu & Disiplin Kerja",
  ],
  softSkills: [
    "Disiplin & tanggung jawab tinggi",
    "Menjaga sikap sopan & etika kerja",
    "Teliti dan rapi dalam bekerja",
    "Mampu bekerja di bawah tekanan",
    "Bersedia bekerja lembur",
    "Siap ditempatkan sesuai kebutuhan",
  ],
  additionalInfo: [
    "Memiliki kendaraan pribadi dan SIM C aktif",
    "Siap bekerja mobile dan shift",
    "Siap ditempatkan sesuai kebutuhan perusahaan",
  ],
};

export const education = [
  { institution: "SMKN 1 Cirinten", major: "Akuntansi & Keuangan", year: "2015" },
  { institution: "Universitas Pamulang", major: "Teknik Informatika", year: "2 Semester" },
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Cleaning Service",
    company: "PT Bank Central Asia Tbk (BCA)",
    via: "PT Usaha Mitra Sejahtera",
    period: "2025 – 2026",
    location: "Jakarta",
    responsibilities: [
      "Menjaga kebersihan area operasional dan pelayanan nasabah sesuai standar perbankan",
      "Melakukan pembersihan lantai, kaca, area publik, dan fasilitas umum",
      "Memastikan kebersihan dan higienitas sesuai SOP perusahaan",
      "Mendukung kenyamanan dan keamanan nasabah serta staf",
    ],
  },
  {
    id: "exp-2",
    role: "Petugas Loket Agenpos Cikoleang 163531",
    company: "PT Pos Indonesia (Persero)",
    via: "Agen Resmi",
    period: "2024 – Sekarang",
    location: "Cikoleang",
    responsibilities: [
      "Melayani pelanggan dengan ramah dan profesional",
      "Mengelola transaksi dan pencatatan harian",
      "Mengatur operasional harian agen secara mandiri",
      "Membantu pelayanan pengiriman paket dan pembayaran",
    ],
  },
  {
    id: "exp-3",
    role: "Office Boy",
    company: "PT Astra Auto Digital (SEVA)",
    via: "PT Swakarya Insan Mandiri",
    period: "2022 – 2025",
    location: "Jakarta",
    responsibilities: [
      "Melakukan pembersihan dan perawatan area kantor",
      "Menyiapkan ruang meeting dan kebutuhan operasional harian",
      "Mengelola ATK dan membantu kebutuhan pimpinan dan staff kantor",
      "Mendukung aktivitas operasional perusahaan sehari-hari",
    ],
  },
  {
    id: "exp-4",
    role: "Messenger & Office Boy",
    company: "PT Bank Sumut Cabang Jakarta",
    via: "PT Trans Dana Profitri",
    period: "2020 – 2022",
    location: "Jakarta",
    responsibilities: [
      "Mengelola dokumen masuk dan keluar perusahaan",
      "Melakukan pengiriman dokumen ke Bank Indonesia (BI)",
      "Menjaga keamanan dan kerahasiaan dokumen perusahaan",
      "Mengoperasikan mesin fotokopi dan mendukung administrasi kantor",
      "Membantu kebutuhan pimpinan dan semua staf",
      "Menjaga kebersihan serta kerapihan area kerja",
    ],
  },
  {
    id: "exp-5",
    role: "On Station Cleaning",
    company: "PT Kereta Commuter Indonesia",
    period: "2017 – 2019",
    location: "Jakarta",
    responsibilities: [
      "Menjaga kebersihan area stasiun, toilet, mushola, dan area publik",
      "Memastikan area tetap bersih dan nyaman bagi penumpang",
      "Bekerja dalam sistem shift dengan standar kebersihan tinggi",
    ],
  },
];

export const workDocs: WorkDoc[] = [
  {
    id: "doc-1",
    title: "Washing Manual & Cleaning Floordrain Area Toilet",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Februari 2026",
    description:
      "Pembersihan menyeluruh area toilet termasuk washing manual lantai dan pembersihan floordrain. Dikerjakan sesuai standar kebersihan perbankan BCA.",
    images: {
      before: "/images/dok-toilet-washing.jpg",
      progress: "/images/dok-toilet-washing.jpg",
      after: "/images/dok-toilet-washing.jpg",
    },
  },
  {
    id: "doc-2",
    title: "Toilet Cleaning, Watertank & Wall Cleaning",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Januari–Februari 2026",
    description:
      "Pembersihan detail toilet bowl, watertank, dan dinding area toilet. Semua dikerjakan dengan APD lengkap sesuai SOP perusahaan.",
    images: {
      before: "/images/dok-toilet-detail.jpg",
      progress: "/images/dok-toilet-detail.jpg",
      after: "/images/dok-toilet-detail.jpg",
    },
  },
  {
    id: "doc-3",
    title: "Dusting Meja Pingpong, Dak Kaca & Trashbin",
    category: "cleaning",
    company: "PT Astra Auto Digital (SEVA)",
    location: "Jakarta",
    date: "Januari 2026",
    description:
      "Pembersihan debu (dusting) area kantor meliputi meja pingpong, dak kaca partisi, dan tempat sampah stainless di area lobi dan koridor.",
    images: {
      progress: "/images/dok-dusting.jpg",
      after: "/images/dok-dusting.jpg",
    },
  },
  {
    id: "doc-4",
    title: "Glass Cleaning Partisi & Kaca Ruangan",
    category: "cleaning",
    company: "PT Astra Auto Digital (SEVA)",
    location: "Jakarta",
    date: "Januari 2026",
    description:
      "Pembersihan kaca partisi kantor dan kaca ruangan besar menggunakan squeegee dan cairan pembersih kaca profesional. Hasil jernih bebas noda.",
    images: {
      before: "/images/dok-glass.jpg",
      progress: "/images/dok-glass.jpg",
      after: "/images/dok-glass.jpg",
    },
  },
  {
    id: "doc-5",
    title: "Poles Lantai Koridor Lobby & Toilet (Mesin Polisher)",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Januari 2026",
    description:
      "Pengoperasian mesin polisher untuk poles lantai koridor lobby utama dan koridor toilet. Mahir mengoperasikan mesin poles besar sesuai SOP.",
    images: {
      progress: "/images/dok-poles-lantai.jpg",
      after: "/images/dok-poles-lantai.jpg",
    },
  },
  {
    id: "doc-6",
    title: "Brushing Ramp Parkir & Wet Vacuum Area Kantin",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Desember 2025",
    description:
      "Pembersihan dan brushing ramp parkir serta proses pengeringan lantai area kantin menggunakan mesin wet vacuum. Area luas ditangani dengan efisien.",
    images: {
      progress: "/images/dok-ramp-parkir.jpg",
      after: "/images/dok-ramp-parkir.jpg",
    },
  },
  {
    id: "doc-7",
    title: "Mopping Tangga Darurat & Lobby Duster Koridor",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Januari 2026",
    description:
      "Pengepelan lantai tangga darurat (mopping) dan pembersihan debu lantai koridor & lobby menggunakan lobby duster. Rutin setiap shift.",
    images: {
      progress: "/images/dok-mopping.jpg",
      after: "/images/dok-mopping.jpg",
    },
  },
  {
    id: "doc-8",
    title: "Dusting Railing, Perawatan Tanaman & Tangga Penghubung",
    category: "cleaning",
    company: "PT Astra Auto Digital (SEVA)",
    location: "Jakarta",
    date: "Januari 2026",
    description:
      "Pembersihan debu railing tangga penghubung dan perawatan tanaman hias di area tangga. Menjaga estetika dan kebersihan area transisi gedung.",
    images: {
      progress: "/images/dok-railing.jpg",
      after: "/images/dok-railing.jpg",
    },
  },
  {
    id: "doc-9",
    title: "Sweeping & Mopping Area Landing Lift",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Januari 2026",
    description:
      "Penyapuan (sweeping) tangga penghubung dan pengepelan (mopping) area landing lift. Menjaga kebersihan dan keamanan area pergerakan karyawan.",
    images: {
      progress: "/images/dok-tangga.jpg",
      after: "/images/dok-tangga.jpg",
    },
  },
];
