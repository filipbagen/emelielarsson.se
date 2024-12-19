import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config.ts';
import { LanguageProvider } from './context/LanguageContext.tsx';
import AdminNav from './components/AdminNav.tsx';
import MainLayout from './components/MainLayout.tsx';

// pages
import Home from './pages/Home.tsx';
import ResumePage from './pages/ResumePage.tsx';
import Login from './pages/Login.tsx';
import EditContent from './pages/EditContent.tsx';

const AppContent = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname === '/edit';

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuth');
    if (authStatus === 'true') {
      setIsAuth(true);
    }
    setIsLoading(false);
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
    return <div>Loading...</div>;
  }

  // Render different layouts based on route
  if (isAdminRoute && isAuth) {
    return (
      <div className="flex flex-col items-center w-screen min-h-screen">
        <div className="w-full max-w-[1242px] p-8">
          <AdminNav onSignOut={signUserOut} />
          <Routes>
            <Route
              path="/edit"
              element={<EditContent isAuth={isAuth} isLoading={isLoading} />}
            />
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="resume" element={<ResumePage />} />
      <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Suspense fallback="loading">
      <LanguageProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </Suspense>
  );
};

export default App;
