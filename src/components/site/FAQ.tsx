import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { FAQ_ITEMS } from "@/data/faq";

const FAQ = () => {
  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24 bg-muted/40" aria-labelledby="faq-heading">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2 sm:mb-3 flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            Frequently Asked Questions
          </div>
          <h2 id="faq-heading" className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-secondary leading-tight">
            Music education <span className="italic text-primary">questions answered.</span>
          </h2>
          <div className="gold-divider w-20 sm:w-24 mx-auto mt-3 sm:mt-4" />
          <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base">
            Common questions about admissions, courses, careers and campus life at Anand Sangeet Mahavidyalaya, Bihar.
          </p>
        </div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index}`}
              className="bg-card border border-border rounded-xl px-4 sm:px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left font-display font-semibold text-secondary hover:no-underline py-4 sm:py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4 sm:pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
