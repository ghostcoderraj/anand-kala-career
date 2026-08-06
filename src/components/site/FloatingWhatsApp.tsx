import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919472626355?text=Hello%20Anand%20Sangeet%20Mahavidyalaya"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-[hsl(142_70%_45%)] animate-ping opacity-30" />
      <span className="relative flex items-center gap-2 bg-[hsl(142_70%_45%)] hover:bg-[hsl(142_70%_38%)] text-primary-foreground font-semibold px-5 py-4 rounded-full shadow-warm transition-all hover:scale-105">
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline">Chat with us</span>
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
