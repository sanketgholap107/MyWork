const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Import CORS middleware
const userRoutes = require('./route/userRoutes.js');
const tenantRoutes = require('./route/tenantRoutes.js');
const propertyRoutes = require('./route/propertyRoutes.js');
const invoiceRoutes = require('./route/invoiceRoutes.js');
const reminderRoutes = require('./route/reminderRoutes.js');
const bodyParser = require('body-parser');
const { logger } = require('./config/logger.js'); // Import logger

// Load environment variables
dotenv.config();

// Initialize the express app
const app = express();

// Enable CORS for all origins (you can configure it further based on your requirements)
app.use(cors()); // This enables CORS for all routes and origins

// Middleware
app.use(bodyParser.json());


// Routes
app.use('/user', userRoutes);
app.use('/tenant', tenantRoutes);
app.use('/property', propertyRoutes);
app.use('/invoice', invoiceRoutes);
app.use('/reminder', reminderRoutes);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
