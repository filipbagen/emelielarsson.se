import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  // Detect the browser language
  const browserLanguage = navigator.language.split('-')[0]; // Get the language code without the region code
  const defaultLanguage = ['en', 'sv'].includes(browserLanguage)
    ? browserLanguage
    : 'en';

  const [currentLang, setCurrentLang] = useState(defaultLanguage);

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
