const cloudinary = require('cloudinary').v2;
const GalleryItem = require('../models/GalleryItem');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

      // Upload to Cloudinary using a Promise
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      if (!result.secure_url) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      images.push({
        imageUrl: result.secure_url,
        imageHeading: heading,
      });
    }

    const newGalleryItem = new GalleryItem({ title, images });
    await newGalleryItem.save();

    res.status(201).json(newGalleryItem);
  } catch (err) {
    console.error('POST /gallery/create error:', err.message);
    res.status(500).json({ message: 'Failed to create gallery item: ' + err.message });
  }
};

// DELETE: Delete an image from a gallery item
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

    // Extract public_id from Cloudinary URL
    const imageUrl = item.images[index].imageUrl;
    const publicId = imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    // Remove image from array
    item.images.splice(index, 1);

    // Delete gallery item if no images left
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

// PUT: Update a gallery image
exports.updateGalleryImage = async (req, res) => {
  try {
    const { itemId, imageIndex } = req.params;
    const { imageHeading, title } = req.body;

    const item = await GalleryItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found.' });
    }

    const index = parseInt(imageIndex);

    // If index is -1, append a new image
    if (index === -1) {
      if (!req.file) return res.status(400).json({ message: 'No image provided.' });

      // Upload new image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      item.images.push({
        imageUrl: result.secure_url,
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
      // Delete old image from Cloudinary
      const oldImageUrl = item.images[index].imageUrl;
      const publicId = oldImageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);

      // Upload new image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      item.images[index] = {
        imageUrl: result.secure_url,
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