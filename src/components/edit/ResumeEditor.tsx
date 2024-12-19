import React, { useEffect, useState } from 'react';
import { useFirestoreDoc } from '../../hooks/useFirestore.ts';
import Button from '../Button.tsx';

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

const ResumeEditor = () => {
  const resumeDoc = useFirestoreDoc('websiteContent', 'resume');
  const [editedData, setEditedData] = useState<any>(null);

  useEffect(() => {
    if (resumeDoc.data) {
      setEditedData(resumeDoc.data);
    }
  }, [resumeDoc.data]);

  const handleEducationChange = (
    lang: string,
    index: number,
    field: keyof EducationEntry,
    value: string
  ) => {
    setEditedData((prev: any) => {
      const updatedEducation = [...prev[lang].Education];
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

  const handleExperienceChange = (
    lang: string,
    index: number,
    field: keyof ExperienceEntry,
    value: string
  ) => {
    setEditedData((prev: any) => {
      const updatedExperience = [...prev[lang].ExperienceEntry];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      };

      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          ExperienceEntry: updatedExperience,
        },
      };
    });
  };

  const addEducationEntry = (lang: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        Education: [
          ...prev[lang].Education,
          {
            universityName: 'New University',
            degreeLevel: 'New Degree',
            body: '',
            year: '',
          },
        ],
      },
    }));
  };

  const addExperienceEntry = (lang: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        ExperienceEntry: [
          ...prev[lang].ExperienceEntry,
          {
            company: 'New Company',
            position: 'New Position',
            body: '',
            year: '',
          },
        ],
      },
    }));
  };

  const removeEducationEntry = (lang: string, index: number) => {
    setEditedData((prev: any) => {
      const updatedEducation = [...prev[lang].Education];
      updatedEducation.splice(index, 1);

      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          Education: updatedEducation,
        },
      };
    });
  };

  const removeExperienceEntry = (lang: string, index: number) => {
    setEditedData((prev: any) => {
      const updatedExperience = [...prev[lang].ExperienceEntry];
      updatedExperience.splice(index, 1);

      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          ExperienceEntry: updatedExperience,
        },
      };
    });
  };

  const handleSave = async () => {
    try {
      await resumeDoc.updateDocument(editedData);
      alert('Resume updated successfully!');
    } catch (err) {
      console.error('Failed to update resume', err);
    }
  };

  if (resumeDoc.loading) return <div>Loading...</div>;
  if (resumeDoc.error) return <div>Error loading resume content.</div>;

  return (
    <div>
      <div className="flex flex-row gap-6 justify-center">
        {Object.keys(editedData || {}).map((lang) => (
          <div
            key={lang}
            className="bg-primary p-6 rounded-lg shadow-md w-full"
          >
            <h2 className="text-2xl font-semibold mb-4">
              {lang.toUpperCase()} Resume
            </h2>

            {/* Section headers */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Education Header:
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editedData[lang].educationHeader}
                onChange={(e) =>
                  setEditedData((prev: any) => ({
                    ...prev,
                    [lang]: {
                      ...prev[lang],
                      educationHeader: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Education</h3>
                <Button
                  variant="primary"
                  onClick={() => addEducationEntry(lang)}
                >
                  + Add Education
                </Button>
              </div>

              {editedData[lang].Education.map(
                (entry: EducationEntry, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 mb-4 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeEducationEntry(lang, index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2">University Name:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
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
                          className="w-full p-2 border rounded"
                          value={entry.degreeLevel}
                          onChange={(e) =>
                            handleEducationChange(
                              lang,
                              index,
                              'degreeLevel',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Year:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={entry.year}
                          onChange={(e) =>
                            handleEducationChange(
                              lang,
                              index,
                              'year',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="col-span-full">
                        <label className="block mb-2">Description:</label>
                        <textarea
                          className="w-full p-2 border rounded"
                          value={entry.body}
                          onChange={(e) =>
                            handleEducationChange(
                              lang,
                              index,
                              'body',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Experience Header:
              </label>
              <input
                type="text"
                className="w-full p-2 rounded"
                value={editedData[lang].experienceHeader}
                onChange={(e) =>
                  setEditedData((prev: any) => ({
                    ...prev,
                    [lang]: {
                      ...prev[lang],
                      experienceHeader: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Experience</h3>
                <button
                  type="button"
                  onClick={() => addExperienceEntry(lang)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  + Add Experience
                </button>
              </div>

              {editedData[lang].ExperienceEntry.map(
                (entry: ExperienceEntry, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 mb-4 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeExperienceEntry(lang, index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2">Company:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={entry.company}
                          onChange={(e) =>
                            handleExperienceChange(
                              lang,
                              index,
                              'company',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Position:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={entry.position}
                          onChange={(e) =>
                            handleExperienceChange(
                              lang,
                              index,
                              'position',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Year:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={entry.year}
                          onChange={(e) =>
                            handleExperienceChange(
                              lang,
                              index,
                              'year',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="col-span-full">
                        <label className="block mb-2">Description:</label>
                        <textarea
                          className="w-full p-2 border rounded"
                          value={entry.body}
                          onChange={(e) =>
                            handleExperienceChange(
                              lang,
                              index,
                              'body',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Skills Section */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Skills Header:</label>
              <input
                type="text"
                className="w-full p-2 rounded"
                value={editedData[lang].skillsHeader}
                onChange={(e) =>
                  setEditedData((prev: any) => ({
                    ...prev,
                    [lang]: {
                      ...prev[lang],
                      skillsHeader: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Skills:</label>
              <input
                type="text"
                className="w-full p-2 rounded"
                value={editedData[lang].skills.join(', ')}
                onChange={(e) =>
                  setEditedData((prev: any) => ({
                    ...prev,
                    [lang]: {
                      ...prev[lang],
                      skills: e.target.value
                        .split(',')
                        .map((skill) => skill.trim()),
                    },
                  }))
                }
              />
            </div>

            {/* Other Resume Metadata */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Resume Button Text:
              </label>
              <input
                type="text"
                className="w-full p-2 rounded"
                value={editedData[lang].resume}
                onChange={(e) =>
                  setEditedData((prev: any) => ({
                    ...prev,
                    [lang]: {
                      ...prev[lang],
                      resume: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
        ))}
      </div>

      <Button variant="primary" onClick={handleSave}>
        Save Resume
      </Button>
    </div>
  );
};

export default ResumeEditor;
