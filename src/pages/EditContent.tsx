import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionSwitcher from '../components/SectionSwitcher.tsx';
import IntroEditor from '../components/edit/IntroEditor.tsx';
import ProjectsEditor from '../components/edit/ProjectsEditor.tsx';
import ResumeEditor from '../components/edit/ResumeEditor.tsx';

const EditContent = ({ isAuth }: { isAuth: boolean }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<
    'intro' | 'projects' | 'resume'
  >('intro');

  React.useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  const renderEditor = () => {
    switch (activeSection) {
      case 'intro':
        return <IntroEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'resume':
        return <ResumeEditor />;
      default:
        return null;
    }
  };

  return (
    // How do I style?
    <div className="">
      <SectionSwitcher
        sections={['intro', 'projects', 'resume']}
        activeSection={activeSection}
        onSwitch={setActiveSection}
      />
      {renderEditor()}
    </div>
  );
};

export default EditContent;
