import React from "react";

const SubscribeCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-[0px_1px_6px_0px] shadow-black/20 rounded-xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
        
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

        {/* Right Section - Contact Form */}
        <div className="flex flex-col items-start p-6 text-gray-500 w-full md:w-1/2">
          <div className="bg-blue-600/20 p-3 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 34 34"
              height="28"
              width="28"
            >
              <path
                strokeLinejoin="round"
                strokeWidth="2.5"
                stroke="#115DFC"
                d="m7.084 9.917-1.727 1.15c-1.238.826-1.856 1.239-2.192 1.868-.335.629-.333 1.368-.328 2.848.006 1.78.023 3.594.069 5.43.108 4.356.163 6.534 1.764 8.135 1.601 1.602 3.809 1.657 8.223 1.767 2.747.069 5.469.069 8.215 0 4.414-.11 6.622-.165 8.223-1.767s1.656-3.779 1.764-8.135c.046-1.836.063-3.65.069-5.43.005-1.48.007-2.219-.328-2.848-.336-.63-.954-1.042-2.192-1.867l-1.727-1.151"
              />
              <path
                strokeLinejoin="round"
                strokeWidth="2.5"
                stroke="#115DFC"
                d="m2.833 14.167 9.794 5.876c2.13 1.278 3.196 1.917 4.373 1.917s2.243-.639 4.373-1.917l9.794-5.876"
              />
              <path
                strokeWidth="2.5"
                stroke="#115DFC"
                d="M7.083 17V8.5c0-2.671 0-4.007.83-4.837s2.166-.83 4.837-.83h8.5c2.671 0 4.007 0 4.837.83s.83 2.166.83 4.837V17"
              />
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                stroke="#115DFC"
                d="M14.167 14.167h5.666M14.167 8.5h5.666"
              />
            </svg>
          </div>

          <h1 className="text-xl font-semibold mt-4 text-gray-800">
            Contact & Subscribe
          </h1>

          <p className="text-sm mt-3">
            Subscribe to our newsletter and reach out for any queries. Stay connected!
          </p>

          <input
            type="email"
            placeholder="Enter your email id"
            className="text-sm border border-gray-500/30 max-w-80 w-full px-3 h-10 outline-none rounded mt-4"
          />

          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-600/90 transition text-white w-full h-10 mt-3 rounded text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeCard;
