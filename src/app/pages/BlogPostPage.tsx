import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { GOLD, DARK, IVORY, MUTED, T, BLOG_POSTS } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function BlogPostPage() {
  const { lang, isRTL } = useLang();
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = T[lang].pages.blog;
  const post = blog.items.find(p => p.id === id);

  const langPosts = BLOG_POSTS[lang] || BLOG_POSTS["en"] || {};
  const content = langPosts[id || ""];

  if (!post) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]" dir={isRTL ? "rtl" : "ltr"}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: DARK }}>{lang === "ar" ? "المقال غير موجود" : "Article Not Found"}</h2>
            <button onClick={() => navigate("/blog")} className="px-6 py-3 text-sm font-medium" style={{ background: GOLD, color: DARK }}>
              {lang === "ar" ? "العودة للمدونة" : "Back to Blog"}
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="relative min-h-[50vh] flex items-end pb-16 overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
          <img src={post.img} alt={post.t} className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK} 30%, transparent)` }} />
        </div>
        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10 w-full" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate("/blog")} className="flex items-center gap-2 text-sm mb-6" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>
              <ArrowLeft size={14} /> {lang === "ar" ? "العودة للمدونة" : "Back to Blog"}
            </button>
            <div className="text-[10px] tracking-widest uppercase mb-3 px-2 py-1 inline-block" style={{ background: GOLD, color: "#fff", fontFamily: "'Manrope',sans-serif" }}>{post.cat}</div>
            <h1 className="text-white leading-tight mb-4" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: isRTL ? 700 : 800 }}>
              {post.t}
            </h1>
            <div className="flex items-center gap-2">
              <Calendar size={13} style={{ color: GOLD }} />
              <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Manrope',sans-serif" }}>{post.date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16" style={{ background: "#fff" }}>
        <div className="max-w-[900px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          {content?.sections.map((section, i) => (
            <div key={i} className="mb-10">
              <h2 className="mb-4 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.3rem, 2vw, 1.6rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>
                {section.h2}
              </h2>
              <p className="leading-relaxed text-[15px]" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
