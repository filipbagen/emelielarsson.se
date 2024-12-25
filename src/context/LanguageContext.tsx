import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LanguageContextType {
  currentLang: string;
  setCurrentLang: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLang, setCurrentLang] = useState<string>('en');

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
