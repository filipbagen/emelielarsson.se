import React, { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// components
import Home from './components/Home.tsx';
import ResumePage from './components/ResumePage.tsx';
import Login from './pages/Login.tsx';

import './App.css';

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(
    localStorage.getItem('isAuth') === 'true'
  );

  const signUserOut = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  return (
    <Suspense fallback="loading">
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          {isAuth ? (
            <>
              <Link to="/edit">Edit</Link>
              <button onClick={signUserOut}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
