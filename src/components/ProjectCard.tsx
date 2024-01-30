import React from 'react';

// components
import Button from '../components/Button.tsx';
import { Project } from '../components/ProjectPage.tsx';

import { v4 as uuidv4 } from 'uuid';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-.5">
        <h3>{project.title}</h3>
        <h4>{project.name}</h4>
      </div>

      <p>{project.description}</p>

      <div className="flex gap-4">
        {project.tags.map((tag: string) => (
          <Button variant="ghost" href="https://example.com" key={uuidv4()}>
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
