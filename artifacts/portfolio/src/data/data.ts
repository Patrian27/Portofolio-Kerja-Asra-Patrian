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
  period: string;
  location: string;
  responsibilities: string[];
}

export const profile = {
  name: "Asra Patrian",
  tagline: "Tenaga Kebersihan & Office Support Profesional",
  summary:
    "Berpengalaman di bidang cleaning service, office boy, dan messenger. Terbiasa bekerja di lingkungan kantor korporat, berkomitmen menjaga kebersihan, ketertiban, dan kelancaran operasional. Siap bekerja keras, disiplin, dan bertanggung jawab.",
  phone: "+62 899 7706 751",
  email: "rasamjupatrian97@gmail.com",
  location: "Bogor",
  skills: [
    "Pembersihan lantai & kaca",
    "Pengoperasian mesin poles",
    "Manajemen pantry & dapur",
    "Distribusi dokumen",
    "Pengiriman barang & surat",
    "Penggunaan mesin fotokopi",
    "Pelayanan tamu & telepon",
    "Keselamatan & K3",
  ],
  softSkills: [
    "Disiplin & tepat waktu",
    "Dapat bekerja dalam tim",
    "Komunikasi yang baik",
    "Jujur & bertanggung jawab",
    "Inisiatif & proaktif",
  ],
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Cleaning Service",
    company: "PT Graha Fajar Properti",
    period: "2022 – 2024",
    location: "Jakarta Selatan",
    responsibilities: [
      "Membersihkan area kantor seluas 1.000 m2 setiap hari",
      "Mengoperasikan mesin poles lantai marmer dan granit",
      "Mencuci dan merawat kaca partisi serta fasad interior",
      "Mengelola stok peralatan kebersihan",
      "Mendisinfeksi toilet dan pantai setiap shift",
    ],
  },
  {
    id: "exp-2",
    role: "Office Boy",
    company: "PT Sinar Maju Teknologi",
    period: "2020 – 2022",
    location: "Jakarta Pusat",
    responsibilities: [
      "Menyiapkan dan menyajikan minuman untuk tamu dan karyawan",
      "Mendistribusikan dokumen antar departemen dan antar lantai",
      "Mengoperasikan mesin fotokopi, scan, dan fax",
      "Mengelola kebersihan ruang rapat sebelum dan sesudah dipakai",
      "Membantu persiapan event internal kantor",
    ],
  },
  {
    id: "exp-3",
    role: "Messenger / Kurir Kantor",
    company: "CV Harapan Baru Logistik",
    period: "2018 – 2020",
    location: "Jakarta",
    responsibilities: [
      "Mengantar surat, dokumen, dan paket ke berbagai instansi di Jakarta",
      "Memastikan setiap pengiriman tepat waktu dan diterima oleh pihak yang benar",
      "Membuat laporan pengiriman harian dan mingguan",
      "Mengelola rute pengiriman yang efisien",
      "Menangani tanda terima dan bukti pengiriman",
    ],
  },
];

export const workDocs: WorkDoc[] = [
  {
    id: "doc-1",
    title: "Pembersihan Ruang Rapat Lantai 5",
    category: "cleaning",
    company: "PT Graha Fajar Properti",
    location: "Jakarta Selatan",
    date: "Maret 2024",
    description:
      "Pembersihan menyeluruh ruang rapat kapasitas 30 orang setelah acara besar. Termasuk cuci karpet, lap meja, dan poles lantai.",
    images: {
      before: "/images/floor-before.png",
      progress: "/images/progress.png",
      after: "/images/floor-after.png",
    },
  },
  {
    id: "doc-2",
    title: "Distribusi Dokumen Antar Departemen",
    category: "office-boy",
    company: "PT Sinar Maju Teknologi",
    location: "Jakarta Pusat",
    date: "Januari 2022",
    description:
      "Mendistribusikan lebih dari 200 lembar dokumen penting ke 8 departemen berbeda dalam satu hari kerja.",
    images: {
      after: "/images/office-boy.png",
    },
  },
  {
    id: "doc-3",
    title: "Deep Cleaning Lobi Utama",
    category: "cleaning",
    company: "PT Graha Fajar Properti",
    location: "Jakarta Selatan",
    date: "Februari 2024",
    description:
      "Pembersihan menyeluruh lobi utama gedung termasuk poles lantai marmer dan pembersihan kaca fasad interior setinggi 4 meter.",
    images: {
      before: "/images/floor-before.png",
      after: "/images/floor-after.png",
    },
  },
  {
    id: "doc-4",
    title: "Pengiriman Dokumen Lintas Kota",
    category: "messenger",
    company: "CV Harapan Baru Logistik",
    location: "Jakarta – Bekasi",
    date: "Oktober 2019",
    description:
      "Mengantarkan dokumen legal dan kontrak penting ke 5 titik di Jakarta dan Bekasi dalam satu hari, semua tepat waktu.",
    images: {
      progress: "/images/office-boy.png",
      after: "/images/hero.png",
    },
  },
  {
    id: "doc-5",
    title: "Persiapan Ruang Event Internal",
    category: "office-boy",
    company: "PT Sinar Maju Teknologi",
    location: "Jakarta Pusat",
    date: "Agustus 2021",
    description:
      "Mempersiapkan ruang auditorium untuk acara townhall tahunan 200+ karyawan: meja, kursi, sound, dan konsumsi.",
    images: {
      before: "/images/floor-before.png",
      progress: "/images/progress.png",
      after: "/images/hero.png",
    },
  },
  {
    id: "doc-6",
    title: "Pembersihan Toilet & Area Pantry",
    category: "cleaning",
    company: "PT Graha Fajar Properti",
    location: "Jakarta Selatan",
    date: "April 2023",
    description:
      "Pembersihan dan sanitasi rutin toilet dan pantry 3 lantai setiap shift untuk memastikan standar kebersihan terjaga.",
    images: {
      before: "/images/floor-before.png",
      after: "/images/floor-after.png",
    },
  },
];
