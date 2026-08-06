import { Briefcase, Train, School, Shield, Building, MapPin, FileCheck } from "lucide-react";

const careers = [
  { icon: School, title: "Government School Teacher", color: "from-primary to-primary-glow", href: "https://www.mysarkarinaukri.com/find/music-teacher-jobs" },
  { icon: Building, title: "Kendriya Vidyalaya", color: "from-secondary to-secondary", href: "https://testbook.com/kvs-prt/music" },
  { icon: Train, title: "Railway Jobs", color: "from-accent to-primary", href: "https://www.railwayrecruitment.co.in/02-vocal-light-classical-keyboard-instrumental-music-post-vacancy-north-central-railway/" },
  { icon: Shield, title: "Delhi Teacher Jobs", color: "from-secondary to-primary", href: "https://testbook.com/dsssb/music-teacher" },
  { icon: MapPin, title: "Jharkhand Teacher Jobs", color: "from-primary to-accent", href: "https://in.indeed.com/q-school-teacher-l-jharkhand-jobs.html?vjk=44f6a89064c6f7b3" },
  { icon: MapPin, title: "Uttar Pradesh Teacher Jobs", color: "from-secondary to-accent", href: "https://in.indeed.com/q-school-music-teacher-l-uttar-pradesh-jobs.html?vjk=bf11bc93be6874bc" },
  { icon: FileCheck, title: "Music related Jobs", color: "from-accent to-secondary", href: "https://in.indeed.com/jobs?q=school+music+teacher&l=&from=searchOnDesktopSerp&vjk=6591bbbdb061ea96" },
  { icon: Briefcase, title: "Private Academies & Studios", color: "from-primary-glow to-primary", href: "https://in.indeed.com/jobs?q=school+music+teacher&l=&from=searchOnDesktopSerp&vjk=6591bbbdb061ea96" },
] as { icon: any; title: string; color: string; href?: string }[];

const Careers = () => {
  return (
    <section id="careers" className="py-24 bg-gradient-soft">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Career Opportunities</div>
          <h2 className="font-hindi text-4xl md:text-6xl font-bold text-secondary leading-tight mb-4">
            यहाँ कला केवल शौक नहीं,<br />
            <span className="bg-gradient-warm bg-clip-text text-transparent">भविष्य है।</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Our recognized degrees open real doors — government, semi-government and beyond.
          </p>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {careers.map((c, i) => {
            const Wrapper: any = c.href ? "a" : "div";
            const wrapperProps = c.href
              ? { href: c.href, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Wrapper
                key={c.title}
                {...wrapperProps}
                className="group relative rounded-2xl bg-card p-6 shadow-card hover:shadow-warm transition-all hover:-translate-y-2 overflow-hidden block cursor-pointer"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.color}`} />
                <div className="w-14 h-14 rounded-xl bg-gradient-warm grid place-items-center mb-4 shadow-warm group-hover:rotate-6 transition-transform">
                  <c.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg text-secondary leading-snug">{c.title}</h3>
                <div className="mt-3 text-xs text-primary font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  {c.href ? "View Jobs →" : "Eligible →"}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Careers;
