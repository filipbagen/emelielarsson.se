import React from 'react';
import Nav from './Nav.tsx';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-screen min-h-screen">
      <div className="w-full max-w-[742px] p-8">
        <Nav />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
