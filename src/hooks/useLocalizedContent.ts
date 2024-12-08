import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config.ts';
import { useLanguage } from '../LanguageContext.tsx';

const useLocalizedContent = (collection: string, document: string) => {
  const { currentLang } = useLanguage();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, collection, document);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const languageData = data[currentLang];
          if (languageData) {
            setContent(languageData);
          } else {
            console.error(`No content found for language: ${currentLang}`);
            setContent(null);
          }
        } else {
          console.error('No such document in Firestore!');
          setContent(null);
        }
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [collection, document, currentLang]);

  return { content, loading, error };
};

export default useLocalizedContent;
