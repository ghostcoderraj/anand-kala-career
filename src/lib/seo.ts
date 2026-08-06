import { useEffect } from "react";

const SITE_NAME = "आनंद संगीत महाविद्यालय";
const DEFAULT_TITLE = "आनंद संगीत महाविद्यालय | Music, Dance, Fine Arts & Yoga College";
const DEFAULT_DESCRIPTION =
  "Government recognized degrees in Music, Dance, Fine Arts & Yoga. Career opportunities in teaching, KV, Railway & Armed Forces. Admission Open 2026 — Haspura, Bihar.";

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
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
  path = "/",
  noIndex = false,
  type = "website",
}: SEOProps = {}) {
  const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonical = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImage = `${siteUrl}/logo.png`;

  useEffect(() => {
    document.title = pageTitle;

    upsertMeta("description", description);
    upsertMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", canonical);

    upsertMeta("og:title", pageTitle, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:type", type, "property");
    upsertMeta("og:url", canonical, "property");
    upsertMeta("og:image", ogImage, "property");
    upsertMeta("og:site_name", SITE_NAME, "property");
    upsertMeta("og:locale", "hi_IN", "property");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", pageTitle);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", ogImage);
  }, [pageTitle, description, canonical, ogImage, noIndex, type]);
}

export { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME };
