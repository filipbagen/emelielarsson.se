import React from 'react';
import ProjectCard from '../components/ProjectCard.tsx';
import SectionLayout from '../components/SectionLayout.tsx';
import useLocalizedContent from '../hooks/useLocalizedContent.ts';

export interface Project {
  id: string;
  title: string;
  name: string;
  tags: string[];
  description: string;
}

const ProjectPage = () => {
  const { content, loading, error } = useLocalizedContent(
    'websiteContent',
    'projects'
  );

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error loading projects!</div>;
  }

  const { title, body, list } = content || { title: '', body: '', list: [] };

  return (
    <SectionLayout
      title={title}
      description={body}
      content={
        <div className="flex flex-col gap-16 w-full relative max-w-6xl mx-auto py-14">
          {/* Background div for all projects */}
          <div className="absolute inset-0 w-[calc(100%)] h-full bg-white dark:bg-black z-[-1] left-[-2rem] -right-[2rem] rounded-[38px] sm:w-[250%] sm:rounded-r-[180px] shadow-inner-lg sm:transform sm:-translate-x-1/2"></div>

          {/* Projects */}
          {list.map((project: Project, index: number) => (
            <div key={index} className="bg-transparent">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      }
    />
  );
};

export default ProjectPage;
