import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GOLD, DARK, IVORY, PRODUCTS, T } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function ProductsPage() {
  const { lang, isRTL } = useLang();
  const p = T[lang].products;
  const navigate = useNavigate();
  const catMap: Record<string, string> = { [p.cats[0]]: "all", [p.cats[1]]: "executive", [p.cats[2]]: "chairs", [p.cats[3]]: "meeting", [p.cats[4]]: "reception", [p.cats[5]]: "workstation", [p.cats[6]]: "storage" };
  const [active, setActive] = useState(p.cats[0]);
  const filtered = catMap[active] === "all" ? PRODUCTS : PRODUCTS.filter(pr => pr.cat === catMap[active]);

  return (
    <PageLayout>
      <section className="relative min-h-[35vh] flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
          <img src={PRODUCTS[0].img} alt="" className="w-full h-full object-cover opacity-30" />
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
            {lang === "ar" ? "تصفح مجموعتنا المميزة من الأثاث المكتبي والتنفيذي" : "Browse our premium collection of office and executive furniture"}
          </motion.p>
        </div>
      </section>

      <section className="py-24" style={{ background: IVORY }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex flex-wrap gap-2 mb-12">
            {p.cats.map((c, i) => (
              <button key={i} onClick={() => setActive(c)} className="px-5 py-2.5 text-[12px] tracking-wide transition-all duration-200"
                style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", background: active === c ? GOLD : "transparent", color: active === c ? "#fff" : DARK, border: `1px solid ${active === c ? GOLD : "rgba(0,0,0,0.1)"}` }}>{c}</button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((pr, i) => (
              <div key={pr.id} className="group overflow-hidden cursor-pointer" style={{ background: "#fff" }}
                onClick={() => navigate(`/products/${pr.id}`)}>
                <div className="overflow-hidden relative" style={{ height: "260px", background: "#e8e4dc" }}>
                  <img src={pr.img} alt={pr.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 start-3 px-2 py-1 text-[10px] tracking-widest uppercase" style={{ background: GOLD, color: "#fff", fontFamily: "'Manrope',sans-serif" }}>{pr.cat}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[15px]" style={{ fontFamily: "'Manrope',sans-serif", color: DARK }}>{pr.title}</h3>
                    <ArrowUpRight size={14} style={{ color: GOLD }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[12px]" style={{ color: "#78706A", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{pr.sub}</p>
                  <div className="mt-4 w-0 h-px group-hover:w-full transition-all duration-500" style={{ background: GOLD }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
