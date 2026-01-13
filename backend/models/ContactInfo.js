const mongoose = require('mongoose');

const contactInfoSchema = mongoose.Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    office: { type: String },
    city: { type: String },
    country: { type: String },
    socials: [{
      platform: { type: String },
      url: { type: String },
      icon: { type: String } 
    }],
    createdBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
