import React, { useEffect, useState } from 'react';
import { useFirestoreDoc } from '../../hooks/useFirestore.ts';
import Button from '../Button.tsx';

const IntroEditor = () => {
  const introDoc = useFirestoreDoc('websiteContent', 'intro');
  const [editedData, setEditedData] = useState<any>(null);

  useEffect(() => {
    if (introDoc.data) {
      setEditedData(introDoc.data);
    }
  }, [introDoc.data]);

  const handleSectionChange = (lang: string, field: string, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      await introDoc.updateDocument(editedData);
      alert('Intro updated successfully!');
    } catch (err) {
      console.error('Failed to update intro', err);
    }
  };

  if (introDoc.loading) return <div>Loading...</div>;
  if (introDoc.error) return <div>Error loading intro content.</div>;

  return (
    <div>
      <div className="flex flex-row gap-6 justify-center">
        {Object.keys(editedData || {}).map((lang) => (
          <div key={lang} className="p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {lang.toUpperCase()} Section
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Title:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded dark:text-black"
                  value={editedData[lang].title}
                  onChange={(e) =>
                    handleSectionChange(lang, 'title', e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Heading:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded dark:text-black"
                  value={editedData[lang].heading}
                  onChange={(e) =>
                    handleSectionChange(lang, 'heading', e.target.value)
                  }
                />
              </div>
              <div className="col-span-full">
                <label className="block mb-2 font-medium">Body:</label>
                <textarea
                  className="w-full p-2 border rounded h-40 dark:text-black"
                  value={editedData[lang].body}
                  onChange={(e) =>
                    handleSectionChange(lang, 'body', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button variant="primary" onClick={handleSave}>
          Save Intro
        </Button>
      </div>
    </div>
  );
};

export default IntroEditor;
