const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['green', 'yellow', 'orange', 'red'],
    required: true
  },
  phenomenon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  coordinates: {
    lat: Number,
    lon: Number
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Alert', alertSchema);
