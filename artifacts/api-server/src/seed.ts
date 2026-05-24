import { db, workDocsTable } from "@workspace/db";
import { count, like } from "drizzle-orm";

const staticDocs = [
  {
    title: "Washing Manual & Cleaning Floordrain Area Toilet",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Februari 2026",
    description: "Pembersihan menyeluruh area toilet termasuk washing manual lantai dan pembersihan floordrain. Dikerjakan sesuai standar kebersihan perbankan BCA.",
    imageBefore: "/images/dok-toilet-washing.jpg",
    imageProgress: "/images/dok-toilet-washing.jpg",
    imageAfter: "/images/dok-toilet-washing.jpg",
  },
  {
    title: "Toilet Cleaning, Watertank & Wall Cleaning",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Januari–Februari 2026",
    description: "Pembersihan detail toilet bowl, watertank, dan dinding area toilet. Semua dikerjakan dengan APD lengkap sesuai SOP perusahaan.",
    imageBefore: "/images/dok-toilet-detail.jpg",
    imageProgress: "/images/dok-toilet-detail.jpg",
    imageAfter: "/images/dok-toilet-detail.jpg",
  },
  {
    title: "Dusting Meja Pingpong, Dak Kaca & Trashbin",
    category: "cleaning",
    company: "PT Astra Auto Digital (SEVA)",
    location: "Jakarta",
    date: "Januari 2026",
    description: "Pembersihan debu (dusting) area kantor meliputi meja pingpong, dak kaca partisi, dan tempat sampah stainless di area lobi dan koridor.",
    imageBefore: null,
    imageProgress: "/images/dok-dusting.jpg",
    imageAfter: "/images/dok-dusting.jpg",
  },
  {
    title: "Glass Cleaning Partisi & Kaca Ruangan",
    category: "cleaning",
    company: "PT Astra Auto Digital (SEVA)",
    location: "Jakarta",
    date: "Januari 2026",
    description: "Pembersihan kaca partisi kantor dan kaca ruangan besar menggunakan squeegee dan cairan pembersih kaca profesional. Hasil jernih bebas noda.",
    imageBefore: "/images/dok-glass.jpg",
    imageProgress: "/images/dok-glass.jpg",
    imageAfter: "/images/dok-glass.jpg",
  },
  {
    title: "Poles Lantai Koridor Lobby & Toilet (Mesin Polisher)",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Januari 2026",
    description: "Pengoperasian mesin polisher untuk poles lantai koridor lobby utama dan koridor toilet. Mahir mengoperasikan mesin poles besar sesuai SOP.",
    imageBefore: null,
    imageProgress: "/images/dok-poles-lantai.jpg",
    imageAfter: "/images/dok-poles-lantai.jpg",
  },
  {
    title: "Brushing Ramp Parkir & Wet Vacuum Area Kantin",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Desember 2025",
    description: "Pembersihan dan brushing ramp parkir serta proses pengeringan lantai area kantin menggunakan mesin wet vacuum. Area luas ditangani dengan efisien.",
    imageBefore: null,
    imageProgress: "/images/dok-ramp-parkir.jpg",
    imageAfter: "/images/dok-ramp-parkir.jpg",
  },
  {
    title: "Mopping Tangga Darurat & Lobby Duster Koridor",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Januari 2026",
    description: "Pengepelan lantai tangga darurat (mopping) dan pembersihan debu lantai koridor & lobby menggunakan lobby duster. Rutin setiap shift.",
    imageBefore: null,
    imageProgress: "/images/dok-mopping.jpg",
    imageAfter: "/images/dok-mopping.jpg",
  },
  {
    title: "Dusting Railing, Perawatan Tanaman & Tangga Penghubung",
    category: "cleaning",
    company: "PT Astra Auto Digital (SEVA)",
    location: "Jakarta",
    date: "Januari 2026",
    description: "Pembersihan debu railing tangga penghubung dan perawatan tanaman hias di area tangga. Menjaga estetika dan kebersihan area transisi gedung.",
    imageBefore: null,
    imageProgress: "/images/dok-railing.jpg",
    imageAfter: "/images/dok-railing.jpg",
  },
  {
    title: "Sweeping & Mopping Area Landing Lift",
    category: "cleaning",
    company: "PT Bank Central Asia Tbk (BCA)",
    location: "Jakarta",
    date: "Januari 2026",
    description: "Penyapuan (sweeping) tangga penghubung dan pengepelan (mopping) area landing lift. Menjaga kebersihan dan keamanan area pergerakan karyawan.",
    imageBefore: null,
    imageProgress: "/images/dok-tangga.jpg",
    imageAfter: "/images/dok-tangga.jpg",
  },
];

export async function seed() {
  const existing = await db
    .select({ value: count() })
    .from(workDocsTable)
    .where(like(workDocsTable.imageAfter, "/images/%"));
  const alreadySeeded = (existing[0]?.value ?? 0) > 0;
  if (alreadySeeded) return;

  await db.insert(workDocsTable).values(staticDocs);
  console.log(`Seeded ${staticDocs.length} work docs`);
}
