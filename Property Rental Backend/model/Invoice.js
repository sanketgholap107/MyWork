const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_config.js"); // Import your Sequelize instance
const Tenant = require("./Tenant"); // Import the Tenant model
const Property = require("./Property"); // Import the Property model

const Invoice = sequelize.define(
  "Invoice",
  {
    InvoiceNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Assuming InvoiceNumber is the primary key
      autoIncrement: true, // Auto-increment the InvoiceNumber
    },
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "tenantId is required.",
        },
      },
    },
    PropertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "PropertyId is required.",
        },
      },
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Default to the current date
    },
    CompanyName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "CompanyName is required.",
        },
      },
    },
    CompanyAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "CompanyAddress is required.",
        },
      },
    },
    LandlordName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "LandlordName is required.",
        },
      },
    },
    LandlordAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "LandlordAddress is required.",
        },
      },
    },
    GSTNo: {
      type: DataTypes.STRING(255), // GST numbers are alphanumeric
      allowNull: true,
    },
    Amount: {
      type: DataTypes.DECIMAL(18, 2), // Use DECIMAL for monetary values
      allowNull: false,
      validate: {
        notNull: {
          msg: "Amount is required.",
        },
      },
    },
    IncrementPercentage: {
      type: DataTypes.DECIMAL(5, 2), // Use DECIMAL for percentages
      allowNull: true,
    },
    IncrementedAmount: {
      type: DataTypes.DECIMAL(18, 2), // Use DECIMAL for monetary values
      allowNull: false,
      validate: {
        notNull: {
          msg: "IncrementedAmount is required.",
        },
      },
    },
    CompanyBankDetails: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    modifiedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Default to the current date
    },
    modifiedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Default value is true (active)
    },
  },
  {
    tableName: "Invoice", // The name of the table in the database
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);

// Defining relationships with other models
Invoice.belongsTo(Tenant, { foreignKey: "tenantId" }); // Foreign key to Tenant table
Invoice.belongsTo(Property, { foreignKey: "PropertyId" }); // Foreign key to Property table

module.exports = Invoice;