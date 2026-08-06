import { ShieldCheck, GraduationCap } from "lucide-react";
import logoPrayag from "@/assets/logo-prayag.png";
import logoPrachin from "@/assets/logo-prachin.png";
import logoChhaya from "@/assets/logo-chhaya.png";

type Item = {
  title: string;
  sub: string;
  logo?: string;
  icon?: any;
};

const items: Item[] = [
  { logo: logoPrayag, title: "Prayag Sangeet Samiti", sub: "Allahabad" },
  { logo: logoPrachin, title: "Prachin Kala Kendra", sub: "Chandigarh" },
  { logo: logoChhaya, title: "Chhaya School of Art", sub: "CSA Affiliated" },
  { icon: ShieldCheck, title: "Government Recognized", sub: "Valid Degrees" },
  { icon: GraduationCap, title: "B.Ed / M.Ed Equivalent", sub: "Teaching Eligibility" },
];

const Recognition = () => {
  return (
    <section id="recognition" className="py-24 bg-secondary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Recognition & Affiliations</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Trust earned, recognition <span className="text-accent italic">deserved.</span>
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="group relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 text-center hover:bg-primary-foreground/10 hover:border-accent/40 transition-all hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {it.logo ? (
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-foreground grid place-items-center shadow-glow group-hover:scale-110 transition-transform overflow-hidden p-2">
                  <img
                    src={it.logo}
                    alt={`${it.title} logo`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold grid place-items-center shadow-glow group-hover:scale-110 transition-transform">
                  {it.icon && <it.icon className="w-8 h-8 text-secondary" />}
                </div>
              )}
              <h3 className="font-display font-bold text-lg mb-1">{it.title}</h3>
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider">{it.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recognition;
