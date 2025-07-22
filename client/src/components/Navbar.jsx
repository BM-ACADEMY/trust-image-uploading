import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/trust logo.jpg';
import { FaHandHoldingUsd, FaWhatsapp } from 'react-icons/fa';

function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-14 w-auto max-sm:h-10" />
            </Link>
          </div>

          <div className="hidden md:flex justify-center flex-grow">
            <ul className="flex items-center space-x-8 text-lg font-medium">
              <li>
                <Link to="/" className="text-blue-600 hover:text-blue-800 relative group">
                  முகப்பு
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
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

          {/* Desktop Donate Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition flex items-center gap-2"
            >
              <FaHandHoldingUsd />
              Donate
            </button>
          </div>

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

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col items-center text-center space-y-4 py-4 text-lg">
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-800 block" onClick={() => setIsMobileMenuOpen(false)}>
                முகப்பு
              </Link>
            </li>
           <li>
              <Link to="/Services" className="text-blue-600 hover:text-blue-800 block" onClick={() => setIsMobileMenuOpen(false)}>
                சேவைகள்
              </Link>
            </li>
            <li>
              <Link to="/presentations" className="text-blue-600 hover:text-blue-800 block" onClick={() => setIsMobileMenuOpen(false)}>
                சமூகப் பணிகள்
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-blue-600 hover:text-blue-800 block" onClick={() => setIsMobileMenuOpen(false)}>
                தொடர்பு
              </Link>
            </li>
            {/* Mobile Donate Button */}
            <li>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowModal(true);
                }}
                className="bg-red-500 text-white px-5 py-2 rounded-full shadow-lg hover:bg-red-600 transition flex items-center gap-2"
              >
                <FaHandHoldingUsd />
                Donate
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal */}
    {showModal && (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4">
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md text-center">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-800">நன்றி!</h2>
      <p className="text-gray-700 mb-2">உங்கள் நன்கொடை வழங்க கீழுள்ள வங்கிக் கணக்கு விவரங்களை பயன்படுத்துங்கள்:</p>

      <div className="bg-gray-100 rounded-md p-4 mt-4 text-left space-y-3">
        <div className="flex items-center gap-2">
          <FaHandHoldingUsd className="text-green-600" />
          <span className="font-semibold">Trust Name:</span>
          <span>Kottakuppam Islamic Education Trust</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-700">🏦 Bank:</span>
          <span>Bank of India (BOI)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-700">🔢 A/C No:</span>
          <span>806920110000184</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-700">🔗 IFSC:</span>
          <span>BKID0008069</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-700">📍 Branch:</span>
          <span>Kottakuppam</span>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 mt-6 flex-wrap">
        <button
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(false)}
        >
          OK
        </button>
        <a
          href="https://wa.me/919994665870"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center justify-center gap-2"
        >
          <FaWhatsapp />
          WhatsApp
        </a>
      </div>
    </div>
  </div>
)}


    </>
  );
}

export default Navbar;
