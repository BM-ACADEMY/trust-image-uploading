import React, { useState, useEffect } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { motion } from "framer-motion";
import axios from "axios";

// Animation configs
const container = {
  hidden: { opacity: 1, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Presentations = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [visibleSections, setVisibleSections] = useState(2);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/gallery`);
        setGalleryItems(res.data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };

    fetchGallery();
  }, []);

  const handleLoadMore = () => {
    setVisibleSections((prev) => Math.min(prev + 1, galleryItems.length));
  };

  return (
  <div className="bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div variants={container} initial="hidden" animate="visible">
        <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
          சமூகப் பணிகள்
        </h2>
        <div className="flex justify-center mb-10">
          <div className="w-32 h-1 bg-red-600 rounded-full"></div>
        </div>

        {galleryItems.slice(0, visibleSections).map((section, idx) => (
          <div key={section._id || idx} className="mb-16 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              {section.title}
            </h3>

            <LightGallery
              speed={500}
              plugins={[lgZoom, lgThumbnail]}
              elementClassNames="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {section.images.map((image, i) => {
                const imageUrl = `${API_BASE_URL.replace("/api", "")}${image.imageUrl}`;
                return (
                  <motion.a
                    key={i}
                    href={imageUrl}
                    variants={item}
                    className="group block overflow-hidden transition-shadow duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 border border-gray-200 shadow-sm">
                      <img
                        src={imageUrl}
                        alt={image.imageHeading}
                        className="w-full h-80 object-cover transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-4 px-2">
                      <p className="text-sm text-justify text-gray-600 mt-1">
                        {image.imageHeading ||
                          "This is a sample description for the image displayed above."}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </LightGallery>
          </div>
        ))}

        {visibleSections < galleryItems.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-6 py-2 text-white bg-red-600 rounded-full font-semibold shadow-md hover:bg-red-700 transition duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Load More
            </button>
          </div>
        )}
      </motion.div>
    </div>
  </div>
);

};

export default Presentations;
