import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Printer, ArrowLeft, Briefcase, GraduationCap, Award, CheckCircle2, Star } from "lucide-react";
import { profile as staticProfile } from "@/data/data";

export default function CV() {
  const { data: apiProfile } = useQuery<any>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  const { data: apiExps } = useQuery<any[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetch("/api/experiences");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  const { data: apiEducation } = useQuery<any[]>({
    queryKey: ["education"],
    queryFn: async () => {
      const res = await fetch("/api/education");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  const { data: apiCerts } = useQuery<any[]>({
    queryKey: ["certificates"],
    queryFn: async () => {
      const res = await fetch("/api/certificates");
      if (!res.ok) throw new Error("Gagal");
      return res.json();
    },
    staleTime: 30000,
  });

  const p = apiProfile ?? staticProfile;
  const experiences = apiExps ?? [];
  const education = apiEducation ?? [];
  const certs = apiCerts ?? [];
  const skills: string[] = p.skills ?? staticProfile.skills ?? [];
  const softSkills: string[] = p.softSkills ?? staticProfile.softSkills ?? [];
  const posisiDilamar: string[] = p.posisiDilamar ?? staticProfile.posisiDilamar ?? [];

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      {/* Toolbar — disembunyikan saat print */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <button className="flex items-center gap-2 text-slate-600 hover:text-primary text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> Kembali ke Portfolio
          </button>
        </Link>
        <div className="flex items-center gap-3">
          <p className="text-xs text-slate-400 hidden md:block">Klik "Cetak" lalu pilih "Simpan sebagai PDF"</p>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md"
          >
            <Printer size={15} /> Cetak / Unduh PDF
          </button>
        </div>
      </div>

      {/* Dokumen CV */}
      <div className="max-w-3xl mx-auto my-8 print:my-0 bg-white shadow-xl print:shadow-none print:max-w-none">

        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 print:p-6 flex gap-6 items-start">
          {apiProfile?.profilePhoto && (
            <img
              src={apiProfile.profilePhoto}
              alt={p.name}
              className="w-24 h-24 rounded-xl object-cover object-top shrink-0 border-2 border-white/20"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight print:text-2xl">{p.name}</h1>
            <p className="text-green-400 text-base font-semibold mt-1 print:text-sm">{p.tagline}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-sm text-slate-300">
              <span className="flex items-center gap-1.5"><Phone size={13} />{p.phone}</span>
              <span className="flex items-center gap-1.5"><Mail size={13} />{p.email}</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} />{p.location}</span>
            </div>
            {posisiDilamar.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {posisiDilamar.map((pos: string) => (
                  <span key={pos} className="bg-green-500/20 text-green-300 border border-green-500/30 text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                    {pos}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-8 print:p-6 space-y-7 print:space-y-5">

          {/* Ringkasan */}
          {p.summary && (
            <section>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3">Ringkasan Profil</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{p.summary}</p>
            </section>
          )}

          {/* Pengalaman Kerja */}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-4 flex items-center gap-2">
                <Briefcase size={14} className="text-primary" /> Pengalaman Kerja
              </h2>
              <div className="space-y-4 print:space-y-3">
                {experiences.map((exp: any) => (
                  <div key={exp.id} className="pl-3 border-l-2 border-primary/30">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">{exp.role}</h3>
                        <p className="text-slate-500 text-xs">
                          {exp.company}
                          {exp.employmentType ? ` · ${exp.employmentType}` : ""}
                          {exp.location ? ` · ${exp.location}` : ""}
                        </p>
                        {Array.isArray(exp.via) && exp.via.length > 0 && (
                          <p className="text-xs text-slate-400">via {exp.via.join(", ")}</p>
                        )}
                      </div>
                      <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">{exp.period}</span>
                    </div>
                    {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.responsibilities.map((r: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5 text-[12px] text-slate-600">
                            <CheckCircle2 size={10} className="text-primary shrink-0 mt-0.5" /> {r}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pendidikan */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
                <GraduationCap size={14} className="text-primary" /> Riwayat Pendidikan
              </h2>
              <div className="space-y-2.5">
                {education.map((edu: any) => (
                  <div key={edu.id} className="flex justify-between items-center pl-3 border-l-2 border-primary/30">
                    <div>
                      <p className="font-bold text-sm text-slate-800">{edu.institution}</p>
                      <p className="text-xs text-slate-500">{edu.major}</p>
                    </div>
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2-kolom: Keahlian + Etos Kerja */}
          {(skills.length > 0 || softSkills.length > 0) && (
            <div className="grid grid-cols-2 gap-6 print:gap-4">
              {skills.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3">Keahlian</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s: string) => (
                      <span key={s} className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </section>
              )}
              {softSkills.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-1.5">
                    <Star size={12} className="text-primary" /> Etos Kerja
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {softSkills.map((s: string) => (
                      <span key={s} className="bg-primary/10 text-primary text-[11px] px-2.5 py-0.5 rounded-full border border-primary/20">{s}</span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* Sertifikat */}
          {certs.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
                <Award size={14} className="text-primary" /> Sertifikat & Pelatihan
              </h2>
              <div className="grid grid-cols-2 gap-2 print:grid-cols-2">
                {certs.map((cert: any) => (
                  <div key={cert.id} className="border border-slate-200 rounded-lg p-2.5">
                    <p className="font-semibold text-[12px] text-slate-800 leading-tight">{cert.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Footer portfolio URL */}
          <div className="border-t border-slate-100 pt-4 print:pt-3">
            <p className="text-[11px] text-slate-400 text-center">
              Portfolio lengkap:{" "}
              <span className="text-primary font-medium">
                portofolio-cleaning-asra-patrian--rasamjupatrian9.replit.app
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { margin: 15mm 12mm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
