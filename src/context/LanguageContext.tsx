"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, LocaleType, TranslationSchema } from "@/locales/translations";

interface LanguageContextType {
  language: LocaleType;
  setLanguage: (lang: LocaleType) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LocaleType>("en"); // Temporary fallback before detection
  const [isDetected, setIsDetected] = useState(false);

  useEffect(() => {
    try {
      // 1. Kiểm tra lựa chọn thủ công đã lưu trước đó của người dùng
      const savedLang = localStorage.getItem("cr1000_lang") as LocaleType | null;
      if (savedLang === "vi" || savedLang === "en") {
        setLanguageState(savedLang);
        if (typeof document !== "undefined") {
          document.documentElement.lang = savedLang;
        }
        setIsDetected(true);
        return;
      }

      // 2. Tự động nhận diện thiết bị / người dùng ở Việt Nam
      let isVietnam = false;

      // Kiểm tra múi giờ hệ thống (Timezone)
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
        if (
          timeZone.includes("ho_chi_minh") ||
          timeZone.includes("saigon") ||
          timeZone.includes("vietnam") ||
          timeZone.includes("indochina")
        ) {
          isVietnam = true;
        }
      } catch (e) {}

      // Kiểm tra ngôn ngữ trình duyệt (Browser Languages)
      if (!isVietnam && typeof navigator !== "undefined") {
        const navLangs = navigator.languages || [navigator.language || ""];
        for (const l of navLangs) {
          if (l && l.toLowerCase().startsWith("vi")) {
            isVietnam = true;
            break;
          }
        }
      }

      // Nếu ở Việt Nam -> Tiếng Việt (VI), ngược lại mặc định Quốc tế -> Tiếng Anh US (EN)
      const detected: LocaleType = isVietnam ? "vi" : "en";
      setLanguageState(detected);
      if (typeof document !== "undefined") {
        document.documentElement.lang = detected;
      }
      setIsDetected(true);
    } catch (e) {
      setLanguageState("en");
      if (typeof document !== "undefined") {
        document.documentElement.lang = "en";
      }
      setIsDetected(true);
    }
  }, []);

  const setLanguage = (lang: LocaleType) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("cr1000_lang", lang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
    } catch (e) {}
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
