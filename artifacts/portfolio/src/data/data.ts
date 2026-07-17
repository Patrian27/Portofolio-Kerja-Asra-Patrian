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
  jobstreet: "https://id.jobstreet.com/id/profiles/asra-patrian-3FsszPRpW9",
  kitalulus: "Asra Patrian",
  siapkerja: "Asra Patrian",
  instagram: "https://www.instagram.com/patrian27_",
  tiktok: "https://www.tiktok.com/@patrian27_",
  telegram: "https://t.me/08997706751",
  facebook: "https://www.facebook.com/profile.php?id=61554212107923",
  posisiDilamar: ["Office Boy (OB)", "Cleaning Service", "Messenger"],
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
  { id: 1, institution: "SMK Negeri 1 Cirinten", major: "Akuntansi & Keuangan", year: "2015", schoolLogo: "", media: [] },
  { id: 2, institution: "Universitas Pamulang", major: "Teknik Informatika", year: "2 Semester", schoolLogo: "", media: [] },
];

export const certificates = [
  { id: 1, title: "Refreshment Frontliner Modul Layanan Kurir 2024", issuer: "PT Pos Indonesia (BUMN) — EDUPOS", date: "22 November 2024", category: "Operasional", image: "/images/sertifikat-pos-frontliner.jpg" },
  { id: 2, title: "Sertifikat Pelatihan CV dan Interview", issuer: "JobStreet Career Hub by Seek", date: "10 Mei 2026", category: "Pengembangan Karir", image: "/images/sertifikat-cv-interview.jpg" },
  { id: 3, title: "Sertifikat Pelatihan Dasar Microsoft Excel", issuer: "ZenLEAP x JobStreet by Seek", date: "14 Juli 2025", category: "Komputer", image: "/images/sertifikat-excel-dasar.jpg" },
  { id: 4, title: "Jago Excel Kerjaan Lancar: Pelatihan Olah Data Antieror", issuer: "JobStreet Career Hub by Seek", date: "14 Juli 2025", category: "Komputer", image: "/images/sertifikat-excel-olahdata.jpg" },
  { id: 5, title: "Fun Training: Peningkatan Layanan Prima", issuer: "SIMGROUP x JAGOTI — Hari Pelanggan Nasional", date: "02 September 2023", category: "Pelayanan", image: "/images/sertifikat-layanan-prima.jpg" },
  { id: 6, title: "Webinar Trik Jitu Membangun Personal Branding", issuer: "SIMGROUP / PT Swakarya Insan Mandiri", date: "22 Desember 2022", category: "Pengembangan Karir", image: "/images/sertifikat-webinar-branding.jpg" },
  { id: 7, title: "Training SPG/SPB REFI", issuer: "JAGOTI (Japan Grooming Training Indonesia)", date: "Februari 2022", category: "Pelayanan", image: "/images/sertifikat-jagoti.jpg" },
];

export const experiences: Experience[] = [
  {
    id: "exp-0",
    role: "Office Support & Messenger",
    company: "PT Dunia Tani Sejahtera (Parna Raya Group)",
    period: "Jun 2026 - Sekarang",
    location: "Jakarta Selatan, Area DKI Jakarta, Indonesia",
    responsibilities: [
      "Maintained office cleanliness, tidiness, and a comfortable working environment on a daily basis",
      "Handled the secure and timely delivery of important documents and packages to the holding company (Parna Raya Group) and external clients",
      "Supported daily office logistics, including meeting room preparation, hospitality for guests, and distribution of office supplies",
      "Monitored and reported inventory needs or office facilities requiring maintenance",
      "Assisted office staff with various indoor and outdoor operational tasks to improve team productivity",
    ],
  },
  {
    id: "exp-1",
    role: "Housekeeping Specialist",
    company: "PT Bank Central Asia Tbk (BCA)",
    via: "PT Usaha Mitra Sejahtera",
    period: "Nov 2025 – Mei 2026",
    location: "Tangerang, Banten, Indonesia",
    responsibilities: [
      "Bertanggung jawab menjaga kebersihan area operasional dan pelayanan nasabah sesuai SOP perbankan",
      "Melakukan pembersihan menyeluruh pada area lantai, kaca, dan fasilitas publik di lingkungan Bank BCA",
      "Mengelola, memantau, dan menjaga higienitas serta kerapihan lingkungan kerja harian",
      "Berkoordinasi aktif untuk mendukung kenyamanan, keamanan, dan keselamatan nasabah serta staf kantor",
      "Terbiasa bekerja di lingkungan perbankan dengan standar kebersihan tinggi, disiplin waktu, dan tanggung jawab penuh",
    ],
  },
  {
    id: "exp-2",
    role: "Petugas Loket",
    company: "PT Pos Indonesia (Persero)",
    via: "Agenpos Cikoleang 16353S1 / 16353S2 (Usaha Mandiri)",
    period: "Feb 2024 – Sekarang",
    location: "Bogor, Jawa Barat, Indonesia",
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
    company: "PT Astra Auto Digital (Seva.id)",
    via: "PT Swakarya Insan Mandiri",
    period: "Nov 2022 – Okt 2025",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
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
    company: "PT Bank Sumut",
    via: "PT Trans Dana Profitri",
    period: "Jan 2020 – Okt 2022",
    location: "Jakarta Selatan, Area DKI Jakarta, Indonesia",
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
  {
    id: "exp-6",
    role: "Driver Online (GrabBike, GrabExpress, GrabFood, GrabMart, GrabSameday)",
    company: "Grab",
    period: "Agu 2018 – Sekarang",
    location: "Jabodetabek",
    responsibilities: [
      "Melayani pengantaran penumpang, barang, dan makanan melalui berbagai layanan Grab",
      "Mengutamakan keamanan, ketepatan waktu, dan kepuasan pelanggan",
      "Terbiasa mengoperasikan aplikasi dan sistem navigasi digital",
    ],
  },
  {
    id: "exp-7",
    role: "Driver / Kurir Shopee",
    company: "Shopee Express",
    period: "Jan 2024 – Sekarang",
    location: "Jabodetabek",
    responsibilities: [
      "Mengantar pesanan makanan dan paket instan dengan tepat waktu dan aman",
      "Terbiasa bekerja dengan aplikasi dan sistem logistik online",
    ],
  },
  {
    id: "exp-8",
    role: "Marketing / Field Sales",
    company: "PT Rekan Usaha Mikro Anda (Mapan by Gojek)",
    period: "2015 – 2016",
    location: "Cab. Serang Selatan",
    responsibilities: [
      "Bertanggung jawab melakukan sosialisasi program Arisan Mapan (Arisan Barang) di area yang ditentukan",
      "Mencari dan membina ketua arisan dengan anggota 10–15 orang per kelompok untuk mendukung target penjualan",
      "Memberikan edukasi kepada masyarakat terkait sistem arisan sebagai solusi kepemilikan barang secara gotong royong",
    ],
  },
];

export const workDocs: WorkDoc[] = [];

const _unused = [
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
