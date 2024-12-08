import React, { createContext, useState, useContext } from 'react';

interface LanguageContextType {
  currentLang: string;
  setCurrentLang: React.Dispatch<React.SetStateAction<string>>;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  // Detect the browser language
  const browserLanguage = navigator.language.split('-')[0]; // Get the language code without the region code
  const defaultLanguage = ['en', 'sv'].includes(browserLanguage)
    ? browserLanguage
    : 'sv';

  const [currentLang, setCurrentLang] = useState(defaultLanguage);

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// export const useLanguage = () => useContext(LanguageContext);

// Fix for languageContext.tsx
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
