import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/data";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Dokumentasi Kerja", path: "/dokumentasi" },
    { name: "Pengalaman", path: "/pengalaman" },
    { name: "Kontak", path: "/kontak" },
  ];

  const firstName = profile.name.split(" ")[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-primary text-white w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-base group-hover:scale-105 transition-transform">
              {profile.name.charAt(0)}
            </div>
            <span className={`font-bold text-lg tracking-tight ${isScrolled ? "text-secondary" : "text-white"}`}>
              {firstName}<span className="text-primary"> Portfolio</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-medium text-sm transition-colors hover:text-primary ${
                  location === link.path
                    ? "text-primary"
                    : isScrolled ? "text-slate-600" : "text-slate-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full px-6 shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow text-sm">
                Rekrut Saya
              </Button>
            </a>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className={`md:hidden p-2 ${isScrolled ? "text-slate-700" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg py-4 px-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-medium p-2.5 rounded-xl text-sm ${
                location === link.path ? "bg-primary/10 text-primary" : "text-slate-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
            <Button className="w-full mt-1 rounded-full">Rekrut Saya</Button>
          </a>
        </div>
      )}
    </header>
  );
}
