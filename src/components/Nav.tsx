import React from 'react';
import { Link } from 'react-scroll';

const Nav = () => {
  return (
    <div className="flex gap-8 align justify-end items-center">
      <h4>OM MIG</h4>
      <Link to="project" smooth={true} offset={-50} duration={500}>
        PROJEKT
      </Link>
      <h4>CV</h4>
      <Link to="contact" smooth={true} offset={-50} duration={500}>
        KONTAKT
      </Link>
      <h4>🇺🇸</h4>
    </div>
  );
};

export default Nav;
