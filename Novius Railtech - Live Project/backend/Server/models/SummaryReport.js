const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const SummaryReport = sequelize.define(
  "SummaryReport",
  {
    WheelID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    SectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DepartmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WheeltypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WheelNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WheelStageName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    TypeofRepair: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    WheelStageEnrtyTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    WheelStageExitTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    StageFormDataEnteredby: {
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
    modifiedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "SummaryReport",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = SummaryReport;