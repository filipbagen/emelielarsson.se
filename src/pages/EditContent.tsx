import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionSwitcher from '../components/SectionSwitcher.tsx';
import IntroEditor from '../components/edit/IntroEditor.tsx';
import ProjectsEditor from '../components/edit/ProjectsEditor.tsx';

const EditContent = ({ isAuth }: { isAuth: boolean }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'intro' | 'projects'>(
    'intro'
  );

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
      default:
        return null;
    }
  };

  return (
    <div>
      <SectionSwitcher
        sections={['intro', 'projects']}
        activeSection={activeSection}
        onSwitch={setActiveSection}
      />
      {renderEditor()}
    </div>
  );
};

export default EditContent;
