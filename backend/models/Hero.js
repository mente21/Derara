const mongoose = require('mongoose');

const heroSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    createdBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hero', heroSchema);
