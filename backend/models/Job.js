// backend/models/Job.js
const mongoose = require('mongoose');
const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

const JobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true, minlength: 3, trim: true },
  jobTitle: { type: String, required: true, trim: true },
  applicationDate: { type: Date, required: true },
  status: { type: String, enum: validStatuses, default: 'Applied' },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
