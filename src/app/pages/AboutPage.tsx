import { motion } from "motion/react";
import { GOLD, DARK, IVORY, MUTED, IMG, T } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function AboutPage() {
  const { lang, isRTL } = useLang();
  const p = T[lang].pages.about;
  const a = T[lang].about;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
          <img src={IMG.about} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK}, transparent)` }} />
        </div>
        <div className="relative z-10 text-center px-6" dir={isRTL ? "rtl" : "ltr"}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white leading-tight mb-4"
            style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: isRTL ? 700 : 800 }}>
            {p.hero.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 max-w-xl mx-auto"
            style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
            {p.hero.sub}
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24" style={{ background: IVORY }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: GOLD }} />
              </div>
              <h2 className="mb-6 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>{p.mission.h2}</h2>
              <p className="leading-relaxed text-[15px]" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{p.mission.body}</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: GOLD }} />
              </div>
              <h2 className="mb-6 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>{p.vision.h2}</h2>
              <p className="leading-relaxed text-[15px]" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{p.vision.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: GOLD }} />
                <span className="text-xs tracking-[0.25em] uppercase font-medium" style={{ color: GOLD, fontFamily: "'Manrope', sans-serif" }}>{a.label}</span>
              </div>
              <h2 className="mb-6 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>{a.h2}</h2>
              <p className="leading-loose mb-8 text-[15px]" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{a.body}</p>
              <div className="space-y-0">
                {a.milestones.map((m, i) => (
                  <div key={i} className="flex gap-6 pb-8 relative" style={{ borderLeft: isRTL ? "none" : "1px solid rgba(192,154,79,0.25)", borderRight: isRTL ? "1px solid rgba(192,154,79,0.25)" : "none", paddingLeft: isRTL ? 0 : "24px", paddingRight: isRTL ? "24px" : 0 }}>
                    <div className="absolute top-0 w-2 h-2 rounded-full" style={{ background: GOLD, left: isRTL ? "auto" : "-5px", right: isRTL ? "-5px" : "auto" }} />
                    <div>
                      <span className="text-xs font-bold tracking-widest block mb-1" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{m.y}</span>
                      <span className="text-[15px]" style={{ color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{m.e}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={IMG.team} alt="" className="w-full object-cover" style={{ height: "500px" }} />
              <div className="absolute -bottom-6 -start-6 px-6 py-4" style={{ background: GOLD }}>
                <div className="text-3xl font-black" style={{ color: DARK, fontFamily: "'Manrope',sans-serif" }}>15+</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: DARK, fontFamily: "'Manrope',sans-serif" }}>{lang === "ar" ? "عام من التميز" : "Years of Excellence"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: DARK }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: GOLD }} />
              <span className="text-xs tracking-[0.25em] uppercase font-medium" style={{ color: GOLD, fontFamily: "'Manrope', sans-serif" }}>{lang === "ar" ? "قيمنا" : "Our Values"}</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.values.map((v, i) => (
              <div key={i} className="p-8 text-center" style={{ border: "1px solid rgba(192,154,79,0.15)", background: "rgba(255,255,255,0.02)" }}>
                <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center" style={{ border: "1px solid rgba(192,154,79,0.3)" }}>
                  <span className="text-lg font-bold" style={{ color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-white font-semibold mb-3" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{v.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ background: IVORY }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: GOLD }} />
              <span className="text-xs tracking-[0.25em] uppercase font-medium" style={{ color: GOLD, fontFamily: "'Manrope', sans-serif" }}>{lang === "ar" ? "فريقنا" : "Our Team"}</span>
            </div>
            <h2 className="leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>
              {lang === "ar" ? "نخبة من الخبراء والمبدعين" : "Elite Team of Experts & Creatives"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {p.team.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="overflow-hidden mb-5" style={{ height: "280px", background: "#e4e0d6" }}>
                  <img src={member.img} alt={member.n} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-semibold text-[15px]" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", color: DARK }}>{member.n}</h3>
                <p className="text-[12px] mt-1" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{member.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
