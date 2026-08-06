import { useEffect } from "react";
import {
  SITE_NAME,
  SITE_NAME_EN,
  getSiteUrl,
  HOME_SEO,
  ALL_KEYWORDS,
} from "@/lib/seo-config";

export const DEFAULT_TITLE = HOME_SEO.title;
export const DEFAULT_DESCRIPTION = HOME_SEO.description;

export type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  ogImage?: string;
  ogImageAlt?: string;
};

function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = ALL_KEYWORDS,
  path = "/",
  noIndex = false,
  type = "website",
  ogImage,
  ogImageAlt = `${SITE_NAME_EN} — Music College in Bihar`,
}: SEOProps = {}) {
  const siteUrl = getSiteUrl();
  const pageTitle = title ?? DEFAULT_TITLE;
  const canonical = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const image = ogImage ?? `${siteUrl}/logo.png`;

  useEffect(() => {
    document.title = pageTitle;

    upsertMeta("description", description);
    upsertMeta("keywords", keywords);
    upsertMeta("author", SITE_NAME_EN);
    upsertMeta("robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    upsertMeta("googlebot", noIndex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", canonical);

    upsertMeta("og:title", pageTitle, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:type", type, "property");
    upsertMeta("og:url", canonical, "property");
    upsertMeta("og:image", image, "property");
    upsertMeta("og:image:alt", ogImageAlt, "property");
    upsertMeta("og:site_name", SITE_NAME, "property");
    upsertMeta("og:locale", "hi_IN", "property");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", pageTitle);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", image);
    upsertMeta("twitter:image:alt", ogImageAlt);
  }, [pageTitle, description, keywords, canonical, image, ogImageAlt, noIndex, type]);
}

export { SITE_NAME, SITE_NAME_EN };
