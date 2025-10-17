// backend/routes/jobs.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const jobsController = require('../controllers/jobsController');
const auth = require('../middleware/auth');

const isNotFutureDate = (value) => {
  const d = new Date(value);
  const now = new Date();
  if (isNaN(d.getTime())) throw new Error('Invalid date');
  if (d > now) throw new Error('Application date cannot be in the future');
  return true;
};

const statuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

const jobValidators = [
  body('companyName').isString().trim().isLength({ min: 3 }).withMessage('Company name must have at least 3 characters'),
  body('jobTitle').isString().trim().notEmpty().withMessage('Job title is required'),
  body('applicationDate').custom(isNotFutureDate),
  body('status').optional().isIn(statuses).withMessage('Invalid status')
];

// protect all job routes
router.use(auth);

router.post('/', jobValidators, jobsController.createJob);
router.get('/', jobsController.getJobs);
router.get('/:id', jobsController.getJob);
router.put('/:id', jobValidators, jobsController.updateJob);
router.delete('/:id', jobsController.deleteJob);

module.exports = router;
