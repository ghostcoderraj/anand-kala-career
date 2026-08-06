import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Camera, Newspaper, ChevronDown, ZoomIn } from "lucide-react";
import NewspaperClippingCard, { NewspaperLightbox, type GalleryItem } from "@/components/site/NewspaperClippingCard";
import { campusPhotos as staticCampusPhotos } from "@/data/campusPhotos";
import { useResponsiveBatch } from "@/hooks/useResponsiveBatch";
import { useIsMobile } from "@/hooks/use-mobile";

const PHOTO_CATEGORIES = ["classes", "music", "dance", "art", "yoga", "awards", "events"] as const;
const TAB_CATEGORIES = ["all", "newspaper", ...PHOTO_CATEGORIES] as const;

function PhotoLightbox({
  item,
  open,
  onClose,
}: {
  item: GalleryItem | null;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-label={item.title}>
      <button type="button" className="absolute inset-0 bg-secondary/85 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-xl sm:rounded-2xl bg-background border shadow-2xl">
        <div className="sticky top-0 flex items-start justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 bg-secondary text-primary-foreground border-b">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-accent mb-1 capitalize">{item.category}</p>
            <h2 className="font-display font-bold text-base sm:text-lg leading-snug">{item.title}</h2>
            {item.description && <p className="text-xs sm:text-sm text-primary-foreground/80 mt-1">{item.description}</p>}
          </div>
          <button type="button" onClick={onClose} className="shrink-0 rounded-full bg-white/10 hover:bg-white/20 w-9 h-9 flex items-center justify-center text-xl leading-none" aria-label="Close">×</button>
        </div>
        <div className="p-3 sm:p-6 bg-muted/30">
          <img src={item.image_url} alt={item.title} className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] object-contain mx-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
}

function PhotoGrid({ items, onOpen }: { items: GalleryItem[]; onOpen: (item: GalleryItem) => void }) {
  if (!items.length) {
    return <p className="text-center text-muted-foreground py-8 sm:py-12">No photos in this category yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => onOpen(it)}
          className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-card aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <img
            src={it.image_url}
            alt={it.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/20 to-transparent opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-secondary/90 text-primary-foreground rounded-full p-2 shadow-lg">
              <ZoomIn className="w-5 h-5" />
            </span>
          </div>
          <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-primary-foreground font-display font-semibold text-[11px] sm:text-sm line-clamp-2 text-left leading-tight">
            {it.title}
          </div>
        </button>
      ))}
    </div>
  );
}

function LoadMoreButton({
  onClick,
  remaining,
  label = "Load More",
}: {
  onClick: () => void;
  remaining: number;
  label?: string;
}) {
  return (
    <div className="text-center mt-6 sm:mt-8 px-2">
      <Button variant="outline" size="lg" onClick={onClick} className="w-full sm:w-auto gap-2 min-h-11">
        <ChevronDown className="w-4 h-4" />
        {label} ({remaining} more)
      </Button>
    </div>
  );
}

function NewspaperGrid({ items, preview = false }: { items: GalleryItem[]; preview?: boolean }) {
  const batch = useResponsiveBatch(3, 8);
  const previewLimit = useResponsiveBatch(3, 6);
  const [visible, setVisible] = useState(preview ? previewLimit : batch);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setVisible(preview ? previewLimit : batch);
  }, [preview, previewLimit, batch, items.length]);

  const limit = preview ? previewLimit : visible;
  const shown = items.slice(0, preview ? limit : visible);
  const hasMore = !preview && visible < items.length;

  if (!items.length) {
    return (
      <p className="text-center text-muted-foreground py-8 sm:py-12">
        No newspaper features yet. Add clippings from the admin panel under Gallery → Newspaper category.
      </p>
    );
  }

  return (
    <>
      {!preview && (
        <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl bg-gradient-royal text-primary-foreground p-4 sm:p-6 md:p-8 shadow-royal">
          <div className="flex items-center gap-2 text-accent text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2">
            <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
            Media Coverage
          </div>
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold">Newspaper Publications</h3>
          <p className="text-primary-foreground/85 mt-2 max-w-xl text-xs sm:text-sm md:text-base">
            Featured in leading Hindi newspapers for music education, student achievements, and cultural events across Bihar.
          </p>
        </div>
      )}

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5">
        {shown.map((it) => (
          <NewspaperClippingCard key={it.id} item={it} onOpen={setLightboxItem} />
        ))}
      </div>

      {hasMore && (
        <LoadMoreButton
          label="Load More Clippings"
          remaining={items.length - visible}
          onClick={() => setVisible((v) => v + batch)}
        />
      )}

      <NewspaperLightbox item={lightboxItem} open={!!lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  );
}

function PaginatedPhotos({ items, tabKey }: { items: GalleryItem[]; tabKey: string }) {
  const batch = useResponsiveBatch(4, 8);
  const [visible, setVisible] = useState(batch);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setVisible(batch);
  }, [batch, tabKey, items.length]);

  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  return (
    <>
      <PhotoGrid items={shown} onOpen={setLightboxItem} />
      {hasMore && (
        <LoadMoreButton
          label="Load More Photos"
          remaining={items.length - visible}
          onClick={() => setVisible((v) => v + batch)}
        />
      )}
      {!hasMore && items.length > batch && (
        <p className="text-center text-xs text-muted-foreground mt-4">All photos loaded</p>
      )}
      <PhotoLightbox item={lightboxItem} open={!!lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  );
}

const DynamicGallery = () => {
  const [dbItems, setDbItems] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const isMobile = useIsMobile();

  useEffect(() => {
    supabase
      .from("gallery_items")
      .select("*")
      .order("display_order")
      .order("published_date", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data }) => setDbItems((data as GalleryItem[]) ?? []));
  }, []);

  const items = useMemo(() => {
    const staticIds = new Set(staticCampusPhotos.map((p) => p.id));
    const extra = dbItems.filter((i) => !staticIds.has(i.id));
    return [...staticCampusPhotos, ...extra];
  }, [dbItems]);

  const byCat = useMemo(() => {
    const map: Record<string, GalleryItem[]> = { all: items };
    for (const c of TAB_CATEGORIES) {
      if (c !== "all") map[c] = items.filter((i) => i.category === c);
    }
    return map;
  }, [items]);

  const photoItems = items.filter((i) => i.category !== "newspaper");
  const newspaperItems = byCat.newspaper ?? [];

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-24 bg-gradient-soft">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2 sm:mb-3">Gallery & Press</div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-secondary leading-tight">
            Campus moments & <span className="italic text-primary">media coverage.</span>
          </h2>
          <div className="gold-divider w-20 sm:w-24 mx-auto mt-3 sm:mt-4" />
          <p className="text-muted-foreground mt-3 sm:mt-4 text-xs sm:text-sm">
            Tap any photo to view full size
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0 scrollbar-none">
            <TabsList className="inline-flex h-auto w-max min-w-0 sm:flex sm:flex-wrap sm:w-full sm:justify-center bg-card mb-6 sm:mb-8 gap-1 p-1">
              {TAB_CATEGORIES.map((c) => {
                const label = c === "newspaper" ? "Newspaper" : c;
                return (
                  <TabsTrigger key={c} value={c} className="capitalize text-xs sm:text-sm px-3 sm:px-4 shrink-0">
                    {label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <TabsContent value="all">
            {photoItems.length > 0 && (
              <div className="mb-10 sm:mb-16">
                <div className="mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-card border shadow-card p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-secondary">Campus Moments</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Guru Purnima, award ceremonies, tree plantation & cultural events
                      </p>
                    </div>
                  </div>
                </div>
                <PaginatedPhotos items={photoItems} tabKey="all-photos" />
              </div>
            )}

            {newspaperItems.length > 0 && !isMobile && (
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-secondary mb-4 sm:mb-6 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-primary" />
                  Newspaper Coverage
                </h3>
                <NewspaperGrid items={newspaperItems} preview />
                {newspaperItems.length > 6 && (
                  <div className="text-center mt-4">
                    <Button variant="link" onClick={() => setActiveTab("newspaper")} className="text-primary">
                      View all newspaper clippings →
                    </Button>
                  </div>
                )}
              </div>
            )}

            {newspaperItems.length > 0 && isMobile && (
              <div className="text-center pt-2">
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("newspaper")}>
                  <Newspaper className="w-4 h-4 mr-2" />
                  View Newspaper Coverage
                </Button>
              </div>
            )}

            {!items.length && (
              <p className="text-center text-muted-foreground py-8 sm:py-12">Gallery items will appear here once added from the admin panel.</p>
            )}
          </TabsContent>

          <TabsContent value="newspaper">
            <NewspaperGrid items={newspaperItems} />
          </TabsContent>

          {PHOTO_CATEGORIES.map((c) => (
            <TabsContent key={c} value={c}>
              <PaginatedPhotos items={byCat[c] ?? []} tabKey={c} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default DynamicGallery;
