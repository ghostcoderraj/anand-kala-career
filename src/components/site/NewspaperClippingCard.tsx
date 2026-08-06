import { Calendar, Newspaper, ZoomIn } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description?: string | null;
  newspaper_name?: string | null;
  published_date?: string | null;
}

type Props = {
  item: GalleryItem;
  onOpen: (item: GalleryItem) => void;
};

const formatDate = (date?: string | null) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

export default function NewspaperClippingCard({ item, onOpen }: Props) {
  const dateLabel = formatDate(item.published_date);

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group w-full text-left break-inside-avoid mb-4 sm:mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl sm:rounded-2xl"
    >
      <article className="relative bg-[#f8f4ec] border border-[#e8dfd0] rounded-2xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-warm hover:-translate-y-1">
        {/* Newspaper header strip */}
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-secondary text-primary-foreground border-b border-secondary/20">
          <div className="flex items-center gap-2 min-w-0">
            <Newspaper className="w-4 h-4 shrink-0 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider truncate">
              {item.newspaper_name || "Press Coverage"}
            </span>
          </div>
          {dateLabel && (
            <span className="text-[10px] shrink-0 flex items-center gap-1 opacity-90">
              <Calendar className="w-3 h-3" />
              {dateLabel}
            </span>
          )}
        </div>

        {/* Clipping image — full portrait visible, never cropped */}
        <div className="relative bg-[#ede8df] p-3 sm:p-4">
          <div className="relative mx-auto max-w-full rounded-lg overflow-hidden shadow-md ring-1 ring-black/5 bg-white">
            <img
              src={item.image_url}
              alt={item.title}
              loading="lazy"
              className="w-full h-auto object-contain max-h-[260px] sm:max-h-[360px] md:max-h-[420px] mx-auto block"
            />
            <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/90 text-primary-foreground rounded-full p-2.5 shadow-lg">
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>

        {/* Headline & excerpt */}
        <div className="px-4 pb-4 pt-1 space-y-2">
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">Newspaper Feature</Badge>
          <h3 className="font-display font-bold text-secondary text-sm leading-snug line-clamp-3 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
          )}
        </div>
      </article>
    </button>
  );
}

export function NewspaperLightbox({
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

  const dateLabel = formatDate(item.published_date);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button type="button" className="absolute inset-0 bg-secondary/80 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#f8f4ec] border border-[#e8dfd0] shadow-2xl">
        <div className="sticky top-0 flex items-start justify-between gap-4 px-5 py-4 bg-secondary text-primary-foreground border-b border-white/10">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent mb-1">
              <Newspaper className="w-4 h-4" />
              {item.newspaper_name || "Newspaper Coverage"}
              {dateLabel && <span className="opacity-80">· {dateLabel}</span>}
            </div>
            <h2 className="font-display font-bold text-lg leading-snug">{item.title}</h2>
            {item.description && <p className="text-sm text-primary-foreground/80 mt-1">{item.description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full bg-white/10 hover:bg-white/20 w-9 h-9 flex items-center justify-center text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-5 sm:p-8 bg-[#ede8df]">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-auto max-h-[75vh] object-contain mx-auto rounded-lg shadow-xl ring-1 ring-black/10 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
