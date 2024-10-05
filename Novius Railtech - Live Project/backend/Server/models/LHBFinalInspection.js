const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const LHBFinalInspection = sequelize.define(
  "LHBFinalInspection",
  {
    wheelid: {
      type: DataTypes.INTEGER,
      // autoIncrement: true,
      primaryKey: true,
    },
    WheelNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Shift:{
      type:DataTypes.STRING(50),
      allowNull:false
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
    AxleNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ABSide: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    WheelDia: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    WheelRG: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    WheelFLG: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    FC: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Size: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Oval: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Tap: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ShoulderSize: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    JrWaiviness: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    BDMake: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    BDSize: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    EndHole: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    BRGRemainLife: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    BRGMake: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    BRGNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    MEP: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    USTName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    FittingDt: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ECATest: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    InspectorSign: {
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
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "LHBFinalInspection",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = LHBFinalInspection;
