import { Wallet, BadgeCheck, Briefcase, Users, Star, Wrench, Sprout } from "lucide-react";

const reasons = [
  { icon: Wallet, title: "Affordable Education", desc: "Quality learning that doesn't burden families." },
  { icon: BadgeCheck, title: "Recognized Degrees", desc: "Government and university acknowledged certificates." },
  { icon: Briefcase, title: "Career Support", desc: "Guidance for teaching, government & semi-government jobs." },
  { icon: Users, title: "Expert Teachers", desc: "Years of stage and academic experience." },
  { icon: Star, title: "Cultural Excellence", desc: "Rooted in Indian classical heritage." },
  { icon: Wrench, title: "Skill Development", desc: "Practical training, real performance opportunities." },
  { icon: Sprout, title: "Rural Talent Empowerment", desc: "Bringing world-class arts to small towns." },
];

const WhyUs = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Why Choose Us</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">
            Seven reasons families <span className="italic text-primary">trust us.</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="group flex gap-4 p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-card transition-all">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-gold grid place-items-center shadow-glow group-hover:scale-110 transition-transform">
                <r.icon className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-secondary mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
