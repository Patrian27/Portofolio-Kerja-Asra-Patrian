import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function ImageModal({ src, name, onClose }: { src: string; name: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 flex flex-col items-center gap-3 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={name} className="w-full max-h-[75vh] object-contain" />
        <div className="px-6 pb-5 flex flex-col items-center gap-2 w-full">
          <p className="text-sm font-semibold text-slate-700 text-center">{name}</p>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">✕ Tutup</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Pendidikan() {
  const [modal, setModal] = useState<{ src: string; name: string } | null>(null);

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
        {modal && <ImageModal src={modal.src} name={modal.name} onClose={() => setModal(null)} />}
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
            <motion.div className="space-y-5" variants={stagger} initial="hidden" animate="visible">
              {educationList.map((edu: any) => (
                <motion.div
                  key={edu.id}
                  variants={fadeUp}
                  className="bg-card border border-card-border rounded-2xl p-6 hover:shadow-md transition-all"
                >
                  <div className="flex gap-5 items-center">
                    {/* Logo */}
                    <div
                      className={`w-16 h-16 rounded-xl border border-border bg-muted/30 overflow-hidden flex items-center justify-center shrink-0 ${edu.schoolLogo ? "cursor-zoom-in hover:ring-2 hover:ring-primary/40 transition-all" : ""}`}
                      onClick={() => edu.schoolLogo && setModal({ src: edu.schoolLogo, name: edu.institution })}
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
                  </div>

                  {/* Media & Lampiran */}
                  {Array.isArray(edu.media) && edu.media.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">📎 Media & Lampiran</p>
                      {/* Links */}
                      {edu.media.some((m: any) => m.type === "link") && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {edu.media.filter((m: any) => m.type === "link").map((m: any, i: number) => (
                            <a key={i} href={m.url} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs bg-primary/5 border border-primary/20 text-primary rounded-lg px-3 py-1.5 hover:bg-primary/10 transition-colors font-medium">
                              <ExternalLink size={11} />
                              {m.label}
                            </a>
                          ))}
                        </div>
                      )}
                      {/* Images */}
                      {edu.media.some((m: any) => m.type === "image") && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {edu.media.filter((m: any) => m.type === "image").map((m: any, i: number) => (
                            <button key={i} type="button"
                              onClick={() => setModal({ src: m.data, name: m.label })}
                              className="group relative rounded-xl overflow-hidden border border-border bg-muted/30 aspect-video hover:ring-2 hover:ring-primary/50 transition-all cursor-zoom-in">
                              <img src={m.data} alt={m.label} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-2 py-1 rounded-md">🔍 Perbesar</span>
                              </div>
                              {m.label && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1.5">
                                  <p className="text-white text-[10px] font-medium truncate">{m.label}</p>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
