import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { T } from "../lib/data";
import { useLang } from "../lib/LangContext";
import {
  NavbarPart, HeroSection, AboutSection, WhyUsSection,
  ServicesSection, ProductsSection, ProjectsSection,
  ClientsSection, ProcessSection, TestimonialsSection,
  CTASection, ContactSection, FooterSection
} from "../components/sections/AllSections";

export default function HomePage() {
  const { lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: lang === "ar" ? "'Cairo', 'Tajawal', sans-serif" : "'Manrope', sans-serif", background: "#F7F4EE", overflowX: "hidden" }}>
      <NavbarPart scrolled={scrolled} t={t} />
      <HeroSection t={t} />
      <AboutSection t={t} />
      <WhyUsSection t={t} />
      <ServicesSection t={t} />
      <ProductsSection t={t} />
      <ProjectsSection t={t} />
      <ClientsSection t={t} />
      <ProcessSection t={t} />
      <TestimonialsSection t={t} />
      <CTASection t={t} />
      <ContactSection t={t} />
      <FooterSection t={t} />
      <a href="https://wa.me/966501234567" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-8 end-8 z-50 w-14 h-14 flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110"
        style={{ background: "#25D366", borderRadius: "50%" }} aria-label="WhatsApp">
        <MessageCircle size={24} color="white" />
      </a>
    </div>
  );
}
