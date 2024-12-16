import React from 'react';

// components
import ProfileCard from '../components/ProfileCard.tsx';
import ProjectPage from '../components/ProjectPage.tsx';
import Contact from '../components/Contact.tsx';

import { useEffect } from 'react';
import { Element, scroller } from 'react-scroll';

const Home = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      scroller.scrollTo(hash.slice(1), {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, []);

  return (
    <>
      <ProfileCard />

      <Element name="project">
        <ProjectPage />
      </Element>

      <Element name="contact">
        <Contact />
      </Element>
    </>
  );
};

export default Home;
