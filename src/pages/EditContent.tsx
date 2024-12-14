import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestoreDoc } from '../hooks/useFirestore.ts';

const EditContent = ({ isAuth }: { isAuth: boolean }) => {
  const navigate = useNavigate();
  const { data, loading, error, updateDocument } = useFirestoreDoc(
    'websiteContent',
    'intro'
  );
  const [editedData, setEditedData] = useState<any>(null);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  // Initialize editedData when data is loaded
  React.useEffect(() => {
    if (data) {
      setEditedData(data);
    }
  }, [data]);

  const handleChange = (lang: string, field: string, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await updateDocument(editedData);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to update document', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Content</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dynamic language sections */}
        {Object.keys(editedData || {}).map((lang) => (
          <div key={lang} className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              {lang.toUpperCase()} Section
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Title:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editedData[lang].title}
                  onChange={(e) => handleChange(lang, 'title', e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2">Heading:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editedData[lang].heading}
                  onChange={(e) =>
                    handleChange(lang, 'heading', e.target.value)
                  }
                />
              </div>

              <div className="col-span-full">
                <label className="block mb-2">Body:</label>
                <textarea
                  className="w-full p-2 border rounded h-40"
                  value={editedData[lang].body}
                  onChange={(e) => handleChange(lang, 'body', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContent;
