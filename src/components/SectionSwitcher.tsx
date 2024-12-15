import React from 'react';

interface SectionSwitcherProps {
  sections: string[];
  activeSection: string;
  onSwitch: (section: string) => void;
}

const SectionSwitcher: React.FC<SectionSwitcherProps> = ({
  sections,
  activeSection,
  onSwitch,
}) => (
  <div className="section-switcher">
    {sections.map((section) => (
      <button
        key={section}
        className={section === activeSection ? 'active' : ''}
        onClick={() => onSwitch(section)}
      >
        {section}
      </button>
    ))}
  </div>
);

export default SectionSwitcher;
