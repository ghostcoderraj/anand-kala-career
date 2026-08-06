import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Person {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  qualifications: string | null;
  photo_url: string | null;
}

const Leadership = () => {
  const [leaders, setLeaders] = useState<Person[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("leadership").select("*").order("display_order").then(({ data }) => setLeaders(data ?? []));
    supabase.from("faculty").select("*").order("display_order").then(({ data }) => setFaculty(data ?? []));
  }, []);

  return (
    <section id="leadership" className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Administration</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">
            Our <span className="italic text-primary">Leadership.</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-4" />
          <p className="mt-4 text-muted-foreground">
            Meet the dedicated team guiding आनंद संगीत महाविद्यालय toward cultural excellence.
          </p>
        </div>

        {leaders.length === 0 ? (
          <p className="text-center text-muted-foreground">Leadership profiles will appear here soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {leaders.map((p) => (
              <Card key={p.id} className="p-6 text-center shadow-card hover:shadow-warm transition-shadow">
                <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-primary/20">
                  <AvatarImage src={p.photo_url ?? ""} alt={p.name} className="object-cover" />
                  <AvatarFallback className="text-2xl bg-gradient-warm text-primary-foreground">
                    {p.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-display text-xl font-bold text-secondary">{p.name}</h3>
                <div className="text-primary font-semibold text-sm mt-1">{p.role}</div>
                {p.qualifications && <div className="text-xs text-muted-foreground mt-1">{p.qualifications}</div>}
                {p.bio && <p className="text-sm text-foreground/80 mt-3">{p.bio}</p>}
              </Card>
            ))}
          </div>
        )}

        {faculty.length > 0 && (
          <>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-secondary text-center mb-8">
              Our <span className="italic text-primary">Faculty</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {faculty.map((f) => (
                <Card key={f.id} className="p-4 text-center shadow-card">
                  <Avatar className="w-20 h-20 mx-auto mb-3 ring-2 ring-accent/30">
                    <AvatarImage src={f.photo_url ?? ""} alt={f.name} className="object-cover" />
                    <AvatarFallback className="bg-muted">{f.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-display font-semibold text-secondary text-sm">{f.name}</div>
                  <div className="text-xs text-primary mt-1">{f.subject}</div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Leadership;
