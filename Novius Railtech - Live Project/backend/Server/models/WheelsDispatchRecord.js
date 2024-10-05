const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const WheelsDispatchRecord = sequelize.define(
  "WheelsDispatchRecord",
  {
    wheelid: {
      type: DataTypes.INTEGER,
      // autoIncrement: true,
      primaryKey: true,
    },
    SectionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DepartmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    WheeltypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    DivisionCarshed: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    LooryNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    WheelNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    TypeOfWheel: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    TradeDiameter: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    WheelGauge: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    AxleUSTCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    remark: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    modifiedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    modifiedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "WheelsDispatchRecord",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = WheelsDispatchRecord;
