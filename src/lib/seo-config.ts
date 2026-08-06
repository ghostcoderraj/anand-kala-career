export const SITE_NAME = "आनंद संगीत महाविद्यालय";
export const SITE_NAME_EN = "Anand Sangeet Mahavidyalaya";
export const SITE_TAGLINE = "Best Music College in Bihar";

export const DEFAULT_SITE_URL = "https://anand-kala-career-main.vercel.app";

export const CONTACT = {
  streetAddress: "Haspura I.T.I., Itwan Road",
  addressLocality: "Haspura",
  addressRegion: "Bihar",
  postalCode: "824120",
  addressCountry: "IN",
  fullAddress: "Haspura I.T.I., Itwan Road, Haspura, Aurangabad, Bihar 824120, India",
  phones: ["+91-9472626355", "+91-9153267412"],
  email: "anandsangitmahavidyalaya@gmail.com",
  geo: { latitude: 24.789, longitude: 84.372 },
  mapsEmbed:
    "https://www.google.com/maps?q=Haspura+ITI+Itwa+Road+Haspura&output=embed",
  mapsUrl: "https://maps.google.com/?q=Haspura+ITI+Itwa+Road+Haspura+Aurangabad+Bihar",
} as const;

export const OPENING_HOURS = [
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "17:00" },
] as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/share/1RqQbKQrYk/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/anandsangitmahavidyalay?igsh=MXBhMW9vaXd0Y2ZjdA==",
} as const;

export const KEYWORDS = {
  primary: [
    "Anand Sangeet Mahavidyalaya",
    "Music College Bihar",
    "Music Institute Bihar",
  ],
  secondary: [
    "Music Classes",
    "Vocal Training",
    "Tabla Classes",
    "Harmonium Classes",
    "Dance Classes",
    "Fine Arts",
    "Performing Arts",
    "Classical Music",
    "Singing Classes",
    "Bihar Music College",
  ],
  longTail: [
    "Best Music College in Bihar",
    "Music Institute Near Me",
    "Learn Classical Music in Bihar",
    "Government Recognized Music College Bihar",
    "Music Degree College Bihar",
    "Dance and Music Institute Bihar",
    "Vocal Music Classes Bihar",
    "Instrumental Music Training",
    "Classical Music College Bihar",
    "Dance Academy Bihar",
    "Fine Arts College Bihar",
    "Government Recognized Music College",
  ],
} as const;

export const ALL_KEYWORDS = [...KEYWORDS.primary, ...KEYWORDS.secondary, ...KEYWORDS.longTail].join(", ");

export const HOME_SEO = {
  title: "Anand Sangeet Mahavidyalaya | Best Music College in Bihar — Vocal, Dance & Fine Arts",
  description:
    "Anand Sangeet Mahavidyalaya — government recognized music college in Haspura, Aurangabad, Bihar. Vocal music, tabla, harmonium, sitar, dance, fine arts & yoga. Admissions Open 2026. Call +91 94726 26355.",
  keywords: ALL_KEYWORDS,
  path: "/",
} as const;

export type PageSEOConfig = {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  noIndex?: boolean;
  type?: "website" | "article";
  section?: string;
};

export const PAGE_SEO: Record<string, PageSEOConfig> = {
  home: HOME_SEO,
  auth: {
    title: "Admin Login",
    description: "Secure admin login for Anand Sangeet Mahavidyalaya content management.",
    path: "/auth",
    noIndex: true,
  },
  admin: {
    title: "Admin Dashboard",
    description: "Content management dashboard for Anand Sangeet Mahavidyalaya.",
    path: "/admin",
    noIndex: true,
  },
  notFound: {
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
    path: "/404",
    noIndex: true,
  },
};

export const COURSES_SCHEMA = [
  {
    name: "Vocal Music (Classical Singing)",
    description: "Indian classical vocal training including ragas, taal and stage performance.",
    category: "Music",
  },
  {
    name: "Instrumental Music — Tabla & Harmonium",
    description: "Tabla, harmonium and sitar training with traditional gurukul methodology.",
    category: "Music",
  },
  {
    name: "Dance — Kathak & Bharatanatyam",
    description: "Classical and folk dance forms with rhythm, expression and discipline.",
    category: "Dance",
  },
  {
    name: "Fine Arts & Painting",
    description: "Drawing, painting, sketching and creative composition programs.",
    category: "Fine Arts",
  },
  {
    name: "Yoga & Wellness",
    description: "Asana, pranayama and yoga philosophy for teaching and government roles.",
    category: "Yoga",
  },
  {
    name: "B.A. in Performing Arts",
    description: "Three-year government recognized Bachelor of Arts degree program.",
    category: "Degree",
  },
  {
    name: "M.A. in Performing Arts",
    description: "Two-year Master of Arts specialization for teaching and research careers.",
    category: "Degree",
  },
] as const;

export const FACULTY_SCHEMA = [
  { name: "अरविंद कुमार वर्मा", jobTitle: "Director", description: "Director of Anand Sangeet Mahavidyalaya" },
  { name: "अशोक कुमार", jobTitle: "Principal", description: "Principal of Anand Sangeet Mahavidyalaya" },
  { name: "बिपिन कुमार", jobTitle: "Administrator", description: "Administrator of Anand Sangeet Mahavidyalaya" },
] as const;

export function getSiteUrl(): string {
  if (typeof window !== "undefined") {
    return (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");
  }
  return (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
}
