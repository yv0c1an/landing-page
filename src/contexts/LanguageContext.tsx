import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import zh from '@/locales/zh';
import en from '@/locales/en';
import ja from '@/locales/ja';
import ko from '@/locales/ko';
import th from '@/locales/th';

const translations = {
  zh,
  en,
  ja,
  ko,
  th,
} as const;

type LanguageType = keyof typeof translations;

type LanguageContextType = {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'zh',
  setLanguage: () => {},
  t: () => '',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageType>('zh');

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) return key;
    }
    
    return value as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext); 