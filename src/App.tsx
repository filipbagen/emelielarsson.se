import React, { Suspense, useState, useEffect } from 'react'; // Import React
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

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuth');
    if (authStatus === 'true') {
      setIsAuth(true);
    }
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

  return (
    <Suspense fallback="loading">
      <LanguageProvider>
        <BrowserRouter>
          {/* TODO: Move Nav.tsx to HTML nav */}
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
            <Route path="/edit" element={<EditContent isAuth={isAuth} />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </Suspense>
  );
};

export default App;
