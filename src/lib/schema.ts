import {
  CONTACT,
  COURSES_SCHEMA,
  FACULTY_SCHEMA,
  OPENING_HOURS,
  SITE_NAME,
  SITE_NAME_EN,
  SOCIAL,
  getSiteUrl,
} from "@/lib/seo-config";
import type { FAQItem } from "@/data/faq";

export function organizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    email: CONTACT.email,
    telephone: CONTACT.phones,
    sameAs: [SOCIAL.facebook, SOCIAL.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.streetAddress,
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      postalCode: CONTACT.postalCode,
      addressCountry: CONTACT.addressCountry,
    },
  };
}

export function educationalOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "College"],
    "@id": `${siteUrl}/#college`,
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Government recognized music college offering degrees in Music, Dance, Fine Arts and Yoga in Haspura, Aurangabad, Bihar, India.",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.streetAddress,
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      postalCode: CONTACT.postalCode,
      addressCountry: CONTACT.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.geo.latitude,
      longitude: CONTACT.geo.longitude,
    },
    telephone: CONTACT.phones,
    email: CONTACT.email,
    areaServed: { "@type": "State", name: "Bihar" },
    knowsAbout: [
      "Indian Classical Music",
      "Vocal Music",
      "Tabla",
      "Harmonium",
      "Dance",
      "Fine Arts",
      "Yoga",
    ],
  };
}

export function localBusinessSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: SITE_NAME_EN,
    image: `${siteUrl}/logo.png`,
    url: siteUrl,
    telephone: CONTACT.phones[0],
    email: CONTACT.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.streetAddress,
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      postalCode: CONTACT.postalCode,
      addressCountry: CONTACT.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.geo.latitude,
      longitude: CONTACT.geo.longitude,
    },
    openingHoursSpecification: OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    hasMap: CONTACT.mapsUrl,
    sameAs: [SOCIAL.facebook, SOCIAL.instagram],
  };
}

export function websiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE_NAME_EN,
    alternateName: SITE_NAME,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: ["hi", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function courseSchemas() {
  const siteUrl = getSiteUrl();
  return COURSES_SCHEMA.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: { "@id": `${siteUrl}/#college` },
    educationalLevel: course.category === "Degree" ? "Degree" : "Certificate",
    inLanguage: "hi",
    availableLanguage: ["Hindi", "English"],
    teaches: course.category,
  }));
}

export function personSchemas() {
  const siteUrl = getSiteUrl();
  return FACULTY_SCHEMA.map((person) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    worksFor: { "@id": `${siteUrl}/#college` },
  }));
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function reviewSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@id": `${siteUrl}/#college` },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    author: { "@type": "Person", name: "रामानुज कुमार" },
    reviewBody:
      "यहाँ के शिक्षकों ने मुझे सही दिशा और प्रेरणा दी। आज मैं बिहार में सरकारी शिक्षक के रूप में अपनी सेवाएँ दे रहा हूँ।",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function homePageGraph(faqs: FAQItem[]) {
  const nodes = [
    organizationSchema(),
    educationalOrganizationSchema(),
    localBusinessSchema(),
    websiteSchema(),
    ...courseSchemas(),
    ...personSchemas(),
    faqSchema(faqs),
    reviewSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }]),
  ].map(({ "@context": _, ...rest }) => rest);

  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
