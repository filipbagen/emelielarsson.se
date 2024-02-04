import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionLayout from '../components/SectionLayout.tsx';
import Button from '../components/Button.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const { t } = useTranslation();

  const email = 'emelie00@hotmail.com';

  const copyToClipboard = (e) => {
    e.preventDefault(); // Prevent the default anchor action
    navigator.clipboard.writeText(email).then(
      () => {},
      (err) => {
        // Handle any errors
        console.error('Could not copy text: ', err);
      }
    );
  };

  // Prepare the content for the section
  const contactCards = (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col sm:flex-row gap-6">
        <a
          href="#"
          onClick={copyToClipboard}
          className="flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <h5>emelie00@hotmail.com</h5>
        </a>

        <a
          href="https://www.linkedin.com/in/emelie-larsson-820846226/"
          target="_blank"
          className="flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faLinkedin} />
          <h5>Emelie Larsson</h5>
        </a>
      </div>

      <Button variant="primary" href="mailto:emelie00@hotmail.com">
        {t('contact.title')}
      </Button>
    </div>
  );

  return (
    <div className="mb-24 sm:mt-64">
      <SectionLayout
        title={t('contact.title')}
        description={t('contact.body')}
        content={contactCards}
      />
    </div>
  );
};

export default Contact;
