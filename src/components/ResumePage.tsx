import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../components/MainLayout.tsx';

import { v4 as uuidv4 } from 'uuid';

// Define the interfaces for the structure of your resume data
interface EducationEntry {
  year: string;
  universityName: string; // Note: Use the same key as in your JSON
  degreeLevel: string; // Note: Use the same key as in your JSON
  body: string;
}

interface ExperienceEntry {
  year: string;
  position: string;
  company: string;
  body: string;
}

// Define the ResumeData interface that includes education and experience arrays
interface ResumeData {
  title: string;
  body: string;
  resume: string;
  educationHeader: string;
  experienceHeader: string;
  skillsHeader: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: string[];
}

const ResumePage = () => {
  const { t } = useTranslation();

  const resumeData = t('resume', { returnObjects: true }) as ResumeData;
  const educationList = resumeData.education;
  const experienceList = resumeData.experience;
  const skillsList: string[] = resumeData.skills;

  // js
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(
            'opacity-0',
            'blur',
            'translate-x-full'
          );
          entry.target.classList.add('opacity-100', 'translate-x-0', 'no-blur');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hide');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col gap-16 min-h-[90dvh]" id="resume">
        <div className="flex flex-col gap-5">
          <h1>{resumeData.title}</h1>
          <p>{resumeData.body}</p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h2>{resumeData.educationHeader}</h2>
            <button>{t('resume.resume')}</button>
          </div>
          {educationList.map((edu) => (
            <div
              className="hide opacity-0 blur translate-x-full transition-all duration-500 ease-in-out filter-none"
              key={uuidv4()}
            >
              <div className="flex justify-between bg-white dark:bg-black p-14 rounded-lg">
                <div className="flex flex-col gap-2 w-full">
                  <h3 className="text-secondary">{edu.year}</h3>
                  <p>{edu.universityName.toUpperCase()}</p>
                  <p>{edu.degreeLevel}</p>
                </div>

                <div className="w-[745px]">
                  <p>{edu.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h2>{resumeData.experienceHeader}</h2>
          {experienceList.map((exp) => (
            <div
              className="hide opacity-0 blur translate-x-full transition-all duration-500 ease-in-out"
              key={uuidv4()}
            >
              <div className="flex justify-between bg-white dark:bg-black p-14 rounded-lg">
                <div className="flex flex-col gap-2 w-full">
                  <h3 className="text-secondary">{exp.year}</h3>
                  <p>{exp.position.toUpperCase()}</p>
                  <p>{exp.company}</p>
                </div>

                <div className="w-[745px]">
                  <p>{exp.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h2>{resumeData.skillsHeader}</h2>
          <div className="hide opacity-0 blur translate-x-full transition-all duration-500 ease-in-out">
            <ul className="flex justify-between bg-white dark:bg-black p-14 rounded-lg list-disc">
              {skillsList.map((skill) => (
                <li key={uuidv4()}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResumePage;
