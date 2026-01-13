const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String }, // Long content for the "Read More" page
    image: { type: String, required: true },
    category: { type: String, default: 'Coffee' },
    author: { type: String, default: 'Derara Team' },
    href: { type: String }, // Links to internal blog page
    isVisible: { type: Boolean, default: true },
    createdBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
