import music from "@/assets/music.jpg";
import dance from "@/assets/dance.jpg";
import art from "@/assets/art.jpg";
import yoga from "@/assets/yoga.jpg";
import award from "@/assets/award.jpg";
import classroom from "@/assets/classroom.jpg";

const items = [
  { src: music, label: "Music Classes", span: "md:col-span-2 md:row-span-2" },
  { src: dance, label: "Dance Performance" },
  { src: art, label: "Painting Studio" },
  { src: yoga, label: "Yoga Sessions", span: "md:col-span-2" },
  { src: award, label: "Award Ceremony" },
  { src: classroom, label: "Classroom" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-gradient-soft">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Gallery</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">
            Moments from our <span className="italic text-primary">campus.</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {items.map((it, i) => (
            <div key={i} className={`group relative rounded-2xl overflow-hidden shadow-card ${it.span ?? ""}`}>
              <img
                src={it.src}
                alt={it.label}
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-primary-foreground font-display font-semibold text-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {it.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
