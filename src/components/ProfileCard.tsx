import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useFirestoreDoc } from '../hooks/useFirestore.ts';

// components
import Button from '../components/Button.tsx';

const ProfileCard = () => {
  const { currentLang } = useLanguage();
  const { data, loading, error } = useFirestoreDoc('websiteContent', 'intro');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex justify-center sm:h-[80dvh]">
      <div className="flex sm:flex-row flex-col items-center gap-8">
        {/* bg shape */}
        <div className="w-4/6 sm:h-[90%] h-[600px] bg-white absolute dark:bg-secondaryDark top-0 right-0 shadow-inner-lg rounded-bl-[180px] -z-10 sm:block"></div>

        <div className="flex flex-col gap-8 items-center rounded-xl shadow-lg bg-[#F8F3F0] dark:bg-black px-10 py-8">
          <img
            className="rounded-full object-cover w-48 h-48"
            src="/assets/img/profile.jpg"
            alt=""
          />
          <div className="flex flex-col gap-4 items-center w-56">
            <h1 className="font-sans text-center text-3xl">
              Emelie <br />
              Larsson
            </h1>

            {/* Horizontal line */}
            <div className="h-1 w-14 rounded-full bg-secondary"></div>

            <p className="text-center whitespace-nowrap">
              {data[currentLang]?.title}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-82 items-start">
          <h1>{data[currentLang]?.heading}</h1>
          <p className="pre-wrap">{data[currentLang]?.body}</p>

          <RouterLink to="/resume">
            <Button variant="primary">
              {currentLang === 'en' ? 'Resume' : 'CV'}
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
