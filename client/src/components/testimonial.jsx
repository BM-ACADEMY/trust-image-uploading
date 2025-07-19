import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    text: "எங்கள் குடும்பம் கஷ்டத்தில் இருந்த நேரத்தில் KIET அறக்கட்டளையின் வாழ்வாதார உதவிகள் எங்களுக்கே வாழ்நாள் நினைவாக உள்ளது. அல்ஹம்துலில்லாஹ்",
    author: "நஸ்ரின் பானு",
  },
  {
    text: "KIET அறக்கட்டளை வழங்கும் மருத்துவ உதவி எங்களை பெரும் சுமையிலிருந்து விடுவித்தது. அல்லாஹ் அவர்களைக் வளப்படுத்தட்டும்!",
    author: "முஹம்மது அலி",
  },
  {
    text: "During a critical time in our family, KIET’s livelihood support helped us regain our stability. We’re forever grateful to the trust.",
    author: "Mariam Siddiq",
  },
   {
    text: "The free medical camps organized by KIET provided quality care at our doorstep. A truly noble initiative!",
    author: "Mohammed Iqbal",
  },
  {
    text: "KIET’s Da’wah services are guiding many youngsters back to Islamic values through effective outreach programs. May Allah reward them!",
    author: "Rahdul Kareem",
  },
  {
    text: "தாவா பணிகளில் KIET நிகழ்த்தும் விழிப்புணர்வு பிரச்சாரங்கள் இளைஞர்களை இஸ்லாமிய வழியில் அழைத்து வருகின்றன. இது ஒரு முக்கிய முயற்சி.",
    author: "அப்துல் சமத்",
  },
   {
    text: "பொதுப்பணிகளுக்காக KIET எடுத்துவரும் முயற்சிகள் சமூக நலனில் பேரியக்கத்தை ஏற்படுத்துகின்றன. ஒவ்வொரு நிகழ்ச்சியும் மிகச் சிறப்பாக உள்ளது!",
    author: "ஹலீமா அமீனா",
  },
  {
    text: "மருத்துவ முகாம்கள், உணவுப் பாக்கெட்டுகள், கல்வி உதவிகள் என பல தளங்களில் KIET பங்களிப்பு உண்மையிலேயே இன்ஸ்பிரேஷன் ஆக உள்ளது.",
    author: "யாசீன் ரஹ்மான்",
  },
  {
    text: "Whether it’s cleaning the streets or organizing social welfare drives, KIET’s public service efforts are making a visible difference in our community.",
    author: " Safiya Banu",
  },
  {
    text: "I have personally benefited from KIET’s support in education and health. Their commitment to uplifting lives is truly admirable.",
    author: "Yasir Khan",
  },
];


const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((index + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((index - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-[#001a33] text-white py-16 px-4 relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">
          What Our <span className="text-red-500">Members</span> Say
        </h2>
        <div className="w-16 h-1 bg-red-500 mx-auto mt-2"></div>
      </div>

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white text-gray-800 p-8 rounded-lg relative"
      >
        <p className="text-lg mb-4">“{testimonials[index].text}”</p>
        <p className="text-red-500 text-right font-semibold">— {testimonials[index].author}</p>
      </motion.div>

      <div className="flex justify-center items-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? 'bg-red-500' : 'bg-gray-400'
            }`}
          ></span>
        ))}
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={prevSlide}
          className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
