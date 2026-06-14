import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Briefcase, Star, ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile as staticProfile, workDocs } from "@/data/data";
import { useQuery } from "@tanstack/react-query";

const categoryLabel: Record<string, string> = {
  cleaning: "Cleaning Service",
  "office-boy": "Office Boy",
  messenger: "Messenger",
};

const categoryColor: Record<string, string> = {
  cleaning: "bg-primary/10 text-primary border-primary/20",
  "office-boy": "bg-secondary/10 text-secondary border-secondary/20",
  messenger: "bg-amber-100 text-amber-700 border-amber-200",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const { data: apiProfile } = useQuery<any>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  const { data: apiExps } = useQuery<any[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetch("/api/experiences");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  const profile = apiProfile ?? staticProfile;
  const profilePhoto = apiProfile?.profilePhoto || "/images/profile-nobg.png";
  const experiences = apiExps ?? [];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center bg-gradient-to-br from-secondary via-secondary to-[hsl(173,60%,12%)] text-white pt-20">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_50%,hsl(173,100%,33%),transparent_60%)]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Foto Profil */}
          <motion.div
            className="shrink-0 order-first lg:order-last"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary/80 to-[hsl(173,80%,25%)] shadow-2xl shadow-primary/40" />
              <div className="absolute inset-1 rounded-full overflow-hidden bg-gradient-to-b from-[hsl(173,60%,18%)] to-[hsl(173,60%,10%)]">
                <img
                  src={profilePhoto}
                  alt={profile.name ?? "Asra Patrian"}
                  className="w-full h-full object-cover object-top scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/images/profile-nobg.png"; }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                8+ Tahun
              </div>
            </div>
          </motion.div>

          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1.5 rounded-full">
                Portofolio Kerja
              </Badge>
            </motion.div>

            <motion.p
              className="text-slate-400 text-lg mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Hai, saya
            </motion.p>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {profile.name}
            </motion.h1>

            <motion.p
              className="text-xl text-primary font-semibold mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              {profile.tagline}
            </motion.p>

            <motion.p
              className="text-slate-300 text-base mb-6 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {profile.summary}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {profile.posisiDilamar.map((p) => (
                <span key={p} className="bg-primary/20 text-primary border border-primary/30 text-sm px-3 py-1 rounded-full font-medium">
                  Melamar: {p}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <Link href="/dokumentasi">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/30">
                  Lihat Dokumentasi Kerja <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/pengalaman">
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Pengalaman Saya
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-5 mt-10 text-sm text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.48 }}
            >
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" />{profile.location}</span>
              <span className="flex items-center gap-1.5"><Phone size={14} className="text-primary" />{profile.phone}</span>
              <span className="flex items-center gap-1.5"><Mail size={14} className="text-primary" />{profile.email}</span>
            </motion.div>
          </div>
          </div>{/* end flex */}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Bidang Keahlian */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                cat: "cleaning",
                title: "Cleaning Service",
                desc: "8+ tahun berpengalaman di lingkungan perbankan, perkantoran, dan transportasi publik. Mahir mengoperasikan mesin polisher, wet vacuum, dan peralatan kebersihan profesional.",
                skills: ["Poles lantai (mesin polisher)", "Glass cleaning", "Toilet & floordrain cleaning", "Brushing & mopping"],
              },
              {
                cat: "office-boy",
                title: "Office Boy",
                desc: "Berpengalaman sebagai OB di PT Astra Auto Digital (SEVA). Terbiasa mendukung operasional harian kantor dan membantu kebutuhan pimpinan.",
                skills: ["Persiapan ruang meeting", "Pengelolaan ATK", "Pelayanan karyawan & tamu", "Dusting & kebersihan kantor"],
              },
              {
                cat: "messenger",
                title: "Messenger / Kurir",
                desc: "Berpengalaman sebagai messenger di PT Bank Sumut, termasuk pengiriman dokumen ke Bank Indonesia. Siap mobile dan mengenal area lapangan.",
                skills: ["Pengiriman dokumen rahasia", "Operasional mesin fotokopi", "Administrasi kantor", "Ketepatan waktu"],
              },
            ].map((item) => (
              <motion.div
                key={item.cat}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl p-7 hover:shadow-lg transition-all"
              >
                <Badge className={`mb-4 text-xs rounded-full ${categoryColor[item.cat]}`}>
                  {item.title}
                </Badge>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{item.desc}</p>
                <ul className="space-y-2">
                  {item.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pengalaman Kerja */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex items-end justify-between mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">Riwayat Kerja</Badge>
              <h2 className="text-3xl font-bold">Pengalaman Kerja</h2>
              <p className="text-muted-foreground text-sm mt-1">8+ tahun di berbagai perusahaan terkemuka</p>
            </div>
            <Link href="/pengalaman">
              <Button variant="outline" className="rounded-full px-5 hidden md:flex">
                Selengkapnya <ChevronRight size={15} className="ml-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl p-6 flex gap-5 items-start hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl border border-border bg-muted/30 overflow-hidden flex items-center justify-center shrink-0">
                  {exp.companyLogo
                    ? <img src={exp.companyLogo} alt={exp.company} className="w-full h-full object-contain p-1" />
                    : <Briefcase size={20} className="text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base">{exp.role}</h3>
                      <p className="text-muted-foreground text-sm">
                        {exp.company}
                        {Array.isArray(exp.via) && exp.via.length > 0 && exp.via.map((v: string, i: number) => (
                          <span key={i} className="block text-xs text-muted-foreground/70">via {v}</span>
                        ))}
                      </p>
                      <p className="text-xs text-muted-foreground">{exp.location}</p>
                    </div>
                    <Badge variant="outline" className="text-xs rounded-full shrink-0">{exp.period}</Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dokumentasi Terbaru */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex items-end justify-between mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">Galeri</Badge>
              <h2 className="text-3xl font-bold">Dokumentasi Hasil Kerja</h2>
              <p className="text-muted-foreground text-sm mt-1">Foto nyata pekerjaan saya di lapangan</p>
            </div>
            <Link href="/dokumentasi">
              <Button variant="outline" className="rounded-full px-5 hidden md:flex">
                Lihat Semua <ArrowRight size={15} className="ml-1.5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {workDocs.slice(0, 3).map((doc) => (
              <motion.div
                key={doc.id}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={doc.images.after}
                    alt={doc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`text-xs rounded-full ${categoryColor[doc.category]}`}>
                      {categoryLabel[doc.category]}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{doc.title}</h3>
                  <p className="text-xs text-muted-foreground">{doc.company} &bull; {doc.date}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/dokumentasi">
              <Button variant="outline" className="rounded-full px-8">
                Lihat Semua Dokumentasi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} className="fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="text-xl text-slate-200 leading-relaxed mb-8 italic">
              "Asra adalah pekerja yang sangat rajin, disiplin, dan dapat diandalkan. Selalu menyelesaikan tugas dengan bersih, rapi, dan tepat waktu sesuai standar SOP yang ditetapkan."
            </blockquote>
            <div>
              <p className="font-semibold text-white">Supervisor Operasional</p>
              <p className="text-slate-400 text-sm">PT Usaha Mitra Sejahtera (Penempatan BCA)</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-center">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Tertarik Merekrut Saya?</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Saya siap bergabung sebagai <strong>Office Boy</strong> atau <strong>Cleaning Service</strong> dan memberikan yang terbaik untuk perusahaan Anda.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-full px-10 bg-white text-primary hover:bg-white/90 font-bold shadow-xl shadow-black/20">
                  Hubungi via WhatsApp
                </Button>
              </a>
              <Link href="/kontak">
                <Button size="lg" variant="outline" className="rounded-full px-10 border-white text-white hover:bg-white/10">
                  Lihat Profil Lengkap
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
