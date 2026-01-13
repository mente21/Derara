const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: String, required: true }, // Clerk User ID (String)
    assignedBy: { type: String, required: true }, // Clerk User ID (String)
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    dueDate: { type: Date },
    report: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
