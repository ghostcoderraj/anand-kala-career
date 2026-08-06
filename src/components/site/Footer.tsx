import logo from "@/assets/logo.png";
import { Facebook, Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/socialLinks";

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary-foreground pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-30" />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="font-hindi text-2xl md:text-3xl text-accent leading-relaxed italic">
            "आज जब रोजगार के नए रास्तों की तलाश ज़रूरी है,<br />
            आनंद संगीत महाविद्यालय बताता है —<br />
            <span className="bg-gradient-gold bg-clip-text text-transparent not-italic font-bold">कला भी भविष्य बना सकती है।</span>"
          </div>
        </div>

        <div className="gold-divider w-32 mx-auto mb-12" />

        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="आनंद संगीत महाविद्यालय"
                className="w-14 h-14 rounded-full object-contain bg-background/95 p-0.5"
              />

              <div>
                <div className="font-display font-bold text-lg">Anand Sangeet</div>
                <div className="text-primary-foreground/60 text-base">महाविद्यालय</div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-4">
              A trusted center where Indian art transforms into recognized careers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook — Anand Sangit Mahavidyalay"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-accent hover:text-secondary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — anandsangitmahavidyalay"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-accent hover:text-secondary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-accent mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
              <li><a href="#courses" className="hover:text-accent transition-colors">Courses</a></li>
              <li><a href="#director-message" className="hover:text-accent transition-colors">Leadership</a></li>
              <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
              <li><a href="#news" className="hover:text-accent transition-colors">News</a></li>
              <li><a href="#careers" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#admission" className="hover:text-accent transition-colors">Admission</a></li>
              <li><a href="#faq" className="hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-accent mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Haspura I.T.I.Haspura, Itwan Road, Haspura</li>
              <li><a href="tel:+919472626355" className="hover:text-accent">+91 94726 26355</a></li>
              <li><a href="tel:+919153267412" className="hover:text-accent">+91 91532 67412</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} आनंद संगीत महाविद्यालय. All rights reserved.
          {" · "}
          Built By <a href="https://www.rajaditya.online" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Aditya Raj</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;