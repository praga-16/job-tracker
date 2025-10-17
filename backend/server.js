// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job-tracker';

connectDB(MONGO_URI);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'API endpoint not found' }));
// Global error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
