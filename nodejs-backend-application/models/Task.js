const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: String, required: true },
  assignedBy: { type: String, required: true },
  status: {
    type: String,
    enum: ['Not-Started', 'In Progress', 'Completed', 'Query'],
    default: 'Not-Started',
  },
  comments: [{
    // commentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    commentBy: { type: String, required: true },
    commentText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
