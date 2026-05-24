import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Plus, X, Lock, CheckCircle, Image, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE = "/api";

const CATEGORIES = [
  { value: "cleaning", label: "Cleaning Service" },
  { value: "office-boy", label: "Office Boy" },
  { value: "messenger", label: "Messenger" },
];

const categoryColor: Record<string, string> = {
  cleaning: "bg-teal-100 text-teal-700",
  "office-boy": "bg-blue-100 text-blue-700",
  messenger: "bg-amber-100 text-amber-700",
};

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ImagePicker({
  label,
  required,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await toBase64(file);
    onChange(b64);
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
        {!required && <span className="text-slate-400 text-xs">(opsional)</span>}
      </label>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt={label}
            className="w-full aspect-[4/3] object-cover rounded-xl border-2 border-teal-400"
          />
          <button
            type="button"
            onClick={() => { onChange(""); if (ref.current) ref.current.value = ""; }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Ganti
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="w-full aspect-[4/3] border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-teal-400 hover:text-teal-500 transition-colors bg-slate-50"
        >
          <Image size={28} />
          <span className="text-sm font-medium">Pilih Foto {label}</span>
          <span className="text-xs">JPG, PNG — dari HP atau komputer</span>
        </button>
      )}
    </div>
  );
}

const emptyForm = {
  title: "",
  category: "cleaning",
  company: "",
  location: "",
  date: "",
  description: "",
  imageBefore: "",
  imageProgress: "",
  imageAfter: "",
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: docs = [], isLoading } = useQuery<any[]>({
    queryKey: ["admin-docs"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/docs`);
      if (!res.ok) throw new Error("Gagal memuat data");
      return res.json();
    },
    enabled: authed,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_BASE}/docs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPassword: password }),
      });
      if (!res.ok) throw new Error("Gagal menghapus");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-docs"] });
      queryClient.invalidateQueries({ queryKey: ["work-docs"] });
      toast({ title: "Berhasil dihapus!" });
    },
    onError: () => toast({ title: "Gagal menghapus", variant: "destructive" }),
  });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "asra2024") {
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Password salah. Coba lagi.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.imageAfter) {
      toast({ title: "Foto Sesudah wajib diisi!", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/docs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, adminPassword: password }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menyimpan");
      }
      toast({ title: "Dokumentasi berhasil ditambahkan!" });
      setForm(emptyForm);
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["admin-docs"] });
      queryClient.invalidateQueries({ queryKey: ["work-docs"] });
    } catch (err: any) {
      toast({ title: err.message || "Gagal menyimpan", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-3">
              <Lock className="text-teal-600" size={26} />
            </div>
            <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
            <p className="text-sm text-slate-500 mt-1">Masukkan password untuk lanjut</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Password admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              autoFocus
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
              Masuk
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-6 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Admin — Dokumentasi Kerja</h1>
            <p className="text-sm text-slate-500 mt-1">Tambah, lihat, dan hapus dokumentasi pekerjaan</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2"
          >
            <Plus size={16} />
            Tambah Baru
          </Button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Plus size={18} className="text-teal-500" /> Tambah Dokumentasi Baru
                  </h2>
                  <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Judul Pekerjaan <span className="text-red-500">*</span></label>
                    <input
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="cth: Pembersihan Lantai Lobby"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Kategori <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none bg-white"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Nama Perusahaan/Tempat <span className="text-red-500">*</span></label>
                    <input
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="cth: PT Transjakarta"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Tanggal / Periode</label>
                    <input
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      placeholder="cth: Jan 2023 atau 15 Maret 2024"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Deskripsi (opsional)</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Ceritakan singkat pekerjaan yang dilakukan..."
                      rows={2}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Foto Dokumentasi</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ImagePicker
                      label="Sebelum"
                      value={form.imageBefore}
                      onChange={(v) => setForm({ ...form, imageBefore: v })}
                    />
                    <ImagePicker
                      label="Proses"
                      value={form.imageProgress}
                      onChange={(v) => setForm({ ...form, imageProgress: v })}
                    />
                    <ImagePicker
                      label="Sesudah"
                      required
                      value={form.imageAfter}
                      onChange={(v) => setForm({ ...form, imageAfter: v })}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2 flex-1"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2"><Upload size={15} className="animate-bounce" /> Menyimpan...</span>
                    ) : (
                      <span className="flex items-center gap-2"><CheckCircle size={15} /> Simpan Dokumentasi</span>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setForm(emptyForm); setShowForm(false); }}
                    className="rounded-xl"
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="text-center py-20 text-slate-400">Memuat data...</div>
        ) : docs.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Image size={40} className="mx-auto mb-3 opacity-30" />
            <p>Belum ada dokumentasi. Klik "Tambah Baru" untuk mulai.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {docs.map((doc) => (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={doc.imageAfter}
                    alt={doc.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColor[doc.category] || "bg-slate-100 text-slate-600"}`}>
                      {CATEGORIES.find((c) => c.value === doc.category)?.label || doc.category}
                    </span>
                  </div>
                  {(doc.imageBefore || doc.imageProgress) && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      {doc.imageBefore && <span className="bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-full">Before</span>}
                      {doc.imageProgress && <span className="bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-full">Proses</span>}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-slate-800 mb-1">{doc.title}</h3>
                  <p className="text-xs text-slate-500 mb-3">{doc.company} — {doc.date}</p>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus "${doc.title}"?`)) deleteMutation.mutate(doc.id);
                    }}
                    disabled={deleteMutation.isPending}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    <Trash2 size={13} /> Hapus
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
