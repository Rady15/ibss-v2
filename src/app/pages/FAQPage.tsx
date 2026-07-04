import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { GOLD, DARK, IVORY, T } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function FAQPage() {
  const { lang, isRTL } = useLang();
  const faq = T[lang].pages.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <PageLayout>
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 50% 50%, ${GOLD}, transparent 60%)` }} />
        <div className="relative z-10 text-center px-6" dir={isRTL ? "rtl" : "ltr"}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white leading-tight mb-4"
            style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: isRTL ? 700 : 800 }}>
            {faq.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto text-sm" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>
            {faq.sub}
          </motion.p>
        </div>
      </section>

      <section className="py-24" style={{ background: IVORY }}>
        <div className="max-w-[900px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="space-y-2">
            {faq.items.map((item, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid rgba(192,154,79,0.1)" }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left transition-colors duration-200"
                  style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}
                >
                  <span className="font-medium text-[15px]" style={{ color: DARK }}>{item.q}</span>
                  <ChevronDown size={16} style={{ color: GOLD }} className={`transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-[14px] leading-relaxed" style={{ color: "#78706A", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{item.a}</div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
