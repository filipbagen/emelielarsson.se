import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext.tsx';
import { underlineAnimation } from './styles/animation.ts';

interface NavLinkProps {
  to: string;
  isScrollLink?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface NavLinkType {
  to: string;
  textEn: string;
  textSv: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  isScrollLink = false,
  children,
  className,
  onClick,
}) => {
  const LinkComponent =
    to === '/resume' ? RouterLink : isScrollLink ? ScrollLink : RouterLink;

  const scrollLinkProps =
    isScrollLink && to !== '/resume'
      ? {
          smooth: true,
          offset: -50,
          duration: 500,
          spy: true,
        }
      : {};

  return (
    <LinkComponent
      to={to}
      className={className}
      onClick={onClick}
      {...scrollLinkProps}
    >
      {children}
    </LinkComponent>
  );
};

const Nav: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { currentLang, setCurrentLang } = useLanguage();

  const links: NavLinkType[] = [
    { to: '/', textEn: 'Home', textSv: 'Hem' },
    { to: 'project', textEn: 'Projects', textSv: 'Uppdrag' },
    { to: '/resume', textEn: 'Resume', textSv: 'CV' },
    { to: 'contact', textEn: 'Contact', textSv: 'Kontakt' },
  ];

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === 'en' ? 'sv' : 'en'));
  };

  const toggleMenu = () => {
    setIsAnimating(true);
    requestAnimationFrame(() => {
      setIsOpen((prev) => !prev);
    });
    setTimeout(() => setIsAnimating(false), 300);
  };

  const mobileMenuClass = `
    w-[300px] rounded-r-2xl h-[100dvh] shadow-2xl 
    bg-[#F8F3F0] dark:bg-black flex flex-col items-center 
    justify-center space-y-8 overflow-auto transform 
    transition-transform duration-300 ease-in-out
  `.trim();

  const renderLinks = (isMobile = false) => (
    <>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={location.pathname === '/' ? link.to : `/#${link.to}`}
          isScrollLink={location.pathname === '/'}
          className={`${underlineAnimation} font-semibold`}
          onClick={isMobile ? toggleMenu : undefined}
        >
          {currentLang === 'en' ? link.textEn : link.textSv}
        </NavLink>
      ))}
      <button
        className={`${underlineAnimation} font-semibold`}
        onClick={
          isMobile
            ? () => {
                toggleLanguage();
                toggleMenu();
              }
            : toggleLanguage
        }
        aria-label={`Switch to ${currentLang === 'en' ? 'Swedish' : 'English'}`}
      >
        {currentLang === 'en' ? '🇸🇪' : '🇺🇸'}
      </button>
    </>
  );

  return (
    <nav className="flex gap-8 justify-end items-center">
      <button
        className="sm:hidden block mb-10 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className="hidden sm:flex gap-8">{renderLinks()}</div>

      {(isOpen || isAnimating) && (
        <div
          className={`menu-background ${isOpen ? 'fadeIn' : 'fadeOut'}`}
          onClick={toggleMenu}
        >
          <div
            className={mobileMenuClass}
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            {renderLinks(true)}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
