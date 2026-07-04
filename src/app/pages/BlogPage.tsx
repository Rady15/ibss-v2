import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { GOLD, DARK, IVORY, MUTED, T } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function BlogPage() {
  const { lang, isRTL } = useLang();
  const blog = T[lang].pages.blog;
  const navigate = useNavigate();

  return (
    <PageLayout>
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 50% 50%, ${GOLD}, transparent 60%)` }} />
        <div className="relative z-10 text-center px-6" dir={isRTL ? "rtl" : "ltr"}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white leading-tight mb-4"
            style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: isRTL ? 700 : 800 }}>
            {blog.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto text-sm" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>
            {blog.sub}
          </motion.p>
        </div>
      </section>

      <section className="py-24" style={{ background: IVORY }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blog.items.map((post, i) => (
              <div key={post.id} className="group overflow-hidden cursor-pointer" style={{ background: "#fff" }}
                onClick={() => navigate(`/blog/${post.id}`)}>
                <div className="overflow-hidden relative" style={{ height: "220px", background: "#e8e4dc" }}>
                  <img src={post.img} alt={post.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 start-3 px-2 py-1 text-[9px] tracking-widest uppercase" style={{ background: GOLD, color: "#fff", fontFamily: "'Manrope',sans-serif" }}>{post.cat}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={11} style={{ color: MUTED }} />
                    <span className="text-[11px]" style={{ color: MUTED, fontFamily: "'Manrope',sans-serif" }}>{post.date}</span>
                  </div>
                  <h3 className="font-semibold mb-2 leading-snug" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "16px", color: DARK }}>{post.t}</h3>
                  <p className="text-[13px] leading-relaxed mb-4" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{post.d}</p>
                  <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span className="text-[11px] tracking-widest uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{lang === "ar" ? "قراءة المزيد" : "Read More"}</span>
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
