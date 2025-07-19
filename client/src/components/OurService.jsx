import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MdMedicalServices, MdOutlinePublic } from 'react-icons/md';
import { FaHandsHelping, FaMosque } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <MdMedicalServices className="text-4xl text-red-600" />,
    title: 'மருத்துவ உதவி',
    desc: 'அவசர தேவைகளில் மருத்துவ ஆதரவு மற்றும் பராமரிப்பு சேவைகள்.',
  },
  {
    icon: <FaHandsHelping className="text-4xl text-green-600" />,
    title: 'வாழ்வாதார உதவிகள்',
    desc: 'ஊக்கம், வேலைவாய்ப்பு மற்றும் குடும்ப ஆதரவு வழிகாட்டுதல்.',
  },
  {
    icon: <FaMosque className="text-4xl text-indigo-600" />,
    title: 'தாவா பணிகள்',
    desc: 'இஸ்லாமிய அறிவுரை மற்றும் தாராளமான சமுதாய சேவைகள்.',
  },
  {
    icon: <MdOutlinePublic className="text-4xl text-yellow-600" />,
    title: 'பொதுப்பணிகள்',
    desc: 'சமூகத் தூய்மை, சாலை பாதுகாப்பு மற்றும் பொதுப் பயன்பாடுகள்.',
  },
];

const FeatureCard = ({ item, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 40 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full sm:w-[300px]"
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          background: 'linear-gradient(to bottom right, #f87171, #ef4444)',
          color: '#ffffff',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        className="bg-white p-6 rounded-2xl shadow-lg group cursor-pointer transition-all duration-300 ease-in-out h-full"
      >
        <div className="mb-3 group-hover:text-white transition-colors duration-300">
          {item.icon}
        </div>

        <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-white transition-colors duration-300">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 group-hover:text-white transition-colors duration-300 mb-3">
          {item.desc}
        </p>

        {/* Arrow Link */}
        <Link to="/services">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"
          >
            →
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 sm:px-8 md:px-16 bg-gradient-to-b from-white via-gray-50 to-white text-center overflow-hidden">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        சேவைகள்
      </motion.h2>
      <motion.div
        className="w-20 h-1 mx-auto mb-12 bg-gradient-to-r from-red-400 to-red-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '80px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* Cards container */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-6 items-center">
        {features.map((item, index) => (
          <FeatureCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
