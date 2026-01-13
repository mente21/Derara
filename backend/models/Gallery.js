const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    category: { type: String, default: 'General' },
    isVisible: { type: Boolean, default: true },
    createdBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
