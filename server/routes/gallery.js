const express = require('express');
const router = express.Router();
const multer = require('multer');
const galleryController = require('../Controller/GalleryController');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Routes
router.get('/', galleryController.getGalleryItems);
router.get('/view/:id', galleryController.getGalleryItemById);
router.post('/create', upload.array('images', 10), galleryController.createGalleryItem);
router.put('/update-image/:itemId/:imageIndex', upload.single('image'), galleryController.updateGalleryImage);

// router.delete('/delete/:id', galleryController.deleteGalleryItem);


router.delete('/delete-image/:itemId/:imageIndex', galleryController.deleteImageFromGalleryItem);

module.exports = router;
