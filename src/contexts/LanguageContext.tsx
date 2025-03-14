
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { languages, translations } from "@/locales/translations";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: any;
}

const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: translations.en,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    return savedLanguage || "en";
  });

  // Get translations for current language
  const t = translations[language as keyof typeof translations] || translations.en;

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
    // Dispatch an event to notify other components about the language change
    const event = new CustomEvent("languageChange", { detail: { language } });
    window.dispatchEvent(event);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export { languages, translations };
