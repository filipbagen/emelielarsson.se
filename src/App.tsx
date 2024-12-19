import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config.ts';
import { LanguageProvider } from './context/LanguageContext.tsx';

// pages
import Home from './pages/Home.tsx';
import ResumePage from './pages/ResumePage.tsx';
import Login from './pages/Login.tsx';
import EditContent from './pages/EditContent.tsx';

// styles
import './App.css';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuth');
    if (authStatus === 'true') {
      console.log('User is authenticated');
      setIsAuth(true);
    }
    setIsLoading(false); // Mark loading as complete
  }, []);

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('isAuth');
        setIsAuth(false);
        window.location.pathname = '/';
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or your preferred loading component
  }

  return (
    <Suspense fallback="loading">
      <LanguageProvider>
        <BrowserRouter>
          <nav>
            <Link to="/edit">Edit</Link>
            {!isAuth ? (
              <Link to="/login">Login</Link>
            ) : (
              <button onClick={signUserOut}>Sign Out</button>
            )}
          </nav>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="resume" element={<ResumePage />} />

            {/* Admin pages */}
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            <Route
              path="/edit"
              element={<EditContent isAuth={isAuth} isLoading={isLoading} />}
            />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </Suspense>
  );
};

export default App;
