const express = require('express');
const reminderController = require('../controller/reminderController'); // Import the controller
const router = express.Router();

// Create a new reminder
router.post('/create', reminderController.createReminder);

// Get all reminders
router.get('/getallreminders', reminderController.getReminders);

// Get a single reminder by ID
router.get('/getReminderById/:reminderId', reminderController.getReminderById);

// Update a reminder by ID
router.put('/update/:reminderId', reminderController.updateReminder);

// Delete a reminder by ID
router.delete('/delete/:reminderId', reminderController.deleteReminder);

// Get reminders due today
router.get('/due-today', reminderController.getRemindersDueToday);

// Mark all reminders as read
router.post('/mark-as-read', reminderController.markAllAsRead); // New route for marking reminders as read

module.exports = router;