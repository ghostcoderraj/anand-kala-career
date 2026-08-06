import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Phone } from "lucide-react";
import hero from "@/assets/hero.jpg";

const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={hero} alt="Indian classical art students" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/30" />
        <div className="absolute inset-0 mandala-bg" />
      </div>

      {/* Decorative mandala */}
      <div className="absolute -right-40 -top-20 w-[600px] h-[600px] opacity-10 animate-slow-spin pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-accent">
          <g fill="none" stroke="currentColor" strokeWidth="0.5">
            {Array.from({ length: 24 }).map((_, i) => (
              <circle key={i} cx="100" cy="100" r={20 + i * 3} />
            ))}
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1="100" y1="100" x2={100 + 90 * Math.cos((i * Math.PI) / 8)} y2={100 + 90 * Math.sin((i * Math.PI) / 8)} />
            ))}
          </g>
        </svg>
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Admission Open 2026</span>
          </div>

          <h1 className="font-hindi text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[1.05] mb-6">
            आनंद संगीत<br />
            <span className="bg-gradient-gold bg-clip-text text-transparent">महाविद्यालय</span>
          </h1>

          <p className="font-hindi text-xl md:text-2xl text-primary-foreground/90 mb-3">
            कला से करियर की ओर एक सार्थक कदम
          </p>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed">
            Empowering students through Music, Dance, Fine Arts & Yoga with recognized degrees and government career opportunities.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="#admission">
                Apply Now <ArrowRight className="ml-1" />
              </a>
            </Button>
            <Button variant="gold" size="xl" asChild>
              <a href="#courses">
                <BookOpen className="mr-1" /> Explore Courses
              </a>
            </Button>
            <Button variant="outline" size="xl" className="bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20 backdrop-blur-sm" asChild>
              <a href="#contact">
                <Phone className="mr-1" /> Contact Us
              </a>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { n: "2000+", l: "Students" },
              { n: "10+", l: "Years" },
              { n: "100%", l: "Recognized" },
            ].map((s) => (
              <div key={s.l} className="text-primary-foreground">
                <div className="font-display text-3xl md:text-4xl font-bold text-accent">{s.n}</div>
                <div className="text-xs md:text-sm text-primary-foreground/70 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
