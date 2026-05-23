import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { profile } from "@/data/data";

export function Footer() {
  return (
    <footer className="bg-secondary text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-primary text-white w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-base">
                {profile.name.charAt(0)}
              </div>
              <span className="font-bold text-lg text-white">
                {profile.name.split(" ")[0]}<span className="text-primary"> Portfolio</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
              Portfolio kerja pribadi {profile.name} — Cleaning Service, Office Boy & Messenger profesional.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={19} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={19} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin size={19} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link href="/dokumentasi" className="hover:text-primary transition-colors">Dokumentasi Kerja</Link></li>
              <li><Link href="/pengalaman" className="hover:text-primary transition-colors">Pengalaman & Keahlian</Link></li>
              <li><Link href="/kontak" className="hover:text-primary transition-colors">Profil & Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Kontak Langsung</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 items-center">
                <MapPin size={16} className="text-primary shrink-0" />
                <span>{profile.location}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="text-primary shrink-0" />
                <a href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`} className="hover:text-primary transition-colors">
                  {profile.phone}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="text-primary shrink-0" />
                <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {profile.name}. Portfolio Kerja Pribadi.</p>
        </div>
      </div>
    </footer>
  );
}
