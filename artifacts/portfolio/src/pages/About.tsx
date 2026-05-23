import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-[hsl(173,60%,12%)] text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Profil Saya</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{profile.name}</h1>
            <p className="text-primary text-xl font-semibold mb-4">{profile.tagline}</p>
            <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">{profile.summary}</p>
          </motion.div>
        </div>
      </section>

      {/* Profil Diri */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-start"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Tentang Saya</Badge>
              <h2 className="text-3xl font-bold mb-5">Siapa Saya?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Saya adalah {profile.name}, seorang tenaga kebersihan dan office support yang berpengalaman lebih dari 6 tahun. Saya pernah bekerja sebagai cleaning service, office boy, dan messenger di berbagai perusahaan di Jakarta.
                </p>
                <p>
                  Saya terbiasa bekerja di lingkungan kantor korporat yang menuntut standar kebersihan tinggi dan kedisiplinan. Saya bangga dengan setiap pekerjaan yang saya selesaikan dan selalu berusaha memberikan hasil terbaik.
                </p>
                <p>
                  Saat ini saya sedang mencari kesempatan baru untuk berkembang dan memberikan kontribusi terbaik saya kepada perusahaan yang membutuhkan tenaga yang handal, disiplin, dan bertanggung jawab.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Data Diri</Badge>
              <h2 className="text-3xl font-bold mb-5">Informasi Pribadi</h2>
              <dl className="space-y-4">
                {[
                  { label: "Nama Lengkap", value: profile.name },
                  { label: "Domisili", value: profile.location },
                  { label: "Bidang Keahlian", value: "Cleaning Service, Office Boy, Messenger" },
                  { label: "Lama Pengalaman", value: "6+ Tahun" },
                  { label: "Status", value: "Siap Bekerja (Available)" },
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

      {/* Kontak */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Kontak</Badge>
            <h2 className="text-3xl font-bold">Hubungi Saya</h2>
            <p className="text-muted-foreground mt-2">
              Tertarik merekrut saya? Jangan ragu untuk menghubungi saya melalui kontak di bawah ini.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Phone,
                label: "Telepon / WhatsApp",
                value: profile.phone,
                href: `https://wa.me/${profile.phone.replace(/\D/g, "")}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: profile.email,
                href: `mailto:${profile.email}`,
              },
              {
                icon: MapPin,
                label: "Lokasi",
                value: profile.location,
                href: null,
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="bg-card border border-card-border rounded-2xl p-6 text-center hover:shadow-md transition-all"
              >
                <div className="bg-primary/10 p-3 rounded-xl w-fit mx-auto mb-4">
                  <item.icon size={22} className="text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-sm hover:text-primary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-semibold text-sm">{item.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <a href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full px-10 shadow-lg shadow-primary/20">
                <MessageCircle size={18} className="mr-2" /> Chat via WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA rekruter */}
      <section className="py-20 bg-primary text-center">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Saya Siap Bergabung</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Saya adalah pekerja keras, disiplin, dan bertanggung jawab. Mari berdiskusi tentang bagaimana saya bisa berkontribusi untuk perusahaan Anda.
            </p>
            <a href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
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
