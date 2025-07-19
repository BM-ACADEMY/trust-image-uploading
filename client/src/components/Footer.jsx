import React from 'react';
import logo from '../assets/logo.png';
import { MdEmail } from 'react-icons/md';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-black bg-white">
      <div className="w-full border-t border-gray-300 mb-6"></div>

      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
        {/* Left Section */}
        <div className="flex-1">
          <img
            alt="Logo"
            className="h-18 w-auto max-m:h-10"
            src={logo}
          />
          <p className="mt-6 text-sm">
            மக்களின் கல்வி, சுகாதாரம், வாழ்வாதாரம் மற்றும் இஸ்லாமிய விழிப்புணர்வுக்காக அர்ப்பணிக்கப்படும் ஒரு அறக்கட்டளை. மருத்துவ உதவிகள், தாவா பணிகள், பொதுப்பணிகள் மற்றும் வாழ்வாதார உதவிகள் மூலம் சமூகத்தில் நேரடி தாக்கத்தை ஏற்படுத்தும் பணிகளை தொடர்ந்து செய்து வருகிறது.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex gap-10 md:gap-20">
          {/* Company Links */}
          <div className="flex-1">
            <h2 className="font-semibold mb-5">KIET</h2>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:underline">முகப்பு</a></li>
              <li><a href="/Services" className="hover:underline">சேவைகள்</a></li>
              <li><a href="/presentations" className="hover:underline">சமூகப் பணிகள்</a></li>
              <li><a href="/contact" className="hover:underline">தொடர்பு</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex-1">
            <h2 className="font-semibold mb-5">முகவரி</h2>
            <div className="text-sm space-y-2">
              <p>எண்.36, பழைய பட்டினப்பாதை, கோட்டக்குப்பம் வானூர் தாலுகா, விழுப்புரம் மாவட்டம் 605104</p>

              {/* Mail Row */}
              <div className="flex items-center gap-2 pt-2">
                <MdEmail className="text-xl text-blue-600" />
                <span>info@example.com</span>
              </div>

              {/* Facebook Row */}
              <div className="flex items-center gap-2">
                <FaFacebookF className="text-xl text-blue-600" />
                <span>/</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} ©{' '}
        <a href="https://bmtechx.in/" target='_blank' className="underline hover:text-grey">BM TECHx</a>. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
