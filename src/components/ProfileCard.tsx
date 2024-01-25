import React from 'react';

// components
import Button from '../components/Button.tsx';

const ProfileCard = () => {
  return (
    <div className="flex justify-center h-[90dvh]">
      <div className="flex items-center gap-8">
        {/* bg shape */}
        <div className="w-4/6 h-[90%] bg-white absolute dark:bg-secondaryDark top-0 right-0 shadow-inner-xl rounded-bl-[180px] -z-10"></div>

        <div className="flex flex-col gap-8 items-center rounded-xl shadow-lg bg-[#F8F3F0] dark:bg-black px-10 py-8">
          <img
            className="rounded-full object-cover w-48 h-48"
            src="/assets/img/profile.jpg"
            alt=""
          />
          <div className="flex flex-col gap-4 items-center">
            <h1 className="font-sans text-center text-3xl">
              Emelie <br />
              Larsson
            </h1>

            {/* Horizontal line */}
            <div className="h-1 w-14 rounded-full bg-secondary"></div>

            <p className="text-center whitespace-nowrap">
              Skribent, språkgranskare, översättare
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-82">
          <h1>Hello</h1>
          <h4>Here's who I am & what I do</h4>
          <p>
            Jag är en kreativ språknörd med ett stort intresse för kommunikation
            och böcker.
          </p>
          <p>
            Jag har tidigare arbetat inom artikelskrivande, textproduktion,
            översättning och foto. Några av de jobb jag har gjort hittar du
            längre ner.
          </p>
          <p>
            Mina 4 år på universitetet har resulterat i två kandidatexamen från
            Språk- och kommunikationsprogrammet och en hel del kurser i
            litteraturvetenskap.
          </p>
          <button>CV</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
