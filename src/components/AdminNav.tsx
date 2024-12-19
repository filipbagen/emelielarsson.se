import React from 'react';
import { Link } from 'react-router-dom';
import { underlineAnimation } from './styles/animation.ts';

interface AdminNavProps {
  onSignOut: () => void;
}

const AdminNav = ({ onSignOut }) => {
  return (
    <nav className="flex gap-8 justify-end items-center mb-8">
      <Link to="/" className={`${underlineAnimation} font-semibold`}>
        Home
      </Link>
      <button
        onClick={onSignOut}
        className={`${underlineAnimation} font-semibold`}
      >
        Sign Out
      </button>
    </nav>
  );
};

export default AdminNav;
