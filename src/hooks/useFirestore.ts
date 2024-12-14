import { useState, useEffect, useCallback } from 'react';
import {
  doc,
  getDoc,
  updateDoc as firestoreUpdateDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase-config.ts'; // Adjust import path as needed

export const useFirestoreDoc = (collectionName: string, docId: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDocument = useCallback(async () => {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        setError(new Error('No such document!'));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('An unknown error occurred')
      );
    } finally {
      setLoading(false);
    }
  }, [collectionName, docId]);

  const updateDocument = async (updatedData: any) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await firestoreUpdateDoc(docRef, updatedData);
      setData(updatedData);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Update failed'));
      return false;
    }
  };

  const refreshDocument = () => {
    fetchDocument();
  };

  useEffect(() => {
    fetchDocument();
  }, [fetchDocument]);

  return {
    data,
    loading,
    error,
    updateDocument,
    refreshDocument,
  };
};

export const useFirestoreCollection = (collectionName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCollection = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(fetchedData);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch collection')
      );
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return {
    data,
    loading,
    error,
    refreshCollection: fetchCollection,
  };
};
