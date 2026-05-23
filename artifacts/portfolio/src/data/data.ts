export type ServiceCategory = "cleaning" | "office-boy" | "all";

export interface Project {
  id: string;
  title: string;
  category: ServiceCategory;
  location: string;
  date: string;
  description: string;
  images: {
    before?: string;
    progress?: string;
    after: string;
  };
}

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Pembersihan Menyeluruh Kantor Sudirman",
    category: "cleaning",
    location: "Sudirman, Jakarta Selatan",
    date: "Oktober 2023",
    description: "Deep cleaning untuk kantor berukuran 500m2, mencakup poles lantai marmer, cuci karpet, dan pembersihan kaca fasad interior.",
    images: {
      before: "/images/floor-before.png",
      progress: "/images/progress.png",
      after: "/images/floor-after.png",
    }
  },
  {
    id: "proj-2",
    title: "Support Event & Manajemen Pantry",
    category: "office-boy",
    location: "Kuningan, Jakarta Selatan",
    date: "November 2023",
    description: "Penyediaan tenaga Office Boy profesional untuk mendukung acara RUPS tahunan perusahaan multinasional.",
    images: {
      after: "/images/office-boy.png",
    }
  },
  {
    id: "proj-3",
    title: "Cuci Sofa & Karpet Ruang Direksi",
    category: "cleaning",
    location: "Thamrin, Jakarta Pusat",
    date: "Desember 2023",
    description: "Pembersihan intensif untuk menghilangkan noda membandel pada sofa kulit dan karpet tebal di area VIP.",
    images: {
      before: "/images/floor-before.png",
      after: "/images/floor-after.png",
    }
  },
  {
    id: "proj-4",
    title: "Operasional Harian Startup Tech",
    category: "office-boy",
    location: "BSD City, Tangerang",
    date: "Januari 2024",
    description: "Penempatan 3 staf Office Boy untuk melayani kebutuhan harian 150 karyawan, termasuk manajemen dokumen dan kurir.",
    images: {
      progress: "/images/office-boy.png",
      after: "/images/office-boy.png",
    }
  },
  {
    id: "proj-5",
    title: "General Cleaning Gedung Baru",
    category: "cleaning",
    location: "Gatot Subroto, Jakarta Selatan",
    date: "Februari 2024",
    description: "Pembersihan menyeluruh pasca-renovasi sebelum serah terima kepada penyewa (post-construction cleaning).",
    images: {
      before: "/images/floor-before.png",
      progress: "/images/progress.png",
      after: "/images/hero.png",
    }
  },
  {
    id: "proj-6",
    title: "Perawatan Kaca & Fasad Interior",
    category: "cleaning",
    location: "TB Simatupang, Jakarta",
    date: "Maret 2024",
    description: "Pembersihan rutin kaca partisi ruangan rapat dan lobi utama agar selalu tampil jernih dan representatif.",
    images: {
      before: "/images/floor-before.png",
      after: "/images/hero.png",
    }
  }
];

export const services = [
  {
    id: "deep-cleaning",
    title: "Deep Cleaning Service",
    category: "cleaning",
    description: "Pembersihan detail dan menyeluruh hingga ke area yang sulit dijangkau. Ideal untuk kantor baru atau pembersihan tahunan.",
    includes: ["Poles lantai", "Pembersihan jendela", "Cuci karpet/sofa", "Disinfeksi ruangan"],
    priceRange: "Mulai dari Rp 15.000 / m2"
  },
  {
    id: "daily-cleaning",
    title: "Daily Office Cleaning",
    category: "cleaning",
    description: "Layanan pembersihan harian rutin untuk menjaga kenyamanan dan produktivitas lingkungan kerja Anda.",
    includes: ["Sapu & pel lantai", "Buang sampah", "Lap meja & debu", "Pembersihan toilet"],
    priceRange: "Mulai dari Rp 3.500.000 / bulan"
  },
  {
    id: "office-boy",
    title: "Penyediaan Office Boy",
    category: "office-boy",
    description: "Staf terlatih, berseragam rapi, dan profesional untuk membantu operasional harian kantor Anda.",
    includes: ["Penyajian minuman", "Manajemen pantry", "Distribusi dokumen", "Kurir & errand"],
    priceRange: "Mulai dari Rp 4.200.000 / bulan"
  },
  {
    id: "specialized",
    title: "Pembersihan Khusus",
    category: "cleaning",
    description: "Layanan pembersihan spesifik untuk material tertentu yang membutuhkan penanganan khusus.",
    includes: ["Cuci lampu kristal", "Perawatan marmer", "Cuci blind/gorden", "Fogging anti-hama"],
    priceRange: "Sesuai survey lokasi"
  }
];
