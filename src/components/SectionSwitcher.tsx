import React from 'react';
import { underlineAnimation } from './styles/animation.ts';

interface SectionSwitcherProps {
  sections: string[];
  activeSection: string;
  onSwitch: (section: string) => void;
}

const SectionSwitcher: React.FC<SectionSwitcherProps> = ({
  sections,
  activeSection,
  onSwitch,
}) => {

  return (
    <div className="flex gap-8">
      {sections.map((section: string) => (
        <button
          key={section}
          className={`${underlineAnimation} font-semibold ${
            section === activeSection ? 'active' : ''
          }`}
          onClick={() => onSwitch(section)}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default SectionSwitcher;
