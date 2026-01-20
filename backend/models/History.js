const mongoose = require('mongoose');

const historySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String }, // Icon name or identifier
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
    createdBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('History', historySchema);
