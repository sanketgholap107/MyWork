const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_config.js"); // Import your Sequelize instance

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment the userId
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "fullName is required.",
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Unique email
      validate: {
        isEmail: {
          msg: "Please enter a valid email address.",
        },
        notNull: {
          msg: "Email is required.",
        },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required.",
        },
      },
    },
    // Token:{
    //   type: DataTypes.STRING(255),
    //   allowNull: false
    // }
    // createdBy: {
    //   type: DataTypes.STRING(255),
    //   allowNull: true,
    // },
    // modifiedBy: {
    //   type: DataTypes.STRING(255),
    //   allowNull: true,
    // },
    // createdDate: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    // modifiedDate: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: true,
    // },
    // isActive: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true,
    // },
  },
  {
    tableName: "Users",
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);

module.exports = User;
