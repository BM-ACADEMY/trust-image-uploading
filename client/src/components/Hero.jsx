import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingUsd, FaWhatsapp } from 'react-icons/fa';
import bisbilla from '../assets/bisbills.png';
import hero1 from '../assets/hero.png';

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Add this line

  return (
    <section
      id="section"
      className={`bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] p-0 h-full ${
        isMenuOpen ? 'overflow-hidden' : ''
      }`}
    >
      <main className="pt-0 pb-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full">
        
        {/* Center PNG Image */}
        <div className="flex justify-center py-8">
          <img
            src={bisbilla}
            alt="Center Image"
            className="w-60 h-auto object-contain"
          />
        </div>

        {/* Content and Images Side by Side */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Left Content */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <button
              onClick={() => setShowModal(true)} // ✅ Show modal on click
              className="mb-6 flex items-center space-x-2 border border-indigo-600 text-indigo-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-indigo-50 transition"
              type="button"
            >
              <span>Donate</span>
              <span className="flex items-center justify-center size-6 p-1 rounded-full bg-indigo-600">
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6.5h14M9.5 1 15 6.5 9.5 12"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <h1 className="text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
              கோட்டகுப்பம்{' '}
              <span className="text-indigo-600">இஸ்லாமிய கல்வி அறக்கட்டளை KIET</span>
            </h1>

            <p className="mt-4 text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
              கடந்த 2017 ஆம் ஆண்டு ஆரம்பிக்கப்பட்டது.
            </p>

            <div className="flex flex-col md:flex-row items-center mt-8 gap-3">
              <a
                href="https://wa.me/919994665870"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-indigo-700 transition"
              >
                <span>Get in Touch</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right Animated Images */}
          <motion.div
            aria-label="Photos of leaders"
            className="flex flex-row gap-6 pb-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {[hero1].map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Leader ${index + 1}`}
                className="w-auto h-72 rounded-lg hover:scale-105 transition duration-300 object-cover"
                whileHover={{ scale: 1.08 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              />
            ))}
          </motion.div>

        </div>
      </main>

      {/* ✅ Modal Section */}
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
    </section>
  );
};

export default HeroSection;
