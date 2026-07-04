import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GOLD, DARK, IVORY, MUTED, IMG, T, SERVICE_DETAILS } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function ServicesPage() {
  const { lang, isRTL } = useLang();
  const s = T[lang].services;
  const navigate = useNavigate();

  return (
    <PageLayout>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
          <img src={IMG.showroom} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK}, transparent)` }} />
        </div>
        <div className="relative z-10 text-center px-6" dir={isRTL ? "rtl" : "ltr"}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white leading-tight mb-4"
            style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: isRTL ? 700 : 800 }}>
            {s.h2}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 max-w-xl mx-auto" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>
            {lang === "ar" ? "نقدم حلولاً متكاملة لتأثيث وتجهيز جميع أنواع المنشآت" : "Complete furnishing solutions for all types of facilities"}
          </motion.p>
        </div>
      </section>

      <section className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {s.items.map((item, i) => {
              const detail = SERVICE_DETAILS[lang]?.[item.t];
              return (
                <div key={i} className="group overflow-hidden cursor-pointer" style={{ background: IVORY }}
                  onClick={() => navigate(`/services/${encodeURIComponent(item.t)}`)}>
                  <div className="overflow-hidden relative" style={{ height: "240px", background: "#e8e4dc" }}>
                    <img src={item.img} alt={item.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ background: "rgba(12,11,9,0.5)" }} />
                  </div>
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[17px]" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", color: DARK }}>{item.t}</h3>
                      <ArrowUpRight size={16} style={{ color: GOLD }} />
                    </div>
                    <p className="text-[13px] leading-relaxed mb-4" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{item.d}</p>
                    {detail && (
                      <div className="flex flex-wrap gap-2">
                        {detail.features.slice(0, 3).map((f, j) => (
                          <span key={j} className="text-[10px] px-2 py-1" style={{ background: GOLD, color: DARK, fontFamily: "'Manrope',sans-serif" }}>{f}</span>
                        ))}
                      </div>
                    )}
                    <div className="mt-5 w-0 h-px group-hover:w-full transition-all duration-500" style={{ background: GOLD }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
