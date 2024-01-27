import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-24 min-h-[90dvh]" id="contact">
      <div className="flex flex-col gap-5">
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.body')}</p>
      </div>
    </div>
  );
};

export default Contact;
