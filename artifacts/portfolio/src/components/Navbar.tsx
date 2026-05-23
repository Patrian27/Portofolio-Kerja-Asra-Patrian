import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Portofolio", path: "/portfolio" },
    { name: "Layanan", path: "/services" },
    { name: "Tentang Kami", path: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Sparkles size={20} />
            </div>
            <span className={`font-bold text-xl tracking-tight ${isScrolled ? "text-secondary" : "text-secondary"}`}>
              Bersih<span className="text-primary">Klin</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  location === link.path ? "text-primary" : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button className="rounded-full px-6 shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              Hubungi Kami
            </Button>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-medium p-2 rounded-md ${
                location === link.path ? "bg-primary/10 text-primary" : "text-slate-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full mt-2 rounded-full">Hubungi Kami</Button>
        </div>
      )}
    </header>
  );
}
