import './App.css';
import { Suspense } from 'react';

// data
import data from './data/data.json';

// react
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Home from './components/Home.tsx';
import ResumePage from './components/ResumePage.tsx';
import ProjectPage from './components/ProjectPage.tsx';

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
