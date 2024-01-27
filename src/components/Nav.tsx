import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Nav = () => {
  const location = useLocation();

  const linkClass =
    "relative cursor-pointer w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-secondary after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left after:rounded-full font-semibold";

  return (
    <nav className="flex gap-8 justify-end items-center">
      <RouterLink to="/" className={linkClass}>
        OM MIG
      </RouterLink>

      {location.pathname === '/' ? (
        <ScrollLink
          to="project"
          smooth={true}
          offset={-50}
          duration={500}
          className={linkClass}
        >
          PROJEKT
        </ScrollLink>
      ) : (
        <RouterLink to="/#project" className={linkClass}>
          PROJEKT
        </RouterLink>
      )}

      <RouterLink to="/resume" className={linkClass}>
        CV
      </RouterLink>

      {location.pathname === '/' ? (
        <ScrollLink
          to="contact"
          smooth={true}
          offset={-50}
          duration={500}
          className={linkClass}
        >
          KONTAKT
        </ScrollLink>
      ) : (
        <RouterLink to="/#contact" className={linkClass}>
          KONTAKT
        </RouterLink>
      )}

      {/* If the flag is supposed to change the language or navigate somewhere, use the appropriate Link component */}
      <div className={linkClass}>🇺🇸</div>
    </nav>
  );
};

export default Nav;
