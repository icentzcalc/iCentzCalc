const mongoose = require('mongoose');

const ChoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  timeMinutes: {
    type: Number,
    required: true,
    min: 1
  },
  payRate: {
    type: Number,
    required: true,
    min: 0.5
  },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly'],
    default: 'daily'
  },
  category: {
    type: String,
    default: 'household'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Chorz' }); // Specify the collection name

module.exports = mongoose.model('Chore', ChoreSchema);