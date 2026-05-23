import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, CheckCircle2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Nangi Kusuma",
    role: "Founder & Direktur Utama",
    desc: "Berpengalaman 8 tahun di industri facility management, memimpin BersihKlin sejak berdiri.",
  },
  {
    name: "Risa Permata",
    role: "Manajer Operasional",
    desc: "Bertanggung jawab atas kualitas layanan dan kepuasan klien di seluruh proyek.",
  },
  {
    name: "Hendri Saputra",
    role: "Kepala Tim Teknisi",
    desc: "Memimpin 30+ teknisi lapangan dengan pengalaman deep cleaning dan perawatan gedung.",
  },
];

const milestones = [
  { year: "2016", event: "BersihKlin berdiri dengan 3 klien pertama di Jakarta Selatan" },
  { year: "2018", event: "Ekspansi layanan Office Boy, mulai melayani korporasi besar" },
  { year: "2020", event: "Melayani 50+ klien aktif, membuka cabang di Jakarta Pusat" },
  { year: "2022", event: "Meraih sertifikasi ISO 9001 untuk manajemen kualitas layanan" },
  { year: "2024", event: "Lebih dari 120 klien aktif dan 500+ proyek sukses diselesaikan" },
];

const values = [
  {
    icon: Target,
    title: "Misi",
    desc: "Memberikan layanan kebersihan dan office support yang profesional, terpercaya, dan terjangkau untuk semua skala bisnis di Indonesia.",
  },
  {
    icon: Eye,
    title: "Visi",
    desc: "Menjadi perusahaan facility service terkemuka di Indonesia yang dikenal karena kualitas, integritas, dan inovasi.",
  },
  {
    icon: Heart,
    title: "Nilai Kami",
    desc: "Kami percaya bahwa lingkungan kerja yang bersih adalah fondasi produktivitas. Setiap tetes keringat kami untuk menciptakan ruang yang layak.",
  },
];

const certifications = [
  "Terdaftar di Kementerian Ketenagakerjaan RI",
  "Anggota APKLI (Asosiasi Pengusaha Kebersihan Indonesia)",
  "Sertifikasi ISO 9001:2015 Manajemen Mutu",
  "BPJS Ketenagakerjaan & Kesehatan untuk seluruh staf",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-[hsl(173,60%,12%)] text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Tentang Kami</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Mengenal BersihKlin Indonesia</h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              8 tahun pengalaman, ratusan klien puas, dan komitmen kami tidak pernah berubah: menjaga kebersihan lingkungan kerja Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl p-8 hover:shadow-lg transition-all"
              >
                <div className="p-3 bg-primary/10 w-fit rounded-xl mb-5">
                  <v.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Cerita Kami</Badge>
              <h2 className="text-3xl font-bold mb-4">Dimulai dari Satu Keyakinan</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                BersihKlin lahir dari keyakinan sederhana: setiap orang berhak bekerja di lingkungan yang bersih dan nyaman. Didirikan pada 2016 oleh Nangi Kusuma, kami memulai perjalanan dengan tiga klien pertama di kawasan Sudirman, Jakarta.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Dengan konsistensi dan dedikasi, kami tumbuh pesat. Kini dengan lebih dari 120 klien aktif — mulai dari startup hingga perusahaan multinasional — kami terus membuktikan bahwa kebersihan adalah investasi, bukan biaya.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Setiap proyek yang kami terima diperlakukan dengan standar tertinggi. Inilah mengapa 95% klien kami melanjutkan kontrak dan merekomendasikan kami ke rekan bisnis mereka.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-4 items-start">
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="bg-primary text-white text-xs font-bold rounded-full px-3 py-1">{m.year}</div>
                      {i < milestones.length - 1 && <div className="w-0.5 h-6 bg-border mt-1" />}
                    </div>
                    <p className="text-sm text-muted-foreground pt-1">{m.event}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Tim Kami</Badge>
            <h2 className="text-3xl font-bold">Digerakkan oleh Orang-Orang Berdedikasi</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl p-8 text-center hover:shadow-lg transition-all"
                data-testid={`card-team-${member.name.split(" ")[0].toLowerCase()}`}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-[hsl(173,80%,25%)] rounded-full flex items-center justify-center mx-auto mb-5 text-white">
                  <Users size={32} />
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            className="text-center mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">Legalitas</Badge>
            <h2 className="text-3xl font-bold text-white">Terdaftar & Bersertifikat Resmi</h2>
          </motion.div>
          <motion.ul
            className="space-y-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert) => (
              <motion.li
                key={cert}
                variants={fadeUp}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
              >
                <CheckCircle2 size={20} className="text-primary shrink-0" />
                <span className="text-slate-200 text-sm">{cert}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Location + CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <MapPin size={44} className="mx-auto mb-5 text-primary" />
            <h2 className="text-3xl font-bold mb-3">Temukan Kami</h2>
            <p className="text-muted-foreground mb-2">Gedung Perkantoran Sudirman Lt. 12</p>
            <p className="text-muted-foreground mb-8">Jl. Jend. Sudirman Kav. 7-8, Jakarta Selatan 12190</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full px-10 shadow-lg shadow-primary/20">
                Hubungi Kami Sekarang
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
