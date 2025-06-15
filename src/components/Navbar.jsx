import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import FadeIn from './animations/FadeIn';

const Navbar = () => {
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navLinks = content?.navLinks || [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', 
      href: '#services',
      submenu: [
        { name: 'Consulting', href: '#services' },
        { name: 'Ezykube', href: '#features' }
      ] 
    },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <FadeIn>
      <header 
        className={`fixed w-full z-30 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg shadow-[#369b6d]/20 border-b border-[#369b6d]/10' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="#" className="group transition-all duration-300 hover:scale-105">
                <img src="/assets/images/sinad-new-logo.png" alt="SINAD LLC Logo" className="h-10 transition-all duration-300" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link, index) => (
                link.submenu ? (
                  <div key={index} className="relative group">
                    <a
                      href={link.href}
                      className="text-sm font-medium text-gray-300 hover:text-[#369b6d] transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#369b6d] after:transition-all after:duration-300 hover:after:w-full flex items-center"
                    >
                      {link.name}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-black border border-[#369b6d]/30 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                      {link.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-[#369b6d] hover:bg-black/50 transition-all duration-200"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={index}
                    href={link.href}
                    className="text-sm font-medium text-gray-300 hover:text-[#369b6d] transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#369b6d] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-400 hover:text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className={`md:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-80 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className={`py-3 border-t border-[#369b6d]/30 ${mobileMenuOpen ? 'animate-fadeIn' : ''}`}>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <div key={index}>
                    <a
                      href={link.href}
                      className="text-base font-medium text-gray-300 hover:text-[#369b6d] transition-all duration-300 pl-3 border-l-2 border-transparent hover:border-[#369b6d] flex items-center hover:translate-x-1 justify-between"
                      onClick={() => !link.submenu && setMobileMenuOpen(false)}
                    >
                      <span>{link.name}</span>
                      {link.submenu && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </a>
                    {link.submenu && (
                      <div className="ml-6 mt-2 space-y-2">
                        {link.submenu.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            className="text-sm text-gray-400 hover:text-[#369b6d] transition-all duration-300 pl-3 border-l border-gray-800 hover:border-[#369b6d] flex items-center hover:translate-x-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </FadeIn>
  );
};

export default Navbar;