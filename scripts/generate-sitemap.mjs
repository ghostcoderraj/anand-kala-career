#!/usr/bin/env node
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = (process.env.VITE_SITE_URL || "https://anand-sangeet.vercel.app").replace(/\/$/, "");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="hi" href="${siteUrl}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/" />
  </url>
</urlset>
`;

writeFileSync(resolve(__dirname, "../public/sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(resolve(__dirname, "../public/robots.txt"), robots);
console.log(`Sitemap & robots.txt generated for ${siteUrl}`);
