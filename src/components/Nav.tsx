import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [currentLang, i18n]);

  const toggleLanguage = () => {
    setCurrentLang((lang) => (lang === 'en' ? 'sv' : 'en'));
  };

  const toggleMenu = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const linkClass =
    "relative cursor-pointer w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-secondary after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left after:rounded-full font-semibold";

  return (
    <nav className="flex gap-8 justify-end items-center">
      <div
        className="sm:hidden block mb-10 cursor-pointer"
        onClick={toggleMenu}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className="hidden sm:flex gap-8">
        <RouterLink to="/" className={linkClass}>
          {t('nav.home')}
        </RouterLink>

        {location.pathname === '/' ? (
          <ScrollLink
            to="project"
            smooth={true}
            offset={-50}
            duration={500}
            className={linkClass}
          >
            {t('nav.project')}
          </ScrollLink>
        ) : (
          <RouterLink to="/#project" className={linkClass}>
            {t('nav.project')}
          </RouterLink>
        )}

        <RouterLink to="/resume" className={linkClass}>
          {t('nav.resume')}
        </RouterLink>

        {location.pathname === '/' ? (
          <ScrollLink
            to="contact"
            smooth={true}
            offset={-50}
            duration={500}
            className={linkClass}
          >
            {t('nav.contact')}
          </ScrollLink>
        ) : (
          <RouterLink to="/#contact" className={linkClass}>
            {t('nav.contact')}
          </RouterLink>
        )}

        <div className={linkClass} onClick={toggleLanguage}>
          {currentLang === 'en' ? '🇸🇪' : '🇺🇸'}
        </div>
      </div>

      {(isOpen || isAnimating) && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
            isOpen || isAnimating ? 'menu-container open' : 'menu-container'
          }`}
          onClick={toggleMenu}
        >
          <div
            className="w-[300px] rounded-r-2xl h-full shadow-2xl bg-[#F8F3F0] dark:bg-black flex flex-col items-center justify-center space-y-8 overflow-auto transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            <RouterLink to="/" className={linkClass} onClick={toggleMenu}>
              {t('nav.home')}
            </RouterLink>

            {location.pathname === '/' ? (
              <ScrollLink
                to="project"
                smooth={true}
                offset={-50}
                duration={500}
                className={linkClass}
                onClick={toggleMenu}
              >
                {t('nav.project')}
              </ScrollLink>
            ) : (
              <RouterLink
                to="/#project"
                className={linkClass}
                onClick={toggleMenu}
              >
                {t('nav.project')}
              </RouterLink>
            )}

            <RouterLink to="/resume" className={linkClass} onClick={toggleMenu}>
              {t('nav.resume')}
            </RouterLink>

            {location.pathname === '/' ? (
              <ScrollLink
                to="contact"
                smooth={true}
                offset={-50}
                duration={500}
                className={linkClass}
                onClick={toggleMenu}
              >
                {t('nav.contact')}
              </ScrollLink>
            ) : (
              <RouterLink
                to="/#contact"
                className={linkClass}
                onClick={toggleMenu}
              >
                {t('nav.contact')}
              </RouterLink>
            )}

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
