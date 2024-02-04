// ProjectPage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard.tsx';
import SectionLayout from '../components/SectionLayout.tsx';
import { v4 as uuidv4 } from 'uuid';

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
          <div className="absolute top-0 left-0 w-[calc(100vw+500px-100px)] h-full bg-white z-[-1] rounded-tr-[180px] rounded-br-[180px] shadow-[inset_-10px_0_15px_-3px_rgba(0,0,0,0.1),inset_0_-4px_6px_-2px_rgba(0,0,0,0.05)] transform -translate-x-1/2"></div>

          {/* Projects */}
          {projects.map((project) => (
            <div key={uuidv4()} className="bg-transparent">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      }
    />
  );
};

export default ProjectPage;
