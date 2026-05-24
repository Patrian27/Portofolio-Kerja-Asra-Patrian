import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Calendar, X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type WorkCategory } from "@/data/data";
import { useQuery } from "@tanstack/react-query";

const categories: { label: string; value: WorkCategory | "all" }[] = [
  { label: "Semua", value: "all" },
  { label: "Cleaning Service", value: "cleaning" },
  { label: "Office Boy", value: "office-boy" },
  { label: "Messenger", value: "messenger" },
];

const categoryColor: Record<string, string> = {
  cleaning: "bg-primary/10 text-primary border-primary/20",
  "office-boy": "bg-secondary/10 text-secondary border-secondary/20",
  messenger: "bg-amber-100 text-amber-700 border-amber-200",
};

const categoryLabel: Record<string, string> = {
  cleaning: "Cleaning Service",
  "office-boy": "Office Boy",
  messenger: "Messenger",
};

interface DocItem {
  id: string | number;
  title: string;
  category: string;
  company: string;
  date: string;
  description: string;
  images: { before?: string; progress?: string; after: string };
}

function toDocItem(raw: any): DocItem {
  return {
    id: raw.id,
    title: raw.title,
    category: raw.category,
    company: raw.company,
    date: raw.date,
    description: raw.description || "",
    images: {
      before: raw.imageBefore || undefined,
      progress: raw.imageProgress || undefined,
      after: raw.imageAfter,
    },
  };
}

function PhaseViewer({ doc }: { doc: DocItem }) {
  const phases = [
    doc.images.before ? { label: "Sebelum", src: doc.images.before } : null,
    doc.images.progress ? { label: "Proses", src: doc.images.progress } : null,
    { label: "Sesudah", src: doc.images.after },
  ].filter(Boolean) as { label: string; src: string }[];

  const [idx, setIdx] = useState(phases.length - 1);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={phases[idx].src}
            alt={phases[idx].label}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.src = `https://placehold.co/600x450/e2e8f0/94a3b8?text=${encodeURIComponent(phases[idx].label)}`;
            }}
          />
        </AnimatePresence>
        <div className="absolute top-3 left-3">
          <span className="bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            {phases[idx].label}
          </span>
        </div>
        {phases.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + phases.length) % phases.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % phases.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
      <div className="flex gap-2">
        {phases.map((phase, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              idx === i ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-card-border hover:border-primary/50"
            }`}
          >
            {phase.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DocModal({ doc, onClose, onPrev, onNext }: {
  doc: DocItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card border border-card-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90dvh] overflow-y-auto"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className={`mb-2 text-xs ${categoryColor[doc.category]}`}>
                {categoryLabel[doc.category]}
              </Badge>
              <h2 className="text-2xl font-bold">{doc.title}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Building2 size={13} />{doc.company}</span>
                <span className="flex items-center gap-1.5"><Calendar size={13} />{doc.date}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
              <X size={20} />
            </button>
          </div>

          <PhaseViewer doc={doc} />

          <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{doc.description}</p>

          <div className="flex justify-between mt-6">
            <Button variant="outline" size="sm" onClick={onPrev} className="rounded-full gap-1.5">
              <ArrowLeft size={14} /> Sebelumnya
            </Button>
            <Button variant="outline" size="sm" onClick={onNext} className="rounded-full gap-1.5">
              Berikutnya <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory | "all">("all");
  const [selected, setSelected] = useState<DocItem | null>(null);

  const { data: apiDocs } = useQuery<any[]>({
    queryKey: ["work-docs"],
    queryFn: async () => {
      const res = await fetch("/api/docs");
      if (!res.ok) throw new Error("API error");
      return res.json();
    },
    staleTime: 30000,
  });

  const allDocs: DocItem[] = (apiDocs ?? []).map(toDocItem);
  const filtered = activeCategory === "all" ? allDocs : allDocs.filter((d) => d.category === activeCategory);
  const selectedIdx = selected ? filtered.findIndex((d) => d.id === selected.id) : -1;

  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="bg-gradient-to-br from-secondary to-[hsl(173,60%,12%)] text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Dokumentasi Kerja</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Hasil Dokumentasi Pekerjaan</h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              Foto nyata sebelum, selama proses, dan sesudah pekerjaan selesai — bukti nyata kualitas kerja saya.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.label}
                <span className="ml-1.5 opacity-60 text-xs">
                  ({cat.value === "all" ? allDocs.length : allDocs.filter((d) => d.category === cat.value).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {filtered.map((doc) => (
                <motion.div
                  key={doc.id}
                  variants={fadeUp}
                  className="bg-card border border-card-border rounded-2xl overflow-hidden group hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelected(doc)}
                >
                  <PhaseViewer doc={doc} />
                  <div className="p-5">
                    <Badge className={`mb-2 text-xs ${categoryColor[doc.category]}`}>
                      {categoryLabel[doc.category]}
                    </Badge>
                    <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{doc.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-3">
                      <span className="flex items-center gap-1"><Building2 size={11} />{doc.company}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} />{doc.date}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{doc.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>Belum ada dokumentasi untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <DocModal
            doc={selected}
            onClose={() => setSelected(null)}
            onPrev={() => { if (selectedIdx > 0) setSelected(filtered[selectedIdx - 1]); }}
            onNext={() => { if (selectedIdx < filtered.length - 1) setSelected(filtered[selectedIdx + 1]); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
