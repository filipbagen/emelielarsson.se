import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionLayout from '../components/SectionLayout.tsx';

const Contact = () => {
  const { t } = useTranslation();

  // Prepare the content for the section
  const contactCards = <></>;

  return (
    <SectionLayout
      title={t('contact.title')}
      description={t('contact.body')}
      content={contactCards}
    />
  );
};

export default Contact;
