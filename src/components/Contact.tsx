import React from 'react';
import SectionLayout from '../components/SectionLayout.tsx';
import Button from '../components/Button.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useFirestoreDoc } from '../hooks/useFirestore.ts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const { currentLang } = useLanguage();
  const { data, loading, error } = useFirestoreDoc('websiteContent', 'contact');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const contactCards = (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col sm:flex-row gap-6">
        <div
          // href="#"
          // onClick={copyToClipboard}
          className="flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <h5>emelie00@hotmail.com</h5>
        </div>

        <a
          href="https://www.linkedin.com/in/emelie-larsson-820846226/"
          target="_blank"
          rel="noreferrer"
          className="flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faLinkedin} />
          <h5>Emelie Larsson</h5>
        </a>
      </div>

      <Button variant="primary" href="mailto:emelie00@hotmail.com">
        {data[currentLang].title}
      </Button>
    </div>
  );

  return (
    <div className="mb-24 sm:mt-64">
      <SectionLayout
        title={data[currentLang].title}
        description={data[currentLang].description}
        content={contactCards}
      />
    </div>
  );
};

export default Contact;
