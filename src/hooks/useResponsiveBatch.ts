import { useIsMobile } from "./use-mobile";

/** Responsive batch size for gallery/news pagination (smaller on mobile = shorter pages). */
export function useResponsiveBatch(mobile = 4, desktop = 8) {
  const isMobile = useIsMobile();
  return isMobile ? mobile : desktop;
}
