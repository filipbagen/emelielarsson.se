import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionSwitcher from '../components/SectionSwitcher.tsx';
import IntroEditor from '../components/edit/IntroEditor.tsx';
import ProjectsEditor from '../components/edit/ProjectsEditor.tsx';
import ResumeEditor from '../components/edit/ResumeEditor.tsx';

const EditContent = ({
  isAuth,
  isLoading,
}: {
  isAuth: boolean;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<
    'Intro' | 'Projects' | 'Resume'
  >('Intro');

  useEffect(() => {
    // Only redirect if we're not loading and not authenticated
    if (!isLoading && !isAuth) {
      navigate('/login');
    }
  }, [isAuth, isLoading, navigate]);

  const renderEditor = () => {
    switch (activeSection) {
      case 'Intro':
        return <IntroEditor />;
      case 'Projects':
        return <ProjectsEditor />;
      case 'Resume':
        return <ResumeEditor />;
      default:
        return null;
    }
  };

  // If still loading, return nothing or a loading indicator
  if (isLoading) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <SectionSwitcher
        sections={['Intro', 'Projects', 'Resume']}
        activeSection={activeSection}
        onSwitch={setActiveSection}
      />
      {renderEditor()}
    </div>
  );
};

export default EditContent;
