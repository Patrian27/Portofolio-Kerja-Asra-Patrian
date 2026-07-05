import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Pendidikan() {
  const [logoModal, setLogoModal] = useState<{ src: string; name: string } | null>(null);

  const { data: educationList = [], isLoading } = useQuery<any[]>({
    queryKey: ["education"],
    queryFn: async () => {
      const res = await fetch("/api/education");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  return (
    <div className="pt-20 min-h-screen bg-background">
      <AnimatePresence>
        {logoModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setLogoModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-2xl max-w-xs w-full mx-4 flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={logoModal.src} alt={logoModal.name} className="w-48 h-48 object-contain" />
              <p className="text-sm font-semibold text-slate-700 text-center">{logoModal.name}</p>
              <button onClick={() => setLogoModal(null)} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Tutup</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-secondary via-secondary to-[hsl(173,60%,12%)] text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Pendidikan</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Riwayat Pendidikan</h1>
            <p className="text-slate-300 text-base">Latar belakang pendidikan formal yang telah ditempuh.</p>
          </motion.div>
        </div>
      </section>

      {/* List */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          {isLoading ? (
            <div className="py-20 text-center text-muted-foreground">Memuat data...</div>
          ) : educationList.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <GraduationCap size={40} className="mx-auto mb-3 text-slate-300" />
              <p>Belum ada data pendidikan.</p>
            </div>
          ) : (
            <motion.div
              className="space-y-5"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {educationList.map((edu: any) => (
                <motion.div
                  key={edu.id}
                  variants={fadeUp}
                  className="bg-card border border-card-border rounded-2xl p-6 flex gap-5 items-center hover:shadow-md transition-all"
                >
                  <div
                    className={`w-16 h-16 rounded-xl border border-border bg-muted/30 overflow-hidden flex items-center justify-center shrink-0 ${edu.schoolLogo ? "cursor-zoom-in hover:ring-2 hover:ring-primary/40 transition-all" : ""}`}
                    onClick={() => edu.schoolLogo && setLogoModal({ src: edu.schoolLogo, name: edu.institution })}
                    title={edu.schoolLogo ? "Klik untuk perbesar" : undefined}
                  >
                    {edu.schoolLogo
                      ? <img src={edu.schoolLogo} alt={edu.institution} className="w-full h-full object-contain p-1.5" />
                      : <GraduationCap size={26} className="text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg leading-tight">{edu.institution}</h3>
                    <p className="text-muted-foreground text-sm mt-0.5">{edu.major}</p>
                  </div>
                  <Badge variant="outline" className="rounded-full text-sm shrink-0 px-4 py-1">{edu.year}</Badge>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
