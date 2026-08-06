import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, ArrowUpRight, AlertCircle } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string | null;
  link_url: string | null;
  is_important: boolean;
  created_at: string;
}

const Announcements = () => {
  const [items, setItems] = useState<Announcement[]>([]);

  useEffect(() => {
    supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("is_important", { ascending: false })
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems((data as Announcement[]) ?? []));
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="announcements" className="py-16 bg-gradient-soft">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            <Megaphone className="w-4 h-4" /> Notice Board
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">
            Announcements
          </h2>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {items.map((a) => {
            const Wrapper: any = a.link_url ? "a" : "div";
            const wProps = a.link_url
              ? { href: a.link_url, target: "_blank", rel: "noreferrer" }
              : {};
            return (
              <Wrapper key={a.id} {...wProps} className="block group">
                <Card
                  className={`p-5 h-full shadow-card hover:shadow-warm transition-all duration-300 group-hover:-translate-y-1 border-l-4 ${
                    a.is_important ? "border-l-destructive" : "border-l-primary"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {a.is_important && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertCircle className="w-3 h-3" /> Important
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(a.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {a.link_url && (
                      <ArrowUpRight className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg text-secondary group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  {a.message && (
                    <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                      {a.message}
                    </p>
                  )}
                </Card>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
