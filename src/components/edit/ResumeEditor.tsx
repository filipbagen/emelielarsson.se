import React, { useEffect, useState } from 'react';
import { useFirestoreDoc } from '../../hooks/useFirestore.ts';
import Button from '../Button.tsx';
import MultilingualEditor from '../MultilingualEditor.tsx';

interface EducationEntry {
  universityName: string;
  degreeLevel: string;
  body: string;
  year: string;
}

interface ExperienceEntry {
  company: string;
  position: string;
  body: string;
  year: string;
}

interface ResumeData {
  [lang: string]: {
    educationHeader: string;
    experienceHeader: string;
    skillsHeader: string;
    resume: string;
    skills: string[];
    list: EducationEntry[]; // Changed from Education
    ExperienceEntry: ExperienceEntry[];
  };
}

const ResumeEditor = () => {
  const resumeDoc = useFirestoreDoc('websiteContent', 'resume');
  const [editedData, setEditedData] = useState<ResumeData | null>(null);

  // In the useEffect, transform the data
  useEffect(() => {
    if (resumeDoc.data) {
      const transformedData = Object.keys(resumeDoc.data).reduce(
        (acc, lang) => {
          return {
            ...acc,
            [lang]: {
              ...resumeDoc.data[lang],
              list: resumeDoc.data[lang].Education, // Map Education to list
            },
          };
        },
        {}
      );
      setEditedData(transformedData as ResumeData);
    }
  }, [resumeDoc.data]);

  const handleEducationChange = (
    lang: string,
    index: number,
    field: keyof EducationEntry,
    value: string
  ) => {
    setEditedData((prev: ResumeData | null) => {
      if (!prev) return null;
      const updatedEducation = [...prev[lang].list];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      };

      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          Education: updatedEducation,
        },
      };
    });
  };

  // const handleExperienceChange = (
  //   lang: string,
  //   index: number,
  //   field: keyof ExperienceEntry,
  //   value: string
  // ) => {
  //   setEditedData((prev: ResumeData | null) => {
  //     if (!prev) return null;
  //     const updatedExperience = [...prev[lang].ExperienceEntry];
  //     updatedExperience[index] = {
  //       ...updatedExperience[index],
  //       [field]: value,
  //     };

  //     return {
  //       ...prev,
  //       [lang]: {
  //         ...prev[lang],
  //         ExperienceEntry: updatedExperience,
  //       },
  //     };
  //   });
  // };

  // const addEducationEntry = (lang: string) => {
  //   setEditedData((prev: ResumeData | null) => {
  //     if (!prev) return null;
  //     return {
  //       ...prev,
  //       [lang]: {
  //         ...prev[lang],
  //         Education: [
  //           ...prev[lang].Education,
  //           {
  //             universityName: 'New University',
  //             degreeLevel: 'New Degree',
  //             body: '',
  //             year: '',
  //           },
  //         ],
  //       },
  //     };
  //   });
  // };

  // const addExperienceEntry = (lang: string) => {
  //   setEditedData((prev: ResumeData | null) => {
  //     if (!prev) return null;
  //     return {
  //       ...prev,
  //       [lang]: {
  //         ...prev[lang],
  //         ExperienceEntry: [
  //           ...prev[lang].ExperienceEntry,
  //           {
  //             company: 'New Company',
  //             position: 'New Position',
  //             body: '',
  //             year: '',
  //           },
  //         ],
  //       },
  //     };
  //   });
  // };

  // const removeEducationEntry = (lang: string, index: number) => {
  //   setEditedData((prev: ResumeData | null) => {
  //     if (!prev) return null;
  //     const updatedEducation = [...prev[lang].Education];
  //     updatedEducation.splice(index, 1);
  //     return {
  //       ...prev,
  //       [lang]: {
  //         ...prev[lang],
  //         Education: updatedEducation,
  //       },
  //     };
  //   });
  // };

  // const removeExperienceEntry = (lang: string, index: number) => {
  //   setEditedData((prev: ResumeData | null) => {
  //     if (!prev) return null;
  //     const updatedExperience = [...prev[lang].ExperienceEntry];
  //     updatedExperience.splice(index, 1);
  //     return {
  //       ...prev,
  //       [lang]: {
  //         ...prev[lang],
  //         ExperienceEntry: updatedExperience,
  //       },
  //     };
  //   });
  // };

  const renderEducationItem = (
    lang: string,
    entry: EducationEntry,
    index: number,
    removeItem: (lang: string, index: number) => void
  ) => (
    <div className="bg-white dark:bg-transparent border rounded-lg p-6 relative">
      <button
        type="button"
        onClick={() => removeItem(lang, index)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        ❌
      </button>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">University Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:text-black"
            value={entry.universityName}
            onChange={(e) =>
              handleEducationChange(
                lang,
                index,
                'universityName',
                e.target.value
              )
            }
          />
        </div>
        <div>
          <label className="block mb-2">Degree Level:</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:text-black"
            value={entry.degreeLevel}
            onChange={(e) =>
              handleEducationChange(lang, index, 'degreeLevel', e.target.value)
            }
          />
        </div>
        <div>
          <label className="block mb-2">Year:</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:text-black"
            value={entry.year}
            onChange={(e) =>
              handleEducationChange(lang, index, 'year', e.target.value)
            }
          />
        </div>
        <div className="col-span-full">
          <label className="block mb-2">Description:</label>
          <textarea
            className="w-full p-2 border rounded dark:text-black"
            value={entry.body}
            onChange={(e) =>
              handleEducationChange(lang, index, 'body', e.target.value)
            }
          />
        </div>
        <div>
          <label className="block mb-2">Degree Level:</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:text-black"
            value={entry.degreeLevel}
            onChange={(e) =>
              handleEducationChange(lang, index, 'degreeLevel', e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );

  const renderResumeHeaders = (
    lang: string,
    data: ResumeData,
    onDataChange: (newData: ResumeData) => void
  ) => (
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block mb-2 font-medium">Education Header:</label>
        <input
          type="text"
          className="w-full p-2 border rounded dark:text-black"
          value={data[lang].educationHeader}
          onChange={(e) =>
            onDataChange({
              ...data,
              [lang]: {
                ...data[lang],
                educationHeader: e.target.value,
              },
            })
          }
        />
      </div>
      {/* ... (rest of your header fields) ... */}
    </div>
  );

  // Before saving, transform back
  const handleSave = async () => {
    if (!editedData) return;
    try {
      const saveData = Object.keys(editedData).reduce((acc, lang) => {
        return {
          ...acc,
          [lang]: {
            ...editedData[lang],
            Education: editedData[lang].list, // Map list back to Education
          },
        };
      }, {});
      await resumeDoc.updateDocument(saveData);
      alert('Resume updated successfully!');
    } catch (err) {
      console.error('Failed to update resume', err);
    }
  };

  if (resumeDoc.loading) return <div>Loading...</div>;
  if (resumeDoc.error) return <div>Error loading resume content.</div>;
  if (!editedData) return <div>No data available.</div>;

  return (
    <div>
      <MultilingualEditor
        data={editedData}
        onDataChange={setEditedData}
        renderItem={renderEducationItem}
        addItemTemplate={{
          universityName: 'New University',
          degreeLevel: 'New Degree',
          body: '',
          year: '',
        }}
        renderHeader={renderResumeHeaders}
        addButtonText="+ Add Education"
      />

      {/* Repeat for Experience section */}

      <div className="mt-4">
        <Button variant="primary" onClick={handleSave}>
          Save Resume
        </Button>
      </div>
    </div>
  );
};

export default ResumeEditor;
