import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Users, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services } from "@/data/data";

const cleaningServices = services.filter((s) => s.category === "cleaning");
const obServices = services.filter((s) => s.category === "office-boy");

const whyUs = [
  {
    title: "Tim Bersertifikat",
    desc: "Seluruh teknisi kami telah lulus pelatihan resmi dan bersertifikasi keahlian kebersihan profesional.",
    icon: "🏅",
  },
  {
    title: "Peralatan Modern",
    desc: "Kami menggunakan mesin dan cairan pembersih berstandar industri untuk hasil optimal.",
    icon: "🔧",
  },
  {
    title: "Tepat Waktu",
    desc: "Kami berkomitmen menyelesaikan pekerjaan sesuai jadwal yang disepakati tanpa penundaan.",
    icon: "⏰",
  },
  {
    title: "Terjamin & Bergaransi",
    desc: "Setiap pekerjaan bergaransi kepuasan — jika tidak puas, kami siap mengulang tanpa biaya tambahan.",
    icon: "🛡️",
  },
];

const addOns = [
  "Poles lantai marmer & granit",
  "Cuci karpet & sofa",
  "Fogging & disinfeksi",
  "Pembersihan AC",
  "Cuci kaca eksterior gedung",
  "Pengiriman dokumen antar lantai",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
      data-testid={`card-service-${service.id}`}
    >
      <div className="h-2 w-full bg-gradient-to-r from-primary to-[hsl(173,80%,45%)]" />
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary transition-all">
            {service.category === "cleaning" ? (
              <Sparkles size={22} className="text-primary group-hover:text-white transition-colors" />
            ) : (
              <Users size={22} className="text-primary group-hover:text-white transition-colors" />
            )}
          </div>
          <h3 className="text-xl font-bold">{service.title}</h3>
        </div>

        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{service.description}</p>

        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Termasuk:</h4>
        <ul className="space-y-2 mb-6">
          {service.includes.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm">
              <CheckCircle2 size={16} className="text-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-5 border-t border-card-border">
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Mulai dari</div>
            <div className="text-lg font-bold text-primary">{service.priceRange.replace("Mulai dari ", "")}</div>
          </div>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="rounded-full px-5">
              Konsultasi
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-[hsl(173,60%,12%)] text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Layanan</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Solusi Kebersihan & Office Support</h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              Pilih layanan yang sesuai dengan kebutuhan kantor Anda. Semua tersedia dengan harga transparan dan tim profesional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cleaning Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex items-center gap-3 mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Sparkles size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Cleaning Service</h2>
              <p className="text-muted-foreground text-sm mt-0.5">Layanan kebersihan profesional untuk berbagai kebutuhan</p>
            </div>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cleaningServices.map((s) => <ServiceCard key={s.id} service={s} />)}
          </motion.div>
        </div>
      </section>

      {/* Office Boy Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex items-center gap-3 mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="p-2.5 bg-secondary/10 rounded-xl">
              <Users size={24} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Office Boy</h2>
              <p className="text-muted-foreground text-sm mt-0.5">Staf terlatih untuk mendukung operasional kantor harian Anda</p>
            </div>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {obServices.map((s) => <ServiceCard key={s.id} service={s} />)}
          </motion.div>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Layanan Tambahan</Badge>
            <h2 className="text-3xl font-bold mb-3">Layanan Spesial & Add-On</h2>
            <p className="text-muted-foreground mb-10">Tersedia sebagai layanan tambahan ataupun paket mandiri. Hubungi kami untuk harga.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {addOns.map((item) => (
                <div key={item} className="flex items-center gap-2 bg-card border border-card-border rounded-full px-4 py-2 text-sm font-medium">
                  <CheckCircle2 size={15} className="text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">Keunggulan Kami</Badge>
            <h2 className="text-3xl font-bold text-white">Mengapa Memilih BersihKlin?</h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyUs.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-center">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Phone size={44} className="mx-auto mb-5 text-white/80" />
            <h2 className="text-3xl font-bold text-white mb-4">Dapatkan Penawaran Khusus Hari Ini</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Konsultasikan kebutuhan Anda dengan tim kami dan dapatkan penawaran terbaik sesuai anggaran.
            </p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full px-10 bg-white text-primary hover:bg-white/90 font-bold shadow-xl shadow-black/20">
                Hubungi via WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
