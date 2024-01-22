import React from 'react';

// components
import Button from '../components/Button.tsx';

const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-.5">
        <h3>{project.title}</h3>
        <h4>{project.projectName}</h4>
      </div>

      <p>{project.description}</p>

      <div className="flex gap-4">
        {project.tags.map((tag: string) => (
          //   <Button variant="primary">{tag}</Button>
          // TODO: add key
          <Button variant="ghost" href="https://example.com">
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
