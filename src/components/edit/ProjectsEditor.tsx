import React, { useEffect, useState } from 'react';
import { useFirestoreDoc } from '../../hooks/useFirestore.ts';
import { Project } from '../../types/content';
import Button from '../Button.tsx';
import MultilingualEditor from '../MultilingualEditor.tsx';

interface ProjectsData {
  [lang: string]: {
    title: string;
    body: string;
    list: Project[];
  };
}

const ProjectsEditor = () => {
  const projectsDoc = useFirestoreDoc('websiteContent', 'projects');
  const [editedData, setEditedData] = useState<ProjectsData | null>(null);

  useEffect(() => {
    if (projectsDoc.data) {
      setEditedData(projectsDoc.data as ProjectsData);
    }
  }, [projectsDoc.data]);

  const renderProjectItem = (
    lang: string,
    project: Project,
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
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:text-black"
            value={project.title}
            onChange={(e) => {
              const updatedData = { ...editedData! };
              updatedData[lang].list[index].title = e.target.value;
              setEditedData(updatedData);
            }}
          />
        </div>
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:text-black"
            value={project.name}
            onChange={(e) => {
              const updatedData = { ...editedData! };
              updatedData[lang].list[index].name = e.target.value;
              setEditedData(updatedData);
            }}
          />
        </div>
        
        <div className="col-span-full">
          <label className="block mb-2">Description:</label>
          <textarea
            className="w-full p-2 border rounded dark:text-black"
            value={project.description}
            onChange={(e) => {
              const updatedData = { ...editedData! };
              updatedData[lang].list[index].description = e.target.value;
              setEditedData(updatedData);
            }}
          />
        </div>
        <div className="col-span-full">
          <label className="block mb-2">Tags:</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:text-black"
            value={project.tags.join(', ')}
            onChange={(e) => {
              const updatedData = { ...editedData! };
              updatedData[lang].list[index].tags = e.target.value
                .split(',')
                .map((tag) => tag.trim());
              setEditedData(updatedData);
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderProjectHeaders = (
    lang: string,
    data: ProjectsData,
    onDataChange: (newData: ProjectsData) => void
  ) => (
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block mb-2 font-medium">Title:</label>
        <input
          type="text"
          className="w-full p-2 border rounded dark:text-black"
          value={data[lang].title}
          onChange={(e) =>
            onDataChange({
              ...data,
              [lang]: {
                ...data[lang],
                title: e.target.value,
              },
            })
          }
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">Description:</label>
        <textarea
          className="w-full p-2 border rounded dark:text-black"
          value={data[lang].body}
          onChange={(e) =>
            onDataChange({
              ...data,
              [lang]: {
                ...data[lang],
                body: e.target.value,
              },
            })
          }
        />
      </div>
    </div>
  );

  const handleSave = async () => {
    if (!editedData) return;
    try {
      await projectsDoc.updateDocument(editedData);
      alert('Projects updated successfully!');
    } catch (err) {
      console.error('Failed to update projects', err);
    }
  };

  if (projectsDoc.loading) return <div>Loading...</div>;
  if (projectsDoc.error) return <div>Error loading projects content.</div>;
  if (!editedData) return <div>No data available.</div>;

  return (
    <div>
      <MultilingualEditor
        data={editedData}
        onDataChange={setEditedData}
        renderItem={renderProjectItem}
        addItemTemplate={{
          title: 'New Project',
          name: '',
          tags: [],
          description: '',
        }}
        renderHeader={renderProjectHeaders}
        addButtonText="+ Add Project"
      />

      <div className="mt-4">
        <Button variant="primary" onClick={handleSave}>
          Save Projects
        </Button>
      </div>
    </div>
  );
};

export default ProjectsEditor;
