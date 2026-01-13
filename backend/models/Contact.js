const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    company: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'responded'], default: 'new' },
    response: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
