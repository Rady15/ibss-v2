import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GOLD, DARK, IVORY, MUTED, PROJECTS, T } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function ProjectsPage() {
  const { lang, isRTL } = useLang();
  const p = T[lang].projects;
  const navigate = useNavigate();
  const filterMap: Record<string, string> = { [p.filters[0]]: "all", [p.filters[1]]: "corporate", [p.filters[2]]: "healthcare", [p.filters[3]]: "government", [p.filters[4]]: "hospitality" };
  const [active, setActive] = useState(p.filters[0]);
  const filtered = filterMap[active] === "all" ? PROJECTS : PROJECTS.filter(pr => pr.cat === filterMap[active]);

  return (
    <PageLayout>
      <section className="relative min-h-[35vh] flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
          <img src={PROJECTS[0].img} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK}, transparent)` }} />
        </div>
        <div className="relative z-10 text-center px-6" dir={isRTL ? "rtl" : "ltr"}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white leading-tight mb-4"
            style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: isRTL ? 700 : 800 }}>
            {p.h2}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto text-sm" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>
            {lang === "ar" ? "استكشف مشاريعنا الناجحة في مختلف القطاعات" : "Explore our successful projects across various sectors"}
          </motion.p>
        </div>
      </section>

      <section className="py-24" style={{ background: IVORY }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex flex-wrap gap-2 mb-12">
            {p.filters.map((f, i) => (
              <button key={i} onClick={() => setActive(f)} className="px-5 py-2.5 text-[12px] tracking-wide transition-all duration-200"
                style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", background: active === f ? GOLD : "transparent", color: active === f ? "#fff" : DARK, border: `1px solid ${active === f ? GOLD : "rgba(0,0,0,0.1)"}` }}>{f}</button>
            ))}
          </div>
          <div className="space-y-8">
            {filtered.map((pr, i) => (
              <div key={pr.id} className="group grid lg:grid-cols-5 gap-8 items-center cursor-pointer" style={{ background: "#fff" }}
                onClick={() => navigate(`/projects/${pr.id}`)}>
                <div className="lg:col-span-2 overflow-hidden relative" style={{ height: "300px" }}>
                  <img src={pr.img} alt={pr.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="lg:col-span-3 p-6 lg:p-0" dir={isRTL ? "rtl" : "ltr"}>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[10px] tracking-widest uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{pr.year}</span>
                    <span className="w-4 h-px" style={{ background: GOLD }} />
                    <span className="text-[10px] tracking-widest uppercase" style={{ color: MUTED, fontFamily: "'Manrope',sans-serif" }}>{pr.area}</span>
                    <span className="px-2 py-0.5 text-[9px] tracking-widest uppercase" style={{ background: GOLD, color: "#fff", fontFamily: "'Manrope',sans-serif" }}>{pr.cat}</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", color: DARK }}>{isRTL ? pr.title : pr.sub}</h3>
                  <p className="text-[14px] mb-4" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{isRTL ? pr.sub : pr.title}</p>
                  {pr.desc && <p className="text-[13px] leading-relaxed mb-4" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{pr.desc}</p>}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] tracking-widest uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{lang === "ar" ? "عرض التفاصيل" : "View Details"}</span>
                    <ArrowUpRight size={12} style={{ color: GOLD }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
