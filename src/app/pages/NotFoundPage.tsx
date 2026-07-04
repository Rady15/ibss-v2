import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { GOLD, DARK } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function NotFoundPage() {
  const { lang } = useLang();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6" style={{ background: DARK }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <div className="text-[120px] lg:text-[180px] font-black leading-none mb-4 select-none" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif", opacity: 0.3 }}>404</div>
          <h1 className="text-white mb-4" style={{ fontFamily: lang === "ar" ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            {lang === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
          </h1>
          <p className="text-white/40 mb-10 max-w-md mx-auto text-sm" style={{ fontFamily: lang === "ar" ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>
            {lang === "ar"
              ? "عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها."
              : "Sorry, we couldn't find the page you're looking for. It may have been moved or deleted."}
          </p>
          <button onClick={() => navigate("/")}
            className="px-10 py-4 text-[15px] font-medium transition-all duration-200 hover:opacity-90"
            style={{ background: GOLD, color: DARK, fontFamily: lang === "ar" ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
            {lang === "ar" ? "العودة للصفحة الرئيسية" : "Back to Homepage"}
          </button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
