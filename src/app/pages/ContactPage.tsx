import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Check, ChevronLeft } from "lucide-react";
import { GOLD, DARK, IVORY, MUTED, IMG, T } from "../lib/data";
import { useLang } from "../lib/LangContext";
import { PageLayout } from "../components/PageLayout";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const { lang, isRTL } = useLang();
  const c = T[lang].contact;
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", msg: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); setForm({ name: "", email: "", phone: "", company: "", msg: "" }); };

  const hours = lang === "ar"
    ? [{ d: "السبت – الخميس", h: "٨:٠٠ ص – ٦:٠٠ م" }, { d: "الجمعة", h: "مغلق" }]
    : [{ d: "Sat – Thu", h: "8:00 AM – 6:00 PM" }, { d: "Friday", h: "Closed" }];

  return (
    <PageLayout>
      <section className="relative min-h-[40vh] flex items-center overflow-hidden" style={{ background: DARK }}>
        <div className="absolute inset-0">
          <img src={IMG.panorama} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${DARK} 0%, rgba(12,11,9,0.6) 50%, transparent 100%)` }} />
        </div>
        <div className="absolute inset-0" style={{ opacity: 0.05 }}>
          <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(${GOLD} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full pb-4" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px" style={{ background: GOLD }} />
              <span className="text-[11px] tracking-[0.25em] uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{c.label}</span>
            </div>
            <h1 className="text-white leading-[1.1] mb-4" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: isRTL ? 700 : 800 }}>
              {c.h2}
            </h1>
            <p className="text-white/50 max-w-xl text-[15px]" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>
              {lang === "ar" ? "نتطلع إلى التواصل معك والإجابة على استفساراتك" : "We look forward to hearing from you and answering your inquiries"}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: IVORY }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            <FadeIn className="lg:col-span-3">
              <div className="p-8 lg:p-10" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}>
                <h2 className="text-xl font-semibold mb-2" style={{ color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
                  {lang === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
                </h2>
                <p className="text-[13px] mb-8" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>
                  {lang === "ar" ? "املأ النموذج وسنعود إليك في أقرب وقت" : "Fill out the form and we'll get back to you shortly"}
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[{ key: "name", label: c.fields.name, type: "text", icon: null },{ key: "email", label: c.fields.email, type: "email", icon: null },{ key: "phone", label: c.fields.phone, type: "tel", icon: null },{ key: "company", label: c.fields.company, type: "text", icon: null }].map(f => (
                      <div key={f.key} className="group relative">
                        <input type={f.type} required={f.key !== "company"} placeholder={f.label} value={form[f.key as keyof typeof form]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          className="w-full bg-transparent border px-4 py-3.5 text-[14px] outline-none transition-all duration-200"
                          style={{ borderColor: "rgba(0,0,0,0.08)", color: DARK, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}
                          onFocus={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.outline = `1px solid ${GOLD}`; }}
                          onBlur={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.outline = "none"; }} />
                      </div>
                    ))}
                  </div>
                  <div className="group relative">
                    <textarea required rows={5} placeholder={c.fields.msg} value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                      className="w-full bg-transparent border px-4 py-3.5 text-[14px] outline-none resize-none transition-all duration-200"
                      style={{ borderColor: "rgba(0,0,0,0.08)", color: DARK, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}
                      onFocus={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.outline = `1px solid ${GOLD}`; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.outline = "none"; }} />
                  </div>
                  <button type="submit"
                    className="flex items-center justify-center gap-3 w-full px-8 py-4 text-[14px] font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                    style={{ background: GOLD, color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
                    {sent ? <><Check size={16} />{lang === "ar" ? "تم الإرسال" : "Sent"}</> : <><Send size={14} />{c.fields.btn}</>}
                  </button>
                </form>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="lg:col-span-2">
              <div className="space-y-6">
                {c.info.map((item, i) => (
                  <div key={i} className="flex items-center gap-5 p-5" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <div className="w-11 h-11 flex items-center justify-center flex-shrink-0" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
                      <Phone size={16} style={{ color: GOLD }} />
                    </div>
                    <div>
                      <div className="text-[11px] tracking-widest uppercase mb-0.5" style={{ color: MUTED, fontFamily: "'Manrope',sans-serif" }}>{item.label}</div>
                      <div className="text-[14px] font-medium" style={{ color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{item.val}</div>
                    </div>
                  </div>
                ))}

                <div className="p-5" style={{ background: DARK }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={15} style={{ color: GOLD }} />
                    <span className="text-[11px] tracking-widest uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>
                      {lang === "ar" ? "ساعات العمل" : "Business Hours"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {hours.map((h, i) => (
                      <div key={i} className="flex items-center justify-between text-[13px]" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>{h.d}</span>
                        <span style={{ color: i === 1 ? "rgba(255,255,255,0.3)" : "#fff" }}>{h.h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" style={{ height: "380px", background: DARK }}>
        <img src={IMG.modernLobby} alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${DARK} 0%, transparent 50%)` }} />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full" dir={isRTL ? "rtl" : "ltr"}>
            <FadeIn>
              <div className="max-w-sm" style={{ background: `${DARK}e6`, backdropFilter: "blur(12px)", border: "1px solid rgba(192,154,79,0.15)", padding: "2rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} style={{ color: GOLD }} />
                  <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{c.info[3].label}</span>
                </div>
                <p className="text-white text-[15px] mb-4 leading-relaxed" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
                  {c.info[3].val}
                </p>
                <div className="flex items-center gap-2 text-[12px] tracking-wide cursor-pointer group" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}
                  onClick={() => window.open("https://maps.google.com/?q=Riyadh+Saudi+Arabia", "_blank")}>
                  <span>{lang === "ar" ? "عرض على الخريطة" : "View on Map"}</span>
                  <ChevronLeft size={12} className="group-hover:translate-x-0.5 transition-transform" style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
