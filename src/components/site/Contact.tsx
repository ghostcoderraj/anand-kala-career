import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Visit · Call · Connect</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">
            We'd love to hear <span className="italic text-primary">from you.</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-royal text-primary-foreground rounded-2xl p-8 shadow-royal">
              <div className="flex gap-4 mb-4">
                <MapPin className="w-7 h-7 text-accent shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">Address</h3>
                  <p className="text-primary-foreground/85">Haspura I.T.I. Haspura, Itwan Road,<br />Haspura, Aurangabad,Bihar</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
              <div className="flex gap-4 mb-4">
                <Mail className="w-7 h-7 text-primary shrink-0" />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl text-secondary mb-3">Email</h3>
                  <a
                    href="mailto:anandsangitmahavidyalaya@gmail.com"
                    className="block text-lg font-medium text-foreground hover:text-primary transition-colors break-all"
                  >
                    anandsangitmahavidyalaya@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
              <div className="flex gap-4 mb-4">
                <Phone className="w-7 h-7 text-primary shrink-0" />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl text-secondary mb-3">Phone Numbers</h3>
                  <div className="space-y-2">
                    <a href="tel:+919472626355" className="block text-lg font-medium text-foreground hover:text-primary transition-colors">
                      +91 94726 26355
                    </a>
                    <a href="tel:+919153267412" className="block text-lg font-medium text-foreground hover:text-primary transition-colors">
                      +91 91532 67412
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <Button variant="hero" asChild>
                  <a href="tel:+919472626355">
                    <Phone className="mr-1 w-4 h-4" /> Call Now
                  </a>
                </Button>
                <Button variant="gold" asChild>
                  <a href="https://wa.me/919472626355" target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-1 w-4 h-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-card border border-border min-h-[400px]">
            <iframe
              title="Anand Sangeet Mahavidyalaya location"
              src="https://www.google.com/maps?q=Haspura+ITI+Itwa+Road+Haspura&output=embed"
              className="w-full h-full min-h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
