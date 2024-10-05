const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js"); // Import your Sequelize instance

const LHBScheduledPreIinspection = sequelize.define(
  "LHBScheduledPreIinspection",
  {
    WheelId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    ShopSrNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    AxleNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ReceiveDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    DispatchDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    CoachNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    DiameterIN: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    DiameterOUT: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    FlageIN: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    FlageOUT: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BDMake: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BDSizeIN: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    BDSizeOUT: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RodGaugeIN: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RodGaugeOUT: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    SoundTestIN: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    SoundTestOUT: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    TypeOfRepair: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    USTName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    MatungaRemark: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    InspectorSign: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    DiscParticularA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    DiscParticularB: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    CTRBA: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    CTRBB: {
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
    tableName: "LHBPreIinspection",
    timestamps: false, // To manage createdDate and modifiedDate manually
  }
);

module.exports = LHBScheduledPreIinspection;
