import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard.tsx';

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

  return (
    <div className="flex flex-col gap-24 min-h-[90dvh] mb-20" id="project">
      <div className="flex flex-col gap-5">
        <h1>{t('projects.title')}</h1>
        <p>{t('projects.body')}</p>
      </div>

      <div className="flex flex-col gap-16 justify-center">
        {projects.map((project) => (
          <ProjectCard project={project} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
