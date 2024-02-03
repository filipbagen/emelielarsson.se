import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard.tsx';
import SectionLayout from '../components/SectionLayout.tsx';
import { v4 as uuidv4 } from 'uuid';

// Export the Project interface so it can be imported in other components
export interface Project {
  title: string;
  name: string;
  tags: string[];
  description: string;
}

const ProjectPage: React.FC = () => {
  const { t } = useTranslation();
  const projects = t('projects.list', { returnObjects: true }) as Project[];

  // Prepare the content for the section
  const projectCards = (
    <>
      {projects.map((project) => (
        <ProjectCard project={project} key={uuidv4()} />
      ))}
    </>
  );

  return (
    // <div className="min-h-[90dvh]">
    <SectionLayout
      title={t('projects.title')}
      description={t('projects.body')}
      content={projectCards}
    />
    // </div>
  );
};

export default ProjectPage;
