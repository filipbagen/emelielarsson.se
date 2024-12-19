import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext.tsx';

// Define proper types for props and links
interface NavLinkProps {
  to: string;
  isScrollLink?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface NavLink {
  to: string;
  text: string;
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
          spy: true, // Add spy for active state tracking
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
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { currentLang, setCurrentLang } = useLanguage();

  // Extract links configuration
  const links: NavLink[] = [
    { to: '/', text: 'nav.home' },
    { to: 'project', text: 'nav.project' },
    { to: '/resume', text: 'nav.resume' },
    { to: 'contact', text: 'nav.contact' },
  ];

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [currentLang, i18n]);

  useEffect(() => {
    // Cleanup function to prevent memory leaks
    const menuBackground = document.querySelector('.menu-background');
    const handleClick = () => menuBackground?.classList.toggle('active');

    menuBackground?.addEventListener('click', handleClick);

    return () => {
      menuBackground?.removeEventListener('click', handleClick);
    };
  }, []);

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

  // Extract styles to constants
  const linkClass = `
    relative cursor-pointer w-fit block 
    after:block after:content-[''] after:absolute after:h-[3px] 
    after:bg-secondary after:w-full after:scale-x-0 
    hover:after:scale-x-100 after:transition after:duration-300 
    after:origin-left after:rounded-full font-semibold
  `.trim();

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
          className={linkClass}
          onClick={isMobile ? toggleMenu : undefined}
        >
          {t(link.text)}
        </NavLink>
      ))}
      <button
        className={linkClass}
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
