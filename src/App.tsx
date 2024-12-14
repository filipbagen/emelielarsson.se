import React, { Suspense } from 'react'; // Import React
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// pages
import Home from './pages/Home.tsx';
import ResumePage from './pages/ResumePage.tsx';
import Login from './pages/Login.tsx';
import EditContent from './pages/EditContent.tsx';

// styles
import './App.css';

const App = () => {
  return (
    <Suspense fallback="loading">
      <BrowserRouter>
        {/* TODO: Move Nav.tsx to HTML nav */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/edit">Edit</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="resume" element={<ResumePage />} />

          {/* Admin pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/edit" element={<EditContent />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
