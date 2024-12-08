import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import '../src/i18n.ts';
import './index.css';
import { LanguageProvider } from './LanguageContext.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
