import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Send } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  phone: z.string().trim().min(10, "Valid phone required").max(15),
  course: z.string().trim().min(2).max(80),
  message: z.string().trim().max(500).optional(),
});

const Admission = () => {
  const [form, setForm] = useState({ name: "", phone: "", course: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast({ title: "Please check your details", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    const text = `नमस्ते! Admission inquiry:\nName: ${form.name}\nPhone: ${form.phone}\nCourse: ${form.course}\nMessage: ${form.message}`;
    window.open(`https://wa.me/919472626355?text=${encodeURIComponent(text)}`, "_blank");
    toast({ title: "Inquiry sent!", description: "We'll connect with you on WhatsApp shortly." });
    setForm({ name: "", phone: "", course: "", message: "" });
  };

  return (
    <section id="admission" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-warm" />
      <div className="absolute inset-0 mandala-bg opacity-50" />
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-secondary font-bold text-sm mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" /> URGENT · सीमित सीटें
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-4">
              Admission<br/>Open Now <span className="text-accent">2026</span>
            </h2>
            <p className="font-hindi text-2xl md:text-3xl text-primary-foreground/95 mb-4">
              अभी जुड़ें — अपने जुनून को पेशा बनाएँ।
            </p>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              Join now and turn your passion into a respected, government-recognized profession.
            </p>
          </div>

          <form onSubmit={submit} className="bg-card rounded-3xl p-8 md:p-10 shadow-royal">
            <h3 className="font-display text-2xl font-bold text-secondary mb-6">Apply Today</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" maxLength={100} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" maxLength={15} />
              </div>
              <div>
                <Label htmlFor="course">Interested Course</Label>
                <Input id="course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} placeholder="Music / Dance / Fine Arts / Yoga" maxLength={80} />
              </div>
              <div>
                <Label htmlFor="msg">Message (optional)</Label>
                <Textarea id="msg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} maxLength={500} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Send className="mr-2 w-4 h-4" /> Send via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Admission;
