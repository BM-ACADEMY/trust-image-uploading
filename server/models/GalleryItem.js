const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  imageHeading: { type: String, required: true }
}, { _id: false });

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: { type: [imageSchema], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema, 'images');
