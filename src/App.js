import './App.css';

// components
import ProfileCard from '../src/components/ProfileCard.tsx';

function App() {
  return (
    <div className="flex flex-col justify-center items-center bg-primary w-screen h-screen">
      {/* <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-white rounded-bl-lg shadow-inner inset-shadow"> */}
      {/* Content */}
      {/* </div> */}
      <ProfileCard />
    </div>
  );
}

export default App;
