import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const links = [
  { href: "#about", label: "Home" },
  { href: "#courses", label: "Courses" },
  { href: "#director-message", label: "Leadership" },
  { href: "#careers", label: "Careers" },
  { href: "#gallery", label: "Gallery" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logo}
            alt="आनंद संगीत महाविद्यालय - Logo"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-contain shadow-warm bg-background"
          />
          <div className="leading-tight">
            <div className="font-display font-bold text-sm md:text-base text-secondary">Anand Sangeet</div>
            <div className="text-[10px] text-muted-foreground -mt-0.5 md:text-base">महाविद्यालय</div>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button variant="hero" asChild>
            <a href="#admission">Apply Now</a>
          </Button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <ul className="container py-4 flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2 font-medium">
                  {l.label}
                </a>
              </li>
            ))}
            <Button variant="hero" asChild className="mt-2">
              <a href="#admission" onClick={() => setOpen(false)}>Apply Now</a>
            </Button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
