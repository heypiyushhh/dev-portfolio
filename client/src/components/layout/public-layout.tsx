import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-white/5 py-4 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-heading font-bold text-foreground tracking-tight hover:opacity-80 transition-opacity">
            Piyush<span className="text-primary">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
            <div className="h-6 w-px bg-border mx-2"></div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col">
          <nav className="flex flex-col space-y-6 text-xl font-heading">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mt-auto pb-12 flex space-x-6">
            <a href="https://github.com" className="p-3 bg-secondary rounded-full text-foreground"><Github /></a>
            <a href="https://linkedin.com" className="p-3 bg-secondary rounded-full text-foreground"><Linkedin /></a>
            <a href="https://twitter.com" className="p-3 bg-secondary rounded-full text-foreground"><Twitter /></a>
          </div>
        </div>
      )}

      <main className="flex-grow pt-0">{children}</main>

      <footer className="bg-secondary py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-heading font-bold mb-6">Piyush<span className="text-primary">.</span></h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Building digital products, brands, and experience. Let's work together to create something amazing.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
             <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github /></a>
             <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin /></a>
          </div>
          <p className="text-sm text-muted-foreground/60">&copy; {new Date().getFullYear()} Piyush Kumar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
