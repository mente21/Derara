const mongoose = require('mongoose');

const featureSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, // Lucide icon name or URL
    isVisible: { type: Boolean, default: true },
    createdBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feature', featureSchema);
