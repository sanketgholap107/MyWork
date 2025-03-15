const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_config.js"); // Import your Sequelize instance
const Tenant = require("./Tenant.js");

const Property = sequelize.define(
  "Property",
  {
    PropertyId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // PropertyId is the primary key
      autoIncrement: true, // Auto-increment for PropertyId
    },
    Property_Name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Property_Address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Property_Description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    Type_Of_Property: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    State: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    City: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Zipcode: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    General_Rent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Security_Deposit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW, // Default value set to current date
    },
    modifiedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    modifiedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Default value set to true (active)
    },
  },
  {
    tableName: "Property", // Table name in the database
    timestamps: false, // Disable auto-generated timestamps by Sequelize
  }
);

// // Define associations if needed, e.g., Property belongs to Tenant
// Property.belongsTo(Tenant, { foreignKey: "tenantId" });

module.exports = Property;
