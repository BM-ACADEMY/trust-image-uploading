// backend/controllers/galleryController.js
const fs = require('fs');
const path = require('path');
const GalleryItem = require('../models/GalleryItem');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// GET: All gallery items
exports.getGalleryItems = async (req, res) => {
  try {
    const items = await GalleryItem.find();
    res.json(items);
  } catch (err) {
    console.error('GET /gallery error:', err.message);
    res.status(500).json({ message: 'Server error while fetching gallery items.' });
  }
};

// GET: Single item by ID
exports.getGalleryItemById = async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found.' });
    }
    res.json(item);
  } catch (err) {
    console.error('GET /gallery/view/:id error:', err.message);
    res.status(500).json({ message: 'Error retrieving gallery item.' });
  }
};

// POST: Create a new gallery item
exports.createGalleryItem = async (req, res) => {
  try {
    const { title } = req.body;
    let imageHeadings = req.body.imageHeadings;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files uploaded.' });
    }

    // Convert to array if only one imageHeading is sent
    if (!Array.isArray(imageHeadings)) {
      imageHeadings = [imageHeadings];
    }

    const images = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const heading = imageHeadings[i] || 'Untitled';

      const ext = path.extname(file.originalname).toLowerCase();
      const filename = `${Date.now()}-${i}${ext}`;
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, file.buffer);

      images.push({
        imageUrl: `/uploads/${filename}`,
        imageHeading: heading,
      });
    }

    const newGalleryItem = new GalleryItem({ title, images });
    await newGalleryItem.save();

    res.status(201).json(newGalleryItem);
  } catch (err) {
    console.error('POST /gallery/create error:', err.message);
    res.status(500).json({ message: err.message });
  }
};



exports.deleteImageFromGalleryItem = async (req, res) => {
  try {
    const { itemId, imageIndex } = req.params;

    const item = await GalleryItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found.' });
    }

    const index = parseInt(imageIndex);
    if (isNaN(index) || index < 0 || index >= item.images.length) {
      return res.status(400).json({ message: 'Invalid image index.' });
    }

    // Delete image file from uploads folder
    const fullPath = path.join(__dirname, '..', item.images[index].imageUrl);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    // Remove image from array
    item.images.splice(index, 1);

    // Optional: Delete gallery item if no images left
    if (item.images.length === 0) {
      await item.deleteOne();
      return res.json({ message: 'Image deleted and gallery section removed as it had no more images.' });
    }

    await item.save();
    res.json({ message: 'Image deleted successfully.', item });
  } catch (err) {
    console.error('DELETE /gallery/delete-image/:itemId/:imageIndex error:', err.message);
    res.status(500).json({ message: err.message });
  }
};


exports.updateGalleryImage = async (req, res) => {
  try {
    const { itemId, imageIndex } = req.params;
    const { imageHeading, title } = req.body;

    const item = await GalleryItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found.' });
    }

    const index = parseInt(imageIndex);

    // If index is -1, we append a new image
    if (index === -1) {
      if (!req.file) return res.status(400).json({ message: 'No image provided.' });

      const filename = `${Date.now()}${path.extname(req.file.originalname)}`;
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, req.file.buffer);

      item.images.push({
        imageUrl: `/uploads/${filename}`,
        imageHeading: imageHeading || 'Untitled',
      });

      await item.save();
      return res.json({ message: 'New image added.', item });
    }

    // Existing image update logic
    if (title) item.title = title;

    if (isNaN(index) || index < 0 || index >= item.images.length) {
      return res.status(400).json({ message: 'Invalid image index.' });
    }

    if (req.file) {
      const oldPath = path.join(__dirname, '..', item.images[index].imageUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      const filename = `${Date.now()}${path.extname(req.file.originalname)}`;
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, req.file.buffer);

      item.images[index] = {
        imageUrl: `/uploads/${filename}`,
        imageHeading: imageHeading || item.images[index].imageHeading,
      };
    } else {
      item.images[index].imageHeading = imageHeading;
    }

    await item.save();
    res.json({ message: 'Image updated.', item });
  } catch (err) {
    console.error('PUT /gallery/update-image error:', err.message);
    res.status(500).json({ message: err.message });
  }
};


