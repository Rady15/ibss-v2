import { motion } from "motion/react";
import { GOLD, DARK, IVORY, MUTED, T } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function PrivacyPage() {
  const { lang, isRTL } = useLang();
  const legal = T[lang].pages.legal.privacy;

  return (
    <PageLayout>
      <section className="relative min-h-[25vh] flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 50% 50%, ${GOLD}, transparent 60%)` }} />
        <div className="relative z-10 text-center px-6" dir={isRTL ? "rtl" : "ltr"}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white leading-tight"
            style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: isRTL ? 700 : 800 }}>
            {legal.h1}
          </motion.h1>
          <p className="text-white/40 text-sm mt-4" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{legal.updated}</p>
        </div>
      </section>

      <section className="py-16" style={{ background: "#fff" }}>
        <div className="max-w-[900px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          {legal.sections.map((section, i) => (
            <div key={i} className="mb-10">
              <h2 className="mb-3 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>
                {section.h}
              </h2>
              <p className="leading-relaxed text-[15px]" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>
                {section.b}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
