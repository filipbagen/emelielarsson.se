import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useFirestoreDoc } from '../hooks/useFirestore.ts';

// components
import Button from '../components/Button.tsx';

const ProfileCardSkeleton = () => (
  <div className="flex justify-center sm:h-[80dvh]">
    <div className="flex sm:flex-row flex-col items-center gap-8">
      {/* bg shape */}
      <div className="w-4/6 sm:h-[90%] h-[600px] bg-white absolute dark:bg-secondaryDark top-0 right-0 shadow-inner-lg rounded-bl-[180px] -z-10 sm:block"></div>

      <div className="flex flex-col gap-8 items-center rounded-xl shadow-lg bg-[#F8F3F0] dark:bg-black px-10 py-8 animate-pulse">
        {/* Profile image skeleton - matches the 48 size in the original */}
        <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-48 h-48" />

        <div className="flex flex-col gap-4 items-center w-56">
          {/* Name skeleton - two lines for first and last name */}
          <div className="flex flex-col gap-1">
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-32" />
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          </div>

          {/* Horizontal line - matches the w-14 in original */}
          <div className="h-1 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />

          {/* Title skeleton - matches the text-center whitespace-nowrap */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48" />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-82 items-start animate-pulse">
        {/* Heading skeleton - matches the Hello text size */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-80" />

        {/* Body text skeleton - two paragraphs matching the content */}
        <div className="space-y-4 w-full">
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        </div>

        {/* Resume button skeleton - matches Button component size */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-28 mt-2" />
      </div>
    </div>
  </div>
);

const ProfileCard = () => {
  const { currentLang } = useLanguage();
  const { data, loading, error } = useFirestoreDoc('websiteContent', 'intro');

  if (loading) return <ProfileCardSkeleton />;
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
