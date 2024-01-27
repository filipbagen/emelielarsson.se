import './App.css';

// data
import data from '../src/data/data.json';

// react
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Home from './components/Home.tsx';
import ResumePage from './components/ResumePage.tsx';
import ProjectPage from './components/ProjectPage.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="resume" element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
