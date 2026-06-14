import { db, workDocsTable, workExperiencesTable, certificatesTable, profileSettingsTable } from "@workspace/db";
import { count, like, eq } from "drizzle-orm";

const staticDocs = [
  { title: "Washing Manual & Cleaning Floordrain Area Toilet", category: "cleaning", company: "PT Bank Central Asia Tbk (BCA)", location: "Jakarta", date: "Februari 2026", description: "Pembersihan menyeluruh area toilet termasuk washing manual lantai dan pembersihan floordrain. Dikerjakan sesuai standar kebersihan perbankan BCA.", imageBefore: "/images/dok-toilet-washing.jpg", imageProgress: "/images/dok-toilet-washing.jpg", imageAfter: "/images/dok-toilet-washing.jpg" },
  { title: "Toilet Cleaning, Watertank & Wall Cleaning", category: "cleaning", company: "PT Bank Central Asia Tbk (BCA)", location: "Jakarta", date: "Januari–Februari 2026", description: "Pembersihan detail toilet bowl, watertank, dan dinding area toilet. Semua dikerjakan dengan APD lengkap sesuai SOP perusahaan.", imageBefore: "/images/dok-toilet-detail.jpg", imageProgress: "/images/dok-toilet-detail.jpg", imageAfter: "/images/dok-toilet-detail.jpg" },
  { title: "Dusting Meja Pingpong, Dak Kaca & Trashbin", category: "cleaning", company: "PT Astra Auto Digital (SEVA)", location: "Jakarta", date: "Januari 2026", description: "Pembersihan debu (dusting) area kantor meliputi meja pingpong, dak kaca partisi, dan tempat sampah stainless di area lobi dan koridor.", imageBefore: null, imageProgress: "/images/dok-dusting.jpg", imageAfter: "/images/dok-dusting.jpg" },
  { title: "Glass Cleaning Partisi & Kaca Ruangan", category: "cleaning", company: "PT Astra Auto Digital (SEVA)", location: "Jakarta", date: "Januari 2026", description: "Pembersihan kaca partisi kantor dan kaca ruangan besar menggunakan squeegee dan cairan pembersih kaca profesional.", imageBefore: "/images/dok-glass.jpg", imageProgress: "/images/dok-glass.jpg", imageAfter: "/images/dok-glass.jpg" },
  { title: "Poles Lantai Koridor Lobby & Toilet (Mesin Polisher)", category: "cleaning", company: "PT Bank Central Asia Tbk (BCA)", location: "Jakarta", date: "Januari 2026", description: "Pengoperasian mesin polisher untuk poles lantai koridor lobby utama dan koridor toilet.", imageBefore: null, imageProgress: "/images/dok-poles-lantai.jpg", imageAfter: "/images/dok-poles-lantai.jpg" },
  { title: "Brushing Ramp Parkir & Wet Vacuum Area Kantin", category: "cleaning", company: "PT Bank Central Asia Tbk (BCA)", location: "Jakarta", date: "Desember 2025", description: "Pembersihan dan brushing ramp parkir serta pengeringan lantai area kantin menggunakan mesin wet vacuum.", imageBefore: null, imageProgress: "/images/dok-ramp-parkir.jpg", imageAfter: "/images/dok-ramp-parkir.jpg" },
  { title: "Mopping Tangga Darurat & Lobby Duster Koridor", category: "cleaning", company: "PT Bank Central Asia Tbk (BCA)", location: "Jakarta", date: "Januari 2026", description: "Pengepelan lantai tangga darurat (mopping) dan pembersihan debu lantai koridor & lobby menggunakan lobby duster.", imageBefore: null, imageProgress: "/images/dok-mopping.jpg", imageAfter: "/images/dok-mopping.jpg" },
  { title: "Dusting Railing, Perawatan Tanaman & Tangga Penghubung", category: "cleaning", company: "PT Astra Auto Digital (SEVA)", location: "Jakarta", date: "Januari 2026", description: "Pembersihan debu railing tangga penghubung dan perawatan tanaman hias di area tangga.", imageBefore: null, imageProgress: "/images/dok-railing.jpg", imageAfter: "/images/dok-railing.jpg" },
  { title: "Sweeping & Mopping Area Landing Lift", category: "cleaning", company: "PT Bank Central Asia Tbk (BCA)", location: "Jakarta", date: "Januari 2026", description: "Penyapuan (sweeping) tangga penghubung dan pengepelan (mopping) area landing lift.", imageBefore: null, imageProgress: "/images/dok-tangga.jpg", imageAfter: "/images/dok-tangga.jpg" },
];

const staticExperiences = [
  { role: "Cleaning Service", company: "PT Bank Central Asia Tbk (BCA)", via: "PT Usaha Mitra Sejahtera", period: "2025 – 2026", location: "Jakarta", responsibilities: ["Menjaga kebersihan area operasional dan pelayanan nasabah sesuai standar perbankan","Melakukan pembersihan lantai, kaca, area publik, dan fasilitas umum","Memastikan kebersihan dan higienitas sesuai SOP perusahaan","Mendukung kenyamanan dan keamanan nasabah serta staf"], sortOrder: 1 },
  { role: "Petugas Loket Agenpos Cikoleang 163531", company: "PT Pos Indonesia (Persero)", via: "Agen Resmi", period: "2024 – Sekarang", location: "Cikoleang", responsibilities: ["Melayani pelanggan dengan ramah dan profesional","Mengelola transaksi dan pencatatan harian","Mengatur operasional harian agen secara mandiri","Membantu pelayanan pengiriman paket dan pembayaran"], sortOrder: 2 },
  { role: "Office Boy", company: "PT Astra Auto Digital (SEVA)", via: "PT Swakarya Insan Mandiri", period: "2022 – 2025", location: "Jakarta", responsibilities: ["Melakukan pembersihan dan perawatan area kantor","Menyiapkan ruang meeting dan kebutuhan operasional harian","Mengelola ATK dan membantu kebutuhan pimpinan dan staff kantor","Mendukung aktivitas operasional perusahaan sehari-hari"], sortOrder: 3 },
  { role: "Messenger & Office Boy", company: "PT Bank Sumut Cabang Jakarta", via: "PT Trans Dana Profitri", period: "2020 – 2022", location: "Jakarta", responsibilities: ["Mengelola dokumen masuk dan keluar perusahaan","Melakukan pengiriman dokumen ke Bank Indonesia (BI)","Menjaga keamanan dan kerahasiaan dokumen perusahaan","Mengoperasikan mesin fotokopi dan mendukung administrasi kantor","Membantu kebutuhan pimpinan dan semua staf","Menjaga kebersihan serta kerapihan area kerja"], sortOrder: 4 },
  { role: "On Station Cleaning", company: "PT Kereta Commuter Indonesia", via: null, period: "2017 – 2019", location: "Jakarta", responsibilities: ["Menjaga kebersihan area stasiun, toilet, mushola, dan area publik","Memastikan area tetap bersih dan nyaman bagi penumpang","Bekerja dalam sistem shift dengan standar kebersihan tinggi"], sortOrder: 5 },
  { role: "Driver Online (GrabBike, GrabExpress, GrabFood, GrabMart, GrabSameday)", company: "Grab", via: null, period: "2018 – Sekarang", location: "Bogor / Jabodetabek", responsibilities: ["Melayani pengantaran penumpang, barang, dan makanan melalui berbagai layanan Grab","Mengutamakan keamanan, ketepatan waktu, dan kepuasan pelanggan","Terbiasa mengoperasikan aplikasi dan sistem navigasi digital"], sortOrder: 6 },
  { role: "Driver / Kurir Shopee", company: "Shopee Express", via: null, period: "2024 – Sekarang", location: "Bogor / Jabodetabek", responsibilities: ["Mengantar pesanan makanan dan paket instan dengan tepat waktu dan aman","Terbiasa bekerja dengan aplikasi dan sistem logistik online"], sortOrder: 7 },
  { role: "Marketing / Field Sales", company: "PT Rekan Usaha Mikro Anda (Mapan by Gojek)", via: null, period: "2015 – 2016", location: "Cab. Serang Selatan", responsibilities: ["Bertanggung jawab melakukan sosialisasi program Arisan Mapan di area yang ditentukan","Mencari dan membina ketua arisan dengan anggota 10–15 orang per kelompok","Memberikan edukasi kepada masyarakat terkait sistem arisan sebagai solusi kepemilikan barang"], sortOrder: 8 },
];

const staticCertificates = [
  { title: "Refreshment Frontliner Modul Layanan Kurir 2024", issuer: "PT Pos Indonesia (BUMN) — EDUPOS", date: "22 November 2024", category: "Operasional", image: "/images/sertifikat-pos-frontliner.jpg" },
  { title: "Sertifikat Pelatihan CV dan Interview", issuer: "JobStreet Career Hub by Seek", date: "10 Mei 2026", category: "Pengembangan Karir", image: "/images/sertifikat-cv-interview.jpg" },
  { title: "Sertifikat Pelatihan Dasar Microsoft Excel", issuer: "ZenLEAP x JobStreet by Seek", date: "14 Juli 2025", category: "Komputer", image: "/images/sertifikat-excel-dasar.jpg" },
  { title: "Jago Excel Kerjaan Lancar: Pelatihan Olah Data Antieror", issuer: "JobStreet Career Hub by Seek", date: "14 Juli 2025", category: "Komputer", image: "/images/sertifikat-excel-olahdata.jpg" },
  { title: "Fun Training: Peningkatan Layanan Prima", issuer: "SIMGROUP x JAGOTI — Hari Pelanggan Nasional", date: "02 September 2023", category: "Pelayanan", image: "/images/sertifikat-layanan-prima.jpg" },
  { title: "Webinar Trik Jitu Membangun Personal Branding", issuer: "SIMGROUP / PT Swakarya Insan Mandiri", date: "22 Desember 2022", category: "Pengembangan Karir", image: "/images/sertifikat-webinar-branding.jpg" },
  { title: "Training SPG/SPB REFI", issuer: "JAGOTI (Japan Grooming Training Indonesia)", date: "Februari 2022", category: "Pelayanan", image: "/images/sertifikat-jagoti.jpg" },
];

const staticProfile = {
  id: 1,
  name: "Asra Patrian",
  tagline: "Tenaga Cleaning Service, Office Boy & Operasional Profesional",
  summary: "Tenaga operasional berpengalaman lebih dari 8 tahun di bidang Cleaning Service, Office Boy, Messenger, dan Pelayanan Pelanggan. Terbiasa bekerja di lingkungan perbankan, perkantoran, transportasi publik, dan logistik. Terbiasa bekerja sesuai SOP perusahaan, menjaga kebersihan area dengan standar tinggi, serta mendukung kelancaran operasional harian. Memiliki disiplin kerja, tanggung jawab, komunikasi yang baik, serta mampu bekerja secara mandiri maupun tim.",
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
  posisiDilamar: JSON.stringify(["Office Boy (OB)", "Cleaning Service", "Messenger"]),
  skills: JSON.stringify(["Cleaning Service & Housekeeping","Office Boy & Operasional Kantor","Messenger & Pengiriman Dokumen","Pelayanan Pelanggan","Pengelolaan Area Publik & High Traffic","Pengelolaan ATK & Kebutuhan Operasional","Administrasi Dasar & Microsoft Office","Manajemen Waktu & Disiplin Kerja"]),
  softSkills: JSON.stringify(["Disiplin & tanggung jawab tinggi","Menjaga sikap sopan & etika kerja","Teliti dan rapi dalam bekerja","Mampu bekerja di bawah tekanan","Bersedia bekerja lembur","Siap ditempatkan sesuai kebutuhan"]),
  additionalInfo: JSON.stringify(["Memiliki kendaraan pribadi dan SIM C aktif","Siap bekerja mobile dan shift","Siap ditempatkan sesuai kebutuhan perusahaan"]),
};

export async function seed() {
  // Seed work docs
  const [{ value: docsWithUrl }] = await db.select({ value: count() }).from(workDocsTable).where(like(workDocsTable.imageAfter, "/images/%"));
  if (docsWithUrl === 0) {
    await db.insert(workDocsTable).values(staticDocs);
    console.log(`Seeded ${staticDocs.length} work docs`);
  }

  // Seed experiences
  const [{ value: expCount }] = await db.select({ value: count() }).from(workExperiencesTable);
  if (expCount === 0) {
    await db.insert(workExperiencesTable).values(
      staticExperiences.map((e) => ({ ...e, responsibilities: JSON.stringify(e.responsibilities) }))
    );
    console.log(`Seeded ${staticExperiences.length} experiences`);
  }

  // Seed certificates
  const [{ value: certCount }] = await db.select({ value: count() }).from(certificatesTable);
  if (certCount === 0) {
    await db.insert(certificatesTable).values(staticCertificates);
    console.log(`Seeded ${staticCertificates.length} certificates`);
  }

  // Seed profile
  const existing = await db.select().from(profileSettingsTable).where(eq(profileSettingsTable.id, 1));
  if (existing.length === 0) {
    await db.insert(profileSettingsTable).values(staticProfile);
    console.log("Seeded profile");
  }
}
