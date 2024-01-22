import React from 'react';
import { Link } from 'react-scroll';

const Nav = () => {
  const linkClass =
    "relative hover:cursor-pointer w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-secondary after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left after:rounded-full font-semibold";

  return (
    <div className="flex gap-8 align justify-end items-center">
      <Link
        to=""
        smooth={true}
        offset={-50}
        duration={500}
        className={linkClass}
      >
        OM MIG
      </Link>
      <Link
        to="project"
        smooth={true}
        offset={-50}
        duration={500}
        className={linkClass}
      >
        PROJEKT
      </Link>
      <Link
        to=""
        smooth={true}
        offset={-50}
        duration={500}
        className={linkClass}
      >
        CV
      </Link>
      <Link
        to="contact"
        smooth={true}
        offset={-50}
        duration={500}
        className={linkClass}
      >
        KONTAKT
      </Link>
      <Link
        to=""
        smooth={true}
        offset={-50}
        duration={500}
        className={linkClass}
      >
        🇺🇸
      </Link>
    </div>
  );
};

export default Nav;
