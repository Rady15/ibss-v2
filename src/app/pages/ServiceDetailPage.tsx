import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "motion/react";
import { GOLD, DARK, IVORY, MUTED, IMG, T, SERVICE_DETAILS } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function ServiceDetailPage() {
  const { lang, isRTL } = useLang();
  const { id } = useParams();
  const navigate = useNavigate();
  const s = T[lang].services;
  const serviceName = decodeURIComponent(id || "");
  const item = s.items.find(i => i.t === serviceName);
  const detail = SERVICE_DETAILS[lang]?.[serviceName];

  if (!item || !detail) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]" dir={isRTL ? "rtl" : "ltr"}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: DARK }}>{lang === "ar" ? "الخدمة غير موجودة" : "Service Not Found"}</h2>
            <button onClick={() => navigate("/services")} className="px-6 py-3 text-sm font-medium" style={{ background: GOLD, color: DARK }}>
              {lang === "ar" ? "العودة للخدمات" : "Back to Services"}
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="relative min-h-[45vh] flex items-end pb-16 overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
          <img src={detail.img} alt={serviceName} className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK} 30%, transparent)` }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate("/services")} className="flex items-center gap-2 text-sm mb-6" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>
              <ArrowLeft size={14} /> {lang === "ar" ? "العودة للخدمات" : "Back to Services"}
            </button>
            <h1 className="text-white leading-tight mb-4" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: isRTL ? 700 : 800 }}>
              {serviceName}
            </h1>
            <p className="text-white/60 max-w-2xl text-[15px]" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{detail.desc}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="mb-8 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>
                {lang === "ar" ? "المميزات" : "Features"}
              </h2>
              <ul className="space-y-4">
                {detail.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check size={16} style={{ color: GOLD }} />
                    <span className="text-[15px]" style={{ color: DARK, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-8 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>
                {lang === "ar" ? "آلية العمل" : "Our Process"}
              </h2>
              <div className="space-y-0">
                {detail.process.map((step, i) => (
                  <div key={i} className="flex gap-6 pb-8 relative" style={{ borderLeft: isRTL ? "none" : "1px solid rgba(192,154,79,0.25)", borderRight: isRTL ? "1px solid rgba(192,154,79,0.25)" : "none", paddingLeft: isRTL ? 0 : "24px", paddingRight: isRTL ? "24px" : 0 }}>
                    <div className="absolute top-0 w-2 h-2 rounded-full" style={{ background: GOLD, left: isRTL ? "auto" : "-5px", right: isRTL ? "-5px" : "auto" }} />
                    <div>
                      <span className="text-xs font-bold tracking-widest block mb-1" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[15px]" style={{ color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
