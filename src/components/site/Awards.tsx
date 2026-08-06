import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface Award {
  id: string;
  title: string;
  recipient: string | null;
  description: string | null;
  year: number | null;
  image_url: string | null;
}

const Awards = () => {
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    supabase.from("awards").select("*").order("display_order").then(({ data }) => setAwards(data ?? []));
  }, []);

  if (awards.length === 0) return null;

  return (
    <section id="awards" className="py-24 bg-gradient-soft">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Honors</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">
            Awards & <span className="italic text-primary">Achievements.</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((a) => (
            <Card key={a.id} className="overflow-hidden shadow-card hover:shadow-warm transition-shadow">
              {a.image_url ? (
                <div className="aspect-video bg-muted overflow-hidden">
                  <img src={a.image_url} alt={a.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-warm grid place-items-center">
                  <Trophy className="w-16 h-16 text-primary-foreground" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">Award</span>
                  {a.year && <span className="text-xs text-muted-foreground">{a.year}</span>}
                </div>
                <h3 className="font-display text-lg font-bold text-secondary">{a.title}</h3>
                {a.recipient && <div className="text-sm text-foreground/80 mt-1">— {a.recipient}</div>}
                {a.description && <p className="text-sm text-muted-foreground mt-2">{a.description}</p>}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
