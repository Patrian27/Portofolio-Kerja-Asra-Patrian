import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star, Users, Building2, Award, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects, services } from "@/data/data";

const stats = [
  { value: "500+", label: "Proyek Selesai" },
  { value: "120+", label: "Klien Aktif" },
  { value: "8", label: "Tahun Pengalaman" },
  { value: "98%", label: "Tingkat Kepuasan" },
];

const testimonials = [
  {
    name: "Budi Santoso",
    role: "HR Manager, PT Astra Internasional",
    text: "Tim BersihKlin bekerja sangat profesional dan rapi. Kantor kami selalu bersih dan karyawan merasa lebih nyaman. Sangat direkomendasikan!",
    rating: 5,
  },
  {
    name: "Dewi Rahayu",
    role: "Office Manager, Google Indonesia",
    text: "Layanan Office Boy mereka luar biasa. Stafnya terlatih, disiplin, dan selalu siap membantu. Kami sudah menggunakan jasa mereka 3 tahun.",
    rating: 5,
  },
  {
    name: "Ahmad Fauzi",
    role: "Direktur Operasional, Bank BCA",
    text: "Deep cleaning pasca renovasi yang dilakukan BersihKlin sangat memuaskan. Hasilnya bersih sempurna sesuai standar kami.",
    rating: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center bg-gradient-to-br from-secondary via-secondary to-[hsl(173,60%,12%)] text-white pt-20">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_50%,hsl(173,100%,33%),transparent_60%)]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 text-sm px-4 py-1.5 rounded-full">
                <Sparkles size={14} className="mr-1.5" /> Layanan Kebersihan Profesional
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Kebersihan <span className="text-primary">Sempurna</span>,<br />
              Ruang Kerja <span className="text-primary">Produktif</span>
            </motion.h1>

            <motion.p
              className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              BersihKlin hadir sebagai mitra terpercaya untuk layanan kebersihan profesional dan penyediaan Office Boy berpengalaman bagi perusahaan Anda.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/portfolio">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all">
                  Lihat Portofolio <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Layanan Kami
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center p-6 rounded-2xl bg-card border border-card-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl font-extrabold text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Layanan Kami</Badge>
            <h2 className="text-4xl font-bold mb-4">Solusi Lengkap untuk Lingkungan Kerja Anda</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Kami menyediakan layanan terintegrasi yang memastikan kantor Anda selalu bersih, rapi, dan produktif.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.slice(0, 4).map((service) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl p-8 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                    {service.category === "cleaning" ? (
                      <Sparkles size={24} className="text-primary group-hover:text-white transition-colors" />
                    ) : (
                      <Users size={24} className="text-primary group-hover:text-white transition-colors" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    <ul className="space-y-1.5">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 size={15} className="text-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm font-semibold text-primary">{service.priceRange}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Lihat Semua Layanan <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Portofolio</Badge>
              <h2 className="text-4xl font-bold">Dokumentasi Hasil Kerja</h2>
              <p className="text-muted-foreground mt-2 max-w-md">
                Lihat transformasi nyata dari setiap proyek yang telah kami kerjakan — before, progress, dan after.
              </p>
            </div>
            <Link href="/portfolio">
              <Button variant="outline" className="rounded-full px-6 shrink-0">
                Lihat Semua <ArrowRight size={16} className="ml-1.5" />
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
            {projects.slice(0, 3).map((project) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                className="group rounded-2xl overflow-hidden border border-card-border bg-card hover:shadow-xl transition-all"
              >
                <div className="relative h-52 overflow-hidden bg-muted">
                  <img
                    src={project.images.after}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`text-xs rounded-full ${project.category === "cleaning" ? "bg-primary text-white" : "bg-secondary text-white"}`}>
                      {project.category === "cleaning" ? "Cleaning Service" : "Office Boy"}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base mb-1">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                    <Building2 size={12} /> {project.location} &bull; {project.date}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">Testimoni Klien</Badge>
            <h2 className="text-4xl font-bold text-white">Apa Kata Klien Kami</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Award size={48} className="mx-auto mb-6 text-white/80" />
            <h2 className="text-4xl font-bold text-white mb-4">Siap Bekerja Sama dengan Kami?</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Hubungi kami sekarang untuk mendapatkan penawaran terbaik dan konsultasi gratis untuk kebutuhan kebersihan kantor Anda.
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="rounded-full px-10 bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/20 font-bold">
                Hubungi via WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
