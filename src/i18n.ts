import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nBackend from 'i18next-http-backend'; // Import the backend

const getCurrentHost =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://emelielarsson.se';

// Detect the browser language
const browserLanguage = navigator.language.split('-')[0]; // Get the language code without the region code
const defaultLanguage = ['en', 'sv'].includes(browserLanguage)
  ? browserLanguage
  : 'en';

i18n
  .use(i18nBackend) // Use the backend
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: defaultLanguage, // Set the default language based on the browser's language
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
    },
  });

export default i18n;
