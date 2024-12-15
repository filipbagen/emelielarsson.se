import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestoreDoc } from '../hooks/useFirestore.ts';

export interface Project {
  title: string;
  name: string;
  tags: string[];
  description: string;
}

const EditContent = ({ isAuth }: { isAuth: boolean }) => {
  const navigate = useNavigate();

  // Fetch both intro and projects content
  const introDoc = useFirestoreDoc('websiteContent', 'intro');
  const projectsDoc = useFirestoreDoc('websiteContent', 'projects');

  // State to track which content is being edited
  const [activeSection, setActiveSection] = useState<'intro' | 'projects'>(
    'intro'
  );

  // Combine loading and error states
  const loading = introDoc.loading || projectsDoc.loading;
  const error = introDoc.error || projectsDoc.error;
  const [editedData, setEditedData] = useState<any>(null);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  // Initialize editedData when data is loaded
  React.useEffect(() => {
    if (introDoc.data && projectsDoc.data) {
      setEditedData({
        intro: introDoc.data,
        projects: projectsDoc.data,
      });
    }
  }, [introDoc.data, projectsDoc.data]);

  // Handle section-level changes
  const handleSectionChange = (
    section: 'intro' | 'projects',
    lang: string,
    field: string,
    value: string
  ) => {
    setEditedData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [lang]: {
          ...prev[section][lang],
          [field]: value,
        },
      },
    }));
  };

  // Handle project-specific changes
  const handleProjectChange = (
    projectIndex: number,
    lang: string,
    field: keyof Project,
    value: string
  ) => {
    setEditedData((prev: any) => {
      const updatedList = [...prev.projects[lang].list];
      updatedList[projectIndex] = {
        ...updatedList[projectIndex],
        [field]:
          field === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
      };

      return {
        ...prev,
        projects: {
          ...prev.projects,
          [lang]: {
            ...prev.projects[lang],
            list: updatedList,
          },
        },
      };
    });
  };

  // Add a new project
  const addProject = (lang: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      projects: {
        ...prev.projects,
        [lang]: {
          ...prev.projects[lang],
          list: [
            ...prev.projects[lang].list,
            {
              title: 'New Project',
              name: '',
              tags: [],
              description: '',
            },
          ],
        },
      },
    }));
  };

  // Remove a project
  const removeProject = (lang: string, projectIndex: number) => {
    setEditedData((prev: any) => {
      const updatedList = [...prev.projects[lang].list];
      updatedList.splice(projectIndex, 1);

      return {
        ...prev,
        projects: {
          ...prev.projects,
          [lang]: {
            ...prev.projects[lang],
            list: updatedList,
          },
        },
      };
    });
  };

  // Submit changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update both documents
      const introSuccess = await introDoc.updateDocument(editedData.intro);
      const projectsSuccess = await projectsDoc.updateDocument(
        editedData.projects
      );

      if (introSuccess && projectsSuccess) {
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to update documents', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Content</h1>

      {/* Section Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <button
            onClick={() => setActiveSection('intro')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeSection === 'intro'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Intro
          </button>
          <button
            onClick={() => setActiveSection('projects')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeSection === 'projects'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Projects
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {activeSection === 'intro' && (
          <div className="flex flex-row gap-6 justify-center">
            {Object.keys(editedData?.intro || {}).map((lang) => (
              <div
                key={lang}
                className="bg-gray-50 p-6 rounded-lg shadow-md w-full"
              >
                <h2 className="text-2xl font-semibold mb-4">
                  {lang.toUpperCase()} Section
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">Title:</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={editedData.intro[lang].title}
                      onChange={(e) =>
                        handleSectionChange(
                          'intro',
                          lang,
                          'title',
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Heading:</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={editedData.intro[lang].heading}
                      onChange={(e) =>
                        handleSectionChange(
                          'intro',
                          lang,
                          'heading',
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="block mb-2 font-medium">Body:</label>
                    <textarea
                      className="w-full p-2 border rounded h-40"
                      value={editedData.intro[lang].body}
                      onChange={(e) =>
                        handleSectionChange(
                          'intro',
                          lang,
                          'body',
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="flex flex-row gap-6 justify-center">
            {Object.keys(editedData?.projects || {}).map((lang) => (
              <div
                key={lang}
                className="bg-gray-50 p-6 rounded-lg shadow-md w-full"
              >
                <h2 className="text-2xl font-semibold mb-4">
                  {lang.toUpperCase()} Section
                </h2>

                {/* Section-level fields */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-2 font-medium">Title:</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={editedData.projects[lang].title}
                      onChange={(e) =>
                        handleSectionChange(
                          'projects',
                          lang,
                          'title',
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Description:
                    </label>
                    <textarea
                      className="w-full p-2 border rounded"
                      value={editedData.projects[lang].body}
                      onChange={(e) =>
                        handleSectionChange(
                          'projects',
                          lang,
                          'body',
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {/* Projects List */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Projects</h3>
                    <button
                      type="button"
                      onClick={() => addProject(lang)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      + Add Project
                    </button>
                  </div>

                  {editedData.projects[lang].list.map(
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
                                  projectIndex,
                                  lang,
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
                                  projectIndex,
                                  lang,
                                  'name',
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="col-span-full">
                            <label className="block mb-2">
                              Tags (comma-separated):
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded"
                              value={project.tags.join(', ')}
                              onChange={(e) =>
                                handleProjectChange(
                                  projectIndex,
                                  lang,
                                  'tags',
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="col-span-full">
                            <label className="block mb-2">Description:</label>
                            <textarea
                              className="w-full p-2 border rounded h-40"
                              value={project.description}
                              onChange={(e) =>
                                handleProjectChange(
                                  projectIndex,
                                  lang,
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
        )}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContent;
