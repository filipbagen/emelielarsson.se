import React, { useEffect, useState } from 'react';
import { useFirestoreDoc } from '../../hooks/useFirestore.ts';
import { Project } from '../../types/content';
import Button from '../Button.tsx';

const ProjectsEditor = () => {
  const projectsDoc = useFirestoreDoc('websiteContent', 'projects');
  const [editedData, setEditedData] = useState<any>(null);

  useEffect(() => {
    if (projectsDoc.data) {
      setEditedData(projectsDoc.data);
    }
  }, [projectsDoc.data]);

  const handleProjectChange = (
    lang: string,
    projectIndex: number,
    field: keyof Project,
    value: string
  ) => {
    setEditedData((prev: any) => {
      const updatedList = [...prev[lang].list];
      updatedList[projectIndex] = {
        ...updatedList[projectIndex],
        [field]:
          field === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
      };
      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          list: updatedList,
        },
      };
    });
  };

  const addProject = (lang: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        list: [
          ...prev[lang].list,
          {
            title: 'New Project',
            name: '',
            tags: [],
            description: '',
          },
        ],
      },
    }));
  };

  const removeProject = (lang: string, projectIndex: number) => {
    setEditedData((prev: any) => {
      const updatedList = [...prev[lang].list];
      updatedList.splice(projectIndex, 1);
      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          list: updatedList,
        },
      };
    });
  };

  const handleSave = async () => {
    try {
      await projectsDoc.updateDocument(editedData);
      alert('Projects updated successfully!');
    } catch (err) {
      console.error('Failed to update projects', err);
    }
  };

  if (projectsDoc.loading) return <div>Loading...</div>;
  if (projectsDoc.error) return <div>Error loading projects content.</div>;

  return (
    <div>
      <div className="flex flex-row gap-6 justify-center">
        {Object.keys(editedData || {}).map((lang) => (
          <div key={lang} className="p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {lang.toUpperCase()} Section
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block mb-2 font-medium">Title:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editedData[lang].title}
                  onChange={(e) =>
                    setEditedData((prev: any) => ({
                      ...prev,
                      [lang]: {
                        ...prev[lang],
                        title: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Description:</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={editedData[lang].body}
                  onChange={(e) =>
                    setEditedData((prev: any) => ({
                      ...prev,
                      [lang]: {
                        ...prev[lang],
                        body: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Projects</h3>

                <Button variant="primary" onClick={() => addProject(lang)}>
                  + Add Project
                </Button>
              </div>

              {editedData[lang].list.map(
                (project: Project, projectIndex: number) => (
                  <div
                    key={projectIndex}
                    className="bg-white border rounded-lg p-6 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeProject(lang, projectIndex)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2">Title:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={project.title}
                          onChange={(e) =>
                            handleProjectChange(
                              lang,
                              projectIndex,
                              'title',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Name:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={project.name}
                          onChange={(e) =>
                            handleProjectChange(
                              lang,
                              projectIndex,
                              'name',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="col-span-full">
                        <label className="block mb-2">Tags:</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={project.tags.join(', ')}
                          onChange={(e) =>
                            handleProjectChange(
                              lang,
                              projectIndex,
                              'tags',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="col-span-full">
                        <label className="block mb-2">Description:</label>
                        <textarea
                          className="w-full p-2 border rounded"
                          value={project.description}
                          onChange={(e) =>
                            handleProjectChange(
                              lang,
                              projectIndex,
                              'description',
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
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button variant="primary" onClick={handleSave}>
          Save Projects
        </Button>
      </div>
    </div>
  );
};

export default ProjectsEditor;
