import React from 'react';

// components
import MainLayout from '../components/MainLayout.tsx';
import ProfileCard from '../components/ProfileCard.tsx';
import ProjectPage from '../components/ProjectPage.tsx';
import Contact from '../components/Contact.tsx';

const Home = () => {
  return (
    <MainLayout>
      <ProfileCard />
      <ProjectPage />
      <Contact />
    </MainLayout>
  );
};

export default Home;
