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
import FAQ from "@/components/site/FAQ";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingWhatsApp from "@/components/site/FloatingWhatsApp";
import BackgroundMusic from "@/components/site/BackgroundMusic";
import QualifiedStudents from "@/components/site/QualifiedStudents";
import Announcements from "@/components/site/Announcements";
import { StructuredData } from "@/components/seo/StructuredData";
import { useSEO } from "@/lib/seo";
import { HOME_SEO } from "@/lib/seo-config";
import { homePageGraph } from "@/lib/schema";
import { FAQ_ITEMS } from "@/data/faq";

const Index = () => {
  useSEO({
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    keywords: HOME_SEO.keywords,
    path: HOME_SEO.path,
  });

  return (
    <main className="min-h-screen bg-background">
      <StructuredData data={homePageGraph(FAQ_ITEMS)} />
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
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
