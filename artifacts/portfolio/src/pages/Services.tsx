import { motion } from "framer-motion";
import { CheckCircle2, Briefcase, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { experiences, profile } from "@/data/data";

const skillGroups = [
  {
    title: "Cleaning Service",
    color: "bg-primary/10 text-primary border-primary/20",
    skills: [
      { name: "Poles Lantai Marmer & Granit", level: 95 },
      { name: "Pembersihan Kaca & Partisi", level: 92 },
      { name: "Cuci Karpet & Sofa", level: 88 },
      { name: "Sanitasi & Disinfeksi", level: 90 },
      { name: "Operasi Mesin Vakum & Scrubber", level: 85 },
    ],
  },
  {
    title: "Office Boy",
    color: "bg-secondary/10 text-secondary border-secondary/20",
    skills: [
      { name: "Penyajian & Manajemen Minuman", level: 97 },
      { name: "Distribusi Dokumen", level: 95 },
      { name: "Operasional Mesin Fotokopi & Scan", level: 90 },
      { name: "Persiapan Ruang Rapat", level: 93 },
      { name: "Pelayanan Tamu Kantor", level: 88 },
    ],
  },
  {
    title: "Messenger / Kurir",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    skills: [
      { name: "Pengiriman Dokumen Tepat Waktu", level: 98 },
      { name: "Navigasi & Rute Efisien", level: 92 },
      { name: "Administrasi Pengiriman", level: 87 },
      { name: "Penanganan Dokumen Rahasia", level: 93 },
      { name: "Komunikasi & Koordinasi", level: 90 },
    ],
  },
];

const certifications = [
  "Sertifikat Pelatihan K3 (Keselamatan & Kesehatan Kerja)",
  "Sertifikat Pelatihan Cleaning Profesional dari APKLI",
  "Sertifikat Layanan Prima (Service Excellence)",
  "BPJS Ketenagakerjaan Aktif",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground text-xs">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}

export default function Pengalaman() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-[hsl(173,60%,12%)] text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Riwayat & Keahlian</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Pengalaman & Keahlian</h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              Lebih dari 6 tahun pengalaman di bidang cleaning service, office boy, dan messenger di berbagai perusahaan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pengalaman Kerja Detail */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Riwayat Kerja</Badge>
            <h2 className="text-3xl font-bold">Pengalaman Kerja</h2>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl p-7 hover:shadow-lg transition-all"
                data-testid={`card-exp-${idx}`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                    <Briefcase size={22} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <p className="text-muted-foreground">{exp.company} &bull; {exp.location}</p>
                      </div>
                      <Badge variant="outline" className="rounded-full shrink-0">{exp.period}</Badge>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {exp.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Kompetensi</Badge>
            <h2 className="text-3xl font-bold">Tingkat Keahlian</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skillGroups.map((group) => (
              <motion.div
                key={group.title}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl p-7"
              >
                <Badge className={`mb-5 ${group.color}`}>{group.title}</Badge>
                <div className="space-y-4">
                  {group.skills.map((s) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Soft Skills */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Karakter</Badge>
            <h2 className="text-3xl font-bold mb-8">Soft Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {profile.softSkills.map((s) => (
                <div key={s} className="flex items-center gap-2 bg-card border border-card-border rounded-full px-4 py-2 text-sm font-medium">
                  <Star size={14} className="text-primary fill-primary" />
                  {s}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sertifikasi */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">Sertifikasi</Badge>
            <h2 className="text-3xl font-bold text-white">Sertifikat & Pelatihan</h2>
          </motion.div>
          <motion.ul className="space-y-4" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
    </div>
  );
}
