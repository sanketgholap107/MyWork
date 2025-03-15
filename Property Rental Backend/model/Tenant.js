const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_config.js"); // Import your Sequelize instance

const Tenant = sequelize.define(
  "Tenant",
  {
    tenantId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // tenantId is the primary key
      autoIncrement: true, // Auto-increment for tenantId
    },
    // invoice_number: {
    //   type: DataTypes.INTEGER,
    //   allowNull: ,
    // },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    company_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    property_landlord: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    years_of_agreement: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date_of_agreement: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    annual_rent_increment: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payment_status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // Default value
  },
    Description:{
      type: DataTypes.STRING(255),
      allowNull:true
    },
    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW, // Default value to current date (GETDATE equivalent)
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
    tableName: "Tenant", // Table name in the database
    timestamps: false, // Disable auto-generated timestamps by Sequelize
  }
);

module.exports = Tenant;
