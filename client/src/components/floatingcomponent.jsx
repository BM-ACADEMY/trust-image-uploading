// WhatsAppChatIcon.jsx
import React from "react";
import whatsappIcon from '../assets/whatsapp.webp'; // your WhatsApp icon path

const WhatsAppChatIcon = () => {
  return (
    <a
      href="https://wa.me/919994665870" // Replace with your WhatsApp number
      className="fixed bottom-5 right-5 z-50"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp Chat"
        className="w-10 h-10 hover:scale-110 transition-transform duration-300"
      />
    </a>
  );
};

export default WhatsAppChatIcon;
