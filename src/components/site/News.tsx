import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Newspaper, ChevronDown } from "lucide-react";
import NewspaperClippingCard, { NewspaperLightbox, type GalleryItem } from "@/components/site/NewspaperClippingCard";
import { newspaperArticles as staticArticles } from "@/data/newspaperArticles";
import { useResponsiveBatch } from "@/hooks/useResponsiveBatch";

function toGalleryItem(row: {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string;
  published_date: string;
}): GalleryItem | null {
  if (!row.cover_image_url) return null;
  return {
    id: row.id,
    title: row.title,
    category: "newspaper",
    image_url: row.cover_image_url,
    description: row.excerpt,
    newspaper_name: row.category === "magazine" ? "Magazine" : "News",
    published_date: row.published_date,
  };
}

const News = () => {
  const [dbArticles, setDbArticles] = useState<GalleryItem[]>([]);
  const batch = useResponsiveBatch(4, 8);
  const [visible, setVisible] = useState(batch);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    supabase
      .from("news_articles")
      .select("*")
      .eq("is_published", true)
      .order("published_date", { ascending: false })
      .then(({ data }) => {
        const mapped = (data ?? []).map(toGalleryItem).filter(Boolean) as GalleryItem[];
        setDbArticles(mapped);
      });
  }, []);

  useEffect(() => {
    setVisible(batch);
  }, [batch]);

  const articles = useMemo(() => {
    const staticIds = new Set(staticArticles.map((a) => a.id));
    const extra = dbArticles.filter((a) => !staticIds.has(a.id));
    return [...staticArticles, ...extra].sort((a, b) => {
      const da = a.published_date ? new Date(a.published_date).getTime() : 0;
      const db = b.published_date ? new Date(b.published_date).getTime() : 0;
      return db - da;
    });
  }, [dbArticles]);

  const shown = articles.slice(0, visible);
  const hasMore = visible < articles.length;

  return (
    <section id="news" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2 sm:mb-3">News & Magazines</div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-secondary leading-tight">
            Press coverage & <span className="italic text-primary">publications.</span>
          </h2>
          <div className="gold-divider w-20 sm:w-24 mx-auto mt-3 sm:mt-4" />
          <p className="text-muted-foreground mt-3 sm:mt-4 text-xs sm:text-sm">
            Tap any clipping to read full size
          </p>
        </div>

        <div className="mb-6 sm:mb-10 rounded-xl sm:rounded-2xl bg-gradient-royal text-primary-foreground p-4 sm:p-6 md:p-8 shadow-royal">
          <div className="flex items-center gap-2 text-accent text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2">
            <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
            Media Coverage
          </div>
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold">Newspaper Publications</h3>
          <p className="text-primary-foreground/85 mt-2 max-w-xl text-xs sm:text-sm md:text-base">
            Featured in Prabhat Khabar, Dainik Jagran, Hindustan, Dainik Bhaskar & more — covering music education, exams, Guru Purnima & student achievements in Haspura, Bihar.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 sm:py-12">News and magazine articles will appear here soon.</p>
        ) : (
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5">
              {shown.map((article) => (
                <NewspaperClippingCard key={article.id} item={article} onOpen={setLightboxItem} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-6 sm:mt-10 px-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisible((v) => v + batch)}
                  className="w-full sm:w-auto gap-2 min-h-11"
                >
                  <ChevronDown className="w-4 h-4" />
                  Load More ({articles.length - visible} remaining)
                </Button>
              </div>
            )}
          </>
        )}

        <NewspaperLightbox item={lightboxItem} open={!!lightboxItem} onClose={() => setLightboxItem(null)} />
      </div>
    </section>
  );
};

export default News;
