
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import en from '@/locales/en.json';
import or from '@/locales/or.json';
import hi from '@/locales/hi.json';

const translations = {
  en,
  or,
  hi,
};

type Language = 'en' | 'or' | 'hi';

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

function getNestedValue(obj: any, key: string): string {
  return key.split('.').reduce((acc, part) => acc && acc[part], obj) || key;
}

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && translations[storedLanguage]) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translationSet = translations[language] || translations.en;
    return getNestedValue(translationSet, key);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
