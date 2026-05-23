import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Calendar, X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, type Project, type ServiceCategory } from "@/data/data";

const categories: { label: string; value: ServiceCategory | "all" }[] = [
  { label: "Semua", value: "all" },
  { label: "Cleaning Service", value: "cleaning" },
  { label: "Office Boy", value: "office-boy" },
];

function BeforeAfterViewer({ project }: { project: Project }) {
  const phases = [
    project.images.before ? { label: "Sebelum", src: project.images.before } : null,
    project.images.progress ? { label: "Proses", src: project.images.progress } : null,
    { label: "Sesudah", src: project.images.after },
  ].filter(Boolean) as { label: string; src: string }[];

  const [activeIdx, setActiveIdx] = useState(phases.length - 1);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={phases[activeIdx].src}
            alt={phases[activeIdx].label}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.src = `https://placehold.co/600x450/e2e8f0/94a3b8?text=${encodeURIComponent(phases[activeIdx].label)}`;
            }}
          />
        </AnimatePresence>
        <div className="absolute top-3 left-3">
          <span className="bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            {phases[activeIdx].label}
          </span>
        </div>
        {phases.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx((i) => (i - 1 + phases.length) % phases.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
              data-testid="btn-prev-phase"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setActiveIdx((i) => (i + 1) % phases.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
              data-testid="btn-next-phase"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
      <div className="flex gap-2">
        {phases.map((phase, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            data-testid={`btn-phase-${idx}`}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              activeIdx === idx
                ? "bg-primary text-white border-primary"
                : "bg-card text-muted-foreground border-card-border hover:border-primary/50"
            }`}
          >
            {phase.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose, onPrev, onNext }: {
  project: Project;
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
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className={`mb-2 text-xs ${project.category === "cleaning" ? "bg-primary/10 text-primary border-primary/20" : "bg-secondary/10 text-secondary border-secondary/20"}`}>
                {project.category === "cleaning" ? "Cleaning Service" : "Office Boy"}
              </Badge>
              <h2 className="text-2xl font-bold" data-testid="modal-project-title">{project.title}</h2>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Building2 size={14} />{project.location}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} />{project.date}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              data-testid="btn-close-modal"
            >
              <X size={20} />
            </button>
          </div>

          <BeforeAfterViewer project={project} />

          <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{project.description}</p>

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

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);
  const selectedIdx = selectedProject ? filtered.indexOf(selectedProject) : -1;

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-[hsl(173,60%,12%)] text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Dokumentasi Kerja</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Portofolio Hasil Kerja</h1>
            <p className="text-slate-300 text-lg">
              Setiap proyek didokumentasikan lengkap — dari kondisi awal hingga hasil akhir yang memuaskan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                data-testid={`filter-${cat.value}`}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.label}
                <span className="ml-2 opacity-70">
                  ({cat.value === "all" ? projects.length : projects.filter((p) => p.category === cat.value).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
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
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  className="bg-card border border-card-border rounded-2xl overflow-hidden group hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  data-testid={`card-project-${project.id}`}
                >
                  <BeforeAfterViewer project={project} />
                  <div className="p-5">
                    <Badge className={`mb-2 text-xs ${project.category === "cleaning" ? "bg-primary/10 text-primary border-primary/20" : "bg-secondary/10 text-secondary border-secondary/20"}`}>
                      {project.category === "cleaning" ? "Cleaning Service" : "Office Boy"}
                    </Badge>
                    <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1"><Building2 size={11} /> {project.location}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} /> {project.date}</span>
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    <div className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
                      Lihat Detail <ChevronRight size={13} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">Tidak ada proyek ditemukan.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onPrev={() => {
              if (selectedIdx > 0) setSelectedProject(filtered[selectedIdx - 1]);
            }}
            onNext={() => {
              if (selectedIdx < filtered.length - 1) setSelectedProject(filtered[selectedIdx + 1]);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
