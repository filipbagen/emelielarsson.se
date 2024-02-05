// ProjectPage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard.tsx';
import SectionLayout from '../components/SectionLayout.tsx';

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
    <SectionLayout
      title={t('projects.title')}
      description={t('projects.body')}
      content={
        <div className="flex flex-col gap-16 w-full relative max-w-6xl mx-auto py-14">
          {/* Background div for all projects */}
          {/* Extend further by increasing the negative margin on mobile */}
          <div className="absolute inset-0 w-[calc(100%] h-full bg-white dark:bg-black z-[-1] left-[-2rem] -right-[2rem] rounded-[38px] sm:w-[250%] sm:rounded-r-[180px] shadow-inner-lg sm:transform sm:-translate-x-1/2"></div>

          {/* Projects */}
          {projects.map((project) => (
            <div key={project.title} className="bg-transparent">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      }
    />
  );
};

export default ProjectPage;
