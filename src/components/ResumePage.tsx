import React from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../components/MainLayout.tsx';
import SectionLayout from '../components/SectionLayout.tsx';
import Button from '../components/Button.tsx';

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

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(
              'opacity-0',
              'blur',
              'translate-y-full'
            );
            entry.target.classList.add(
              'opacity-100',
              'translate-x-0',
              'no-blur'
            );
          }
        });
      },
      {
        threshold: 0.0, // Adjust this to control when the animation starts
        rootMargin: '120px', // Optionally, adjust the root margin if needed
      }
    );

    const hiddenElements = document.querySelectorAll('.hide');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Prepare the content for the section
  const content = (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-end justify-between">
          <h2>{t('resume.educationHeader')}</h2>

          <Button
            variant="primary"
            href={`${process.env.PUBLIC_URL}/assets/data/emelie_larsson_resume.pdf`}
          >
            {t('resume.resume')}
          </Button>
        </div>
        {educationList.map((edu) => (
          <div
            key={edu.degreeLevel}
            className="hide opacity-0 blur translate-y-full transition-all duration-500 ease-in-out filter-none"
          >
            <div className="flex flex-col sm:flex-row sm:gap-16 gap-8 bg-white dark:bg-black p-14 rounded-lg">
              {/* Static content mimicking dynamic content */}
              <div className="flex flex-col gap-2">
                <h3 className="text-secondary whitespace-nowrap">{edu.year}</h3>
                <p>{t('resume.experienceHeader').toUpperCase()}</p>
                <p>{edu.degreeLevel}</p>
              </div>

              <div>
                <p>{edu.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2>{t('resume.experienceHeader')}</h2>
        {experienceList.map((exp) => (
          <div
            key={exp.company}
            className="hide opacity-0 blur translate-y-full transition-all duration-500 ease-in-out"
          >
            <div className="flex flex-col sm:flex-row justify-between bg-white dark:bg-black p-14 rounded-lg">
              <div className="flex flex-col gap-2">
                <h3 className="text-secondary">{exp.year}</h3>
                <p>{exp.position.toUpperCase()}</p>
                <p>{exp.company}</p>
              </div>

              <div>
                <p>{exp.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2>{t('resume.skillsHeader')}</h2>
        <div className="hide opacity-0 blur translate-y-full transition-all duration-500 ease-in-out">
          <ul className="flex justify-between gap-4 flex-wrap bg-white dark:bg-black p-14 rounded-lg list-disc">
            {skillsList.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

  return (
    <MainLayout>
      <SectionLayout
        title={resumeData.title}
        description={resumeData.body}
        content={content}
      />
    </MainLayout>
  );
};

export default ResumePage;
