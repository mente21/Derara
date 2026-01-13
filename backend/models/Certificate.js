const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    createdBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certificate', certificateSchema);
