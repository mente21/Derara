const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    feedback: { type: String, required: true },
    image: { type: String },
    isVisible: { type: Boolean, default: true },
    createdBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
