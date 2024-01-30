import React, { Suspense } from 'react'; // Import React
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Home from './components/Home.tsx';
import ResumePage from './components/ResumePage.tsx';

// styles
import './App.css';

const App = () => {
  return (
    <Suspense fallback="loading">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="resume" element={<ResumePage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
