import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { GOLD, DARK, IVORY, T } from "../lib/data";
import { useLang } from "../lib/LangContext";

function ServicesDropdown({ isRTL }: { isRTL: boolean }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const services = T[lang].services.items;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="flex items-center gap-1.5 text-[13px] font-light transition-colors duration-200 tracking-wide"
        style={{ color: "rgba(255,255,255,0.7)", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}
        onMouseEnter={e => e.currentTarget.style.color = GOLD}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
      >
        {lang === "ar" ? "خدماتنا" : "Services"}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full start-0 mt-2 w-56 py-2" style={{ background: "rgba(12,11,9,0.97)", border: "1px solid rgba(192,154,79,0.15)", backdropFilter: "blur(12px)" }}>
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => { setOpen(false); navigate(`/services/${encodeURIComponent(s.t)}`); }}
              className="w-full text-left px-5 py-2.5 text-[13px] transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(192,154,79,0.1)"; e.currentTarget.style.color = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            >
              {s.t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, isRTL } = useLang();
  const t = T[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const services = T[lang].services.items;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const navLinks = [
    { label: lang === "ar" ? "الرئيسية" : "Home", to: "/" },
    { label: lang === "ar" ? "من نحن" : "About", to: "/about" },
    { label: lang === "ar" ? "منتجاتنا" : "Products", to: "/products" },
    { label: lang === "ar" ? "أعمالنا" : "Projects", to: "/projects" },
    { label: lang === "ar" ? "عملاؤنا" : "Clients", to: "/clients" },
    { label: lang === "ar" ? "المدونة" : "Blog", to: "/blog" },
    { label: lang === "ar" ? "تواصل معنا" : "Contact", to: "/contact" },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: isRTL ? "'Cairo', 'Tajawal', sans-serif" : "'Manrope', sans-serif", background: IVORY, overflowX: "hidden" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: scrolled ? "rgba(12,11,9,0.97)" : "transparent", borderBottom: scrolled ? "1px solid rgba(192,154,79,0.15)" : "none", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex flex-col items-start gap-0.5 group">
            <span className="text-white font-black text-xl tracking-widest" style={{ fontFamily: "'Manrope',sans-serif", letterSpacing:"0.18em" }}>IBSS</span>
            <span className="text-[10px] tracking-[0.35em] uppercase font-light" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif", letterSpacing:"0.3em" }}>INNOVATIONS</span>
          </Link>
          <div className="hidden lg:flex items-center gap-8" dir={isRTL ? "rtl" : "ltr"}>
            {navLinks.map((link, i) => (
              <Link key={i} to={link.to}
                className="text-[13px] font-light transition-colors duration-200 tracking-wide"
                style={{ color: pathname === link.to ? GOLD : "rgba(255,255,255,0.7)", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = pathname === link.to ? GOLD : "rgba(255,255,255,0.7)"}>
                {link.label}
              </Link>
            ))}
            <ServicesDropdown isRTL={isRTL} />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="text-xs tracking-widest font-medium border px-3 py-1.5 transition-all duration-200" style={{ color: GOLD, borderColor: "rgba(192,154,79,0.4)", fontFamily: "'Manrope',sans-serif" }}>{t.langToggle}</button>
            <Link to="/contact" className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium transition-all duration-200 hover:opacity-90" style={{ background: GOLD, color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{t.cta}</Link>
            <button onClick={() => setOpen(true)} className="lg:hidden text-white p-1"><Menu size={22} /></button>
          </div>
        </div>
      </nav>

      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex flex-col" style={{ background: DARK }}>
          <div className="flex items-center justify-between px-6 h-20">
            <Link to="/" className="text-white font-black text-xl tracking-widest" style={{ fontFamily: "'Manrope',sans-serif", letterSpacing:"0.18em" }}>IBSS</Link>
            <button onClick={() => setOpen(false)} className="text-white p-1"><X size={24} /></button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-6" dir={isRTL ? "rtl" : "ltr"}>
            {navLinks.map((link, i) => (
              <Link key={i} to={link.to} onClick={() => setOpen(false)}
                className="text-2xl font-light text-white/80 hover:text-white transition-colors"
                style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{link.label}</Link>
            ))}
            {/* Mobile services submenu */}
            <div className="flex flex-col items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(192,154,79,0.15)" }}>
              <span className="text-[11px] tracking-widest uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{lang === "ar" ? "خدماتنا" : "Services"}</span>
              {services.map((s, i) => (
                <button key={i} onClick={() => { setOpen(false); navigate(`/services/${encodeURIComponent(s.t)}`); }}
                  className="text-base font-light text-white/60 hover:text-white transition-colors"
                  style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{s.t}</button>
              ))}
            </div>
            <Link to="/contact" onClick={() => setOpen(false)}
              className="mt-4 px-8 py-3 text-base font-medium" style={{ background: GOLD, color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{t.cta}</Link>
          </div>
        </motion.div>
      )}

      <main className="pt-20">{children}</main>

      <div className="fixed end-0 top-1/2 -translate-y-1/2 z-[9999] hidden lg:flex flex-col">
        <a href="#contact" className="flex flex-col items-center justify-center w-[72px] h-[86px] text-white transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: "rgb(139, 195, 74)", borderRadius: "12px 0px 0px", marginTop: "0px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle mb-1.5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
          <span className="text-[10px] leading-tight text-center px-1" style={{ fontFamily: "'Cairo', sans-serif" }}>تواصل معنا</span>
        </a>
        <a href="#catalog" className="flex flex-col items-center justify-center w-[72px] h-[86px] text-white transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: "rgb(30, 46, 90)", borderRadius: "0px", marginTop: "-1px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open mb-1.5"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
          <span className="text-[10px] leading-tight text-center px-1" style={{ fontFamily: "'Cairo', sans-serif" }}>تحميل الكتالوج</span>
        </a>
        <a href="#support" className="flex flex-col items-center justify-center w-[72px] h-[86px] text-white transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: "rgb(15, 35, 71)", borderRadius: "0px 0px 12px", marginTop: "-1px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones mb-1.5"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path></svg>
          <span className="text-[10px] leading-tight text-center px-1" style={{ fontFamily: "'Cairo', sans-serif" }}>الدعم الفني</span>
        </a>
      </div>

      <FooterContent lang={lang} isRTL={isRTL} />
    </div>
  );
}

function FooterContent({ lang, isRTL }: { lang: string; isRTL: boolean }) {
  const t = T[lang as keyof typeof T];
  const f = t.footer;
  const services = t.services.items;
  const links = [
    { label: lang === "ar" ? "الرئيسية" : "Home", to: "/" },
    { label: lang === "ar" ? "من نحن" : "About", to: "/about" },
    { label: lang === "ar" ? "منتجاتنا" : "Products", to: "/products" },
    { label: lang === "ar" ? "أعمالنا" : "Projects", to: "/projects" },
    { label: lang === "ar" ? "المدونة" : "Blog", to: "/blog" },
    { label: lang === "ar" ? "تواصل معنا" : "Contact", to: "/contact" },
  ];
  return (
    <footer style={{ background: "#080807" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
        <div className="py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16" style={{ borderBottom: "1px solid rgba(192,154,79,0.1)" }}>
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-0.5 mb-5">
              <span className="text-white font-black text-xl tracking-widest" style={{ fontFamily: "'Manrope',sans-serif", letterSpacing:"0.18em" }}>IBSS</span>
              <span className="text-[10px] tracking-[0.35em] uppercase font-light" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>INNOVATIONS</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{f.tagline}</p>
          </div>
          <div>
            <h4 className="text-[12px] tracking-[0.2em] uppercase mb-6" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{lang === "ar" ? "روابط سريعة" : "Quick Links"}</h4>
            <ul className="space-y-3">
              {links.map((link, i) => (
                <li key={i}><Link to={link.to} className="text-[13px] transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.4)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] tracking-[0.2em] uppercase mb-6" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{lang === "ar" ? "خدماتنا" : "Services"}</h4>
            <ul className="space-y-3">
              {services.map((s, i) => (
                <li key={i}><Link to={`/services/${encodeURIComponent(s.t)}`} className="text-[13px] transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.4)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{s.t}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{f.copy}</span>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full" style={{ background: GOLD }} />
            <span className="text-[11px] tracking-widest uppercase" style={{ color: "rgba(192,154,79,0.5)", fontFamily: "'Manrope',sans-serif" }}>DESIGNED WITH PRECISION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
