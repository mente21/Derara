const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    region: { type: String },
    type: { type: String },
    short_desc: { type: String },
    long_desc: { type: String },
    profile: { type: String }, // Comma separated
    elevation: { type: String },
    score: { type: String },
    price: { type: String },
    rating: { type: Number, default: 5 },
    image: { type: String, required: true },
    tag: { type: String },
    isFeatured: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
    createdBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
