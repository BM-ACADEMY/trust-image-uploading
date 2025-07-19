import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// React Icons
import { FaMosque, FaHandHoldingHeart, FaHandsHelping, FaHospitalAlt, FaQuran, FaBookReader } from 'react-icons/fa';
import { MdOutlineVolunteerActivism, MdCastForEducation, MdHealthAndSafety } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';

const features = [
  {
    icon: <FaMosque className="text-2xl text-green-700" />,
    desc: 'இஸ்லாமிய மார்க்கத்தை குர்ஆன் ஹதீஸ் அடிப்படையில் அதன் தூய முறையில் எடுத்துரைப்பது',
  },
  {
    icon: <FaHandsHelping className="text-2xl text-purple-700" />,
    desc: 'சமுதாய பணிகளில் அக்கறையுடன் செயல்படுவது',
  },
  {
    icon: <FaHandHoldingHeart className="text-2xl text-pink-600" />,
    desc: 'வாழ்வாதாரம் இழந்தவர்களுக்கு வாழ்வாதார உதவிகள்',
  },
  {
    icon: <FaHospitalAlt className="text-2xl text-red-600" />,
    desc: 'மருத்துவ உதவிகள் மற்றும் ரத்ததான முகாம்கள்',
  },
  {
    icon: <MdOutlineVolunteerActivism className="text-2xl text-yellow-700" />,
    desc: 'ஜகாத் மற்றும் தர்மங்களை வசூலித்து அதை உரியவர்களிடம் கொண்டு சேர்ப்பது',
  },
  {
    icon: <FaQuran className="text-2xl text-blue-700" />,
    desc: 'மார்க்கத்தை எடுத்துரைக்கும் விதமாக மதரசாக்கலை நடத்துவது',
  },
  {
    icon: <FaBookReader className="text-2xl text-indigo-700" />,
    desc: 'இலவச டியூஷன் வகுப்புகள் நடத்துவது',
  },
  {
    icon: <MdCastForEducation className="text-2xl text-green-600" />,
    desc: 'கல்வி மற்றும் வேலை வாய்ப்பு குறித்த விழிப்புணர்வு முகாம்கள், நிகழ்ச்சிகள் அமைத்தல்',
  },
  {
    icon: <MdHealthAndSafety className="text-2xl text-blue-800" />,
    desc: 'மருத்துவ முகாம்கள், ஆரோக்கிய விழிப்புணர்வு முகங்கள், தண்ணீர் பந்தல், கவுசுர் குடிநீர் வழங்குதல் போன்ற பொதுப் பணிகள்',
  },
  {
    icon: <BsFillPeopleFill className="text-2xl text-gray-700" />,
    desc: 'பேரிடர் காலங்களில் மக்களை மீட்கும் விதமாக முதன்மை இடத்தில் நின்று சீராய்வு பணிகளை செய்கிறது',
  },
];

const Card = ({ icon, desc, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 10 }}
      className="flex items-start gap-3 bg-white p-4 rounded-md shadow-md border-l-4 border-red-500 transition-transform duration-300"
    >
      <span>{icon}</span>
      <p className="text-sm text-gray-700">{desc}</p>
    </motion.div>
  );
};

const Presentations = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 text-gray-800 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-0">
          நோக்கங்கள்
        </h2>
        <motion.div
                className="w-20 h-1 mx-auto mb-12 bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '80px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />

        {/* <p className="mb-4 text-base sm:text-lg">
          Welcome to <span className="font-semibold">MHK TRUST</span> — serving the community with dedication and values rooted in faith.
        </p>

        <p className="mb-6 text-base sm:text-lg">
          Based in Thiruvarur and Mannarkudi, we're offering social and welfare services to uplift
          communities and inspire positive transformation.
        </p> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {features.map((item, index) => (
            <Card key={index} icon={item.icon} desc={item.desc} index={index} />
          ))}
        </div>

        <p className="text-base mb-4 mt-4">
          அமைப்பின் பணிகள் மேலும் சிறக்க தங்களால் இயன்ற பொன்னான உதவிகளை இறைவனுக்காக வாரி வழங்குவீர்....
        </p>

        {/* <div className="flex justify-center">
          <button
            type="button"
            className="bg-white text-gray-500 active:scale-95 transition text-sm flex items-center px-4 py-2 gap-2 rounded w-max border border-gray-500/30"
          >
            <svg
              width="17"
              height="13"
              viewBox="0 0 17 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.707 5.083H16.29M2.124.833h12.75c.782 0 1.416.635 1.416 1.417v8.5c0 .783-.634 1.417-1.416 1.417H2.124A1.417 1.417 0 0 1 .707 10.75v-8.5c0-.782.634-1.417 1.417-1.417"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Pay
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Presentations;
