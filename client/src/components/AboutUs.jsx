import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: 'easeOut' },
      });
    } else {
      controls.start({
        x: -100,
        opacity: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
      });
    }
  }, [inView, controls]);

  return (
    <section className="flex items-center bg-gray-50 px-4 py-12 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Image Section */}
        <motion.div
          ref={ref}
          initial={{ x: -100, opacity: 0 }}
          animate={controls}
          className="w-full lg:w-1/2"
        >
          <img
            src="https://via.placeholder.com/600x400"
            alt="நோக்கங்கள்"
            className="w-full h-auto rounded-xl shadow-xl object-cover"
          />
        </motion.div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-0">
            சங்கத்தின் மையக்கருத்து
          </h2>
          <motion.div
                  className="w-20 h-1 mx-auto mb-12 bg-gradient-to-r from-red-400 to-red-600 rounded-full mt-0"
                  initial={{ width: 0 }}
                  animate={{ width: '80px' }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
         
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            கடந்த <span className="text-indigo-600">2017</span> ஆம் ஆண்டு ஆரம்பிக்கப்பட்ட இந்த சங்கத்தின் நிறுவனர்
            <span className="text-indigo-600"> எம். அப்பாஸ்</span>, சங்கத் தலைவர்
            <span className="text-indigo-600"> அப்துல் சமத்</span>, சங்கச் செயலாளர்
            <span className="text-indigo-600"> ஜாபர் அலி</span>, சங்க பொருளாளர்
            <span className="text-indigo-600"> யாசர் அரபாத்</span>.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            கல்வி மற்றும் வேலைவாய்ப்பில் பின் தங்கி இருக்கிற முஸ்லிம் சமூகம் மார்க்க அறிவோடு கல்வி மற்றும் வேலை வாய்ப்பு சாதனைகளை படைக்க இச்சங்கம்
            உந்துதலாக இருக்க வேண்டும்.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
