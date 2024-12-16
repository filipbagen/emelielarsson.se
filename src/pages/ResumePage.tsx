import React, { useEffect } from 'react';
import SectionLayout from '../components/SectionLayout.tsx';
import Button from '../components/Button.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useFirestoreDoc } from '../hooks/useFirestore.ts';
import MainLayout from '../components/MainLayout.tsx';

// Define the interfaces for the structure of your resume data
interface EducationEntry {
  year: string;
  universityName: string;
  degreeLevel: string;
  body: string;
}

interface ExperienceEntry {
  year: string;
  position: string;
  company: string;
  body: string;
}

const ResumePage = () => {
  const { currentLang } = useLanguage();
  const { data, loading, error } = useFirestoreDoc('websiteContent', 'resume');

  useEffect(() => {
    // Only run the intersection observer setup after data is loaded
    if (data && data[currentLang]) {
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
          threshold: 0.0,
          rootMargin: '120px',
        }
      );

      const hiddenElements = document.querySelectorAll('.hide');
      hiddenElements.forEach((el) => observer.observe(el));

      return () => {
        hiddenElements.forEach((el) => observer.unobserve(el));
      };
    }
  }, [data, currentLang]); // Add dependencies to re-run when data or language changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Render Education Entries
  const renderEducation = () => {
    return data[currentLang].Education.map(
      (entry: EducationEntry, index: number) => (
        <div
          key={`edu-${index}`}
          className="hide opacity-0 blur translate-y-full transition-all duration-500 ease-in-out filter-none"
        >
          <div className="flex flex-col sm:flex-row sm:gap-16 gap-8 bg-white dark:bg-black p-14 rounded-lg">
            <div className="flex flex-col gap-2 min-w-[212px]">
              <h3 className="text-secondary whitespace-nowrap">{entry.year}</h3>
              <p className="font-semibold">{entry.universityName}</p>
              <p>{entry.degreeLevel}</p>
            </div>
            <div>
              <p>{entry.body}</p>
            </div>
          </div>
        </div>
      )
    );
  };

  // Render Experience Entries
  const renderExperience = () => {
    return data[currentLang].ExperienceEntry.map(
      (entry: ExperienceEntry, index: number) => (
        <div
          key={`exp-${index}`}
          className="hide opacity-0 blur translate-y-full transition-all duration-500 ease-in-out"
        >
          <div className="flex flex-col sm:flex-row sm:gap-16 gap-8 bg-white dark:bg-black p-14 rounded-lg">
            <div className="flex flex-col gap-2 min-w-[212px]">
              <h3 className="text-secondary">{entry.year}</h3>
              <p className="font-semibold">{entry.position}</p>
              <p>{entry.company}</p>
            </div>
            <div>
              <p>{entry.body}</p>
            </div>
          </div>
        </div>
      )
    );
  };

  // Render Skills
  const renderSkills = () => {
    return (
      <div className="hide opacity-0 blur translate-y-full transition-all duration-500 ease-in-out">
        <ul className="grid grid-cols-3 gap-4 list-disc bg-white dark:bg-black p-14 rounded-lg">
          {data[currentLang].skills.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Prepare the content for the section
  const content = (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-end justify-between">
          <Button
            variant="primary"
            href={`${process.env.PUBLIC_URL}/assets/data/emelie_larsson_resume.pdf`}
          >
            {data[currentLang].resume}
          </Button>
        </div>

        {/* Education Section */}
        <div className="flex flex-col gap-4">
          <h2>{data[currentLang].educationHeader}</h2>
          {renderEducation()}
        </div>

        {/* Experience Section */}
        <div className="flex flex-col gap-4">
          <h2>{data[currentLang].experienceHeader}</h2>
          {renderExperience()}
        </div>

        {/* Skills Section */}
        <div className="flex flex-col gap-4">
          <h2>{data[currentLang].skillsHeader}</h2>
          {renderSkills()}
        </div>
      </div>
    </>
  );

  return (
    <MainLayout>
      <SectionLayout
        title={data[currentLang].title}
        description={data[currentLang].body}
        content={content}
      />
    </MainLayout>
  );
};

export default ResumePage;
