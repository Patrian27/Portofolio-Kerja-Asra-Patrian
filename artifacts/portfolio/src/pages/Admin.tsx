import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Plus, X, Trash2, CheckCircle, Upload, Image,
  User, Briefcase, Award, Camera, ChevronDown, Edit3, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API = "/api";
const ADMIN_PW_KEY = "admin_pw";

// ─── helpers ────────────────────────────────────────────────────────────────

function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API}${path}`, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Error" }));
    throw new Error(err.error || "Gagal");
  }
  return res.json();
}

// ─── sub-components ─────────────────────────────────────────────────────────

function ImagePicker({ label, required, value, onChange }: { label: string; required?: boolean; value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}{required && <span className="text-red-500 ml-1">*</span>}{!required && <span className="text-slate-400 text-xs ml-1">(opsional)</span>}</label>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) onChange(await toBase64(f)); }} />
      {value ? (
        <div className="relative group">
          <img src={value} alt={label} className="w-full aspect-[4/3] object-cover rounded-xl border-2 border-teal-400" />
          <button type="button" onClick={() => { onChange(""); if (ref.current) ref.current.value = ""; }} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={13} /></button>
          <button type="button" onClick={() => ref.current?.click()} className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Ganti</button>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()} className="w-full aspect-[4/3] border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-teal-400 hover:text-teal-500 transition-colors bg-slate-50">
          <Image size={24} /><span className="text-sm font-medium">{label}</span><span className="text-xs">Pilih dari HP/komputer</span>
        </button>
      )}
    </div>
  );
}

function SingleImagePicker({ label, required, value, onChange }: { label: string; required?: boolean; value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) onChange(await toBase64(f)); }} />
      {value ? (
        <div className="relative group">
          <img src={value} alt={label} className="w-full h-40 object-cover rounded-xl border-2 border-teal-400" />
          <button type="button" onClick={() => { onChange(""); if (ref.current) ref.current.value = ""; }} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={13} /></button>
          <button type="button" onClick={() => ref.current?.click()} className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Ganti</button>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()} className="w-full h-40 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-teal-400 hover:text-teal-500 transition-colors bg-slate-50">
          <Image size={22} /><span className="text-sm">Pilih Foto</span>
        </button>
      )}
    </div>
  );
}

function Field({ label, value, onChange, textarea, placeholder }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; placeholder?: string }) {
  const cls = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white";
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {textarea
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={cls + " resize-none"} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}

function TagsField({ label, values, onChange }: { label: string; values: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");
  function add() {
    const v = input.trim();
    if (v && !values.includes(v)) { onChange([...values, v]); setInput(""); }
  }
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} placeholder="Ketik lalu Enter" className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
        <button type="button" onClick={add} className="px-4 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors">+</button>
      </div>
      <div className="flex flex-wrap gap-2 mt-1">
        {values.map((v, i) => (
          <span key={i} className="flex items-center gap-1 bg-teal-50 text-teal-700 border border-teal-200 text-xs px-3 py-1 rounded-full">
            {v}
            <button type="button" onClick={() => onChange(values.filter((_, j) => j !== i))}><X size={11} /></button>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── TABS ───────────────────────────────────────────────────────────────────

const TABS = [
  { id: "profil", label: "Profil", icon: User },
  { id: "pengalaman", label: "Pengalaman", icon: Briefcase },
  { id: "sertifikat", label: "Sertifikat", icon: Award },
  { id: "dokumentasi", label: "Dokumentasi", icon: Camera },
] as const;
type TabId = typeof TABS[number]["id"];

// ─── PROFIL TAB ──────────────────────────────────────────────────────────────

function ProfilTab({ pw }: { pw: string }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery<any>({ queryKey: ["admin-profile"], queryFn: () => apiFetch("/profile") });
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  if (isLoading) return <div className="py-10 text-center text-slate-400">Memuat...</div>;
  const f = form ?? data ?? {};
  const set = (k: string, v: any) => setForm({ ...f, [k]: v });

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    try {
      await apiFetch("/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, adminPassword: pw }) });
      toast({ title: "Profil berhasil disimpan!" });
      qc.invalidateQueries({ queryKey: ["admin-profile"] });
      qc.invalidateQueries({ queryKey: ["profile"] });
      setForm(null);
    } catch (err: any) { toast({ title: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  }

  return (
    <form onSubmit={save} className="space-y-5">
      {/* Foto Profil */}
      <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
        <p className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2"><Camera size={15} className="text-teal-600" /> Foto Profil</p>
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Preview */}
          <div className="shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-teal-400 shadow-lg bg-slate-200">
              <img
                src={f.profilePhoto || "/images/profile-nobg.png"}
                alt="Foto Profil"
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/profile-nobg.png"; }}
              />
            </div>
          </div>
          {/* Upload area */}
          <div className="flex-1 space-y-2">
            <p className="text-xs text-slate-500">Upload foto baru untuk mengganti foto profil yang tampil di halaman utama.</p>
            <SingleImagePicker
              label="Pilih Foto Profil"
              value={f.profilePhoto ?? ""}
              onChange={(v) => set("profilePhoto", v)}
            />
            {f.profilePhoto && (
              <button type="button" onClick={() => set("profilePhoto", null)} className="text-xs text-red-500 hover:underline flex items-center gap-1"><X size={11} /> Hapus foto (gunakan default)</button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Nama Lengkap" value={f.name ?? ""} onChange={(v) => set("name", v)} placeholder="Asra Patrian" />
        <Field label="Tagline" value={f.tagline ?? ""} onChange={(v) => set("tagline", v)} placeholder="Tenaga Cleaning Service..." />
        <Field label="No. HP / WhatsApp" value={f.phone ?? ""} onChange={(v) => set("phone", v)} placeholder="+62 8xx" />
        <Field label="Email" value={f.email ?? ""} onChange={(v) => set("email", v)} placeholder="email@gmail.com" />
        <Field label="Kota / Lokasi" value={f.location ?? ""} onChange={(v) => set("location", v)} placeholder="Bogor, Jawa Barat" />
      </div>
      <Field label="Deskripsi / Ringkasan Diri" value={f.summary ?? ""} onChange={(v) => set("summary", v)} textarea placeholder="Tenaga operasional berpengalaman..." />
      <div className="border-t border-slate-100 pt-4">
        <p className="text-sm font-semibold text-slate-600 mb-3">Link Media Sosial & Loker</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="LinkedIn" value={f.linkedin ?? ""} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/..." />
          <Field label="JobStreet" value={f.jobstreet ?? ""} onChange={(v) => set("jobstreet", v)} placeholder="https://jobstreet.com/..." />
          <Field label="Pintarnya" value={f.pintarnya ?? ""} onChange={(v) => set("pintarnya", v)} placeholder="https://pintarnya.com/..." />
          <Field label="Instagram" value={f.instagram ?? ""} onChange={(v) => set("instagram", v)} placeholder="https://instagram.com/..." />
          <Field label="TikTok" value={f.tiktok ?? ""} onChange={(v) => set("tiktok", v)} placeholder="https://tiktok.com/@..." />
          <Field label="Telegram" value={f.telegram ?? ""} onChange={(v) => set("telegram", v)} placeholder="https://t.me/..." />
          <Field label="Facebook" value={f.facebook ?? ""} onChange={(v) => set("facebook", v)} placeholder="https://facebook.com/..." />
        </div>
      </div>
      <div className="border-t border-slate-100 pt-4 space-y-4">
        <TagsField label="Posisi yang Dilamar" values={f.posisiDilamar ?? []} onChange={(v) => set("posisiDilamar", v)} />
        <TagsField label="Keahlian / Skills" values={f.skills ?? []} onChange={(v) => set("skills", v)} />
        <TagsField label="Soft Skills" values={f.softSkills ?? []} onChange={(v) => set("softSkills", v)} />
        <TagsField label="Info Tambahan" values={f.additionalInfo ?? []} onChange={(v) => set("additionalInfo", v)} />
      </div>
      <div className="pt-2">
        <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2 w-full md:w-auto px-8">
          {saving ? <><Upload size={14} className="animate-bounce" /> Menyimpan...</> : <><Save size={14} /> Simpan Profil</>}
        </Button>
      </div>
    </form>
  );
}

// ─── PENGALAMAN TAB ──────────────────────────────────────────────────────────

const emptyExp = { role: "", company: "", via: "", period: "", location: "", responsibilities: [] as string[] };

function PengalamanTab({ pw }: { pw: string }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyExp);
  const [saving, setSaving] = useState(false);

  const { data: exps = [], isLoading } = useQuery<any[]>({ queryKey: ["admin-exps"], queryFn: () => apiFetch("/experiences") });

  const del = useMutation({
    mutationFn: (id: number) => apiFetch(`/experiences/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminPassword: pw }) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-exps"] }); qc.invalidateQueries({ queryKey: ["experiences"] }); toast({ title: "Berhasil dihapus!" }); },
    onError: (e: any) => toast({ title: e.message, variant: "destructive" }),
  });

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    try {
      await apiFetch("/experiences", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, adminPassword: pw }) });
      toast({ title: "Pengalaman berhasil ditambahkan!" });
      setForm(emptyExp); setShowForm(false);
      qc.invalidateQueries({ queryKey: ["admin-exps"] }); qc.invalidateQueries({ queryKey: ["experiences"] });
    } catch (err: any) { toast({ title: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(!showForm)} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2"><Plus size={15} /> Tambah Pengalaman</Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} onSubmit={save} className="overflow-hidden bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-700">Pengalaman Baru</h3>
              <button type="button" onClick={() => setShowForm(false)}><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Posisi / Jabatan *" value={form.role} onChange={(v) => setForm({ ...form, role: v })} placeholder="cth: Office Boy" />
              <Field label="Perusahaan *" value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="cth: PT ABC Indonesia" />
              <Field label="Via (Outsourcing)" value={form.via} onChange={(v) => setForm({ ...form, via: v })} placeholder="cth: PT Mitra Kerja (opsional)" />
              <Field label="Periode *" value={form.period} onChange={(v) => setForm({ ...form, period: v })} placeholder="cth: 2022 – 2024" />
              <Field label="Kota / Lokasi" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="cth: Jakarta" />
            </div>
            <TagsField label="Tugas & Tanggung Jawab (tekan Enter untuk tambah)" values={form.responsibilities} onChange={(v) => setForm({ ...form, responsibilities: v })} />
            <div className="flex gap-3 pt-1">
              <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2 flex-1">{saving ? "Menyimpan..." : <><CheckCircle size={14} /> Simpan</>}</Button>
              <Button type="button" variant="outline" onClick={() => { setForm(emptyExp); setShowForm(false); }} className="rounded-xl">Batal</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {isLoading ? <div className="py-10 text-center text-slate-400">Memuat...</div> : (
        <div className="space-y-3">
          {exps.map((exp) => (
            <div key={exp.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-800">{exp.role}</p>
                <p className="text-sm text-slate-500">{exp.company}{exp.via ? ` · ${exp.via}` : ""}</p>
                <p className="text-xs text-teal-600 font-medium mt-0.5">{exp.period} · {exp.location}</p>
                {exp.responsibilities?.length > 0 && (
                  <ul className="mt-2 space-y-0.5">
                    {exp.responsibilities.slice(0, 2).map((r: string, i: number) => (
                      <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5"><span className="text-teal-400 mt-0.5">•</span>{r}</li>
                    ))}
                    {exp.responsibilities.length > 2 && <li className="text-xs text-slate-400">+{exp.responsibilities.length - 2} lainnya</li>}
                  </ul>
                )}
              </div>
              <button onClick={() => { if (confirm(`Hapus "${exp.role}"?`)) del.mutate(exp.id); }} className="text-red-400 hover:text-red-600 transition-colors shrink-0"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SERTIFIKAT TAB ──────────────────────────────────────────────────────────

const CERT_CATEGORIES = ["Operasional", "Pengembangan Karir", "Komputer", "Pelayanan", "Lainnya"];
const emptyCert = { title: "", issuer: "", date: "", category: "Operasional", image: "" };

function SertifikatTab({ pw }: { pw: string }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyCert);
  const [saving, setSaving] = useState(false);

  const { data: certs = [], isLoading } = useQuery<any[]>({ queryKey: ["admin-certs"], queryFn: () => apiFetch("/certificates") });

  const del = useMutation({
    mutationFn: (id: number) => apiFetch(`/certificates/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminPassword: pw }) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-certs"] }); qc.invalidateQueries({ queryKey: ["certificates"] }); toast({ title: "Berhasil dihapus!" }); },
    onError: (e: any) => toast({ title: e.message, variant: "destructive" }),
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image) { toast({ title: "Foto sertifikat wajib diisi!", variant: "destructive" }); return; }
    setSaving(true);
    try {
      await apiFetch("/certificates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, adminPassword: pw }) });
      toast({ title: "Sertifikat berhasil ditambahkan!" });
      setForm(emptyCert); setShowForm(false);
      qc.invalidateQueries({ queryKey: ["admin-certs"] }); qc.invalidateQueries({ queryKey: ["certificates"] });
    } catch (err: any) { toast({ title: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(!showForm)} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2"><Plus size={15} /> Tambah Sertifikat</Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} onSubmit={save} className="overflow-hidden bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-700">Sertifikat Baru</h3>
              <button type="button" onClick={() => setShowForm(false)}><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2"><Field label="Nama Sertifikat *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="cth: Pelatihan K3 Dasar" /></div>
              <Field label="Penerbit / Lembaga" value={form.issuer} onChange={(v) => setForm({ ...form, issuer: v })} placeholder="cth: BNSP" />
              <Field label="Tanggal" value={form.date} onChange={(v) => setForm({ ...form, date: v })} placeholder="cth: 10 Maret 2025" />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Kategori</label>
                <div className="relative">
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-teal-400">
                    {CERT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <SingleImagePicker label="Foto / Scan Sertifikat *" required value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
            <div className="flex gap-3 pt-1">
              <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2 flex-1">{saving ? "Menyimpan..." : <><CheckCircle size={14} /> Simpan</>}</Button>
              <Button type="button" variant="outline" onClick={() => { setForm(emptyCert); setShowForm(false); }} className="rounded-xl">Batal</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {isLoading ? <div className="py-10 text-center text-slate-400">Memuat...</div> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certs.map((cert) => (
            <motion.div key={cert.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="relative h-32">
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover object-top" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x200/e2e8f0/94a3b8?text=Sertifikat"; }} />
                <span className="absolute top-2 left-2 bg-teal-600 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">{cert.category}</span>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-slate-700 line-clamp-2 mb-1">{cert.title}</p>
                <p className="text-[10px] text-slate-400">{cert.date}</p>
                <button onClick={() => { if (confirm(`Hapus "${cert.title}"?`)) del.mutate(cert.id); }} className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-600 mt-2 font-medium"><Trash2 size={12} /> Hapus</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DOKUMENTASI TAB ─────────────────────────────────────────────────────────

const WORK_CATEGORIES = [
  { value: "cleaning", label: "Cleaning Service" },
  { value: "office-boy", label: "Office Boy" },
  { value: "messenger", label: "Messenger" },
];
const emptyDoc = { title: "", category: "cleaning", company: "", location: "", date: "", description: "", imageBefore: "", imageProgress: "", imageAfter: "" };

function DokumentasiTab({ pw }: { pw: string }) {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyDoc);
  const [saving, setSaving] = useState(false);

  const { data: docs = [], isLoading } = useQuery<any[]>({ queryKey: ["admin-docs"], queryFn: () => apiFetch("/docs") });

  const del = useMutation({
    mutationFn: (id: number) => apiFetch(`/docs/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminPassword: pw }) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-docs"] }); qc.invalidateQueries({ queryKey: ["work-docs"] }); toast({ title: "Berhasil dihapus!" }); },
    onError: (e: any) => toast({ title: e.message, variant: "destructive" }),
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.imageAfter) { toast({ title: "Foto Sesudah wajib diisi!", variant: "destructive" }); return; }
    setSaving(true);
    try {
      await apiFetch("/docs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, adminPassword: pw }) });
      toast({ title: "Dokumentasi berhasil ditambahkan!" });
      setForm(emptyDoc); setShowForm(false);
      qc.invalidateQueries({ queryKey: ["admin-docs"] }); qc.invalidateQueries({ queryKey: ["work-docs"] });
    } catch (err: any) { toast({ title: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(!showForm)} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2"><Plus size={15} /> Tambah Dokumentasi</Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} onSubmit={save} className="overflow-hidden bg-white rounded-2xl border border-slate-200 p-5 space-y-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-700">Dokumentasi Baru</h3>
              <button type="button" onClick={() => setShowForm(false)}><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2"><Field label="Judul Pekerjaan *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="cth: Pembersihan Lantai Lobby" /></div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Kategori</label>
                <div className="relative">
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-teal-400">
                    {WORK_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <Field label="Perusahaan / Tempat *" value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="cth: PT Transjakarta" />
              <Field label="Tanggal / Periode" value={form.date} onChange={(v) => setForm({ ...form, date: v })} placeholder="cth: Januari 2025" />
              <Field label="Lokasi" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="cth: Jakarta" />
              <div className="md:col-span-2"><Field label="Deskripsi" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea placeholder="Ceritakan singkat pekerjaan..." /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ImagePicker label="Sebelum" value={form.imageBefore} onChange={(v) => setForm({ ...form, imageBefore: v })} />
              <ImagePicker label="Proses" value={form.imageProgress} onChange={(v) => setForm({ ...form, imageProgress: v })} />
              <ImagePicker label="Sesudah" required value={form.imageAfter} onChange={(v) => setForm({ ...form, imageAfter: v })} />
            </div>
            <div className="flex gap-3 pt-1">
              <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-2 flex-1">{saving ? "Menyimpan..." : <><CheckCircle size={14} /> Simpan</>}</Button>
              <Button type="button" variant="outline" onClick={() => { setForm(emptyDoc); setShowForm(false); }} className="rounded-xl">Batal</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {isLoading ? <div className="py-10 text-center text-slate-400">Memuat...</div> : docs.length === 0 ? (
        <div className="py-16 text-center text-slate-400"><Camera size={36} className="mx-auto mb-3 opacity-30" /><p>Belum ada dokumentasi.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map((doc) => (
            <motion.div key={doc.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img src={doc.imageAfter} alt={doc.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x300/e2e8f0/94a3b8?text=Foto"; }} />
                <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">{WORK_CATEGORIES.find((c) => c.value === doc.category)?.label}</span>
              </div>
              <div className="p-4">
                <p className="font-bold text-sm text-slate-800 mb-1 line-clamp-1">{doc.title}</p>
                <p className="text-xs text-slate-500">{doc.company} — {doc.date}</p>
                <button onClick={() => { if (confirm(`Hapus "${doc.title}"?`)) del.mutate(doc.id); }} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 mt-2 font-medium"><Trash2 size={12} /> Hapus</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function Admin() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const [tab, setTab] = useState<TabId>("profil");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pw === "asra2024") { setAuthed(true); setAuthErr(""); }
    else setAuthErr("Password salah. Coba lagi.");
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-3"><Lock className="text-teal-600" size={26} /></div>
            <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
            <p className="text-sm text-slate-500 mt-1">Masukkan password untuk lanjut</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Password admin" value={pw} onChange={(e) => setPw(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" autoFocus />
            {authErr && <p className="text-red-500 text-sm">{authErr}</p>}
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl">Masuk</Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 size={18} className="text-teal-600" />
            <h1 className="font-bold text-slate-800">Admin Panel</h1>
          </div>
          <div className="flex gap-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${tab === t.id ? "bg-teal-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                  <Icon size={14} /><span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-800">{TABS.find((t) => t.id === tab)?.label}</h2>
          <p className="text-sm text-slate-500">
            {tab === "profil" && "Edit informasi pribadi, kontak, dan sosial media"}
            {tab === "pengalaman" && "Kelola riwayat pengalaman kerja"}
            {tab === "sertifikat" && "Upload dan hapus sertifikat pelatihan"}
            {tab === "dokumentasi" && "Tambah foto kerja before-proses-after"}
          </p>
        </div>

        {tab === "profil" && <ProfilTab pw={pw} />}
        {tab === "pengalaman" && <PengalamanTab pw={pw} />}
        {tab === "sertifikat" && <SertifikatTab pw={pw} />}
        {tab === "dokumentasi" && <DokumentasiTab pw={pw} />}
      </div>
    </div>
  );
}
