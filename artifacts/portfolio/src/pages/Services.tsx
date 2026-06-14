import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Briefcase, Star, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { profile, education } from "@/data/data";
import { useQuery } from "@tanstack/react-query";

const skillGroups = [
  {
    title: "Cleaning Service",
    color: "bg-primary/10 text-primary border-primary/20",
    skills: [
      { name: "Poles Lantai (Mesin Polisher)", level: 96 },
      { name: "Glass Cleaning & Partisi", level: 93 },
      { name: "Toilet & Floordrain Cleaning", level: 97 },
      { name: "Wet Vacuum & Pengeringan Lantai", level: 90 },
      { name: "Brushing & Scrubbing Area Luar", level: 88 },
    ],
  },
  {
    title: "Office Boy",
    color: "bg-secondary/10 text-secondary border-secondary/20",
    skills: [
      { name: "Persiapan Ruang Meeting", level: 95 },
      { name: "Pengelolaan ATK & Operasional", level: 92 },
      { name: "Pelayanan Karyawan & Tamu", level: 94 },
      { name: "Operasional Mesin Fotokopi & Scan", level: 88 },
      { name: "Dusting & Kebersihan Kantor", level: 97 },
    ],
  },
  {
    title: "Messenger & Operasional",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    skills: [
      { name: "Pengiriman Dokumen Tepat Waktu", level: 98 },
      { name: "Penanganan Dokumen Rahasia", level: 95 },
      { name: "Administrasi & Pencatatan", level: 87 },
      { name: "Pelayanan Pelanggan", level: 92 },
      { name: "Navigasi Area Lapangan", level: 93 },
    ],
  },
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

function LogoModal({ src, company, onClose }: { src: string; company: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl p-8 shadow-2xl max-w-xs w-full mx-4 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={company} className="w-48 h-48 object-contain" />
        <p className="text-sm font-semibold text-slate-700 text-center">{company}</p>
        <button onClick={onClose} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Tutup</button>
      </motion.div>
    </div>
  );
}

export default function Pengalaman() {
  const [logoModal, setLogoModal] = useState<{ src: string; company: string } | null>(null);

  const { data: apiExps } = useQuery<any[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetch("/api/experiences");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  const { data: apiProfile } = useQuery<any>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  const experiences = apiExps ?? [];
  const softSkills: string[] = apiProfile?.softSkills ?? profile.softSkills;
  const additionalInfo: string[] = apiProfile?.additionalInfo ?? profile.additionalInfo;

  return (
    <div className="pt-20 min-h-screen bg-background">
      <AnimatePresence>
        {logoModal && <LogoModal src={logoModal.src} company={logoModal.company} onClose={() => setLogoModal(null)} />}
      </AnimatePresence>
      <section className="bg-gradient-to-br from-secondary to-[hsl(173,60%,12%)] text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Riwayat & Keahlian</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Pengalaman & Keahlian</h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              Lebih dari 8 tahun pengalaman di bidang Cleaning Service, Office Boy, dan Messenger di berbagai perusahaan terkemuka.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Riwayat Kerja</Badge>
            <h2 className="text-3xl font-bold">Pengalaman Kerja</h2>
          </motion.div>

          <motion.div className="space-y-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {experiences.map((exp: any, idx: number) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl p-7 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`w-14 h-14 rounded-xl border border-border bg-muted/30 overflow-hidden flex items-center justify-center shrink-0 ${exp.companyLogo ? "cursor-zoom-in hover:ring-2 hover:ring-primary/40 transition-all" : ""}`}
                    onClick={() => exp.companyLogo && setLogoModal({ src: exp.companyLogo, company: exp.company })}
                    title={exp.companyLogo ? "Klik untuk perbesar" : undefined}
                  >
                    {exp.companyLogo
                      ? <img src={exp.companyLogo} alt={exp.company} className="w-full h-full object-contain p-1.5" />
                      : <Briefcase size={22} className="text-primary" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                          <p className="text-muted-foreground font-medium">{exp.company}</p>
                          {exp.employmentType && (
                            <Badge variant="secondary" className="rounded-full text-[11px] px-2 py-0.5 font-medium">{exp.employmentType}</Badge>
                          )}
                        </div>
                        {Array.isArray(exp.via) && exp.via.length > 0 && (
                          <div className="mt-0.5 space-y-0.5">
                            {exp.via.map((v: string, i: number) => (
                              <p key={i} className="text-xs text-muted-foreground/70">via {v}</p>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5">{exp.location}</p>
                      </div>
                      <Badge variant="outline" className="rounded-full shrink-0 text-xs">{exp.period}</Badge>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2.5 ml-1">
                  {(exp.responsibilities ?? []).map((r: string) => (
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

      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Pendidikan</Badge>
            <h2 className="text-3xl font-bold">Riwayat Pendidikan</h2>
          </motion.div>
          <motion.div className="space-y-4" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {education.map((edu) => (
              <motion.div key={edu.institution} variants={fadeUp} className="bg-card border border-card-border rounded-2xl p-6 flex gap-4 items-center">
                <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                  <GraduationCap size={22} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-muted-foreground text-sm">{edu.major}</p>
                </div>
                <Badge variant="outline" className="rounded-full text-xs shrink-0">{edu.year}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Kompetensi</Badge>
            <h2 className="text-3xl font-bold">Tingkat Keahlian</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {skillGroups.map((group) => (
              <motion.div key={group.title} variants={fadeUp} className="bg-card border border-card-border rounded-2xl p-7">
                <Badge className={`mb-5 ${group.color}`}>{group.title}</Badge>
                <div className="space-y-4">
                  {group.skills.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Etos Kerja</Badge>
            <h2 className="text-3xl font-bold mb-8">Sikap & Etos Kerja</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {softSkills.map((s: string) => (
                <div key={s} className="flex items-center gap-2 bg-card border border-card-border rounded-full px-4 py-2 text-sm font-medium">
                  <Star size={14} className="text-primary fill-primary" />
                  {s}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-8">
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">Info Tambahan</Badge>
            <h2 className="text-2xl font-bold text-white">Informasi Tambahan</h2>
          </motion.div>
          <motion.ul className="space-y-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {additionalInfo.map((info: string) => (
              <motion.li key={info} variants={fadeUp} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <CheckCircle2 size={18} className="text-primary shrink-0" />
                <span className="text-slate-200 text-sm">{info}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </div>
  );
}
