import { motion } from "motion/react";
import { Star } from "lucide-react";
import { GOLD, DARK, IVORY, MUTED, CLIENTS, T } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function ClientsPage() {
  const { lang, isRTL } = useLang();
  const c = T[lang].clients;
  const te = T[lang].testimonials;

  return (
    <PageLayout>
      <section className="relative min-h-[35vh] flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 30% 50%, ${GOLD}, transparent 60%)` }} />
        </div>
        <div className="relative z-10 text-center px-6" dir={isRTL ? "rtl" : "ltr"}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white leading-tight mb-4"
            style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: isRTL ? 700 : 800 }}>
            {c.h2}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto text-sm" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>
            {c.sub}
          </motion.p>
        </div>
      </section>

      <section className="py-24" style={{ background: IVORY }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.25em] uppercase font-medium" style={{ color: GOLD, fontFamily: "'Manrope', sans-serif" }}>
              {lang === "ar" ? "نفخر بثقتهم" : "We Are Proud of Their Trust"}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px" style={{ border: "1px solid rgba(192,154,79,0.15)" }}>
            {CLIENTS.map((cl, i) => (
              <div key={i} className="flex items-center justify-center px-6 py-10 transition-all duration-200 cursor-default"
                style={{ borderRight: "1px solid rgba(192,154,79,0.1)", borderBottom: "1px solid rgba(192,154,79,0.1)", background: "#fff" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(192,154,79,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                <span className="text-sm font-medium text-center" style={{ color: DARK, fontFamily: "'Manrope',sans-serif", letterSpacing: "0.05em" }}>{cl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: DARK }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.25em] uppercase font-medium" style={{ color: GOLD, fontFamily: "'Manrope', sans-serif" }}>{te.label}</span>
            <h2 className="text-white leading-tight mt-4" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: isRTL ? 700 : 800 }}>{te.h2}</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {te.items.map((item, i) => (
              <div key={i} className="p-8 lg:p-10 flex flex-col h-full" style={{ border: "1px solid rgba(192,154,79,0.12)", background: "rgba(255,255,255,0.02)" }}>
                <div className="text-6xl font-serif mb-6 leading-none select-none" style={{ color: GOLD, fontFamily: "Georgia, serif", lineHeight: 0.8, opacity: 0.5 }}>"</div>
                <p className="text-[15px] leading-loose flex-1 mb-8" style={{ color: "rgba(255,255,255,0.65)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{item.q}</p>
                <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, j) => (<Star key={j} size={12} fill={GOLD} color={GOLD} />))}</div>
                <div>
                  <div className="font-semibold text-white text-[14px]" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{item.n}</div>
                  <div className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{item.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
