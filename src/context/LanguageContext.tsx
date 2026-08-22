'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  dir: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start with a static default value to match SSR exactly
  const [language, setLanguageState] = useState<Language>('ar');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedLang = localStorage.getItem('bausalty_lang') as Language;
        if (savedLang === 'ar' || savedLang === 'en') {
          setLanguageState(savedLang);
        }
      } catch {
        // Ignore read error
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const dir: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', language);
      document.documentElement.dir = dir;
      document.documentElement.lang = language;
      if (document.body) {
        document.body.setAttribute('dir', dir);
        document.body.dir = dir;
      }
    }
  }, [language, dir]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('bausalty_lang', lang);
    } catch {
      // Ignore write error
    }
    if (typeof document !== 'undefined') {
      const nextDir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', nextDir);
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.dir = nextDir;
      document.documentElement.lang = lang;
      if (document.body) {
        document.body.setAttribute('dir', nextDir);
        document.body.dir = nextDir;
      }
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, toggleLanguage, mounted }}>
      <div
        id="bausalty-root"
        dir={dir}
        lang={language}
        className={`w-full min-h-full flex flex-col transition-all duration-150 ${
          dir === 'ltr' ? 'ltr text-left' : 'rtl text-right'
        }`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
