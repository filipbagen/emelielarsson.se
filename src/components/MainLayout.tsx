import React, { ReactNode } from 'react';
import Nav from './Nav.tsx';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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
