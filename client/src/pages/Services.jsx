import React from "react";
import { motion } from "framer-motion";

// ✅ Updated Helper component: Animate the full title (no character-splitting)
const AnimatedText = ({ text }) => {
  return (
    <motion.h2
      className="text-3xl font-bold mb-4 inline-block text-[#4f38f7] hover:underline hover:decoration-[#fb2c36] hover:decoration-2 hover:underline-offset-4 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {text}
    </motion.h2>
  );
};

const AlternatingSections = () => {
  const sections = [
    {
      id: 1,
      title: "மருத்துவ உதவி",
      description: `மக்களின் ஆரோக்கியம் எந்த ஒரு சமூகத்திற்கும் அடிப்படை ஆதாரமாகும். எங்கள் அறக்கட்டளை சமூகத்தின் கீழ்க்கோடியை சேர்ந்தவர்கள் உயர்தர மருத்துவ சேவைகளை பெற வேண்டும் என்ற நோக்கத்தில், மருத்துவ முகாம்கள், இலவச மருத்துவ பரிசோதனைகள், மருந்து விநியோகம், அவசர சிகிச்சை உதவிகள் போன்றவற்றை வழங்குகிறது. கிராமப்புறங்கள் மற்றும் புறநகர் பகுதிகளில் இவை அதிகம் சீரமைக்கப்பட்டுள்ளன.\n\nமேலும், நோயாளிகளுக்கான மருத்துவ வாடகைக் கட்டணம், சிகிச்சைக்காக நோயாளிகள் பயணிக்க வேண்டிய கட்டணங்கள் மற்றும் பராமரிப்பு தேவைகளையும் நாங்கள் கவனிக்கின்றோம். இது, அவர்களின் வாழ்க்கைத்தரத்தை மேம்படுத்துவதோடு, நம்பிக்கையை வளர்க்கும் ஒரு முயற்சியாக அமைகிறது.`,
      imageUrl: "https://via.placeholder.com/400x300",
    },
    {
      id: 2,
      title: "வாழ்வாதார உதவிகள்",
      description: `நிதியளவில் பின்னடைந்தவர்கள் தங்கள் குடும்பத்தையும் எதிர்காலத்தையும் உறுதியாக வழிநடத்த வேண்டும் என்ற நோக்கத்தில், எங்கள் அறக்கட்டளை வாழ்வாதார உதவிகளை வழங்குகிறது. சிறு தொழில் தொடங்குவதற்கான நிதி உதவிகள், தொழில் பயிற்சி முகாம்கள், தையல், அச்சுப்பணி, மற்றும் கைதொழில் பயிற்சிகள் மூலம் மக்களை சுயதொழில்முகமாக மாற்ற முயற்சிக்கின்றோம்.\n\nஇவையனைத்தும், அவர்கள் மரியாதைக்குரிய வாழ்க்கைத் தொழிலை (dignified livelihood) பெறும் வகையில் அமைந்துள்ளன. பெண்கள் மற்றும் இளைஞர்கள் இதில் முக்கிய இடம் பெற்றுள்ளனர்.`,
      imageUrl: "https://via.placeholder.com/400x300",
    },
    {
      id: 3,
      title: "தாவா பணிகள்",
      description: `இஸ்லாமிய விளக்கப் பணிகள் அல்லது தாவா என்பது நம்முடைய நம்பிக்கைகளை அன்போடும் அறிவோடும் மற்றவர்களுடன் பகிரும் பணி. எங்கள் அறக்கட்டளை தாவா பணிகளை இன்மையற்றவர்களிடம் பகிர்ந்துசெல்லும் நோக்கத்தோடு, இஸ்லாமிய மதப் பாடங்கள், நல்லொழுக்கம், சமுதாய ஒற்றுமை, மற்றும் சாந்தி பற்றிய விழிப்புணர்வுகளை பரப்புகிறது.\n\nமதக்கல்வி வகுப்புகள், இளைய தலைமுறைக்கான தவ்ஹீத் விழிப்புணர்வு நிகழ்ச்சிகள், மற்றும் சமூக நல்லிணக்கத்திற்கு ஏற்பாடாகும் கலந்தாய்வுகள் போன்றவை இதில் அடங்கும். இதன் மூலம், சமுதாயத்தில் நேர்மையும் அறமும் வேரூன்ற வேண்டும் என்பது எங்களின் நோக்கம்.`,
      imageUrl: "https://via.placeholder.com/400x300",
    },
    {
      id: 4,
      title: "பொதுப்பணிகள்",
      description: `சமூக நலனில் பங்களிக்கும் வகையில், எங்கள் அறக்கட்டளை பொதுப்பணிகளை சிறப்பாக மேற்கொள்கிறது. தூய்மை பணிகள், குடிநீர் வசதி, சாலை ஒளி அமைப்புகள், மற்றும் பொதுத் தூய்மை குறித்து விழிப்புணர்வுப் பிரச்சாரங்கள் மூலம் சமூக வளர்ச்சியை தூண்டுகிறது.\n\nபள்ளி மாணவர்களுக்கு தேவையான கல்வி உதவிகள், விதவை மற்றும் முதியவர்களுக்கு உதவித் தொகை, மாற்றுத் திறனாளிகளுக்கான உபகரணங்கள் வழங்கும் நடவடிக்கைகள் போன்றவை இப்பணிக்குள் அடங்கும். இவை அனைத்தும் மக்களிடம் ஒரு நலமிக்க மற்றும் பாதுகாப்பான சூழலை உருவாக்குவதற்காக செயற்படுகின்றன.`,
      imageUrl: "https://via.placeholder.com/400x300",
    },
  ];

  return (
    <div className="space-y-20 px-4 py-10 max-w-7xl mx-auto">
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={section.id}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              !isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            <motion.div
              className="md:w-1/2"
              initial={{ x: isEven ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src={section.imageUrl}
                alt={section.title}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </motion.div>

            <div className="md:w-1/2 text-center md:text-left">
              <AnimatedText text={section.title} />
              <motion.div
                className="text-gray-700 leading-relaxed tracking-wide text-justify text-[1.05rem]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {section.description.split("\n").map((para, idx) => (
                  <p key={idx} className="mb-4">{para}</p>
                ))}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlternatingSections;
