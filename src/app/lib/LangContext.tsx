import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Lang } from "./data";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  isRTL: boolean;
};

const LangContext = createContext<LangContextType>({ lang: "ar", setLang: () => {}, isRTL: true });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang, isRTL }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
