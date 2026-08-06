import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import directorPhoto from "@/assets/director-arvind-kumar-verma.jpg";
import principalPhoto from "@/assets/principal-ashok-kumar.jpg";
import administratorPhoto from "@/assets/administrator-bipin-kumar.jpg";

type Message = {
  photo: string;
  name: string;
  role: string;
  roleEn: string;
  greeting: string;
  paragraphs: string[];
  highlight: string;
  closing: string;
  sectionLabel: string;
  headingHi: string;
  headingAccent: string;
};

const messages: Message[] = [
  {
    photo: directorPhoto,
    name: "अरविंद कुमार वर्मा",
    role: "निदेशक",
    roleEn: "Director",
    sectionLabel: "Director's Desk",
    headingHi: "निदेशक का",
    headingAccent: "संदेश",
    greeting: "प्रिय विद्यार्थियों, अभिभावकों एवं कला प्रेमियों,",
    paragraphs: [
      "आनंद संगीत महाविद्यालय में आपका हार्दिक स्वागत है। हमारा संस्थान केवल शिक्षा देने का केंद्र नहीं, बल्कि भारतीय कला, संस्कृति और संस्कारों को नई पीढ़ी तक पहुँचाने का एक पवित्र माध्यम है। हमारा उद्देश्य है कि संगीत, नृत्य, चित्रकला और योग जैसी विधाओं के माध्यम से विद्यार्थियों के भीतर छिपी प्रतिभा को निखारा जाए और उन्हें आत्मनिर्भर एवं सफल बनाया जाए।",
      "मैं स्वयं मानता हूँ कि कला केवल मनोरंजन का साधन नहीं, बल्कि व्यक्तित्व विकास, अनुशासन, आत्मविश्वास और उज्ज्वल भविष्य का मार्ग है। जब किसी विद्यार्थी को सही मार्गदर्शन, उचित मंच और निरंतर अभ्यास का अवसर मिलता है, तब वह अपनी पहचान स्वयं बना लेता है।",
      "आनंद संगीत महाविद्यालय की स्थापना इसी सोच के साथ की गई थी कि ग्रामीण और कस्बाई क्षेत्रों के प्रतिभाशाली छात्र-छात्राओं को भी बड़े अवसर मिलें। आज हमारे विद्यार्थी जिला, राज्य और राष्ट्रीय स्तर पर अपनी प्रतिभा का प्रदर्शन कर रहे हैं, यह हमारे लिए गर्व का विषय है।",
      "हमारा संकल्प है कि आने वाले समय में यह संस्थान कला शिक्षा के क्षेत्र में और भी ऊँचाइयों को छुए तथा हर विद्यार्थी के सपनों को नई उड़ान दे।",
    ],
    highlight:
      "अपनी प्रतिभा को पहचानिए, मेहनत को अपना साथी बनाइए, और कला को अपने उज्ज्वल भविष्य का आधार बनाइए।",
    closing: "आप सभी के उज्ज्वल भविष्य की मंगलकामनाओं सहित।",
  },
  {
    photo: principalPhoto,
    name: "अशोक कुमार",
    role: "प्रधानाचार्य",
    roleEn: "Principal",
    sectionLabel: "Principal's Desk",
    headingHi: "प्रधानाचार्य का",
    headingAccent: "संदेश",
    greeting: "प्रिय विद्यार्थियों, अभिभावकों एवं सम्मानित कला प्रेमियों,",
    paragraphs: [
      "आनंद संगीत महाविद्यालय परिवार की ओर से आप सभी का हार्दिक स्वागत है। हमारा संस्थान भारतीय संगीत, नृत्य, चित्रकला एवं योग जैसी महान परंपराओं को नई पीढ़ी तक पहुँचाने और उन्हें उज्ज्वल भविष्य से जोड़ने के लिए निरंतर कार्यरत है।",
      "शिक्षा का वास्तविक उद्देश्य केवल डिग्री प्राप्त करना नहीं, बल्कि व्यक्तित्व निर्माण, अनुशासन, संस्कार और आत्मविश्वास का विकास करना है। कला शिक्षा विद्यार्थियों के भीतर छिपी सृजनात्मकता को जागृत करती है और उन्हें जीवन में आगे बढ़ने की नई दिशा देती है।",
      "हमारा प्रयास है कि प्रत्येक विद्यार्थी को गुणवत्तापूर्ण शिक्षा, श्रेष्ठ मार्गदर्शन और अपनी प्रतिभा दिखाने का उचित मंच प्राप्त हो। यहाँ अनुभवी शिक्षकों के निर्देशन में विद्यार्थियों को व्यावहारिक एवं व्यवस्थित प्रशिक्षण दिया जाता है, ताकि वे राष्ट्रीय और अंतरराष्ट्रीय स्तर पर अपनी पहचान बना सकें।",
      "आज हमारे अनेक विद्यार्थी विभिन्न सरकारी एवं गैर-सरकारी क्षेत्रों में सफलता प्राप्त कर रहे हैं, जो हमारे लिए गर्व का विषय है। यह संस्थान हर छात्र-छात्रा के सपनों को साकार करने के लिए प्रतिबद्ध है।",
    ],
    highlight:
      "नियमित अभ्यास, समर्पण और सकारात्मक सोच के साथ आप हर लक्ष्य प्राप्त कर सकते हैं। आइए, कला को अपनाइए, संस्कृति को आगे बढ़ाइए और अपने जीवन को सफलता की नई ऊँचाइयों तक पहुँचाइए।",
    closing: "आप सभी के उज्ज्वल भविष्य की शुभकामनाओं सहित।",
  },
  {
    photo: administratorPhoto,
    name: "बिपिन कुमार",
    role: "प्रशासक",
    roleEn: "Administrator",
    sectionLabel: "Administrator's Desk",
    headingHi: "प्रशासक का",
    headingAccent: "संदेश",
    greeting: "प्रिय विद्यार्थियों, अभिभावकों एवं सम्मानित आगंतुकों,",
    paragraphs: [
      "आनंद संगीत महाविद्यालय में आपका हार्दिक स्वागत है। हमारा संस्थान केवल शिक्षा का केंद्र नहीं, बल्कि प्रतिभा, अनुशासन, संस्कार और उज्ज्वल भविष्य निर्माण का एक सशक्त मंच है। यहाँ विद्यार्थियों को भारतीय संगीत, नृत्य, चित्रकला एवं योग के क्षेत्र में उत्कृष्ट शिक्षा और मार्गदर्शन प्रदान किया जाता है।",
      "एक प्रशासक के रूप में मेरा सदैव प्रयास रहता है कि संस्थान में विद्यार्थियों को बेहतर शैक्षणिक वातावरण, आधुनिक सुविधाएँ और व्यवस्थित प्रबंधन उपलब्ध हो, ताकि वे बिना किसी बाधा के अपने लक्ष्य की ओर अग्रसर हो सकें।",
      "हम मानते हैं कि हर विद्यार्थी के भीतर कोई न कोई विशेष प्रतिभा होती है। आवश्यकता केवल सही दिशा, उचित अवसर और निरंतर प्रेरणा की होती है। आनंद संगीत महाविद्यालय इन्हीं मूल्यों के साथ विद्यार्थियों के सपनों को साकार करने के लिए निरंतर कार्य कर रहा है।",
      "हमारा उद्देश्य है कि ग्रामीण एवं शहरी क्षेत्रों के छात्र-छात्राओं को समान अवसर मिले और वे अपनी कला के माध्यम से समाज एवं राष्ट्र का नाम रोशन करें। संस्थान का प्रत्येक सदस्य विद्यार्थियों के सर्वांगीण विकास के लिए समर्पित है।",
    ],
    highlight:
      "मेहनत, अनुशासन और सकारात्मक सोच से हर सपना साकार किया जा सकता है। आइए, शिक्षा और कला के इस पावन सफर का हिस्सा बनिए और अपने भविष्य को नई पहचान दीजिए।",
    closing: "आप सभी के उज्ज्वल भविष्य की मंगलकामनाओं सहित।",
  },
];

const MessageCard = ({ msg }: { msg: Message }) => (
  <Card className="overflow-hidden shadow-warm border-primary/10">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
      <div className="lg:col-span-2 relative bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden">
          <img
            src={msg.photo}
            alt={`${msg.name} - ${msg.role}, आनंद संगीत महाविद्यालय`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/95 via-secondary/70 to-transparent p-6 text-primary-foreground">
          <div className="font-display text-2xl font-bold">{msg.name}</div>
          <div className="text-primary text-sm font-semibold mt-1 uppercase tracking-wider">
            {msg.role} / {msg.roleEn}
          </div>
          <div className="text-xs text-primary-foreground/80 mt-1">
            आनंद संगीत महाविद्यालय
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 p-8 md:p-12 relative">
        <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/10" />

        <div className="space-y-4 text-foreground/90 leading-relaxed font-hindi">
          <p className="font-semibold text-secondary">{msg.greeting}</p>

          {msg.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <p className="border-l-4 border-primary pl-4 italic text-secondary font-semibold">
            {msg.highlight}
          </p>

          <p className="text-muted-foreground">{msg.closing}</p>

          <div className="pt-4 border-t border-border">
            <div className="font-display text-lg font-bold text-secondary">
              {msg.name}
            </div>
            <div className="text-primary text-sm font-semibold">{msg.role}</div>
            <div className="text-xs text-muted-foreground">आनंद संगीत महाविद्यालय</div>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const DirectorMessage = () => {
  const autoplay = useRef(
    Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <section id="director-message" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Leadership Message
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">
            निदेशक एवं प्रधानाचार्य का{" "}
            <span className="italic text-primary">संदेश</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-4" />
        </div>

        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[autoplay.current]}
          className="relative"
        >
          <CarouselContent>
            {messages.map((msg, i) => (
              <CarouselItem key={i}>
                <MessageCard msg={msg} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex left-2 lg:-left-12 bg-background/90" />
          <CarouselNext className="hidden md:flex right-2 lg:-right-12 bg-background/90" />
        </Carousel>
      </div>
    </section>
  );
};

export default DirectorMessage;
