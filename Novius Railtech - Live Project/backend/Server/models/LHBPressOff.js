const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const LHBPressOff = sequelize.define(
  "LHBPressOff",
  {
    wheelid: {
      type: DataTypes.INTEGER,
      allowNull:false,
      // autoIncrement: false,
      primaryKey: true,
    },
    SectionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DepartmentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WheeltypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    OperatorTNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    InspectorTNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ShopSNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    TypeOfWheel: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    WheelPressedOff: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    DiscSrNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    AxleNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Reason: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    PressedOffRemark: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    modifiedBy: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    modifiedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "PressOff",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = LHBPressOff;
