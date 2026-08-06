import { Music, Palette, Sparkles } from "lucide-react";
import music from "@/assets/music.jpg";
import dance from "@/assets/dance.jpg";
import art from "@/assets/art.jpg";
import yoga from "@/assets/yoga.jpg";

const courses = [
  { title: "Music", hindi: "संगीत", img: music, desc: "Vocal, Tabla, Harmonium, Sitar — classical foundation with modern stage exposure." },
  { title: "Dance", hindi: "नृत्य", img: dance, desc: "Kathak, Bharatanatyam & folk forms taught with rhythm, expression and discipline." },
  { title: "Fine Arts", hindi: "चित्रकला", img: art, desc: "Drawing, painting, sketching and creative composition for modern artists." },
  { title: "Yoga", hindi: "योग", img: yoga, desc: "Asana, pranayama and philosophy — for wellness, teaching and government roles." },
];

const programs = [
  { code: "B.A.", title: "Bachelor of Arts", years: "3 Year Program", desc: "Foundation degree in your chosen art with academic depth." },
  { code: "M.A.", title: "Master of Arts", years: "2 Year Program", desc: "Advanced specialization opening doors to teaching & research." },
];

const Courses = () => {
  return (
    <section id="courses" className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Our Courses</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">
            Disciplines we teach with devotion
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {courses.map((c, i) => (
            <article
              key={c.title}
              className="group relative rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                <div className="font-hindi text-3xl text-accent mb-1">{c.hindi}</div>
                <h3 className="font-display text-2xl font-bold mb-2">{c.title}</h3>
                <p className="text-sm text-primary-foreground/80 leading-relaxed opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-32 transition-all duration-500">
                  {c.desc}
                </p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent/90 grid place-items-center backdrop-blur-sm">
                {c.title === "Music" && <Music className="w-5 h-5 text-accent-foreground" />}
                {c.title === "Dance" && <Sparkles className="w-5 h-5 text-accent-foreground" />}
                {c.title === "Fine Arts" && <Palette className="w-5 h-5 text-accent-foreground" />}
                {c.title === "Yoga" && <Sparkles className="w-5 h-5 text-accent-foreground" />}
              </div>
            </article>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div key={p.code} className="relative rounded-2xl bg-gradient-royal p-8 md:p-10 text-primary-foreground overflow-hidden group hover:shadow-royal transition-shadow">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-accent/10 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="font-display text-6xl font-bold text-accent mb-2">{p.code}</div>
                <h3 className="font-display text-2xl font-bold mb-1">{p.title}</h3>
                <div className="text-accent text-sm uppercase tracking-widest mb-4">{p.years}</div>
                <p className="text-primary-foreground/80 max-w-md">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
