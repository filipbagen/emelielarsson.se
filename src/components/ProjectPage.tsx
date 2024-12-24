import React from 'react';
import ProjectCard from '../components/ProjectCard.tsx';
import SectionLayout from '../components/SectionLayout.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useFirestoreDoc } from '../hooks/useFirestore.ts';
import { Project } from '../types/content.ts';

const ProjectPage = () => {
  const { currentLang } = useLanguage();
  const { data, loading, error } = useFirestoreDoc(
    'websiteContent',
    'projects'
  );

  if (loading) return null;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <SectionLayout
      title={data[currentLang]?.title}
      description={data[currentLang]?.body}
      content={
        <div className="flex flex-col gap-16 w-full relative mx-auto py-14">
          {/* Background div for all projects */}
          {/* Extend further by increasing the negative margin on mobile */}
          <div className="absolute inset-0 w-[calc(100%] h-full bg-white dark:bg-secondaryDark z-[-1] left-[-2rem] -right-[2rem] rounded-[38px] sm:w-[250%] sm:rounded-r-[180px] shadow-inner-lg sm:transform sm:-translate-x-1/2"></div>

          {/* Projects */}
          {data[currentLang]?.list.map((project: Project) => (
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
