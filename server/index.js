require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Fixed typo: removed space before 'cors'
const connectDB = require('./db/connect');
const galleryRoutes = require('./routes/gallery');

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// API routes
app.use('/api/gallery', galleryRoutes);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));