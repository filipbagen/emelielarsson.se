import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config.ts';

const EditContent = ({ isAuth }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    en: { body: '', heading: '', title: '' },
    sv: { body: '', heading: '', title: '' },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    } else {
      const fetchData = async () => {
        const docRef = doc(db, 'websiteContent', 'intro');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log('No such document!');
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [isAuth, navigate]);

  const handleChange = (e, lang, field) => {
    setData({
      ...data,
      [lang]: {
        ...data[lang],
        [field]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'websiteContent', 'intro');
    await updateDoc(docRef, data);
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Content</h1>
      <form onSubmit={handleSubmit}>
        {['en', 'sv'].map((lang) => (
          <div key={lang}>
            <h2>{lang.toUpperCase()}</h2>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={data[lang].title}
                onChange={(e) => handleChange(e, lang, 'title')}
              />
            </div>
            <div>
              <label>Heading:</label>
              <input
                type="text"
                value={data[lang].heading}
                onChange={(e) => handleChange(e, lang, 'heading')}
              />
            </div>
            <div>
              <label>Body:</label>
              <textarea
                value={data[lang].body}
                onChange={(e) => handleChange(e, lang, 'body')}
              />
            </div>
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditContent;
