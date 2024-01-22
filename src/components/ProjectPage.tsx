import React from 'react';

// data
import data from '../data/data.json';

// components
import ProjectCard from '../components/ProjectCard.tsx';

const ProjectPage = () => {
  return (
    <div className="flex flex-col gap-24 min-h-[90dvh] mb-20" id="project">
      <div className="flex flex-col gap-5">
        <h1>Projekt</h1>
        <p>
          I'm a paragraph. Click here to add your own text and edit me. It's
          easy. Just click “Edit Text” or double click me to add your own
          content and make changes to the font. I'm a great place for you to
          tell a story and let your users know a little more about you.
        </p>
      </div>

      <div className="flex flex-col gap-16 justify-center">
        {data.projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
