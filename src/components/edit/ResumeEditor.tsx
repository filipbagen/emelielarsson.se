import React, { useEffect, useState } from 'react';
import { useFirestoreDoc } from '../../hooks/useFirestore.ts';
import Button from '../Button.tsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
    Education: EducationEntry[];
    ExperienceEntry: ExperienceEntry[];
  };
}

const ResumeEditor = () => {
  const resumeDoc = useFirestoreDoc('websiteContent', 'resume');
  const [editedData, setEditedData] = useState<ResumeData | null>(null);

  useEffect(() => {
    if (resumeDoc.data) {
      setEditedData(resumeDoc.data as ResumeData);
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
    setEditedData((prev: ResumeData | null) => {
      if (!prev) return null;
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
    setEditedData((prev: ResumeData | null) => {
      if (!prev) return null;
      const newEducation = {
        universityName: 'New University',
        degreeLevel: 'New Degree',
        body: '',
        year: '',
      };

      // Add the education entry to all languages
      const updatedData = { ...prev };
      Object.keys(updatedData).forEach((language) => {
        updatedData[language] = {
          ...updatedData[language],
          Education: [...updatedData[language].Education, { ...newEducation }],
        };
      });

      return updatedData;
    });
  };

  const addExperienceEntry = (lang: string) => {
    setEditedData((prev: ResumeData | null) => {
      if (!prev) return null;
      const newExperience = {
        company: 'New Company',
        position: 'New Position',
        body: '',
        year: '',
      };

      // Add the experience entry to all languages
      const updatedData = { ...prev };
      Object.keys(updatedData).forEach((language) => {
        updatedData[language] = {
          ...updatedData[language],
          ExperienceEntry: [
            ...updatedData[language].ExperienceEntry,
            { ...newExperience },
          ],
        };
      });

      return updatedData;
    });
  };

  const removeEducationEntry = (lang: string, index: number) => {
    setEditedData((prev: ResumeData | null) => {
      if (!prev) return null;

      // Remove the education entry from all languages
      const updatedData = { ...prev };
      Object.keys(updatedData).forEach((language) => {
        const updatedEducation = [...updatedData[language].Education];
        updatedEducation.splice(index, 1);
        updatedData[language] = {
          ...updatedData[language],
          Education: updatedEducation,
        };
      });

      return updatedData;
    });
  };

  const removeExperienceEntry = (lang: string, index: number) => {
    setEditedData((prev: ResumeData | null) => {
      if (!prev) return null;

      // Remove the experience entry from all languages
      const updatedData = { ...prev };
      Object.keys(updatedData).forEach((language) => {
        const updatedExperience = [...updatedData[language].ExperienceEntry];
        updatedExperience.splice(index, 1);
        updatedData[language] = {
          ...updatedData[language],
          ExperienceEntry: updatedExperience,
        };
      });

      return updatedData;
    });
  };

  const handleEducationDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    setEditedData((prev: ResumeData | null) => {
      if (!prev) return null;

      // Reorder education entries in all languages
      const updatedData = { ...prev };
      Object.keys(updatedData).forEach((language) => {
        const updatedEducation = [...updatedData[language].Education];
        const [reorderedItem] = updatedEducation.splice(sourceIndex, 1);
        updatedEducation.splice(destinationIndex, 0, reorderedItem);
        updatedData[language] = {
          ...updatedData[language],
          Education: updatedEducation,
        };
      });

      return updatedData;
    });
  };

  const handleExperienceDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    setEditedData((prev: ResumeData | null) => {
      if (!prev) return null;

      // Reorder experience entries in all languages
      const updatedData = { ...prev };
      Object.keys(updatedData).forEach((language) => {
        const updatedExperience = [...updatedData[language].ExperienceEntry];
        const [reorderedItem] = updatedExperience.splice(sourceIndex, 1);
        updatedExperience.splice(destinationIndex, 0, reorderedItem);
        updatedData[language] = {
          ...updatedData[language],
          ExperienceEntry: updatedExperience,
        };
      });

      return updatedData;
    });
  };

  const handleSave = async () => {
    if (!editedData) return;
    try {
      await resumeDoc.updateDocument(editedData);
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
      <div className="flex flex-row gap-6 justify-center">
        {Object.keys(editedData || {}).map((lang) => (
          <div key={lang} className="p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {lang.toUpperCase()} Resume
            </h2>

            {/* Education Section */}
            <div className="space-y-6 mb-8">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-2 font-medium">
                    Education Header:
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:text-black"
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
              </div>

              <DragDropContext onDragEnd={handleEducationDragEnd}>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Education</h3>
                    <Button
                      variant="primary"
                      onClick={() => addEducationEntry(lang)}
                    >
                      + Add Education
                    </Button>
                  </div>

                  <Droppable droppableId={`education-${lang}`}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {editedData[lang].Education.map(
                          (entry: EducationEntry, index: number) => (
                            <Draggable
                              key={index}
                              draggableId={`${lang}-education-${index}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-white dark:bg-transparent border rounded-lg p-6 relative"
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeEducationEntry(lang, index)
                                    }
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                  >
                                    ❌
                                  </button>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block mb-2">
                                        University Name:
                                      </label>
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
                                      <label className="block mb-2">
                                        Degree Level:
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full p-2 border rounded dark:text-black"
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
                                      <label className="block mb-2">
                                        Year:
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full p-2 border rounded dark:text-black"
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
                                      <label className="block mb-2">
                                        Description:
                                      </label>
                                      <textarea
                                        className="w-full p-2 border rounded dark:text-black"
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
                              )}
                            </Draggable>
                          )
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>
            </div>

            {/* Experience Section */}
            <div className="space-y-6 mb-8">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-2 font-medium">
                    Experience Header:
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:text-black"
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
              </div>

              <DragDropContext onDragEnd={handleExperienceDragEnd}>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Experience</h3>
                    <Button
                      variant="primary"
                      onClick={() => addExperienceEntry(lang)}
                    >
                      + Add Experience
                    </Button>
                  </div>

                  <Droppable droppableId={`experience-${lang}`}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {editedData[lang].ExperienceEntry.map(
                          (entry: ExperienceEntry, index: number) => (
                            <Draggable
                              key={index}
                              draggableId={`${lang}-experience-${index}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-white dark:bg-transparent border rounded-lg p-6 relative"
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeExperienceEntry(lang, index)
                                    }
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                  >
                                    ❌
                                  </button>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block mb-2">
                                        Company:
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full p-2 border rounded dark:text-black"
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
                                      <label className="block mb-2">
                                        Position:
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full p-2 border rounded dark:text-black"
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
                                      <label className="block mb-2">
                                        Year:
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full p-2 border rounded dark:text-black"
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
                                      <label className="block mb-2">
                                        Description:
                                      </label>
                                      <textarea
                                        className="w-full p-2 border rounded dark:text-black"
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
                              )}
                            </Draggable>
                          )
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">
                    Skills Header:
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:text-black"
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
                <div>
                  <label className="block mb-2 font-medium">Skills:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:text-black"
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
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Resume Button Text:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded dark:text-black"
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
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button variant="primary" onClick={handleSave}>
          Save Resume
        </Button>
      </div>
    </div>
  );
};

export default ResumeEditor;
