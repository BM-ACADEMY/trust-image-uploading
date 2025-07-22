import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const SubscribeCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white border border-gray-300 shadow-[0px_1px_6px_0px] shadow-black/20 rounded-xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl"
      >
        {/* Left Section - Map */}
        <div className="w-full md:w-1/2 h-80 md:h-auto">
          <iframe
            title="KIET Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.1327060374833!2d79.83540717482384!3d11.965312688265119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53633fea2bc8e9%3A0x386e016e334faece!2sKIET%20kottakuppam!5e0!3m2!1sen!2sin!4v1752746002752!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
          ></iframe>
        </div>

        {/* Right Section - Contact Info */}
        <div className="flex flex-col items-start p-6 w-full md:w-1/2 border-l border-gray-200 space-y-6 bg-white">
          {/* Address */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="transition bg-gray-50 hover:bg-blue-50 hover:shadow-md p-4 rounded w-full"
          >
            <div className="flex items-center gap-3 text-gray-800">
              <FaMapMarkerAlt className="text-red-600 text-xl" />
              <h2 className="text-lg font-semibold">முகவரி</h2>
            </div>
            <p className="text-sm leading-relaxed pl-7 mt-2 text-gray-600">
              எண்.36, பழைய பட்டினப்பாதை,<br />
              கோட்டக்குப்பம், வானூர் தாலுகா,<br />
              விழுப்புரம் மாவட்டம் - 605104
            </p>
          </motion.div>

          {/* Phone Numbers */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="transition bg-gray-50 hover:bg-blue-50 hover:shadow-md p-4 rounded w-full"
          >
            <div className="flex items-center gap-3 text-gray-800">
              <FaPhoneAlt className="text-green-600 text-xl" />
              <h2 className="text-lg font-semibold">தொலைபேசி எண்கள்</h2>
            </div>
            <ul className="text-sm pl-7 mt-2 space-y-2 text-gray-600">
              <li>அப்துல்சமத் - 9994665870 - தலைவர்</li>
              <li>முகமது ஜாபர் அலி - 6385556574 - செயளாலர்</li>
              <li>முகமது அப்பாஸ் - 8883802259 - பொருளாலர்</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscribeCard;
