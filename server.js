const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const choresRoutes = require('./routes/chores');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected to iCentz database'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/chores', choresRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Chorz Calculator API is running');
});

// Start server
const PORT = process.env.PORT || 5001; // Changed to port 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));