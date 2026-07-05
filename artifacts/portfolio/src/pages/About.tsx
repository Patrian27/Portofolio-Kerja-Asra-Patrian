import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle2, Target, ExternalLink, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile as staticProfile } from "@/data/data";
import { useQuery } from "@tanstack/react-query";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function About() {
  const { data: apiProfile } = useQuery<any>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  const p = apiProfile ?? staticProfile;
  const profilePhoto = apiProfile?.profilePhoto || "/images/profile-nobg.png";

  const socialMedia = [
    p.instagram && {
      name: "Instagram", username: p.instagram,
      href: p.instagram.startsWith("http") ? p.instagram : `https://instagram.com/${p.instagram.replace("@", "")}`,
      color: "bg-pink-50 border-pink-200 text-pink-700",
      iconBg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400", logo: "IG",
    },
    p.tiktok && {
      name: "TikTok", username: p.tiktok,
      href: p.tiktok.startsWith("http") ? p.tiktok : `https://tiktok.com/@${p.tiktok.replace("@", "")}`,
      color: "bg-slate-50 border-slate-200 text-slate-700",
      iconBg: "bg-black", logo: "TT",
    },
    p.facebook && {
      name: "Facebook", username: p.facebook,
      href: p.facebook.startsWith("http") ? p.facebook : `https://facebook.com/${p.facebook}`,
      color: "bg-blue-50 border-blue-200 text-blue-700",
      iconBg: "bg-[#1877F2]", logo: "FB",
    },
    p.telegram && {
      name: "Telegram", username: p.telegram,
      href: p.telegram.startsWith("http") ? p.telegram : `https://t.me/${p.telegram.replace("@", "")}`,
      color: "bg-sky-50 border-sky-200 text-sky-700",
      iconBg: "bg-[#26A5E4]", logo: "TG",
    },
    {
      name: "WhatsApp", username: p.phone,
      href: `https://wa.me/${(p.phone ?? "").replace(/\D/g, "")}`,
      color: "bg-green-50 border-green-200 text-green-700",
      iconBg: "bg-[#25D366]", logo: "WA",
    },
  ].filter(Boolean) as any[];

  const jobPlatforms = [
    { name: "LinkedIn",     key: "linkedin",   color: "bg-[#0A66C2]/10 border-[#0A66C2]/20 text-[#0A66C2]", iconBg: "bg-[#0A66C2]",   logo: "LI" },
    { name: "JobStreet",    key: "jobstreet",  color: "bg-blue-50 border-blue-200 text-blue-700",            iconBg: "bg-blue-600",     logo: "JS" },
    { name: "Pintarnya",    key: "pintarnya",  color: "bg-orange-50 border-orange-200 text-orange-700",      iconBg: "bg-orange-500",   logo: "PT" },
    { name: "Glints",       key: "glints",     color: "bg-emerald-50 border-emerald-200 text-emerald-700",   iconBg: "bg-emerald-500",  logo: "GL" },
    { name: "Kita Lulus",   key: "kitalulus",  color: "bg-purple-50 border-purple-200 text-purple-700",      iconBg: "bg-purple-600",   logo: "KL" },
    { name: "Siap Kerja ID",key: "siapkerja",  color: "bg-rose-50 border-rose-200 text-rose-700",            iconBg: "bg-rose-500",     logo: "SK" },
  ].map((pl) => ({ ...pl, href: p[pl.key] || null, hasLink: !!p[pl.key] }));

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-[hsl(173,60%,12%)] text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="shrink-0">
              <div className="relative w-40 h-40 md:w-52 md:h-52">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary/80 to-[hsl(173,80%,25%)] shadow-2xl shadow-primary/40" />
                <div className="absolute inset-1 rounded-full overflow-hidden bg-gradient-to-b from-[hsl(173,60%,18%)] to-[hsl(173,60%,10%)]">
                  <img
                    src={profilePhoto}
                    alt={p.name}
                    className="w-full h-full object-cover object-top scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/profile-nobg.png"; }}
                  />
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">Profil Saya</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{p.name}</h1>
              <p className="text-primary text-lg font-semibold mb-3">{p.tagline}</p>
              <p className="text-slate-300 text-sm leading-relaxed max-w-lg">{p.summary}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posisi yang Dilamar */}
      {p.posisiDilamar?.length > 0 && (
        <section className="py-10 bg-primary/5 border-b border-primary/10">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <motion.div
              className="flex flex-col md:flex-row items-center gap-4"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-xl">
                  <Target size={22} className="text-primary" />
                </div>
                <span className="font-bold text-lg">Posisi yang Dilamar:</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {p.posisiDilamar.map((pos: string) => (
                  <span key={pos} className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md shadow-primary/20">
                    {pos}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Kontak Langsung */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Kontak</Badge>
            <h2 className="text-3xl font-bold">Hubungi Langsung</h2>
            <p className="text-muted-foreground text-sm mt-1">Cara tercepat menghubungi saya</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {[
              { icon: Phone, label: "WhatsApp", value: p.phone, href: `https://wa.me/${(p.phone ?? "").replace(/\D/g, "")}` },
              { icon: Mail,  label: "Email",    value: p.email, href: `mailto:${p.email}` },
              { icon: MapPin,label: "Domisili", value: p.location, href: null },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all"
              >
                <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="font-semibold text-sm hover:text-primary transition-colors truncate block">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-sm">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <a href={`https://wa.me/${(p.phone ?? "").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                <MessageCircle size={18} className="mr-2" /> Chat via WhatsApp
              </Button>
            </a>
            <Link href="/cv">
              <Button size="lg" variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary/5">
                <Download size={17} className="mr-2" /> Unduh CV
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Media Sosial */}
      {socialMedia.length > 0 && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Media Sosial</Badge>
              <h2 className="text-3xl font-bold">Ikuti Saya</h2>
              <p className="text-muted-foreground text-sm mt-1">Terhubung dengan saya di media sosial</p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              {socialMedia.map((item: any) => (
                <motion.a
                  key={item.name}
                  variants={fadeUp}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer ${item.color}`}
                >
                  <div className={`${item.iconBg} text-white text-xs font-bold w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm`}>
                    {item.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs opacity-70 truncate">{item.username}</p>
                  </div>
                  <ExternalLink size={15} className="shrink-0 opacity-50" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Platform Melamar Kerja */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Platform Kerja</Badge>
            <h2 className="text-3xl font-bold">Temukan Saya Di</h2>
            <p className="text-muted-foreground text-sm mt-1">Profil saya tersedia di berbagai platform lowongan kerja</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {jobPlatforms.map((platform) => (
              <motion.div
                key={platform.name}
                variants={fadeUp}
                className={`border rounded-2xl p-5 flex items-center gap-4 transition-all ${platform.color} ${platform.hasLink ? "hover:shadow-md" : ""}`}
              >
                <div className={`${platform.iconBg} text-white text-xs font-bold w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm`}>
                  {platform.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{platform.name}</p>
                  <p className="text-xs opacity-80 truncate">{platform.hasLink ? platform.href : "Asra Patrian"}</p>
                </div>
                {platform.hasLink && platform.href ? (
                  <a href={platform.href} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <span className="text-xs opacity-50 shrink-0 bg-black/5 px-2 py-1 rounded-full">Cari manual</span>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-xs text-muted-foreground text-center mt-5"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            * Platform yang bertanda "Cari manual" belum memiliki link — isi lewat Admin → tab Profil.
          </motion.p>
        </div>
      </section>

      {/* Profil Singkat */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-start"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Tentang Saya</Badge>
              <h2 className="text-3xl font-bold mb-5">Profil Singkat</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{p.summary}</p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Data Diri</Badge>
              <h2 className="text-3xl font-bold mb-5">Informasi Pribadi</h2>
              <dl className="space-y-0">
                {[
                  { label: "Nama Lengkap",  value: p.name },
                  { label: "Domisili",      value: p.location },
                  { label: "Posisi Dilamar",value: (p.posisiDilamar ?? []).join(", ") },
                  { label: "Pengalaman",    value: "8+ Tahun" },
                  { label: "Status",        value: "Siap Bekerja (Available)" },
                  { label: "Kendaraan",     value: "Ada (SIM C Aktif)" },
                  { label: "Sistem Kerja",  value: "Siap mobile, shift, & penempatan" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 py-3 border-b border-border last:border-0">
                    <dt className="text-muted-foreground text-sm w-36 shrink-0">{item.label}</dt>
                    <dd className="font-medium text-sm">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Kompetensi Utama */}
      {(p.skills ?? []).length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-8">
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Kompetensi</Badge>
              <h2 className="text-3xl font-bold">Kompetensi Utama</h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              {(p.skills ?? []).map((skill: string) => (
                <motion.div
                  key={skill}
                  variants={fadeUp}
                  className="flex items-center gap-3 bg-card border border-card-border rounded-xl px-4 py-3"
                >
                  <CheckCircle2 size={17} className="text-primary shrink-0" />
                  <span className="text-sm font-medium">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-primary text-center">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Saya Siap Bergabung</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Disiplin, bertanggung jawab, dan berpengalaman 8+ tahun. Mari berdiskusi bagaimana saya bisa berkontribusi untuk perusahaan Anda.
            </p>
            <a href={`https://wa.me/${(p.phone ?? "").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full px-10 bg-white text-primary hover:bg-white/90 font-bold shadow-xl shadow-black/20">
                Hubungi Saya Sekarang
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
