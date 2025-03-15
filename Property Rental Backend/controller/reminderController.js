const Reminder = require("../model/Reminder"); // Import the Reminder model
const { Op } = require("sequelize"); // For querying with Sequelize operators
const { logger } = require("../config/logger"); // Import the logger

// Create a new reminder
exports.createReminder = async (req, res) => {
  try {
    const { subject, about, dateTime, priority, notes } = req.body;

    console.log("Incoming dateTime:", dateTime); // Debugging

    // Parse the incoming dateTime string into a JavaScript Date object
    const parsedDateTime = new Date(dateTime);

    // Validate the parsed date
    if (isNaN(parsedDateTime.getTime())) {
      return res.status(400).send({ message: "Invalid date format" });
    }

    // Create a new reminder
    const newReminder = await Reminder.create({
      subject,
      about,
      dateTime: parsedDateTime, // Use the parsed Date object
      priority,
      notes,
      createdBy: "user", // Replace with actual user info if needed
    });

    res.status(201).send({
      message: 'Reminder created successfully',
      reminder: newReminder,
    });
  } catch (error) {
    logger.error('Error creating reminder:', error);
    res.status(500).send({ message: 'Failed to create reminder', error: error.message });
  }
};

// Get all reminders
exports.getReminders = async (req, res) => {
  try {
    const { unreadOnly } = req.query; // Optional query parameter

    const whereCondition = {};
    if (unreadOnly === "true") {
      whereCondition.isRead = false; // Fetch only unread reminders
    }

    const reminders = await Reminder.findAll({
      attributes: [
        "reminderId",
        "subject",
        "about",
        "dateTime",
        "priority",
        "notes",
        "createdBy",
        "isActive",
        "isRead",
      ],
      where: whereCondition,
    });

    res.status(200).json(reminders);
  } catch (error) {
    logger.error("Error fetching reminders:", error);
    res.status(500).send({ message: "Failed to fetch reminders", error: error.message });
  }
};

// Get a single reminder by ID
exports.getReminderById = async (req, res) => {
  const { reminderId } = req.params;

  try {
    const reminder = await Reminder.findOne({ where: { reminderId } });

    if (!reminder) {
      return res.status(404).send({ message: 'Reminder not found' });
    }

    res.status(200).json(reminder);
  } catch (error) {
    logger.error('Error fetching reminder by ID:', error);
    res.status(500).send({ message: 'Failed to fetch reminder', error: error.message });
  }
};

// Update a reminder by ID
exports.updateReminder = async (req, res) => {
  const { reminderId } = req.params;
  const { subject, about, dateTime, priority, notes, modifiedBy, isActive } = req.body;

  try {
    const reminder = await Reminder.findOne({ where: { reminderId } });

    if (!reminder) {
      return res.status(404).send({ message: 'Reminder not found' });
    }

    // Parse and validate dateTime
    const parsedDateTime = new Date(dateTime);
    if (isNaN(parsedDateTime.getTime())) {
      return res.status(400).send({ message: 'Invalid date format' });
    }

    // Update fields
    reminder.subject = subject || reminder.subject;
    reminder.about = about || reminder.about;
    reminder.dateTime = parsedDateTime || reminder.dateTime;
    reminder.priority = priority || reminder.priority;
    reminder.notes = notes || reminder.notes;
    reminder.modifiedBy = modifiedBy || reminder.modifiedBy;
    reminder.isActive = isActive !== undefined ? isActive : reminder.isActive;

    await reminder.save();

    res.status(200).send({
      message: 'Reminder updated successfully',
      reminder,
    });
  } catch (error) {
    logger.error('Error updating reminder:', error);
    res.status(500).send({ message: 'Failed to update reminder', error: error.message });
  }
};

// Delete a reminder by ID
exports.deleteReminder = async (req, res) => {
  const { reminderId } = req.params;

  try {
    const deletedCount = await Reminder.destroy({ where: { reminderId } });

    if (deletedCount > 0) {
      res.status(200).send({ message: 'Reminder deleted successfully' });
    } else {
      res.status(404).send({ message: 'Reminder not found' });
    }
  } catch (error) {
    logger.error('Error deleting reminder:', error);
    res.status(500).send({ message: 'Failed to delete reminder', error: error.message });
  }
};

// Get reminders due today
exports.getRemindersDueToday = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const reminders = await Reminder.findAll({
      where: {
        dateTime: {
          [Op.between]: [startOfDay, endOfDay], // Find reminders due today
        },
        isActive: true, // Only active reminders
      },
    });

    if (reminders.length > 0) {
      res.status(200).json(reminders);
    } else {
      res.status(404).json({ message: 'No reminders due today.' });
    }
  } catch (error) {
    logger.error('Error fetching reminders due today:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Mark all reminders as read
exports.markAllAsRead = async (req, res) => {
  try {
    // Update all reminders with isRead = false to isRead = true
    await Reminder.update(
      { isRead: true }, // Set isRead to true
      { where: { isRead: false } } // Only update unread reminders
    );

    res.status(200).send({ message: "All reminders marked as read" });
  } catch (error) {
    logger.error("Error marking reminders as read:", error);
    res.status(500).send({ message: "Failed to mark reminders as read", error: error.message });
  }
};