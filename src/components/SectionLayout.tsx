import React, { ReactNode } from 'react';

interface SectionLayoutProps {
  title: string;
  description: string;
  content: ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  title,
  description,
  content,
}) => {
  return (
    <div className="flex flex-col gap-24 min-h-[90dvh] mb-20">
      <div className="flex flex-col gap-5">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="flex flex-col gap-16 justify-center">{content}</div>
    </div>
  );
};

export default SectionLayout;
