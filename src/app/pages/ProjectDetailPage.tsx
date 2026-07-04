import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Check, Building2, Target } from "lucide-react";
import { motion } from "motion/react";
import { GOLD, DARK, IVORY, MUTED, PROJECTS } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function ProjectDetailPage() {
  const { lang, isRTL } = useLang();
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === Number(id));

  if (!project) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]" dir={isRTL ? "rtl" : "ltr"}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: DARK }}>{lang === "ar" ? "المشروع غير موجود" : "Project Not Found"}</h2>
            <button onClick={() => navigate("/projects")} className="px-6 py-3 text-sm font-medium" style={{ background: GOLD, color: DARK }}>
              {lang === "ar" ? "العودة للمشاريع" : "Back to Projects"}
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK} 30%, transparent)` }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate("/projects")} className="flex items-center gap-2 text-sm mb-6" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>
              <ArrowLeft size={14} /> {lang === "ar" ? "العودة للمشاريع" : "Back to Projects"}
            </button>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-[11px] tracking-widest uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{project.year}</span>
              <span className="w-4 h-px" style={{ background: GOLD }} />
              <span className="text-[11px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Manrope',sans-serif" }}>{project.area}</span>
            </div>
            <h1 className="text-white leading-tight mb-3" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: isRTL ? 700 : 800 }}>
              {isRTL ? project.title : project.sub}
            </h1>
            <p className="text-white/50 max-w-2xl text-[15px]" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{isRTL ? project.sub : project.title}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24" style={{ background: IVORY }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="mb-6 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>
                {lang === "ar" ? "عن المشروع" : "About the Project"}
              </h2>
              <p className="leading-relaxed mb-8 text-[15px]" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{project.desc}</p>
              {project.client && (
                <div className="flex items-center gap-3 mb-8">
                  <Building2 size={18} style={{ color: GOLD }} />
                  <span className="text-[14px]" style={{ color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
                    <span style={{ color: MUTED }}>{lang === "ar" ? "العميل: " : "Client: "}</span>{project.client}
                  </span>
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h2 className="mb-6 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>
                <Target size={18} style={{ color: GOLD }} className="inline me-2" />
                {lang === "ar" ? "نطاق العمل" : "Scope of Work"}
              </h2>
              {project.scope && (
                <ul className="space-y-4">
                  {project.scope.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={16} style={{ color: GOLD }} className="mt-0.5" />
                      <span className="text-[15px]" style={{ color: DARK, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 text-center" style={{ background: DARK }}>
        <div className="max-w-[1400px] mx-auto px-6" dir={isRTL ? "rtl" : "ltr"}>
          <h2 className="text-white mb-4" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.3rem, 2vw, 1.8rem)", fontWeight: isRTL ? 700 : 800 }}>
            {lang === "ar" ? "هل لديك مشروع مشابه؟" : "Have a Similar Project?"}
          </h2>
          <button onClick={() => navigate("/contact")} className="px-10 py-4 text-[15px] font-medium transition-all duration-200 hover:opacity-90"
            style={{ background: GOLD, color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
            {lang === "ar" ? "تواصل معنا" : "Contact Us"}
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
