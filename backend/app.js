require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const classRoutes = require('./routes/classRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');
const cors = require('cors');
// Initialize Express app
const app = express();

// Connect to database
connectDB();
app.use(cors());
// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Use user identification middleware on routes that need it
app.use('/api/classes', classRoutes);
app.use('/api/users', userRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
