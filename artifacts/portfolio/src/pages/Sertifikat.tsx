import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ZoomIn, Calendar, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { certificates as staticCertificates } from "@/data/data";

interface Cert {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  image: string;
}

const categoryColor: Record<string, string> = {
  "Operasional": "bg-primary/10 text-primary border-primary/20",
  "Pengembangan Karir": "bg-blue-100 text-blue-700 border-blue-200",
  "Komputer": "bg-purple-100 text-purple-700 border-purple-200",
  "Pelayanan": "bg-amber-100 text-amber-700 border-amber-200",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function Sertifikat() {
  const [selected, setSelected] = useState<Cert | null>(null);

  const { data: certificates = staticCertificates } = useQuery<Cert[]>({
    queryKey: ["certificates"],
    queryFn: async () => {
      const res = await fetch("/api/certificates");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  const categories = [...new Set(certificates.map((c) => c.category))];
  const issuers = [...new Set(certificates.map((c) => c.issuer))];

  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="bg-gradient-to-br from-secondary to-[hsl(173,60%,12%)] text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Sertifikasi</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Sertifikat & Pelatihan</h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              Bukti nyata komitmen saya dalam terus belajar dan meningkatkan kompetensi diri.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            className="flex flex-wrap justify-center gap-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { label: "Total Sertifikat", value: certificates.length },
              { label: "Kategori", value: categories.length },
              { label: "Penerbit", value: `${issuers.length} Lembaga` },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          {certificates.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Award size={40} className="mx-auto mb-3 opacity-30" />
              <p>Belum ada sertifikat. Tambah lewat Admin.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={fadeUp}
                  className="bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                  onClick={() => setSelected(cert)}
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x300/e2e8f0/94a3b8?text=Sertifikat"; }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className={`text-xs rounded-full ${categoryColor[cert.category] ?? "bg-muted"}`}>
                        {cert.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg shrink-0 mt-0.5">
                        <Award size={16} className="text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {cert.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <Building2 size={11} className="shrink-0" />
                          <span className="truncate">{cert.issuer}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar size={11} className="shrink-0" />
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-primary mt-3 font-medium">Klik untuk lihat sertifikat →</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative bg-card rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90dvh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                onClick={() => setSelected(null)}
              >
                <X size={18} />
              </button>
              <div className="overflow-auto">
                <img src={selected.image} alt={selected.title} className="w-full object-contain" />
              </div>
              <div className="p-5 border-t border-border shrink-0">
                <Badge className={`mb-2 text-xs rounded-full ${categoryColor[selected.category] ?? ""}`}>{selected.category}</Badge>
                <h2 className="font-bold text-base mb-1">{selected.title}</h2>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Building2 size={11} />{selected.issuer}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} />{selected.date}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
