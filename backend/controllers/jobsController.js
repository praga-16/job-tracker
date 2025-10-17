// backend/controllers/jobsController.js
const Job = require('../models/Job');
const { validationResult } = require('express-validator');

const createJob = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { companyName, jobTitle, applicationDate, status, notes } = req.body;
    const job = new Job({ user: req.user.id, companyName, jobTitle, applicationDate, status, notes });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = { user: req.user.id };
    if (status) filter.status = status;
    const jobs = await Job.find(filter).sort({ applicationDate: -1, createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

const getJob = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user.id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { companyName, jobTitle, applicationDate, status, notes } = req.body;
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { companyName, jobTitle, applicationDate, status, notes },
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createJob, getJobs, getJob, updateJob, deleteJob };
