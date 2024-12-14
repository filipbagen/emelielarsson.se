import React, { Suspense, useState } from 'react'; // Import React
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config.tsx';

// pages
import Home from './pages/Home.tsx';
import ResumePage from './pages/ResumePage.tsx';
import Login from './pages/Login.tsx';
import EditContent from './pages/EditContent.tsx';

// styles
import './App.css';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

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
      <BrowserRouter>
        {/* TODO: Move Nav.tsx to HTML nav */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/edit">Edit</Link>
          {!isAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <button onClick={signUserOut}>Sign Out</button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="resume" element={<ResumePage />} />

          {/* Admin pages */}
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/edit" element={<EditContent />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
