import { useState } from "react";
import { Quote, Star, ChevronDown } from "lucide-react";
import { useResponsiveBatch } from "@/hooks/useResponsiveBatch";

const testimonials = [
  {
    name: "कविता कुमारी",
    role: "सरकारी हाई स्कूल शिक्षिका",
    text: "इस महाविद्यालय ने मेरे सपनों को नई उड़ान दी। यहाँ के शिक्षकों के मार्गदर्शन और गुणवत्तापूर्ण शिक्षा की बदौलत आज मैं सरकारी हाई स्कूल शिक्षिका हूँ।",
  },
  {
    name: "आशीष कुमार",
    role: "+2 सरकारी शिक्षक, बिहार",
    text: "इस संस्थान ने मुझे केवल पढ़ाई ही नहीं, बल्कि आत्मविश्वास और सही मार्गदर्शन भी दिया। यहाँ की शिक्षा और शिक्षकों का सहयोग मेरे सफलता के सफर में सबसे बड़ी ताकत बना। आज मैं बिहार में +2 सरकारी शिक्षक के रूप में अपनी सेवाएँ दे रहा हूँ।",
  },
  {
    name: "राहुल कुमार",
    role: "सरकारी शिक्षक, बिहार",
    text: "इस महाविद्यालय ने मेरे सपनों को नई दिशा दी। यहाँ के शिक्षकों के मार्गदर्शन और गुणवत्तापूर्ण शिक्षा की बदौलत आज मैं बिहार में सरकारी शिक्षक हूँ।",
  },
  {
    name: "हिमांशु कुमार",
    role: "सरकारी शिक्षक, बिहार",
    text: "यहाँ मिली शिक्षा और अनुभवी शिक्षकों का सहयोग मेरी सफलता की सबसे बड़ी ताकत बना। आज मैं बिहार में सरकारी शिक्षक के रूप में कार्यरत हूँ।",
  },
  {
    name: "प्रियम कुमारी",
    role: "सरकारी शिक्षिका, बिहार",
    text: "इस महाविद्यालय ने मुझे आत्मविश्वास और सही मार्गदर्शन दिया। आज मैं बिहार में सरकारी शिक्षिका बनकर अपने सपने को साकार कर रही हूँ।",
  },
  {
    name: "राजकुमार",
    role: "सरकारी शिक्षक, बिहार",
    text: "यहाँ का अनुशासित वातावरण और उत्कृष्ट शिक्षा मेरे उज्ज्वल भविष्य की नींव बने। आज मैं बिहार में सरकारी शिक्षक हूँ।",
  },
  {
    name: "श्वेता कुमारी",
    role: "सरकारी शिक्षिका, बिहार",
    text: "इस महाविद्यालय की शिक्षा और शिक्षकों की प्रेरणा ने मुझे सफलता तक पहुँचाया। आज मैं बिहार में सरकारी शिक्षिका के रूप में अपनी सेवाएँ दे रही हूँ।",
  },
  {
    name: "संतोषी कुमारी",
    role: "सरकारी शिक्षिका, बिहार",
    text: "यहाँ मिली शिक्षा ने मुझे अपने लक्ष्य को प्राप्त करने का आत्मविश्वास दिया। आज मैं बिहार में सरकारी शिक्षिका होने पर गर्व महसूस करती हूँ।",
  },
  {
    name: "रजनीश कुमार",
    role: "सरकारी शिक्षक, बिहार",
    text: "इस महाविद्यालय का मार्गदर्शन और सकारात्मक वातावरण मेरी सफलता का आधार बना। आज मैं बिहार में सरकारी शिक्षक के रूप में कार्यरत हूँ।",
  },
  {
    name: "रामानुज कुमार",
    role: "सरकारी शिक्षक, बिहार",
    text: "यहाँ के शिक्षकों ने मुझे सही दिशा और प्रेरणा दी। उसी का परिणाम है कि आज मैं बिहार में सरकारी शिक्षक के रूप में अपनी सेवाएँ दे रहा हूँ।",
  },
  {
    name: "अताउल्लाह अंसारी",
    role: "सरकारी शिक्षक, बिहार",
    text: "इस महाविद्यालय में मिली गुणवत्तापूर्ण शिक्षा और निरंतर मार्गदर्शन ने मेरे सपनों को साकार किया। आज मैं बिहार में सरकारी शिक्षक हूँ।",
  },
];

const Testimonials = () => {
  const batch = useResponsiveBatch(3, 6);
  const [visible, setVisible] = useState(batch);
  const shown = testimonials.slice(0, visible);
  const hasMore = visible < testimonials.length;

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-secondary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pattern-dots" />
      <div className="container relative px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <div className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-widest mb-2 sm:mb-3">Student Voices</div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Stories that inspire <span className="text-accent italic">generations.</span>
          </h2>
          <div className="gold-divider w-20 sm:w-24 mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {shown.map((t) => (
            <article key={t.name} className="relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl sm:rounded-2xl p-5 sm:p-8 hover:border-accent/40 transition-all">
              <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 text-accent/30" />
              <div className="flex gap-1 mb-3 sm:mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-primary-foreground/90 leading-relaxed mb-4 sm:mb-6 italic pr-6">"{t.text}"</p>
              <div className="pt-3 sm:pt-4 border-t border-primary-foreground/10">
                <div className="font-display font-bold text-accent text-sm sm:text-base">{t.name}</div>
                <div className="text-[10px] sm:text-xs text-primary-foreground/60 uppercase tracking-wider mt-0.5">{t.role}</div>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-6 sm:mt-10 px-2">
            <button
              type="button"
              onClick={() => setVisible((v) => v + batch)}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-11 px-8 rounded-md text-sm font-medium border border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground transition-colors hover:bg-primary-foreground/15 hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronDown className="w-4 h-4" />
              Load More Testimonials ({testimonials.length - visible} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
