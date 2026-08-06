#!/usr/bin/env node
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = (process.env.VITE_SITE_URL || "https://anand-kala-career-main.vercel.app").replace(/\/$/, "");

const today = new Date().toISOString().split("T")[0];

const routes = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    <xhtml:link rel="alternate" hreflang="hi" href="${siteUrl}${r.loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${r.loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${r.loc}" />
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(__dirname, "../public/sitemap.xml"), sitemap);

const robots = `# Anand Sangeet Mahavidyalaya — robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth
Crawl-delay: 1

Sitemap: ${siteUrl}/sitemap.xml
Host: ${new URL(siteUrl).host}
`;

writeFileSync(resolve(__dirname, "../public/robots.txt"), robots);
console.log(`Sitemap & robots.txt generated for ${siteUrl}`);
