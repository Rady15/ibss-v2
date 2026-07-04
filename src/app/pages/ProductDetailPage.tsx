import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Check, Ruler, Package } from "lucide-react";
import { motion } from "motion/react";
import { GOLD, DARK, IVORY, MUTED, PRODUCTS } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

export default function ProductDetailPage() {
  const { lang, isRTL } = useLang();
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]" dir={isRTL ? "rtl" : "ltr"}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: DARK }}>{lang === "ar" ? "المنتج غير موجود" : "Product Not Found"}</h2>
            <button onClick={() => navigate("/products")} className="px-6 py-3 text-sm font-medium" style={{ background: GOLD, color: DARK }}>
              {lang === "ar" ? "العودة للمنتجات" : "Back to Products"}
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="py-12 lg:py-16" style={{ background: IVORY }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <button onClick={() => navigate("/products")} className="flex items-center gap-2 text-sm mb-8" style={{ color: MUTED, fontFamily: "'Manrope',sans-serif" }}>
            <ArrowLeft size={14} /> {lang === "ar" ? "العودة للمنتجات" : "Back to Products"}
          </button>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, x: isRTL ? 40 : -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="overflow-hidden" style={{ height: "500px", background: "#e8e4dc" }}>
                <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: isRTL ? -40 : 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="inline-block px-3 py-1 text-[10px] tracking-widest uppercase mb-4" style={{ background: GOLD, color: "#fff", fontFamily: "'Manrope',sans-serif" }}>{product.cat}</div>
              <h1 className="mb-4 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>
                {product.title}
              </h1>
              <p className="text-[13px] mb-3" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{product.sub}</p>
              {product.desc && (
                <p className="leading-relaxed mb-8 text-[15px]" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{product.desc}</p>
              )}

              {product.features && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 text-[15px]" style={{ color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
                    {lang === "ar" ? "المميزات" : "Features"}
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-[14px]" style={{ color: DARK, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>
                        <Check size={14} style={{ color: GOLD }} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.sizes && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 text-[15px]" style={{ color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
                    <Ruler size={14} style={{ color: GOLD }} className="inline me-2" />
                    {lang === "ar" ? "المقاسات المتوفرة" : "Available Sizes"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 text-[12px] border" style={{ borderColor: "rgba(192,154,79,0.3)", color: DARK, fontFamily: "'Manrope',sans-serif" }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={() => navigate("/contact")}
                className="flex items-center gap-3 px-8 py-4 text-[14px] font-medium transition-all duration-200 hover:opacity-90"
                style={{ background: GOLD, color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
                <Package size={16} />
                {lang === "ar" ? "طلب عرض سعر" : "Request a Quote"}
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
