import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavLink = ({ to, isScrollLink, children, className, onClick }) => {
  const LinkComponent =
    to === '/resume' ? RouterLink : isScrollLink ? ScrollLink : RouterLink;
  const linkProps =
    isScrollLink && to !== '/resume'
      ? { smooth: true, offset: -50, duration: 500 }
      : {};

  return (
    <LinkComponent
      to={to}
      className={className}
      onClick={onClick}
      {...linkProps}
    >
      {children}
    </LinkComponent>
  );
};

const Nav = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [currentLang, i18n]);

  useEffect(() => {
    const setupMenuBackground = () => {
      const menuBackground = document.querySelector('.menu-background');
      if (menuBackground) {
        menuBackground.addEventListener('click', () =>
          menuBackground.classList.toggle('active')
        );
      }
    };

    setupMenuBackground();
  }, []);

  const toggleLanguage = () => {
    setCurrentLang((lang) => (lang === 'en' ? 'sv' : 'en'));
  };

  const toggleMenu = () => {
    setIsAnimating(true);
    requestAnimationFrame(() => {
      setIsOpen(!isOpen);
    });
    setTimeout(() => setIsAnimating(false), 300);
  };

  const linkClass =
    "relative cursor-pointer w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-secondary after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left after:rounded-full font-semibold";

  const links = [
    { to: '/', text: 'nav.home' },
    { to: 'project', text: 'nav.project' },
    { to: '/resume', text: 'nav.resume' }, // updated this line
    { to: 'contact', text: 'nav.contact' },
  ];

  // const menuIcon = document.getElementById('menu-icon');
  // const background = document.getElementById('background');

  // if (menuIcon && background) {
  //   menuIcon.onclick = function () {
  //     if (background.style.backgroundColor === 'rgba(0, 0, 0, 0.5)') {
  //       background.style.backgroundColor = ''; // Change back to original color
  //       background.style.filter = ''; // Remove blur
  //     } else {
  //       background.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Darken background
  //       background.style.filter = 'blur(5px)'; // Apply blur
  //     }
  //   };
  // }

  return (
    <nav className="flex gap-8 justify-end items-center">
      <div
        className="sm:hidden block mb-10 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
      >
        {isOpen ? (
          <FaTimes id="menu-icon" size={24} />
        ) : (
          <FaBars id="menu-icon" size={24} />
        )}
      </div>

      {/* <div id="background"></div> */}

      <div className="hidden sm:flex gap-8">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={location.pathname === '/' ? link.to : `/#${link.to}`}
            isScrollLink={location.pathname === '/'}
            className={linkClass}
            onClick={() => {}}
          >
            {t(link.text)}
          </NavLink>
        ))}
        <div className={linkClass} onClick={toggleLanguage}>
          {currentLang === 'en' ? '🇸🇪' : '🇺🇸'}
        </div>
      </div>

      {(isOpen || isAnimating) && (
        <div
          className={`menu-background ${isOpen ? 'fadeIn' : 'fadeOut'}`}
          onClick={toggleMenu}
        >
          <div
            className="w-[300px] rounded-r-2xl h-full shadow-2xl bg-[#F8F3F0] dark:bg-black flex flex-col items-center justify-center space-y-8 overflow-auto transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={location.pathname === '/' ? link.to : `/#${link.to}`}
                isScrollLink={location.pathname === '/'}
                className={linkClass}
                onClick={toggleMenu}
              >
                {t(link.text)}
              </NavLink>
            ))}
            <div
              className={linkClass}
              onClick={() => {
                toggleLanguage();
                toggleMenu();
              }}
            >
              {currentLang === 'en' ? '🇸🇪' : '🇺🇸'}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
