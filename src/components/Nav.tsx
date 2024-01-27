import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Nav = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const linkClass =
    "relative cursor-pointer w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-secondary after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left after:rounded-full font-semibold";

  return (
    <nav className="flex gap-8 justify-end items-center">
      <Link to="/" className={linkClass}>
        OM MIG
      </Link>

      <ScrollLink
        to="project"
        smooth={true}
        offset={-50}
        duration={500}
        className={linkClass}
      >
        PROJEKT
      </ScrollLink>

      <Link to="/resume" className={linkClass}>
        CV
      </Link>
      <ScrollLink
        to="contact"
        smooth={true}
        offset={-50}
        duration={500}
        className={linkClass}
      >
        KONTAKT
      </ScrollLink>
      {/* If the flag is supposed to change the language or navigate somewhere, use the appropriate Link component */}
      <div>🇺🇸</div>
    </nav>
  );
};

export default Nav;
