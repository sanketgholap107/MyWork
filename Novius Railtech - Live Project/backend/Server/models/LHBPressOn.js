const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const LHBPressON = sequelize.define(
  "LHBPressON",
  {
    wheelid: {
      type: DataTypes.INTEGER,
      allowNull:false,
      // autoIncrement: false,
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
    AxleNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ATLNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WheelSeatSize: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BDSeatSize: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RAValue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    OperatorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAVTLNO: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscABoreSizeByOperator: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscARAValue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAOperatorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscABWheelSeatSize: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAAllow: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAPressOnPressure: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscARDNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAWheelDiscParticulars: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscATopXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscATopYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAMiddleXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAMiddleYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscALowerXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscALowerYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAAvgXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscAAvgYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBVTLNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBBoreSizeByOperator: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBRAValue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBOperatorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBBWheelSeatSize: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBAllow: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBPressOnPressure: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBRDNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBWheelDiscParticulars: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBTopXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBTopYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBMiddleXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBMiddleYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBLowerXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBLowerYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBAvgXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    WheelDiscBAvgYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscABBDSeatSize: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscAAllow: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscAPressOnPressure: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscABDThickness: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscABrakeDiscParticulars: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscATopXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscATopYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscAMiddleXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscAMiddleYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscALowerXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscALowerYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscAAvgXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscAAvgYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBBBDSeatSize: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBAllow: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBPressOnPressure: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBBDThickness: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBBrakeDiscParticulars: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBTopXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBTopYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBMiddleXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBMiddleYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBLowerXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBLowerYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBAvgXAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BrakeDiscBAvgYAxis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    MCNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Operator: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Inspector: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    tableName: "LHBPressON",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = LHBPressON;
