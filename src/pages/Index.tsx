import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Courses from "@/components/site/Courses";
import Recognition from "@/components/site/Recognition";

import DirectorMessage from "@/components/site/DirectorMessage";
import Careers from "@/components/site/Careers";
import WhyUs from "@/components/site/WhyUs";
import DynamicGallery from "@/components/site/DynamicGallery";
import Awards from "@/components/site/Awards";
import News from "@/components/site/News";
import Testimonials from "@/components/site/Testimonials";
import Admission from "@/components/site/Admission";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingWhatsApp from "@/components/site/FloatingWhatsApp";
import BackgroundMusic from "@/components/site/BackgroundMusic";
import QualifiedStudents from "@/components/site/QualifiedStudents";
import Announcements from "@/components/site/Announcements";
import { useSEO } from "@/lib/seo";

const Index = () => {
  useSEO({ path: "/" });

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "आनंद संगीत महाविद्यालय",
            alternateName: "Anand Sangeet Mahavidyalaya",
            url: import.meta.env.VITE_SITE_URL || "https://anand-sangeet.vercel.app",
            logo: `${import.meta.env.VITE_SITE_URL || "https://anand-sangeet.vercel.app"}/logo.png`,
            description: "Government recognized degrees in Music, Dance, Fine Arts & Yoga in Haspura, Bihar.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Haspura I.T.I., Itwa Road",
              addressLocality: "Haspura",
              addressRegion: "Bihar",
              addressCountry: "IN",
            },
            telephone: ["+91-9472626355", "+91-9153267412"],
            areaServed: "Bihar, India",
            knowsAbout: ["Indian Classical Music", "Dance", "Fine Arts", "Yoga"],
          }),
        }}
      />
      <BackgroundMusic />
      <Navbar />
      <Hero />
      <Announcements />
      <About />
      <Courses />
      <Recognition />
      <DirectorMessage />
      <QualifiedStudents />
      <Careers />
      <WhyUs />
      <DynamicGallery />
      <Awards />
      <News />
      <Testimonials />
      <Admission />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
