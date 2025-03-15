const express = require('express');
const propertyController = require('../controller/propertyController.js'); // Import the controller
const router = express.Router();

// Routes for Property CRUD
router.post('/create', propertyController.createProperty); // Create a new property
router.get('/getallproperty', propertyController.getProperties); // Get all properties
router.get('/getpropertybyid/:id', propertyController.getPropertyById); // Get property by ID
router.put('/update/:id', propertyController.updateProperty); // Update property
router.delete('/delete/:id', propertyController.deleteProperty); // Delete property
router.get('/getproperty/:id', propertyController.getPropertyDetails); // Get property details by ID

module.exports = router;