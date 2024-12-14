// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBrlLLOL11I9GohUOe4wr70JRJARNLveEQ',
  authDomain: 'emelielarsson-portfolio.firebaseapp.com',
  projectId: 'emelielarsson-portfolio',
  storageBucket: 'emelielarsson-portfolio.firebasestorage.app',
  messagingSenderId: '858875066731',
  appId: '1:858875066731:web:e191ab50a6c59af043f42e',
  measurementId: 'G-LNL9YCYGLH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
