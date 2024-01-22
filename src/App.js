import './App.css';

// data
import data from '../src/data/data.json';

// components
import ProfileCard from '../src/components/ProfileCard.tsx';
import ProjectPage from '../src/components/ProjectPage.tsx';
import Nav from './components/Nav.tsx';
import Contact from './components/Contact.tsx';

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-primary w-screen">
      <div className="max-w-[742px] mx-8">
        <Nav />
        <ProfileCard />
        <ProjectPage />
        <Contact />
      </div>
    </div>
  );
};

export default App;
