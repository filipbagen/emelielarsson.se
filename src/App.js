import './App.css';

// data
import data from '../src/data/data.json';

// components
import ProfileCard from '../src/components/ProfileCard.tsx';
import ProjectPage from '../src/components/ProjectPage.tsx';
import Contact from './components/Contact.tsx';
import MainLayout from './components/MainLayout.tsx';

const App = () => {
  return (
    <MainLayout>
      <ProfileCard />
      <ProjectPage />
      <Contact />
    </MainLayout>
  );
};

export default App;
