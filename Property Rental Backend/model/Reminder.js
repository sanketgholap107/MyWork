const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_config.js");

const Reminder = sequelize.define(
  "Reminder",
  {
    reminderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dateTime: {
      type: DataTypes.DATE, // Use DataTypes.DATE for DATETIME columns
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modifiedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value is false (unread)
      allowNull: false,
    },
  },
  {
    tableName: "Reminder", // Table name in the database
    timestamps: false, // Disable auto-generated timestamps by Sequelize
  }
);

module.exports = Reminder;