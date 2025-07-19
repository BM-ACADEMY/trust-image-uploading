import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/trust logo.jpg';

function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-white shadow-lg p-4 sticky top-0 z-50 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-14 w-auto max-sm:h-10" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center flex-grow">
            <ul className="flex items-center space-x-8 text-lg font-medium">
              <li>
                <Link to="/" className="text-blue-600 hover:text-blue-800 relative group">
                  முகப்பு
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
              {/* <li className="relative" ref={servicesRef}>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                சேவைகள்
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="absolute mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-50">
                    <Link to="/services/web" className="block px-4 py-2 text-blue-600 hover:bg-blue-50" onClick={() => setIsServicesOpen(false)}> மருத்துவ உதவி </Link>
                    <Link to="/services/mobile" className="block px-4 py-2 text-blue-600 hover:bg-blue-50" onClick={() => setIsServicesOpen(false)}>   வாழ்வாதார உதவிகள் </Link>
                    <Link to="/services/consulting" className="block px-4 py-2 text-blue-600 hover:bg-blue-50" onClick={() => setIsServicesOpen(false)}>தாவா பணிகள் </Link>
                  <Link to="/services/common" className="block px-4 py-2 text-blue-600 hover:bg-blue-50" onClick={() => setIsServicesOpen(false)}>பொதுப்பணிகள் </Link>
                  </div>
                )}
              </li> */}
               <li>
                <Link to="/Services" className="text-blue-600 hover:text-blue-800 relative group">
                  சேவைகள்
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
              <li>
                <Link to="/presentations" className="text-blue-600 hover:text-blue-800 relative group">
                  சமூகப் பணிகள்
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-600 hover:text-blue-800 relative group">
                  தொடர்பு
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch (Desktop Only) */}
          <div className="hidden md:block">
            <Link
              to="/get-in-touch"
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
            >
              Donate
            </Link>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-600 hover:text-blue-800"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Animated Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col items-center text-center space-y-4 py-4 text-lg">
            <li>
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                முகப்பு
              </Link>
            </li>
            <li ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-blue-600 hover:text-blue-800 flex items-center justify-center w-full"
              >
                 சேவைகள்
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isServicesOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              {isServicesOpen && (
                <div className="flex flex-col gap-2 pt-2">
                  <Link to="/services/web" className="text-blue-600 hover:text-blue-800" onClick={() => {
                    setIsServicesOpen(false);
                    setIsMobileMenuOpen(false);
                  }}>மருத்துவ உதவி </Link>
                  <Link to="/services/mobile" className="text-blue-600 hover:text-blue-800" onClick={() => {
                    setIsServicesOpen(false);
                    setIsMobileMenuOpen(false);
                  }}> வாழ்வாதார உதவிகள் </Link>
                  <Link to="/services/consulting" className="text-blue-600 hover:text-blue-800" onClick={() => {
                    setIsServicesOpen(false);
                    setIsMobileMenuOpen(false);
                  }}>தாவா பணிகள் </Link>
                  <Link to="/services/common" className="text-blue-600 hover:text-blue-800" onClick={() => {
                    setIsServicesOpen(false);
                    setIsMobileMenuOpen(false);
                  }}>பொதுப்பணிகள் </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/presentations"
                className="text-blue-600 hover:text-blue-800 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                சமூகப் பணிகள்
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-blue-600 hover:text-blue-800 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                தொடர்பு
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sticky Floating Get in Touch Button on Mobile */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Link
          to="/get-in-touch"
          className="bg-red-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-red-600 transition"
        >
          Donate
        </Link>
      </div>
    </>
  );
}

export default Navbar;
