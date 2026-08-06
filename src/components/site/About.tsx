import { CheckCircle2, Heart, Users, GraduationCap, Sparkles } from "lucide-react";
import kalaBhavishyaPoster from "@/assets/kala-bhavishya-poster.png";

const points = [
  { icon: Heart, text: "Dedicated to cultural preservation" },
  { icon: GraduationCap, text: "Professional education system" },
  { icon: Users, text: "Experienced faculty" },
  { icon: Sparkles, text: "Rural & town students empowerment" },
  { icon: CheckCircle2, text: "Career-focused learning" },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-soft relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">About Us · परिचय</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
              Where heritage meets <span className="italic text-primary">opportunity.</span>
            </h2>
            <div className="gold-divider w-24 mb-6" />
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              आनंद संगीत महाविद्यालय is a reputed center preserving Indian art and culture, while transforming raw talent into successful, dignified careers.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              We believe art is not just an expression — it is a future. Our mission is to give every student, especially from rural and small-town India, a complete education that opens both stages and government desks.
            </p>

            <ul className="space-y-3">
              {points.map((p) => (
                <li key={p.text} className="flex items-center gap-3 group">
                  <span className="w-10 h-10 rounded-full bg-gradient-warm grid place-items-center shadow-warm shrink-0 group-hover:scale-110 transition-transform">
                    <p.icon className="w-5 h-5 text-primary-foreground" />
                  </span>
                  <span className="font-medium text-foreground">{p.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-gradient-royal p-1 shadow-royal">
              <div className="w-full rounded-3xl bg-card overflow-hidden">
                <img
                  src={kalaBhavishyaPoster}
                  alt="कला is भविष्य — Anand Sangeet Mahavidyalaya poster showcasing students performing classical music, dance and art"
                  loading="lazy"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-gold shadow-glow grid place-items-center animate-float">
              <span className="font-display font-bold text-secondary text-center text-sm leading-tight">10+<br/>Years of<br/>Trust</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
