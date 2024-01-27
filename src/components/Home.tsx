import React from 'react';

// components
import MainLayout from '../components/MainLayout.tsx';
import ProfileCard from '../components/ProfileCard.tsx';
import ProjectPage from '../components/ProjectPage.tsx';
import Contact from '../components/Contact.tsx';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Element, scroller } from 'react-scroll';

const Home = () => {
  const location = useLocation();
  const sectionId = location.state?.section;

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
    <MainLayout>
      <ProfileCard />

      <Element name="project">
        <ProjectPage />
      </Element>

      <Element name="contact">
        <Contact />
      </Element>
    </MainLayout>
  );
};

export default Home;
