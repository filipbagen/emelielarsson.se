import React, { useEffect, useState } from 'react';
import { useFirestoreDoc } from '../../hooks/useFirestore.ts';
import { Project } from '../../types/content';
import Button from '../Button.tsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
    setEditedData((prev: any) => {
      const newProject = {
        title: 'New Project',
        name: '',
        tags: [],
        description: '',
      };

      // Add the project to all languages
      const updatedData = { ...prev };
      Object.keys(updatedData).forEach((language) => {
        updatedData[language] = {
          ...updatedData[language],
          list: [...updatedData[language].list, { ...newProject }],
        };
      });

      return updatedData;
    });
  };

  const removeProject = (lang: string, projectIndex: number) => {
    setEditedData((prev: any) => {
      // Remove the project from all languages
      const updatedData = { ...prev };
      Object.keys(updatedData).forEach((language) => {
        const updatedList = [...updatedData[language].list];
        updatedList.splice(projectIndex, 1);
        updatedData[language] = {
          ...updatedData[language],
          list: updatedList,
        };
      });

      return updatedData;
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    setEditedData((prev: any) => {
      // Reorder projects in all languages
      const updatedData = { ...prev };
      Object.keys(updatedData).forEach((language) => {
        const updatedList = [...updatedData[language].list];
        const [reorderedItem] = updatedList.splice(sourceIndex, 1);
        updatedList.splice(destinationIndex, 0, reorderedItem);
        updatedData[language] = {
          ...updatedData[language],
          list: updatedList,
        };
      });

      return updatedData;
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
        <DragDropContext onDragEnd={handleDragEnd}>
          {Object.keys(editedData || {}).map((lang) => (
            <div key={lang} className="p-6 rounded-lg shadow-md w-full">
              <h2 className="text-2xl font-semibold mb-4">
                {lang.toUpperCase()} Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-2 font-medium">Title:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded dark:text-black"
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
                    className="w-full p-2 border rounded dark:text-black"
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

                <Droppable droppableId={`projects-${lang}`}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {editedData[lang].list.map(
                        (project: Project, projectIndex: number) => (
                          <Draggable
                            key={projectIndex}
                            draggableId={`${lang}-project-${projectIndex}`}
                            index={projectIndex}
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
                                    removeProject(lang, projectIndex)
                                  }
                                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                  ❌
                                </button>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block mb-2">Title:</label>
                                    <input
                                      type="text"
                                      className="w-full p-2 border rounded dark:text-black"
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
                                      className="w-full p-2 border rounded dark:text-black"
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
                                      className="w-full p-2 border rounded dark:text-black"
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
                                    <label className="block mb-2">
                                      Description:
                                    </label>
                                    <textarea
                                      className="w-full p-2 border rounded dark:text-black"
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
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
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
