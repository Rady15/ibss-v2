import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Link, useNavigate } from "react-router";
import {
  Menu, X, Phone, Mail, MapPin, MessageCircle,
  ArrowUpRight, Star, Send, ChevronDown
} from "lucide-react";
import { GOLD, DARK, IVORY, MUTED, IMG, PRODUCTS, PROJECTS, CLIENTS, type T } from "../../lib/data";
import { useLang } from "../../lib/LangContext";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="block w-8 h-px" style={{ background: GOLD }} />
      <span className="text-xs tracking-[0.25em] uppercase font-medium" style={{ color: light ? "rgba(192,154,79,0.9)" : GOLD, fontFamily: "'Manrope', sans-serif" }}>{text}</span>
    </div>
  );
}

type TType = (typeof T)["ar"];

function ServicesDropdown({ t, isRTL }: { t: TType; isRTL: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const services = t.services.items;

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
        {t.nav[2]}
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

export function NavbarPart({ scrolled, t }: { scrolled: boolean; t: TType }) {
  const { lang, setLang, isRTL } = useLang();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const services = t.services.items;

  const navLinks = [
    { label: t.nav[0], to: "/" },
    { label: t.nav[1], to: "/about" },
    { label: t.nav[3], to: "/products" },
    { label: t.nav[4], to: "/projects" },
    { label: t.nav[5], to: "/clients" },
    { label: lang === "ar" ? "المدونة" : "Blog", to: "/blog" },
    { label: t.nav[6], to: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: scrolled ? "rgba(12,11,9,0.97)" : "transparent", borderBottom: scrolled ? "1px solid rgba(192,154,79,0.15)" : "none", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex flex-col items-start gap-0.5 group">
            <span className="text-white font-black text-xl tracking-widest" style={{ fontFamily: "'Manrope',sans-serif", letterSpacing:"0.18em" }}>IBSS</span>
            <span className="text-[10px] tracking-[0.35em] uppercase font-light" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif", letterSpacing:"0.3em" }}>INNOVATIONS</span>
          </Link>
          <div className="hidden lg:flex items-center gap-8" dir={isRTL ? "rtl" : "ltr"}>
            {navLinks.map((link, i) => (
              <Link key={i} to={link.to} className="text-[13px] font-light text-white/70 hover:text-white transition-colors duration-200 tracking-wide" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{link.label}</Link>
            ))}
            <ServicesDropdown t={t} isRTL={isRTL} />
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
            <Link to="/" onClick={() => setOpen(false)} className="text-white font-black text-xl tracking-widest" style={{ fontFamily: "'Manrope',sans-serif", letterSpacing:"0.18em" }}>IBSS</Link>
            <button onClick={() => setOpen(false)} className="text-white p-1"><X size={24} /></button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-6" dir={isRTL ? "rtl" : "ltr"}>
            {navLinks.map((link, i) => (
              <Link key={i} to={link.to} onClick={() => setOpen(false)} className="text-2xl font-light text-white/80 hover:text-white transition-colors" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{link.label}</Link>
            ))}
            <div className="flex flex-col items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(192,154,79,0.15)" }}>
              <span className="text-[11px] tracking-widest uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{lang === "ar" ? "خدماتنا" : "Services"}</span>
              {services.map((s, i) => (
                <button key={i} onClick={() => { setOpen(false); navigate(`/services/${encodeURIComponent(s.t)}`); }}
                  className="text-base font-light text-white/60 hover:text-white transition-colors"
                  style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{s.t}</button>
              ))}
            </div>
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-4 px-8 py-3 text-base font-medium" style={{ background: GOLD, color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{t.cta}</Link>
          </div>
        </motion.div>
      )}
    </>
  );
}

export function HeroSection({ t }: { t: TType }) {
  const { isRTL } = useLang();
  const hero = t.hero;
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end overflow-hidden" style={{ background: DARK }}>
      <div className="absolute inset-0">
        <img src={IMG.hero} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK} 30%, rgba(12,11,9,0.3) 100%)` }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-40" style={{ background: `linear-gradient(to bottom, ${DARK}, transparent)` }} />
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-10 pb-20 lg:pb-28">
        <div dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-3 mb-8">
            <span className="w-12 h-px" style={{ background: GOLD }} />
            <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{hero.eyebrow}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-white leading-[1.1] mb-6 max-w-3xl"
            style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)", fontWeight: isRTL ? 700 : 800, whiteSpace: "pre-line" }}>
            {hero.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/60 mb-10 max-w-xl text-base lg:text-lg leading-relaxed" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>
            {hero.sub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }} className="flex flex-wrap gap-4 mb-16 lg:mb-24">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-3 px-8 py-4 text-[15px] font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: GOLD, color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
              {hero.btn1}<ArrowUpRight size={16} />
            </button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-3 px-8 py-4 text-[15px] font-medium border transition-all duration-200 hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "white", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
              {hero.btn2}
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.85 }} className="flex flex-wrap gap-px" style={{ borderTop: "1px solid rgba(192,154,79,0.2)" }}>
            {hero.stats.map((s, i) => (
              <div key={i} className="flex-1 min-w-[120px] pt-6 px-6 first:pl-0" style={{ borderRight: i < hero.stats.length - 1 ? "1px solid rgba(192,154,79,0.15)" : "none" }}>
                <div className="text-4xl font-bold mb-1" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif", fontWeight: 700 }}>{s.v}</div>
                <div className="text-xs text-white/50 tracking-wide" style={{ fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ t }: { t: TType }) {
  const { isRTL } = useLang();
  const a = t.about;
  return (
    <section id="about" className="py-24 lg:py-36 overflow-hidden" style={{ background: IVORY }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center" dir={isRTL ? "rtl" : "ltr"}>
          <FadeIn className="relative">
            <div className="relative">
              <img src={IMG.about} alt="" className="w-full object-cover" style={{ height: "520px" }} />
              <div className="absolute -bottom-10 lg:bottom-auto lg:-top-10 end-0 lg:-end-10 w-48 lg:w-64 border-4" style={{ borderColor: IVORY }}>
                <img src={IMG.aboutAccent} alt="" className="w-full object-cover" style={{ height: "200px" }} />
              </div>
              <div className="absolute start-6 bottom-6 px-4 py-3" style={{ background: GOLD }}>
                <div className="text-xs tracking-widest uppercase mb-0.5" style={{ color: DARK, fontFamily: "'Manrope',sans-serif" }}>EST.</div>
                <div className="text-2xl font-black" style={{ color: DARK, fontFamily: "'Manrope',sans-serif" }}>2008</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="pt-10 lg:pt-0">
            <SectionLabel text={a.label} />
            <h2 className="mb-6 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>{a.h2}</h2>
            <p className="leading-loose mb-12 text-[15px]" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{a.body}</p>
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
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function WhyUsSection({ t }: { t: TType }) {
  const { isRTL } = useLang();
  const w = t.why;
  return (
    <section className="py-24 lg:py-36" style={{ background: DARK }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
        <FadeIn className="mb-16 max-w-2xl">
          <SectionLabel text={w.label} light />
          <h2 className="text-white leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: isRTL ? 700 : 800 }}>{w.h2}</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: "1px solid rgba(192,154,79,0.1)" }}>
          {w.items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="group p-8 lg:p-10 transition-all duration-300 cursor-default"
                style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(192,154,79,0.1)", borderRight: "1px solid rgba(192,154,79,0.1)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(192,154,79,0.07)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}>
                <div className="text-3xl font-thin mb-6 select-none" style={{ color: "rgba(192,154,79,0.35)", fontFamily: "'Manrope',sans-serif" }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-white font-semibold mb-3 text-lg" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{item.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{item.d}</p>
                <div className="mt-6 w-8 h-px transition-all duration-300 group-hover:w-16" style={{ background: GOLD }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ t }: { t: TType }) {
  const { isRTL } = useLang();
  const s = t.services;
  return (
    <section id="services" className="py-24 lg:py-36" style={{ background: IVORY }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel text={s.label} />
            <h2 className="leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>{s.h2}</h2>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {s.items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group overflow-hidden cursor-default" style={{ background: "#fff" }}>
                <div className="overflow-hidden relative" style={{ height: "240px", background: "#e8e4dc" }}>
                  <img src={item.img} alt={item.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ background: "rgba(12,11,9,0.5)" }} />
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[17px]" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", color: DARK }}>{item.t}</h3>
                    <ArrowUpRight size={16} style={{ color: GOLD }} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                  <p className="text-[13px] leading-relaxed" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{item.d}</p>
                  <div className="mt-5 w-0 h-px group-hover:w-full transition-all duration-500" style={{ background: GOLD }} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductsSection({ t }: { t: TType }) {
  const { isRTL } = useLang();
  const p = t.products;
  const catMap: Record<string, string> = { [p.cats[0]]: "all", [p.cats[1]]: "executive", [p.cats[2]]: "chairs", [p.cats[3]]: "meeting", [p.cats[4]]: "reception", [p.cats[5]]: "workstation", [p.cats[6]]: "storage" };
  const [active, setActive] = useState(p.cats[0]);
  const filtered = catMap[active] === "all" ? PRODUCTS : PRODUCTS.filter(pr => pr.cat === catMap[active]);
  return (
    <section id="products" className="py-24 lg:py-36" style={{ background: DARK }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
        <FadeIn className="mb-12">
          <SectionLabel text={p.label} light />
          <h2 className="text-white leading-tight mb-10" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: isRTL ? 700 : 800 }}>{p.h2}</h2>
          <div className="flex flex-wrap gap-2">
            {p.cats.map((c, i) => (
              <button key={i} onClick={() => setActive(c)} className="px-4 py-2 text-[12px] tracking-wide transition-all duration-200"
                style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", background: active === c ? GOLD : "transparent", color: active === c ? DARK : "rgba(255,255,255,0.5)", border: active === c ? `1px solid ${GOLD}` : "1px solid rgba(255,255,255,0.12)" }}>{c}</button>
            ))}
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((pr, i) => (
            <FadeIn key={pr.id} delay={i * 0.07}>
              <div className="group overflow-hidden cursor-default" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="overflow-hidden relative" style={{ height: "220px", background: "#1a1816" }}>
                  <img src={pr.img} alt={pr.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-3 start-3 px-2 py-1 text-[10px] tracking-widest uppercase" style={{ background: GOLD, color: DARK, fontFamily: "'Manrope',sans-serif" }}>{pr.cat}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white mb-1 text-[15px]" style={{ fontFamily: "'Manrope',sans-serif" }}>{pr.title}</h3>
                  <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{pr.sub}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({ t }: { t: TType }) {
  const { isRTL, lang } = useLang();
  const p = t.projects;
  const filterMap: Record<string, string> = { [p.filters[0]]: "all", [p.filters[1]]: "corporate", [p.filters[2]]: "healthcare", [p.filters[3]]: "government", [p.filters[4]]: "hospitality" };
  const [active, setActive] = useState(p.filters[0]);
  const filtered = filterMap[active] === "all" ? PROJECTS : PROJECTS.filter(pr => pr.cat === filterMap[active]);
  return (
    <section id="projects" className="py-24 lg:py-36" style={{ background: IVORY }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <SectionLabel text={p.label} />
            <h2 className="leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>{p.h2}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {p.filters.map((f, i) => (
              <button key={i} onClick={() => setActive(f)} className="px-4 py-2 text-[12px] tracking-wide transition-all duration-200 border"
                style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", background: active === f ? GOLD : "transparent", color: active === f ? DARK : MUTED, borderColor: active === f ? GOLD : "rgba(26,24,22,0.15)" }}>{f}</button>
            ))}
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filtered.map((pr, i) => (
            <FadeIn key={pr.id} delay={i * 0.08} className={i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}>
              <div className="group relative overflow-hidden cursor-default" style={{ height: i === 0 ? "440px" : "300px", background: "#1a1816" }}>
                <img src={pr.img} alt={pr.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 transition-opacity duration-300" style={{ background: "rgba(12,11,9,0.35)" }} />
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300" style={{ background: "linear-gradient(to top, rgba(12,11,9,0.9) 0%, transparent 60%)" }}>
                  <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{pr.year} — {pr.area}</div>
                  <h3 className="text-white font-semibold text-lg mb-1" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{isRTL ? pr.title : pr.sub}</h3>
                  <p className="text-[12px] text-white/50" style={{ fontFamily: "'Manrope',sans-serif" }}>{isRTL ? pr.sub : pr.title}</p>
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[11px] tracking-widest uppercase" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{lang === "ar" ? "عرض المشروع" : "View Project"}</span>
                    <ArrowUpRight size={12} style={{ color: GOLD }} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientsSection({ t }: { t: TType }) {
  const { isRTL } = useLang();
  const c = t.clients;
  return (
    <section id="clients" className="py-24 lg:py-36" style={{ background: DARK }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel text={c.label} light />
          <h2 className="text-white leading-tight mb-4" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: isRTL ? 700 : 800 }}>{c.h2}</h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{c.sub}</p>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px" style={{ border: "1px solid rgba(192,154,79,0.1)" }}>
          {CLIENTS.map((cl, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className="flex items-center justify-center px-6 py-8 transition-all duration-200 cursor-default"
                style={{ borderRight: "1px solid rgba(192,154,79,0.1)", borderBottom: "1px solid rgba(192,154,79,0.1)", background: "rgba(255,255,255,0.01)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(192,154,79,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"}>
                <span className="text-sm font-medium text-center" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Manrope',sans-serif", letterSpacing: "0.05em" }}>{cl}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection({ t }: { t: TType }) {
  const { isRTL } = useLang();
  const p = t.process;
  return (
    <section className="py-24 lg:py-36" style={{ background: IVORY }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
        <FadeIn className="mb-16 max-w-2xl">
          <SectionLabel text={p.label} />
          <h2 className="leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>{p.h2}</h2>
        </FadeIn>
        <div className="hidden lg:block relative">
          <div className="absolute top-8 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, ${GOLD}, rgba(192,154,79,0.2))` }} />
          <div className="grid grid-cols-6 gap-0">
            {p.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="pt-16 px-6 relative group">
                  <div className="absolute top-5 start-6 w-6 h-6 rounded-full flex items-center justify-center -translate-y-1/2 transition-all duration-200 group-hover:scale-110"
                    style={{ background: i === 0 ? GOLD : IVORY, border: `1px solid ${GOLD}` }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                  </div>
                  <div className="text-5xl font-thin mb-4 select-none" style={{ color: "rgba(192,154,79,0.18)", fontFamily: "'Manrope',sans-serif" }}>{step.n}</div>
                  <h3 className="font-semibold mb-2 text-[15px]" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", color: DARK }}>{step.t}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{step.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <div className="lg:hidden space-y-0">
          {p.steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="flex gap-6 pb-10 relative" style={{ borderLeft: isRTL ? "none" : "1px solid rgba(192,154,79,0.3)", borderRight: isRTL ? "1px solid rgba(192,154,79,0.3)" : "none", paddingLeft: isRTL ? 0 : "28px", paddingRight: isRTL ? "28px" : 0 }}>
                <div className="absolute top-0 w-2 h-2 rounded-full" style={{ background: GOLD, left: isRTL ? "auto" : "-5px", right: isRTL ? "-5px" : "auto" }} />
                <div>
                  <div className="text-2xl font-thin mb-2 select-none" style={{ color: "rgba(192,154,79,0.4)", fontFamily: "'Manrope',sans-serif" }}>{step.n}</div>
                  <h3 className="font-semibold mb-1" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", color: DARK }}>{step.t}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{step.d}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({ t }: { t: TType }) {
  const { isRTL } = useLang();
  const te = t.testimonials;
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden" style={{ background: DARK }}>
      <div className="absolute inset-0 pointer-events-none select-none" style={{ background: `radial-gradient(ellipse 60% 60% at 50% 0%, rgba(192,154,79,0.06) 0%, transparent 70%)` }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10" dir={isRTL ? "rtl" : "ltr"}>
        <FadeIn className="mb-16 text-center">
          <SectionLabel text={te.label} light />
          <h2 className="text-white leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: isRTL ? 700 : 800 }}>{te.h2}</h2>
        </FadeIn>
        <div className="grid lg:grid-cols-3 gap-6">
          {te.items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 lg:p-10 flex flex-col h-full" style={{ border: "1px solid rgba(192,154,79,0.12)", background: "rgba(255,255,255,0.02)" }}>
                <div className="text-6xl font-serif mb-6 leading-none select-none" style={{ color: GOLD, fontFamily: "Georgia, serif", lineHeight: 0.8, opacity: 0.5 }}>"</div>
                <p className="text-[15px] leading-loose flex-1 mb-8" style={{ color: "rgba(255,255,255,0.65)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{item.q}</p>
                <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, j) => (<Star key={j} size={12} fill={GOLD} color={GOLD} />))}</div>
                <div>
                  <div className="font-semibold text-white text-[14px]" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{item.n}</div>
                  <div className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{item.r}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection({ t }: { t: TType }) {
  const { isRTL } = useLang();
  const cta = t.ctaSection;
  return (
    <section className="relative overflow-hidden py-24 lg:py-36" style={{ background: "#0f0e0c" }}>
      <div className="absolute inset-0">
        <img src={IMG.panorama} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0" style={{ background: "rgba(12,11,9,0.7)" }} />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center" dir={isRTL ? "rtl" : "ltr"}>
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-12 h-px" style={{ background: GOLD }} />
              <span className="w-2 h-2 rotate-45 inline-block" style={{ background: GOLD }} />
              <span className="w-12 h-px" style={{ background: GOLD }} />
            </div>
            <h2 className="text-white mb-6 leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.7rem, 4vw, 3.2rem)", fontWeight: isRTL ? 700 : 800 }}>{cta.h2}</h2>
            <p className="mb-10 text-[15px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif", fontWeight: 300 }}>{cta.sub}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-10 py-4 text-[15px] font-medium transition-all duration-200 hover:opacity-90"
                style={{ background: GOLD, color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{cta.btn1}</button>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-10 py-4 text-[15px] font-medium border transition-all duration-200 hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "white", fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>{cta.btn2}</button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function ContactSection({ t }: { t: TType }) {
  const { isRTL, lang } = useLang();
  const c = t.contact;
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", msg: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); setForm({ name: "", email: "", phone: "", company: "", msg: "" }); };
  const icons: Record<string, React.ReactNode> = { phone: <Phone size={16} style={{ color: GOLD }} />, mail: <Mail size={16} style={{ color: GOLD }} />, whatsapp: <MessageCircle size={16} style={{ color: GOLD }} />, map: <MapPin size={16} style={{ color: GOLD }} /> };
  return (
    <section id="contact" className="py-24 lg:py-36" style={{ background: IVORY }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10" dir={isRTL ? "rtl" : "ltr"}>
        <FadeIn className="mb-16">
          <SectionLabel text={c.label} />
          <h2 className="leading-tight" style={{ fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif", fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: isRTL ? 700 : 800, color: DARK }}>{c.h2}</h2>
        </FadeIn>
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <FadeIn className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {[{ key: "name", label: c.fields.name, type: "text" },{ key: "email", label: c.fields.email, type: "email" },{ key: "phone", label: c.fields.phone, type: "tel" },{ key: "company", label: c.fields.company, type: "text" }].map(f => (
                  <div key={f.key} className="relative">
                    <input type={f.type} required={f.key !== "company"} placeholder=" " value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full bg-transparent border-b pt-5 pb-2 text-[14px] outline-none transition-colors duration-200 peer"
                      style={{ borderColor: "rgba(26,24,22,0.2)", color: DARK, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}
                      onFocus={e => e.currentTarget.style.borderColor = GOLD}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(26,24,22,0.2)"} />
                    <label className="absolute top-0 text-[12px] tracking-wide" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{f.label}</label>
                  </div>
                ))}
              </div>
              <div className="relative">
                <label className="text-[12px] tracking-wide block mb-2" style={{ color: MUTED, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{c.fields.msg}</label>
                <textarea required rows={5} value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                  className="w-full bg-transparent border-b text-[14px] outline-none resize-none transition-colors duration-200"
                  style={{ borderColor: "rgba(26,24,22,0.2)", color: DARK, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}
                  onFocus={e => e.currentTarget.style.borderColor = GOLD}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(26,24,22,0.2)"} />
              </div>
              <button type="submit" className="flex items-center gap-3 px-8 py-4 text-[14px] font-medium transition-all duration-200 hover:opacity-90"
                style={{ background: GOLD, color: DARK, fontFamily: isRTL ? "'Cairo',sans-serif" : "'Manrope',sans-serif" }}>
                {sent ? (lang === "ar" ? "تم الإرسال ✓" : "Sent ✓") : c.fields.btn}{!sent && <Send size={14} />}
              </button>
            </form>
          </FadeIn>
          <FadeIn delay={0.15} className="lg:col-span-2">
            <div className="space-y-0 mb-10">
              {c.info.map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-6" style={{ borderBottom: "1px solid rgba(26,24,22,0.08)" }}>
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ border: "1px solid rgba(192,154,79,0.3)" }}>{icons[item.icon]}</div>
                  <div>
                    <div className="text-[11px] tracking-widest uppercase mb-1" style={{ color: MUTED, fontFamily: "'Manrope',sans-serif" }}>{item.label}</div>
                    <div className="text-[15px]" style={{ color: DARK, fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-hidden relative" style={{ height: "200px", background: "#e4e0d6" }}>
              <img src={IMG.lobby} alt="" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 py-2 text-[12px] tracking-wide" style={{ background: DARK, color: GOLD, fontFamily: "'Manrope',sans-serif" }}>
                  {lang === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function FooterSection({ t }: { t: TType }) {
  const { isRTL, lang } = useLang();
  const f = t.footer;
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
            <div className="flex gap-3">
              {["in","tw","ig"].map((s, i) => (
                <div key={i} className="w-8 h-8 flex items-center justify-center text-[11px] cursor-pointer transition-all duration-200"
                  style={{ border: "1px solid rgba(192,154,79,0.2)", color: "rgba(255,255,255,0.4)", fontFamily: "'Manrope',sans-serif" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(192,154,79,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>{s}</div>
              ))}
            </div>
          </div>
          {f.cols.map((col, ci) => (
            <div key={ci}>
              <h4 className="text-[12px] tracking-[0.2em] uppercase mb-6" style={{ color: GOLD, fontFamily: "'Manrope',sans-serif" }}>{col.h}</h4>
              <ul className="space-y-3">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <button className="text-[13px] transition-colors duration-200" style={{ color: "rgba(255,255,255,0.4)", fontFamily: isRTL ? "'Tajawal',sans-serif" : "'Manrope',sans-serif" }}
                      onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>{link}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4" dir={isRTL ? "rtl" : "ltr"}>
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
